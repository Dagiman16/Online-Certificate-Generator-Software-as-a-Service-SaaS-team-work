// Demo mode and testing infrastructure

export interface DemoConfig {
  isEnabled: boolean
  maxCertificates: number
  maxOrganizations: number
  watermarkText: string
  features: {
    bulkGeneration: boolean
    customTemplates: boolean
    apiAccess: boolean
    analytics: boolean
  }
  restrictions: {
    noEmailDelivery: boolean
    limitedStorage: boolean
    reducedApiLimits: boolean
  }
}

export interface TestingConfig {
  mockData: boolean
  simulateLatency: boolean
  errorRate: number
  enableDebugLogs: boolean
}

// Demo mode configuration
export const DEMO_CONFIG: DemoConfig = {
  isEnabled: process.env.NODE_ENV !== 'production' || process.env.DEMO_MODE === 'true',
  maxCertificates: 50,
  maxOrganizations: 5,
  watermarkText: 'DEMO - NOT FOR OFFICIAL USE',
  features: {
    bulkGeneration: true,
    customTemplates: false,
    apiAccess: false,
    analytics: true
  },
  restrictions: {
    noEmailDelivery: true,
    limitedStorage: true,
    reducedApiLimits: true
  }
}

// Testing configuration
export const TESTING_CONFIG: TestingConfig = {
  mockData: process.env.NODE_ENV === 'test' || process.env.USE_MOCK_DATA === 'true',
  simulateLatency: process.env.SIMULATE_LATENCY === 'true',
  errorRate: parseFloat(process.env.ERROR_RATE || '0'),
  enableDebugLogs: process.env.DEBUG_LOGS === 'true'
}

// Demo data generators
export class DemoDataGenerator {
  private static instance: DemoDataGenerator
  
  static getInstance(): DemoDataGenerator {
    if (!DemoDataGenerator.instance) {
      DemoDataGenerator.instance = new DemoDataGenerator()
    }
    return DemoDataGenerator.instance
  }

  generateDemoOrganizations(count: number = 3): any[] {
    const organizations = []
    const names = [
      'TechCorp University',
      'DataTech Academy', 
      'Business Excellence Institute',
      'Digital Skills Center',
      'Professional Development Hub'
    ]
    
    for (let i = 0; i < Math.min(count, names.length); i++) {
      organizations.push({
        id: `demo-org-${i + 1}`,
        name: names[i],
        email: `admin@${names[i].toLowerCase().replace(/\s+/g, '')}.demo`,
        phone: `+1-555-${String(i + 1).padStart(3, '0')}-0000`,
        address: `${100 + i * 10} Demo Street, Test City, TC ${10000 + i}`,
        status: 'approved',
        plan: i === 0 ? 'enterprise' : i === 1 ? 'professional' : 'starter',
        createdAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
        isDemo: true
      })
    }
    
    return organizations
  }

  generateDemoUsers(organizationId: string, count: number = 5): any[] {
    const users = []
    const roles = ['org-admin', 'staff', 'staff', 'trainee', 'trainee']
    const names = [
      'John Admin', 'Sarah Staff', 'Mike Teacher', 
      'Alice Student', 'Bob Learner', 'Carol Trainee'
    ]
    
    for (let i = 0; i < Math.min(count, names.length); i++) {
      const name = names[i]
      const email = `${name.toLowerCase().replace(/\s+/g, '.')}@demo.com`
      
      users.push({
        id: `demo-user-${organizationId}-${i + 1}`,
        name,
        email,
        role: roles[i] || 'trainee',
        organizationId,
        isActive: true,
        isDemo: true,
        createdAt: new Date(Date.now() - (i * 12 * 60 * 60 * 1000))
      })
    }
    
    return users
  }

  generateDemoCertificates(organizationId: string, count: number = 20): any[] {
    const certificates = []
    const courses = [
      'Web Development Fundamentals',
      'Data Science with Python',
      'Digital Marketing Essentials',
      'Project Management Professional',
      'Cybersecurity Fundamentals',
      'Cloud Computing Basics',
      'Mobile App Development',
      'UI/UX Design Principles'
    ]
    
    const trainees = [
      'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson',
      'David Brown', 'Lisa Anderson', 'Tom Davis', 'Emma Wilson'
    ]
    
    const instructors = [
      'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Lisa Anderson',
      'Robert Davis', 'Mary Johnson', 'Dr. James Wilson'
    ]
    
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C']
    const statuses = ['Issued', 'Issued', 'Issued', 'Draft', 'Revoked']
    
    for (let i = 0; i < count; i++) {
      const issueDate = new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000))
      const completionDate = new Date(issueDate.getTime() - (7 * 24 * 60 * 60 * 1000))
      const status = statuses[i % statuses.length]
      
      certificates.push({
        id: `DEMO-CERT-${new Date().getFullYear()}-${Date.now() + i}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        traineeName: trainees[i % trainees.length],
        traineeEmail: `${trainees[i % trainees.length].toLowerCase().replace(/\s+/g, '.')}@demo.com`,
        courseName: courses[i % courses.length],
        organizationName: 'Demo Organization',
        organizationId,
        instructor: instructors[i % instructors.length],
        grade: grades[i % grades.length],
        duration: `${20 + (i % 5) * 10} hours`,
        issueDate: status === 'Draft' ? null : issueDate.toISOString().split('T')[0],
        completionDate: completionDate.toISOString().split('T')[0],
        status,
        template: i % 2 === 0 ? 'Professional Blue' : 'Modern Green',
        verificationCount: Math.floor(Math.random() * 50),
        lastVerified: status === 'Issued' ? issueDate.toISOString().split('T')[0] : null,
        watermarkRemoved: false, // Demo certificates always have watermarks
        isDemo: true,
        revokedDate: status === 'Revoked' ? issueDate.toISOString().split('T')[0] : null,
        revokedReason: status === 'Revoked' ? 'Demo certificate - testing purposes' : null
      })
    }
    
    return certificates
  }

  generateDemoTemplates(organizationId: string): any[] {
    return [
      {
        id: `demo-template-1`,
        name: 'Demo Professional Certificate',
        description: 'Professional certificate template for demo purposes',
        organizationId,
        design: {
          layout: 'professional',
          colors: { primary: '#2563eb', secondary: '#64748b' },
          fonts: { heading: 'Inter', body: 'Inter' },
          logo: '/wdu-logo.svg'
        },
        isPublic: true,
        isDemo: true,
        createdAt: new Date()
      },
      {
        id: `demo-template-2`,
        name: 'Demo Modern Certificate',
        description: 'Modern certificate template for demo purposes',
        organizationId,
        design: {
          layout: 'modern',
          colors: { primary: '#059669', secondary: '#6b7280' },
          fonts: { heading: 'Inter', body: 'Inter' },
          logo: '/wdu-logo.svg'
        },
        isPublic: false,
        isDemo: true,
        createdAt: new Date()
      }
    ]
  }
}

// Demo mode utilities
export class DemoModeManager {
  static isDemoMode(): boolean {
    return DEMO_CONFIG.isEnabled
  }

  static canCreateCertificate(organizationId: string, currentCount: number): boolean {
    if (!this.isDemoMode()) return true
    return currentCount < DEMO_CONFIG.maxCertificates
  }

  static canCreateOrganization(currentCount: number): boolean {
    if (!this.isDemoMode()) return true
    return currentCount < DEMO_CONFIG.maxOrganizations
  }

  static hasFeatureAccess(feature: keyof DemoConfig['features']): boolean {
    if (!this.isDemoMode()) return true
    return DEMO_CONFIG.features[feature]
  }

  static applyDemoWatermark(certificateData: any): any {
    if (!this.isDemoMode()) return certificateData

    return {
      ...certificateData,
      watermark: DEMO_CONFIG.watermarkText,
      watermarkRemoved: false,
      isDemo: true
    }
  }

  static getDemoLimitations(): string[] {
    if (!this.isDemoMode()) return []

    const limitations = [
      `Maximum ${DEMO_CONFIG.maxCertificates} certificates per organization`,
      `Maximum ${DEMO_CONFIG.maxOrganizations} demo organizations`,
      'All certificates include demo watermark'
    ]

    if (DEMO_CONFIG.restrictions.noEmailDelivery) {
      limitations.push('Email delivery disabled in demo mode')
    }

    if (DEMO_CONFIG.restrictions.limitedStorage) {
      limitations.push('Limited file storage in demo mode')
    }

    if (DEMO_CONFIG.restrictions.reducedApiLimits) {
      limitations.push('Reduced API rate limits in demo mode')
    }

    return limitations
  }
}

// Testing utilities
export class TestingUtilities {
  static async simulateLatency(min: number = 100, max: number = 500): Promise<void> {
    if (!TESTING_CONFIG.simulateLatency) return
    
    const delay = Math.random() * (max - min) + min
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  static shouldSimulateError(): boolean {
    return Math.random() < TESTING_CONFIG.errorRate
  }

  static mockApiResponse<T>(data: T, options: { 
    delay?: boolean
    errorRate?: number 
  } = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      const delay = options.delay !== false ? Math.random() * 200 + 50 : 0
      
      setTimeout(() => {
        const errorRate = options.errorRate || TESTING_CONFIG.errorRate
        
        if (Math.random() < errorRate) {
          reject(new Error('Simulated API error'))
        } else {
          resolve(data)
        }
      }, delay)
    })
  }

  static generateTestData(type: 'organization' | 'user' | 'certificate' | 'template', count: number = 1): any[] {
    const generator = DemoDataGenerator.getInstance()
    
    switch (type) {
      case 'organization':
        return generator.generateDemoOrganizations(count)
      case 'user':
        return generator.generateDemoUsers('test-org-1', count)
      case 'certificate':
        return generator.generateDemoCertificates('test-org-1', count)
      case 'template':
        return generator.generateDemoTemplates('test-org-1')
      default:
        return []
    }
  }

  static debugLog(message: string, data?: any): void {
    if (TESTING_CONFIG.enableDebugLogs) {
      console.log(`[DEBUG] ${message}`, data || '')
    }
  }
}

// Demo mode banner component data
export function getDemoBannerConfig() {
  if (!DemoModeManager.isDemoMode()) return null

  return {
    message: 'You are in Demo Mode',
    description: 'This is a demonstration environment. All certificates will include a demo watermark.',
    limitations: DemoModeManager.getDemoLimitations(),
    ctaText: 'Upgrade to Production',
    ctaLink: '/pricing'
  }
}

// Initialize demo data
export async function initializeDemoData(): Promise<void> {
  if (!DemoModeManager.isDemoMode()) return

  const generator = DemoDataGenerator.getInstance()
  
  try {
    // Generate demo organizations
    const organizations = generator.generateDemoOrganizations(3)
    console.log('Generated demo organizations:', organizations.length)
    
    // Generate demo users for each organization
    for (const org of organizations) {
      const users = generator.generateDemoUsers(org.id, 5)
      console.log(`Generated demo users for ${org.name}:`, users.length)
      
      // Generate demo certificates
      const certificates = generator.generateDemoCertificates(org.id, 15)
      console.log(`Generated demo certificates for ${org.name}:`, certificates.length)
      
      // Generate demo templates
      const templates = generator.generateDemoTemplates(org.id)
      console.log(`Generated demo templates for ${org.name}:`, templates.length)
    }
    
    console.log('Demo data initialization completed')
  } catch (error) {
    console.error('Failed to initialize demo data:', error)
  }
}

// Export instances
export const demoGenerator = DemoDataGenerator.getInstance()
export const demoManager = DemoModeManager
export const testUtils = TestingUtilities