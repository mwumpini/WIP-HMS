"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Download, Printer, Plus, DollarSign } from "lucide-react"
import Link from "next/link"

interface VATData {
  totalGrossSales: number
  totalGRALevies: number
  totalStandardRatedBase: number
  totalOutputVAT: number
  totalInputVATFlatBase: number
  totalInputVATFlat: number
  totalInputVATStandardBase: number
  totalInputVATStandard: number
  totalInputVATZeroBase: number
  totalInputVATZero: number
  totalWithholdingBase: number
  totalWithholdingCredit: number
  totalInputVAT: number
  vatPayable: number
}

interface VATRecord {
  id: string
  period: string
  dateProcessed: string
  amountProcessed: number
  amountPaid: number
  paymentDate?: string
  status: "Processed" | "Paid" | "Partial" | "Overdue"
  journalReference?: string
  notes?: string
}

export default function VATReturnPage() {
  const [vatData, setVatData] = useState<VATData>({
    totalGrossSales: 0,
    totalGRALevies: 0,
    totalStandardRatedBase: 0,
    totalOutputVAT: 0,
    totalInputVATFlatBase: 0,
    totalInputVATFlat: 0,
    totalInputVATStandardBase: 0,
    totalInputVATStandard: 0,
    totalInputVATZeroBase: 0,
    totalInputVATZero: 0,
    totalWithholdingBase: 0,
    totalWithholdingCredit: 0,
    totalInputVAT: 0,
    vatPayable: 0,
  })

  const [vatRecords, setVatRecords] = useState<VATRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<VATRecord | null>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [journalRef, setJournalRef] = useState("")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  const updateVATData = () => {
    try {
      const sales = JSON.parse(localStorage.getItem("sales") || "[]")
      const expenses = JSON.parse(localStorage.getItem("expenses") || "[]")
      const withholdingTaxes = JSON.parse(localStorage.getItem("withholdingTaxes") || "[]")

      // Calculate total gross sales
      const totalGrossSales = sales.reduce((sum: number, s: any) => sum + (s.subtotal || s.grossAmount || 0), 0)

      // Calculate GRA levies (6% of gross sales: NHIL 2.5% + GETFund 2.5% + COVID 1%)
      const totalGRALevies = totalGrossSales * 0.06

      // Standard rated base = gross sales + GRA levies
      const totalStandardRatedBase = totalGrossSales + totalGRALevies

      // Output VAT = 15% of standard rated base
      const totalOutputVAT = totalStandardRatedBase * 0.15

      // Input VAT calculations
      const totalInputVATFlatBase = expenses
        .filter((e: any) => e.vatType === "flat")
        .reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
      const totalInputVATFlat = totalInputVATFlatBase * 0.03 // 3% flat rate

      const totalInputVATStandardBase = expenses
        .filter((e: any) => e.vatType === "standard")
        .reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
      const totalInputVATStandard = totalInputVATStandardBase * 0.15 // 15% standard rate

      const totalInputVATZeroBase = expenses
        .filter((e: any) => e.vatType === "zero")
        .reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
      const totalInputVATZero = 0 // Zero rated

      // Withholding tax credit
      const totalWithholdingBase = withholdingTaxes.reduce((sum: number, w: any) => sum + (w.amount || 0), 0)
      const totalWithholdingCredit = withholdingTaxes.reduce(
        (sum: number, w: any) => sum + (w.withholdingAmount || 0),
        0,
      )

      const totalInputVAT = totalInputVATFlat + totalInputVATStandard + totalInputVATZero + totalWithholdingCredit
      const vatPayable = totalOutputVAT - totalInputVAT

      setVatData({
        totalGrossSales,
        totalGRALevies,
        totalStandardRatedBase,
        totalOutputVAT,
        totalInputVATFlatBase,
        totalInputVATFlat,
        totalInputVATStandardBase,
        totalInputVATStandard,
        totalInputVATZeroBase,
        totalInputVATZero,
        totalWithholdingBase,
        totalWithholdingCredit,
        totalInputVAT,
        vatPayable,
      })
    } catch (error) {
      console.error("Error calculating VAT data:", error)
    }
  }

  useEffect(() => {
    updateVATData()

    // Listen for storage changes
    const handleStorageChange = () => {
      updateVATData()
    }

    window.addEventListener("storage", handleStorageChange)

    // Listen for custom events
    window.addEventListener("salesUpdated", handleStorageChange)
    window.addEventListener("expensesUpdated", handleStorageChange)

    // Poll for updates every 2 seconds
    const interval = setInterval(updateVATData, 2000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("salesUpdated", handleStorageChange)
      window.removeEventListener("expensesUpdated", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Load VAT records from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("vatRecords")
    if (savedRecords) {
      setVatRecords(JSON.parse(savedRecords))
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
      "Report Type": "Monthly VAT Return",
      "Generated Date": new Date().toLocaleDateString(),
      "Total Gross Sales": formatCurrency(vatData.totalGrossSales),
      "GRA Levies (6%)": formatCurrency(vatData.totalGRALevies),
      "Standard Rated Base": formatCurrency(vatData.totalStandardRatedBase),
      "Output VAT (15%)": formatCurrency(vatData.totalOutputVAT),
      "Input VAT - Flat Rate Base": formatCurrency(vatData.totalInputVATFlatBase),
      "Input VAT - Flat Rate (3%)": formatCurrency(vatData.totalInputVATFlat),
      "Input VAT - Standard Base": formatCurrency(vatData.totalInputVATStandardBase),
      "Input VAT - Standard (15%)": formatCurrency(vatData.totalInputVATStandard),
      "Input VAT - Zero Rated Base": formatCurrency(vatData.totalInputVATZeroBase),
      "Input VAT - Zero Rated (0%)": formatCurrency(vatData.totalInputVATZero),
      "Withholding Tax Credit": formatCurrency(vatData.totalWithholdingCredit),
      "Total Output VAT": formatCurrency(vatData.totalOutputVAT),
      "Total Input VAT": formatCurrency(vatData.totalInputVAT),
      "VAT Payable": formatCurrency(vatData.vatPayable),
    }

    const csvContent = Object.entries(reportData)
      .map(([key, value]) => `"${key}","${value}"`)
      .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `vat-return-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  // Save current calculation as a record
  const saveCurrentRecord = () => {
    const currentPeriod = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })
    const newRecord: VATRecord = {
      id: Date.now().toString(),
      period: currentPeriod,
      dateProcessed: new Date().toISOString().split("T")[0],
      amountProcessed: vatData.vatPayable,
      amountPaid: 0,
      status: "Processed",
    }

    const updatedRecords = [newRecord, ...vatRecords]
    setVatRecords(updatedRecords)
    localStorage.setItem("vatRecords", JSON.stringify(updatedRecords))
  }

  // Record payment for a VAT record
  const recordPayment = () => {
    if (!selectedRecord) return

    const payment = Number.parseFloat(paymentAmount)
    const updatedRecord = {
      ...selectedRecord,
      amountPaid: selectedRecord.amountPaid + payment,
      paymentDate: paymentDate,
      journalReference: journalRef,
      status:
        selectedRecord.amountPaid + payment >= selectedRecord.amountProcessed
          ? ("Paid" as const)
          : ("Partial" as const),
    }

    const updatedRecords = vatRecords.map((record) => (record.id === selectedRecord.id ? updatedRecord : record))

    setVatRecords(updatedRecords)
    localStorage.setItem("vatRecords", JSON.stringify(updatedRecords))

    // Create journal entry
    const journalEntry = {
      id: Date.now().toString(),
      date: paymentDate,
      reference: journalRef,
      description: `VAT Payment - ${selectedRecord.period}`,
      debit: { account: "VAT Payable", amount: payment },
      credit: { account: "Cash/Bank", amount: payment },
    }

    // Save to journal entries
    const existingJournal = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    existingJournal.push(journalEntry)
    localStorage.setItem("journalEntries", JSON.stringify(existingJournal))

    setShowPaymentDialog(false)
    setPaymentAmount("")
    setPaymentDate("")
    setJournalRef("")
    setSelectedRecord(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-600 bg-green-50"
      case "Partial":
        return "text-yellow-600 bg-yellow-50"
      case "Overdue":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
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
          <h1 className="text-3xl font-bold">VAT Return</h1>
          <p className="text-gray-600">Monthly VAT Return for GRA submission</p>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Period</TabsTrigger>
          <TabsTrigger value="records">VAT Records</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="flex justify-end space-x-2 print:hidden">
            <Button onClick={saveCurrentRecord} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Save Record
            </Button>
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
                <CardTitle>Monthly VAT Return (for GRA)</CardTitle>
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
                <CardTitle className="text-lg">SUPPLIES OF GOODS AND/OR SERVICES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-2 items-center text-sm text-gray-600">
                    <div className="col-span-4">Gross Sales</div>
                    <div className="col-span-4 p-2 bg-gray-100 border rounded text-right">
                      {formatCurrency(vatData.totalGrossSales)}
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-3"></div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center text-sm text-gray-600">
                    <div className="col-span-4">Add: GRA Levies (6%)</div>
                    <div className="col-span-4 p-2 bg-gray-100 border rounded text-right">
                      {formatCurrency(vatData.totalGRALevies)}
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-3"></div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center border-t pt-2">
                    <div className="col-span-4 font-medium">STANDARD RATED</div>
                    <div className="col-span-4 p-2 bg-gray-50 border rounded text-right font-medium">
                      {formatCurrency(vatData.totalStandardRatedBase)}
                    </div>
                    <div className="col-span-1 text-center">15%</div>
                    <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                      {formatCurrency(vatData.totalOutputVAT)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PURCHASES AND EXPENSES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 font-medium">LOCAL INPUT (FLAT RATE)</div>
                  <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                    {formatCurrency(vatData.totalInputVATFlatBase)}
                  </div>
                  <div className="col-span-1 text-center">3%</div>
                  <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                    {formatCurrency(vatData.totalInputVATFlat)}
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 font-medium">LOCAL INPUT (STANDARD)</div>
                  <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                    {formatCurrency(vatData.totalInputVATStandardBase)}
                  </div>
                  <div className="col-span-1 text-center">15%</div>
                  <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                    {formatCurrency(vatData.totalInputVATStandard)}
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 font-medium">LOCAL INPUT (ZERO RATED)</div>
                  <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                    {formatCurrency(vatData.totalInputVATZeroBase)}
                  </div>
                  <div className="col-span-1 text-center">0%</div>
                  <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                    {formatCurrency(vatData.totalInputVATZero)}
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 font-medium">WITHHOLDING VAT CREDIT</div>
                  <div className="col-span-4 p-2 bg-gray-50 border rounded text-right">
                    {formatCurrency(vatData.totalWithholdingBase)}
                  </div>
                  <div className="col-span-1 text-center">7%</div>
                  <div className="col-span-3 p-2 bg-gray-50 border rounded text-right font-bold">
                    {formatCurrency(vatData.totalWithholdingCredit)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">VAT PAYABLE / (CREDIT)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-1 font-medium">Total Output VAT</div>
                  <div className="col-span-2 p-2 bg-white border rounded text-right font-bold">
                    {formatCurrency(vatData.totalOutputVAT)}
                  </div>
                  <div className="col-span-1 font-medium">Less: Total Input VAT</div>
                  <div className="col-span-2 p-2 bg-white border rounded text-right font-bold">
                    {formatCurrency(vatData.totalInputVAT)}
                  </div>
                  <div className="col-span-1 text-lg font-bold text-blue-800">VAT Payable</div>
                  <div className="col-span-2 p-3 bg-blue-100 border-2 border-blue-300 rounded text-right text-lg font-bold text-blue-800">
                    {formatCurrency(vatData.vatPayable)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VAT Records History</CardTitle>
              <CardDescription>Track processed amounts vs actual payments with journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vatRecords.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No VAT records found. Save your current calculation to create the first record.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {vatRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{record.period}</h4>
                            <p className="text-sm text-muted-foreground">Processed: {record.dateProcessed}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}
                          >
                            {record.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Amount Processed</p>
                            <p className="font-semibold">GH₵{formatCurrency(record.amountProcessed)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Amount Paid</p>
                            <p className="font-semibold">GH₵{formatCurrency(record.amountPaid)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Balance</p>
                            <p className="font-semibold text-red-600">
                              GH₵{formatCurrency(record.amountProcessed - record.amountPaid)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Payment Date</p>
                            <p className="font-semibold">{record.paymentDate || "Not paid"}</p>
                          </div>
                        </div>

                        {record.journalReference && (
                          <div className="text-sm">
                            <p className="text-muted-foreground">
                              Journal Reference: <span className="font-medium">{record.journalReference}</span>
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedRecord(record)
                              setShowPaymentDialog(true)
                            }}
                            disabled={record.status === "Paid"}
                          >
                            <DollarSign className="h-4 w-4 mr-1" />
                            Record Payment
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record VAT Payment</DialogTitle>
            <DialogDescription>Record payment for {selectedRecord?.period} VAT return</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>
                Amount Due: GH₵
                {selectedRecord ? formatCurrency(selectedRecord.amountProcessed - selectedRecord.amountPaid) : "0.00"}
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Payment Amount</Label>
              <Input
                id="paymentAmount"
                type="number"
                step="0.01"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter payment amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="journalRef">Journal Reference</Label>
              <Input
                id="journalRef"
                value={journalRef}
                onChange={(e) => setJournalRef(e.target.value)}
                placeholder="e.g., JE-2024-001"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={recordPayment} disabled={!paymentAmount || !paymentDate || !journalRef}>
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
