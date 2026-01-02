'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ExclamationTriangleIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

interface Organization {
  id: string
  name: string
  status: 'pending' | 'approved' | 'suspended' | 'rejected'
  registrationDate: string
  approvalDate?: string
  contactEmail: string
  adminName: string
}

interface User {
  id: string
  name: string
  email: string
  role: 'super-admin' | 'org-admin' | 'staff' | 'trainee'
  organizationId?: string
}

interface RoleBasedAccessProps {
  children: React.ReactNode
  requiredRole?: 'super-admin' | 'org-admin' | 'staff' | 'trainee'
  requireApprovedOrg?: boolean
  fallbackPath?: string
}

export default function RoleBasedAccess({ 
  children, 
  requiredRole, 
  requireApprovedOrg = false,
  fallbackPath = '/auth/login'
}: RoleBasedAccessProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user and organization data
    // In real app, this would come from context/API
    const mockUser: User = {
      id: '1',
      name: 'John Admin',
      email: 'admin@techcorp.edu',
      role: 'org-admin',
      organizationId: 'org-1'
    }

    const mockOrganization: Organization = {
      id: 'org-1',
      name: 'TechCorp University',
      status: 'approved', // Change this to test different states: 'pending', 'approved', 'suspended', 'rejected'
      registrationDate: '2024-01-15',
      approvalDate: '2024-01-20',
      contactEmail: 'admin@techcorp.edu',
      adminName: 'John Admin'
    }

    setUser(mockUser)
    setOrganization(mockOrganization)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Check if user is logged in
  if (!user) {
    router.push(fallbackPath)
    return null
  }

  // Check role requirements
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on user role
    const roleRedirects = {
      'super-admin': '/super-admin/dashboard',
      'org-admin': '/org-admin/dashboard',
      'staff': '/staff/dashboard',
      'trainee': '/dashboard'
    }
    
    router.push(roleRedirects[user.role])
    return null
  }

  // Check organization approval requirements
  if (requireApprovedOrg && organization && organization.status !== 'approved') {
    return <OrganizationStatusPage organization={organization} user={user} />
  }

  return <>{children}</>
}

function OrganizationStatusPage({ organization, user }: { organization: Organization, user: User }) {
  const getStatusConfig = () => {
    switch (organization.status) {
      case 'pending':
        return {
          icon: ClockIcon,
          iconColor: 'text-warning-600',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200',
          title: 'Organization Approval Pending',
          message: 'Your organization registration is currently under review. You will receive an email notification once approved.',
          actionText: 'Contact Support',
          actionHref: '/contact'
        }
      case 'suspended':
        return {
          icon: XMarkIcon,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Organization Suspended',
          message: 'Your organization has been temporarily suspended. Please contact support to resolve this issue.',
          actionText: 'Contact Support',
          actionHref: '/contact'
        }
      case 'rejected':
        return {
          icon: XMarkIcon,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Organization Registration Rejected',
          message: 'Your organization registration has been rejected. Please contact support for more information.',
          actionText: 'Contact Support',
          actionHref: '/contact'
        }
      default:
        return {
          icon: CheckCircleIcon,
          iconColor: 'text-success-600',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          title: 'Organization Approved',
          message: 'Your organization is approved and ready to use.',
          actionText: 'Continue',
          actionHref: '/org-admin/dashboard'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-8 text-center`}>
          <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <config.icon className={`h-8 w-8 ${config.iconColor}`} />
          </div>
          
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">{config.title}</h1>
          <p className="text-secondary-600 mb-6 leading-relaxed">{config.message}</p>
          
          <div className="space-y-4">
            <div className="text-sm text-secondary-500">
              <p><strong>Organization:</strong> {organization.name}</p>
              <p><strong>Status:</strong> <span className="capitalize">{organization.status}</span></p>
              <p><strong>Registered:</strong> {organization.registrationDate}</p>
              {organization.approvalDate && (
                <p><strong>Approved:</strong> {organization.approvalDate}</p>
              )}
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link href={config.actionHref} className="btn-primary">
                {config.actionText}
              </Link>
              <Link href="/auth/logout" className="btn-secondary">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}