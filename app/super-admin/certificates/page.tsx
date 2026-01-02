'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import QRCodeGenerator from '../../../components/QRCodeGenerator'
import Link from 'next/link'
import {
  DocumentDuplicateIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserIcon,
  AcademicCapIcon,
  QrCodeIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function SuperAdminCertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [organizationFilter, setOrganizationFilter] = useState('all')
  const [showQRModal, setShowQRModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  // Mock data for all certificates across organizations
  const certificates = [
    {
      id: 'WDU-CERT-2024-1703123456789-ORG001',
      traineeName: 'John Doe',
      traineeEmail: 'john.doe@email.com',
      trainingProgram: 'Web Development Fundamentals',
      organizationName: 'TechCorp University',
      organizationId: 'org-1',
      issueDate: '2024-01-15',
      status: 'issued',
      template: 'Professional Blue',
      verificationCount: 12,
      lastVerified: '2024-01-20',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456789-ORG001`,
      issuedBy: 'Dr. Sarah Johnson',
      grade: 'A+'
    },
    {
      id: 'WDU-CERT-2024-1703123456790-ORG002',
      traineeName: 'Jane Smith',
      traineeEmail: 'jane.smith@email.com',
      trainingProgram: 'Data Science with Python',
      organizationName: 'DataTech Academy',
      organizationId: 'org-2',
      issueDate: '2024-01-14',
      status: 'issued',
      template: 'Modern Green',
      verificationCount: 8,
      lastVerified: '2024-01-18',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456790-ORG002`,
      issuedBy: 'Prof. Michael Chen',
      grade: 'B+'
    },
    {
      id: 'WDU-CERT-2024-1703123456791-ORG001',
      traineeName: 'Mike Johnson',
      traineeEmail: 'mike.johnson@email.com',
      trainingProgram: 'Digital Marketing Essentials',
      organizationName: 'TechCorp University',
      organizationId: 'org-1',
      issueDate: '2024-01-13',
      status: 'revoked',
      template: 'Classic Red',
      verificationCount: 3,
      lastVerified: '2024-01-15',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456791-ORG001`,
      issuedBy: 'Lisa Anderson',
      grade: 'A-',
      revokedDate: '2024-01-16',
      revokedReason: 'Course content updated'
    },
    {
      id: 'WDU-CERT-2024-1703123456792-ORG003',
      traineeName: 'Sarah Wilson',
      traineeEmail: 'sarah.wilson@email.com',
      trainingProgram: 'Project Management Professional',
      organizationName: 'Business Excellence Institute',
      organizationId: 'org-3',
      issueDate: '2024-01-12',
      status: 'flagged',
      template: 'Professional Blue',
      verificationCount: 15,
      lastVerified: '2024-01-19',
      qrCode: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?id=WDU-CERT-2024-1703123456792-ORG003`,
      issuedBy: 'Robert Davis',
      grade: 'A',
      flaggedReason: 'Suspicious verification pattern'
    }
  ]

  const organizations = [
    'TechCorp University',
    'DataTech Academy', 
    'Business Excellence Institute'
  ]

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    revoked: certificates.filter(c => c.status === 'revoked').length,
    flagged: certificates.filter(c => c.status === 'flagged').length,
    totalVerifications: certificates.reduce((sum, cert) => sum + cert.verificationCount, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'text-success-700 bg-success-100'
      case 'revoked': return 'text-red-700 bg-red-100'
      case 'flagged': return 'text-warning-700 bg-warning-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued': return <CheckCircleIcon className="h-4 w-4" />
      case 'revoked': return <XCircleIcon className="h-4 w-4" />
      case 'flagged': return <ExclamationTriangleIcon className="h-4 w-4" />
      default: return null
    }
  }

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.traineeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.trainingProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
    const matchesOrganization = organizationFilter === 'all' || cert.organizationName === organizationFilter
    
    return matchesSearch && matchesStatus && matchesOrganization
  })

  const handleShowQRCode = (certificate: any) => {
    setSelectedCertificate(certificate)
    setShowQRModal(true)
  }

  const handleVerifyCertificate = (certificate: any) => {
    window.open(certificate.qrCode, '_blank')
  }

  const handleRevokeCertificate = (certificateId: string) => {
    if (confirm('Are you sure you want to revoke this certificate?')) {
      console.log('Revoking certificate:', certificateId)
      // Implement revoke logic
    }
  }

  const handleFlagCertificate = (certificateId: string) => {
    const reason = prompt('Enter reason for flagging this certificate:')
    if (reason) {
      console.log('Flagging certificate:', certificateId, 'Reason:', reason)
      // Implement flag logic
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Certificate Management</h1>
            <p className="text-secondary-600 mt-1">Monitor and manage certificates across all organizations</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/super-admin/reports" className="btn-secondary">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              View Reports
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <DocumentDuplicateIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Certificates</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-secondary-900">{stats.issued}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Revoked</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.revoked}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Flagged</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.flagged}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <QrCodeIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Verifications</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.totalVerifications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
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
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="issued">Issued</option>
                <option value="revoked">Revoked</option>
                <option value="flagged">Flagged</option>
              </select>
              <select
                value={organizationFilter}
                onChange={(e) => setOrganizationFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Organizations</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
              <button className="btn-secondary">
                <FunnelIcon className="h-5 w-5" />
              </button>
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
                    Trainee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Organization & Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Issue Date
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                          <UserIcon className="h-4 w-4 text-secondary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{certificate.traineeName}</div>
                          <div className="text-sm text-secondary-500">{certificate.traineeEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 text-secondary-400 mr-2" />
                          <span className="text-sm font-medium text-secondary-900">{certificate.organizationName}</span>
                        </div>
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-4 w-4 text-secondary-400 mr-2" />
                          <span className="text-sm text-secondary-700">{certificate.trainingProgram}</span>
                        </div>
                        <div className="text-xs text-secondary-500">
                          Issued by: {certificate.issuedBy}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-secondary-400 mr-2" />
                        <span className="text-sm text-secondary-900">{certificate.issueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                        {getStatusIcon(certificate.status)}
                        <span className="ml-1 capitalize">{certificate.status}</span>
                      </span>
                      {certificate.status === 'flagged' && certificate.flaggedReason && (
                        <div className="text-xs text-warning-600 mt-1">
                          {certificate.flaggedReason}
                        </div>
                      )}
                      {certificate.status === 'revoked' && certificate.revokedReason && (
                        <div className="text-xs text-red-600 mt-1">
                          {certificate.revokedReason}
                        </div>
                      )}
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
                        <button
                          onClick={() => handleShowQRCode(certificate)}
                          className="p-2 text-secondary-600 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                          title="Show QR Code"
                        >
                          <QrCodeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleVerifyCertificate(certificate)}
                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Verify Certificate"
                        >
                          <ShieldCheckIcon className="h-4 w-4" />
                        </button>
                        {certificate.status === 'issued' && (
                          <>
                            <button
                              onClick={() => handleFlagCertificate(certificate.id)}
                              className="p-2 text-secondary-600 hover:text-warning-600 hover:bg-warning-50 rounded-lg transition-colors"
                              title="Flag Certificate"
                            >
                              <ExclamationTriangleIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRevokeCertificate(certificate.id)}
                              className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Revoke Certificate"
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          </>
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
                {searchTerm || statusFilter !== 'all' || organizationFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No certificates have been issued yet'
                }
              </p>
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
                
                <div className="text-left space-y-2">
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Certificate ID:</span>
                    <p className="font-mono text-sm text-secondary-900 break-all">{selectedCertificate.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Trainee:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.traineeName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Organization:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.organizationName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Program:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.trainingProgram}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCertificate.status)}`}>
                      {getStatusIcon(selectedCertificate.status)}
                      <span className="ml-1 capitalize">{selectedCertificate.status}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-600">Verifications:</span>
                    <p className="text-sm text-secondary-900">{selectedCertificate.verificationCount} times</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => handleVerifyCertificate(selectedCertificate)}
                    className="btn-secondary flex-1"
                  >
                    Test Verification
                  </button>
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="btn-primary flex-1"
                  >
                    Close
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