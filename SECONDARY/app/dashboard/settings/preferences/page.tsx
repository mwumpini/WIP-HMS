"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, User, Bell, Monitor, FileText, Zap, Save, Loader2, Plus, X } from "lucide-react"
import Link from "next/link"

interface UserPreferences {
  // Dashboard & UI Preferences
  dashboard: {
    defaultView: "summary" | "calendar" | "reports"
    theme: "light" | "dark" | "system"
    compactMode: boolean
    showWelcomeMessage: boolean
    pinnedWidgets: string[]
    refreshInterval: number
  }

  // Notification Preferences
  notifications: {
    emailAlerts: boolean
    smsAlerts: boolean
    pushNotifications: boolean
    soundEnabled: boolean
    alertTypes: {
      newBookings: boolean
      cancellations: boolean
      payments: boolean
      lowStock: boolean
      systemUpdates: boolean
      reminders: boolean
    }
    quietHours: {
      enabled: boolean
      start: string
      end: string
    }
  }

  // Report & Export Settings
  reports: {
    defaultDateRange: "7days" | "30days" | "90days" | "custom"
    exportFormat: "pdf" | "excel" | "csv"
    autoEmailReports: boolean
    emailSchedule: "daily" | "weekly" | "monthly"
    includeCharts: boolean
    reportRecipients: string[]
  }

  // Quick Access & Shortcuts
  shortcuts: {
    pinnedActions: string[]
    keyboardShortcuts: boolean
    quickFilters: string[]
    favoriteReports: string[]
    customDashboardCards: string[]
  }

  // Personal Settings
  personal: {
    language: string
    timezone: string
    dateFormat: string
    numberFormat: string
    workingHours: {
      start: string
      end: string
    }
  }
}

const defaultPreferences: UserPreferences = {
  dashboard: {
    defaultView: "summary",
    theme: "system",
    compactMode: false,
    showWelcomeMessage: true,
    pinnedWidgets: ["recent-activity", "quick-stats"],
    refreshInterval: 30,
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    soundEnabled: true,
    alertTypes: {
      newBookings: true,
      cancellations: true,
      payments: true,
      lowStock: true,
      systemUpdates: false,
      reminders: true,
    },
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "08:00",
    },
  },
  reports: {
    defaultDateRange: "30days",
    exportFormat: "pdf",
    autoEmailReports: false,
    emailSchedule: "weekly",
    includeCharts: true,
    reportRecipients: [],
  },
  shortcuts: {
    pinnedActions: ["new-sale", "new-expense"],
    keyboardShortcuts: true,
    quickFilters: ["today", "this-week"],
    favoriteReports: ["sales-summary"],
    customDashboardCards: [],
  },
  personal: {
    language: "en",
    timezone: "Africa/Accra",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "en-US",
    workingHours: {
      start: "08:00",
      end: "17:00",
    },
  },
}

export default function UserPreferencesPage() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newRecipient, setNewRecipient] = useState("")
  const [newPinnedAction, setNewPinnedAction] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = () => {
    try {
      const stored = localStorage.getItem("userPreferences")
      if (stored) {
        setPreferences({ ...defaultPreferences, ...JSON.parse(stored) })
      }
    } catch (error) {
      console.error("Error loading user preferences:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
      toast({
        title: "Preferences Saved",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = (section: keyof UserPreferences, field: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedPreferences = (section: keyof UserPreferences, subsection: string, field: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value,
        },
      },
    }))
  }

  const addRecipient = () => {
    if (newRecipient.trim() && !preferences.reports.reportRecipients.includes(newRecipient.trim())) {
      updatePreferences("reports", "reportRecipients", [...preferences.reports.reportRecipients, newRecipient.trim()])
      setNewRecipient("")
    }
  }

  const removeRecipient = (email: string) => {
    updatePreferences(
      "reports",
      "reportRecipients",
      preferences.reports.reportRecipients.filter((r) => r !== email),
    )
  }

  const addPinnedAction = () => {
    if (newPinnedAction && !preferences.shortcuts.pinnedActions.includes(newPinnedAction)) {
      updatePreferences("shortcuts", "pinnedActions", [...preferences.shortcuts.pinnedActions, newPinnedAction])
      setNewPinnedAction("")
    }
  }

  const removePinnedAction = (action: string) => {
    updatePreferences(
      "shortcuts",
      "pinnedActions",
      preferences.shortcuts.pinnedActions.filter((a) => a !== action),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">User Preferences</h1>
          <p className="text-gray-600">Customize your personal experience and settings</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger value="shortcuts" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Shortcuts</span>
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Personal</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Preferences */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard & UI Preferences</CardTitle>
              <CardDescription>Customize your dashboard layout and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Dashboard View</Label>
                  <Select
                    value={preferences.dashboard.defaultView}
                    onValueChange={(value) => updatePreferences("dashboard", "defaultView", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary View</SelectItem>
                      <SelectItem value="calendar">Calendar View</SelectItem>
                      <SelectItem value="reports">Reports View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={preferences.dashboard.theme}
                    onValueChange={(value) => updatePreferences("dashboard", "theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Auto-refresh Interval (seconds)</Label>
                <Input
                  type="number"
                  value={preferences.dashboard.refreshInterval}
                  onChange={(e) => updatePreferences("dashboard", "refreshInterval", Number.parseInt(e.target.value))}
                  min="10"
                  max="300"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.dashboard.compactMode}
                    onCheckedChange={(checked) => updatePreferences("dashboard", "compactMode", checked)}
                  />
                  <Label>Compact Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.dashboard.showWelcomeMessage}
                    onCheckedChange={(checked) => updatePreferences("dashboard", "showWelcomeMessage", checked)}
                  />
                  <Label>Show Welcome Message</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Preferences */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.notifications.emailAlerts}
                    onCheckedChange={(checked) => updatePreferences("notifications", "emailAlerts", checked)}
                  />
                  <Label>Email Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.notifications.smsAlerts}
                    onCheckedChange={(checked) => updatePreferences("notifications", "smsAlerts", checked)}
                  />
                  <Label>SMS Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.notifications.pushNotifications}
                    onCheckedChange={(checked) => updatePreferences("notifications", "pushNotifications", checked)}
                  />
                  <Label>Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.notifications.soundEnabled}
                    onCheckedChange={(checked) => updatePreferences("notifications", "soundEnabled", checked)}
                  />
                  <Label>Sound Notifications</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Alert Types</Label>
                {Object.entries(preferences.notifications.alertTypes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        updateNestedPreferences("notifications", "alertTypes", key, checked)
                      }
                    />
                    <Label className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.notifications.quietHours.enabled}
                    onCheckedChange={(checked) =>
                      updateNestedPreferences("notifications", "quietHours", "enabled", checked)
                    }
                  />
                  <Label>Enable Quiet Hours</Label>
                </div>
                {preferences.notifications.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={preferences.notifications.quietHours.start}
                        onChange={(e) =>
                          updateNestedPreferences("notifications", "quietHours", "start", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={preferences.notifications.quietHours.end}
                        onChange={(e) => updateNestedPreferences("notifications", "quietHours", "end", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Preferences */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Report & Export Settings</CardTitle>
              <CardDescription>Configure default report settings and export preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Date Range</Label>
                  <Select
                    value={preferences.reports.defaultDateRange}
                    onValueChange={(value) => updatePreferences("reports", "defaultDateRange", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select
                    value={preferences.reports.exportFormat}
                    onValueChange={(value) => updatePreferences("reports", "exportFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.reports.autoEmailReports}
                    onCheckedChange={(checked) => updatePreferences("reports", "autoEmailReports", checked)}
                  />
                  <Label>Auto-Email Reports</Label>
                </div>
                {preferences.reports.autoEmailReports && (
                  <div className="ml-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Email Schedule</Label>
                      <Select
                        value={preferences.reports.emailSchedule}
                        onValueChange={(value) => updatePreferences("reports", "emailSchedule", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={preferences.reports.includeCharts}
                    onCheckedChange={(checked) => updatePreferences("reports", "includeCharts", checked)}
                  />
                  <Label>Include Charts in Reports</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Report Recipients</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter email address"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addRecipient()}
                  />
                  <Button onClick={addRecipient}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.reports.reportRecipients.map((email) => (
                    <Badge key={email} variant="secondary" className="flex items-center space-x-1">
                      <span>{email}</span>
                      <button onClick={() => removeRecipient(email)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shortcuts Preferences */}
        <TabsContent value="shortcuts">
          <Card>
            <CardHeader>
              <CardTitle>Quick Access & Shortcuts</CardTitle>
              <CardDescription>Customize your quick actions and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Pinned Actions</Label>
                <div className="flex space-x-2">
                  <Select value={newPinnedAction} onValueChange={setNewPinnedAction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action to pin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-sale">New Sale</SelectItem>
                      <SelectItem value="new-expense">New Expense</SelectItem>
                      <SelectItem value="new-customer">New Customer</SelectItem>
                      <SelectItem value="inventory-check">Inventory Check</SelectItem>
                      <SelectItem value="generate-report">Generate Report</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addPinnedAction}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.shortcuts.pinnedActions.map((action) => (
                    <Badge key={action} variant="secondary" className="flex items-center space-x-1">
                      <span className="capitalize">{action.replace("-", " ")}</span>
                      <button onClick={() => removePinnedAction(action)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={preferences.shortcuts.keyboardShortcuts}
                  onCheckedChange={(checked) => updatePreferences("shortcuts", "keyboardShortcuts", checked)}
                />
                <Label>Enable Keyboard Shortcuts</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Preferences */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Settings</CardTitle>
              <CardDescription>Configure your personal preferences and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={preferences.personal.language}
                    onValueChange={(value) => updatePreferences("personal", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={preferences.personal.timezone}
                    onValueChange={(value) => updatePreferences("personal", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Accra">Africa/Accra (GMT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select
                    value={preferences.personal.dateFormat}
                    onValueChange={(value) => updatePreferences("personal", "dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Number Format</Label>
                  <Select
                    value={preferences.personal.numberFormat}
                    onValueChange={(value) => updatePreferences("personal", "numberFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">1,234.56 (US)</SelectItem>
                      <SelectItem value="en-GB">1,234.56 (UK)</SelectItem>
                      <SelectItem value="de-DE">1.234,56 (DE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Working Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={preferences.personal.workingHours.start}
                      onChange={(e) => updateNestedPreferences("personal", "workingHours", "start", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={preferences.personal.workingHours.end}
                      onChange={(e) => updateNestedPreferences("personal", "workingHours", "end", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
