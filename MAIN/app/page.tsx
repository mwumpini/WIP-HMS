import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  FileText,
  Users,
  Bed,
  Settings,
  CheckCircle,
  Car,
  Coffee,
  Waves,
  Music,
  ShoppingBag,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Mamani Hotel Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" role="main" aria-label="Hotel Main Dashboard">
        <div className="px-4 py-6 sm:px-0">
          <Card className="hover:shadow-lg transition-shadow mb-8">
            <CardHeader>
              <CardTitle>Room Status Overview - Mamani Hotel (50 Rooms)</CardTitle>
              <CardDescription>Current status of all hotel rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="space-y-4 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-green-500 rounded-full" aria-label="Available status indicator"></div>
                      <span className="font-medium text-sm lg:text-base">Available Rooms</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold">28</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Standard Rooms</span>
                      <span>18</span>
                    </div>
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Deluxe Rooms</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Suite Rooms</span>
                      <span>2</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full" aria-label="Occupied status indicator"></div>
                      <span className="font-medium text-sm lg:text-base">Occupied Rooms</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold">20</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Check-out Today</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Extended Stay</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>VIP Guests</span>
                      <span>3</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 hover:bg-gray-50 p-4 rounded-lg transition-colors sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-3 w-3 bg-yellow-500 rounded-full"
                        aria-label="Maintenance status indicator"
                      ></div>
                      <span className="font-medium text-sm lg:text-base">Maintenance & Cleaning</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold">2</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Under Maintenance</span>
                      <span>1</span>
                    </div>
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Deep Cleaning</span>
                      <span>1</span>
                    </div>
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span>Ready Soon</span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium">Today's Room Operations</h4>
                    <p className="text-sm text-muted-foreground">Scheduled activities for today</p>
                  </div>
                  <Link href="/frontdesk/rooms">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                      <Bed className="mr-2 h-4 w-4" />
                      View Full Status
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-900 text-sm lg:text-base">8 Check-ins</p>
                      <p className="text-xs lg:text-sm text-green-700">Starting at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <CalendarDays className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-900 text-sm lg:text-base">5 Check-outs</p>
                      <p className="text-xs lg:text-sm text-blue-700">By 12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors sm:col-span-2 lg:col-span-1">
                    <Settings className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-900 text-sm lg:text-base">2 Maintenance</p>
                      <p className="text-xs lg:text-sm text-yellow-700">Scheduled today</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Mamani Hotel Facilities & Services</CardTitle>
              <CardDescription>Complete overview of our hotel amenities and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Link
                  href="/frontdesk/rooms"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  aria-label="Navigate to room management"
                >
                  <Bed className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-center">50 Rooms</span>
                  <span className="text-xs text-gray-500">Accommodation</span>
                </Link>

                <Link
                  href="/frontdesk/events"
                  className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  aria-label="Navigate to events and conferences"
                >
                  <CalendarDays className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-center">3 Conference Halls</span>
                  <span className="text-xs text-gray-500">Events & Meetings</span>
                </Link>

                <Link
                  href="/fnb"
                  className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  aria-label="Navigate to restaurant and bar management"
                >
                  <Coffee className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-center">Restaurant & Bar</span>
                  <span className="text-xs text-gray-500">Dining</span>
                </Link>

                <Link
                  href="/services/pool"
                  className="flex flex-col items-center p-4 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
                >
                  <Waves className="h-8 w-8 text-cyan-600 mb-2" />
                  <span className="text-sm font-medium text-center">Swimming Pool</span>
                  <span className="text-xs text-gray-500">Recreation</span>
                </Link>

                <Link
                  href="/services/massage"
                  className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <Sparkles className="h-8 w-8 text-pink-600 mb-2" />
                  <span className="text-sm font-medium text-center">Massage Parlor</span>
                  <span className="text-xs text-gray-500">Wellness</span>
                </Link>

                <Link
                  href="/services/nightclub"
                  className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <Music className="h-8 w-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-center">Nightclub</span>
                  <span className="text-xs text-gray-500">Entertainment</span>
                </Link>

                <Link
                  href="/services/vehicles"
                  className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <Car className="h-8 w-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-center">Vehicle Rental</span>
                  <span className="text-xs text-gray-500">Transport</span>
                </Link>

                <Link
                  href="/services/shop"
                  className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <ShoppingBag className="h-8 w-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-center">Mini Shop</span>
                  <span className="text-xs text-gray-500">Essentials</span>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center space-x-6 text-sm text-blue-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Free WiFi Internet
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Airport Pickup Service
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Tour Services
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    24/7 Front Desk
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Link href="/frontdesk/bookings/new">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Create New Booking
                  </Button>
                </Link>
                <Link href="/frontdesk/invoices/new">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Invoice
                  </Button>
                </Link>
                <Link href="/frontdesk/clients/new">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Client
                  </Button>
                </Link>
                <Link href="/frontdesk/events/new">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Book Conference Hall
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest bookings and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link
                    href="/frontdesk/invoices"
                    className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" aria-label="Success indicator"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Invoice #INV-001 sent</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </Link>
                  <Link
                    href="/frontdesk/bookings"
                    className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" aria-label="New booking indicator"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New booking from John Doe</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </Link>
                  <Link
                    href="/frontdesk/events"
                    className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" aria-label="Event booking indicator"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Hall 1 booked for conference</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </Link>
                  <Link
                    href="/frontdesk/payments"
                    className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full mr-3"
                      aria-label="Payment received indicator"
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conference Halls Status */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Conference Halls Status</CardTitle>
                <CardDescription>Current availability of our 3 conference halls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    href="/frontdesk/events/venues/hall1"
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    aria-label="View Hall 1 details"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Hall 1</h3>
                      <div className="h-3 w-3 bg-green-500 rounded-full" aria-label="Available status"></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">70 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Booking:</span>
                        <span>Tomorrow 9:00 AM</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">Projector, Sound System, AC, WiFi</div>
                  </Link>

                  <Link
                    href="/frontdesk/events/venues/hall2"
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    aria-label="View Hall 2 details"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Hall 2</h3>
                      <div className="h-3 w-3 bg-red-500 rounded-full" aria-label="Occupied status"></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">30 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-red-600 font-medium">Occupied</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Event:</span>
                        <span>Board Meeting</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">Projector, Whiteboard, AC, WiFi</div>
                  </Link>

                  <Link
                    href="/frontdesk/events/venues/hall3"
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    aria-label="View Hall 3 details"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Hall 3</h3>
                      <div className="h-3 w-3 bg-green-500 rounded-full" aria-label="Available status"></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">15 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Booking:</span>
                        <span>Friday 2:00 PM</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">Smart Board, Video Conf, AC, WiFi</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
