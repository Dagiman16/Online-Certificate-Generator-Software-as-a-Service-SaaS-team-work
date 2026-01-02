import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getSecurityHeaders } from './lib/auth'

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/org-admin',
  '/staff',
  '/super-admin',
  '/api/auth/logout',
  '/api/certificates',
  '/api/organizations',
  '/api/templates',
  '/api/trainees'
]

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/register-organization',
  '/register-organization',
  '/verify',
  '/demo',
  '/api/auth/login',
  '/api/auth/register',
  '/api/verify',
  '/api/health'
]

// API routes that require HTTPS in production
const SECURE_API_ROUTES = [
  '/api/auth',
  '/api/certificates',
  '/api/organizations',
  '/api/templates',
  '/api/trainees'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Add security headers to all responses
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // HTTPS enforcement in production
  if (process.env.NODE_ENV === 'production' && !request.nextUrl.protocol.includes('https')) {
    // Check if this is a secure route
    const isSecureRoute = SECURE_API_ROUTES.some(route => pathname.startsWith(route))
    
    if (isSecureRoute) {
      return NextResponse.json(
        { error: 'HTTPS required for this route' },
        { status: 426 } // Upgrade Required
      )
    }
  }

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    return handleApiRoute(request, response)
  }

  // Handle page routes
  return handlePageRoute(request, response)
}

async function handleApiRoute(request: NextRequest, response: NextResponse) {
  const { pathname } = request.nextUrl

  // Public API routes
  if (pathname.startsWith('/api/verify') || 
      pathname.startsWith('/api/health') ||
      pathname === '/api/auth/login' ||
      pathname === '/api/auth/register') {
    return response
  }

  // Protected API routes - require authentication
  const authHeader = request.headers.get('authorization')
  const cookieToken = request.cookies.get('auth-token')?.value

  const token = authHeader?.replace('Bearer ', '') || cookieToken

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  // Verify JWT token
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }

  // Add user info to request headers for API handlers
  response.headers.set('x-user-id', payload.userId)
  response.headers.set('x-user-role', payload.role)
  if (payload.organizationId) {
    response.headers.set('x-organization-id', payload.organizationId)
  }

  return response
}

async function handlePageRoute(request: NextRequest, response: NextResponse) {
  const { pathname } = request.nextUrl

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  if (isPublicRoute) {
    return response
  }

  // Check if route requires authentication
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return response
  }

  // Get auth token from cookie
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify JWT token
  const payload = verifyToken(token)
  if (!payload) {
    // Redirect to login if token is invalid
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based route protection
  const userRole = payload.role

  // Super admin routes
  if (pathname.startsWith('/super-admin') && userRole !== 'super-admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Org admin routes
  if (pathname.startsWith('/org-admin') && !['super-admin', 'org-admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Staff routes
  if (pathname.startsWith('/staff') && !['super-admin', 'org-admin', 'staff'].includes(userRole)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Add user info to response headers
  response.headers.set('x-user-id', payload.userId)
  response.headers.set('x-user-role', payload.role)
  if (payload.organizationId) {
    response.headers.set('x-organization-id', payload.organizationId)
  }

  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}