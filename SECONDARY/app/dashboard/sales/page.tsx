"use client"

import {
  Dialog,
  DialogContent as DialogContentComponent,
  DialogHeader as DialogHeaderComponent,
  DialogFooter as DialogFooterComponent,
  DialogTitle as DialogTitleComponent,
  DialogDescription as DialogDescriptionComponent,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/components/role-guard"
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { exportToCSV } from "@/lib/csv-export"
import { safeGetItem, safeSetItem } from "@/lib/storage"
import { handleError } from "@/lib/error-handling"
import type { Customer, SalesInvoice, SalesQuote, SalesPipeline, SalesAnalytics } from "@/types/sales"

interface Sale {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceType: string
  description: string
  amount: number
  subtotal: number
  vatAmount: number
  nhilAmount: number
  getfundAmount: number
  covidAmount: number
  tourismAmount: number
  totalTaxes: number
  totalAmount: number
  date: string
  createdAt: string
}

const DEFAULT_SERVICE_TYPES = ["ACCOMMODATION", "CONFERENCE", "FOOD", "BEVERAGE", "POOL", "OTHERS"]

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sales, setSales] = useState<Sale[]>([])
  const [filteredSales, setFilteredSales] = useState<Sale[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [invoices, setInvoices] = useState<SalesInvoice[]>([])
  const [quotes, setQuotes] = useState<SalesQuote[]>([])
  const [pipeline, setPipeline] = useState<SalesPipeline[]>([])
  const [analytics, setAnalytics] = useState<SalesAnalytics | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [editingSale, setEditingSale] = useState<Sale | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [customServiceTypes, setCustomServiceTypes] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")

  const [editFormData, setEditFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceType: "",
    customServiceType: "",
    description: "",
    amount: "",
    date: "",
  })

  const { toast } = useToast()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadSalesData()
  }, [])

  const loadSalesData = () => {
    try {
      // Load existing sales data and convert to new format
      const existingSales = safeGetItem("sales", [])
      const customersData = safeGetItem("customers", [])
      const invoicesData = safeGetItem("salesInvoices", [])
      const quotesData = safeGetItem("salesQuotes", [])
      const pipelineData = safeGetItem("salesPipeline", [])

      // Convert existing sales to customers and invoices if needed
      if (existingSales.length > 0 && customersData.length === 0) {
        const convertedCustomers = convertSalesToCustomers(existingSales)
        const convertedInvoices = convertSalesToInvoices(existingSales)

        setCustomers(convertedCustomers)
        setInvoices(convertedInvoices)

        // Save converted data
        safeSetItem("customers", convertedCustomers)
        safeSetItem("salesInvoices", convertedInvoices)
      } else {
        setCustomers(customersData)
        setInvoices(invoicesData)
      }

      setSales(existingSales)
      setQuotes(quotesData)
      setPipeline(pipelineData)

      // Calculate analytics
      calculateAnalytics()
      setLoading(false)
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Error Loading Sales Data",
        description: message,
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const convertSalesToCustomers = (sales: any[]): Customer[] => {
    const customerMap = new Map()

    sales.forEach((sale) => {
      if (!customerMap.has(sale.customerEmail)) {
        customerMap.set(sale.customerEmail, {
          id: `customer-${Date.now()}-${Math.random()}`,
          name: sale.customerName,
          email: sale.customerEmail,
          phone: sale.customerPhone || "",
          address: "",
          customerType: "individual" as const,
          creditLimit: 10000,
          paymentTerms: 30,
          status: "active" as const,
          createdAt: sale.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          totalPurchases: 0,
          outstandingBalance: 0,
        })
      }

      const customer = customerMap.get(sale.customerEmail)
      customer.totalPurchases += sale.totalAmount || 0
      customer.lastPurchaseDate = sale.date
    })

    return Array.from(customerMap.values())
  }

  const convertSalesToInvoices = (sales: any[]): SalesInvoice[] => {
    return sales.map((sale) => ({
      id: sale.id,
      invoiceNumber: `INV-${sale.id}`,
      customerId: `customer-${sale.customerEmail}`,
      customerName: sale.customerName,
      salesRepId: user?.id || "system",
      salesRepName: user?.name || "System",
      items: [
        {
          id: `item-${sale.id}`,
          productName: sale.serviceType,
          description: sale.description || "",
          quantity: 1,
          unitPrice: sale.subtotal || sale.amount || 0,
          discount: 0,
          lineTotal: sale.subtotal || sale.amount || 0,
          taxRate: 19.5, // Total Ghana tax rate
          taxAmount: sale.totalTaxes || 0,
        },
      ],
      subtotal: sale.subtotal || sale.amount || 0,
      taxAmount: sale.totalTaxes || 0,
      totalAmount: sale.totalAmount || 0,
      paidAmount: sale.totalAmount || 0,
      outstandingAmount: 0,
      dueDate: sale.date,
      status: "paid" as const,
      paymentTerms: 0,
      createdAt: sale.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  }

  const calculateAnalytics = () => {
    // Calculate comprehensive sales analytics
    const totalSales = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0)
    const totalProfit = totalSales * 0.4 // Assume 40% profit margin
    const averageOrderValue = invoices.length > 0 ? totalSales / invoices.length : 0
    const customerCount = customers.length

    setAnalytics({
      totalSales,
      totalProfit,
      averageOrderValue,
      customerCount,
      repeatCustomerRate: 0.3, // 30% repeat rate
      salesGrowth: 0.15, // 15% growth
      topProducts: [],
      topCustomers: [],
      salesByPeriod: [],
      salesByRep: [],
    })
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const loadSales = () => {
    try {
      const salesData = safeGetItem<any[]>("sales", [])
      setSales(salesData)
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Error Loading Sales",
        description: message,
        variant: "destructive",
      })
    }
  }

  const loadCustomServiceTypes = () => {
    const savedServiceTypes = localStorage.getItem("customServiceTypes")
    if (savedServiceTypes) {
      try {
        setCustomServiceTypes(JSON.parse(savedServiceTypes))
      } catch (error) {
        console.error("Error loading custom service types:", error)
      }
    }
  }

  const filterSales = () => {
    let filtered = sales

    if (searchTerm) {
      filtered = filtered.filter(
        (sale) =>
          sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.serviceType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((sale) => sale.serviceType === filterType)
    }

    setFilteredSales(filtered)
  }

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale)
    setEditFormData({
      customerName: sale.customerName,
      customerEmail: sale.customerEmail,
      customerPhone: sale.customerPhone,
      serviceType: sale.serviceType,
      customServiceType: "",
      description: sale.description,
      amount: sale.subtotal.toString(),
      date: sale.date,
    })
    setShowEditDialog(true)
  }

  const handleDelete = (saleId: string) => {
    if (confirm("Are you sure you want to delete this sale?")) {
      const updatedSales = sales.filter((sale) => sale.id !== saleId)
      setSales(updatedSales)
      safeSetItem("sales", updatedSales)
      showSuccess("Sale deleted successfully!")
    }
  }

  const handleDuplicate = (sale: Sale) => {
    const duplicatedSale = {
      ...sale,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
    }

    const updatedSales = [...sales, duplicatedSale]
    setSales(updatedSales)
    safeSetItem("sales", updatedSales)

    showSuccess("Sale duplicated successfully!")
  }

  const calculateTotals = (amount: number) => {
    const vatAmount = (amount * 12.5) / 100
    const nhilAmount = (amount * 2.5) / 100
    const getfundAmount = (amount * 2.5) / 100
    const covidAmount = (amount * 1) / 100
    const tourismAmount = (amount * 1) / 100

    const totalTaxes = vatAmount + nhilAmount + getfundAmount + covidAmount + tourismAmount
    const totalAmount = amount + totalTaxes

    return {
      subtotal: amount,
      vatAmount,
      nhilAmount,
      getfundAmount,
      covidAmount,
      tourismAmount,
      totalTaxes,
      totalAmount,
    }
  }

  const handleSaveEdit = () => {
    if (!editingSale) return

    const amount = Number.parseFloat(editFormData.amount) || 0
    const totals = calculateTotals(amount)

    const updatedSale = {
      ...editingSale,
      customerName: editFormData.customerName,
      customerEmail: editFormData.customerEmail,
      customerPhone: editFormData.customerPhone,
      serviceType: editFormData.serviceType === "OTHERS" ? editFormData.customServiceType : editFormData.serviceType,
      description: editFormData.description,
      date: editFormData.date,
      ...totals,
    }

    const updatedSales = sales.map((sale) => (sale.id === editingSale.id ? updatedSale : sale))

    setSales(updatedSales)
    safeSetItem("sales", updatedSales)
    setShowEditDialog(false)
    setEditingSale(null)

    showSuccess("Sale updated successfully!")
  }

  const handleExport = () => {
    try {
      const columns = [
        { key: "customerName", label: "Customer Name" },
        { key: "customerEmail", label: "Email" },
        { key: "customerPhone", label: "Phone" },
        {
          key: "items",
          label: "Items",
          format: (items: any[]) => items?.map((i) => `${i.name} (${i.quantity})`).join("; ") || "",
        },
        { key: "subtotal", label: "Subtotal", format: (value: number) => `GHS ${value?.toFixed(2) || "0.00"}` },
        { key: "vatAmount", label: "VAT", format: (value: number) => `GHS ${value?.toFixed(2) || "0.00"}` },
        { key: "total", label: "Total", format: (value: number) => `GHS ${value?.toFixed(2) || "0.00"}` },
        { key: "createdAt", label: "Date", format: (date: string) => new Date(date).toLocaleDateString() },
      ]

      exportToCSV(sales, columns, "sales_report")
      toast({
        title: "Export Successful",
        description: "Sales data has been exported to CSV",
      })
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Export Failed",
        description: message,
        variant: "destructive",
      })
    }
  }

  const allServiceTypes = [...DEFAULT_SERVICE_TYPES, ...customServiceTypes]
  const uniqueServiceTypes = [...new Set(sales.map((sale) => sale.serviceType))]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading sales data...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <p className="text-muted-foreground">Comprehensive sales and customer relationship management</p>
        </div>
        <div className="flex gap-2">
          <RoleGuard allowedRoles={["management", "supervisor", "sales"]}>
            <Link href="/dashboard/sales/quotes/new">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </Link>
          </RoleGuard>
          <Link href="/dashboard/sales/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Sale
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS {analytics?.totalSales.toFixed(2) || "0.00"}</div>
                <p className="text-xs text-muted-foreground">
                  +{((analytics?.salesGrowth || 0) * 100).toFixed(1)}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-xs text-muted-foreground">
                  {((analytics?.repeatCustomerRate || 0) * 100).toFixed(1)}% repeat customers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GHS {analytics?.averageOrderValue.toFixed(2) || "0.00"}</div>
                <p className="text-xs text-muted-foreground">Per transaction</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Quotes</CardTitle>
                <CardDescription>Latest sales transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quotes
                    .filter((q) => q.status === "sent")
                    .map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{quote.customerName}</div>
                          <div className="text-sm text-muted-foreground">{quote.quoteNumber}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">GHS {quote.totalAmount.toFixed(2)}</div>
                          <Badge variant={quote.status === "sent" ? "default" : "secondary"}>{quote.status}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Management
                </CardTitle>
                <CardDescription>Manage customer relationships and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <RoleGuard allowedRoles={["management", "supervisor", "sales"]}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Customer
                    </Button>
                  </RoleGuard>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Customer</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Total Purchases</th>
                        <th className="text-left p-2">Outstanding</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </div>
                              {customer.phone && (
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  {customer.phone}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge variant="outline" className="capitalize">
                              {customer.customerType}
                            </Badge>
                          </td>
                          <td className="p-2">GHS {customer.totalPurchases.toFixed(2)}</td>
                          <td className="p-2">
                            <span className={customer.outstandingBalance > 0 ? "text-red-600" : "text-green-600"}>
                              GHS {customer.outstandingBalance.toFixed(2)}
                            </span>
                          </td>
                          <td className="p-2">
                            <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Management
              </CardTitle>
              <CardDescription>Manage customer relationships and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <RoleGuard allowedRoles={["management", "supervisor", "sales"]}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </RoleGuard>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Total Purchases</th>
                      <th className="text-left p-2">Outstanding</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline" className="capitalize">
                            {customer.customerType}
                          </Badge>
                        </td>
                        <td className="p-2">GHS {customer.totalPurchases.toFixed(2)}</td>
                        <td className="p-2">
                          <span className={customer.outstandingBalance > 0 ? "text-red-600" : "text-green-600"}>
                            GHS {customer.outstandingBalance.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-2">
                          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Sales Invoices</CardTitle>
              <CardDescription>Manage sales invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Invoice management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes">
          <Card>
            <CardHeader>
              <CardTitle>Sales Quotes</CardTitle>
              <CardDescription>Manage sales quotations and proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Quote management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Track sales opportunities and deals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pipeline management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed sales performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Advanced analytics dashboard will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Success Message */}
      {successMessage && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name, email, or service type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {uniqueServiceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions ({filteredSales.length})</CardTitle>
          <CardDescription>
            Total Revenue: GHS {filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0).toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Service Type</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Taxes</th>
                  <th className="text-left p-2">Total</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{sale.customerName}</div>
                        <div className="text-sm text-muted-foreground">{sale.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="secondary">{sale.serviceType}</Badge>
                    </td>
                    <td className="p-2">GHS {sale.subtotal.toFixed(2)}</td>
                    <td className="p-2">GHS {sale.totalTaxes.toFixed(2)}</td>
                    <td className="p-2 font-medium">GHS {sale.totalAmount.toFixed(2)}</td>
                    <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(sale)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(sale)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(sale.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSales.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No sales found.{" "}
                <Link href="/dashboard/sales/new" className="text-primary hover:underline">
                  Create your first sale
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContentComponent className="max-w-2xl">
          <DialogHeaderComponent>
            <DialogTitleComponent>Edit Sale</DialogTitleComponent>
            <DialogDescriptionComponent>Update the sale information</DialogDescriptionComponent>
          </DialogHeaderComponent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-customerName">Customer Name</Label>
              <Input
                id="edit-customerName"
                value={editFormData.customerName}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, customerName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-customerEmail">Email</Label>
              <Input
                id="edit-customerEmail"
                value={editFormData.customerEmail}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, customerEmail: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-customerPhone">Phone</Label>
              <Input
                id="edit-customerPhone"
                value={editFormData.customerPhone}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, customerPhone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-serviceType">Service Type</Label>
              <Select
                value={editFormData.serviceType}
                onValueChange={(value) => setEditFormData((prev) => ({ ...prev, serviceType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allServiceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {editFormData.serviceType === "OTHERS" && (
              <div>
                <Label htmlFor="edit-customServiceType">Custom Service Type</Label>
                <Input
                  id="edit-customServiceType"
                  value={editFormData.customServiceType}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, customServiceType: e.target.value }))}
                />
              </div>
            )}
            <div>
              <Label htmlFor="edit-amount">Amount (GHS)</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={editFormData.amount}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={editFormData.date}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editFormData.description}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
          <DialogFooterComponent>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooterComponent>
        </DialogContentComponent>
      </Dialog>
    </div>
  )
}
