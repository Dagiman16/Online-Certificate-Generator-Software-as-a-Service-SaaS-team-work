# WDU-Certify Setup Guide

## Frontend Application Setup

This is a complete frontend application with mock data for demonstration purposes.

## Quick Start

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
   - Application: http://localhost:3000
   - Login: http://localhost:3000/auth/login

## Demo Credentials

The application includes built-in demo credentials:

### Super Administrator
- **Email**: admin@wdu-certify.com
- **Password**: SuperAdmin123!
- **Access**: Complete system control and analytics

### Organization Administrator
- **Email**: admin@techcorp.edu
- **Password**: password123
- **Access**: Organization management and certificate generation

### Staff Member
- **Email**: staff@techcorp.edu
- **Password**: password123
- **Access**: Certificate generation and trainee management

## Features Available

### ✅ Working Features
- User authentication with role-based access
- Dashboard interfaces for all user roles
- Certificate generation (single and bulk)
- QR code verification system
- Organization management
- Trainee management
- Template management
- Payment and subscription interfaces
- System administration tools

### 📊 Mock Data
- All data is stored locally using localStorage
- Sample organizations, users, and certificates
- Realistic dashboard statistics
- System health monitoring data

## Development

### File Structure
```
wdu-certify/
├── app/                    # Next.js pages and layouts
├── components/             # Reusable UI components
├── lib/                   # Utility functions and auth
├── public/                # Static assets
└── middleware.ts          # Route protection
```

### Key Components
- **Authentication**: Mock login with localStorage
- **Role Management**: Component-level access control
- **Data Storage**: localStorage for persistence
- **UI Components**: Tailwind CSS with custom components

## Customization

### Adding New Features
1. Create new components in `/components`
2. Add new pages in `/app`
3. Update navigation in `DashboardLayout`
4. Add mock data as needed

### Styling
- Uses Tailwind CSS for styling
- Custom color scheme defined in `tailwind.config.js`
- Responsive design for all screen sizes

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_APP_NAME=WDU-Certify
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_DEMO_MODE=false
```

### Deployment Platforms
- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Static site hosting
- **AWS S3**: Static website hosting
- **Any static hosting provider**

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version (requires 18+)

2. **Login Issues**
   - Use the provided demo credentials
   - Check browser console for errors
   - Clear localStorage if needed

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes

### Getting Help
- Check the GitHub issues page
- Review the documentation files
- Open a new issue with detailed information

## Next Steps

This frontend application is ready for:
- Integration with real authentication systems
- Connection to actual databases
- Implementation of real payment processing
- Addition of file upload capabilities
- Integration with email services

The mock data structure provides a clear template for real data integration when needed.