'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function RegisterTraineeForTrainingPage() {
  const [selectedTraining, setSelectedTraining] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    emergencyContact: '',
    emergencyPhone: '',
    education: '',
    experience: '',
    motivation: '',
    expectations: '',
    specialRequirements: '',
    agreeToTerms: false,
    allowMarketing: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available training programs
  const trainings = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      topic: 'Frontend Development',
      duration: '40 hours',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      location: 'New York Training Center',
      instructor: 'Dr. Sarah Johnson',
      price: 299,
      availableSpots: 15
    },
    {
      id: '2',
      title: 'Data Science with Python',
      topic: 'Data Analytics & ML',
      duration: '60 hours',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      location: 'Boston Data Lab',
      instructor: 'Prof. Mike Chen',
      price: 499,
      availableSpots: 8
    },
    {
      id: '3',
      title: 'Digital Marketing Essentials',
      topic: 'Digital Marketing Strategy',
      duration: '30 hours',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      location: 'Chicago Marketing Hub',
      instructor: 'Lisa Anderson',
      price: 199,
      availableSpots: 20
    }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedTraining) {
      newErrors.training = 'Please select a training program'
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Registering trainee for training:', {
        training: selectedTraining,
        trainee: formData
      })
      
      // Redirect to trainees list
      // router.push('/org-admin/trainees')
      
    } catch (error) {
      console.error('Error registering trainee:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const selectedTrainingDetails = trainings.find(t => t.id === selectedTraining)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/org-admin/trainees"
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Register Trainee for Training</h1>
              <p className="text-secondary-600 mt-1">Enroll a new trainee in a specific training program</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Training Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Select Training Program</h2>
            
            <div className="space-y-4">
              {trainings.map((training) => (
                <div
                  key={training.id}
                  onClick={() => setSelectedTraining(training.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTraining === training.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900">{training.title}</h3>
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {training.availableSpots} spots left
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-secondary-600">
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-4 w-4 mr-2 text-secondary-400" />
                          <span>{training.topic}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-secondary-400" />
                          <span>{training.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 text-secondary-400" />
                          <span>{training.location}</span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-secondary-400" />
                          <span>{training.instructor}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-secondary-600">
                        <span className="font-medium">Duration:</span> {training.startDate} - {training.endDate}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-secondary-900">${training.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {errors.training && (
              <p className="mt-2 text-sm text-red-600">{errors.training}</p>
            )}
          </div>

          {/* Selected Training Details */}
          {selectedTrainingDetails && (
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="font-semibold text-primary-900 mb-3">Selected Training Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-primary-800">Program:</span>
                  <span className="ml-2 text-primary-700">{selectedTrainingDetails.title}</span>
                </div>
                <div>
                  <span className="font-medium text-primary-800">Price:</span>
                  <span className="ml-2 text-primary-700">${selectedTrainingDetails.price}</span>
                </div>
                <div>
                  <span className="font-medium text-primary-800">Duration:</span>
                  <span className="ml-2 text-primary-700">{selectedTrainingDetails.duration}</span>
                </div>
                <div>
                  <span className="font-medium text-primary-800">Location:</span>
                  <span className="ml-2 text-primary-700">{selectedTrainingDetails.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`input-field pl-10 ${errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`input-field pl-10 ${errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`input-field pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <PhoneIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`input-field pl-10 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="input-field"
                  placeholder="Emergency contact name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="input-field"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="input-field"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="input-field"
                  placeholder="State or Province"
                />
              </div>
            </div>
          </div>

          {/* Background Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Background Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Educational Background
                </label>
                <textarea
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="Describe your educational background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="Describe any relevant work or project experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Motivation for Training
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="Why are you interested in this training program?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Learning Expectations
                </label>
                <textarea
                  value={formData.expectations}
                  onChange={(e) => handleInputChange('expectations', e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="What do you hope to achieve from this training?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Special Requirements or Accommodations
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  rows={2}
                  className="input-field"
                  placeholder="Any special requirements or accommodations needed"
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Terms and Conditions</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-secondary-700">
                  I agree to the <Link href="/terms" className="text-primary-600 hover:text-primary-500">terms and conditions</Link> and 
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-500 ml-1">privacy policy</Link> *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
              )}

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="allowMarketing"
                  checked={formData.allowMarketing}
                  onChange={(e) => handleInputChange('allowMarketing', e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <label htmlFor="allowMarketing" className="text-sm text-secondary-700">
                  I would like to receive updates about future training programs and events
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-secondary-200">
            <Link href="/org-admin/trainees" className="btn-secondary">
              <XMarkIcon className="h-5 w-5 mr-2" />
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Registering...
                </>
              ) : (
                <>
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Register Trainee
                </>
              )}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Registration Guidelines</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Ensure all required fields are completed accurately</li>
                <li>• Verify training program details before registration</li>
                <li>• Check available spots and enrollment deadlines</li>
                <li>• Provide emergency contact information for safety</li>
                <li>• Review payment and cancellation policies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}