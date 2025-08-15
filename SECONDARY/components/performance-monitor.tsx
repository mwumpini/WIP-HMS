"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Zap, Database, Clock } from "lucide-react"

interface PerformanceMetrics {
  memoryUsage: number
  storageUsage: number
  renderTime: number
  errorCount: number
  lastCleanup: string
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: 0,
    storageUsage: 0,
    renderTime: 0,
    errorCount: 0,
    lastCleanup: new Date().toISOString(),
  })

  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    const updateMetrics = () => {
      const storageInfo = calculateStorageUsage()
      const errorCount = getErrorCount()

      setMetrics((prev) => ({
        ...prev,
        storageUsage: storageInfo.percentage,
        errorCount,
        memoryUsage: (performance as any).memory?.usedJSHeapSize / (1024 * 1024) || 0,
      }))
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const calculateStorageUsage = () => {
    try {
      let used = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length
        }
      }
      const estimated = 5 * 1024 * 1024 // 5MB
      return { used, percentage: (used / estimated) * 100 }
    } catch {
      return { used: 0, percentage: 0 }
    }
  }

  const getErrorCount = () => {
    try {
      return Number.parseInt(localStorage.getItem("errorCount") || "0")
    } catch {
      return 0
    }
  }

  const optimizePerformance = async () => {
    setIsOptimizing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear old backup data
      const oldBackups = Object.keys(localStorage).filter((k) => k.startsWith("backup_"))
      oldBackups.forEach((key) => localStorage.removeItem(key))

      // Reset error count
      localStorage.setItem("errorCount", "0")

      setMetrics((prev) => ({
        ...prev,
        errorCount: 0,
        lastCleanup: new Date().toISOString(),
        storageUsage: calculateStorageUsage().percentage,
      }))
    } finally {
      setIsOptimizing(false)
    }
  }

  const getHealthStatus = () => {
    if (metrics.storageUsage > 80 || metrics.errorCount > 10) return "critical"
    if (metrics.storageUsage > 60 || metrics.errorCount > 5) return "warning"
    return "healthy"
  }

  const healthStatus = getHealthStatus()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Performance Monitor
        </CardTitle>
        <CardDescription>System health and optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>System Health</span>
          <Badge
            variant={healthStatus === "healthy" ? "default" : healthStatus === "warning" ? "secondary" : "destructive"}
          >
            {healthStatus === "healthy" && <CheckCircle className="h-3 w-3 mr-1" />}
            {healthStatus !== "healthy" && <AlertTriangle className="h-3 w-3 mr-1" />}
            {healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span>Storage: {metrics.storageUsage.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span>Errors: {metrics.errorCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span>Memory: {metrics.memoryUsage.toFixed(1)}MB</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Last Cleanup: {new Date(metrics.lastCleanup).toLocaleDateString()}</span>
          </div>
        </div>

        <Button
          onClick={optimizePerformance}
          disabled={isOptimizing}
          className="w-full"
          variant={healthStatus === "critical" ? "destructive" : "outline"}
        >
          {isOptimizing ? "Optimizing..." : "Optimize Performance"}
        </Button>
      </CardContent>
    </Card>
  )
}
