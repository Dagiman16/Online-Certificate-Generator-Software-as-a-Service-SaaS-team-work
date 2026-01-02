'use client'

import { useState, useRef } from 'react'
import { 
  DocumentArrowUpIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { BulkCertificateGenerator, BulkGenerationProgress } from '../lib/performance'

interface BulkGenerationComponentProps {
  organizationId: string
  onComplete?: (results: BulkGenerationProgress) => void
  onClose?: () => void
}

interface CertificateData {
  traineeName: string
  traineeEmail: string
  courseName: string
  completionDate: string
  grade?: string
  instructor?: string
}

export default function BulkCertificateGeneratorComponent({
  organizationId,
  onComplete,
  onClose
}: BulkGenerationComponentProps) {
  const [step, setStep] = useState<'upload' | 'configure' | 'generate' | 'complete'>('upload')
  const [csvData, setCsvData] = useState<CertificateData[]>([])
  const [progress, setProgress] = useState<BulkGenerationProgress | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [templateId, setTemplateId] = useState('')
  const [batchSize, setBatchSize] = useState(50)
  const [maxConcurrency, setMaxConcurrency] = useState(5)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const generatorRef = useRef<BulkCertificateGenerator | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setErrors(['Please upload a CSV file'])
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string
        const parsed = parseCSV(csv)
        
        if (parsed.length === 0) {
          setErrors(['CSV file is empty'])
          return
        }

        if (parsed.length > 1000) {
          setErrors(['Maximum 1000 certificates allowed per batch'])
          return
        }

        setCsvData(parsed)
        setErrors([])
        setStep('configure')
      } catch (error) {
        setErrors(['Failed to parse CSV file. Please check the format.'])
      }
    }
    reader.readAsText(file)
  }

  const parseCSV = (csv: string): CertificateData[] => {
    const lines = csv.split('\n').filter(line => line.trim())
    if (lines.length < 2) throw new Error('CSV must have header and at least one data row')

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    const requiredHeaders = ['traineename', 'traineeemail', 'coursename', 'completiondate']
    
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h))
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`)
    }

    const data: CertificateData[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      if (values.length !== headers.length) continue

      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index]
      })

      // Validate required fields
      if (!row.traineename || !row.traineeemail || !row.coursename || !row.completiondate) {
        continue
      }

      data.push({
        traineeName: row.traineename,
        traineeEmail: row.traineeemail,
        courseName: row.coursename,
        completionDate: row.completiondate,
        grade: row.grade || '',
        instructor: row.instructor || ''
      })
    }

    return data
  }

  const startGeneration = async () => {
    if (csvData.length === 0) return

    setIsGenerating(true)
    setIsPaused(false)
    setStep('generate')

    const generator = new BulkCertificateGenerator({
      batchSize,
      maxConcurrency,
      retryAttempts: 3,
      retryDelay: 1000
    })

    generatorRef.current = generator

    const requests = csvData.map(data => ({
      ...data,
      organizationId,
      templateId
    }))

    try {
      const results = await generator.generateBulkCertificates(
        requests,
        (progressUpdate) => {
          setProgress(progressUpdate)
        }
      )

      setProgress(results)
      setStep('complete')
      onComplete?.(results)
    } catch (error) {
      setErrors(['Generation failed: ' + (error instanceof Error ? error.message : 'Unknown error')])
    } finally {
      setIsGenerating(false)
      generatorRef.current = null
    }
  }

  const pauseGeneration = () => {
    setIsPaused(true)
    // In a real implementation, you would pause the generator
  }

  const resumeGeneration = () => {
    setIsPaused(false)
    // In a real implementation, you would resume the generator
  }

  const stopGeneration = () => {
    setIsGenerating(false)
    setIsPaused(false)
    generatorRef.current = null
    setStep('upload')
    setProgress(null)
  }

  const downloadSampleCSV = () => {
    const sampleData = [
      'TraineeName,TraineeEmail,CourseName,CompletionDate,Grade,Instructor',
      'John Doe,john.doe@email.com,Web Development Fundamentals,2024-01-15,A+,Dr. Sarah Johnson',
      'Jane Smith,jane.smith@email.com,Data Science with Python,2024-01-14,B+,Prof. Michael Chen',
      'Mike Johnson,mike.johnson@email.com,Digital Marketing Essentials,2024-01-13,A-,Lisa Anderson'
    ].join('\n')

    const blob = new Blob([sampleData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'certificate_template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getProgressPercentage = () => {
    if (!progress || progress.total === 0) return 0
    return Math.round(((progress.completed + progress.failed) / progress.total) * 100)
  }

  const getEstimatedTimeRemaining = () => {
    if (!progress || !progress.startTime || progress.total === 0) return null
    
    const elapsed = Date.now() - progress.startTime.getTime()
    const processed = progress.completed + progress.failed
    const remaining = progress.total - processed
    
    if (processed === 0) return null
    
    const avgTimePerCert = elapsed / processed
    const estimatedRemaining = (avgTimePerCert * remaining) / 1000 // in seconds
    
    if (estimatedRemaining < 60) {
      return `${Math.round(estimatedRemaining)}s`
    } else if (estimatedRemaining < 3600) {
      return `${Math.round(estimatedRemaining / 60)}m`
    } else {
      return `${Math.round(estimatedRemaining / 3600)}h`
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-2xl font-bold text-secondary-900">Bulk Certificate Generation</h2>
          <button
            onClick={onClose}
            className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Upload CSV */}
          {step === 'upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <DocumentArrowUpIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Upload Certificate Data</h3>
                <p className="text-secondary-600">Upload a CSV file with trainee information to generate certificates in bulk</p>
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary mb-4"
                >
                  <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                  Choose CSV File
                </button>
                <p className="text-sm text-secondary-600">
                  Maximum 1000 certificates per batch
                </p>
              </div>

              {/* Sample CSV Download */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-medium text-secondary-900 mb-2">CSV Format Requirements</h4>
                <p className="text-sm text-secondary-600 mb-3">
                  Your CSV file must include the following columns:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div><strong>TraineeName</strong> (required)</div>
                  <div><strong>TraineeEmail</strong> (required)</div>
                  <div><strong>CourseName</strong> (required)</div>
                  <div><strong>CompletionDate</strong> (required)</div>
                  <div><strong>Grade</strong> (optional)</div>
                  <div><strong>Instructor</strong> (optional)</div>
                </div>
                <button
                  onClick={downloadSampleCSV}
                  className="btn-secondary text-sm"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download Sample CSV
                </button>
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Upload Errors</h4>
                      <ul className="text-sm text-red-800 mt-1">
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Configure Generation */}
          {step === 'configure' && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-success-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Configure Generation</h3>
                <p className="text-secondary-600">
                  {csvData.length} certificates ready to generate
                </p>
              </div>

              {/* Configuration Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Certificate Template
                  </label>
                  <select
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Default Template</option>
                    <option value="professional">Professional Blue</option>
                    <option value="modern">Modern Green</option>
                    <option value="classic">Classic Red</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Batch Size
                  </label>
                  <select
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                    className="input-field"
                  >
                    <option value={25}>25 certificates per batch</option>
                    <option value={50}>50 certificates per batch</option>
                    <option value={100}>100 certificates per batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Concurrent Batches
                  </label>
                  <select
                    value={maxConcurrency}
                    onChange={(e) => setMaxConcurrency(Number(e.target.value))}
                    className="input-field"
                  >
                    <option value={3}>3 concurrent batches</option>
                    <option value={5}>5 concurrent batches</option>
                    <option value={10}>10 concurrent batches</option>
                  </select>
                </div>
              </div>

              {/* Data Preview */}
              <div>
                <h4 className="font-medium text-secondary-900 mb-3">Data Preview</h4>
                <div className="border border-secondary-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto max-h-64">
                    <table className="min-w-full divide-y divide-secondary-200">
                      <thead className="bg-secondary-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-secondary-500 uppercase">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-secondary-500 uppercase">Email</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-secondary-500 uppercase">Course</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-secondary-200">
                        {csvData.slice(0, 5).map((row, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-secondary-900">{row.traineeName}</td>
                            <td className="px-4 py-2 text-sm text-secondary-600">{row.traineeEmail}</td>
                            <td className="px-4 py-2 text-sm text-secondary-900">{row.courseName}</td>
                            <td className="px-4 py-2 text-sm text-secondary-600">{row.completionDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {csvData.length > 5 && (
                    <div className="px-4 py-2 bg-secondary-50 text-sm text-secondary-600">
                      ... and {csvData.length - 5} more certificates
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('upload')}
                  className="btn-secondary flex-1"
                >
                  Back to Upload
                </button>
                <button
                  onClick={startGeneration}
                  className="btn-primary flex-1"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Start Generation
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Generation Progress */}
          {step === 'generate' && (
            <div className="space-y-6">
              <div className="text-center">
                <ClockIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Generating Certificates</h3>
                <p className="text-secondary-600">
                  Please wait while we generate your certificates...
                </p>
              </div>

              {/* Progress Bar */}
              {progress && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-700">
                      Progress: {progress.completed + progress.failed} / {progress.total}
                    </span>
                    <span className="text-sm text-secondary-600">
                      {getProgressPercentage()}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary-200 rounded-full h-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-success-50 rounded-lg">
                      <div className="text-lg font-bold text-success-900">{progress.completed}</div>
                      <div className="text-sm text-success-700">Completed</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-900">{progress.failed}</div>
                      <div className="text-sm text-red-700">Failed</div>
                    </div>
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <div className="text-lg font-bold text-secondary-900">
                        {getEstimatedTimeRemaining() || '--'}
                      </div>
                      <div className="text-sm text-secondary-700">Remaining</div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center space-x-3">
                    {!isPaused ? (
                      <button
                        onClick={pauseGeneration}
                        className="btn-secondary"
                        disabled={!isGenerating}
                      >
                        <PauseIcon className="h-5 w-5 mr-2" />
                        Pause
                      </button>
                    ) : (
                      <button
                        onClick={resumeGeneration}
                        className="btn-primary"
                      >
                        <PlayIcon className="h-5 w-5 mr-2" />
                        Resume
                      </button>
                    )}
                    <button
                      onClick={stopGeneration}
                      className="btn-secondary text-red-600 hover:bg-red-50"
                    >
                      <StopIcon className="h-5 w-5 mr-2" />
                      Stop
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 'complete' && progress && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-success-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Generation Complete</h3>
                <p className="text-secondary-600">
                  Certificate generation has finished
                </p>
              </div>

              {/* Results Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-900">{progress.completed}</div>
                  <div className="text-sm text-success-700">Successfully Generated</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-900">{progress.failed}</div>
                  <div className="text-sm text-red-700">Failed</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-900">{progress.total}</div>
                  <div className="text-sm text-secondary-700">Total</div>
                </div>
              </div>

              {/* Errors */}
              {progress.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Generation Errors</h4>
                  <div className="max-h-32 overflow-y-auto">
                    {progress.errors.map((error, index) => (
                      <div key={index} className="text-sm text-red-800">
                        Row {error.index + 1}: {error.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setStep('upload')
                    setCsvData([])
                    setProgress(null)
                  }}
                  className="btn-secondary flex-1"
                >
                  Generate More
                </button>
                <button
                  onClick={onClose}
                  className="btn-primary flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}