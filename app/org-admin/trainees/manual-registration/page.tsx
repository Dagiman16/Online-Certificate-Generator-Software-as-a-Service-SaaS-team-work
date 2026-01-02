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
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function ManualRegistrationPage() {
  const [formData, setFormData] = useState({
    // Required fields as per specification
    fullName: '',
    courseName: '',
    completionDate: '',
    certificateIssueDate: '',
    
    // Additional fields for comprehensive registration
    email: '',
    phone: '',
    trainingTopic: '',
    enrollmentDate: '',
    grade: '',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available training topics and courses
  const trainingTopics = [
    'Frontend Development',
    'Data Analytics & ML',
    'Digital Marketing Strategy',
    'Project Management & Leadership',
    'Information Security',
    'Full-Stack Development',
    'Mobile App Development',
    'Cloud Computing',
    'DevOps & Automation'
  ]

  const courses = [
    'Web Development Fundamentals',
    'Data Science with Python',
    'Digital Marketing Essentials',
    'Project Management Professional',
    'Cybersecurity Fundamentals',
    'React Advanced Concepts',
    'Machine Learning Basics',
    'Social Media Marketing',
    'Agile Project Management',
    'Network Security'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.courseName) {
      newErrors.courseName = 'Course name is required'
    }

    if (!formData.completionDate) {
      newErrors.completionDate = 'Completion date is required'
    }

    if (!formData.certificateIssueDate) {
      newErrors.certificateIssueDate = 'Certificate issue date is required'
    }

    // Date validation
    if (formData.completionDate && formData.certificateIssueDate) {
      const completionDate = new Date(formData.completionDate)
      const issueDate = new Date(formData.certificateIssueDate)
      
      if (issueDate < completionDate) {
        newErrors.certificateIssueDate = 'Certificate issue date must be on or after completion date'
      }
    }

    if (formData.enrollmentDate && formData.completionDate) {
      const enrollmentDate = new Date(formData.enrollmentDate)
      const completionDate = new Date(formData.completionDate)
      
      if (completionDate < enrollmentDate) {
        newErrors.completionDate = 'Completion date must be after enrollment date'
      }
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
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
      
      console.log('Registering trainee manually:', formData)
      
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

  // Auto-set certificate issue date when completion date is selected
  const handleCompletionDateChange = (date: string) => {
    handleInputChange('completionDate', date)
    
    // Auto-set certificate issue date to next day if not already set
    if (!formData.certificateIssueDate && date) {
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      handleInputChange('certificateIssueDate', nextDay.toISOString().split('T')[0])
    }
  }

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
              <h1 className="text-3xl font-bold text-secondary-900">Manual Trainee Registration</h1>
              <p className="text-secondary-600 mt-1">Register individual trainees with completion details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Required Information */}
          <div className="card">
            <div className="flex items-center mb-6">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-secondary-900">Required Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`input-field pl-10 ${errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter trainee's full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Course Name *
                </label>
                <div className="relative">
                  <AcademicCapIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <select
                    value={formData.courseName}
                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                    className={`input-field pl-10 ${errors.courseName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">Select course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                {errors.courseName && (
                  <p className="mt-1 text-sm text-red-600">{errors.courseName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Training Topic
                </label>
                <select
                  value={formData.trainingTopic}
                  onChange={(e) => handleInputChange('trainingTopic', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select training topic</option>
                  {trainingTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Completion Date *
                </label>
                <div className="relative">
                  <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => handleCompletionDateChange(e.target.value)}
                    className={`input-field pl-10 ${errors.completionDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {errors.completionDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.completionDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Certificate Issue Date *
                </label>
                <div className="relative">
                  <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="date"
                    value={formData.certificateIssueDate}
                    onChange={(e) => handleInputChange('certificateIssueDate', e.target.value)}
                    className={`input-field pl-10 ${errors.certificateIssueDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {errors.certificateIssueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.certificateIssueDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Additional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`input-field pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="trainee@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Enrollment Date
                </label>
                <div className="relative">
                  <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="date"
                    value={formData.enrollmentDate}
                    onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Grade/Score
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="input-field"
                  placeholder="A+, 95%, Pass, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="Additional notes about the trainee or training completion"
                />
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
              <DocumentTextIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Manual Registration Guidelines</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• <strong>Required Fields:</strong> Full name, course name, completion date, and certificate issue date are mandatory</li>
                <li>• <strong>Date Validation:</strong> Certificate issue date must be on or after completion date</li>
                <li>• <strong>Training Topics:</strong> Select appropriate topic to organize trainees effectively</li>
                <li>• <strong>Bulk Operations:</strong> For multiple trainees, consider using the bulk import feature</li>
                <li>• <strong>Data Accuracy:</strong> Ensure all information is accurate as it will be used for certificate generation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}