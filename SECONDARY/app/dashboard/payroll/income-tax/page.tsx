"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calculator } from "lucide-react"
import Link from "next/link"

interface TaxCalculation {
  grossIncome: number
  taxableIncome: number
  payeTax: number
  ssnitContribution: number
  tier2Pension: number
  netIncome: number
}

export default function IncomeTaxCalculator() {
  const [basicIncome, setBasicIncome] = useState<number>(0)
  const [allowances, setAllowances] = useState<number>(0)
  const [taxRelief, setTaxRelief] = useState<number>(0)
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false)

  // Calculate PAYE tax based on Ghana 2024 tax bands
  const calculatePayeTax = (taxableIncome: number): number => {
    let tax = 0
    let remainingIncome = taxableIncome

    // Monthly tax bands for 2024
    const taxBands = [
      { min: 0, max: 494, rate: 0 },
      { min: 494, max: 604, rate: 0.05 },
      { min: 604, max: 734, rate: 0.1 },
      { min: 734, max: 3901, rate: 0.175 },
      { min: 3901, max: 4257, rate: 0.25 },
      { min: 4257, max: Number.POSITIVE_INFINITY, rate: 0.3 },
    ]

    for (const band of taxBands) {
      if (remainingIncome <= 0) break
      const bandWidth = band.max - band.min
      const taxableInThisBand = Math.min(remainingIncome, bandWidth)
      if (taxableInThisBand > 0) {
        tax += taxableInThisBand * band.rate
        remainingIncome -= taxableInThisBand
      }
    }

    return Math.round(tax * 100) / 100
  }

  const calculateTax = (): TaxCalculation => {
    const grossIncome = basicIncome + allowances
    const taxableIncome = Math.max(0, grossIncome - taxRelief)

    const payeTax = calculatePayeTax(taxableIncome)
    const ssnitContribution = Math.round(grossIncome * 0.055 * 100) / 100
    const tier2Pension = Math.round(grossIncome * 0.05 * 100) / 100
    const netIncome = grossIncome - payeTax - ssnitContribution

    return {
      grossIncome,
      taxableIncome,
      payeTax,
      ssnitContribution,
      tier2Pension,
      netIncome: Math.round(netIncome * 100) / 100,
    }
  }

  const calculation = calculateTax()

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

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
            className="border-b-2 border-emerald-500 py-2 px-1 text-sm font-medium text-emerald-600"
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
          <h1 className="text-3xl font-bold">Income Tax Calculator</h1>
          <p className="text-gray-600">Calculate your net income and tax deductions</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center space-x-2">
              <Calculator className="h-6 w-6 text-emerald-600" />
              <span>Calculate Your Net Income and Tax Deductions</span>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Enter your salary details to see your take-home income, PAYE tax, and SSNIT contributions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Salary Information</h3>

              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Monthly basic income</Label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-gray-700">GHS</span>
                    <Input
                      type="number"
                      value={basicIncome || ""}
                      onChange={(e) => setBasicIncome(Number(e.target.value) || 0)}
                      placeholder="0"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Monthly allowances *</Label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-gray-700">GHS</span>
                    <Input
                      type="number"
                      value={allowances || ""}
                      onChange={(e) => setAllowances(Number(e.target.value) || 0)}
                      placeholder="0"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Tax relief</Label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-gray-700">GHS</span>
                    <Input
                      type="number"
                      value={taxRelief || ""}
                      onChange={(e) => setTaxRelief(Number(e.target.value) || 0)}
                      placeholder="0"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-emerald-50 rounded-lg p-6 text-center border border-emerald-200">
              <p className="text-sm text-emerald-600 mb-2">Net Income (take home after SSNIT and tax)</p>
              <p className="text-4xl font-bold text-emerald-700">{formatCurrency(calculation.netIncome)}</p>
            </div>

            {/* Tax Breakdown */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-600">Income Tax</p>
                <p className="font-semibold text-red-800">{formatCurrency(calculation.payeTax)}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600">SSNIT (Tier 1, 5.5%)</p>
                <p className="font-semibold text-purple-700">{formatCurrency(calculation.ssnitContribution)}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600">
                  Pension (Tier 2, 5%)
                  <br />
                  <span className="text-xs">(not deducted from take home)</span>
                </p>
                <p className="font-semibold text-blue-800">{formatCurrency(calculation.tier2Pension)}</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-emerald-700 border-emerald-700 hover:bg-emerald-50"
              >
                {showBreakdown ? "Hide" : "Show"} tax breakdown
              </Button>
            </div>

            {showBreakdown && (
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">Tax Breakdown Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Income:</span>
                    <span className="font-medium">{formatCurrency(calculation.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Less: Tax Relief:</span>
                    <span className="font-medium">-{formatCurrency(taxRelief)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Taxable Income:</span>
                    <span className="font-medium">{formatCurrency(calculation.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PAYE Tax:</span>
                    <span className="font-medium text-red-600">-{formatCurrency(calculation.payeTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SSNIT Contribution:</span>
                    <span className="font-medium text-purple-600">
                      -{formatCurrency(calculation.ssnitContribution)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Net Take Home:</span>
                    <span className="text-emerald-600">{formatCurrency(calculation.netIncome)}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <p className="text-xs text-gray-500 text-center">* Allowances are also taxed</p>

            <div className="text-center text-xs text-gray-500 space-y-1 bg-gray-50 p-4 rounded-lg">
              <p>
                We do our best to ensure the accuracy of this tool but we cannot be held responsible for any errors.
              </p>
              <p>Talk to us: support@ghanataxcalculator.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
