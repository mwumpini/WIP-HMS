"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Filter } from "lucide-react"
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

const roomAvailability = [
  {
    roomNumber: "101",
    type: "Standard Room",
    dates: {
      "2024-01-15": "available",
      "2024-01-16": "occupied",
      "2024-01-17": "occupied",
      "2024-01-18": "available",
      "2024-01-19": "available",
      "2024-01-20": "occupied",
      "2024-01-21": "occupied",
    },
  },
  {
    roomNumber: "102",
    type: "Standard Room",
    dates: {
      "2024-01-15": "cleaning",
      "2024-01-16": "available",
      "2024-01-17": "available",
      "2024-01-18": "occupied",
      "2024-01-19": "occupied",
      "2024-01-20": "available",
      "2024-01-21": "available",
    },
  },
  {
    roomNumber: "201",
    type: "Deluxe Suite",
    dates: {
      "2024-01-15": "occupied",
      "2024-01-16": "occupied",
      "2024-01-17": "occupied",
      "2024-01-18": "available",
      "2024-01-19": "available",
      "2024-01-20": "occupied",
      "2024-01-21": "occupied",
    },
  },
  {
    roomNumber: "301",
    type: "Presidential Suite",
    dates: {
      "2024-01-15": "maintenance",
      "2024-01-16": "maintenance",
      "2024-01-17": "available",
      "2024-01-18": "available",
      "2024-01-19": "available",
      "2024-01-20": "available",
      "2024-01-21": "occupied",
    },
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 border-green-200"
    case "occupied":
      return "bg-red-100 text-red-800 border-red-200"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "cleaning":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "Available"
    case "occupied":
      return "Occupied"
    case "maintenance":
      return "Maintenance"
    case "cleaning":
      return "Cleaning"
    default:
      return "Unknown"
  }
}

export default function RoomAvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [roomTypeFilter, setRoomTypeFilter] = useState("all")

  const dates = ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20", "2024-01-21"]

  const filteredRooms = roomAvailability.filter((room) => {
    if (roomTypeFilter === "all") return true
    return room.type.toLowerCase().includes(roomTypeFilter.toLowerCase())
  })

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
                <BreadcrumbPage>Availability</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Room Availability</h2>
              <p className="text-gray-600">View room availability calendar and manage bookings</p>
            </div>
            <div className="flex space-x-2">
              <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Room Types</SelectItem>
                  <SelectItem value="standard">Standard Room</SelectItem>
                  <SelectItem value="deluxe">Deluxe Suite</SelectItem>
                  <SelectItem value="presidential">Presidential Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Calendar
                </CardTitle>
                <CardDescription>Select a date to view availability</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />

                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                      <span className="text-sm">Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                      <span className="text-sm">Cleaning</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Weekly Availability Overview</CardTitle>
                <CardDescription>Room availability for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Room</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        {dates.map((date) => (
                          <th key={date} className="text-center py-3 px-2 font-medium min-w-[80px]">
                            <div className="text-xs">
                              {new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map((room) => (
                        <tr key={room.roomNumber} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">Room {room.roomNumber}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{room.type}</td>
                          {dates.map((date) => {
                            const status = room.dates[date] || "available"
                            return (
                              <td key={date} className="py-3 px-2 text-center">
                                <div
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                    status,
                                  )}`}
                                >
                                  {getStatusText(status)}
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Check-ins</CardTitle>
                <CardDescription>Guests arriving today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Room 201</p>
                      <p className="text-sm text-muted-foreground">John & Jane Doe</p>
                    </div>
                    <Badge variant="outline">3:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Room 102</p>
                      <p className="text-sm text-muted-foreground">Mike Johnson</p>
                    </div>
                    <Badge variant="outline">4:30 PM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Check-outs</CardTitle>
                <CardDescription>Guests departing today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Room 105</p>
                      <p className="text-sm text-muted-foreground">Sarah Wilson</p>
                    </div>
                    <Badge variant="outline">11:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Room 203</p>
                      <p className="text-sm text-muted-foreground">David Brown</p>
                    </div>
                    <Badge variant="outline">12:00 PM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Rooms under maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Room 301</p>
                      <p className="text-sm text-muted-foreground">AC Repair</p>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Room 205</p>
                      <p className="text-sm text-muted-foreground">Bathroom Renovation</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
