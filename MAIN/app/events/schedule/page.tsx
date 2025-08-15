"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Users, MapPin, ArrowLeft } from "lucide-react"
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns"
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

// Sample schedule data
const scheduleData = [
  {
    id: "SCH-001",
    title: "Annual Corporate Summit",
    client: "TechCorp Industries",
    venue: "Grand Ballroom",
    date: "2024-08-15",
    startTime: "09:00",
    endTime: "17:00",
    attendees: 250,
    status: "confirmed",
    type: "conference",
  },
  {
    id: "SCH-002",
    title: "Wedding Reception",
    client: "Smith & Johnson",
    venue: "Garden Pavilion",
    date: "2024-08-18",
    startTime: "18:00",
    endTime: "23:00",
    attendees: 120,
    status: "confirmed",
    type: "wedding",
  },
  {
    id: "SCH-003",
    title: "Product Launch Event",
    client: "Innovation Labs",
    venue: "Conference Room A",
    date: "2024-08-20",
    startTime: "14:00",
    endTime: "18:00",
    attendees: 80,
    status: "pending",
    type: "corporate",
  },
  {
    id: "SCH-004",
    title: "Training Workshop",
    client: "HR Solutions",
    venue: "OFORIWAA HALL",
    date: "2024-08-22",
    startTime: "10:00",
    endTime: "16:00",
    attendees: 45,
    status: "confirmed",
    type: "workshop",
  },
  {
    id: "SCH-005",
    title: "Board Meeting",
    client: "Executive Team",
    venue: "ENO SYNDICATE",
    date: "2024-08-25",
    startTime: "14:00",
    endTime: "17:00",
    attendees: 12,
    status: "confirmed",
    type: "meeting",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "conference":
      return "bg-blue-100 text-blue-800"
    case "wedding":
      return "bg-pink-100 text-pink-800"
    case "corporate":
      return "bg-purple-100 text-purple-800"
    case "workshop":
      return "bg-orange-100 text-orange-800"
    case "meeting":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function EventSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [viewType, setViewType] = useState("week")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const filteredEvents = scheduleData.filter((event) => {
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    const matchesType = filterType === "all" || event.type === filterType
    return matchesStatus && matchesType
  })

  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return filteredEvents.filter((event) => event.date === dateStr)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek((prev) => (direction === "next" ? addWeeks(prev, 1) : subWeeks(prev, 1)))
  }

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentWeek), i))

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
                <BreadcrumbPage>Schedule</BreadcrumbPage>
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
                <h2 className="text-2xl font-bold text-gray-900">Event Schedule</h2>
                <p className="text-gray-600">View and manage event schedules and bookings</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={viewType} onValueChange={setViewType} className="space-y-6">
            <TabsList>
              <TabsTrigger value="week">Week View</TabsTrigger>
              <TabsTrigger value="month">Month View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="week">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Weekly Schedule</CardTitle>
                      <CardDescription>
                        {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date())}>
                        Today
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-4">
                    {weekDays.map((day, index) => {
                      const dayEvents = getEventsForDate(day)
                      const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

                      return (
                        <div
                          key={index}
                          className={`min-h-[200px] p-3 border rounded-lg ${isToday ? "bg-blue-50 border-blue-200" : "bg-white"}`}
                        >
                          <div className="text-center mb-3">
                            <div className="text-sm font-medium text-gray-500">{format(day, "EEE")}</div>
                            <div className={`text-lg font-bold ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                              {format(day, "d")}
                            </div>
                          </div>
                          <div className="space-y-2">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className="p-2 rounded text-xs bg-white border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="text-gray-500 flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {event.startTime}
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <Badge className={getStatusColor(event.status)} variant="secondary">
                                    {event.status}
                                  </Badge>
                                  <span className="text-gray-400 flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {event.attendees}
                                  </span>
                                </div>
                              </div>
                            ))}
                            {dayEvents.length === 0 && (
                              <div className="text-center text-gray-400 text-xs py-4">No events</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Calendar</CardTitle>
                  <CardDescription>Full month view of all events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border"
                    />
                  </div>
                  {selectedDate && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Events for {format(selectedDate, "PPPP")}</h3>
                      <div className="space-y-3">
                        {getEventsForDate(selectedDate).map((event) => (
                          <div key={event.id} className="p-4 border rounded-lg bg-white">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.client}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {event.startTime} - {event.endTime}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {event.venue}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {event.attendees}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                                <Badge className={getTypeColor(event.type)} variant="outline">
                                  {event.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                        {getEventsForDate(selectedDate).length === 0 && (
                          <div className="text-center text-gray-500 py-8">No events scheduled for this date</div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Event List</CardTitle>
                  <CardDescription>All events in chronological order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEvents
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((event) => (
                        <div
                          key={event.id}
                          className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-lg">{event.title}</h4>
                                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                                <Badge className={getTypeColor(event.type)} variant="outline">
                                  {event.type}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{event.client}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-1" />
                                  {format(new Date(event.date), "MMM d, yyyy")}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.startTime} - {event.endTime}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {event.venue}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {event.attendees} attendees
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
