"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ReportTable } from "@/components/report-table"
import { Download, Search, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import type { DateRange } from "react-day-picker"

export default function TaxComplianceReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [taxTypeFilter, setTaxTypeFilter] = useState("all")

  // Sample tax compliance data
  const taxData = [
    {
      id: 1,
      taxType: "VAT",
      period: "Jan 2024",
      dueDate: "2024-02-15",
      amount: 2500.0,
      status: "Filed",
      filedDate: "2024-02-10",
      penalty: 0,
    },
    {
      id: 2,
      taxType: "PAYE",
      period: "Jan 2024",
      dueDate: "2024-02-15",
      amount: 8500.0,
      status: "Filed",
      filedDate: "2024-02-12",
      penalty: 0,
    },
    {
      id: 3,
      taxType: "Withholding Tax",
      period: "Jan 2024",
      dueDate: "2024-02-15",
      amount: 1200.0,
      status: "Pending",
      filedDate: null,
      penalty: 0,
    },
    {
      id: 4,
      taxType: "SSNIT",
      period: "Jan 2024",
      dueDate: "2024-02-15",
      amount: 3200.0,
      status: "Filed",
      filedDate: "2024-02-08",
      penalty: 0,
    },
    {
      id: 5,
      taxType: "VAT",
      period: "Dec 2023",
      dueDate: "2024-01-15",
      amount: 2200.0,
      status: "Overdue",
      filedDate: null,
      penalty: 150.0,
    },
  ]

  const complianceData = [
    {
      taxType: "VAT",
      totalDue: 12500.0,
      totalFiled: 10300.0,
      totalPending: 1200.0,
      totalOverdue: 1000.0,
      penalties: 150.0,
      complianceRate: 82.4,
    },
    {
      taxType: "PAYE",
      totalDue: 42500.0,
      totalFiled: 42500.0,
      totalPending: 0,
      totalOverdue: 0,
      penalties: 0,
      complianceRate: 100.0,
    },
    {
      taxType: "Withholding Tax",
      totalDue: 6000.0,
      totalFiled: 4800.0,
      totalPending: 1200.0,
      totalOverdue: 0,
      penalties: 0,
      complianceRate: 80.0,
    },
    {
      taxType: "SSNIT",
      totalDue: 16000.0,
      totalFiled: 16000.0,
      totalPending: 0,
      totalOverdue: 0,
      penalties: 0,
      complianceRate: 100.0,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tax & Compliance Reports</h1>
        <p className="text-muted-foreground">Monitor tax obligations and compliance status</p>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance Reports</CardTitle>
              <CardDescription>Track tax filings, due dates, and compliance status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
                <Select value={taxTypeFilter} onValueChange={setTaxTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by tax type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tax Types</SelectItem>
                    <SelectItem value="vat">VAT</SelectItem>
                    <SelectItem value="paye">PAYE</SelectItem>
                    <SelectItem value="withholding">Withholding Tax</SelectItem>
                    <SelectItem value="ssnit">SSNIT</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search tax records..."
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
                data={taxData}
                columns={[
                  { key: "taxType", label: "Tax Type", type: "string" },
                  { key: "period", label: "Period", type: "string" },
                  { key: "dueDate", label: "Due Date", type: "date" },
                  { key: "amount", label: "Amount", type: "number" },
                  { key: "status", label: "Status", type: "string" },
                  { key: "filedDate", label: "Filed Date", type: "date" },
                  { key: "penalty", label: "Penalty", type: "number" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tax Due</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵77,000.00</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Filed On Time</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Compliance rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">GH₵1,200.00 pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Penalties</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵150.00</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Analysis by Tax Type</CardTitle>
              <CardDescription>Detailed compliance metrics for each tax category</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                data={complianceData}
                columns={[
                  { key: "taxType", label: "Tax Type", type: "string" },
                  { key: "totalDue", label: "Total Due", type: "number" },
                  { key: "totalFiled", label: "Total Filed", type: "number" },
                  { key: "totalPending", label: "Pending", type: "number" },
                  { key: "totalOverdue", label: "Overdue", type: "number" },
                  { key: "penalties", label: "Penalties", type: "number" },
                  { key: "complianceRate", label: "Compliance %", type: "percent" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
