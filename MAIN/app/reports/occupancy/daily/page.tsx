"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Printer, RefreshCw, TrendingUp } from "lucide-react"
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

const dailyOccupancyData = {
  hotelName: "Noda Hotel",
  date: "10 August 2025",
  preparedBy: "Front Office Manager",
  metrics: {
    totalRooms: 80,
    roomsOutOfOrder: 2,
    roomsAvailableForSale: 78,
    roomsSold: 62,
    complimentaryRooms: 1,
    occupancyPercentage: 79.5,
    adr: 750, // GHC
    revpar: 596.25, // GHC
    noShows: 2,
    cancellations: 1,
    forecastTomorrow: 68,
  },
  notes: [
    "High corporate bookings today due to conference in Kumasi",
    "Group booking of 10 rooms arriving tomorrow; housekeeping to prepare early",
    "VIP guest in Presidential Suite - complimentary upgrade",
    "Two no-shows from online bookings - follow up required",
  ],
  roomTypeBreakdown: [
    { type: "Standard", total: 40, sold: 32, occupancy: 80, adr: 650 },
    { type: "Deluxe", total: 25, sold: 20, occupancy: 80, adr: 750 },
    { type: "Suite", total: 12, sold: 8, occupancy: 67, adr: 950 },
    { type: "Presidential", total: 3, sold: 2, occupancy: 67, adr: 1200 },
  ],
  hourlyArrivals: [
    { time: "12:00-14:00", arrivals: 8, departures: 12 },
    { time: "14:00-16:00", arrivals: 15, departures: 8 },
    { time: "16:00-18:00", arrivals: 22, departures: 3 },
    { time: "18:00-20:00", arrivals: 12, departures: 1 },
    { time: "20:00-22:00", arrivals: 5, departures: 0 },
  ],
}

export default function DailyOccupancyReportPage() {
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
                <BreadcrumbPage>Daily Report</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold text-gray-900">Daily Occupancy Report</h1>
              <p className="mt-2 text-sm text-gray-600">
                {dailyOccupancyData.hotelName} - {dailyOccupancyData.date}
              </p>
              <p className="text-sm text-gray-500">Prepared by: {dailyOccupancyData.preparedBy}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Select defaultValue="today">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {dailyOccupancyData.metrics.occupancyPercentage}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {dailyOccupancyData.metrics.roomsSold} of {dailyOccupancyData.metrics.roomsAvailableForSale} rooms
                  sold
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ADR (Average Daily Rate)</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">GHC {dailyOccupancyData.metrics.adr}</div>
                <p className="text-xs text-muted-foreground">+5.2% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">GHC {dailyOccupancyData.metrics.revpar}</div>
                <p className="text-xs text-muted-foreground">Revenue per Available Room</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tomorrow's Forecast</CardTitle>
                <Calendar className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{dailyOccupancyData.metrics.forecastTomorrow}</div>
                <p className="text-xs text-muted-foreground">Rooms expected to be sold</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Room Inventory & Sales</CardTitle>
                <CardDescription>Detailed breakdown of room availability and sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Total Rooms</span>
                    <span className="text-lg font-bold">{dailyOccupancyData.metrics.totalRooms}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Rooms Out of Order (OOO)</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-600">
                        {dailyOccupancyData.metrics.roomsOutOfOrder}
                      </span>
                      <p className="text-xs text-gray-500">Plumbing maintenance</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Rooms Available for Sale</span>
                    <span className="text-lg font-bold text-green-600">
                      {dailyOccupancyData.metrics.roomsAvailableForSale}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Rooms Sold</span>
                    <span className="text-lg font-bold text-blue-600">{dailyOccupancyData.metrics.roomsSold}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Complimentary Rooms</span>
                    <div className="text-right">
                      <span className="text-lg font-bold">{dailyOccupancyData.metrics.complimentaryRooms}</span>
                      <p className="text-xs text-gray-500">VIP guest</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>No-Shows</span>
                    <span className="text-lg font-bold text-yellow-600">{dailyOccupancyData.metrics.noShows}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Cancellations</span>
                    <span className="text-lg font-bold text-red-600">{dailyOccupancyData.metrics.cancellations}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Type Performance</CardTitle>
                <CardDescription>Occupancy breakdown by room category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyOccupancyData.roomTypeBreakdown.map((room, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{room.type}</p>
                        <p className="text-sm text-gray-600">
                          {room.sold}/{room.total} rooms
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={room.occupancy >= 80 ? "default" : "secondary"}>{room.occupancy}%</Badge>
                        <p className="text-sm text-gray-600 mt-1">GHC {room.adr}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Activity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Hourly Check-in/Check-out Activity</CardTitle>
              <CardDescription>Guest arrival and departure patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {dailyOccupancyData.hourlyArrivals.map((hour, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <div className="font-medium text-sm text-gray-600 mb-2">{hour.time}</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{hour.arrivals}</div>
                        <div className="text-xs text-gray-500">Arrivals</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{hour.departures}</div>
                        <div className="text-xs text-gray-500">Departures</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes & Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Summary & Notes</CardTitle>
              <CardDescription>Important observations and action items for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyOccupancyData.notes.map((note, index) => (
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
