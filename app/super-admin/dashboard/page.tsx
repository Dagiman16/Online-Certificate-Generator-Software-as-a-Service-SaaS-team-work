'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

export default function SuperAdminDashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [systemHealth, setSystemHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load dashboard data
  useEffect(() => {
    loadDashboardData()
    loadSystemHealth()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      // Mock dashboard data
      const mockData = {
        overview: {
          total_organizations: 156,
          pending_organizations: 8,
          total_certificates: 12847,
          active_users: 2341
        },
        revenue: {
          monthly_revenue: 45600,
          yearly_revenue: 487200
        },
        growth: {
          organizations_30_days: 12,
          certificates_30_days: 847,
          users_30_days: 156
        },
        recent_activities: {
          organizations: [
            {
              id: 1,
              name: 'Tech University',
              email: 'admin@techuni.edu',
              status: 'approved',
              subscription_plan: 'Premium',
              created_at: '2024-01-15T10:30:00Z'
            },
            {
              id: 2,
              name: 'Business Academy',
              email: 'contact@bizacademy.com',
              status: 'pending',
              subscription_plan: 'Standard',
              created_at: '2024-01-14T14:20:00Z'
            },
            {
              id: 3,
              name: 'Medical Institute',
              email: 'info@medinst.org',
              status: 'approved',
              subscription_plan: 'Enterprise',
              created_at: '2024-01-13T09:15:00Z'
            }
          ]
        }
      }
      setDashboardData(mockData)
    } catch (error: any) {
      console.error('Failed to load dashboard data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const loadSystemHealth = async () => {
    try {
      // Mock system health data
      const mockHealth = {
        status: 'healthy',
        components: {
          database: { status: 'healthy', response_time: 45 },
          storage: { status: 'healthy', usage_percentage: 67 },
          errors: { count_24h: 3 }
        }
      }
      setSystemHealth(mockHealth)
    } catch (error: any) {
      console.error('Failed to load system health:', error)
    }
  }

  // Generate stats from API data
  const getStats = () => {
    if (!dashboardData) return []

    const { overview, revenue, growth } = dashboardData

    return [
      {
        name: 'Total Organizations',
        value: overview.total_organizations.toLocaleString(),
        change: `+${growth.organizations_30_days}`,
        changeType: growth.organizations_30_days > 0 ? 'increase' : 'neutral',
        icon: BuildingOfficeIcon,
        description: 'Active organizations'
      },
      {
        name: 'Pending Approvals',
        value: overview.pending_organizations.toString(),
        change: overview.pending_organizations > 10 ? 'High' : 'Normal',
        changeType: overview.pending_organizations > 10 ? 'warning' : 'neutral',
        icon: ClockIcon,
        description: 'Awaiting review'
      },
      {
        name: 'Monthly Revenue',
        value: `$${revenue.monthly_revenue.toLocaleString()}`,
        change: '+18%', // Would calculate from historical data
        changeType: 'increase',
        icon: CurrencyDollarIcon,
        description: 'This month'
      },
      {
        name: 'Certificates Issued',
        value: overview.total_certificates.toLocaleString(),
        change: `+${growth.certificates_30_days}`,
        changeType: growth.certificates_30_days > 0 ? 'increase' : 'neutral',
        icon: DocumentDuplicateIcon,
        description: 'Last 30 days'
      }
    ]
  }

  // Generate system alerts from health data
  const getSystemAlerts = () => {
    if (!systemHealth) return []

    const alerts = []

    // Check database status
    if (systemHealth.components.database.status !== 'healthy') {
      alerts.push({
        id: 1,
        type: 'error',
        title: 'Database Issue',
        message: 'Database connection is experiencing problems',
        time: 'Now'
      })
    }

    // Check storage status
    if (systemHealth.components.storage.status === 'warning') {
      alerts.push({
        id: 2,
        type: 'warning',
        title: 'Storage Warning',
        message: `Disk usage is at ${systemHealth.components.storage.usage_percentage}%`,
        time: '5 minutes ago'
      })
    }

    // Check error count
    if (systemHealth.components.errors.count_24h > 10) {
      alerts.push({
        id: 3,
        type: 'warning',
        title: 'High Error Rate',
        message: `${systemHealth.components.errors.count_24h} errors in the last 24 hours`,
        time: '1 hour ago'
      })
    }

    // Default info alert if no issues
    if (alerts.length === 0) {
      alerts.push({
        id: 1,
        type: 'info',
        title: 'System Healthy',
        message: 'All systems are operating normally',
        time: 'Now'
      })
    }

    return alerts
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success-700 bg-success-100'
      case 'pending': return 'text-warning-700 bg-warning-100'
      case 'suspended': return 'text-red-700 bg-red-100'
      default: return 'text-secondary-700 bg-secondary-100'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-warning-500" />
      case 'error': return <XCircleIcon className="h-5 w-5 text-red-500" />
      default: return <CheckCircleIcon className="h-5 w-5 text-primary-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <DashboardLayout userRole="super_admin">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userRole="super_admin">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-secondary-600 mb-4">{error}</p>
            <button 
              onClick={loadDashboardData}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const stats = getStats()
  const systemAlerts = getSystemAlerts()
  const recentOrganizations = dashboardData?.recent_activities?.organizations || []

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">System Administrator Dashboard</h1>
            <p className="text-secondary-600 mt-1">System overview and management</p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* System Alerts */}
        <div className="card bg-gradient-to-r from-red-50 to-warning-50 border-warning-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">System Alerts</h2>
            <span className="text-sm text-secondary-600">{systemAlerts.length} active</span>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-secondary-200">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{alert.title}</h3>
                  <p className="text-sm text-secondary-600">{alert.message}</p>
                  <p className="text-xs text-secondary-500 mt-1">{alert.time}</p>
                </div>
                <button className="text-secondary-400 hover:text-secondary-600">
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="card hover:shadow-medium transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-secondary-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-success-500 mr-1" />
                    ) : stat.changeType === 'decrease' ? (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    ) : (
                      <ClockIcon className="h-4 w-4 text-warning-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-success-600' :
                      stat.changeType === 'decrease' ? 'text-red-600' : 'text-warning-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-secondary-500 ml-1">{stat.description}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Organizations */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Recent Organizations</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentOrganizations.map((org: any) => (
                <div key={org.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {org.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">{org.name}</h3>
                      <p className="text-sm text-secondary-600">{org.email}</p>
                      <p className="text-xs text-secondary-500">{formatDate(org.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(org.status)}`}>
                      {org.status}
                    </span>
                    <p className="text-xs text-secondary-500 mt-1">{org.subscription_plan || 'No Plan'}</p>
                  </div>
                </div>
              ))}
              {recentOrganizations.length === 0 && (
                <div className="text-center py-8 text-secondary-500">
                  No recent organizations
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-secondary-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 group">
                <BuildingOfficeIcon className="h-8 w-8 text-secondary-600 group-hover:text-primary-600 mb-3" />
                <h3 className="font-medium text-secondary-900 group-hover:text-primary-900">Organizations</h3>
                <p className="text-sm text-secondary-600">Manage & approve</p>
              </button>
              <button className="p-4 border border-secondary-200 rounded-xl hover:bg-success-50 hover:border-success-300 transition-all duration-200 group">
                <DocumentTextIcon className="h-8 w-8 text-secondary-600 group-hover:text-success-600 mb-3" />
                <h3 className="font-medium text-secondary-900 group-hover:text-success-900">Templates</h3>
                <p className="text-sm text-secondary-600">Manage templates</p>
              </button>
              <button className="p-4 border border-secondary-200 rounded-xl hover:bg-accent-50 hover:border-accent-300 transition-all duration-200 group">
                <CurrencyDollarIcon className="h-8 w-8 text-secondary-600 group-hover:text-accent-600 mb-3" />
                <h3 className="font-medium text-secondary-900 group-hover:text-accent-900">Pricing</h3>
                <p className="text-sm text-secondary-600">Set pricing plans</p>
              </button>
              <button className="p-4 border border-secondary-200 rounded-xl hover:bg-warning-50 hover:border-warning-300 transition-all duration-200 group">
                <ChartBarIcon className="h-8 w-8 text-secondary-600 group-hover:text-warning-600 mb-3" />
                <h3 className="font-medium text-secondary-900 group-hover:text-warning-900">Reports</h3>
                <p className="text-sm text-secondary-600">System analytics</p>
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">Revenue Overview</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">Revenue</button>
              <button className="px-3 py-1 text-sm text-secondary-600 hover:bg-secondary-100 rounded-lg">Users</button>
              <button className="px-3 py-1 text-sm text-secondary-600 hover:bg-secondary-100 rounded-lg">Certificates</button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl flex items-center justify-center border-2 border-dashed border-primary-200">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-primary-400 mx-auto mb-3" />
              <p className="text-primary-600 font-medium">Revenue Chart</p>
              <p className="text-sm text-primary-500">Interactive chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}