"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter, Download, RefreshCw } from "lucide-react"
import { format, addDays, startOfWeek } from "date-fns"
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

// Mock data for room availability
const roomTypes = [
  { id: 1, name: "Standard Room", rooms: ["101", "102", "103", "104", "105"] },
  { id: 2, name: "Deluxe Suite", rooms: ["201", "202", "203", "204", "205"] },
  { id: 3, name: "Presidential Suite", rooms: ["301", "302"] },
  { id: 4, name: "Family Room", rooms: ["401", "402", "403"] },
]

// Generate mock availability data
const generateAvailabilityData = (startDate: Date) => {
  const data: { [key: string]: { [key: string]: string } } = {}

  roomTypes.forEach((roomType) => {
    roomType.rooms.forEach((room) => {
      data[room] = {}
      for (let i = 0; i < 14; i++) {
        const date = format(addDays(startDate, i), "yyyy-MM-dd")
        const rand = Math.random()
        if (rand < 0.3) data[room][date] = "booked"
        else if (rand < 0.4) data[room][date] = "occupied"
        else if (rand < 0.45) data[room][date] = "maintenance"
        else if (rand < 0.5) data[room][date] = "cleaning"
        else data[room][date] = "available"
      }
    })
  })

  return data
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-200 hover:bg-green-300 border-green-300"
    case "booked":
      return "bg-yellow-200 hover:bg-yellow-300 border-yellow-300"
    case "occupied":
      return "bg-red-200 hover:bg-red-300 border-red-300"
    case "maintenance":
      return "bg-gray-200 hover:bg-gray-300 border-gray-300"
    case "cleaning":
      return "bg-blue-200 hover:bg-blue-300 border-blue-300"
    default:
      return "bg-white hover:bg-gray-50 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "Available"
    case "booked":
      return "Booked"
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

export default function AvailabilityGridPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [viewType, setViewType] = useState("week")
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null)

  const startDate = viewType === "week" ? startOfWeek(currentDate) : currentDate
  const availabilityData = generateAvailabilityData(startDate)
  const days = Array.from({ length: viewType === "week" ? 7 : 14 }, (_, i) => addDays(startDate, i))

  const handleCellClick = (room: string, date: string) => {
    setSelectedRoom(room)
    setSelectedDateRange(date)
    console.log(`Selected room ${room} for date ${date}`)
  }

  const handleCreateReservation = () => {
    if (selectedRoom && selectedDateRange) {
      console.log(`Creating reservation for room ${selectedRoom} on ${selectedDateRange}`)
      // Navigate to booking creation
    }
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const days = viewType === "week" ? 7 : 14
    setCurrentDate((prev) => addDays(prev, direction === "next" ? days : -days))
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
                <BreadcrumbPage>Availability Grid</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Room Availability Grid</h2>
              <p className="text-gray-600">Gantt-style view of room inventory and bookings</p>
            </div>
            <div className="flex space-x-2">
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="fortnight">14 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Navigation and Legend */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-64 justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(startDate, "PPP")} - {format(days[days.length - 1], "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded"></div>
                <span className="text-sm">Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
                <span className="text-sm">Cleaning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
                <span className="text-sm">Maintenance</span>
              </div>
            </div>
          </div>

          {/* Availability Grid */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Room Availability Matrix</CardTitle>
                  <CardDescription>Click on available dates to create reservations</CardDescription>
                </div>
                {selectedRoom && selectedDateRange && (
                  <Button onClick={handleCreateReservation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Reservation
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  {/* Header Row */}
                  <div
                    className="grid grid-cols-[200px_repeat(var(--days),_120px)] gap-1 mb-2"
                    style={{ "--days": days.length } as any}
                  >
                    <div className="font-medium text-sm p-2">Room</div>
                    {days.map((day) => (
                      <div key={day.toISOString()} className="font-medium text-sm p-2 text-center border-b">
                        <div>{format(day, "EEE")}</div>
                        <div className="text-xs text-muted-foreground">{format(day, "MMM d")}</div>
                      </div>
                    ))}
                  </div>

                  {/* Room Rows */}
                  {roomTypes.map((roomType) => (
                    <div key={roomType.id} className="mb-4">
                      <div className="font-medium text-sm text-gray-700 mb-2 px-2">{roomType.name}</div>
                      {roomType.rooms.map((room) => (
                        <div
                          key={room}
                          className="grid grid-cols-[200px_repeat(var(--days),_120px)] gap-1 mb-1"
                          style={{ "--days": days.length } as any}
                        >
                          <div className="font-medium text-sm p-2 bg-gray-50 border rounded">Room {room}</div>
                          {days.map((day) => {
                            const dateStr = format(day, "yyyy-MM-dd")
                            const status = availabilityData[room]?.[dateStr] || "available"
                            const isSelected = selectedRoom === room && selectedDateRange === dateStr

                            return (
                              <button
                                key={dateStr}
                                className={`
                                  p-2 text-xs border rounded transition-colors cursor-pointer
                                  ${getStatusColor(status)}
                                  ${isSelected ? "ring-2 ring-blue-500" : ""}
                                `}
                                onClick={() => handleCellClick(room, dateStr)}
                                title={`Room ${room} - ${format(day, "PPP")} - ${getStatusText(status)}`}
                              >
                                {status === "available"
                                  ? "A"
                                  : status === "booked"
                                    ? "B"
                                    : status === "occupied"
                                      ? "O"
                                      : status === "maintenance"
                                        ? "M"
                                        : status === "cleaning"
                                          ? "C"
                                          : "?"}
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Summary */}
          {selectedRoom && selectedDateRange && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Selection Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Room {selectedRoom}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(selectedDateRange), "PPPP")}</p>
                    <Badge variant="outline" className="mt-2">
                      {getStatusText(availabilityData[selectedRoom]?.[selectedDateRange] || "available")}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedRoom(null)
                        setSelectedDateRange(null)
                      }}
                    >
                      Clear Selection
                    </Button>
                    <Button onClick={handleCreateReservation}>Create Reservation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
