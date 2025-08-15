"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ReportTable } from "@/components/report-table"
import { BarChart3, TrendingUp, DollarSign, Package } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

// Sample data for demonstration
const sampleSalesData = [
  {
    id: 1,
    date: "2024-01-15",
    customer: "Hotel Ghana",
    product: "Room Service",
    quantity: 2,
    amount: 450.0,
    profit: 180.0,
  },
  {
    id: 2,
    date: "2024-01-16",
    customer: "Restaurant Accra",
    product: "Catering",
    quantity: 1,
    amount: 1200.0,
    profit: 480.0,
  },
  {
    id: 3,
    date: "2024-01-17",
    customer: "Event Center",
    product: "Equipment Rental",
    quantity: 5,
    amount: 800.0,
    profit: 320.0,
  },
]

const reportTypes = [
  { id: "sales_summary", name: "Sales Summary", description: "Overall sales performance" },
  { id: "customer_analysis", name: "Customer Analysis", description: "Customer buying patterns" },
  { id: "product_performance", name: "Product Performance", description: "Product sales analysis" },
]

export default function SalesReportsAndAnalysis() {
  const [activeTab, setActiveTab] = useState("reports")
  const [selectedReport, setSelectedReport] = useState("sales_summary")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Reports and Analysis</h1>
        <p className="text-muted-foreground">Comprehensive sales reporting and analysis tools for your business</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Sales Reports
              </CardTitle>
              <CardDescription>Generate detailed sales reports with customizable parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="rooms">Rooms</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Generate Report</Button>
                <Button variant="outline">Export CSV</Button>
                <Button variant="outline">Export PDF</Button>
              </div>
            </CardContent>
          </Card>

          <ReportTable
            data={sampleSalesData}
            columns={[
              { key: "date", label: "Date", type: "date" },
              { key: "customer", label: "Customer", type: "string" },
              { key: "product", label: "Product", type: "string" },
              { key: "quantity", label: "Quantity", type: "number" },
              { key: "amount", label: "Amount", type: "number" },
              { key: "profit", label: "Profit", type: "number" },
            ]}
            title="Sales Report Results"
          />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵ 2,450.00</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵ 980.00</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵ 816.67</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Analysis</CardTitle>
              <CardDescription>Detailed analysis of sales performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                data={sampleSalesData}
                columns={[
                  { key: "date", label: "Date", type: "date" },
                  { key: "customer", label: "Customer", type: "string" },
                  { key: "product", label: "Product", type: "string" },
                  { key: "quantity", label: "Quantity", type: "number" },
                  { key: "amount", label: "Amount", type: "number" },
                  { key: "profit", label: "Profit", type: "number" },
                ]}
                title="Sales Transactions"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
