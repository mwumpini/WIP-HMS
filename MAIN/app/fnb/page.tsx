"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChefHat,
  Utensils,
  Wine,
  ClipboardList,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Timer,
  ShoppingCart,
  Calendar,
  Eye,
  TrendingUp,
  Bell,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

export default function FnBDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [liveMetrics, setLiveMetrics] = useState({
    revenue: 2450,
    activeOrders: 18,
    tablesOccupied: 24,
    avgOrderTime: 18,
    kitchenOrders: 12,
    barOrders: 6,
    criticalInventory: 3,
    staffOnDuty: 12,
  })

  const [notifications, setNotifications] = useState([
    { id: 1, type: "urgent", message: "Table 7 order overdue by 10 minutes", time: "2 min ago" },
    { id: 2, type: "inventory", message: "Chicken breast critically low", time: "5 min ago" },
    { id: 3, type: "success", message: "Kitchen efficiency up 15% today", time: "10 min ago" },
  ])

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data")
        setIsLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  const updateMetrics = useCallback(() => {
    setCurrentTime(new Date())
    setLiveMetrics((prev) => ({
      ...prev,
      revenue: prev.revenue + Math.floor(Math.random() * 50),
      activeOrders: Math.max(10, prev.activeOrders + Math.floor(Math.random() * 3) - 1),
      avgOrderTime: Math.max(12, prev.avgOrderTime + Math.floor(Math.random() * 3) - 1),
    }))
  }, [])

  useEffect(() => {
    const timer = setInterval(updateMetrics, 30000)
    return () => clearInterval(timer)
  }, [updateMetrics])

  const dashboardStats = useMemo(
    () => ({
      occupancyRate: Math.round((liveMetrics.tablesOccupied / 35) * 100),
      revenueGrowth: 12,
      efficiencyImprovement: -3,
    }),
    [liveMetrics.tablesOccupied],
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading F&B Dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
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
              <BreadcrumbItem>
                <BreadcrumbLink href="/fnb">F&B Management</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-3 px-4">
          <Button variant="outline" size="sm" className="relative bg-transparent" aria-label="Notifications">
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
                {notifications.length}
              </Badge>
            )}
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Online
          </Badge>
          <Badge variant="outline" className="hidden sm:flex">
            <Timer className="w-3 h-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8" role="main">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Food & Beverage Operations</h1>
              <p className="text-sm sm:text-base text-gray-600">Real-time restaurant and bar management dashboard</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Restaurant Open
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Wine className="w-3 h-3 mr-1" />
                Bar Open
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Zap className="w-3 h-3 mr-1" />
                Peak Hours
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Card className="relative overflow-hidden" role="region" aria-labelledby="revenue-metric">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p id="revenue-metric" className="text-xs sm:text-sm font-medium text-gray-600">
                      Today's Revenue
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900" aria-live="polite">
                      GH₵{liveMetrics.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />+{dashboardStats.revenueGrowth}% vs
                      yesterday
                    </div>
                  </div>
                  <div
                    className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-200" aria-hidden="true">
                  <div className="h-full w-3/4 bg-green-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active Orders</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.activeOrders}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Kitchen: {liveMetrics.kitchenOrders}, Bar: {liveMetrics.barOrders}
                    </p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
                  <div className="h-full w-2/3 bg-blue-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Tables Occupied</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.tablesOccupied}/35</p>
                    <p className="text-xs text-orange-600 mt-1">
                      {Math.round((liveMetrics.tablesOccupied / 35) * 100)}% occupancy
                    </p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-200">
                  <div className="h-full w-4/5 bg-orange-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Order Time</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{liveMetrics.avgOrderTime} min</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {dashboardStats.efficiencyImprovement} min from target
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-200">
                  <div className="h-full w-1/2 bg-purple-500 transition-all duration-500"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm">One-click operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/fnb/pos">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Open POS Terminal
                </Button>
              </Link>
              <Link href="/fnb/kitchen">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <ChefHat className="mr-2 h-4 w-4" />
                  Kitchen Display
                </Button>
              </Link>
              <Link href="/fnb/bar">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Wine className="mr-2 h-4 w-4" />
                  Bar Management
                </Button>
              </Link>
              <Link href="/fnb/inventory">
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Check Inventory
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">F&B Management Modules</CardTitle>
              <CardDescription className="text-sm">Access all restaurant and bar management features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <Link
                  href="/fnb/pos"
                  className="flex flex-col items-center p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Restaurant POS</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Order Management</span>
                </Link>

                <Link
                  href="/fnb/kitchen"
                  className="flex flex-col items-center p-3 sm:p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Kitchen Display</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Order Preparation</span>
                </Link>

                <Link
                  href="/fnb/bar"
                  className="flex flex-col items-center p-3 sm:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Wine className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Bar Management</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Drinks & Inventory</span>
                </Link>

                <Link
                  href="/fnb/menu"
                  className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Menu & Recipes</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Menu Engineering</span>
                </Link>

                <Link
                  href="/fnb/inventory"
                  className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Package className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Inventory</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Stock Management</span>
                </Link>

                <Link
                  href="/reports/fnb"
                  className="flex flex-col items-center p-3 sm:p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">Analytics</span>
                  <span className="text-xs text-gray-500 hidden sm:block">Reports & Insights</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <ChefHat className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Kitchen Orders
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.kitchenOrders} Active
                </Badge>
              </div>
              <CardDescription className="text-sm">Live order preparation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Table 7 - Order #1234</p>
                    <p className="text-xs text-red-700 truncate">Jollof Rice, Grilled Chicken</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="destructive" className="mb-1 text-xs">
                      Urgent
                    </Badge>
                    <p className="text-xs text-red-600">25 min</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Table 12 - Order #1235</p>
                    <p className="text-xs text-yellow-700 truncate">Banku, Tilapia, Pepper Sauce</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-yellow-300 text-xs">
                      Preparing
                    </Badge>
                    <p className="text-xs text-yellow-600">12 min</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Table 3 - Order #1236</p>
                    <p className="text-xs text-green-700 truncate">Waakye, Beef Stew</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Ready
                    </Badge>
                    <p className="text-xs text-green-600">Just now</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/fnb/kitchen">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Kitchen Display
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Wine className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Bar Orders
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {liveMetrics.barOrders} Active
                </Badge>
              </div>
              <CardDescription className="text-sm">Live drink preparation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-purple-900 text-sm">Table 15 - Order #B001</p>
                    <p className="text-xs text-purple-700 truncate">2x Club Beer, 1x Cocktail</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-purple-300 text-xs">
                      Mixing
                    </Badge>
                    <p className="text-xs text-purple-600">3 min</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Table 8 - Order #B002</p>
                    <p className="text-xs text-blue-700 truncate">Wine Selection, Whiskey</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-blue-300 text-xs">
                      Preparing
                    </Badge>
                    <p className="text-xs text-blue-600">5 min</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Table 22 - Order #B003</p>
                    <p className="text-xs text-green-700 truncate">Fresh Juice, Soft Drinks</p>
                  </div>
                  <div className="text-right ml-2">
                    <Badge variant="outline" className="mb-1 border-green-300 text-xs">
                      Ready
                    </Badge>
                    <p className="text-xs text-green-600">Just now</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/fnb/bar">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Wine className="mr-2 h-4 w-4" />
                    View Bar Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Smart Alerts
              </CardTitle>
              <CardDescription className="text-sm">AI-powered operational insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-red-900 text-sm">Chicken Breast - Critical Stock</p>
                    <p className="text-xs text-red-700">Only 2kg remaining. Auto-reorder triggered.</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Critical
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-yellow-900 text-sm">Peak Hour Efficiency</p>
                    <p className="text-xs text-yellow-700">Kitchen prep time 20% above target during rush.</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-300 text-xs">
                    Optimize
                  </Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Revenue Milestone</p>
                    <p className="text-xs text-green-700">Daily target achieved 2 hours early!</p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-xs">
                    Success
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/fnb/inventory">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Package className="mr-2 h-4 w-4" />
                    Manage Inventory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Staff Performance
              </CardTitle>
              <CardDescription className="text-sm">Real-time team efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900 text-sm">Kitchen Team</p>
                    <p className="text-xs text-green-700">4 active, avg prep time: 16 min</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-green-300 text-xs mb-1">
                      Excellent
                    </Badge>
                    <p className="text-xs text-green-600">+15% efficiency</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm">Service Team</p>
                    <p className="text-xs text-blue-700">6 active, avg table time: 45 min</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-300 text-xs mb-1">
                      Good
                    </Badge>
                    <p className="text-xs text-blue-600">On target</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-purple-900 text-sm">Bar Team</p>
                    <p className="text-xs text-purple-700">2 active, avg drink time: 4 min</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-purple-300 text-xs mb-1">
                      Optimal
                    </Badge>
                    <p className="text-xs text-purple-600">Peak performance</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/fnb/staff">
                  <Button variant="outline" className="w-full bg-transparent text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Staff Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
</merged_code>
