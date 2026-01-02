'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DocumentTextIcon,
  HomeIcon,
  AcademicCapIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  CogIcon,
  CreditCardIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole?: 'super_admin' | 'org_admin' | 'staff'
}

export default function DashboardLayout({ children, userRole = 'org_admin' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    // System Administrator Routes (Super Admin)
    { name: 'System Dashboard', href: '/super-admin/dashboard', icon: HomeIcon, roles: ['super_admin'] },
    { name: 'Manage Organizations', href: '/super-admin/organizations', icon: BuildingOfficeIcon, roles: ['super_admin'] },
    { name: 'System Templates', href: '/super-admin/templates', icon: DocumentTextIcon, roles: ['super_admin'] },
    { name: 'Pricing Management', href: '/super-admin/pricing', icon: CurrencyDollarIcon, roles: ['super_admin'] },
    { name: 'System Reports', href: '/super-admin/reports', icon: ChartBarIcon, roles: ['super_admin'] },
    { name: 'System Settings', href: '/super-admin/settings', icon: CogIcon, roles: ['super_admin'] },
    
    // Organization Administrator Routes
    { name: 'Dashboard', href: '/org-admin/dashboard', icon: HomeIcon, roles: ['org_admin', 'staff'] },
    { name: 'Organization Profile', href: '/org-admin/profile', icon: BuildingOfficeIcon, roles: ['org_admin'] },
    { name: 'Trainings', href: '/org-admin/trainings', icon: AcademicCapIcon, roles: ['org_admin', 'staff'] },
    { name: 'Trainees', href: '/org-admin/trainees', icon: UsersIcon, roles: ['org_admin', 'staff'] },
    { name: 'Certificates', href: '/org-admin/certificates', icon: DocumentDuplicateIcon, roles: ['org_admin', 'staff'] },
    { name: 'Templates', href: '/org-admin/templates', icon: DocumentTextIcon, roles: ['org_admin'] },
    { name: 'Reports', href: '/org-admin/reports', icon: ChartBarIcon, roles: ['org_admin'] },
    { name: 'Billing', href: '/org-admin/billing', icon: CreditCardIcon, roles: ['org_admin'] },
    { name: 'Settings', href: '/org-admin/settings', icon: CogIcon, roles: ['org_admin'] },
  ]

  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <img src="/logo.jpg" alt="WDU Logo" className="w-8 h-8 rounded-lg mr-2 object-cover" />
              <span className="text-xl font-bold text-gray-900">WDU-Certify</span>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4">
            <img src="/logo.jpg" alt="WDU Logo" className="w-8 h-8 rounded-lg mr-2 object-cover" />
            <span className="text-xl font-bold text-gray-900">WDU-Certify</span>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Bars3Icon className="h-6 w-6 text-gray-500" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {userRole === 'super_admin' ? 'System Administrator' : 
                     userRole === 'org_admin' ? 'Organization Admin' : 'Staff Member'}
                  </p>
                  <p className="text-gray-500">
                    {userRole === 'super_admin' ? 'system@wdu-certify.com' : 'admin@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}