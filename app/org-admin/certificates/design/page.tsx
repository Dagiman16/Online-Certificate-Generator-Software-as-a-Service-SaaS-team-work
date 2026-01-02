'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  PhotoIcon,
  SwatchIcon,
  PencilIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  DocumentTextIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  IdentificationIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export default function CertificateDesignPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('professional-blue')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [activeTab, setActiveTab] = useState('content')

  const [designConfig, setDesignConfig] = useState({
    // Content Configuration
    certificateTitle: 'Certificate of Completion',
    showTraineeName: true,
    traineeNameLabel: 'This is to certify that',
    showCourseName: true,
    courseNameLabel: 'has successfully completed',
    showDuration: true,
    durationLabel: 'Duration',
    showIssueDate: true,
    issueDateLabel: 'Date of Issue',
    showCompletionDate: true,
    completionDateLabel: 'Date of Completion',
    
    // Signature Configuration
    signatures: [
      { id: 1, name: 'Dr. Sarah Johnson', title: 'Director of Training', enabled: true },
      { id: 2, name: 'Mike Chen', title: 'Program Manager', enabled: false }
    ],
    
    // Organization Branding
    showLogo: true,
    logoPosition: 'top-center', // top-left, top-center, top-right
    showSeal: true,
    sealPosition: 'bottom-right',
    
    // Dynamic Fields
    dynamicFields: [
      { id: 1, name: 'Grade/Score', enabled: true, placeholder: 'A+' },
      { id: 2, name: 'Training Location', enabled: true, placeholder: 'New York, NY' },
      { id: 3, name: 'Instructor Name', enabled: false, placeholder: 'John Smith' },
      { id: 4, name: 'Certificate ID', enabled: true, placeholder: 'CERT-2024-001' }
    ],
    
    // Styling
    primaryColor: '#2563eb',
    secondaryColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'serif', // serif, sans-serif, script
    fontSize: 'medium' // small, medium, large
  })

  const templates = [
    { id: 'professional-blue', name: 'Professional Blue', type: 'free' },
    { id: 'modern-green', name: 'Modern Green', type: 'free' },
    { id: 'elegant-gold', name: 'Elegant Gold Premium', type: 'paid' }
  ]

  const fontFamilies = [
    { id: 'serif', name: 'Serif (Traditional)', example: 'Times New Roman' },
    { id: 'sans-serif', name: 'Sans-serif (Modern)', example: 'Arial' },
    { id: 'script', name: 'Script (Elegant)', example: 'Brush Script' }
  ]

  const handleConfigChange = (field: string, value: any) => {
    setDesignConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSignatureToggle = (signatureId: number) => {
    setDesignConfig(prev => ({
      ...prev,
      signatures: prev.signatures.map(sig => 
        sig.id === signatureId ? { ...sig, enabled: !sig.enabled } : sig
      )
    }))
  }

  const handleDynamicFieldToggle = (fieldId: number) => {
    setDesignConfig(prev => ({
      ...prev,
      dynamicFields: prev.dynamicFields.map(field => 
        field.id === fieldId ? { ...field, enabled: !field.enabled } : field
      )
    }))
  }

  const addDynamicField = () => {
    const newField = {
      id: Date.now(),
      name: 'New Field',
      enabled: true,
      placeholder: 'Enter value'
    }
    setDesignConfig(prev => ({
      ...prev,
      dynamicFields: [...prev.dynamicFields, newField]
    }))
  }

  const removeDynamicField = (fieldId: number) => {
    setDesignConfig(prev => ({
      ...prev,
      dynamicFields: prev.dynamicFields.filter(field => field.id !== fieldId)
    }))
  }

  const handleSaveDesign = () => {
    console.log('Saving certificate design:', designConfig)
    // Implement save logic
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
              <h1 className="text-3xl font-bold text-secondary-900">Certificate Design & Customization</h1>
              <p className="text-secondary-600 mt-1">Configure your certificate layout and content</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="btn-secondary"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </button>
            <button onClick={handleSaveDesign} className="btn-primary">
              <CheckIcon className="h-5 w-5 mr-2" />
              Save Design
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Template Selection</h2>
              <div className="grid grid-cols-3 gap-4">
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-secondary-100 rounded mb-2 flex items-center justify-center">
                      <PhotoIcon className="h-8 w-8 text-secondary-400" />
                    </div>
                    <p className="text-sm font-medium text-center">{template.name}</p>
                    <p className="text-xs text-center text-secondary-500 mt-1">
                      {template.type === 'free' ? 'Free' : 'Premium'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Tabs */}
            <div className="card">
              <div className="border-b border-secondary-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'content', name: 'Content', icon: DocumentTextIcon },
                    { id: 'signatures', name: 'Signatures', icon: IdentificationIcon },
                    { id: 'branding', name: 'Branding', icon: BuildingOfficeIcon },
                    { id: 'styling', name: 'Styling', icon: SwatchIcon }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Certificate Title
                    </label>
                    <input
                      type="text"
                      value={designConfig.certificateTitle}
                      onChange={(e) => handleConfigChange('certificateTitle', e.target.value)}
                      className="input-field"
                      placeholder="Certificate of Completion"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-secondary-900">Field Configuration</h3>
                    
                    {/* Trainee Name Field */}
                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 text-secondary-400 mr-2" />
                          <span className="font-medium text-secondary-900">Trainee Name Field</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.showTraineeName}
                            onChange={(e) => handleConfigChange('showTraineeName', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      {designConfig.showTraineeName && (
                        <input
                          type="text"
                          value={designConfig.traineeNameLabel}
                          onChange={(e) => handleConfigChange('traineeNameLabel', e.target.value)}
                          className="input-field"
                          placeholder="This is to certify that"
                        />
                      )}
                    </div>

                    {/* Course Name Field */}
                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-5 w-5 text-secondary-400 mr-2" />
                          <span className="font-medium text-secondary-900">Course/Training Name Field</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.showCourseName}
                            onChange={(e) => handleConfigChange('showCourseName', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      {designConfig.showCourseName && (
                        <input
                          type="text"
                          value={designConfig.courseNameLabel}
                          onChange={(e) => handleConfigChange('courseNameLabel', e.target.value)}
                          className="input-field"
                          placeholder="has successfully completed"
                        />
                      )}
                    </div>

                    {/* Duration Field */}
                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <ClockIcon className="h-5 w-5 text-secondary-400 mr-2" />
                          <span className="font-medium text-secondary-900">Duration Field</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.showDuration}
                            onChange={(e) => handleConfigChange('showDuration', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      {designConfig.showDuration && (
                        <input
                          type="text"
                          value={designConfig.durationLabel}
                          onChange={(e) => handleConfigChange('durationLabel', e.target.value)}
                          className="input-field"
                          placeholder="Duration"
                        />
                      )}
                    </div>

                    {/* Issue Date Field */}
                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 text-secondary-400 mr-2" />
                          <span className="font-medium text-secondary-900">Date of Issue Field</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.showIssueDate}
                            onChange={(e) => handleConfigChange('showIssueDate', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      {designConfig.showIssueDate && (
                        <input
                          type="text"
                          value={designConfig.issueDateLabel}
                          onChange={(e) => handleConfigChange('issueDateLabel', e.target.value)}
                          className="input-field"
                          placeholder="Date of Issue"
                        />
                      )}
                    </div>

                    {/* Completion Date Field */}
                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 text-secondary-400 mr-2" />
                          <span className="font-medium text-secondary-900">Date of Completion Field</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.showCompletionDate}
                            onChange={(e) => handleConfigChange('showCompletionDate', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      {designConfig.showCompletionDate && (
                        <input
                          type="text"
                          value={designConfig.completionDateLabel}
                          onChange={(e) => handleConfigChange('completionDateLabel', e.target.value)}
                          className="input-field"
                          placeholder="Date of Completion"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Signatures Tab */}
              {activeTab === 'signatures' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-secondary-900">Authorized Signatures</h3>
                    <button className="btn-secondary text-sm">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Signature
                    </button>
                  </div>

                  <div className="space-y-4">
                    {designConfig.signatures.map(signature => (
                      <div key={signature.id} className="p-4 border border-secondary-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-secondary-900">{signature.name}</h4>
                            <p className="text-sm text-secondary-600">{signature.title}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={signature.enabled}
                              onChange={() => handleSignatureToggle(signature.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                        {signature.enabled && (
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={signature.name}
                              className="input-field"
                              placeholder="Signature Name"
                            />
                            <input
                              type="text"
                              value={signature.title}
                              className="input-field"
                              placeholder="Title/Position"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="p-6 space-y-6">
                  {/* Organization Logo */}
                  <div className="p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <PhotoIcon className="h-5 w-5 text-secondary-400 mr-2" />
                        <span className="font-medium text-secondary-900">Organization Logo</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={designConfig.showLogo}
                          onChange={(e) => handleConfigChange('showLogo', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    {designConfig.showLogo && (
                      <div className="space-y-3">
                        <select
                          value={designConfig.logoPosition}
                          onChange={(e) => handleConfigChange('logoPosition', e.target.value)}
                          className="input-field"
                        >
                          <option value="top-left">Top Left</option>
                          <option value="top-center">Top Center</option>
                          <option value="top-right">Top Right</option>
                        </select>
                        <div className="p-4 border-2 border-dashed border-secondary-300 rounded-lg text-center">
                          <PhotoIcon className="h-12 w-12 text-secondary-400 mx-auto mb-2" />
                          <p className="text-sm text-secondary-600">Upload Organization Logo</p>
                          <button className="btn-secondary mt-2 text-sm">Choose File</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Organization Seal */}
                  <div className="p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-secondary-400 mr-2" />
                        <span className="font-medium text-secondary-900">Organization Seal</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={designConfig.showSeal}
                          onChange={(e) => handleConfigChange('showSeal', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    {designConfig.showSeal && (
                      <div className="space-y-3">
                        <select
                          value={designConfig.sealPosition}
                          onChange={(e) => handleConfigChange('sealPosition', e.target.value)}
                          className="input-field"
                        >
                          <option value="bottom-left">Bottom Left</option>
                          <option value="bottom-center">Bottom Center</option>
                          <option value="bottom-right">Bottom Right</option>
                        </select>
                        <div className="p-4 border-2 border-dashed border-secondary-300 rounded-lg text-center">
                          <BuildingOfficeIcon className="h-12 w-12 text-secondary-400 mx-auto mb-2" />
                          <p className="text-sm text-secondary-600">Upload Organization Seal</p>
                          <button className="btn-secondary mt-2 text-sm">Choose File</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Styling Tab */}
              {activeTab === 'styling' && (
                <div className="p-6 space-y-6">
                  {/* Colors */}
                  <div>
                    <h3 className="font-medium text-secondary-900 mb-4">Color Scheme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={designConfig.primaryColor}
                            onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                            className="w-12 h-10 border border-secondary-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={designConfig.primaryColor}
                            onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                            className="input-field flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Secondary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={designConfig.secondaryColor}
                            onChange={(e) => handleConfigChange('secondaryColor', e.target.value)}
                            className="w-12 h-10 border border-secondary-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={designConfig.secondaryColor}
                            onChange={(e) => handleConfigChange('secondaryColor', e.target.value)}
                            className="input-field flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Text Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={designConfig.textColor}
                            onChange={(e) => handleConfigChange('textColor', e.target.value)}
                            className="w-12 h-10 border border-secondary-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={designConfig.textColor}
                            onChange={(e) => handleConfigChange('textColor', e.target.value)}
                            className="input-field flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <h3 className="font-medium text-secondary-900 mb-4">Typography</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Font Family
                        </label>
                        <select
                          value={designConfig.fontFamily}
                          onChange={(e) => handleConfigChange('fontFamily', e.target.value)}
                          className="input-field"
                        >
                          {fontFamilies.map(font => (
                            <option key={font.id} value={font.id}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Font Size
                        </label>
                        <select
                          value={designConfig.fontSize}
                          onChange={(e) => handleConfigChange('fontSize', e.target.value)}
                          className="input-field"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Fields */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-secondary-900">Dynamic Fields (Auto-filled)</h2>
                <button onClick={addDynamicField} className="btn-secondary text-sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Field
                </button>
              </div>

              <div className="space-y-3">
                {designConfig.dynamicFields.map(field => (
                  <div key={field.id} className="flex items-center space-x-4 p-3 border border-secondary-200 rounded-lg">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={() => handleDynamicFieldToggle(field.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                    <input
                      type="text"
                      value={field.name}
                      className="input-field flex-1"
                      placeholder="Field Name"
                    />
                    <input
                      type="text"
                      value={field.placeholder}
                      className="input-field flex-1"
                      placeholder="Sample Value"
                    />
                    <button
                      onClick={() => removeDynamicField(field.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Live Preview</h2>
              
              {/* Certificate Preview */}
              <div className="aspect-[8.5/11] bg-white border-2 border-secondary-200 rounded-lg p-6 text-center relative overflow-hidden">
                {/* Background styling */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ backgroundColor: designConfig.primaryColor }}
                />
                
                {/* Logo */}
                {designConfig.showLogo && (
                  <div className={`absolute top-4 ${
                    designConfig.logoPosition === 'top-left' ? 'left-4' :
                    designConfig.logoPosition === 'top-center' ? 'left-1/2 transform -translate-x-1/2' :
                    'right-4'
                  }`}>
                    <div className="w-16 h-16 bg-secondary-200 rounded flex items-center justify-center">
                      <PhotoIcon className="h-8 w-8 text-secondary-400" />
                    </div>
                  </div>
                )}

                {/* Certificate Content */}
                <div className="relative z-10 h-full flex flex-col justify-center space-y-4">
                  <h1 
                    className="text-2xl font-bold"
                    style={{ 
                      color: designConfig.textColor,
                      fontFamily: designConfig.fontFamily === 'serif' ? 'serif' : 
                                 designConfig.fontFamily === 'sans-serif' ? 'sans-serif' : 'cursive'
                    }}
                  >
                    {designConfig.certificateTitle}
                  </h1>

                  {designConfig.showTraineeName && (
                    <div className="space-y-2">
                      <p className="text-sm" style={{ color: designConfig.textColor }}>
                        {designConfig.traineeNameLabel}
                      </p>
                      <p className="text-lg font-semibold border-b border-secondary-300 pb-1 mx-8">
                        John Doe
                      </p>
                    </div>
                  )}

                  {designConfig.showCourseName && (
                    <div className="space-y-2">
                      <p className="text-sm" style={{ color: designConfig.textColor }}>
                        {designConfig.courseNameLabel}
                      </p>
                      <p className="text-lg font-semibold">Web Development Fundamentals</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {designConfig.showDuration && (
                      <div>
                        <p className="font-medium">{designConfig.durationLabel}:</p>
                        <p>40 hours</p>
                      </div>
                    )}
                    {designConfig.showIssueDate && (
                      <div>
                        <p className="font-medium">{designConfig.issueDateLabel}:</p>
                        <p>Jan 22, 2024</p>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Fields Preview */}
                  {designConfig.dynamicFields.filter(f => f.enabled).length > 0 && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {designConfig.dynamicFields.filter(f => f.enabled).map(field => (
                        <div key={field.id}>
                          <p className="font-medium">{field.name}:</p>
                          <p>{field.placeholder}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Signatures */}
                  {designConfig.signatures.filter(s => s.enabled).length > 0 && (
                    <div className="flex justify-around mt-8">
                      {designConfig.signatures.filter(s => s.enabled).map(signature => (
                        <div key={signature.id} className="text-center">
                          <div className="border-b border-secondary-400 w-24 mb-1"></div>
                          <p className="text-xs font-medium">{signature.name}</p>
                          <p className="text-xs">{signature.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Seal */}
                {designConfig.showSeal && (
                  <div className={`absolute bottom-4 ${
                    designConfig.sealPosition === 'bottom-left' ? 'left-4' :
                    designConfig.sealPosition === 'bottom-center' ? 'left-1/2 transform -translate-x-1/2' :
                    'right-4'
                  }`}>
                    <div className="w-12 h-12 bg-secondary-200 rounded-full flex items-center justify-center">
                      <BuildingOfficeIcon className="h-6 w-6 text-secondary-400" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center">
                <button className="btn-primary w-full">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Full Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}