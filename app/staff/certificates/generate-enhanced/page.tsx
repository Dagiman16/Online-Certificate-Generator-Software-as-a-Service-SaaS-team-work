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
  PhotoIcon,
  CheckCircleIcon,
  XMarkIcon,
  SparklesIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  IdentificationIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

interface Trainee {
  id: string
  name: string
  email: string
  program: string
  trainingTopic: string
  completionDate: string
  grade?: string
  status: 'completed' | 'active' | 'inactive'
}

interface GeneratedCertificate {
  id: string
  certificateId: string
  traineeName: string
  traineeEmail: string
  program: string
  completionDate: string
  issueDate: string
  qrCode: string
  pdfUrl: string
  status: 'generated' | 'sent' | 'downloaded'
}

export default function StaffCertificateGenerationPage() {
  const [generationMode, setGenerationMode] = useState<'single' | 'bulk'>('single')
  const [step, setStep] = useState(1)
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCertificates, setGeneratedCertificates] = useState<GeneratedCertificate[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  
  const [singleFormData, setSingleFormData] = useState({
    traineeId: '',
    traineeName: '',
    traineeEmail: '',
    trainingProgram: '',
    trainingTopic: '',
    completionDate: '',
    issueDate: new Date().toISOString().split('T')[0],
    templateId: 'professional-blue',
    customFields: {
      instructor: '',
      grade: '',
      duration: '',
      location: ''
    }
  })

  // Mock data - staff has limited access to trainees they manage
  const trainees: Trainee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      program: 'Web Development Fundamentals',
      trainingTopic: 'Frontend Development',
      completionDate: '2024-02-15',
      grade: 'A+',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      program: 'Data Science with Python',
      trainingTopic: 'Data Analytics & ML',
      completionDate: '2024-02-20',
      grade: 'B+',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      program: 'Digital Marketing Essentials',
      trainingTopic: 'Digital Marketing Strategy',
      completionDate: '2024-02-25',
      grade: 'A-',
      status: 'completed'
    }
  ]

  const templates = [
    { id: 'professional-blue', name: 'Professional Blue', type: 'free' },
    { id: 'modern-green', name: 'Modern Green', type: 'free' },
    { id: 'elegant-gold', name: 'Elegant Gold Premium', type: 'paid' }
  ]

  const filteredTrainees = trainees.filter(trainee => 
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.program.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const generateCertificateId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `CERT-${timestamp}-${random}`
  }

  const generateQRCode = (certificateId: string) => {
    return `https://verify.yourorg.com/certificate/${certificateId}`
  }

  const handleTraineeSelect = (traineeId: string) => {
    setSelectedTrainees(prev => 
      prev.includes(traineeId) 
        ? prev.filter(id => id !== traineeId)
        : [...prev, traineeId]
    )
  }

  const handleSelectAll = () => {
    setSelectedTrainees(
      selectedTrainees.length === filteredTrainees.length 
        ? [] 
        : filteredTrainees.map(t => t.id)
    )
  }

  const handleSingleGeneration = async () => {
    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const certificateId = generateCertificateId()
      const qrCode = generateQRCode(certificateId)
      
      const certificate: GeneratedCertificate = {
        id: Date.now().toString(),
        certificateId,
        traineeName: singleFormData.traineeName,
        traineeEmail: singleFormData.traineeEmail,
        program: singleFormData.trainingProgram,
        completionDate: singleFormData.completionDate,
        issueDate: singleFormData.issueDate,
        qrCode,
        pdfUrl: `/certificates/${certificateId}.pdf`,
        status: 'generated'
      }
      
      setGeneratedCertificates([certificate])
      setStep(3)
      
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBulkGeneration = async () => {
    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const certificates: GeneratedCertificate[] = selectedTrainees.map(traineeId => {
        const trainee = trainees.find(t => t.id === traineeId)!
        const certificateId = generateCertificateId()
        const qrCode = generateQRCode(certificateId)
        
        return {
          id: Date.now().toString() + traineeId,
          certificateId,
          traineeName: trainee.name,
          traineeEmail: trainee.email,
          program: trainee.program,
          completionDate: trainee.completionDate,
          issueDate: new Date().toISOString().split('T')[0],
          qrCode,
          pdfUrl: `/certificates/${certificateId}.pdf`,
          status: 'generated'
        }
      })
      
      setGeneratedCertificates(certificates)
      setStep(3)
      
    } catch (error) {
      console.error('Error generating certificates:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadPDF = (certificate: GeneratedCertificate) => {
    console.log('Downloading PDF for certificate:', certificate.certificateId)
    const link = document.createElement('a')
    link.href = certificate.pdfUrl
    link.download = `certificate-${certificate.certificateId}.pdf`
    link.click()
  }

  const handleBulkDownload = () => {
    console.log('Downloading bulk certificates as ZIP')
    generatedCertificates.forEach(cert => {
      setTimeout(() => handleDownloadPDF(cert), 100)
    })
  }

  const resetGeneration = () => {
    setStep(1)
    setSelectedTrainees([])
    setGeneratedCertificates([])
    setSingleFormData({
      traineeId: '',
      traineeName: '',
      traineeEmail: '',
      trainingProgram: '',
      trainingTopic: '',
      completionDate: '',
      issueDate: new Date().toISOString().split('T')[0],
      templateId: 'professional-blue',
      customFields: {
        instructor: '',
        grade: '',
        duration: '',
        location: ''
      }
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/staff/certificates"
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Generate Certificates</h1>
              <p className="text-secondary-600 mt-1">Create certificates for your trainees with unique IDs and QR codes</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                {step > 1 ? <CheckIcon className="h-5 w-5" /> : <span className="text-sm font-medium">1</span>}
              </div>
              <span className="ml-2 font-medium">Select Trainees</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary-300' : 'bg-secondary-200'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                {step > 2 ? <CheckIcon className="h-5 w-5" /> : <span className="text-sm font-medium">2</span>}
              </div>
              <span className="ml-2 font-medium">Generate</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-primary-300' : 'bg-secondary-200'}`}></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-success-600' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-success-100' : 'bg-secondary-100'}`}>
                {step >= 3 ? <CheckIcon className="h-5 w-5" /> : <span className="text-sm font-medium">3</span>}
              </div>
              <span className="ml-2 font-medium">Download</span>
            </div>
          </div>
        </div>

        {/* Step 1: Mode Selection & Trainee Selection */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Generation Mode */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Select Generation Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() => setGenerationMode('single')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    generationMode === 'single'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <DocumentDuplicateIcon className="h-8 w-8 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold text-secondary-900">Single Certificate</h3>
                  </div>
                  <p className="text-secondary-600 mb-4">Generate one certificate for a specific trainee</p>
                  <ul className="text-sm text-secondary-500 space-y-1">
                    <li>• Individual trainee selection</li>
                    <li>• Custom field configuration</li>
                    <li>• Immediate generation</li>
                  </ul>
                </div>

                <div
                  onClick={() => setGenerationMode('bulk')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    generationMode === 'bulk'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <UserGroupIcon className="h-8 w-8 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold text-secondary-900">Bulk Certificates</h3>
                  </div>
                  <p className="text-secondary-600 mb-4">Generate multiple certificates at once</p>
                  <ul className="text-sm text-secondary-500 space-y-1">
                    <li>• Multiple trainee selection</li>
                    <li>• Batch processing</li>
                    <li>• ZIP download option</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Single Certificate Form */}
            {generationMode === 'single' && (
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">Single Certificate Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Select Trainee
                    </label>
                    <select
                      value={singleFormData.traineeId}
                      onChange={(e) => {
                        const trainee = trainees.find(t => t.id === e.target.value)
                        setSingleFormData(prev => ({
                          ...prev,
                          traineeId: e.target.value,
                          traineeName: trainee?.name || '',
                          traineeEmail: trainee?.email || '',
                          trainingProgram: trainee?.program || '',
                          trainingTopic: trainee?.trainingTopic || '',
                          completionDate: trainee?.completionDate || '',
                          customFields: {
                            ...prev.customFields,
                            grade: trainee?.grade || ''
                          }
                        }))
                      }}
                      className="input-field"
                    >
                      <option value="">Select a trainee</option>
                      {trainees.filter(t => t.status === 'completed').map(trainee => (
                        <option key={trainee.id} value={trainee.id}>
                          {trainee.name} - {trainee.program}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      value={singleFormData.issueDate}
                      onChange={(e) => setSingleFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Trainee Name
                    </label>
                    <input
                      type="text"
                      value={singleFormData.traineeName}
                      onChange={(e) => setSingleFormData(prev => ({ ...prev, traineeName: e.target.value }))}
                      className="input-field"
                      placeholder="Enter trainee name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={singleFormData.traineeEmail}
                      onChange={(e) => setSingleFormData(prev => ({ ...prev, traineeEmail: e.target.value }))}
                      className="input-field"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Training Program
                    </label>
                    <input
                      type="text"
                      value={singleFormData.trainingProgram}
                      onChange={(e) => setSingleFormData(prev => ({ ...prev, trainingProgram: e.target.value }))}
                      className="input-field"
                      placeholder="Enter training program"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={singleFormData.completionDate}
                      onChange={(e) => setSingleFormData(prev => ({ ...prev, completionDate: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Certificate Selection */}
            {generationMode === 'bulk' && (
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">Select Trainees for Bulk Generation</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search trainees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Selection Summary */}
                {selectedTrainees.length > 0 && (
                  <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-700 font-medium">
                        {selectedTrainees.length} trainee{selectedTrainees.length > 1 ? 's' : ''} selected
                      </span>
                      <button
                        onClick={() => setSelectedTrainees([])}
                        className="text-primary-600 hover:text-primary-800 text-sm"
                      >
                        Clear selection
                      </button>
                    </div>
                  </div>
                )}

                {/* Trainees Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-secondary-200">
                    <thead className="bg-secondary-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedTrainees.length === filteredTrainees.length && filteredTrainees.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Trainee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Program
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Completion Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                      {filteredTrainees.map((trainee) => (
                        <tr key={trainee.id} className="hover:bg-secondary-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedTrainees.includes(trainee.id)}
                              onChange={() => handleTraineeSelect(trainee.id)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                <UserIcon className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-secondary-900">{trainee.name}</div>
                                <div className="text-sm text-secondary-500">{trainee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-secondary-900">{trainee.program}</div>
                            <div className="text-sm text-secondary-500">{trainee.trainingTopic}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {trainee.completionDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {trainee.grade || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Next Step Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={
                  (generationMode === 'single' && !singleFormData.traineeId) ||
                  (generationMode === 'bulk' && selectedTrainees.length === 0)
                }
                className="btn-primary"
              >
                Continue to Generation
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Template Selection & Generation */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Select Certificate Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSingleFormData(prev => ({ ...prev, templateId: template.id }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      singleFormData.templateId === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-secondary-100 rounded mb-3 flex items-center justify-center">
                      <PhotoIcon className="h-12 w-12 text-secondary-400" />
                    </div>
                    <h3 className="font-medium text-secondary-900 mb-1">{template.name}</h3>
                    <p className="text-xs text-secondary-500">
                      {template.type === 'free' ? 'Free Template' : 'Premium Template'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Generation Summary */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Generation Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                    <UserIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Certificates to Generate</p>
                    <p className="text-lg font-bold text-secondary-900">
                      {generationMode === 'single' ? 1 : selectedTrainees.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                    <PhotoIcon className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Template</p>
                    <p className="text-lg font-bold text-secondary-900">
                      {templates.find(t => t.id === singleFormData.templateId)?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Back to Selection
              </button>
              <button
                onClick={generationMode === 'single' ? handleSingleGeneration : handleBulkGeneration}
                disabled={isGenerating}
                className="btn-primary"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Generate {generationMode === 'single' ? 'Certificate' : `${selectedTrainees.length} Certificates`}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Generated Certificates */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-success-600" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                Certificates Generated Successfully!
              </h2>
              <p className="text-secondary-600 mb-6">
                {generatedCertificates.length} certificate{generatedCertificates.length > 1 ? 's have' : ' has'} been generated.
              </p>
              
              {/* Bulk Actions */}
              {generatedCertificates.length > 1 && (
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={handleBulkDownload}
                    className="btn-primary"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download All PDFs
                  </button>
                </div>
              )}
            </div>

            {/* Generated Certificates List */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Generated Certificates</h2>
              <div className="space-y-4">
                {generatedCertificates.map((certificate) => (
                  <div key={certificate.id} className="p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <DocumentDuplicateIcon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-secondary-900">{certificate.traineeName}</h3>
                            <p className="text-sm text-secondary-600">{certificate.traineeEmail}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-secondary-700">Certificate ID:</span>
                            <p className="text-secondary-900 font-mono">{certificate.certificateId}</p>
                          </div>
                          <div>
                            <span className="font-medium text-secondary-700">Program:</span>
                            <p className="text-secondary-900">{certificate.program}</p>
                          </div>
                          <div>
                            <span className="font-medium text-secondary-700">Issue Date:</span>
                            <p className="text-secondary-900">{certificate.issueDate}</p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center text-sm text-secondary-600">
                          <QrCodeIcon className="h-4 w-4 mr-1" />
                          <span>QR Code: {certificate.qrCode}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleDownloadPDF(certificate)}
                          className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="p-2 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="p-2 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 rounded-lg transition-colors"
                          title="Print"
                        >
                          <PrinterIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={resetGeneration}
                className="btn-secondary"
              >
                Generate More Certificates
              </button>
              <Link href="/staff/certificates" className="btn-primary">
                View All Certificates
              </Link>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Certificate Generation Features</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• <strong>Unique Certificate IDs:</strong> Each certificate gets a unique identifier</li>
                <li>• <strong>QR Code Verification:</strong> Generated for easy authenticity checking</li>
                <li>• <strong>High-Resolution PDFs:</strong> Printable, professional quality</li>
                <li>• <strong>Bulk Processing:</strong> Generate multiple certificates efficiently</li>
                <li>• <strong>Issue Timestamps:</strong> Automatic date and time recording</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}