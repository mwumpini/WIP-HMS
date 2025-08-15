"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleGuard } from "@/components/role-guard"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Hotel,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  UserPlus,
  UserMinus,
  Bell,
  Settings,
  Plus,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { Room, Reservation, Guest, GuestRequest, Folio } from "@/types/frontdesk"

interface FrontDeskStats {
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  maintenanceRooms: number
  occupancyRate: number
  todayArrivals: number
  todayDepartures: number
  pendingRequests: number
  totalRevenue: number
  averageRate: number
}

export default function FrontDeskPage() {
  const [stats, setStats] = useState<FrontDeskStats>({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    maintenanceRooms: 0,
    occupancyRate: 0,
    todayArrivals: 0,
    todayDepartures: 0,
    pendingRequests: 0,
    totalRevenue: 0,
    averageRate: 0,
  })

  const [rooms, setRooms] = useState<Room[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>([])
  const [folios, setFolios] = useState<Folio[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadFrontDeskData()
  }, [])

  const loadFrontDeskData = () => {
    try {
      // Load data from localStorage
      const roomsData = JSON.parse(localStorage.getItem("rooms") || "[]")
      const reservationsData = JSON.parse(localStorage.getItem("reservations") || "[]")
      const guestsData = JSON.parse(localStorage.getItem("guests") || "[]")
      const requestsData = JSON.parse(localStorage.getItem("guestRequests") || "[]")
      const foliosData = JSON.parse(localStorage.getItem("folios") || "[]")

      setRooms(roomsData)
      setReservations(reservationsData)
      setGuests(guestsData)
      setGuestRequests(requestsData)
      setFolios(foliosData)

      // Calculate statistics
      const today = new Date().toISOString().split("T")[0]
      const occupiedRooms = roomsData.filter((room: Room) => room.status === "occupied").length
      const availableRooms = roomsData.filter((room: Room) => room.status === "available").length
      const maintenanceRooms = roomsData.filter(
        (room: Room) => room.status === "maintenance" || room.status === "out-of-order",
      ).length

      const todayArrivals = reservationsData.filter(
        (res: Reservation) => res.checkInDate === today && res.status === "confirmed",
      ).length

      const todayDepartures = reservationsData.filter(
        (res: Reservation) => res.checkOutDate === today && res.status === "checked-in",
      ).length

      const pendingRequests = requestsData.filter((req: GuestRequest) => req.status === "pending").length

      const totalRevenue = foliosData.reduce((sum: number, folio: Folio) => sum + folio.totalCharges, 0)
      const averageRate = reservationsData.length > 0 ? totalRevenue / reservationsData.length : 0

      setStats({
        totalRooms: roomsData.length,
        occupiedRooms,
        availableRooms,
        maintenanceRooms,
        occupancyRate: roomsData.length > 0 ? (occupiedRooms / roomsData.length) * 100 : 0,
        todayArrivals,
        todayDepartures,
        pendingRequests,
        totalRevenue,
        averageRate,
      })
    } catch (error) {
      console.error("Error loading front desk data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickCheckIn = (reservationId: string) => {
    const updatedReservations = reservations.map((res) =>
      res.id === reservationId
        ? {
            ...res,
            status: "checked-in" as const,
            checkedInBy: user?.name,
            checkedInAt: new Date().toISOString(),
          }
        : res,
    )
    setReservations(updatedReservations)
    localStorage.setItem("reservations", JSON.stringify(updatedReservations))

    // Update room status
    const reservation = reservations.find((res) => res.id === reservationId)
    if (reservation) {
      const updatedRooms = rooms.map((room) =>
        room.id === reservation.roomId
          ? { ...room, status: "occupied" as const, currentGuest: reservation.guestName }
          : room,
      )
      setRooms(updatedRooms)
      localStorage.setItem("rooms", JSON.stringify(updatedRooms))
    }

    loadFrontDeskData() // Refresh stats
  }

  const handleQuickCheckOut = (reservationId: string) => {
    const updatedReservations = reservations.map((res) =>
      res.id === reservationId
        ? {
            ...res,
            status: "checked-out" as const,
            checkedOutBy: user?.name,
            checkedOutAt: new Date().toISOString(),
          }
        : res,
    )
    setReservations(updatedReservations)
    localStorage.setItem("reservations", JSON.stringify(updatedReservations))

    // Update room status
    const reservation = reservations.find((res) => res.id === reservationId)
    if (reservation) {
      const updatedRooms = rooms.map((room) =>
        room.id === reservation.roomId
          ? { ...room, status: "cleaning" as const, currentGuest: undefined, checkOutTime: new Date().toISOString() }
          : room,
      )
      setRooms(updatedRooms)
      localStorage.setItem("rooms", JSON.stringify(updatedRooms))
    }

    loadFrontDeskData() // Refresh stats
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const getRoomStatusColor = (status: string) => {
    const colors = {
      available: "bg-green-100 text-green-800 border-green-200",
      occupied: "bg-blue-100 text-blue-800 border-blue-200",
      maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cleaning: "bg-purple-100 text-purple-800 border-purple-200",
      "out-of-order": "bg-red-100 text-red-800 border-red-200",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <RoleGuard requiredRole={["management", "supervisor", "frontdesk"]} requiredPermission="manage_frontdesk">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Front Desk Operations</h1>
            <p className="text-gray-600">Manage guest check-ins, check-outs, and hotel operations</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/frontdesk/reservations/new">
                <Plus className="mr-2 h-4 w-4" />
                New Reservation
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/frontdesk/guests/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Walk-in Guest
              </Link>
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {stats.pendingRequests > 0 && (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              You have {stats.pendingRequests} pending guest requests that need attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Hotel className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.occupancyRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.occupiedRooms} of {stats.totalRooms} rooms occupied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Arrivals</CardTitle>
              <UserPlus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.todayArrivals}</div>
              <p className="text-xs text-muted-foreground">Guests checking in today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Departures</CardTitle>
              <UserMinus className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.todayDepartures}</div>
              <p className="text-xs text-muted-foreground">Guests checking out today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">Average rate: {formatCurrency(stats.averageRate)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Room Status Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.availableRooms}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.occupiedRooms}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Settings className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.maintenanceRooms}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requests</CardTitle>
              <Bell className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.pendingRequests}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="arrivals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="arrivals">Today's Arrivals</TabsTrigger>
            <TabsTrigger value="departures">Today's Departures</TabsTrigger>
            <TabsTrigger value="rooms">Room Status</TabsTrigger>
            <TabsTrigger value="requests">Guest Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="arrivals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Arrivals</CardTitle>
                <CardDescription>Guests scheduled to check in today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations
                    .filter(
                      (res) => res.checkInDate === new Date().toISOString().split("T")[0] && res.status === "confirmed",
                    )
                    .map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium">{reservation.guestName}</h3>
                              <p className="text-sm text-gray-500">
                                Room {reservation.roomNumber} • {reservation.nights} nights
                              </p>
                              <p className="text-sm text-gray-500">
                                {reservation.adults} adults
                                {reservation.children > 0 && `, ${reservation.children} children`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(reservation.totalAmount)}</p>
                              <p className="text-sm text-gray-500">{formatCurrency(reservation.ratePerNight)}/night</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleQuickCheckIn(reservation.id)}>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Check In
                          </Button>
                        </div>
                      </div>
                    ))}
                  {reservations.filter(
                    (res) => res.checkInDate === new Date().toISOString().split("T")[0] && res.status === "confirmed",
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>No arrivals scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Departures</CardTitle>
                <CardDescription>Guests scheduled to check out today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations
                    .filter(
                      (res) =>
                        res.checkOutDate === new Date().toISOString().split("T")[0] && res.status === "checked-in",
                    )
                    .map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium">{reservation.guestName}</h3>
                              <p className="text-sm text-gray-500">
                                Room {reservation.roomNumber} • {reservation.nights} nights
                              </p>
                              <p className="text-sm text-gray-500">
                                Balance: {formatCurrency(reservation.remainingAmount)}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={reservation.paymentStatus === "paid" ? "default" : "secondary"}
                                className="mb-2"
                              >
                                {reservation.paymentStatus}
                              </Badge>
                              <p className="text-sm text-gray-500">Total: {formatCurrency(reservation.totalAmount)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleQuickCheckOut(reservation.id)}>
                            <UserMinus className="h-4 w-4 mr-1" />
                            Check Out
                          </Button>
                        </div>
                      </div>
                    ))}
                  {reservations.filter(
                    (res) => res.checkOutDate === new Date().toISOString().split("T")[0] && res.status === "checked-in",
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>No departures scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room Status Overview</CardTitle>
                <CardDescription>Current status of all rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {rooms.map((room) => (
                    <Card key={room.id} className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Room {room.number}</CardTitle>
                          <Badge className={getRoomStatusColor(room.status)}>{room.status}</Badge>
                        </div>
                        <CardDescription>{room.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Floor:</span>
                            <span>{room.floor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Capacity:</span>
                            <span>{room.capacity} guests</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rate:</span>
                            <span>{formatCurrency(room.baseRate)}</span>
                          </div>
                          {room.currentGuest && (
                            <div className="flex justify-between">
                              <span>Guest:</span>
                              <span className="font-medium">{room.currentGuest}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guest Requests</CardTitle>
                <CardDescription>Pending and recent guest service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guestRequests
                    .filter((req) => req.status === "pending" || req.status === "in-progress")
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium">
                                {request.guestName} - Room {request.roomNumber}
                              </h3>
                              <p className="text-sm text-gray-600">{request.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {request.type}
                                </Badge>
                                <Badge
                                  variant={
                                    request.priority === "urgent"
                                      ? "destructive"
                                      : request.priority === "high"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {request.priority}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{new Date(request.requestedAt).toLocaleString()}</p>
                              {request.estimatedCost && (
                                <p className="text-sm font-medium">{formatCurrency(request.estimatedCost)}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    ))}
                  {guestRequests.filter((req) => req.status === "pending" || req.status === "in-progress").length ===
                    0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>No pending guest requests</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
