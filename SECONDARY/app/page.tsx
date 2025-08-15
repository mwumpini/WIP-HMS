"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Calculator, FileText, Shield, Users, Zap, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeSystem = async () => {
      try {
        const { initializeUserAccess, ensureAdminAccess, getCurrentUser } = await import("@/lib/auth")

        // Initialize the user access system
        initializeUserAccess()
        ensureAdminAccess("mwumpini@gmail.com")

        // Check if user is authenticated
        const userData = localStorage.getItem("user")
        if (userData) {
          try {
            const user = JSON.parse(userData)
            if (user && user.email) {
              setIsAuthenticated(true)
              // Redirect authenticated users to dashboard
              router.push("/dashboard")
              return
            }
          } catch (error) {
            // Invalid user data, clear it
            localStorage.removeItem("user")
          }
        }
      } catch (error) {
        console.error("Error initializing system:", error)
      }

      setIsLoading(false)
    }

    initializeSystem()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-orange-600">Kali Syn</span>
              <p className="text-xs text-gray-600">Syncing Ghana's Hospitality</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6 bg-orange-100 text-orange-700 border-orange-200">
          <Zap className="h-3 w-3 mr-1" />
          Trusted by Ghana's hospitality industry
        </Badge>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent leading-tight">
          Complete Hospitality
          <br />
          Management Platform
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Streamline your hotel operations, accounting, payroll, inventory, and guest services with our comprehensive
          platform designed specifically for Ghana's hospitality sector.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-lg px-8 py-6"
          >
            <Link href="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-2 bg-transparent">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
            No setup fees
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
            30-day free trial
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
            Cancel anytime
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for hospitality management</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From front desk operations to financial management, we've got all your hospitality needs covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Front Desk Operations</CardTitle>
              <CardDescription>
                Manage guest check-ins, reservations, room assignments, and guest services with integrated billing.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-emerald-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>
                Track stock across departments, manage suppliers, automate reordering, and control costs effectively.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Financial Accounting</CardTitle>
              <CardDescription>
                Complete accounting system with chart of accounts, payables, receivables, and financial reporting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>
                Comprehensive HR system with payroll, SSNIT compliance, staff scheduling, and performance tracking.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-indigo-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Tax Compliance</CardTitle>
              <CardDescription>
                GRA VAT returns, withholding tax, tourism levy calculations, and automated tax compliance for Ghana.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-pink-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>
                Comprehensive reporting, occupancy analytics, revenue management, and business intelligence dashboards.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your hospitality business?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join Ghana's leading hotels and hospitality businesses already using Kali Syn to streamline their
            operations.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="text-lg px-8 py-6 bg-white text-orange-600 hover:bg-gray-50"
          >
            <Link href="/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Kali Syn</span>
                <p className="text-xs text-gray-400">Syncing Ghana's Hospitality</p>
              </div>
            </div>
            <p className="text-gray-400">© 2024 Kali Syn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
