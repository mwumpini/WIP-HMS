"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, PrinterIcon as Print, Search } from "lucide-react"
import Link from "next/link"
import { type InventoryItem, DEPARTMENTS, INVENTORY_CATEGORIES } from "@/types/inventory"

export default function StockSheet() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInventoryData()
  }, [])

  useEffect(() => {
    filterItems()
  }, [inventoryItems, searchTerm, selectedDepartment, selectedCategory])

  const loadInventoryData = () => {
    try {
      const items = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
      setInventoryItems(items)
    } catch (error) {
      console.error("Error loading inventory data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = inventoryItems

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter((item) => item.department === selectedDepartment)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }

  const exportToCSV = () => {
    const headers = [
      "SKU",
      "Item Name",
      "Category",
      "Department",
      "Current Stock",
      "Unit",
      "Unit Cost",
      "Total Value",
      "Min Stock",
      "Reorder Point",
      "Status",
      "Last Restocked",
    ]

    const csvData = filteredItems.map((item) => [
      item.sku,
      item.name,
      item.category,
      item.department,
      item.currentStock,
      item.unit,
      item.costPrice.toFixed(2),
      (item.currentStock * item.costPrice).toFixed(2),
      item.minStock,
      item.reorderPoint,
      item.currentStock === 0 ? "Out of Stock" : item.currentStock <= item.reorderPoint ? "Low Stock" : "In Stock",
      new Date(item.lastRestocked).toLocaleDateString(),
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `stock-sheet-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const printSheet = () => {
    window.print()
  }

  const totalItems = filteredItems.length
  const totalValue = filteredItems.reduce((sum, item) => sum + item.currentStock * item.costPrice, 0)
  const lowStockItems = filteredItems.filter((item) => item.currentStock <= item.reorderPoint).length
  const outOfStockItems = filteredItems.filter((item) => item.currentStock === 0).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/inventory">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stock Sheet</h1>
            <p className="text-muted-foreground">Complete inventory listing with current stock levels</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={printSheet}>
            <Print className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Items in current view</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current stock value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items need reordering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Items unavailable</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items, SKU, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
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
        </CardContent>
      </Card>

      {/* Stock Sheet Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Sheet</CardTitle>
          <CardDescription>
            Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">Min Stock</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.description && <div className="text-sm text-muted-foreground">{item.description}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell className="text-right font-medium">{item.currentStock}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">₵{item.costPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">
                    ₵{(item.currentStock * item.costPrice).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">{item.minStock}</TableCell>
                  <TableCell className="text-right">{item.reorderPoint}</TableCell>
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
                  <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No items found matching your criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
