import Link from 'next/link'
import Logo from '../components/Logo'
import { 
  ShieldCheckIcon, 
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  BoltIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { 
  CheckCircleIcon as CheckCircleIconSolid,
  StarIcon as StarIconSolid 
} from '@heroicons/react/24/solid'

export default function HomePage() {
  const features = [
    {
      icon: BoltIcon,
      title: 'Lightning Fast Generation',
      description: 'Generate thousands of certificates in seconds with our advanced bulk processing engine.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Blockchain Verified',
      description: 'Every certificate is secured with blockchain technology for ultimate authenticity.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Recognition',
      description: 'Certificates are recognized worldwide with international compliance standards.'
    },
    {
      icon: UserGroupIcon,
      title: 'Team Collaboration',
      description: 'Work together with your team to design and manage certificates seamlessly.'
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Track engagement, verification rates, and certificate performance in real-time.'
    },
    {
      icon: CogIcon,
      title: 'System Integration',
      description: 'Integrate with your existing systems using our flexible architecture.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Training Director',
      company: 'TechCorp',
      image: '/avatars/sarah.jpg',
      content: 'WDU-Certify transformed our certification process. We went from manual PDF generation to automated, branded certificates in minutes.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Education Manager',
      company: 'LearnHub',
      image: '/avatars/michael.jpg',
      content: 'The QR verification feature is game-changing. Our students love being able to instantly verify their achievements.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'HR Director',
      company: 'GlobalTech',
      image: '/avatars/emily.jpg',
      content: 'Best investment we made this year. The platform pays for itself with the time saved on certificate management.',
      rating: 5
    }
  ]

  const stats = [
    { number: '2M+', label: 'Certificates Issued' },
    { number: '10K+', label: 'Organizations' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' }
  ]

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-secondary-100">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Logo size="md" href="/" />
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="btn-ghost">Features</Link>
              <Link href="#pricing" className="btn-ghost">Pricing</Link>
              <Link href="#testimonials" className="btn-ghost">Reviews</Link>
              <Link href="/verify" className="btn-ghost">Verify</Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link href="/auth/login" className="btn-ghost">
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <SparklesIcon className="h-4 w-4" />
              <span>Trusted by educational institutions worldwide</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
              Create Professional
              <span className="text-gradient block">Digital Certificates</span>
              in Minutes
            </h1>
            
            <p className="text-xl text-secondary-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The most advanced certificate generation platform. Design, issue, and verify 
              certificates with blockchain security and global recognition.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                Start Free Trial
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <button className="flex items-center space-x-2 text-secondary-700 hover:text-secondary-900 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full shadow-medium flex items-center justify-center">
                  <PlayIcon className="h-5 w-5 text-primary-600 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-secondary-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-secondary-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Everything you need to manage certificates
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              From design to verification, we've got every aspect of digital credentialing covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover group">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{feature.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Loved by thousands of organizations
            </h2>
            <p className="text-xl text-secondary-600">
              See what our customers have to say about CertifyPro
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-warning-400" />
                  ))}
                </div>
                <p className="text-secondary-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                    <div className="text-sm text-secondary-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-secondary-600">
              Choose the plan that's right for your organization
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Starter</h3>
                <p className="text-secondary-600 mb-4">Perfect for small teams</p>
                <div className="text-4xl font-bold text-secondary-900 mb-1">Free</div>
                <p className="text-secondary-600">Up to 50 certificates</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Basic templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">QR verification</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Email delivery</span>
                </li>
              </ul>
              <Link href="/auth/register" className="btn-secondary w-full text-center">
                Get Started
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="card border-2 border-primary-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Professional</h3>
                <p className="text-secondary-600 mb-4">For growing organizations</p>
                <div className="text-4xl font-bold text-secondary-900 mb-1">$49</div>
                <p className="text-secondary-600">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Unlimited certificates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Premium templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Custom branding</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Bulk import</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Analytics dashboard</span>
                </li>
              </ul>
              <Link href="/auth/register" className="btn-primary w-full text-center">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Enterprise</h3>
                <p className="text-secondary-600 mb-4">For large organizations</p>
                <div className="text-4xl font-bold text-secondary-900 mb-1">Custom</div>
                <p className="text-secondary-600">Contact for pricing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">SSO integration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIconSolid className="h-5 w-5 text-success-500 mr-3" />
                  <span className="text-secondary-700">Dedicated support</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary w-full text-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your certification process?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already using WDU-Certify to create, manage, and verify certificates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-xl shadow-large hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
              Start Free Trial
            </Link>
            <Link href="/verify" className="text-white hover:text-primary-100 font-medium py-4 px-8 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200">
              Verify Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="sm" showText={true} href="/" className="mb-4" />
              <p className="text-secondary-400 leading-relaxed">
                The most advanced platform for creating, managing, and verifying digital certificates.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/verify" className="hover:text-white transition-colors">Verify Certificate</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2024 WDU-Certify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-secondary-400 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link href="/terms" className="text-secondary-400 hover:text-white text-sm transition-colors">Terms</Link>
              <Link href="/cookies" className="text-secondary-400 hover:text-white text-sm transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}