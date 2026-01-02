'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  CurrencyDollarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  ChartBarIcon,
  StarIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

export default function SuperAdminPricingPage() {
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)

  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: '',
    billingCycle: 'monthly',
    certificateLimit: '',
    features: [''],
    isPopular: false,
    isActive: true
  })

  const pricingPlans = [
    {
      id: '1',
      name: 'Starter',
      description: 'Perfect for small organizations getting started',
      price: 0,
      billingCycle: 'monthly',
      certificateLimit: 50,
      features: [
        'Up to 50 certificates per month',
        'Basic templates',
        'Email support',
        'Certificate verification',
        'Basic analytics'
      ],
      isPopular: false,
      isActive: true,
      subscribers: 1247,
      revenue: 0,
      conversionRate: 23.5,
      churnRate: 5.2
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Ideal for growing organizations',
      price: 49,
      billingCycle: 'monthly',
      certificateLimit: -1, // unlimited
      features: [
        'Unlimited certificates',
        'Premium templates',
        'Custom branding',
        'Priority support',
        'Advanced analytics',
        'Bulk import',
        'API access'
      ],
      isPopular: true,
      isActive: true,
      subscribers: 892,
      revenue: 43708,
      conversionRate: 18.7,
      churnRate: 3.1
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      price: 149,
      billingCycle: 'monthly',
      certificateLimit: -1,
      features: [
        'Everything in Professional',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'Advanced security',
        'Custom templates',
        'Multi-organization management'
      ],
      isPopular: false,
      isActive: true,
      subscribers: 234,
      revenue: 34866,
      conversionRate: 12.3,
      churnRate: 1.8
    },
    {
      id: '4',
      name: 'Legacy Pro',
      description: 'Discontinued plan for existing customers',
      price: 29,
      billingCycle: 'monthly',
      certificateLimit: 500,
      features: [
        'Up to 500 certificates',
        'Basic templates',
        'Email support',
        'Basic analytics'
      ],
      isPopular: false,
      isActive: false,
      subscribers: 156,
      revenue: 4524,
      conversionRate: 0,
      churnRate: 8.7
    }
  ]

  const stats = {
    totalRevenue: pricingPlans.reduce((sum, plan) => sum + plan.revenue, 0),
    totalSubscribers: pricingPlans.reduce((sum, plan) => sum + plan.subscribers, 0),
    averageRevenue: pricingPlans.filter(p => p.subscribers > 0).reduce((sum, plan) => sum + (plan.revenue / plan.subscribers), 0) / pricingPlans.filter(p => p.subscribers > 0).length,
    activePlans: pricingPlans.filter(p => p.isActive).length
  }

  const handleCreatePlan = () => {
    console.log('Creating new plan:', newPlan)
    setShowCreatePlan(false)
    setNewPlan({
      name: '',
      description: '',
      price: '',
      billingCycle: 'monthly',
      certificateLimit: '',
      features: [''],
      isPopular: false,
      isActive: true
    })
  }

  const handleEditPlan = (plan: any) => {
    setEditingPlan({ ...plan })
  }

  const handleUpdatePlan = () => {
    console.log('Updating plan:', editingPlan)
    setEditingPlan(null)
  }

  const handleDeletePlan = (planId: string) => {
    if (confirm('Are you sure you want to delete this pricing plan? This action cannot be undone.')) {
      console.log('Deleting plan:', planId)
    }
  }

  const handleToggleStatus = (planId: string) => {
    console.log('Toggling status for plan:', planId)
  }

  const addFeature = (features: string[], setFeatures: (features: string[]) => void) => {
    setFeatures([...features, ''])
  }

  const removeFeature = (index: number, features: string[], setFeatures: (features: string[]) => void) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index))
    }
  }

  const updateFeature = (index: number, value: string, features: string[], setFeatures: (features: string[]) => void) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Pricing Management</h1>
            <p className="text-secondary-600 mt-1">Manage subscription plans and pricing</p>
          </div>
          <button 
            onClick={() => setShowCreatePlan(true)}
            className="btn-primary"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Plan
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Revenue</p>
                <p className="text-2xl font-bold text-secondary-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                <UsersIcon className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.totalSubscribers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <ChartBarIcon className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Avg Revenue/User</p>
                <p className="text-2xl font-bold text-secondary-900">${stats.averageRevenue.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <DocumentDuplicateIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Plans</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.activePlans}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className={`card relative ${plan.isPopular ? 'ring-2 ring-primary-500' : ''} ${!plan.isActive ? 'opacity-75' : ''}`}>
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.isActive ? 'bg-success-100 text-success-700' : 'bg-red-100 text-red-700'
                }`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-4">
                {/* Plan Header */}
                <div className="text-center pt-4">
                  <h3 className="text-xl font-bold text-secondary-900">{plan.name}</h3>
                  <p className="text-secondary-600 mt-1">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-secondary-900">
                      ${plan.price}
                    </span>
                    <span className="text-secondary-600">/{plan.billingCycle}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-success-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="border-t border-secondary-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-secondary-500">Subscribers:</span>
                      <span className="font-medium text-secondary-900 ml-1">{plan.subscribers}</span>
                    </div>
                    <div>
                      <span className="text-secondary-500">Revenue:</span>
                      <span className="font-medium text-secondary-900 ml-1">${plan.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-secondary-500">Conversion:</span>
                      <span className="font-medium text-secondary-900 ml-1">{plan.conversionRate}%</span>
                      <ArrowTrendingUpIcon className="h-3 w-3 text-success-500 ml-1" />
                    </div>
                    <div className="flex items-center">
                      <span className="text-secondary-500">Churn:</span>
                      <span className="font-medium text-secondary-900 ml-1">{plan.churnRate}%</span>
                      {plan.churnRate > 5 ? (
                        <ArrowTrendingUpIcon className="h-3 w-3 text-red-500 ml-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-3 w-3 text-success-500 ml-1" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="btn-secondary text-sm py-2 px-3"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(plan.id)}
                      className={`btn-secondary text-sm py-2 px-3 ${
                        plan.isActive ? 'text-red-600 hover:bg-red-50' : 'text-success-600 hover:bg-success-50'
                      }`}
                    >
                      {plan.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Plan Modal */}
        {showCreatePlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-secondary-900 mb-6">Create New Pricing Plan</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Plan Name</label>
                    <input
                      type="text"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                      className="input-field"
                      placeholder="e.g., Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Price</label>
                    <input
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
                  <textarea
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                    rows={3}
                    className="input-field"
                    placeholder="Brief description of the plan"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Billing Cycle</label>
                    <select
                      value={newPlan.billingCycle}
                      onChange={(e) => setNewPlan({...newPlan, billingCycle: e.target.value})}
                      className="input-field"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Certificate Limit</label>
                    <input
                      type="number"
                      value={newPlan.certificateLimit}
                      onChange={(e) => setNewPlan({...newPlan, certificateLimit: e.target.value})}
                      className="input-field"
                      placeholder="Leave empty for unlimited"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Features</label>
                  <div className="space-y-2">
                    {newPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value, newPlan.features, (features) => setNewPlan({...newPlan, features}))}
                          className="input-field flex-1"
                          placeholder="Feature description"
                        />
                        {newPlan.features.length > 1 && (
                          <button
                            onClick={() => removeFeature(index, newPlan.features, (features) => setNewPlan({...newPlan, features}))}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addFeature(newPlan.features, (features) => setNewPlan({...newPlan, features}))}
                      className="btn-secondary text-sm"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newPlan.isPopular}
                      onChange={(e) => setNewPlan({...newPlan, isPopular: e.target.checked})}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700">Mark as popular</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newPlan.isActive}
                      onChange={(e) => setNewPlan({...newPlan, isActive: e.target.checked})}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreatePlan(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlan}
                  className="flex-1 btn-primary"
                >
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Plan Modal */}
        {editingPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-secondary-900 mb-6">Edit Pricing Plan</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Plan Name</label>
                    <input
                      type="text"
                      value={editingPlan.name}
                      onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Price</label>
                    <input
                      type="number"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value)})}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
                  <textarea
                    value={editingPlan.description}
                    onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                    rows={3}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Billing Cycle</label>
                    <select
                      value={editingPlan.billingCycle}
                      onChange={(e) => setEditingPlan({...editingPlan, billingCycle: e.target.value})}
                      className="input-field"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Certificate Limit</label>
                    <input
                      type="number"
                      value={editingPlan.certificateLimit === -1 ? '' : editingPlan.certificateLimit}
                      onChange={(e) => setEditingPlan({...editingPlan, certificateLimit: e.target.value ? parseInt(e.target.value) : -1})}
                      className="input-field"
                      placeholder="Leave empty for unlimited"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Features</label>
                  <div className="space-y-2">
                    {editingPlan.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value, editingPlan.features, (features) => setEditingPlan({...editingPlan, features}))}
                          className="input-field flex-1"
                        />
                        {editingPlan.features.length > 1 && (
                          <button
                            onClick={() => removeFeature(index, editingPlan.features, (features) => setEditingPlan({...editingPlan, features}))}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addFeature(editingPlan.features, (features) => setEditingPlan({...editingPlan, features}))}
                      className="btn-secondary text-sm"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingPlan.isPopular}
                      onChange={(e) => setEditingPlan({...editingPlan, isPopular: e.target.checked})}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700">Mark as popular</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingPlan.isActive}
                      onChange={(e) => setEditingPlan({...editingPlan, isActive: e.target.checked})}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setEditingPlan(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePlan}
                  className="flex-1 btn-primary"
                >
                  Update Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tips */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">Pricing Strategy Tips</h3>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Offer a free tier to attract new users and demonstrate value</li>
                <li>• Use psychological pricing (e.g., $49 instead of $50)</li>
                <li>• Monitor conversion rates and adjust pricing based on data</li>
                <li>• Consider annual discounts to improve customer lifetime value</li>
                <li>• Regularly review competitor pricing and market positioning</li>
                <li>• Test different price points with A/B testing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}