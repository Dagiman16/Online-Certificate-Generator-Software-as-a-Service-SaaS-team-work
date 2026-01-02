// Performance optimization utilities for bulk operations and caching

export interface BulkGenerationConfig {
  batchSize: number
  maxConcurrency: number
  retryAttempts: number
  retryDelay: number
}

export interface BulkGenerationProgress {
  total: number
  completed: number
  failed: number
  errors: Array<{ index: number; error: string }>
  startTime: Date
  estimatedCompletion?: Date
}

export interface CertificateGenerationRequest {
  traineeName: string
  traineeEmail: string
  courseName: string
  completionDate: string
  grade?: string
  instructor?: string
  templateId?: string
  organizationId: string
}

// Bulk certificate generation with performance optimization
export class BulkCertificateGenerator {
  private config: BulkGenerationConfig = {
    batchSize: 50, // Process 50 certificates at a time
    maxConcurrency: 5, // Maximum 5 concurrent batches
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
  }

  private progress: BulkGenerationProgress = {
    total: 0,
    completed: 0,
    failed: 0,
    errors: [],
    startTime: new Date()
  }

  constructor(config?: Partial<BulkGenerationConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
  }

  async generateBulkCertificates(
    requests: CertificateGenerationRequest[],
    onProgress?: (progress: BulkGenerationProgress) => void
  ): Promise<BulkGenerationProgress> {
    this.progress = {
      total: requests.length,
      completed: 0,
      failed: 0,
      errors: [],
      startTime: new Date()
    }

    // Split requests into batches
    const batches = this.createBatches(requests, this.config.batchSize)
    
    // Process batches with controlled concurrency
    const semaphore = new Semaphore(this.config.maxConcurrency)
    
    const batchPromises = batches.map((batch, batchIndex) =>
      semaphore.acquire().then(async (release) => {
        try {
          await this.processBatch(batch, batchIndex, onProgress)
        } finally {
          release()
        }
      })
    )

    await Promise.all(batchPromises)

    // Calculate final statistics
    this.progress.estimatedCompletion = new Date()
    
    return this.progress
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = []
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize))
    }
    return batches
  }

  private async processBatch(
    batch: CertificateGenerationRequest[],
    batchIndex: number,
    onProgress?: (progress: BulkGenerationProgress) => void
  ): Promise<void> {
    const batchPromises = batch.map(async (request, index) => {
      const globalIndex = batchIndex * this.config.batchSize + index
      
      try {
        await this.generateSingleCertificate(request)
        this.progress.completed++
      } catch (error) {
        this.progress.failed++
        this.progress.errors.push({
          index: globalIndex,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }

      // Update progress
      if (onProgress) {
        onProgress({ ...this.progress })
      }
    })

    await Promise.all(batchPromises)
  }

  private async generateSingleCertificate(
    request: CertificateGenerationRequest
  ): Promise<void> {
    // Simulate certificate generation with retry logic
    let attempts = 0
    
    while (attempts < this.config.retryAttempts) {
      try {
        // Simulate API call to generate certificate
        await this.simulateCertificateGeneration(request)
        return
      } catch (error) {
        attempts++
        
        if (attempts >= this.config.retryAttempts) {
          throw error
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay))
      }
    }
  }

  private async simulateCertificateGeneration(
    request: CertificateGenerationRequest
  ): Promise<void> {
    // Simulate processing time (50-200ms per certificate)
    const processingTime = Math.random() * 150 + 50
    await new Promise(resolve => setTimeout(resolve, processingTime))
    
    // Simulate occasional failures (5% failure rate)
    if (Math.random() < 0.05) {
      throw new Error('Certificate generation failed')
    }
  }
}

// Semaphore for controlling concurrency
class Semaphore {
  private permits: number
  private waiting: Array<() => void> = []

  constructor(permits: number) {
    this.permits = permits
  }

  async acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      if (this.permits > 0) {
        this.permits--
        resolve(() => this.release())
      } else {
        this.waiting.push(() => {
          this.permits--
          resolve(() => this.release())
        })
      }
    })
  }

  private release(): void {
    this.permits++
    if (this.waiting.length > 0) {
      const next = this.waiting.shift()!
      next()
    }
  }
}

// Caching system for improved performance
export class CacheManager {
  private cache = new Map<string, { data: any; expiry: number }>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL)
    this.cache.set(key, { data, expiry })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return item.data as T
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

// Database connection pooling simulation
export class DatabasePool {
  private connections: Connection[] = []
  private maxConnections = 20
  private minConnections = 5
  private acquiredConnections = new Set<Connection>()

  constructor() {
    // Initialize minimum connections
    for (let i = 0; i < this.minConnections; i++) {
      this.connections.push(new Connection())
    }
  }

  async acquire(): Promise<Connection> {
    // Try to get an available connection
    let connection = this.connections.find(conn => !this.acquiredConnections.has(conn))
    
    if (!connection && this.connections.length < this.maxConnections) {
      // Create new connection if under limit
      connection = new Connection()
      this.connections.push(connection)
    }
    
    if (!connection) {
      // Wait for a connection to become available
      await new Promise(resolve => setTimeout(resolve, 100))
      return this.acquire()
    }
    
    this.acquiredConnections.add(connection)
    return connection
  }

  release(connection: Connection): void {
    this.acquiredConnections.delete(connection)
  }

  async close(): Promise<void> {
    // Close all connections
    await Promise.all(this.connections.map(conn => conn.close()))
    this.connections = []
    this.acquiredConnections.clear()
  }
}

class Connection {
  private id = Math.random().toString(36).substring(7)
  
  async query(sql: string, params?: any[]): Promise<any> {
    // Simulate database query
    await new Promise(resolve => setTimeout(resolve, Math.random() * 50))
    return { id: this.id, sql, params }
  }
  
  async close(): Promise<void> {
    // Simulate connection cleanup
    await new Promise(resolve => setTimeout(resolve, 10))
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private metrics = new Map<string, number[]>()
  
  startTimer(operation: string): () => void {
    const start = performance.now()
    
    return () => {
      const duration = performance.now() - start
      this.recordMetric(operation, duration)
    }
  }
  
  recordMetric(operation: string, value: number): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, [])
    }
    
    const values = this.metrics.get(operation)!
    values.push(value)
    
    // Keep only last 1000 measurements
    if (values.length > 1000) {
      values.shift()
    }
  }
  
  getStats(operation: string): {
    count: number
    avg: number
    min: number
    max: number
    p95: number
  } | null {
    const values = this.metrics.get(operation)
    
    if (!values || values.length === 0) {
      return null
    }
    
    const sorted = [...values].sort((a, b) => a - b)
    const count = values.length
    const sum = values.reduce((a, b) => a + b, 0)
    
    return {
      count,
      avg: sum / count,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[Math.floor(count * 0.95)]
    }
  }
  
  getAllStats(): Record<string, any> {
    const stats: Record<string, any> = {}
    
    for (const operation of this.metrics.keys()) {
      stats[operation] = this.getStats(operation)
    }
    
    return stats
  }
}

// Multi-tenant data isolation
export class TenantManager {
  private tenantCache = new Map<string, TenantConfig>()
  
  async getTenantConfig(organizationId: string): Promise<TenantConfig> {
    // Check cache first
    let config = this.tenantCache.get(organizationId)
    
    if (!config) {
      // Load from database
      config = await this.loadTenantConfig(organizationId)
      this.tenantCache.set(organizationId, config)
    }
    
    return config
  }
  
  private async loadTenantConfig(organizationId: string): Promise<TenantConfig> {
    // Simulate database lookup
    await new Promise(resolve => setTimeout(resolve, 50))
    
    return {
      organizationId,
      databaseSchema: `org_${organizationId}`,
      storagePrefix: `org-${organizationId}/`,
      features: {
        bulkGeneration: true,
        customTemplates: true,
        apiAccess: true,
        analytics: true
      },
      limits: {
        certificatesPerMonth: 1000,
        storageQuotaGB: 10,
        apiCallsPerHour: 1000
      }
    }
  }
  
  clearCache(organizationId?: string): void {
    if (organizationId) {
      this.tenantCache.delete(organizationId)
    } else {
      this.tenantCache.clear()
    }
  }
}

export interface TenantConfig {
  organizationId: string
  databaseSchema: string
  storagePrefix: string
  features: {
    bulkGeneration: boolean
    customTemplates: boolean
    apiAccess: boolean
    analytics: boolean
  }
  limits: {
    certificatesPerMonth: number
    storageQuotaGB: number
    apiCallsPerHour: number
  }
}

// Global instances
export const cacheManager = new CacheManager()
export const performanceMonitor = new PerformanceMonitor()
export const tenantManager = new TenantManager()
export const dbPool = new DatabasePool()

// Cleanup interval for cache
setInterval(() => {
  cacheManager.cleanup()
}, 60000) // Clean every minute