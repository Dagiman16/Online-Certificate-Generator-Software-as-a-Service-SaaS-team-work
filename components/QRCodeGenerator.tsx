'use client'

import { useEffect, useRef } from 'react'
import { QrCodeIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'

interface QRCodeGeneratorProps {
  value: string
  size?: number
  className?: string
  showValue?: boolean
  copyable?: boolean
}

export default function QRCodeGenerator({ 
  value, 
  size = 200, 
  className = '', 
  showValue = true,
  copyable = true 
}: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    generateQRCode()
  }, [value, size])

  const generateQRCode = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = size
    canvas.height = size

    // Simple QR code simulation (in real app, use a QR code library like qrcode.js)
    // This creates a visual representation that looks like a QR code
    const moduleSize = size / 25 // 25x25 grid
    
    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)
    
    // Generate pattern
    ctx.fillStyle = '#000000'
    
    // Create a simple pattern that resembles a QR code
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        // Create a pseudo-random pattern based on the value
        const hash = hashCode(value + i + j)
        if (hash % 3 === 0) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
        }
      }
    }
    
    // Add corner squares (finder patterns)
    drawFinderPattern(ctx, 0, 0, moduleSize)
    drawFinderPattern(ctx, 18 * moduleSize, 0, moduleSize)
    drawFinderPattern(ctx, 0, 18 * moduleSize, moduleSize)
  }

  const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number) => {
    // Outer square
    ctx.fillStyle = '#000000'
    ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize)
    
    // Inner white square
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize)
    
    // Center black square
    ctx.fillStyle = '#000000'
    ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize)
  }

  const hashCode = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      alert('QR code value copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    if (!canvasRef.current) return
    
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className={`inline-block ${className}`}>
      <div className="bg-white p-4 rounded-lg border border-secondary-200 shadow-sm">
        <canvas
          ref={canvasRef}
          className="block mx-auto"
          style={{ width: size, height: size }}
        />
        
        {showValue && (
          <div className="mt-3 text-center">
            <p className="text-xs text-secondary-600 font-mono break-all px-2">
              {value}
            </p>
          </div>
        )}
        
        {copyable && (
          <div className="flex justify-center space-x-2 mt-3">
            <button
              onClick={handleCopy}
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Copy QR Code Value"
            >
              <ClipboardDocumentIcon className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Download QR Code"
            >
              <QrCodeIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}