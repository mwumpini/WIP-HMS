"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Settings,
  ArrowLeft,
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
import Link from "next/link"

const venues = [
  {
    id: "VEN-001",
    name: "Grand Ballroom",
    capacity: 300,
    area: "500 sqm",
    features: ["Stage", "Dance Floor", "Built-in AV", "Lighting System"],
    hourlyRate: 200,
    status: "available",
    location: "Ground Floor",
    bookings: 12,
    revenue: 15600,
  },
  {
    id: "VEN-002",
    name: "Conference Room A",
    capacity: 100,
    area: "120 sqm",
    features: ["Projector", "Whiteboard", "Video Conferencing", "WiFi"],
    hourlyRate: 80,
    status: "occupied",
    location: "2nd Floor",
    bookings: 8,
    revenue: 4800,
  },
  {
    id: "VEN-003",
    name: "Garden Pavilion",
    capacity: 150,
    area: "200 sqm",
    features: ["Outdoor Setting", "Garden View", "Weather Protection", "Natural Lighting"],
    hourlyRate: 120,
    status: "available",
    location: "Garden Level",
    bookings: 6,
    revenue: 7200,
  },
  {
    id: "VEN-004",
    name: "Rooftop Terrace",
    capacity: 80,
    area: "150 sqm",
    features: ["City View", "Open Air", "Bar Setup", "Sunset Views"],
    hourlyRate: 100,
    status: "maintenance",
    location: "Rooftop",
    bookings: 4,
    revenue: 3200,
  },
  {
    id: "VEN-005",
    name: "OFORIWAA HALL",
    capacity: 200,
    area: "300 sqm",
    features: ["Conference Setup", "Audio System", "Presentation Screen", "Climate Control"],
    hourlyRate: 150,
    status: "available",
    location: "Conference Wing",
    bookings: 15,
    revenue: 22500,
  },
  {
    id: "VEN-006",
    name: "DANKWAH HALL",
    capacity: 180,
    area: "280 sqm",
    features: ["Theater Style", "Audio Visual", "Recording Equipment", "Breakout Areas"],
    hourlyRate: 140,
    status: "available",
    location: "Conference Wing",
    bookings: 10,
    revenue: 14000,
  },
  {
    id: "VEN-007",
    name: "ENO HALL",
    capacity: 250,
    area: "400 sqm",
    features: ["Flexible Layout", "Advanced AV", "Catering Kitchen", "VIP Lounge"],
    hourlyRate: 180,
    status: "occupied",
    location: "Main Building",
    bookings: 18,
    revenue: 32400,
  },
  {
    id: "VEN-008",
    name: "ENO SYNDICATE",
    capacity: 50,
    area: "80 sqm",
    features: ["Intimate Setting", "Round Table Setup", "Smart Board", "Coffee Station"],
    hourlyRate: 60,
    status: "available",
    location: "Main Building",
    bookings: 5,
    revenue: 1800,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800"
    case "occupied":
      return "bg-red-100 text-red-800"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [capacityFilter, setCapacityFilter] = useState("all")

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || venue.status === statusFilter
    const matchesCapacity =
      capacityFilter === "all" ||
      (capacityFilter === "small" && venue.capacity <= 100) ||
      (capacityFilter === "medium" && venue.capacity > 100 && venue.capacity <= 200) ||
      (capacityFilter === "large" && venue.capacity > 200)

    return matchesSearch && matchesStatus && matchesCapacity
  })

  const totalRevenue = venues.reduce((sum, venue) => sum + venue.revenue, 0)
  const totalBookings = venues.reduce((sum, venue) => sum + venue.bookings, 0)
  const availableVenues = venues.filter((v) => v.status === "available").length

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
                <BreadcrumbPage>Venues</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Venue Management</h2>
                <p className="text-gray-600">Manage event venues, capacity, and availability</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Venue
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Venues</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{venues.length}</div>
                <p className="text-xs text-muted-foreground">{availableVenues} available now</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{venues.reduce((sum, v) => sum + v.capacity, 0)}</div>
                <p className="text-xs text-muted-foreground">Maximum attendees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBookings}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Venue Grid View */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Venue Overview</CardTitle>
                    <CardDescription>Quick view of all venues and their status</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search venues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sizes</SelectItem>
                        <SelectItem value="small">Small (&lt;=100)</SelectItem>
                        <SelectItem value="medium">Medium (101-200)</SelectItem>
                        <SelectItem value="large">Large (&gt;200)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVenues.map((venue) => (
                    <Card key={venue.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{venue.name}</CardTitle>
                            <CardDescription>{venue.location}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(venue.status)}>{venue.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Capacity:</span>
                              <p className="font-medium flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {venue.capacity} people
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Area:</span>
                              <p className="font-medium">{venue.area}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Hourly Rate:</span>
                              <p className="font-medium">${venue.hourlyRate}/hour</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Bookings:</span>
                              <p className="font-medium">{venue.bookings} this month</p>
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-500 text-sm">Features:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {venue.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {venue.features.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{venue.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500">Monthly Revenue:</span>
                              <span className="font-semibold text-green-600">${venue.revenue.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Eye className="mr-2 h-3 w-3" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Edit className="mr-2 h-3 w-3" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Calendar className="mr-2 h-3 w-3" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Table View */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Venue Information</CardTitle>
              <CardDescription>Complete venue details and management options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Venue</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Rate/Hour</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVenues.map((venue) => (
                      <TableRow key={venue.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{venue.name}</div>
                            <div className="text-sm text-muted-foreground">{venue.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{venue.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {venue.capacity}
                          </div>
                        </TableCell>
                        <TableCell>{venue.area}</TableCell>
                        <TableCell className="font-medium">${venue.hourlyRate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(venue.status)}>
                            {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{venue.bookings}</TableCell>
                        <TableCell className="font-medium text-green-600">${venue.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {venue.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {venue.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{venue.features.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Venue
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                View Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Venue
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
