'use client'

import { useState } from 'react'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function ImportTraineesPage() {
  const [file, setFile] = useState<File | null>(null)
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle')
  const [importResults, setImportResults] = useState<{
    total: number
    successful: number
    failed: number
    errors: Array<{ row: number; error: string; data: any }>
  } | null>(null)

  const [previewData, setPreviewData] = useState<any[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setImportStatus('idle')
      setImportResults(null)
      setShowPreview(false)
      
      // Simulate file preview
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        // In a real app, you'd parse the CSV here
        setPreviewData([
          { firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', department: 'Engineering', position: 'Developer' },
          { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'Marketing', position: 'Manager' },
          { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', department: 'Sales', position: 'Representative' }
        ])
      }
    }
  }

  const handlePreview = () => {
    if (file) {
      setShowPreview(true)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setImportStatus('uploading')
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setImportStatus('processing')
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate results
    const mockResults = {
      total: 25,
      successful: 22,
      failed: 3,
      errors: [
        { row: 5, error: 'Invalid email format', data: { firstName: 'Bob', lastName: 'Wilson', email: 'invalid-email' } },
        { row: 12, error: 'Missing required field: department', data: { firstName: 'Alice', lastName: 'Brown', email: 'alice@company.com' } },
        { row: 18, error: 'Duplicate email address', data: { firstName: 'Tom', lastName: 'Davis', email: 'john.doe@company.com' } }
      ]
    }
    
    setImportResults(mockResults)
    setImportStatus('completed')
  }

  const handleReset = () => {
    setFile(null)
    setImportStatus('idle')
    setImportResults(null)
    setPreviewData([])
    setShowPreview(false)
  }

  const downloadTemplate = () => {
    // In a real app, this would download an actual CSV template
    const csvContent = 'firstName,lastName,email,phone,department,position,employeeId,startDate,manager,notes\nJohn,Doe,john.doe@company.com,+1234567890,Engineering,Software Developer,EMP001,2024-01-15,Jane Smith,New hire\n'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trainee_import_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
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
              <h1 className="text-3xl font-bold text-secondary-900">Import Trainees</h1>
              <p className="text-secondary-600 mt-1">Bulk import trainees from CSV or Excel file</p>
            </div>
          </div>
        </div>

        {/* Import Steps */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">Import Process</h2>
            <button
              onClick={downloadTemplate}
              className="btn-secondary text-sm"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Download Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                importStatus === 'idle' ? 'bg-primary-100 text-primary-600' : 'bg-success-100 text-success-600'
              }`}>
                <span className="font-semibold">1</span>
              </div>
              <h3 className="font-medium text-secondary-900 mb-1">Upload File</h3>
              <p className="text-sm text-secondary-600">Select your CSV or Excel file</p>
            </div>

            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                ['uploading', 'processing', 'completed'].includes(importStatus) ? 'bg-success-100 text-success-600' : 'bg-secondary-100 text-secondary-400'
              }`}>
                <span className="font-semibold">2</span>
              </div>
              <h3 className="font-medium text-secondary-900 mb-1">Process Data</h3>
              <p className="text-sm text-secondary-600">Validate and process records</p>
            </div>

            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                importStatus === 'completed' ? 'bg-success-100 text-success-600' : 'bg-secondary-100 text-secondary-400'
              }`}>
                <span className="font-semibold">3</span>
              </div>
              <h3 className="font-medium text-secondary-900 mb-1">Review Results</h3>
              <p className="text-sm text-secondary-600">Check import summary</p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        {importStatus === 'idle' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Step 1: Upload File</h3>
            
            <div className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
              <ArrowUpTrayIcon className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              
              {file ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-secondary-900">{file.name}</p>
                    <p className="text-sm text-secondary-600">
                      {(file.size / 1024).toFixed(1)} KB • {file.type || 'Unknown type'}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={handlePreview}
                      className="btn-secondary text-sm"
                    >
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Preview Data
                    </button>
                    <button
                      onClick={handleImport}
                      className="btn-primary text-sm"
                    >
                      <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                      Start Import
                    </button>
                    <button
                      onClick={handleReset}
                      className="btn-secondary text-sm"
                    >
                      <XCircleIcon className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-secondary-900 mb-2">Choose a file to upload</p>
                    <p className="text-sm text-secondary-600">
                      Supports CSV and Excel files up to 10MB
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn-primary cursor-pointer"
                    >
                      <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                      Choose File
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Processing Status */}
        {(importStatus === 'uploading' || importStatus === 'processing') && (
          <div className="card">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                {importStatus === 'uploading' ? 'Uploading file...' : 'Processing data...'}
              </h3>
              <p className="text-secondary-600">
                {importStatus === 'uploading' 
                  ? 'Please wait while we upload your file'
                  : 'Validating and importing trainee records'
                }
              </p>
            </div>
          </div>
        )}

        {/* Import Results */}
        {importStatus === 'completed' && importResults && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center mb-6">
                <CheckCircleIcon className="h-8 w-8 text-success-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">Import Completed</h3>
                  <p className="text-secondary-600">Your trainee data has been processed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-900">{importResults.total}</div>
                  <div className="text-sm text-secondary-600">Total Records</div>
                </div>
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-600">{importResults.successful}</div>
                  <div className="text-sm text-success-700">Successfully Imported</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{importResults.failed}</div>
                  <div className="text-sm text-red-700">Failed to Import</div>
                </div>
              </div>
            </div>

            {/* Errors */}
            {importResults.errors.length > 0 && (
              <div className="card">
                <div className="flex items-center mb-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-warning-600 mr-2" />
                  <h3 className="text-lg font-semibold text-secondary-900">Import Errors</h3>
                </div>

                <div className="space-y-3">
                  {importResults.errors.map((error, index) => (
                    <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-red-900">Row {error.row}: {error.error}</p>
                          <p className="text-sm text-red-700 mt-1">
                            {error.data.firstName} {error.data.lastName} - {error.data.email}
                          </p>
                        </div>
                        <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link href="/org-admin/trainees" className="btn-primary">
                View All Trainees
              </Link>
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Import Another File
              </button>
            </div>
          </div>
        )}

        {/* Data Preview */}
        {showPreview && previewData.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">Data Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-secondary-500 hover:text-secondary-700"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Position</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {previewData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {row.firstName} {row.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {row.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {row.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {row.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {previewData.length > 5 && (
              <p className="text-sm text-secondary-600 mt-3 text-center">
                Showing first 5 rows of {previewData.length} total records
              </p>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleImport}
                className="btn-primary"
              >
                <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                Import {previewData.length} Records
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <DocumentArrowDownIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Import Instructions</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Download the template file to see the required format</li>
                <li>• Required columns: firstName, lastName, email, department, position</li>
                <li>• Optional columns: phone, employeeId, startDate, manager, notes</li>
                <li>• Email addresses must be unique for each trainee</li>
                <li>• Maximum file size: 10MB</li>
                <li>• Supported formats: CSV, Excel (.xlsx, .xls)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}