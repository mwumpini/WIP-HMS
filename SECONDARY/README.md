# Kali Syn: Syncing Ghana's Hospitality

A comprehensive business management platform specifically designed for Ghana's hospitality industry, featuring tax calculations, payroll management, expense tracking, and government compliance tools.

## 🚀 Technology Stack

### Primary Languages
- **TypeScript** (.ts, .tsx files) - Main language for all components and logic
- **JavaScript** (JSX/TSX) - React components and frontend functionality
- **CSS** - Styling through Tailwind CSS classes

### Frontend Framework & Libraries
- **React 18** - UI framework with hooks and components
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and enhanced development experience

### Styling & UI Components
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built, accessible React components
- **Lucide React** - Modern icon library
- **Recharts** - Chart and data visualization library

### Key Technologies
- **React Hooks** - useState, useEffect, useCallback for state management
- **Next.js App Router** - File-based routing system
- **Client-side Storage** - localStorage for data persistence
- **Form Handling** - React form state management with validation
- **Date Handling** - date-fns library for date formatting and manipulation

## 📁 Project Structure

\`\`\`
kali-syn/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Main dashboard application
│   │   ├── expenses/           # Expense management
│   │   ├── gra/               # Ghana Revenue Authority features
│   │   ├── gta/               # Ghana Tourism Authority features
│   │   ├── payroll/           # Payroll and staff management
│   │   ├── reports/           # Business reports and analytics
│   │   ├── sales/             # Sales tracking
│   │   ├── settings/          # Application settings
│   │   ├── subscription/      # Subscription management
│   │   ├── users/             # User management
│   │   └── withholding/       # Withholding tax management
│   ├── login/                 # Authentication pages
│   ├── signup/                # User registration
│   ├── audit/                 # Audit trail
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                 # Reusable React components
│   ├── ui/                    # shadcn/ui components
│   ├── dashboard-header.tsx   # Dashboard navigation header
│   ├── app-sidebar.tsx        # Main navigation sidebar
│   ├── role-guard.tsx         # Role-based access control
│   └── toaster.tsx            # Toast notification system
├── hooks/                     # Custom React hooks
│   └── use-toast.ts          # Toast notification hook
├── lib/                       # Utility functions and helpers
│   ├── auth.ts               # Authentication utilities
│   ├── csv.ts                # CSV export functionality
│   └── utils.ts              # General utility functions
├── public/                    # Static assets
│   └── *.png                 # Images and icons
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.mjs          # Next.js configuration
\`\`\`

## ✨ Key Features

### 🏢 Business Management
- **Dashboard Overview** - Real-time business metrics and KPIs
- **Expense Tracking** - Comprehensive expense management with categories
- **Sales Management** - Sales tracking and revenue analysis
- **Report Generation** - Detailed business reports with charts and analytics

### 👥 Staff & Payroll Management
- **Staff Management** - Complete employee database with detailed profiles
- **Payroll Processing** - Automated payroll calculations
- **SSNIT Integration** - Social Security contributions management
- **Income Tax Calculations** - Automated tax computations
- **Tier 2 & 3 Pensions** - Pension scheme management

### 🏛️ Government Compliance
- **GRA Integration** - Ghana Revenue Authority tax management
  - VAT calculations and submissions
  - Various levy computations (NHIL, GETFund, COVID-19)
- **GTA Tourism Levy** - Tourism industry specific calculations
- **Withholding Tax** - Automated withholding tax management

### 🔐 User Management & Security
- **Role-Based Access Control** - Admin and user role management
- **User Authentication** - Secure login and registration
- **Profile Management** - User profile and settings
- **Audit Trail** - Complete activity logging

### 📊 Advanced Features
- **Data Export** - CSV export functionality for all data
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Real-time Updates** - Dynamic data updates and notifications
- **Form Validation** - Comprehensive client-side validation
- **Toast Notifications** - User feedback system

## 🛠️ Technical Implementation

### Component Architecture
- **Modular Design** - Reusable React components with TypeScript interfaces
- **Custom Hooks** - Shared logic through custom React hooks
- **Server Components** - Next.js server-side rendering where appropriate
- **Client Components** - Interactive components with "use client" directive

### State Management
- **React Hooks** - useState, useEffect, useCallback for local state
- **localStorage** - Client-side data persistence
- **Form State** - Controlled components with validation

### Styling Approach
- **Utility-First** - Tailwind CSS for rapid development
- **Component Library** - shadcn/ui for consistent design system
- **Responsive Design** - Mobile-first responsive layouts
- **Brand Colors** - Orange/red gradient theme reflecting Ghanaian hospitality

### Data Handling
- **Type Safety** - Full TypeScript implementation
- **Form Validation** - Client-side validation with error handling
- **CSV Export** - Data export functionality
- **Date Management** - Consistent date formatting and manipulation

## 🇬🇭 Ghana-Specific Features

### Tax Compliance
- **VAT Management** - 12.5% VAT calculations and reporting
- **NHIL (National Health Insurance Levy)** - 2.5% levy calculations
- **GETFund Levy** - 2.5% education levy calculations
- **COVID-19 Health Recovery Levy** - 1% levy calculations
- **Tourism Development Levy** - 1% tourism industry levy

### Payroll Compliance
- **SSNIT Contributions** - 5.5% employee, 13% employer contributions
- **Income Tax (PAYE)** - Progressive tax rate calculations
- **Tier 2 Pensions** - 5% mandatory occupational pension
- **Tier 3 Pensions** - Voluntary provident fund contributions

### Industry-Specific
- **Hospitality Focus** - Tailored for hotels, restaurants, and tourism businesses
- **Multi-currency Support** - GHS primary with USD/EUR support
- **Local Compliance** - Adherence to Ghana's tax and labor laws

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd kali-syn
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

## 🏗️ Development Guidelines

### Code Style
- **TypeScript First** - All new code should use TypeScript
- **Functional Components** - Use React functional components with hooks
- **Consistent Naming** - Use kebab-case for files, PascalCase for components
- **Type Safety** - Define interfaces for all props and data structures

### Component Structure
\`\`\`typescript
interface ComponentProps {
  // Define all props with types
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX with proper TypeScript typing
  )
}
\`\`\`

### File Organization
- Place components in `/components` directory
- Use `/app` directory for pages (Next.js App Router)
- Store utilities in `/lib` directory
- Keep custom hooks in `/hooks` directory

## 🎨 Brand Identity

### Colors
- **Primary**: Orange (#ea580c) - Representing warmth and hospitality
- **Secondary**: Red (#dc2626) - Energy and passion
- **Accent**: Gradient from orange to red
- **Text**: Professional grays and whites

### Typography
- **Font**: Inter - Clean, modern, and highly readable
- **Hierarchy**: Clear heading structure with consistent spacing

### Visual Elements
- **Icons**: Lucide React for consistency
- **Gradients**: Orange to red for brand elements
- **Shadows**: Subtle shadows for depth and professionalism

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions, please contact the Kali Syn development team or create an issue in the repository.

---

**Built with ❤️ for Ghana's hospitality industry**

*Kali Syn - Syncing Ghana's Hospitality*
