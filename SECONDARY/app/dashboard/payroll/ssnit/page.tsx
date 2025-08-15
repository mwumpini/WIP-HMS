"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Download, Printer } from "lucide-react"
import Link from "next/link"

interface StaffData {
  id?: string
  staffNo: string
  ghCardNo: string
  surname: string
  middleName: string
  firstName: string
  basicSalary: string
  ssnit: string
  ssnitNumber?: string
}

interface SSNITContribution {
  sNo: number
  ssnitNumber: string
  niaNumber: string
  surname: string
  firstName: string
  otherName: string
  optionCode: string
  hazardous: string
  basicSalary: string
  employeeContribution: string
  employerContribution: string
  totalContribution: string
}

export default function SSNITPage() {
  const [staffData, setStaffData] = useState<StaffData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "sNo", direction: "asc" })

  useEffect(() => {
    // Load staff data from localStorage
    const storedStaff = JSON.parse(localStorage.getItem("companyStaff") || "[]")
    setStaffData(storedStaff)
  }, [])

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const getSSNITReportData = (): SSNITContribution[] => {
    return staffData
      .filter((staff) => staff.ssnit === "YES")
      .map((staff, index) => {
        const basicSalary = Number.parseFloat(staff.basicSalary || "0")
        // SSNIT Act 766: Employer 13% for Tier 1, Employee 5.5% for Tier 1
        const employeeSSNITRate = 0.055
        const employerSSNITRate = 0.13

        return {
          sNo: index + 1,
          ssnitNumber: staff.ssnitNumber || "N/A",
          niaNumber: staff.ghCardNo,
          surname: staff.surname,
          firstName: staff.firstName,
          otherName: staff.middleName || "",
          optionCode: "PNDCL 247/ACT 766",
          hazardous: "N",
          basicSalary: basicSalary.toFixed(2),
          employeeContribution: (basicSalary * employeeSSNITRate).toFixed(2),
          employerContribution: (basicSalary * employerSSNITRate).toFixed(2),
          totalContribution: (basicSalary * (employeeSSNITRate + employerSSNITRate)).toFixed(2),
        }
      })
  }

  const handleSort = (key: string) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const ssnitData = getSSNITReportData()
  const filteredData = ssnitData.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortConfig.key as keyof SSNITContribution]
    const bVal = b[sortConfig.key as keyof SSNITContribution]

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const generateCSV = () => {
    if (!sortedData || sortedData.length === 0) {
      alert("No data to export.")
      return
    }
    const header = [
      "S/NO.",
      "SSNIT NUMBER",
      "NIA NUMBER",
      "SURNAME",
      "FIRST NAME",
      "OTHER NAME",
      "OPTION CODE",
      "HAZARDOUS (Y/N)",
      "BASIC SALARY (GHS)",
      "Employee Contribution (GHS)",
      "Employer Contribution (GHS)",
      "Total Contribution (GHS)",
    ].join(",")
    const rows = sortedData
      .map((row) =>
        [
          row.sNo,
          row.ssnitNumber,
          row.niaNumber,
          row.surname,
          row.firstName,
          row.otherName,
          row.optionCode,
          row.hazardous,
          row.basicSalary,
          row.employeeContribution,
          row.employerContribution,
          row.totalContribution,
        ].join(","),
      )
      .join("\n")
    const csvContent = `${header}\n${rows}`
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `ssnit_contributions_report.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  const totals = sortedData.reduce(
    (acc, item) => ({
      employeeTotal: acc.employeeTotal + Number.parseFloat(item.employeeContribution),
      employerTotal: acc.employerTotal + Number.parseFloat(item.employerContribution),
      grandTotal: acc.grandTotal + Number.parseFloat(item.totalContribution),
    }),
    {
      employeeTotal: 0,
      employerTotal: 0,
      grandTotal: 0,
    },
  )

  return (
    <div className="space-y-6">
      {/* Payroll Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Link
            href="/dashboard/payroll"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Payroll (PAYE)
          </Link>
          <Link
            href="/dashboard/payroll/staff-management"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Staff Management
          </Link>
          <Link
            href="/dashboard/payroll/ssnit"
            className="border-b-2 border-emerald-500 py-2 px-1 text-sm font-medium text-emerald-600"
          >
            SSNIT
          </Link>
          <Link
            href="/dashboard/payroll/income-tax"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Income Tax
          </Link>
          <Link
            href="/dashboard/payroll/tier2-3"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Tier 2 & 3 Pensions
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">SSNIT Contributions</h1>
          <p className="text-gray-600">Manage and view SSNIT Tier 1 contributions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>SSNIT Contributions Report</CardTitle>
              <CardDescription>
                {sortedData.length} employee{sortedData.length !== 1 ? "s" : ""} enrolled in SSNIT
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search SSNIT records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={generateCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sortedData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No staff members enrolled in SSNIT.</p>
              <p className="text-sm mt-2">Add staff members with SSNIT enrollment to see contributions here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("sNo")}>
                      S/NO. {sortConfig.key === "sNo" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-left p-2">SSNIT NUMBER</th>
                    <th className="text-left p-2">NIA NUMBER</th>
                    <th className="text-left p-2 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("surname")}>
                      SURNAME {sortConfig.key === "surname" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-left p-2">FIRST NAME</th>
                    <th className="text-left p-2">OTHER NAME</th>
                    <th className="text-left p-2">OPTION CODE</th>
                    <th className="text-left p-2">HAZARDOUS</th>
                    <th
                      className="text-right p-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("basicSalary")}
                    >
                      BASIC SALARY {sortConfig.key === "basicSalary" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-right p-2">Employee (5.5%)</th>
                    <th className="text-right p-2">Employer (13%)</th>
                    <th className="text-right p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item) => (
                    <tr key={item.sNo} className="border-b hover:bg-gray-50">
                      <td className="p-2">{item.sNo}</td>
                      <td className="p-2">{item.ssnitNumber}</td>
                      <td className="p-2">{item.niaNumber}</td>
                      <td className="p-2 font-medium">{item.surname}</td>
                      <td className="p-2">{item.firstName}</td>
                      <td className="p-2">{item.otherName}</td>
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">
                          {item.optionCode}
                        </Badge>
                      </td>
                      <td className="p-2 text-center">
                        <Badge variant={item.hazardous === "Y" ? "destructive" : "secondary"} className="text-xs">
                          {item.hazardous}
                        </Badge>
                      </td>
                      <td className="p-2 text-right font-medium">
                        {formatCurrency(Number.parseFloat(item.basicSalary))}
                      </td>
                      <td className="p-2 text-right text-blue-600 font-medium">
                        {formatCurrency(Number.parseFloat(item.employeeContribution))}
                      </td>
                      <td className="p-2 text-right text-green-600 font-medium">
                        {formatCurrency(Number.parseFloat(item.employerContribution))}
                      </td>
                      <td className="p-2 text-right font-bold text-emerald-600">
                        {formatCurrency(Number.parseFloat(item.totalContribution))}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                    <td className="p-2" colSpan={9}>
                      TOTALS
                    </td>
                    <td className="p-2 text-right text-blue-600">{formatCurrency(totals.employeeTotal)}</td>
                    <td className="p-2 text-right text-green-600">{formatCurrency(totals.employerTotal)}</td>
                    <td className="p-2 text-right text-emerald-600">{formatCurrency(totals.grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employee Contributions</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(totals.employeeTotal)}</p>
                <p className="text-xs text-gray-500">5.5% of basic salary</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employer Contributions</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(totals.employerTotal)}</p>
                <p className="text-xs text-gray-500">13% of basic salary</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total SSNIT</p>
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(totals.grandTotal)}</p>
                <p className="text-xs text-gray-500">18.5% of basic salary</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">SSNIT Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              <strong>SSNIT (Social Security and National Insurance Trust)</strong>
            </p>
            <p>• Employee contribution: 5.5% of basic salary</p>
            <p>• Employer contribution: 13% of basic salary</p>
            <p>• Total contribution: 18.5% of basic salary</p>
            <p>• Governed by PNDCL 247/ACT 766</p>
            <p>• Provides social security benefits including pensions, invalidity, and survivors' benefits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
