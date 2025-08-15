"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  category: string
  status: "active" | "inactive"
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

const expenseCategories = [
  "Asset",
  "Audit Fees",
  "Cleaning and Sanitation",
  "Directors Remuneration",
  "Donation",
  "Electricity Water and Gas",
  "Generator - Fuel and Repairs",
  "Medical Expenses",
  "Newspaper and Periodicals",
  "Outsourcing",
  "Postage and Telephone",
  "Property Rate",
  "Purchases",
  "Registration and Council Levy",
  "Repairs and Renovation - Building",
  "SSNIT and Tier 2",
  "Ghana Tourism Levy",
  "Repairs -Equipment",
  "Salaries and Wages",
  "Security Expenses",
  "Staff Uniform",
  "Subscriptions",
  "Travelling and Transport",
  "Vehicle Running Expenses",
  "Printing and Stationery",
  "Director Drawings",
  "Fees and Fines",
  "Hiring Charges",
]

export default function NewExpensePage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    paymentDetails: "",
    supplierId: "",
    supplierName: "",
    amount: "",
    category: "",
    vatType: "standard",
    mop: "cash",
    isWithholding: false,
    withholdingType: "goods",
  })

  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [showNewSupplier, setShowNewSupplier] = useState(false)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Other",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadSuppliers = () => {
    const savedSuppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
    const activeSuppliers = savedSuppliers.filter((s: Supplier) => s.status === "active")
    setSuppliers(activeSuppliers)
  }

  const addNewSupplier = () => {
    if (!newSupplier.name || !newSupplier.contactPerson || !newSupplier.email) {
      return
    }

    const supplier: Supplier = {
      id: Date.now().toString(),
      name: newSupplier.name,
      contactPerson: newSupplier.contactPerson,
      email: newSupplier.email,
      phone: newSupplier.phone,
      category: newSupplier.category,
      status: "active",
    }

    // Save to inventory suppliers
    const existingSuppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
    const updatedSuppliers = [
      ...existingSuppliers,
      {
        ...supplier,
        address: "",
        city: "",
        country: "Ghana",
        paymentTerms: "Net 30",
        taxId: "",
        bankDetails: "",
        notes: "",
        rating: 5,
        totalOrders: 0,
        totalValue: 0,
        createdDate: new Date().toISOString(),
      },
    ]

    localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers))

    // Update local state
    setSuppliers([...suppliers, supplier])

    // Select the new supplier
    setFormData({
      ...formData,
      supplierId: supplier.id,
      supplierName: supplier.name,
    })

    // Reset form and close dialog
    setNewSupplier({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      category: "Other",
    })
    setShowNewSupplier(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const amount = Number.parseFloat(formData.amount)
    const VAT_STANDARD_RATE = 0.15
    const VAT_FLAT_RATE = 0.03

    let vatExclusiveAmount = 0
    let inputVat = 0

    if (formData.vatType === "standard") {
      const vatDenominator = 1 + VAT_STANDARD_RATE
      vatExclusiveAmount = amount / vatDenominator
      inputVat = amount - vatExclusiveAmount
    } else if (formData.vatType === "flat") {
      inputVat = amount * VAT_FLAT_RATE
      vatExclusiveAmount = amount
    } else {
      inputVat = 0
      vatExclusiveAmount = amount
    }

    const existingExpenses = JSON.parse(localStorage.getItem("ghanaTaxExpenses") || "[]")
    const nextId = existingExpenses.length > 0 ? Math.max(...existingExpenses.map((e: any) => e.id)) + 1 : 1

    const expense = {
      id: nextId,
      date: formData.date,
      paymentDetails: formData.paymentDetails,
      supplierId: formData.supplierId,
      supplier: formData.supplierName, // Keep for backward compatibility
      amount,
      category: formData.category,
      vatType: formData.vatType,
      mop: formData.mop,
      isWithholding: formData.isWithholding,
      withholdingType: formData.isWithholding ? formData.withholdingType : null,
      vatExclusiveAmount,
      inputVat,
    }

    existingExpenses.push(expense)
    localStorage.setItem("ghanaTaxExpenses", JSON.stringify(existingExpenses))

    setIsLoading(false)
    setSuccess(true)

    setTimeout(() => {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        paymentDetails: "",
        supplierId: "",
        supplierName: "",
        amount: "",
        category: "",
        vatType: "standard",
        mop: "cash",
        isWithholding: false,
        withholdingType: "goods",
      })
      setSuccess(false)
    }, 2000)
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSupplierChange = (supplierId: string) => {
    const selectedSupplier = suppliers.find((s) => s.id === supplierId)
    setFormData({
      ...formData,
      supplierId,
      supplierName: selectedSupplier?.name || "",
    })
  }

  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: `${supplier.name} (${supplier.category})`,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Expense</h1>
          <p className="text-gray-600">Record a new expense transaction</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
          <CardDescription>Enter the expense information to calculate input VAT automatically</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-6 border-emerald-200 bg-emerald-50">
              <AlertDescription className="text-emerald-800">
                Expense recorded successfully! Input VAT has been calculated.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Payment Details</Label>
              <Input
                id="paymentDetails"
                placeholder="e.g., Invoice #12345"
                value={formData.paymentDetails}
                onChange={(e) => handleChange("paymentDetails", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="supplier">Supplier</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowNewSupplier(true)}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add New
                </Button>
              </div>
              <SearchableSelect
                options={supplierOptions}
                value={formData.supplierId}
                onValueChange={handleSupplierChange}
                placeholder="Select or search for a supplier..."
                searchPlaceholder="Type to search suppliers..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (GHS)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Total amount on invoice"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Expense Category</Label>
              <SearchableSelect
                options={expenseCategories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                placeholder="Select or search for a category..."
                searchPlaceholder="Type to search categories..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vatType">Input VAT Type</Label>
              <Select value={formData.vatType} onValueChange={(value) => handleChange("vatType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Rate (15%)</SelectItem>
                  <SelectItem value="flat">Flat Rate (3%)</SelectItem>
                  <SelectItem value="zero">Zero Rated (0%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mop">Mode of Payment</Label>
              <Select value={formData.mop} onValueChange={(value) => handleChange("mop", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">CASH</SelectItem>
                  <SelectItem value="bank">BANK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="withholding"
                checked={formData.isWithholding}
                onCheckedChange={(checked) => handleChange("isWithholding", checked as boolean)}
              />
              <Label htmlFor="withholding">Withholding Tax</Label>
            </div>

            {formData.isWithholding && (
              <div className="space-y-2">
                <Label htmlFor="withholdingType">Withholding Type</Label>
                <Select
                  value={formData.withholdingType}
                  onValueChange={(value) => handleChange("withholdingType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="goods">Goods</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="works">Works</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                "Recording Expense..."
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Record Expense
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showNewSupplier} onOpenChange={setShowNewSupplier}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>Quickly add a new supplier to your inventory system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplierName">Company Name *</Label>
              <Input
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                placeholder="Company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                value={newSupplier.contactPerson}
                onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                placeholder="Contact person name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  placeholder="email@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <SearchableSelect
                options={SUPPLIER_CATEGORIES.map((cat) => ({
                  value: cat,
                  label: cat,
                }))}
                value={newSupplier.category}
                onValueChange={(value) => setNewSupplier({ ...newSupplier, category: value })}
                placeholder="Select or search for a category..."
                searchPlaceholder="Type to search categories..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewSupplier}>Add Supplier</Button>
              <Button variant="outline" onClick={() => setShowNewSupplier(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
