'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import RoleBasedAccess from '../../../../components/RoleBasedAccess'
import Link from 'next/link'
import {
  DocumentDuplicateIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  EyeIcon,
  LockClosedIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function GenerateCertificatePage() {
  // Organization status - this would come from context/API in real app
  const organizationStatus = 'approved' // 'pending', 'approved', 'suspended'
  const isApproved = organizationStatus === 'approved'
  
  const [selectedTrainee, setSelectedTrainee] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    template: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    customText: '',
    grade: '',
    completionDate: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock trainee data - in real app, this would come from API
  const trainees = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      program: 'Web Development Fundamentals',
      enrollmentDate: '2024-01-15',
      status: 'active',
      progress: 100,
      completedCourses: 12,
      totalCourses: 12
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      program: 'Data Science with Python',
      enrollmentDate: '2024-01-10',
      status: 'completed',
      progress: 100,
      completedCourses: 16,
      totalCourses: 16
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      program: 'Digital Marketing Essentials',
      enrollmentDate: '2024-01-08',
      status: 'completed',
      progress: 100,
      completedCourses: 10,
      totalCourses: 10
    }
  ]

  const templates = [
    { id: 'professional-blue', name: 'Professional Blue', type: 'free', price: 0, watermark: 'Sample Certificate', isPurchased: true, preview: '/templates/professional-blue.jpg' },
    { id: 'modern-green', name: 'Modern Green', type: 'free', price: 0, watermark: 'Demo Certificate', isPurchased: true, preview: '/templates/modern-green.jpg' },
    { id: 'classic-red', name: 'Classic Red', type: 'free', price: 0, watermark: 'Sample Certificate', isPurchased: true, preview: '/templates/classic-red.jpg' },
    { id: 'elegant-gold', name: 'Elegant Gold Premium', type: 'paid', price: 29.99, watermark: null, isPurchased: true, preview: '/templates/elegant-gold.jpg' }
  ]

  const filteredTrainees = trainees.filter(trainee =>
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.program.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTrainee) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Generating certificate:', { trainee: selectedTrainee, ...formData })
    setIsSubmitting(false)
    setShowSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedTrainee(null)
      setFormData({
        template: '',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        customText: '',
        grade: '',
        completionDate: ''
      })
    }, 3000)
  }

  const isFormValid = selectedTrainee && formData.template && formData.issueDate

  return (
    <RoleBasedAccess requiredRole="staff" requireApprovedOrg={true}>
      <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/staff/dashboard" className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-secondary-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Generate Certificate</h1>
              <p className="text-secondary-600 mt-1">Create a certificate for a trainee</p>
            </div>
          </div>
        </div>
        
        {/* Organization Approval Status Check */}
        {!isApproved && (
          <div className="card bg-warning-50 border-warning-200">
            <div className="flex items-center">
              <XMarkIcon className="h-6 w-6 text-warning-600 mr-3" />
              <div>
                <h3 className="font-semibold text-warning-900">Certificate Generation Restricted</h3>
                <p className="text-warning-700">
                  {organizationStatus === 'pending' 
                    ? 'Your organization is pending approval. You cannot generate official certificates until approved.'
                    : 'Your organization has been suspended. Certificate generation is disabled.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mr-4">
                <CheckIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-success-900">Certificate Generated Successfully!</h3>
                <p className="text-success-700">The certificate has been created and sent to the trainee.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isApproved ? (
            <>
              {/* Trainee Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
              <UserIcon className="h-6 w-6 mr-2 text-primary-600" />
              Select Trainee
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Search trainees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Trainee List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTrainees.map((trainee) => (
                <div
                  key={trainee.id}
                  onClick={() => setSelectedTrainee(trainee)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTrainee?.id === trainee.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">
                          {trainee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900">{trainee.name}</h3>
                        <p className="text-sm text-secondary-600">{trainee.email}</p>
                        <p className="text-sm text-secondary-500">{trainee.program}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trainee.status === 'completed' 
                          ? 'text-success-700 bg-success-100'
                          : 'text-primary-700 bg-primary-100'
                      }`}>
                        {trainee.status}
                      </span>
                      <p className="text-sm text-secondary-500 mt-1">
                        {trainee.completedCourses}/{trainee.totalCourses} courses
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTrainees.length === 0 && (
              <div className="text-center py-8">
                <UserIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">No trainees found matching your search.</p>
              </div>
            )}
          </div>

          {/* Certificate Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
              <DocumentDuplicateIcon className="h-6 w-6 mr-2 text-primary-600" />
              Certificate Details
            </h2>

            {!selectedTrainee ? (
              <div className="text-center py-12">
                <DocumentDuplicateIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-600">Select a trainee to configure certificate details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selected Trainee Info */}
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <h3 className="font-medium text-primary-900 mb-2">Selected Trainee</h3>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {selectedTrainee.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-primary-900">{selectedTrainee.name}</p>
                      <p className="text-sm text-primary-700">{selectedTrainee.program}</p>
                    </div>
                  </div>
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Certificate Template *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        onClick={() => template.isPurchased && setFormData(prev => ({ ...prev, template: template.id }))}
                        className={`p-3 border rounded-lg transition-colors relative ${
                          !template.isPurchased 
                            ? 'border-secondary-200 opacity-75 cursor-not-allowed'
                            : formData.template === template.id
                            ? 'border-primary-500 bg-primary-50 cursor-pointer'
                            : 'border-secondary-200 hover:border-secondary-300 cursor-pointer'
                        }`}
                      >
                        <div className="aspect-video bg-secondary-100 rounded mb-2 flex items-center justify-center relative overflow-hidden">
                          <EyeIcon className="h-6 w-6 text-secondary-400" />
                          
                          {/* Free template watermark simulation */}
                          {template.type === 'free' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium transform rotate-45 opacity-75">
                                {template.watermark}
                              </div>
                            </div>
                          )}
                          
                          {/* Lock overlay for unpurchased templates */}
                          {!template.isPurchased && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <LockClosedIcon className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2 mb-1">
                            <p className="text-sm font-medium">{template.name}</p>
                            {template.type === 'free' ? (
                              <span className="px-1 py-0.5 bg-success-100 text-success-700 text-xs font-medium rounded">
                                FREE
                              </span>
                            ) : (
                              <span className="px-1 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                                ${template.price}
                              </span>
                            )}
                          </div>
                          
                          {template.type === 'free' && (
                            <p className="text-xs text-secondary-500">Includes watermark</p>
                          )}
                          
                          {!template.isPurchased && (
                            <p className="text-xs text-red-600 mt-1">Purchase required</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Template information */}
                  <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-warning-800">
                        <p className="font-medium mb-1">Template Information:</p>
                        <p>• Free templates include watermarks and are for demo purposes only</p>
                        <p>• Premium templates have no watermarks and can be used for official certificates</p>
                        <p>• Contact your administrator to purchase premium templates</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Issue Date *
                    </label>
                    <div className="relative">
                      <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleInputChange}
                        required
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Completion Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="date"
                        name="completionDate"
                        value={formData.completionDate}
                        onChange={handleInputChange}
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
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="e.g., A+, 95%, Pass"
                    />
                  </div>
                </div>

                {/* Custom Text */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Custom Text (Optional)
                  </label>
                  <textarea
                    name="customText"
                    value={formData.customText}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field"
                    placeholder="Additional text to include on the certificate..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-secondary-200">
                  <button
                    type="button"
                    onClick={() => setSelectedTrainee(null)}
                    className="btn-secondary"
                  >
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                        Generate Certificate
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
            </>
          ) : (
            <div className="lg:col-span-2">
              <div className="text-center py-12">
                <XMarkIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">Certificate Generation Unavailable</h3>
                <p className="text-secondary-600 mb-4">
                  {organizationStatus === 'pending' 
                    ? 'Your organization must be approved before you can generate certificates.'
                    : 'Certificate generation is currently disabled for your organization.'
                  }
                </p>
                <Link href="/staff/profile" className="btn-primary">
                  Contact Administrator
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
    </RoleBasedAccess>
  )
}