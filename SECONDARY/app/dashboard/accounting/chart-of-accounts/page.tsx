"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Edit, Eye } from "lucide-react"
import Link from "next/link"
import type { ChartOfAccount } from "@/types/accounting"
import { HOSPITALITY_CHART_OF_ACCOUNTS } from "@/types/accounting"

export default function ChartOfAccountsPage() {
  const [accounts, setAccounts] = useState<ChartOfAccount[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    initializeChartOfAccounts()
  }, [])

  const initializeChartOfAccounts = () => {
    const existingAccounts = localStorage.getItem("chartOfAccounts")

    if (!existingAccounts) {
      // Initialize with hospitality chart of accounts
      const initialAccounts: ChartOfAccount[] = HOSPITALITY_CHART_OF_ACCOUNTS.map((account, index) => ({
        ...account,
        id: (index + 1).toString(),
        balance: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))

      setAccounts(initialAccounts)
      localStorage.setItem("chartOfAccounts", JSON.stringify(initialAccounts))
    } else {
      setAccounts(JSON.parse(existingAccounts))
    }
  }

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.code.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || account.type === filterType

    return matchesSearch && matchesType
  })

  const getAccountTypeColor = (type: string) => {
    const colors = {
      asset: "bg-blue-100 text-blue-800 border-blue-200",
      liability: "bg-red-100 text-red-800 border-red-200",
      equity: "bg-purple-100 text-purple-800 border-purple-200",
      revenue: "bg-green-100 text-green-800 border-green-200",
      expense: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const getAccountsByType = (type: string) => {
    return filteredAccounts.filter((account) => account.type === type)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Chart of Accounts</h1>
          <p className="text-gray-600">Complete account structure for hospitality operations</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search accounts by name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterType === "asset" ? "default" : "outline"}
                onClick={() => setFilterType("asset")}
                size="sm"
              >
                Assets
              </Button>
              <Button
                variant={filterType === "liability" ? "default" : "outline"}
                onClick={() => setFilterType("liability")}
                size="sm"
              >
                Liabilities
              </Button>
              <Button
                variant={filterType === "equity" ? "default" : "outline"}
                onClick={() => setFilterType("equity")}
                size="sm"
              >
                Equity
              </Button>
              <Button
                variant={filterType === "revenue" ? "default" : "outline"}
                onClick={() => setFilterType("revenue")}
                size="sm"
              >
                Revenue
              </Button>
              <Button
                variant={filterType === "expense" ? "default" : "outline"}
                onClick={() => setFilterType("expense")}
                size="sm"
              >
                Expenses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Types */}
      <div className="space-y-6">
        {["asset", "liability", "equity", "revenue", "expense"].map((type) => {
          const typeAccounts = getAccountsByType(type)
          if (typeAccounts.length === 0) return null

          return (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="capitalize">{type}s</CardTitle>
                <CardDescription>
                  {typeAccounts.length} account{typeAccounts.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Code</th>
                        <th className="text-left p-3">Account Name</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-right p-3">Balance</th>
                        <th className="text-center p-3">Status</th>
                        <th className="text-center p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {typeAccounts.map((account) => (
                        <tr key={account.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-sm">{account.code}</td>
                          <td className="p-3">
                            <div className="font-medium">{account.name}</div>
                            {account.description && <div className="text-sm text-gray-500">{account.description}</div>}
                          </td>
                          <td className="p-3">
                            <Badge className={`${getAccountTypeColor(account.type)} text-xs`}>
                              {account.subType.replace("-", " ")}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-mono">{formatCurrency(account.balance)}</td>
                          <td className="p-3 text-center">
                            <Badge variant={account.isActive ? "default" : "secondary"}>
                              {account.isActive ? "Active" : "Inactive"}
                            </Badge>
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
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
