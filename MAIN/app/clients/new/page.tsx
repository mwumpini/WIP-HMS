"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Plus, Trash2, Building, User } from "lucide-react"
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

export default function NewClientPage() {
  const [clientType, setClientType] = useState("individual")
  const [contacts, setContacts] = useState([{ name: "", title: "", email: "", phone: "", isPrimary: true }])
  const [preferences, setPreferences] = useState({
    roomType: "",
    floor: "",
    bedType: "",
    smokingPreference: "non-smoking",
    specialRequests: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
  })

  const addContact = () => {
    setContacts([...contacts, { name: "", title: "", email: "", phone: "", isPrimary: false }])
  }

  const removeContact = (index: number) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter((_, i) => i !== index))
    }
  }

  const updateContact = (index: number, field: string, value: any) => {
    const updated = [...contacts]
    updated[index] = { ...updated[index], [field]: value }
    setContacts(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/clients">Clients</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Add New Client</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
              <p className="text-gray-600">Create a comprehensive client profile for personalized service</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Client
              </Button>
            </div>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="notes">Notes & History</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Type & Basic Information</CardTitle>
                      <CardDescription>Select client type and provide essential details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="client-type">Client Type</Label>
                        <Select value={clientType} onValueChange={setClientType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>Individual Guest</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="corporate">
                              <div className="flex items-center space-x-2">
                                <Building className="h-4 w-4" />
                                <span>Corporate Client</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="travel_agent">
                              <div className="flex items-center space-x-2">
                                <Building className="h-4 w-4" />
                                <span>Travel Agent</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="event_planner">
                              <div className="flex items-center space-x-2">
                                <Building className="h-4 w-4" />
                                <span>Event Planner</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {clientType === "individual" ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first-name">First Name *</Label>
                            <Input id="first-name" placeholder="John" required />
                          </div>
                          <div>
                            <Label htmlFor="last-name">Last Name *</Label>
                            <Input id="last-name" placeholder="Doe" required />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Label htmlFor="company-name">Company/Organization Name *</Label>
                          <Input id="company-name" placeholder="ABC Corporation" required />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Primary Email *</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Primary Phone *</Label>
                          <Input id="phone" placeholder="+1 (555) 123-4567" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="123 Main Street, City, State, ZIP Code, Country" rows={3} />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="nationality">Nationality</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nationality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="language">Preferred Language</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                              <SelectItem value="ja">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="id-type">ID Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ID type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="drivers_license">Driver's License</SelectItem>
                              <SelectItem value="national_id">National ID</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="id-number">ID Number</Label>
                        <Input id="id-number" placeholder="Enter ID number" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="client-status">Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="marketing-emails" />
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="sms-notifications" />
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="loyalty-program" />
                        <Label htmlFor="loyalty-program">Loyalty Program</Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Photo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Manage multiple contacts for this client</CardDescription>
                    </div>
                    <Button onClick={addContact} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Contact
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contacts.map((contact, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">Contact {index + 1}</h4>
                            {contact.isPrimary && <Badge>Primary</Badge>}
                          </div>
                          {contacts.length > 1 && (
                            <Button variant="outline" size="sm" onClick={() => removeContact(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name</Label>
                            <Input
                              value={contact.name}
                              onChange={(e) => updateContact(index, "name", e.target.value)}
                              placeholder="Contact name"
                            />
                          </div>
                          <div>
                            <Label>Title/Position</Label>
                            <Input
                              value={contact.title}
                              onChange={(e) => updateContact(index, "title", e.target.value)}
                              placeholder="Manager, Assistant, etc."
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={contact.email}
                              onChange={(e) => updateContact(index, "email", e.target.value)}
                              placeholder="contact@example.com"
                            />
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={contact.phone}
                              onChange={(e) => updateContact(index, "phone", e.target.value)}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={contact.isPrimary}
                            onCheckedChange={(checked) => updateContact(index, "isPrimary", checked)}
                          />
                          <Label>Primary Contact</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Preferences</CardTitle>
                    <CardDescription>Default preferences for future bookings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Room Type</Label>
                        <Select
                          value={preferences.roomType}
                          onValueChange={(value) => setPreferences({ ...preferences, roomType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Room</SelectItem>
                            <SelectItem value="deluxe">Deluxe Suite</SelectItem>
                            <SelectItem value="presidential">Presidential Suite</SelectItem>
                            <SelectItem value="family">Family Room</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Floor Preference</Label>
                        <Select
                          value={preferences.floor}
                          onValueChange={(value) => setPreferences({ ...preferences, floor: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select floor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ground">Ground Floor</SelectItem>
                            <SelectItem value="low">Low Floor (1-3)</SelectItem>
                            <SelectItem value="mid">Mid Floor (4-7)</SelectItem>
                            <SelectItem value="high">High Floor (8+)</SelectItem>
                            <SelectItem value="no_preference">No Preference</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Bed Type</Label>
                        <Select
                          value={preferences.bedType}
                          onValueChange={(value) => setPreferences({ ...preferences, bedType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select bed type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single Bed</SelectItem>
                            <SelectItem value="double">Double Bed</SelectItem>
                            <SelectItem value="queen">Queen Bed</SelectItem>
                            <SelectItem value="king">King Bed</SelectItem>
                            <SelectItem value="twin">Twin Beds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Smoking Preference</Label>
                        <Select
                          value={preferences.smokingPreference}
                          onValueChange={(value) => setPreferences({ ...preferences, smokingPreference: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="non-smoking">Non-Smoking</SelectItem>
                            <SelectItem value="smoking">Smoking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Special Requirements</CardTitle>
                    <CardDescription>Accessibility and dietary needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Accessibility Needs</Label>
                      <Textarea
                        value={preferences.accessibilityNeeds}
                        onChange={(e) => setPreferences({ ...preferences, accessibilityNeeds: e.target.value })}
                        placeholder="Wheelchair accessible, hearing assistance, visual assistance, etc."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Dietary Restrictions</Label>
                      <Textarea
                        value={preferences.dietaryRestrictions}
                        onChange={(e) => setPreferences({ ...preferences, dietaryRestrictions: e.target.value })}
                        placeholder="Vegetarian, vegan, gluten-free, allergies, etc."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Special Requests</Label>
                      <Textarea
                        value={preferences.specialRequests}
                        onChange={(e) => setPreferences({ ...preferences, specialRequests: e.target.value })}
                        placeholder="Late check-in, early check-out, quiet room, etc."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="billing">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Payment methods and billing preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Preferred Payment Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="debit_card">Debit Card</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="corporate_account">Corporate Account</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Credit Limit (if applicable)</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label>Tax ID/VAT Number</Label>
                      <Input placeholder="Enter tax identification number" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-billing" />
                      <Label htmlFor="auto-billing">Enable Auto-billing</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>Address for invoicing purposes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch id="same-as-primary" />
                      <Label htmlFor="same-as-primary">Same as primary address</Label>
                    </div>
                    <div>
                      <Label>Company/Name</Label>
                      <Input placeholder="Billing name" />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Textarea placeholder="Billing address" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input placeholder="City" />
                      </div>
                      <div>
                        <Label>ZIP/Postal Code</Label>
                        <Input placeholder="ZIP Code" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Internal Notes</CardTitle>
                    <CardDescription>Private notes for staff reference</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Staff Notes</Label>
                      <Textarea placeholder="Internal notes about this client (not visible to client)" rows={6} />
                    </div>
                    <div>
                      <Label>VIP Instructions</Label>
                      <Textarea placeholder="Special instructions for VIP treatment" rows={4} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Communication Preferences</CardTitle>
                    <CardDescription>How and when to contact this client</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Preferred Contact Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Best Time to Contact</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Notification Preferences</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="booking-confirmations" />
                          <Label htmlFor="booking-confirmations">Booking Confirmations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-reminders" />
                          <Label htmlFor="payment-reminders">Payment Reminders</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="promotional-offers" />
                          <Label htmlFor="promotional-offers">Promotional Offers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="feedback-requests" />
                          <Label htmlFor="feedback-requests">Feedback Requests</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
