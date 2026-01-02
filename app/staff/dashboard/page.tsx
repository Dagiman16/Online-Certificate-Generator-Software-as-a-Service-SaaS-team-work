'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import Link from 'next/link'
import {
  UserPlusIcon,
  DocumentDuplicateIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline'

export default function StaffDashboardPage() {
  const [recentActivity] = useState([
    {
      id: 1,
      type: 'trainee_registered',
      description: 'Registered new trainee: John Doe',
      timestamp: '2024-01-21 14:30',
      icon: UserPlusIcon,
      color: 'text-primary-600 bg-primary-100'
    },
    {
      id: 2,
      type: 'certificate_generated',
      description: 'Generated certificate for Jane Smith',
      timestamp: '2024-01-21 13:15',
      icon: DocumentDuplicateIcon,
      color: 'text-success-600 bg-success-100'
    },
    {
      id: 3,
      type: 'trainee_registered',
      description: 'Registered new trainee: Mike Johnson',
      timestamp: '2024-01-21 11:45',
      icon: UserPlusIcon,
      color: 'text-primary-600 bg-primary-100'
    }
  ])

  const stats = {
    traineesRegistered: 24,
    certificatesGenerated: 18,
    pendingCertificates: 6,
    thisWeekActivity: 12
  }

  const quickActions = [
    {
      title: 'Register Trainee',
      description: 'Add a new trainee to the system',
      href: '/staff/trainees/register',
      icon: UserPlusIcon,
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Generate Certificate',
      description: 'Create certificate for trainee',
      href: '/staff/certificates/generate',
      icon: DocumentDuplicateIcon,
      color: 'bg-success-500 hover:bg-success-600'
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Staff Dashboard</h1>
          <p className="text-secondary-600 mt-1">Welcome back! Manage trainees and certificates</p>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <UserPlusIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Trainees Registered</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.traineesRegistered}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <DocumentDuplicateIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Certificates Generated</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.certificatesGenerated}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Pending Certificates</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.pendingCertificates}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <ChartBarIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">This Week</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.thisWeekActivity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`${action.color} text-white p-6 rounded-xl transition-colors group`}
              >
                <div className="flex items-center">
                  <action.icon className="h-8 w-8 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Recent Activity</h2>
              <BellIcon className="h-5 w-5 text-secondary-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-4 bg-secondary-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">{activity.description}</p>
                    <div className="flex items-center text-xs text-secondary-500 mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Performance Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-primary-700">This Month</p>
                  <p className="text-2xl font-bold text-primary-900">8</p>
                  <p className="text-xs text-primary-600">Trainees Registered</p>
                </div>
                <UserPlusIcon className="h-8 w-8 text-primary-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-success-50 border border-success-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-success-700">This Month</p>
                  <p className="text-2xl font-bold text-success-900">12</p>
                  <p className="text-xs text-success-600">Certificates Generated</p>
                </div>
                <DocumentDuplicateIcon className="h-8 w-8 text-success-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-warning-700">Completion Rate</p>
                  <p className="text-2xl font-bold text-warning-900">85%</p>
                  <p className="text-xs text-warning-600">Average Progress</p>
                </div>
                <ChartBarIcon className="h-8 w-8 text-warning-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}