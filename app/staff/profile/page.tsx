'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  BriefcaseIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function StaffProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.edu',
    phone: '+1 (555) 123-4567',
    role: 'Staff Member',
    department: 'Training Department',
    joinDate: '2023-06-15',
    employeeId: 'EMP-2023-045'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const stats = {
    traineesRegistered: 24,
    certificatesGenerated: 18,
    activeSince: '18 months',
    lastActivity: '2024-01-21 14:30'
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData)
    setIsEditing(false)
    // Here you would typically make an API call to save the profile
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    console.log('Changing password')
    setIsChangingPassword(false)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    // Here you would typically make an API call to change the password
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Profile</h1>
            <p className="text-secondary-600 mt-1">Manage your account information and settings</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button onClick={handleCancelEdit} className="btn-secondary">
                  <XMarkIcon className="h-5 w-5 mr-2" />
                  Cancel
                </button>
                <button onClick={handleSaveProfile} className="btn-success">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn-primary">
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-secondary-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-secondary-600 mb-2">{profileData.role}</p>
                <p className="text-sm text-secondary-500">{profileData.department}</p>
                
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">{stats.traineesRegistered}</p>
                      <p className="text-sm text-secondary-600">Trainees Registered</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-success-600">{stats.certificatesGenerated}</p>
                      <p className="text-sm text-secondary-600">Certificates Generated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-primary-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="input-field"
                    />
                  ) : (
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-900">{profileData.firstName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="input-field"
                    />
                  ) : (
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-900">{profileData.lastName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 text-secondary-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="input-field flex-1"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg flex-1">
                        <span className="text-secondary-900">{profileData.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 text-secondary-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="input-field flex-1"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg flex-1">
                        <span className="text-secondary-900">{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-primary-600" />
                Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Employee ID
                  </label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{profileData.employeeId}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Role
                  </label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{profileData.role}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Department
                  </label>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <span className="text-secondary-900">{profileData.department}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Join Date
                  </label>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 text-secondary-400 mr-2" />
                    <div className="p-3 bg-secondary-50 rounded-lg flex-1">
                      <span className="text-secondary-900">{profileData.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Security Settings */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-primary-600" />
                Security Settings
              </h3>
              
              {!isChangingPassword ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center">
                      <KeyIcon className="h-5 w-5 text-secondary-400 mr-3" />
                      <div>
                        <h4 className="font-medium text-secondary-900">Password</h4>
                        <p className="text-sm text-secondary-600">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="btn-secondary"
                    >
                      Change Password
                    </button>
                  </div>
                  
                  <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-warning-600 mr-2" />
                      <div>
                        <h4 className="font-medium text-warning-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-warning-700">Not enabled - Contact your administrator to enable 2FA</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="input-field"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="input-field"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="input-field"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setIsChangingPassword(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleChangePassword}
                      className="btn-primary"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Activity Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-700">Active Since</p>
                      <p className="text-2xl font-bold text-primary-900">{stats.activeSince}</p>
                    </div>
                    <CalendarIcon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-success-700">Last Activity</p>
                      <p className="text-lg font-semibold text-success-900">{stats.lastActivity}</p>
                    </div>
                    <UserIcon className="h-8 w-8 text-success-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}