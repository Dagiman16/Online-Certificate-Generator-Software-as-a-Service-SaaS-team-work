'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentDuplicateIcon,
  ArrowRightIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function EnhancedTraineesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [programFilter, setProgramFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([])
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [copyFromTopic, setCopyFromTopic] = useState('')
  const [copyToTopic, setCopyToTopic] = useState('')

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

  const trainees = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      enrollmentDate: '2024-01-15',
      completionDate: '2024-02-15',
      certificateIssueDate: '2024-02-16',
      status: 'completed',
      program: 'Web Development Fundamentals',
      trainingTopic: 'Frontend Development',
      progress: 100,
      completedCourses: 12,
      totalCourses: 12,
      certificatesEarned: 1,
      lastActivity: '2024-02-15 16:30',
      grade: 'A+'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      enrollmentDate: '2024-01-10',
      completionDate: null,
      certificateIssueDate: null,
      status: 'active',
      program: 'Data Science with Python',
      trainingTopic: 'Data Analytics & ML',
      progress: 65,
      completedCourses: 8,
      totalCourses: 15,
      certificatesEarned: 0,
      lastActivity: '2024-01-22 10:15',
      grade: null
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      enrollmentDate: '2024-01-20',
      completionDate: '2024-02-20',
      certificateIssueDate: '2024-02-21',
      status: 'completed',
      program: 'Digital Marketing Essentials',
      trainingTopic: 'Digital Marketing Strategy',
      progress: 100,
      completedCourses: 10,
      totalCourses: 10,
      certificatesEarned: 1,
      lastActivity: '2024-02-20 14:45',
      grade: 'B+'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 456-7890',
      enrollmentDate: '2024-01-25',
      completionDate: null,
      certificateIssueDate: null,
      status: 'active',
      program: 'Project Management Professional',
      trainingTopic: 'Project Management & Leadership',
      progress: 40,
      completedCourses: 6,
      totalCourses: 15,
      certificatesEarned: 0,
      lastActivity: '2024-01-28 09:30',
      grade: null
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 567-8901',
      enrollmentDate: '2024-01-12',
      completionDate: null,
      certificateIssueDate: null,
      status: 'inactive',
      program: 'Cybersecurity Fundamentals',
      trainingTopic: 'Information Security',
      progress: 25,
      completedCourses: 3,
      totalCourses: 12,
      certificatesEarned: 0,
      lastActivity: '2024-01-18 11:20',
      grade: null
    }
  ]

  const programs = ['Web Development Fundamentals', 'Data Science with Python', 'Digital Marketing Essentials', 'Project Management Professional', 'Cybersecurity Fundamentals']

  const stats = {
    total: trainees.length,
    active: trainees.filter(t => t.status === 'active').length,
    completed: trainees.filter(t => t.status === 'completed').length,
    inactive: trainees.filter(t => t.status === 'inactive').length,
    avgProgress: Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length)
  }

  const filteredTrainees = trainees.filter(trainee => {
    const matchesSearch = trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.trainingTopic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || trainee.status === statusFilter
    const matchesProgram = programFilter === 'all' || trainee.program === programFilter
    const matchesTopic = topicFilter === 'all' || trainee.trainingTopic === topicFilter
    return matchesSearch && matchesStatus && matchesProgram && matchesTopic
  })

  const handleTraineeSelect = (traineeId: string) => {
    setSelectedTrainees(prev => 
      prev.includes(traineeId) 
        ? prev.filter(id => id !== traineeId)
        : [...prev, traineeId]
    )
  }

  const handleSelectAll = () => {
    setSelectedTrainees(
      selectedTrainees.length === filteredTrainees.length 
        ? [] 
        : filteredTrainees.map(t => t.id)
    )
  }

  const handleCopyTrainees = () => {
    if (selectedTrainees.length === 0) {
      alert('Please select trainees to copy')
      return
    }
    setShowCopyModal(true)
  }

  const executeCopyTrainees = () => {
    console.log('Copying trainees:', {
      trainees: selectedTrainees,
      fromTopic: copyFromTopic,
      toTopic: copyToTopic
    })
    // Implement copy logic here
    setShowCopyModal(false)
    setSelectedTrainees([])
    setCopyFromTopic('')
    setCopyToTopic('')
  }

  const handleDelete = (traineeId: string) => {
    if (confirm('Are you sure you want to delete this trainee?')) {
      console.log('Deleting trainee:', traineeId)
    }
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Trainee Management</h1>
            <p className="text-secondary-600 mt-1">Manage training participants, track progress, and copy between topics</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/org-admin/trainees/import" className="btn-secondary">
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Bulk Import
            </Link>
            <Link href="/org-admin/trainees/register-for-training" className="btn-secondary">
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Register for Training
            </Link>
            <Link href="/org-admin/trainees/add" className="btn-primary">
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Manual Registration
            </Link>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTrainees.length > 0 && (
          <div className="card bg-primary-50 border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-primary-700 font-medium">
                  {selectedTrainees.length} trainee{selectedTrainees.length > 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => setSelectedTrainees([])}
                  className="text-primary-600 hover:text-primary-800"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCopyTrainees}
                  className="btn-secondary"
                >
                  <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                  Copy to Topic
                </button>
                <button className="btn-secondary">
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                  Export Selected
                </button>
                <button className="btn-danger">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Inactive</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.inactive}</p>
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
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Topics</option>
                {trainingTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
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
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTrainees.length === filteredTrainees.length && filteredTrainees.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Trainee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Training Topic
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
                    Completion Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Certificate Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredTrainees.map((trainee) => (
                  <tr key={trainee.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedTrainees.includes(trainee.id)}
                        onChange={() => handleTraineeSelect(trainee.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <UserIcon className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{trainee.name}</div>
                          <div className="text-sm text-secondary-500">{trainee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                        {trainee.trainingTopic}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {trainee.program}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-secondary-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${trainee.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-secondary-900">{trainee.progress}%</span>
                      </div>
                      <div className="text-xs text-secondary-500 mt-1">
                        {trainee.completedCourses}/{trainee.totalCourses} courses
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trainee.status)}`}>
                        {getStatusIcon(trainee.status)}
                        <span className="ml-1 capitalize">{trainee.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {trainee.completionDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {trainee.certificateIssueDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-secondary-600 hover:text-secondary-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(trainee.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
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
                {searchTerm || statusFilter !== 'all' || programFilter !== 'all' || topicFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Add your first trainee to get started'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && programFilter === 'all' && topicFilter === 'all' && (
                <Link href="/org-admin/trainees/add" className="btn-primary">
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  Add First Trainee
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Copy Modal */}
        {showCopyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Copy Trainees to Topic</h3>
                <button
                  onClick={() => setShowCopyModal(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    From Topic (Optional)
                  </label>
                  <select
                    value={copyFromTopic}
                    onChange={(e) => setCopyFromTopic(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Topics</option>
                    {trainingTopics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    To Topic *
                  </label>
                  <select
                    value={copyToTopic}
                    onChange={(e) => setCopyToTopic(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select destination topic</option>
                    {trainingTopics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-primary-600 mt-0.5 mr-2" />
                    <div className="text-sm text-primary-800">
                      <p className="font-medium mb-1">Copy Operation</p>
                      <p>This will copy {selectedTrainees.length} selected trainee{selectedTrainees.length > 1 ? 's' : ''} to the destination topic. Original records will remain unchanged.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCopyModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={executeCopyTrainees}
                  disabled={!copyToTopic}
                  className="btn-primary"
                >
                  <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                  Copy Trainees
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Training Topics Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Training Topics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trainingTopics.map(topic => {
              const topicTrainees = trainees.filter(t => t.trainingTopic === topic)
              const activeCount = topicTrainees.filter(t => t.status === 'active').length
              const completedCount = topicTrainees.filter(t => t.status === 'completed').length
              
              return (
                <div key={topic} className="p-4 border border-secondary-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-secondary-900 mb-2">{topic}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Total:</span>
                      <span className="font-medium">{topicTrainees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Active:</span>
                      <span className="text-success-600 font-medium">{activeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Completed:</span>
                      <span className="text-primary-600 font-medium">{completedCount}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AcademicCapIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Trainee Management Features</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• <strong>Manual Registration:</strong> Add individual trainees with required fields</li>
                <li>• <strong>Bulk Import:</strong> Import from Excel (.xlsx) or Word (.docx) files</li>
                <li>• <strong>Copy Between Topics:</strong> Duplicate trainees across training topics</li>
                <li>• <strong>Progress Tracking:</strong> Monitor completion dates and certificate issue dates</li>
                <li>• <strong>Validation:</strong> System validates required columns and data formats</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}