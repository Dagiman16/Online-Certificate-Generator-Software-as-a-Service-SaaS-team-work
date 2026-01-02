'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  ServerIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('system')
  const [isEditing, setIsEditing] = useState(false)

  const [settings, setSettings] = useState({
    system: {
      siteName: 'WDU-Certify',
      siteUrl: 'https://wdu-certify.com',
      adminEmail: 'admin@wdu-certify.com',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      language: 'en',
      maintenanceMode: false,
      registrationEnabled: true,
      autoApproval: false
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUsername: 'noreply@wdu-certify.com',
      smtpPassword: '••••••••',
      fromName: 'WDU-Certify',
      fromEmail: 'noreply@wdu-certify.com',
      enableSsl: true
    },
    security: {
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      passwordMinLength: '8',
      requireTwoFactor: false,
      allowedFileTypes: ['pdf', 'jpg', 'png', 'doc', 'docx'],
      maxFileSize: '10',
      enableAuditLog: true
    },
    api: {
      rateLimitPerHour: '1000',
      enableApiKeys: true,
      requireApiAuth: true,
      allowedOrigins: ['https://wdu-certify.com'],
      webhookSecret: '••••••••••••••••'
    },
    storage: {
      provider: 'local',
      s3Bucket: '',
      s3Region: '',
      s3AccessKey: '',
      s3SecretKey: '',
      maxStorageSize: '100',
      backupEnabled: true,
      backupFrequency: 'daily'
    }
  })

  const handleSave = () => {
    console.log('Saving system settings:', settings)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">System Settings</h1>
            <p className="text-secondary-600 mt-1">Configure system-wide settings and preferences</p>
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

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('system')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'system'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <CogIcon className="h-4 w-4 inline mr-2" />
                System
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'email'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <BellIcon className="h-4 w-4 inline mr-2" />
                Email
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
                onClick={() => setActiveTab('api')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'api'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <KeyIcon className="h-4 w-4 inline mr-2" />
                API
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'storage'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <ServerIcon className="h-4 w-4 inline mr-2" />
                Storage
              </button>
            </nav>
          </div>

          {/* System Settings Tab */}
          {activeTab === 'system' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Site Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={settings.system.siteName}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, siteName: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.system.siteName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Site URL
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={settings.system.siteUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, siteUrl: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <GlobeAltIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{settings.system.siteUrl}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Admin Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={settings.system.adminEmail}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, adminEmail: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.system.adminEmail}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Timezone
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.system.timezone}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, timezone: e.target.value }
                        })}
                        className="input-field"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.system.timezone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Date Format
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.system.dateFormat}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, dateFormat: e.target.value }
                        })}
                        className="input-field"
                      >
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.system.dateFormat}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Default Language
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.system.language}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, language: e.target.value }
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-900">Maintenance Mode</h3>
                        <p className="text-sm text-secondary-600">Temporarily disable site access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.maintenanceMode}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: { ...settings.system, maintenanceMode: e.target.checked }
                          })}
                          disabled={!isEditing}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-900">Registration Enabled</h3>
                        <p className="text-sm text-secondary-600">Allow new organization registrations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.registrationEnabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: { ...settings.system, registrationEnabled: e.target.checked }
                          })}
                          disabled={!isEditing}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-secondary-900">Auto Approval</h3>
                        <p className="text-sm text-secondary-600">Automatically approve new organizations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.system.autoApproval}
                          onChange={(e) => setSettings({
                            ...settings,
                            system: { ...settings.system, autoApproval: e.target.checked }
                          })}
                          disabled={!isEditing}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings Tab */}
          {activeTab === 'email' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      SMTP Host
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={settings.email.smtpHost}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpHost: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.email.smtpHost}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      SMTP Port
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={settings.email.smtpPort}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpPort: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.email.smtpPort}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      SMTP Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={settings.email.smtpUsername}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpUsername: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.email.smtpUsername}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      SMTP Password
                    </label>
                    {isEditing ? (
                      <input
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpPassword: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.email.smtpPassword}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      From Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={settings.email.fromName}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, fromName: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.email.fromName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      From Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, fromEmail: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.email.fromEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-secondary-900">Enable SSL</h3>
                      <p className="text-sm text-secondary-600">Use SSL encryption for SMTP</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.email.enableSsl}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, enableSsl: e.target.checked }
                        })}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-warning-900 mb-1">Email Configuration</h4>
                        <p className="text-sm text-warning-800">
                          Test your email configuration after making changes to ensure emails are delivered properly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.security.sessionTimeout} minutes</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Max Login Attempts
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, maxLoginAttempts: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.security.maxLoginAttempts} attempts</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Password Min Length
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, passwordMinLength: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.security.passwordMinLength} characters</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Max File Size (MB)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.security.maxFileSize}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, maxFileSize: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.security.maxFileSize} MB</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Allowed File Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {settings.security.allowedFileTypes.map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                        .{type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-secondary-900">Require Two-Factor Authentication</h3>
                      <p className="text-sm text-secondary-600">Require 2FA for all admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.requireTwoFactor}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, requireTwoFactor: e.target.checked }
                        })}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-secondary-900">Enable Audit Log</h3>
                      <p className="text-sm text-secondary-600">Log all system activities and changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.enableAuditLog}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, enableAuditLog: e.target.checked }
                        })}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* API Settings Tab */}
          {activeTab === 'api' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Rate Limit (requests/hour)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.api.rateLimitPerHour}
                        onChange={(e) => setSettings({
                          ...settings,
                          api: { ...settings.api, rateLimitPerHour: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.api.rateLimitPerHour} requests/hour</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Webhook Secret
                    </label>
                    {isEditing ? (
                      <input
                        type="password"
                        value={settings.api.webhookSecret}
                        onChange={(e) => setSettings({
                          ...settings,
                          api: { ...settings.api, webhookSecret: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.api.webhookSecret}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Allowed Origins (CORS)
                  </label>
                  <div className="space-y-2">
                    {settings.api.allowedOrigins.map((origin, index) => (
                      <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{origin}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-secondary-900">Enable API Keys</h3>
                      <p className="text-sm text-secondary-600">Allow organizations to generate API keys</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.api.enableApiKeys}
                        onChange={(e) => setSettings({
                          ...settings,
                          api: { ...settings.api, enableApiKeys: e.target.checked }
                        })}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-secondary-900">Require API Authentication</h3>
                      <p className="text-sm text-secondary-600">Require authentication for all API endpoints</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.api.requireApiAuth}
                        onChange={(e) => setSettings({
                          ...settings,
                          api: { ...settings.api, requireApiAuth: e.target.checked }
                        })}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Storage Settings Tab */}
          {activeTab === 'storage' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Storage Provider
                  </label>
                  {isEditing ? (
                    <select
                      value={settings.storage.provider}
                      onChange={(e) => setSettings({
                        ...settings,
                        storage: { ...settings.storage, provider: e.target.value }
                      })}
                      className="input-field"
                    >
                      <option value="local">Local Storage</option>
                      <option value="s3">Amazon S3</option>
                      <option value="gcs">Google Cloud Storage</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-900">
                        {settings.storage.provider === 'local' ? 'Local Storage' :
                         settings.storage.provider === 's3' ? 'Amazon S3' : 'Google Cloud Storage'}
                      </span>
                    </div>
                  )}
                </div>

                {settings.storage.provider === 's3' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        S3 Bucket
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={settings.storage.s3Bucket}
                          onChange={(e) => setSettings({
                            ...settings,
                            storage: { ...settings.storage, s3Bucket: e.target.value }
                          })}
                          className="input-field"
                        />
                      ) : (
                        <div className="p-3 bg-secondary-50 rounded-lg">
                          <span className="text-secondary-900">{settings.storage.s3Bucket || 'Not configured'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        S3 Region
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={settings.storage.s3Region}
                          onChange={(e) => setSettings({
                            ...settings,
                            storage: { ...settings.storage, s3Region: e.target.value }
                          })}
                          className="input-field"
                        />
                      ) : (
                        <div className="p-3 bg-secondary-50 rounded-lg">
                          <span className="text-secondary-900">{settings.storage.s3Region || 'Not configured'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Access Key
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={settings.storage.s3AccessKey}
                          onChange={(e) => setSettings({
                            ...settings,
                            storage: { ...settings.storage, s3AccessKey: e.target.value }
                          })}
                          className="input-field"
                        />
                      ) : (
                        <div className="p-3 bg-secondary-50 rounded-lg">
                          <span className="text-secondary-900">{settings.storage.s3AccessKey || 'Not configured'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Secret Key
                      </label>
                      {isEditing ? (
                        <input
                          type="password"
                          value={settings.storage.s3SecretKey}
                          onChange={(e) => setSettings({
                            ...settings,
                            storage: { ...settings.storage, s3SecretKey: e.target.value }
                          })}
                          className="input-field"
                        />
                      ) : (
                        <div className="p-3 bg-secondary-50 rounded-lg">
                          <span className="text-secondary-900">••••••••••••••••</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Max Storage Size (GB)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.storage.maxStorageSize}
                        onChange={(e) => setSettings({
                          ...settings,
                          storage: { ...settings.storage, maxStorageSize: e.target.value }
                        })}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{settings.storage.maxStorageSize} GB</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Backup Frequency
                    </label>
                    {isEditing ? (
                      <select
                        value={settings.storage.backupFrequency}
                        onChange={(e) => setSettings({
                          ...settings,
                          storage: { ...settings.storage, backupFrequency: e.target.value }
                        })}
                        className="input-field"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900 capitalize">{settings.storage.backupFrequency}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-secondary-900">Enable Backups</h3>
                    <p className="text-sm text-secondary-600">Automatically backup system data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.storage.backupEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        storage: { ...settings.storage, backupEnabled: e.target.checked }
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

        {/* System Information */}
        <div className="card bg-secondary-50 border-secondary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">System Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary-700">
                <div>
                  <span className="font-medium">Version:</span> v2.1.0
                </div>
                <div>
                  <span className="font-medium">Environment:</span> Production
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> 2024-01-15
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}