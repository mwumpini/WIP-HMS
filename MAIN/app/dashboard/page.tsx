"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import {
  Users,
  Bed,
  UtensilsCrossed,
  Shield,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Activity,
  ArrowRight,
  Bell,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface ModuleMetrics {
  frontDesk: {
    occupancy: number
    checkInsToday: number
    checkOutsToday: number
    pendingReservations: number
    revenue: number
  }
  fnb: {
    activeOrders: number
    dailyRevenue: number
    kitchenQueue: number
    barQueue: number
  }
  housekeeping: {
    roomsCleaned: number
    pendingRooms: number
    maintenanceRequests: number
    staffOnDuty: number
  }
  security: {
    activeIncidents: number
    visitorsToday: number
    systemStatus: "normal" | "alert" | "critical"
    lastPatrol: Date
  }
}

export default function UnifiedDashboard() {
  const [metrics, setMetrics] = useState<ModuleMetrics>({
    frontDesk: {
      occupancy: 78,
      checkInsToday: 12,
      checkOutsToday: 8,
      pendingReservations: 15,
      revenue: 45230,
    },
    fnb: {
      activeOrders: 23,
      dailyRevenue: 12450,
      kitchenQueue: 7,
      barQueue: 3,
    },
    housekeeping: {
      roomsCleaned: 34,
      pendingRooms: 8,
      maintenanceRequests: 3,
      staffOnDuty: 12,
    },
    security: {
      activeIncidents: 1,
      visitorsToday: 47,
      systemStatus: "normal",
      lastPatrol: new Date(Date.now() - 1800000), // 30 minutes ago
    },
  })

  const [alerts, setAlerts] = useState([
    {
      id: "1",
      module: "Security",
      message: "Maintenance required for Camera 7 - Lobby",
      severity: "medium" as const,
      timestamp: new Date(Date.now() - 900000),
    },
    {
      id: "2",
      module: "Housekeeping",
      message: "Room 205 requires immediate attention",
      severity: "high" as const,
      timestamp: new Date(Date.now() - 600000),
    },
    {
      id: "3",
      module: "F&B",
      message: "Low inventory alert: Premium Wine",
      severity: "medium" as const,
      timestamp: new Date(Date.now() - 300000),
    },
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "alert":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                <BreadcrumbLink href="/dashboard">Hotel Command Center</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center gap-4 px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotel Command Center</h1>
            <p className="text-gray-600">Unified dashboard for all hotel operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={`px-3 py-1 ${getSystemStatusColor(metrics.security.systemStatus)}`}>
              <Activity className="h-4 w-4 mr-1" />
              All Systems {metrics.security.systemStatus === "normal" ? "Online" : "Alert"}
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              {alerts.length} Alerts
            </Button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/frontdesk" aria-label="Navigate to Front Desk Operations">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Front Desk</h3>
                <p className="text-sm text-blue-700">Guest Operations</p>
                <div className="mt-2 text-xs text-blue-600">{metrics.frontDesk.occupancy}% Occupied</div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/fnb" aria-label="Navigate to F&B Management">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6 text-center">
                <UtensilsCrossed className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-orange-900">F&B Management</h3>
                <p className="text-sm text-orange-700">Restaurant & Bar</p>
                <div className="mt-2 text-xs text-orange-600">{metrics.fnb.activeOrders} Active Orders</div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/housekeeping" aria-label="Navigate to Housekeeping & Maintenance">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Housekeeping</h3>
                <p className="text-sm text-green-700">Cleaning & Maintenance</p>
                <div className="mt-2 text-xs text-green-600">{metrics.housekeeping.pendingRooms} Pending Rooms</div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/security" aria-label="Navigate to Security Management">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Security</h3>
                <p className="text-sm text-purple-700">Safety & Access</p>
                <div className="mt-2 text-xs text-purple-600">{metrics.security.activeIncidents} Active Incidents</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm opacity-75">{alert.module}</p>
                        </div>
                        <div className="text-xs opacity-75">
                          {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No active alerts</p>
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Alerts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/frontdesk/rooms">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <Bed className="h-6 w-6 mb-2" />
                  <span className="text-sm">Room Status</span>
                </Button>
              </Link>
              <Link href="/fnb/pos">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <UtensilsCrossed className="h-6 w-6 mb-2" />
                  <span className="text-sm">New Order</span>
                </Button>
              </Link>
              <Link href="/housekeeping/tasks">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <Sparkles className="h-6 w-6 mb-2" />
                  <span className="text-sm">Housekeeping</span>
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span className="text-sm">Reports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
