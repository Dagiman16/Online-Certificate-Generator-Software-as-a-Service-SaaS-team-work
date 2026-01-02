'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import QRCodeGenerator from '../../../components/QRCodeGenerator'
import Link from 'next/link'
import { 
  PlusIcon, 
  DocumentDuplicateIcon, 
  EyeIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ShareIcon,
  ShieldCheckIcon,
  CalendarIcon,
  AcademicCapIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function CertificatesPage() {
  const [showQRModal, setShowQRModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data for trainee's own certificates
  const certificates = [
    {
      id: 'WDU-CERT-2024-1703123456789-TRN001',
      traineeName: 'John Doe', // Current user
      courseName: 'Web Development Fundamentals',
      organizationName: 'TechCorp University',
      instructor: 'Dr. Sarah Johnson',
      trainingId: 1,
      issueDate: '2024-01-15',
      completionDate: '2024-01-10',
      status: 'Issued',
      template: 'Professional Blue',
      verificationCount: 12,
      grade: 'A+',
      duration: '40 hours',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456789-TRN001`,
      lastVerified: '2024-01-20'
    },
    {
      id: 'WDU-CERT-2024-1703123456790-TRN002',
      traineeName: 'John Doe',
      courseName: 'Data Science with Python',
      organizationName: 'DataTech Academy',
      instructor: 'Prof. Michael Chen',
      trainingId: 2,
      issueDate: '2024-01-16',
      completionDate: '2024-01-12',
      status: 'Issued',
      template: 'Modern Green',
      verificationCount: 8,
      grade: 'B+',
      duration: '60 hours',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456790-TRN002`,
      lastVerified: '2024-01-18'
    },
    {
      id: 'WDU-CERT-2024-1703123456791-TRN003',
      traineeName: 'John Doe',
      courseName: 'Digital Marketing Essentials',
      organizationName: 'Marketing Pro Institute',
      instructor: 'Lisa Anderson',
      trainingId: 3,
      issueDate: null,
      completionDate: '2024-01-14',
      status: 'Processing',
      template: 'Classic White',
      verificationCount: 0,
      grade: 'A-',
      duration: '30 hours',
      qrCode: null,
      lastVerified: null
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Issued':
        return <CheckCircleIcon className="h-4 w-4 text-success-500" />
      case 'Processing':
        return <ClockIcon className="h-4 w-4 text-warning-500" />
      case 'Revoked':
        return <XCircleIcon className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Issued':
        return 'bg-success-100 text-success-800'
      case 'Processing':
        return 'bg-warning-100 text-warning-800'
      case 'Revoked':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  const handleShowQRCode = (certificate: any) => {
    setSelectedCertificate(certificate)
    setShowQRModal(true)
  }

  const handleVerifyCertificate = (certificate: any) => {
    if (certificate.qrCode) {
      window.open(certificate.qrCode, '_blank')
    }
  }

  const handleShareCertificate = (certificate: any) => {
    if (navigator.share && certificate.qrCode) {
      navigator.share({
        title: `Certificate: ${certificate.courseName}`,
        text: `Check out my certificate for ${certificate.courseName}`,
        url: certificate.qrCode
      })
    } else if (certificate.qrCode) {
      navigator.clipboard.writeText(certificate.qrCode)
      alert('Certificate verification link copied to clipboard!')
    }
  }

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || cert.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">My Certificates</h1>
            <p className="text-secondary-600 mt-1">View and manage your earned certificates</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/verify" className="btn-secondary">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Verify Certificate
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <DocumentDuplicateIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Certificates</p>
                <p className="text-2xl font-bold text-secondary-900">{certificates.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircleIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Issued</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {certificates.filter(c => c.status === 'Issued').length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Processing</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {certificates.filter(c => c.status === 'Processing').length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <QrCodeIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Verifications</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {certificates.reduce((sum, cert) => sum + cert.verificationCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="issued">Issued</option>
                <option value="processing">Processing</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Certificate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Course & Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Verifications
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredCertificates.map((certificate) => (
                  <tr key={certificate.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          <DocumentDuplicateIcon className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-secondary-900 font-mono">{certificate.id}</div>
                          <div className="text-sm text-secondary-500">{certificate.template}</div>
                          {certificate.grade && (
                            <div className="text-xs text-accent-600 font-medium">Grade: {certificate.grade}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <AcademicCapIcon className="h-5 w-5 text-secondary-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{certificate.courseName}</div>
                          <div className="text-sm text-secondary-600">{certificate.organizationName}</div>
                          {certificate.instructor && (
                            <div className="text-xs text-secondary-500">Instructor: {certificate.instructor}</div>
                          )}
                          {certificate.duration && (
                            <div className="text-xs text-secondary-500">Duration: {certificate.duration}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {certificate.completionDate && (
                          <div className="flex items-center text-sm text-secondary-900">
                            <CalendarIcon className="h-4 w-4 mr-1 text-secondary-400" />
                            Completed: {certificate.completionDate}
                          </div>
                        )}
                        {certificate.issueDate && (
                          <div className="text-sm text-secondary-600">
                            Issued: {certificate.issueDate}
                          </div>
                        )}
                        {!certificate.issueDate && certificate.status === 'Processing' && (
                          <div className="text-sm text-warning-600">
                            Processing...
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                        {getStatusIcon(certificate.status)}
                        <span className="ml-1">{certificate.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">
                        {certificate.verificationCount} times
                      </div>
                      {certificate.lastVerified && (
                        <div className="text-xs text-secondary-500">
                          Last: {certificate.lastVerified}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {certificate.status === 'Issued' && certificate.qrCode && (
                          <>
                            <button
                              onClick={() => handleShowQRCode(certificate)}
                              className="p-2 text-secondary-600 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                              title="Show QR Code"
                            >
                              <QrCodeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleShareCertificate(certificate)}
                              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              title="Share Certificate"
                            >
                              <ShareIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleVerifyCertificate(certificate)}
                              className="p-2 text-secondary-600 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                              title="Verify Certificate"
                            >
                              <ShieldCheckIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="p-2 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 rounded-lg transition-colors"
                              title="Download PDF"
                            >
                              <ArrowDownTrayIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {certificate.status === 'Processing' && (
                          <div className="text-xs text-warning-600 px-2 py-1">
                            Certificate being processed
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <DocumentDuplicateIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No certificates found</h3>
              <p className="text-secondary-600 mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t earned any certificates yet'
                }
              </p>
              <Link href="/verify" className="btn-primary">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Verify a Certificate
              </Link>
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {showQRModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-secondary-900">Certificate QR Code</h3>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <QRCodeGenerator 
                    value={selectedCertificate.qrCode}
                    size={200}
                    showValue={true}
                    copyable={true}
                  />
                </div>
                
                <div className="text-left space-y-3">
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Certificate ID:</span>
                    <p className="font-mono text-sm text-secondary-900 break-all">{selectedCertificate.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Course:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.courseName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Organization:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.organizationName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Grade:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.grade}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Verifications:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.verificationCount} times</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Verification URL:</span>
                    <p className="font-mono text-xs text-secondary-600 break-all">{selectedCertificate.qrCode}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => handleShareCertificate(selectedCertificate)}
                    className="btn-secondary flex-1"
                  >
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share
                  </button>
                  <button
                    onClick={() => handleVerifyCertificate(selectedCertificate)}
                    className="btn-primary flex-1"
                  >
                    <ShieldCheckIcon className="h-4 w-4 mr-2" />
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}