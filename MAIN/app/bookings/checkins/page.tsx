"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, CheckCircle, Clock, AlertCircle, Users, Phone, Mail, MapPin } from "lucide-react"
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

const todayCheckins = [
  {
    id: "BK-001",
    guest: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    room: "201",
    roomType: "Deluxe Suite",
    checkInTime: "3:00 PM",
    guests: 2,
    nights: 3,
    status: "confirmed",
    specialRequests: "Late check-in requested",
    amount: "$750.00",
    paymentStatus: "paid",
  },
  {
    id: "BK-002",
    guest: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    room: "105",
    roomType: "Standard Room",
    checkInTime: "2:30 PM",
    guests: 1,
    nights: 2,
    status: "pending",
    specialRequests: "Ground floor preferred",
    amount: "$240.00",
    paymentStatus: "pending",
  },
  {
    id: "GRP-001",
    guest: "Tech Conference Group",
    email: "events@techconf.com",
    phone: "+1 (555) 456-7890",
    room: "Multiple (15 rooms)",
    roomType: "Group Booking",
    checkInTime: "1:00 PM",
    guests: 30,
    nights: 3,
    status: "confirmed",
    specialRequests: "Early check-in for setup",
    amount: "$12,500.00",
    paymentStatus: "deposit",
  },
  {
    id: "BK-003",
    guest: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 321-0987",
    room: "301",
    roomType: "Presidential Suite",
    checkInTime: "4:00 PM",
    guests: 2,
    nights: 1,
    status: "confirmed",
    specialRequests: "VIP treatment, champagne",
    amount: "$500.00",
    paymentStatus: "paid",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "default"
    case "pending":
      return "secondary"
    case "checked-in":
      return "outline"
    default:
      return "outline"
  }
}

const getPaymentColor = (status: string) => {
  switch (status) {
    case "paid":
      return "default"
    case "deposit":
      return "secondary"
    case "pending":
      return "destructive"
    default:
      return "outline"
  }
}

export default function CheckInsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredCheckins = todayCheckins.filter((checkin) => {
    const matchesSearch =
      checkin.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkin.room.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "pending") return matchesSearch && checkin.status === "pending"
    if (selectedTab === "confirmed") return matchesSearch && checkin.status === "confirmed"
    if (selectedTab === "groups") return matchesSearch && checkin.id.startsWith("GRP")

    return matchesSearch
  })

  const handleCheckIn = (bookingId: string) => {
    console.log(`Checking in booking: ${bookingId}`)
    // Here you would update the booking status and assign room keys
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
                <BreadcrumbLink href="/bookings">Bookings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Check-ins Today</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Check-ins</h2>
              <p className="text-gray-600">Manage guest arrivals and room assignments</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests or rooms..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckins.length}</div>
                <p className="text-xs text-muted-foreground">Scheduled for today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckins.filter((c) => c.status === "confirmed").length}</div>
                <p className="text-xs text-muted-foreground">Ready for check-in</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckins.filter((c) => c.status === "pending").length}</div>
                <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Group Bookings</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckins.filter((c) => c.id.startsWith("GRP")).length}</div>
                <p className="text-xs text-muted-foreground">Group arrivals</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Check-in Management</CardTitle>
              <CardDescription>Process guest arrivals and room assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Check-ins</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCheckins.map((checkin) => (
                        <TableRow key={checkin.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{checkin.guest}</div>
                              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Mail className="h-3 w-3" />
                                <span>{checkin.email}</span>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                                <Phone className="h-3 w-3" />
                                <span>{checkin.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{checkin.room}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{checkin.roomType}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{checkin.checkInTime}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{checkin.guests}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{checkin.amount}</TableCell>
                          <TableCell>
                            <Badge variant={getPaymentColor(checkin.paymentStatus)}>{checkin.paymentStatus}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(checkin.status)}>{checkin.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex space-x-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleCheckIn(checkin.id)}
                                disabled={checkin.status === "checked-in"}
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Check In
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Special Requests Section */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Special Requests & Notes</CardTitle>
                <CardDescription>Important information for today's arrivals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayCheckins
                    .filter((checkin) => checkin.specialRequests)
                    .map((checkin) => (
                      <div key={checkin.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {checkin.guest} - Room {checkin.room}
                          </p>
                          <p className="text-sm text-muted-foreground">{checkin.specialRequests}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
