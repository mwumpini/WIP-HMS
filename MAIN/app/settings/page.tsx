"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, Upload, CheckCircle, AlertTriangle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    hotelName: "Mamani Hotel",
    hotelEmail: "mwumpini@gmail.com",
    hotelPhone: "0540222273",
    hotelWebsite: "",
    hotelAddress: "Hse Num PL 485, Gurugu, Tamale Northern Region, Ghana",
    totalRooms: "50",
    hall1Capacity: "70",
    hall2Capacity: "30",
    hall3Capacity: "15",
    poolCapacity: "",
    restaurantCapacity: "",
    invoicePrefix: "MH-INV-",
    nextInvoiceNumber: "001",
    defaultTemplate: "",
    defaultCurrency: "",
    taxRate: "12.5",
    paymentTerms: "30",
    invoiceNotes: "Thank you for choosing Mamani Hotel. Payment is due within 30 days. We appreciate your business!",
    fromEmail: "noreply@mamanihotel.com",
    fromName: "Mamani Hotel",
    facilities: {
      pool: true,
      restaurant: true,
      massage: true,
      nightclub: true,
      vehicles: true,
      shop: true,
      wifi: true,
      airportPickup: true,
    },
    notifications: {
      autoSendInvoices: true,
      sendPaymentReminders: true,
      emailNotifications: true,
      welcomeEmails: true,
      bookingNotifications: true,
      paymentNotifications: true,
      overdueNotifications: true,
      maintenanceNotifications: true,
      dailySummary: true,
      conferenceReminders: true,
    },
  })

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleFacilityChange = useCallback((facility, checked) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: checked,
      },
    }))
  }, [])

  const handleNotificationChange = useCallback((notification, checked) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [notification]: checked,
      },
    }))
  }, [])

  const handleSaveSettings = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Saving hotel settings:", formData)

      setSuccess("Settings saved successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [formData])

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Uploading hotel logo:", file.name)
      setSuccess("Logo uploaded successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to upload logo. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

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
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8" role="main">
        <div className="px-4 py-6 sm:px-0">
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600">Manage Mamani Hotel settings and preferences</p>
            </div>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hotel Information</CardTitle>
                <CardDescription>Basic information about Mamani Hotel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hotel-name">Hotel Name</Label>
                    <Input
                      id="hotel-name"
                      value={formData.hotelName}
                      onChange={(e) => handleInputChange("hotelName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hotel-email">Email</Label>
                    <Input
                      id="hotel-email"
                      type="email"
                      value={formData.hotelEmail}
                      onChange={(e) => handleInputChange("hotelEmail", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hotel-phone">Phone</Label>
                    <Input
                      id="hotel-phone"
                      value={formData.hotelPhone}
                      onChange={(e) => handleInputChange("hotelPhone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hotel-website">Website</Label>
                    <Input
                      id="hotel-website"
                      placeholder="www.mamanihotel.com"
                      value={formData.hotelWebsite}
                      onChange={(e) => handleInputChange("hotelWebsite", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hotel-address">Address</Label>
                  <Textarea
                    id="hotel-address"
                    value={formData.hotelAddress}
                    onChange={(e) => handleInputChange("hotelAddress", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hotel-logo">Hotel Logo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="hotel-logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isLoading}
                    />
                    <Button variant="outline" size="sm" disabled={isLoading}>
                      <Upload className="mr-2 h-4 w-4" />
                      {isLoading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hotel Capacity & Facilities</CardTitle>
                <CardDescription>Configure hotel capacity and available facilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="total-rooms">Total Rooms</Label>
                    <Input
                      id="total-rooms"
                      type="number"
                      value={formData.totalRooms}
                      onChange={(e) => handleInputChange("totalRooms", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hall1-capacity">Hall 1 Capacity</Label>
                    <Input
                      id="hall1-capacity"
                      type="number"
                      value={formData.hall1Capacity}
                      onChange={(e) => handleInputChange("hall1Capacity", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hall2-capacity">Hall 2 Capacity</Label>
                    <Input
                      id="hall2-capacity"
                      type="number"
                      value={formData.hall2Capacity}
                      onChange={(e) => handleInputChange("hall2Capacity", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hall3-capacity">Hall 3 Capacity</Label>
                    <Input
                      id="hall3-capacity"
                      type="number"
                      value={formData.hall3Capacity}
                      onChange={(e) => handleInputChange("hall3Capacity", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pool-capacity">Pool Capacity</Label>
                    <Input
                      id="pool-capacity"
                      type="number"
                      placeholder="50"
                      value={formData.poolCapacity}
                      onChange={(e) => handleInputChange("poolCapacity", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurant-capacity">Restaurant Capacity</Label>
                    <Input
                      id="restaurant-capacity"
                      type="number"
                      placeholder="80"
                      value={formData.restaurantCapacity}
                      onChange={(e) => handleInputChange("restaurantCapacity", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Available Facilities</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="pool"
                        checked={formData.facilities.pool}
                        onCheckedChange={(checked) => handleFacilityChange("pool", checked)}
                      />
                      <Label htmlFor="pool">Swimming Pool</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="restaurant"
                        checked={formData.facilities.restaurant}
                        onCheckedChange={(checked) => handleFacilityChange("restaurant", checked)}
                      />
                      <Label htmlFor="restaurant">Restaurant & Bar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="massage"
                        checked={formData.facilities.massage}
                        onCheckedChange={(checked) => handleFacilityChange("massage", checked)}
                      />
                      <Label htmlFor="massage">Massage Parlor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="nightclub"
                        checked={formData.facilities.nightclub}
                        onCheckedChange={(checked) => handleFacilityChange("nightclub", checked)}
                      />
                      <Label htmlFor="nightclub">Nightclub</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="vehicles"
                        checked={formData.facilities.vehicles}
                        onCheckedChange={(checked) => handleFacilityChange("vehicles", checked)}
                      />
                      <Label htmlFor="vehicles">Vehicle Rental</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="shop"
                        checked={formData.facilities.shop}
                        onCheckedChange={(checked) => handleFacilityChange("shop", checked)}
                      />
                      <Label htmlFor="shop">Mini Shop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="wifi"
                        checked={formData.facilities.wifi}
                        onCheckedChange={(checked) => handleFacilityChange("wifi", checked)}
                      />
                      <Label htmlFor="wifi">Free WiFi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="airport-pickup"
                        checked={formData.facilities.airportPickup}
                        onCheckedChange={(checked) => handleFacilityChange("airportPickup", checked)}
                      />
                      <Label htmlFor="airport-pickup">Airport Pickup</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
                <CardDescription>Configure invoice defaults and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                    <Input
                      id="invoice-prefix"
                      value={formData.invoicePrefix}
                      onChange={(e) => handleInputChange("invoicePrefix", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="next-invoice-number">Next Invoice Number</Label>
                    <Input
                      id="next-invoice-number"
                      type="number"
                      value={formData.nextInvoiceNumber}
                      onChange={(e) => handleInputChange("nextInvoiceNumber", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="default-template">Default Template</Label>
                    <Select
                      value={formData.defaultTemplate}
                      onValueChange={(value) => handleInputChange("defaultTemplate", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mamani-classic">Mamani Classic</SelectItem>
                        <SelectItem value="modern-luxury">Modern Luxury</SelectItem>
                        <SelectItem value="business-formal">Business Formal</SelectItem>
                        <SelectItem value="boutique-style">Boutique Style</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="default-currency">Default Currency</Label>
                    <Select
                      value={formData.defaultCurrency}
                      onValueChange={(value) => handleInputChange("defaultCurrency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ghs">GHS (GH₵)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => handleInputChange("taxRate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-terms">Payment Terms (Days)</Label>
                    <Input
                      id="payment-terms"
                      type="number"
                      value={formData.paymentTerms}
                      onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                  <Textarea
                    id="invoice-notes"
                    value={formData.invoiceNotes}
                    onChange={(e) => handleInputChange("invoiceNotes", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email preferences and templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={formData.fromEmail}
                      onChange={(e) => handleInputChange("fromEmail", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      value={formData.fromName}
                      onChange={(e) => handleInputChange("fromName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-send-invoices"
                    checked={formData.notifications.autoSendInvoices}
                    onCheckedChange={(checked) => handleNotificationChange("autoSendInvoices", checked)}
                  />
                  <Label htmlFor="auto-send-invoices">Automatically send invoices via email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="send-payment-reminders"
                    checked={formData.notifications.sendPaymentReminders}
                    onCheckedChange={(checked) => handleNotificationChange("sendPaymentReminders", checked)}
                  />
                  <Label htmlFor="send-payment-reminders">Send payment reminders for overdue invoices</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-notifications"
                    checked={formData.notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                  <Label htmlFor="email-notifications">Email notifications for new bookings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="welcome-emails"
                    checked={formData.notifications.welcomeEmails}
                    onCheckedChange={(checked) => handleNotificationChange("welcomeEmails", checked)}
                  />
                  <Label htmlFor="welcome-emails">Send welcome emails to new guests</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Rates & Pricing</CardTitle>
                <CardDescription>Configure default rates for hotel services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hall1-rate">Hall 1 Hourly Rate (GH₵)</Label>
                    <Input id="hall1-rate" type="number" placeholder="200" />
                  </div>
                  <div>
                    <Label htmlFor="hall2-rate">Hall 2 Hourly Rate (GH₵)</Label>
                    <Input id="hall2-rate" type="number" placeholder="150" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hall3-rate">Hall 3 Hourly Rate (GH₵)</Label>
                    <Input id="hall3-rate" type="number" placeholder="100" />
                  </div>
                  <div>
                    <Label htmlFor="airport-pickup-rate">Airport Pickup Rate (GH₵)</Label>
                    <Input id="airport-pickup-rate" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle-rental-rate">Vehicle Rental Daily Rate (GH₵)</Label>
                    <Input id="vehicle-rental-rate" type="number" placeholder="300" />
                  </div>
                  <div>
                    <Label htmlFor="massage-rate">Massage Service Rate (GH₵)</Label>
                    <Input id="massage-rate" type="number" placeholder="80" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="booking-notifications"
                    checked={formData.notifications.bookingNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("bookingNotifications", checked)}
                  />
                  <Label htmlFor="booking-notifications">New booking notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="payment-notifications"
                    checked={formData.notifications.paymentNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("paymentNotifications", checked)}
                  />
                  <Label htmlFor="payment-notifications">Payment received notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="overdue-notifications"
                    checked={formData.notifications.overdueNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("overdueNotifications", checked)}
                  />
                  <Label htmlFor="overdue-notifications">Overdue invoice notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenance-notifications"
                    checked={formData.notifications.maintenanceNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("maintenanceNotifications", checked)}
                  />
                  <Label htmlFor="maintenance-notifications">Maintenance alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="daily-summary"
                    checked={formData.notifications.dailySummary}
                    onCheckedChange={(checked) => handleNotificationChange("dailySummary", checked)}
                  />
                  <Label htmlFor="daily-summary">Daily summary emails</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="conference-reminders"
                    checked={formData.notifications.conferenceReminders}
                    onCheckedChange={(checked) => handleNotificationChange("conferenceReminders", checked)}
                  />
                  <Label htmlFor="conference-reminders">Conference hall booking reminders</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
