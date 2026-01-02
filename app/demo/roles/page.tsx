'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  UserIcon,
  BuildingOfficeIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function RoleDemoPage() {
  const [selectedRole, setSelectedRole] = useState<'super_admin' | 'org_admin' | null>(null)

  const roles = [
    {
      id: 'super_admin' as const,
      name: 'System Administrator',
      description: 'System-wide administration and management',
      icon: ShieldCheckIcon,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
      dashboardUrl: '/admin/dashboard',
      responsibilities: [
        'Manage all organizations across the platform',
        'Configure system-wide settings and security',
        'Manage pricing plans and billing policies',
        'Access system-wide reports and analytics',
        'Approve or suspend organizations',
        'Manage system templates and resources',
        'Configure email, storage, and API settings',
        'Monitor system performance and health'
      ]
    },
    {
      id: 'org_admin' as const,
      name: 'Organization Administrator',
      description: 'Individual organization management',
      icon: BuildingOfficeIcon,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50 border-primary-200',
      textColor: 'text-primary-700',
      dashboardUrl: '/dashboard',
      responsibilities: [
        'Manage organization profile and branding',
        'Create and manage training programs',
        'Import and manage trainees',
        'Generate and issue certificates',
        'Customize certificate templates',
        'View organization reports and analytics',
        'Manage billing and subscription',
        'Configure organization settings',
        'Manage team members and permissions'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            WDU-Certify Role Demonstration
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Explore the different administrative roles and their capabilities in the WDU-Certify platform
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`card hover:shadow-large transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                selectedRole === role.id ? 'ring-2 ring-primary-500 shadow-large' : ''
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">{role.name}</h2>
                <p className="text-secondary-600">{role.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Key Responsibilities:</h3>
                {role.responsibilities.slice(0, 4).map((responsibility, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-secondary-700">{responsibility}</span>
                  </div>
                ))}
                {role.responsibilities.length > 4 && (
                  <p className="text-sm text-secondary-500 italic">
                    +{role.responsibilities.length - 4} more responsibilities...
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${role.bgColor} ${role.textColor}`}>
                  {role.id === 'super_admin' ? 'System Level' : 'Organization Level'}
                </div>
                <Link
                  href={role.dashboardUrl}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View Dashboard
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedRole && (
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                  {roles.find(r => r.id === selectedRole)?.name} - Complete Overview
                </h2>
                <p className="text-secondary-600">
                  All responsibilities and capabilities for this role
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">All Responsibilities</h3>
                  <div className="space-y-3">
                    {roles.find(r => r.id === selectedRole)?.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-success-500 rounded-full" />
                        </div>
                        <span className="text-secondary-700">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Access Level</h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${roles.find(r => r.id === selectedRole)?.bgColor}`}>
                      <h4 className="font-medium text-secondary-900 mb-2">Scope of Access</h4>
                      <p className="text-sm text-secondary-700">
                        {selectedRole === 'super_admin' 
                          ? 'System-wide access across all organizations, users, and platform settings. Can manage the entire WDU-Certify platform.'
                          : 'Organization-specific access limited to their own organization\'s data, users, and settings. Cannot access other organizations or system settings.'
                        }
                      </p>
                    </div>

                    <div className="p-4 bg-secondary-50 rounded-lg">
                      <h4 className="font-medium text-secondary-900 mb-2">Dashboard Access</h4>
                      <p className="text-sm text-secondary-700 mb-3">
                        {selectedRole === 'super_admin' 
                          ? 'Access to admin dashboard with system-wide controls and monitoring.'
                          : 'Access to organization dashboard with training and certificate management tools.'
                        }
                      </p>
                      <Link
                        href={roles.find(r => r.id === selectedRole)?.dashboardUrl || '/'}
                        className="btn-primary text-sm"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/admin/dashboard" className="btn-secondary">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              System Admin Dashboard
            </Link>
            <Link href="/dashboard" className="btn-primary">
              <BuildingOfficeIcon className="h-5 w-5 mr-2" />
              Organization Dashboard
            </Link>
          </div>
          <p className="text-sm text-secondary-500 mt-4">
            Click on the role cards above to see detailed information
          </p>
        </div>
      </div>
    </div>
  )
}