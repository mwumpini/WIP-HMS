import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  CreditCard,
  Bed,
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  MapPin,
  Edit,
  CheckIcon as CheckOut,
  MessageSquare,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const getRoomDetails = (roomNumber: string) => {
  const roomData: { [key: string]: any } = {
    "201": {
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
      guest: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+233 24 123 4567",
        nationality: "Ghana",
        checkIn: "2024-01-15 15:00",
        checkOut: "2024-01-18 11:00",
        nights: 3,
        adults: 2,
        children: 0,
        bookingRef: "BK-2024-001",
        paymentStatus: "paid",
        totalAmount: "$750.00",
        specialRequests: "Late check-out requested",
      },
    },
    "101": {
      id: "R-101",
      number: "101",
      type: "Standard Room",
      floor: 1,
      capacity: 2,
      rate: "$120.00",
      status: "booked",
      amenities: ["wifi", "tv", "coffee"],
      lastCleaned: "2024-01-15 10:30",
      nextBooking: "2024-01-20",
      occupancy: "0/2",
      guest: {
        name: "Mary Johnson",
        email: "mary.johnson@email.com",
        phone: "+233 20 987 6543",
        nationality: "USA",
        checkIn: "2024-01-20 14:00",
        checkOut: "2024-01-23 11:00",
        nights: 3,
        adults: 1,
        children: 1,
        bookingRef: "BK-2024-002",
        paymentStatus: "pending",
        totalAmount: "$360.00",
        specialRequests: "Ground floor room preferred",
      },
    },
    "103": {
      id: "R-103",
      number: "103",
      type: "Standard Room",
      floor: 1,
      capacity: 2,
      rate: "$120.00",
      status: "available",
      amenities: ["wifi", "tv"],
      lastCleaned: "2024-01-15 09:00",
      nextBooking: null,
      occupancy: "0/2",
      guest: null,
    },
  }

  return roomData[roomNumber] || null
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "default"
    case "occupied":
      return "destructive"
    case "booked":
      return "secondary"
    case "maintenance":
      return "outline"
    default:
      return "outline"
  }
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "wifi":
      return <Wifi className="h-4 w-4" />
    case "tv":
      return <Tv className="h-4 w-4" />
    case "coffee":
      return <Coffee className="h-4 w-4" />
    case "parking":
      return <Car className="h-4 w-4" />
    default:
      return null
  }
}

export default function RoomDetailsPage({ params }: { params: { roomNumber: string } }) {
  const room = getRoomDetails(params.roomNumber)

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Room Not Found</CardTitle>
            <CardDescription>Room {params.roomNumber} does not exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/rooms">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Rooms
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
                <BreadcrumbLink href="/rooms">Rooms</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Room {room.number}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Link href="/rooms">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Rooms
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Room {room.number}</h2>
                <p className="text-gray-600">
                  {room.type} • Floor {room.floor}
                </p>
              </div>
              <Badge variant={getStatusColor(room.status)}>
                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Room
              </Button>
              {room.status === "occupied" && (
                <Button>
                  <CheckOut className="mr-2 h-4 w-4" />
                  Check Out
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bed className="mr-2 h-5 w-5" />
                  Room Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Room Type</span>
                  <span className="font-medium">{room.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="font-medium flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {room.occupancy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rate per Night</span>
                  <span className="font-medium">{room.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Floor</span>
                  <span className="font-medium">Floor {room.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Cleaned</span>
                  <span className="font-medium">{room.lastCleaned}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-sm text-muted-foreground">Amenities</span>
                  <div className="flex space-x-2 mt-2">
                    {room.amenities.map((amenity: string) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-1 p-2 bg-gray-100 rounded-md"
                        title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      >
                        {getAmenityIcon(amenity)}
                        <span className="text-xs capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            {room.guest && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="font-medium">{room.guest.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="font-medium flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      {room.guest.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="font-medium flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {room.guest.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Nationality</span>
                    <span className="font-medium flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {room.guest.nationality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Guests</span>
                    <span className="font-medium">
                      {room.guest.adults} Adults, {room.guest.children} Children
                    </span>
                  </div>
                  {room.guest.specialRequests && (
                    <>
                      <Separator />
                      <div>
                        <span className="text-sm text-muted-foreground">Special Requests</span>
                        <p className="mt-1 text-sm bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                          {room.guest.specialRequests}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Booking Information */}
            {room.guest && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Booking Reference</span>
                    <span className="font-medium">{room.guest.bookingRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Check-in</span>
                    <span className="font-medium flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {room.guest.checkIn}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Check-out</span>
                    <span className="font-medium flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {room.guest.checkOut}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Nights</span>
                    <span className="font-medium">{room.guest.nights} nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Amount</span>
                    <span className="font-medium">{room.guest.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment Status</span>
                    <Badge variant={room.guest.paymentStatus === "paid" ? "default" : "secondary"}>
                      <CreditCard className="mr-1 h-3 w-3" />
                      {room.guest.paymentStatus.charAt(0).toUpperCase() + room.guest.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Guest
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      View Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Room Card */}
            {!room.guest && room.status === "available" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    Available for Booking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    This room is ready for new bookings and has been cleaned and prepared.
                  </p>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Booking
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Block Room
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
