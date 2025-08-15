"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RoleGuard } from "@/components/role-guard"
import { ContextualNavigation } from "@/components/contextual-navigation"
import {
  Calculator,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  CreditCard,
  PieChart,
  BarChart3,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Utensils,
  Bed,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye,
} from "lucide-react"
import Link from "next/link"

interface FinancialMetrics {
  // Balance Sheet
  totalAssets: number
  currentAssets: number
  fixedAssets: number
  totalLiabilities: number
  currentLiabilities: number
  longTermLiabilities: number
  totalEquity: number

  // Income Statement
  totalRevenue: number
  roomRevenue: number
  fbRevenue: number
  otherRevenue: number
  totalExpenses: number
  operatingExpenses: number
  payrollExpenses: number
  netIncome: number
  grossProfit: number

  // Cash Flow
  cashBalance: number
  accountsReceivable: number
  accountsPayable: number
  workingCapital: number

  // Hospitality KPIs
  averageDailyRate: number
  occupancyRate: number
  revPAR: number
  foodCostPercentage: number
  laborCostPercentage: number

  // Financial Ratios
  currentRatio: number
  quickRatio: number
  debtToEquityRatio: number
  profitMargin: number
  returnOnAssets: number
}

interface Transaction {
  id: string
  type: "revenue" | "expense" | "asset" | "liability"
  category: string
  description: string
  amount: number
  date: string
  account: string
  status: "completed" | "pending" | "overdue"
  department?: string
}

export default function AccountingPage() {
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    totalAssets: 0,
    currentAssets: 0,
    fixedAssets: 0,
    totalLiabilities: 0,
    currentLiabilities: 0,
    longTermLiabilities: 0,
    totalEquity: 0,
    totalRevenue: 0,
    roomRevenue: 0,
    fbRevenue: 0,
    otherRevenue: 0,
    totalExpenses: 0,
    operatingExpenses: 0,
    payrollExpenses: 0,
    netIncome: 0,
    grossProfit: 0,
    cashBalance: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    workingCapital: 0,
    averageDailyRate: 0,
    occupancyRate: 0,
    revPAR: 0,
    foodCostPercentage: 0,
    laborCostPercentage: 0,
    currentRatio: 0,
    quickRatio: 0,
    debtToEquityRatio: 0,
    profitMargin: 0,
    returnOnAssets: 0,
  })

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    calculateFinancialMetrics()
    loadRecentTransactions()
    setLoading(false)
  }, [])

  const calculateFinancialMetrics = () => {
    try {
      const sales = JSON.parse(localStorage.getItem("sales") || "[]")
      const expenses = JSON.parse(localStorage.getItem("ghanaTaxExpenses") || "[]")
      const payrollStaff = JSON.parse(localStorage.getItem("payrollStaff") || "[]")
      const inventory = JSON.parse(localStorage.getItem("inventory") || "[]")
      const fixedAssets = JSON.parse(localStorage.getItem("fixedAssets") || "[]")
      const accountsPayable = JSON.parse(localStorage.getItem("accountsPayable") || "[]")
      const accountsReceivable = JSON.parse(localStorage.getItem("accountsReceivable") || "[]")
      const frontDeskData = JSON.parse(localStorage.getItem("frontDeskData") || "{}")

      // Revenue calculations with department breakdown
      const totalRevenue = sales.reduce((sum: number, sale: any) => sum + (Number(sale.totalAmount) || 0), 0)
      const roomRevenue = sales
        .filter((sale: any) => sale.department === "rooms" || sale.category === "accommodation")
        .reduce((sum: number, sale: any) => sum + (Number(sale.totalAmount) || 0), 0)
      const fbRevenue = sales
        .filter((sale: any) => sale.department === "fb" || sale.category === "food_beverage")
        .reduce((sum: number, sale: any) => sum + (Number(sale.totalAmount) || 0), 0)
      const otherRevenue = totalRevenue - roomRevenue - fbRevenue

      // Expense calculations
      const operatingExpenses = expenses.reduce((sum: number, expense: any) => sum + (Number(expense.amount) || 0), 0)
      const payrollExpenses = payrollStaff.reduce((sum: number, staff: any) => {
        const salary = Number(staff.basicSalary) || 0
        const allowances = Number(staff.totalAllowances) || 0
        return sum + salary + allowances
      }, 0)
      const totalExpenses = operatingExpenses + payrollExpenses
      const grossProfit = totalRevenue - totalExpenses
      const netIncome = grossProfit

      // Asset calculations
      const inventoryValue = inventory.reduce((sum: number, item: any) => {
        const quantity = Number(item.quantity) || 0
        const unitCost = Number(item.unitCost) || 0
        return sum + quantity * unitCost
      }, 0)
      const fixedAssetsValue = fixedAssets.reduce(
        (sum: number, asset: any) => sum + (Number(asset.currentValue) || 0),
        0,
      )
      const arTotal = accountsReceivable.reduce((sum: number, ar: any) => sum + (Number(ar.remainingAmount) || 0), 0)
      const cashBalance = Math.max(
        0,
        totalRevenue -
          operatingExpenses -
          accountsPayable.reduce((sum: number, ap: any) => sum + (Number(ap.remainingAmount) || 0), 0),
      )

      const currentAssets = cashBalance + arTotal + inventoryValue
      const totalAssets = currentAssets + fixedAssetsValue

      // Liability calculations
      const apTotal = accountsPayable.reduce((sum: number, ap: any) => sum + (Number(ap.remainingAmount) || 0), 0)
      const currentLiabilities = apTotal
      const totalLiabilities = currentLiabilities
      const totalEquity = totalAssets - totalLiabilities
      const workingCapital = currentAssets - currentLiabilities

      // Hospitality KPIs
      const roomsSold = frontDeskData.occupiedRooms || 0
      const totalRooms = frontDeskData.totalRooms || 50
      const occupancyRate = totalRooms > 0 ? (roomsSold / totalRooms) * 100 : 0
      const averageDailyRate = roomsSold > 0 ? roomRevenue / roomsSold : 0
      const revPAR = (averageDailyRate * occupancyRate) / 100

      const foodCosts = expenses
        .filter((expense: any) => expense.category === "food" || expense.category === "beverage")
        .reduce((sum: number, expense: any) => sum + (Number(expense.amount) || 0), 0)
      const foodCostPercentage = fbRevenue > 0 ? (foodCosts / fbRevenue) * 100 : 0
      const laborCostPercentage = totalRevenue > 0 ? (payrollExpenses / totalRevenue) * 100 : 0

      // Financial ratios
      const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0
      const quickRatio = currentLiabilities > 0 ? (currentAssets - inventoryValue) / currentLiabilities : 0
      const debtToEquityRatio = totalEquity > 0 ? totalLiabilities / totalEquity : 0
      const profitMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0
      const returnOnAssets = totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0

      setMetrics({
        totalAssets,
        currentAssets,
        fixedAssets: fixedAssetsValue,
        totalLiabilities,
        currentLiabilities,
        longTermLiabilities: 0,
        totalEquity,
        totalRevenue,
        roomRevenue,
        fbRevenue,
        otherRevenue,
        totalExpenses,
        operatingExpenses,
        payrollExpenses,
        netIncome,
        grossProfit,
        cashBalance,
        accountsReceivable: arTotal,
        accountsPayable: apTotal,
        workingCapital,
        averageDailyRate,
        occupancyRate,
        revPAR,
        foodCostPercentage,
        laborCostPercentage,
        currentRatio,
        quickRatio,
        debtToEquityRatio,
        profitMargin,
        returnOnAssets,
      })
    } catch (error) {
      console.error("Error calculating financial metrics:", error)
    }
  }

  const loadRecentTransactions = () => {
    try {
      const transactions: Transaction[] = []
      const sales = JSON.parse(localStorage.getItem("sales") || "[]")
      const expenses = JSON.parse(localStorage.getItem("ghanaTaxExpenses") || "[]")

      sales.slice(-10).forEach((sale: any, index: number) => {
        transactions.push({
          id: `sale-${sale.id || index}`,
          type: "revenue",
          category: sale.department || "general",
          description: `Sale to ${sale.customerName || `Customer ${index + 1}`}`,
          amount: Number(sale.totalAmount) || 0,
          date: sale.date || new Date().toISOString(),
          account: "Sales Revenue",
          status: "completed",
          department: sale.department,
        })
      })

      expenses.slice(-10).forEach((expense: any, index: number) => {
        transactions.push({
          id: `expense-${expense.id || index}`,
          type: "expense",
          category: expense.category || "operating",
          description: expense.paymentDetails || expense.description || `Expense ${index + 1}`,
          amount: Number(expense.amount) || 0,
          date: expense.date || new Date().toISOString(),
          account: "Operating Expenses",
          status: "completed",
          department: expense.department,
        })
      })

      transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setRecentTransactions(transactions.slice(0, 15))
    } catch (error) {
      console.error("Error loading transactions:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "revenue":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "expense":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "asset":
        return <Building className="h-4 w-4 text-blue-600" />
      case "liability":
        return <CreditCard className="h-4 w-4 text-orange-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <RoleGuard requiredRole={["administrator", "management", "accountant"]} requiredPermission="manage_accounting">
      <div className="space-y-8">
        <ContextualNavigation />

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Financial Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Complete accounting & financial management for hospitality operations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/accounting/journal">
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/accounting/reports">
                <FileText className="mr-2 h-4 w-4" />
                Financial Reports
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard/reports">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{formatCurrency(metrics.totalRevenue)}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  Profit: {formatPercentage(metrics.profitMargin)}
                </Badge>
                {metrics.profitMargin > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
              </div>
              <Progress value={Math.min(100, (metrics.totalRevenue / 100000) * 100)} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Assets</CardTitle>
              <div className="p-2 bg-blue-100 rounded-full">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{formatCurrency(metrics.totalAssets)}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  ROA: {formatPercentage(metrics.returnOnAssets)}
                </Badge>
                <Button variant="ghost" size="sm" asChild className="h-6 px-2">
                  <Link href="/dashboard/accounting/reports">
                    <Eye className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <Progress
                value={Math.min(100, (metrics.currentAssets / metrics.totalAssets) * 100)}
                className="mt-2 h-1"
              />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net Income</CardTitle>
              <div className="p-2 bg-purple-100 rounded-full">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{formatCurrency(metrics.netIncome)}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  Margin: {formatPercentage(metrics.profitMargin)}
                </Badge>
                <Button variant="ghost" size="sm" asChild className="h-6 px-2">
                  <Link href="/dashboard/accounting/reports">
                    <FileText className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <Progress
                value={Math.min(100, Math.max(0, (metrics.netIncome / metrics.totalRevenue) * 100))}
                className="mt-2 h-1"
              />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Working Capital</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full">
                <DollarSign className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{formatCurrency(metrics.workingCapital)}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  Ratio: {metrics.currentRatio.toFixed(2)}
                </Badge>
                <div className="text-xs text-gray-500">liquidity</div>
              </div>
              <Progress value={Math.min(100, Math.max(0, metrics.currentRatio * 50))} className="mt-2 h-1" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bed className="h-5 w-5 text-blue-600" />
                <span>Room Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Occupancy Rate</span>
                <span className="text-lg font-bold text-blue-600">{formatPercentage(metrics.occupancyRate)}</span>
              </div>
              <Progress value={metrics.occupancyRate} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">ADR</div>
                  <div className="font-semibold">{formatCurrency(metrics.averageDailyRate)}</div>
                </div>
                <div>
                  <div className="text-gray-500">RevPAR</div>
                  <div className="font-semibold">{formatCurrency(metrics.revPAR)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-green-600" />
                <span>F&B Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Food Cost %</span>
                <span className="text-lg font-bold text-green-600">{formatPercentage(metrics.foodCostPercentage)}</span>
              </div>
              <Progress value={Math.min(100, metrics.foodCostPercentage)} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">F&B Revenue</div>
                  <div className="font-semibold">{formatCurrency(metrics.fbRevenue)}</div>
                </div>
                <div>
                  <div className="text-gray-500">Labor Cost %</div>
                  <div className="font-semibold">{formatPercentage(metrics.laborCostPercentage)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Financial Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Ratio</span>
                  <Badge variant={metrics.currentRatio >= 1.5 ? "default" : "destructive"}>
                    {metrics.currentRatio.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Debt-to-Equity</span>
                  <Badge variant={metrics.debtToEquityRatio <= 1 ? "default" : "destructive"}>
                    {metrics.debtToEquityRatio.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quick Ratio</span>
                  <Badge variant={metrics.quickRatio >= 1 ? "default" : "destructive"}>
                    {metrics.quickRatio.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue by department and category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Bed className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Room Revenue</span>
                      </div>
                      <span className="text-sm font-bold">{formatCurrency(metrics.roomRevenue)}</span>
                    </div>
                    <Progress value={(metrics.roomRevenue / metrics.totalRevenue) * 100} className="h-2" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">F&B Revenue</span>
                      </div>
                      <span className="text-sm font-bold">{formatCurrency(metrics.fbRevenue)}</span>
                    </div>
                    <Progress value={(metrics.fbRevenue / metrics.totalRevenue) * 100} className="h-2" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Other Revenue</span>
                      </div>
                      <span className="text-sm font-bold">{formatCurrency(metrics.otherRevenue)}</span>
                    </div>
                    <Progress value={(metrics.otherRevenue / metrics.totalRevenue) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Balance Sheet Summary</CardTitle>
                  <CardDescription>Assets, liabilities, and equity overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-600">Assets</div>
                      <div className="text-2xl font-bold text-blue-600">{formatCurrency(metrics.totalAssets)}</div>
                      <div className="text-xs text-gray-500">Current: {formatCurrency(metrics.currentAssets)}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-600">Liabilities</div>
                      <div className="text-2xl font-bold text-red-600">{formatCurrency(metrics.totalLiabilities)}</div>
                      <div className="text-xs text-gray-500">Current: {formatCurrency(metrics.currentLiabilities)}</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Owner's Equity</span>
                      <span className="text-lg font-bold text-emerald-600">{formatCurrency(metrics.totalEquity)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activities across all departments</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <Calculator className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                    <p className="text-gray-500">Financial activities will appear here as they occur</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">{getTransactionIcon(transaction.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 truncate">{transaction.description}</p>
                              {transaction.department && (
                                <Badge variant="outline" className="text-xs">
                                  {transaction.department}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{transaction.account}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(transaction.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-bold ${
                              transaction.type === "revenue" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.type === "expense" ? "-" : "+"}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Chart of Accounts</CardTitle>
                  <CardDescription>Manage account structure</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard/accounting/chart-of-accounts">View Accounts</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <CreditCard className="mx-auto h-12 w-12 text-red-600 mb-2" />
                  <CardTitle className="text-lg">Accounts Payable</CardTitle>
                  <CardDescription>Manage vendor bills</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">{formatCurrency(metrics.accountsPayable)}</div>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard/accounting/payables">Manage</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Accounts Receivable</CardTitle>
                  <CardDescription>Track customer invoices</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatCurrency(metrics.accountsReceivable)}
                  </div>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard/accounting/receivables">Manage</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <Building className="mx-auto h-12 w-12 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Fixed Assets</CardTitle>
                  <CardDescription>Property & equipment</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{formatCurrency(metrics.fixedAssets)}</div>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/dashboard/accounting/assets">Manage</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Financial Statements</CardTitle>
                  <CardDescription>Professional accounting reports and statements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/accounting/reports">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Balance Sheet
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/accounting/reports">
                      <PieChart className="mr-2 h-4 w-4" />
                      Income Statement (P&L)
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/accounting/reports">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Cash Flow Statement
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/accounting/reports">
                      <Download className="mr-2 h-4 w-4" />
                      Generate All Reports
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Hospitality Analytics</CardTitle>
                  <CardDescription>Industry-specific performance and operational reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/reports">
                      <Bed className="mr-2 h-4 w-4" />
                      Room Revenue Analysis
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/reports">
                      <Utensils className="mr-2 h-4 w-4" />
                      F&B Cost Analysis
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/reports">
                      <Users className="mr-2 h-4 w-4" />
                      Labor Cost Reports
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/reports">
                      <Target className="mr-2 h-4 w-4" />
                      Performance Dashboard
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Key financial metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{formatCurrency(metrics.totalRevenue)}</div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatPercentage(metrics.profitMargin)} profit margin
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(metrics.totalAssets)}</div>
                    <p className="text-sm text-muted-foreground">Total Assets</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatPercentage(metrics.returnOnAssets)} ROA</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(metrics.totalEquity)}</div>
                    <p className="text-sm text-muted-foreground">Owner's Equity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.debtToEquityRatio.toFixed(2)} debt-to-equity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Indicators</CardTitle>
                  <CardDescription>Key metrics and benchmarks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Profit Margin</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{formatPercentage(metrics.profitMargin)}</span>
                        {metrics.profitMargin >= 15 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : metrics.profitMargin >= 10 ? (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Ratio</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{metrics.currentRatio.toFixed(2)}</span>
                        {metrics.currentRatio >= 1.5 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : metrics.currentRatio >= 1 ? (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Food Cost %</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{formatPercentage(metrics.foodCostPercentage)}</span>
                        {metrics.foodCostPercentage <= 30 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : metrics.foodCostPercentage <= 35 ? (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Labor Cost %</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{formatPercentage(metrics.laborCostPercentage)}</span>
                        {metrics.laborCostPercentage <= 30 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : metrics.laborCostPercentage <= 35 ? (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>AI-powered insights and suggestions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {metrics.currentRatio < 1.5 && (
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Improve Liquidity</p>
                          <p className="text-xs text-yellow-700">
                            Consider reducing current liabilities or increasing cash reserves
                          </p>
                        </div>
                      </div>
                    )}

                    {metrics.foodCostPercentage > 35 && (
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">High Food Costs</p>
                          <p className="text-xs text-red-700">
                            Review menu pricing and portion control to reduce food cost percentage
                          </p>
                        </div>
                      </div>
                    )}

                    {metrics.profitMargin > 15 && (
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Excellent Profitability</p>
                          <p className="text-xs text-green-700">
                            Consider reinvesting profits into growth opportunities
                          </p>
                        </div>
                      </div>
                    )}

                    {metrics.occupancyRate < 70 && (
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Boost Occupancy</p>
                          <p className="text-xs text-blue-700">
                            Implement marketing strategies to increase room bookings
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
