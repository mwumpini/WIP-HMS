"use client"

import { useEffect, useCallback, useRef } from "react"

interface PerformanceOptions {
  enableMemoryTracking?: boolean
  enableRenderTracking?: boolean
  cleanupInterval?: number
}

export function usePerformance(options: PerformanceOptions = {}) {
  const {
    enableMemoryTracking = true,
    enableRenderTracking = true,
    cleanupInterval = 300000, // 5 minutes
  } = options

  const renderStartTime = useRef<number>()
  const cleanupTimeoutRef = useRef<NodeJS.Timeout>()

  const cleanup = useCallback(() => {
    try {
      // Clear expired localStorage data
      const now = Date.now()
      const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

      Object.keys(localStorage).forEach((key) => {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "")
          if (data.timestamp && now - new Date(data.timestamp).getTime() > maxAge) {
            localStorage.removeItem(key)
          }
        } catch {
          // Skip non-JSON data
        }
      })

      // Clear old error logs
      const errorLog = JSON.parse(localStorage.getItem("errorLog") || "[]")
      if (errorLog.length > 10) {
        localStorage.setItem("errorLog", JSON.stringify(errorLog.slice(-10)))
      }
    } catch (error) {
      console.error("Cleanup failed:", error)
    }
  }, [])

  const trackRenderStart = useCallback(() => {
    if (enableRenderTracking) {
      renderStartTime.current = performance.now()
    }
  }, [enableRenderTracking])

  const trackRenderEnd = useCallback(
    (componentName?: string) => {
      if (enableRenderTracking && renderStartTime.current) {
        const renderTime = performance.now() - renderStartTime.current

        if (renderTime > 100) {
          // Log slow renders
          console.warn(`Slow render detected in ${componentName || "component"}: ${renderTime.toFixed(2)}ms`)
        }
      }
    },
    [enableRenderTracking],
  )

  const trackMemoryUsage = useCallback(() => {
    if (enableMemoryTracking && (performance as any).memory) {
      const memory = (performance as any).memory
      const usedMB = memory.usedJSHeapSize / (1024 * 1024)

      if (usedMB > 50) {
        // Warn if using more than 50MB
        console.warn(`High memory usage detected: ${usedMB.toFixed(2)}MB`)
      }
    }
  }, [enableMemoryTracking])

  useEffect(() => {
    // Initial cleanup
    cleanup()

    // Setup periodic cleanup
    cleanupTimeoutRef.current = setInterval(cleanup, cleanupInterval)

    // Setup memory tracking
    if (enableMemoryTracking) {
      const memoryInterval = setInterval(trackMemoryUsage, 60000) // Every minute
      return () => {
        clearInterval(memoryInterval)
        if (cleanupTimeoutRef.current) {
          clearInterval(cleanupTimeoutRef.current)
        }
      }
    }

    return () => {
      if (cleanupTimeoutRef.current) {
        clearInterval(cleanupTimeoutRef.current)
      }
    }
  }, [cleanup, cleanupInterval, enableMemoryTracking, trackMemoryUsage])

  return {
    trackRenderStart,
    trackRenderEnd,
    trackMemoryUsage,
    cleanup,
  }
}
