"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  Settings,
  Building2,
  CreditCard,
  Shield,
  Calendar,
  Globe,
  Save,
  Loader2,
  Plus,
  X,
  Palette,
  Upload,
} from "lucide-react"
import Link from "next/link"
import Cropper from "react-easy-crop"

interface CompanyInfo {
  name: string
  address: string
  city: string
  region: string
  postalCode: string
  phone: string
  email: string
  website: string
  taxId: string
  registrationNumber: string
  logo: string
  customServiceTypes: string[]
  preferredColors: string[]
  staffNumberFormat: string
}

interface SystemSettings {
  // Company Information
  company: CompanyInfo

  // General System Configuration
  general: {
    companyName: string
    defaultCurrency: string
    defaultLanguage: string
    timezone: string
    dateFormat: string
    timeFormat: string
    fiscalYearStart: string
  }

  // Tax & Legal Settings
  tax: {
    vatRate: number
    nhilRate: number
    getfundRate: number
    covidLevyRate: number
    invoiceTerms: string
    taxDisplayMode: "inclusive" | "exclusive"
  }

  // Payment & Billing
  payment: {
    enabledMethods: string[]
    defaultPaymentMethod: string
    requireDeposit: boolean
    depositPercentage: number
    autoInvoicing: boolean
    invoicePrefix: string
    receiptPrefix: string
  }

  // Security & Access Control
  security: {
    passwordMinLength: number
    passwordRequireSpecial: boolean
    passwordRequireNumbers: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    enableTwoFactor: boolean
    auditLogging: boolean
  }

  // Business Operations
  operations: {
    businessHours: {
      start: string
      end: string
      workingDays: string[]
    }
    inventoryTracking: boolean
    lowStockThreshold: number
    autoReorderPoint: boolean
    enableBarcode: boolean
  }

  // Notifications
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    systemAlerts: boolean
    reminderDays: number
    escalationHours: number
  }
}

const predefinedServiceTypes = [
  "ACCOMMODATION",
  "RESTAURANT",
  "BAR",
  "VEHICLE RENTAL",
  "POOL",
  "CONFERENCE AND EVENT",
  "SPA AND WELLNESS",
  "LAUNDRY",
  "TRANSPORTATION",
  "TOUR SERVICES",
  "CATERING",
  "ENTERTAINMENT",
]

const defaultColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"]

const defaultSettings: SystemSettings = {
  company: {
    name: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    taxId: "",
    registrationNumber: "",
    logo: "",
    customServiceTypes: [],
    preferredColors: defaultColors,
    staffNumberFormat: "STF{YEAR}{###}",
  },
  general: {
    companyName: "",
    defaultCurrency: "GHS",
    defaultLanguage: "en",
    timezone: "Africa/Accra",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    fiscalYearStart: "01-01",
  },
  tax: {
    vatRate: 15,
    nhilRate: 2.5,
    getfundRate: 2.5,
    covidLevyRate: 1,
    invoiceTerms: "Payment due within 30 days",
    taxDisplayMode: "exclusive",
  },
  payment: {
    enabledMethods: ["cash", "card", "bank_transfer"],
    defaultPaymentMethod: "cash",
    requireDeposit: false,
    depositPercentage: 50,
    autoInvoicing: true,
    invoicePrefix: "INV",
    receiptPrefix: "RCP",
  },
  security: {
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    auditLogging: true,
  },
  operations: {
    businessHours: {
      start: "08:00",
      end: "18:00",
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
    inventoryTracking: true,
    lowStockThreshold: 10,
    autoReorderPoint: false,
    enableBarcode: false,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    reminderDays: 7,
    escalationHours: 24,
  },
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  const [newServiceType, setNewServiceType] = useState("")
  const [selectedServiceType, setSelectedServiceType] = useState("")
  const [customServiceType, setCustomServiceType] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [newColor, setNewColor] = useState("#10b981")
  const [showColorDialog, setShowColorDialog] = useState(false)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [imageSrc, setImageSrc] = useState("")
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem("systemSettings")
      const companyStored = localStorage.getItem("companyInfo")

      let loadedSettings = { ...defaultSettings }

      if (stored) {
        loadedSettings = { ...loadedSettings, ...JSON.parse(stored) }
      }

      if (companyStored) {
        const companyInfo = JSON.parse(companyStored)
        loadedSettings.company = {
          ...loadedSettings.company,
          ...companyInfo,
          customServiceTypes: companyInfo.customServiceTypes || [],
          preferredColors: companyInfo.preferredColors || defaultColors,
        }
      }

      setSettings(loadedSettings)
    } catch (error) {
      console.error("Error loading system settings:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      localStorage.setItem("systemSettings", JSON.stringify(settings))
      localStorage.setItem("companyInfo", JSON.stringify(settings.company))
      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save system settings.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedSettings = (section: keyof SystemSettings, subsection: string, field: string, value: any) => {
    setSettings((prev) => ({
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string)
        setShowCropDialog(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener("load", () => resolve(image))
      image.addEventListener("error", (error) => reject(error))
      image.setAttribute("crossOrigin", "anonymous")
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )

    return canvas.toDataURL("image/jpeg")
  }

  const handleCropSave = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
        updateSettings("company", "logo", croppedImage)
        setShowCropDialog(false)
        setImageSrc("")
      }
    } catch (e) {
      console.error(e)
    }
  }

  const addServiceType = () => {
    let serviceToAdd = ""

    if (selectedServiceType === "OTHERS") {
      serviceToAdd = customServiceType.trim().toUpperCase()
    } else {
      serviceToAdd = selectedServiceType
    }

    if (serviceToAdd && !settings.company.customServiceTypes.includes(serviceToAdd)) {
      updateSettings("company", "customServiceTypes", [...settings.company.customServiceTypes, serviceToAdd])
      setSelectedServiceType("")
      setCustomServiceType("")
      setShowCustomInput(false)
    }
  }

  const removeServiceType = (serviceType: string) => {
    updateSettings(
      "company",
      "customServiceTypes",
      settings.company.customServiceTypes.filter((type) => type !== serviceType),
    )
  }

  const addColor = () => {
    if (newColor && !settings.company.preferredColors.includes(newColor)) {
      updateSettings("company", "preferredColors", [...settings.company.preferredColors, newColor])
      setShowColorDialog(false)
      setNewColor("#10b981")
    }
  }

  const removeColor = (color: string) => {
    if (settings.company.preferredColors.length > 1) {
      updateSettings(
        "company",
        "preferredColors",
        settings.company.preferredColors.filter((c) => c !== color),
      )
    }
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
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>System Config</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Tax & Legal</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Operations</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            {/* Company Information Section */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Company Information</span>
                  </CardTitle>
                  <CardDescription>Update your company details for documents and reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div>
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center space-x-4">
                        <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="flex-1" />
                        <Button variant="outline" onClick={() => document.getElementById("logo")?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                      {settings.company.logo && (
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                          <img
                            src={settings.company.logo || "/placeholder.svg"}
                            alt="Company Logo"
                            className="h-20 w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={settings.company.name}
                        onChange={(e) => updateSettings("company", "name", e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input
                        id="registrationNumber"
                        value={settings.company.registrationNumber}
                        onChange={(e) => updateSettings("company", "registrationNumber", e.target.value)}
                        placeholder="Enter registration number"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={settings.company.address}
                      onChange={(e) => updateSettings("company", "address", e.target.value)}
                      placeholder="Enter company address"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={settings.company.city}
                        onChange={(e) => updateSettings("company", "city", e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="region">Region *</Label>
                      <Input
                        id="region"
                        value={settings.company.region}
                        onChange={(e) => updateSettings("company", "region", e.target.value)}
                        placeholder="Enter region"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={settings.company.postalCode}
                        onChange={(e) => updateSettings("company", "postalCode", e.target.value)}
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={settings.company.phone}
                        onChange={(e) => updateSettings("company", "phone", e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.company.email}
                        onChange={(e) => updateSettings("company", "email", e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={settings.company.website}
                      onChange={(e) => updateSettings("company", "website", e.target.value)}
                      placeholder="Enter website URL"
                    />
                  </div>

                  {/* Tax Information */}
                  <div>
                    <Label htmlFor="taxId">Tax Identification Number (TIN) *</Label>
                    <Input
                      id="taxId"
                      value={settings.company.taxId}
                      onChange={(e) => updateSettings("company", "taxId", e.target.value)}
                      placeholder="Enter TIN"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <div className="space-y-6">
                {/* Custom Service Types */}
                <Card>
                  <CardHeader>
                    <CardTitle>Service Types</CardTitle>
                    <CardDescription>Select hospitality services offered by your business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Select
                          value={selectedServiceType}
                          onValueChange={(value) => {
                            setSelectedServiceType(value)
                            setShowCustomInput(value === "OTHERS")
                          }}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {predefinedServiceTypes.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))}
                            <SelectItem value="OTHERS">Others (Custom)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={addServiceType}
                          disabled={
                            !selectedServiceType || (selectedServiceType === "OTHERS" && !customServiceType.trim())
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {showCustomInput && (
                        <Input
                          placeholder="Enter custom service type"
                          value={customServiceType}
                          onChange={(e) => setCustomServiceType(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addServiceType()}
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {settings.company.customServiceTypes.map((serviceType) => (
                        <Badge key={serviceType} variant="secondary" className="flex items-center space-x-1">
                          <span>{serviceType.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                          <button onClick={() => removeServiceType(serviceType)} className="ml-1 hover:text-red-600">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Color Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Color Preferences</span>
                    </CardTitle>
                    <CardDescription>Customize the color scheme for reports and charts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" onClick={() => setShowColorDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Color
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {settings.company.preferredColors.map((color, index) => (
                        <div key={color} className="relative group">
                          <div
                            className="w-full h-12 rounded-lg border-2 border-gray-200 cursor-pointer relative"
                            style={{ backgroundColor: color }}
                          >
                            {settings.company.preferredColors.length > 1 && (
                              <button
                                onClick={() => removeColor(color)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-center mt-1 text-gray-600">{color}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>System Configuration</span>
              </CardTitle>
              <CardDescription>Basic system settings and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select
                    value={settings.general.defaultCurrency}
                    onValueChange={(value) => updateSettings("general", "defaultCurrency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GHS">Ghana Cedi (GHS)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSettings("general", "timezone", value)}
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
                    value={settings.general.dateFormat}
                    onValueChange={(value) => updateSettings("general", "dateFormat", value)}
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
                  <Label>Time Format</Label>
                  <Select
                    value={settings.general.timeFormat}
                    onValueChange={(value) => updateSettings("general", "timeFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fiscal Year Start</Label>
                <Input
                  type="date"
                  value={settings.general.fiscalYearStart}
                  onChange={(e) => updateSettings("general", "fiscalYearStart", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select
                  value={settings.general.defaultLanguage}
                  onValueChange={(value) => updateSettings("general", "defaultLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tw">Twi</SelectItem>
                    <SelectItem value="ga">Ga</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax & Legal Settings</CardTitle>
              <CardDescription>Configure tax rates and legal compliance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>VAT Rate (%)</Label>
                  <Input
                    type="number"
                    value={settings.tax.vatRate}
                    onChange={(e) => updateSettings("tax", "vatRate", Number.parseFloat(e.target.value))}
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>NHIL Rate (%)</Label>
                  <Input
                    type="number"
                    value={settings.tax.nhilRate}
                    onChange={(e) => updateSettings("tax", "nhilRate", Number.parseFloat(e.target.value))}
                    step="0.1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>GETFUND Rate (%)</Label>
                  <Input
                    type="number"
                    value={settings.tax.getfundRate}
                    onChange={(e) => updateSettings("tax", "getfundRate", Number.parseFloat(e.target.value))}
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>COVID Levy Rate (%)</Label>
                  <Input
                    type="number"
                    value={settings.tax.covidLevyRate}
                    onChange={(e) => updateSettings("tax", "covidLevyRate", Number.parseFloat(e.target.value))}
                    step="0.1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Invoice Terms</Label>
                <Textarea
                  value={settings.tax.invoiceTerms}
                  onChange={(e) => updateSettings("tax", "invoiceTerms", e.target.value)}
                  placeholder="Enter default invoice terms"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tax Display Mode</Label>
                <Select
                  value={settings.tax.taxDisplayMode}
                  onValueChange={(value) => updateSettings("tax", "taxDisplayMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inclusive">Tax Inclusive</SelectItem>
                    <SelectItem value="exclusive">Tax Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment & Billing Settings</CardTitle>
              <CardDescription>Configure payment methods and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Enabled Payment Methods</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "cash", label: "Cash" },
                    { id: "card", label: "Credit/Debit Card" },
                    { id: "bank_transfer", label: "Bank Transfer" },
                    { id: "mobile_money", label: "Mobile Money" },
                    { id: "cheque", label: "Cheque" },
                    { id: "crypto", label: "Cryptocurrency" },
                  ].map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <Switch
                        checked={settings.payment.enabledMethods.includes(method.id)}
                        onCheckedChange={(checked) => {
                          const methods = checked
                            ? [...settings.payment.enabledMethods, method.id]
                            : settings.payment.enabledMethods.filter((m) => m !== method.id)
                          updateSettings("payment", "enabledMethods", methods)
                        }}
                      />
                      <Label>{method.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Payment Method</Label>
                  <Select
                    value={settings.payment.defaultPaymentMethod}
                    onValueChange={(value) => updateSettings("payment", "defaultPaymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Deposit Percentage (%)</Label>
                  <Input
                    type="number"
                    value={settings.payment.depositPercentage}
                    onChange={(e) => updateSettings("payment", "depositPercentage", Number.parseInt(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Prefix</Label>
                  <Input
                    value={settings.payment.invoicePrefix}
                    onChange={(e) => updateSettings("payment", "invoicePrefix", e.target.value)}
                    placeholder="INV"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Receipt Prefix</Label>
                  <Input
                    value={settings.payment.receiptPrefix}
                    onChange={(e) => updateSettings("payment", "receiptPrefix", e.target.value)}
                    placeholder="RCP"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.payment.requireDeposit}
                    onCheckedChange={(checked) => updateSettings("payment", "requireDeposit", checked)}
                  />
                  <Label>Require Deposit for Bookings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.payment.autoInvoicing}
                    onCheckedChange={(checked) => updateSettings("payment", "autoInvoicing", checked)}
                  />
                  <Label>Enable Auto-Invoicing</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security & Access Control</CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Password Length</Label>
                  <Input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSettings("security", "passwordMinLength", Number.parseInt(e.target.value))}
                    min="6"
                    max="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSettings("security", "sessionTimeout", Number.parseInt(e.target.value))}
                    min="5"
                    max="480"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Maximum Login Attempts</Label>
                <Input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => updateSettings("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                  min="3"
                  max="10"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.passwordRequireSpecial}
                    onCheckedChange={(checked) => updateSettings("security", "passwordRequireSpecial", checked)}
                  />
                  <Label>Require Special Characters in Passwords</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.passwordRequireNumbers}
                    onCheckedChange={(checked) => updateSettings("security", "passwordRequireNumbers", checked)}
                  />
                  <Label>Require Numbers in Passwords</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.enableTwoFactor}
                    onCheckedChange={(checked) => updateSettings("security", "enableTwoFactor", checked)}
                  />
                  <Label>Enable Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.auditLogging}
                    onCheckedChange={(checked) => updateSettings("security", "auditLogging", checked)}
                  />
                  <Label>Enable Audit Logging</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Settings */}
        <TabsContent value="operations">
          <Card>
            <CardHeader>
              <CardTitle>Business Operations</CardTitle>
              <CardDescription>Configure operational settings and business rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Business Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={settings.operations.businessHours.start}
                      onChange={(e) => updateNestedSettings("operations", "businessHours", "start", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={settings.operations.businessHours.end}
                      onChange={(e) => updateNestedSettings("operations", "businessHours", "end", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Working Days</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "monday", label: "Monday" },
                    { id: "tuesday", label: "Tuesday" },
                    { id: "wednesday", label: "Wednesday" },
                    { id: "thursday", label: "Thursday" },
                    { id: "friday", label: "Friday" },
                    { id: "saturday", label: "Saturday" },
                    { id: "sunday", label: "Sunday" },
                  ].map((day) => (
                    <div key={day.id} className="flex items-center space-x-2">
                      <Switch
                        checked={settings.operations.businessHours.workingDays.includes(day.id)}
                        onCheckedChange={(checked) => {
                          const days = checked
                            ? [...settings.operations.businessHours.workingDays, day.id]
                            : settings.operations.businessHours.workingDays.filter((d) => d !== day.id)
                          updateNestedSettings("operations", "businessHours", "workingDays", days)
                        }}
                      />
                      <Label>{day.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Low Stock Threshold</Label>
                <Input
                  type="number"
                  value={settings.operations.lowStockThreshold}
                  onChange={(e) => updateSettings("operations", "lowStockThreshold", Number.parseInt(e.target.value))}
                  min="0"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.operations.inventoryTracking}
                    onCheckedChange={(checked) => updateSettings("operations", "inventoryTracking", checked)}
                  />
                  <Label>Enable Inventory Tracking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.operations.autoReorderPoint}
                    onCheckedChange={(checked) => updateSettings("operations", "autoReorderPoint", checked)}
                  />
                  <Label>Auto Reorder Point Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.operations.enableBarcode}
                    onCheckedChange={(checked) => updateSettings("operations", "enableBarcode", checked)}
                  />
                  <Label>Enable Barcode Scanning</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSettings("notifications", "emailNotifications", checked)}
                  />
                  <Label>Enable Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => updateSettings("notifications", "smsNotifications", checked)}
                  />
                  <Label>Enable SMS Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.notifications.systemAlerts}
                    onCheckedChange={(checked) => updateSettings("notifications", "systemAlerts", checked)}
                  />
                  <Label>Enable System Alerts</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Reminder Days Before Due</Label>
                  <Input
                    type="number"
                    value={settings.notifications.reminderDays}
                    onChange={(e) => updateSettings("notifications", "reminderDays", Number.parseInt(e.target.value))}
                    min="1"
                    max="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Escalation Hours</Label>
                  <Input
                    type="number"
                    value={settings.notifications.escalationHours}
                    onChange={(e) =>
                      updateSettings("notifications", "escalationHours", Number.parseInt(e.target.value))
                    }
                    min="1"
                    max="168"
                  />
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
              Save System Settings
            </>
          )}
        </Button>
      </div>

      {/* Color Picker Dialog */}
      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Color</DialogTitle>
            <DialogDescription>Choose a color to add to your preferred color palette</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="colorPicker">Color</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="colorPicker"
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-lg border-2 border-gray-200" style={{ backgroundColor: newColor }} />
              <span className="text-sm text-gray-600">Preview</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowColorDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addColor}>Add Color</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crop Logo</DialogTitle>
            <DialogDescription>Adjust the crop area for your company logo</DialogDescription>
          </DialogHeader>
          <div className="relative h-64 w-full">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zoom">Zoom</Label>
            <input
              id="zoom"
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCropDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCropSave}>Save Logo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
