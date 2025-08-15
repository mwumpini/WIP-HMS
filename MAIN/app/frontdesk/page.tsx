"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Hotel,
  UserCheck,
  UserX,
  Users,
  Bed,
  DollarSign,
  CheckCircle,
  Bell,
  TrendingUp,
  Clock,
  MapPin,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

interface LiveMetrics {
  occupancy: number
  totalRooms: number
  checkInsToday: number
  checkOutsToday: number
  revenue: number
  avgRate: number
  walkIns: number
  vipGuests: number
}

interface Notification {
  id: number
  type: "room-service" | "housekeeping" | "security" | "maintenance"
  message: string
  details: string
  timestamp: Date
  priority: "low" | "normal" | "medium" | "high"
}

export default function FrontDeskDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    occupancy: 42,
    totalRooms: 50,
    checkInsToday: 8,
    checkOutsToday: 5,
    revenue: 15750,
    avgRate: 375,
    walkIns: 3,
    vipGuests: 4,
  })

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "room-service",
      message: "Room service order for Room 205",
      details: "Order total: GH₵85, Est. delivery: 2:30 PM",
      timestamp: new Date(Date.now() - 300000),
      priority: "normal",
    },
    {
      id: 2,
      type: "housekeeping",
      message: "Room 108 cleaning completed",
      details: "Ready for next guest - Quality score: 9/10",
      timestamp: new Date(Date.now() - 600000),
      priority: "normal",
    },
    {
      id: 3,
      type: "maintenance",
      message: "AC repair completed in Room 302",
      details: "Work order: MNT-2024-001 - Room ready for occupancy",
      timestamp: new Date(Date.now() - 900000),
      priority: "normal",
    },
  ])

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data")
        setIsLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      try {
        setCurrentTime(new Date())
        setLiveMetrics((prev) => ({
          ...prev,
          revenue: prev.revenue + Math.floor(Math.random() * 50),
          walkIns: Math.max(0, Math.min(10, prev.walkIns + Math.floor(Math.random() * 3) - 1)),
        }))
      } catch (err) {
        console.error("[v0] Timer update error:", err)
      }
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const occupancyRate = useMemo(
    () => Math.round((liveMetrics.occupancy / liveMetrics.totalRooms) * 100),
    [liveMetrics.occupancy, liveMetrics.totalRooms],
  )

  const revenueGrowth = useMemo(() => {
    const baseRevenue = 14500
    return Math.round(((liveMetrics.revenue - baseRevenue) / baseRevenue) * 100)
  }, [liveMetrics.revenue])

  const getNotificationColor = useCallback((type: string) => {
    switch (type) {
      case "room-service":
        return "bg-orange-50 border-orange-200 text-orange-800"
      case "housekeeping":
        return "bg-green-50 border-green-200 text-green-800"
      case "security":
        return "bg-red-50 border-red-200 text-red-800"
      case "maintenance":
        return "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Front Desk Dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/frontdesk">Front Desk Operations</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-3 px-4">
          <Button variant="outline" size="sm" className="relative bg-transparent" aria-label="View notifications">
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                {notifications.length}
              </Badge>
            )}
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Online
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            <Clock className="w-3 h-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
      </header>

      <main
        className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-label="Front Desk Operations Dashboard"
      >
        {notifications.length > 0 && (
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base">
                  <Bell className="mr-2 h-4 w-4" />
                  Real-time Notifications
                  <Badge variant="secondary" className="ml-2">
                    {notifications.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto" role="log" aria-live="polite">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${getNotificationColor(notification.type)}`}
                      role="alert"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.message}</p>
                          <p className="text-xs opacity-75 mt-1">{notification.details}</p>
                        </div>
                        <div className="text-xs opacity-75 ml-2">
                          {Math.floor((Date.now() - notification.timestamp.getTime()) / 60000)}m ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {notifications.length > 3 && (
                  <div className="mt-3 text-center">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All {notifications.length} Notifications
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Front Desk Operations</h1>
              <p className="text-sm sm:text-base text-gray-600">Real-time hotel management and guest services</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Hotel className="w-3 h-3 mr-1" />
                {occupancyRate}% Occupied
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Day Shift Active
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Users className="w-3 h-3 mr-1" />
                {liveMetrics.vipGuests} VIP Guests
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Room Occupancy</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {liveMetrics.occupancy}/{liveMetrics.totalRooms}
                    </p>
                    <div className="flex items-center text-xs text-blue-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {occupancyRate}% occupied
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bed className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${occupancyRate}%` }}
                    aria-label={`${occupancyRate}% occupancy rate`}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Today's Revenue</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      GH₵{liveMetrics.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />+{revenueGrowth}% vs yesterday
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-200">
                  <div className="h-full w-4/5 bg-green-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Check-ins Today</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.checkInsToday}</p>
                    <p className="text-xs text-green-600 mt-1">{liveMetrics.walkIns} walk-ins</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-200">
                  <div className="h-full w-3/4 bg-green-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Check-outs Today</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.checkOutsToday}</p>
                    <p className="text-xs text-blue-600 mt-1">Avg rate: GH₵{liveMetrics.avgRate}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserX className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
                  <div className="h-full w-1/2 bg-blue-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Today's Arrivals */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <UserCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Today's Arrivals
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.checkInsToday} Expected
                </Badge>
              </div>
              <CardDescription className="text-sm">Scheduled check-ins for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">John Doe</p>
                    <p className="text-xs text-green-700 truncate">Deluxe Room 205 • 3 nights</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Confirmed
                    </Badge>
                    <p className="text-xs text-green-600">2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Sarah Johnson</p>
                    <p className="text-xs text-blue-700 truncate">Suite 301 • 2 nights • VIP</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-blue-300 text-xs">
                      VIP
                    </Badge>
                    <p className="text-xs text-blue-600">4:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Michael Brown</p>
                    <p className="text-xs text-yellow-700 truncate">Standard Room 102 • 1 night</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-yellow-300 text-xs">
                      Walk-in
                    </Badge>
                    <p className="text-xs text-yellow-600">Now</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/frontdesk/checkin">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Manage Check-ins
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Today's Departures */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <UserX className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Today's Departures
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.checkOutsToday} Expected
                </Badge>
              </div>
              <CardDescription className="text-sm">Scheduled check-outs for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Emma Wilson</p>
                    <p className="text-xs text-red-700 truncate">Room 108 • Outstanding: GH₵450</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="destructive" className="mb-1 text-xs">
                      Overdue
                    </Badge>
                    <p className="text-xs text-red-600">11:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">David Lee</p>
                    <p className="text-xs text-blue-700 truncate">Room 215 • Paid in full</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-blue-300 text-xs">
                      Ready
                    </Badge>
                    <p className="text-xs text-blue-600">12:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Lisa Garcia</p>
                    <p className="text-xs text-green-700 truncate">Suite 302 • Express checkout</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Complete
                    </Badge>
                    <p className="text-xs text-green-600">10:30 AM</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/frontdesk/checkout">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <UserX className="mr-2 h-4 w-4" />
                    Manage Check-outs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Guest Requests */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Bell className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Active Guest Requests
              </CardTitle>
              <CardDescription className="text-sm">Concierge and guest services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Room 205 - Extra Towels</p>
                    <p className="text-xs text-red-700">Urgent request from VIP guest</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Urgent
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Room 108 - Airport Transfer</p>
                    <p className="text-xs text-yellow-700">Pickup at 6:00 AM tomorrow</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-300 text-xs">
                    Scheduled
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Room 302 - Restaurant Reservation</p>
                    <p className="text-xs text-green-700">Table for 2 at 7:30 PM - Confirmed</p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-xs">
                    Complete
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/frontdesk/concierge">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Manage Requests
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Room Status Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Bed className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Room Status Summary
              </CardTitle>
              <CardDescription className="text-sm">Current room availability and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Available Rooms</p>
                    <p className="text-xs text-green-700">Ready for immediate occupancy</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-green-300 text-xs mb-1">
                      Clean
                    </Badge>
                    <p className="text-xs text-green-600">8 rooms</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Maintenance Required</p>
                    <p className="text-xs text-yellow-700">Minor repairs and maintenance</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-yellow-300 text-xs mb-1">
                      Maintenance
                    </Badge>
                    <p className="text-xs text-yellow-600">2 rooms</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Housekeeping in Progress</p>
                    <p className="text-xs text-blue-700">Currently being cleaned</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-300 text-xs mb-1">
                      Cleaning
                    </Badge>
                    <p className="text-xs text-blue-600">3 rooms</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/frontdesk/rooms">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    View Room Map
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
</merged_code>
