"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wine,
  Clock,
  CheckCircle,
  AlertTriangle,
  Droplets,
  BarChart3,
  Package,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

// Sample bar data
const barOrders = [
  {
    id: "BOT-001",
    tableNumber: "B2",
    orderNumber: "#B001",
    items: [
      { name: "Club Beer", quantity: 2, status: "ready", station: "beer" },
      {
        name: "Whiskey Sour",
        quantity: 1,
        status: "mixing",
        station: "cocktails",
        recipe: "2oz whiskey, 1oz lemon, 0.5oz simple",
      },
    ],
    status: "preparing",
    priority: "normal",
    orderTime: new Date(Date.now() - 5 * 60 * 1000),
    bartender: "Mike Johnson",
  },
  {
    id: "BOT-002",
    tableNumber: "T15",
    orderNumber: "#B002",
    items: [
      { name: "Red Wine", quantity: 1, status: "ready", station: "wine", vintage: "2019 Merlot" },
      {
        name: "Gin & Tonic",
        quantity: 2,
        status: "preparing",
        station: "cocktails",
        recipe: "2oz gin, tonic water, lime",
      },
    ],
    status: "preparing",
    priority: "high",
    orderTime: new Date(Date.now() - 3 * 60 * 1000),
    bartender: "Sarah Wilson",
  },
  {
    id: "BOT-003",
    tableNumber: "B1",
    orderNumber: "#B003",
    items: [
      { name: "Fresh Orange Juice", quantity: 2, status: "ready", station: "non-alcoholic" },
      { name: "Espresso Martini", quantity: 1, status: "ready", station: "cocktails" },
    ],
    status: "ready",
    priority: "normal",
    orderTime: new Date(Date.now() - 8 * 60 * 1000),
    bartender: "Mike Johnson",
  },
]

const barInventory = [
  {
    name: "Club Beer",
    category: "Beer",
    currentStock: 45,
    parLevel: 60,
    unit: "bottles",
    pourCost: 2.5,
    variance: -2.1,
  },
  {
    name: "Whiskey (Premium)",
    category: "Spirits",
    currentStock: 8,
    parLevel: 12,
    unit: "bottles",
    pourCost: 15.0,
    variance: 1.2,
  },
  { name: "Gin", category: "Spirits", currentStock: 6, parLevel: 10, unit: "bottles", pourCost: 12.0, variance: -0.8 },
  { name: "Red Wine", category: "Wine", currentStock: 18, parLevel: 24, unit: "bottles", pourCost: 8.5, variance: 0.5 },
  {
    name: "Tonic Water",
    category: "Mixers",
    currentStock: 25,
    parLevel: 36,
    unit: "bottles",
    pourCost: 1.2,
    variance: 0.0,
  },
  {
    name: "Fresh Lime",
    category: "Garnish",
    currentStock: 12,
    parLevel: 20,
    unit: "pieces",
    pourCost: 0.3,
    variance: 0.2,
  },
]

const bartenderPerformance = [
  { name: "Mike Johnson", shift: "Day", ordersCompleted: 28, avgTime: "3.2 min", pourVariance: 1.8, efficiency: 94 },
  { name: "Sarah Wilson", shift: "Day", ordersCompleted: 22, avgTime: "2.8 min", pourVariance: -0.5, efficiency: 97 },
  { name: "David Brown", shift: "Night", ordersCompleted: 35, avgTime: "3.5 min", pourVariance: 2.3, efficiency: 91 },
]

export default function BarManagement() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [orders, setOrders] = useState(barOrders)
  const [activeTab, setActiveTab] = useState("orders")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
      )
    } catch (err) {
      setError(`Failed to update order ${orderId}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const barStats = useMemo(
    () => ({
      activeOrders: orders.filter((o) => o.status !== "ready").length,
      pourVariance: 1.2,
      revenue: 1240,
      avgServiceTime: 3.1,
    }),
    [orders],
  )

  const getElapsedTime = useCallback(
    (orderTime) => {
      return Math.floor((currentTime - orderTime) / 1000 / 60)
    },
    [currentTime],
  )

  const getStockLevel = (current, par) => {
    const percentage = (current / par) * 100
    if (percentage <= 25) return { color: "bg-red-500", status: "Critical" }
    if (percentage <= 50) return { color: "bg-yellow-500", status: "Low" }
    return { color: "bg-green-500", status: "Good" }
  }

  const getPourVarianceColor = (variance) => {
    if (Math.abs(variance) <= 1) return "text-green-600"
    if (Math.abs(variance) <= 2) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <header className="flex h-16 shrink-0 items-center gap-2 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-white" aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-white/20" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/" className="text-gray-300">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/fnb" className="text-gray-300">
                  F&B Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fnb/bar" className="text-white">
                  Bar Management
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-4 px-4">
          <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Bar Open
          </Badge>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
            <Clock className="w-3 h-3 mr-1" />
            <time dateTime={currentTime.toISOString()}>{currentTime.toLocaleTimeString()}</time>
          </Badge>
        </div>
      </header>

      <main className="p-6" role="main">
        {error && (
          <Alert className="mb-6 bg-red-900/50 border-red-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        <section aria-label="Bar Statistics" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Active Orders</p>
                  <p className="text-3xl font-bold text-white">{barStats.activeOrders}</p>
                  <p className="text-xs text-blue-300">+2 from last hour</p>
                </div>
                <Wine className="h-10 w-10 text-blue-400" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Pour Variance</p>
                  <p className="text-3xl font-bold text-yellow-400">{barStats.pourVariance}%</p>
                  <p className="text-xs text-green-300">Within target</p>
                </div>
                <Droplets className="h-10 w-10 text-yellow-400" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Bar Revenue</p>
                  <p className="text-3xl font-bold text-green-400">GH₵{barStats.revenue}</p>
                  <p className="text-xs text-green-300">+18% today</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-400" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Avg Service Time</p>
                  <p className="text-3xl font-bold text-purple-400">{barStats.avgServiceTime} min</p>
                  <p className="text-xs text-purple-300">-0.3 min target</p>
                </div>
                <Zap className="h-10 w-10 text-purple-400" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm" role="tablist">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white/20"
              role="tab"
              aria-selected={activeTab === "orders"}
            >
              Drink Orders
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-white/20"
              role="tab"
              aria-selected={activeTab === "inventory"}
            >
              Bar Inventory
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-white/20"
              role="tab"
              aria-selected={activeTab === "performance"}
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white/20"
              role="tab"
              aria-selected={activeTab === "analytics"}
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  New Orders ({orders.filter((o) => o.status === "new").length})
                </h3>
                <div className="space-y-4">
                  {orders
                    .filter((order) => order.status === "new")
                    .map((order) => (
                      <Card key={order.id} className="bg-blue-900/30 backdrop-blur-sm border-blue-400/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white">
                              {order.tableNumber} - {order.orderNumber}
                            </CardTitle>
                            <Badge className="bg-blue-600 text-white">{order.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-300">Bartender: {order.bartender}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="p-2 bg-white/10 rounded">
                                <p className="font-medium text-white">
                                  {item.quantity}x {item.name}
                                </p>
                                {item.recipe && <p className="text-xs text-gray-300">{item.recipe}</p>}
                              </div>
                            ))}
                          </div>
                          <Button
                            onClick={() => updateOrderStatus(order.id, "preparing")}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Start Mixing
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300 flex items-center">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Preparing ({orders.filter((o) => o.status === "preparing").length})
                </h3>
                <div className="space-y-4">
                  {orders
                    .filter((order) => order.status === "preparing")
                    .map((order) => {
                      const elapsed = getElapsedTime(order.orderTime)
                      return (
                        <Card key={order.id} className="bg-yellow-900/30 backdrop-blur-sm border-yellow-400/30">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-white">
                                {order.tableNumber} - {order.orderNumber}
                              </CardTitle>
                              <Badge className="bg-yellow-600 text-white">{elapsed}m</Badge>
                            </div>
                            <p className="text-sm text-gray-300">Bartender: {order.bartender}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 mb-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="p-2 bg-white/10 rounded">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium text-white">
                                      {item.quantity}x {item.name}
                                    </p>
                                    <Badge
                                      variant="outline"
                                      className={
                                        item.status === "ready"
                                          ? "border-green-400 text-green-300"
                                          : "border-yellow-400 text-yellow-300"
                                      }
                                    >
                                      {item.status}
                                    </Badge>
                                  </div>
                                  {item.recipe && <p className="text-xs text-gray-300">{item.recipe}</p>}
                                </div>
                              ))}
                            </div>
                            <Button
                              onClick={() => updateOrderStatus(order.id, "ready")}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark Ready
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-green-300 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Ready ({orders.filter((o) => o.status === "ready").length})
                </h3>
                <div className="space-y-4">
                  {orders
                    .filter((order) => order.status === "ready")
                    .map((order) => (
                      <Card key={order.id} className="bg-green-900/30 backdrop-blur-sm border-green-400/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white">
                              {order.tableNumber} - {order.orderNumber}
                            </CardTitle>
                            <Badge className="bg-green-600 text-white">READY</Badge>
                          </div>
                          <p className="text-sm text-gray-300">Bartender: {order.bartender}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="p-2 bg-white/10 rounded">
                                <p className="font-medium text-white">
                                  {item.quantity}x {item.name}
                                </p>
                              </div>
                            ))}
                          </div>
                          <Button
                            onClick={() => setOrders(orders.filter((o) => o.id !== order.id))}
                            className="w-full bg-gray-600 hover:bg-gray-700"
                          >
                            Order Served
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Bar Inventory & Pour Control
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Monitor stock levels and pour variance for all bar items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {barInventory.map((item, index) => {
                    const stockLevel = getStockLevel(item.currentStock, item.parLevel)
                    const stockPercentage = (item.currentStock / item.parLevel) * 100
                    return (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{item.name}</h4>
                            <p className="text-sm text-gray-300">{item.category}</p>
                          </div>
                          <Badge className={`${stockLevel.color} text-white`}>{stockLevel.status}</Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Stock Level</span>
                              <span className="text-white">
                                {item.currentStock}/{item.parLevel} {item.unit}
                              </span>
                            </div>
                            <Progress value={stockPercentage} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-300">Pour Cost</p>
                              <p className="font-semibold text-white">GH₵{item.pourCost}</p>
                            </div>
                            <div>
                              <p className="text-gray-300">Variance</p>
                              <p className={`font-semibold ${getPourVarianceColor(item.variance)}`}>
                                {item.variance > 0 ? "+" : ""}
                                {item.variance}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Bartender Performance
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Track individual bartender metrics and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bartenderPerformance.map((bartender, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-white">{bartender.name}</h4>
                          <p className="text-sm text-gray-300">{bartender.shift} Shift</p>
                        </div>
                        <Badge className="bg-blue-600 text-white">{bartender.efficiency}% Efficiency</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{bartender.ordersCompleted}</p>
                          <p className="text-sm text-gray-300">Orders Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{bartender.avgTime}</p>
                          <p className="text-sm text-gray-300">Avg Time</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${getPourVarianceColor(bartender.pourVariance)}`}>
                            {bartender.pourVariance > 0 ? "+" : ""}
                            {bartender.pourVariance}%
                          </p>
                          <p className="text-sm text-gray-300">Pour Variance</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Top Selling Drinks</CardTitle>
                  <CardDescription className="text-gray-300">Most popular items today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Club Beer</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-sm text-gray-300">34 sold</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Gin & Tonic</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                        <span className="text-sm text-gray-300">28 sold</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Whiskey Sour</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <span className="text-sm text-gray-300">24 sold</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trends</CardTitle>
                  <CardDescription className="text-gray-300">Bar performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        <span className="text-white">Today's Revenue</span>
                      </div>
                      <span className="font-bold text-green-400">GH₵1,240</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                        <span className="text-white">Weekly Average</span>
                      </div>
                      <span className="font-bold text-blue-400">GH₵1,050</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-5 w-5 text-red-400" />
                        <span className="text-white">Cost Variance</span>
                      </div>
                      <span className="font-bold text-red-400">-2.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
