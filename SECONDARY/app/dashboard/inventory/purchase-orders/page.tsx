"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Download, Eye } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { type InventoryItem, DEPARTMENTS } from "@/types/inventory"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  paymentTerms: string
  category: string
}

interface PurchaseOrder {
  id: string
  poNumber: string
  supplierId: string
  supplierName: string
  department: string
  items: POItem[]
  subtotal: number
  tax: number
  total: number
  status: "draft" | "sent" | "confirmed" | "received" | "cancelled"
  orderDate: string
  expectedDelivery?: string
  actualDelivery?: string
  notes?: string
  createdBy: string
}

interface POItem {
  itemId?: string
  itemName: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

export default function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [showNewPO, setShowNewPO] = useState(false)
  const [newPO, setNewPO] = useState<Partial<PurchaseOrder>>({
    department: "",
    supplierId: "",
    items: [],
    status: "draft",
    orderDate: new Date().toISOString(),
    createdBy: "Current User",
  })
  const [newItem, setNewItem] = useState<Partial<POItem>>({})
  const [expectedDelivery, setExpectedDelivery] = useState<Date>()
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedPOs = JSON.parse(localStorage.getItem("purchaseOrders") || "[]")
    const savedSuppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
    setPurchaseOrders(savedPOs)
    setSuppliers(savedSuppliers)
    setInventoryItems(savedItems)
  }

  const generatePONumber = () => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const sequence = (purchaseOrders.length + 1).toString().padStart(4, "0")
    return `PO${year}${month}${sequence}`
  }

  const addItemToPO = () => {
    if (!newItem.itemName || !newItem.quantity || !newItem.unitPrice) {
      toast({
        title: "Incomplete Item",
        description: "Please fill all item details",
        variant: "destructive",
      })
      return
    }

    const item: POItem = {
      itemName: newItem.itemName,
      description: newItem.description || "",
      quantity: newItem.quantity,
      unit: newItem.unit || "pcs",
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice,
    }

    setNewPO((prev) => ({
      ...prev,
      items: [...(prev.items || []), item],
    }))

    setNewItem({})
  }

  const removeItemFromPO = (index: number) => {
    setNewPO((prev) => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index) || [],
    }))
  }

  const calculateTotals = () => {
    const subtotal = newPO.items?.reduce((sum, item) => sum + item.total, 0) || 0
    const tax = subtotal * 0.125 // 12.5% VAT
    const total = subtotal + tax
    return { subtotal, tax, total }
  }

  const savePurchaseOrder = () => {
    if (!newPO.supplierId || !newPO.department || !newPO.items?.length) {
      toast({
        title: "Incomplete Purchase Order",
        description: "Please fill all required fields and add items",
        variant: "destructive",
      })
      return
    }

    const supplier = suppliers.find((s) => s.id === newPO.supplierId)
    const { subtotal, tax, total } = calculateTotals()

    const purchaseOrder: PurchaseOrder = {
      id: Date.now().toString(),
      poNumber: generatePONumber(),
      supplierId: newPO.supplierId,
      supplierName: supplier?.name || "",
      department: newPO.department,
      items: newPO.items,
      subtotal,
      tax,
      total,
      status: "draft",
      orderDate: new Date().toISOString(),
      expectedDelivery: expectedDelivery?.toISOString(),
      notes: newPO.notes,
      createdBy: "Current User",
    }

    const updatedPOs = [...purchaseOrders, purchaseOrder]
    setPurchaseOrders(updatedPOs)
    localStorage.setItem("purchaseOrders", JSON.stringify(updatedPOs))

    toast({
      title: "Purchase Order Created",
      description: `PO ${purchaseOrder.poNumber} has been created`,
    })

    setShowNewPO(false)
    setNewPO({
      department: "",
      supplierId: "",
      items: [],
      status: "draft",
      orderDate: new Date().toISOString(),
      createdBy: "Current User",
    })
    setExpectedDelivery(undefined)
  }

  const updatePOStatus = (poId: string, status: PurchaseOrder["status"]) => {
    const updatedPOs = purchaseOrders.map((po) => {
      if (po.id === poId) {
        const updates: Partial<PurchaseOrder> = { status }
        if (status === "received") {
          updates.actualDelivery = new Date().toISOString()
        }
        return { ...po, ...updates }
      }
      return po
    })

    setPurchaseOrders(updatedPOs)
    localStorage.setItem("purchaseOrders", JSON.stringify(updatedPOs))

    toast({
      title: "Status Updated",
      description: `Purchase order status updated to ${status}`,
    })
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage procurement and supplier orders</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowNewPO(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* New Purchase Order Form */}
      {showNewPO && (
        <Card>
          <CardHeader>
            <CardTitle>Create Purchase Order</CardTitle>
            <CardDescription>Create a new purchase order for suppliers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  value={newPO.supplierId}
                  onValueChange={(value) => setNewPO((prev) => ({ ...prev, supplierId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newPO.department}
                  onValueChange={(value) => setNewPO((prev) => ({ ...prev, department: value }))}
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
            </div>

            <div>
              <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expectedDelivery ? format(expectedDelivery, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={expectedDelivery} onSelect={setExpectedDelivery} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Add Items Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add Items</h3>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    value={newItem.itemName || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, itemName: e.target.value }))}
                    placeholder="Item name"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    value={newItem.quantity || ""}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="Qty"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    value={newItem.unit || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, unit: e.target.value }))}
                    placeholder="pcs, kg, ltr"
                  />
                </div>
                <div>
                  <Label htmlFor="unitPrice">Unit Price (₵)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newItem.unitPrice || ""}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, unitPrice: Number.parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addItemToPO}>Add Item</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Item description or specifications"
                />
              </div>
            </div>

            {/* Items Table */}
            {newPO.items && newPO.items.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newPO.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>₵{item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>₵{item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="destructive" size="sm" onClick={() => removeItemFromPO(index)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 space-y-2 text-right">
                  <div className="flex justify-end gap-4">
                    <span>Subtotal:</span>
                    <span>₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-end gap-4">
                    <span>VAT (12.5%):</span>
                    <span>₵{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-end gap-4 font-bold text-lg">
                    <span>Total:</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                value={newPO.notes || ""}
                onChange={(e) => setNewPO((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes or special instructions..."
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={savePurchaseOrder}>Create Purchase Order</Button>
              <Button variant="outline" onClick={() => setShowNewPO(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>All purchase orders and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-mono">{po.poNumber}</TableCell>
                  <TableCell>{po.supplierName}</TableCell>
                  <TableCell>{po.department}</TableCell>
                  <TableCell>₵{po.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        po.status === "received"
                          ? "default"
                          : po.status === "confirmed"
                            ? "secondary"
                            : po.status === "sent"
                              ? "outline"
                              : po.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                      }
                    >
                      {po.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(po.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {po.expectedDelivery ? new Date(po.expectedDelivery).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {po.status === "draft" && (
                        <Button size="sm" onClick={() => updatePOStatus(po.id, "sent")}>
                          Send
                        </Button>
                      )}
                      {po.status === "sent" && (
                        <Button size="sm" onClick={() => updatePOStatus(po.id, "confirmed")}>
                          Confirm
                        </Button>
                      )}
                      {po.status === "confirmed" && (
                        <Button size="sm" onClick={() => updatePOStatus(po.id, "received")}>
                          Receive
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
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
    </div>
  )
}
