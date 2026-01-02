'use client'

import Link from 'next/link'
import { 
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function OnboardingCompletePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="flex">
        {/* Left Side - Congratulations */}
        <div className="flex-1 flex flex-col justify-center py-12 px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <div className="flex items-center justify-center mb-12">
              <img src="/logo.jpg" alt="WDU Logo" className="w-12 h-12 rounded-xl mr-3 object-cover" />
              <h1 className="text-2xl font-bold text-secondary-900">WDU-Certify</h1>
            </div>

            {/* Success Icon */}
            <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircleIcon className="h-12 w-12 text-success-600" />
            </div>

            {/* Main Message */}
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Congratulations! 🎉
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Now you are ready to step up your credential issuing workflow with WDU-Certify
            </p>

            {/* CTA Button */}
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Start with WDU-Certify
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/dashboard/trainings/create" className="card-hover text-center">
                <AcademicCapIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-900 mb-2">Create Training</h3>
                <p className="text-sm text-secondary-600">Set up your first training program</p>
              </Link>
              
              <Link href="/dashboard/templates" className="card-hover text-center">
                <DocumentTextIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-900 mb-2">Design Template</h3>
                <p className="text-sm text-secondary-600">Customize your certificate design</p>
              </Link>
              
              <Link href="/dashboard/trainees" className="card-hover text-center">
                <UsersIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-secondary-900 mb-2">Add Trainees</h3>
                <p className="text-sm text-secondary-600">Import or register participants</p>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-200">
              <SparklesIcon className="h-6 w-6 text-primary-600 mx-auto mb-3" />
              <h4 className="font-semibold text-primary-900 mb-2">Need help getting started?</h4>
              <p className="text-sm text-primary-800 mb-4">
                Our setup wizard will guide you through creating your first certificate in just a few minutes.
              </p>
              <Link href="/dashboard?tour=true" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Take the guided tour →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-accent-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="mb-8">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">You're all set!</h3>
              <p className="text-xl text-primary-100 mb-8">
                Your WDU-Certify account is ready to use. Start creating professional certificates today.
              </p>
            </div>
            
            {/* Feature Highlights */}
            <div className="space-y-4 text-left max-w-sm mx-auto">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-success-400 flex-shrink-0" />
                <span className="text-primary-100">Professional certificate templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-success-400 flex-shrink-0" />
                <span className="text-primary-100">Bulk certificate generation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-success-400 flex-shrink-0" />
                <span className="text-primary-100">QR code verification</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-success-400 flex-shrink-0" />
                <span className="text-primary-100">Analytics and tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-success-400 flex-shrink-0" />
                <span className="text-primary-100">Custom branding options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}