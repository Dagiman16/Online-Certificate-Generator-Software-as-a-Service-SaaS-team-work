'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ExclamationTriangleIcon, 
  XMarkIcon,
  InformationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { getDemoBannerConfig } from '../lib/demo'

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const config = getDemoBannerConfig()

  if (!config || !isVisible) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-warning-50 to-accent-50 border-b border-warning-200">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-6 w-6 text-warning-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-warning-900">
                  {config.message}
                </h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                  Demo
                </span>
              </div>
              <p className="text-sm text-warning-700 mt-1">
                {config.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link 
              href={config.ctaLink}
              className="inline-flex items-center px-3 py-2 border border-warning-300 rounded-md text-sm font-medium text-warning-700 bg-white hover:bg-warning-50 transition-colors"
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              {config.ctaText}
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-warning-600 hover:text-warning-800 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Limitations Details */}
        <div className="pb-3">
          <details className="group">
            <summary className="flex items-center cursor-pointer text-sm text-warning-700 hover:text-warning-900">
              <InformationCircleIcon className="h-4 w-4 mr-2" />
              View Demo Limitations
              <svg className="ml-2 h-4 w-4 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-2 pl-6">
              <ul className="text-sm text-warning-700 space-y-1">
                {config.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-warning-500 mr-2">•</span>
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}