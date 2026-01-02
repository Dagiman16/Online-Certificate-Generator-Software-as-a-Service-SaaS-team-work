'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  PencilIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  StarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function EnhancedSuperAdminPricingPage() {
  const [activeTab, setActiveTab] = useState('plans')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Subscription Plans Management
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      billingCycle: 'monthly',
      certificateLimit: 10,
      features: [
        '10 certificates per month',
        'Basic templates',
        'Watermarked certificates',
        'Email support',
        'Basic analytics'
      ],
      isActive: true,
      organizationsCount: 45
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49,
      billingCycle: 'monthly',
      certificateLimit: 500,
      features: [
        '500 certificates per month',
        'Premium templates',
        'No watermark',
        'Custom branding',
        'Bulk import/export',
        'Advanced analytics',
        'Priority support',
        'API access'
      ],
      isActive: true,
      organizationsCount: 128
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      billingCycle: 'monthly',
      certificateLimit: -1,
      features: [
        'Unlimited certificates',
        'All premium templates',
        'No watermark',
        'Full custom branding',
        'Advanced bulk operations',
        'Real-time analytics',
        'Dedicated support',
        'Full API access',
        'White-label solution',
        'Custom integrations'
      ],
      isActive: true,
      organizationsCount: 23
    }
  ])

  // Pay-per-Certificate Rates
  const [payPerCertificateRates, setPayPerCertificateRates] = useState([
    {
      id: 'basic',
      name: 'Basic Certificate',
      description: 'Standard certificate with watermark',
      price: 0.50,
      features: ['WDU-Certify watermark', 'Basic template', 'Standard verification'],
      isActive: true,
      usageCount: 1250
    },
    {
      id: 'professional',
      name: 'Professional Certificate',
      description: 'Clean certificate without watermark',
      price: 2.00,
      features: ['No watermark', 'Premium templates', 'Enhanced verification', 'Custom branding'],
      isActive: true,
      usageCount: 890
    },
    {
      id: 'premium',
      name: 'Premium Template Certificate',
      description: 'Premium design with full customization',
      price: 3.00,
      features: ['Premium design templates', 'No watermark', 'Full customization', 'Priority processing'],
      isActive: true,
      usageCount: 456
    }
  ])

  // Revenue Analytics
  const revenueStats = {
    totalRevenue: 45678.90,
    monthlyRecurring: 38450.00,
    payPerCertificate: 7228.90,
    growth: 12.5,
    activeOrganizations: 196,
    totalCertificatesIssued: 15678
  }

  const handleEditPlan = (plan: any) => {
    setEditingItem(plan)
    setShowEditModal(true)
  }

  const handleEditRate = (rate: any) => {
    setEditingItem(rate)
    setShowEditModal(true)
  }

  const handleSaveChanges = () => {
    console.log('Saving changes:', editingItem)
    setShowEditModal(false)
    setEditingItem(null)
  }

  const handleToggleActive = (id: string, type: 'plan' | 'rate') => {
    if (type === 'plan') {
      setSubscriptionPlans(plans => 
        plans.map(plan => 
          plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
        )
      )
    } else {
      setPayPerCertificateRates(rates => 
        rates.map(rate => 
          rate.id === id ? { ...rate, isActive: !rate.isActive } : rate
        )
      )
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Pricing Management</h1>
            <p className="text-secondary-600 mt-1">Manage subscription plans and pay-per-certificate pricing</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Revenue Report
            </button>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Plan
            </button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Revenue</p>
                <p className="text-2xl font-bold text-secondary-900">${revenueStats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-success-600">+{revenueStats.growth}% this month</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <CalendarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Monthly Recurring</p>
                <p className="text-2xl font-bold text-secondary-900">${revenueStats.monthlyRecurring.toLocaleString()}</p>
                <p className="text-sm text-secondary-600">Subscription revenue</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <DocumentTextIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Pay-per-Certificate</p>
                <p className="text-2xl font-bold text-secondary-900">${revenueStats.payPerCertificate.toLocaleString()}</p>
                <p className="text-sm text-secondary-600">One-time payments</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ArrowTrendingUpIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Organizations</p>
                <p className="text-2xl font-bold text-secondary-900">{revenueStats.activeOrganizations}</p>
                <p className="text-sm text-secondary-600">{revenueStats.totalCertificatesIssued.toLocaleString()} certificates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('plans')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'plans'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Subscription Plans
              </button>
              <button
                onClick={() => setActiveTab('rates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rates'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Pay-per-Certificate Rates
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Revenue Analytics
              </button>
            </nav>
          </div>

          {/* Subscription Plans Tab */}
          {activeTab === 'plans' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div key={plan.id} className="border border-secondary-200 rounded-xl p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-secondary-900">{plan.name}</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleActive(plan.id, 'plan')}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            plan.isActive 
                              ? 'bg-success-100 text-success-700' 
                              : 'bg-secondary-100 text-secondary-700'
                          }`}
                        >
                          {plan.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleEditPlan(plan)}
                          className="p-1 text-secondary-600 hover:text-primary-600 rounded"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-secondary-900">${plan.price}</div>
                      <div className="text-sm text-secondary-600">per {plan.billingCycle}</div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-secondary-600">
                        {plan.certificateLimit === -1 ? 'Unlimited' : plan.certificateLimit} certificates per month
                      </p>
                      <p className="text-sm text-secondary-500">
                        {plan.organizationsCount} organizations using this plan
                      </p>
                    </div>

                    <div className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircleIcon className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                          <span className="text-secondary-700">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 4 && (
                        <p className="text-sm text-secondary-500">
                          +{plan.features.length - 4} more features
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pay-per-Certificate Rates Tab */}
          {activeTab === 'rates' && (
            <div className="p-6">
              <div className="space-y-4">
                {payPerCertificateRates.map((rate) => (
                  <div key={rate.id} className="border border-secondary-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                          <DocumentTextIcon className="h-5 w-5 text-accent-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900">{rate.name}</h3>
                          <p className="text-sm text-secondary-600">{rate.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-secondary-900">${rate.price}</div>
                          <div className="text-sm text-secondary-600">per certificate</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleActive(rate.id, 'rate')}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              rate.isActive 
                                ? 'bg-success-100 text-success-700' 
                                : 'bg-secondary-100 text-secondary-700'
                            }`}
                          >
                            {rate.isActive ? 'Active' : 'Inactive'}
                          </button>
                          <button
                            onClick={() => handleEditRate(rate)}
                            className="p-2 text-secondary-600 hover:text-primary-600 rounded-lg transition-colors"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-secondary-900 mb-2">Features</h4>
                        <div className="space-y-1">
                          {rate.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <CheckCircleIcon className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                              <span className="text-secondary-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary-900 mb-2">Usage Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-secondary-600">Certificates issued</span>
                            <span className="font-medium text-secondary-900">{rate.usageCount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-secondary-600">Revenue generated</span>
                            <span className="font-medium text-secondary-900">${(rate.usageCount * rate.price).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revenue Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Revenue Breakdown</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-primary-900">Subscription Revenue</span>
                        <span className="text-lg font-bold text-primary-900">${revenueStats.monthlyRecurring.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-primary-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(revenueStats.monthlyRecurring / revenueStats.totalRevenue) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-primary-700 mt-1">
                        {((revenueStats.monthlyRecurring / revenueStats.totalRevenue) * 100).toFixed(1)}% of total revenue
                      </p>
                    </div>

                    <div className="p-4 bg-accent-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-accent-900">Pay-per-Certificate</span>
                        <span className="text-lg font-bold text-accent-900">${revenueStats.payPerCertificate.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-accent-200 rounded-full h-2">
                        <div 
                          className="bg-accent-600 h-2 rounded-full" 
                          style={{ width: `${(revenueStats.payPerCertificate / revenueStats.totalRevenue) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-accent-700 mt-1">
                        {((revenueStats.payPerCertificate / revenueStats.totalRevenue) * 100).toFixed(1)}% of total revenue
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plan Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Plan Distribution</h3>
                  <div className="space-y-3">
                    {subscriptionPlans.map((plan) => (
                      <div key={plan.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            plan.id === 'starter' ? 'bg-secondary-500' :
                            plan.id === 'professional' ? 'bg-primary-500' :
                            'bg-accent-500'
                          }`}></div>
                          <span className="font-medium text-secondary-900">{plan.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-secondary-900">{plan.organizationsCount}</div>
                          <div className="text-sm text-secondary-600">organizations</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {showEditModal && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-secondary-900">
                  Edit {editingItem.name || editingItem.title}
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                    className="input-field"
                  />
                </div>

                {editingItem.certificateLimit !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Certificate Limit
                    </label>
                    <input
                      type="number"
                      value={editingItem.certificateLimit === -1 ? '' : editingItem.certificateLimit}
                      onChange={(e) => setEditingItem({
                        ...editingItem, 
                        certificateLimit: e.target.value === '' ? -1 : parseInt(e.target.value)
                      })}
                      placeholder="Leave empty for unlimited"
                      className="input-field"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    className="input-field"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}