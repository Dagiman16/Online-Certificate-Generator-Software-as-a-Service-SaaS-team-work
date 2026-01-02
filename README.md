# WDU-Certify - Certificate Management System

A comprehensive web-based Software as a Service (SaaS) platform for generating, managing, and verifying digital certificates. Built with Next.js and designed to support multiple organizations with role-based access control.

## 🚀 Features

### Core Functionality
- **Multi-tenant Architecture**: Support multiple organizations simultaneously
- **Role-based Access Control**: Super Admin, Organization Admin, Staff, and Trainee roles
- **Certificate Generation**: Single and bulk certificate generation (1000+ certificates)
- **QR Code Verification**: Public certificate verification system
- **Template Management**: Free (watermarked) and premium templates
- **Training Management**: Organize courses and manage trainees
- **Payment & Subscriptions**: Multiple pricing plans and pay-per-certificate options

### Key Components
- **Organization Management**: Registration, approval, and subscription management
- **Trainee Management**: Manual registration and bulk import (Excel/CSV)
- **Certificate Templates**: Customizable professional templates
- **Public Verification**: QR code and ID-based certificate verification
- **Payment Integration**: Subscription and pay-per-certificate models
- **System Administration**: Super admin dashboard with analytics and system health

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Authentication**: JWT with localStorage
- **State Management**: React hooks and context

## 📁 Project Structure

```
wdu-certify/
├── app/                           # Next.js App Router
│   ├── auth/
│   │   ├── login/page.tsx         # Login page
│   │   └── register-organization/ # Organization registration
│   ├── super-admin/               # Super Admin dashboard
│   │   ├── dashboard/page.tsx     # System overview & analytics
│   │   ├── organizations/         # Organization management
│   │   ├── templates/             # Global template management
│   │   └── pricing/               # Pricing plan management
│   ├── org-admin/                 # Organization Admin dashboard
│   ├── staff/                     # Staff dashboard
│   ├── verify/page.tsx            # Public certificate verification
│   └── layout.tsx                 # Root layout
├── components/                    # Reusable React components
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication utilities
│   └── performance.ts            # Performance monitoring
└── middleware.ts                 # Next.js middleware
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wdu-certify.git
   cd wdu-certify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_APP_NAME=WDU-Certify
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NEXT_PUBLIC_DEMO_MODE=true
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Login: http://localhost:3000/auth/login

## 🔧 Development

### Demo Credentials
The application includes demo login credentials:

- **Super Admin**: admin@wdu-certify.com / SuperAdmin123!
- **Org Admin**: admin@techcorp.edu / password123
- **Staff**: staff@techcorp.edu / password123

### Environment Variables
- **Frontend**: `.env.local` - Application configuration
- Copy `.env.example` to `.env.local` and update values

## 📊 User Roles & Features

### Super Administrator
- Complete system control
- Manage all organizations
- System analytics and health monitoring
- Pricing plan management
- Global template management

### Organization Administrator
- Manage organization settings
- Certificate generation and management
- Trainee management
- Staff management
- Billing and subscription management

### Staff Member
- Generate certificates for trainees
- Manage assigned trainees
- Access training programs

### Trainee
- View assigned certificates
- Access training materials
- Track progress

## 🎨 UI Components

The application includes a comprehensive set of reusable components:

- **DashboardLayout**: Role-based navigation and layout
- **RoleBasedAccess**: Component-level access control
- **BulkCertificateGenerator**: Handle large certificate batches
- **QRCodeGenerator**: Generate verification QR codes
- **DemoBanner**: Demo mode indicators

## 📚 Documentation

- **System Architecture**: `SYSTEM_ARCHITECTURE.md`
- **Payment Integration**: `PAYMENT_SUBSCRIPTION_IMPLEMENTATION.md`
- **QR Verification**: `QR_VERIFICATION_IMPLEMENTATION.md`
- **Project Presentation**: `PROJECT_PRESENTATION_DOCUMENTATION.md`

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```env
NEXT_PUBLIC_APP_NAME=WDU-Certify
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_DEMO_MODE=false
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Demo Features

The application includes demo mode with:
- Watermarked certificates
- Limited functionality
- Sample data
- Role-based demonstrations

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Note**: This is a frontend-only application with mock data for demonstration purposes. All authentication and data management is handled locally using localStorage and mock data.