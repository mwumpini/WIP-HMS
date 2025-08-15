"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ReportTable } from "@/components/report-table"
import { Download, Search } from "lucide-react"
import type { DateRange } from "react-day-picker"

export default function ExpensesReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Sample expenses data
  const expensesData = [
    {
      id: 1,
      date: "2024-01-15",
      category: "Office Supplies",
      description: "Stationery and paper",
      amount: 250.0,
      department: "Administration",
      status: "Approved",
    },
    {
      id: 2,
      date: "2024-01-16",
      category: "Travel",
      description: "Business trip to Kumasi",
      amount: 1200.0,
      department: "Sales",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-01-17",
      category: "Utilities",
      description: "Electricity bill",
      amount: 800.0,
      department: "Operations",
      status: "Approved",
    },
    {
      id: 4,
      date: "2024-01-18",
      category: "Marketing",
      description: "Social media advertising",
      amount: 500.0,
      department: "Marketing",
      status: "Approved",
    },
  ]

  const summaryData = [
    { category: "Office Supplies", total: 2500.0, count: 15, avgAmount: 166.67 },
    { category: "Travel", total: 8400.0, count: 7, avgAmount: 1200.0 },
    { category: "Utilities", total: 3200.0, count: 4, avgAmount: 800.0 },
    { category: "Marketing", total: 2100.0, count: 6, avgAmount: 350.0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expenses Reports</h1>
        <p className="text-muted-foreground">Comprehensive expense tracking and analysis</p>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Reports</CardTitle>
              <CardDescription>Generate and view detailed expense reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <ReportTable
                data={expensesData}
                columns={[
                  { key: "date", label: "Date", type: "date" },
                  { key: "category", label: "Category", type: "string" },
                  { key: "description", label: "Description", type: "string" },
                  { key: "amount", label: "Amount", type: "number" },
                  { key: "department", label: "Department", type: "string" },
                  { key: "status", label: "Status", type: "string" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵16,200.00</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">GH₵2,400.00 pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Active categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵506.25</div>
                <p className="text-xs text-muted-foreground">Per transaction</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis by Category</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                data={summaryData}
                columns={[
                  { key: "category", label: "Category", type: "string" },
                  { key: "total", label: "Total Amount", type: "number" },
                  { key: "count", label: "Transactions", type: "number" },
                  { key: "avgAmount", label: "Average", type: "number" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
