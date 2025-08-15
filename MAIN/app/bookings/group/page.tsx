"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2, Save, Send } from "lucide-react"
import { format } from "date-fns"
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

export default function GroupBookingPage() {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [roomRequirements, setRoomRequirements] = useState([
    { type: "Standard Room", quantity: 10, rate: 120 },
    { type: "Deluxe Suite", quantity: 3, rate: 250 },
  ])
  const [services, setServices] = useState([
    { name: "Conference Hall", quantity: 1, rate: 500, duration: "3 days" },
    { name: "Breakfast Buffet", quantity: 26, rate: 18, duration: "per person/day" },
    { name: "Welcome Dinner", quantity: 26, rate: 45, duration: "per person" },
  ])

  const addRoomRequirement = () => {
    setRoomRequirements([...roomRequirements, { type: "", quantity: 1, rate: 0 }])
  }

  const addService = () => {
    setServices([...services, { name: "", quantity: 1, rate: 0, duration: "" }])
  }

  const calculateTotal = () => {
    const roomTotal = roomRequirements.reduce((sum, room) => sum + room.quantity * room.rate * 3, 0) // 3 nights
    const serviceTotal = services.reduce((sum, service) => sum + service.quantity * service.rate, 0)
    return roomTotal + serviceTotal
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
                <BreadcrumbLink href="/bookings">Bookings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Group Booking</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Group Booking</h2>
              <p className="text-gray-600">Create comprehensive group bookings with multiple rooms and services</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Send Proposal
              </Button>
            </div>
          </div>

          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Group Details</TabsTrigger>
              <TabsTrigger value="rooms">Room Requirements</TabsTrigger>
              <TabsTrigger value="services">Services & Facilities</TabsTrigger>
              <TabsTrigger value="summary">Summary & Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Group Information</CardTitle>
                    <CardDescription>Basic details about the group booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="group-name">Group/Event Name</Label>
                      <Input id="group-name" placeholder="Annual Sales Conference 2024" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="group-size">Total Attendees</Label>
                        <Input id="group-size" type="number" placeholder="26" />
                      </div>
                      <div>
                        <Label htmlFor="group-type">Group Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="tour">Tour Group</SelectItem>
                            <SelectItem value="family">Family Reunion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="special-requirements">Special Requirements</Label>
                      <Textarea
                        id="special-requirements"
                        placeholder="Any special dietary requirements, accessibility needs, or other requests..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Primary contact for this group booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">Contact Name</Label>
                        <Input id="contact-name" placeholder="John Smith" />
                      </div>
                      <div>
                        <Label htmlFor="contact-title">Title/Position</Label>
                        <Input id="contact-title" placeholder="Event Coordinator" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" placeholder="john@company.com" />
                      </div>
                      <div>
                        <Label htmlFor="contact-phone">Phone</Label>
                        <Input id="contact-phone" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input id="company" placeholder="ABC Corporation" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Dates & Duration</CardTitle>
                    <CardDescription>Event dates and duration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Check-in Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>Check-out Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rooms">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Room Requirements</CardTitle>
                      <CardDescription>Specify room types and quantities needed</CardDescription>
                    </div>
                    <Button onClick={addRoomRequirement} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Room Type
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roomRequirements.map((room, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                        <div className="col-span-4">
                          <Label>Room Type</Label>
                          <Select
                            value={room.type}
                            onValueChange={(value) => {
                              const updated = [...roomRequirements]
                              updated[index].type = value
                              setRoomRequirements(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Standard Room">Standard Room</SelectItem>
                              <SelectItem value="Deluxe Suite">Deluxe Suite</SelectItem>
                              <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
                              <SelectItem value="Family Room">Family Room</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            value={room.quantity}
                            onChange={(e) => {
                              const updated = [...roomRequirements]
                              updated[index].quantity = Number.parseInt(e.target.value) || 0
                              setRoomRequirements(updated)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Rate/Night</Label>
                          <Input
                            type="number"
                            value={room.rate}
                            onChange={(e) => {
                              const updated = [...roomRequirements]
                              updated[index].rate = Number.parseFloat(e.target.value) || 0
                              setRoomRequirements(updated)
                            }}
                          />
                        </div>
                        <div className="col-span-3">
                          <Label>Subtotal (3 nights)</Label>
                          <Input value={`$${(room.quantity * room.rate * 3).toFixed(2)}`} disabled />
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setRoomRequirements(roomRequirements.filter((_, i) => i !== index))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Services & Facilities</CardTitle>
                      <CardDescription>Additional services required for the group</CardDescription>
                    </div>
                    <Button onClick={addService} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                        <div className="col-span-4">
                          <Label>Service</Label>
                          <Select
                            value={service.name}
                            onValueChange={(value) => {
                              const updated = [...services]
                              updated[index].name = value
                              setServices(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Conference Hall">Conference Hall</SelectItem>
                              <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                              <SelectItem value="Breakfast Buffet">Breakfast Buffet</SelectItem>
                              <SelectItem value="Welcome Dinner">Welcome Dinner</SelectItem>
                              <SelectItem value="AV Equipment">AV Equipment</SelectItem>
                              <SelectItem value="Transportation">Transportation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            value={service.quantity}
                            onChange={(e) => {
                              const updated = [...services]
                              updated[index].quantity = Number.parseInt(e.target.value) || 0
                              setServices(updated)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Rate</Label>
                          <Input
                            type="number"
                            value={service.rate}
                            onChange={(e) => {
                              const updated = [...services]
                              updated[index].rate = Number.parseFloat(e.target.value) || 0
                              setServices(updated)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Duration/Unit</Label>
                          <Input
                            value={service.duration}
                            onChange={(e) => {
                              const updated = [...services]
                              updated[index].duration = e.target.value
                              setServices(updated)
                            }}
                            placeholder="per day"
                          />
                        </div>
                        <div className="col-span-1">
                          <Label>Total</Label>
                          <Input value={`$${(service.quantity * service.rate).toFixed(2)}`} disabled />
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setServices(services.filter((_, i) => i !== index))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Summary</CardTitle>
                      <CardDescription>Complete overview of the group booking</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Room Requirements</h4>
                        <div className="space-y-2">
                          {roomRequirements.map((room, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span>
                                {room.quantity}x {room.type}
                              </span>
                              <span>${(room.quantity * room.rate * 3).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Services & Facilities</h4>
                        <div className="space-y-2">
                          {services.map((service, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span>
                                {service.quantity}x {service.name}
                              </span>
                              <span>${(service.quantity * service.rate).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Room Total:</span>
                        <span>
                          ${roomRequirements.reduce((sum, room) => sum + room.quantity * room.rate * 3, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Services Total:</span>
                        <span>
                          ${services.reduce((sum, service) => sum + service.quantity * service.rate, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Create Group Booking</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
