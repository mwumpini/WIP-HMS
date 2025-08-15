"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleGuard, ConditionalRender } from "@/components/role-guard"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  Download,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  ArrowUpDown,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import {
  type InventoryItem,
  type StockMovement,
  type StockTransfer,
  type PurchaseOrder,
  DEPARTMENTS,
  INVENTORY_CATEGORIES,
} from "@/types/inventory"

interface InventoryStats {
  totalItems: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
  pendingTransfers: number
  pendingOrders: number
  recentMovements: number
}

export default function InventoryOverview() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([])
  const [stockTransfers, setStockTransfers] = useState<StockTransfer[]>([])
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<InventoryStats>({
    totalItems: 0,
    totalValue: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    pendingTransfers: 0,
    pendingOrders: 0,
    recentMovements: 0,
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadInventoryData()
  }, [])

  const loadInventoryData = () => {
    try {
      const items = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
      const movements = JSON.parse(localStorage.getItem("stockMovements") || "[]")
      const transfers = JSON.parse(localStorage.getItem("stockTransfers") || "[]")
      const orders = JSON.parse(localStorage.getItem("purchaseOrders") || "[]")

      setInventoryItems(items)
      setStockMovements(movements)
      setStockTransfers(transfers)
      setPurchaseOrders(orders)

      // Calculate stats
      const lowStockItems = items.filter((item: InventoryItem) => item.currentStock <= item.reorderPoint)
      const outOfStockItems = items.filter((item: InventoryItem) => item.currentStock === 0)
      const totalValue = items.reduce((sum: number, item: InventoryItem) => sum + item.currentStock * item.costPrice, 0)
      const pendingTransfers = transfers.filter((transfer: StockTransfer) => transfer.status === "pending").length
      const pendingOrders = orders.filter(
        (order: PurchaseOrder) => order.status === "draft" || order.status === "sent",
      ).length
      const recentMovements = movements.filter((movement: StockMovement) => {
        const movementDate = new Date(movement.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return movementDate >= weekAgo
      }).length

      setStats({
        totalItems: items.length,
        totalValue,
        lowStockItems: lowStockItems.length,
        outOfStockItems: outOfStockItems.length,
        pendingTransfers,
        pendingOrders,
        recentMovements,
      })
    } catch (error) {
      console.error("Error loading inventory data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || item.department === selectedDepartment
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    if (user?.role === "storekeeper" && user?.department) {
      return matchesSearch && matchesCategory && item.department === user.department
    }

    return matchesSearch && matchesDepartment && matchesCategory
  })

  const departmentStats = DEPARTMENTS.map((dept) => {
    const deptItems = inventoryItems.filter((item) => item.department === dept)
    const deptValue = deptItems.reduce((sum, item) => sum + item.currentStock * item.costPrice, 0)
    return {
      department: dept,
      items: deptItems.length,
      value: deptValue,
      lowStock: deptItems.filter((item) => item.currentStock <= item.reorderPoint).length,
    }
  })

  const handleApproveTransfer = (transferId: string) => {
    const updatedTransfers = stockTransfers.map((transfer) =>
      transfer.id === transferId
        ? { ...transfer, status: "approved" as const, approvedBy: user?.name, approvedDate: new Date().toISOString() }
        : transfer,
    )
    setStockTransfers(updatedTransfers)
    localStorage.setItem("stockTransfers", JSON.stringify(updatedTransfers))
  }

  const handleApprovePurchaseOrder = (orderId: string) => {
    const updatedOrders = purchaseOrders.map((order) =>
      order.id === orderId
        ? { ...order, status: "approved" as const, approvedBy: user?.name, approvedDate: new Date().toISOString() }
        : order,
    )
    setPurchaseOrders(updatedOrders)
    localStorage.setItem("purchaseOrders", JSON.stringify(updatedOrders))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <RoleGuard
      requiredRole={["management", "supervisor", "storekeeper", "officer"]}
      requiredPermission="view_inventory"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">
              {user?.role === "storekeeper"
                ? `Managing inventory for ${user?.department || "your department"}`
                : "Comprehensive inventory tracking across all departments"}
            </p>
          </div>
          <div className="flex gap-2">
            <ConditionalRender condition="authenticated" role={["management", "supervisor", "storekeeper"]}>
              <Button asChild>
                <Link href="/dashboard/inventory/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Item
                </Link>
              </Button>
            </ConditionalRender>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Role-specific alerts */}
        {user?.role === "storekeeper" && stats.lowStockItems > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You have {stats.lowStockItems} items running low in your department. Consider creating requisitions.
            </AlertDescription>
          </Alert>
        )}

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">
                {user?.role === "storekeeper" ? "In your department" : `Across ${DEPARTMENTS.length} departments`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵{stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current stock value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.lowStockItems}</div>
              <p className="text-xs text-muted-foreground">Items need reordering</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.outOfStockItems}</div>
              <p className="text-xs text-muted-foreground">Items unavailable</p>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific workflow cards */}
        <ConditionalRender condition="authenticated" role={["management", "supervisor"]}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
                <ArrowUpDown className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.pendingTransfers}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Purchase orders to review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <Clock className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.recentMovements}</div>
                <p className="text-xs text-muted-foreground">Movements this week</p>
              </CardContent>
            </Card>
          </div>
        </ConditionalRender>

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
            <ConditionalRender condition="authenticated" role={["management", "supervisor", "officer"]}>
              <TabsTrigger value="departments">Department Overview</TabsTrigger>
            </ConditionalRender>
            <TabsTrigger value="movements">Recent Movements</TabsTrigger>
            <ConditionalRender condition="authenticated" role={["management", "supervisor"]}>
              <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            </ConditionalRender>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>
                  {user?.role === "storekeeper"
                    ? "Manage inventory items in your department"
                    : "Manage your inventory across all locations and departments"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>

                  <ConditionalRender condition="authenticated" role={["management", "supervisor", "officer"]}>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </ConditionalRender>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {INVENTORY_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <ConditionalRender condition="authenticated" role={["management", "supervisor", "officer"]}>
                        <TableHead>Department</TableHead>
                      </ConditionalRender>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.category}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{item.sku}</TableCell>
                        <ConditionalRender condition="authenticated" role={["management", "supervisor", "officer"]}>
                          <TableCell>{item.department}</TableCell>
                        </ConditionalRender>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {item.currentStock} {item.unit}
                            </span>
                            {item.currentStock <= item.reorderPoint && (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>₵{item.costPrice.toFixed(2)}</TableCell>
                        <TableCell>₵{(item.currentStock * item.costPrice).toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.currentStock === 0
                                ? "destructive"
                                : item.currentStock <= item.reorderPoint
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {item.currentStock === 0
                              ? "Out of Stock"
                              : item.currentStock <= item.reorderPoint
                                ? "Low Stock"
                                : "In Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <ConditionalRender
                              condition="authenticated"
                              role={["management", "supervisor", "storekeeper"]}
                            >
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </ConditionalRender>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <ConditionalRender condition="authenticated" role={["management", "supervisor", "officer"]}>
            <TabsContent value="departments" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {departmentStats.map((dept) => (
                  <Card key={dept.department}>
                    <CardHeader>
                      <CardTitle className="text-lg">{dept.department}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Items:</span>
                          <span className="font-medium">{dept.items}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Value:</span>
                          <span className="font-medium">₵{dept.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Low Stock:</span>
                          <span className={`font-medium ${dept.lowStock > 0 ? "text-yellow-600" : "text-green-600"}`}>
                            {dept.lowStock}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </ConditionalRender>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Stock Movements</CardTitle>
                <CardDescription>Latest inventory transactions and adjustments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Performed By</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements
                      .filter((movement) => {
                        if (user?.role === "storekeeper" && user?.department) {
                          return movement.department === user.department
                        }
                        return true
                      })
                      .slice(0, 10)
                      .map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>{new Date(movement.date).toLocaleDateString()}</TableCell>
                          <TableCell>{movement.itemName}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                movement.type === "in" ? "default" : movement.type === "out" ? "secondary" : "outline"
                              }
                            >
                              {movement.type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{movement.quantity}</TableCell>
                          <TableCell>{movement.department}</TableCell>
                          <TableCell>{movement.performedBy}</TableCell>
                          <TableCell>{movement.reference}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <ConditionalRender condition="authenticated" role={["management", "supervisor"]}>
            <TabsContent value="approvals" className="space-y-4">
              {/* Pending Stock Transfers */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Stock Transfers</CardTitle>
                  <CardDescription>Stock transfers awaiting your approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transfer #</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Requested By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockTransfers
                        .filter((transfer) => transfer.status === "pending")
                        .map((transfer) => (
                          <TableRow key={transfer.id}>
                            <TableCell className="font-mono">{transfer.transferNumber}</TableCell>
                            <TableCell>{transfer.fromDepartment}</TableCell>
                            <TableCell>{transfer.toDepartment}</TableCell>
                            <TableCell>{transfer.items.length} items</TableCell>
                            <TableCell>{transfer.requestedBy}</TableCell>
                            <TableCell>{new Date(transfer.requestDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveTransfer(transfer.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pending Purchase Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Purchase Orders</CardTitle>
                  <CardDescription>Purchase orders awaiting your approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>PO #</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchaseOrders
                        .filter((order) => order.status === "draft" || order.status === "sent")
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono">{order.poNumber}</TableCell>
                            <TableCell>{order.supplier}</TableCell>
                            <TableCell>{order.department}</TableCell>
                            <TableCell>₵{order.total.toFixed(2)}</TableCell>
                            <TableCell>{order.createdBy}</TableCell>
                            <TableCell>{new Date(order.createdDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprovePurchaseOrder(order.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </ConditionalRender>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
