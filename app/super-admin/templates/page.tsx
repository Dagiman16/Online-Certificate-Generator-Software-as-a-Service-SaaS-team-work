'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  PhotoIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SwatchIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function SuperAdminTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all') // all, free, paid
  const [statusFilter, setStatusFilter] = useState('all') // all, active, inactive

  const templates = [
    {
      id: '1',
      name: 'Professional Blue',
      category: 'Professional',
      description: 'Clean and professional design with blue accents',
      preview: '/templates/professional-blue.jpg',
      type: 'free',
      price: 0,
      status: 'active',
      usageCount: 1247,
      organizationsUsing: 89,
      createdAt: '2024-01-10',
      createdBy: 'System',
      colors: ['#2563eb', '#ffffff', '#1e40af'],
      tags: ['professional', 'corporate', 'blue']
    },
    {
      id: '2',
      name: 'Modern Green',
      category: 'Modern',
      description: 'Contemporary design with green color scheme',
      preview: '/templates/modern-green.jpg',
      type: 'free',
      price: 0,
      status: 'active',
      usageCount: 892,
      organizationsUsing: 67,
      createdAt: '2024-01-08',
      createdBy: 'System',
      colors: ['#059669', '#ffffff', '#047857'],
      tags: ['modern', 'green', 'contemporary']
    },
    {
      id: '3',
      name: 'Premium Gold Certificate',
      category: 'Premium',
      description: 'Luxurious gold-themed certificate with premium styling',
      preview: '/templates/premium-gold.jpg',
      type: 'paid',
      price: 29.99,
      status: 'active',
      usageCount: 456,
      organizationsUsing: 23,
      createdAt: '2024-01-05',
      createdBy: 'Design Team',
      colors: ['#d97706', '#ffffff', '#b45309'],
      tags: ['premium', 'gold', 'luxury']
    },
    {
      id: '4',
      name: 'Executive Platinum',
      category: 'Executive',
      description: 'High-end executive certificate with platinum finish',
      preview: '/templates/executive-platinum.jpg',
      type: 'paid',
      price: 49.99,
      status: 'active',
      usageCount: 234,
      organizationsUsing: 12,
      createdAt: '2024-01-03',
      createdBy: 'Design Team',
      colors: ['#6b7280', '#ffffff', '#4b5563'],
      tags: ['executive', 'platinum', 'premium']
    },
    {
      id: '5',
      name: 'Classic Red',
      category: 'Classic',
      description: 'Traditional certificate design with red borders',
      preview: '/templates/classic-red.jpg',
      type: 'free',
      price: 0,
      status: 'inactive',
      usageCount: 678,
      organizationsUsing: 45,
      createdAt: '2023-12-28',
      createdBy: 'System',
      colors: ['#dc2626', '#ffffff', '#b91c1c'],
      tags: ['classic', 'traditional', 'red']
    },
    {
      id: '6',
      name: 'Corporate Signature',
      category: 'Corporate',
      description: 'Premium corporate template with signature styling',
      preview: '/templates/corporate-signature.jpg',
      type: 'paid',
      price: 39.99,
      status: 'active',
      usageCount: 345,
      organizationsUsing: 18,
      createdAt: '2023-12-25',
      createdBy: 'Design Team',
      colors: ['#7c3aed', '#ffffff', '#6d28d9'],
      tags: ['corporate', 'signature', 'premium']
    }
  ]

  const categories = ['all', 'Professional', 'Modern', 'Premium', 'Executive', 'Classic', 'Corporate']
  const types = ['all', 'free', 'paid']
  const statuses = ['all', 'active', 'inactive']

  const stats = {
    total: templates.length,
    free: templates.filter(t => t.type === 'free').length,
    paid: templates.filter(t => t.type === 'paid').length,
    active: templates.filter(t => t.status === 'active').length,
    totalRevenue: templates.filter(t => t.type === 'paid').reduce((sum, t) => sum + (t.price * t.organizationsUsing), 0)
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    const matchesType = typeFilter === 'all' || template.type === typeFilter
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter
    return matchesSearch && matchesCategory && matchesType && matchesStatus
  })

  const handleToggleStatus = (templateId: string) => {
    console.log('Toggle status for template:', templateId)
    // Implement status toggle logic
  }

  const handleSetPrice = (templateId: string, newPrice: number) => {
    console.log('Set price for template:', templateId, newPrice)
    // Implement price update logic
  }

  const handleDelete = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      console.log('Delete template:', templateId)
      // Implement delete logic
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'free': return 'text-success-700 bg-success-100'
      case 'paid': return 'text-primary-700 bg-primary-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-700 bg-success-100'
      case 'inactive': return 'text-red-700 bg-red-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Template Management</h1>
            <p className="text-secondary-600 mt-1">Manage free and paid certificate templates</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
              Import Template
            </button>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Template
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <PhotoIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Templates</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <GiftIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Free Templates</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.free}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Paid Templates</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.paid}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircleIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Active</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Revenue</p>
                <p className="text-2xl font-bold text-secondary-900">${stats.totalRevenue.toFixed(0)}</p>
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
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
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
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="input-field"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
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
              <button className="btn-secondary">
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="card group hover:shadow-medium transition-all duration-200">
              {/* Template Preview */}
              <div className="relative aspect-[4/3] bg-secondary-100 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                  <PhotoIcon className="h-16 w-16 text-secondary-400" />
                </div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button className="p-2 bg-white rounded-lg text-secondary-600 hover:text-primary-600 transition-colors">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white rounded-lg text-secondary-600 hover:text-primary-600 transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white rounded-lg text-secondary-600 hover:text-primary-600 transition-colors">
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.type)}`}>
                    {template.type === 'free' ? 'FREE' : `$${template.price}`}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </div>

                {/* Status Toggle */}
                <button
                  onClick={() => handleToggleStatus(template.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  {template.status === 'active' ? (
                    <CheckCircleIcon className="h-4 w-4 text-success-500" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-red-500" />
                  )}
                </button>
              </div>

              {/* Template Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-secondary-900">{template.name}</h3>
                  <p className="text-sm text-secondary-600 mt-1">{template.description}</p>
                </div>

                {/* Color Palette */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-secondary-500">Colors:</span>
                  <div className="flex space-x-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-secondary-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-500">Usage:</span>
                    <span className="font-medium text-secondary-900 ml-1">{template.usageCount}</span>
                  </div>
                  <div>
                    <span className="text-secondary-500">Orgs:</span>
                    <span className="font-medium text-secondary-900 ml-1">{template.organizationsUsing}</span>
                  </div>
                </div>

                {/* Revenue (for paid templates) */}
                {template.type === 'paid' && (
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-700">Revenue:</span>
                      <span className="font-semibold text-primary-900">
                        ${(template.price * template.organizationsUsing).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-secondary-200">
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm py-2 px-3">
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    {template.type === 'paid' && (
                      <button 
                        onClick={() => {
                          const newPrice = prompt('Enter new price:', template.price.toString())
                          if (newPrice && !isNaN(parseFloat(newPrice))) {
                            handleSetPrice(template.id, parseFloat(newPrice))
                          }
                        }}
                        className="btn-secondary text-sm py-2 px-3"
                      >
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        Price
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <PhotoIcon className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No templates found</h3>
            <p className="text-secondary-600 mb-6">
              {searchTerm || categoryFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first template to get started'
              }
            </p>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Template
            </button>
          </div>
        )}

        {/* Template Management Tips */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <PhotoIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Template Management Best Practices</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Offer a good mix of free and paid templates to attract different user segments</li>
                <li>• Monitor usage statistics to identify popular design trends</li>
                <li>• Regularly update and refresh template designs</li>
                <li>• Price paid templates competitively based on complexity and demand</li>
                <li>• Ensure all templates meet quality and branding standards</li>
                <li>• Deactivate outdated or low-performing templates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}