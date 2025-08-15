"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ReportTable } from "@/components/report-table"
import { Download, Search, Users, DollarSign, TrendingUp, Calendar } from "lucide-react"
import type { DateRange } from "react-day-picker"

export default function PayrollReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Sample payroll data
  const payrollData = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Doe",
      department: "Sales",
      basicSalary: 3500.0,
      allowances: 500.0,
      deductions: 350.0,
      netPay: 3650.0,
      payPeriod: "Jan 2024",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Jane Smith",
      department: "Marketing",
      basicSalary: 4000.0,
      allowances: 600.0,
      deductions: 400.0,
      netPay: 4200.0,
      payPeriod: "Jan 2024",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Mike Johnson",
      department: "Operations",
      basicSalary: 3200.0,
      allowances: 400.0,
      deductions: 320.0,
      netPay: 3280.0,
      payPeriod: "Jan 2024",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Sarah Wilson",
      department: "Administration",
      basicSalary: 3800.0,
      allowances: 550.0,
      deductions: 380.0,
      netPay: 3970.0,
      payPeriod: "Jan 2024",
    },
  ]

  const summaryData = [
    {
      department: "Sales",
      employees: 8,
      totalSalary: 28000.0,
      avgSalary: 3500.0,
      totalAllowances: 4000.0,
      totalDeductions: 2800.0,
    },
    {
      department: "Marketing",
      employees: 5,
      totalSalary: 20000.0,
      avgSalary: 4000.0,
      totalAllowances: 3000.0,
      totalDeductions: 2000.0,
    },
    {
      department: "Operations",
      employees: 12,
      totalSalary: 38400.0,
      avgSalary: 3200.0,
      totalAllowances: 4800.0,
      totalDeductions: 3840.0,
    },
    {
      department: "Administration",
      employees: 6,
      totalSalary: 22800.0,
      avgSalary: 3800.0,
      totalAllowances: 3300.0,
      totalDeductions: 2280.0,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll Reports</h1>
        <p className="text-muted-foreground">Comprehensive payroll analysis and reporting</p>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>Generate detailed payroll reports for employees and departments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search employees..."
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
                data={payrollData}
                columns={[
                  { key: "employeeId", label: "Employee ID", type: "string" },
                  { key: "name", label: "Name", type: "string" },
                  { key: "department", label: "Department", type: "string" },
                  { key: "basicSalary", label: "Basic Salary", type: "number" },
                  { key: "allowances", label: "Allowances", type: "number" },
                  { key: "deductions", label: "Deductions", type: "number" },
                  { key: "netPay", label: "Net Pay", type: "number" },
                  { key: "payPeriod", label: "Pay Period", type: "string" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵109,200.00</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">31</div>
                <p className="text-xs text-muted-foreground">Active employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵3,525.00</div>
                <p className="text-xs text-muted-foreground">Per employee</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pay Periods</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Analysis by Department</CardTitle>
              <CardDescription>Department-wise payroll breakdown and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                data={summaryData}
                columns={[
                  { key: "department", label: "Department", type: "string" },
                  { key: "employees", label: "Employees", type: "number" },
                  { key: "totalSalary", label: "Total Salary", type: "number" },
                  { key: "avgSalary", label: "Avg Salary", type: "number" },
                  { key: "totalAllowances", label: "Total Allowances", type: "number" },
                  { key: "totalDeductions", label: "Total Deductions", type: "number" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
