'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function SuperAdminOrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrgs, setSelectedOrgs] = useState<number[]>([])

  const organizations = [
    {
      id: 1,
      name: 'TechCorp University',
      email: 'admin@techcorp.edu',
      contactPerson: 'Dr. Sarah Johnson',
      phone: '+1 (555) 123-4567',
      status: 'pending',
      plan: 'Professional',
      registeredAt: '2024-01-15',
      certificatesIssued: 0,
      monthlyRevenue: 0,
      address: '123 Tech Street, Silicon Valley, CA'
    },
    {
      id: 2,
      name: 'Global Training Institute',
      email: 'contact@gti.com',
      contactPerson: 'Michael Chen',
      phone: '+1 (555) 987-6543',
      status: 'approved',
      plan: 'Enterprise',
      registeredAt: '2024-01-10',
      certificatesIssued: 1247,
      monthlyRevenue: 299,
      address: '456 Learning Ave, New York, NY'
    },
    {
      id: 3,
      name: 'Skills Academy',
      email: 'info@skillsacademy.org',
      contactPerson: 'Emily Rodriguez',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      plan: 'Starter',
      registeredAt: '2024-01-13',
      certificatesIssued: 0,
      monthlyRevenue: 0,
      address: '789 Education Blvd, Austin, TX'
    },
    {
      id: 4,
      name: 'Digital Learning Hub',
      email: 'admin@dlhub.net',
      contactPerson: 'David Wilson',
      phone: '+1 (555) 321-0987',
      status: 'suspended',
      plan: 'Professional',
      registeredAt: '2024-01-05',
      certificatesIssued: 892,
      monthlyRevenue: 49,
      address: '321 Digital Way, Seattle, WA'
    },
    {
      id: 5,
      name: 'Corporate Training Solutions',
      email: 'hello@ctstraining.com',
      contactPerson: 'Lisa Anderson',
      phone: '+1 (555) 654-3210',
      status: 'approved',
      plan: 'Professional',
      registeredAt: '2024-01-08',
      certificatesIssued: 2156,
      monthlyRevenue: 49,
      address: '654 Business Park, Chicago, IL'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success-700 bg-success-100 border-success-200'
      case 'pending': return 'text-warning-700 bg-warning-100 border-warning-200'
      case 'suspended': return 'text-red-700 bg-red-100 border-red-200'
      default: return 'text-secondary-700 bg-secondary-100 border-secondary-200'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'text-purple-700 bg-purple-100'
      case 'Professional': return 'text-primary-700 bg-primary-100'
      case 'Starter': return 'text-secondary-700 bg-secondary-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectOrg = (orgId: number) => {
    setSelectedOrgs(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    )
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for organizations:`, selectedOrgs)
    // Implement bulk actions
    setSelectedOrgs([])
  }

  const handleApproveOrg = (orgId: number) => {
    console.log('Approving organization:', orgId)
    // Here you would make API call to approve organization
    // Update local state or refetch data
  }

  const handleRejectOrg = (orgId: number) => {
    if (confirm('Are you sure you want to reject this organization? This action cannot be undone.')) {
      console.log('Rejecting organization:', orgId)
      // Here you would make API call to reject organization
    }
  }

  const handleSuspendOrg = (orgId: number) => {
    const reason = prompt('Please provide a reason for suspension:')
    if (reason) {
      console.log('Suspending organization:', orgId, 'Reason:', reason)
      // Here you would make API call to suspend organization
    }
  }

  const handleReactivateOrg = (orgId: number) => {
    console.log('Reactivating organization:', orgId)
    // Here you would make API call to reactivate organization
  }

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Organizations Management</h1>
            <p className="text-secondary-600 mt-1">Manage and approve organizations</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Refresh
            </button>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Organization
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">{organizations.length}</p>
                <p className="text-sm text-secondary-600">Total Organizations</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">
                  {organizations.filter(org => org.status === 'pending').length}
                </p>
                <p className="text-sm text-secondary-600">Pending Approval</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
                <CheckIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">
                  {organizations.filter(org => org.status === 'approved').length}
                </p>
                <p className="text-sm text-secondary-600">Approved</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <XMarkIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">
                  {organizations.filter(org => org.status === 'suspended').length}
                </p>
                <p className="text-sm text-secondary-600">Suspended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="suspended">Suspended</option>
              </select>
              <button className="btn-secondary">
                <FunnelIcon className="h-5 w-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedOrgs.length > 0 && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-900">
                  {selectedOrgs.length} organization(s) selected
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleBulkAction('approve')}
                    className="px-3 py-1 bg-success-600 text-white text-sm rounded-lg hover:bg-success-700"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleBulkAction('suspend')}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    Suspend
                  </button>
                  <button 
                    onClick={() => setSelectedOrgs([])}
                    className="px-3 py-1 bg-secondary-600 text-white text-sm rounded-lg hover:bg-secondary-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Organizations Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrgs(filteredOrganizations.map(org => org.id))
                        } else {
                          setSelectedOrgs([])
                        }
                      }}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Certificates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredOrganizations.map((org) => (
                  <tr key={org.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrgs.includes(org.id)}
                        onChange={() => handleSelectOrg(org.id)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">
                            {org.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{org.name}</div>
                          <div className="text-sm text-secondary-500">{org.email}</div>
                          <div className="text-xs text-secondary-400">Registered: {org.registeredAt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-secondary-900">{org.contactPerson}</div>
                      <div className="text-sm text-secondary-500">{org.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(org.status)}`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(org.plan)}`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-900">
                      {org.certificatesIssued.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-900">
                      ${org.monthlyRevenue}/mo
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/super-admin/organizations/${org.id}`}
                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        {org.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApproveOrg(org.id)}
                              className="p-2 text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                              title="Approve Organization"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectOrg(org.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject Organization"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {org.status === 'approved' && (
                          <button 
                            onClick={() => handleSuspendOrg(org.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Suspend Organization"
                          >
                            <ExclamationTriangleIcon className="h-4 w-4" />
                          </button>
                        )}
                        {org.status === 'suspended' && (
                          <button 
                            onClick={() => handleReactivateOrg(org.id)}
                            className="p-2 text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                            title="Reactivate Organization"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}