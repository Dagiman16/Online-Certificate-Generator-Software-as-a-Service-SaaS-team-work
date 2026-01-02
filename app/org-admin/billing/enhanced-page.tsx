'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  PencilIcon,
  PlusIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  GiftIcon,
  StarIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function EnhancedBillingPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('professional')

  // Enhanced subscription data
  const subscriptionPlans = [
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
      limitations: [
        'Watermark on certificates',
        'Limited template access',
        'No custom branding',
        'No bulk operations'
      ]
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
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      billingCycle: 'monthly',
      certificateLimit: -1, // unlimited
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
      limitations: []
    }
  ]

  const payPerCertificateRates = {
    withWatermark: 0.50,
    withoutWatermark: 2.00,
    premiumTemplate: 3.00
  }

  const currentSubscription = {
    planId: 'professional',
    name: 'Professional',
    price: 49,
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active',
    certificatesUsed: 127,
    certificatesLimit: 500,
    watermarkRemoved: true,
    customBranding: true,
    startDate: '2024-01-15'
  }

  const usageStats = {
    currentMonth: {
      certificatesGenerated: 127,
      certificatesRemaining: 373,
      watermarkFree: 127,
      premiumTemplates: 23,
      apiCalls: 1456,
      storageUsed: '2.3 GB',
      costBreakdown: {
        subscription: 49.00,
        payPerCertificate: 0.00,
        premiumFeatures: 0.00,
        total: 49.00
      }
    },
    previousMonth: {
      certificatesGenerated: 98,
      templateDownloads: 18,
      apiCalls: 1123,
      storageUsed: '2.1 GB'
    }
  }

  const recentTransactions = [
    {
      id: 'TXN-2024-001',
      date: '2024-01-15',
      type: 'subscription',
      description: 'Professional Plan - Monthly',
      amount: 49.00,
      status: 'completed',
      certificateCount: null
    },
    {
      id: 'TXN-2024-002',
      date: '2024-01-20',
      type: 'pay-per-certificate',
      description: '5 Premium Template Certificates',
      amount: 15.00,
      status: 'completed',
      certificateCount: 5
    },
    {
      id: 'TXN-2024-003',
      date: '2024-01-22',
      type: 'watermark-removal',
      description: 'Watermark Removal - 10 certificates',
      amount: 20.00,
      status: 'completed',
      certificateCount: 10
    }
  ]

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 49.00,
      status: 'paid',
      description: 'Professional Plan - January 2024',
      downloadUrl: '/invoices/INV-2024-001.pdf',
      breakdown: {
        subscription: 49.00,
        certificates: 0.00,
        features: 0.00
      }
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 64.00,
      status: 'paid',
      description: 'Professional Plan + Pay-per-certificate',
      downloadUrl: '/invoices/INV-2023-012.pdf',
      breakdown: {
        subscription: 49.00,
        certificates: 15.00,
        features: 0.00
      }
    }
  ]

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': 
      case 'completed': 
        return 'text-success-700 bg-success-100'
      case 'failed': return 'text-red-700 bg-red-100'
      case 'pending': return 'text-warning-700 bg-warning-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed': 
        return <CheckCircleIcon className="h-4 w-4 text-success-500" />
      case 'failed': return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
      case 'pending': return <ClockIcon className="h-4 w-4 text-warning-500" />
      default: return null
    }
  }

  const getCertificateUsagePercentage = () => {
    if (currentSubscription.certificatesLimit === -1) return 0 // unlimited
    return (currentSubscription.certificatesUsed / currentSubscription.certificatesLimit) * 100
  }

  const handleUpgradePlan = (planId: string) => {
    setSelectedPlan(planId)
    setShowUpgradeModal(true)
  }

  const handlePurchaseCertificates = () => {
    console.log('Purchase additional certificates')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Billing & Subscription</h1>
            <p className="text-secondary-600 mt-1">Manage your subscription, payments, and certificate usage</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download Invoice
            </button>
            <button onClick={() => setShowUpgradeModal(true)} className="btn-primary">
              <SparklesIcon className="h-5 w-5 mr-2" />
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Current Subscription Status */}
        <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircleIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">{currentSubscription.name} Plan</h3>
                <p className="text-secondary-600">
                  ${currentSubscription.price}/{currentSubscription.billingCycle} • Next billing: {currentSubscription.nextBilling}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-secondary-900">${currentSubscription.price}</div>
              <div className="text-sm text-secondary-600">per month</div>
            </div>
          </div>

          {/* Certificate Usage Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary-700">Certificate Usage</span>
              <span className="text-sm font-semibold text-secondary-900">
                {currentSubscription.certificatesUsed} / {currentSubscription.certificatesLimit === -1 ? '∞' : currentSubscription.certificatesLimit}
              </span>
            </div>
            {currentSubscription.certificatesLimit !== -1 && (
              <div className="w-full bg-secondary-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    getCertificateUsagePercentage() > 80 ? 'bg-red-500' : 
                    getCertificateUsagePercentage() > 60 ? 'bg-warning-500' : 
                    'bg-success-500'
                  }`}
                  style={{ width: `${getCertificateUsagePercentage()}%` }}
                ></div>
              </div>
            )}
            {currentSubscription.certificatesLimit !== -1 && getCertificateUsagePercentage() > 80 && (
              <div className="flex items-center p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mr-2" />
                <span className="text-sm text-warning-800">
                  You're approaching your certificate limit. Consider upgrading or purchasing additional certificates.
                </span>
              </div>
            )}
          </div>

          {/* Active Features */}
          <div className="mt-6 pt-6 border-t border-primary-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                {currentSubscription.watermarkRemoved ? (
                  <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2" />
                ) : (
                  <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm text-secondary-700">No Watermark</span>
              </div>
              <div className="flex items-center">
                {currentSubscription.customBranding ? (
                  <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2" />
                ) : (
                  <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm text-secondary-700">Custom Branding</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2" />
                <span className="text-sm text-secondary-700">Premium Templates</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2" />
                <span className="text-sm text-secondary-700">API Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Usage & Billing
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'plans'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Plans & Pricing
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'invoices'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Invoices
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payment'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Payment Methods
              </button>
            </nav>
          </div>

          {/* Usage Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Month Usage */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Current Month Usage</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="font-medium text-secondary-900">Certificates Generated</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-secondary-900">{usageStats.currentMonth.certificatesGenerated}</div>
                        <div className="text-sm text-success-600">
                          +{usageStats.currentMonth.certificatesGenerated - usageStats.previousMonth.certificatesGenerated} from last month
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <ShieldCheckIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="font-medium text-secondary-900">Certificates Remaining</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-secondary-900">
                          {currentSubscription.certificatesLimit === -1 ? '∞' : usageStats.currentMonth.certificatesRemaining}
                        </div>
                        <div className="text-sm text-secondary-600">
                          {currentSubscription.certificatesLimit === -1 ? 'Unlimited' : 'This month'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <SparklesIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="font-medium text-secondary-900">Watermark-Free Certificates</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-secondary-900">{usageStats.currentMonth.watermarkFree}</div>
                        <div className="text-sm text-success-600">
                          {currentSubscription.watermarkRemoved ? 'Included in plan' : '$' + (usageStats.currentMonth.watermarkFree * payPerCertificateRates.withoutWatermark).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="font-medium text-secondary-900">Premium Templates Used</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-secondary-900">{usageStats.currentMonth.premiumTemplates}</div>
                        <div className="text-sm text-secondary-600">Included in plan</div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                    <h4 className="font-semibold text-primary-900 mb-3">This Month's Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-800">Subscription ({currentSubscription.name})</span>
                        <span className="font-medium text-primary-900">${usageStats.currentMonth.costBreakdown.subscription.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-800">Pay-per-certificate</span>
                        <span className="font-medium text-primary-900">${usageStats.currentMonth.costBreakdown.payPerCertificate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-800">Premium features</span>
                        <span className="font-medium text-primary-900">${usageStats.currentMonth.costBreakdown.premiumFeatures.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-primary-300 pt-2 flex justify-between font-semibold">
                        <span className="text-primary-900">Total</span>
                        <span className="text-primary-900">${usageStats.currentMonth.costBreakdown.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pay-per-Certificate Options */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Pay-per-Certificate Options</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-secondary-900">Basic Certificate (with watermark)</h4>
                        <span className="text-lg font-bold text-secondary-900">${payPerCertificateRates.withWatermark}</span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">
                        Standard certificate with WDU-Certify watermark
                      </p>
                      <button onClick={handlePurchaseCertificates} className="btn-secondary w-full text-sm">
                        Purchase Certificates
                      </button>
                    </div>

                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-secondary-900">Professional Certificate (no watermark)</h4>
                        <span className="text-lg font-bold text-secondary-900">${payPerCertificateRates.withoutWatermark}</span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">
                        Clean certificate without any watermarks
                      </p>
                      <button onClick={handlePurchaseCertificates} className="btn-secondary w-full text-sm">
                        Purchase Certificates
                      </button>
                    </div>

                    <div className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-secondary-900">Premium Template Certificate</h4>
                        <span className="text-lg font-bold text-secondary-900">${payPerCertificateRates.premiumTemplate}</span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">
                        Premium design templates with custom branding
                      </p>
                      <button onClick={handlePurchaseCertificates} className="btn-secondary w-full text-sm">
                        Purchase Certificates
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                    <h4 className="font-medium text-accent-900 mb-3">Need More Certificates?</h4>
                    <p className="text-sm text-accent-800 mb-4">
                      Running low on certificates? Upgrade your plan or purchase additional certificates.
                    </p>
                    <div className="flex space-x-3">
                      <button onClick={() => setShowUpgradeModal(true)} className="btn-primary text-sm flex-1">
                        Upgrade Plan
                      </button>
                      <button onClick={handlePurchaseCertificates} className="btn-secondary text-sm flex-1">
                        Buy Certificates
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plans & Pricing Tab */}
          {activeTab === 'plans' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Choose Your Plan</h3>
                <p className="text-secondary-600">Select the plan that best fits your organization's needs</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`relative p-6 border-2 rounded-xl transition-all duration-200 ${
                      currentSubscription.planId === plan.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    {currentSubscription.planId === plan.id && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Current Plan
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-secondary-900 mb-2">{plan.name}</h4>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-secondary-900">${plan.price}</span>
                        <span className="text-secondary-600">/{plan.billingCycle}</span>
                      </div>
                      <p className="text-sm text-secondary-600">
                        {plan.certificateLimit === -1 ? 'Unlimited' : plan.certificateLimit} certificates per month
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-success-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-secondary-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center">
                            <XMarkIcon className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                            <span className="text-sm text-secondary-600">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => handleUpgradePlan(plan.id)}
                      disabled={currentSubscription.planId === plan.id}
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                        currentSubscription.planId === plan.id
                          ? 'bg-secondary-100 text-secondary-500 cursor-not-allowed'
                          : plan.id === 'enterprise'
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {currentSubscription.planId === plan.id ? 'Current Plan' : 
                       plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Pay-per-Certificate Pricing */}
              <div className="mt-8 p-6 bg-secondary-50 rounded-xl">
                <h4 className="text-lg font-semibold text-secondary-900 mb-4">Pay-per-Certificate Pricing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-secondary-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DocumentTextIcon className="h-5 w-5 text-secondary-400 mr-2" />
                      <span className="font-medium text-secondary-900">Basic Certificate</span>
                    </div>
                    <div className="text-2xl font-bold text-secondary-900 mb-1">${payPerCertificateRates.withWatermark}</div>
                    <p className="text-sm text-secondary-600">With watermark</p>
                  </div>
                  
                  <div className="p-4 bg-white border border-secondary-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <ShieldCheckIcon className="h-5 w-5 text-success-500 mr-2" />
                      <span className="font-medium text-secondary-900">Professional Certificate</span>
                    </div>
                    <div className="text-2xl font-bold text-secondary-900 mb-1">${payPerCertificateRates.withoutWatermark}</div>
                    <p className="text-sm text-secondary-600">No watermark</p>
                  </div>
                  
                  <div className="p-4 bg-white border border-secondary-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <StarIcon className="h-5 w-5 text-accent-500 mr-2" />
                      <span className="font-medium text-secondary-900">Premium Template</span>
                    </div>
                    <div className="text-2xl font-bold text-secondary-900 mb-1">${payPerCertificateRates.premiumTemplate}</div>
                    <p className="text-sm text-secondary-600">Premium design + no watermark</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Recent Transactions</h3>
                <button className="btn-secondary text-sm">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export All
                </button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        {transaction.type === 'subscription' ? (
                          <CalendarIcon className="h-5 w-5 text-secondary-600" />
                        ) : transaction.type === 'pay-per-certificate' ? (
                          <DocumentTextIcon className="h-5 w-5 text-secondary-600" />
                        ) : (
                          <ShieldCheckIcon className="h-5 w-5 text-secondary-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary-900">{transaction.id}</h4>
                        <p className="text-sm text-secondary-600">{transaction.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-xs text-secondary-500">{transaction.date}</p>
                          {transaction.certificateCount && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                              {transaction.certificateCount} certificates
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-secondary-900">${transaction.amount.toFixed(2)}</div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {recentTransactions.length === 0 && (
                <div className="text-center py-12">
                  <CurrencyDollarIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">No transactions yet</h3>
                  <p className="text-secondary-600">Your transaction history will appear here</p>
                </div>
              )}
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Billing History</h3>
                <button className="btn-secondary text-sm">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download All
                </button>
              </div>

              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <DocumentTextIcon className="h-5 w-5 text-secondary-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-secondary-900">{invoice.id}</h4>
                          <p className="text-sm text-secondary-600">{invoice.description}</p>
                          <p className="text-xs text-secondary-500">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold text-secondary-900">${invoice.amount.toFixed(2)}</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1 capitalize">{invoice.status}</span>
                          </div>
                        </div>
                        {invoice.downloadUrl && (
                          <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <ArrowDownTrayIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Invoice Breakdown */}
                    <div className="ml-14 p-3 bg-secondary-50 rounded-lg">
                      <h5 className="text-sm font-medium text-secondary-900 mb-2">Cost Breakdown</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Subscription</span>
                          <span className="text-secondary-900">${invoice.breakdown.subscription.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Pay-per-certificate</span>
                          <span className="text-secondary-900">${invoice.breakdown.certificates.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Additional features</span>
                          <span className="text-secondary-900">${invoice.breakdown.features.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Payment Methods</h3>
                <button className="btn-primary text-sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Payment Method
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <CreditCardIcon className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-secondary-900">
                            {method.brand} •••• {method.last4}
                          </h4>
                          {method.isDefault && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-secondary-600">
                          Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn-secondary text-sm py-2 px-3">
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      {!method.isDefault && (
                        <button className="btn-secondary text-sm py-2 px-3">
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning-900 mb-1">Payment Security</h4>
                    <p className="text-sm text-warning-800">
                      Your payment information is encrypted and securely stored. We never store your full card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-secondary-900">Upgrade Plan</h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <SparklesIcon className="h-8 w-8 text-primary-600" />
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                    Upgrade to {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
                  </h4>
                  <p className="text-secondary-600">
                    Get access to more features and higher certificate limits
                  </p>
                </div>
                
                <div className="p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-900">
                    ${subscriptionPlans.find(p => p.id === selectedPlan)?.price}/month
                  </div>
                  <p className="text-sm text-primary-700">
                    {subscriptionPlans.find(p => p.id === selectedPlan)?.certificateLimit === -1 
                      ? 'Unlimited certificates' 
                      : `${subscriptionPlans.find(p => p.id === selectedPlan)?.certificateLimit} certificates per month`
                    }
                  </p>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log('Upgrading to:', selectedPlan)
                      setShowUpgradeModal(false)
                    }}
                    className="btn-primary flex-1"
                  >
                    Upgrade Now
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