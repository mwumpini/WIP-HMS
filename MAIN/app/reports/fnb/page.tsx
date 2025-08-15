"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  ChefHat,
  Wine,
  Package,
  AlertTriangle,
  Download,
  BarChart3,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

// Sample analytics data
const dailyRevenue = [
  { date: "Jan 8", restaurant: 1200, bar: 800, total: 2000 },
  { date: "Jan 9", restaurant: 1350, bar: 750, total: 2100 },
  { date: "Jan 10", restaurant: 1100, bar: 900, total: 2000 },
  { date: "Jan 11", restaurant: 1450, bar: 850, total: 2300 },
  { date: "Jan 12", restaurant: 1600, bar: 950, total: 2550 },
  { date: "Jan 13", restaurant: 1380, bar: 820, total: 2200 },
  { date: "Jan 14", restaurant: 1520, bar: 880, total: 2400 },
]

const menuPerformance = [
  { name: "Jollof Rice with Chicken", sales: 45, revenue: 2025, margin: 58.9, category: "Main" },
  { name: "Kelewele", sales: 38, revenue: 760, margin: 67.5, category: "Appetizer" },
  { name: "Banku with Tilapia", sales: 28, revenue: 1540, margin: 60.0, category: "Main" },
  { name: "Club Beer", sales: 65, revenue: 975, margin: 66.7, category: "Beverage" },
  { name: "Grilled Salmon", sales: 12, revenue: 1020, margin: 47.1, category: "Main" },
]

const categoryBreakdown = [
  { name: "Main Courses", value: 4585, color: "#8B5CF6" },
  { name: "Beverages", value: 2340, color: "#06B6D4" },
  { name: "Appetizers", value: 1260, color: "#F59E0B" },
  { name: "Desserts", value: 680, color: "#EF4444" },
]

const hourlyTrends = [
  { hour: "6AM", orders: 2, revenue: 45 },
  { hour: "7AM", orders: 8, revenue: 180 },
  { hour: "8AM", orders: 15, revenue: 340 },
  { hour: "9AM", orders: 12, revenue: 280 },
  { hour: "10AM", orders: 18, revenue: 420 },
  { hour: "11AM", orders: 25, revenue: 580 },
  { hour: "12PM", orders: 42, revenue: 980 },
  { hour: "1PM", orders: 38, revenue: 890 },
  { hour: "2PM", orders: 35, revenue: 820 },
  { hour: "3PM", orders: 22, revenue: 510 },
  { hour: "4PM", orders: 18, revenue: 420 },
  { hour: "5PM", orders: 28, revenue: 650 },
  { hour: "6PM", orders: 45, revenue: 1050 },
  { hour: "7PM", orders: 52, revenue: 1220 },
  { hour: "8PM", orders: 48, revenue: 1120 },
  { hour: "9PM", orders: 35, revenue: 820 },
  { hour: "10PM", orders: 25, revenue: 580 },
  { hour: "11PM", orders: 15, revenue: 350 },
]

const staffPerformance = [
  { name: "Mike Johnson", role: "Bartender", sales: 2450, orders: 85, avgTime: "3.2 min", efficiency: 94 },
  { name: "Sarah Wilson", role: "Bartender", sales: 2180, orders: 72, avgTime: "2.8 min", efficiency: 97 },
  { name: "James Asante", role: "Waiter", sales: 3200, orders: 95, avgTime: "12 min", efficiency: 89 },
  { name: "Grace Mensah", role: "Waiter", sales: 2890, orders: 88, avgTime: "11 min", efficiency: 92 },
]

const costAnalysis = [
  { category: "Food Cost", current: 24.5, target: 28.0, status: "good" },
  { category: "Beverage Cost", current: 22.8, target: 25.0, status: "good" },
  { category: "Labor Cost", current: 32.1, target: 30.0, status: "warning" },
  { category: "Overhead", current: 15.2, target: 15.0, status: "warning" },
]

export default function FnBReporting() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.total, 0)
  const avgDailyRevenue = totalRevenue / dailyRevenue.length
  const revenueGrowth =
    ((dailyRevenue[dailyRevenue.length - 1].total - dailyRevenue[0].total) / dailyRevenue[0].total) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b border-indigo-200">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/reports/fnb">F&B Analytics</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-4 px-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 border-indigo-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">GH₵{totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">+{revenueGrowth.toFixed(1)}% vs last period</p>
                  </div>
                </div>
                <DollarSign className="h-10 w-10 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {hourlyTrends.reduce((sum, hour) => sum + hour.orders, 0)}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">+12% vs last period</p>
                  </div>
                </div>
                <BarChart3 className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-3xl font-bold text-gray-900">
                    GH₵
                    {(
                      hourlyTrends.reduce((sum, hour) => sum + hour.revenue, 0) /
                      hourlyTrends.reduce((sum, hour) => sum + hour.orders, 0)
                    ).toFixed(0)}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    <p className="text-xs text-red-600">-2.1% vs last period</p>
                  </div>
                </div>
                <Users className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Food Cost %</p>
                  <p className="text-3xl font-bold text-gray-900">24.5%</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">-1.2% vs target</p>
                  </div>
                </div>
                <Package className="h-10 w-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="menu">Menu Performance</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="staff">Staff Performance</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle>Daily Revenue Trend</CardTitle>
                  <CardDescription>Restaurant vs Bar revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="restaurant" fill="#8B5CF6" name="Restaurant" />
                      <Bar dataKey="bar" fill="#06B6D4" name="Bar" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Breakdown of sales by menu category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `GH₵${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle>Hourly Sales Pattern</CardTitle>
                <CardDescription>Orders and revenue throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="orders" fill="#F59E0B" name="Orders" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#8B5CF6" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Menu Item Performance
                </CardTitle>
                <CardDescription>Sales volume, revenue, and profitability by menu item</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuPerformance.map((item, index) => (
                    <div key={index} className="p-4 border border-indigo-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <Badge variant="outline" className="border-indigo-200">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-indigo-600">GH₵{item.revenue}</p>
                          <p className="text-sm text-gray-600">{item.sales} sold</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Sales Volume</p>
                          <p className="font-semibold">{item.sales} units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-semibold">GH₵{item.revenue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Margin</p>
                          <p
                            className={`font-semibold ${
                              item.margin >= 60
                                ? "text-green-600"
                                : item.margin >= 45
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {item.margin}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Service Times
                  </CardTitle>
                  <CardDescription>Average preparation and service times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded">
                      <div className="flex items-center space-x-2">
                        <ChefHat className="h-5 w-5 text-indigo-600" />
                        <span>Kitchen Prep Time</span>
                      </div>
                      <span className="font-bold text-indigo-600">16.2 min</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Wine className="h-5 w-5 text-purple-600" />
                        <span>Bar Service Time</span>
                      </div>
                      <span className="font-bold text-purple-600">3.1 min</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <span>Table Turnover</span>
                      </div>
                      <span className="font-bold text-green-600">1.8x/day</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span>Peak Hour Efficiency</span>
                      </div>
                      <span className="font-bold text-yellow-600">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Operational Alerts
                  </CardTitle>
                  <CardDescription>Issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-800">Critical Stock Alert</span>
                      </div>
                      <p className="text-sm text-red-700">Chicken breast inventory critically low (2.5kg remaining)</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Service Time Warning</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Kitchen prep time exceeded target by 3.2 minutes during lunch
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Performance Note</span>
                      </div>
                      <p className="text-sm text-blue-700">Bar revenue up 18% - consider expanding cocktail menu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Staff Performance Metrics
                </CardTitle>
                <CardDescription>Individual staff sales and efficiency tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffPerformance.map((staff, index) => (
                    <div key={index} className="p-4 border border-indigo-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{staff.name}</h4>
                          <Badge variant="outline" className="border-indigo-200">
                            {staff.role}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-indigo-600">GH₵{staff.sales}</p>
                          <p className="text-sm text-gray-600">{staff.orders} orders</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Avg Service Time</p>
                          <p className="font-semibold">{staff.avgTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Efficiency</p>
                          <p className="font-semibold text-green-600">{staff.efficiency}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Orders/Hour</p>
                          <p className="font-semibold">{(staff.orders / 8).toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Cost Analysis & Control
                </CardTitle>
                <CardDescription>Track costs against targets and industry benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costAnalysis.map((cost, index) => (
                    <div key={index} className="p-4 border border-indigo-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{cost.category}</h4>
                        <Badge
                          className={
                            cost.status === "good"
                              ? "bg-green-100 text-green-800"
                              : cost.status === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {cost.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Current</p>
                          <p className="font-semibold">{cost.current}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Target</p>
                          <p className="font-semibold">{cost.target}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Variance</p>
                          <p
                            className={`font-semibold ${
                              cost.current <= cost.target ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {cost.current <= cost.target ? "-" : "+"}
                            {Math.abs(cost.current - cost.target).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
