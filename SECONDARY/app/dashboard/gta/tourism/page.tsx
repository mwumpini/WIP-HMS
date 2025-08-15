"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"

interface TourismData {
  totalGrossSales: number
  tourismBase: number
  tourismLevy: number
  totalPayable: number
}

export default function TourismLevyPage() {
  const [tourismData, setTourismData] = useState<TourismData>({
    totalGrossSales: 0,
    tourismBase: 0,
    tourismLevy: 0,
    totalPayable: 0,
  })

  const updateTourismData = () => {
    try {
      const sales = JSON.parse(localStorage.getItem("sales") || "[]")

      const totalGrossSales = sales.reduce((sum: number, s: any) => sum + (s.subtotal || s.grossAmount || 0), 0)

      // Tourism levy is 1% of gross sales
      const tourismBase = totalGrossSales
      const tourismLevy = totalGrossSales * 0.01 // 1%
      const totalPayable = tourismLevy

      setTourismData({
        totalGrossSales,
        tourismBase,
        tourismLevy,
        totalPayable,
      })
    } catch (error) {
      console.error("Error calculating tourism data:", error)
    }
  }

  useEffect(() => {
    updateTourismData()

    // Listen for storage changes
    const handleStorageChange = () => {
      updateTourismData()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("salesUpdated", handleStorageChange)

    // Poll for updates every 2 seconds
    const interval = setInterval(updateTourismData, 2000)

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
      "Report Type": "Monthly Tourism Development Levy Return",
      "Generated Date": new Date().toLocaleDateString(),
      "Total Gross Sales": formatCurrency(tourismData.totalGrossSales),
      "Tourism Levy Base": formatCurrency(tourismData.tourismBase),
      "Tourism Levy (1%)": formatCurrency(tourismData.tourismLevy),
      "Total Payable to GTA": formatCurrency(tourismData.totalPayable),
    }

    const csvContent = Object.entries(reportData)
      .map(([key, value]) => `"${key}","${value}"`)
      .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `tourism-levy-return-${new Date().toISOString().split("T")[0]}.csv`
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
          <h1 className="text-3xl font-bold">Tourism Development Levy</h1>
          <p className="text-gray-600">Monthly Tourism Development Levy Return for GTA</p>
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
            <CardTitle>Monthly Tourism Development Levy Return</CardTitle>
            <CardDescription>
              This levy is payable to the Ghana Tourism Authority (GTA). Generated on{" "}
              {new Date().toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-teal-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-lg text-teal-800">CALCULATION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4 font-medium text-teal-700">Total Gross Sales</div>
              <div className="col-span-4 p-2 bg-white border rounded text-right">
                {formatCurrency(tourismData.tourismBase)}
              </div>
              <div className="col-span-1 text-center">1%</div>
              <div className="col-span-3 p-2 bg-teal-100 border rounded text-right font-bold text-teal-700">
                {formatCurrency(tourismData.tourismLevy)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-teal-100 border-teal-300">
          <CardHeader>
            <CardTitle className="text-lg text-teal-800">TOTAL TOURISM LEVY PAYABLE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="col-span-2 text-lg font-bold text-teal-800">Total Payable to GTA</div>
              <div className="col-span-1 p-3 bg-teal-200 border-2 border-teal-400 rounded text-right text-lg font-bold text-teal-700">
                {formatCurrency(tourismData.totalPayable)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
