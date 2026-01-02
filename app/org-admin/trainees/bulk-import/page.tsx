'use client'

import { useState, useRef } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  EyeIcon,
  TrashIcon,
  DocumentTextIcon,
  TableCellsIcon,
  UserGroupIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface ImportError {
  row: number
  field: string
  message: string
}

interface TraineeData {
  fullName: string
  courseName: string
  completionDate: string
  certificateIssueDate: string
  trainingTopic: string
  email?: string
  phone?: string
  enrollmentDate?: string
  grade?: string
  notes?: string
}

export default function BulkImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importData, setImportData] = useState<TraineeData[]>([])
  const [errors, setErrors] = useState<ImportError[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importStep, setImportStep] = useState<'upload' | 'preview' | 'complete'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Available training topics
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

  const requiredColumns = [
    { key: 'fullName', label: 'Full Name', required: true },
    { key: 'courseName', label: 'Course Name', required: true },
    { key: 'completionDate', label: 'Completion Date', required: true },
    { key: 'certificateIssueDate', label: 'Certificate Issue Date', required: true },
    { key: 'trainingTopic', label: 'Training Topic', required: false },
    { key: 'email', label: 'Email', required: false },
    { key: 'phone', label: 'Phone', required: false },
    { key: 'enrollmentDate', label: 'Enrollment Date', required: false },
    { key: 'grade', label: 'Grade/Score', required: false },
    { key: 'notes', label: 'Notes', required: false }
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImportData([])
      setErrors([])
      setImportStep('upload')
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.docx'))) {
      setSelectedFile(file)
      setImportData([])
      setErrors([])
      setImportStep('upload')
    }
  }

  const validateData = (data: TraineeData[]): ImportError[] => {
    const validationErrors: ImportError[] = []
    const emailSet = new Set<string>()

    data.forEach((row, index) => {
      const rowNumber = index + 1

      // Required field validation
      if (!row.fullName?.trim()) {
        validationErrors.push({
          row: rowNumber,
          field: 'fullName',
          message: 'Full name is required'
        })
      }

      if (!row.courseName?.trim()) {
        validationErrors.push({
          row: rowNumber,
          field: 'courseName',
          message: 'Course name is required'
        })
      } else if (!courses.includes(row.courseName)) {
        validationErrors.push({
          row: rowNumber,
          field: 'courseName',
          message: 'Invalid course name'
        })
      }

      if (!row.completionDate) {
        validationErrors.push({
          row: rowNumber,
          field: 'completionDate',
          message: 'Completion date is required'
        })
      } else if (isNaN(Date.parse(row.completionDate))) {
        validationErrors.push({
          row: rowNumber,
          field: 'completionDate',
          message: 'Invalid date format'
        })
      }

      if (!row.certificateIssueDate) {
        validationErrors.push({
          row: rowNumber,
          field: 'certificateIssueDate',
          message: 'Certificate issue date is required'
        })
      } else if (isNaN(Date.parse(row.certificateIssueDate))) {
        validationErrors.push({
          row: rowNumber,
          field: 'certificateIssueDate',
          message: 'Invalid date format'
        })
      }

      // Date logic validation
      if (row.completionDate && row.certificateIssueDate) {
        const completionDate = new Date(row.completionDate)
        const issueDate = new Date(row.certificateIssueDate)
        
        if (issueDate < completionDate) {
          validationErrors.push({
            row: rowNumber,
            field: 'certificateIssueDate',
            message: 'Certificate issue date must be on or after completion date'
          })
        }
      }

      // Email validation and duplicate check
      if (row.email) {
        if (!/\S+@\S+\.\S+/.test(row.email)) {
          validationErrors.push({
            row: rowNumber,
            field: 'email',
            message: 'Invalid email format'
          })
        } else if (emailSet.has(row.email)) {
          validationErrors.push({
            row: rowNumber,
            field: 'email',
            message: 'Duplicate email address'
          })
        } else {
          emailSet.add(row.email)
        }
      }

      // Training topic validation
      if (row.trainingTopic && !trainingTopics.includes(row.trainingTopic)) {
        validationErrors.push({
          row: rowNumber,
          field: 'trainingTopic',
          message: 'Invalid training topic'
        })
      }
    })

    return validationErrors
  }

  const processFile = async () => {
    if (!selectedFile) return

    setIsProcessing(true)

    try {
      // Simulate file processing (in real implementation, use libraries like xlsx or mammoth)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock data for demonstration
      const mockData: TraineeData[] = [
        {
          fullName: 'John Doe',
          courseName: 'Web Development Fundamentals',
          completionDate: '2024-02-15',
          certificateIssueDate: '2024-02-16',
          trainingTopic: 'Frontend Development',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          enrollmentDate: '2024-01-15',
          grade: 'A+',
          notes: 'Excellent performance'
        },
        {
          fullName: 'Jane Smith',
          courseName: 'Data Science with Python',
          completionDate: '2024-02-20',
          certificateIssueDate: '2024-02-21',
          trainingTopic: 'Data Analytics & ML',
          email: 'jane.smith@email.com',
          phone: '+1 (555) 234-5678',
          enrollmentDate: '2024-01-20',
          grade: 'B+',
          notes: 'Good progress'
        },
        {
          fullName: 'Mike Johnson',
          courseName: 'Invalid Course', // This will cause validation error
          completionDate: '2024-02-25',
          certificateIssueDate: '2024-02-24', // This will cause validation error (before completion)
          trainingTopic: 'Digital Marketing Strategy',
          email: 'invalid-email', // This will cause validation error
          phone: '+1 (555) 345-6789',
          enrollmentDate: '2024-01-25',
          grade: 'A-',
          notes: 'Needs improvement'
        }
      ]

      setImportData(mockData)
      const validationErrors = validateData(mockData)
      setErrors(validationErrors)
      setImportStep('preview')

    } catch (error) {
      console.error('Error processing file:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const executeImport = async () => {
    setIsImporting(true)

    try {
      // Filter out rows with errors
      const validData = importData.filter((_, index) => {
        const rowNumber = index + 1
        return !errors.some(error => error.row === rowNumber)
      })

      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Importing trainees:', validData)
      setImportStep('complete')

    } catch (error) {
      console.error('Error importing data:', error)
    } finally {
      setIsImporting(false)
    }
  }

  const resetImport = () => {
    setSelectedFile(null)
    setImportData([])
    setErrors([])
    setImportStep('upload')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.xlsx')) {
      return <TableCellsIcon className="h-8 w-8 text-green-600" />
    } else if (fileName.endsWith('.docx')) {
      return <DocumentTextIcon className="h-8 w-8 text-blue-600" />
    }
    return <DocumentIcon className="h-8 w-8 text-secondary-400" />
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
              <h1 className="text-3xl font-bold text-secondary-900">Bulk Import Trainees</h1>
              <p className="text-secondary-600 mt-1">Import trainees from Excel (.xlsx) or Word (.docx) files</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${importStep === 'upload' ? 'text-primary-600' : importStep === 'preview' || importStep === 'complete' ? 'text-success-600' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${importStep === 'upload' ? 'bg-primary-100' : importStep === 'preview' || importStep === 'complete' ? 'bg-success-100' : 'bg-secondary-100'}`}>
                {importStep === 'preview' || importStep === 'complete' ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">1</span>
                )}
              </div>
              <span className="ml-2 font-medium">Upload File</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-4 ${importStep === 'preview' || importStep === 'complete' ? 'bg-success-300' : 'bg-secondary-200'}`}></div>
            
            <div className={`flex items-center ${importStep === 'preview' ? 'text-primary-600' : importStep === 'complete' ? 'text-success-600' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${importStep === 'preview' ? 'bg-primary-100' : importStep === 'complete' ? 'bg-success-100' : 'bg-secondary-100'}`}>
                {importStep === 'complete' ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">2</span>
                )}
              </div>
              <span className="ml-2 font-medium">Preview & Validate</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-4 ${importStep === 'complete' ? 'bg-success-300' : 'bg-secondary-200'}`}></div>
            
            <div className={`flex items-center ${importStep === 'complete' ? 'text-success-600' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${importStep === 'complete' ? 'bg-success-100' : 'bg-secondary-100'}`}>
                {importStep === 'complete' ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">3</span>
                )}
              </div>
              <span className="ml-2 font-medium">Import Complete</span>
            </div>
          </div>
        </div>

        {/* Upload Step */}
        {importStep === 'upload' && (
          <div className="space-y-6">
            {/* File Upload */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Upload File</h2>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors"
              >
                <ArrowUpTrayIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">
                  Drop your file here or click to browse
                </h3>
                <p className="text-secondary-600 mb-4">
                  Supports Excel (.xlsx) and Word (.docx) files up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                >
                  Choose File
                </button>
              </div>

              {selectedFile && (
                <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(selectedFile.name)}
                      <div>
                        <p className="font-medium text-secondary-900">{selectedFile.name}</p>
                        <p className="text-sm text-secondary-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={processFile}
                        disabled={isProcessing}
                        className="btn-primary"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Process File
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="btn-secondary"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Required Columns */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Required Columns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requiredColumns.map(column => (
                  <div key={column.key} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${column.required ? 'bg-red-500' : 'bg-secondary-400'}`}></div>
                    <span className="text-sm font-medium text-secondary-900">{column.label}</span>
                    {column.required && <span className="text-xs text-red-600">Required</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* File Format Examples */}
            <div className="card bg-primary-50 border-primary-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">File Format Guidelines</h3>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• <strong>Excel (.xlsx):</strong> Use first row as column headers matching required column names</li>
                    <li>• <strong>Word (.docx):</strong> Use tables with headers in first row</li>
                    <li>• <strong>Date Format:</strong> Use YYYY-MM-DD format (e.g., 2024-02-15)</li>
                    <li>• <strong>Required Columns:</strong> Full Name, Course Name, Completion Date, Certificate Issue Date</li>
                    <li>• <strong>Validation:</strong> System checks for required columns, duplicate entries, and data format errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {importStep === 'preview' && (
          <div className="space-y-6">
            {/* Validation Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                    <UserGroupIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Total Records</p>
                    <p className="text-2xl font-bold text-secondary-900">{importData.length}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                    <CheckCircleIcon className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Valid Records</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {importData.length - new Set(errors.map(e => e.row)).size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <XCircleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Errors</p>
                    <p className="text-2xl font-bold text-secondary-900">{errors.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
                  Validation Errors
                </h2>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {errors.map((error, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-red-800">
                          Row {error.row}, {error.field}:
                        </span>
                        <span className="text-sm text-red-700 ml-1">{error.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Preview */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Data Preview</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Row
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Course Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Completion Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Certificate Issue Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {importData.map((row, index) => {
                      const rowNumber = index + 1
                      const hasErrors = errors.some(error => error.row === rowNumber)
                      
                      return (
                        <tr key={index} className={hasErrors ? 'bg-red-50' : 'hover:bg-secondary-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {rowNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {row.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {row.courseName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {row.completionDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                            {row.certificateIssueDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {hasErrors ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircleIcon className="h-4 w-4 mr-1" />
                                Error
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                Valid
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <button onClick={resetImport} className="btn-secondary">
                <XMarkIcon className="h-5 w-5 mr-2" />
                Start Over
              </button>
              <button
                onClick={executeImport}
                disabled={isImporting || errors.length === importData.length}
                className="btn-primary"
              >
                {isImporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Import Valid Records ({importData.length - new Set(errors.map(e => e.row)).size})
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {importStep === 'complete' && (
          <div className="space-y-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-success-600" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Import Completed Successfully!</h2>
              <p className="text-secondary-600 mb-6">
                {importData.length - new Set(errors.map(e => e.row)).size} trainees have been imported successfully.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/org-admin/trainees" className="btn-primary">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  View Trainees
                </Link>
                <button onClick={resetImport} className="btn-secondary">
                  Import More Files
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}