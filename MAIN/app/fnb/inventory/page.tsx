"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ShoppingCart,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  Search,
  BarChart3,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Chicken Breast",
    category: "Meat & Poultry",
    currentStock: 2.5,
    parLevel: 15,
    unit: "kg",
    unitCost: 25.0,
    supplier: "Fresh Farms Ltd",
    lastOrdered: "2024-01-10",
    expiryDate: "2024-01-15",
    status: "critical",
  },
  {
    id: 2,
    name: "Jasmine Rice",
    category: "Grains & Cereals",
    currentStock: 45,
    parLevel: 50,
    unit: "kg",
    unitCost: 8.5,
    supplier: "Golden Grain Co",
    lastOrdered: "2024-01-08",
    expiryDate: "2024-06-15",
    status: "good",
  },
  {
    id: 3,
    name: "Club Beer",
    category: "Beverages",
    currentStock: 15,
    parLevel: 60,
    unit: "bottles",
    unitCost: 4.5,
    supplier: "Ghana Breweries",
    lastOrdered: "2024-01-09",
    expiryDate: "2024-08-20",
    status: "low",
  },
  {
    id: 4,
    name: "Fresh Tilapia",
    category: "Seafood",
    currentStock: 8,
    parLevel: 20,
    unit: "kg",
    unitCost: 18.0,
    supplier: "Lake Fresh Fish",
    lastOrdered: "2024-01-11",
    expiryDate: "2024-01-14",
    status: "low",
  },
  {
    id: 5,
    name: "Tomato Paste",
    category: "Condiments",
    currentStock: 25,
    parLevel: 30,
    unit: "cans",
    unitCost: 3.2,
    supplier: "Tropical Foods",
    lastOrdered: "2024-01-07",
    expiryDate: "2024-12-31",
    status: "good",
  },
  {
    id: 6,
    name: "Vegetable Oil",
    category: "Cooking Oils",
    currentStock: 8,
    parLevel: 25,
    unit: "liters",
    unitCost: 12.0,
    supplier: "Golden Oil Mills",
    lastOrdered: "2024-01-06",
    expiryDate: "2024-10-15",
    status: "low",
  },
]

const purchaseOrders = [
  {
    id: "PO-001",
    supplier: "Fresh Farms Ltd",
    date: "2024-01-12",
    status: "pending",
    total: 450.0,
    items: [
      { name: "Chicken Breast", quantity: 15, unit: "kg", unitCost: 25.0 },
      { name: "Beef Steak", quantity: 5, unit: "kg", unitCost: 35.0 },
    ],
    expectedDelivery: "2024-01-14",
  },
  {
    id: "PO-002",
    supplier: "Ghana Breweries",
    date: "2024-01-12",
    status: "approved",
    total: 270.0,
    items: [{ name: "Club Beer", quantity: 60, unit: "bottles", unitCost: 4.5 }],
    expectedDelivery: "2024-01-13",
  },
  {
    id: "PO-003",
    supplier: "Lake Fresh Fish",
    date: "2024-01-11",
    status: "delivered",
    total: 360.0,
    items: [{ name: "Fresh Tilapia", quantity: 20, unit: "kg", unitCost: 18.0 }],
    expectedDelivery: "2024-01-12",
    actualDelivery: "2024-01-12",
  },
]

const suppliers = [
  {
    id: 1,
    name: "Fresh Farms Ltd",
    category: "Meat & Poultry",
    contact: "+233 24 123 4567",
    email: "orders@freshfarms.gh",
    rating: 4.8,
    paymentTerms: "Net 30",
    lastOrder: "2024-01-10",
    totalOrders: 45,
  },
  {
    id: 2,
    name: "Ghana Breweries",
    category: "Beverages",
    contact: "+233 30 234 5678",
    email: "sales@ghanabreweries.com",
    rating: 4.9,
    paymentTerms: "Net 15",
    lastOrder: "2024-01-09",
    totalOrders: 32,
  },
  {
    id: 3,
    name: "Golden Grain Co",
    category: "Grains & Cereals",
    contact: "+233 20 345 6789",
    email: "info@goldengrain.gh",
    rating: 4.6,
    paymentTerms: "Net 30",
    lastOrder: "2024-01-08",
    totalOrders: 28,
  },
]

export default function InventoryProcurement() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showNewPODialog, setShowNewPODialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const getStockStatus = (current, par) => {
    const percentage = (current / par) * 100
    if (percentage <= 20) return { status: "critical", color: "bg-red-500", textColor: "text-red-600" }
    if (percentage <= 40) return { status: "low", color: "bg-yellow-500", textColor: "text-yellow-600" }
    return { status: "good", color: "bg-green-500", textColor: "text-green-600" }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPOStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInventory = inventoryItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ["All", ...new Set(inventoryItems.map((item) => item.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b border-emerald-200">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/fnb">F&B Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fnb/inventory">Inventory & Procurement</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-4 px-4">
          <Dialog open={showNewPODialog} onOpenChange={setShowNewPODialog}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                New Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Purchase Order</DialogTitle>
                <DialogDescription>Generate a new purchase order for inventory replenishment</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="delivery-date">Expected Delivery</Label>
                    <Input id="delivery-date" type="date" />
                  </div>
                </div>
                <div>
                  <Label>Items to Order</Label>
                  <div className="space-y-2 mt-2">
                    {inventoryItems
                      .filter((item) => item.status === "critical" || item.status === "low")
                      .map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Current: {item.currentStock} {item.unit} | Par: {item.parLevel} {item.unit}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              placeholder="Qty"
                              className="w-20"
                              defaultValue={item.parLevel - item.currentStock}
                            />
                            <span className="text-sm text-gray-600">{item.unit}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPODialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Create Purchase Order</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-3xl font-bold text-gray-900">{inventoryItems.length}</p>
                  <p className="text-xs text-emerald-600">Active inventory</p>
                </div>
                <Package className="h-10 w-10 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Items</p>
                  <p className="text-3xl font-bold text-red-600">
                    {inventoryItems.filter((item) => item.status === "critical").length}
                  </p>
                  <p className="text-xs text-red-600">Need immediate attention</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {purchaseOrders.filter((po) => po.status === "pending" || po.status === "approved").length}
                  </p>
                  <p className="text-xs text-yellow-600">Awaiting delivery</p>
                </div>
                <Truck className="h-10 w-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Spend</p>
                  <p className="text-3xl font-bold text-blue-600">GH₵12,450</p>
                  <p className="text-xs text-green-600">-8% from last month</p>
                </div>
                <BarChart3 className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="procurement">Purchase Orders</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search inventory items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-emerald-200"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-emerald-200">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Inventory Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInventory.map((item) => {
                const stockInfo = getStockStatus(item.currentStock, item.parLevel)
                const stockPercentage = (item.currentStock / item.parLevel) * 100
                return (
                  <Card key={item.id} className="border-emerald-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.category}</CardDescription>
                        </div>
                        <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Stock Level</span>
                            <span>
                              {item.currentStock}/{item.parLevel} {item.unit}
                            </span>
                          </div>
                          <Progress value={stockPercentage} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Unit Cost</p>
                            <p className="font-semibold">GH₵{item.unitCost}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Value</p>
                            <p className="font-semibold">GH₵{(item.currentStock * item.unitCost).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="text-sm">
                          <p className="text-gray-600">Supplier: {item.supplier}</p>
                          <p className="text-gray-600">Last Ordered: {item.lastOrdered}</p>
                          <p className="text-gray-600">Expires: {item.expiryDate}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Reorder
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                          >
                            <Package className="w-4 h-4 mr-1" />
                            Adjust
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="procurement" className="space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Purchase Orders
                </CardTitle>
                <CardDescription>Manage purchase orders and track deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrders.map((po) => (
                    <div key={po.id} className="p-4 border border-emerald-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{po.id}</h4>
                          <p className="text-sm text-gray-600">{po.supplier}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getPOStatusBadge(po.status)}>{po.status}</Badge>
                          <p className="text-sm font-semibold mt-1">GH₵{po.total}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-medium">{po.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Expected Delivery</p>
                          <p className="font-medium">{po.expectedDelivery}</p>
                        </div>
                        {po.actualDelivery && (
                          <div>
                            <p className="text-sm text-gray-600">Actual Delivery</p>
                            <p className="font-medium">{po.actualDelivery}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Items:</p>
                        {po.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm p-2 bg-emerald-50 rounded">
                            <span>
                              {item.quantity} {item.unit} {item.name}
                            </span>
                            <span>GH₵{(item.quantity * item.unitCost).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2 mt-4">
                        {po.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="border-emerald-200 bg-transparent">
                              Edit
                            </Button>
                          </>
                        )}
                        {po.status === "approved" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Truck className="w-4 h-4 mr-1" />
                            Track Delivery
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Supplier Management
                </CardTitle>
                <CardDescription>Manage supplier relationships and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="p-4 border border-emerald-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{supplier.name}</h4>
                          <p className="text-sm text-gray-600">{supplier.category}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{supplier.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"
                                }`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">Contact: {supplier.contact}</p>
                          <p className="text-gray-600">Email: {supplier.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Payment Terms: {supplier.paymentTerms}</p>
                          <p className="text-gray-600">Last Order: {supplier.lastOrder}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-emerald-200">
                          <span className="text-gray-600">Total Orders:</span>
                          <span className="font-semibold">{supplier.totalOrders}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                        >
                          Contact
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                        >
                          View Orders
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle>Inventory Turnover</CardTitle>
                  <CardDescription>Stock movement and turnover rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventoryItems.slice(0, 5).map((item) => {
                      const turnoverRate = Math.random() * 10 + 2 // Mock data
                      return (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{turnoverRate.toFixed(1)}x</p>
                            <p className="text-sm text-gray-600">per month</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Procurement costs and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-5 w-5 text-green-600" />
                        <span>Food Cost %</span>
                      </div>
                      <span className="font-bold text-green-600">24.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span>Avg Order Value</span>
                      </div>
                      <span className="font-bold text-blue-600">GH₵425</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span>Avg Delivery Time</span>
                      </div>
                      <span className="font-bold text-yellow-600">2.3 days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        <span>Monthly Growth</span>
                      </div>
                      <span className="font-bold text-purple-600">+12.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
