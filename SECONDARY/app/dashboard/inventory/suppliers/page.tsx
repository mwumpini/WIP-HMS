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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  paymentTerms: string
  category: string
  taxId?: string
  bankDetails?: string
  notes?: string
  status: "active" | "inactive"
  rating: number
  totalOrders: number
  totalValue: number
  lastOrderDate?: string
  createdDate: string
}

const SUPPLIER_CATEGORIES = [
  "Food & Beverages",
  "Cleaning Supplies",
  "Linen & Textiles",
  "Equipment & Maintenance",
  "Office Supplies",
  "Utilities",
  "Professional Services",
  "Other",
]

const PAYMENT_TERMS = ["Net 30", "Net 15", "Net 7", "Cash on Delivery", "Prepayment", "2/10 Net 30", "Custom"]

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [showNewSupplier, setShowNewSupplier] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    status: "active",
    rating: 5,
    totalOrders: 0,
    totalValue: 0,
    createdDate: new Date().toISOString(),
  })
  const { toast } = useToast()

  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadSuppliers = () => {
    const savedSuppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
    setSuppliers(savedSuppliers)
  }

  const saveSupplier = () => {
    if (!newSupplier.name || !newSupplier.contactPerson || !newSupplier.email || !newSupplier.phone) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const supplier: Supplier = {
      id: editingSupplier?.id || Date.now().toString(),
      name: newSupplier.name,
      contactPerson: newSupplier.contactPerson,
      email: newSupplier.email,
      phone: newSupplier.phone,
      address: newSupplier.address || "",
      city: newSupplier.city || "",
      country: newSupplier.country || "Ghana",
      paymentTerms: newSupplier.paymentTerms || "Net 30",
      category: newSupplier.category || "Other",
      taxId: newSupplier.taxId,
      bankDetails: newSupplier.bankDetails,
      notes: newSupplier.notes,
      status: newSupplier.status || "active",
      rating: newSupplier.rating || 5,
      totalOrders: editingSupplier?.totalOrders || 0,
      totalValue: editingSupplier?.totalValue || 0,
      lastOrderDate: editingSupplier?.lastOrderDate,
      createdDate: editingSupplier?.createdDate || new Date().toISOString(),
    }

    let updatedSuppliers
    if (editingSupplier) {
      updatedSuppliers = suppliers.map((s) => (s.id === editingSupplier.id ? supplier : s))
      toast({
        title: "Supplier Updated",
        description: `${supplier.name} has been updated`,
      })
    } else {
      updatedSuppliers = [...suppliers, supplier]
      toast({
        title: "Supplier Added",
        description: `${supplier.name} has been added`,
      })
    }

    setSuppliers(updatedSuppliers)
    localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers))

    setShowNewSupplier(false)
    setEditingSupplier(null)
    setNewSupplier({
      status: "active",
      rating: 5,
      totalOrders: 0,
      totalValue: 0,
      createdDate: new Date().toISOString(),
    })
  }

  const editSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setNewSupplier(supplier)
    setShowNewSupplier(true)
  }

  const deleteSupplier = (supplierId: string) => {
    const updatedSuppliers = suppliers.filter((s) => s.id !== supplierId)
    setSuppliers(updatedSuppliers)
    localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers))

    toast({
      title: "Supplier Deleted",
      description: "Supplier has been removed",
    })
  }

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter((s) => s.status === "active").length
  const totalValue = suppliers.reduce((sum, s) => sum + s.totalValue, 0)
  const avgRating = suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships and contacts</p>
        </div>
        <Button onClick={() => setShowNewSupplier(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">{activeSuppliers} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchase Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time purchases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">Supplier performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SUPPLIER_CATEGORIES.length}</div>
            <p className="text-xs text-muted-foreground">Supplier categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {SUPPLIER_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>Complete list of suppliers and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {supplier.city}, {supplier.country}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.contactPerson}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {supplier.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{supplier.paymentTerms}</TableCell>
                  <TableCell>{supplier.totalOrders}</TableCell>
                  <TableCell>₵{supplier.totalValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{supplier.rating}/5</span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${i < supplier.rating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                      {supplier.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editSupplier(supplier)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteSupplier(supplier.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Supplier Dialog */}
      <Dialog open={showNewSupplier} onOpenChange={setShowNewSupplier}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
            <DialogDescription>
              {editingSupplier ? "Update supplier information" : "Add a new supplier to your directory"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  value={newSupplier.name || ""}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  value={newSupplier.contactPerson || ""}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="Contact person name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  value={newSupplier.email || ""}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  value={newSupplier.phone || ""}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                value={newSupplier.address || ""}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  value={newSupplier.city || ""}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  value={newSupplier.country || "Ghana"}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, country: e.target.value }))}
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newSupplier.category}
                  onValueChange={(value) => setNewSupplier((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPLIER_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={newSupplier.paymentTerms}
                  onValueChange={(value) => setNewSupplier((prev) => ({ ...prev, paymentTerms: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TERMS.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  value={newSupplier.taxId || ""}
                  onChange={(e) => setNewSupplier((prev) => ({ ...prev, taxId: e.target.value }))}
                  placeholder="Tax identification number"
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Select
                  value={newSupplier.rating?.toString()}
                  onValueChange={(value) => setNewSupplier((prev) => ({ ...prev, rating: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bankDetails">Bank Details</Label>
              <Textarea
                value={newSupplier.bankDetails || ""}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, bankDetails: e.target.value }))}
                placeholder="Bank name, account number, routing details..."
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                value={newSupplier.notes || ""}
                onChange={(e) => setNewSupplier((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes about this supplier..."
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={saveSupplier}>{editingSupplier ? "Update Supplier" : "Add Supplier"}</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewSupplier(false)
                  setEditingSupplier(null)
                  setNewSupplier({
                    status: "active",
                    rating: 5,
                    totalOrders: 0,
                    totalValue: 0,
                    createdDate: new Date().toISOString(),
                  })
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
