"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  DollarSign,
  TrendingUp,
  Download,
  CalendarIcon,
  BarChart3,
  PieChart,
  Target,
  Users,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Briefcase,
  Globe,
  Award,
  Zap,
  Settings,
  EyeOff,
  Filter,
  RefreshCw,
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

// Comprehensive Financial Data
const financialStatements = {
  profitLoss: {
    revenue: {
      rooms: { current: 1856420, budget: 1750000, lastYear: 1642300, growth: 13.0 },
      fnb: { current: 456230, budget: 420000, lastYear: 398500, growth: 14.5 },
      events: { current: 285600, budget: 250000, lastYear: 234800, growth: 21.6 },
      spa: { current: 89450, budget: 85000, lastYear: 76200, growth: 17.4 },
      other: { current: 67890, budget: 60000, lastYear: 58900, growth: 15.3 },
      total: { current: 2755590, budget: 2565000, lastYear: 2410700, growth: 14.3 },
    },
    expenses: {
      payroll: { current: 892250, budget: 850000, lastYear: 823400, variance: 4.9 },
      utilities: { current: 234560, budget: 220000, lastYear: 245600, variance: 6.6 },
      maintenance: { current: 187900, budget: 180000, lastYear: 198700, variance: 4.4 },
      marketing: { current: 156800, budget: 150000, lastYear: 142300, variance: 4.5 },
      food_cost: { current: 136890, budget: 126000, lastYear: 119500, variance: 8.6 },
      admin: { current: 98750, budget: 95000, lastYear: 89200, variance: 3.9 },
      insurance: { current: 45600, budget: 48000, lastYear: 44200, variance: -5.0 },
      other: { current: 89450, budget: 85000, lastYear: 78900, variance: 5.2 },
      total: { current: 1842200, budget: 1754000, lastYear: 1741800, variance: 5.0 },
    },
    grossProfit: { current: 913390, budget: 811000, lastYear: 668900, margin: 33.1 },
    netProfit: { current: 687450, budget: 615000, lastYear: 523200, margin: 24.9 },
  },
  balanceSheet: {
    assets: {
      current: { cash: 2450000, receivables: 345600, inventory: 89500, prepaid: 67800, total: 2952900 },
      fixed: { building: 18500000, equipment: 3450000, furniture: 1250000, depreciation: -2890000, total: 20310000 },
      total: 23262900,
    },
    liabilities: {
      current: { payables: 289400, accrued: 156700, taxes: 89500, shortTerm: 234500, total: 770100 },
      longTerm: { mortgage: 8900000, loans: 2340000, bonds: 1500000, total: 12740000 },
      total: 13510100,
    },
    equity: {
      capital: 6500000,
      retained: 3252800,
      total: 9752800,
    },
  },
  cashFlow: {
    operating: {
      netIncome: 687450,
      depreciation: 456000,
      receivables: -23400,
      payables: 34500,
      inventory: -12300,
      total: 1142250,
    },
    investing: {
      equipment: -234500,
      renovation: -456000,
      technology: -89500,
      total: -780000,
    },
    financing: {
      loanPayments: -234000,
      dividends: -150000,
      total: -384000,
    },
    netCashFlow: -21750,
  },
}

const performanceMetrics = {
  occupancy: {
    current: 84.2,
    budget: 78.0,
    lastYear: 76.8,
    variance: 6.2,
    trend: "up",
    monthly: [72, 75, 78, 82, 85, 88, 89, 87, 84, 81, 79, 84.2],
  },
  adr: {
    current: 195.5,
    budget: 185.0,
    lastYear: 178.3,
    variance: 5.7,
    trend: "up",
    monthly: [165, 170, 175, 180, 185, 190, 195, 200, 198, 192, 188, 195.5],
  },
  revpar: {
    current: 164.65,
    budget: 144.3,
    lastYear: 136.94,
    variance: 14.1,
    trend: "up",
    monthly: [119, 128, 137, 148, 157, 167, 175, 174, 167, 155, 149, 164.65],
  },
  goppar: {
    current: 89.45,
    budget: 78.2,
    lastYear: 72.3,
    variance: 14.4,
    trend: "up",
  },
}

const capexAnalysis = {
  budget: {
    total: 2500000,
    spent: 1234500,
    committed: 456000,
    remaining: 809500,
    utilization: 49.4,
  },
  projects: [
    {
      name: "Room Renovation - Floor 3",
      budget: 850000,
      spent: 567000,
      completion: 67,
      roi: 18.5,
      status: "in-progress",
      expectedCompletion: "2024-03-15",
    },
    {
      name: "HVAC System Upgrade",
      budget: 450000,
      spent: 445000,
      completion: 99,
      roi: 22.3,
      status: "completed",
      expectedCompletion: "2024-01-10",
    },
    {
      name: "Restaurant Kitchen Equipment",
      budget: 320000,
      spent: 89500,
      completion: 28,
      roi: 15.8,
      status: "in-progress",
      expectedCompletion: "2024-04-20",
    },
    {
      name: "Technology Infrastructure",
      budget: 180000,
      spent: 133000,
      completion: 74,
      roi: 28.7,
      status: "in-progress",
      expectedCompletion: "2024-02-28",
    },
  ],
  roiAnalysis: {
    averageROI: 21.3,
    paybackPeriod: 4.2,
    npv: 1850000,
    irr: 24.8,
  },
}

const marketPositioning = {
  competitiveSet: [
    {
      hotel: "Our Hotel",
      occupancy: 84.2,
      adr: 195.5,
      revpar: 164.65,
      marketShare: 18.5,
      rank: 1,
      change: 0,
    },
    {
      hotel: "Luxury Resort A",
      occupancy: 79.3,
      adr: 220.0,
      revpar: 174.46,
      marketShare: 22.1,
      rank: 2,
      change: -1,
    },
    {
      hotel: "Business Hotel B",
      occupancy: 88.1,
      adr: 165.0,
      revpar: 145.37,
      marketShare: 16.8,
      rank: 3,
      change: 1,
    },
    {
      hotel: "Boutique Hotel C",
      occupancy: 76.5,
      adr: 185.0,
      revpar: 141.53,
      marketShare: 12.3,
      rank: 4,
      change: 0,
    },
    {
      hotel: "Chain Hotel D",
      occupancy: 82.4,
      adr: 155.0,
      revpar: 127.72,
      marketShare: 15.2,
      rank: 5,
      change: 0,
    },
  ],
  marketTrends: {
    demandGrowth: 12.5,
    supplyGrowth: 8.3,
    pricingPower: 15.2,
    marketPenetration: 18.5,
  },
}

const investmentAnalysis = {
  valuation: {
    currentValue: 28500000,
    bookValue: 23262900,
    marketValue: 32000000,
    appreciation: 12.3,
  },
  returns: {
    totalReturn: 28.5,
    cashOnCash: 18.7,
    irr: 22.4,
    equity: 15.9,
  },
  projections: {
    year1: { revenue: 3100000, noi: 890000, value: 30200000 },
    year2: { revenue: 3350000, noi: 980000, value: 32500000 },
    year3: { revenue: 3620000, noi: 1080000, value: 35100000 },
    year5: { revenue: 4250000, noi: 1350000, value: 42000000 },
  },
}

export default function OwnersReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  // Customization state
  const [showCustomization, setShowCustomization] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    kpis: true,
    financial: true,
    performance: true,
    budget: true,
    capex: true,
    market: true,
    investment: true,
  })
  const [reportFormat, setReportFormat] = useState("detailed")
  const [currency, setCurrency] = useState("USD")
  const [comparisonPeriod, setComparisonPeriod] = useState("lastYear")
  const [autoRefresh, setAutoRefresh] = useState(false)

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b">
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
                <BreadcrumbPage>Owners & Investors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Executive Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Executive Dashboard</h1>
              <p className="text-lg text-gray-600">
                Comprehensive financial and performance analytics for stakeholders
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <Select defaultValue="monthly">
                <SelectTrigger className="w-40">
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
                  <Button variant="outline" className="w-60 bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="range" />
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                onClick={() => setShowCustomization(!showCustomization)}
                className="bg-transparent"
              >
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
              {autoRefresh && (
                <Button variant="outline" className="bg-transparent">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Auto Refresh
                </Button>
              )}
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Export Executive Summary
              </Button>
            </div>
          </div>

          {/* Customization Panel */}
          {showCustomization && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Report Customization
                </CardTitle>
                <CardDescription>Configure your report display preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Visible Sections */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Visible Sections</Label>
                    <div className="space-y-2">
                      {Object.entries(visibleSections).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={() => toggleSection(key as keyof typeof visibleSections)}
                          />
                          <Label htmlFor={key} className="text-sm capitalize">
                            {key === "kpis" ? "Key Performance Indicators" : key}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Report Format */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Report Format</Label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Executive Summary</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                        <SelectItem value="charts">Charts & Graphs</SelectItem>
                        <SelectItem value="tables">Data Tables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currency & Comparison */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Display Options</Label>
                    <div className="space-y-3">
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lastYear">vs Last Year</SelectItem>
                          <SelectItem value="budget">vs Budget</SelectItem>
                          <SelectItem value="lastMonth">vs Last Month</SelectItem>
                          <SelectItem value="lastQuarter">vs Last Quarter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Auto Refresh */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Auto Features</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                        <Label htmlFor="auto-refresh" className="text-sm">
                          Auto Refresh (5 min)
                        </Label>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Filter className="mr-2 h-3 w-3" />
                        Save as Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Performance Indicators */}
          {visibleSections.kpis && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-100">Net Profit</CardTitle>
                  <DollarSign className="h-5 w-5 text-green-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                    {financialStatements.profitLoss.netProfit.current.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-green-100 mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />+{financialStatements.profitLoss.netProfit.margin}% margin
                  </div>
                  <div className="text-xs text-green-100 mt-1">
                    {comparisonPeriod === "budget" ? "vs Budget: +" : "vs Last Year: +"}
                    {comparisonPeriod === "budget"
                      ? (((financialStatements.profitLoss.netProfit.current - 615000) / 615000) * 100).toFixed(1)
                      : (((financialStatements.profitLoss.netProfit.current - 523200) / 523200) * 100).toFixed(1)}
                    %
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">RevPAR</CardTitle>
                  <BarChart3 className="h-5 w-5 text-blue-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                    {performanceMetrics.revpar.current}
                  </div>
                  <div className="flex items-center text-sm text-blue-100 mt-2">
                    <ArrowUpRight className="h-4 w-4 mr-1" />+{performanceMetrics.revpar.variance}% vs LY
                  </div>
                  <div className="text-xs text-blue-100 mt-1">Market Rank: #1 in competitive set</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-100">Property Value</CardTitle>
                  <Building className="h-5 w-5 text-purple-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                    {(investmentAnalysis.valuation.currentValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="flex items-center text-sm text-purple-100 mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />+{investmentAnalysis.valuation.appreciation}% appreciation
                  </div>
                  <div className="text-xs text-purple-100 mt-1">
                    Market value:{" "}
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                    {(investmentAnalysis.valuation.marketValue / 1000000).toFixed(1)}M
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-100">Total ROI</CardTitle>
                  <Target className="h-5 w-5 text-orange-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{investmentAnalysis.returns.totalReturn}%</div>
                  <div className="flex items-center text-sm text-orange-100 mt-2">
                    <Award className="h-4 w-4 mr-1" />
                    IRR: {investmentAnalysis.returns.irr}%
                  </div>
                  <div className="text-xs text-orange-100 mt-1">
                    Cash-on-Cash: {investmentAnalysis.returns.cashOnCash}%
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Tabs defaultValue="financial" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            {visibleSections.financial && <TabsTrigger value="financial">Financial</TabsTrigger>}
            {visibleSections.performance && <TabsTrigger value="performance">Performance</TabsTrigger>}
            {visibleSections.budget && <TabsTrigger value="budget">Budget</TabsTrigger>}
            {visibleSections.capex && <TabsTrigger value="capex">CAPEX</TabsTrigger>}
            {visibleSections.market && <TabsTrigger value="market">Market</TabsTrigger>}
            {visibleSections.investment && <TabsTrigger value="investment">Investment</TabsTrigger>}
          </TabsList>

          {visibleSections.financial && (
            <TabsContent value="financial" className="space-y-6">
              {/* Profit & Loss Statement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Profit & Loss Statement
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{reportFormat}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setVisibleSections((prev) => ({ ...prev, financial: false }))}
                        className="bg-transparent"
                      >
                        <EyeOff className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>Comprehensive income statement with variance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Revenue Section */}
                    <div>
                      <h4 className="font-semibold text-lg mb-4 text-green-700">Revenue</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead className="text-right">Current</TableHead>
                            <TableHead className="text-right">Budget</TableHead>
                            <TableHead className="text-right">Last Year</TableHead>
                            <TableHead className="text-right">Growth %</TableHead>
                            <TableHead className="text-right">% of Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(financialStatements.profitLoss.revenue).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium capitalize">
                                {key === "fnb" ? "Food & Beverage" : key.replace("_", " ")}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                                {value.current.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                                {value.budget.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                                {value.lastYear.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge variant={value.growth > 0 ? "default" : "destructive"}>
                                  {value.growth > 0 ? "+" : ""}
                                  {value.growth}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                {((value.current / financialStatements.profitLoss.revenue.total.current) * 100).toFixed(
                                  1,
                                )}
                                %
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Expenses Section */}
                    <div>
                      <h4 className="font-semibold text-lg mb-4 text-red-700">Operating Expenses</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Current</TableHead>
                            <TableHead className="text-right">Budget</TableHead>
                            <TableHead className="text-right">Last Year</TableHead>
                            <TableHead className="text-right">Variance %</TableHead>
                            <TableHead className="text-right">% of Revenue</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(financialStatements.profitLoss.expenses)
                            .slice(0, -1)
                            .map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell className="font-medium capitalize">{key.replace("_", " ")}</TableCell>
                                <TableCell className="text-right font-medium">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                      ? "€"
                                      : currency === "GBP"
                                        ? "£"
                                        : "C$"}
                                  {value.current.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                      ? "€"
                                      : currency === "GBP"
                                        ? "£"
                                        : "C$"}
                                  {value.budget.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                      ? "€"
                                      : currency === "GBP"
                                        ? "£"
                                        : "C$"}
                                  {value.lastYear.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Badge variant={value.variance < 0 ? "default" : "destructive"}>
                                    {value.variance > 0 ? "+" : ""}
                                    {value.variance}%
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  {(
                                    (value.current / financialStatements.profitLoss.revenue.total.current) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Profitability Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {financialStatements.profitLoss.grossProfit.current.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Gross Profit</div>
                          <div className="text-xs text-gray-500">
                            {financialStatements.profitLoss.grossProfit.margin}% margin
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {financialStatements.profitLoss.netProfit.current.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Net Profit</div>
                          <div className="text-xs text-gray-500">
                            {financialStatements.profitLoss.netProfit.margin}% margin
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {(((financialStatements.profitLoss.netProfit.current - 523200) / 523200) * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">YoY Growth</div>
                          <div className="text-xs text-gray-500">vs last year</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Balance Sheet & Cash Flow */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Balance Sheet Summary</CardTitle>
                    <CardDescription>Financial position overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Assets</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Current Assets</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.balanceSheet.assets.current.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fixed Assets (Net)</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.balanceSheet.assets.fixed.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total Assets</span>
                            <span>
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.balanceSheet.assets.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Liabilities & Equity</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Current Liabilities</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.balanceSheet.liabilities.current.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Long-term Debt</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.balanceSheet.liabilities.longTerm.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shareholders' Equity</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.balanceSheet.equity.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>Debt-to-Equity Ratio</span>
                            <span className="font-medium">
                              {(
                                financialStatements.balanceSheet.liabilities.total /
                                financialStatements.balanceSheet.equity.total
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current Ratio</span>
                            <span className="font-medium">
                              {(
                                financialStatements.balanceSheet.assets.current.total /
                                financialStatements.balanceSheet.liabilities.current.total
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Statement</CardTitle>
                    <CardDescription>Cash movement analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2 text-green-700">Operating Activities</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Net Income</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.cashFlow.operating.netIncome.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Depreciation</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.cashFlow.operating.depreciation.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Working Capital Changes</span>
                            <span className="font-medium">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {(
                                financialStatements.cashFlow.operating.receivables +
                                financialStatements.cashFlow.operating.payables +
                                financialStatements.cashFlow.operating.inventory
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2 text-green-600">
                            <span>Operating Cash Flow</span>
                            <span>
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.cashFlow.operating.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-blue-700">Investing Activities</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Capital Expenditures</span>
                            <span className="font-medium text-red-600">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.cashFlow.investing.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-purple-700">Financing Activities</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Debt Service & Dividends</span>
                            <span className="font-medium text-red-600">
                              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                              {financialStatements.cashFlow.financing.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between font-semibold">
                          <span>Net Cash Flow</span>
                          <span
                            className={financialStatements.cashFlow.netCashFlow > 0 ? "text-green-600" : "text-red-600"}
                          >
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {financialStatements.cashFlow.netCashFlow.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {visibleSections.performance && (
            <TabsContent value="performance" className="space-y-6">
              {/* Performance Metrics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Occupancy Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">{performanceMetrics.occupancy.current}%</div>
                        <div className="text-sm text-gray-600">Current Occupancy</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>vs Budget ({performanceMetrics.occupancy.budget}%)</span>
                          <span className="text-green-600 font-medium">+{performanceMetrics.occupancy.variance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>vs Last Year ({performanceMetrics.occupancy.lastYear}%)</span>
                          <span className="text-green-600 font-medium">
                            +{(performanceMetrics.occupancy.current - performanceMetrics.occupancy.lastYear).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">12-Month Trend</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Average Daily Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {performanceMetrics.adr.current}
                        </div>
                        <div className="text-sm text-gray-600">Average Daily Rate</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            vs Budget (
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {performanceMetrics.adr.budget})
                          </span>
                          <span className="text-green-600 font-medium">+{performanceMetrics.adr.variance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>
                            vs Last Year (
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {performanceMetrics.adr.lastYear})
                          </span>
                          <span className="text-green-600 font-medium">
                            +{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {(performanceMetrics.adr.current - performanceMetrics.adr.lastYear).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Pricing Trend</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Revenue per Available Room
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {performanceMetrics.revpar.current}
                        </div>
                        <div className="text-sm text-gray-600">RevPAR</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            vs Budget (
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {performanceMetrics.revpar.budget})
                          </span>
                          <span className="text-green-600 font-medium">+{performanceMetrics.revpar.variance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>GOPPAR</span>
                          <span className="text-blue-600 font-medium">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {performanceMetrics.goppar.current}
                          </span>
                        </div>
                      </div>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Revenue Mix</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Performance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Year-over-Year Performance Analysis</CardTitle>
                  <CardDescription>Comprehensive performance comparison and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Revenue Growth</span>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">+14.3%</div>
                      <div className="text-xs text-gray-600">vs last year</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Market Share</span>
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">18.5%</div>
                      <div className="text-xs text-gray-600">of local market</div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Guest Satisfaction</span>
                        <Award className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600">4.7/5</div>
                      <div className="text-xs text-gray-600">average rating</div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Repeat Guests</span>
                        <Users className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-orange-600">34%</div>
                      <div className="text-xs text-gray-600">return rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.budget && (
            <TabsContent value="budget" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Budget vs Actual Performance
                  </CardTitle>
                  <CardDescription>Comprehensive variance analysis across all departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">+7.4%</div>
                      <div className="text-sm text-gray-600">Revenue vs Budget</div>
                      <Badge variant="default" className="mt-2">
                        Exceeding Target
                      </Badge>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">+5.0%</div>
                      <div className="text-sm text-gray-600">Expenses vs Budget</div>
                      <Badge variant="secondary" className="mt-2">
                        Within Range
                      </Badge>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">+11.8%</div>
                      <div className="text-sm text-gray-600">Profit vs Budget</div>
                      <Badge variant="default" className="mt-2">
                        Outstanding
                      </Badge>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Budget</TableHead>
                        <TableHead className="text-right">Actual</TableHead>
                        <TableHead className="text-right">Variance</TableHead>
                        <TableHead className="text-right">Variance %</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Room Revenue</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          1,750,000
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          1,856,420
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          106,420
                        </TableCell>
                        <TableCell className="text-right text-green-600">+6.1%</TableCell>
                        <TableCell>
                          <Badge variant="default">Excellent</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">F&B Revenue</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}420,000
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}456,230
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}36,230
                        </TableCell>
                        <TableCell className="text-right text-green-600">+8.6%</TableCell>
                        <TableCell>
                          <Badge variant="default">Excellent</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Events Revenue</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}250,000
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}285,600
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}35,600
                        </TableCell>
                        <TableCell className="text-right text-green-600">+14.2%</TableCell>
                        <TableCell>
                          <Badge variant="default">Outstanding</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Payroll Expenses</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}850,000
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}892,250
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          +{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}42,250
                        </TableCell>
                        <TableCell className="text-right text-red-600">+5.0%</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Monitor</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Marketing Expenses</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}150,000
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}156,800
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          +{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}6,800
                        </TableCell>
                        <TableCell className="text-right text-red-600">+4.5%</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Good</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.capex && (
            <TabsContent value="capex" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      CAPEX Budget Overview
                    </CardTitle>
                    <CardDescription>Capital expenditure utilization and planning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Budget</span>
                        <span className="font-bold">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {capexAnalysis.budget.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Spent to Date</span>
                        <span className="font-bold text-blue-600">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {capexAnalysis.budget.spent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Committed</span>
                        <span className="font-bold text-yellow-600">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {capexAnalysis.budget.committed.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Remaining</span>
                        <span className="font-bold text-green-600">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {capexAnalysis.budget.remaining.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Budget Utilization</span>
                          <span>{capexAnalysis.budget.utilization}%</span>
                        </div>
                        <Progress value={capexAnalysis.budget.utilization} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      ROI Analysis
                    </CardTitle>
                    <CardDescription>Return on investment metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{capexAnalysis.roiAnalysis.averageROI}%</div>
                        <div className="text-sm text-gray-600">Average ROI</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Payback Period</div>
                          <div className="text-lg font-bold">{capexAnalysis.roiAnalysis.paybackPeriod} years</div>
                        </div>
                        <div>
                          <div className="font-medium">IRR</div>
                          <div className="text-lg font-bold">{capexAnalysis.roiAnalysis.irr}%</div>
                        </div>
                        <div>
                          <div className="font-medium">NPV</div>
                          <div className="text-lg font-bold">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {(capexAnalysis.roiAnalysis.npv / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Projects</div>
                          <div className="text-lg font-bold">{capexAnalysis.projects.length}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Capital Projects Status</CardTitle>
                  <CardDescription>Detailed project tracking and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-right">Budget</TableHead>
                        <TableHead className="text-right">Spent</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">ROI</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Completion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {capexAnalysis.projects.map((project, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell className="text-right">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {project.budget.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {project.spent.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={project.completion} className="h-2 w-20" />
                              <span className="text-sm">{project.completion}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">{project.roi}%</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                project.status === "completed"
                                  ? "default"
                                  : project.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{project.expectedCompletion}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.market && (
            <TabsContent value="market" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Competitive Set Performance
                  </CardTitle>
                  <CardDescription>Market positioning and competitive analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hotel</TableHead>
                        <TableHead className="text-right">Occupancy</TableHead>
                        <TableHead className="text-right">ADR</TableHead>
                        <TableHead className="text-right">RevPAR</TableHead>
                        <TableHead className="text-right">Market Share</TableHead>
                        <TableHead className="text-center">Rank</TableHead>
                        <TableHead className="text-center">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketPositioning.competitiveSet.map((hotel, index) => (
                        <TableRow key={index} className={hotel.hotel === "Our Hotel" ? "bg-blue-50" : ""}>
                          <TableCell className="font-medium">
                            {hotel.hotel}
                            {hotel.hotel === "Our Hotel" && <Badge className="ml-2">Our Property</Badge>}
                          </TableCell>
                          <TableCell className="text-right">{hotel.occupancy}%</TableCell>
                          <TableCell className="text-right">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {hotel.adr}
                          </TableCell>
                          <TableCell className="text-right">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {hotel.revpar}
                          </TableCell>
                          <TableCell className="text-right">{hotel.marketShare}%</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={hotel.rank === 1 ? "default" : "outline"}>#{hotel.rank}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {hotel.change === 0 ? (
                              <span className="text-gray-500">-</span>
                            ) : (
                              <div className="flex items-center justify-center">
                                {hotel.change > 0 ? (
                                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                                )}
                                <span className={hotel.change > 0 ? "text-green-500" : "text-red-500"}>
                                  {Math.abs(hotel.change)}
                                </span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Market Demand Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      +{marketPositioning.marketTrends.demandGrowth}%
                    </div>
                    <div className="text-xs text-gray-600">vs last year</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Supply Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      +{marketPositioning.marketTrends.supplyGrowth}%
                    </div>
                    <div className="text-xs text-gray-600">new inventory</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Pricing Power</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      +{marketPositioning.marketTrends.pricingPower}%
                    </div>
                    <div className="text-xs text-gray-600">rate growth</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Market Penetration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {marketPositioning.marketTrends.marketPenetration}%
                    </div>
                    <div className="text-xs text-gray-600">of total market</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {visibleSections.investment && (
            <TabsContent value="investment" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Property Valuation
                    </CardTitle>
                    <CardDescription>Current asset valuation and appreciation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Book Value</div>
                          <div className="text-xl font-bold">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {(investmentAnalysis.valuation.bookValue / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Current Value</div>
                          <div className="text-xl font-bold text-blue-600">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {(investmentAnalysis.valuation.currentValue / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Market Value</div>
                          <div className="text-xl font-bold text-green-600">
                            {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                            {(investmentAnalysis.valuation.marketValue / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Appreciation</div>
                          <div className="text-xl font-bold text-purple-600">
                            +{investmentAnalysis.valuation.appreciation}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Investment Returns
                    </CardTitle>
                    <CardDescription>Comprehensive return analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Total Return</div>
                          <div className="text-xl font-bold text-green-600">
                            {investmentAnalysis.returns.totalReturn}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Cash-on-Cash</div>
                          <div className="text-xl font-bold text-blue-600">
                            {investmentAnalysis.returns.cashOnCash}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">IRR</div>
                          <div className="text-xl font-bold text-purple-600">{investmentAnalysis.returns.irr}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Equity Return</div>
                          <div className="text-xl font-bold text-orange-600">{investmentAnalysis.returns.equity}%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    5-Year Financial Projections
                  </CardTitle>
                  <CardDescription>Future performance and value projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">NOI</TableHead>
                        <TableHead className="text-right">Property Value</TableHead>
                        <TableHead className="text-right">Value Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Year 1</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year1.revenue / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year1.noi / 1000).toLocaleString()}K
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year1.value / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right text-green-600">+6.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Year 2</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year2.revenue / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year2.noi / 1000).toLocaleString()}K
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year2.value / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right text-green-600">+7.6%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Year 3</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year3.revenue / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year3.noi / 1000).toLocaleString()}K
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year3.value / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right text-green-600">+8.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Year 5</TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year5.revenue / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year5.noi / 1000).toLocaleString()}K
                        </TableCell>
                        <TableCell className="text-right">
                          {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}
                          {(investmentAnalysis.projections.year5.value / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right text-green-600">+47.4%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}42M
                      </div>
                      <div className="text-sm text-gray-600">Projected Value (Year 5)</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">22.4%</div>
                      <div className="text-sm text-gray-600">5-Year IRR</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "C$"}13.5M
                      </div>
                      <div className="text-sm text-gray-600">Total Value Creation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
