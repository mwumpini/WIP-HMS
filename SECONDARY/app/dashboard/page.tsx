"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  Building2,
  Users,
  Calculator,
  FileText,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { dataManager, type User, type Sale, type Expense } from "@/lib/data-manager"
import { ContextualNavigation } from "@/components/contextual-navigation"
import { AIEntryAgent } from "@/components/ai-entry-agent"
import { TaxAlertSystem } from "@/components/tax-alert-system"

interface DashboardStats {
  totalGrossSales: number
  totalGrossExpenses: number
  vatPayable: number
  graLevies: number
  tourismLevy: number
  totalSSNITTier2: number
}

interface RecentActivity {
  id: string
  type: "sale" | "expense" | "vat" | "payroll"
  description: string
  amount: number
  date: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGrossSales: 0,
    totalGrossExpenses: 0,
    vatPayable: 0,
    graLevies: 0,
    tourismLevy: 0,
    totalSSNITTier2: 0,
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Only clear data if explicitly requested by user, not on every load

    // Load user data using data manager
    const userData = dataManager.getUser()
    setUser(userData)

    // Calculate dashboard statistics
    calculateStats()
    loadRecentActivities()

    // Perform data migration if needed
    dataManager.migrateData()
  }, [])

  const calculateStats = () => {
    try {
      // Calculate total gross sales from sales data
      const salesData = dataManager.getSales()
      const totalGrossSales = salesData.reduce((sum: number, sale: Sale) => {
        return sum + (sale.totalAmount || 0)
      }, 0)

      // Calculate total gross expenses
      const expensesData = dataManager.getExpenses()
      const totalGrossExpenses = expensesData.reduce((sum: number, expense: Expense) => {
        return sum + (expense.amount || 0)
      }, 0)

      // Calculate VAT payable from sales
      const vatPayable = salesData.reduce((sum: number, sale: Sale) => {
        return sum + (sale.vatAmount || 0)
      }, 0)

      // Calculate GRA levies from sales
      const graLevies = salesData.reduce((sum: number, sale: Sale) => {
        const nhil = sale.nhilAmount || 0
        const getfund = sale.getfundAmount || 0
        const covid = sale.covidAmount || 0
        return sum + nhil + getfund + covid
      }, 0)

      // Calculate tourism levy from sales
      const tourismLevy = salesData.reduce((sum: number, sale: Sale) => {
        return sum + (sale.tourismAmount || 0)
      }, 0)

      // Calculate total SSNIT & Tier 2 contributions from staff
      const staffData = dataManager.getStaff()
      const totalSSNITTier2 = staffData.reduce((sum: number, staff: any) => {
        const basicSalary = staff.basicSalary || 0
        const ssnitContribution = staff.ssnit === "YES" ? basicSalary * 0.055 : 0
        const tier2Contribution = staff.tier2 === "YES" ? basicSalary * 0.05 : 0
        return sum + ssnitContribution + tier2Contribution
      }, 0)

      setStats({
        totalGrossSales,
        totalGrossExpenses,
        vatPayable,
        graLevies,
        tourismLevy,
        totalSSNITTier2,
      })
    } catch (error) {
      console.error("Error calculating stats:", error)
    }
  }

  const loadRecentActivities = () => {
    try {
      const activities: RecentActivity[] = []

      // Add recent sales
      const salesData = dataManager.getSales()
      salesData.slice(-3).forEach((sale: Sale, index: number) => {
        activities.push({
          id: `sale-${sale.id}`,
          type: "sale",
          description: `Sale to ${sale.customerName || "Customer"}`,
          amount: sale.totalAmount || 0,
          date: sale.date || new Date().toISOString().split("T")[0],
        })
      })

      // Add recent expenses
      const expensesData = dataManager.getExpenses()
      expensesData.slice(-3).forEach((expense: Expense, index: number) => {
        activities.push({
          id: `expense-${expense.id}`,
          type: "expense",
          description: `Expense: ${expense.paymentDetails || "General Expense"}`,
          amount: expense.amount || 0,
          date: expense.date || new Date().toISOString().split("T")[0],
        })
      })

      // Sort by date (most recent first)
      activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      setRecentActivities(activities.slice(0, 5))
    } catch (error) {
      console.error("Error loading recent activities:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "expense":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "vat":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "payroll":
        return <Users className="h-4 w-4 text-purple-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-green-600"
      case "expense":
        return "text-red-600"
      case "vat":
        return "text-blue-600"
      case "payroll":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <ContextualNavigation />

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-gray-600">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-emerald-600 border-emerald-600">
            {user?.role || "Free Plan"}
          </Badge>
          <Button asChild>
            <Link href="/dashboard/subscription">Upgrade Plan</Link>
          </Button>
        </div>
      </div>

      {/* Tax Alert System */}
      <TaxAlertSystem />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gross Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.totalGrossSales)}</div>
            <p className="text-xs text-muted-foreground">Revenue from all sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gross Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.totalGrossExpenses)}</div>
            <p className="text-xs text-muted-foreground">Total business expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VAT Payable</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.vatPayable)}</div>
            <p className="text-xs text-muted-foreground">VAT from sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GRA Levies</CardTitle>
            <Building2 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(stats.graLevies)}</div>
            <p className="text-xs text-muted-foreground">NHIL + GETFund + COVID levies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tourism Levy</CardTitle>
            <Receipt className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.tourismLevy)}</div>
            <p className="text-xs text-muted-foreground">Tourism development levy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SSNIT & Tier 2</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{formatCurrency(stats.totalSSNITTier2)}</div>
            <p className="text-xs text-muted-foreground">Employee contributions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features for your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button asChild className="justify-start bg-transparent" variant="outline">
                <Link href="/dashboard/sales/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Record New Sale
                </Link>
              </Button>
              <Button asChild className="justify-start bg-transparent" variant="outline">
                <Link href="/dashboard/expenses/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Expense
                </Link>
              </Button>
              <Button asChild className="justify-start bg-transparent" variant="outline">
                <Link href="/dashboard/payroll/staff-management">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Staff
                </Link>
              </Button>
              <Button asChild className="justify-start bg-transparent" variant="outline">
                <Link href="/dashboard/payroll/income-tax">
                  <Calculator className="mr-2 h-4 w-4" />
                  Income Tax Calculator
                </Link>
              </Button>
              <Button asChild className="justify-start bg-transparent" variant="outline">
                <Link href="/dashboard/gra/vat">
                  <FileText className="mr-2 h-4 w-4" />
                  VAT Returns
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest business transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p>No recent activity</p>
                <p className="text-sm mt-2">Start by recording a sale or expense</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                      {activity.type === "expense" ? "-" : "+"}
                      {formatCurrency(activity.amount)}
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard/sales">
                      <Eye className="mr-2 h-4 w-4" />
                      View All Activity
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Business Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Business Overview</CardTitle>
          <CardDescription>Key metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">
                {formatCurrency(stats.totalGrossSales - stats.totalGrossExpenses)}
              </div>
              <p className="text-sm text-emerald-700 font-medium">Net Profit</p>
              <p className="text-xs text-emerald-600">Sales minus expenses</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalGrossSales > 0
                  ? (((stats.totalGrossSales - stats.totalGrossExpenses) / stats.totalGrossSales) * 100).toFixed(1)
                  : "0.0"}
                %
              </div>
              <p className="text-sm text-blue-700 font-medium">Profit Margin</p>
              <p className="text-xs text-blue-600">Net profit percentage</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(stats.vatPayable + stats.graLevies + stats.tourismLevy)}
              </div>
              <p className="text-sm text-purple-700 font-medium">Total Tax Liability</p>
              <p className="text-xs text-purple-600">VAT + GRA + Tourism levies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Entry Agent as floating widget */}
      <AIEntryAgent />
    </div>
  )
}
