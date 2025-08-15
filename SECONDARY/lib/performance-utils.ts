"use client"

import { useEffect } from "react"

import { useRef } from "react"

import { useState } from "react"

import { useMemo } from "react"

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function useMemoizedCalculation<T>(calculation: () => T, dependencies: any[]): T {
  return useMemo(calculation, dependencies)
}

export function useOptimizedFilter<T>(data: T[], filterFn: (item: T) => boolean, searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm.trim()) return data
    return data.filter(filterFn)
  }, [data, filterFn, searchTerm])
}

export class BatchedStorage {
  private batch: Map<string, any> = new Map()
  private timeout: NodeJS.Timeout | null = null

  set(key: string, value: any) {
    this.batch.set(key, value)
    this.scheduleBatchWrite()
  }

  private scheduleBatchWrite() {
    if (this.timeout) clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.flush()
    }, 100) // Batch writes every 100ms
  }

  flush() {
    try {
      this.batch.forEach((value, key) => {
        localStorage.setItem(key, JSON.stringify(value))
      })
      this.batch.clear()
    } catch (error) {
      console.error("Batch storage write failed:", error)
    }

    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }
}

export const batchedStorage = new BatchedStorage()

export function useVirtualScrolling(itemCount: number, itemHeight: number, containerHeight: number, scrollTop: number) {
  return useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight)
    const visibleEnd = Math.min(visibleStart + Math.ceil(containerHeight / itemHeight) + 1, itemCount)

    return {
      startIndex: Math.max(0, visibleStart - 5), // Buffer
      endIndex: Math.min(itemCount, visibleEnd + 5), // Buffer
      offsetY: visibleStart * itemHeight,
    }
  }, [itemCount, itemHeight, containerHeight, scrollTop])
}

export function useLazyLoading(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
