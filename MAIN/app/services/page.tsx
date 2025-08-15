"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Coffee,
  Utensils,
  Waves,
  Car,
  Music,
  ShoppingBag,
  Sparkles,
  Wifi,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Star,
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

// Mamani Hotel services and facilities
const services = [
  {
    id: "SRV-001",
    name: "Restaurant & Bar",
    category: "Dining",
    description: "Full-service restaurant and bar with local and international cuisine",
    capacity: 80,
    operatingHours: "6:00 AM - 11:00 PM",
    rate: 45,
    rateType: "per person",
    status: "active",
    features: ["Local Cuisine", "International Menu", "Bar Service", "Room Service", "Catering"],
    location: "Ground Floor",
    staff: 8,
    revenue: 12500,
    bookings: 156,
  },
  {
    id: "SRV-002",
    name: "Swimming Pool",
    category: "Recreation",
    description: "Outdoor swimming pool with poolside service and relaxation area",
    capacity: 50,
    operatingHours: "6:00 AM - 10:00 PM",
    rate: 20,
    rateType: "per person/day",
    status: "active",
    features: ["Outdoor Pool", "Poolside Service", "Lounge Chairs", "Towel Service", "Pool Bar"],
    location: "Pool Area",
    staff: 3,
    revenue: 3200,
    bookings: 89,
  },
  {
    id: "SRV-003",
    name: "Massage Parlor",
    category: "Wellness",
    description: "Professional massage and wellness services for relaxation and therapy",
    capacity: 6,
    operatingHours: "9:00 AM - 9:00 PM",
    rate: 80,
    rateType: "per session",
    status: "active",
    features: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone", "Couples Massage"],
    location: "Wellness Center",
    staff: 4,
    revenue: 6400,
    bookings: 78,
  },
  {
    id: "SRV-004",
    name: "Nightclub",
    category: "Entertainment",
    description: "Vibrant nightclub with DJ, dancing, and entertainment",
    capacity: 120,
    operatingHours: "9:00 PM - 3:00 AM",
    rate: 25,
    rateType: "cover charge",
    status: "active",
    features: ["DJ Music", "Dance Floor", "VIP Section", "Bar Service", "Live Entertainment"],
    location: "Entertainment Wing",
    staff: 6,
    revenue: 8900,
    bookings: 45,
  },
  {
    id: "SRV-005",
    name: "Vehicle Rental",
    category: "Transport",
    description: "Vehicle rental service including airport pickup and tour services",
    capacity: 8,
    operatingHours: "24/7 Available",
    rate: 300,
    rateType: "per day",
    status: "active",
    features: ["Airport Pickup", "City Tours", "Business Transport", "Wedding Cars", "Long Distance"],
    location: "Main Entrance",
    staff: 5,
    revenue: 15600,
    bookings: 67,
  },
  {
    id: "SRV-006",
    name: "Mini Shop",
    category: "Retail",
    description: "Convenience store with essentials, snacks, and travel items",
    capacity: 20,
    operatingHours: "7:00 AM - 11:00 PM",
    rate: 15,
    rateType: "average purchase",
    status: "active",
    features: ["Snacks & Drinks", "Toiletries", "Travel Items", "Souvenirs", "Phone Cards"],
    location: "Lobby Area",
    staff: 2,
    revenue: 2800,
    bookings: 234,
  },
  {
    id: "SRV-007",
    name: "Free WiFi Internet",
    category: "Technology",
    description: "Complimentary high-speed internet access throughout the hotel",
    capacity: 200,
    operatingHours: "24/7",
    rate: 0,
    rateType: "complimentary",
    status: "active",
    features: ["High Speed", "Hotel-wide Coverage", "Business Center", "Meeting Room Access", "Mobile Hotspot"],
    location: "Entire Hotel",
    staff: 1,
    revenue: 0,
    bookings: 450,
  },
  {
    id: "SRV-008",
    name: "Conference Equipment",
    category: "Business",
    description: "Professional AV equipment and conference support services",
    capacity: 115,
    operatingHours: "8:00 AM - 10:00 PM",
    rate: 150,
    rateType: "per event",
    status: "active",
    features: ["Projectors", "Sound Systems", "Microphones", "Flip Charts", "Technical Support"],
    location: "Conference Halls",
    staff: 3,
    revenue: 4500,
    bookings: 28,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Dining":
      return <Utensils className="h-5 w-5" />
    case "Recreation":
      return <Waves className="h-5 w-5" />
    case "Wellness":
      return <Sparkles className="h-5 w-5" />
    case "Entertainment":
      return <Music className="h-5 w-5" />
    case "Transport":
      return <Car className="h-5 w-5" />
    case "Retail":
      return <ShoppingBag className="h-5 w-5" />
    case "Technology":
      return <Wifi className="h-5 w-5" />
    case "Business":
      return <Coffee className="h-5 w-5" />
    default:
      return <Star className="h-5 w-5" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Dining":
      return "bg-green-50 text-green-700 border-green-200"
    case "Recreation":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "Wellness":
      return "bg-pink-50 text-pink-700 border-pink-200"
    case "Entertainment":
      return "bg-purple-50 text-purple-700 border-purple-200"
    case "Transport":
      return "bg-orange-50 text-orange-700 border-orange-200"
    case "Retail":
      return "bg-yellow-50 text-yellow-700 border-yellow-200"
    case "Technology":
      return "bg-indigo-50 text-indigo-700 border-indigo-200"
    case "Business":
      return "bg-gray-50 text-gray-700 border-gray-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0)
  const totalBookings = services.reduce((sum, service) => sum + service.bookings, 0)
  const activeServices = services.filter((s) => s.status === "active").length
  const categories = [...new Set(services.map((s) => s.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Mamani Hotel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Services & Facilities</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Services & Facilities</h2>
              <p className="text-gray-600">Manage all services and facilities at Mamani Hotel</p>
              <p className="text-sm text-gray-500">
                Hse Num PL 485, Gurugu, Tamale Northern Region | 0540222273
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{services.length}</div>
                <p className="text-xs text-muted-foreground">{activeServices} active services</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
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
                <div className="text-2xl font-bold">GH₵{totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Coffee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">Service categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Overview Grid */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Mamani Hotel Services Overview</CardTitle>
                <CardDescription>Complete overview of all hotel services and facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border transition-colors hover:shadow-md ${getCategoryColor(service.category)}`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        {getCategoryIcon(service.category)}
                        <div>
                          <h3 className="font-semibold text-sm">{service.name}</h3>
                          <p className="text-xs opacity-75">{service.category}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Capacity:</span>
                          <span className="font-medium">{service.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate:</span>
                          <span className="font-medium">
                            {service.rate === 0 ? "Free" : `GH₵${service.rate}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bookings:</span>
                          <span className="font-medium">{service.bookings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="font-medium text-green-600">GH₵{service.revenue}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        <div className="text-xs opacity-75">{service.operatingHours}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="dining">Dining</TabsTrigger>
              <TabsTrigger value="recreation">Recreation</TabsTrigger>
              <TabsTrigger value="wellness">Wellness</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </Tabs>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>All Services Management</CardTitle>
                      <CardDescription>Complete list of all services and facilities</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search services..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Operating Hours</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Bookings</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Staff</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredServices.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {getCategoryIcon(service.category)}
                                <div>
                                  <div className="font-medium">{service.name}</div>
                                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                                    {service.description}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getCategoryColor(service.category)}>
                                {service.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {service.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {service.capacity}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span className="text-xs">{service.operatingHours}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {service.rate === 0 ? "Free" : `GH₵${service.rate}`}
                              </div>
                              <div className="text-xs text-muted-foreground">{service.rateType}</div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(service.status)}>
                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{service.bookings}</TableCell>
                            <TableCell className="font-medium text-green-600">
                              GH₵{service.revenue.toLocaleString()}
                            </TableCell>
                            <TableCell>{service.staff}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex space-x-1 justify-end">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
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

            <TabsContent value="dining">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant & Bar Services</CardTitle>
                  <CardDescription>Dining and beverage services at Mamani Hotel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredServices
                      .filter((service) => service.category === "Dining")
                      .map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getCategoryIcon(service.category)}
                                <div>
                                  <CardTitle className="text-lg">{service.name}</CardTitle>
                                  <CardDescription>{service.description}</CardDescription>
                                </div>
                              </div>
                              <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Capacity:</span>
                                  <p className="font-medium">{service.capacity} people</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Average Rate:</span>
                                  <p className="font-medium">GH₵{service.rate} {service.rateType}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Operating Hours:</span>
                                  <p className="font-medium">{service.operatingHours}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Staff:</span>
                                  <p className="font-medium">{service.staff} members</p>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm">Features:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {service.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <div>
                                  <span className="text-sm text-gray-500">Monthly Revenue:</span>
                                  <p className="font-semibold text-green-600">GH₵{service.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Bookings:</span>
                                  <p className="font-semibold">{service.bookings}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recreation">
              <Card>
                <CardHeader>
                  <CardTitle>Recreation Services</CardTitle>
                  <CardDescription>Swimming pool and recreational facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredServices
                      .filter((service) => service.category === "Recreation")
                      .map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getCategoryIcon(service.category)}
                                <div>
                                  <CardTitle className="text-lg">{service.name}</CardTitle>
                                  <CardDescription>{service.description}</CardDescription>
                                </div>
                              </div>
                              <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Capacity:</span>
                                  <p className="font-medium">{service.capacity} people</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Rate:</span>
                                  <p className="font-medium">GH₵{service.rate} {service.rateType}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Operating Hours:</span>
                                  <p className="font-medium">{service.operatingHours}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Staff:</span>
                                  <p className="font-medium">{service.staff} members</p>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm">Features:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {service.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <div>
                                  <span className="text-sm text-gray-500">Monthly Revenue:</span>
                                  <p className="font-semibold text-green-600">GH₵{service.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Bookings:</span>
                                  <p className="font-semibold">{service.bookings}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wellness">
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Services</CardTitle>
                  <CardDescription>Massage parlor and wellness facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredServices
                      .filter((service) => service.category === "Wellness")
                      .map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getCategoryIcon(service.category)}
                                <div>
                                  <CardTitle className="text-lg">{service.name}</CardTitle>
                                  <CardDescription>{service.description}</CardDescription>
                                </div>
                              </div>
                              <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Capacity:</span>
                                  <p className="font-medium">{service.capacity} people</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Rate:</span>
                                  <p className="font-medium">GH₵{service.rate} {service.rateType}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Operating Hours:</span>
                                  <p className="font-medium">{service.operatingHours}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Staff:</span>
                                  <p className="font-medium">{service.staff} therapists</p>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm">Services:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {service.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <div>
                                  <span className="text-sm text-gray-500">Monthly Revenue:</span>
                                  <p className="font-semibold text-green-600">GH₵{service.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Sessions:</span>
                                  <p className="font-semibold">{service.bookings}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entertainment">
              <Card>
                <CardHeader>
                  <CardTitle>Entertainment Services</CardTitle>
                  <CardDescription>Nightclub and entertainment facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredServices
                      .filter((service) => service.category === "Entertainment")
                      .map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getCategoryIcon(service.category)}
                                <div>
                                  <CardTitle className="text-lg">{service.name}</CardTitle>
                                  <CardDescription>{service.description}</CardDescription>
                                </div>
                              </div>
                              <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Capacity:</span>
                                  <p className="font-medium">{service.capacity} people</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Cover Charge:</span>
                                  <p className="font-medium">GH₵{service.rate} {service.rateType}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Operating Hours:</span>
                                  <p className="font-medium">{service.operatingHours}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Staff:</span>
                                  <p className="font-medium">{service.staff} members</p>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm">Features:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {service.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <div>
                                  <span className="text-sm text-gray-500">Monthly Revenue:</span>
                                  <p className="font-semibold text-green-600">GH₵{service.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">Events:</span>
                                  <p className="font-semibold">{service.bookings}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transport">
              <Card>
                <CardHeader>
                  <CardTitle>Transport Services</CardTitle>
                  <CardDescription>Vehicle rental and transport services</CardDescription>
                </CardHeader>\
