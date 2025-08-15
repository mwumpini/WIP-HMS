"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, RefreshCw, TrendingUp } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const annualOccupancyData = {
  hotelName: "Noda Hotel",
  period: "Jan – July 2025",
  preparedBy: "General Manager",
  metrics: {
    current: {
      totalRoomsAvailable: 16940,
      roomsSold: 12150,
      occupancyPercentage: 71.7,
      adr: 735,
      revpar: 526.4,
      roomRevenue: 8930250,
      gop: 5560000,
      guestNights: 18700,
      averageLengthOfStay: 1.54,
    },
    yearAgo: {
      totalRoomsAvailable: 16940,
      roomsSold: 11620,
      occupancyPercentage: 68.6,
      adr: 700,
      revpar: 480.2,
      roomRevenue: 8134000,
      gop: 5012000,
      guestNights: 18050,
      averageLengthOfStay: 1.55,
    },
  },
  monthlyTrends: [
    { month: "January", occupancy: 68.5, adr: 720, revpar: 493.2, revenue: 1245000 },
    { month: "February", occupancy: 72.1, adr: 730, revpar: 526.33, revenue: 1180000 },
    { month: "March", occupancy: 75.3, adr: 740, revpar: 557.22, revenue: 1350000 },
    { month: "April", occupancy: 69.8, adr: 735, revpar: 513.03, revenue: 1280000 },
    { month: "May", occupancy: 73.2, adr: 745, revpar: 545.34, revenue: 1385000 },
    { month: "June", occupancy: 69.0, adr: 700, revpar: 483.0, revenue: 1220000 },
    { month: "July", occupancy: 73.0, adr: 720, revpar: 525.6, revenue: 1270250 },
  ],
  trendNotes: [
    "Overall occupancy growth driven by higher conference and business travel in Kumasi",
    "ADR improvement from upselling suites and premium rooms",
    "Stable length of stay; consider packages to increase stays beyond 2 nights",
    "Strong performance in Q1 and Q2, slight dip in June due to seasonal factors",
  ],
  quarterlyComparison: [
    { quarter: "Q1 2025", occupancy: 72.0, adr: 730, revpar: 525.6, revenue: 3775000 },
    { quarter: "Q2 2025", occupancy: 70.7, adr: 727, revpar: 513.99, revenue: 3885000 },
    { quarter: "Q3 2025 (Jul)", occupancy: 73.0, adr: 720, revpar: 525.6, revenue: 1270250 },
  ],
  keyAchievements: [
    { metric: "Occupancy Growth", value: "+3.1%", description: "Year-over-year improvement" },
    { metric: "ADR Increase", value: "+5%", description: "Premium positioning success" },
    { metric: "RevPAR Growth", value: "+9.6%", description: "Strong revenue performance" },
    { metric: "GOP Improvement", value: "+10.9%", description: "Operational efficiency gains" },
  ],
}

export default function AnnualOccupancyReportPage() {
  const calculateChange = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1)
  }

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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/reports/occupancy">Occupancy</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Annual Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Year-to-Date / Annual Occupancy Report</h1>
              <p className="mt-2 text-sm text-gray-600">
                {annualOccupancyData.hotelName} - {annualOccupancyData.period}
              </p>
              <p className="text-sm text-gray-500">Prepared by: {annualOccupancyData.preparedBy}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Select defaultValue="ytd2025">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ytd2025">YTD 2025</SelectItem>
                  <SelectItem value="full2024">Full Year 2024</SelectItem>
                  <SelectItem value="full2023">Full Year 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {annualOccupancyData.keyAchievements.map((achievement, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{achievement.metric}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{achievement.value}</div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Annual Performance Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Annual Performance Overview</CardTitle>
              <CardDescription>Year-to-date performance compared to previous year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-right py-3 px-4 font-medium">2025 YTD</th>
                      <th className="text-right py-3 px-4 font-medium">2024 YTD</th>
                      <th className="text-right py-3 px-4 font-medium">% Change YoY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Total Rooms Available</td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.current.totalRoomsAvailable.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.yearAgo.totalRoomsAvailable.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">0%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Rooms Sold</td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.current.roomsSold.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.yearAgo.roomsSold.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+4.6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Occupancy Percentage</td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.current.occupancyPercentage}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.yearAgo.occupancyPercentage}%
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+3.1%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">ADR (Average Daily Rate)</td>
                      <td className="text-right py-3 px-4">GHC {annualOccupancyData.metrics.current.adr}</td>
                      <td className="text-right py-3 px-4">GHC {annualOccupancyData.metrics.yearAgo.adr}</td>
                      <td className="text-right py-3 px-4 text-green-600">+5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">RevPAR</td>
                      <td className="text-right py-3 px-4">GHC {annualOccupancyData.metrics.current.revpar}</td>
                      <td className="text-right py-3 px-4">GHC {annualOccupancyData.metrics.yearAgo.revpar}</td>
                      <td className="text-right py-3 px-4 text-green-600">+9.6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Room Revenue</td>
                      <td className="text-right py-3 px-4">
                        GHC {annualOccupancyData.metrics.current.roomRevenue.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        GHC {annualOccupancyData.metrics.yearAgo.roomRevenue.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+9.8%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">GOP (Gross Operating Profit)</td>
                      <td className="text-right py-3 px-4">
                        GHC {annualOccupancyData.metrics.current.gop.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        GHC {annualOccupancyData.metrics.yearAgo.gop.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+10.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Guest Nights</td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.current.guestNights.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.yearAgo.guestNights.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+3.6%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Average Length of Stay</td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.current.averageLengthOfStay} nights
                      </td>
                      <td className="text-right py-3 px-4">
                        {annualOccupancyData.metrics.yearAgo.averageLengthOfStay} nights
                      </td>
                      <td className="text-right py-3 px-4 text-red-600">-0.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends & Quarterly Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Month-by-month breakdown for 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {annualOccupancyData.monthlyTrends.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{month.month}</p>
                        <p className="text-sm text-gray-600">Occupancy: {month.occupancy}%</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">GHC {month.revpar}</p>
                        <p className="text-sm text-gray-600">RevPAR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance</CardTitle>
                <CardDescription>Quarterly comparison and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {annualOccupancyData.quarterlyComparison.map((quarter, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{quarter.quarter}</h4>
                        <Badge variant={quarter.occupancy >= 72 ? "default" : "secondary"}>{quarter.occupancy}%</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">ADR</p>
                          <p className="font-medium">GHC {quarter.adr}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">RevPAR</p>
                          <p className="font-medium">GHC {quarter.revpar}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-medium">GHC {(quarter.revenue / 1000000).toFixed(1)}M</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Key Performance Insights</CardTitle>
              <CardDescription>Strategic observations and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Positive Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">Revenue Growth</p>
                        <p className="text-sm text-green-700">9.8% increase in room revenue YoY</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">ADR Improvement</p>
                        <p className="text-sm text-green-700">5% increase in average daily rate</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">Operational Efficiency</p>
                        <p className="text-sm text-green-700">10.9% improvement in GOP</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Areas for Improvement</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-yellow-900">Length of Stay</p>
                        <p className="text-sm text-yellow-700">Slight decrease in average stay duration</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-yellow-900">Seasonal Variations</p>
                        <p className="text-sm text-yellow-700">June showed lower performance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-yellow-900">Market Penetration</p>
                        <p className="text-sm text-yellow-700">Opportunity for weekend package deals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Observations</CardTitle>
              <CardDescription>Key insights and recommendations for continued growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {annualOccupancyData.trendNotes.map((note, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-900">{note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
