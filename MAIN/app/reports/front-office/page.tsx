"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Search,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Filter,
  RefreshCw,
  Bell,
  UserCheck,
  UserX,
  Bed,
  Key,
  Gift,
  MessageSquare,
  CreditCard,
} from "lucide-react"
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
import { useState } from "react"

// Comprehensive Front Office Data
const todayArrivals = [
  {
    id: "BK-001",
    confirmationNumber: "HTL-2024-001",
    guest: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    nationality: "American",
    passport: "A12345678",
    room: "201",
    roomType: "Deluxe Suite",
    checkIn: "3:00 PM",
    checkOut: "2024-01-18",
    nights: 3,
    adults: 2,
    children: 0,
    status: "confirmed",
    vip: false,
    company: "",
    purpose: "Leisure",
    rate: 185.0,
    totalAmount: 555.0,
    specialRequests: "Late check-in requested, ground floor preferred",
    source: "Direct Booking",
    agent: "Sarah Johnson",
    notes: "Celebrating anniversary",
    arrivalTime: null,
    roomReady: true,
  },
  {
    id: "BK-002",
    confirmationNumber: "HTL-2024-002",
    guest: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+1 (555) 987-6543",
    nationality: "Canadian",
    passport: "C98765432",
    room: "105",
    roomType: "Standard Room",
    checkIn: "2:30 PM",
    checkOut: "2024-01-17",
    nights: 2,
    adults: 1,
    children: 0,
    status: "pending",
    vip: false,
    company: "Tech Solutions Inc",
    purpose: "Business",
    rate: 120.0,
    totalAmount: 240.0,
    specialRequests: "Early check-in if possible, quiet room",
    source: "Corporate",
    agent: "Michael Brown",
    notes: "Frequent business traveler",
    arrivalTime: null,
    roomReady: false,
  },
  {
    id: "VIP-001",
    confirmationNumber: "HTL-2024-VIP-001",
    guest: "Robert Johnson",
    email: "robert.johnson@techcorp.com",
    phone: "+1 (555) 456-7890",
    nationality: "British",
    passport: "B11223344",
    room: "301",
    roomType: "Presidential Suite",
    checkIn: "4:00 PM",
    checkOut: "2024-01-20",
    nights: 5,
    adults: 2,
    children: 0,
    status: "confirmed",
    vip: true,
    company: "Tech Corp International",
    purpose: "Business",
    rate: 500.0,
    totalAmount: 2500.0,
    specialRequests: "VIP treatment, champagne, flowers, late checkout",
    source: "Travel Agent",
    agent: "Jennifer Lee",
    notes: "Diamond member, prefers executive floor",
    arrivalTime: null,
    roomReady: true,
  },
]

const todayDepartures = [
  {
    id: "BK-045",
    confirmationNumber: "HTL-2024-045",
    guest: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1 (555) 234-5678",
    nationality: "Australian",
    passport: "AU5566778",
    room: "102",
    roomType: "Standard Room",
    checkIn: "2024-01-13",
    checkOut: "11:00 AM",
    nights: 2,
    adults: 2,
    children: 1,
    status: "checked-out",
    folio: 340.0,
    payment: "paid",
    method: "Credit Card",
    satisfaction: 4.5,
    checkout: "10:45 AM",
    express: false,
    luggage: false,
    transportation: "Taxi",
    feedback: "Great stay, will return",
  },
  {
    id: "BK-046",
    confirmationNumber: "HTL-2024-046",
    guest: "Sarah Wilson",
    email: "sarah.wilson@globalinc.com",
    phone: "+1 (555) 345-6789",
    nationality: "German",
    passport: "D99887766",
    room: "205",
    roomType: "Family Room",
    checkIn: "2024-01-11",
    checkOut: "12:00 PM",
    nights: 4,
    adults: 2,
    children: 2,
    status: "pending",
    folio: 720.0,
    payment: "pending",
    method: "Corporate Account",
    satisfaction: null,
    checkout: null,
    express: true,
    luggage: true,
    transportation: "Airport Transfer",
    feedback: null,
  },
]

const vipGuestList = [
  {
    id: "VIP-001",
    guest: "Robert Johnson",
    title: "Mr.",
    company: "Tech Corp International",
    room: "301",
    status: "arriving-today",
    preferences: "Champagne on arrival, late checkout, executive floor",
    loyalty: "Diamond",
    visits: 12,
    totalSpent: 45000,
    lastVisit: "2023-11-15",
    specialNeeds: "Mobility assistance",
    contactPreference: "Email",
    emergencyContact: "Alice Johnson - Wife",
    dietaryRestrictions: "Vegetarian",
    roomPreferences: "High floor, city view, king bed",
  },
  {
    id: "VIP-002",
    guest: "Elizabeth Davis",
    title: "Dr.",
    company: "Global Industries",
    room: "302",
    status: "in-house",
    preferences: "Quiet room, early breakfast, spa appointments",
    loyalty: "Platinum",
    visits: 8,
    totalSpent: 28000,
    lastVisit: "2023-12-20",
    specialNeeds: "None",
    contactPreference: "Phone",
    emergencyContact: "David Davis - Husband",
    dietaryRestrictions: "Gluten-free",
    roomPreferences: "Corner room, ocean view, twin beds",
  },
  {
    id: "VIP-003",
    guest: "William Chen",
    title: "Mr.",
    company: "Investment Partners LLC",
    room: "401",
    status: "departing-today",
    preferences: "Express checkout, car service, business center access",
    loyalty: "Diamond",
    visits: 25,
    totalSpent: 89000,
    lastVisit: "2024-01-10",
    specialNeeds: "None",
    contactPreference: "Email",
    emergencyContact: "Linda Chen - Wife",
    dietaryRestrictions: "None",
    roomPreferences: "Suite, executive floor, work desk",
  },
]

const roomInventoryStatus = [
  {
    type: "Standard Room",
    total: 20,
    available: 8,
    occupied: 10,
    ooo: 1,
    maintenance: 1,
    dirty: 2,
    clean: 6,
    inspected: 6,
    revenue: 1200,
    occupancyRate: 50,
  },
  {
    type: "Deluxe Suite",
    total: 15,
    available: 6,
    occupied: 8,
    ooo: 0,
    maintenance: 1,
    dirty: 3,
    clean: 3,
    inspected: 3,
    revenue: 1480,
    occupancyRate: 53.3,
  },
  {
    type: "Family Room",
    total: 8,
    available: 3,
    occupied: 5,
    ooo: 0,
    maintenance: 0,
    dirty: 1,
    clean: 2,
    inspected: 2,
    revenue: 600,
    occupancyRate: 62.5,
  },
  {
    type: "Presidential Suite",
    total: 2,
    available: 0,
    occupied: 2,
    ooo: 0,
    maintenance: 0,
    dirty: 0,
    clean: 0,
    inspected: 0,
    revenue: 1000,
    occupancyRate: 100,
  },
]

const bookingPaceAnalysis = [
  {
    period: "Next 7 Days",
    rooms: 42,
    lastYear: 38,
    variance: 10.5,
    revenue: 8400,
    adr: 200,
    segments: { leisure: 25, business: 12, group: 5 },
  },
  {
    period: "Next 14 Days",
    rooms: 78,
    lastYear: 72,
    variance: 8.3,
    revenue: 15600,
    adr: 200,
    segments: { leisure: 45, business: 23, group: 10 },
  },
  {
    period: "Next 30 Days",
    rooms: 145,
    lastYear: 138,
    variance: 5.1,
    revenue: 29000,
    adr: 200,
    segments: { leisure: 85, business: 40, group: 20 },
  },
  {
    period: "Next 60 Days",
    rooms: 268,
    lastYear: 255,
    variance: 5.1,
    revenue: 53600,
    adr: 200,
    segments: { leisure: 160, business: 78, group: 30 },
  },
]

const cancellationsNoShows = [
  {
    date: "2024-01-15",
    cancellations: 3,
    noShows: 1,
    revenue: 680,
    reason: "Weather conditions",
    details: {
      lastMinute: 2,
      advance: 1,
      refunded: 2,
      penalty: 1,
      rebooked: 1,
    },
  },
  {
    date: "2024-01-14",
    cancellations: 2,
    noShows: 0,
    revenue: 340,
    reason: "Personal emergency",
    details: {
      lastMinute: 1,
      advance: 1,
      refunded: 1,
      penalty: 1,
      rebooked: 0,
    },
  },
  {
    date: "2024-01-13",
    cancellations: 1,
    noShows: 2,
    revenue: 520,
    reason: "Flight delays",
    details: {
      lastMinute: 1,
      advance: 0,
      refunded: 0,
      penalty: 1,
      rebooked: 2,
    },
  },
  {
    date: "2024-01-12",
    cancellations: 4,
    noShows: 1,
    revenue: 890,
    reason: "Event cancelled",
    details: {
      lastMinute: 3,
      advance: 1,
      refunded: 3,
      penalty: 1,
      rebooked: 1,
    },
  },
]

const specialRequestsPreferences = [
  {
    guest: "John Doe",
    room: "201",
    request: "Late check-in after 10 PM, ground floor preferred",
    category: "Check-in",
    priority: "medium",
    status: "confirmed",
    assignedTo: "Front Desk",
    cost: 0,
    notes: "Anniversary celebration",
  },
  {
    guest: "Robert Johnson",
    room: "301",
    request: "VIP amenities: champagne, flowers, fruit basket",
    category: "VIP Services",
    priority: "high",
    status: "arranged",
    assignedTo: "Concierge",
    cost: 150,
    notes: "Diamond member",
  },
  {
    guest: "Jane Smith",
    room: "105",
    request: "Quiet room away from elevator, early check-in",
    category: "Room Assignment",
    priority: "medium",
    status: "confirmed",
    assignedTo: "Housekeeping",
    cost: 0,
    notes: "Business traveler",
  },
  {
    guest: "Sarah Wilson",
    room: "205",
    request: "Extra bed for child, baby cot, connecting room",
    category: "Room Setup",
    priority: "high",
    status: "pending",
    assignedTo: "Housekeeping",
    cost: 50,
    notes: "Family with young children",
  },
  {
    guest: "Michael Brown",
    room: "102",
    request: "Airport transfer, late checkout, dietary restrictions",
    category: "Services",
    priority: "medium",
    status: "completed",
    assignedTo: "Concierge",
    cost: 75,
    notes: "Vegetarian meals",
  },
]

const frontOfficeMetrics = {
  daily: {
    checkIns: 18,
    checkOuts: 15,
    walkIns: 3,
    noShows: 1,
    cancellations: 2,
    upgrades: 5,
    downgrades: 1,
    complaints: 2,
    compliments: 8,
    averageCheckInTime: 3.2,
    averageCheckOutTime: 2.8,
    upsellSuccess: 15.2,
  },
  weekly: {
    totalArrivals: 126,
    totalDepartures: 118,
    occupancyRate: 84.2,
    adr: 195.5,
    revpar: 164.65,
    guestSatisfaction: 4.6,
    repeatGuests: 28,
    corporateBookings: 45,
  },
}

export default function FrontOfficeReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterNationality, setFilterNationality] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRoomType, setFilterRoomType] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b">
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
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Front Office & Reservations</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Front Office Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Front Office Operations</h1>
              <p className="text-lg text-gray-600">Guest management, reservations, and operational reports</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests, rooms, confirmations..."
                  className="pl-8 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Alerts (5)
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
            </div>
          </div>

          {/* Front Office KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">In-House Guests</CardTitle>
                <Users className="h-5 w-5 text-blue-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{todayArrivals.length + 25}</div>
                <div className="flex items-center text-sm text-blue-100 mt-2">
                  <UserCheck className="h-4 w-4 mr-1" />
                  {vipGuestList.filter((g) => g.status === "in-house").length} VIP guests
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Today's Arrivals</CardTitle>
                <Calendar className="h-5 w-5 text-green-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{todayArrivals.length}</div>
                <div className="flex items-center text-sm text-green-100 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {todayArrivals.filter((g) => g.roomReady).length} rooms ready
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Today's Departures</CardTitle>
                <UserX className="h-5 w-5 text-purple-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{todayDepartures.length}</div>
                <div className="flex items-center text-sm text-purple-100 mt-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {todayDepartures.filter((g) => g.status === "checked-out").length} completed
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-100">Occupancy Rate</CardTitle>
                <Bed className="h-5 w-5 text-orange-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{frontOfficeMetrics.weekly.occupancyRate}%</div>
                <div className="flex items-center text-sm text-orange-100 mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +6.2% vs last week
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Advanced Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filterNationality} onValueChange={setFilterNationality}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Nationalities</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="canadian">Canadian</SelectItem>
                  <SelectItem value="british">British</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="australian">Australian</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRoomType} onValueChange={setFilterRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Room Types</SelectItem>
                  <SelectItem value="standard">Standard Room</SelectItem>
                  <SelectItem value="deluxe">Deluxe Suite</SelectItem>
                  <SelectItem value="family">Family Room</SelectItem>
                  <SelectItem value="presidential">Presidential Suite</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export Filtered Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="arrivals" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="arrivals">Arrivals & Departures</TabsTrigger>
            <TabsTrigger value="vip">VIP Management</TabsTrigger>
            <TabsTrigger value="inventory">Room Inventory</TabsTrigger>
            <TabsTrigger value="pace">Booking Pace</TabsTrigger>
            <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
            <TabsTrigger value="requests">Special Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="arrivals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Arrivals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2" />
                    Today's Arrivals ({todayArrivals.length})
                  </CardTitle>
                  <CardDescription>Expected check-ins for {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayArrivals.map((arrival) => (
                      <div key={arrival.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {arrival.vip && <Star className="h-5 w-5 text-yellow-500" />}
                            <div>
                              <div className="font-semibold text-lg">{arrival.guest}</div>
                              <div className="text-sm text-gray-600">{arrival.confirmationNumber}</div>
                            </div>
                          </div>
                          <Badge variant={arrival.status === "confirmed" ? "default" : "secondary"}>
                            {arrival.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span>{arrival.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{arrival.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{arrival.nationality}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Key className="h-3 w-3 text-gray-400" />
                              <span>
                                Room {arrival.room} ({arrival.roomType})
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{arrival.checkIn}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3 text-gray-400" />
                              <span>
                                {arrival.adults} adult{arrival.adults > 1 ? "s" : ""}
                                {arrival.children > 0
                                  ? `, ${arrival.children} child${arrival.children > 1 ? "ren" : ""}`
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>

                        {arrival.specialRequests && (
                          <div className="mt-3 p-2 bg-yellow-50 rounded text-sm">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3 text-yellow-600" />
                              <span className="font-medium text-yellow-800">Special Requests:</span>
                            </div>
                            <p className="text-yellow-700 mt-1">{arrival.specialRequests}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="text-sm">
                            <span className="text-gray-600">Total: </span>
                            <span className="font-semibold">${arrival.totalAmount.toFixed(2)}</span>
                            <span className="text-gray-600"> ({arrival.nights} nights)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {arrival.roomReady ? (
                              <Badge variant="default">Room Ready</Badge>
                            ) : (
                              <Badge variant="secondary">Room Preparing</Badge>
                            )}
                            <Button size="sm">Check In</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Today's Departures */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserX className="h-5 w-5 mr-2" />
                    Today's Departures ({todayDepartures.length})
                  </CardTitle>
                  <CardDescription>Expected check-outs for {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayDepartures.map((departure) => (
                      <div key={departure.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-lg">{departure.guest}</div>
                            <div className="text-sm text-gray-600">{departure.confirmationNumber}</div>
                          </div>
                          <Badge variant={departure.status === "checked-out" ? "default" : "secondary"}>
                            {departure.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span>{departure.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{departure.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Key className="h-3 w-3 text-gray-400" />
                              <span>Room {departure.room}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{departure.checkout || departure.checkOut}</span>
                            </div>
                            <div className="flex items-center space-x-1 mb-1">
                              <CreditCard className="h-3 w-3 text-gray-400" />
                              <span>${departure.folio.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Badge variant={departure.payment === "paid" ? "default" : "destructive"}>
                                {departure.payment}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {departure.feedback && (
                          <div className="mt-3 p-2 bg-green-50 rounded text-sm">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3 text-green-600" />
                              <span className="font-medium text-green-800">Guest Feedback:</span>
                            </div>
                            <p className="text-green-700 mt-1">"{departure.feedback}"</p>
                            {departure.satisfaction && (
                              <div className="flex items-center mt-2">
                                <span className="text-green-700 text-xs mr-2">Rating:</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= departure.satisfaction ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-4 text-sm">
                            {departure.express && <Badge variant="outline">Express</Badge>}
                            {departure.luggage && <Badge variant="outline">Luggage Storage</Badge>}
                            {departure.transportation && (
                              <span className="text-gray-600">{departure.transportation}</span>
                            )}
                          </div>
                          {departure.status === "pending" && <Button size="sm">Process Checkout</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vip" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  VIP Guest Management
                </CardTitle>
                <CardDescription>
                  High-value guests requiring special attention and personalized service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {vipGuestList.map((vip) => (
                    <div key={vip.id} className="border-2 border-yellow-200 rounded-lg p-6 bg-yellow-50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Star className="h-6 w-6 text-yellow-500" />
                          <div>
                            <div className="text-xl font-semibold">
                              {vip.title} {vip.guest}
                            </div>
                            <div className="text-sm text-gray-600">{vip.company}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              vip.loyalty === "Diamond"
                                ? "default"
                                : vip.loyalty === "Platinum"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {vip.loyalty} Member
                          </Badge>
                          <Badge
                            variant={
                              vip.status === "in-house"
                                ? "default"
                                : vip.status === "arriving-today"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {vip.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Guest Information</h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-gray-600">Room:</span> {vip.room}
                            </div>
                            <div>
                              <span className="text-gray-600">Total Visits:</span> {vip.visits}
                            </div>
                            <div>
                              <span className="text-gray-600">Total Spent:</span> ${vip.totalSpent.toLocaleString()}
                            </div>
                            <div>
                              <span className="text-gray-600">Last Visit:</span> {vip.lastVisit}
                            </div>
                            <div>
                              <span className="text-gray-600">Contact:</span> {vip.contactPreference}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Preferences & Requirements</h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-gray-600">Service Preferences:</span>
                            </div>
                            <p className="text-gray-800">{vip.preferences}</p>
                            <div className="mt-2">
                              <span className="text-gray-600">Room Preferences:</span>
                            </div>
                            <p className="text-gray-800">{vip.roomPreferences}</p>
                            {vip.dietaryRestrictions !== "None" && (
                              <div className="mt-2">
                                <span className="text-gray-600">Dietary:</span> {vip.dietaryRestrictions}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Special Considerations</h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-gray-600">Special Needs:</span> {vip.specialNeeds}
                            </div>
                            <div>
                              <span className="text-gray-600">Emergency Contact:</span> {vip.emergencyContact}
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <Button size="sm" className="w-full">
                              <Gift className="mr-2 h-3 w-3" />
                              Arrange VIP Amenities
                            </Button>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <MessageSquare className="mr-2 h-3 w-3" />
                              Send Personal Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bed className="h-5 w-5 mr-2" />
                  Room Inventory Status
                </CardTitle>
                <CardDescription>Real-time room availability and status by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    {roomInventoryStatus.map((room, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{room.type}</h3>
                          <Badge variant="outline">{room.occupancyRate}% occupied</Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-3">
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">{room.available}</div>
                            <div className="text-xs text-green-700">Available</div>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <div className="text-lg font-bold text-red-600">{room.occupied}</div>
                            <div className="text-xs text-red-700">Occupied</div>
                          </div>
                          <div className="text-center p-2 bg-yellow-50 rounded">
                            <div className="text-lg font-bold text-yellow-600">{room.dirty}</div>
                            <div className="text-xs text-yellow-700">Dirty</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-gray-600">{room.ooo + room.maintenance}</div>
                            <div className="text-xs text-gray-700">OOO/Maint</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Daily Revenue: ${room.revenue}</span>
                          <Progress value={room.occupancyRate} className="w-24 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">Inventory Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Rooms</span>
                          <span className="font-medium">
                            {roomInventoryStatus.reduce((sum, room) => sum + room.total, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available Now</span>
                          <span className="font-medium text-green-600">
                            {roomInventoryStatus.reduce((sum, room) => sum + room.available, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Currently Occupied</span>
                          <span className="font-medium text-red-600">
                            {roomInventoryStatus.reduce((sum, room) => sum + room.occupied, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Out of Order</span>
                          <span className="font-medium text-gray-600">
                            {roomInventoryStatus.reduce((sum, room) => sum + room.ooo + room.maintenance, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Overall Occupancy</span>
                          <span className="font-bold">
                            {(
                              (roomInventoryStatus.reduce((sum, room) => sum + room.occupied, 0) /
                                roomInventoryStatus.reduce((sum, room) => sum + room.total, 0)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">Revenue by Category</h3>
                      <div className="space-y-2">
                        {roomInventoryStatus.map((room, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{room.type}</span>
                            <span className="font-medium">${room.revenue}</span>
                          </div>
                        ))}
                        <div className="flex justify-between border-t pt-2 font-medium">
                          <span>Total Daily Revenue</span>
                          <span>${roomInventoryStatus.reduce((sum, room) => sum + room.revenue, 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Booking Pace Analysis
                </CardTitle>
                <CardDescription>Future reservation trends and market segment analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead className="text-right">Rooms Booked</TableHead>
                        <TableHead className="text-right">Last Year</TableHead>
                        <TableHead className="text-right">Variance</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">ADR</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingPaceAnalysis.map((pace, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{pace.period}</TableCell>
                          <TableCell className="text-right">{pace.rooms}</TableCell>
                          <TableCell className="text-right">{pace.lastYear}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={pace.variance > 0 ? "default" : "destructive"}>
                              {pace.variance > 0 ? "+" : ""}
                              {pace.variance}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${pace.revenue.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${pace.adr}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {pace.variance > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              <span className={pace.variance > 0 ? "text-green-600" : "text-red-600"}>
                                {pace.variance > 0 ? "Positive" : "Negative"}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {bookingPaceAnalysis.map((pace, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">{pace.period} - Segments</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Leisure</span>
                            <span className="font-medium">{pace.segments.leisure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Business</span>
                            <span className="font-medium">{pace.segments.business}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Group</span>
                            <span className="font-medium">{pace.segments.group}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-medium">
                            <span>Total</span>
                            <span>{pace.rooms}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancellations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Cancellations & No-Show Analysis
                </CardTitle>
                <CardDescription>Detailed analysis of booking cancellations and no-shows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {cancellationsNoShows.reduce((sum, item) => sum + item.cancellations, 0)}
                      </div>
                      <div className="text-sm text-red-700">Total Cancellations</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {cancellationsNoShows.reduce((sum, item) => sum + item.noShows, 0)}
                      </div>
                      <div className="text-sm text-yellow-700">Total No-Shows</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        ${cancellationsNoShows.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-700">Lost Revenue</div>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Cancellations</TableHead>
                        <TableHead className="text-center">No-Shows</TableHead>
                        <TableHead className="text-right">Lost Revenue</TableHead>
                        <TableHead>Primary Reason</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cancellationsNoShows.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.date}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span>{item.cancellations}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span>{item.noShows}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            ${item.revenue.toLocaleString()}
                          </TableCell>
                          <TableCell>{item.reason}</TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <div>Last minute: {item.details.lastMinute}</div>
                              <div>Advance: {item.details.advance}</div>
                              <div>Refunded: {item.details.refunded}</div>
                              <div>Rebooked: {item.details.rebooked}</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Special Requests & Guest Preferences
                </CardTitle>
                <CardDescription>Guest special requirements and preferences tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specialRequestsPreferences.map((request, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold">{request.guest}</div>
                          <div className="text-sm text-gray-600">Room {request.room}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              request.priority === "high"
                                ? "destructive"
                                : request.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {request.priority} priority
                          </Badge>
                          <Badge
                            variant={
                              request.status === "completed"
                                ? "default"
                                : request.status === "arranged"
                                  ? "secondary"
                                  : request.status === "confirmed"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-gray-600 mb-1">Request Details:</div>
                        <p className="text-gray-800">{request.request}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Category:</span>
                          <div className="font-medium">{request.category}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Assigned To:</span>
                          <div className="font-medium">{request.assignedTo}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Additional Cost:</span>
                          <div className="font-medium">{request.cost > 0 ? `$${request.cost}` : "No charge"}</div>
                        </div>
                      </div>

                      {request.notes && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                          <span className="font-medium text-blue-800">Notes: </span>
                          <span className="text-blue-700">{request.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
