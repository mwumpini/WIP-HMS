"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, LogOut, Clock, CreditCard, FileText, Mail, MapPin } from "lucide-react"
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

const todayCheckouts = [
  {
    id: "BK-005",
    guest: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 (555) 111-2222",
    room: "105",
    roomType: "Standard Room",
    checkOutTime: "11:00 AM",
    guests: 1,
    totalStay: 2,
    status: "ready",
    charges: [
      { item: "Room (2 nights)", amount: 240.0 },
      { item: "Room Service", amount: 45.0 },
      { item: "Minibar", amount: 25.0 },
    ],
    total: "$310.00",
    paymentStatus: "pending",
  },
  {
    id: "BK-006",
    guest: "David Brown",
    email: "david@example.com",
    phone: "+1 (555) 333-4444",
    room: "203",
    roomType: "Deluxe Suite",
    checkOutTime: "12:00 PM",
    guests: 2,
    totalStay: 1,
    status: "ready",
    charges: [
      { item: "Room (1 night)", amount: 250.0 },
      { item: "Spa Services", amount: 120.0 },
      { item: "Parking", amount: 25.0 },
    ],
    total: "$395.00",
    paymentStatus: "paid",
  },
  {
    id: "BK-007",
    guest: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 555-6666",
    room: "301",
    roomType: "Presidential Suite",
    checkOutTime: "10:30 AM",
    guests: 2,
    totalStay: 3,
    status: "late",
    charges: [
      { item: "Room (3 nights)", amount: 1500.0 },
      { item: "Fine Dining", amount: 180.0 },
      { item: "Concierge Services", amount: 50.0 },
    ],
    total: "$1,730.00",
    paymentStatus: "paid",
  },
  {
    id: "GRP-002",
    guest: "Wedding Party - Johnson",
    email: "wedding@johnson.com",
    phone: "+1 (555) 777-8888",
    room: "Multiple (8 rooms)",
    roomType: "Group Booking",
    checkOutTime: "11:30 AM",
    guests: 16,
    totalStay: 2,
    status: "processing",
    charges: [
      { item: "Rooms (8 rooms, 2 nights)", amount: 3200.0 },
      { item: "Wedding Reception", amount: 2500.0 },
      { item: "Catering Services", amount: 1800.0 },
    ],
    total: "$7,500.00",
    paymentStatus: "deposit",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "ready":
      return "default"
    case "processing":
      return "secondary"
    case "late":
      return "destructive"
    case "completed":
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

export default function CheckOutsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedCheckout, setSelectedCheckout] = useState<string | null>(null)

  const filteredCheckouts = todayCheckouts.filter((checkout) => {
    const matchesSearch =
      checkout.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkout.room.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "ready") return matchesSearch && checkout.status === "ready"
    if (selectedTab === "late") return matchesSearch && checkout.status === "late"
    if (selectedTab === "groups") return matchesSearch && checkout.id.startsWith("GRP")

    return matchesSearch
  })

  const handleCheckOut = (bookingId: string) => {
    console.log(`Processing checkout for booking: ${bookingId}`)
    // Here you would process the final bill and complete checkout
  }

  const handleGenerateInvoice = (bookingId: string) => {
    console.log(`Generating final invoice for booking: ${bookingId}`)
    // Here you would generate the final invoice
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
                <BreadcrumbPage>Check-outs Today</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Check-outs</h2>
              <p className="text-gray-600">Process guest departures and final billing</p>
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
                <CardTitle className="text-sm font-medium">Total Check-outs</CardTitle>
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckouts.length}</div>
                <p className="text-xs text-muted-foreground">Scheduled for today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ready</CardTitle>
                <LogOut className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckouts.filter((c) => c.status === "ready").length}</div>
                <p className="text-xs text-muted-foreground">Ready to check out</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Late Check-out</CardTitle>
                <Clock className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayCheckouts.filter((c) => c.status === "late").length}</div>
                <p className="text-xs text-muted-foreground">Past check-out time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {todayCheckouts
                    .reduce((sum, c) => sum + Number.parseFloat(c.total.replace("$", "").replace(",", "")), 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">From departing guests</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Check-out Management</CardTitle>
                  <CardDescription>Process guest departures and final billing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="all">All Check-outs</TabsTrigger>
                      <TabsTrigger value="ready">Ready</TabsTrigger>
                      <TabsTrigger value="late">Late</TabsTrigger>
                      <TabsTrigger value="groups">Groups</TabsTrigger>
                    </TabsList>

                    <TabsContent value={selectedTab}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Guest</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCheckouts.map((checkout) => (
                            <TableRow
                              key={checkout.id}
                              className={selectedCheckout === checkout.id ? "bg-blue-50" : ""}
                              onClick={() => setSelectedCheckout(checkout.id)}
                            >
                              <TableCell>
                                <div>
                                  <div className="font-medium">{checkout.guest}</div>
                                  <div className="text-sm text-muted-foreground flex items-center space-x-2">
                                    <Mail className="h-3 w-3" />
                                    <span>{checkout.email}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium flex items-center space-x-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{checkout.room}</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">{checkout.roomType}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{checkout.checkOutTime}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{checkout.total}</TableCell>
                              <TableCell>
                                <Badge variant={getPaymentColor(checkout.paymentStatus)}>
                                  {checkout.paymentStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getStatusColor(checkout.status)}>{checkout.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex space-x-1 justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleGenerateInvoice(checkout.id)}
                                  >
                                    <FileText className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" onClick={() => handleCheckOut(checkout.id)}>
                                    <LogOut className="h-3 w-3" />
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
            </div>

            <div>
              {selectedCheckout && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bill Details</CardTitle>
                    <CardDescription>{todayCheckouts.find((c) => c.id === selectedCheckout)?.guest}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {todayCheckouts
                      .filter((c) => c.id === selectedCheckout)
                      .map((checkout) => (
                        <div key={checkout.id} className="space-y-4">
                          <div className="space-y-2">
                            {checkout.charges.map((charge, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{charge.item}</span>
                                <span>${charge.amount.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>{checkout.total}</span>
                          </div>
                          <div className="space-y-2">
                            <Button className="w-full" onClick={() => handleCheckOut(checkout.id)}>
                              <LogOut className="mr-2 h-4 w-4" />
                              Complete Check-out
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => handleGenerateInvoice(checkout.id)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Final Invoice
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
