"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Plus, MoreHorizontal, Mail, FileText, User, Building, Filter, Download, RefreshCw } from "lucide-react"
import Link from "next/link"
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

const clients = [
  {
    id: "CL-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    totalBookings: 5,
    totalSpent: "$2,450.00",
    status: "active",
    lastBooking: "2024-01-15",
  },
  {
    id: "CL-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    company: "Tech Solutions Inc",
    totalBookings: 12,
    totalSpent: "$8,900.00",
    status: "vip",
    lastBooking: "2024-01-20",
  },
  {
    id: "CL-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
    company: "Johnson Enterprises",
    totalBookings: 3,
    totalSpent: "$1,200.00",
    status: "active",
    lastBooking: "2024-01-10",
  },
  {
    id: "CL-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 (555) 321-0987",
    company: "Wilson & Associates",
    totalBookings: 1,
    totalSpent: "$450.00",
    status: "new",
    lastBooking: "2024-01-22",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const filteredClients = useMemo(() => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const clientStats = useMemo(
    () => ({
      totalClients: 573,
      vipClients: 47,
      corporateClients: 89,
      avgBookingValue: 487,
      monthlyGrowth: 12,
      vipGrowth: 3,
      corporateGrowth: 7,
      valueGrowth: 8,
    }),
    [],
  )

  const handleClientAction = useCallback(async (action, clientId) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`[v0] Client action: ${action} for client ${clientId}`)

      setSuccess(`${action} completed successfully!`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(`Failed to ${action.toLowerCase()}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleExportClients = useCallback(async () => {
    try {
      setIsLoading(true)
      // Simulate export
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[v0] Exporting client data")
      setSuccess("Client data exported successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError("Failed to export client data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Clients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" role="main">
        <div className="px-4 py-6 sm:px-0">
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <User className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
              <p className="text-gray-600">Manage your hotel clients and customer relationships</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExportClients} disabled={isLoading}>
                <Download className="mr-2 h-4 w-4" />
                {isLoading ? "Exporting..." : "Export"}
              </Button>
              <Link href="/clients/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Client
                </Button>
              </Link>
            </div>
          </div>

          <section aria-label="Client Statistics" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientStats.totalClients}</div>
                <p className="text-xs text-muted-foreground">+{clientStats.monthlyGrowth}% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">VIP Clients</CardTitle>
                <Badge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientStats.vipClients}</div>
                <p className="text-xs text-muted-foreground">+{clientStats.vipGrowth} this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Corporate Clients</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientStats.corporateClients}</div>
                <p className="text-xs text-muted-foreground">+{clientStats.corporateGrowth}% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${clientStats.avgBookingValue}</div>
                <p className="text-xs text-muted-foreground">+{clientStats.valueGrowth}% from last month</p>
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Clients</CardTitle>
                  <CardDescription>
                    Manage your client database ({filteredClients.length} of {clients.length} clients)
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled={isLoading}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" disabled={isLoading}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search clients..."
                      className="pl-8 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Booking</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">{client.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{client.email}</div>
                          <div className="text-sm text-muted-foreground">{client.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>{client.totalBookings}</TableCell>
                      <TableCell>{client.totalSpent}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            client.status === "vip" ? "default" : client.status === "active" ? "secondary" : "outline"
                          }
                        >
                          {client.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.lastBooking}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleClientAction("View Profile", client.id)}>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClientAction("View Bookings", client.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Bookings
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClientAction("Send Email", client.id)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredClients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>No clients found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
