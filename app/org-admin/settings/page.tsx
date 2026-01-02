'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  UserGroupIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isEditing, setIsEditing] = useState(false)

  const [settings, setSettings] = useState({
    general: {
      organizationName: 'TechCorp University',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      language: 'en',
      defaultCertificateValidity: '365'
    },
    notifications: {
      emailNotifications: true,
      certificateGenerated: true,
      certificateVerified: true,
      paymentReminders: true,
      systemUpdates: false,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordPolicy: 'medium',
      ipWhitelist: [],
      auditLogs: true
    },
    api: {
      apiEnabled: true,
      webhookUrl: '',
      rateLimitPerHour: 1000,
      allowedOrigins: ['https://techcorp.edu']
    }
  })

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@techcorp.edu',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15 14:30'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@techcorp.edu',
      role: 'Staff',
      status: 'active',
      lastLogin: '2024-01-14 09:15'
    }
  ])

  const handleSave = () => {
    console.log('Saving settings:', settings)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'text-primary-700 bg-primary-100'
      case 'Staff': return 'text-secondary-700 bg-secondary-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-700 bg-success-100'
      case 'pending': return 'text-warning-700 bg-warning-100'
      case 'inactive': return 'text-red-700 bg-red-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Settings</h1>
            <p className="text-secondary-600 mt-1">Manage your organization settings and preferences</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button onClick={handleCancel} className="btn-secondary">
                  <XMarkIcon className="h-5 w-5 mr-2" />
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-success">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn-primary">
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Settings
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <CogIcon className="h-4 w-4 inline mr-2" />
                General
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <BellIcon className="h-4 w-4 inline mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <ShieldCheckIcon className="h-4 w-4 inline mr-2" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'team'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <UserGroupIcon className="h-4 w-4 inline mr-2" />
                Team
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'api'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <KeyIcon className="h-4 w-4 inline mr-2" />
                API & Integrations
              </button>
            </nav>
          </div>

          {activeTab === 'general' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Organization Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={settings.general.organizationName}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, organizationName: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.general.organizationName}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Timezone
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, timezone: e.target.value }
                        })}
                        className="input-field"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.general.timezone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Language
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.general.language}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, language: e.target.value }
                        })}
                        className="input-field"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">English</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-secondary-900">Email Notifications</h3>
                    <p className="text-sm text-secondary-600">Receive email notifications for important events</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-secondary-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-secondary-600">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Team Members</h2>
                <button className="btn-primary">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Invite Member
                </button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900">{member.name}</h3>
                        <p className="text-sm text-secondary-600">{member.email}</p>
                        {member.lastLogin && (
                          <p className="text-xs text-secondary-500 mt-1">Last login: {member.lastLogin}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-secondary-900">API Access</h3>
                    <p className="text-sm text-secondary-600">Enable API access for integrations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.api.apiEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        api: { ...settings.api, apiEnabled: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}