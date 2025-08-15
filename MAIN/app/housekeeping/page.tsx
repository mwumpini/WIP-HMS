"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Sparkles,
  Wrench,
  Users,
  Package,
  CheckSquare,
  AlertTriangle,
  Clock,
  TrendingUp,
  CheckCircle,
  Timer,
  Calendar,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

export default function HousekeepingDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveMetrics, setLiveMetrics] = useState({
    roomsCleaned: 28,
    roomsPending: 12,
    maintenanceOrders: 5,
    staffOnDuty: 8,
    suppliesLow: 3,
    inspectionsPassed: 45,
    avgCleaningTime: 35,
    efficiency: 92,
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const housekeepingStats = useMemo(
    () => ({
      totalRooms: liveMetrics.roomsCleaned + liveMetrics.roomsPending,
      completionRate: Math.round(
        (liveMetrics.roomsCleaned / (liveMetrics.roomsCleaned + liveMetrics.roomsPending)) * 100,
      ),
      urgentMaintenanceCount: 2,
      staffUtilization: Math.round((liveMetrics.staffOnDuty / 10) * 100),
    }),
    [liveMetrics],
  )

  const updateMetrics = useCallback(() => {
    try {
      setCurrentTime(new Date())
      setLiveMetrics((prev) => ({
        ...prev,
        roomsCleaned: Math.min(50, prev.roomsCleaned + Math.floor(Math.random() * 2)),
        roomsPending: Math.max(0, prev.roomsPending - Math.floor(Math.random() * 2)),
        efficiency: Math.min(100, prev.efficiency + Math.floor(Math.random() * 2) - 1),
      }))
    } catch (err) {
      setError("Failed to update metrics. Please refresh the page.")
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(updateMetrics, 45000)
    return () => clearInterval(timer)
  }, [updateMetrics])

  const handleSupplyAlert = useCallback(async (alertType) => {
    try {
      setIsLoading(true)
      setError(null)
      // Simulate API call for handling supply alerts
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`[v0] Handling supply alert: ${alertType}`)
    } catch (err) {
      setError(`Failed to process ${alertType} alert. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/housekeeping">Housekeeping & Maintenance</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-3 px-4">
          <Button
            variant="outline"
            size="sm"
            className="relative bg-transparent"
            onClick={() => handleSupplyAlert("inventory")}
            disabled={isLoading}
            aria-label={`Supply alerts: ${liveMetrics.suppliesLow} items need attention`}
          >
            <AlertTriangle className="w-4 h-4" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-orange-500">
              {liveMetrics.suppliesLow}
            </Badge>
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Day Shift Active
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            <Clock className="w-3 h-3 mr-1" />
            <time dateTime={currentTime.toISOString()}>{currentTime.toLocaleTimeString()}</time>
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8" role="main">
        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Housekeeping & Maintenance Operations</h1>
              <p className="text-sm sm:text-base text-gray-600">Real-time facility management and room operations</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />
                {liveMetrics.efficiency}% Efficiency
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Users className="w-3 h-3 mr-1" aria-hidden="true" />
                {liveMetrics.staffOnDuty} Staff On Duty
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Timer className="w-3 h-3 mr-1" aria-hidden="true" />
                {liveMetrics.avgCleaningTime} min avg
              </Badge>
            </div>
          </div>

          <section
            aria-label="Housekeeping Metrics"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Rooms Cleaned</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.roomsCleaned}</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
                      +5 since morning
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-200">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${housekeepingStats.completionRate}%` }}
                    aria-label={`${housekeepingStats.completionRate}% completion rate`}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Rooms</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.roomsPending}</p>
                    <p className="text-xs text-blue-600 mt-1">In progress: 6</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
                  <div className="h-full w-1/2 bg-blue-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Maintenance Orders</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.maintenanceOrders}</p>
                    <p className="text-xs text-orange-600 mt-1">{housekeepingStats.urgentMaintenanceCount} urgent</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-200">
                  <div className="h-full w-1/3 bg-orange-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Staff Efficiency</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.efficiency}%</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
                      Above target
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-200">
                  <div
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${liveMetrics.efficiency}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm">Common housekeeping operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/housekeeping/rooms">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Room Status
                </Button>
              </Link>
              <Link href="/housekeeping/maintenance/orders">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Wrench className="mr-2 h-4 w-4" />
                  Create Work Order
                </Button>
              </Link>
              <Link href="/housekeeping/staff/tasks">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Assign Tasks
                </Button>
              </Link>
              <Link href="/housekeeping/inventory">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Check Inventory
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Housekeeping Modules */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Housekeeping & Maintenance Modules</CardTitle>
              <CardDescription className="text-sm">Access all facility management features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <Link
                  href="/housekeeping/rooms"
                  className="flex flex-col items-center p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Room Management - Cleaning and Status"
                >
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Room Management</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Cleaning & Status</span>
                </Link>

                <Link
                  href="/housekeeping/maintenance"
                  className="flex flex-col items-center p-3 sm:p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Maintenance - Work Orders"
                >
                  <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Maintenance</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Work Orders</span>
                </Link>

                <Link
                  href="/housekeeping/staff"
                  className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Staff Management - Scheduling and Tasks"
                >
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Staff Management</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Scheduling & Tasks</span>
                </Link>

                <Link
                  href="/housekeeping/inventory"
                  className="flex flex-col items-center p-3 sm:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Inventory - Supplies and Equipment"
                >
                  <Package className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Inventory</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Supplies & Equipment</span>
                </Link>

                <Link
                  href="/housekeeping/inspections"
                  className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Inspections - Quality Control"
                >
                  <CheckSquare className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Inspections</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Quality Control</span>
                </Link>

                <Link
                  href="/housekeeping/reports"
                  className="flex flex-col items-center p-3 sm:p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Reports - Analytics and Metrics"
                >
                  <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Reports</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Analytics & Metrics</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Active Work Orders */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Wrench className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Active Work Orders
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.maintenanceOrders} Active
                </Badge>
              </div>
              <CardDescription className="text-sm">Current maintenance requests and repairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Room 205 - AC Not Working</p>
                    <p className="text-xs text-red-700 truncate">Reported by guest, needs immediate attention</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="destructive" className="mb-1 text-xs">
                      Urgent
                    </Badge>
                    <p className="text-xs text-red-600">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Lobby - Light Fixture Replacement</p>
                    <p className="text-xs text-yellow-700 truncate">Scheduled maintenance, parts ordered</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-yellow-300 text-xs">
                      In Progress
                    </Badge>
                    <p className="text-xs text-yellow-600">Started 1h ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Room 108 - Plumbing Check</p>
                    <p className="text-xs text-blue-700 truncate">Preventive maintenance scheduled</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-blue-300 text-xs">
                      Scheduled
                    </Badge>
                    <p className="text-xs text-blue-600">Tomorrow 9 AM</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/housekeeping/maintenance/orders">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Wrench className="mr-2 h-4 w-4" />
                    Manage Work Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Room Cleaning Status */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Room Cleaning Status
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.roomsPending} Pending
                </Badge>
              </div>
              <CardDescription className="text-sm">Current room cleaning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Rooms 101-110</p>
                    <p className="text-xs text-green-700 truncate">Standard cleaning completed</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Complete
                    </Badge>
                    <p className="text-xs text-green-600">10 rooms</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Rooms 201-206</p>
                    <p className="text-xs text-blue-700 truncate">Currently being cleaned</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-blue-300 text-xs">
                      In Progress
                    </Badge>
                    <p className="text-xs text-blue-600">6 rooms</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Rooms 301-306</p>
                    <p className="text-xs text-yellow-700 truncate">Awaiting checkout, then cleaning</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-yellow-300 text-xs">
                      Pending
                    </Badge>
                    <p className="text-xs text-yellow-600">6 rooms</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/housekeeping/rooms">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Sparkles className="mr-2 h-4 w-4" />
                    View Room Status
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Supply Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Supply Alerts
              </CardTitle>
              <CardDescription className="text-sm">Low stock and inventory warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Toilet Paper - Critical Low</p>
                    <p className="text-xs text-red-700">Only 5 rolls remaining. Reorder immediately.</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Critical
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Towels - Running Low</p>
                    <p className="text-xs text-yellow-700">15 clean towels available. Laundry in progress.</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-300 text-xs">
                    Low Stock
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-orange-900 text-sm">Cleaning Supplies - Reorder</p>
                    <p className="text-xs text-orange-700">All-purpose cleaner needs restocking.</p>
                  </div>
                  <Badge variant="outline" className="border-orange-300 text-xs">
                    Reorder
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/housekeeping/inventory">
                  <Button variant="outline" className="w-full bg-transparent text-sm" disabled={isLoading}>
                    <Package className="mr-2 h-4 w-4" />
                    {isLoading ? "Processing..." : "Manage Inventory"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Staff Performance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Staff Performance
              </CardTitle>
              <CardDescription className="text-sm">Team efficiency and task completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Housekeeping Team A</p>
                    <p className="text-xs text-green-700">4 staff, 12 rooms cleaned today</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-green-300 text-xs mb-1">
                      Excellent
                    </Badge>
                    <p className="text-xs text-green-600">98% efficiency</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Maintenance Team</p>
                    <p className="text-xs text-blue-700">2 staff, 3 work orders completed</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-300 text-xs mb-1">
                      Good
                    </Badge>
                    <p className="text-xs text-blue-600">85% efficiency</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-purple-900 text-sm">Housekeeping Team B</p>
                    <p className="text-xs text-purple-700">2 staff, 8 rooms cleaned today</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-purple-300 text-xs mb-1">
                      Good
                    </Badge>
                    <p className="text-xs text-purple-600">92% efficiency</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/housekeeping/staff">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Staff Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
