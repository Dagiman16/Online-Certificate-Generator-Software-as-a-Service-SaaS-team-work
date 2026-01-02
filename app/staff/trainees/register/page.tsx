'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  UserPlusIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

export default function RegisterTraineePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    program: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const programs = [
    'Web Development Fundamentals',
    'Data Science with Python',
    'Digital Marketing Essentials',
    'Project Management Professional',
    'Cybersecurity Fundamentals',
    'Mobile App Development',
    'Cloud Computing Basics'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Registering trainee:', formData)
    setIsSubmitting(false)
    setShowSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        program: '',
        enrollmentDate: new Date().toISOString().split('T')[0],
        notes: ''
      })
    }, 3000)
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.program

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/staff/dashboard" className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-secondary-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Register Trainee</h1>
              <p className="text-secondary-600 mt-1">Add a new trainee to the system</p>
            </div>
          </div>
        </div>
        {/* Success Message */}
        {showSuccess && (
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mr-4">
                <CheckIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-success-900">Trainee Registered Successfully!</h3>
                <p className="text-success-700">The trainee has been added to the system and will receive a welcome email.</p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <UserPlusIcon className="h-6 w-6 mr-2 text-primary-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <EnvelopeIcon className="h-6 w-6 mr-2 text-primary-600" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="trainee@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Program Information */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                <AcademicCapIcon className="h-6 w-6 mr-2 text-primary-600" />
                Program Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Training Program *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a program</option>
                    {programs.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Enrollment Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                    <input
                      type="date"
                      name="enrollmentDate"
                      value={formData.enrollmentDate}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                placeholder="Any additional information about the trainee..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-secondary-200">
              <Link href="/staff/dashboard" className="btn-secondary">
                <XMarkIcon className="h-5 w-5 mr-2" />
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
                    Registering...
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                    Register Trainee
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}