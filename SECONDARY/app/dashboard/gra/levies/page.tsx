"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"

interface LeviesData {
  totalGrossSales: number
  nhilBase: number
  nhilLevy: number
  getfundBase: number
  getfundLevy: number
  covidBase: number
  covidLevy: number
  totalLevies: number
}

export default function GRALeviesPage() {
  const [leviesData, setLeviesData] = useState<LeviesData>({
    totalGrossSales: 0,
    nhilBase: 0,
    nhilLevy: 0,
    getfundBase: 0,
    getfundLevy: 0,
    covidBase: 0,
    covidLevy: 0,
    totalLevies: 0,
  })

  const updateLeviesData = () => {
    try {
      const sales = JSON.parse(localStorage.getItem("sales") || "[]")

      const totalGrossSales = sales.reduce((sum: number, s: any) => sum + (s.subtotal || s.grossAmount || 0), 0)

      // All levies are based on gross sales
      const nhilBase = totalGrossSales
      const nhilLevy = totalGrossSales * 0.025 // 2.5%

      const getfundBase = totalGrossSales
      const getfundLevy = totalGrossSales * 0.025 // 2.5%

      const covidBase = totalGrossSales
      const covidLevy = totalGrossSales * 0.01 // 1%

      const totalLevies = nhilLevy + getfundLevy + covidLevy

      setLeviesData({
        totalGrossSales,
        nhilBase,
        nhilLevy,
        getfundBase,
        getfundLevy,
        covidBase,
        covidLevy,
        totalLevies,
      })
    } catch (error) {
      console.error("Error calculating levies data:", error)
    }
  }

  useEffect(() => {
    updateLeviesData()

    // Listen for storage changes
    const handleStorageChange = () => {
      updateLeviesData()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("salesUpdated", handleStorageChange)

    // Poll for updates every 2 seconds
    const interval = setInterval(updateLeviesData, 2000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("salesUpdated", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    const reportData = {
      "Report Type": "Monthly GRA Levies Return",
      "Generated Date": new Date().toLocaleDateString(),
      "Total Gross Sales": formatCurrency(leviesData.totalGrossSales),
      "NHIL Base": formatCurrency(leviesData.nhilBase),
      "NHIL Levy (2.5%)": formatCurrency(leviesData.nhilLevy),
      "GETFund Base": formatCurrency(leviesData.getfundBase),
      "GETFund Levy (2.5%)": formatCurrency(leviesData.getfundLevy),
      "COVID-19 HRL Base": formatCurrency(leviesData.covidBase),
      "COVID-19 HRL (1%)": formatCurrency(leviesData.covidLevy),
      "Total Levies Payable": formatCurrency(leviesData.totalLevies),
    }

    const csvContent = Object.entries(reportData)
      .map(([key, value]) => `"${key}","${value}"`)
      .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `gra-levies-return-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">GRA Levies Return</h1>
          <p className="text-gray-600">Monthly GRA Levies Return for submission</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2 print:hidden">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>

      <div className="space-y-6 text-sm">
        <Card>
          <CardHeader>
            <CardTitle>Monthly GRA Levies Return</CardTitle>
            <CardDescription>
              Generated on{" "}
              {new Date().toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">OUTPUTS DURING THIS MONTH (Based on Gross Sales)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4 font-medium">NHIL</div>
              <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                {formatCurrency(leviesData.nhilBase)}
              </div>
              <div className="col-span-1 text-center">2.5%</div>
              <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                {formatCurrency(leviesData.nhilLevy)}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4 font-medium">GETFund LEVY</div>
              <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                {formatCurrency(leviesData.getfundBase)}
              </div>
              <div className="col-span-1 text-center">2.5%</div>
              <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                {formatCurrency(leviesData.getfundLevy)}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4 font-medium">COVID-19 HRL</div>
              <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                {formatCurrency(leviesData.covidBase)}
              </div>
              <div className="col-span-1 text-center">1%</div>
              <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                {formatCurrency(leviesData.covidLevy)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-lg text-indigo-800">TOTAL GRA LEVIES PAYABLE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="col-span-2 text-lg font-bold text-indigo-800">Total Levies Payable to GRA</div>
              <div className="col-span-1 p-3 bg-indigo-100 border-2 border-indigo-300 rounded text-right text-lg font-bold text-indigo-700">
                {formatCurrency(leviesData.totalLevies)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
