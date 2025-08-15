"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  CreditCard,
  FileText,
  ArrowRight,
  Phone,
  Mail,
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

const bookingWorkflows = [
  {
    id: "individual",
    title: "Individual Booking",
    description: "Single guest or family booking",
    icon: Users,
    steps: ["Booking", "Confirmation", "Check-in", "Stay", "Check-out", "Invoice"],
    currentStep: 2,
    guest: "John Doe",
    room: "Deluxe Suite 201",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    services: ["Room", "Breakfast", "Parking"],
    total: "$750.00",
  },
  {
    id: "group",
    title: "Group Booking",
    description: "Corporate or event group",
    icon: Users,
    steps: ["Booking", "Contract", "Confirmation", "Check-in", "Stay", "Check-out", "Invoice"],
    currentStep: 3,
    guest: "Tech Conference 2024",
    room: "15 Rooms + Conference Hall",
    checkIn: "2024-01-25",
    checkOut: "2024-01-27",
    services: ["Rooms", "Conference Hall", "Catering", "AV Equipment"],
    total: "$12,500.00",
  },
  {
    id: "conference",
    title: "Conference Booking",
    description: "Event and meeting spaces",
    icon: MapPin,
    steps: ["Booking", "Planning", "Setup", "Event", "Cleanup", "Invoice"],
    currentStep: 1,
    guest: "Annual Sales Meeting",
    room: "Grand Ballroom",
    checkIn: "2024-01-30",
    checkOut: "2024-01-30",
    services: ["Venue", "Catering", "AV Equipment", "Decoration"],
    total: "$3,200.00",
  },
]

const quickActions = [
  { label: "Walk-in Check-in", icon: CheckCircle, color: "bg-green-500" },
  { label: "Group Check-in", icon: Users, color: "bg-blue-500" },
  { label: "Express Checkout", icon: CreditCard, color: "bg-purple-500" },
  { label: "Generate Invoice", icon: FileText, color: "bg-orange-500" },
]

export default function BookingWorkflowPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState("individual")

  const getStepStatus = (stepIndex: number, currentStep: number) => {
    if (stepIndex < currentStep) return "completed"
    if (stepIndex === currentStep) return "current"
    return "pending"
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
                <BreadcrumbPage>Workflow</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Workflow</h2>
              <p className="text-gray-600">Manage the complete guest journey from booking to checkout</p>
            </div>
            <div className="flex space-x-2">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" size="sm">
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          <Tabs value={selectedWorkflow} onValueChange={setSelectedWorkflow} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              {bookingWorkflows.map((workflow) => (
                <TabsTrigger key={workflow.id} value={workflow.id} className="flex items-center space-x-2">
                  <workflow.icon className="h-4 w-4" />
                  <span>{workflow.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {bookingWorkflows.map((workflow) => (
              <TabsContent key={workflow.id} value={workflow.id}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <workflow.icon className="h-5 w-5" />
                          <span>{workflow.title} Progress</span>
                        </CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{workflow.guest}</h4>
                              <p className="text-sm text-muted-foreground">{workflow.room}</p>
                            </div>
                            <Badge variant="outline">{workflow.total}</Badge>
                          </div>

                          <div className="space-y-3">
                            {workflow.steps.map((step, index) => {
                              const status = getStepStatus(index, workflow.currentStep)
                              return (
                                <div key={index} className="flex items-center space-x-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                      status === "completed"
                                        ? "bg-green-500 text-white"
                                        : status === "current"
                                          ? "bg-blue-500 text-white"
                                          : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {status === "completed" ? <CheckCircle className="h-4 w-4" /> : index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`font-medium ${status === "current" ? "text-blue-600" : ""}`}>
                                      {step}
                                    </p>
                                    {status === "current" && <p className="text-sm text-blue-500">In Progress</p>}
                                  </div>
                                  {index < workflow.steps.length - 1 && (
                                    <ArrowRight className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          <div className="pt-4 border-t">
                            <h5 className="font-medium mb-2">Services Included</h5>
                            <div className="flex flex-wrap gap-2">
                              {workflow.services.map((service, index) => (
                                <Badge key={index} variant="secondary">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Advance to Next Step
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Contact Guest
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Confirmation
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Invoice
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Booking Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {workflow.checkIn} - {workflow.checkOut}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{workflow.room}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Check-in: 3:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Total: {workflow.total}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
