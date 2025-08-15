"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, RefreshCw, Users, Building, MapPin } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const specializedOccupancyData = {
  hotelName: "Noda Hotel",
  period: "July 2025",
  preparedBy: "Revenue Manager",
  segmentAnalysis: [
    { segment: "Corporate", roomsSold: 920, percentage: 52, adr: 760, revpar: 395.2 },
    { segment: "Leisure", roomsSold: 670, percentage: 38, adr: 690, revpar: 262.2 },
    { segment: "Group/Events", roomsSold: 175, percentage: 10, adr: 820, revpar: 82.0 },
  ],
  bookingChannels: [
    { channel: "Direct Walk-in", roomsSold: 300, percentage: 17, adr: 650 },
    { channel: "Hotel Website", roomsSold: 400, percentage: 23, adr: 710 },
    { channel: "OTA (Booking.com, Expedia)", roomsSold: 450, percentage: 26, adr: 760 },
    { channel: "Travel Agent", roomsSold: 300, percentage: 17, adr: 780 },
    { channel: "Corporate Contracts", roomsSold: 315, percentage: 17, adr: 750 },
  ],
  groupOccupancyDetails: [
    {
      groupName: "Ghana Medical Association Conf.",
      roomsBlocked: 80,
      roomsPickedUp: 75,
      pickupPercentage: 93.75,
      adr: 800,
      revenue: 60000,
    },
    {
      groupName: "Ashanti Regional Education Summit",
      roomsBlocked: 50,
      roomsPickedUp: 40,
      pickupPercentage: 80,
      adr: 780,
      revenue: 31200,
    },
    {
      groupName: "Noda Wedding Party",
      roomsBlocked: 15,
      roomsPickedUp: 15,
      pickupPercentage: 100,
      adr: 850,
      revenue: 12750,
    },
  ],
  highlights: [
    "OTA share is slightly high; consider boosting direct bookings to save commission costs",
    "Group pickup rates strong — opportunity to target more corporate and event planners",
    "Leisure ADR slightly lower; upsell opportunities for weekend packages",
    "Corporate segment driving highest RevPAR performance",
  ],
  roomTypeSegmentation: [
    { roomType: "Standard", corporate: 45, leisure: 40, group: 15 },
    { roomType: "Deluxe", corporate: 55, leisure: 35, group: 10 },
    { roomType: "Suite", corporate: 60, leisure: 30, group: 10 },
    { roomType: "Presidential", corporate: 70, leisure: 20, group: 10 },
  ],
}

export default function SpecializedOccupancyReportPage() {
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/reports/occupancy">Occupancy</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Specialized Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Specialized Occupancy Report</h1>
              <p className="mt-2 text-sm text-gray-600">
                {specializedOccupancyData.hotelName} - Group & Segment Analysis - {specializedOccupancyData.period}
              </p>
              <p className="text-sm text-gray-500">Prepared by: {specializedOccupancyData.preparedBy}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Select defaultValue="july2025">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="july2025">July 2025</SelectItem>
                  <SelectItem value="june2025">June 2025</SelectItem>
                  <SelectItem value="may2025">May 2025</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Occupancy by Segment */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                A. Occupancy by Segment
              </CardTitle>
              <CardDescription>Revenue and performance breakdown by guest segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Segment</th>
                      <th className="text-right py-3 px-4 font-medium">Rooms Sold</th>
                      <th className="text-right py-3 px-4 font-medium">% of Total Rooms Sold</th>
                      <th className="text-right py-3 px-4 font-medium">ADR</th>
                      <th className="text-right py-3 px-4 font-medium">RevPAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specializedOccupancyData.segmentAnalysis.map((segment, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{segment.segment}</td>
                        <td className="text-right py-3 px-4">{segment.roomsSold}</td>
                        <td className="text-right py-3 px-4">
                          <Badge variant={segment.percentage >= 50 ? "default" : "secondary"}>
                            {segment.percentage}%
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4">GHC {segment.adr}</td>
                        <td className="text-right py-3 px-4 font-medium">GHC {segment.revpar}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Visual representation */}
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Segment Distribution</h4>
                {specializedOccupancyData.segmentAnalysis.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.percentage}%</span>
                    </div>
                    <Progress value={segment.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{segment.roomsSold} rooms</span>
                      <span>RevPAR: GHC {segment.revpar}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Occupancy by Booking Channel */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                B. Occupancy by Booking Channel
              </CardTitle>
              <CardDescription>Performance analysis by booking source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Booking Channel</th>
                      <th className="text-right py-3 px-4 font-medium">Rooms Sold</th>
                      <th className="text-right py-3 px-4 font-medium">% Share</th>
                      <th className="text-right py-3 px-4 font-medium">ADR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specializedOccupancyData.bookingChannels.map((channel, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{channel.channel}</td>
                        <td className="text-right py-3 px-4">{channel.roomsSold}</td>
                        <td className="text-right py-3 px-4">
                          <Badge variant={channel.percentage >= 25 ? "default" : "secondary"}>
                            {channel.percentage}%
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4">GHC {channel.adr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Channel Performance Cards */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900">Direct Bookings</h4>
                    <Badge variant="outline">40%</Badge>
                  </div>
                  <p className="text-sm text-blue-700">Website + Walk-in</p>
                  <p className="text-lg font-bold text-blue-900">700 rooms</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-900">OTA Channels</h4>
                    <Badge variant="outline">26%</Badge>
                  </div>
                  <p className="text-sm text-green-700">Booking.com, Expedia</p>
                  <p className="text-lg font-bold text-green-900">450 rooms</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-purple-900">Corporate</h4>
                    <Badge variant="outline">34%</Badge>
                  </div>
                  <p className="text-sm text-purple-700">Contracts + Agents</p>
                  <p className="text-lg font-bold text-purple-900">615 rooms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Occupancy Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                C. Group Occupancy Detail
              </CardTitle>
              <CardDescription>Performance analysis of group bookings and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Group Name</th>
                      <th className="text-right py-3 px-4 font-medium">Rooms Blocked</th>
                      <th className="text-right py-3 px-4 font-medium">Rooms Picked Up</th>
                      <th className="text-right py-3 px-4 font-medium">Pickup %</th>
                      <th className="text-right py-3 px-4 font-medium">ADR</th>
                      <th className="text-right py-3 px-4 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specializedOccupancyData.groupOccupancyDetails.map((group, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{group.groupName}</td>
                        <td className="text-right py-3 px-4">{group.roomsBlocked}</td>
                        <td className="text-right py-3 px-4">{group.roomsPickedUp}</td>
                        <td className="text-right py-3 px-4">
                          <Badge
                            variant={
                              group.pickupPercentage >= 90
                                ? "default"
                                : group.pickupPercentage >= 80
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {group.pickupPercentage}%
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4">GHC {group.adr}</td>
                        <td className="text-right py-3 px-4 font-medium">GHC {group.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Group Performance Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">145</div>
                  <div className="text-sm text-gray-600">Total Rooms Blocked</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">130</div>
                  <div className="text-sm text-gray-600">Total Rooms Picked Up</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">89.7%</div>
                  <div className="text-sm text-gray-600">Average Pickup Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Type Segmentation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Room Type Segmentation Analysis</CardTitle>
              <CardDescription>Guest segment preferences by room category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {specializedOccupancyData.roomTypeSegmentation.map((roomType, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-4">{roomType.roomType} Rooms</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{roomType.corporate}%</div>
                        <div className="text-sm text-gray-600">Corporate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{roomType.leisure}%</div>
                        <div className="text-sm text-gray-600">Leisure</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{roomType.group}%</div>
                        <div className="text-sm text-gray-600">Group</div>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-1">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: `${roomType.corporate}%` }}></div>
                      <div className="h-2 bg-green-500 rounded" style={{ width: `${roomType.leisure}%` }}></div>
                      <div className="h-2 bg-purple-500 rounded" style={{ width: `${roomType.group}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Highlights & Action Points */}
          <Card>
            <CardHeader>
              <CardTitle>Highlights & Action Points</CardTitle>
              <CardDescription>Key insights and strategic recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {specializedOccupancyData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-900">{highlight}</p>
                  </div>
                ))}
              </div>

              {/* Action Items */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Immediate Actions</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Implement direct booking incentives</li>
                    <li>• Create weekend leisure packages</li>
                    <li>• Follow up with group prospects</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Strategic Opportunities</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Expand corporate partnerships</li>
                    <li>• Develop group sales program</li>
                    <li>• Optimize OTA commission structure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
