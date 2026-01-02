'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import DashboardLayout from '../../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function OrganizationDetailPage() {
  const params = useParams()
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [actionReason, setActionReason] = useState('')

  // Mock data - in real app, fetch based on params.id
  const organization = {
    id: params.id,
    name: 'TechCorp University',
    email: 'admin@techcorp.edu',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.edu',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    contactPerson: 'Dr. Sarah Johnson',
    contactTitle: 'Director of Continuing Education',
    contactEmail: 'sarah.johnson@techcorp.edu',
    contactPhone: '+1 (555) 123-4568',
    status: 'pending',
    plan: 'Professional',
    registeredAt: '2024-01-15',
    approvedAt: null,
    certificatesIssued: 0,
    activeTrainees: 0,
    monthlyRevenue: 0,
    industry: 'Education',
    organizationType: 'University',
    foundedYear: '1995',
    employeeCount: '500-1000',
    description: 'Leading technology university focused on innovative education and research in computer science, engineering, and digital technologies.',
    documents: [
      { name: 'Business License', status: 'verified', uploadedAt: '2024-01-15' },
      { name: 'Tax ID Certificate', status: 'verified', uploadedAt: '2024-01-15' },
      { name: 'Accreditation Certificate', status: 'pending', uploadedAt: '2024-01-15' }
    ],
    activityLog: [
      { action: 'Registration submitted', timestamp: '2024-01-15 10:30', user: 'System' },
      { action: 'Documents uploaded', timestamp: '2024-01-15 10:45', user: 'Dr. Sarah Johnson' },
      { action: 'Verification requested', timestamp: '2024-01-15 11:00', user: 'Dr. Sarah Johnson' }
    ]
  }

  const handleApprove = () => {
    console.log('Approving organization:', organization.id, 'Reason:', actionReason)
    setShowApprovalModal(false)
    setActionReason('')
    // Implement approval logic
  }

  const handleReject = () => {
    console.log('Rejecting organization:', organization.id, 'Reason:', actionReason)
    setShowApprovalModal(false)
    setActionReason('')
    // Implement rejection logic
  }

  const handleSuspend = () => {
    console.log('Suspending organization:', organization.id, 'Reason:', actionReason)
    setShowSuspendModal(false)
    setActionReason('')
    // Implement suspension logic
  }

  const handleReactivate = () => {
    console.log('Reactivating organization:', organization.id)
    // Implement reactivation logic
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success-700 bg-success-100 border-success-200'
      case 'pending': return 'text-warning-700 bg-warning-100 border-warning-200'
      case 'suspended': return 'text-red-700 bg-red-100 border-red-200'
      case 'rejected': return 'text-red-700 bg-red-100 border-red-200'
      default: return 'text-secondary-700 bg-secondary-100 border-secondary-200'
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-success-700 bg-success-100'
      case 'pending': return 'text-warning-700 bg-warning-100'
      case 'rejected': return 'text-red-700 bg-red-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/super-admin/organizations"
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">{organization.name}</h1>
              <p className="text-secondary-600 mt-1">Organization Details & Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(organization.status)}`}>
              {organization.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {organization.status === 'pending' && (
          <div className="card bg-warning-50 border-warning-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-warning-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-warning-900">Pending Approval</h3>
                  <p className="text-sm text-warning-700">This organization is awaiting your review and approval</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowApprovalModal(true)
                    setActionReason('')
                  }}
                  className="btn-secondary text-red-600 hover:bg-red-50"
                >
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Reject
                </button>
                <button 
                  onClick={() => {
                    setShowApprovalModal(true)
                    setActionReason('')
                  }}
                  className="btn-success"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {organization.status === 'approved' && (
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-success-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-success-900">Approved Organization</h3>
                  <p className="text-sm text-success-700">This organization is active and in good standing</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSuspendModal(true)}
                className="btn-secondary text-red-600 hover:bg-red-50"
              >
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                Suspend
              </button>
            </div>
          </div>
        )}

        {organization.status === 'suspended' && (
          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircleIcon className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-red-900">Suspended Organization</h3>
                  <p className="text-sm text-red-700">This organization has been suspended</p>
                </div>
              </div>
              <button 
                onClick={handleReactivate}
                className="btn-success"
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Reactivate
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <DocumentDuplicateIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Certificates</p>
                <p className="text-2xl font-bold text-secondary-900">{organization.certificatesIssued}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <UsersIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Trainees</p>
                <p className="text-2xl font-bold text-secondary-900">{organization.activeTrainees}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-secondary-900">${organization.monthlyRevenue}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ChartBarIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Plan</p>
                <p className="text-2xl font-bold text-secondary-900">{organization.plan}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Organization Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Organization Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Organization Name</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <BuildingOfficeIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{organization.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Industry</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.industry}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Organization Type</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.organizationType}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Founded Year</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.foundedYear}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Employee Count</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.employeeCount}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Registered Date</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{organization.registeredAt}</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Email</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{organization.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Phone</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{organization.phone}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Website</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <GlobeAltIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                      {organization.website}
                    </a>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Address</label>
                  <div className="flex items-start p-3 bg-secondary-50 rounded-lg">
                    <MapPinIcon className="h-5 w-5 text-secondary-400 mr-3 mt-0.5" />
                    <span className="text-secondary-900">{organization.address}</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.description}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Primary Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Contact Person</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.contactPerson}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Title</label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{organization.contactTitle}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Email</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{organization.contactEmail}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Phone</label>
                  <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-secondary-400 mr-3" />
                    <span className="text-secondary-900">{organization.contactPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="card">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Verification Documents</h2>
              <div className="space-y-3">
                {organization.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DocumentDuplicateIcon className="h-5 w-5 text-secondary-400" />
                      <div>
                        <h3 className="font-medium text-secondary-900">{doc.name}</h3>
                        <p className="text-sm text-secondary-600">Uploaded: {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Log */}
            <div className="card">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Activity Log</h2>
              <div className="space-y-4">
                {organization.activityLog.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-secondary-900">{log.action}</p>
                      <p className="text-xs text-secondary-600">{log.user}</p>
                      <p className="text-xs text-secondary-500">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full btn-secondary text-sm justify-start">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Send Email
                </button>
                <button className="w-full btn-secondary text-sm justify-start">
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  View Reports
                </button>
                <button className="w-full btn-secondary text-sm justify-start">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  Change Plan
                </button>
                <button className="w-full btn-secondary text-sm justify-start text-red-600 hover:bg-red-50">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                {organization.status === 'pending' ? 'Approve or Reject Organization' : 'Confirm Action'}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Reason/Notes (optional)
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  rows={4}
                  className="input-field"
                  placeholder="Enter reason or notes..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 btn-secondary text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 btn-success"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suspend Modal */}
        {showSuspendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Suspend Organization</h3>
              <p className="text-secondary-600 mb-4">
                Are you sure you want to suspend this organization? They will lose access to all features.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Reason for Suspension *
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  rows={4}
                  className="input-field"
                  placeholder="Enter reason for suspension..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSuspendModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSuspend}
                  disabled={!actionReason.trim()}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suspend
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}