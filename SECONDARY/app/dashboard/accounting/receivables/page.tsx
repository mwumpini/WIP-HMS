"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import type { AccountsReceivable } from "@/types/accounting"

export default function AccountsReceivablePage() {
  const [receivables, setReceivables] = useState<AccountsReceivable[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    loadReceivables()
  }, [])

  const loadReceivables = () => {
    const existingReceivables = localStorage.getItem("accountsReceivable")
    if (existingReceivables) {
      setReceivables(JSON.parse(existingReceivables))
    }
  }

  const filteredReceivables = receivables.filter((receivable) => {
    const matchesSearch =
      receivable.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receivable.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || receivable.status === filterStatus

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

  const totalReceivables = receivables.reduce((sum, receivable) => sum + receivable.remainingAmount, 0)
  const overdueReceivables = receivables.filter((r) => r.status === "overdue").length

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Accounts Receivable</h1>
          <p className="text-gray-600">Track customer invoices and payments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Receivables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalReceivables)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overdueReceivables}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{new Set(receivables.map((r) => r.customerId)).size}</div>
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
                  placeholder="Search by customer or invoice number..."
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
              <Link href="/dashboard/accounting/receivables/new">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Receivables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Invoices</CardTitle>
          <CardDescription>
            {filteredReceivables.length} invoice{filteredReceivables.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReceivables.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No invoices found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Customer</th>
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
                  {filteredReceivables.map((receivable) => (
                    <tr key={receivable.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{receivable.customerName}</td>
                      <td className="p-3 font-mono text-sm">{receivable.invoiceNumber}</td>
                      <td className="p-3">{new Date(receivable.invoiceDate).toLocaleDateString()}</td>
                      <td className="p-3">{new Date(receivable.dueDate).toLocaleDateString()}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(receivable.amount)}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(receivable.remainingAmount)}</td>
                      <td className="p-3 text-center">
                        <Badge className={`${getStatusColor(receivable.status)} text-xs`}>{receivable.status}</Badge>
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
