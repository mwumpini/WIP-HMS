"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarIcon,
  FileText,
  BarChart3,
  PieChart,
  CreditCard,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { format } from "date-fns"
import { useState } from "react"

const financialData = {
  revenue: {
    total: 245680,
    rooms: 156420,
    fnb: 45230,
    events: 28560,
    other: 15470,
    growth: 12.5,
  },
  expenses: {
    total: 178450,
    payroll: 89225,
    utilities: 23456,
    maintenance: 18790,
    marketing: 15680,
    other: 31299,
  },
  profitLoss: {
    grossProfit: 67230,
    netProfit: 52180,
    margin: 21.2,
  },
  cashFlow: {
    operating: 58420,
    investing: -12500,
    financing: -8900,
    net: 37020,
  },
  accounts: {
    receivable: 34560,
    payable: 28940,
    outstanding: 12340,
    overdue: 5670,
  },
}

const monthlyData = [
  { month: "Jan", revenue: 198000, expenses: 145000, profit: 53000 },
  { month: "Feb", revenue: 215000, expenses: 158000, profit: 57000 },
  { month: "Mar", revenue: 234000, expenses: 167000, profit: 67000 },
  { month: "Apr", revenue: 256000, expenses: 178000, profit: 78000 },
  { month: "May", revenue: 278000, expenses: 189000, profit: 89000 },
  { month: "Jun", revenue: 245680, expenses: 178450, profit: 67230 },
]

export default function FinancialReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Financial Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
              <p className="text-gray-600">Comprehensive financial analysis and reporting</p>
            </div>
            <div className="flex space-x-2">
              <Select defaultValue="monthly">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="range" />
                </PopoverContent>
              </Popover>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${financialData.revenue.total.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />+{financialData.revenue.growth}% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${financialData.expenses.total.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  {((financialData.expenses.total / financialData.revenue.total) * 100).toFixed(1)}% of revenue
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${financialData.profitLoss.netProfit.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{financialData.profitLoss.margin}% profit margin</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${financialData.accounts.outstanding.toLocaleString()}</div>
                <div className="text-xs text-red-600">${financialData.accounts.overdue.toLocaleString()} overdue</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
              <TabsTrigger value="profitloss">Profit & Loss</TabsTrigger>
              <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue vs Expenses Trend</CardTitle>
                      <CardDescription>Monthly comparison over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Revenue vs Expenses Chart</p>
                          <div className="mt-4 space-y-2">
                            {monthlyData.map((data, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{data.month}</span>
                                <span className="text-green-600">${data.revenue.toLocaleString()}</span>
                                <span className="text-red-600">${data.expenses.toLocaleString()}</span>
                                <span className="font-medium">${data.profit.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Room Revenue</span>
                          <div className="text-right">
                            <div className="font-medium">${financialData.revenue.rooms.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {((financialData.revenue.rooms / financialData.revenue.total) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>F&B Revenue</span>
                          <div className="text-right">
                            <div className="font-medium">${financialData.revenue.fnb.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {((financialData.revenue.fnb / financialData.revenue.total) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Events & Conferences</span>
                          <div className="text-right">
                            <div className="font-medium">${financialData.revenue.events.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {((financialData.revenue.events / financialData.revenue.total) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Other Services</span>
                          <div className="text-right">
                            <div className="font-medium">${financialData.revenue.other.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {((financialData.revenue.other / financialData.revenue.total) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate P&L Statement
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <PieChart className="mr-2 h-4 w-4" />
                        Revenue Analysis
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="revenue">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Department</CardTitle>
                    <CardDescription>Breakdown of revenue sources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Revenue Distribution Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Monthly revenue growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">Room Revenue</p>
                          <p className="text-sm text-muted-foreground">Primary revenue source</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">${financialData.revenue.rooms.toLocaleString()}</p>
                          <p className="text-sm text-green-600">+15.2%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium">F&B Revenue</p>
                          <p className="text-sm text-muted-foreground">Restaurant & room service</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">${financialData.revenue.fnb.toLocaleString()}</p>
                          <p className="text-sm text-blue-600">+8.7%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div>
                          <p className="font-medium">Events Revenue</p>
                          <p className="text-sm text-muted-foreground">Conferences & meetings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">${financialData.revenue.events.toLocaleString()}</p>
                          <p className="text-sm text-purple-600">+22.1%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Categories</CardTitle>
                    <CardDescription>Breakdown of operational expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Payroll & Benefits</span>
                        <div className="text-right">
                          <div className="font-medium">${financialData.expenses.payroll.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {((financialData.expenses.payroll / financialData.expenses.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(financialData.expenses.payroll / financialData.expenses.total) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Utilities</span>
                        <div className="text-right">
                          <div className="font-medium">${financialData.expenses.utilities.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {((financialData.expenses.utilities / financialData.expenses.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(financialData.expenses.utilities / financialData.expenses.total) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Maintenance</span>
                        <div className="text-right">
                          <div className="font-medium">${financialData.expenses.maintenance.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {((financialData.expenses.maintenance / financialData.expenses.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{
                            width: `${(financialData.expenses.maintenance / financialData.expenses.total) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Marketing</span>
                        <div className="text-right">
                          <div className="font-medium">${financialData.expenses.marketing.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {((financialData.expenses.marketing / financialData.expenses.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${(financialData.expenses.marketing / financialData.expenses.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expense Trends</CardTitle>
                    <CardDescription>Monthly expense analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Expense Trend Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profitloss">
              <Card>
                <CardHeader>
                  <CardTitle>Profit & Loss Statement</CardTitle>
                  <CardDescription>Comprehensive P&L for the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Revenue</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Room Revenue</span>
                          <span>${financialData.revenue.rooms.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food & Beverage</span>
                          <span>${financialData.revenue.fnb.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Events & Conferences</span>
                          <span>${financialData.revenue.events.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Revenue</span>
                          <span>${financialData.revenue.other.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total Revenue</span>
                          <span>${financialData.revenue.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4">Expenses</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Payroll & Benefits</span>
                          <span>${financialData.expenses.payroll.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Utilities</span>
                          <span>${financialData.expenses.utilities.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance</span>
                          <span>${financialData.expenses.maintenance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Marketing</span>
                          <span>${financialData.expenses.marketing.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Expenses</span>
                          <span>${financialData.expenses.other.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total Expenses</span>
                          <span>${financialData.expenses.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Gross Profit</span>
                          <span className="text-green-600">
                            ${financialData.profitLoss.grossProfit.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xl font-bold">
                          <span>Net Profit</span>
                          <span className="text-green-600">${financialData.profitLoss.netProfit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Profit Margin</span>
                          <span>{financialData.profitLoss.margin}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cashflow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Statement</CardTitle>
                    <CardDescription>Cash inflows and outflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Operating Activities</h5>
                        <div className="flex justify-between">
                          <span>Net Cash from Operations</span>
                          <span className="text-green-600">${financialData.cashFlow.operating.toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Investing Activities</h5>
                        <div className="flex justify-between">
                          <span>Net Cash from Investing</span>
                          <span className="text-red-600">${financialData.cashFlow.investing.toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Financing Activities</h5>
                        <div className="flex justify-between">
                          <span>Net Cash from Financing</span>
                          <span className="text-red-600">${financialData.cashFlow.financing.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Net Cash Flow</span>
                          <span className="text-green-600">${financialData.cashFlow.net.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Trend</CardTitle>
                    <CardDescription>Monthly cash flow analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Cash Flow Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="accounts">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Accounts Receivable</CardTitle>
                    <CardDescription>Outstanding customer payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium">Total Receivable</p>
                          <p className="text-sm text-muted-foreground">All outstanding invoices</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            ${financialData.accounts.receivable.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium">Outstanding</p>
                          <p className="text-sm text-muted-foreground">Within payment terms</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-yellow-600">
                            ${financialData.accounts.outstanding.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium">Overdue</p>
                          <p className="text-sm text-muted-foreground">Past payment terms</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">${financialData.accounts.overdue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accounts Payable</CardTitle>
                    <CardDescription>Outstanding vendor payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Total Payable</p>
                          <p className="text-sm text-muted-foreground">All vendor invoices</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${financialData.accounts.payable.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current (0-30 days)</span>
                          <span>$18,560</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>31-60 days</span>
                          <span>$7,240</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>61-90 days</span>
                          <span>$2,140</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Over 90 days</span>
                          <span>$1,000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
