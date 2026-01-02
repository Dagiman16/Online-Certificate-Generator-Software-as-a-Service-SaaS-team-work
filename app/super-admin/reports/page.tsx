'use client'

import { useState } from 'react'
import DashboardLayout from '../../../components/Layout/DashboardLayout'
import {
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  CurrencyDollarIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function SuperAdminReportsPage() {
  const [dateRange, setDateRange] = useState('30d')
  const [reportType, setReportType] = useState('overview')

  const systemStats = {
    totalOrganizations: 1247,
    organizationGrowth: 12.3,
    totalCertificates: 89432,
    certificateGrowth: 24.7,
    totalRevenue: 127890,
    revenueGrowth: 18.5,
    activeUsers: 15678,
    userGrowth: 15.2,
    systemUptime: 99.9,
    avgResponseTime: 245 // ms
  }

  const organizationsByStatus = [
    { status: 'Active', count: 1089, percentage: 87.3, color: 'success' },
    { status: 'Pending', count: 23, percentage: 1.8, color: 'warning' },
    { status: 'Suspended', count: 45, percentage: 3.6, color: 'red' },
    { status: 'Inactive', count: 90, percentage: 7.2, color: 'secondary' }
  ]

  const revenueByPlan = [
    { plan: 'Enterprise', revenue: 67890, subscribers: 234, avgRevenue: 290 },
    { plan: 'Professional', revenue: 43708, subscribers: 892, avgRevenue: 49 },
    { plan: 'Starter', revenue: 0, subscribers: 1247, avgRevenue: 0 },
    { plan: 'Legacy Pro', revenue: 4524, subscribers: 156, avgRevenue: 29 }
  ]

  const topOrganizations = [
    {
      id: 1,
      name: 'Global Training Institute',
      certificates: 2156,
      revenue: 149,
      plan: 'Enterprise',
      growth: 23.5
    },
    {
      id: 2,
      name: 'TechCorp University',
      certificates: 1892,
      revenue: 149,
      plan: 'Enterprise',
      growth: 18.7
    },
    {
      id: 3,
      name: 'Corporate Training Solutions',
      certificates: 1654,
      revenue: 49,
      plan: 'Professional',
      growth: 15.2
    },
    {
      id: 4,
      name: 'Skills Academy',
      certificates: 1234,
      revenue: 49,
      plan: 'Professional',
      growth: 12.8
    },
    {
      id: 5,
      name: 'Digital Learning Hub',
      certificates: 987,
      revenue: 49,
      plan: 'Professional',
      growth: -5.3
    }
  ]

  const certificatesByCategory = [
    { category: 'Technology', count: 32456, percentage: 36.3 },
    { category: 'Business', count: 24789, percentage: 27.7 },
    { category: 'Healthcare', count: 15678, percentage: 17.5 },
    { category: 'Education', count: 9876, percentage: 11.0 },
    { category: 'Other', count: 6633, percentage: 7.4 }
  ]

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Certificate Generation Load',
      message: 'Certificate generation queue is experiencing high volume',
      timestamp: '2024-01-15 14:30',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Organization Registrations',
      message: '15 new organizations registered in the last 24 hours',
      timestamp: '2024-01-15 12:15',
      severity: 'low'
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Processing Delay',
      message: 'Some subscription renewals are experiencing delays',
      timestamp: '2024-01-15 10:45',
      severity: 'high'
    }
  ]

  const geographicData = [
    { country: 'United States', organizations: 456, certificates: 34567, revenue: 45678 },
    { country: 'United Kingdom', organizations: 234, certificates: 18765, revenue: 23456 },
    { country: 'Canada', organizations: 189, certificates: 15432, revenue: 19876 },
    { country: 'Australia', organizations: 156, certificates: 12345, revenue: 16789 },
    { country: 'Germany', organizations: 134, certificates: 9876, revenue: 13456 }
  ]

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-success-500" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-success-600' : 'text-red-600'
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-warning-500" />
      default: return <CheckCircleIcon className="h-5 w-5 text-primary-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-warning-200 bg-warning-50'
      default: return 'border-primary-200 bg-primary-50'
    }
  }

  return (
    <DashboardLayout userRole="super_admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">System Reports & Analytics</h1>
            <p className="text-secondary-600 mt-1">Comprehensive system-wide analytics and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="btn-primary">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* System Health Alerts */}
        <div className="card bg-gradient-to-r from-red-50 to-warning-50 border-warning-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">System Alerts</h2>
            <span className="text-sm text-secondary-600">{systemAlerts.length} active</span>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{alert.title}</h3>
                  <p className="text-sm text-secondary-600">{alert.message}</p>
                  <p className="text-xs text-secondary-500 mt-1">{alert.timestamp}</p>
                </div>
                <button className="text-secondary-400 hover:text-secondary-600">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Organizations</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {systemStats.totalOrganizations.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(systemStats.organizationGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(systemStats.organizationGrowth)}`}>
                    +{systemStats.organizationGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Certificates</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {systemStats.totalCertificates.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(systemStats.certificateGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(systemStats.certificateGrowth)}`}>
                    +{systemStats.certificateGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                <DocumentDuplicateIcon className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Revenue</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  ${systemStats.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(systemStats.revenueGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(systemStats.revenueGrowth)}`}>
                    +{systemStats.revenueGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Users</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {systemStats.activeUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  {getGrowthIcon(systemStats.userGrowth)}
                  <span className={`text-sm font-medium ml-1 ${getGrowthColor(systemStats.userGrowth)}`}>
                    +{systemStats.userGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">System Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-success-900">System Uptime</h3>
                  <p className="text-sm text-success-700">Last 30 days</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success-900">{systemStats.systemUptime}%</div>
                  <div className="text-sm text-success-700">Excellent</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-primary-900">Avg Response Time</h3>
                  <p className="text-sm text-primary-700">API endpoints</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-900">{systemStats.avgResponseTime}ms</div>
                  <div className="text-sm text-primary-700">Good</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Organizations by Status</h2>
            <div className="space-y-3">
              {organizationsByStatus.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-900">{item.status}</span>
                    <span className="text-sm text-secondary-600">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.color === 'success' ? 'bg-success-500' :
                        item.color === 'warning' ? 'bg-warning-500' :
                        item.color === 'red' ? 'bg-red-500' : 'bg-secondary-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-secondary-500">{item.percentage}% of total</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Revenue by Plan</h2>
            <div className="space-y-4">
              {revenueByPlan.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-secondary-900">{plan.plan}</h3>
                    <p className="text-sm text-secondary-600">{plan.subscribers} subscribers</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-secondary-900">${plan.revenue.toLocaleString()}</div>
                    <div className="text-sm text-secondary-600">${plan.avgRevenue}/user</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Top Organizations</h2>
            <div className="space-y-3">
              {topOrganizations.map((org, index) => (
                <div key={org.id} className="flex items-center justify-between p-3 border border-secondary-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">{org.name}</h3>
                      <p className="text-sm text-secondary-600">{org.certificates} certificates</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-secondary-900">${org.revenue}/mo</div>
                    <div className={`text-sm flex items-center ${getGrowthColor(org.growth)}`}>
                      {getGrowthIcon(org.growth)}
                      <span className="ml-1">{Math.abs(org.growth)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Geographic Distribution</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Organizations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Certificates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {geographicData.map((country, index) => (
                  <tr key={index} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <GlobeAltIcon className="h-5 w-5 text-secondary-400 mr-3" />
                        <span className="font-medium text-secondary-900">{country.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {country.organizations.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {country.certificates.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      ${country.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Categories */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Certificates by Category</h2>
          <div className="space-y-4">
            {certificatesByCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-900">{category.category}</span>
                  <span className="text-sm text-secondary-600">{category.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-secondary-500">{category.percentage}% of total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Revenue Trend</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details →
              </button>
            </div>
            <div className="h-64 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl flex items-center justify-center border-2 border-dashed border-primary-200">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-primary-400 mx-auto mb-3" />
                <p className="text-primary-600 font-medium">Revenue Chart</p>
                <p className="text-sm text-primary-500">Interactive chart will be displayed here</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">User Growth</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details →
              </button>
            </div>
            <div className="h-64 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl flex items-center justify-center border-2 border-dashed border-success-200">
              <div className="text-center">
                <UsersIcon className="h-12 w-12 text-success-400 mx-auto mb-3" />
                <p className="text-success-600 font-medium">User Growth Chart</p>
                <p className="text-sm text-success-500">Interactive chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}