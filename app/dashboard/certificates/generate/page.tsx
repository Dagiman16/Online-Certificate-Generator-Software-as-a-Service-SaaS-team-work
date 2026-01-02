'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export default function GenerateCertificatePage() {
  const [formData, setFormData] = useState({
    trainingId: '',
    traineeId: '',
    templateId: '',
    customTitle: '',
    issueDate: new Date().toISOString().split('T')[0],
    completionDate: '',
    additionalNotes: ''
  })

  const [previewMode, setPreviewMode] = useState(false)

  // Mock data
  const trainings = [
    { id: 1, title: 'Web Development Fundamentals', duration: '3 months' },
    { id: 2, title: 'Data Science with Python', duration: '4 months' },
    { id: 3, title: 'Digital Marketing Essentials', duration: '2 months' }
  ]

  const trainees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', trainingId: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', trainingId: 2 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', trainingId: 1 }
  ]

  const templates = [
    { id: 1, name: 'Professional Blue', type: 'Premium', preview: '/templates/blue.jpg' },
    { id: 2, name: 'Modern Green', type: 'Premium', preview: '/templates/green.jpg' },
    { id: 3, name: 'Classic White', type: 'Free', preview: '/templates/white.jpg' },
    { id: 4, name: 'Elegant Gold', type: 'Premium', preview: '/templates/gold.jpg' }
  ]

  const selectedTraining = trainings.find(t => t.id === parseInt(formData.trainingId))
  const selectedTrainee = trainees.find(t => t.id === parseInt(formData.traineeId))
  const selectedTemplate = templates.find(t => t.id === parseInt(formData.templateId))

  const filteredTrainees = formData.trainingId 
    ? trainees.filter(t => t.trainingId === parseInt(formData.trainingId))
    : trainees

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Generating certificate:', formData)
    // Handle certificate generation
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/certificates" className="text-gray-400 hover:text-gray-600">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Generate Certificate</h1>
            <p className="text-gray-600">Create a new certificate for a trainee</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Training Selection */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <AcademicCapIcon className="h-5 w-5 text-primary-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Training Program</h2>
                </div>
                
                <div>
                  <label htmlFor="trainingId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Training *
                  </label>
                  <select
                    id="trainingId"
                    required
                    className="input-field"
                    value={formData.trainingId}
                    onChange={(e) => setFormData({...formData, trainingId: e.target.value, traineeId: ''})}
                  >
                    <option value="">Choose a training program</option>
                    {trainings.map((training) => (
                      <option key={training.id} value={training.id}>
                        {training.title} ({training.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Trainee Selection */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <UserIcon className="h-5 w-5 text-primary-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Trainee</h2>
                </div>
                
                <div>
                  <label htmlFor="traineeId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Trainee *
                  </label>
                  <select
                    id="traineeId"
                    required
                    className="input-field"
                    value={formData.traineeId}
                    onChange={(e) => setFormData({...formData, traineeId: e.target.value})}
                    disabled={!formData.trainingId}
                  >
                    <option value="">Choose a trainee</option>
                    {filteredTrainees.map((trainee) => (
                      <option key={trainee.id} value={trainee.id}>
                        {trainee.name} ({trainee.email})
                      </option>
                    ))}
                  </select>
                  {!formData.trainingId && (
                    <p className="text-sm text-gray-500 mt-1">Select a training program first</p>
                  )}
                </div>
              </div>

              {/* Template Selection */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-5 w-5 text-primary-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Certificate Template</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.templateId === template.id.toString()
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({...formData, templateId: template.id.toString()})}
                    >
                      <div className="aspect-w-16 aspect-h-12 bg-gray-100 rounded mb-2">
                        <div className="flex items-center justify-center text-gray-400">
                          <DocumentDuplicateIcon className="h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="font-medium text-sm">{template.name}</h3>
                      <p className={`text-xs ${template.type === 'Premium' ? 'text-primary-600' : 'text-gray-500'}`}>
                        {template.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Details */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <CalendarIcon className="h-5 w-5 text-primary-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Certificate Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Completion Date *
                    </label>
                    <input
                      type="date"
                      id="completionDate"
                      required
                      className="input-field"
                      value={formData.completionDate}
                      onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Date *
                    </label>
                    <input
                      type="date"
                      id="issueDate"
                      required
                      className="input-field"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Certificate Title (Optional)
                    </label>
                    <input
                      type="text"
                      id="customTitle"
                      className="input-field"
                      value={formData.customTitle}
                      onChange={(e) => setFormData({...formData, customTitle: e.target.value})}
                      placeholder="Leave blank to use default title"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="additionalNotes"
                      rows={3}
                      className="input-field"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                      placeholder="Any additional information for the certificate"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <Link href="/dashboard/certificates" className="btn-secondary">
                  Cancel
                </Link>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="btn-secondary"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    {previewMode ? 'Hide Preview' : 'Preview'}
                  </button>
                  <button type="submit" className="btn-primary">
                    Generate Certificate
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Preview/Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Certificate Summary</h3>
              
              {selectedTraining && selectedTrainee && selectedTemplate ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Training</p>
                    <p className="font-medium">{selectedTraining.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Trainee</p>
                    <p className="font-medium">{selectedTrainee.name}</p>
                    <p className="text-sm text-gray-500">{selectedTrainee.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Template</p>
                    <p className="font-medium">{selectedTemplate.name}</p>
                    <p className={`text-sm ${selectedTemplate.type === 'Premium' ? 'text-primary-600' : 'text-gray-500'}`}>
                      {selectedTemplate.type}
                    </p>
                  </div>
                  
                  {formData.completionDate && (
                    <div>
                      <p className="text-sm text-gray-600">Completion Date</p>
                      <p className="font-medium">{formData.completionDate}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-600">Issue Date</p>
                    <p className="font-medium">{formData.issueDate}</p>
                  </div>

                  {previewMode && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Certificate Preview</p>
                      <div className="aspect-w-16 aspect-h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                        <div className="text-center">
                          <DocumentDuplicateIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Certificate Preview</p>
                          <p className="text-xs text-gray-400">
                            {selectedTemplate.name} Template
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentDuplicateIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill in the form to see certificate summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}