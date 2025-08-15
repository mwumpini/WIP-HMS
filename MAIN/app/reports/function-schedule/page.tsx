"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, Download, Search, Calendar, Users, Building, Clock } from "lucide-react"
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
import { useState } from "react"

// Sample function schedule data based on the provided document
const functionScheduleData = [
  {
    item: 1,
    arrivalDate: "SUN 27TH JUL",
    departureDate: "SAT 9TH AUG",
    organization: "T-TEL GROUP 6 OF 6 EXTENDED",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 20,
    rooms: 20,
    roomNights: 210,
    confDays: 10,
    venue: "OFORIWAA HALL",
    notes: "PREPARE 20 ROOMS",
    status: "CONFIRMED",
  },
  {
    item: 2,
    arrivalDate: "WED 30TH JUL",
    departureDate: "SAT 2ND AUG",
    organization: "T-TEL",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 15,
    rooms: 15,
    roomNights: 32,
    confDays: 3,
    venue: "OFORIWAA HALL",
    notes: "PREPARE 15 ROOMS",
    status: "ON HOLD",
  },
  {
    item: 3,
    arrivalDate: "SAT 2ND AUG",
    departureDate: "WED 6TH AUG",
    organization: "AAMUSTED",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 29,
    rooms: 29,
    roomNights: 33,
    confDays: 4,
    venue: "OFORIWAA HALL",
    notes: "PREPARE 4 ROOMS ON SAT 2ND AUG & ADD 25 ON SUN 3RD AUG",
    status: "CONFIRMED",
  },
  {
    item: 4,
    arrivalDate: "MON 4TH AUG",
    departureDate: "FRI 8TH AUG",
    organization: "INTEGRATED HEALTH PARTNERSHIP INITIATIVE",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 32,
    rooms: 30,
    roomNights: 43.5,
    confDays: 4,
    venue: "DANKWAH HALL",
    notes: "PREPARE 30 ROOMS",
    status: "AWAITING CONFIRMATION",
  },
  {
    item: 5,
    arrivalDate: "THU 7TH AUG",
    departureDate: "SUN 10TH AUG",
    organization: "GARDEN CITY UNI",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 20,
    rooms: 20,
    roomNights: 32,
    confDays: 3,
    venue: "OFORIWAA HALL",
    notes: "PREPARE 20 ROOMS",
    status: "AWAITING CONFIRMATION",
  },
  {
    item: 6,
    arrivalDate: "SUN 10TH AUG",
    departureDate: "SAT 16TH AUG",
    organization: "MINISTRY OF EDUCATION COHORT 1 OF 3",
    progType: "RESIDENTIAL WORKSHOP",
    pax: 140,
    rooms: 140,
    roomNights: 65,
    confDays: 6,
    venue: "ENO HALL",
    notes: "PREPARE 140 ROOMS INCLUDING OUTSOURCING",
    status: "CONFIRMED",
  },
  {
    item: 7,
    arrivalDate: "MON 11TH AUG",
    departureDate: "SAT 16TH AUG",
    organization: "SNV TLI PROJECT",
    progType: "RESIDENTIAL WORKSHOP",
    pax: 9,
    rooms: 9,
    roomNights: 54,
    confDays: 5,
    venue: "ENO SYNDICATE",
    notes: "PREPARE 2 ROOMS ON DAY 1",
    status: "CONFIRMED",
  },
  {
    item: 8,
    arrivalDate: "TUE 12TH AUG",
    departureDate: "FRI 15TH AUG",
    organization: "I TRADE CONSULT",
    progType: "NON RESIDENTIAL CONFERENCE",
    pax: 20,
    rooms: 5,
    roomNights: 32,
    confDays: 3,
    venue: "OFORIWAA HALL",
    notes: "PREPARE 5 ROOMS FOR FACILITATORS",
    status: "CONFIRMED",
  },
  {
    item: 9,
    arrivalDate: "WED 13TH AUG",
    departureDate: "THU 14TH AUG",
    organization: "GIZ-NEID CLUSTER",
    progType: "NON RESIDENTIAL CONFERENCE",
    pax: 50,
    rooms: 0,
    roomNights: 0,
    confDays: 2,
    venue: "DANKWAH HALL",
    notes: "MAKE PROVISION FOR 3 FACILITATORS",
    status: "CONFIRMED",
  },
  {
    item: 10,
    arrivalDate: "SUN 17TH AUG",
    departureDate: "SAT 23RD AUG",
    organization: "MINISTRY OF EDUCATION COHORT 2 OF 3",
    progType: "RESIDENTIAL WORKSHOP",
    pax: 140,
    rooms: 140,
    roomNights: 65,
    confDays: 6,
    venue: "ENO HALL",
    notes: "PREPARE 140 ROOMS",
    status: "CONFIRMED",
  },
  {
    item: 11,
    arrivalDate: "MON 18TH AUG",
    departureDate: "THU 21ST AUG",
    organization: "INT JUSTICE MISSION",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 36,
    rooms: 34,
    roomNights: 43,
    confDays: 3,
    venue: "DANKWAH HALL",
    notes: "PREPARE 34 ROOMS",
    status: "CONFIRMED",
  },
  {
    item: 12,
    arrivalDate: "MON 18TH AUG",
    departureDate: "FRI 22ND AUG",
    organization: "CHAI",
    progType: "RESIDENTIAL WORKSHOP",
    pax: 44,
    rooms: 44,
    roomNights: 44,
    confDays: 4,
    venue: "OFORIWAA HALL",
    notes: "PREPARE 41 ROOMS",
    status: "AWAITING CONFIRMATION",
  },
  {
    item: 13,
    arrivalDate: "MON 18TH AUG",
    departureDate: "SAT 23RD AUG",
    organization: "GIZ-NEID CLUSTER GROUPS 1 & 2",
    progType: "NON RESIDENTIAL CONFERENCE",
    pax: 35,
    rooms: 0,
    roomNights: 0,
    confDays: 6,
    venue: "OFORIWAA HALL",
    notes: "MAKE PROVISION FOR 2 FACILITATORS",
    status: "CONFIRMED",
  },
  {
    item: 14,
    arrivalDate: "SUN 24TH AUG",
    departureDate: "SAT 30TH AUG",
    organization: "MINISTRY OF EDUCATION COHORT 3 OF 3",
    progType: "RESIDENTIAL WORKSHOP",
    pax: 140,
    rooms: 140,
    roomNights: 65,
    confDays: 6,
    venue: "ENO HALL",
    notes: "PREPARE 140 ROOMS",
    status: "CONFIRMED",
  },
  {
    item: 15,
    arrivalDate: "MON 25TH AUG",
    departureDate: "SAT 30TH AUG",
    organization: "GIZ-NEID CLUSTER GROUPS 3 & 4",
    progType: "NON RESIDENTIAL CONFERENCE",
    pax: 35,
    rooms: 0,
    roomNights: 0,
    confDays: 6,
    venue: "OFORIWAA HALL",
    notes: "MAKE PROVISION FOR 2 FACILITATORS",
    status: "CONFIRMED",
  },
  {
    item: 16,
    arrivalDate: "THU 28TH AUG",
    departureDate: "SUN 31ST AUG",
    organization: "ATWIMA KWANWOMA RURAL BANK",
    progType: "RESIDENTIAL CONFERENCE",
    pax: 18,
    rooms: 18,
    roomNights: 32,
    confDays: 3,
    venue: "DANKWAH HALL",
    notes: "PREPARE 18 ROYAL COURT",
    status: "CONFIRMED",
  },
  {
    item: 17,
    arrivalDate: "THU 28TH AUG",
    departureDate: "THU 28TH AUG",
    organization: "PRESBYTERIAN CHURCH - ASHANTI PRESBYTERY",
    progType: "BRUNCH MEETING",
    pax: 120,
    rooms: 0,
    roomNights: 0,
    confDays: 0.5,
    venue: "YANKSON RESTAURANT",
    notes: "GOLD PACKAGE (CONTACT CHEF AHMED FOR MENU) EVENT STARTS FROM 11.00 A.M. TO 1.00 P.M",
    status: "CONFIRMED",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CONFIRMED</Badge>
    case "AWAITING CONFIRMATION":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">AWAITING CONFIRMATION</Badge>
    case "ON HOLD":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ON HOLD</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function ReportsFunctionSchedulePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [venueFilter, setVenueFilter] = useState("all")

  const filteredData = functionScheduleData.filter((item) => {
    const matchesSearch =
      item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesVenue = venueFilter === "all" || item.venue === venueFilter

    return matchesSearch && matchesStatus && matchesVenue
  })

  const totalPax = filteredData.reduce((sum, item) => sum + item.pax, 0)
  const totalRooms = filteredData.reduce((sum, item) => sum + item.rooms, 0)
  const totalRoomNights = filteredData.reduce((sum, item) => sum + item.roomNights, 0)
  const confirmedEvents = filteredData.filter((item) => item.status === "CONFIRMED").length

  const handlePrint = () => {
    window.print()
  }

  const venues = [...new Set(functionScheduleData.map((item) => item.venue))]
  const statuses = [...new Set(functionScheduleData.map((item) => item.status))]

  return (
    <>
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { font-size: 12px; }
          table { font-size: 10px; }
          .print-header {
            display: block !important;
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .print-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .print-date {
            font-size: 12px;
            margin-bottom: 10px;
          }
          .print-legend {
            display: block !important;
            margin-top: 20px;
            font-size: 10px;
          }
        }
        .print-only { display: none; }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 no-print">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Function Schedule</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Print Header */}
        <div className="print-only print-header">
          <div className="print-title">PROVISIONAL FUNCTION SCHEDULE FOR AUGUST 2025</div>
          <div className="print-date">
            Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
        </div>

        <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 no-print">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Function Schedule Report</h2>
                <p className="text-gray-600">Provisional Function Schedule for August 2025</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Schedule
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 no-print">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredData.length}</div>
                  <p className="text-xs text-muted-foreground">{confirmedEvents} confirmed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPax}</div>
                  <p className="text-xs text-muted-foreground">Across all events</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRooms}</div>
                  <p className="text-xs text-muted-foreground">Room bookings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Room Nights</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRoomNights}</div>
                  <p className="text-xs text-muted-foreground">Total nights</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6 no-print">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Filter the function schedule by organization, status, or venue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search organization or venue..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={venueFilter} onValueChange={setVenueFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Venues</SelectItem>
                      {venues.map((venue) => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Function Schedule Table */}
            <Card>
              <CardHeader className="no-print">
                <CardTitle>Function Schedule</CardTitle>
                <CardDescription>Complete schedule with departmental notes</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">ITEM</TableHead>
                        <TableHead className="w-24">ARRIVAL DATE</TableHead>
                        <TableHead className="w-24">DEPARTURE DATE</TableHead>
                        <TableHead className="min-w-[200px]">ORGANIZATION</TableHead>
                        <TableHead className="w-32">PROG TYPE</TableHead>
                        <TableHead className="w-16">NO. OF PAX</TableHead>
                        <TableHead className="w-16">NO. OF RMS</TableHead>
                        <TableHead className="w-20">ROOM NIGHTS</TableHead>
                        <TableHead className="w-20">CONFERENCE DAYS</TableHead>
                        <TableHead className="w-32">EVENT VENUE</TableHead>
                        <TableHead className="min-w-[250px]">
                          NOTES FOR VARIOUS DEPARTMENTS
                          <br />
                          FOOD & BEVERAGE / HOUSEKEEPING / FRONT DESK
                        </TableHead>
                        <TableHead className="w-32">RESERVATION STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow key={item.item}>
                          <TableCell className="font-medium">{item.item}</TableCell>
                          <TableCell className="text-xs">{item.arrivalDate}</TableCell>
                          <TableCell className="text-xs">{item.departureDate}</TableCell>
                          <TableCell className="font-medium">{item.organization}</TableCell>
                          <TableCell className="text-xs">{item.progType}</TableCell>
                          <TableCell className="text-center">{item.pax}</TableCell>
                          <TableCell className="text-center">{item.rooms || "N/A"}</TableCell>
                          <TableCell className="text-center">{item.roomNights || "N/A"}</TableCell>
                          <TableCell className="text-center">{item.confDays}</TableCell>
                          <TableCell className="font-medium">{item.venue}</TableCell>
                          <TableCell className="text-xs">{item.notes}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Print Legend */}
            <div className="print-only print-legend">
              <div style={{ marginTop: "20px", fontSize: "10px" }}>
                <strong>KEY:</strong>
                <br />
                <span style={{ color: "green" }}>■</span> CONFIRMED &nbsp;&nbsp;
                <span style={{ color: "orange" }}>■</span> AWAITING CONFIRMATION &nbsp;&nbsp;
                <span style={{ color: "gold" }}>■</span> ON HOLD
                <br />
                Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
