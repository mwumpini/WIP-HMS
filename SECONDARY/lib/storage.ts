export function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === "undefined") return defaultValue

    const item = localStorage.getItem(key)
    if (!item) return defaultValue

    return JSON.parse(item)
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.warn("localStorage quota exceeded. Consider clearing old data.")
    }
    return defaultValue
  }
}

export function safeSetItem(key: string, value: any): boolean {
  try {
    if (typeof window === "undefined") return false

    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.warn("localStorage quota exceeded. Attempting to free space...")
      // Try to free some space by removing old backup data
      try {
        const oldBackups = Object.keys(localStorage).filter((k) => k.startsWith("backup_"))
        oldBackups.forEach((backupKey) => localStorage.removeItem(backupKey))
        // Retry the operation
        const serialized = JSON.stringify(value) // Declare the variable here
        localStorage.setItem(key, serialized)
        return true
      } catch (retryError) {
        console.error("Failed to free space and retry:", retryError)
      }
    }
    return false
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === "undefined") return false

    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

export function validateStorageData<T>(data: any, validator: (data: any) => data is T): T | null {
  try {
    if (validator(data)) {
      return data
    }
    return null
  } catch (error) {
    console.error("Error validating storage data:", error)
    return null
  }
}

export function getStorageInfo(): { used: number; available: number; percentage: number } {
  try {
    if (typeof window === "undefined") {
      return { used: 0, available: 0, percentage: 0 }
    }

    let used = 0
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length
      }
    }

    // Estimate available space (most browsers have ~5-10MB limit)
    const estimated = 5 * 1024 * 1024 // 5MB in bytes
    const available = Math.max(0, estimated - used)
    const percentage = (used / estimated) * 100

    return { used, available, percentage }
  } catch (error) {
    console.error("Error calculating storage info:", error)
    return { used: 0, available: 0, percentage: 0 }
  }
}

export function clearExpiredData(maxAge: number = 30 * 24 * 60 * 60 * 1000): number {
  try {
    if (typeof window === "undefined") return 0

    let clearedCount = 0
    const now = Date.now()
    const keysToRemove: string[] = []

    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        try {
          const data = JSON.parse(localStorage[key])
          if (data.timestamp && now - new Date(data.timestamp).getTime() > maxAge) {
            keysToRemove.push(key)
          }
        } catch {
          // Skip non-JSON data
        }
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key)
      clearedCount++
    })

    return clearedCount
  } catch (error) {
    console.error("Error clearing expired data:", error)
    return 0
  }
}
