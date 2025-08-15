"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Download,
  Search,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Users,
  DollarSign,
  CalendarIcon,
  Filter,
  Eye,
  Settings,
  RefreshCw,
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
import { format } from "date-fns"
import { useState } from "react"

// Comprehensive Regulatory Data
const taxReports = [
  {
    id: "TAX-2024-001",
    type: "Sales Tax",
    period: "January 2024",
    amount: 45600,
    status: "filed",
    dueDate: "2024-02-15",
    filedDate: "2024-02-10",
    authority: "State Revenue Department",
    reference: "ST-2024-001-HTL",
  },
  {
    id: "TAX-2024-002",
    type: "Occupancy Tax",
    period: "January 2024",
    amount: 28900,
    status: "filed",
    dueDate: "2024-02-20",
    filedDate: "2024-02-18",
    authority: "City Tourism Board",
    reference: "OT-2024-001-HTL",
  },
  {
    id: "TAX-2024-003",
    type: "Income Tax",
    period: "Q4 2023",
    amount: 125000,
    status: "pending",
    dueDate: "2024-03-15",
    filedDate: null,
    authority: "Federal Revenue Service",
    reference: "IT-2023-Q4-HTL",
  },
  {
    id: "TAX-2024-004",
    type: "Property Tax",
    period: "2024",
    amount: 89500,
    status: "overdue",
    dueDate: "2024-01-31",
    filedDate: null,
    authority: "County Assessor",
    reference: "PT-2024-HTL",
  },
]

const safetyInspections = [
  {
    id: "SAFE-2024-001",
    type: "Fire Safety Inspection",
    inspector: "Fire Marshal Johnson",
    date: "2024-01-10",
    status: "passed",
    score: 98,
    violations: 0,
    nextInspection: "2024-07-10",
    certificate: "FS-2024-001",
    areas: ["Kitchen", "Guest Rooms", "Common Areas", "Emergency Exits"],
  },
  {
    id: "SAFE-2024-002",
    type: "Health Department Inspection",
    inspector: "Health Inspector Smith",
    date: "2024-01-15",
    status: "passed",
    score: 95,
    violations: 1,
    nextInspection: "2024-07-15",
    certificate: "HD-2024-001",
    areas: ["Restaurant", "Kitchen", "Food Storage", "Bar"],
  },
  {
    id: "SAFE-2024-003",
    type: "Building Safety Inspection",
    inspector: "Building Inspector Davis",
    date: "2024-01-20",
    status: "conditional",
    score: 88,
    violations: 3,
    nextInspection: "2024-04-20",
    certificate: "BS-2024-001",
    areas: ["Structural", "Electrical", "Plumbing", "HVAC"],
  },
  {
    id: "SAFE-2024-004",
    type: "Pool Safety Inspection",
    inspector: "Pool Safety Officer Wilson",
    date: "2024-01-25",
    status: "failed",
    score: 72,
    violations: 5,
    nextInspection: "2024-02-25",
    certificate: null,
    areas: ["Pool Area", "Chemical Storage", "Safety Equipment", "Drainage"],
  },
]

const tourismReports = [
  {
    id: "TOUR-2024-001",
    type: "Monthly Tourism Statistics",
    period: "January 2024",
    submittedDate: "2024-02-05",
    status: "submitted",
    authority: "State Tourism Authority",
    data: {
      totalGuests: 1245,
      guestNights: 3890,
      averageStay: 3.1,
      occupancyRate: 84.2,
      internationalGuests: 312,
      domesticGuests: 933,
    },
  },
  {
    id: "TOUR-2024-002",
    type: "Quarterly Tourism Report",
    period: "Q4 2023",
    submittedDate: "2024-01-15",
    status: "approved",
    authority: "Regional Tourism Board",
    data: {
      totalGuests: 3678,
      guestNights: 11234,
      averageStay: 3.05,
      occupancyRate: 79.8,
      internationalGuests: 892,
      domesticGuests: 2786,
    },
  },
  {
    id: "TOUR-2024-003",
    type: "Annual Tourism Impact Report",
    period: "2023",
    submittedDate: "2024-01-30",
    status: "pending",
    authority: "National Tourism Office",
    data: {
      totalGuests: 14567,
      guestNights: 45123,
      averageStay: 3.1,
      occupancyRate: 81.5,
      internationalGuests: 3456,
      domesticGuests: 11111,
    },
  },
]

const complianceTracking = [
  {
    category: "Labor Compliance",
    requirements: [
      { item: "Minimum Wage Compliance", status: "compliant", lastCheck: "2024-01-15", nextCheck: "2024-04-15" },
      { item: "Overtime Regulations", status: "compliant", lastCheck: "2024-01-15", nextCheck: "2024-04-15" },
      { item: "Worker Safety Training", status: "compliant", lastCheck: "2024-01-10", nextCheck: "2024-07-10" },
      { item: "Equal Employment Opportunity", status: "compliant", lastCheck: "2024-01-05", nextCheck: "2024-07-05" },
    ],
  },
  {
    category: "Environmental Compliance",
    requirements: [
      { item: "Waste Management", status: "compliant", lastCheck: "2024-01-20", nextCheck: "2024-04-20" },
      { item: "Water Usage Reporting", status: "compliant", lastCheck: "2024-01-25", nextCheck: "2024-04-25" },
      {
        item: "Energy Efficiency Standards",
        status: "non-compliant",
        lastCheck: "2024-01-18",
        nextCheck: "2024-02-18",
      },
      { item: "Chemical Storage", status: "compliant", lastCheck: "2024-01-22", nextCheck: "2024-07-22" },
    ],
  },
  {
    category: "Guest Safety & Privacy",
    requirements: [
      { item: "Data Privacy (GDPR)", status: "compliant", lastCheck: "2024-01-12", nextCheck: "2024-07-12" },
      { item: "Guest Information Security", status: "compliant", lastCheck: "2024-01-14", nextCheck: "2024-07-14" },
      { item: "Emergency Procedures", status: "compliant", lastCheck: "2024-01-16", nextCheck: "2024-07-16" },
      { item: "Accessibility Compliance (ADA)", status: "compliant", lastCheck: "2024-01-08", nextCheck: "2024-07-08" },
    ],
  },
  {
    category: "Financial Compliance",
    requirements: [
      { item: "Anti-Money Laundering", status: "compliant", lastCheck: "2024-01-30", nextCheck: "2024-07-30" },
      { item: "Financial Reporting", status: "compliant", lastCheck: "2024-01-31", nextCheck: "2024-04-30" },
      { item: "Tax Compliance", status: "non-compliant", lastCheck: "2024-01-28", nextCheck: "2024-02-28" },
      { item: "Audit Requirements", status: "compliant", lastCheck: "2024-01-25", nextCheck: "2024-12-25" },
    ],
  },
]

const guestRegistration = [
  {
    id: "REG-2024-001",
    guest: "John Smith",
    nationality: "American",
    passport: "A12345678",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    room: "201",
    purpose: "Tourism",
    reportedTo: "Local Police",
    reportDate: "2024-01-15",
    status: "reported",
  },
  {
    id: "REG-2024-002",
    guest: "Maria Garcia",
    nationality: "Spanish",
    passport: "ES9876543",
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    room: "305",
    purpose: "Business",
    reportedTo: "Immigration Office",
    reportDate: "2024-01-16",
    status: "reported",
  },
  {
    id: "REG-2024-003",
    guest: "Chen Wei",
    nationality: "Chinese",
    passport: "CN5555666",
    checkIn: "2024-01-17",
    checkOut: "2024-01-22",
    room: "102",
    purpose: "Tourism",
    reportedTo: "Local Police",
    reportDate: "2024-01-17",
    status: "reported",
  },
  {
    id: "REG-2024-004",
    guest: "Ahmed Hassan",
    nationality: "Egyptian",
    passport: "EG7777888",
    checkIn: "2024-01-18",
    checkOut: null,
    room: "408",
    purpose: "Business",
    reportedTo: "Immigration Office",
    reportDate: "2024-01-18",
    status: "pending",
  },
]

export default function RegulatoryReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [showCustomization, setShowCustomization] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    taxes: true,
    safety: true,
    tourism: true,
    compliance: true,
    registration: true,
  })
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterAuthority, setFilterAuthority] = useState("all")

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b">
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
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Regulatory & Government</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Regulatory Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulatory & Government Reports</h1>
              <p className="text-lg text-gray-600">Compliance tracking, tax reporting, and government submissions</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports, certificates..."
                  className="pl-8 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-60 bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="range" />
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                onClick={() => setShowCustomization(!showCustomization)}
                className="bg-transparent"
              >
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Download className="mr-2 h-4 w-4" />
                Export Compliance Report
              </Button>
            </div>
          </div>

          {/* Customization Panel */}
          {showCustomization && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Report Customization
                </CardTitle>
                <CardDescription>Configure your regulatory report display preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Visible Sections */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Visible Sections</Label>
                    <div className="space-y-2">
                      {Object.entries(visibleSections).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={() => toggleSection(key as keyof typeof visibleSections)}
                          />
                          <Label htmlFor={key} className="text-sm capitalize">
                            {key === "taxes"
                              ? "Tax Reports"
                              : key === "safety"
                                ? "Safety Inspections"
                                : key === "tourism"
                                  ? "Tourism Reports"
                                  : key === "compliance"
                                    ? "Compliance Tracking"
                                    : "Guest Registration"}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filters */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Filters</Label>
                    <div className="space-y-3">
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterAuthority} onValueChange={setFilterAuthority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by authority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Authorities</SelectItem>
                          <SelectItem value="federal">Federal</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="local">Local</SelectItem>
                          <SelectItem value="tourism">Tourism</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Quick Actions</Label>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Refresh All Data
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Filter className="mr-2 h-3 w-3" />
                        Save Filter Template
                      </Button>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Eye className="mr-2 h-3 w-3" />
                        Generate Summary
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Compliance Overview KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Compliance Rate</CardTitle>
                <Shield className="h-5 w-5 text-green-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87%</div>
                <div className="flex items-center text-sm text-green-100 mt-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  14 of 16 requirements
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Tax Filings</CardTitle>
                <FileText className="h-5 w-5 text-blue-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{taxReports.filter((t) => t.status === "filed").length}</div>
                <div className="flex items-center text-sm text-blue-100 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {taxReports.filter((t) => t.status === "pending").length} pending
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Safety Inspections</CardTitle>
                <Building className="h-5 w-5 text-purple-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {safetyInspections.filter((s) => s.status === "passed").length}
                </div>
                <div className="flex items-center text-sm text-purple-100 mt-2">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {safetyInspections.filter((s) => s.status === "failed").length} failed
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-100">Guest Registrations</CardTitle>
                <Users className="h-5 w-5 text-orange-100" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{guestRegistration.length}</div>
                <div className="flex items-center text-sm text-orange-100 mt-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {guestRegistration.filter((g) => g.status === "reported").length} reported
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="taxes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            {visibleSections.taxes && <TabsTrigger value="taxes">Tax Reports</TabsTrigger>}
            {visibleSections.safety && <TabsTrigger value="safety">Safety Inspections</TabsTrigger>}
            {visibleSections.tourism && <TabsTrigger value="tourism">Tourism Reports</TabsTrigger>}
            {visibleSections.compliance && <TabsTrigger value="compliance">Compliance</TabsTrigger>}
            {visibleSections.registration && <TabsTrigger value="registration">Registration</TabsTrigger>}
          </TabsList>

          {visibleSections.taxes && (
            <TabsContent value="taxes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Tax Reports & Filings
                  </CardTitle>
                  <CardDescription>Government tax submissions and compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tax Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Authority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Filed Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {taxReports.map((tax) => (
                        <TableRow key={tax.id}>
                          <TableCell className="font-medium">{tax.type}</TableCell>
                          <TableCell>{tax.period}</TableCell>
                          <TableCell className="text-right font-medium">${tax.amount.toLocaleString()}</TableCell>
                          <TableCell>{tax.authority}</TableCell>
                          <TableCell>{tax.dueDate}</TableCell>
                          <TableCell>{tax.filedDate || "Not filed"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                tax.status === "filed"
                                  ? "default"
                                  : tax.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {tax.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{tax.reference}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.safety && (
            <TabsContent value="safety" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Safety Inspections
                  </CardTitle>
                  <CardDescription>Government safety inspections and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {safetyInspections.map((inspection) => (
                      <div key={inspection.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{inspection.type}</h3>
                            <p className="text-sm text-gray-600">Inspector: {inspection.inspector}</p>
                            <p className="text-sm text-gray-600">Date: {inspection.date}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                inspection.status === "passed"
                                  ? "default"
                                  : inspection.status === "conditional"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {inspection.status}
                            </Badge>
                            {inspection.certificate && <Badge variant="outline">Certified</Badge>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Inspection Results</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Score:</span>
                                <span
                                  className={`font-medium ${
                                    inspection.score >= 90
                                      ? "text-green-600"
                                      : inspection.score >= 80
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {inspection.score}/100
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Violations:</span>
                                <span
                                  className={`font-medium ${
                                    inspection.violations === 0 ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {inspection.violations}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Next Inspection:</span>
                                <span className="font-medium">{inspection.nextInspection}</span>
                              </div>
                              {inspection.certificate && (
                                <div className="flex justify-between">
                                  <span>Certificate:</span>
                                  <span className="font-medium">{inspection.certificate}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <h4 className="font-medium mb-2">Inspected Areas</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {inspection.areas.map((area, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-sm">{area}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {inspection.violations > 0 && (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="font-medium text-red-800">
                                {inspection.violations} violation{inspection.violations > 1 ? "s" : ""} found
                              </span>
                            </div>
                            <p className="text-red-700 text-sm mt-1">
                              Corrective actions required before next inspection
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.tourism && (
            <TabsContent value="tourism" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Tourism Authority Reports
                  </CardTitle>
                  <CardDescription>Statistical reports submitted to tourism authorities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tourismReports.map((report) => (
                      <div key={report.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{report.type}</h3>
                            <p className="text-sm text-gray-600">Period: {report.period}</p>
                            <p className="text-sm text-gray-600">Authority: {report.authority}</p>
                            <p className="text-sm text-gray-600">Submitted: {report.submittedDate}</p>
                          </div>
                          <Badge
                            variant={
                              report.status === "approved"
                                ? "default"
                                : report.status === "submitted"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded">
                            <div className="text-2xl font-bold text-blue-600">
                              {report.data.totalGuests.toLocaleString()}
                            </div>
                            <div className="text-xs text-blue-700">Total Guests</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded">
                            <div className="text-2xl font-bold text-green-600">
                              {report.data.guestNights.toLocaleString()}
                            </div>
                            <div className="text-xs text-green-700">Guest Nights</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded">
                            <div className="text-2xl font-bold text-purple-600">{report.data.averageStay}</div>
                            <div className="text-xs text-purple-700">Avg Stay (nights)</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded">
                            <div className="text-2xl font-bold text-orange-600">{report.data.occupancyRate}%</div>
                            <div className="text-xs text-orange-700">Occupancy Rate</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded">
                            <div className="text-2xl font-bold text-red-600">
                              {report.data.internationalGuests.toLocaleString()}
                            </div>
                            <div className="text-xs text-red-700">International</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <div className="text-2xl font-bold text-gray-600">
                              {report.data.domesticGuests.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-700">Domestic</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.compliance && (
            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Compliance Tracking
                  </CardTitle>
                  <CardDescription>Regulatory compliance status across all categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {complianceTracking.map((category, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                        <div className="space-y-3">
                          {category.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                {req.status === "compliant" ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <AlertTriangle className="h-5 w-5 text-red-500" />
                                )}
                                <div>
                                  <div className="font-medium">{req.item}</div>
                                  <div className="text-sm text-gray-600">Last checked: {req.lastCheck}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={req.status === "compliant" ? "default" : "destructive"}>
                                  {req.status}
                                </Badge>
                                <div className="text-sm text-gray-600 mt-1">Next: {req.nextCheck}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {visibleSections.registration && (
            <TabsContent value="registration" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Guest Registration Reports
                  </CardTitle>
                  <CardDescription>Police and immigration registration reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest Name</TableHead>
                        <TableHead>Nationality</TableHead>
                        <TableHead>Passport</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Reported To</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guestRegistration.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">{guest.guest}</TableCell>
                          <TableCell>{guest.nationality}</TableCell>
                          <TableCell className="font-mono text-sm">{guest.passport}</TableCell>
                          <TableCell>{guest.checkIn}</TableCell>
                          <TableCell>{guest.checkOut || "In-house"}</TableCell>
                          <TableCell>{guest.room}</TableCell>
                          <TableCell>{guest.purpose}</TableCell>
                          <TableCell>{guest.reportedTo}</TableCell>
                          <TableCell>
                            <Badge variant={guest.status === "reported" ? "default" : "secondary"}>
                              {guest.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
