import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white'
  showText?: boolean
  href?: string
  className?: string
}

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  showText = true, 
  href = '/',
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  // Use the new logo.jpg image
  const logoSrc = '/logo.jpg'

  const LogoContent = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src={logoSrc} 
        alt="WDU Logo" 
        className={`${sizeClasses[size]} rounded-xl object-cover`} 
      />
      {showText && (
        <h1 className={`${textSizeClasses[size]} font-bold text-secondary-900`}>
          WDU-Certify
        </h1>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}

// Convenience components for common use cases
export const LogoSmall = (props: Omit<LogoProps, 'size'>) => <Logo size="sm" {...props} />
export const LogoMedium = (props: Omit<LogoProps, 'size'>) => <Logo size="md" {...props} />
export const LogoLarge = (props: Omit<LogoProps, 'size'>) => <Logo size="lg" {...props} />

// Logo without text (icon only)
export const LogoIcon = (props: Omit<LogoProps, 'showText'>) => <Logo showText={false} {...props} />