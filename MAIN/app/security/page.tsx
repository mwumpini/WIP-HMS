"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Camera,
  Key,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Phone,
  MapPin,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

export default function SecurityDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveMetrics, setLiveMetrics] = useState({
    activeCameras: 24,
    totalCameras: 26,
    activeIncidents: 2,
    securityGuards: 6,
    accessAttempts: 1247,
    visitorCount: 18,
    patrolsCompleted: 12,
    systemStatus: "operational",
  })
  const [securityLevel, setSecurityLevel] = useState("normal") // normal, elevated, high
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const securityStats = useMemo(
    () => ({
      cameraUptime: Math.round((liveMetrics.activeCameras / liveMetrics.totalCameras) * 100),
      accessGrowth: 15,
      incidentSeverity: liveMetrics.activeIncidents > 0 ? "high" : "normal",
      patrolEfficiency: Math.round((liveMetrics.patrolsCompleted / 15) * 100),
    }),
    [liveMetrics],
  )

  const updateMetrics = useCallback(() => {
    try {
      setCurrentTime(new Date())
      setLiveMetrics((prev) => ({
        ...prev,
        accessAttempts: prev.accessAttempts + Math.floor(Math.random() * 5),
        visitorCount: Math.max(0, prev.visitorCount + Math.floor(Math.random() * 3) - 1),
      }))
    } catch (err) {
      setError("Failed to update security metrics. Please refresh the page.")
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(updateMetrics, 30000)
    return () => clearInterval(timer)
  }, [updateMetrics])

  const handleEmergencyAlert = useCallback(async (alertType) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate emergency alert API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`[v0] Emergency alert triggered: ${alertType}`)

      // Update security level for demonstration
      if (alertType === "emergency") {
        setSecurityLevel("high")
      }
    } catch (err) {
      setError(`Failed to trigger ${alertType} alert. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getSecurityLevelColor = (level) => {
    switch (level) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      case "elevated":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-green-50 text-green-700 border-green-200"
    }
  }

  const getSecurityLevelText = (level) => {
    switch (level) {
      case "high":
        return "High Alert"
      case "elevated":
        return "Elevated"
      default:
        return "Normal"
    }
  }

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
                <BreadcrumbLink href="/security">Security Management</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-3 px-4">
          <Button
            variant="outline"
            size="sm"
            className="relative bg-transparent"
            onClick={() => handleEmergencyAlert("incident")}
            disabled={isLoading}
            aria-label={`Active incidents: ${liveMetrics.activeIncidents}`}
          >
            <AlertTriangle className="w-4 h-4" />
            {liveMetrics.activeIncidents > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                {liveMetrics.activeIncidents}
              </Badge>
            )}
          </Button>
          <Badge variant="outline" className={getSecurityLevelColor(securityLevel)}>
            <Shield className="w-3 h-3 mr-1" />
            {getSecurityLevelText(securityLevel)}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            All Systems Online
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Security Management Center</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Real-time security monitoring and incident management
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Camera className="w-3 h-3 mr-1" aria-hidden="true" />
                {liveMetrics.activeCameras}/{liveMetrics.totalCameras} Cameras
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Users className="w-3 h-3 mr-1" aria-hidden="true" />
                {liveMetrics.securityGuards} Guards On Duty
              </Badge>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                <MapPin className="w-3 h-3 mr-1" aria-hidden="true" />
                {liveMetrics.patrolsCompleted} Patrols Today
              </Badge>
            </div>
          </div>

          <section
            aria-label="Security Metrics"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active Cameras</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {liveMetrics.activeCameras}/{liveMetrics.totalCameras}
                    </p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                      {securityStats.cameraUptime}% operational
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${securityStats.cameraUptime}%` }}
                    aria-label={`${securityStats.cameraUptime}% camera uptime`}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Access Attempts</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {liveMetrics.accessAttempts.toLocaleString()}
                    </p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />+{securityStats.accessGrowth}% vs
                      yesterday
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Key className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" aria-hidden="true" />
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
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active Incidents</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.activeIncidents}</p>
                    <p className="text-xs text-orange-600 mt-1">1 high priority</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-200">
                  <div className="h-full w-1/4 bg-orange-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Current Visitors</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.visitorCount}</p>
                    <p className="text-xs text-purple-600 mt-1">2 VIP guests</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-200">
                  <div className="h-full w-1/2 bg-purple-500 transition-all duration-500"></div>
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
                <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm">Emergency and security operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/security/incidents/active">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              </Link>
              <Link href="/security/surveillance/live">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Live Monitoring
                </Button>
              </Link>
              <Link href="/security/access/keycards">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Manage Access
                </Button>
              </Link>
              <Button
                className="w-full justify-start bg-red-600 hover:bg-red-700 text-white text-sm"
                onClick={() => handleEmergencyAlert("emergency")}
                disabled={isLoading}
              >
                <Phone className="mr-2 h-4 w-4" />
                {isLoading ? "Alerting..." : "Emergency Alert"}
              </Button>
            </CardContent>
          </Card>

          {/* Security Modules */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Security Management Modules</CardTitle>
              <CardDescription className="text-sm">Access all security and safety features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <Link
                  href="/security/access"
                  className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Access Control - Key Cards and Logs"
                >
                  <Key className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Access Control</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Key Cards & Logs</span>
                </Link>

                <Link
                  href="/security/surveillance"
                  className="flex flex-col items-center p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Surveillance - CCTV and Monitoring"
                >
                  <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Surveillance</span>
                  <span className="text-xs text-gray-500 hidden sm:block">CCTV & Monitoring</span>
                </Link>

                <Link
                  href="/security/incidents"
                  className="flex flex-col items-center p-3 sm:p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Incidents - Reports and Response"
                >
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Incidents</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Reports & Response</span>
                </Link>

                <Link
                  href="/security/visitors"
                  className="flex flex-col items-center p-3 sm:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Visitor Management - Registration and Screening"
                >
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Visitor Management</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Registration & Screening</span>
                </Link>

                <Link
                  href="/security/patrols"
                  className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Security Patrols - Schedules and Logs"
                >
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Security Patrols</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Schedules & Logs</span>
                </Link>

                <Link
                  href="/security/reports"
                  className="flex flex-col items-center p-3 sm:p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Reports - Analytics and Compliance"
                >
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Reports</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Analytics & Compliance</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Active Incidents */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Active Incidents
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.activeIncidents} Active
                </Badge>
              </div>
              <CardDescription className="text-sm">Current security incidents and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Unauthorized Access Attempt</p>
                    <p className="text-xs text-red-700 truncate">Room 205 - Multiple failed key card attempts</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="destructive" className="mb-1 text-xs">
                      High Priority
                    </Badge>
                    <p className="text-xs text-red-600">5 min ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Suspicious Activity</p>
                    <p className="text-xs text-yellow-700 truncate">Lobby - Person loitering near reception</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-yellow-300 text-xs">
                      Monitoring
                    </Badge>
                    <p className="text-xs text-yellow-600">15 min ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Fire Alarm Test</p>
                    <p className="text-xs text-green-700 truncate">Scheduled maintenance completed successfully</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Resolved
                    </Badge>
                    <p className="text-xs text-green-600">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/security/incidents">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Manage Incidents
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Camera Status */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Camera System Status
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.activeCameras} Online
                </Badge>
              </div>
              <CardDescription className="text-sm">CCTV surveillance system monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Lobby & Reception</p>
                    <p className="text-xs text-green-700 truncate">6 cameras - All operational</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Online
                    </Badge>
                    <p className="text-xs text-green-600">100% uptime</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Corridors & Elevators</p>
                    <p className="text-xs text-green-700 truncate">12 cameras - All operational</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Online
                    </Badge>
                    <p className="text-xs text-green-600">100% uptime</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Parking & Exterior</p>
                    <p className="text-xs text-red-700 truncate">8 cameras - 2 offline for maintenance</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="destructive" className="mb-1 text-xs">
                      Maintenance
                    </Badge>
                    <p className="text-xs text-red-600">75% uptime</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/security/surveillance">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Live Feed
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Security Patrols */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                Security Patrols
              </CardTitle>
              <CardDescription className="text-sm">Guard patrol schedules and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Night Patrol - Guard A</p>
                    <p className="text-xs text-green-700">Floors 1-2 completed, currently on Floor 3</p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-xs">
                    Active
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Perimeter Check - Guard B</p>
                    <p className="text-xs text-blue-700">Exterior grounds and parking area patrol</p>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-xs">
                    In Progress
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Lobby Security - Guard C</p>
                    <p className="text-xs text-yellow-700">Stationed at main entrance and reception</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-300 text-xs">
                    Stationed
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/security/patrols">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Patrol Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Access Control Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Key className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Access Control Summary
              </CardTitle>
              <CardDescription className="text-sm">Key card and access management overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Guest Key Cards</p>
                    <p className="text-xs text-green-700">42 active cards, 8 pending checkout</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-green-300 text-xs mb-1">
                      Active
                    </Badge>
                    <p className="text-xs text-green-600">42 cards</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Staff Access Cards</p>
                    <p className="text-xs text-blue-700">15 staff members with active access</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-300 text-xs mb-1">
                      Active
                    </Badge>
                    <p className="text-xs text-blue-600">15 cards</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Failed Access Attempts</p>
                    <p className="text-xs text-yellow-700">3 failed attempts in last hour</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-yellow-300 text-xs mb-1">
                      Monitor
                    </Badge>
                    <p className="text-xs text-yellow-600">3 attempts</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/security/access">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Key className="mr-2 h-4 w-4" />
                    Access Management
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
