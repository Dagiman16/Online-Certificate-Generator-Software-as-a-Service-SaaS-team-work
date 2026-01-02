'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  BuildingOfficeIcon,
  UserIcon,
  AcademicCapIcon,
  ChartBarIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface OnboardingData {
  firstName: string
  lastName: string
  organizationName: string
  contactPerson: string
  phone: string
  address: string
  businessType: string
  credentialVolume: string
  credentialFrequency: string
  credentialPurpose: string[]
  mainObjective: string
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    organizationName: '',
    contactPerson: '',
    phone: '',
    address: '',
    businessType: '',
    credentialVolume: '',
    credentialFrequency: '',
    credentialPurpose: [],
    mainObjective: ''
  })

  const totalSteps = 7

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Redirect to dashboard
      window.location.href = '/dashboard'
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBusinessTypeSelect = (type: string) => {
    setFormData({ ...formData, businessType: type })
  }

  const handleCredentialPurposeToggle = (purpose: string) => {
    const currentPurposes = formData.credentialPurpose
    if (currentPurposes.includes(purpose)) {
      setFormData({
        ...formData,
        credentialPurpose: currentPurposes.filter(p => p !== purpose)
      })
    } else {
      setFormData({
        ...formData,
        credentialPurpose: [...currentPurposes, purpose]
      })
    }
  }

  const renderProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      <span className="text-sm text-secondary-600 mr-4">Step {currentStep} out of {totalSteps}</span>
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i + 1 <= currentStep ? 'bg-primary-600' : 'bg-secondary-200'
            }`}
          />
        ))}
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Tell us about yourself</h2>
              <p className="text-lg text-secondary-600">Let's start with some basic information</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="Your Organization"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Organization Contact Information</h2>
              <p className="text-lg text-secondary-600">Help us reach you when needed</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Contact Person Full Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Organization Address
                </label>
                <textarea
                  rows={3}
                  className="input-field"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, city, state, country"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">What is your type of organization?</h2>
              <p className="text-lg text-secondary-600">This helps us customize your experience</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                'Educational Institution',
                'Training Center',
                'Corporate',
                'Government',
                'Non-profit/NGO',
                'Association',
                'Healthcare',
                'Technology',
                'Other'
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessTypeSelect(type)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.businessType === type
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                  }`}
                >
                  <span className="font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">What will you use certificates for?</h2>
              <p className="text-lg text-secondary-600">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                'Course Completion',
                'Training Programs',
                'Professional Certification',
                'Event Attendance',
                'Achievement Recognition',
                'Continuing Education',
                'Compliance Training',
                'Skills Assessment',
                'Membership',
                'Conference Participation',
                'Workshop Completion',
                'Other'
              ].map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => handleCredentialPurposeToggle(purpose)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 relative ${
                    formData.credentialPurpose.includes(purpose)
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                  }`}
                >
                  {formData.credentialPurpose.includes(purpose) && (
                    <CheckIcon className="h-5 w-5 text-primary-600 absolute top-2 right-2" />
                  )}
                  <span className="font-medium">{purpose}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">How many certificates do you need per year?</h2>
              <p className="text-lg text-secondary-600">This helps us recommend the right plan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { value: 'less-than-100', label: 'Less than 100 certificates', desc: 'Perfect for small organizations' },
                { value: '100-1000', label: 'From 100 to 1,000 certificates', desc: 'Great for growing institutions' },
                { value: '1000-10000', label: 'From 1,000 to 10,000 certificates', desc: 'Ideal for large organizations' },
                { value: 'more-than-10000', label: 'More than 10,000 certificates', desc: 'Enterprise-level volume' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, credentialVolume: option.value })}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.credentialVolume === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                  }`}
                >
                  <div className="font-semibold text-lg mb-1">{option.label}</div>
                  <div className="text-sm opacity-75">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">How often do you need to issue certificates?</h2>
              <p className="text-lg text-secondary-600">Understanding your workflow helps us optimize your experience</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
              {[
                { value: 'occasionally', label: 'Just once or occasionally', desc: 'For special events or one-time programs' },
                { value: 'few-times-year', label: 'A couple of times per year', desc: 'Seasonal or quarterly programs' },
                { value: 'monthly', label: 'Every month or more often', desc: 'Regular ongoing programs' },
                { value: 'weekly', label: 'Weekly or daily', desc: 'High-frequency certificate issuance' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, credentialFrequency: option.value })}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.credentialFrequency === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                  }`}
                >
                  <div className="font-semibold text-lg mb-1">{option.label}</div>
                  <div className="text-sm opacity-75">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">What is your main objective?</h2>
              <p className="text-lg text-secondary-600">Help us understand your primary goal</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
              {[
                { 
                  value: 'save-time', 
                  label: 'Save time & automate certificate issuing process',
                  icon: ChartBarIcon,
                  desc: 'Streamline your workflow and reduce manual work'
                },
                { 
                  value: 'professional-look', 
                  label: 'Make my events look professional & memorable',
                  icon: SparklesIcon,
                  desc: 'Create impressive certificates that recipients will value'
                },
                { 
                  value: 'boost-marketing', 
                  label: 'Boost my marketing with the help of credentials',
                  icon: DocumentTextIcon,
                  desc: 'Increase visibility through shareable digital certificates'
                },
                { 
                  value: 'help-graduates', 
                  label: 'Help my graduates with employability',
                  icon: AcademicCapIcon,
                  desc: 'Provide verifiable credentials that enhance career prospects'
                }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, mainObjective: option.value })}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-200 flex items-start space-x-4 ${
                    formData.mainObjective === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    formData.mainObjective === option.value ? 'bg-primary-100' : 'bg-secondary-100'
                  }`}>
                    <option.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">{option.label}</div>
                    <div className="text-sm opacity-75">{option.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="flex items-center space-x-3">
                <img src="/logo.jpg" alt="WDU Logo" className="w-10 h-10 rounded-xl object-cover" />
                <h1 className="text-2xl font-bold text-secondary-900">WDU-Certify</h1>
              </Link>
              
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Back</span>
                </button>
              )}
            </div>

            {renderProgressBar()}
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-center mt-12">
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.organizationName)) ||
                  (currentStep === 2 && (!formData.contactPerson || !formData.phone || !formData.address)) ||
                  (currentStep === 3 && !formData.businessType) ||
                  (currentStep === 4 && formData.credentialPurpose.length === 0) ||
                  (currentStep === 5 && !formData.credentialVolume) ||
                  (currentStep === 6 && !formData.credentialFrequency) ||
                  (currentStep === 7 && !formData.mainObjective)
                }
                className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === totalSteps ? (
                  <>
                    Complete Setup
                    <CheckIcon className="h-5 w-5 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-accent-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="mb-8">
              <SparklesIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
              <h3 className="text-3xl font-bold mb-4">Help us tailor WDU-Certify to your needs</h3>
              <div className="flex items-center justify-center space-x-2 text-primary-100">
                <div className="w-2 h-2 bg-warning-400 rounded-full animate-pulse"></div>
                <span className="text-lg">You are just 30 seconds away from creating your first certificate!</span>
              </div>
            </div>
            
            {/* Certificate Mockups */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 opacity-80">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-3">
                  <div className="bg-white/20 h-24 rounded mb-2"></div>
                  <div className="bg-white/20 h-2 rounded mb-1"></div>
                  <div className="bg-white/20 h-2 rounded w-3/4"></div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-2">
                  <div className="bg-white/20 h-24 rounded mb-2"></div>
                  <div className="bg-white/20 h-2 rounded mb-1"></div>
                  <div className="bg-white/20 h-2 rounded w-2/3"></div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-1">
                  <div className="bg-white/20 h-24 rounded mb-2"></div>
                  <div className="bg-white/20 h-2 rounded mb-1"></div>
                  <div className="bg-white/20 h-2 rounded w-4/5"></div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-1">
                  <div className="bg-white/20 h-24 rounded mb-2"></div>
                  <div className="bg-white/20 h-2 rounded mb-1"></div>
                  <div className="bg-white/20 h-2 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}