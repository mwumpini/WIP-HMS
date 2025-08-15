"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Save, Trash2, ArrowLeft, Upload, Copy, Zap, Package } from "lucide-react"
import Link from "next/link"
import { type InventoryItem, type StockMovement, DEPARTMENTS } from "@/types/inventory"

interface StockEntryItem {
  itemId: string
  itemName: string
  quantity: number
  unitCost: number
  totalCost: number
  batchNumber?: string
  expiryDate?: string
  supplier?: string
}

interface SupplierEntry {
  supplier: string
  reference: string
  items: StockEntryItem[]
}

export default function StockEntry() {
  const { toast } = useToast()
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [supplierEntries, setSupplierEntries] = useState<SupplierEntry[]>([])
  const [activeSupplier, setActiveSupplier] = useState<string>("")
  const [formData, setFormData] = useState({
    department: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const [bulkText, setBulkText] = useState("")

  const commonSuppliers = [
    "Nestle Ghana Ltd",
    "Unilever Ghana Ltd",
    "Coca-Cola Bottling Company",
    "Guinness Ghana Breweries",
    "Fan Milk Ltd",
    "Kasapreko Company Ltd",
    "Blue Skies Holdings",
    "Tropical Cable & Conductor Ltd",
  ]

  const quickQuantities = [1, 5, 10, 25, 50, 100, 200, 500]

  useEffect(() => {
    loadInventoryItems()
    if (supplierEntries.length === 0) {
      addSupplierEntry()
    }
  }, [])

  const loadInventoryItems = () => {
    try {
      const items = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
      setInventoryItems(items)
    } catch (error) {
      console.error("Error loading inventory items:", error)
    }
  }

  const addSupplierEntry = () => {
    const newSupplier = `Supplier ${supplierEntries.length + 1}`
    const newEntry: SupplierEntry = {
      supplier: newSupplier,
      reference: `REF-${Date.now()}`,
      items: [],
    }
    setSupplierEntries([...supplierEntries, newEntry])
    setActiveSupplier(newSupplier)
  }

  const updateSupplierInfo = (index: number, field: "supplier" | "reference", value: string) => {
    const updated = [...supplierEntries]
    const oldSupplier = updated[index].supplier
    updated[index][field] = value

    if (field === "supplier" && activeSupplier === oldSupplier) {
      setActiveSupplier(value)
    }

    setSupplierEntries(updated)
  }

  const removeSupplierEntry = (index: number) => {
    const updated = supplierEntries.filter((_, i) => i !== index)
    setSupplierEntries(updated)
    if (updated.length > 0 && activeSupplier === supplierEntries[index].supplier) {
      setActiveSupplier(updated[0].supplier)
    }
  }

  const addItemToSupplier = (supplierName: string) => {
    const updated = [...supplierEntries]
    const supplierIndex = updated.findIndex((s) => s.supplier === supplierName)
    if (supplierIndex !== -1) {
      updated[supplierIndex].items.push({
        itemId: "",
        itemName: "",
        quantity: 0,
        unitCost: 0,
        totalCost: 0,
        batchNumber: "",
        expiryDate: "",
        supplier: supplierName,
      })
      setSupplierEntries(updated)
    }
  }

  const bulkAddItems = (supplierName: string, count = 5) => {
    const updated = [...supplierEntries]
    const supplierIndex = updated.findIndex((s) => s.supplier === supplierName)
    if (supplierIndex !== -1) {
      for (let i = 0; i < count; i++) {
        updated[supplierIndex].items.push({
          itemId: "",
          itemName: "",
          quantity: 0,
          unitCost: 0,
          totalCost: 0,
          batchNumber: "",
          expiryDate: "",
          supplier: supplierName,
        })
      }
      setSupplierEntries(updated)
      toast({
        title: "Items Added",
        description: `Added ${count} empty rows for ${supplierName}`,
      })
    }
  }

  const updateSupplierItem = (supplierName: string, itemIndex: number, field: keyof StockEntryItem, value: any) => {
    const updated = [...supplierEntries]
    const supplierIndex = updated.findIndex((s) => s.supplier === supplierName)

    if (supplierIndex !== -1) {
      updated[supplierIndex].items[itemIndex] = {
        ...updated[supplierIndex].items[itemIndex],
        [field]: value,
      }

      if (field === "itemId") {
        const selectedItem = inventoryItems.find((item) => item.id === value)
        if (selectedItem) {
          updated[supplierIndex].items[itemIndex].itemName = selectedItem.name
          updated[supplierIndex].items[itemIndex].unitCost = selectedItem.costPrice
        }
      }

      if (field === "quantity" || field === "unitCost") {
        const item = updated[supplierIndex].items[itemIndex]
        updated[supplierIndex].items[itemIndex].totalCost = item.quantity * item.unitCost
      }

      setSupplierEntries(updated)
    }
  }

  const removeSupplierItem = (supplierName: string, itemIndex: number) => {
    const updated = [...supplierEntries]
    const supplierIndex = updated.findIndex((s) => s.supplier === supplierName)
    if (supplierIndex !== -1) {
      updated[supplierIndex].items = updated[supplierIndex].items.filter((_, i) => i !== itemIndex)
      setSupplierEntries(updated)
    }
  }

  const duplicateItem = (supplierName: string, itemIndex: number) => {
    const updated = [...supplierEntries]
    const supplierIndex = updated.findIndex((s) => s.supplier === supplierName)
    if (supplierIndex !== -1) {
      const itemToDuplicate = { ...updated[supplierIndex].items[itemIndex] }
      updated[supplierIndex].items.splice(itemIndex + 1, 0, itemToDuplicate)
      setSupplierEntries(updated)
      toast({
        title: "Item Duplicated",
        description: "Item copied successfully",
      })
    }
  }

  const processBulkText = () => {
    if (!bulkText.trim() || !activeSupplier) return

    const lines = bulkText.trim().split("\n")
    const updated = [...supplierEntries]
    const supplierIndex = updated.findIndex((s) => s.supplier === activeSupplier)

    if (supplierIndex !== -1) {
      lines.forEach((line) => {
        const parts = line.split(",").map((p) => p.trim())
        if (parts.length >= 3) {
          const [itemName, quantity, unitCost, batchNumber = "", expiryDate = ""] = parts
          const matchingItem = inventoryItems.find(
            (item) =>
              item.name.toLowerCase().includes(itemName.toLowerCase()) ||
              item.sku.toLowerCase().includes(itemName.toLowerCase()),
          )

          updated[supplierIndex].items.push({
            itemId: matchingItem?.id || "",
            itemName: matchingItem?.name || itemName,
            quantity: Number.parseFloat(quantity) || 0,
            unitCost: Number.parseFloat(unitCost) || 0,
            totalCost: (Number.parseFloat(quantity) || 0) * (Number.parseFloat(unitCost) || 0),
            batchNumber,
            expiryDate,
            supplier: activeSupplier,
          })
        }
      })

      setSupplierEntries(updated)
      setBulkText("")
      toast({
        title: "Bulk Import Complete",
        description: `Processed ${lines.length} items for ${activeSupplier}`,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allItems = supplierEntries.flatMap((entry) => entry.items)

    if (allItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const updatedInventoryItems = [...inventoryItems]
      const stockMovements: StockMovement[] = []

      supplierEntries.forEach((supplierEntry) => {
        supplierEntry.items.forEach((entryItem) => {
          const itemIndex = updatedInventoryItems.findIndex((item) => item.id === entryItem.itemId)
          if (itemIndex !== -1) {
            updatedInventoryItems[itemIndex].currentStock += entryItem.quantity
            updatedInventoryItems[itemIndex].lastRestocked = new Date().toISOString()
            updatedInventoryItems[itemIndex].updatedAt = new Date().toISOString()

            stockMovements.push({
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              itemId: entryItem.itemId,
              itemName: entryItem.itemName,
              type: "in",
              quantity: entryItem.quantity,
              unitCost: entryItem.unitCost,
              totalCost: entryItem.totalCost,
              department: formData.department,
              reference: supplierEntry.reference,
              reason: `Stock entry - ${supplierEntry.supplier}`,
              performedBy: "Current User",
              date: new Date().toISOString(),
              batchNumber: entryItem.batchNumber,
              expiryDate: entryItem.expiryDate,
            })
          }
        })
      })

      localStorage.setItem("inventoryItems", JSON.stringify(updatedInventoryItems))
      const existingMovements = JSON.parse(localStorage.getItem("stockMovements") || "[]")
      const updatedMovements = [...existingMovements, ...stockMovements]
      localStorage.setItem("stockMovements", JSON.stringify(updatedMovements))

      toast({
        title: "Success",
        description: `Processed ${allItems.length} items from ${supplierEntries.length} suppliers`,
      })

      // Reset form
      setSupplierEntries([])
      setFormData({ department: "", notes: "" })
      addSupplierEntry()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process stock entry",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const totalValue = supplierEntries.reduce(
    (sum, entry) => sum + entry.items.reduce((entrySum, item) => entrySum + item.totalCost, 0),
    0,
  )

  const totalItems = supplierEntries.reduce((sum, entry) => sum + entry.items.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/inventory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Bulk Stock Entry</h1>
          <p className="text-muted-foreground">Process multiple deliveries from different suppliers efficiently</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{supplierEntries.length} Suppliers</Badge>
          <Badge variant="secondary">{totalItems} Items</Badge>
          <Badge variant="secondary">₵{totalValue.toFixed(2)}</Badge>
        </div>
      </div>

      <Tabs defaultValue="entry" className="space-y-6">
        <TabsList>
          <TabsTrigger value="entry">Multi-Supplier Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
          <TabsTrigger value="templates">Quick Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="entry" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Entry Details</CardTitle>
                <CardDescription>General information for this stock entry session</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Session Notes</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="e.g., Morning delivery batch"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Suppliers & Items</CardTitle>
                    <CardDescription>Manage multiple supplier deliveries</CardDescription>
                  </div>
                  <Button type="button" onClick={addSupplierEntry}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Supplier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeSupplier} onValueChange={setActiveSupplier}>
                  <TabsList className="grid w-full grid-cols-auto">
                    {supplierEntries.map((entry, index) => (
                      <TabsTrigger key={entry.supplier} value={entry.supplier} className="relative">
                        {entry.supplier}
                        {entry.items.length > 0 && (
                          <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                            {entry.items.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {supplierEntries.map((entry, supplierIndex) => (
                    <TabsContent key={entry.supplier} value={entry.supplier} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label>Supplier Name</Label>
                          <Select
                            value={entry.supplier}
                            onValueChange={(value) => updateSupplierInfo(supplierIndex, "supplier", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {commonSuppliers.map((supplier) => (
                                <SelectItem key={supplier} value={supplier}>
                                  {supplier}
                                </SelectItem>
                              ))}
                              <SelectItem value={`Custom-${Date.now()}`}>+ Add Custom Supplier</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Reference Number</Label>
                          <Input
                            value={entry.reference}
                            onChange={(e) => updateSupplierInfo(supplierIndex, "reference", e.target.value)}
                            placeholder="PO/Invoice number"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <Button type="button" variant="outline" onClick={() => addItemToSupplier(entry.supplier)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                          <Button type="button" variant="outline" onClick={() => bulkAddItems(entry.supplier, 5)}>
                            <Zap className="mr-2 h-4 w-4" />
                            +5 Items
                          </Button>
                          {supplierEntries.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeSupplierEntry(supplierIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {entry.items.length > 0 ? (
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Unit Cost</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead>Expiry</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {entry.items.map((item, itemIndex) => (
                                <TableRow key={itemIndex}>
                                  <TableCell>
                                    <Select
                                      value={item.itemId}
                                      onValueChange={(value) =>
                                        updateSupplierItem(entry.supplier, itemIndex, "itemId", value)
                                      }
                                    >
                                      <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Select item" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {inventoryItems.map((invItem) => (
                                          <SelectItem key={invItem.id} value={invItem.id}>
                                            {invItem.name} ({invItem.sku})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-1">
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={item.quantity}
                                        onChange={(e) =>
                                          updateSupplierItem(
                                            entry.supplier,
                                            itemIndex,
                                            "quantity",
                                            Number.parseFloat(e.target.value) || 0,
                                          )
                                        }
                                        className="w-20"
                                      />
                                      <div className="flex flex-col gap-1">
                                        {quickQuantities.slice(0, 4).map((qty) => (
                                          <Button
                                            key={qty}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-6 w-8 p-0 text-xs bg-transparent"
                                            onClick={() =>
                                              updateSupplierItem(entry.supplier, itemIndex, "quantity", qty)
                                            }
                                          >
                                            {qty}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={item.unitCost}
                                      onChange={(e) =>
                                        updateSupplierItem(
                                          entry.supplier,
                                          itemIndex,
                                          "unitCost",
                                          Number.parseFloat(e.target.value) || 0,
                                        )
                                      }
                                      className="w-24"
                                    />
                                  </TableCell>
                                  <TableCell>₵{item.totalCost.toFixed(2)}</TableCell>
                                  <TableCell>
                                    <Input
                                      value={item.batchNumber || ""}
                                      onChange={(e) =>
                                        updateSupplierItem(entry.supplier, itemIndex, "batchNumber", e.target.value)
                                      }
                                      className="w-20"
                                      placeholder="Batch"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      type="date"
                                      value={item.expiryDate || ""}
                                      onChange={(e) =>
                                        updateSupplierItem(entry.supplier, itemIndex, "expiryDate", e.target.value)
                                      }
                                      className="w-32"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-1">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => duplicateItem(entry.supplier, itemIndex)}
                                        className="h-8 w-8"
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeSupplierItem(entry.supplier, itemIndex)}
                                        className="h-8 w-8"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground border rounded-lg">
                          No items added for {entry.supplier}. Click "Add Item" to get started.
                        </div>
                      )}

                      {entry.items.length > 0 && (
                        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">
                            {entry.items.length} items from {entry.supplier}
                          </div>
                          <div className="text-lg font-semibold">
                            Subtotal: ₵{entry.items.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                Grand Total: ₵{totalValue.toFixed(2)} ({totalItems} items)
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/inventory">Cancel</Link>
                </Button>
                <Button type="submit" disabled={loading || totalItems === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Processing..." : `Process All Entries`}
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Import</CardTitle>
              <CardDescription>
                Paste or type multiple items at once. Format: Item Name, Quantity, Unit Cost, Batch, Expiry (one per
                line)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Supplier for Bulk Import</Label>
                <Select value={activeSupplier} onValueChange={setActiveSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {supplierEntries.map((entry) => (
                      <SelectItem key={entry.supplier} value={entry.supplier}>
                        {entry.supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bulk Data</Label>
                <Textarea
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="Rice 25kg, 50, 45.00, BATCH001, 2024-12-31&#10;Cooking Oil 5L, 20, 25.50, BATCH002, 2024-11-30&#10;Sugar 1kg, 100, 8.75"
                  rows={10}
                />
              </div>
              <div className="flex gap-4">
                <Button type="button" onClick={processBulkText} disabled={!bulkText.trim() || !activeSupplier}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Items
                </Button>
                <Button type="button" variant="outline" onClick={() => setBulkText("")}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>Pre-configured templates for common supplier deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {commonSuppliers.map((supplier) => (
                  <Card key={supplier} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4" />
                      <h4 className="font-medium">{supplier}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Quick setup for {supplier} delivery</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const exists = supplierEntries.find((s) => s.supplier === supplier)
                        if (!exists) {
                          const newEntry: SupplierEntry = {
                            supplier,
                            reference: `${supplier.split(" ")[0].toUpperCase()}-${Date.now()}`,
                            items: [],
                          }
                          setSupplierEntries([...supplierEntries, newEntry])
                          setActiveSupplier(supplier)
                          toast({
                            title: "Template Added",
                            description: `${supplier} template ready for items`,
                          })
                        } else {
                          setActiveSupplier(supplier)
                        }
                      }}
                    >
                      Use Template
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
