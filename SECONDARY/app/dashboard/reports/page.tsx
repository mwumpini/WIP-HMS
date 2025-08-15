"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RoleGuard } from "@/components/role-guard"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Receipt,
  Calendar,
  Building,
  Shield,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface Sale {
  id: string
  customerName: string
  serviceType: string
  subtotal: number
  totalAmount: number
  vatAmount: number
  nhilAmount: number
  getfundAmount: number
  covidAmount: number
  tourismAmount: number
  date: string
}

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface Staff {
  id: string
  surname: string
  firstName: string
  otherNames: string
  position: string
  jobTitle: string
  basicSalary: number
  department: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function ReportsPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [period, setPeriod] = useState("thisMonth")
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadData()
  }, [])

  const loadData = () => {
    // Load sales from sales localStorage
    const savedSales = localStorage.getItem("sales")
    if (savedSales) {
      try {
        setSales(JSON.parse(savedSales))
      } catch (error) {
        console.error("Error loading sales:", error)
      }
    }

    // Load expenses from ghanaTaxExpenses localStorage
    const savedExpenses = localStorage.getItem("ghanaTaxExpenses")
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses))
      } catch (error) {
        console.error("Error loading expenses:", error)
      }
    }

    // Load staff from payrollStaff localStorage
    const savedStaff = localStorage.getItem("payrollStaff")
    if (savedStaff) {
      try {
        setStaff(JSON.parse(savedStaff))
      } catch (error) {
        console.error("Error loading staff:", error)
      }
    }
  }

  const filterDataByPeriod = (data: any[], dateField = "date") => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    return data.filter((item) => {
      const itemDate = new Date(item[dateField])
      switch (period) {
        case "thisMonth":
          return itemDate >= startOfMonth
        case "lastMonth":
          return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth
        case "thisYear":
          return itemDate >= startOfYear
        case "allTime":
        default:
          return true
      }
    })
  }

  const filteredSales = filterDataByPeriod(sales)
  const filteredExpenses = filterDataByPeriod(expenses)

  const canViewFinancials = user?.role === "management" || user?.role === "supervisor" || user?.role === "accountant"
  const canViewStaffData = user?.role === "management" || user?.role === "supervisor" || user?.department === "HR"
  const canViewDetailedReports = user?.role === "management" || user?.role === "supervisor"

  // Calculate metrics
  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + (Number.parseFloat(sale.totalAmount?.toString()) || 0),
    0,
  )
  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + (Number.parseFloat(expense.amount?.toString()) || 0),
    0,
  )
  const netProfit = totalRevenue - totalExpenses
  const totalTaxes = filteredSales.reduce((sum, sale) => {
    const vat = Number.parseFloat(sale.vatAmount?.toString()) || 0
    const nhil = Number.parseFloat(sale.nhilAmount?.toString()) || 0
    const getfund = Number.parseFloat(sale.getfundAmount?.toString()) || 0
    const covid = Number.parseFloat(sale.covidAmount?.toString()) || 0
    const tourism = Number.parseFloat(sale.tourismAmount?.toString()) || 0
    return sum + vat + nhil + getfund + covid + tourism
  }, 0)
  const totalStaff = staff.length
  const totalSalaries = staff.reduce((sum, member) => sum + (Number.parseFloat(member.basicSalary?.toString()) || 0), 0)

  // Sales by service type
  const salesByService = filteredSales.reduce(
    (acc, sale) => {
      const serviceType = sale.serviceType || "General Service"
      acc[serviceType] = (acc[serviceType] || 0) + (Number.parseFloat(sale.totalAmount?.toString()) || 0)
      return acc
    },
    {} as Record<string, number>,
  )

  const serviceChartData = Object.entries(salesByService).map(([service, amount]) => ({
    name: service,
    value: amount,
  }))

  // Monthly sales trend
  const monthlySales = filteredSales.reduce(
    (acc, sale) => {
      const month = new Date(sale.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      acc[month] = (acc[month] || 0) + (Number.parseFloat(sale.totalAmount?.toString()) || 0)
      return acc
    },
    {} as Record<string, number>,
  )

  const monthlyChartData = Object.entries(monthlySales).map(([month, amount]) => ({
    month,
    amount,
  }))

  // Expense categories
  const expensesByCategory = filteredExpenses.reduce(
    (acc, expense) => {
      const category = expense.category || "General"
      acc[category] = (acc[category] || 0) + (Number.parseFloat(expense.amount?.toString()) || 0)
      return acc
    },
    {} as Record<string, number>,
  )

  const expenseCategoryData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const exportReport = (type: string) => {
    if (!canViewDetailedReports && type !== "summary") {
      alert("You don't have permission to export detailed reports")
      return
    }

    let csvContent = ""
    let filename = ""

    switch (type) {
      case "summary":
        csvContent = [
          "Metric,Value",
          `Total Revenue,${totalRevenue.toFixed(2)}`,
          `Total Expenses,${totalExpenses.toFixed(2)}`,
          `Net Profit,${netProfit.toFixed(2)}`,
          ...(canViewFinancials ? [`Total Taxes,${totalTaxes.toFixed(2)}`] : []),
          ...(canViewStaffData ? [`Total Staff,${totalStaff}`, `Total Salaries,${totalSalaries.toFixed(2)}`] : []),
        ].join("\n")
        filename = "summary-report"
        break
      case "sales":
        csvContent = [
          "Date,Customer,Service Type,Amount,VAT,NHIL,GETFund,COVID,Tourism,Total",
          ...filteredSales.map((sale) =>
            [
              sale.date,
              `"${sale.customerName || "Customer"}"`,
              sale.serviceType || "General",
              (Number.parseFloat(sale.subtotal?.toString()) || 0).toFixed(2),
              (Number.parseFloat(sale.vatAmount?.toString()) || 0).toFixed(2),
              (Number.parseFloat(sale.nhilAmount?.toString()) || 0).toFixed(2),
              (Number.parseFloat(sale.getfundAmount?.toString()) || 0).toFixed(2),
              (Number.parseFloat(sale.covidAmount?.toString()) || 0).toFixed(2),
              (Number.parseFloat(sale.tourismAmount?.toString()) || 0).toFixed(2),
              (Number.parseFloat(sale.totalAmount?.toString()) || 0).toFixed(2),
            ].join(","),
          ),
        ].join("\n")
        filename = "sales-report"
        break
      case "expenses":
        csvContent = [
          "Date,Description,Category,Amount",
          ...filteredExpenses.map((expense) =>
            [
              expense.date,
              `"${expense.description || "Expense"}"`,
              expense.category || "General",
              (Number.parseFloat(expense.amount?.toString()) || 0).toFixed(2),
            ].join(","),
          ),
        ].join("\n")
        filename = "expenses-report"
        break
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive business insights and analytics</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              {user?.role || "viewer"} access
            </Badge>
            {user?.department && (
              <Badge variant="secondary" className="text-xs">
                <Building className="h-3 w-3 mr-1" />
                {user.department}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="expenses">Expenses Analysis</TabsTrigger>
          <RoleGuard allowedRoles={["management", "supervisor"]} fallback={null}>
            <TabsTrigger value="staff">Staff Analysis</TabsTrigger>
          </RoleGuard>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS {totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">{filteredSales.length} transactions</p>
              </CardContent>
            </Card>

            <RoleGuard
              allowedRoles={["management", "supervisor", "accountant"]}
              fallback={
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Access Restricted</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">***</div>
                    <p className="text-xs text-muted-foreground">Financial data</p>
                  </CardContent>
                </Card>
              }
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">GHS {totalExpenses.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">{filteredExpenses.length} expenses</p>
                </CardContent>
              </Card>
            </RoleGuard>

            <RoleGuard
              allowedRoles={["management", "supervisor", "accountant"]}
              fallback={
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Access Restricted</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">***</div>
                    <p className="text-xs text-muted-foreground">Profit data</p>
                  </CardContent>
                </Card>
              }
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                  {netProfit >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    GHS {netProfit.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0"}% margin
                  </p>
                </CardContent>
              </Card>
            </RoleGuard>

            <RoleGuard
              allowedRoles={["management", "supervisor"]}
              fallback={
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Access Restricted</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">***</div>
                    <p className="text-xs text-muted-foreground">Staff data</p>
                  </CardContent>
                </Card>
              }
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStaff}</div>
                  <p className="text-xs text-muted-foreground">GHS {totalSalaries.toFixed(2)} salaries</p>
                </CardContent>
              </Card>
            </RoleGuard>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyChartData.length > 0 ? monthlyChartData : [{ month: "No Data", amount: 0 }]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--color-amount)"
                        fill="var(--color-amount)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
                <CardDescription>Distribution of revenue by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceChartData.length > 0 ? serviceChartData : [{ name: "No Data", value: 1 }]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={
                          serviceChartData.length > 0
                            ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`
                            : () => "No Data"
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {(serviceChartData.length > 0 ? serviceChartData : [{ name: "No Data", value: 1 }]).map(
                          (entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ),
                        )}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => exportReport("summary")}>
              <Download className="h-4 w-4 mr-2" />
              Export Summary
            </Button>
            <RoleGuard allowedRoles={["management", "supervisor", "accountant"]}>
              <Button variant="outline" onClick={() => exportReport("sales")}>
                <Download className="h-4 w-4 mr-2" />
                Export Sales
              </Button>
              <Button variant="outline" onClick={() => exportReport("expenses")}>
                <Download className="h-4 w-4 mr-2" />
                Export Expenses
              </Button>
            </RoleGuard>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Service Type</CardTitle>
                <CardDescription>Revenue breakdown by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceChartData.length > 0 ? serviceChartData : []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Services</CardTitle>
                <CardDescription>Highest revenue generating services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceChartData.length > 0 ? (
                    serviceChartData
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((service, index) => (
                        <div key={service.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <span className="font-medium">{service.name}</span>
                          </div>
                          <span className="text-sm font-medium">GHS {service.value.toFixed(2)}</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No sales data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <RoleGuard
            allowedRoles={["management", "supervisor", "accountant"]}
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Access Restricted</CardTitle>
                  <CardDescription>You don't have permission to view expense analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Contact your administrator for access to expense reports</p>
                  </div>
                </CardContent>
              </Card>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                  <CardDescription>Expense breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Amount",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseCategoryData.length > 0 ? expenseCategoryData : [{ name: "No Data", value: 1 }]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={
                            expenseCategoryData.length > 0
                              ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`
                              : () => "No Data"
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {(expenseCategoryData.length > 0 ? expenseCategoryData : [{ name: "No Data", value: 1 }]).map(
                            (entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ),
                          )}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Expense Categories</CardTitle>
                  <CardDescription>Highest spending categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategoryData.length > 0 ? (
                      expenseCategoryData
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 5)
                        .map((category, index) => (
                          <div key={category.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">#{index + 1}</Badge>
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <span className="text-sm font-medium">GHS {category.value.toFixed(2)}</span>
                          </div>
                        ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No expense data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </RoleGuard>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <RoleGuard
            allowedRoles={["management", "supervisor"]}
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Access Restricted</CardTitle>
                  <CardDescription>You don't have permission to view staff analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Contact your administrator for access to staff reports</p>
                  </div>
                </CardContent>
              </Card>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStaff}</div>
                  <p className="text-xs text-muted-foreground">Active employees</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Salaries</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">GHS {totalSalaries.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Monthly payroll</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    GHS {totalStaff > 0 ? (totalSalaries / totalStaff).toFixed(2) : "0.00"}
                  </div>
                  <p className="text-xs text-muted-foreground">Per employee</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Staff by Department</CardTitle>
                <CardDescription>Employee distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff.length > 0 ? (
                    Object.entries(
                      staff.reduce(
                        (acc, member) => {
                          const dept = member.department || "Unassigned"
                          acc[dept] = (acc[dept] || 0) + 1
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    ).map(([department, count]) => (
                      <div key={department} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{department}</span>
                        </div>
                        <Badge variant="secondary">{count} employees</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No staff data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </RoleGuard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
