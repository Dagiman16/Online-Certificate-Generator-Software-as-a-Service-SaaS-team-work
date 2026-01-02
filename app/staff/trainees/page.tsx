'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function StaffTraineesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [programFilter, setProgramFilter] = useState('all')

  const trainees = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      enrollmentDate: '2024-01-15',
      status: 'active',
      program: 'Web Development Fundamentals',
      progress: 75,
      completedCourses: 8,
      totalCourses: 12,
      certificatesEarned: 2,
      lastActivity: '2024-01-20 14:30'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      enrollmentDate: '2024-01-10',
      status: 'completed',
      program: 'Data Science with Python',
      progress: 100,
      completedCourses: 16,
      totalCourses: 16,
      certificatesEarned: 4,
      lastActivity: '2024-01-21 09:15'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      enrollmentDate: '2024-01-08',
      status: 'completed',
      program: 'Digital Marketing Essentials',
      progress: 100,
      completedCourses: 10,
      totalCourses: 10,
      certificatesEarned: 3,
      lastActivity: '2024-01-18 16:45'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 456-7890',
      enrollmentDate: '2024-01-12',
      status: 'active',
      program: 'Project Management Professional',
      progress: 45,
      completedCourses: 5,
      totalCourses: 14,
      certificatesEarned: 1,
      lastActivity: '2024-01-16 11:20'
    }
  ]

  const programs = ['Web Development Fundamentals', 'Data Science with Python', 'Digital Marketing Essentials', 'Project Management Professional']

  const stats = {
    total: trainees.length,
    active: trainees.filter(t => t.status === 'active').length,
    completed: trainees.filter(t => t.status === 'completed').length,
    avgProgress: Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-700 bg-success-100'
      case 'completed': return 'text-primary-700 bg-primary-100'
      case 'inactive': return 'text-warning-700 bg-warning-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon className="h-4 w-4" />
      case 'completed': return <AcademicCapIcon className="h-4 w-4" />
      case 'inactive': return <ClockIcon className="h-4 w-4" />
      default: return null
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success-500'
    if (progress >= 60) return 'bg-primary-500'
    if (progress >= 40) return 'bg-warning-500'
    return 'bg-red-500'
  }

  const filteredTrainees = trainees.filter(trainee => {
    const matchesSearch = trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.program.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || trainee.status === statusFilter
    const matchesProgram = programFilter === 'all' || trainee.program === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Trainees</h1>
            <p className="text-secondary-600 mt-1">View and manage registered trainees</p>
          </div>
          <Link href="/staff/trainees/register" className="btn-primary">
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Register Trainee
          </Link>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <UserIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Trainees</p>
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
                <p className="text-sm font-medium text-secondary-600">Active</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <AcademicCapIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Completed</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-accent-600 font-bold text-lg">{stats.avgProgress}%</span>
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Avg Progress</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.avgProgress}%</p>
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
                  placeholder="Search trainees..."
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
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Programs</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
              <button className="btn-secondary">
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trainees Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Trainee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredTrainees.map((trainee) => (
                  <tr key={trainee.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-semibold text-lg">
                            {trainee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{trainee.name}</div>
                          <div className="flex items-center text-sm text-secondary-500 mt-1">
                            <EnvelopeIcon className="h-3 w-3 mr-1" />
                            {trainee.email}
                          </div>
                          <div className="flex items-center text-sm text-secondary-500">
                            <PhoneIcon className="h-3 w-3 mr-1" />
                            {trainee.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-4 w-4 text-secondary-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{trainee.program}</div>
                          <div className="text-sm text-secondary-500">
                            {trainee.completedCourses}/{trainee.totalCourses} courses • {trainee.certificatesEarned} certificates
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-secondary-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(trainee.progress)}`}
                            style={{ width: `${trainee.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-secondary-900 min-w-[3rem]">
                          {trainee.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trainee.status)}`}>
                        {getStatusIcon(trainee.status)}
                        <span className="ml-1 capitalize">{trainee.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-secondary-900">
                        <CalendarIcon className="h-4 w-4 text-secondary-400 mr-2" />
                        {trainee.enrollmentDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {trainee.status === 'completed' && (
                          <Link
                            href={`/staff/certificates/generate?trainee=${trainee.id}`}
                            className="p-2 text-secondary-600 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                            title="Generate Certificate"
                          >
                            <DocumentDuplicateIcon className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTrainees.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No trainees found</h3>
              <p className="text-secondary-600 mb-4">
                {searchTerm || statusFilter !== 'all' || programFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by registering your first trainee'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && programFilter === 'all' && (
                <Link href="/staff/trainees/register" className="btn-primary">
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  Register Trainee
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}