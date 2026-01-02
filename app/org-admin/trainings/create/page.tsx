'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  TrashIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function CreateTrainingPage() {
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Beginner',
    duration: '',
    price: '',
    maxParticipants: '',
    instructor: '',
    topic: '',
    location: '',
    trainers: [''],
    startDate: '',
    endDate: '',
    enrollmentDeadline: '',
    prerequisites: '',
    objectives: [''],
    modules: [{ title: '', description: '', duration: '' }],
    materials: [''],
    assessmentType: 'quiz',
    passingScore: '70',
    certificateTemplate: '',
    tags: [''],
    isPublic: true,
    allowSelfEnrollment: true,
    sendReminders: true
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'Technology',
    'Data Science',
    'Marketing',
    'Management',
    'Security',
    'Design',
    'Finance',
    'Human Resources',
    'Operations',
    'Sales'
  ]

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']
  const assessmentTypes = ['quiz', 'assignment', 'project', 'exam', 'none']

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Training title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required'
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor is required'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'End date must be after start date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateBasicInfo()) {
      setActiveTab('basic')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Creating training:', formData)
      
      // Redirect to trainings list
      // router.push('/org-admin/trainings')
      
    } catch (error) {
      console.error('Error creating training:', error)
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

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...(formData[field as keyof typeof formData] as string[])]
    newArray[index] = value
    handleInputChange(field, newArray)
  }

  const addArrayItem = (field: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    handleInputChange(field, [...currentArray, ''])
  }

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    if (currentArray.length > 1) {
      handleInputChange(field, currentArray.filter((_, i) => i !== index))
    }
  }

  const handleModuleChange = (index: number, field: string, value: string) => {
    const newModules = [...formData.modules]
    newModules[index] = { ...newModules[index], [field]: value }
    handleInputChange('modules', newModules)
  }

  const addModule = () => {
    handleInputChange('modules', [...formData.modules, { title: '', description: '', duration: '' }])
  }

  const removeModule = (index: number) => {
    if (formData.modules.length > 1) {
      handleInputChange('modules', formData.modules.filter((_, i) => i !== index))
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/org-admin/trainings"
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Create Training Program</h1>
              <p className="text-secondary-600 mt-1">Design a new training course for your organization</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tabs */}
          <div className="card">
            <div className="border-b border-secondary-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'basic'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  Basic Information
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('content')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'content'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  Content & Structure
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('assessment')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'assessment'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  Assessment & Certification
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>

            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Training Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`input-field ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Enter training title"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className={`input-field ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Describe what participants will learn in this training"
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`input-field ${errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      >
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => handleInputChange('difficulty', e.target.value)}
                        className="input-field"
                      >
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Duration *
                      </label>
                      <div className="relative">
                        <ClockIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className={`input-field pl-10 ${errors.duration ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                          placeholder="e.g., 40 hours, 2 weeks"
                        />
                      </div>
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <CurrencyDollarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className="input-field pl-10"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Max Participants
                      </label>
                      <div className="relative">
                        <UserGroupIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="number"
                          value={formData.maxParticipants}
                          onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                          className="input-field pl-10"
                          placeholder="Unlimited"
                          min="1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Instructor *
                      </label>
                      <input
                        type="text"
                        value={formData.instructor}
                        onChange={(e) => handleInputChange('instructor', e.target.value)}
                        className={`input-field ${errors.instructor ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Instructor name"
                      />
                      {errors.instructor && (
                        <p className="mt-1 text-sm text-red-600">{errors.instructor}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Training Topic *
                      </label>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => handleInputChange('topic', e.target.value)}
                        className="input-field"
                        placeholder="e.g., Frontend Development, Data Analytics"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Training Location *
                      </label>
                      <div className="relative">
                        <MapPinIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="input-field pl-10"
                          placeholder="e.g., New York Training Center, Online"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-4">
                        Trainers
                      </label>
                      <div className="space-y-3">
                        {formData.trainers.map((trainer, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="text"
                              value={trainer}
                              onChange={(e) => handleArrayChange('trainers', index, e.target.value)}
                              className="input-field flex-1"
                              placeholder={`Trainer ${index + 1} name`}
                            />
                            {formData.trainers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem('trainers', index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('trainers')}
                          className="btn-secondary text-sm"
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Trainer
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Start Date *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className={`input-field pl-10 ${errors.startDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        End Date *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          className={`input-field pl-10 ${errors.endDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Enrollment Deadline
                      </label>
                      <div className="relative">
                        <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                        <input
                          type="date"
                          value={formData.enrollmentDeadline}
                          onChange={(e) => handleInputChange('enrollmentDeadline', e.target.value)}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Prerequisites
                      </label>
                      <textarea
                        value={formData.prerequisites}
                        onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                        rows={3}
                        className="input-field"
                        placeholder="List any prerequisites or requirements for this training"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content & Structure Tab */}
            {activeTab === 'content' && (
              <div className="p-6">
                <div className="space-y-8">
                  {/* Learning Objectives */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-4">
                      Learning Objectives
                    </label>
                    <div className="space-y-3">
                      {formData.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={objective}
                            onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                            className="input-field flex-1"
                            placeholder={`Learning objective ${index + 1}`}
                          />
                          {formData.objectives.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('objectives', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('objectives')}
                        className="btn-secondary text-sm"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Objective
                      </button>
                    </div>
                  </div>

                  {/* Training Modules */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-4">
                      Training Modules
                    </label>
                    <div className="space-y-4">
                      {formData.modules.map((module, index) => (
                        <div key={index} className="p-4 border border-secondary-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-secondary-900">Module {index + 1}</h4>
                            {formData.modules.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeModule(index)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                                className="input-field"
                                placeholder="Module title"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <textarea
                                value={module.description}
                                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                                rows={2}
                                className="input-field"
                                placeholder="Module description"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={module.duration}
                                onChange={(e) => handleModuleChange(index, 'duration', e.target.value)}
                                className="input-field"
                                placeholder="Duration (e.g., 2 hours)"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addModule}
                        className="btn-secondary text-sm"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Module
                      </button>
                    </div>
                  </div>

                  {/* Training Materials */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-4">
                      Training Materials
                    </label>
                    <div className="space-y-3">
                      {formData.materials.map((material, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={material}
                            onChange={(e) => handleArrayChange('materials', index, e.target.value)}
                            className="input-field flex-1"
                            placeholder={`Material ${index + 1} (e.g., PDF guide, video link)`}
                          />
                          {formData.materials.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('materials', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('materials')}
                        className="btn-secondary text-sm"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Material
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assessment & Certification Tab */}
            {activeTab === 'assessment' && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Assessment Type
                      </label>
                      <select
                        value={formData.assessmentType}
                        onChange={(e) => handleInputChange('assessmentType', e.target.value)}
                        className="input-field"
                      >
                        {assessmentTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Passing Score (%)
                      </label>
                      <input
                        type="number"
                        value={formData.passingScore}
                        onChange={(e) => handleInputChange('passingScore', e.target.value)}
                        className="input-field"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Certificate Template
                      </label>
                      <select
                        value={formData.certificateTemplate}
                        onChange={(e) => handleInputChange('certificateTemplate', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select template</option>
                        <option value="professional-blue">Professional Blue</option>
                        <option value="modern-green">Modern Green</option>
                        <option value="classic-red">Classic Red</option>
                        <option value="elegant-gold">Elegant Gold</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-4">
                      Tags
                    </label>
                    <div className="space-y-3">
                      {formData.tags.map((tag, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                            className="input-field flex-1"
                            placeholder={`Tag ${index + 1}`}
                          />
                          {formData.tags.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('tags', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('tags')}
                        className="btn-secondary text-sm"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Tag
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-900">Public Training</h3>
                        <p className="text-sm text-secondary-600">Make this training visible to all users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isPublic}
                          onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-900">Allow Self-Enrollment</h3>
                        <p className="text-sm text-secondary-600">Let users enroll themselves in this training</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.allowSelfEnrollment}
                          onChange={(e) => handleInputChange('allowSelfEnrollment', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-900">Send Reminders</h3>
                        <p className="text-sm text-secondary-600">Send email reminders to participants</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sendReminders}
                          onChange={(e) => handleInputChange('sendReminders', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-secondary-200">
            <Link href="/org-admin/trainings" className="btn-secondary">
              <XMarkIcon className="h-5 w-5 mr-2" />
              Cancel
            </Link>
            <button
              type="button"
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Create Training
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
              <h3 className="font-semibold text-primary-900 mb-2">Creating Effective Training Programs</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Write clear, specific learning objectives</li>
                <li>• Break content into digestible modules</li>
                <li>• Include practical exercises and assessments</li>
                <li>• Set realistic timelines and expectations</li>
                <li>• Provide comprehensive materials and resources</li>
                <li>• Consider different learning styles and preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}