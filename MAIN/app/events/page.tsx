"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  Users,
  Clock,
  DollarSign,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Printer,
  Download,
  BarChart3,
  Building,
  X,
  AlertTriangle,
  Truck,
  Wrench,
  CheckCircle,
  Projector,
  Wifi,
  Volume2,
  Monitor,
  UserCheck,
  UserX,
  CreditCard,
  Home,
  BookOpen,
  Settings,
  Bell,
  Moon,
  Languages,
  Star,
  Zap,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

const events = [
  {
    id: "EVT-001",
    title: "Annual Corporate Summit",
    client: "TechCorp Industries",
    type: "Conference",
    venue: "Hall 1",
    date: "2024-02-15",
    time: "09:00 - 17:00",
    attendees: 65,
    status: "confirmed",
    revenue: 1800,
    services: ["Catering", "AV Equipment", "Photography"],
  },
  {
    id: "EVT-002",
    title: "Board Meeting",
    client: "Ghana Commercial Bank",
    type: "Meeting",
    venue: "Hall 2",
    date: "2024-02-18",
    time: "14:00 - 16:00",
    attendees: 25,
    status: "confirmed",
    revenue: 600,
    services: ["AV Equipment", "Refreshments"],
  },
  {
    id: "EVT-003",
    title: "Training Workshop",
    client: "Northern Development Authority",
    type: "Workshop",
    venue: "Hall 3",
    date: "2024-02-20",
    time: "09:00 - 12:00",
    attendees: 12,
    status: "pending",
    revenue: 400,
    services: ["AV Equipment", "Materials"],
  },
  {
    id: "EVT-004",
    title: "Wedding Reception Planning",
    client: "Alhassan Family",
    type: "Private",
    venue: "Hall 1",
    date: "2024-02-22",
    time: "18:00 - 22:00",
    attendees: 60,
    status: "confirmed",
    revenue: 2200,
    services: ["Catering", "Decoration", "Music"],
  },
]

// Mamani Hotel venues with accurate specifications
const venues = [
  {
    id: "HALL-001",
    name: "Hall 1",
    capacity: 70,
    area: "120 sqm",
    features: ["Projector", "Sound System", "Air Conditioning", "WiFi", "Stage", "Microphones"],
    hourlyRate: 200,
    status: "available",
    location: "Ground Floor",
    equipment: ["HD Projector", "Wireless Microphones", "Sound System", "Flip Charts", "Notepads", "Pens"],
  },
  {
    id: "HALL-002",
    name: "Hall 2",
    capacity: 30,
    area: "60 sqm",
    features: ["Projector", "Whiteboard", "Air Conditioning", "WiFi", "Video Conferencing"],
    hourlyRate: 150,
    status: "occupied",
    location: "First Floor",
    equipment: ["Smart Board", "Video Conference Setup", "Wireless Microphones", "Notepads", "Pens"],
  },
  {
    id: "HALL-003",
    name: "Hall 3",
    capacity: 15,
    area: "30 sqm",
    features: ["Smart Board", "Air Conditioning", "WiFi", "Intimate Setting"],
    hourlyRate: 100,
    status: "available",
    location: "First Floor",
    equipment: ["Interactive Smart Board", "Wireless Presentation", "Notepads", "Pens", "Coffee Station"],
  },
]

// Enhanced function schedule data for Mamani Hotel
const functionScheduleData = [
  {
    item: 1,
    arrivalDate: "MON 5TH AUG",
    departureDate: "WED 7TH AUG",
    organization: "NORTHERN REGIONAL COORDINATING COUNCIL",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 45,
    rooms: 45,
    roomNights: 90,
    confDays: 2,
    venue: "HALL 1",
    notes: "PREPARE 45 ROOMS - VIP TREATMENT REQUIRED",
    status: "CONFIRMED",
    bookingStatus: "checked-in",
    startDate: "2024-08-05",
    endDate: "2024-08-07",
    duration: 2,
    dailyPax: [45, 45],
  },
  {
    item: 2,
    arrivalDate: "THU 8TH AUG",
    departureDate: "FRI 9TH AUG",
    organization: "TAMALE TEACHING HOSPITAL",
    progType: "RESIDENTIAL WORKSHOP",
    pax: 25,
    rooms: 25,
    roomNights: 25,
    confDays: 1,
    venue: "HALL 2",
    notes: "PREPARE 25 ROOMS - MEDICAL CONFERENCE",
    status: "CONFIRMED",
    bookingStatus: "confirmed",
    startDate: "2024-08-08",
    endDate: "2024-08-09",
    duration: 1,
    dailyPax: [25],
  },
  {
    item: 3,
    arrivalDate: "SAT 10TH AUG",
    departureDate: "SUN 11TH AUG",
    organization: "UNIVERSITY FOR DEVELOPMENT STUDIES",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 35,
    rooms: 35,
    roomNights: 35,
    confDays: 1,
    venue: "HALL 1",
    notes: "PREPARE 35 ROOMS - ACADEMIC CONFERENCE",
    status: "AWAITING CONFIRMATION",
    bookingStatus: "pending",
    startDate: "2024-08-10",
    endDate: "2024-08-11",
    duration: 1,
    dailyPax: [35],
  },
  {
    item: 4,
    arrivalDate: "MON 12TH AUG",
    departureDate: "TUE 13TH AUG",
    organization: "GHANA HEALTH SERVICE - NORTHERN REGION",
    progType: "NON RESIDENTIAL WORKSHOP",
    pax: 40,
    rooms: 8,
    roomNights: 8,
    confDays: 1,
    venue: "HALL 1",
    notes: "PREPARE 8 ROOMS FOR FACILITATORS ONLY",
    status: "CONFIRMED",
    bookingStatus: "confirmed",
    startDate: "2024-08-12",
    endDate: "2024-08-13",
    duration: 1,
    dailyPax: [8],
  },
  {
    item: 5,
    arrivalDate: "WED 14TH AUG",
    departureDate: "THU 15TH AUG",
    organization: "NORTHERN DEVELOPMENT AUTHORITY",
    progType: "RESIDENTIAL MEETING",
    pax: 12,
    rooms: 12,
    roomNights: 12,
    confDays: 1,
    venue: "HALL 3",
    notes: "PREPARE 12 ROOMS - EXECUTIVE MEETING",
    status: "CONFIRMED",
    bookingStatus: "checked-in",
    startDate: "2024-08-14",
    endDate: "2024-08-15",
    duration: 1,
    dailyPax: [12],
  },
]

// Room-only guests for Mamani Hotel (50 rooms)
const roomOnlyGuests = [
  { date: "2024-08-01", pax: 18, rooms: 18, type: "Individual Travelers", bookingStatus: "confirmed" },
  { date: "2024-08-02", pax: 22, rooms: 22, type: "Business Travelers", bookingStatus: "checked-in" },
  { date: "2024-08-03", pax: 15, rooms: 15, type: "Individual Travelers", bookingStatus: "checked-in" },
  { date: "2024-08-04", pax: 25, rooms: 25, type: "Family Groups", bookingStatus: "confirmed" },
  { date: "2024-08-05", pax: 20, rooms: 20, type: "Business Travelers", bookingStatus: "confirmed" },
  { date: "2024-08-06", pax: 16, rooms: 16, type: "Individual Travelers", bookingStatus: "checked-in" },
  { date: "2024-08-07", pax: 28, rooms: 28, type: "Tour Groups", bookingStatus: "confirmed" },
  { date: "2024-08-08", pax: 30, rooms: 30, type: "Business Conference", bookingStatus: "confirmed" },
  { date: "2024-08-09", pax: 19, rooms: 19, type: "Individual Travelers", bookingStatus: "checked-in" },
  { date: "2024-08-10", pax: 24, rooms: 24, type: "Family Groups", bookingStatus: "confirmed" },
  { date: "2024-08-11", pax: 21, rooms: 21, type: "Business Travelers", bookingStatus: "confirmed" },
  { date: "2024-08-12", pax: 26, rooms: 26, type: "Tour Groups", bookingStatus: "checked-in" },
  { date: "2024-08-13", pax: 17, rooms: 17, type: "Individual Travelers", bookingStatus: "confirmed" },
  { date: "2024-08-14", pax: 23, rooms: 23, type: "Business Travelers", bookingStatus: "confirmed" },
  { date: "2024-08-15", pax: 14, rooms: 14, type: "Individual Travelers", bookingStatus: "checked-in" },
]

// Technical maintenance schedule for Mamani Hotel (50 rooms)
const maintenanceSchedule = [
  {
    roomNumber: "12",
    issueType: "electrical",
    description: "Faulty wiring in bathroom outlets",
    reportedDate: "2024-07-28",
    startDate: "2024-08-01",
    estimatedEndDate: "2024-08-03",
    actualEndDate: null,
    status: "in-progress",
    priority: "high",
    technician: "Kwame Electrician",
    cost: 350,
  },
  {
    roomNumber: "28",
    issueType: "plumbing",
    description: "Leaking shower head and low water pressure",
    reportedDate: "2024-07-30",
    startDate: "2024-08-02",
    estimatedEndDate: "2024-08-04",
    actualEndDate: null,
    status: "in-progress",
    priority: "medium",
    technician: "Alhassan Plumber",
    cost: 280,
  },
  {
    roomNumber: "35",
    issueType: "ac",
    description: "Air conditioning unit not cooling properly",
    reportedDate: "2024-08-01",
    startDate: "2024-08-05",
    estimatedEndDate: "2024-08-07",
    actualEndDate: null,
    status: "scheduled",
    priority: "high",
    technician: "Fatima HVAC",
    cost: 520,
  },
  {
    roomNumber: "41",
    issueType: "tiling",
    description: "Cracked tiles in bathroom floor",
    reportedDate: "2024-07-25",
    startDate: "2024-07-29",
    estimatedEndDate: "2024-08-02",
    actualEndDate: "2024-08-01",
    status: "completed",
    priority: "low",
    technician: "Ibrahim Tiler",
    cost: 220,
  },
  {
    roomNumber: "18",
    issueType: "ceiling",
    description: "Water damage stains on ceiling",
    reportedDate: "2024-08-03",
    startDate: "2024-08-06",
    estimatedEndDate: "2024-08-09",
    actualEndDate: null,
    status: "scheduled",
    priority: "medium",
    technician: "Amina Painter",
    cost: 380,
  },
]

// Mamani Hotel capacity configuration
const HOTEL_CAPACITY = {
  totalRooms: 50,
  permanentlyUnavailable: 2, // Staff rooms, storage, etc.
  conferenceHalls: [
    { name: "Hall 1", capacity: 70 },
    { name: "Hall 2", capacity: 30 },
    { name: "Hall 3", capacity: 15 },
  ],
  sisterHotels: [
    { name: "Tamale Central Hotel", rooms: 35, distance: "3.2 km" },
    { name: "Northern Palace Hotel", rooms: 28, distance: "2.8 km" },
    { name: "Gurugu Lodge", rooms: 20, distance: "1.5 km" },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
    case "CONFIRMED":
      return "bg-green-100 text-green-800"
    case "pending":
    case "AWAITING CONFIRMATION":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "available":
      return "bg-green-100 text-green-800"
    case "occupied":
      return "bg-red-100 text-red-800"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800"
    case "ON HOLD":
      return "bg-orange-100 text-orange-800"
    case "checked-in":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CONFIRMED</Badge>
    case "AWAITING CONFIRMATION":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">AWAITING CONFIRMATION</Badge>
    case "ON HOLD":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ON HOLD</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getMaintenanceStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "scheduled":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Year-long Gantt Chart Component matching your format
const YearLongGanttChart = ({ data }: { data: typeof functionScheduleData }) => {
  const [selectedEvent, setSelectedEvent] = useState<(typeof functionScheduleData)[0] | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<(typeof functionScheduleData)[0] | null>(null)
  const [hoveredDate, setHoveredDate] = useState<any>(null)

  // Function to get events for a specific date
  const getEventsForDate = (dateStr: string) => {
    const sampleEvents = [
      {
        organization: "World Vision Int.",
        type: "Conference",
        checkIn: "Jan 1",
        checkOut: "Jan 14",
        pax: 30,
        dateRange: ["2025-01-01", "2025-01-14"],
      },
      {
        organization: "Ame Akos",
        type: "Wedding",
        checkIn: "Jan 7",
        checkOut: "Jan 12",
        pax: 25,
        dateRange: ["2025-01-07", "2025-01-12"],
      },
      {
        organization: "Ghana Health Service",
        type: "Workshop",
        checkIn: "Jan 15",
        checkOut: "Jan 17",
        pax: 40,
        dateRange: ["2025-01-15", "2025-01-17"],
      },
    ]

    return sampleEvents.filter((event) => {
      const currentDate = new Date(dateStr)
      const startDate = new Date(event.dateRange[0])
      const endDate = new Date(event.dateRange[1])
      return currentDate >= startDate && currentDate <= endDate
    })
  }

  // Generate year-long data (365 days starting from Jan 1, 2025)
  const generateYearData = () => {
    const startDate = new Date(2025, 0, 1) // Jan 1, 2025
    const yearData = []

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      const dateStr = currentDate.toISOString().split("T")[0]
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "short" })
      const dayMonth = currentDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })

      // Sample data - you would replace this with actual booking data
      let hall1Guests = 0
      let hall2Guests = 0
      let hall3Guests = 0
      let inHouseGuests = 0

      // Add some sample events for the first few days of January
      if (i < 12) {
        if (i >= 0 && i <= 11) hall1Guests = 30
        if (i >= 0 && i <= 7) hall2Guests = 19
        if (i >= 0 && i <= 11) hall3Guests = 25
        if (i === 2) inHouseGuests = 14
        if (i === 3) inHouseGuests = 4
        if (i === 4) inHouseGuests = 4
        if (i === 5) inHouseGuests = 3
        if (i === 6) inHouseGuests = 2
      }

      // For days 13-14, add some events
      if (i >= 12 && i <= 13) {
        hall1Guests = 30
        hall2Guests = 20
        inHouseGuests = 0
      }

      const totalEventGuests = hall1Guests + hall2Guests + hall3Guests
      const totalAvailableRooms = 50
      const totalOccupiedRooms = totalEventGuests + inHouseGuests
      const roomDeficitSurplus = totalAvailableRooms - totalOccupiedRooms

      yearData.push({
        date: currentDate,
        dateStr,
        dayName,
        dayMonth,
        hall1Guests,
        hall2Guests,
        hall3Guests,
        totalEventGuests,
        inHouseGuests,
        totalAvailableRooms,
        roomDeficitSurplus,
      })
    }

    return yearData
  }

  const yearData = generateYearData()

  // Group data into 2-week periods for display
  const groupDataIntoWeeks = () => {
    const groups = []
    for (let i = 0; i < yearData.length; i += 14) {
      groups.push(yearData.slice(i, i + 14))
    }
    return groups
  }

  const weekGroups = groupDataIntoWeeks()

  const getDeficitSurplusColor = (value: number) => {
    if (value < 0) return "bg-red-100 text-red-800 font-bold" // Deficit
    if (value > 40) return "bg-green-100 text-green-800" // Large surplus
    if (value > 20) return "bg-blue-100 text-blue-800" // Medium surplus
    return "bg-gray-100 text-gray-800" // Small surplus
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="font-bold text-xl text-center mb-6">
            Mamani Hotel - Year-Long Function Schedule & Capacity Chart (2025)
          </h3>

          {weekGroups.map((weekGroup, groupIndex) => (
            <div key={groupIndex} className="mb-8 border rounded-lg p-4 bg-gray-50">
              {/* Date Headers with Hover Details */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-4">
                <div></div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative text-center text-xs font-medium p-1 bg-blue-50 rounded border cursor-pointer hover:bg-blue-100 transition-colors group"
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <div className="font-bold text-blue-800">{day.dayName}</div>
                      <div className="text-[10px] text-blue-600">{day.dayMonth}</div>

                      {/* Hover Tooltip */}
                      {hoveredDate?.dateStr === day.dateStr && (
                        <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-3 min-w-[250px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                          <div className="text-left space-y-2">
                            <div className="font-semibold text-gray-800 border-b pb-1">
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>

                            {/* Sample Events for this date */}
                            {getEventsForDate(day.dateStr).length > 0 ? (
                              <div className="space-y-2">
                                {getEventsForDate(day.dateStr).map((event, index) => (
                                  <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                                    <div className="font-semibold text-blue-700">{event.organization}</div>
                                    <div className="text-gray-600">Event: {event.type}</div>
                                    <div className="text-gray-600">
                                      Chk in: {event.checkIn} Chk out: {event.checkOut}
                                    </div>
                                    <div className="text-gray-600">Pax: {event.pax}</div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-gray-500 text-xs">No events scheduled</div>
                            )}

                            {/* Daily Summary */}
                            <div className="border-t pt-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Hall Guests:</span>
                                <span className="font-medium">{day.totalEventGuests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">In-house Guests:</span>
                                <span className="font-medium">{day.inHouseGuests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Available Rooms:</span>
                                <span className="font-medium">{day.totalAvailableRooms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span
                                  className={`font-medium ${day.roomDeficitSurplus < 0 ? "text-red-600" : "text-green-600"}`}
                                >
                                  {day.roomDeficitSurplus < 0 ? "Deficit:" : "Surplus:"}
                                </span>
                                <span
                                  className={`font-bold ${day.roomDeficitSurplus < 0 ? "text-red-600" : "text-green-600"}`}
                                >
                                  {Math.abs(day.roomDeficitSurplus)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Tooltip Arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hall 1 Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-white rounded border font-semibold text-sm">Hall 1</div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative text-center text-xs p-2 bg-white rounded border cursor-pointer hover:bg-green-50 transition-colors group"
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <div className="font-bold text-green-700">{day.hall1Guests}</div>

                      {/* Hover Tooltip for Hall 1 */}
                      {hoveredDate?.dateStr === day.dateStr && day.hall1Guests > 0 && (
                        <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-3 min-w-[250px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                          <div className="text-left space-y-2">
                            <div className="font-semibold text-green-800 border-b pb-1">
                              Hall 1 -{" "}
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>

                            {/* Sample Events for Hall 1 */}
                            <div className="space-y-2">
                              <div className="bg-green-50 p-2 rounded text-xs">
                                <div className="font-semibold text-green-700">World Vision Int.</div>
                                <div className="text-gray-600">Event: Conference</div>
                                <div className="text-gray-600">Chk in: Jan 1 Chk out: Jan 14</div>
                                <div className="text-gray-600">Pax: 30</div>
                              </div>
                            </div>

                            {/* Hall 1 Details */}
                            <div className="border-t pt-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Hall Capacity:</span>
                                <span className="font-medium">70 people</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Current Guests:</span>
                                <span className="font-medium text-green-700">{day.hall1Guests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Available Space:</span>
                                <span className="font-medium">{70 - day.hall1Guests} people</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hall 2 Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-white rounded border font-semibold text-sm">Hall 2</div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative text-center text-xs p-2 bg-white rounded border cursor-pointer hover:bg-blue-50 transition-colors group"
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <div className="font-bold text-blue-700">{day.hall2Guests}</div>

                      {/* Hover Tooltip for Hall 2 */}
                      {hoveredDate?.dateStr === day.dateStr && day.hall2Guests > 0 && (
                        <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-3 min-w-[250px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                          <div className="text-left space-y-2">
                            <div className="font-semibold text-blue-800 border-b pb-1">
                              Hall 2 -{" "}
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>

                            {/* Sample Events for Hall 2 */}
                            <div className="space-y-2">
                              <div className="bg-blue-50 p-2 rounded text-xs">
                                <div className="font-semibold text-blue-700">Ame Akos</div>
                                <div className="text-gray-600">Event: Wedding</div>
                                <div className="text-gray-600">Chk in: Jan 7 Chk out: Jan 12</div>
                                <div className="text-gray-600">Pax: 19</div>
                              </div>
                            </div>

                            {/* Hall 2 Details */}
                            <div className="border-t pt-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Hall Capacity:</span>
                                <span className="font-medium">30 people</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Current Guests:</span>
                                <span className="font-medium text-blue-700">{day.hall2Guests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Available Space:</span>
                                <span className="font-medium">{30 - day.hall2Guests} people</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hall 3 Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-white rounded border font-semibold text-sm">Hall 3</div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative text-center text-xs p-2 bg-white rounded border cursor-pointer hover:bg-purple-50 transition-colors group"
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <div className="font-bold text-purple-700">{day.hall3Guests}</div>

                      {/* Hover Tooltip for Hall 3 */}
                      {hoveredDate?.dateStr === day.dateStr && day.hall3Guests > 0 && (
                        <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-3 min-w-[250px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                          <div className="text-left space-y-2">
                            <div className="font-semibold text-purple-800 border-b pb-1">
                              Hall 3 -{" "}
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>

                            {/* Sample Events for Hall 3 */}
                            <div className="space-y-2">
                              <div className="bg-purple-50 p-2 rounded text-xs">
                                <div className="font-semibold text-purple-700">Ghana Health Service</div>
                                <div className="text-gray-600">Event: Workshop</div>
                                <div className="text-gray-600">Chk in: Jan 15 Chk out: Jan 17</div>
                                <div className="text-gray-600">Pax: 25</div>
                              </div>
                            </div>

                            {/* Hall 3 Details */}
                            <div className="border-t pt-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Hall Capacity:</span>
                                <span className="font-medium">15 people</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Current Guests:</span>
                                <span className="font-medium text-purple-700">{day.hall3Guests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Available Space:</span>
                                <span className="font-medium">{15 - day.hall3Guests} people</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Event Guests Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-green-50 rounded border font-semibold text-sm text-green-800">
                  Total Event Guest
                </div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative text-center text-xs p-2 bg-green-50 rounded border cursor-pointer hover:bg-green-100 transition-colors group"
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <div className="font-bold text-green-800">{day.totalEventGuests}</div>

                      {/* Hover Tooltip for Total Event Guests */}
                      {hoveredDate?.dateStr === day.dateStr && day.totalEventGuests > 0 && (
                        <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-3 min-w-[280px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                          <div className="text-left space-y-2">
                            <div className="font-semibold text-green-800 border-b pb-1">
                              Total Event Guests -{" "}
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>

                            {/* Breakdown by Hall */}
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-gray-700">Breakdown by Hall:</div>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-green-50 p-2 rounded text-center">
                                  <div className="font-semibold text-green-700">Hall 1</div>
                                  <div className="text-lg font-bold text-green-800">{day.hall1Guests}</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded text-center">
                                  <div className="font-semibold text-blue-700">Hall 2</div>
                                  <div className="text-lg font-bold text-blue-800">{day.hall2Guests}</div>
                                </div>
                                <div className="bg-purple-50 p-2 rounded text-center">
                                  <div className="font-semibold text-purple-700">Hall 3</div>
                                  <div className="text-lg font-bold text-purple-800">{day.hall3Guests}</div>
                                </div>
                              </div>
                            </div>

                            {/* Total Summary */}
                            <div className="border-t pt-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Hall Capacity:</span>
                                <span className="font-medium">115 people</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Event Guests:</span>
                                <span className="font-medium text-green-700">{day.totalEventGuests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Available Hall Space:</span>
                                <span className="font-medium">{115 - day.totalEventGuests} people</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total In-house Guests Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-blue-50 rounded border font-semibold text-sm text-blue-800">
                  Total Inhouse Guest
                </div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="relative text-center text-xs p-2 bg-blue-50 rounded border cursor-pointer hover:bg-blue-100 transition-colors group"
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <div className="font-bold text-blue-800">{day.inHouseGuests}</div>

                      {/* Hover Tooltip for In-house Guests */}
                      {hoveredDate?.dateStr === day.dateStr && (
                        <div className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-3 min-w-[250px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                          <div className="text-left space-y-2">
                            <div className="font-semibold text-blue-800 border-b pb-1">
                              In-house Guests -{" "}
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>

                            {/* Sample In-house Guests */}
                            {day.inHouseGuests > 0 ? (
                              <div className="space-y-2">
                                <div className="bg-blue-50 p-2 rounded text-xs">
                                  <div className="font-semibold text-blue-700">Business Travelers</div>
                                  <div className="text-gray-600">Type: Individual bookings</div>
                                  <div className="text-gray-600">Rooms: {day.inHouseGuests}</div>
                                  <div className="text-gray-600">Status: Checked-in</div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-gray-500 text-xs">No in-house guests today</div>
                            )}

                            {/* Room Details */}
                            <div className="border-t pt-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Hotel Capacity:</span>
                                <span className="font-medium">50 rooms</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">In-house Guests:</span>
                                <span className="font-medium text-blue-700">{day.inHouseGuests}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Available for Events:</span>
                                <span className="font-medium">{50 - day.inHouseGuests} rooms</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Available Rooms Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-purple-50 rounded border font-semibold text-sm text-purple-800">
                  Total Available Room
                </div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div key={dayIndex} className="text-center text-xs p-2 bg-purple-50 rounded border">
                      <div className="font-bold text-purple-800">{day.totalAvailableRooms}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Overage/Deficit Row */}
              <div className="grid grid-cols-[150px_1fr] gap-2 mb-2">
                <div className="flex items-center p-2 bg-yellow-50 rounded border font-semibold text-sm text-yellow-800">
                  Room Overage / deficit
                </div>
                <div className="grid grid-cols-14 gap-1">
                  {weekGroup.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`text-center text-xs p-2 rounded border ${getDeficitSurplusColor(day.roomDeficitSurplus)}`}
                    >
                      <div className="font-bold">{day.roomDeficitSurplus}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-3">Legend - Mamani Hotel Year-Long Schedule:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 rounded border"></div>
                <span>Hall 1 Guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 rounded border"></div>
                <span>Hall 2 Guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-100 rounded border"></div>
                <span>Hall 3 Guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 rounded border"></div>
                <span>Room Deficit (Negative)</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• Total Event Guest: Sum of all hall guests per day</div>
              <div>• Total Inhouse Guest: Room-only guests (non-event)</div>
              <div>• Total Available Room: 50 rooms minus maintenance</div>
              <div>• Room Overage/Deficit: Available rooms minus total occupied rooms</div>
              <div>• Red numbers indicate room deficit requiring outsourcing</div>
              <div>• Hotel Capacity: 50 rooms | Conference Halls: Hall 1 (70), Hall 2 (30), Hall 3 (15)</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const InteractiveGanttChart = ({ data }: { data: typeof functionScheduleData }) => {
  const [selectedEvent, setSelectedEvent] = useState<(typeof functionScheduleData)[0] | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<(typeof functionScheduleData)[0] | null>(null)
  const [showCapacityDetails, setShowCapacityDetails] = useState(false)
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false)

  // Calculate rooms unavailable due to maintenance for each day
  const getUnavailableRooms = (date: string) => {
    const targetDate = new Date(date)
    return maintenanceSchedule.filter((maintenance) => {
      const startDate = new Date(maintenance.startDate)
      const endDate = maintenance.actualEndDate
        ? new Date(maintenance.actualEndDate)
        : new Date(maintenance.estimatedEndDate)

      return (
        targetDate >= startDate &&
        targetDate <= endDate &&
        (maintenance.status === "in-progress" || maintenance.status === "scheduled")
      )
    }).length
  }

  // Calculate daily metrics with Mamani Hotel's 50-room capacity
  const calculateDailyMetrics = () => {
    const dailyMetrics = Array.from({ length: 31 }, (_, dayIndex) => {
      const day = dayIndex + 1
      const currentDate = `2024-08-${day.toString().padStart(2, "0")}`

      // Calculate confirmed and checked-in event pax
      let confirmedEventPax = 0
      let checkedInEventPax = 0
      let confirmedEventRooms = 0
      let checkedInEventRooms = 0

      data.forEach((event) => {
        const eventStart = new Date(event.startDate).getDate()
        const eventEnd = new Date(event.endDate).getDate()

        if (day >= eventStart && day <= eventEnd) {
          const dayOffset = day - eventStart
          if (event.dailyPax && dayOffset < event.dailyPax.length) {
            const dailyPaxCount = event.dailyPax[dayOffset]

            if (event.bookingStatus === "confirmed" && event.status === "CONFIRMED") {
              confirmedEventPax += dailyPaxCount
              if (event.progType.includes("RESIDENTIAL")) {
                confirmedEventRooms += dailyPaxCount
              } else {
                confirmedEventRooms += Math.ceil(dailyPaxCount / 4)
              }
            } else if (event.bookingStatus === "checked-in") {
              checkedInEventPax += dailyPaxCount
              if (event.progType.includes("RESIDENTIAL")) {
                checkedInEventRooms += dailyPaxCount
              } else {
                checkedInEventRooms += Math.ceil(dailyPaxCount / 4)
              }
            }
          }
        }
      })

      // Get confirmed and checked-in room-only guests
      const roomOnlyData = roomOnlyGuests.find((guest) => guest.date === currentDate)
      let confirmedRoomOnlyPax = 0
      let checkedInRoomOnlyPax = 0
      let confirmedRoomOnlyRooms = 0
      let checkedInRoomOnlyRooms = 0

      if (roomOnlyData) {
        if (roomOnlyData.bookingStatus === "confirmed") {
          confirmedRoomOnlyPax = roomOnlyData.pax
          confirmedRoomOnlyRooms = roomOnlyData.rooms
        } else if (roomOnlyData.bookingStatus === "checked-in") {
          checkedInRoomOnlyPax = roomOnlyData.pax
          checkedInRoomOnlyRooms = roomOnlyData.rooms
        }
      }

      // Calculate room availability for Mamani Hotel
      const unavailableRooms = getUnavailableRooms(currentDate)
      const availableRooms = HOTEL_CAPACITY.totalRooms - HOTEL_CAPACITY.permanentlyUnavailable - unavailableRooms

      // Calculate totals
      const totalConfirmedPax = confirmedEventPax + confirmedRoomOnlyPax
      const totalCheckedInPax = checkedInEventPax + checkedInRoomOnlyPax
      const totalPax = totalConfirmedPax + totalCheckedInPax

      const totalConfirmedRooms = confirmedEventRooms + confirmedRoomOnlyRooms
      const totalCheckedInRooms = checkedInEventRooms + checkedInRoomOnlyRooms
      const totalRoomsNeeded = totalConfirmedRooms + totalCheckedInRooms

      const deficit = Math.max(0, totalRoomsNeeded - availableRooms)
      const surplus = Math.max(0, availableRooms - totalRoomsNeeded)
      const needsOutsourcing = deficit > 0

      return {
        day,
        date: currentDate,
        confirmedEventPax,
        checkedInEventPax,
        confirmedRoomOnlyPax,
        checkedInRoomOnlyPax,
        totalConfirmedPax,
        totalCheckedInPax,
        totalPax,
        confirmedEventRooms,
        checkedInEventRooms,
        confirmedRoomOnlyRooms,
        checkedInRoomOnlyRooms,
        totalConfirmedRooms,
        totalCheckedInRooms,
        totalRoomsNeeded,
        availableRooms,
        unavailableRooms,
        deficit,
        surplus,
        needsOutsourcing,
        occupancyRate: availableRooms > 0 ? Math.min(100, (totalRoomsNeeded / availableRooms) * 100) : 0,
      }
    })

    return dailyMetrics
  }

  const dailyMetrics = calculateDailyMetrics()

  // Mamani Hotel venues
  const venues = ["HALL 1", "HALL 2", "HALL 3"]

  const getEventColor = (item: (typeof functionScheduleData)[0]) => {
    if (item.bookingStatus === "checked-in") {
      return "bg-blue-600 hover:bg-blue-700 border-2 border-blue-800"
    } else if (item.status === "CONFIRMED" && item.bookingStatus === "confirmed") {
      if (item.progType.includes("CONFERENCE")) return "bg-green-500 hover:bg-green-600"
      if (item.progType.includes("WORKSHOP")) return "bg-green-600 hover:bg-green-700"
      return "bg-green-500 hover:bg-green-600"
    } else if (item.status === "AWAITING CONFIRMATION") {
      return "bg-orange-400 hover:bg-orange-500"
    } else {
      return "bg-yellow-400 hover:bg-yellow-500"
    }
  }

  const getDayOfMonth = (dateString: string) => {
    return new Date(dateString).getDate()
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }

  const getCapacityColor = (metric: (typeof dailyMetrics)[0]) => {
    if (metric.needsOutsourcing) return "bg-red-100 text-red-800 border-red-300"
    if (metric.occupancyRate > 90) return "bg-orange-100 text-orange-800 border-orange-300"
    if (metric.occupancyRate > 75) return "bg-yellow-100 text-yellow-800 border-yellow-300"
    return "bg-green-100 text-green-800 border-green-300"
  }

  // Calculate venue-specific metrics
  const calculateVenueMetrics = (venue: string) => {
    const totalEventGuests = data.filter((item) => item.venue === venue).reduce((sum, item) => sum + item.pax, 0)

    const totalInHouseGuests = roomOnlyGuests.reduce((sum, guest) => sum + guest.pax, 0)

    const totalAvailableRooms =
      HOTEL_CAPACITY.totalRooms -
      HOTEL_CAPACITY.permanentlyUnavailable -
      maintenanceSchedule.filter((m) => m.status === "in-progress" || m.status === "scheduled").length

    const totalOccupiedRooms =
      data.filter((item) => item.venue === venue).reduce((sum, item) => sum + item.rooms, 0) +
      roomOnlyGuests.reduce((sum, guest) => sum + guest.rooms, 0)

    const excessDeficit = totalAvailableRooms - totalOccupiedRooms

    return {
      totalEventGuests,
      totalInHouseGuests,
      totalAvailableRooms,
      excessDeficit,
    }
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg border">
        <div className="min-w-[1800px] p-6">
          {/* Enhanced Header with Dates */}
          <div className="mb-6">
            <h3 className="font-bold text-lg text-center mb-4">Mamani Hotel - Function Schedule Gantt Chart</h3>

            {/* Date Headers */}
            <div className="grid grid-cols-[300px_1fr] gap-4 mb-4">
              <div className="flex items-center justify-center">
                <span className="font-semibold text-gray-700">Event Centers</span>
              </div>
              <div className="grid grid-cols-31 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <div key={i + 1} className="text-center text-xs font-medium p-2 bg-blue-50 rounded border">
                    <div className="font-bold">{i + 1}</div>
                    <div className="text-[10px] text-gray-600">Aug</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Venue rows with enhanced metrics */}
          <div className="space-y-6">
            {venues.map((venue, venueIndex) => {
              const venueMetrics = calculateVenueMetrics(venue)

              return (
                <div key={venue} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-[300px_1fr] gap-4">
                    {/* Venue name and metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Building className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-bold text-lg">{venue}</div>
                            <div className="text-xs text-gray-500">
                              {venue === "HALL 1" && "Capacity: 70 people"}
                              {venue === "HALL 2" && "Capacity: 30 people"}
                              {venue === "HALL 3" && "Capacity: 15 people"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Venue Metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-green-50 p-2 rounded border">
                          <div className="font-semibold text-green-800">Event Guests</div>
                          <div className="text-lg font-bold text-green-700">{venueMetrics.totalEventGuests}</div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded border">
                          <div className="font-semibold text-blue-800">In-House Guests</div>
                          <div className="text-lg font-bold text-blue-700">{venueMetrics.totalInHouseGuests}</div>
                        </div>
                        <div className="bg-purple-50 p-2 rounded border">
                          <div className="font-semibold text-purple-800">Available Rooms</div>
                          <div className="text-lg font-bold text-purple-700">{venueMetrics.totalAvailableRooms}</div>
                        </div>
                        <div
                          className={`p-2 rounded border ${
                            venueMetrics.excessDeficit >= 0 ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <div
                            className={`font-semibold ${
                              venueMetrics.excessDeficit >= 0 ? "text-green-800" : "text-red-800"
                            }`}
                          >
                            {venueMetrics.excessDeficit >= 0 ? "Excess Rooms" : "Deficit Rooms"}
                          </div>
                          <div
                            className={`text-lg font-bold ${
                              venueMetrics.excessDeficit >= 0 ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {Math.abs(venueMetrics.excessDeficit)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline grid */}
                    <div className="relative">
                      <div className="grid grid-cols-31 gap-1 h-20 mb-2">
                        {Array.from({ length: 31 }, (_, day) => {
                          const metric = dailyMetrics[day]
                          return (
                            <div
                              key={day}
                              className={`border rounded-sm transition-colors ${
                                metric.needsOutsourcing
                                  ? "border-red-300 bg-red-50"
                                  : metric.occupancyRate > 90
                                    ? "border-orange-300 bg-orange-50"
                                    : "border-gray-200 bg-gray-50"
                              }`}
                            />
                          )
                        })}
                      </div>

                      {/* Events for this venue */}
                      {data
                        .filter((item) => item.venue === venue)
                        .map((item, itemIndex) => {
                          const startDay = getDayOfMonth(item.startDate) - 1
                          const duration = item.duration
                          const color = getEventColor(item)

                          return (
                            <div
                              key={item.item}
                              className={`absolute h-16 ${color} text-white text-xs p-2 rounded-md shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:z-10`}
                              style={{
                                left: `${(startDay / 31) * 100}%`,
                                width: `${Math.max((duration / 31) * 100, 3)}%`,
                                top: `${itemIndex * 18}px`,
                                zIndex: hoveredEvent?.item === item.item ? 20 : 10,
                              }}
                              onMouseEnter={() => setHoveredEvent(item)}
                              onMouseLeave={() => setHoveredEvent(null)}
                              onClick={() => setSelectedEvent(item)}
                              title={`${item.organization} - ${item.pax} participants - ${item.bookingStatus}`}
                            >
                              <div className="font-semibold truncate text-[10px]">
                                {item.organization.length > 20
                                  ? `${item.organization.substring(0, 20)}...`
                                  : item.organization}
                              </div>
                              <div className="text-[9px] opacity-90 mt-1">
                                {item.pax} pax • {item.bookingStatus}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Enhanced Legend */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-3">Legend - Mamani Hotel Function Schedule:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded border-2 border-blue-800"></div>
                <span>Checked-in Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Confirmed Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                <span>Awaiting Confirmation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>On Hold</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• Event Guests: Total participants for events in each venue</div>
              <div>• In-House Guests: Total room-only guests across the hotel</div>
              <div>• Available Rooms: Total rooms minus maintenance and permanently unavailable</div>
              <div>• Excess/Deficit: Available rooms minus total occupied rooms</div>
              <div>• Hotel Capacity: 50 rooms | Conference Halls: Hall 1 (70), Hall 2 (30), Hall 3 (15)</div>
            </div>
          </div>

          {/* Hover tooltip */}
          {hoveredEvent && (
            <div
              className="fixed z-50 bg-black text-white p-3 rounded-lg shadow-xl pointer-events-none max-w-sm"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="font-semibold">{hoveredEvent.organization}</div>
              <div className="text-sm opacity-90 mt-1">
                <div>📅 {formatDateRange(hoveredEvent.startDate, hoveredEvent.endDate)}</div>
                <div>👥 {hoveredEvent.pax} participants</div>
                <div>
                  🏨 {hoveredEvent.rooms} rooms • {hoveredEvent.roomNights} room nights
                </div>
                <div>📍 {hoveredEvent.venue}</div>
                <div>📋 Status: {hoveredEvent.bookingStatus}</div>
                <div className="mt-2">
                  <Badge className={getStatusColor(hoveredEvent.status)}>{hoveredEvent.status}</Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">{selectedEvent?.organization}</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>Event Details and Mamani Hotel Capacity Management</DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Booking Status Alert */}
              <Alert
                className={
                  selectedEvent.bookingStatus === "checked-in"
                    ? "border-blue-200 bg-blue-50"
                    : "border-green-200 bg-green-50"
                }
              >
                {selectedEvent.bookingStatus === "checked-in" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
                <AlertTitle>Booking Status: {selectedEvent.bookingStatus.toUpperCase()}</AlertTitle>
                <AlertDescription>
                  {selectedEvent.bookingStatus === "checked-in"
                    ? "Guests have checked in and are currently occupying rooms at Mamani Hotel."
                    : "Booking is confirmed but guests have not yet checked in."}
                </AlertDescription>
              </Alert>

              {/* Capacity Alert for Mamani Hotel */}
              {selectedEvent.pax > 40 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>High Capacity Event for Mamani Hotel</AlertTitle>
                  <AlertDescription>
                    This event requires {selectedEvent.rooms} rooms. Mamani Hotel has 50 total rooms, so this may
                    require coordination with sister hotels in Tamale.
                  </AlertDescription>
                </Alert>
              )}

              {/* Event Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Event Type</label>
                    <p className="font-semibold">{selectedEvent.progType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Venue</label>
                    <p className="font-semibold">{selectedEvent.venue}</p>
                    <p className="text-xs text-gray-500">
                      {selectedEvent.venue === "HALL 1" && "Capacity: 70 people"}
                      {selectedEvent.venue === "HALL 2" && "Capacity: 30 people"}
                      {selectedEvent.venue === "HALL 3" && "Capacity: 15 people"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1 flex space-x-2">
                      {getStatusBadge(selectedEvent.status)}
                      <Badge className={getStatusColor(selectedEvent.bookingStatus)}>
                        {selectedEvent.bookingStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <p className="font-semibold">
                      {selectedEvent.arrivalDate} - {selectedEvent.departureDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Participants</label>
                    <p className="font-semibold">{selectedEvent.pax} people</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Conference Days</label>
                    <p className="font-semibold">{selectedEvent.confDays} days</p>
                  </div>
                </div>
              </div>

              {/* Accommodation Details */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">🏨 Accommodation at Mamani Hotel</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Rooms Required:</span>
                    <span className="font-semibold ml-2">{selectedEvent.rooms}/50</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Total Room Nights:</span>
                    <span className="font-semibold ml-2">{selectedEvent.roomNights}</span>
                  </div>
                </div>
                {selectedEvent.dailyPax && (
                  <div className="mt-3">
                    <span className="text-blue-700 text-sm">Daily Pax Distribution:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedEvent.dailyPax.map((pax, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          Day {index + 1}: {pax}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Conference Hall Equipment */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Projector className="h-5 w-5 mr-2" />
                  Conference Hall Equipment & Facilities
                </h4>
                <div className="text-sm text-purple-800 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Hall Equipment:</span>
                      <div className="mt-1 space-y-1">
                        {selectedEvent.venue === "HALL 1" && (
                          <>
                            <div className="flex items-center text-xs">
                              <Projector className="h-3 w-3 mr-1" />
                              HD Projector & Screen
                            </div>
                            <div className="flex items-center text-xs">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Professional Sound System
                            </div>
                            <div className="flex items-center text-xs">
                              <Wifi className="h-3 w-3 mr-1" />
                              Free WiFi Internet
                            </div>
                          </>
                        )}
                        {selectedEvent.venue === "HALL 2" && (
                          <>
                            <div className="flex items-center text-xs">
                              <Monitor className="h-3 w-3 mr-1" />
                              Smart Board & Projector
                            </div>
                            <div className="flex items-center text-xs">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Audio System
                            </div>
                            <div className="flex items-center text-xs">
                              <Wifi className="h-3 w-3 mr-1" />
                              Video Conferencing
                            </div>
                          </>
                        )}
                        {selectedEvent.venue === "HALL 3" && (
                          <>
                            <div className="flex items-center text-xs">
                              <Monitor className="h-3 w-3 mr-1" />
                              Interactive Smart Board
                            </div>
                            <div className="flex items-center text-xs">
                              <Wifi className="h-3 w-3 mr-1" />
                              Wireless Presentation
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Included Materials:</span>
                      <div className="mt-1 text-xs space-y-1">
                        <div>• Notepads & Pens</div>
                        <div>• Flip Charts & Markers</div>
                        <div>• Extension Cords</div>
                        <div>• Air Conditioning</div>
                        <div>• Mineral Water</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outsourcing Information for Mamani Hotel */}
              {selectedEvent.rooms > 35 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Sister Hotels in Tamale Area
                  </h4>
                  <div className="text-sm text-orange-800 space-y-2">
                    <p>Large events may require coordination with nearby hotels:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {HOTEL_CAPACITY.sisterHotels.map((hotel, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="font-medium">{hotel.name}</span>
                          <span className="text-xs">
                            {hotel.rooms} rooms • {hotel.distance}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs mt-2">💡 Mamani Hotel can arrange transport coordination between venues</p>
                  </div>
                </div>
              )}

              {/* Department Notes */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">📋 Department Coordination Notes</h4>
                <p className="text-sm text-yellow-800">{selectedEvent.notes}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Truck className="mr-2 h-4 w-4" />
                  Coordinate Hotels
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function EventsPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [functionView, setFunctionView] = useState("table")
  const [functionSearchTerm, setFunctionSearchTerm] = useState("")
  const [functionStatusFilter, setFunctionStatusFilter] = useState("all")
  const [functionVenueFilter, setFunctionVenueFilter] = useState("all")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesType
  })

  const filteredFunctionData = functionScheduleData.filter((item) => {
    const matchesSearch =
      item.organization.toLowerCase().includes(functionSearchTerm.toLowerCase()) ||
      item.venue.toLowerCase().includes(functionSearchTerm.toLowerCase())
    const matchesStatus = functionStatusFilter === "all" || item.status === functionStatusFilter
    const matchesVenue = functionVenueFilter === "all" || item.venue === functionVenueFilter

    return matchesSearch && matchesStatus && matchesVenue
  })

  const handlePrint = () => {
    window.print()
  }

  const functionVenues = [...new Set(functionScheduleData.map((item) => item.venue))]
  const functionStatuses = [...new Set(functionScheduleData.map((item) => item.status))]

  // Calculate real-time metrics for Mamani Hotel
  const totalAvailableRooms =
    HOTEL_CAPACITY.totalRooms -
    HOTEL_CAPACITY.permanentlyUnavailable -
    maintenanceSchedule.filter((m) => m.status === "in-progress" || m.status === "scheduled").length

  const totalMaintenanceRooms = maintenanceSchedule.filter(
    (m) => m.status === "in-progress" || m.status === "scheduled",
  ).length

  const todayArrivals = 12
  const todayDepartures = 8
  const currentOccupancy = 78
  const vipGuests = 3
  const urgentAlerts = 2

  return (
    <>
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { font-size: 12px; }
          table { font-size: 10px; }
          .print-header {
            display: block !important;
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .print-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .print-date {
            font-size: 12px;
            margin-bottom: 10px;
          }
          .print-legend {
            display: block !important;
            margin-top: 20px;
            font-size: 10px;
          }
        }
        .print-only { display: none; }
      `}</style>

      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 no-print bg-white border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="text-sm text-gray-600">Front Desk Dashboard</div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-sm text-gray-600">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column - Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{todayArrivals}</div>
                    <div className="text-sm text-green-700">Arrivals</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{todayDepartures}</div>
                    <div className="text-sm text-red-700">Departures</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{currentOccupancy}%</div>
                  <div className="text-sm text-blue-700">Current Occupancy</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                    <Star className="h-5 w-5 mr-1" />
                    {vipGuests}
                  </div>
                  <div className="text-sm text-purple-700">VIP Guests</div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Quick Actions & Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions & Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-12 bg-transparent">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Key
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Cash Drawer
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    Call Bell
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent">
                    <Languages className="h-4 w-4 mr-2" />
                    Translator
                  </Button>
                </div>

                {/* Priority Alerts */}
                <div className="space-y-2">
                  <div className="flex items-center p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-800">{urgentAlerts} Urgent Issues</div>
                      <div className="text-xs text-red-600">Room 12 maintenance, VIP arrival</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Star className="h-5 w-5 text-purple-600 mr-2" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-purple-800">VIP Attention Required</div>
                      <div className="text-xs text-purple-600">Suite upgrade, special requests</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link href="/bookings/checkin">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-green-800">Check-In</div>
                  <div className="text-xs text-green-600">New arrivals, ID scanning</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/bookings/checkout">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-red-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <UserX className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold text-red-800">Check-Out</div>
                  <div className="text-xs text-red-600">Departures, invoice finalization</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/invoices">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">Billing</div>
                  <div className="text-xs text-blue-600">Folio management, payments</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rooms">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-purple-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-purple-800">Room Assignment</div>
                  <div className="text-xs text-purple-600">Floor plans, upgrades</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/bookings">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">Reservations</div>
                  <div className="text-xs text-blue-600">Bookings, modifications</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/housekeeping">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-yellow-50 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <Wrench className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-semibold text-yellow-800">Housekeeping</div>
                  <div className="text-xs text-yellow-600">Task dispatch, status updates</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Bell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">Services</div>
                  <div className="text-xs text-blue-600">Requests, amenities, luggage</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports">
              <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800">Reports</div>
                  <div className="text-xs text-gray-600">Occupancy analytics, audit logs</div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Room Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">32</div>
                  <div className="text-sm text-green-700">Clean & Ready</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <div className="text-sm text-red-700">Dirty/Checkout</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">6</div>
                  <div className="text-sm text-yellow-700">Inspected</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">4</div>
                  <div className="text-sm text-gray-700">Out of Order</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">System Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Moon className="h-4 w-4 mr-2" />
                  Night Mode
                </Button>
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Emergency Alert
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing detailed tables and charts - collapsed by default */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Event Management</TabsTrigger>
              <TabsTrigger value="schedule">Function Schedule</TabsTrigger>
              <TabsTrigger value="venues">Venue Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Building className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium">Front Desk Dashboard Active</h3>
                <p>All critical functions are accessible through the tiles above.</p>
                <p className="text-sm mt-2">Use the tabs to access detailed management features.</p>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Event Management</h3>
                  <p className="text-gray-600">Detailed event planning and coordination</p>
                </div>
                <Link href="/events/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Event
                  </Button>
                </Link>
              </div>

              {/* Search and filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Events table */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.type}</div>
                          </div>
                        </TableCell>
                        <TableCell>{event.client}</TableCell>
                        <TableCell>
                          <div>
                            <div>{event.date}</div>
                            <div className="text-sm text-gray-500">{event.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{event.venue}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {event.attendees}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4" />
                            {event.revenue}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <YearLongGanttChart data={functionScheduleData} />
            </TabsContent>

            <TabsContent value="venues" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <Card key={venue.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {venue.name}
                        <Badge className={getStatusColor(venue.status)}>{venue.status}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {venue.area} • {venue.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Capacity</span>
                            <span className="text-sm">{venue.capacity} people</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Hourly Rate</span>
                            <span className="text-sm">${venue.hourlyRate}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Features</h4>
                          <div className="flex flex-wrap gap-1">
                            {venue.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Equipment</h4>
                          <div className="text-xs text-gray-600 space-y-1">
                            {venue.equipment.map((item, index) => (
                              <div key={index}>• {item}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
