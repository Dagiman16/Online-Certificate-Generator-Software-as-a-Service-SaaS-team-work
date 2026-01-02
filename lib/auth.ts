// Client-side authentication utilities for WDU-Certify
// This file is designed to work in Client Components

// User roles and permissions
export const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ORG_ADMIN: 'org-admin',
  STAFF: 'staff',
  TRAINEE: 'trainee'
} as const

export const PERMISSIONS = {
  // Certificate permissions
  CREATE_CERTIFICATE: 'create_certificate',
  VIEW_CERTIFICATE: 'view_certificate',
  REVOKE_CERTIFICATE: 'revoke_certificate',
  BULK_GENERATE: 'bulk_generate',
  
  // Organization permissions
  MANAGE_ORGANIZATION: 'manage_organization',
  VIEW_ORGANIZATION: 'view_organization',
  
  // User permissions
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  
  // System permissions
  MANAGE_PRICING: 'manage_pricing',
  VIEW_ANALYTICS: 'view_analytics',
  SYSTEM_SETTINGS: 'system_settings'
} as const

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    PERMISSIONS.CREATE_CERTIFICATE,
    PERMISSIONS.VIEW_CERTIFICATE,
    PERMISSIONS.REVOKE_CERTIFICATE,
    PERMISSIONS.BULK_GENERATE,
    PERMISSIONS.MANAGE_ORGANIZATION,
    PERMISSIONS.VIEW_ORGANIZATION,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_PRICING,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.SYSTEM_SETTINGS
  ],
  [ROLES.ORG_ADMIN]: [
    PERMISSIONS.CREATE_CERTIFICATE,
    PERMISSIONS.VIEW_CERTIFICATE,
    PERMISSIONS.REVOKE_CERTIFICATE,
    PERMISSIONS.BULK_GENERATE,
    PERMISSIONS.VIEW_ORGANIZATION,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_ANALYTICS
  ],
  [ROLES.STAFF]: [
    PERMISSIONS.CREATE_CERTIFICATE,
    PERMISSIONS.VIEW_CERTIFICATE,
    PERMISSIONS.VIEW_USERS
  ],
  [ROLES.TRAINEE]: [
    PERMISSIONS.VIEW_CERTIFICATE
  ]
}

export interface User {
  id: string
  email: string
  name: string
  role: typeof ROLES[keyof typeof ROLES]
  organizationId?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface JWTPayload {
  userId: string
  email: string
  role: typeof ROLES[keyof typeof ROLES]
  organizationId?: string
  iat?: number
  exp?: number
}

// Client-side user management
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    return JSON.parse(userStr) as User
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error('Failed to set current user:', error)
  }
}

export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')
  } catch (error) {
    console.error('Failed to clear current user:', error)
  }
}

// Permission checking
export function hasPermission(userRole: keyof typeof ROLES, permission: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.includes(permission as any)
}

export function hasAnyPermission(userRole: keyof typeof ROLES, permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission))
}

// Organization access control
export function canAccessOrganization(user: User, organizationId: string): boolean {
  // Super admin can access any organization
  if (user.role === ROLES.SUPER_ADMIN) {
    return true
  }
  
  // Other roles can only access their own organization
  return user.organizationId === organizationId
}

// Certificate ID generation with tamper-proof features
export function generateSecureCertificateId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const checksum = generateChecksum(`${timestamp}-${random}`)
  
  return `WDU-CERT-${new Date().getFullYear()}-${timestamp}-${random.toUpperCase()}-${checksum}`
}

function generateChecksum(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 6).toUpperCase()
}

// Validate certificate ID format and checksum
export function validateCertificateId(certificateId: string): boolean {
  const pattern = /^WDU-CERT-\d{4}-\d{13}-[A-Z0-9]{13}-[A-Z0-9]{6}$/
  
  if (!pattern.test(certificateId)) {
    return false
  }
  
  const parts = certificateId.split('-')
  if (parts.length !== 6) {
    return false
  }
  
  const timestamp = parts[3]
  const random = parts[4]
  const providedChecksum = parts[5]
  
  const expectedChecksum = generateChecksum(`${timestamp}-${random}`)
  
  return providedChecksum === expectedChecksum
}

// Rate limiting for application endpoints
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, [])
    }
    
    const userRequests = this.requests.get(identifier)!
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => time > windowStart)
    
    if (validRequests.length >= this.maxRequests) {
      return false
    }
    
    // Add current request
    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    
    return true
  }
  
  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const windowStart = now - this.windowMs
    
    if (!this.requests.has(identifier)) {
      return this.maxRequests
    }
    
    const userRequests = this.requests.get(identifier)!
    const validRequests = userRequests.filter(time => time > windowStart)
    
    return Math.max(0, this.maxRequests - validRequests.length)
  }
}

// Security headers middleware
export function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
}

// Audit logging
export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  details?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}

export function createAuditLog(
  userId: string,
  action: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, any>
): AuditLog {
  return {
    id: crypto.randomUUID(),
    userId,
    action,
    resource,
    resourceId,
    details,
    timestamp: new Date()
  }
}

// Input validation and sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Authentication status check
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const token = localStorage.getItem('auth_token')
  const user = getCurrentUser()
  
  return !!(token && user)
}

// Role checking utilities
export function isRole(role: keyof typeof ROLES): boolean {
  const user = getCurrentUser()
  return user?.role === role
}

export function isSuperAdmin(): boolean {
  return isRole(ROLES.SUPER_ADMIN)
}

export function isOrgAdmin(): boolean {
  return isRole(ROLES.ORG_ADMIN)
}

export function isStaff(): boolean {
  return isRole(ROLES.STAFF)
}

export function isTrainee(): boolean {
  return isRole(ROLES.TRAINEE)
}