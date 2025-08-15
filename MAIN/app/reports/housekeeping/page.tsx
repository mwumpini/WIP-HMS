"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Download,
  Search,
  Bed,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Package,
  Users,
  Calendar,
  Settings,
  Filter,
  RefreshCw,
  Eye,
  MapPin,
  Shirt,
  Sparkles,
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

// Comprehensive Housekeeping Data
const dailyRoomAssignments = [
  {
    id: "HK-001",
    housekeeper: "Maria Santos",
    shift: "Morning (6AM-2PM)",
    rooms: ["101", "102", "103", "201", "202", "203", "301", "302"],
    completed: 6,
    inProgress: 2,
    pending: 0,
    efficiency: 92,
    averageTime: 28,
    specialTasks: ["Deep clean 201", "Maintenance check 103"],
  },
  {
    id: "HK-002",
    housekeeper: "Ana Rodriguez",
    shift: "Morning (6AM-2PM)",
    rooms: ["104", "105", "106", "204", "205", "206", "303", "304"],
    completed: 7,
    inProgress: 1,
    pending: 0,
    efficiency: 95,
    averageTime: 26,
    specialTasks: ["VIP setup 205"],
  },
  {
    id: "HK-003",
    housekeeper: "Carmen Lopez",
    shift: "Afternoon (2PM-10PM)",
    rooms: ["107", "108", "207", "208", "305", "306", "401", "402"],
    completed: 5,
    inProgress: 2,
    pending: 1,
    efficiency: 88,
    averageTime: 30,
    specialTasks: ["Carpet cleaning 401", "Window cleaning 305-306"],
  },
  {
    id: "HK-004",
    housekeeper: "Isabella Garcia",
    shift: "Afternoon (2PM-10PM)",
    rooms: ["109", "110", "209", "210", "307", "308", "403", "404"],
    completed: 6,
    inProgress: 1,
    pending: 1,
    efficiency: 90,
    averageTime: 29,
    specialTasks: ["Balcony cleaning 403-404"],
  },
]

const roomStatusReport = [
  {
    room: "101",
    type: "Standard",
    status: "Clean",
    lastCleaned: "2024-01-15 10:30",
    housekeeper: "Maria Santos",
    timeSpent: 25,
    guestCheckout: "2024-01-15 11:00",
    nextArrival: "2024-01-15 15:00",
    inspected: true,
    inspector: "Head Housekeeper",
    issues: [],
    amenities: "Complete",
  },
  {
    room: "102",
    type: "Standard",
    status: "Dirty",
    lastCleaned: "2024-01-14 14:20",
    housekeeper: "Maria Santos",
    timeSpent: 0,
    guestCheckout: "2024-01-15 12:00",
    nextArrival: "2024-01-15 16:00",
    inspected: false,
    inspector: null,
    issues: ["Stained carpet", "Broken lamp"],
    amenities: "Incomplete",
  },
  {
    room: "103",
    type: "Standard",
    status: "Maintenance",
    lastCleaned: "2024-01-14 16:45",
    housekeeper: "Maria Santos",
    timeSpent: 35,
    guestCheckout: "2024-01-15 10:30",
    nextArrival: "2024-01-16 14:00",
    inspected: true,
    inspector: "Head Housekeeper",
    issues: ["AC not working", "Bathroom faucet leak"],
    amenities: "Complete",
  },
  {
    room: "201",
    type: "Deluxe",
    status: "Clean",
    lastCleaned: "2024-01-15 09:15",
    housekeeper: "Ana Rodriguez",
    timeSpent: 32,
    guestCheckout: "2024-01-15 11:30",
    nextArrival: "2024-01-15 15:30",
    inspected: true,
    inspector: "Head Housekeeper",
    issues: [],
    amenities: "Complete",
  },
  {
    room: "205",
    type: "Suite",
    status: "Clean",
    lastCleaned: "2024-01-15 11:00",
    housekeeper: "Ana Rodriguez",
    timeSpent: 45,
    guestCheckout: "2024-01-15 12:00",
    nextArrival: "2024-01-15 16:00",
    inspected: true,
    inspector: "Head Housekeeper",
    issues: [],
    amenities: "VIP Setup Complete",
  },
]

const lostFoundRegister = [
  {
    id: "LF-2024-001",
    item: "iPhone 13 Pro",
    description: "Black iPhone with blue case",
    location: "Room 205",
    foundDate: "2024-01-15",
    foundBy: "Ana Rodriguez",
    guestName: "John Smith",
    guestContact: "+1-555-123-4567",
    status: "returned",
    returnDate: "2024-01-15",
    storageLocation: "Front Desk Safe",
  },
  {
    id: "LF-2024-002",
    item: "Gold Watch",
    description: "Rolex Submariner, gold band",
    location: "Room 301",
    foundDate: "2024-01-14",
    foundBy: "Maria Santos",
    guestName: "Unknown",
    guestContact: null,
    status: "stored",
    returnDate: null,
    storageLocation: "Security Office",
  },
  {
    id: "LF-2024-003",
    item: "Laptop Charger",
    description: "MacBook Pro charger, USB-C",
    location: "Conference Room A",
    foundDate: "2024-01-13",
    foundBy: "Carmen Lopez",
    guestName: "Sarah Wilson",
    guestContact: "sarah@company.com",
    status: "contacted",
    returnDate: null,
    storageLocation: "Housekeeping Office",
  },
  {
    id: "LF-2024-004",
    item: "Sunglasses",
    description: "Ray-Ban Aviators, black frame",
    location: "Pool Area",
    foundDate: "2024-01-12",
    foundBy: "Isabella Garcia",
    guestName: "Unknown",
    guestContact: null,
    status: "stored",
    returnDate: null,
    storageLocation: "Lost & Found Cabinet",
  },
]

const maintenanceRequests = [
  {
    id: "MR-2024-001",
    room: "103",
    issue: "Air conditioning not working",
    priority: "high",
    reportedBy: "Maria Santos",
    reportedDate: "2024-01-15 08:30",
    assignedTo: "Mike Johnson",
    status: "in-progress",
    estimatedCompletion: "2024-01-15 16:00",
    description: "AC unit not cooling, possible refrigerant leak",
    guestImpact: "Room out of order",
  },
  {
    id: "MR-2024-002",
    room: "102",
    issue: "Bathroom faucet dripping",
    priority: "medium",
    reportedBy: "Maria Santos",
    reportedDate: "2024-01-15 09:15",
    assignedTo: "Tom Wilson",
    status: "pending",
    estimatedCompletion: "2024-01-15 14:00",
    description: "Hot water faucet in bathroom has constant drip",
    guestImpact: "Minor inconvenience",
  },
  {
    id: "MR-2024-003",
    room: "205",
    issue: "Carpet stain removal",
    priority: "low",
    reportedBy: "Ana Rodriguez",
    reportedDate: "2024-01-14 15:45",
    assignedTo: "Cleaning Specialist",
    status: "completed",
    estimatedCompletion: "2024-01-15 10:00",
    description: "Red wine stain on bedroom carpet",
    guestImpact: "Cosmetic only",
  },
  {
    id: "MR-2024-004",
    room: "301",
    issue: "TV remote not working",
    priority: "low",
    reportedBy: "Carmen Lopez",
    reportedDate: "2024-01-14 11:20",
    assignedTo: "Maintenance Team",
    status: "completed",
    estimatedCompletion: "2024-01-14 16:00",
    description: "Remote control batteries dead, replaced",
    guestImpact: "Guest convenience",
  },
]

const linenAmenitiesUsage = {
  daily: {
    date: "2024-01-15",
    linen: {
      bedSheets: { used: 45, clean: 120, dirty: 38, inLaundry: 25 },
      pillowcases: { used: 90, clean: 180, dirty: 76, inLaundry: 50 },
      towels: { used: 135, clean: 200, dirty: 115, inLaundry: 85 },
      bathrobes: { used: 28, clean: 45, dirty: 22, inLaundry: 15 },
    },
    amenities: {
      shampoo: { used: 32, stock: 150, reorderLevel: 50 },
      conditioner: { used: 32, stock: 145, reorderLevel: 50 },
      bodyWash: { used: 32, stock: 140, reorderLevel: 50 },
      lotion: { used: 28, stock: 95, reorderLevel: 40 },
      soap: { used: 45, stock: 200, reorderLevel: 75 },
      toothbrush: { used: 15, stock: 180, reorderLevel: 60 },
      toothpaste: { used: 15, stock: 85, reorderLevel: 30 },
      coffeePods: { used: 38, stock: 250, reorderLevel: 100 },
    },
  },
  weekly: {
    totalRoomsServiced: 315,
    averageLinenPerRoom: 3.2,
    averageAmenitiesPerRoom: 2.8,
    laundryTurnaround: 24,
    stockoutIncidents: 2,
  },
}

const deepCleaningSchedule = [
  {
    id: "DC-2024-001",
    room: "101-110",
    type: "Carpet Deep Clean",
    scheduledDate: "2024-01-20",
    frequency: "Quarterly",
    assignedTeam: "Professional Cleaning Service",
    estimatedDuration: "4 hours",
    status: "scheduled",
    lastCompleted: "2023-10-15",
    cost: 450,
  },
  {
    id: "DC-2024-002",
    room: "201-210",
    type: "Window Cleaning (Interior/Exterior)",
    scheduledDate: "2024-01-18",
    frequency: "Monthly",
    assignedTeam: "Window Cleaning Specialists",
    estimatedDuration: "6 hours",
    status: "scheduled",
    lastCompleted: "2023-12-18",
    cost: 320,
  },
  {
    id: "DC-2024-003",
    room: "All Bathrooms",
    type: "Tile & Grout Deep Clean",
    scheduledDate: "2024-01-25",
    frequency: "Bi-annual",
    assignedTeam: "Housekeeping Team + Specialists",
    estimatedDuration: "8 hours",
    status: "scheduled",
    lastCompleted: "2023-07-20",
    cost: 680,
  },
  {
    id: "DC-2024-004",
    room: "Kitchen & Restaurant",
    type: "Hood & Vent Cleaning",
    scheduledDate: "2024-01-22",
    frequency: "Quarterly",
    assignedTeam: "Kitchen Cleaning Service",
    estimatedDuration: "3 hours",
    status: "in-progress",
    lastCompleted: "2023-10-22",
    cost: 380,
  },
]

export default function HousekeepingReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCustomization, setShowCustomization] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    assignments: true,
    roomStatus: true,
    lostFound: true,
    maintenance: true,
    linen: true,
    deepCleaning: true,
  })
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterShift, setFilterShift] = useState("all")

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
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
                <BreadcrumbPage>Housekeeping Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Housekeeping Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Housekeeping Operations</h1>
              <p className="text-lg text-gray-600">
                Room assignments, maintenance tracking, and operational efficiency reports
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms, staff, items..."
                  className="pl-8 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowCustomization(!showCustomization)}
                className="bg-transparent"
              >
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
              <Button variant="outline" className="bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
            </div>
          </div>

          {/* Customization Panel */}
          {showCustomization && (
            <Card className="mb-6 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Report Customization
                </CardTitle>
                <CardDescription>Configure your housekeeping report display preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Visible Sections */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Visible Sections</Label>
                    <div className="space-y-2">
                      {Object.entries(visibleSections).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={() => toggleSection(key as keyof typeof visibleSections)}
                          />
                          <Label htmlFor={key} className="text-sm capitalize">
                            {key === "assignments"
                              ? "Daily Assignments"
                              : key === "roomStatus"
                                ? "Room Status"
                                : key === "lostFound"
                                  ? "Lost & Found"
                                  : key === "maintenance"
                                    ? "Maintenance Requests"
                                    : key === "linen"
                                      ? "Linen & Amenities"
                                      : "Deep Cleaning"}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filters */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Filters</Label>
                    <div className="space-y-3">
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="clean">Clean</SelectItem>
                          <SelectItem value="dirty">Dirty</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="ooo">Out of Order</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterShift} onValueChange={setFilterShift}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by shift" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Shifts</SelectItem>
                          <SelectItem value="morning">Morning Shift</SelectItem>
                          <SelectItem value="afternoon">Afternoon Shift</SelectItem>
                          <SelectItem value="night">Night Shift</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Quick Actions</Label>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Eye className="mr-2 h-3 w-3" />
                        Room Status Overview
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Filter className="mr-2 h-3 w-3" />
                        Efficiency Report
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Calendar className="mr-2 h-3 w-3" />
                        Schedule Deep Clean
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Housekeeping KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Rooms Cleaned</CardTitle>
                <Bed className="h-5 w-5 text-green-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {dailyRoomAssignments.reduce((sum, hk) => sum + hk.completed, 0)}
                </div>
                <div className="flex items-center text-sm text-green-100 mt-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {dailyRoomAssignments.reduce((sum, hk) => sum + hk.inProgress, 0)} in progress
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Avg Efficiency</CardTitle>
                <Clock className="h-5 w-5 text-blue-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(
                    dailyRoomAssignments.reduce((sum, hk) => sum + hk.efficiency, 0) / dailyRoomAssignments.length,
                  )}
                  %
                </div>
                <div className="flex items-center text-sm text-blue-100 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {Math.round(
                    dailyRoomAssignments.reduce((sum, hk) => sum + hk.averageTime, 0) / dailyRoomAssignments.length,
                  )}{" "}
                  min avg
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Maintenance Requests</CardTitle>
                <Wrench className="h-5 w-5 text-purple-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{maintenanceRequests.length}</div>
                <div className="flex items-center text-sm text-purple-100 mt-2">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {maintenanceRequests.filter((m) => m.status === "pending").length} pending
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-100">Lost & Found Items</CardTitle>
                <Package className="h-5 w-5 text-orange-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{lostFoundRegister.length}</div>
                <div className="flex items-center text-sm text-orange-100 mt-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {lostFoundRegister.filter((l) => l.status === "returned").length} returned
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="assignments" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            {visibleSections.assignments && <TabsTrigger value="assignments">Daily Assignments</TabsTrigger>}
            {visibleSections.roomStatus && <TabsTrigger value="roomStatus">Room Status</TabsTrigger>}
            {visibleSections.lostFound && <TabsTrigger value="lostFound">Lost & Found</TabsTrigger>}
            {visibleSections.maintenance && <TabsTrigger value="maintenance">Maintenance</TabsTrigger>}
            {visibleSections.linen && <TabsTrigger value="linen">Linen & Amenities</TabsTrigger>}
            {visibleSections.deepCleaning && <TabsTrigger value="deepCleaning">Deep Cleaning</TabsTrigger>}
          </TabsList>

          {visibleSections.assignments && (
            <TabsContent value="assignments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Daily Room Assignments
                  </CardTitle>
                  <CardDescription>Staff assignments and productivity tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dailyRoomAssignments.map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{assignment.housekeeper}</h3>
                            <p className="text-sm text-gray-600">{assignment.shift}</p>
                            <p className="text-sm text-gray-600">ID: {assignment.id}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{assignment.efficiency}% efficiency</Badge>
                            <Badge variant={assignment.pending === 0 ? "default" : "secondary"}>
                              {assignment.completed}/{assignment.rooms.length} completed
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Room Progress</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Completed</span>
                                <span className="font-medium text-green-600">{assignment.completed}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>In Progress</span>
                                <span className="font-medium text-blue-600">{assignment.inProgress}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Pending</span>
                                <span className="font-medium text-gray-600">{assignment.pending}</span>
                              </div>
                              <Progress
                                value={(assignment.completed / assignment.rooms.length) * 100}
                                className="h-2 mt-2"
                              />
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Performance Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Efficiency</span>
                                <span className="font-medium">{assignment.efficiency}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Avg Time/Room</span>
                                <span className="font-medium">{assignment.averageTime} min</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Rooms</span>
                                <span className="font-medium">{assignment.rooms.length}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Assigned Rooms</h4>
                            <div className="grid grid-cols-4 gap-1">
                              {assignment.rooms.map((room, index) => (
                                <div
                                  key={room}
                                  className={`text-xs p-1 rounded text-center ${
                                    index < assignment.completed
                                      ? "bg-green-100 text-green-800"
                                      : index < assignment.completed + assignment.inProgress
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {room}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {assignment.specialTasks.length > 0 && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                            <h4 className="font-medium text-yellow-800 mb-2">Special Tasks</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {assignment.specialTasks.map((task, index) => (
                                <li key={index} className="flex items-center">
                                  <Sparkles className="h-3 w-3 mr-2" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.roomStatus && (
            <TabsContent value="roomStatus" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    Room Status Report
                  </CardTitle>
                  <CardDescription>Detailed room status and cleaning information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Housekeeper</TableHead>
                        <TableHead>Last Cleaned</TableHead>
                        <TableHead>Time Spent</TableHead>
                        <TableHead>Inspected</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Next Arrival</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roomStatusReport.map((room) => (
                        <TableRow key={room.room}>
                          <TableCell className="font-medium">{room.room}</TableCell>
                          <TableCell>{room.type}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                room.status === "Clean"
                                  ? "default"
                                  : room.status === "Dirty"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {room.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{room.housekeeper}</TableCell>
                          <TableCell>{room.lastCleaned}</TableCell>
                          <TableCell>{room.timeSpent} min</TableCell>
                          <TableCell>
                            {room.inspected ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-gray-400" />
                            )}
                          </TableCell>
                          <TableCell>
                            {room.issues.length > 0 ? (
                              <div className="space-y-1">
                                {room.issues.map((issue, index) => (
                                  <Badge key={index} variant="destructive" className="text-xs">
                                    {issue}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-green-600 text-sm">None</span>
                            )}
                          </TableCell>
                          <TableCell>{room.nextArrival}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.lostFound && (
            <TabsContent value="lostFound" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Lost & Found Register
                  </CardTitle>
                  <CardDescription>Tracking of lost and found items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lostFoundRegister.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{item.item}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-sm text-gray-600">ID: {item.id}</p>
                          </div>
                          <Badge
                            variant={
                              item.status === "returned"
                                ? "default"
                                : item.status === "contacted"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>Found in: {item.location}</span>
                            </div>
                            <div className="flex items-center space-x-1 mb-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>Date: {item.foundDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3 text-gray-400" />
                              <span>Found by: {item.foundBy}</span>
                            </div>
                          </div>

                          <div>
                            <div className="mb-1">
                              <span className="text-gray-600">Guest:</span> {item.guestName}
                            </div>
                            {item.guestContact && (
                              <div className="mb-1">
                                <span className="text-gray-600">Contact:</span> {item.guestContact}
                              </div>
                            )}
                            <div>
                              <span className="text-gray-600">Storage:</span> {item.storageLocation}
                            </div>
                          </div>

                          <div>
                            {item.returnDate && (
                              <div className="mb-1">
                                <span className="text-gray-600">Returned:</span> {item.returnDate}
                              </div>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              {item.status === "stored" && (
                                <Button size="sm" variant="outline" className="bg-transparent">
                                  Contact Guest
                                </Button>
                              )}
                              {item.status === "contacted" && (
                                <Button size="sm" variant="outline" className="bg-transparent">
                                  Mark Returned
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.maintenance && (
            <TabsContent value="maintenance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="h-5 w-5 mr-2" />
                    Maintenance Requests
                  </CardTitle>
                  <CardDescription>Room maintenance issues and repair tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">
                              Room {request.room} - {request.issue}
                            </h3>
                            <p className="text-sm text-gray-600">{request.description}</p>
                            <p className="text-sm text-gray-600">ID: {request.id}</p>
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
                                  : request.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="mb-1">
                              <span className="text-gray-600">Reported by:</span> {request.reportedBy}
                            </div>
                            <div className="mb-1">
                              <span className="text-gray-600">Reported:</span> {request.reportedDate}
                            </div>
                            <div>
                              <span className="text-gray-600">Assigned to:</span> {request.assignedTo}
                            </div>
                          </div>

                          <div>
                            <div className="mb-1">
                              <span className="text-gray-600">Est. Completion:</span> {request.estimatedCompletion}
                            </div>
                            <div>
                              <span className="text-gray-600">Guest Impact:</span> {request.guestImpact}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {request.status === "pending" && (
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Assign Technician
                              </Button>
                            )}
                            {request.status === "in-progress" && (
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Update Status
                              </Button>
                            )}
                            {request.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.linen && (
            <TabsContent value="linen" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shirt className="h-5 w-5 mr-2" />
                      Linen Inventory & Usage
                    </CardTitle>
                    <CardDescription>Daily linen consumption and availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(linenAmenitiesUsage.daily.linen).map(([item, data]) => (
                        <div key={item} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium capitalize">{item.replace(/([A-Z])/g, " $1")}</h4>
                            <Badge variant="outline">{data.used} used today</Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-sm">
                            <div className="text-center p-2 bg-green-50 rounded">
                              <div className="font-bold text-green-600">{data.clean}</div>
                              <div className="text-xs text-green-700">Clean</div>
                            </div>
                            <div className="text-center p-2 bg-red-50 rounded">
                              <div className="font-bold text-red-600">{data.dirty}</div>
                              <div className="text-xs text-red-700">Dirty</div>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <div className="font-bold text-blue-600">{data.inLaundry}</div>
                              <div className="text-xs text-blue-700">In Laundry</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <div className="font-bold text-gray-600">{data.used}</div>
                              <div className="text-xs text-gray-700">Used</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Amenities Stock Levels
                    </CardTitle>
                    <CardDescription>Guest amenities inventory and reorder alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(linenAmenitiesUsage.daily.amenities).map(([item, data]) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium capitalize">{item.replace(/([A-Z])/g, " $1")}</div>
                            <div className="text-sm text-gray-600">Used today: {data.used}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{data.stock}</div>
                            <div className="text-xs text-gray-600">in stock</div>
                            {data.stock <= data.reorderLevel && (
                              <Badge variant="destructive" className="mt-1">
                                Reorder
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                  <CardDescription>Linen and amenities usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {linenAmenitiesUsage.weekly.totalRoomsServiced}
                      </div>
                      <div className="text-sm text-blue-700">Rooms Serviced</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {linenAmenitiesUsage.weekly.averageLinenPerRoom}
                      </div>
                      <div className="text-sm text-green-700">Avg Linen/Room</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {linenAmenitiesUsage.weekly.averageAmenitiesPerRoom}
                      </div>
                      <div className="text-sm text-purple-700">Avg Amenities/Room</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {linenAmenitiesUsage.weekly.laundryTurnaround}h
                      </div>
                      <div className="text-sm text-orange-700">Laundry Turnaround</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {linenAmenitiesUsage.weekly.stockoutIncidents}
                      </div>
                      <div className="text-sm text-red-700">Stockout Incidents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.deepCleaning && (
            <TabsContent value="deepCleaning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Deep Cleaning Schedule
                  </CardTitle>
                  <CardDescription>Scheduled deep cleaning and maintenance tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deepCleaningSchedule.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{task.type}</h3>
                            <p className="text-sm text-gray-600">Areas: {task.room}</p>
                            <p className="text-sm text-gray-600">ID: {task.id}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{task.frequency}</Badge>
                            <Badge
                              variant={
                                task.status === "completed"
                                  ? "default"
                                  : task.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {task.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="mb-1">
                              <span className="text-gray-600">Scheduled:</span> {task.scheduledDate}
                            </div>
                            <div className="mb-1">
                              <span className="text-gray-600">Duration:</span> {task.estimatedDuration}
                            </div>
                            <div>
                              <span className="text-gray-600">Last Completed:</span> {task.lastCompleted}
                            </div>
                          </div>

                          <div>
                            <div className="mb-1">
                              <span className="text-gray-600">Assigned Team:</span> {task.assignedTeam}
                            </div>
                            <div>
                              <span className="text-gray-600">Cost:</span> ${task.cost}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {task.status === "scheduled" && (
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Start Task
                              </Button>
                            )}
                            {task.status === "in-progress" && (
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Mark Complete
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="bg-transparent">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
