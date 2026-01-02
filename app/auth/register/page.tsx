'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  DocumentTextIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreeTerms: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log('Registration attempt:', formData)
    // Redirect to onboarding after successful registration
    window.location.href = '/onboarding'
  }

  const passwordRequirements = [
    { text: '8+ characters', met: formData.password.length >= 8 },
    { text: 'Lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Number', met: /[0-9]/.test(formData.password) }
  ]

  return (
    <div className="min-h-screen gradient-bg">
      <div className="flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-8">
          {/* Back to home */}
          <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors">
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="font-medium">Back to home</span>
            </Link>
          </div>

          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <img src="/logo.jpg" alt="WDU Logo" className="w-12 h-12 rounded-xl mr-3 object-cover" />
              <h1 className="text-2xl font-bold text-secondary-900">WDU-Certify</h1>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                Create a free account
              </h2>
              <p className="text-secondary-600">
                Join over 2,000 organizations who regularly use WDU-Certify to automate their certificate issuing process.
              </p>
            </div>

            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary-700 mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-secondary-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      required
                      className="input-field pr-12"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create a strong password"
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
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-3 space-y-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircleIcon 
                            className={`h-4 w-4 mr-2 ${req.met ? 'text-success-500' : 'text-secondary-300'}`} 
                          />
                          <span className={req.met ? 'text-success-700' : 'text-secondary-500'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded mt-1"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                  />
                  <label htmlFor="agreeTerms" className="ml-3 block text-sm text-secondary-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full text-lg">
                  Sign Up for Free
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-secondary-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-secondary-500 font-medium">or</span>
                  </div>
                </div>

                <button className="mt-6 w-full flex items-center justify-center px-4 py-3 border border-secondary-300 rounded-xl shadow-sm bg-white text-sm font-medium text-secondary-700 hover:bg-secondary-50 transition-colors">
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-secondary-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Testimonial */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-accent-600 items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <div className="text-6xl mb-6 opacity-50">"</div>
            <blockquote className="text-2xl font-medium mb-8 leading-relaxed">
              The WDU-Certify tool is a fantastic option for anyone looking to automate their certification processes! The user experience is very clean and easy to use.
            </blockquote>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">ML</span>
              </div>
              <div>
                <div className="font-semibold text-lg">Madison Locke</div>
                <div className="text-primary-100">Marketing Specialist, Demand Generation</div>
                <div className="text-primary-200 text-sm">at Magnet Forensics</div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-primary-100 text-sm mb-4">
                WDU-Certify is used by over 2,000 organizations, institutions, and educators including:
              </p>
              <div className="flex items-center space-x-8 opacity-80">
                <div className="text-xs font-semibold">STANFORD</div>
                <div className="text-xs font-semibold">AMAZON</div>
                <div className="text-xs font-semibold">VOLVO</div>
                <div className="text-xs font-semibold">USC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}