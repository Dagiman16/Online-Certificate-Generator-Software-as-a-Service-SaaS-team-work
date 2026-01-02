'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  DocumentDuplicateIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  PhotoIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  SparklesIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  LockClosedIcon,
  GiftIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'

export default function GenerateCertificatePage() {
  // Organization status - this would come from context/API in real app
  const organizationStatus = 'approved' // 'pending', 'approved', 'suspended'
  const isApproved = organizationStatus === 'approved'
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    traineeId: '',
    traineeName: '',
    traineeEmail: '',
    trainingProgram: '',
    completionDate: '',
    templateId: '',
    customFields: {
      instructor: '',
      grade: '',
      duration: '',
      location: ''
    }
  })

  const [generatedCertificate, setGeneratedCertificate] = useState(null)

  const trainees = [
    { id: '1', name: 'John Doe', email: 'john.doe@email.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@email.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@email.com' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@email.com' }
  ]

  const trainingPrograms = [
    { id: '1', name: 'Web Development Fundamentals', duration: '40 hours' },
    { id: '2', name: 'Data Science with Python', duration: '60 hours' },
    { id: '3', name: 'Digital Marketing Essentials', duration: '30 hours' },
    { id: '4', name: 'Project Management Professional', duration: '50 hours' }
  ]

  const templates = [
    {
      id: '1',
      name: 'Professional Blue',
      type: 'free',
      price: 0,
      preview: '/templates/professional-blue.jpg',
      description: 'Clean and professional design with blue accents',
      watermark: 'Sample Certificate',
      isPurchased: true // Free templates are always available
    },
    {
      id: '2',
      name: 'Modern Green',
      type: 'free',
      price: 0,
      preview: '/templates/modern-green.jpg',
      description: 'Contemporary design with green color scheme',
      watermark: 'Demo Certificate',
      isPurchased: true // Free templates are always available
    },
    {
      id: '3',
      name: 'Classic Red',
      type: 'free',
      price: 0,
      preview: '/templates/classic-red.jpg',
      description: 'Traditional certificate design with red borders',
      watermark: 'Sample Certificate',
      isPurchased: true // Free templates are always available
    },
    {
      id: '4',
      name: 'Elegant Gold Premium',
      type: 'paid',
      price: 29.99,
      preview: '/templates/elegant-gold.jpg',
      description: 'Luxurious design with gold accents and premium features',
      watermark: null,
      isPurchased: true // Assume purchased for demo
    },
    {
      id: '5',
      name: 'Corporate Executive',
      type: 'paid',
      price: 39.99,
      preview: '/templates/corporate-executive.jpg',
      description: 'Executive-level certificate design for corporate training',
      watermark: null,
      isPurchased: false // Not purchased
    }
  ]

  const handleTraineeSelect = (trainee: any) => {
    setFormData({
      ...formData,
      traineeId: trainee.id,
      traineeName: trainee.name,
      traineeEmail: trainee.email
    })
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleGenerate = () => {
    // Simulate certificate generation
    const certificate = {
      id: `CERT-${Date.now()}`,
      ...formData,
      generatedAt: new Date().toISOString(),
      status: 'generated'
    }
    setGeneratedCertificate(certificate)
    setStep(5)
  }

  const handleDownload = () => {
    console.log('Downloading certificate...')
    // Implement download logic
  }

  const handlePreview = () => {
    console.log('Previewing certificate...')
    // Implement preview logic
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.traineeId && formData.traineeName
      case 2: return formData.trainingProgram && formData.completionDate
      case 3: return formData.templateId
      case 4: return true
      default: return false
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/org-admin/certificates" className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-secondary-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Generate Certificate</h1>
              <p className="text-secondary-600 mt-1">Create a new certificate for a trainee</p>
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

        {/* Progress Steps */}
        <div className="card">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: 'Select Trainee', icon: UserIcon },
              { number: 2, title: 'Training Details', icon: AcademicCapIcon },
              { number: 3, title: 'Choose Template', icon: PhotoIcon },
              { number: 4, title: 'Review & Generate', icon: DocumentDuplicateIcon },
              { number: 5, title: 'Complete', icon: CheckCircleIcon }
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= stepItem.number
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-secondary-300 text-secondary-400'
                }`}>
                  {step > stepItem.number ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <stepItem.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    step >= stepItem.number ? 'text-primary-600' : 'text-secondary-500'
                  }`}>
                    {stepItem.title}
                  </p>
                </div>
                {index < 4 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step > stepItem.number ? 'bg-primary-600' : 'bg-secondary-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {isApproved ? (
          <div className="card">
          {/* Step 1: Select Trainee */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-2">Select Trainee</h2>
                <p className="text-secondary-600">Choose the trainee who will receive this certificate</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainees.map((trainee) => (
                  <div
                    key={trainee.id}
                    onClick={() => handleTraineeSelect(trainee)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.traineeId === trainee.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900">{trainee.name}</h3>
                        <p className="text-sm text-secondary-600">{trainee.email}</p>
                      </div>
                      {formData.traineeId === trainee.id && (
                        <CheckCircleIcon className="h-5 w-5 text-primary-600 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm text-secondary-600 mb-3">Or add a new trainee:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Trainee Name"
                    value={formData.traineeName}
                    onChange={(e) => setFormData({...formData, traineeName: e.target.value, traineeId: 'new'})}
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Trainee Email"
                    value={formData.traineeEmail}
                    onChange={(e) => setFormData({...formData, traineeEmail: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Training Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-2">Training Details</h2>
                <p className="text-secondary-600">Provide information about the completed training</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Training Program *
                  </label>
                  <select
                    value={formData.trainingProgram}
                    onChange={(e) => setFormData({...formData, trainingProgram: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select a training program</option>
                    {trainingPrograms.map((program) => (
                      <option key={program.id} value={program.name}>
                        {program.name} ({program.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Completion Date *
                  </label>
                  <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={formData.customFields.instructor}
                    onChange={(e) => setFormData({
                      ...formData,
                      customFields: {...formData.customFields, instructor: e.target.value}
                    })}
                    placeholder="Instructor name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Grade/Score
                  </label>
                  <input
                    type="text"
                    value={formData.customFields.grade}
                    onChange={(e) => setFormData({
                      ...formData,
                      customFields: {...formData.customFields, grade: e.target.value}
                    })}
                    placeholder="e.g., A+, 95%, Pass"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.customFields.duration}
                    onChange={(e) => setFormData({
                      ...formData,
                      customFields: {...formData.customFields, duration: e.target.value}
                    })}
                    placeholder="e.g., 40 hours, 2 weeks"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.customFields.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      customFields: {...formData.customFields, location: e.target.value}
                    })}
                    placeholder="e.g., Online, New York"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Choose Template */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-2">Choose Template</h2>
                <p className="text-secondary-600">Select a certificate template design</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => template.isPurchased && setFormData({...formData, templateId: template.id})}
                    className={`border-2 rounded-xl transition-all relative ${
                      !template.isPurchased 
                        ? 'border-secondary-200 opacity-75 cursor-not-allowed'
                        : formData.templateId === template.id
                        ? 'border-primary-500 bg-primary-50 cursor-pointer'
                        : 'border-secondary-200 hover:border-primary-300 cursor-pointer'
                    }`}
                  >
                    {/* Template Preview */}
                    <div className="aspect-[4/3] bg-secondary-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      <PhotoIcon className="h-16 w-16 text-secondary-400" />
                      
                      {/* Free template watermark simulation */}
                      {template.type === 'free' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-500 text-white px-3 py-1 rounded transform rotate-45 opacity-75 text-sm font-medium">
                            {template.watermark}
                          </div>
                        </div>
                      )}
                      
                      {/* Lock overlay for unpurchased templates */}
                      {!template.isPurchased && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-center text-white">
                            <LockClosedIcon className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">Purchase Required</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-secondary-900">{template.name}</h3>
                          {template.type === 'free' ? (
                            <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full">
                              FREE
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                              ${template.price}
                            </span>
                          )}
                        </div>
                        {formData.templateId === template.id && template.isPurchased && (
                          <CheckCircleIcon className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">{template.description}</p>
                      
                      {/* Template features */}
                      <div className="space-y-2">
                        {template.type === 'free' ? (
                          <div className="text-xs text-secondary-500">
                            <p>• Includes watermark</p>
                            <p>• Fixed layout</p>
                            <p>• Basic customization</p>
                          </div>
                        ) : (
                          <div className="text-xs text-secondary-500">
                            <p>• No watermark</p>
                            <p>• Full customization</p>
                            <p>• Logo placement</p>
                            <p>• Premium fonts</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Purchase button for unpurchased templates */}
                      {!template.isPurchased && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Purchase template:', template.id)
                          }}
                          className="btn-primary w-full mt-3 text-sm"
                        >
                          <ShoppingCartIcon className="h-4 w-4 mr-2" />
                          Purchase ${template.price}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Template type information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <GiftIcon className="h-5 w-5 text-success-600 mr-2" />
                    <h4 className="font-medium text-success-900">Free Templates</h4>
                  </div>
                  <p className="text-sm text-success-800">
                    Include watermarks and are perfect for testing. Cannot be used for official certificates.
                  </p>
                </div>
                
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-primary-600 mr-2" />
                    <h4 className="font-medium text-primary-900">Premium Templates</h4>
                  </div>
                  <p className="text-sm text-primary-800">
                    No watermarks, full customization, and suitable for official certificate generation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Generate */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 mb-2">Review & Generate</h2>
                <p className="text-secondary-600">Review the certificate details before generating</p>
              </div>

              <div className="bg-secondary-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-secondary-900 mb-3">Trainee Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 text-secondary-400 mr-2" />
                        <span className="text-sm text-secondary-900">{formData.traineeName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-secondary-600">{formData.traineeEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-secondary-900 mb-3">Training Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-4 w-4 text-secondary-400 mr-2" />
                        <span className="text-sm text-secondary-900">{formData.trainingProgram}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-secondary-400 mr-2" />
                        <span className="text-sm text-secondary-900">{formData.completionDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-secondary-900 mb-3">Template</h3>
                    <div className="flex items-center">
                      <PhotoIcon className="h-4 w-4 text-secondary-400 mr-2" />
                      <span className="text-sm text-secondary-900">
                        {templates.find(t => t.id === formData.templateId)?.name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-secondary-900 mb-3">Additional Details</h3>
                    <div className="space-y-1">
                      {formData.customFields.instructor && (
                        <div className="text-sm text-secondary-600">Instructor: {formData.customFields.instructor}</div>
                      )}
                      {formData.customFields.grade && (
                        <div className="text-sm text-secondary-600">Grade: {formData.customFields.grade}</div>
                      )}
                      {formData.customFields.duration && (
                        <div className="text-sm text-secondary-600">Duration: {formData.customFields.duration}</div>
                      )}
                      {formData.customFields.location && (
                        <div className="text-sm text-secondary-600">Location: {formData.customFields.location}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={handleGenerate} className="btn-primary px-8">
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Generate Certificate
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {step === 5 && generatedCertificate && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircleIcon className="h-8 w-8 text-success-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">Certificate Generated Successfully!</h2>
                <p className="text-secondary-600">
                  Certificate ID: <span className="font-medium">{generatedCertificate.id}</span>
                </p>
              </div>

              <div className="bg-secondary-50 rounded-xl p-6 max-w-md mx-auto">
                <div className="aspect-[4/3] bg-white rounded-lg border-2 border-dashed border-secondary-300 flex items-center justify-center mb-4">
                  <DocumentDuplicateIcon className="h-16 w-16 text-secondary-400" />
                </div>
                <h3 className="font-medium text-secondary-900 mb-2">{formData.traineeName}</h3>
                <p className="text-sm text-secondary-600">{formData.trainingProgram}</p>
              </div>

              <div className="flex justify-center space-x-4">
                <button onClick={handlePreview} className="btn-secondary">
                  <EyeIcon className="h-5 w-5 mr-2" />
                  Preview
                </button>
                <button onClick={handleDownload} className="btn-primary">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Download PDF
                </button>
              </div>

              <div className="pt-4">
                <Link href="/org-admin/certificates" className="text-primary-600 hover:text-primary-700 font-medium">
                  View All Certificates →
                </Link>
              </div>
            </div>
          )}
        </div>
        ) : null}

        {/* Navigation */}
        {isApproved && step < 5 && (
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 4 ? 'Generate' : 'Next'}
            </button>
          </div>
        )}

        {!isApproved && (
          <div className="card">
            <div className="text-center py-12">
              <XMarkIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">Certificate Generation Unavailable</h3>
              <p className="text-secondary-600 mb-4">
                {organizationStatus === 'pending' 
                  ? 'Your organization must be approved before you can generate certificates.'
                  : 'Certificate generation is currently disabled for your organization.'
                }
              </p>
              <Link href="/org-admin/profile" className="btn-primary">
                View Organization Status
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}