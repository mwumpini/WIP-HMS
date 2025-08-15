"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Database, AlertTriangle, CheckCircle } from "lucide-react"
import { dataManager } from "@/lib/data-manager"
import { getStorageInfo } from "@/lib/storage"

export function DataBackupManager() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [storageInfo, setStorageInfo] = useState(getStorageInfo())

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true)
    setMessage(null)

    try {
      const backup = dataManager.createBackup()
      if (backup) {
        // Create downloadable file
        const blob = new Blob([backup], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `business-data-backup-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        setMessage({ type: "success", text: "Backup created and downloaded successfully!" })
      } else {
        setMessage({ type: "error", text: "Failed to create backup. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while creating the backup." })
    } finally {
      setIsCreatingBackup(false)
    }
  }

  const handleRestoreBackup = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsRestoring(true)
    setMessage(null)

    try {
      const text = await file.text()
      const success = dataManager.restoreFromBackup(text)

      if (success) {
        setMessage({ type: "success", text: "Backup restored successfully! Please refresh the page." })
        // Refresh storage info
        setStorageInfo(getStorageInfo())
      } else {
        setMessage({ type: "error", text: "Failed to restore backup. Please check the file format." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Invalid backup file format." })
    } finally {
      setIsRestoring(false)
      // Clear the input
      event.target.value = ""
    }
  }

  const dataStats = dataManager.getDataStats()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Backup & Restore
        </CardTitle>
        <CardDescription>Protect your business data with regular backups and restore functionality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Data Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{dataStats.salesCount}</div>
            <p className="text-xs text-blue-700">Sales Records</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">{dataStats.expensesCount}</div>
            <p className="text-xs text-red-700">Expense Records</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{dataStats.staffCount}</div>
            <p className="text-xs text-green-700">Staff Members</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{(storageInfo.used / 1024).toFixed(1)}KB</div>
            <p className="text-xs text-purple-700">Storage Used</p>
          </div>
        </div>

        {/* Storage Usage Warning */}
        {storageInfo.percentage > 80 && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Storage usage is at {storageInfo.percentage.toFixed(1)}%. Consider backing up and clearing old data.
            </AlertDescription>
          </Alert>
        )}

        {/* Backup Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold">Create Backup</h3>
            <p className="text-sm text-gray-600">
              Download a complete backup of all your business data including sales, expenses, and staff information.
            </p>
            <Button onClick={handleCreateBackup} disabled={isCreatingBackup} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              {isCreatingBackup ? "Creating Backup..." : "Download Backup"}
            </Button>
            {dataStats.lastBackup && (
              <p className="text-xs text-gray-500">Last backup: {new Date(dataStats.lastBackup).toLocaleString()}</p>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Restore Backup</h3>
            <p className="text-sm text-gray-600">
              Upload a backup file to restore your business data. This will replace all current data.
            </p>
            <div className="space-y-2">
              <Label htmlFor="backup-file">Select Backup File</Label>
              <Input
                id="backup-file"
                type="file"
                accept=".json"
                onChange={handleRestoreBackup}
                disabled={isRestoring}
              />
            </div>
            {isRestoring && <p className="text-sm text-blue-600">Restoring backup...</p>}
          </div>
        </div>

        {/* Data Management Actions */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Data Management</h3>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("This will clear all business data except user account. Are you sure?")) {
                  dataManager.clearAllData()
                  setMessage({ type: "success", text: "Data cleared successfully!" })
                  setStorageInfo(getStorageInfo())
                }
              }}
            >
              Clear All Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                dataManager.migrateData()
                setMessage({ type: "success", text: "Data migration completed!" })
              }}
            >
              Migrate Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
