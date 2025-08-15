"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import type { AccountsPayable } from "@/types/accounting"

export default function AccountsPayablePage() {
  const [payables, setPayables] = useState<AccountsPayable[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    loadPayables()
  }, [])

  const loadPayables = () => {
    const existingPayables = localStorage.getItem("accountsPayable")
    if (existingPayables) {
      setPayables(JSON.parse(existingPayables))
    }
  }

  const filteredPayables = payables.filter((payable) => {
    const matchesSearch =
      payable.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payable.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || payable.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      partial: "bg-blue-100 text-blue-800 border-blue-200",
      paid: "bg-green-100 text-green-800 border-green-200",
      overdue: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const totalPayables = payables.reduce((sum, payable) => sum + payable.remainingAmount, 0)
  const overduePayables = payables.filter((p) => p.status === "overdue").length

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Accounts Payable</h1>
          <p className="text-gray-600">Manage vendor bills and payments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalPayables)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overduePayables}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{new Set(payables.map((p) => p.vendorId)).size}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by vendor or invoice number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "overdue" ? "default" : "outline"}
                onClick={() => setFilterStatus("overdue")}
                size="sm"
              >
                Overdue
              </Button>
            </div>
            <Button asChild>
              <Link href="/dashboard/accounting/payables/new">
                <Plus className="h-4 w-4 mr-2" />
                New Bill
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Bills</CardTitle>
          <CardDescription>
            {filteredPayables.length} bill{filteredPayables.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPayables.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No bills found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Vendor</th>
                    <th className="text-left p-3">Invoice #</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Due Date</th>
                    <th className="text-right p-3">Amount</th>
                    <th className="text-right p-3">Remaining</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayables.map((payable) => (
                    <tr key={payable.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{payable.vendorName}</td>
                      <td className="p-3 font-mono text-sm">{payable.invoiceNumber}</td>
                      <td className="p-3">{new Date(payable.invoiceDate).toLocaleDateString()}</td>
                      <td className="p-3">{new Date(payable.dueDate).toLocaleDateString()}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(payable.amount)}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(payable.remainingAmount)}</td>
                      <td className="p-3 text-center">
                        <Badge className={`${getStatusColor(payable.status)} text-xs`}>{payable.status}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
