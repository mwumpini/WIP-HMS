import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  FileText,
  PieChart,
  Activity,
} from "lucide-react"
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

const reportCategories = [
  {
    title: "Financial Reports",
    icon: DollarSign,
    color: "bg-green-500",
    reports: [
      { name: "Revenue Summary", description: "Daily, weekly, monthly revenue", status: "ready" },
      { name: "Payment Analysis", description: "Payment methods and success rates", status: "ready" },
      { name: "Outstanding Invoices", description: "Unpaid and overdue invoices", status: "ready" },
      { name: "Profit & Loss", description: "Comprehensive P&L statement", status: "generating" },
    ],
  },
  {
    title: "Occupancy Reports",
    icon: Users,
    color: "bg-blue-500",
    reports: [
      { name: "Occupancy Rate", description: "Room occupancy trends", status: "ready" },
      { name: "ADR Analysis", description: "Average Daily Rate performance", status: "ready" },
      { name: "RevPAR Report", description: "Revenue per Available Room", status: "ready" },
      { name: "Seasonal Trends", description: "Occupancy patterns by season", status: "ready" },
    ],
  },
  {
    title: "Guest Reports",
    icon: Activity,
    color: "bg-purple-500",
    reports: [
      { name: "Guest Demographics", description: "Guest profile analysis", status: "ready" },
      { name: "Repeat Guests", description: "Customer loyalty metrics", status: "ready" },
      { name: "Guest Satisfaction", description: "Reviews and ratings analysis", status: "generating" },
      { name: "Booking Sources", description: "Channel performance analysis", status: "ready" },
    ],
  },
  {
    title: "Operational Reports",
    icon: BarChart3,
    color: "bg-orange-500",
    reports: [
      { name: "Housekeeping Report", description: "Room status and cleaning metrics", status: "ready" },
      { name: "Maintenance Log", description: "Equipment and facility maintenance", status: "ready" },
      { name: "Staff Performance", description: "Employee productivity metrics", status: "ready" },
      { name: "Service Utilization", description: "Facility and service usage", status: "ready" },
    ],
  },
]

const quickStats = [
  { label: "Total Revenue", value: "$45,231", change: "+15%", icon: DollarSign },
  { label: "Occupancy Rate", value: "78%", change: "+5%", icon: Users },
  { label: "ADR", value: "$185", change: "+8%", icon: TrendingUp },
  { label: "Guest Satisfaction", value: "4.6/5", change: "+0.2", icon: Activity },
]

export default function ReportsPage() {
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
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              <p className="text-gray-600">Comprehensive business intelligence and reporting</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              <TabsTrigger value="guest">Guest Analytics</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCategories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription>{category.reports.length} reports available</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {category.reports.map((report, reportIndex) => (
                        <div key={reportIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{report.name}</p>
                            <p className="text-xs text-muted-foreground">{report.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={report.status === "ready" ? "default" : "secondary"}>{report.status}</Badge>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                      <CardDescription>Monthly revenue performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Revenue Chart Placeholder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Revenue</span>
                        <span className="font-bold">$45,231</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outstanding</span>
                        <span className="font-bold text-yellow-600">$3,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overdue</span>
                        <span className="font-bold text-red-600">$880</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Net Revenue</span>
                        <span className="font-bold text-green-600">$40,901</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="occupancy">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Rate</CardTitle>
                    <CardDescription>Daily occupancy trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Occupancy Chart Placeholder</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Room Type Performance</CardTitle>
                    <CardDescription>Occupancy by room category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Standard Rooms</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Deluxe Suites</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                          </div>
                          <span className="text-sm font-medium">72%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Presidential Suite</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guest">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Demographics</CardTitle>
                    <CardDescription>Age and location breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Demographics Chart Placeholder</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Sources</CardTitle>
                    <CardDescription>Channel performance analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Direct Booking</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Online Travel Agencies</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Corporate Bookings</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Satisfaction</CardTitle>
                    <CardDescription>Review scores and feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">4.6/5</div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>5 Stars</span>
                        <span>68%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>4 Stars</span>
                        <span>22%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>3 Stars</span>
                        <span>8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2 Stars</span>
                        <span>2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="operational">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Housekeeping Efficiency</CardTitle>
                    <CardDescription>Room cleaning and maintenance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Average Cleaning Time</span>
                        <span className="font-medium">32 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rooms Cleaned Today</span>
                        <span className="font-medium">28/45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quality Score</span>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Maintenance Requests</span>
                        <span className="font-medium text-yellow-600">3 pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Service Utilization</CardTitle>
                    <CardDescription>Facility and amenity usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Restaurant</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                          </div>
                          <span className="text-sm">78%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Spa Services</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <span className="text-sm">65%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Pool Area</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-cyan-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <span className="text-sm">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conference Rooms</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                          </div>
                          <span className="text-sm">82%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Scheduled Reports */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automated report generation and delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Daily Revenue Report</h4>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Sent daily at 9:00 AM to management team</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <FileText className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Weekly Occupancy</h4>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Sent every Monday at 8:00 AM</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <FileText className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Monthly P&L</h4>
                      <Badge variant="secondary">Paused</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Sent first day of each month</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <FileText className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
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
