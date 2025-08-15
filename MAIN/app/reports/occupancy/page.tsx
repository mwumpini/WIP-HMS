"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Download, Filter, RefreshCw } from "lucide-react"
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
import { OccupancyChart } from "@/components/occupancy-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OccupancyReportsPage() {
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
              <BreadcrumbItem>
                <BreadcrumbPage>Occupancy Analysis</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Occupancy Analysis</h1>
              <p className="mt-2 text-sm text-gray-600">
                Comprehensive occupancy reports and analytics for strategic decision making
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Select defaultValue="30days">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Current Status Overview
                </CardTitle>
                <CardDescription>Real-time occupancy metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-gray-600">Current Occupancy</div>
                    <Badge variant="default" className="mt-2">
                      Excellent
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$150</div>
                    <div className="text-sm text-gray-600">Average Daily Rate</div>
                    <Badge variant="secondary" className="mt-2">
                      Stable
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">$134</div>
                    <div className="text-sm text-gray-600">Revenue per Room</div>
                    <Badge variant="default" className="mt-2">
                      Strong
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">2.3</div>
                    <div className="text-sm text-gray-600">Average Length of Stay</div>
                    <Badge variant="outline" className="mt-2">
                      Normal
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Occupancy Charts */}
          <OccupancyChart />

          {/* Additional Insights */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered recommendations based on occupancy patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-blue-900">Peak Performance</p>
                    <p className="text-sm text-blue-700">
                      Weekends show 15% higher occupancy. Consider dynamic pricing for Friday-Sunday.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-green-900">Revenue Opportunity</p>
                    <p className="text-sm text-green-700">
                      Deluxe suites have highest occupancy (92%). Consider rate optimization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-yellow-900">Booking Pattern</p>
                    <p className="text-sm text-yellow-700">
                      40% bookings from OTAs. Focus on direct booking incentives.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forecast & Trends</CardTitle>
                <CardDescription>Predicted occupancy for the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Next 7 Days</p>
                      <p className="text-sm text-gray-600">Jan 16 - Jan 22</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">92%</div>
                      <Badge variant="default">High Demand</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Next 14 Days</p>
                      <p className="text-sm text-gray-600">Jan 16 - Jan 29</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">87%</div>
                      <Badge variant="secondary">Good</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Next 30 Days</p>
                      <p className="text-sm text-gray-600">Jan 16 - Feb 14</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">84%</div>
                      <Badge variant="outline">Moderate</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
