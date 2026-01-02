'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  PhotoIcon,
  EyeIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  GiftIcon,
  LockClosedIcon,
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function OrgAdminTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  // Organization subscription status - would come from context/API
  const organizationPlan = 'professional' // 'basic', 'professional', 'enterprise'
  const purchasedTemplates = ['3', '4'] // IDs of purchased templates

  const templates = [
    {
      id: '1',
      name: 'Professional Blue',
      category: 'Business',
      type: 'free',
      price: 0,
      rating: 4.5,
      downloads: 1247,
      preview: '/templates/professional-blue.jpg',
      description: 'Clean and professional design with blue accents',
      features: [
        'Watermark: "Sample Certificate"',
        'Fixed layout design',
        'Basic customization options',
        'Standard fonts only'
      ],
      limitations: [
        'Cannot be used for official certificates',
        'Watermark cannot be removed',
        'Limited customization'
      ],
      colors: ['#2563eb', '#ffffff', '#1e40af'],
      tags: ['professional', 'corporate', 'blue']
    },
    {
      id: '2',
      name: 'Modern Green',
      category: 'Education',
      type: 'free',
      price: 0,
      rating: 4.2,
      downloads: 892,
      preview: '/templates/modern-green.jpg',
      description: 'Contemporary design with green color scheme',
      features: [
        'Watermark: "Demo Certificate"',
        'Fixed layout design',
        'Basic customization options',
        'Standard fonts only'
      ],
      limitations: [
        'Cannot be used for official certificates',
        'Watermark cannot be removed',
        'Limited customization'
      ],
      colors: ['#059669', '#ffffff', '#047857'],
      tags: ['modern', 'green', 'contemporary']
    },
    {
      id: '3',
      name: 'Premium Gold Certificate',
      category: 'Luxury',
      type: 'paid',
      price: 29.99,
      rating: 4.8,
      downloads: 456,
      preview: '/templates/premium-gold.jpg',
      description: 'Luxurious gold-themed certificate with premium styling',
      features: [
        'No watermark',
        'Full customization options',
        'Organization logo placement',
        'Custom fonts and colors',
        'Multiple layout options',
        'High-resolution export'
      ],
      limitations: [],
      colors: ['#d97706', '#ffffff', '#b45309'],
      tags: ['premium', 'gold', 'luxury'],
      isPurchased: purchasedTemplates.includes('3')
    },
    {
      id: '4',
      name: 'Executive Platinum',
      category: 'Executive',
      type: 'paid',
      price: 49.99,
      rating: 4.7,
      downloads: 234,
      preview: '/templates/executive-platinum.jpg',
      description: 'High-end executive certificate with platinum finish',
      features: [
        'No watermark',
        'Full customization options',
        'Organization logo placement',
        'Premium fonts and effects',
        'Multiple layout variations',
        'Vector-based design',
        'Print-ready quality'
      ],
      limitations: [],
      colors: ['#6b7280', '#ffffff', '#4b5563'],
      tags: ['executive', 'platinum', 'premium'],
      isPurchased: purchasedTemplates.includes('4')
    },
    {
      id: '5',
      name: 'Corporate Signature',
      category: 'Corporate',
      type: 'paid',
      price: 39.99,
      rating: 4.6,
      downloads: 345,
      preview: '/templates/corporate-signature.jpg',
      description: 'Premium corporate template with signature styling',
      features: [
        'No watermark',
        'Full customization options',
        'Organization logo placement',
        'Custom signature fields',
        'Professional typography',
        'Brand color integration'
      ],
      limitations: [],
      colors: ['#7c3aed', '#ffffff', '#6d28d9'],
      tags: ['corporate', 'signature', 'premium'],
      isPurchased: false
    },
    {
      id: '6',
      name: 'Academic Excellence',
      category: 'Education',
      type: 'paid',
      price: 24.99,
      rating: 4.4,
      downloads: 567,
      preview: '/templates/academic-excellence.jpg',
      description: 'Academic-focused design for educational institutions',
      features: [
        'No watermark',
        'Full customization options',
        'Institution logo placement',
        'Academic styling elements',
        'Grade and GPA fields',
        'Seal and emblem support'
      ],
      limitations: [],
      colors: ['#1e40af', '#ffffff', '#1e3a8a'],
      tags: ['academic', 'education', 'institutional'],
      isPurchased: false
    }
  ]

  const categories = ['all', 'Business', 'Education', 'Luxury', 'Executive', 'Corporate']
  const types = ['all', 'free', 'paid']

  const stats = {
    total: templates.length,
    free: templates.filter(t => t.type === 'free').length,
    paid: templates.filter(t => t.type === 'paid').length,
    purchased: templates.filter(t => t.isPurchased).length
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    const matchesType = typeFilter === 'all' || template.type === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  const handlePurchaseTemplate = (template: any) => {
    setSelectedTemplate(template)
    setShowPurchaseModal(true)
  }

  const handlePreviewTemplate = (template: any) => {
    console.log('Preview template:', template.id)
    // Implement preview logic
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      i < Math.floor(rating) ? (
        <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="h-4 w-4 text-secondary-300" />
      )
    ))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Certificate Templates</h1>
            <p className="text-secondary-600 mt-1">Choose from free and premium certificate templates</p>
          </div>
        </div>

        {/* Plan Status */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <CreditCardIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900">Current Plan: {organizationPlan.charAt(0).toUpperCase() + organizationPlan.slice(1)}</h3>
                <p className="text-primary-700 text-sm">
                  You have purchased {stats.purchased} premium template{stats.purchased !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button className="btn-primary">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <p className="text-sm font-medium text-secondary-600">Premium Templates</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.paid}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Purchased</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.purchased}</p>
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
                    {type === 'all' ? 'All Types' : type === 'free' ? 'Free Templates' : 'Premium Templates'}
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
                  {/* Free template watermark simulation */}
                  {template.type === 'free' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-lg transform rotate-45 opacity-75">
                        SAMPLE
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handlePreviewTemplate(template)}
                    className="p-2 bg-white rounded-lg text-secondary-600 hover:text-primary-600 transition-colors"
                    title="Preview"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  {template.type === 'paid' && !template.isPurchased && (
                    <button
                      onClick={() => handlePurchaseTemplate(template)}
                      className="p-2 bg-white rounded-lg text-secondary-600 hover:text-primary-600 transition-colors"
                      title="Purchase"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  {template.type === 'free' ? (
                    <span className="px-2 py-1 bg-success-600 text-white text-xs font-medium rounded-full">
                      FREE
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                      ${template.price}
                    </span>
                  )}
                  {template.isPurchased && (
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                      OWNED
                    </span>
                  )}
                </div>

                {/* Lock icon for unpurchased paid templates */}
                {template.type === 'paid' && !template.isPurchased && (
                  <div className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm">
                    <LockClosedIcon className="h-4 w-4 text-secondary-500" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-secondary-900">{template.name}</h3>
                  <p className="text-sm text-secondary-600 mt-1">{template.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(template.rating)}
                  </div>
                  <span className="text-sm text-secondary-600">({template.rating})</span>
                  <span className="text-sm text-secondary-500">• {template.downloads} downloads</span>
                </div>

                {/* Features/Limitations */}
                <div className="space-y-2">
                  <div>
                    <h4 className="text-xs font-medium text-secondary-700 uppercase tracking-wide">Features</h4>
                    <ul className="text-xs text-secondary-600 space-y-1 mt-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-3 w-3 text-success-500 mr-1 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {template.limitations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-red-700 uppercase tracking-wide">Limitations</h4>
                      <ul className="text-xs text-red-600 space-y-1 mt-1">
                        {template.limitations.slice(0, 2).map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <ExclamationTriangleIcon className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-secondary-200">
                  {template.type === 'free' || template.isPurchased ? (
                    <button className="btn-primary w-full">
                      <PhotoIcon className="h-4 w-4 mr-2" />
                      Use Template
                    </button>
                  ) : (
                    <button 
                      onClick={() => handlePurchaseTemplate(template)}
                      className="btn-primary w-full"
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Purchase ${template.price}
                    </button>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
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
              Try adjusting your search or filters to find templates
            </p>
          </div>
        )}

        {/* Template Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Free Templates Info */}
          <div className="card bg-success-50 border-success-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <GiftIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <h3 className="font-semibold text-success-900 mb-2">Free Templates</h3>
                <ul className="text-sm text-success-800 space-y-1">
                  <li>• Provided by the system</li>
                  <li>• Fixed layout design</li>
                  <li>• Includes watermark (e.g., "Sample Certificate")</li>
                  <li>• Cannot be used for official/legal certificates</li>
                  <li>• Perfect for testing and demos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Paid Templates Info */}
          <div className="card bg-primary-50 border-primary-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Premium Templates</h3>
                <ul className="text-sm text-primary-800 space-y-1">
                  <li>• Professionally designed templates</li>
                  <li>• Full customization options</li>
                  <li>• Organization logo placement</li>
                  <li>• Custom fonts and colors</li>
                  <li>• No watermark - official use</li>
                  <li>• Available only after payment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Purchase Template</h3>
                <button 
                  onClick={() => setShowPurchaseModal(false)}
                  className="p-2 hover:bg-secondary-100 rounded-lg"
                >
                  <XMarkIcon className="h-5 w-5 text-secondary-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-[4/3] bg-secondary-100 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-16 w-16 text-secondary-400" />
                </div>
                
                <div>
                  <h4 className="font-medium text-secondary-900">{selectedTemplate.name}</h4>
                  <p className="text-sm text-secondary-600 mt-1">{selectedTemplate.description}</p>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary-900">Price:</span>
                    <span className="text-2xl font-bold text-primary-900">${selectedTemplate.price}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowPurchaseModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button className="btn-primary flex-1">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Purchase Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}