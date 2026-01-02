'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  PhotoIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function OrganizationProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const [organizationData, setOrganizationData] = useState({
    name: 'TechCorp University',
    email: 'admin@techcorp.edu',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.edu',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    description: 'Leading technology university focused on innovative education and research in computer science, engineering, and digital technologies.',
    contactPerson: 'Dr. Sarah Johnson',
    contactTitle: 'Director of Continuing Education',
    contactEmail: 'sarah.johnson@techcorp.edu',
    contactPhone: '+1 (555) 123-4568',
    logo: null,
    industry: 'Education',
    organizationType: 'University',
    foundedYear: '1995',
    employeeCount: '500-1000',
    status: 'approved'
  })

  const handleSave = () => {
    // Implement save logic
    setIsEditing(false)
    console.log('Saving organization data:', organizationData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Organization Profile</h1>
            <p className="text-secondary-600 mt-1">Manage your organization information and settings</p>
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
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Status Alert */}
        {organizationData.status === 'approved' && (
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-center">
              <CheckIcon className="h-6 w-6 text-success-600 mr-3" />
              <div>
                <h3 className="font-semibold text-success-900">Organization Approved</h3>
                <p className="text-success-700">Your organization has been verified and approved for certificate generation.</p>
              </div>
            </div>
          </div>
        )}

        {organizationData.status === 'pending' && (
          <div className="card bg-warning-50 border-warning-200">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-warning-600 mr-3" />
              <div>
                <h3 className="font-semibold text-warning-900">Pending Approval</h3>
                <p className="text-warning-700">
                  Your organization is under review. You cannot issue official certificates until approved. 
                  Our team will review your application within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {organizationData.status === 'suspended' && (
          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center">
              <XMarkIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="font-semibold text-red-900">Organization Suspended</h3>
                <p className="text-red-700">
                  Your organization has been suspended. Certificate generation is disabled. 
                  Please contact support for assistance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
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
                General Information
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contact'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Contact Details
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'branding'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Branding
              </button>
            </nav>
          </div>

          {/* General Information Tab */}
          {activeTab === 'general' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Organization Name *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={organizationData.name}
                        onChange={(e) => setOrganizationData({...organizationData, name: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <BuildingOfficeIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="font-medium text-secondary-900">{organizationData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Industry
                    </label>
                    {isEditing ? (
                      <select
                        value={organizationData.industry}
                        onChange={(e) => setOrganizationData({...organizationData, industry: e.target.value})}
                        className="input-field"
                      >
                        <option value="Education">Education</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{organizationData.industry}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Organization Type
                    </label>
                    {isEditing ? (
                      <select
                        value={organizationData.organizationType}
                        onChange={(e) => setOrganizationData({...organizationData, organizationType: e.target.value})}
                        className="input-field"
                      >
                        <option value="University">University</option>
                        <option value="College">College</option>
                        <option value="Training Center">Training Center</option>
                        <option value="Corporation">Corporation</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Government">Government</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{organizationData.organizationType}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Founded Year
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={organizationData.foundedYear}
                        onChange={(e) => setOrganizationData({...organizationData, foundedYear: e.target.value})}
                        className="input-field"
                        placeholder="e.g., 1995"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{organizationData.foundedYear}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Employee Count
                    </label>
                    {isEditing ? (
                      <select
                        value={organizationData.employeeCount}
                        onChange={(e) => setOrganizationData({...organizationData, employeeCount: e.target.value})}
                        className="input-field"
                      >
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="500-1000">500-1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{organizationData.employeeCount} employees</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={organizationData.website}
                        onChange={(e) => setOrganizationData({...organizationData, website: e.target.value})}
                        className="input-field"
                        placeholder="https://example.com"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <GlobeAltIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <a href={organizationData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                          {organizationData.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={organizationData.address}
                        onChange={(e) => setOrganizationData({...organizationData, address: e.target.value})}
                        rows={3}
                        className="input-field"
                        placeholder="Full address including city, state, and postal code"
                      />
                    ) : (
                      <div className="flex items-start p-3 bg-secondary-50 rounded-lg">
                        <MapPinIcon className="h-5 w-5 text-secondary-400 mr-3 mt-0.5" />
                        <span className="text-secondary-900">{organizationData.address}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        value={organizationData.description}
                        onChange={(e) => setOrganizationData({...organizationData, description: e.target.value})}
                        rows={4}
                        className="input-field"
                        placeholder="Brief description of your organization"
                      />
                    ) : (
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <span className="text-secondary-900">{organizationData.description}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Details Tab */}
          {activeTab === 'contact' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Primary Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Contact Person *
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={organizationData.contactPerson}
                          onChange={(e) => setOrganizationData({...organizationData, contactPerson: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        <div className="p-3 bg-secondary-50 rounded-lg">
                          <span className="font-medium text-secondary-900">{organizationData.contactPerson}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Title/Position
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={organizationData.contactTitle}
                          onChange={(e) => setOrganizationData({...organizationData, contactTitle: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        <div className="p-3 bg-secondary-50 rounded-lg">
                          <span className="text-secondary-900">{organizationData.contactTitle}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Contact Email *
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={organizationData.contactEmail}
                          onChange={(e) => setOrganizationData({...organizationData, contactEmail: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <EnvelopeIcon className="h-5 w-5 text-secondary-400 mr-3" />
                          <span className="text-secondary-900">{organizationData.contactEmail}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Contact Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={organizationData.contactPhone}
                          onChange={(e) => setOrganizationData({...organizationData, contactPhone: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <PhoneIcon className="h-5 w-5 text-secondary-400 mr-3" />
                          <span className="text-secondary-900">{organizationData.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Organization Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Main Email *
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={organizationData.email}
                          onChange={(e) => setOrganizationData({...organizationData, email: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <EnvelopeIcon className="h-5 w-5 text-secondary-400 mr-3" />
                          <span className="text-secondary-900">{organizationData.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Main Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={organizationData.phone}
                          onChange={(e) => setOrganizationData({...organizationData, phone: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <PhoneIcon className="h-5 w-5 text-secondary-400 mr-3" />
                          <span className="text-secondary-900">{organizationData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-primary-900 mb-1">Important Note</h4>
                        <p className="text-sm text-primary-800">
                          Changes to contact information may require admin approval and could affect certificate delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="p-6">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Organization Logo</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Upload Logo
                    </label>
                    <div className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                      {organizationData.logo ? (
                        <div className="space-y-4">
                          <div className="w-24 h-24 bg-secondary-100 rounded-lg mx-auto flex items-center justify-center">
                            <PhotoIcon className="h-12 w-12 text-secondary-400" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">Current Logo</p>
                            <p className="text-sm text-secondary-600">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <PhotoIcon className="h-16 w-16 text-secondary-400 mx-auto" />
                          <div>
                            <p className="font-medium text-secondary-900">Upload your organization logo</p>
                            <p className="text-sm text-secondary-600">PNG, JPG up to 2MB. Recommended: 400x400px</p>
                          </div>
                          <button className="btn-primary">
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-warning-900 mb-1">Logo Guidelines</h4>
                        <ul className="text-sm text-warning-800 space-y-1">
                          <li>• Use high-resolution images for best quality</li>
                          <li>• Square format (1:1 ratio) works best</li>
                          <li>• Logo will appear on certificates and official documents</li>
                          <li>• Ensure you have rights to use the logo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}