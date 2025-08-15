"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Bell,
  Calendar,
  LogIn,
  LogOut,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import Link from "next/link"

// Mock data for today's operations
const todayStats = {
  occupancy: 78,
  roomsSold: 62,
  adr: 750,
  revpar: 585,
  arrivals: 15,
  departures: 12,
  ooo: 2,
}

const arrivals = [
  {
    id: "BK-001",
    guest: "John Smith",
    email: "john@example.com",
    phone: "+233 24 123 4567",
    room: "201",
    roomType: "Deluxe Suite",
    checkIn: "15:00",
    nights: 3,
    status: "confirmed",
    vip: true,
    specialRequests: "Late check-in requested",
  },
  {
    id: "BK-002",
    guest: "Mary Johnson",
    email: "mary@example.com",
    phone: "+233 20 987 6543",
    room: "105",
    roomType: "Standard Room",
    checkIn: "14:30",
    nights: 2,
    status: "pending",
    vip: false,
    specialRequests: "Ground floor preferred",
  },
  {
    id: "BK-003",
    guest: "David Wilson",
    email: "david@example.com",
    phone: "+233 55 456 7890",
    room: "301",
    roomType: "Presidential Suite",
    checkIn: "16:00",
    nights: 1,
    status: "confirmed",
    vip: true,
    specialRequests: "VIP treatment, champagne",
  },
]

const departures = [
  {
    id: "BK-004",
    guest: "Sarah Brown",
    email: "sarah@example.com",
    room: "203",
    roomType: "Deluxe Suite",
    checkOut: "11:00",
    folio: 1250.0,
    status: "ready",
    paymentStatus: "paid",
  },
  {
    id: "BK-005",
    guest: "Michael Davis",
    email: "michael@example.com",
    room: "107",
    roomType: "Standard Room",
    checkOut: "10:30",
    folio: 480.0,
    status: "pending",
    paymentStatus: "pending",
  },
]

const alerts = [
  {
    type: "vip",
    message: "VIP guest John Smith arriving at 15:00 - Room 201",
    priority: "high",
    time: "2 hours",
  },
  {
    type: "maintenance",
    message: "Room 305 AC unit needs repair",
    priority: "medium",
    time: "1 hour",
  },
  {
    type: "payment",
    message: "Payment authorization pending for BK-002",
    priority: "high",
    time: "30 minutes",
  },
]

export default function FrontDeskDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("arrivals")

  const handleQuickCheckIn = (bookingId: string) => {
    console.log(`Quick check-in for booking: ${bookingId}`)
    // Implement quick check-in logic
  }

  const handleExpressCheckOut = (bookingId: string) => {
    console.log(`Express check-out for booking: ${bookingId}`)
    // Implement express check-out logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Front Desk Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Front Desk Dashboard</h2>
              <p className="text-gray-600">Today's operations and guest management</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guest or reservation..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Today's Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.occupancy}%</div>
                <p className="text-xs text-muted-foreground">{todayStats.roomsSold} rooms sold</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ADR</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHC {todayStats.adr}</div>
                <p className="text-xs text-muted-foreground">Average Daily Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHC {todayStats.revpar}</div>
                <p className="text-xs text-muted-foreground">Revenue per Available Room</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Arrivals</CardTitle>
                <LogIn className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.arrivals}</div>
                <p className="text-xs text-muted-foreground">Expected today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departures</CardTitle>
                <LogOut className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.departures}</div>
                <p className="text-xs text-muted-foreground">Scheduled today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Order</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayStats.ooo}</div>
                <p className="text-xs text-muted-foreground">Rooms unavailable</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <Bell className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alerts.length}</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Alerts Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-yellow-500" />
                  Priority Alerts
                </CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.priority === "high"
                        ? "bg-red-50 border-red-400"
                        : alert.priority === "medium"
                          ? "bg-yellow-50 border-yellow-400"
                          : "bg-blue-50 border-blue-400"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time} ago</p>
                      </div>
                      <Badge variant={alert.priority === "high" ? "destructive" : "secondary"}>{alert.priority}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common front desk tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/bookings/new">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Walk-in Registration
                  </Button>
                </Link>
                <Link href="/rooms/availability">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Room Assignment
                  </Button>
                </Link>
                <Link href="/invoices/new">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Payment
                  </Button>
                </Link>
                <Link href="/reports/daily">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Night Audit
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* VIP Arrivals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  VIP Arrivals Today
                </CardTitle>
                <CardDescription>Special attention required</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {arrivals
                  .filter((arrival) => arrival.vip)
                  .map((vip) => (
                    <div key={vip.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{vip.guest}</h4>
                        <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Room {vip.room} • {vip.checkIn}
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">{vip.specialRequests}</p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Arrivals and Departures */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Operations</CardTitle>
              <CardDescription>Manage check-ins and check-outs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="arrivals">Arrivals ({arrivals.length})</TabsTrigger>
                  <TabsTrigger value="departures">Departures ({departures.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="arrivals">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Nights</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Special Requests</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {arrivals.map((arrival) => (
                        <TableRow key={arrival.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium flex items-center">
                                {arrival.guest}
                                {arrival.vip && <Star className="ml-1 h-3 w-3 text-yellow-500" />}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Mail className="h-3 w-3" />
                                <span>{arrival.email}</span>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Phone className="h-3 w-3" />
                                <span>{arrival.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                {arrival.room}
                              </div>
                              <div className="text-sm text-muted-foreground">{arrival.roomType}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {arrival.checkIn}
                            </div>
                          </TableCell>
                          <TableCell>{arrival.nights} nights</TableCell>
                          <TableCell>
                            <Badge variant={arrival.status === "confirmed" ? "default" : "secondary"}>
                              {arrival.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm text-muted-foreground truncate">{arrival.specialRequests}</p>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => handleQuickCheckIn(arrival.id)}
                              disabled={arrival.status !== "confirmed"}
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Check In
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="departures">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Folio Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departures.map((departure) => (
                        <TableRow key={departure.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{departure.guest}</div>
                              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Mail className="h-3 w-3" />
                                <span>{departure.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                {departure.room}
                              </div>
                              <div className="text-sm text-muted-foreground">{departure.roomType}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {departure.checkOut}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">GHC {departure.folio.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={departure.paymentStatus === "paid" ? "default" : "destructive"}>
                              <CreditCard className="mr-1 h-3 w-3" />
                              {departure.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={departure.status === "ready" ? "default" : "secondary"}>
                              {departure.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => handleExpressCheckOut(departure.id)}
                              disabled={departure.paymentStatus !== "paid"}
                            >
                              <LogOut className="mr-1 h-3 w-3" />
                              Check Out
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
