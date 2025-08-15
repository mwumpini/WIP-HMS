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
import { CalendarIcon, Plus, FileText, CheckCircle, XCircle, ShoppingCart } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { type InventoryItem, DEPARTMENTS } from "@/types/inventory"

interface Requisition {
  id: string
  requisitionNumber: string
  department: string
  requestedBy: string
  items: RequisitionItem[]
  totalEstimatedCost: number
  status: "pending" | "approved" | "rejected" | "converted_to_po"
  priority: "low" | "medium" | "high" | "urgent"
  requestDate: string
  requiredBy?: string
  approvedBy?: string
  approvedDate?: string
  rejectionReason?: string
  notes?: string
  poNumber?: string
}

interface RequisitionItem {
  itemName: string
  description: string
  quantity: number
  unit: string
  estimatedUnitCost: number
  totalCost: number
  justification?: string
}

export default function Requisitions() {
  const [requisitions, setRequisitions] = useState<Requisition[]>([])
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [showNewRequisition, setShowNewRequisition] = useState(false)
  const [newRequisition, setNewRequisition] = useState<Partial<Requisition>>({
    department: "",
    requestedBy: "Current User",
    items: [],
    status: "pending",
    priority: "medium",
    requestDate: new Date().toISOString(),
  })
  const [newItem, setNewItem] = useState<Partial<RequisitionItem>>({})
  const [requiredByDate, setRequiredByDate] = useState<Date>()
  const [userRole] = useState("storekeeper") // This would come from auth context
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedRequisitions = JSON.parse(localStorage.getItem("requisitions") || "[]")
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
    setRequisitions(savedRequisitions)
    setInventoryItems(savedItems)
  }

  const generateRequisitionNumber = () => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const sequence = (requisitions.length + 1).toString().padStart(4, "0")
    return `REQ${year}${month}${sequence}`
  }

  const addItemToRequisition = () => {
    if (!newItem.itemName || !newItem.quantity || !newItem.estimatedUnitCost) {
      toast({
        title: "Incomplete Item",
        description: "Please fill all required item details",
        variant: "destructive",
      })
      return
    }

    const item: RequisitionItem = {
      itemName: newItem.itemName,
      description: newItem.description || "",
      quantity: newItem.quantity,
      unit: newItem.unit || "pcs",
      estimatedUnitCost: newItem.estimatedUnitCost,
      totalCost: newItem.quantity * newItem.estimatedUnitCost,
      justification: newItem.justification,
    }

    setNewRequisition((prev) => ({
      ...prev,
      items: [...(prev.items || []), item],
    }))

    setNewItem({})
  }

  const removeItemFromRequisition = (index: number) => {
    setNewRequisition((prev) => ({
      ...prev,
      items: prev.items?.filter((_, i) => i !== index) || [],
    }))
  }

  const calculateTotalCost = () => {
    return newRequisition.items?.reduce((sum, item) => sum + item.totalCost, 0) || 0
  }

  const saveRequisition = () => {
    if (!newRequisition.department || !newRequisition.items?.length) {
      toast({
        title: "Incomplete Requisition",
        description: "Please fill all required fields and add items",
        variant: "destructive",
      })
      return
    }

    const requisition: Requisition = {
      id: Date.now().toString(),
      requisitionNumber: generateRequisitionNumber(),
      department: newRequisition.department,
      requestedBy: newRequisition.requestedBy || "Current User",
      items: newRequisition.items,
      totalEstimatedCost: calculateTotalCost(),
      status: "pending",
      priority: newRequisition.priority || "medium",
      requestDate: new Date().toISOString(),
      requiredBy: requiredByDate?.toISOString(),
      notes: newRequisition.notes,
    }

    const updatedRequisitions = [...requisitions, requisition]
    setRequisitions(updatedRequisitions)
    localStorage.setItem("requisitions", JSON.stringify(updatedRequisitions))

    toast({
      title: "Requisition Created",
      description: `Requisition ${requisition.requisitionNumber} has been submitted for approval`,
    })

    setShowNewRequisition(false)
    setNewRequisition({
      department: "",
      requestedBy: "Current User",
      items: [],
      status: "pending",
      priority: "medium",
      requestDate: new Date().toISOString(),
    })
    setRequiredByDate(undefined)
  }

  const approveRequisition = (requisitionId: string) => {
    const updatedRequisitions = requisitions.map((req) => {
      if (req.id === requisitionId) {
        return {
          ...req,
          status: "approved" as const,
          approvedBy: "Current Supervisor",
          approvedDate: new Date().toISOString(),
        }
      }
      return req
    })

    setRequisitions(updatedRequisitions)
    localStorage.setItem("requisitions", JSON.stringify(updatedRequisitions))

    toast({
      title: "Requisition Approved",
      description: "The requisition has been approved and can now be converted to a purchase order",
    })
  }

  const rejectRequisition = (requisitionId: string, reason: string) => {
    const updatedRequisitions = requisitions.map((req) => {
      if (req.id === requisitionId) {
        return {
          ...req,
          status: "rejected" as const,
          approvedBy: "Current Supervisor",
          approvedDate: new Date().toISOString(),
          rejectionReason: reason,
        }
      }
      return req
    })

    setRequisitions(updatedRequisitions)
    localStorage.setItem("requisitions", JSON.stringify(updatedRequisitions))

    toast({
      title: "Requisition Rejected",
      description: "The requisition has been rejected",
      variant: "destructive",
    })
  }

  const convertToPurchaseOrder = (requisitionId: string) => {
    // This would typically create a new purchase order
    const updatedRequisitions = requisitions.map((req) => {
      if (req.id === requisitionId) {
        const poNumber = `PO${Date.now().toString().slice(-6)}`
        return {
          ...req,
          status: "converted_to_po" as const,
          poNumber,
        }
      }
      return req
    })

    setRequisitions(updatedRequisitions)
    localStorage.setItem("requisitions", JSON.stringify(updatedRequisitions))

    toast({
      title: "Converted to Purchase Order",
      description: "The requisition has been converted to a purchase order",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const canApprove = userRole === "supervisor" || userRole === "manager"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requisitions</h1>
          <p className="text-muted-foreground">Request items for approval before procurement</p>
        </div>
        <Button onClick={() => setShowNewRequisition(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Requisition
        </Button>
      </div>

      {/* New Requisition Form */}
      {showNewRequisition && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Requisition</CardTitle>
            <CardDescription>Request items for supervisor approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newRequisition.department}
                  onValueChange={(value) => setNewRequisition((prev) => ({ ...prev, department: value }))}
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
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newRequisition.priority}
                  onValueChange={(value) => setNewRequisition((prev) => ({ ...prev, priority: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="requiredBy">Required By</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {requiredByDate ? format(requiredByDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={requiredByDate} onSelect={setRequiredByDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Add Items Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add Items</h3>
              <div className="grid grid-cols-6 gap-4">
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
                  <Label htmlFor="estimatedCost">Est. Unit Cost (₵)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newItem.estimatedUnitCost || ""}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, estimatedUnitCost: Number.parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="justification">Justification</Label>
                  <Input
                    value={newItem.justification || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, justification: e.target.value }))}
                    placeholder="Why needed"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addItemToRequisition}>Add</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Item description or specifications"
                />
              </div>
            </div>

            {/* Items Table */}
            {newRequisition.items && newRequisition.items.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Requested Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Est. Unit Cost</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Justification</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newRequisition.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>₵{item.estimatedUnitCost.toFixed(2)}</TableCell>
                        <TableCell>₵{item.totalCost.toFixed(2)}</TableCell>
                        <TableCell>{item.justification}</TableCell>
                        <TableCell>
                          <Button variant="destructive" size="sm" onClick={() => removeItemFromRequisition(index)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 text-right">
                  <div className="text-lg font-bold">Total Estimated Cost: ₵{calculateTotalCost().toFixed(2)}</div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                value={newRequisition.notes || ""}
                onChange={(e) => setNewRequisition((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes or special requirements..."
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={saveRequisition}>Submit Requisition</Button>
              <Button variant="outline" onClick={() => setShowNewRequisition(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requisitions List */}
      <Card>
        <CardHeader>
          <CardTitle>Requisition Requests</CardTitle>
          <CardDescription>All requisition requests and their approval status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requisition #</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requisitions.map((requisition) => (
                <TableRow key={requisition.id}>
                  <TableCell className="font-mono">{requisition.requisitionNumber}</TableCell>
                  <TableCell>{requisition.department}</TableCell>
                  <TableCell>{requisition.requestedBy}</TableCell>
                  <TableCell>{requisition.items.length} items</TableCell>
                  <TableCell>₵{requisition.totalEstimatedCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(requisition.priority)}>
                      {requisition.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        requisition.status === "approved"
                          ? "default"
                          : requisition.status === "rejected"
                            ? "destructive"
                            : requisition.status === "converted_to_po"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {requisition.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(requisition.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {canApprove && requisition.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => approveRequisition(requisition.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectRequisition(requisition.id, "Not approved")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {requisition.status === "approved" && (
                        <Button size="sm" onClick={() => convertToPurchaseOrder(requisition.id)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Create PO
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
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
