import DashboardLayout from '../../components/Layout/DashboardLayout'
import Link from 'next/link'
import { 
  DocumentDuplicateIcon, 
  UsersIcon, 
  AcademicCapIcon, 
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  ChartBarIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const stats = [
    {
      name: 'Total Certificates',
      value: '0',
      change: 'Get started',
      changeType: 'neutral',
      icon: DocumentDuplicateIcon,
    },
    {
      name: 'Active Trainees',
      value: '0',
      change: 'Import now',
      changeType: 'neutral',
      icon: UsersIcon,
    },
    {
      name: 'Training Programs',
      value: '0',
      change: 'Create first',
      changeType: 'neutral',
      icon: AcademicCapIcon,
    },
    {
      name: 'Templates Ready',
      value: '12',
      change: 'Available',
      changeType: 'increase',
      icon: CheckCircleIcon,
    },
  ]

  const quickStartSteps = [
    {
      title: 'Create Your First Training Program',
      description: 'Set up a training program to organize your certificates',
      href: '/dashboard/trainings/create',
      icon: AcademicCapIcon,
      completed: false
    },
    {
      title: 'Import or Add Trainees',
      description: 'Add participants who will receive certificates',
      href: '/dashboard/trainees/import',
      icon: UsersIcon,
      completed: false
    },
    {
      title: 'Choose a Certificate Template',
      description: 'Select and customize your certificate design',
      href: '/dashboard/templates',
      icon: DocumentDuplicateIcon,
      completed: false
    },
    {
      title: 'Generate Your First Certificate',
      description: 'Create and issue your first digital certificate',
      href: '/dashboard/certificates/generate',
      icon: SparklesIcon,
      completed: false
    }
  ]

  const organizationStatus = {
    status: 'Active',
    plan: 'Free Trial',
    certificatesUsed: 0,
    certificatesLimit: 50,
    trialDaysLeft: 14
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to WDU-Certify! 🎉</h1>
              <p className="text-primary-100 text-lg">
                You're all set up! Let's create your first professional certificate.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <SparklesIcon className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Trial Status */}
        <div className="card bg-warning-50 border-warning-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mr-4">
                <ClockIcon className="h-6 w-6 text-warning-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-warning-900">Free Trial Active</h3>
                <p className="text-warning-700">
                  {organizationStatus.trialDaysLeft} days remaining • {organizationStatus.certificatesLimit - organizationStatus.certificatesUsed} certificates available
                </p>
              </div>
            </div>
            <button className="btn-primary">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">Quick Start Guide</h2>
              <p className="text-secondary-600">Follow these steps to issue your first certificate</p>
            </div>
            <div className="text-sm text-secondary-500">
              0 of {quickStartSteps.length} completed
            </div>
          </div>
          
          <div className="space-y-4">
            {quickStartSteps.map((step, index) => (
              <div key={index} className="flex items-center p-4 border border-secondary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group">
                <div className="w-10 h-10 bg-secondary-100 group-hover:bg-primary-100 rounded-xl flex items-center justify-center mr-4 transition-colors">
                  <step.icon className="h-5 w-5 text-secondary-600 group-hover:text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-900 group-hover:text-primary-900">{step.title}</h3>
                  <p className="text-sm text-secondary-600">{step.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-secondary-500">Step {index + 1}</span>
                  <ArrowRightIcon className="h-5 w-5 text-secondary-400 group-hover:text-primary-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="card hover:shadow-medium transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-secondary-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-secondary-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-success-600' : 
                        stat.changeType === 'decrease' ? 'text-red-600' : 'text-primary-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/certificates/generate" className="block p-4 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                    <DocumentDuplicateIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Generate Certificate</p>
                    <p className="text-sm text-secondary-600">Create your first certificate</p>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/trainees/import" className="block p-4 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center mr-3">
                    <UsersIcon className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Import Trainees</p>
                    <p className="text-sm text-secondary-600">Upload from Excel or CSV</p>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/trainings/create" className="block p-4 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-3">
                    <AcademicCapIcon className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Create Training</p>
                    <p className="text-sm text-secondary-600">Set up new training program</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Help & Resources */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Help & Resources</h3>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                <div className="flex items-start">
                  <PlayIcon className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-primary-900 mb-1">Watch Tutorial</h4>
                    <p className="text-sm text-primary-800 mb-3">
                      Learn how to create your first certificate in 5 minutes
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Watch Now →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-success-50 rounded-xl border border-success-200">
                <div className="flex items-start">
                  <BoltIcon className="h-5 w-5 text-success-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success-900 mb-1">Quick Setup</h4>
                    <p className="text-sm text-success-800 mb-3">
                      Use our setup wizard to get started in minutes
                    </p>
                    <button className="text-success-600 hover:text-success-700 font-medium text-sm">
                      Start Setup →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-200">
                <div className="flex items-start">
                  <ChartBarIcon className="h-5 w-5 text-secondary-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-1">Documentation</h4>
                    <p className="text-sm text-secondary-700 mb-3">
                      Comprehensive guides and API documentation
                    </p>
                    <button className="text-secondary-600 hover:text-secondary-700 font-medium text-sm">
                      View Docs →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}