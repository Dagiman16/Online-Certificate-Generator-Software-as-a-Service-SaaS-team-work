'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  QrCodeIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CameraIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  GlobeAltIcon,
  LockClosedIcon,
  CreditCardIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function VerifyPage() {
  const [searchType, setSearchType] = useState<'qr' | 'id'>('id')
  const [searchValue, setSearchValue] = useState('')
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scanError, setScanError] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock certificate database with enhanced status management
  const certificateDatabase = [
    {
      certificateId: 'WDU-CERT-2024-1703123456789-ABC123',
      traineeName: 'John Doe',
      traineeEmail: 'john.doe@email.com',
      courseName: 'Web Development Fundamentals',
      organizationName: 'TechCorp University',
      organizationLogo: '/logo.jpg',
      issueDate: '2024-01-15',
      completionDate: '2024-01-10',
      status: 'Issued', // Draft, Issued, Revoked
      instructor: 'Dr. Sarah Johnson',
      grade: 'A+',
      duration: '40 hours',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456789-ABC123`,
      verificationCount: 47,
      lastVerified: '2024-01-20',
      paymentStatus: 'paid',
      watermarkRemoved: true,
      templateType: 'premium'
    },
    {
      certificateId: 'WDU-CERT-2024-1703123456790-DEF456',
      traineeName: 'Jane Smith',
      traineeEmail: 'jane.smith@email.com',
      courseName: 'Data Science with Python',
      organizationName: 'DataTech Academy',
      organizationLogo: '/logo.jpg',
      issueDate: '2024-01-20',
      completionDate: '2024-01-18',
      status: 'Issued',
      instructor: 'Prof. Michael Chen',
      grade: 'B+',
      duration: '60 hours',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456790-DEF456`,
      verificationCount: 23,
      lastVerified: '2024-01-22',
      paymentStatus: 'paid',
      watermarkRemoved: true,
      templateType: 'premium'
    },
    {
      certificateId: 'WDU-CERT-2024-1703123456791-GHI789',
      traineeName: 'Mike Johnson',
      traineeEmail: 'mike.johnson@email.com',
      courseName: 'Digital Marketing Essentials',
      organizationName: 'Marketing Pro Institute',
      organizationLogo: '/logo.jpg',
      issueDate: '2024-01-25',
      completionDate: '2024-01-23',
      status: 'Revoked',
      instructor: 'Lisa Anderson',
      grade: 'A-',
      duration: '30 hours',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456791-GHI789`,
      verificationCount: 12,
      lastVerified: '2024-01-26',
      revokedDate: '2024-01-26',
      revokedReason: 'Certificate recalled due to course content update',
      paymentStatus: 'refunded',
      watermarkRemoved: true,
      templateType: 'premium'
    },
    {
      certificateId: 'WDU-CERT-2024-1703123456792-JKL012',
      traineeName: 'Sarah Wilson',
      traineeEmail: 'sarah.wilson@email.com',
      courseName: 'Project Management Basics',
      organizationName: 'Business Academy',
      organizationLogo: '/logo.jpg',
      issueDate: null, // Draft status - not yet issued
      completionDate: '2024-01-20',
      status: 'Draft',
      instructor: 'Robert Davis',
      grade: 'B',
      duration: '25 hours',
      qrCode: null, // No QR code for draft certificates
      verificationCount: 0,
      lastVerified: null,
      paymentStatus: 'pending',
      watermarkRemoved: false,
      templateType: 'basic'
    },
    {
      certificateId: 'WDU-CERT-2024-1703123456793-MNO345',
      traineeName: 'David Brown',
      traineeEmail: 'david.brown@email.com',
      courseName: 'Basic Computer Skills',
      organizationName: 'Community College',
      organizationLogo: '/logo.jpg',
      issueDate: '2024-01-18',
      completionDate: '2024-01-15',
      status: 'Issued',
      instructor: 'Mary Johnson',
      grade: 'C+',
      duration: '20 hours',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456793-MNO345`,
      verificationCount: 5,
      lastVerified: '2024-01-19',
      paymentStatus: 'paid',
      watermarkRemoved: false, // Basic plan with watermark
      templateType: 'basic'
    }
  ]

  // Check URL parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const certificateId = urlParams.get('id')
      if (certificateId) {
        setSearchValue(certificateId)
        setSearchType('id')
        // Auto-verify if ID is in URL
        setTimeout(() => {
          handleVerify(null, certificateId)
        }, 500)
      }
    }
  }, [])

  const startQRScanner = async () => {
    try {
      setScanError('')
      setShowQRScanner(true)
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      setScanError('Camera access denied or not available')
      setShowQRScanner(false)
    }
  }

  const stopQRScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
    setShowQRScanner(false)
    setScanError('')
  }

  const handleVerify = async (e: React.FormEvent | null, directId?: string) => {
    if (e) e.preventDefault()
    
    const idToVerify = directId || searchValue
    if (!idToVerify) return

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Find certificate in mock database
      const certificate = certificateDatabase.find(cert => 
        cert.certificateId === idToVerify || 
        cert.qrCode.includes(idToVerify)
      )
      
      if (certificate) {
        // Determine certificate validity based on status
        const isValid = certificate.status === 'Issued'
        const isRevoked = certificate.status === 'Revoked'
        const isDraft = certificate.status === 'Draft'
        
        setVerificationResult({
          ...certificate,
          valid: isValid,
          verificationDate: new Date().toISOString().split('T')[0],
          verificationTime: new Date().toLocaleTimeString(),
          displayStatus: isRevoked ? 'Invalid / Revoked' : 
                        isDraft ? 'Draft - Not Yet Issued' : 
                        isValid ? 'Valid' : 'Invalid'
        })
      } else {
        setVerificationResult({
          valid: false,
          certificateId: idToVerify,
          error: 'Certificate not found',
          verificationDate: new Date().toISOString().split('T')[0],
          verificationTime: new Date().toLocaleTimeString(),
          displayStatus: 'Invalid - Not Found'
        })
      }
      
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-secondary-100">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="WDU Logo" className="w-10 h-10 rounded-xl object-cover" />
              <h1 className="text-2xl font-bold text-secondary-900">WDU-Certify</h1>
            </Link>
            <div className="flex items-center space-x-3">
              <Link href="/auth/login" className="btn-ghost">
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShieldCheckIcon className="h-4 w-4" />
              <span>Secure certificate verification</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-4">
              Verify Certificate
              <span className="text-gradient block">Authenticity</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Enter a certificate ID or scan QR code to instantly verify the authenticity of any certificate
            </p>
          </div>

          {/* Verification Form */}
          <div className="card max-w-2xl mx-auto mb-12">
            <form onSubmit={handleVerify} className="space-y-8">
              {/* Search Type Toggle */}
              <div className="flex rounded-2xl bg-secondary-50 p-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchType('id')
                    stopQRScanner()
                  }}
                  className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    searchType === 'id'
                      ? 'bg-white text-secondary-900 shadow-soft'
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                  Certificate ID
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType('qr')
                    setSearchValue('')
                  }}
                  className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    searchType === 'qr'
                      ? 'bg-white text-secondary-900 shadow-soft'
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  <QrCodeIcon className="h-5 w-5 mr-2" />
                  QR Code
                </button>
              </div>

              {/* QR Scanner */}
              {searchType === 'qr' && (
                <div className="space-y-4">
                  {!showQRScanner ? (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={startQRScanner}
                        className="btn-primary"
                      >
                        <CameraIcon className="h-5 w-5 mr-2" />
                        Start QR Scanner
                      </button>
                      <p className="text-sm text-secondary-600 mt-2">
                        Or enter the QR code URL manually below
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full h-64 bg-black rounded-lg"
                        autoPlay
                        playsInline
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute inset-0 border-2 border-primary-500 rounded-lg pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg"></div>
                      </div>
                      <button
                        type="button"
                        onClick={stopQRScanner}
                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  
                  {scanError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-red-800 text-sm">{scanError}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Input Field */}
              <div>
                <label htmlFor="searchValue" className="block text-lg font-semibold text-secondary-900 mb-3">
                  {searchType === 'id' ? 'Enter Certificate ID' : 'Enter QR Code URL or Certificate ID'}
                </label>
                <input
                  id="searchValue"
                  type="text"
                  placeholder={
                    searchType === 'id' 
                      ? 'e.g., WDU-CERT-2024-1703123456789-ABC123' 
                      : 'Paste QR code URL or enter certificate ID'
                  }
                  className="input-field text-lg"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  required
                />
                <p className="text-sm text-secondary-500 mt-2">
                  {searchType === 'id' 
                    ? 'Certificate ID can be found on your certificate document'
                    : 'QR code URL typically starts with the verification domain'
                  }
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !searchValue}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Verifying Certificate...
                  </div>
                ) : (
                  <>
                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                    Verify Certificate
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className={`card ${
                verificationResult.valid 
                  ? 'border-2 border-success-200 bg-success-50' 
                  : 'border-2 border-red-200 bg-red-50'
              }`}>
                {/* Result Header */}
                <div className="flex items-center mb-8">
                  {verificationResult.valid ? (
                    <div className="w-16 h-16 bg-success-500 rounded-2xl flex items-center justify-center mr-4">
                      <CheckCircleIcon className="h-8 w-8 text-white" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mr-4">
                      <XCircleIcon className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className={`text-3xl font-bold ${
                      verificationResult.valid ? 'text-success-900' : 'text-red-900'
                    }`}>
                      {verificationResult.valid ? 'Certificate Verified ✓' : 'Certificate Invalid ✗'}
                    </h2>
                    <p className={`text-lg ${
                      verificationResult.valid ? 'text-success-700' : 'text-red-700'
                    }`}>
                      Verified on {verificationResult.verificationDate} at {verificationResult.verificationTime}
                      {verificationResult.verificationCount && (
                        <> • {verificationResult.verificationCount} total verifications</>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      verificationResult.status === 'Issued' 
                        ? 'bg-success-100 text-success-800'
                        : verificationResult.status === 'Revoked'
                        ? 'bg-red-100 text-red-800'
                        : verificationResult.status === 'Draft'
                        ? 'bg-warning-100 text-warning-800'
                        : 'bg-secondary-100 text-secondary-800'
                    }`}>
                      {verificationResult.status === 'Issued' && <CheckCircleIcon className="h-4 w-4 mr-1" />}
                      {verificationResult.status === 'Revoked' && <XCircleIcon className="h-4 w-4 mr-1" />}
                      {verificationResult.status === 'Draft' && <ClockIcon className="h-4 w-4 mr-1" />}
                      {verificationResult.displayStatus || verificationResult.status || 'Unknown'}
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                {verificationResult.valid ? (
                  <div className="space-y-8">
                    {/* Payment & Watermark Status */}
                    {verificationResult.paymentStatus && (
                      <div className="bg-white rounded-xl p-6 border border-secondary-200">
                        <h3 className="font-semibold text-secondary-900 mb-4">Certificate Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            {verificationResult.watermarkRemoved ? (
                              <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2" />
                            ) : (
                              <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span className="text-sm text-secondary-700">
                              {verificationResult.watermarkRemoved ? 'No Watermark' : 'With Watermark'}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <SparklesIcon className="h-5 w-5 text-accent-500 mr-2" />
                            <span className="text-sm text-secondary-700 capitalize">
                              {verificationResult.templateType || 'Standard'} Template
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CreditCardIcon className="h-5 w-5 text-primary-500 mr-2" />
                            <span className="text-sm text-secondary-700 capitalize">
                              Payment: {verificationResult.paymentStatus || 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Main Certificate Info */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <DocumentTextIcon className="h-6 w-6 text-secondary-500 mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-secondary-600">Certificate ID</p>
                            <p className="text-lg font-mono text-secondary-900 break-all">{verificationResult.certificateId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <UserIcon className="h-6 w-6 text-secondary-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-secondary-600">Recipient</p>
                            <p className="text-lg font-semibold text-secondary-900">{verificationResult.traineeName}</p>
                            {verificationResult.traineeEmail && (
                              <p className="text-sm text-secondary-600">{verificationResult.traineeEmail}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <AcademicCapIcon className="h-6 w-6 text-secondary-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-secondary-600">Course</p>
                            <p className="text-lg font-semibold text-secondary-900">{verificationResult.courseName}</p>
                            {verificationResult.instructor && (
                              <p className="text-sm text-secondary-600">Instructor: {verificationResult.instructor}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <BuildingOfficeIcon className="h-6 w-6 text-secondary-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-secondary-600">Issuing Organization</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {verificationResult.organizationLogo && (
                                <img 
                                  src={verificationResult.organizationLogo} 
                                  alt="Organization Logo" 
                                  className="w-6 h-6 rounded"
                                />
                              )}
                              <p className="text-lg font-semibold text-secondary-900">{verificationResult.organizationName}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CalendarIcon className="h-6 w-6 text-secondary-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-secondary-600">Issue Date</p>
                            <p className="text-lg font-semibold text-secondary-900">{verificationResult.issueDate}</p>
                            {verificationResult.completionDate && (
                              <p className="text-sm text-secondary-600">Completed: {verificationResult.completionDate}</p>
                            )}
                          </div>
                        </div>
                        
                        {verificationResult.grade && (
                          <div className="flex items-start space-x-3">
                            <SparklesIcon className="h-6 w-6 text-secondary-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-secondary-600">Grade</p>
                              <p className="text-lg font-semibold text-secondary-900">{verificationResult.grade}</p>
                              {verificationResult.duration && (
                                <p className="text-sm text-secondary-600">Duration: {verificationResult.duration}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Verification Stats */}
                    <div className="border-t border-secondary-200 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                          </div>
                          <p className="text-sm font-medium text-secondary-600">Security Status</p>
                          <p className="text-lg font-bold text-success-600">Verified Authentic</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <GlobeAltIcon className="h-6 w-6 text-accent-600" />
                          </div>
                          <p className="text-sm font-medium text-secondary-600">Verification Count</p>
                          <p className="text-lg font-bold text-secondary-900">{verificationResult.verificationCount || 1}</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <ClockIcon className="h-6 w-6 text-secondary-600" />
                          </div>
                          <p className="text-sm font-medium text-secondary-600">Last Verified</p>
                          <p className="text-lg font-bold text-secondary-900">{verificationResult.lastVerified || 'Today'}</p>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Info */}
                    <div className="bg-white rounded-xl p-6 border border-secondary-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-secondary-900 mb-2">QR Code Verification</h3>
                          <p className="text-sm text-secondary-600">This certificate can be verified by scanning its QR code</p>
                        </div>
                        <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <QrCodeIcon className="h-8 w-8 text-secondary-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Invalid Certificate */
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">
                      {verificationResult.error || 'Certificate Not Found'}
                    </h3>
                    <div className="space-y-4 text-left max-w-md mx-auto">
                      <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-900 mb-2">Possible reasons:</h4>
                        <ul className="text-sm text-red-800 space-y-1">
                          <li>• Certificate ID is incorrect or mistyped</li>
                          <li>• Certificate has been revoked or expired</li>
                          <li>• Certificate was not issued by a verified organization</li>
                          <li>• QR code or URL is damaged or corrupted</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">What to do:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Double-check the certificate ID</li>
                          <li>• Contact the issuing organization</li>
                          <li>• Verify the certificate source is legitimate</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Revoked Certificate Warning */}
                {verificationResult.status === 'Revoked' && (
                  <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-900">Certificate Invalid / Revoked</h4>
                        <p className="text-sm text-red-800 mt-1">
                          This certificate was revoked on {verificationResult.revokedDate} and is no longer valid.
                          {verificationResult.revokedReason && (
                            <> Reason: {verificationResult.revokedReason}</>
                          )}
                        </p>
                        <p className="text-sm text-red-700 mt-2 font-medium">
                          ⚠️ This certificate should not be accepted as proof of completion.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Draft Certificate Warning */}
                {verificationResult.status === 'Draft' && (
                  <div className="mt-6 p-4 bg-warning-100 border border-warning-200 rounded-lg">
                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-warning-900">Certificate Not Yet Issued</h4>
                        <p className="text-sm text-warning-800 mt-1">
                          This certificate is still in draft status and has not been officially issued yet.
                        </p>
                        <p className="text-sm text-warning-700 mt-2 font-medium">
                          ⏳ Please wait for the certificate to be officially issued before using it as proof of completion.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-secondary-200">
                  <button
                    onClick={() => {
                      setVerificationResult(null)
                      setSearchValue('')
                    }}
                    className="btn-secondary"
                  >
                    Verify Another Certificate
                  </button>
                  {verificationResult.valid && (
                    <button
                      onClick={() => window.print()}
                      className="btn-primary"
                    >
                      Print Verification
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-secondary-900 mb-8">How to verify certificates</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-hover text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCodeIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">QR Code</h4>
                <p className="text-secondary-600">Scan the QR code printed on your certificate for instant verification</p>
              </div>
              
              <div className="card-hover text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">Certificate ID</h4>
                <p className="text-secondary-600">Enter the unique certificate ID found on your certificate</p>
              </div>
              
              <div className="card-hover text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-2">Instant Results</h4>
                <p className="text-secondary-600">Get immediate verification results with detailed certificate information</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
              <SparklesIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                Want to create certificates like this?
              </h3>
              <p className="text-lg text-secondary-600 mb-6">
                Join thousands of organizations using WDU-Certify to create professional, verifiable certificates.
              </p>
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
