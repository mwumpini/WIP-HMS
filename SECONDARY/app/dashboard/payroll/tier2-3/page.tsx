"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  tier2: string
  tier3: string
  ssnitNumber?: string
  dob?: string
  mobileNumber?: string
}

interface TierContribution {
  staffNumber: string
  employeeName: string
  monthlyBasic: string
  memberId: string
  ssnitNumber: string
  dateOfBirth: string
  cellphoneNumber: string
  ghanaNationalCardNumber: string
  tier2MonthlyContribution: string
  tier3EeContribution: string
  tier3ErContribution: string
  totalTierContribution: string
}

export default function Tier23Page() {
  const [staffData, setStaffData] = useState<StaffData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "staffNumber", direction: "asc" })

  useEffect(() => {
    // Load staff data from localStorage
    const storedStaff = JSON.parse(localStorage.getItem("companyStaff") || "[]")
    setStaffData(storedStaff)
  }, [])

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const getTierReportData = (): TierContribution[] => {
    return staffData
      .filter((staff) => staff.tier2 === "YES" || staff.tier3 === "YES")
      .map((staff) => {
        const monthlyBasic = Number.parseFloat(staff.basicSalary || "0")
        const tier2Contribution = staff.tier2 === "YES" ? (monthlyBasic * 0.05).toFixed(2) : "0.00" // 5% Tier 2
        const tier3EEContribution = staff.tier3 === "YES" ? (monthlyBasic * 0.02).toFixed(2) : "0.00" // Example: 2% employee Tier 3
        const tier3ERContribution = staff.tier3 === "YES" ? (monthlyBasic * 0.03).toFixed(2) : "0.00" // Example: 3% employer Tier 3

        return {
          staffNumber: staff.staffNo || "N/A",
          employeeName: `${staff.surname}, ${staff.firstName} ${staff.middleName || ""}`,
          monthlyBasic: monthlyBasic.toFixed(2),
          memberId: staff.ssnitNumber || "N/A",
          ssnitNumber: staff.ssnitNumber || "N/A",
          dateOfBirth: staff.dob || "N/A",
          cellphoneNumber: staff.mobileNumber || "N/A",
          ghanaNationalCardNumber: staff.ghCardNo,
          tier2MonthlyContribution: tier2Contribution,
          tier3EeContribution: tier3EEContribution,
          tier3ErContribution: tier3ERContribution,
          totalTierContribution: (
            Number.parseFloat(tier2Contribution) +
            Number.parseFloat(tier3EEContribution) +
            Number.parseFloat(tier3ERContribution)
          ).toFixed(2),
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

  const tierData = getTierReportData()
  const filteredData = tierData.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortConfig.key as keyof TierContribution]
    const bVal = b[sortConfig.key as keyof TierContribution]

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
      "STAFF NUMBER",
      "EMPLOYEE NAME",
      "MONTHLY BASIC (GHS)",
      "MEMBER ID",
      "SSNIT NUMBER",
      "DATE OF BIRTH",
      "CELLPHONE NUMBER",
      "GHANA NATIONAL CARD NUMBER",
      "TIER 2 5% MONTHLY BASIC CONTRIBUTION (GHS)",
      "TIER 3 EE BASIC CONTRIBUTION (GHS)",
      "TIER 3 ER BASIC CONTRIBUTION (GHS)",
      "TOTAL TIER CONTRIBUTION (GHS)",
    ].join(",")
    const rows = sortedData
      .map((row) =>
        [
          row.staffNumber,
          `"${row.employeeName}"`,
          row.monthlyBasic,
          row.memberId,
          row.ssnitNumber,
          row.dateOfBirth,
          row.cellphoneNumber,
          row.ghanaNationalCardNumber,
          row.tier2MonthlyContribution,
          row.tier3EeContribution,
          row.tier3ErContribution,
          row.totalTierContribution,
        ].join(","),
      )
      .join("\n")
    const csvContent = `${header}\n${rows}`
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `tier_2_3_contributions_report.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  const totals = sortedData.reduce(
    (acc, item) => ({
      tier2Total: acc.tier2Total + Number.parseFloat(item.tier2MonthlyContribution),
      tier3EETotal: acc.tier3EETotal + Number.parseFloat(item.tier3EeContribution),
      tier3ERTotal: acc.tier3ERTotal + Number.parseFloat(item.tier3ErContribution),
      grandTotal: acc.grandTotal + Number.parseFloat(item.totalTierContribution),
    }),
    {
      tier2Total: 0,
      tier3EETotal: 0,
      tier3ERTotal: 0,
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
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
            className="border-b-2 border-emerald-500 py-2 px-1 text-sm font-medium text-emerald-600"
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
          <h1 className="text-3xl font-bold">Tier 2 & 3 Contributions</h1>
          <p className="text-gray-600">Manage and view Tier 2 and Tier 3 pension contributions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Tier 2 & 3 Contributions Report</CardTitle>
              <CardDescription>
                {sortedData.length} employee{sortedData.length !== 1 ? "s" : ""} with Tier 2/3 contributions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contributions..."
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
              <p>No staff members enrolled in Tier 2 or Tier 3 pension schemes.</p>
              <p className="text-sm mt-2">Add staff members with Tier 2/3 enrollment to see contributions here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th
                      className="text-left p-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("staffNumber")}
                    >
                      STAFF NUMBER {sortConfig.key === "staffNumber" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      className="text-left p-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("employeeName")}
                    >
                      EMPLOYEE NAME {sortConfig.key === "employeeName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      className="text-right p-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("monthlyBasic")}
                    >
                      MONTHLY BASIC (GHS){" "}
                      {sortConfig.key === "monthlyBasic" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-left p-2">MEMBER ID</th>
                    <th className="text-left p-2">SSNIT NUMBER</th>
                    <th className="text-left p-2">DATE OF BIRTH</th>
                    <th className="text-left p-2">CELLPHONE NUMBER</th>
                    <th className="text-left p-2">GHANA NATIONAL CARD NUMBER</th>
                    <th className="text-right p-2">TIER 2 5% MONTHLY BASIC CONTRIBUTION (GHS)</th>
                    <th className="text-right p-2">TIER 3 EE BASIC CONTRIBUTION (GHS)</th>
                    <th className="text-right p-2">TIER 3 ER BASIC CONTRIBUTION (GHS)</th>
                    <th className="text-right p-2">TOTAL TIER CONTRIBUTION (GHS)</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">{item.staffNumber}</td>
                      <td className="p-2 font-medium">{item.employeeName}</td>
                      <td className="p-2 text-right font-medium">
                        {formatCurrency(Number.parseFloat(item.monthlyBasic))}
                      </td>
                      <td className="p-2">{item.memberId}</td>
                      <td className="p-2">{item.ssnitNumber}</td>
                      <td className="p-2">{item.dateOfBirth}</td>
                      <td className="p-2">{item.cellphoneNumber}</td>
                      <td className="p-2">{item.ghanaNationalCardNumber}</td>
                      <td className="p-2 text-right text-blue-600 font-medium">
                        {formatCurrency(Number.parseFloat(item.tier2MonthlyContribution))}
                      </td>
                      <td className="p-2 text-right text-purple-600 font-medium">
                        {formatCurrency(Number.parseFloat(item.tier3EeContribution))}
                      </td>
                      <td className="p-2 text-right text-green-600 font-medium">
                        {formatCurrency(Number.parseFloat(item.tier3ErContribution))}
                      </td>
                      <td className="p-2 text-right font-bold text-emerald-600">
                        {formatCurrency(Number.parseFloat(item.totalTierContribution))}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                    <td className="p-2" colSpan={8}>
                      TOTALS
                    </td>
                    <td className="p-2 text-right text-blue-600">{formatCurrency(totals.tier2Total)}</td>
                    <td className="p-2 text-right text-purple-600">{formatCurrency(totals.tier3EETotal)}</td>
                    <td className="p-2 text-right text-green-600">{formatCurrency(totals.tier3ERTotal)}</td>
                    <td className="p-2 text-right text-emerald-600">{formatCurrency(totals.grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tier 2</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(totals.tier2Total)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tier 3 Employee</p>
                <p className="text-lg font-bold text-purple-600">{formatCurrency(totals.tier3EETotal)}</p>
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
                <p className="text-sm text-gray-600">Tier 3 Employer</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(totals.tier3ERTotal)}</p>
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
                <p className="text-sm text-gray-600">Grand Total</p>
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(totals.grandTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Tier 2 & 3 Pension Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Tier 2 (Mandatory)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 5% of basic salary</li>
                <li>• Occupational pension scheme</li>
                <li>• Managed by approved trustees</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Tier 3 (Voluntary)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Employee: 2% of basic salary</li>
                <li>• Employer: 3% of basic salary</li>
                <li>• Voluntary provident fund</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
