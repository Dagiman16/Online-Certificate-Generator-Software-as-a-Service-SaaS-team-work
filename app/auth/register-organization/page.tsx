'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BuildingOfficeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PhotoIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default function RegisterOrganizationPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPersonName: '',
    contactPersonTitle: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    website: '',
    description: '',
    organizationType: '',
    logo: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const organizationTypes = [
    'Educational Institution',
    'Training Center',
    'Corporate Training',
    'Professional Association',
    'Government Agency',
    'Non-Profit Organization',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Registering organization:', formData)
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const isFormValid = formData.organizationName && 
                     formData.contactPersonName && 
                     formData.email && 
                     formData.phone && 
                     formData.organizationType

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-8 w-8 text-success-600" />
            </div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">Registration Submitted!</h2>
            <p className="text-secondary-600 mb-6">
              Your organization registration has been submitted successfully. 
              You will receive an email confirmation shortly.
            </p>
            
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mt-0.5 mr-3" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-warning-900">Pending Approval</h3>
                  <p className="text-sm text-warning-700 mt-1">
                    Your organization is now pending approval. Our team will review your application 
                    and notify you within 2-3 business days. You cannot issue official certificates 
                    until your organization is approved.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/auth/login" className="btn-primary w-full">
                Sign In to Your Account
              </Link>
              <Link href="/" className="btn-secondary w-full">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">Register Your Organization</h1>
          <p className="text-secondary-600 mt-2">
            Join our platform to start issuing verified certificates to your trainees
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Information */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <BuildingOfficeIcon className="h-6 w-6 mr-2 text-primary-600" />
                Organization Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Organization Type *
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select organization type</option>
                    {organizationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://www.example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Organization Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field"
                    placeholder="Brief description of your organization and training programs..."
                  />
                </div>
              </div>
            </div>
            {/* Contact Person */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <UserIcon className="h-6 w-6 mr-2 text-primary-600" />
                Contact Person
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter contact person's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Training Director, CEO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field pl-10"
                      placeholder="contact@organization.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <PhoneIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-field pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <MapPinIcon className="h-6 w-6 mr-2 text-primary-600" />
                Organization Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter state or province"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter ZIP or postal code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <PhotoIcon className="h-6 w-6 mr-2 text-primary-600" />
                Organization Logo
              </h2>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-24 h-24 object-cover rounded-lg border border-secondary-200"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-secondary-100 rounded-lg border border-secondary-200 flex items-center justify-center">
                      <PhotoIcon className="h-8 w-8 text-secondary-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Upload Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="input-field"
                  />
                  <p className="text-xs text-secondary-500 mt-1">
                    Recommended: Square image, minimum 200x200px, max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="border-t border-secondary-200 pt-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-primary-900 mb-2">Important Information</h3>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• Your organization will be reviewed within 2-3 business days</li>
                  <li>• You cannot issue official certificates until approved</li>
                  <li>• All information provided must be accurate and verifiable</li>
                  <li>• You will receive email notifications about your application status</li>
                </ul>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-secondary-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <Link href="/" className="btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                      Register Organization
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}