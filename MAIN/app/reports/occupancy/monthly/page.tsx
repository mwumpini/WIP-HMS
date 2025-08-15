"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer, RefreshCw, TrendingUp, Users, DollarSign } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

const monthlyOccupancyData = {
  hotelName: "Noda Hotel",
  month: "July 2025",
  preparedBy: "Revenue Manager",
  metrics: {
    current: {
      totalRoomsAvailable: 2418,
      roomsSold: 1765,
      occupancyPercentage: 73,
      adr: 720,
      revpar: 525.6,
      roomRevenue: 1270800,
      noShows: 35,
      cancellations: 25,
    },
    previous: {
      totalRoomsAvailable: 2340,
      roomsSold: 1620,
      occupancyPercentage: 69,
      adr: 700,
      revpar: 483,
      roomRevenue: 1134000,
      noShows: 40,
      cancellations: 18,
    },
    yearAgo: {
      totalRoomsAvailable: 2418,
      roomsSold: 1720,
      occupancyPercentage: 71,
      adr: 680,
      revpar: 482.8,
      roomRevenue: 1169600,
      noShows: 32,
      cancellations: 21,
    },
  },
  guestSegments: [
    { segment: "Corporate", percentage: 52, rooms: 918, revenue: 660960 },
    { segment: "Leisure", percentage: 38, rooms: 671, revenue: 483120 },
    { segment: "Group/Events", percentage: 10, rooms: 176, revenue: 126720 },
  ],
  highlights: [
    "Strong corporate demand due to mid-year business reviews in Kumasi",
    "ADR improvement driven by premium room sales",
    "Need to address higher cancellation rates; consider stricter policy",
    "Weekend occupancy consistently above 85%",
  ],
  weeklyBreakdown: [
    { week: "Week 1", occupancy: 68, adr: 710, revpar: 482.8 },
    { week: "Week 2", occupancy: 75, adr: 720, revpar: 540.0 },
    { week: "Week 3", occupancy: 78, adr: 730, revpar: 569.4 },
    { week: "Week 4", occupancy: 71, adr: 720, revpar: 511.2 },
  ],
}

export default function MonthlyOccupancyReportPage() {
  const calculateChange = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  const calculateYoYChange = (current: number, yearAgo: number) => {
    return (((current - yearAgo) / yearAgo) * 100).toFixed(1)
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
                <BreadcrumbPage>Monthly Report</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold text-gray-900">Monthly Occupancy Report</h1>
              <p className="mt-2 text-sm text-gray-600">
                {monthlyOccupancyData.hotelName} - {monthlyOccupancyData.month}
              </p>
              <p className="text-sm text-gray-500">Prepared by: {monthlyOccupancyData.preparedBy}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Select defaultValue="july2025">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="july2025">July 2025</SelectItem>
                  <SelectItem value="june2025">June 2025</SelectItem>
                  <SelectItem value="may2025">May 2025</SelectItem>
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

          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {monthlyOccupancyData.metrics.current.occupancyPercentage}%
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">
                    +
                    {calculateChange(
                      monthlyOccupancyData.metrics.current.occupancyPercentage,
                      monthlyOccupancyData.metrics.previous.occupancyPercentage,
                    )}
                    %
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  YoY: +
                  {calculateYoYChange(
                    monthlyOccupancyData.metrics.current.occupancyPercentage,
                    monthlyOccupancyData.metrics.yearAgo.occupancyPercentage,
                  )}
                  %
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ADR</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">GHC {monthlyOccupancyData.metrics.current.adr}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">
                    +
                    {calculateChange(
                      monthlyOccupancyData.metrics.current.adr,
                      monthlyOccupancyData.metrics.previous.adr,
                    )}
                    %
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  YoY: +
                  {calculateYoYChange(
                    monthlyOccupancyData.metrics.current.adr,
                    monthlyOccupancyData.metrics.yearAgo.adr,
                  )}
                  %
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  GHC {monthlyOccupancyData.metrics.current.revpar}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">
                    +
                    {calculateChange(
                      monthlyOccupancyData.metrics.current.revpar,
                      monthlyOccupancyData.metrics.previous.revpar,
                    )}
                    %
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  YoY: +
                  {calculateYoYChange(
                    monthlyOccupancyData.metrics.current.revpar,
                    monthlyOccupancyData.metrics.yearAgo.revpar,
                  )}
                  %
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Room Revenue</CardTitle>
                <Users className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  GHC {(monthlyOccupancyData.metrics.current.roomRevenue / 1000000).toFixed(2)}M
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">
                    +
                    {calculateChange(
                      monthlyOccupancyData.metrics.current.roomRevenue,
                      monthlyOccupancyData.metrics.previous.roomRevenue,
                    )}
                    %
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  YoY: +
                  {calculateYoYChange(
                    monthlyOccupancyData.metrics.current.roomRevenue,
                    monthlyOccupancyData.metrics.yearAgo.roomRevenue,
                  )}
                  %
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Monthly Performance Comparison</CardTitle>
              <CardDescription>Detailed metrics comparison across periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-right py-3 px-4 font-medium">July 2025</th>
                      <th className="text-right py-3 px-4 font-medium">June 2025</th>
                      <th className="text-right py-3 px-4 font-medium">July 2024</th>
                      <th className="text-right py-3 px-4 font-medium">% Change YoY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Total Rooms Available</td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.current.totalRoomsAvailable.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.previous.totalRoomsAvailable.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.yearAgo.totalRoomsAvailable.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">0%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Rooms Sold</td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.current.roomsSold.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.previous.roomsSold.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.yearAgo.roomsSold.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+2.6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Occupancy Percentage</td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.current.occupancyPercentage}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.previous.occupancyPercentage}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {monthlyOccupancyData.metrics.yearAgo.occupancyPercentage}%
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+2%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">ADR</td>
                      <td className="text-right py-3 px-4">GHC {monthlyOccupancyData.metrics.current.adr}</td>
                      <td className="text-right py-3 px-4">GHC {monthlyOccupancyData.metrics.previous.adr}</td>
                      <td className="text-right py-3 px-4">GHC {monthlyOccupancyData.metrics.yearAgo.adr}</td>
                      <td className="text-right py-3 px-4 text-green-600">+5.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">RevPAR</td>
                      <td className="text-right py-3 px-4">GHC {monthlyOccupancyData.metrics.current.revpar}</td>
                      <td className="text-right py-3 px-4">GHC {monthlyOccupancyData.metrics.previous.revpar}</td>
                      <td className="text-right py-3 px-4">GHC {monthlyOccupancyData.metrics.yearAgo.revpar}</td>
                      <td className="text-right py-3 px-4 text-green-600">+8.9%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Room Revenue</td>
                      <td className="text-right py-3 px-4">
                        GHC {monthlyOccupancyData.metrics.current.roomRevenue.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        GHC {monthlyOccupancyData.metrics.previous.roomRevenue.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        GHC {monthlyOccupancyData.metrics.yearAgo.roomRevenue.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-green-600">+8.6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">No-Shows</td>
                      <td className="text-right py-3 px-4">{monthlyOccupancyData.metrics.current.noShows}</td>
                      <td className="text-right py-3 px-4">{monthlyOccupancyData.metrics.previous.noShows}</td>
                      <td className="text-right py-3 px-4">{monthlyOccupancyData.metrics.yearAgo.noShows}</td>
                      <td className="text-right py-3 px-4 text-red-600">+9%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Cancellations</td>
                      <td className="text-right py-3 px-4">{monthlyOccupancyData.metrics.current.cancellations}</td>
                      <td className="text-right py-3 px-4">{monthlyOccupancyData.metrics.previous.cancellations}</td>
                      <td className="text-right py-3 px-4">{monthlyOccupancyData.metrics.yearAgo.cancellations}</td>
                      <td className="text-right py-3 px-4 text-red-600">+19%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Guest Segment Analysis & Weekly Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Guest Segment Breakdown (July 2025)</CardTitle>
                <CardDescription>Revenue and occupancy by guest type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyOccupancyData.guestSegments.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{segment.segment}</span>
                        <span className="text-sm font-bold">{segment.percentage}%</span>
                      </div>
                      <Progress value={segment.percentage} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{segment.rooms} rooms</span>
                        <span>GHC {segment.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Breakdown</CardTitle>
                <CardDescription>Week-by-week analysis for July 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyOccupancyData.weeklyBreakdown.map((week, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{week.week}</p>
                        <p className="text-sm text-gray-600">Occupancy: {week.occupancy}%</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">GHC {week.revpar}</p>
                        <p className="text-sm text-gray-600">RevPAR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Highlights & Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Highlights & Key Insights</CardTitle>
              <CardDescription>Important observations and recommended actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyOccupancyData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-900">{highlight}</p>
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
