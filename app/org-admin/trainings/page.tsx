'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  AcademicCapIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  PauseIcon,
  MapPinIcon,
  UserIcon,
  SwatchIcon
} from '@heroicons/react/24/outline'

export default function TrainingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const trainings = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of HTML, CSS, and JavaScript for modern web development',
      category: 'Technology',
      status: 'active',
      duration: '40 hours',
      enrolledCount: 45,
      completedCount: 32,
      certificatesIssued: 28,
      createdDate: '2024-01-10',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      instructor: 'Dr. Sarah Johnson',
      difficulty: 'Beginner',
      price: 299,
      location: 'New York Training Center',
      topic: 'Frontend Development',
      trainers: ['Dr. Sarah Johnson', 'Mike Chen']
    },
    {
      id: '2',
      title: 'Data Science with Python',
      description: 'Comprehensive course covering data analysis, visualization, and machine learning',
      category: 'Data Science',
      status: 'active',
      duration: '60 hours',
      enrolledCount: 38,
      completedCount: 25,
      certificatesIssued: 22,
      createdDate: '2024-01-08',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      instructor: 'Prof. Mike Chen',
      difficulty: 'Intermediate',
      price: 499,
      location: 'Boston Data Lab',
      topic: 'Data Analytics & ML',
      trainers: ['Prof. Mike Chen', 'Dr. Emily Davis']
    },
    {
      id: '3',
      title: 'Digital Marketing Essentials',
      description: 'Master the fundamentals of digital marketing and social media strategy',
      category: 'Marketing',
      status: 'draft',
      duration: '30 hours',
      enrolledCount: 0,
      completedCount: 0,
      certificatesIssued: 0,
      createdDate: '2024-01-05',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      instructor: 'Lisa Anderson',
      difficulty: 'Beginner',
      price: 199,
      location: 'Chicago Marketing Hub',
      topic: 'Digital Marketing Strategy',
      trainers: ['Lisa Anderson', 'John Williams']
    },
    {
      id: '4',
      title: 'Project Management Professional',
      description: 'Prepare for PMP certification with comprehensive project management training',
      category: 'Management',
      status: 'completed',
      duration: '50 hours',
      enrolledCount: 28,
      completedCount: 28,
      certificatesIssued: 26,
      createdDate: '2023-12-15',
      startDate: '2023-12-20',
      endDate: '2024-01-20',
      instructor: 'John Williams',
      difficulty: 'Advanced',
      price: 599,
      location: 'Seattle Business Center',
      topic: 'Project Management & Leadership',
      trainers: ['John Williams', 'Dr. Sarah Johnson']
    },
    {
      id: '5',
      title: 'Cybersecurity Fundamentals',
      description: 'Essential cybersecurity concepts and practices for modern organizations',
      category: 'Security',
      status: 'paused',
      duration: '35 hours',
      enrolledCount: 22,
      completedCount: 8,
      certificatesIssued: 5,
      createdDate: '2024-01-03',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      instructor: 'Dr. Emily Davis',
      difficulty: 'Intermediate',
      price: 399,
      location: 'Austin Security Lab',
      topic: 'Information Security',
      trainers: ['Dr. Emily Davis', 'Prof. Mike Chen']
    }
  ]

  const categories = ['all', 'Technology', 'Data Science', 'Marketing', 'Management', 'Security']
  const statuses = ['all', 'active', 'draft', 'completed', 'paused']

  const stats = {
    total: trainings.length,
    active: trainings.filter(t => t.status === 'active').length,
    draft: trainings.filter(t => t.status === 'draft').length,
    completed: trainings.filter(t => t.status === 'completed').length
  }

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || training.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || training.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-700 bg-success-100'
      case 'draft': return 'text-warning-700 bg-warning-100'
      case 'completed': return 'text-primary-700 bg-primary-100'
      case 'paused': return 'text-red-700 bg-red-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayIcon className="h-4 w-4" />
      case 'draft': return <ClockIcon className="h-4 w-4" />
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />
      case 'paused': return <PauseIcon className="h-4 w-4" />
      default: return null
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success-700 bg-success-100'
      case 'Intermediate': return 'text-warning-700 bg-warning-100'
      case 'Advanced': return 'text-red-700 bg-red-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const handleDelete = (trainingId: string) => {
    if (confirm('Are you sure you want to delete this training? This action cannot be undone.')) {
      console.log('Deleting training:', trainingId)
    }
  }

  const handleStatusChange = (trainingId: string, newStatus: string) => {
    console.log('Changing status:', trainingId, newStatus)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Training Programs</h1>
            <p className="text-secondary-600 mt-1">Create and manage your training courses</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
              Import Training
            </button>
            <Link href="/org-admin/trainings/create" className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Training
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <AcademicCapIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Programs</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <PlayIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Active</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Draft</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.draft}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircleIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Completed</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search trainings..."
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
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <button className="btn-secondary">
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trainings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrainings.map((training) => (
            <div key={training.id} className="card hover:shadow-medium transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900">{training.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(training.status)}`}>
                      {getStatusIcon(training.status)}
                      <span className="ml-1 capitalize">{training.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 mb-3">{training.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-secondary-600">
                      <AcademicCapIcon className="h-4 w-4 mr-2 text-secondary-400" />
                      <span className="font-medium">Topic:</span>
                      <span className="ml-1">{training.topic}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-600">
                      <MapPinIcon className="h-4 w-4 mr-2 text-secondary-400" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-1">{training.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-600">
                      <UserIcon className="h-4 w-4 mr-2 text-secondary-400" />
                      <span className="font-medium">Trainers:</span>
                      <span className="ml-1">{training.trainers.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-secondary-500">
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {training.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(training.difficulty)}`}>
                      {training.difficulty}
                    </span>
                    <span className="font-medium text-secondary-900">${training.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Link
                    href={`/org-admin/certificates/design?training=${training.id}`}
                    className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Design Certificate"
                  >
                    <SwatchIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/org-admin/trainees?training=${training.id}`}
                    className="p-2 text-secondary-600 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                    title="Manage Trainees"
                  >
                    <UserGroupIcon className="h-4 w-4" />
                  </Link>
                  <button
                    className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(training.id)}
                    className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <UserGroupIcon className="h-4 w-4 text-secondary-400 mr-1" />
                    <span className="font-semibold text-secondary-900">{training.enrolledCount}</span>
                  </div>
                  <div className="text-xs text-secondary-600">Enrolled</div>
                </div>
                <div className="text-center p-3 bg-success-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircleIcon className="h-4 w-4 text-success-500 mr-1" />
                    <span className="font-semibold text-success-700">{training.completedCount}</span>
                  </div>
                  <div className="text-xs text-success-600">Completed</div>
                </div>
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DocumentDuplicateIcon className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="font-semibold text-primary-700">{training.certificatesIssued}</span>
                  </div>
                  <div className="text-xs text-primary-600">Certificates</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                <div className="text-sm text-secondary-600">
                  <span>Instructor: {training.instructor}</span>
                </div>
                <div className="text-sm text-secondary-500">
                  {training.startDate} - {training.endDate}
                </div>
              </div>

              {/* Quick Actions */}
              {training.status === 'draft' && (
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(training.id, 'active')}
                    className="btn-primary text-sm flex-1"
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Publish
                  </button>
                </div>
              )}

              {training.status === 'active' && (
                <div className="mt-4 flex space-x-2">
                  <Link
                    href={`/org-admin/trainees/add?training=${training.id}`}
                    className="btn-primary text-sm flex-1"
                  >
                    <UserIcon className="h-4 w-4 mr-1" />
                    Add Trainee
                  </Link>
                  <button
                    onClick={() => handleStatusChange(training.id, 'paused')}
                    className="btn-secondary text-sm flex-1"
                  >
                    <PauseIcon className="h-4 w-4 mr-1" />
                    Pause
                  </button>
                </div>
              )}

              {training.status === 'paused' && (
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(training.id, 'active')}
                    className="btn-primary text-sm flex-1"
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Resume
                  </button>
                  <Link
                    href={`/org-admin/trainees/add?training=${training.id}`}
                    className="btn-secondary text-sm flex-1"
                  >
                    <UserIcon className="h-4 w-4 mr-1" />
                    Add Trainee
                  </Link>
                </div>
              )}

              {training.status === 'completed' && (
                <div className="mt-4 flex space-x-2">
                  <Link
                    href={`/org-admin/certificates/generate?training=${training.id}`}
                    className="btn-primary text-sm flex-1"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                    Generate Certificates
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainings.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No training programs found</h3>
            <p className="text-secondary-600 mb-6">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first training program to get started'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
              <Link href="/org-admin/trainings/create" className="btn-primary">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Training Program
              </Link>
            )}
          </div>
        )}

        {/* Training Tips */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AcademicCapIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Training Program Tips</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Create detailed course descriptions to attract more participants</li>
                <li>• Set realistic duration and difficulty levels</li>
                <li>• Use draft status to prepare content before publishing</li>
                <li>• Monitor completion rates to improve course quality</li>
                <li>• Issue certificates to recognize achievements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}