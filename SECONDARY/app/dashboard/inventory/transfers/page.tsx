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
import { ArrowRight, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type InventoryItem, DEPARTMENTS } from "@/types/inventory"

interface StockTransfer {
  id: string
  transferNumber: string
  fromDepartment: string
  toDepartment: string
  items: TransferItem[]
  requestedBy: string
  approvedBy?: string
  status: "pending" | "approved" | "completed" | "rejected"
  requestDate: string
  completedDate?: string
  notes?: string
}

interface TransferItem {
  itemId: string
  itemName: string
  sku: string
  requestedQuantity: number
  approvedQuantity?: number
  unit: string
  costPrice: number
}

export default function StockTransfers() {
  const [transfers, setTransfers] = useState<StockTransfer[]>([])
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [showNewTransfer, setShowNewTransfer] = useState(false)
  const [newTransfer, setNewTransfer] = useState<Partial<StockTransfer>>({
    fromDepartment: "",
    toDepartment: "",
    items: [],
    requestedBy: "Current User",
    status: "pending",
    requestDate: new Date().toISOString(),
  })
  const [selectedItem, setSelectedItem] = useState("")
  const [transferQuantity, setTransferQuantity] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedTransfers = JSON.parse(localStorage.getItem("stockTransfers") || "[]")
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
    setTransfers(savedTransfers)
    setInventoryItems(savedItems)
  }

  const generateTransferNumber = () => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const sequence = (transfers.length + 1).toString().padStart(3, "0")
    return `ST${year}${month}${day}${sequence}`
  }

  const addItemToTransfer = () => {
    if (!selectedItem || !transferQuantity || !newTransfer.fromDepartment) return

    const item = inventoryItems.find((i) => i.id === selectedItem)
    if (!item) return

    const quantity = Number.parseInt(transferQuantity)
    if (quantity <= 0 || quantity > item.currentStock) {
      toast({
        title: "Invalid Quantity",
        description: `Available stock: ${item.currentStock} ${item.unit}`,
        variant: "destructive",
      })
      return
    }

    const transferItem: TransferItem = {
      itemId: item.id,
      itemName: item.name,
      sku: item.sku,
      requestedQuantity: quantity,
      unit: item.unit,
      costPrice: item.costPrice,
    }

    setNewTransfer((prev) => ({
      ...prev,
      items: [...(prev.items || []), transferItem],
    }))

    setSelectedItem("")
    setTransferQuantity("")
  }

  const removeItemFromTransfer = (index: number) => {
    setNewTransfer((prev) => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index) || [],
    }))
  }

  const saveTransfer = () => {
    if (!newTransfer.fromDepartment || !newTransfer.toDepartment || !newTransfer.items?.length) {
      toast({
        title: "Incomplete Transfer",
        description: "Please fill all required fields and add items",
        variant: "destructive",
      })
      return
    }

    const transfer: StockTransfer = {
      id: Date.now().toString(),
      transferNumber: generateTransferNumber(),
      fromDepartment: newTransfer.fromDepartment,
      toDepartment: newTransfer.toDepartment,
      items: newTransfer.items,
      requestedBy: newTransfer.requestedBy || "Current User",
      status: "pending",
      requestDate: new Date().toISOString(),
      notes: newTransfer.notes,
    }

    const updatedTransfers = [...transfers, transfer]
    setTransfers(updatedTransfers)
    localStorage.setItem("stockTransfers", JSON.stringify(updatedTransfers))

    toast({
      title: "Transfer Created",
      description: `Transfer ${transfer.transferNumber} has been created`,
    })

    setShowNewTransfer(false)
    setNewTransfer({
      fromDepartment: "",
      toDepartment: "",
      items: [],
      requestedBy: "Current User",
      status: "pending",
      requestDate: new Date().toISOString(),
    })
  }

  const approveTransfer = (transferId: string) => {
    const updatedTransfers = transfers.map((transfer) => {
      if (transfer.id === transferId) {
        return {
          ...transfer,
          status: "approved" as const,
          approvedBy: "Current User",
          items: transfer.items.map((item) => ({
            ...item,
            approvedQuantity: item.requestedQuantity,
          })),
        }
      }
      return transfer
    })

    setTransfers(updatedTransfers)
    localStorage.setItem("stockTransfers", JSON.stringify(updatedTransfers))

    toast({
      title: "Transfer Approved",
      description: "Stock transfer has been approved",
    })
  }

  const completeTransfer = (transferId: string) => {
    const transfer = transfers.find((t) => t.id === transferId)
    if (!transfer) return

    // Update inventory levels
    const updatedItems = inventoryItems.map((item) => {
      const transferItem = transfer.items.find((ti) => ti.itemId === item.id)
      if (transferItem) {
        return {
          ...item,
          currentStock: item.currentStock - (transferItem.approvedQuantity || transferItem.requestedQuantity),
        }
      }
      return item
    })

    setInventoryItems(updatedItems)
    localStorage.setItem("inventoryItems", JSON.stringify(updatedItems))

    // Update transfer status
    const updatedTransfers = transfers.map((t) => {
      if (t.id === transferId) {
        return {
          ...t,
          status: "completed" as const,
          completedDate: new Date().toISOString(),
        }
      }
      return t
    })

    setTransfers(updatedTransfers)
    localStorage.setItem("stockTransfers", JSON.stringify(updatedTransfers))

    // Record stock movements
    const movements = transfer.items.map((item) => ({
      id: Date.now().toString() + Math.random(),
      itemId: item.itemId,
      itemName: item.itemName,
      type: "transfer" as const,
      quantity: -(item.approvedQuantity || item.requestedQuantity),
      department: transfer.fromDepartment,
      reference: transfer.transferNumber,
      date: new Date().toISOString(),
      notes: `Transfer to ${transfer.toDepartment}`,
    }))

    const existingMovements = JSON.parse(localStorage.getItem("stockMovements") || "[]")
    localStorage.setItem("stockMovements", JSON.stringify([...existingMovements, ...movements]))

    toast({
      title: "Transfer Completed",
      description: "Stock has been transferred successfully",
    })
  }

  const availableItems = inventoryItems.filter(
    (item) => item.department === newTransfer.fromDepartment && item.currentStock > 0,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Transfers</h1>
          <p className="text-muted-foreground">Transfer inventory between departments and locations</p>
        </div>
        <Button onClick={() => setShowNewTransfer(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Transfer
        </Button>
      </div>

      {/* Department Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Flow</CardTitle>
          <CardDescription>Stock movement between departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-4 p-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-medium text-blue-800">Central Store</span>
              </div>
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="flex flex-wrap gap-4">
              {["Restaurant", "Bar", "Housekeeping", "Event Venues"].map((dept) => (
                <div key={dept} className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-xs font-medium text-green-800">{dept}</span>
                  </div>
                </div>
              ))}
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="flex flex-wrap gap-4">
              {["Satellite Bars", "Pool Bar"].map((dept) => (
                <div key={dept} className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-xs font-medium text-orange-800">{dept}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Transfer Form */}
      {showNewTransfer && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Transfer</CardTitle>
            <CardDescription>Transfer stock between departments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromDepartment">From Department</Label>
                <Select
                  value={newTransfer.fromDepartment}
                  onValueChange={(value) => setNewTransfer((prev) => ({ ...prev, fromDepartment: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source department" />
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
              <div>
                <Label htmlFor="toDepartment">To Department</Label>
                <Select
                  value={newTransfer.toDepartment}
                  onValueChange={(value) => setNewTransfer((prev) => ({ ...prev, toDepartment: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.filter((dept) => dept !== newTransfer.fromDepartment).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {newTransfer.fromDepartment && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="item">Select Item</Label>
                    <Select value={selectedItem} onValueChange={setSelectedItem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item to transfer" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableItems.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name} - {item.currentStock} {item.unit} available
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-32">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      type="number"
                      value={transferQuantity}
                      onChange={(e) => setTransferQuantity(e.target.value)}
                      placeholder="Qty"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addItemToTransfer}>Add</Button>
                  </div>
                </div>

                {newTransfer.items && newTransfer.items.length > 0 && (
                  <div>
                    <Label>Transfer Items</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit Cost</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newTransfer.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.itemName}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>
                              {item.requestedQuantity} {item.unit}
                            </TableCell>
                            <TableCell>₵{item.costPrice.toFixed(2)}</TableCell>
                            <TableCell>₵{(item.requestedQuantity * item.costPrice).toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="destructive" size="sm" onClick={() => removeItemFromTransfer(index)}>
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    value={newTransfer.notes || ""}
                    onChange={(e) => setNewTransfer((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes for this transfer..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveTransfer}>Create Transfer</Button>
                  <Button variant="outline" onClick={() => setShowNewTransfer(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Transfers List */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>All stock transfer requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transfer #</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-mono">{transfer.transferNumber}</TableCell>
                  <TableCell>{transfer.fromDepartment}</TableCell>
                  <TableCell>{transfer.toDepartment}</TableCell>
                  <TableCell>{transfer.items.length} items</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transfer.status === "completed"
                          ? "default"
                          : transfer.status === "approved"
                            ? "secondary"
                            : transfer.status === "rejected"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {transfer.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(transfer.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {transfer.status === "pending" && (
                        <Button size="sm" onClick={() => approveTransfer(transfer.id)}>
                          Approve
                        </Button>
                      )}
                      {transfer.status === "approved" && (
                        <Button size="sm" onClick={() => completeTransfer(transfer.id)}>
                          Complete
                        </Button>
                      )}
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
