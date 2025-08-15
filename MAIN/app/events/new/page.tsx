"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ArrowLeft, Users, Bed, Utensils } from "lucide-react"
import { format, differenceInDays, addDays } from "date-fns"
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
import Link from "next/link"

const venues = [
  { id: "VEN-001", name: "Grand Ballroom", capacity: 300 },
  { id: "VEN-002", name: "Conference Room A", capacity: 100 },
  { id: "VEN-003", name: "Garden Pavilion", capacity: 150 },
  { id: "VEN-004", name: "Rooftop Terrace", capacity: 80 },
  { id: "VEN-005", name: "OFORIWAA HALL", capacity: 200 },
  { id: "VEN-006", name: "DANKWAH HALL", capacity: 180 },
  { id: "VEN-007", name: "ENO HALL", capacity: 250 },
]

const eventTypes = [
  "Conference",
  "Workshop",
  "Wedding",
  "Corporate Meeting",
  "Private Party",
  "Product Launch",
  "Training Session",
  "Seminar",
]

const eventServices = {
  accommodation: [
    { name: "Standard Room", price: 150, unit: "per night", complementary: ["Breakfast", "WiFi"] },
    { name: "Deluxe Room", price: 200, unit: "per night", complementary: ["Breakfast", "WiFi", "Mini Bar"] },
    {
      name: "Suite Room",
      price: 350,
      unit: "per night",
      complementary: ["Breakfast", "WiFi", "Mini Bar", "Room Service"],
    },
  ],
  catering: [
    { name: "Breakfast", price: 25, unit: "per person", complementary: true },
    { name: "Lunch", price: 45, unit: "per person", complementary: false },
    { name: "Dinner", price: 55, unit: "per person", complementary: false },
    { name: "Coffee Break", price: 15, unit: "per person", complementary: false },
    { name: "Welcome Cocktail", price: 35, unit: "per person", complementary: false },
  ],
  conference: [
    { name: "Projector & Screen", price: 100, unit: "per day", complementary: false },
    { name: "Sound System", price: 150, unit: "per day", complementary: false },
    { name: "Microphones (2)", price: 50, unit: "per day", complementary: false },
    { name: "Flip Chart & Markers", price: 25, unit: "per day", complementary: false },
    { name: "Notepads & Pens", price: 5, unit: "per person", complementary: false },
    { name: "Water Bottles", price: 3, unit: "per person", complementary: false },
    { name: "Sweets/Mints", price: 2, unit: "per person", complementary: false },
  ],
  decoration: [
    { name: "Floral Arrangements", price: 200, unit: "per setup", complementary: false },
    { name: "Table Linens", price: 15, unit: "per table", complementary: false },
    { name: "Special Plates/Cutlery", price: 8, unit: "per person", complementary: false },
    { name: "Centerpieces", price: 35, unit: "per table", complementary: false },
  ],
  transport: [
    { name: "Airport Pickup", price: 80, unit: "per trip", complementary: false },
    { name: "City Tour Vehicle", price: 200, unit: "per day", complementary: false },
    { name: "Shuttle Service", price: 150, unit: "per day", complementary: false },
  ],
  other: [
    { name: "Photography", price: 500, unit: "per day", complementary: false },
    { name: "Videography", price: 800, unit: "per day", complementary: false },
    { name: "Translation Services", price: 100, unit: "per hour", complementary: false },
    { name: "Security", price: 120, unit: "per day", complementary: false },
  ],
}

interface DayCapacity {
  date: Date
  attendees: number
  rooms: number
  breakfast: number
  lunch: number
  dinner: number
  otherServices: string[]
}

export default function NewEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    type: "",
    venue: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    checkInDate: undefined as Date | undefined,
    checkOutDate: undefined as Date | undefined,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    description: "",
    specialRequests: "",
    estimatedRevenue: "",
    isResidential: false,
  })

  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: { quantity: number; price: number; negotiated: boolean }
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dayCapacities, setDayCapacities] = useState<DayCapacity[]>([])
  const [eventDays, setEventDays] = useState(0)
  const [accommodationNights, setAccommodationNights] = useState(0)

  const handleDayCapacityChange = (index: number, field: string, value: number) => {
    setDayCapacities((prev) => {
      const newDayCapacities = [...prev]
      newDayCapacities[index] = { ...newDayCapacities[index], [field]: value }
      return newDayCapacities
    })
  }

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const days = differenceInDays(formData.endDate, formData.startDate) + 1
      const nights = Math.max(0, days - 1)

      setEventDays(days)
      setAccommodationNights(formData.isResidential ? nights : 0)

      const newDayCapacities: DayCapacity[] = []
      for (let i = 0; i < days; i++) {
        const currentDate = addDays(formData.startDate, i)
        const existingDay = dayCapacities.find((day) => day.date.toDateString() === currentDate.toDateString())

        newDayCapacities.push(
          existingDay || {
            date: currentDate,
            attendees: 0,
            rooms: 0,
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            otherServices: [],
          },
        )
      }
      setDayCapacities(newDayCapacities)
    } else {
      setDayCapacities([])
      setEventDays(0)
      setAccommodationNights(0)
    }
  }, [formData.startDate, formData.endDate, formData.isResidential])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (category: string, serviceName: string, defaultPrice: number) => {
    const serviceKey = `${category}-${serviceName}`
    setSelectedServices((prev) => {
      const newServices = { ...prev }
      if (newServices[serviceKey]) {
        delete newServices[serviceKey]
      } else {
        newServices[serviceKey] = {
          quantity: 1,
          price: defaultPrice,
          negotiated: false,
        }
      }
      return newServices
    })
  }

  const updateServiceQuantity = (serviceKey: string, quantity: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceKey]: { ...prev[serviceKey], quantity },
    }))
  }

  const updateServicePrice = (serviceKey: string, price: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceKey]: { ...prev[serviceKey], price, negotiated: true },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Event data:", {
      ...formData,
      services: selectedServices,
      dayCapacities,
      eventDays,
      accommodationNights,
    })

    setIsSubmitting(false)
  }

  const selectedVenue = venues.find((v) => v.id === formData.venue)

  const totalAttendees = Math.max(...dayCapacities.map((day) => day.attendees), 0)
  const totalRooms = Math.max(...dayCapacities.map((day) => day.rooms), 0)
  const totalBreakfast = dayCapacities.reduce((sum, day) => sum + day.breakfast, 0)
  const totalLunch = dayCapacities.reduce((sum, day) => sum + day.lunch, 0)
  const totalDinner = dayCapacities.reduce((sum, day) => sum + day.dinner, 0)

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
                <BreadcrumbLink href="/events">Events</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>New Event</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
                <p className="text-gray-600">Set up a new event or conference booking</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client">Client/Organization *</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => handleInputChange("client", e.target.value)}
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Event Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Select value={formData.venue} onValueChange={(value) => handleInputChange("venue", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue" />
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map((venue) => (
                          <SelectItem key={venue.id} value={venue.id}>
                            {venue.name} (Capacity: {venue.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedVenue && (
                      <p className="text-sm text-gray-500 mt-1">Maximum capacity: {selectedVenue.capacity} people</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the event details, agenda, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date and Time</CardTitle>
                <CardDescription>Set the event schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isResidential"
                    checked={formData.isResidential}
                    onCheckedChange={(checked) => handleInputChange("isResidential", checked as boolean)}
                  />
                  <Label htmlFor="isResidential" className="text-sm">
                    This is a residential event (requires accommodation)
                  </Label>
                </div>

                {formData.isResidential && (
                  <div className="bg-green-50 p-4 rounded-lg space-y-4">
                    <h4 className="font-medium text-green-800">Accommodation Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Check-in Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.checkInDate ? format(formData.checkInDate, "PPP") : "Pick check-in date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.checkInDate}
                              onSelect={(date) => setFormData((prev) => ({ ...prev, checkInDate: date }))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>Check-out Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.checkOutDate ? format(formData.checkOutDate, "PPP") : "Pick check-out date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.checkOutDate}
                              onSelect={(date) => setFormData((prev) => ({ ...prev, checkOutDate: date }))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkInTime">Check-in Time</Label>
                        <Input
                          id="checkInTime"
                          type="time"
                          value={formData.checkInTime}
                          onChange={(e) => handleInputChange("checkInTime", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOutTime">Check-out Time</Label>
                        <Input
                          id="checkOutTime"
                          type="time"
                          value={formData.checkOutTime}
                          onChange={(e) => handleInputChange("checkOutTime", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.startDate && formData.endDate && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>{eventDays}</strong> Event Days
                        </span>
                      </div>
                      {formData.isResidential && formData.checkInDate && formData.checkOutDate && (
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-green-600" />
                          <span>
                            <strong>{accommodationNights}</strong> Accommodation Nights
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity and Accommodation</CardTitle>
                <CardDescription>
                  Specify attendee numbers, room requirements, and services for each day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {dayCapacities.length > 0 && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Event Summary</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Max Attendees</div>
                          <div className="font-semibold text-lg">{totalAttendees}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Max Rooms</div>
                          <div className="font-semibold text-lg">{totalRooms}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Meals</div>
                          <div className="font-semibold text-lg">{totalBreakfast + totalLunch + totalDinner}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Event Duration</div>
                          <div className="font-semibold text-lg">{eventDays} days</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Daily Requirements</h4>
                      {dayCapacities.map((day, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                              Day {index + 1} - {format(day.date, "EEEE, MMMM d, yyyy")}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`attendees-${index}`}>
                                  <Users className="inline h-4 w-4 mr-1" />
                                  Attendees
                                </Label>
                                <Input
                                  id={`attendees-${index}`}
                                  type="number"
                                  value={day.attendees}
                                  onChange={(e) =>
                                    handleDayCapacityChange(index, "attendees", Number.parseInt(e.target.value) || 0)
                                  }
                                  placeholder="0"
                                  min="0"
                                />
                              </div>
                              {formData.isResidential && (
                                <div>
                                  <Label htmlFor={`rooms-${index}`}>
                                    <Bed className="inline h-4 w-4 mr-1" />
                                    Rooms Needed
                                  </Label>
                                  <Input
                                    id={`rooms-${index}`}
                                    type="number"
                                    value={day.rooms}
                                    onChange={(e) =>
                                      handleDayCapacityChange(index, "rooms", Number.parseInt(e.target.value) || 0)
                                    }
                                    placeholder="0"
                                    min="0"
                                  />
                                </div>
                              )}
                            </div>

                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                <Utensils className="inline h-4 w-4 mr-1" />
                                Meal Services
                              </Label>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Label htmlFor={`breakfast-${index}`} className="text-xs text-gray-600">
                                    Breakfast
                                  </Label>
                                  <Input
                                    id={`breakfast-${index}`}
                                    type="number"
                                    value={day.breakfast}
                                    onChange={(e) =>
                                      handleDayCapacityChange(index, "breakfast", Number.parseInt(e.target.value) || 0)
                                    }
                                    placeholder="0"
                                    min="0"
                                    className="text-sm"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`lunch-${index}`} className="text-xs text-gray-600">
                                    Lunch
                                  </Label>
                                  <Input
                                    id={`lunch-${index}`}
                                    type="number"
                                    value={day.lunch}
                                    onChange={(e) =>
                                      handleDayCapacityChange(index, "lunch", Number.parseInt(e.target.value) || 0)
                                    }
                                    placeholder="0"
                                    min="0"
                                    className="text-sm"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`dinner-${index}`} className="text-xs text-gray-600">
                                    Dinner
                                  </Label>
                                  <Input
                                    id={`dinner-${index}`}
                                    type="number"
                                    value={day.dinner}
                                    onChange={(e) =>
                                      handleDayCapacityChange(index, "dinner", Number.parseInt(e.target.value) || 0)
                                    }
                                    placeholder="0"
                                    min="0"
                                    className="text-sm"
                                  />
                                </div>
                              </div>
                            </div>

                            {selectedVenue && day.attendees > selectedVenue.capacity && (
                              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                                <p className="text-sm text-red-700">
                                  ⚠️ Day {index + 1}: {day.attendees} attendees exceed venue capacity (
                                  {selectedVenue.capacity}). Consider outsourcing or venue change.
                                </p>
                              </div>
                            )}

                            {day.breakfast + day.lunch + day.dinner > day.attendees && (
                              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                  ℹ️ Day {index + 1}: Total meals ({day.breakfast + day.lunch + day.dinner}) exceed
                                  attendees ({day.attendees}). Please verify meal counts.
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                {dayCapacities.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Please select start and end dates to configure daily capacity requirements</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
                <CardDescription>Select services with quantities and negotiate pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(eventServices).map(([category, services]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-lg capitalize border-b pb-2">{category}</h4>
                    <div className="grid gap-4">
                      {services.map((service) => {
                        const serviceKey = `${category}-${service.name}`
                        const isSelected = selectedServices[serviceKey]
                        return (
                          <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                checked={!!isSelected}
                                onCheckedChange={() => handleServiceToggle(category, service.name, service.price)}
                              />
                              <div>
                                <div className="font-medium">{service.name}</div>
                                <div className="text-sm text-gray-600">
                                  GH₵{service.price} {service.unit}
                                  {service.complementary && (
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                      Complementary
                                    </Badge>
                                  )}
                                  {service.complementary && Array.isArray(service.complementary) && (
                                    <span className="ml-2 text-xs text-green-600">
                                      Includes: {service.complementary.join(", ")}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <Label className="text-xs">Qty:</Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={isSelected.quantity}
                                    onChange={(e) =>
                                      updateServiceQuantity(serviceKey, Number.parseInt(e.target.value) || 1)
                                    }
                                    className="w-16 h-8"
                                  />
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Label className="text-xs">Price:</Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={isSelected.price}
                                    onChange={(e) =>
                                      updateServicePrice(serviceKey, Number.parseFloat(e.target.value) || 0)
                                    }
                                    className={`w-20 h-8 ${isSelected.negotiated ? "border-orange-300 bg-orange-50" : ""}`}
                                  />
                                  {isSelected.negotiated && (
                                    <Badge variant="outline" className="text-xs text-orange-600">
                                      Negotiated
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {Object.keys(selectedServices).length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Service Summary</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedServices).map(([serviceKey, details]) => {
                        const [category, serviceName] = serviceKey.split("-")
                        const total = details.quantity * details.price
                        return (
                          <div key={serviceKey} className="flex justify-between text-sm">
                            <span>
                              {serviceName} (x{details.quantity})
                            </span>
                            <span className="font-medium">GH₵{total.toFixed(2)}</span>
                          </div>
                        )
                      })}
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total Services:</span>
                        <span>
                          GH₵
                          {Object.values(selectedServices)
                            .reduce((sum, service) => sum + service.quantity * service.price, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Estimated revenue and pricing details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimatedRevenue">Estimated Revenue</Label>
                    <Input
                      id="estimatedRevenue"
                      type="number"
                      value={formData.estimatedRevenue}
                      onChange={(e) => handleInputChange("estimatedRevenue", e.target.value)}
                      placeholder="Enter estimated revenue"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Link href="/events">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting || dayCapacities.length === 0}>
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
