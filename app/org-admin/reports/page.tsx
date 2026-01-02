'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  AcademicCapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d')
  const [reportType, setReportType] = useState('overview')

  const overviewStats = {
    totalCertificates: 1247,
    certificateGrowth: 24.3,
    totalTrainees: 892,
    traineeGrowth: 18.7,
    totalTrainings: 45,
    trainingGrowth: 12.5,
    verificationRate: 87.3,
    verificationGrowth: 5.2
  }

  const certificatesByMonth = [
    { month: 'Jan', certificates: 89, verifications: 76 },
    { month: 'Feb', certificates: 124, verifications: 108 },
    { month: 'Mar', certificates: 156, verifications: 142 },
    { month: 'Apr', certificates: 198, verifications: 167 },
    { month: 'May', certificates: 234, verifications: 201 },
    { month: 'Jun', certificates: 267, verifications: 234 }
  ]

  const topTrainings = [
    {
      id: 1,
      name: 'Web Development Fundamentals',
      certificates: 234,
      trainees: 189,
      completionRate: 92.3,
      avgRating: 4.8
    },
    {
      id: 2,
      name: 'Data Science with Python',
      certificates: 198,
      trainees: 156,
      completionRate: 88.7,
      avgRating: 4.6
    },
    {
      id: 3,
      name: 'Digital Marketing Essentials',
      certificates: 167,
      trainees: 134,
      completionRate: 85.2,
      avgRating: 4.4
    },
    {
      id: 4,
      name: 'Project Management Professional',
      certificates: 145,
      trainees: 123,
      completionRate: 91.1,
      avgRating: 4.7
    }
  ]

  const certificatesByCategory = [
    { category: 'Technical Skills', count: 456, percentage: 36.6 },
    { category: 'Professional Development', count: 334, percentage: 26.8 },
    { category: 'Compliance Training', count: 267, percentage: 21.4 },
    { category: 'Leadership', count: 123, percentage: 9.9 },
    { category: 'Safety Training', count: 67, percentage: 5.4 }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'certificate_issued',
      description: 'Certificate issued to John Doe for Web Development Fundamentals',
      timestamp: '2024-01-15 14:30',
      details: { certificateId: 'CERT-2024-001', traineeName: 'John Doe' }
    },
    {
      id: 2,
      type: 'bulk_generation',
      description: 'Bulk certificate generation completed for Data Science course',
      timestamp: '2024-01-15 13:45',
      details: { count: 23, courseName: 'Data Science with Python' }
    },
    {
      id: 3,
      type: 'verification',
      description: 'Certificate CERT-2024-001 verified by employer',
      timestamp: '2024-01-15 12:20',
      details: { certificateId: 'CERT-2024-001', verifierType: 'employer' }
    },
    {
      id: 4,
      type: 'training_completed',
      description: 'Training program "Digital Marketing" completed by 15 trainees',
      timestamp: '2024-01-15 11:15',
      details: { trainingName: 'Digital Marketing Essentials', completedCount: 15 }
    }
  ]

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-success-500" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-success-600' : 'text-red-600'
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'certificate_issued': return <DocumentDuplicateIcon className="h-5 w-5 text-primary-500" />
      case 'bulk_generation': return <DocumentDuplicateIcon className="h-5 w-5 text-accent-500" />
      case 'verification': return <CheckCircleIcon className="h-5 w-5 text-success-500" />
      case 'training_completed': return <AcademicCapIcon className="h-5 w-5 text-warning-500" />
      default: return <ChartBarIcon className="h-5 w-5 text-secondary-500" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Reports & Analytics</h1>
            <p className="text-secondary-600 mt-1">Track your organization's certificate and training performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="btn-primary">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Certificates</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {overviewStats.totalCertificates.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(overviewStats.certificateGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(overviewStats.certificateGrowth)}`}>
                    +{overviewStats.certificateGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <DocumentDuplicateIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Trainees</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {overviewStats.totalTrainees.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(overviewStats.traineeGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(overviewStats.traineeGrowth)}`}>
                    +{overviewStats.traineeGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Training Programs</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {overviewStats.totalTrainings}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(overviewStats.trainingGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(overviewStats.trainingGrowth)}`}>
                    +{overviewStats.trainingGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <AcademicCapIcon className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Verification Rate</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {overviewStats.verificationRate}%
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(overviewStats.verificationGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(overviewStats.verificationGrowth)}`}>
                    +{overviewStats.verificationGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Certificate Trend Chart */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Certificate Generation Trend</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details →
              </button>
            </div>
            <div className="h-64 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl flex items-center justify-center border-2 border-dashed border-primary-200">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-primary-400 mx-auto mb-3" />
                <p className="text-primary-600 font-medium">Certificate Trend Chart</p>
                <p className="text-sm text-primary-500">Interactive chart will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Verification Rate Chart */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Verification Analytics</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details →
              </button>
            </div>
            <div className="h-64 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl flex items-center justify-center border-2 border-dashed border-success-200">
              <div className="text-center">
                <EyeIcon className="h-12 w-12 text-success-400 mx-auto mb-3" />
                <p className="text-success-600 font-medium">Verification Chart</p>
                <p className="text-sm text-success-500">Interactive chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Training Programs */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Top Training Programs</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {topTrainings.map((training, index) => (
                <div key={training.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">{training.name}</h3>
                      <p className="text-sm text-secondary-600">
                        {training.certificates} certificates • {training.trainees} trainees
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-secondary-900">{training.completionRate}%</div>
                    <div className="text-sm text-secondary-600">completion</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates by Category */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Certificates by Category</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details →
              </button>
            </div>
            <div className="space-y-4">
              {certificatesByCategory.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-900">{category.category}</span>
                    <span className="text-sm text-secondary-600">{category.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-secondary-500">{category.percentage}% of total</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">Recent Activity</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All Activity →
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 border border-secondary-200 rounded-lg">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{activity.description}</p>
                  <p className="text-sm text-secondary-600 mt-1">{activity.timestamp}</p>
                </div>
                <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}