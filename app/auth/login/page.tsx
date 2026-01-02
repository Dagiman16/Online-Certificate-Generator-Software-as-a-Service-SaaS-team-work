'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { setCurrentUser } from '../../../lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: 'admin@wdu-certify.com', // Pre-filled for demo
    password: 'SuperAdmin123!', // Pre-filled for demo
    remember: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Mock authentication - replace with your authentication logic
      const mockUsers = {
        'admin@wdu-certify.com': { 
          id: 1, 
          email: 'admin@wdu-certify.com', 
          name: 'Super Administrator', 
          role: 'super-admin',
          password: 'SuperAdmin123!'
        },
        'admin@techcorp.edu': { 
          id: 2, 
          email: 'admin@techcorp.edu', 
          name: 'Organization Admin', 
          role: 'org-admin',
          password: 'password123'
        },
        'staff@techcorp.edu': { 
          id: 3, 
          email: 'staff@techcorp.edu', 
          name: 'Staff Member', 
          role: 'staff',
          password: 'password123'
        }
      }

      const user = mockUsers[formData.email as keyof typeof mockUsers]
      
      if (user && user.password === formData.password) {
        // Store user data in localStorage
        setCurrentUser(user)
        
        // Redirect based on role
        switch (user.role) {
          case 'super-admin':
            router.push('/super-admin/dashboard')
            break
          case 'org-admin':
            router.push('/org-admin/dashboard')
            break
          case 'staff':
            router.push('/staff/dashboard')
            break
          case 'trainee':
            router.push('/dashboard')
            break
          default:
            router.push('/dashboard')
        }
      } else {
        setError('Invalid email or password. Please check your credentials.')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to home */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors">
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logo.jpg" alt="WDU Logo" className="w-16 h-16 rounded-2xl shadow-large object-cover" />
        </div>
        <h2 className="mt-6 text-center text-4xl font-bold text-secondary-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-lg text-secondary-600">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-secondary-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="input-field pr-12"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <div className="text-sm text-red-800">{error}</div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  checked={formData.remember}
                  onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-secondary-500 font-medium">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/auth/register-organization" className="btn-secondary w-full text-center block text-lg">
                Create organization account
              </Link>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">🚀 Demo Credentials</h3>
            <div className="text-xs text-blue-800 space-y-1">
              <div><strong>Super Admin:</strong> admin@wdu-certify.com / SuperAdmin123!</div>
              <div><strong>Org Admin:</strong> admin@techcorp.edu / password123</div>
              <div><strong>Staff:</strong> staff@techcorp.edu / password123</div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary-500 mb-4">Trusted by organizations worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-xs font-semibold text-secondary-400">SECURE</div>
            <div className="text-xs font-semibold text-secondary-400">ENCRYPTED</div>
            <div className="text-xs font-semibold text-secondary-400">GDPR COMPLIANT</div>
          </div>
        </div>
      </div>
    </div>
  )
}