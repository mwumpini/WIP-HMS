"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Star,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Wrench,
  Calendar,
  Target,
  Activity,
  Award,
  Bell,
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

// Comprehensive Management Data
const dailyFlashReport = {
  date: "2024-01-15",
  operationalMetrics: {
    roomsSold: 42,
    totalRooms: 50,
    occupancy: 84.0,
    adr: 195.5,
    revpar: 164.22,
    walkIns: 8,
    noShows: 1,
    cancellations: 2,
    upgrades: 5,
    downgrades: 1,
  },
  revenueBreakdown: {
    rooms: 18500,
    fnb: 12450,
    spa: 3200,
    events: 8900,
    other: 1850,
    total: 44900,
  },
  guestMetrics: {
    arrivals: 18,
    departures: 15,
    inHouse: 42,
    vipGuests: 3,
    groupGuests: 12,
    corporateGuests: 8,
    leisureGuests: 22,
  },
  staffMetrics: {
    onDuty: 28,
    callIns: 2,
    overtime: 4,
    productivity: 92,
  },
}

const departmentalPerformance = [
  {
    department: "Front Office",
    manager: "Sarah Johnson",
    revenue: 18500,
    budget: 17000,
    variance: 8.8,
    kpis: {
      checkInTime: "3.2 min",
      guestSatisfaction: 4.7,
      upsellRate: 15.2,
      efficiency: 94,
    },
    status: "excellent",
    alerts: 0,
  },
  {
    department: "Housekeeping",
    manager: "Maria Santos",
    cost: 4200,
    budget: 4500,
    variance: -6.7,
    kpis: {
      roomsPerHour: 2.1,
      qualityScore: 96,
      guestComplaints: 1,
      efficiency: 88,
    },
    status: "good",
    alerts: 1,
  },
  {
    department: "Food & Beverage",
    manager: "Chef Michael Brown",
    revenue: 12450,
    budget: 11800,
    variance: 5.5,
    kpis: {
      foodCost: 28.5,
      guestSatisfaction: 4.5,
      tablesTurned: 2.8,
      efficiency: 91,
    },
    status: "good",
    alerts: 0,
  },
  {
    department: "Spa & Wellness",
    manager: "Lisa Chen",
    revenue: 3200,
    budget: 3500,
    variance: -8.6,
    kpis: {
      utilizationRate: 72,
      guestSatisfaction: 4.8,
      retailSales: 15.2,
      efficiency: 85,
    },
    status: "attention",
    alerts: 2,
  },
  {
    department: "Events & Banquets",
    manager: "David Wilson",
    revenue: 8900,
    budget: 7500,
    variance: 18.7,
    kpis: {
      bookingRate: 85,
      guestSatisfaction: 4.6,
      profitMargin: 35.2,
      efficiency: 96,
    },
    status: "excellent",
    alerts: 0,
  },
  {
    department: "Security",
    manager: "James Rodriguez",
    cost: 2800,
    budget: 2900,
    variance: -3.4,
    kpis: {
      incidentRate: 0.2,
      responseTime: "2.1 min",
      guestComplaints: 0,
      efficiency: 98,
    },
    status: "excellent",
    alerts: 0,
  },
]

const guestSatisfactionData = {
  overall: {
    score: 4.6,
    totalReviews: 234,
    trend: "up",
    monthlyChange: 0.2,
  },
  categories: [
    { category: "Service Quality", score: 4.8, trend: "+0.2", target: 4.5, reviews: 189 },
    { category: "Room Cleanliness", score: 4.7, trend: "+0.1", target: 4.6, reviews: 201 },
    { category: "Food & Beverage", score: 4.4, trend: "-0.1", target: 4.5, reviews: 156 },
    { category: "Facilities", score: 4.5, trend: "+0.3", target: 4.3, reviews: 178 },
    { category: "Value for Money", score: 4.3, trend: "+0.2", target: 4.2, reviews: 167 },
    { category: "Location", score: 4.9, trend: "0.0", target: 4.7, reviews: 198 },
    { category: "Check-in/Check-out", score: 4.6, trend: "+0.1", target: 4.4, reviews: 145 },
    { category: "Wi-Fi & Technology", score: 4.2, trend: "+0.4", target: 4.0, reviews: 134 },
  ],
  sources: [
    { platform: "Booking.com", score: 4.7, reviews: 89, weight: 38 },
    { platform: "TripAdvisor", score: 4.5, reviews: 67, weight: 29 },
    { platform: "Google Reviews", score: 4.6, reviews: 45, weight: 19 },
    { platform: "Direct Feedback", score: 4.8, reviews: 33, weight: 14 },
  ],
  recentComments: [
    { guest: "John D.", rating: 5, comment: "Exceptional service and beautiful rooms!", date: "2024-01-14" },
    {
      guest: "Sarah M.",
      rating: 4,
      comment: "Great location, friendly staff. WiFi could be faster.",
      date: "2024-01-13",
    },
    { guest: "Robert K.", rating: 5, comment: "Outstanding dining experience and spa services.", date: "2024-01-12" },
  ],
}

const staffProductivityMetrics = [
  {
    department: "Front Office",
    staff: 8,
    productivity: 94,
    target: 85,
    metrics: {
      checkInsPerHour: 12,
      callsAnswered: 156,
      upsells: 8,
      guestComplaints: 1,
    },
    topPerformer: "Jennifer Lee",
    status: "excellent",
  },
  {
    department: "Housekeeping",
    staff: 12,
    productivity: 88,
    target: 90,
    metrics: {
      roomsCleaned: 45,
      averageTime: "28 min",
      qualityScore: 96,
      supplies: "efficient",
    },
    topPerformer: "Maria Santos",
    status: "good",
  },
  {
    department: "Food & Beverage",
    staff: 15,
    productivity: 91,
    target: 80,
    metrics: {
      coversServed: 189,
      averageService: "12 min",
      upsells: 23,
      complaints: 0,
    },
    topPerformer: "Carlos Martinez",
    status: "excellent",
  },
  {
    department: "Maintenance",
    staff: 4,
    productivity: 78,
    target: 85,
    metrics: {
      workOrders: 12,
      completionRate: 92,
      responseTime: "15 min",
      preventive: 8,
    },
    topPerformer: "Mike Johnson",
    status: "attention",
  },
  {
    department: "Security",
    staff: 6,
    productivity: 98,
    target: 95,
    metrics: {
      incidents: 1,
      patrols: 24,
      responseTime: "2 min",
      reports: 3,
    },
    topPerformer: "James Rodriguez",
    status: "excellent",
  },
]

const costControlAnalysis = {
  summary: {
    totalBudget: 145000,
    actualSpend: 138200,
    variance: -4.7,
    savingsTarget: 8000,
    actualSavings: 6800,
  },
  categories: [
    {
      category: "Payroll & Benefits",
      budget: 65000,
      actual: 67200,
      variance: 3.4,
      details: { overtime: 4200, benefits: 12800, regular: 50200 },
    },
    {
      category: "Utilities",
      budget: 18000,
      actual: 16800,
      variance: -6.7,
      details: { electricity: 9200, water: 4100, gas: 2800, internet: 700 },
    },
    {
      category: "Food & Beverage Costs",
      budget: 15000,
      actual: 14200,
      variance: -5.3,
      details: { food: 10800, beverages: 2400, supplies: 1000 },
    },
    {
      category: "Maintenance & Repairs",
      budget: 12000,
      actual: 10500,
      variance: -12.5,
      details: { preventive: 6200, reactive: 3100, supplies: 1200 },
    },
    {
      category: "Marketing & Advertising",
      budget: 8000,
      actual: 7200,
      variance: -10.0,
      details: { digital: 4200, print: 1500, events: 1500 },
    },
    {
      category: "Supplies & Amenities",
      budget: 12000,
      actual: 11800,
      variance: -1.7,
      details: { housekeeping: 6800, guest: 3200, office: 1800 },
    },
    {
      category: "Insurance & Legal",
      budget: 8000,
      actual: 7900,
      variance: -1.3,
      details: { property: 4200, liability: 2800, legal: 900 },
    },
    {
      category: "Technology & Systems",
      budget: 7000,
      actual: 6600,
      variance: -5.7,
      details: { software: 3200, hardware: 2100, support: 1300 },
    },
  ],
  trends: {
    monthlyVariance: [-2.1, -3.4, -1.8, -4.7],
    savingsOpportunities: [
      { area: "Energy Efficiency", potential: 2400, effort: "medium" },
      { area: "Vendor Negotiations", potential: 1800, effort: "low" },
      { area: "Process Optimization", potential: 3200, effort: "high" },
      { area: "Technology Automation", potential: 2100, effort: "medium" },
    ],
  },
}

const maintenanceAssetReport = [
  {
    asset: "HVAC System - Main",
    location: "Central Plant",
    condition: "Good",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    priority: "medium",
    cost: 2400,
    efficiency: 92,
    warranty: "Active",
    technician: "Mike Johnson",
  },
  {
    asset: "Elevator A",
    location: "Main Lobby",
    condition: "Excellent",
    lastService: "2024-01-05",
    nextService: "2024-02-05",
    priority: "low",
    cost: 800,
    efficiency: 98,
    warranty: "Active",
    technician: "External Contractor",
  },
  {
    asset: "Pool Filtration System",
    location: "Pool Area",
    condition: "Fair",
    lastService: "2023-12-20",
    nextService: "2024-01-20",
    priority: "high",
    cost: 1200,
    efficiency: 78,
    warranty: "Expired",
    technician: "Pool Specialist",
  },
  {
    asset: "Kitchen Equipment",
    location: "Main Kitchen",
    condition: "Good",
    lastService: "2024-01-08",
    nextService: "2024-03-08",
    priority: "medium",
    cost: 1800,
    efficiency: 89,
    warranty: "Active",
    technician: "Kitchen Tech",
  },
  {
    asset: "Fire Safety System",
    location: "Building Wide",
    condition: "Excellent",
    lastService: "2024-01-12",
    nextService: "2024-07-12",
    priority: "low",
    cost: 3200,
    efficiency: 100,
    warranty: "Active",
    technician: "Fire Safety Co.",
  },
  {
    asset: "Generator",
    location: "Basement",
    condition: "Good",
    lastService: "2024-01-01",
    nextService: "2024-04-01",
    priority: "medium",
    cost: 1500,
    efficiency: 95,
    warranty: "Active",
    technician: "Generator Tech",
  },
]

const forecastingData = {
  nextMonth: {
    occupancy: 78.5,
    adr: 192.0,
    revpar: 150.72,
    revenue: 2850000,
    expenses: 2100000,
    profit: 750000,
  },
  nextQuarter: {
    occupancy: 82.3,
    adr: 188.5,
    revpar: 155.13,
    revenue: 8650000,
    expenses: 6200000,
    profit: 2450000,
  },
  budgetProjections: {
    q1: { budget: 8500000, forecast: 8650000, variance: 1.8 },
    q2: { budget: 9200000, forecast: 9450000, variance: 2.7 },
    q3: { budget: 9800000, forecast: 9650000, variance: -1.5 },
    q4: { budget: 8900000, forecast: 9100000, variance: 2.2 },
  },
  marketConditions: {
    demandForecast: "Strong",
    competitiveActivity: "Moderate",
    seasonalTrends: "Peak Season",
    economicIndicators: "Positive",
  },
}

export default function ManagementReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
                <BreadcrumbPage>Management Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Management Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Management Dashboard</h1>
              <p className="text-lg text-gray-600">Operational performance and departmental analytics</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <Select defaultValue="today">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Alerts (3)
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
            </div>
          </div>

          {/* Daily Flash Report Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="h-6 w-6 mr-2" />
                Daily Flash Report - {dailyFlashReport.date}
              </CardTitle>
              <CardDescription className="text-blue-100">
                Real-time operational metrics and key performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{dailyFlashReport.operationalMetrics.roomsSold}</div>
                  <div className="text-sm text-blue-100">Rooms Sold</div>
                  <div className="text-xs text-blue-200">of {dailyFlashReport.operationalMetrics.totalRooms}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{dailyFlashReport.operationalMetrics.occupancy}%</div>
                  <div className="text-sm text-blue-100">Occupancy</div>
                  <div className="text-xs text-blue-200">+6% vs LY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">${dailyFlashReport.operationalMetrics.adr}</div>
                  <div className="text-sm text-blue-100">ADR</div>
                  <div className="text-xs text-blue-200">+8% vs budget</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">${dailyFlashReport.operationalMetrics.revpar}</div>
                  <div className="text-sm text-blue-100">RevPAR</div>
                  <div className="text-xs text-blue-200">+14% vs LY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    ${(dailyFlashReport.revenueBreakdown.total / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-blue-100">Total Revenue</div>
                  <div className="text-xs text-blue-200">Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{dailyFlashReport.guestMetrics.inHouse}</div>
                  <div className="text-sm text-blue-100">In-House</div>
                  <div className="text-xs text-blue-200">{dailyFlashReport.guestMetrics.vipGuests} VIP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{dailyFlashReport.staffMetrics.productivity}%</div>
                  <div className="text-sm text-blue-100">Staff Efficiency</div>
                  <div className="text-xs text-blue-200">{dailyFlashReport.staffMetrics.onDuty} on duty</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="departments" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="satisfaction">Guest Satisfaction</TabsTrigger>
            <TabsTrigger value="staff">Staff Performance</TabsTrigger>
            <TabsTrigger value="costs">Cost Control</TabsTrigger>
            <TabsTrigger value="maintenance">Assets & Maintenance</TabsTrigger>
            <TabsTrigger value="forecast">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="departments" className="space-y-6">
            {/* Department Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader>
                  <CardTitle className="text-green-100">Revenue Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    $
                    {(
                      dailyFlashReport.revenueBreakdown.rooms +
                      dailyFlashReport.revenueBreakdown.fnb +
                      dailyFlashReport.revenueBreakdown.events
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-100">Total Revenue Today</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="text-blue-100">Operational Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">91%</div>
                  <div className="text-sm text-blue-100">Average Department Score</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="text-purple-100">Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm text-purple-100">Requiring Attention</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Departmental Performance Analysis
                </CardTitle>
                <CardDescription>Comprehensive performance metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentalPerformance.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              dept.status === "excellent"
                                ? "bg-green-100"
                                : dept.status === "good"
                                  ? "bg-blue-100"
                                  : "bg-yellow-100"
                            }`}
                          >
                            <Users
                              className={`h-5 w-5 ${
                                dept.status === "excellent"
                                  ? "text-green-600"
                                  : dept.status === "good"
                                    ? "text-blue-600"
                                    : "text-yellow-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{dept.department}</h3>
                            <p className="text-sm text-gray-600">Manager: {dept.manager}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                          <Badge
                            variant={
                              dept.status === "excellent"
                                ? "default"
                                : dept.status === "good"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {dept.status}
                          </Badge>
                          {dept.alerts > 0 && (
                            <Badge variant="destructive">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {dept.alerts} Alert{dept.alerts > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-sm text-gray-600">{dept.revenue ? "Revenue" : "Cost"}</div>
                          <div className="text-xl font-bold">${(dept.revenue || dept.cost)?.toLocaleString()}</div>
                          <div className={`text-sm ${dept.variance > 0 ? "text-green-600" : "text-red-600"}`}>
                            {dept.variance > 0 ? "+" : ""}
                            {dept.variance}% vs budget
                          </div>
                        </div>

                        {Object.entries(dept.kpis).map(([key, value], kpiIndex) => (
                          <div key={kpiIndex} className="bg-gray-50 p-3 rounded">
                            <div className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="text-lg font-bold">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            {/* Guest Satisfaction Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Overall Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-green-600">{guestSatisfactionData.overall.score}/5</div>
                    <div className="text-sm text-gray-600 mt-2">
                      Based on {guestSatisfactionData.overall.totalReviews} reviews
                    </div>
                    <div className="flex justify-center mt-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 ${
                            star <= Math.floor(guestSatisfactionData.overall.score)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-green-600 font-medium">
                          +{guestSatisfactionData.overall.monthlyChange} this month
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Satisfaction by Category</CardTitle>
                  <CardDescription>Detailed breakdown by service area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guestSatisfactionData.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{category.category}</div>
                          <div className="text-sm text-gray-600">{category.reviews} reviews</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold">{category.score}/5</div>
                            <div className="text-sm text-gray-600">Target: {category.target}</div>
                          </div>
                          <div className="flex items-center">
                            <Progress value={(category.score / 5) * 100} className="w-20 h-2" />
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              category.trend.startsWith("+")
                                ? "text-green-600"
                                : category.trend.startsWith("-")
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {category.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Review Sources and Recent Comments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Sources</CardTitle>
                  <CardDescription>Satisfaction scores by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guestSatisfactionData.sources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="font-medium">{source.platform}</div>
                          <Badge variant="outline">{source.weight}% weight</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className="font-bold">{source.score}/5</div>
                            <div className="text-sm text-gray-600">{source.reviews} reviews</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Guest Comments</CardTitle>
                  <CardDescription>Latest feedback from guests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {guestSatisfactionData.recentComments.map((comment, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{comment.guest}</div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">"{comment.comment}"</p>
                        <div className="text-xs text-gray-500">{comment.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Staff Productivity Analysis
                </CardTitle>
                <CardDescription>Employee performance metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {staffProductivityMetrics.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{dept.department}</h3>
                        <Badge
                          variant={
                            dept.status === "excellent"
                              ? "default"
                              : dept.status === "good"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {dept.status}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Staff Count</span>
                          <span className="font-medium">{dept.staff}</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Productivity</span>
                            <span className="font-medium">{dept.productivity}%</span>
                          </div>
                          <Progress value={dept.productivity} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Target: {dept.target}%</span>
                            <span className={dept.productivity >= dept.target ? "text-green-600" : "text-red-600"}>
                              {dept.productivity >= dept.target ? "Above" : "Below"} Target
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-sm font-medium mb-2">Key Metrics</div>
                          <div className="space-y-1 text-sm">
                            {Object.entries(dept.metrics).map(([key, value], metricIndex) => (
                              <div key={metricIndex} className="flex justify-between">
                                <span className="text-gray-600 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm text-gray-600">Top Performer</span>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium text-sm">{dept.topPerformer}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            {/* Cost Control Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader>
                  <CardTitle className="text-green-100">Budget Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{costControlAnalysis.summary.variance}%</div>
                  <div className="text-sm text-green-100">Under Budget</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="text-blue-100">Total Spend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${costControlAnalysis.summary.actualSpend.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">This Month</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="text-purple-100">Savings Achieved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${costControlAnalysis.summary.actualSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-100">
                    vs Target: ${costControlAnalysis.summary.savingsTarget.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader>
                  <CardTitle className="text-orange-100">Efficiency Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm text-orange-100">Cost Management</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Cost Control Analysis
                </CardTitle>
                <CardDescription>Detailed expense breakdown and variance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Budget</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                      <TableHead className="text-right">Variance %</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costControlAnalysis.categories.map((category, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell className="text-right">${category.budget.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${category.actual.toLocaleString()}</TableCell>
                        <TableCell
                          className={`text-right ${category.variance < 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${Math.abs(category.actual - category.budget).toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={`text-right ${category.variance < 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {category.variance > 0 ? "+" : ""}
                          {category.variance}%
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              Math.abs(category.variance) <= 5
                                ? "default"
                                : Math.abs(category.variance) <= 10
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {Math.abs(category.variance) <= 5
                              ? "On Target"
                              : Math.abs(category.variance) <= 10
                                ? "Monitor"
                                : "Action Required"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Savings Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Savings Opportunities
                </CardTitle>
                <CardDescription>Identified areas for cost optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {costControlAnalysis.trends.savingsOpportunities.map((opportunity, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{opportunity.area}</h4>
                        <Badge
                          variant={
                            opportunity.effort === "low"
                              ? "default"
                              : opportunity.effort === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {opportunity.effort} effort
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        ${opportunity.potential.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Potential annual savings</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Asset Condition & Maintenance Schedule
                </CardTitle>
                <CardDescription>Equipment status, maintenance history, and upcoming services</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Service</TableHead>
                      <TableHead>Next Service</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead className="text-right">Efficiency</TableHead>
                      <TableHead>Warranty</TableHead>
                      <TableHead>Technician</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceAssetReport.map((asset, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{asset.asset}</TableCell>
                        <TableCell>{asset.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              asset.condition === "Excellent"
                                ? "default"
                                : asset.condition === "Good"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {asset.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>{asset.lastService}</TableCell>
                        <TableCell>{asset.nextService}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              asset.priority === "high"
                                ? "destructive"
                                : asset.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {asset.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${asset.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center space-x-2">
                            <span>{asset.efficiency}%</span>
                            <Progress value={asset.efficiency} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={asset.warranty === "Active" ? "default" : "destructive"}>
                            {asset.warranty}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{asset.technician}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            {/* Forecasting Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Next Month Forecast
                  </CardTitle>
                  <CardDescription>Performance predictions for upcoming month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{forecastingData.nextMonth.occupancy}%</div>
                        <div className="text-sm text-gray-600">Occupancy</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">${forecastingData.nextMonth.adr}</div>
                        <div className="text-sm text-gray-600">ADR</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">${forecastingData.nextMonth.revpar}</div>
                        <div className="text-sm text-gray-600">RevPAR</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Revenue Forecast</span>
                        <span className="font-bold">${(forecastingData.nextMonth.revenue / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Expenses Forecast</span>
                        <span className="font-bold">${(forecastingData.nextMonth.expenses / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Profit Forecast</span>
                        <span className="font-bold text-green-600">
                          ${(forecastingData.nextMonth.profit / 1000).toLocaleString()}K
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Quarterly Projections
                  </CardTitle>
                  <CardDescription>Next quarter performance outlook</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{forecastingData.nextQuarter.occupancy}%</div>
                        <div className="text-sm text-gray-600">Avg Occupancy</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">${forecastingData.nextQuarter.adr}</div>
                        <div className="text-sm text-gray-600">Avg ADR</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">${forecastingData.nextQuarter.revpar}</div>
                        <div className="text-sm text-gray-600">Avg RevPAR</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Revenue Forecast</span>
                        <span className="font-bold">
                          ${(forecastingData.nextQuarter.revenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Expenses Forecast</span>
                        <span className="font-bold">
                          ${(forecastingData.nextQuarter.expenses / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Profit Forecast</span>
                        <span className="font-bold text-green-600">
                          ${(forecastingData.nextQuarter.profit / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Budget Projections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Budget vs Forecast Analysis
                </CardTitle>
                <CardDescription>Quarterly budget performance projections</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead className="text-right">Budget</TableHead>
                      <TableHead className="text-right">Forecast</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                      <TableHead className="text-right">Variance %</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(forecastingData.budgetProjections).map(([quarter, data], index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{quarter.toUpperCase()}</TableCell>
                        <TableCell className="text-right">${(data.budget / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-right">${(data.forecast / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className={`text-right ${data.variance > 0 ? "text-green-600" : "text-red-600"}`}>
                          ${Math.abs(data.forecast - data.budget).toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right ${data.variance > 0 ? "text-green-600" : "text-red-600"}`}>
                          {data.variance > 0 ? "+" : ""}
                          {data.variance}%
                        </TableCell>
                        <TableCell>
                          <Badge variant={data.variance > 0 ? "default" : "destructive"}>
                            {data.variance > 0 ? "Above Budget" : "Below Budget"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Market Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Market Conditions & Outlook
                </CardTitle>
                <CardDescription>External factors affecting forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(forecastingData.marketConditions).map(([key, value], index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                      <div
                        className={`text-2xl font-bold mt-2 ${
                          value === "Strong" || value === "Positive"
                            ? "text-green-600"
                            : value === "Moderate"
                              ? "text-blue-600"
                              : "text-gray-600"
                        }`}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
