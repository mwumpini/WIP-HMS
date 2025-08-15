"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useIntegration } from "@/lib/integration/data-sync"
import { Wifi, WifiOff, Activity, AlertTriangle, RefreshCw, CheckCircle } from "lucide-react"

interface ModuleStatus {
  name: string
  status: "online" | "offline" | "warning"
  lastSync: Date
  pendingSync: number
  errorCount: number
}

export function IntegrationStatus() {
  const { hub, connectionStatus } = useIntegration()
  const [isLoading, setIsLoading] = useState(false)
  const [modules, setModules] = useState<ModuleStatus[]>([
    { name: "Front Desk", status: "online", lastSync: new Date(), pendingSync: 0, errorCount: 0 },
    { name: "F&B Management", status: "online", lastSync: new Date(), pendingSync: 2, errorCount: 0 },
    { name: "Housekeeping", status: "warning", lastSync: new Date(Date.now() - 300000), pendingSync: 5, errorCount: 1 },
    { name: "Security", status: "online", lastSync: new Date(), pendingSync: 0, errorCount: 0 },
  ])

  const [realtimeEvents, setRealtimeEvents] = useState<
    Array<{
      id: string
      event: string
      module: string
      timestamp: Date
      status: "success" | "error" | "warning"
    }>
  >([])

  const [systemHealth, setSystemHealth] = useState({
    totalEvents: 0,
    errorRate: 0,
    avgResponseTime: 120,
  })

  useEffect(() => {
    const events = ["guest-updated", "room-updated", "order-created", "incident-created", "integration-error"]

    events.forEach((event) => {
      hub.subscribe(event, (data) => {
        const newEvent = {
          id: Date.now().toString(),
          event,
          module: getModuleFromEvent(event),
          timestamp: new Date(),
          status: event === "integration-error" ? "error" : ("success" as "success" | "error" | "warning"),
        }

        setRealtimeEvents((prev) => [newEvent, ...prev.slice(0, 9)])

        setSystemHealth((prev) => ({
          ...prev,
          totalEvents: prev.totalEvents + 1,
          errorRate: event === "integration-error" ? prev.errorRate + 1 : prev.errorRate,
        }))

        if (event === "integration-error") {
          const moduleName = getModuleFromEvent(data.operation || "system")
          setModules((prev) =>
            prev.map((module) =>
              module.name === moduleName
                ? { ...module, status: "warning" as const, errorCount: module.errorCount + 1 }
                : module,
            ),
          )
        }
      })
    })
  }, [hub])

  const getModuleFromEvent = (event: string): string => {
    if (event.includes("guest") || event.includes("room")) return "Front Desk"
    if (event.includes("order")) return "F&B Management"
    if (event.includes("housekeeping")) return "Housekeeping"
    if (event.includes("incident") || event.includes("security")) return "Security"
    return "System"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "error":
        return <AlertTriangle className="h-3 w-3 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />
      default:
        return <Activity className="h-3 w-3 text-gray-500" />
    }
  }

  const handleRefresh = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate refresh operation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update module statuses
      setModules((prev) =>
        prev.map((module) => ({
          ...module,
          lastSync: new Date(),
          pendingSync: Math.max(0, module.pendingSync - 1),
        })),
      )
    } catch (error) {
      console.error("Failed to refresh integration status:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      {!connectionStatus.connected && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            Integration Hub connection lost. {connectionStatus.lastError}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{systemHealth.totalEvents}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold text-red-500">{systemHealth.errorRate}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">{systemHealth.avgResponseTime}ms</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Module Status
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(module.status)}
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-sm text-muted-foreground">Last sync: {module.lastSync.toLocaleTimeString()}</p>
                      {module.errorCount > 0 && <p className="text-sm text-red-500">{module.errorCount} errors</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {module.pendingSync > 0 && <Badge variant="secondary">{module.pendingSync} pending</Badge>}
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(module.status)}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {realtimeEvents.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent events</p>
              ) : (
                realtimeEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 border rounded text-sm">
                    <div className="flex items-center gap-2">
                      {getEventStatusIcon(event.status)}
                      <div>
                        <p className="font-medium">{event.event.replace("-", " ").toUpperCase()}</p>
                        <p className="text-muted-foreground">{event.module}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{event.timestamp.toLocaleTimeString()}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
