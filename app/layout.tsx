import './globals.css'
import { Inter } from 'next/font/google'
import DemoBanner from '../components/DemoBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WDU-Certify - Digital Certificate Management',
  description: 'Woldia University Digital Certificate Management System - Create, manage, and verify digital certificates with ease',
  keywords: 'digital certificates, certificate management, WDU, Woldia University, online certificates, certificate verification',
  authors: [{ name: 'Woldia University' }],
  creator: 'Woldia University',
  publisher: 'Woldia University',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'WDU-Certify - Digital Certificate Management',
    description: 'Create, manage, and verify digital certificates with Woldia University Certificate Management System',
    url: 'https://wdu-certify.com',
    siteName: 'WDU-Certify',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'WDU-Certify Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WDU-Certify - Digital Certificate Management',
    description: 'Create, manage, and verify digital certificates with ease',
    images: ['/logo.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        <DemoBanner />
        {children}
      </body>
    </html>
  )
}