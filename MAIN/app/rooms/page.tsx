import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Settings, Bed, Users, Wifi, Car, Coffee, Tv } from "lucide-react"
import Link from "next/link"
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

const rooms = [
  {
    id: "R-101",
    number: "101",
    type: "Standard Room",
    floor: 1,
    capacity: 2,
    rate: "$120.00",
    status: "available",
    amenities: ["wifi", "tv", "coffee"],
    lastCleaned: "2024-01-15 10:30",
    nextBooking: "2024-01-20",
    occupancy: "0/2",
  },
  {
    id: "R-201",
    number: "201",
    type: "Deluxe Suite",
    floor: 2,
    capacity: 4,
    rate: "$250.00",
    status: "occupied",
    amenities: ["wifi", "tv", "coffee", "parking"],
    lastCleaned: "2024-01-14 14:00",
    nextBooking: "2024-01-18",
    occupancy: "2/4",
  },
  {
    id: "R-301",
    number: "301",
    type: "Presidential Suite",
    floor: 3,
    capacity: 6,
    rate: "$500.00",
    status: "maintenance",
    amenities: ["wifi", "tv", "coffee", "parking"],
    lastCleaned: "2024-01-13 09:00",
    nextBooking: "2024-01-25",
    occupancy: "0/6",
  },
  {
    id: "R-102",
    number: "102",
    type: "Standard Room",
    floor: 1,
    capacity: 2,
    rate: "$120.00",
    status: "cleaning",
    amenities: ["wifi", "tv"],
    lastCleaned: "2024-01-15 11:45",
    nextBooking: "2024-01-16",
    occupancy: "0/2",
  },
  {
    id: "R-202",
    number: "202",
    type: "Family Room",
    floor: 2,
    capacity: 4,
    rate: "$180.00",
    status: "available",
    amenities: ["wifi", "tv", "coffee"],
    lastCleaned: "2024-01-15 08:30",
    nextBooking: "2024-01-22",
    occupancy: "0/4",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "default"
    case "occupied":
      return "destructive"
    case "maintenance":
      return "secondary"
    case "cleaning":
      return "outline"
    default:
      return "outline"
  }
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "wifi":
      return <Wifi className="h-3 w-3" />
    case "tv":
      return <Tv className="h-3 w-3" />
    case "coffee":
      return <Coffee className="h-3 w-3" />
    case "parking":
      return <Car className="h-3 w-3" />
    default:
      return null
  }
}

export default function RoomsPage() {
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
                <BreadcrumbPage>Rooms</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
              <p className="text-gray-600">Manage hotel rooms, availability, and maintenance</p>
            </div>
            <div className="flex space-x-2">
              <Link href="/rooms/availability">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Availability
                </Button>
              </Link>
              <Link href="/rooms/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Room
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Across 3 floors</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">62% availability</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupied</CardTitle>
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">33% occupancy</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Under maintenance</p>
              </CardContent>
            </Card>
          </div>

          {/* Room Status Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Occupied Rooms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  Occupied Rooms (15)
                </CardTitle>
                <CardDescription>Currently checked-in guests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {[201, 203, 205, 301, 302, 304, 401, 402, 403, 404, 501, 502, 503, 504, 505].map((roomNumber) => (
                    <Link key={roomNumber} href={`/rooms/${roomNumber}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 w-full bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                      >
                        {roomNumber}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booked Rooms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                  Booked Rooms (8)
                </CardTitle>
                <CardDescription>Reserved for future arrivals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {[101, 102, 202, 204, 303, 305, 405, 506].map((roomNumber) => (
                    <Link key={roomNumber} href={`/rooms/${roomNumber}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 w-full bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                      >
                        {roomNumber}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Rooms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  Available Rooms (22)
                </CardTitle>
                <CardDescription>Ready for new bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                  {[
                    103, 104, 105, 106, 107, 108, 109, 110, 206, 207, 208, 209, 210, 306, 307, 308, 309, 310, 406, 407,
                    408, 409,
                  ].map((roomNumber) => (
                    <Link key={roomNumber} href={`/rooms/${roomNumber}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        {roomNumber}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Rooms</CardTitle>
                  <CardDescription>Manage room inventory and status</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search rooms..." className="pl-8 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Next Booking</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">Room {room.number}</div>
                          <div className="text-sm text-muted-foreground">{room.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>Floor {room.floor}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {room.occupancy}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{room.rate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(room.status)}>
                          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {room.amenities.map((amenity) => (
                            <div
                              key={amenity}
                              className="p-1 bg-gray-100 rounded"
                              title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                            >
                              {getAmenityIcon(amenity)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{room.nextBooking}</TableCell>
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
                              Edit Room
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Change Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
