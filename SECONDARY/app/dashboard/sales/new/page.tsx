"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, CheckCircle } from "lucide-react"
import Link from "next/link"

const DEFAULT_SERVICE_TYPES = ["ACCOMMODATION", "CONFERENCE", "FOOD", "BEVERAGE", "POOL", "OTHERS"]

export default function NewSalePage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceType: "",
    customServiceType: "",
    description: "",
    amount: "",
    vatRate: "12.5",
    nhilRate: "2.5",
    getfundRate: "2.5",
    covidRate: "1",
    tourismRate: "1",
    date: new Date().toISOString().split("T")[0],
  })

  const [customServiceTypes, setCustomServiceTypes] = useState<string[]>([])
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // Load custom service types from localStorage
    const savedServiceTypes = localStorage.getItem("customServiceTypes")
    if (savedServiceTypes) {
      try {
        setCustomServiceTypes(JSON.parse(savedServiceTypes))
      } catch (error) {
        console.error("Error loading custom service types:", error)
      }
    }
  }, [])

  const allServiceTypes = [...DEFAULT_SERVICE_TYPES, ...customServiceTypes]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors([]) // Clear errors when user starts typing

    if (field === "serviceType") {
      setShowCustomInput(value === "OTHERS")
      if (value !== "OTHERS") {
        setFormData((prev) => ({ ...prev, customServiceType: "" }))
      }
    }
  }

  const calculateTotals = () => {
    const amount = Number.parseFloat(formData.amount) || 0
    const vatAmount = (amount * Number.parseFloat(formData.vatRate)) / 100
    const nhilAmount = (amount * Number.parseFloat(formData.nhilRate)) / 100
    const getfundAmount = (amount * Number.parseFloat(formData.getfundRate)) / 100
    const covidAmount = (amount * Number.parseFloat(formData.covidRate)) / 100
    const tourismAmount = (amount * Number.parseFloat(formData.tourismRate)) / 100

    const totalTaxes = vatAmount + nhilAmount + getfundAmount + covidAmount + tourismAmount
    const totalAmount = amount + totalTaxes

    return {
      subtotal: amount,
      vatAmount,
      nhilAmount,
      getfundAmount,
      covidAmount,
      tourismAmount,
      totalTaxes,
      totalAmount,
    }
  }

  const totals = calculateTotals()

  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.customerName.trim()) {
      newErrors.push("Customer name is required")
    }
    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.push("Valid amount is required")
    }
    if (!formData.serviceType) {
      newErrors.push("Service type is required")
    }
    if (formData.serviceType === "OTHERS" && !formData.customServiceType.trim()) {
      newErrors.push("Custom service type is required when 'OTHERS' is selected")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Get existing sales from localStorage
    const existingSales = JSON.parse(localStorage.getItem("sales") || "[]")

    const newSale = {
      id: Date.now().toString(),
      ...formData,
      serviceType: formData.serviceType === "OTHERS" ? formData.customServiceType : formData.serviceType,
      ...totals,
      createdAt: new Date().toISOString(),
    }

    // Add new sale
    const updatedSales = [...existingSales, newSale]
    localStorage.setItem("sales", JSON.stringify(updatedSales))

    setShowSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        serviceType: "",
        customServiceType: "",
        description: "",
        amount: "",
        vatRate: "12.5",
        nhilRate: "2.5",
        getfundRate: "2.5",
        covidRate: "1",
        tourismRate: "1",
        date: new Date().toISOString().split("T")[0],
      })
      setShowCustomInput(false)
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/sales">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sales
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">New Sale</h1>
          <p className="text-muted-foreground">Record a new sale transaction</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Sale recorded successfully! Form will reset in a moment.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Enter customer details for this sale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
                <CardDescription>Details about the service or product sold</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceType">Service/Product Type *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleInputChange("serviceType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {allServiceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {showCustomInput && (
                    <div>
                      <Label htmlFor="customServiceType">Custom Service Type *</Label>
                      <Input
                        id="customServiceType"
                        value={formData.customServiceType}
                        onChange={(e) => handleInputChange("customServiceType", e.target.value)}
                        placeholder="Enter custom service type"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="amount">Amount (GHS) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Additional details about the sale..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Calculation */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Tax Calculation</CardTitle>
                <CardDescription>Automatic tax calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="font-medium">GHS {totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT ({formData.vatRate}%):</span>
                    <span>GHS {totals.vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>NHIL ({formData.nhilRate}%):</span>
                    <span>GHS {totals.nhilAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GETFUND ({formData.getfundRate}%):</span>
                    <span>GHS {totals.getfundAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>COVID ({formData.covidRate}%):</span>
                    <span>GHS {totals.covidAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tourism ({formData.tourismRate}%):</span>
                    <span>GHS {totals.tourismAmount.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>GHS {totals.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={showSuccess}>
                  <Save className="h-4 w-4 mr-2" />
                  {showSuccess ? "Sale Recorded!" : "Record Sale"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
