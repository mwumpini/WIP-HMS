"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleGuard } from "@/components/role-guard"
import { Download, FileText, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface FinancialData {
  assets: {
    currentAssets: {
      cash: number
      accountsReceivable: number
      inventory: number
      prepaidExpenses: number
    }
    fixedAssets: {
      propertyPlantEquipment: number
      accumulatedDepreciation: number
    }
  }
  liabilities: {
    currentLiabilities: {
      accountsPayable: number
      accruedExpenses: number
      shortTermDebt: number
      taxesPayable: number
    }
    longTermLiabilities: {
      longTermDebt: number
      deferredTaxLiabilities: number
    }
  }
  equity: {
    ownerEquity: number
    retainedEarnings: number
  }
  revenue: {
    roomRevenue: number
    foodBeverageRevenue: number
    otherRevenue: number
  }
  expenses: {
    costOfSales: number
    operatingExpenses: number
    administrativeExpenses: number
    interestExpense: number
  }
}

export default function FinancialReportsPage() {
  const [period, setPeriod] = useState("current")
  const [reportType, setReportType] = useState("balance-sheet")
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadFinancialData()
  }, [period])

  const loadFinancialData = () => {
    // Load data from various localStorage sources and calculate financial statements
    const sales = JSON.parse(localStorage.getItem("sales") || "[]")
    const expenses = JSON.parse(localStorage.getItem("ghanaTaxExpenses") || "[]")
    const inventory = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
    const staff = JSON.parse(localStorage.getItem("payrollStaff") || "[]")

    // Calculate financial data
    const totalRevenue = sales.reduce((sum: number, sale: any) => sum + (Number.parseFloat(sale.totalAmount) || 0), 0)
    const totalExpenses = expenses.reduce(
      (sum: number, expense: any) => sum + (Number.parseFloat(expense.amount) || 0),
      0,
    )
    const inventoryValue = inventory.reduce(
      (sum: number, item: any) =>
        sum + (Number.parseFloat(item.quantity) || 0) * (Number.parseFloat(item.unitCost) || 0),
      0,
    )
    const totalSalaries = staff.reduce(
      (sum: number, member: any) => sum + (Number.parseFloat(member.basicSalary) || 0),
      0,
    )

    // Mock financial data structure (in real app, this would come from proper accounting system)
    const data: FinancialData = {
      assets: {
        currentAssets: {
          cash: totalRevenue * 0.15, // Assume 15% of revenue is cash
          accountsReceivable: totalRevenue * 0.08, // 8% in receivables
          inventory: inventoryValue,
          prepaidExpenses: totalExpenses * 0.02, // 2% prepaid
        },
        fixedAssets: {
          propertyPlantEquipment: 500000, // Fixed amount for demo
          accumulatedDepreciation: -50000,
        },
      },
      liabilities: {
        currentLiabilities: {
          accountsPayable: totalExpenses * 0.12, // 12% in payables
          accruedExpenses: totalSalaries * 0.1, // 10% accrued
          shortTermDebt: 25000,
          taxesPayable: totalRevenue * 0.05, // 5% tax liability
        },
        longTermLiabilities: {
          longTermDebt: 150000,
          deferredTaxLiabilities: 10000,
        },
      },
      equity: {
        ownerEquity: 200000,
        retainedEarnings: totalRevenue - totalExpenses - totalSalaries,
      },
      revenue: {
        roomRevenue: totalRevenue * 0.6, // 60% room revenue
        foodBeverageRevenue: totalRevenue * 0.35, // 35% F&B
        otherRevenue: totalRevenue * 0.05, // 5% other
      },
      expenses: {
        costOfSales: totalRevenue * 0.25, // 25% COGS
        operatingExpenses: totalExpenses * 0.6, // 60% operating
        administrativeExpenses: totalExpenses * 0.3, // 30% admin
        interestExpense: totalExpenses * 0.1, // 10% interest
      },
    }

    setFinancialData(data)
  }

  const exportReport = (type: string) => {
    if (!financialData) return

    let csvContent = ""
    let filename = ""

    switch (type) {
      case "balance-sheet":
        csvContent = [
          "BALANCE SHEET",
          "ASSETS",
          "Current Assets",
          `Cash and Cash Equivalents,${financialData.assets.currentAssets.cash.toFixed(2)}`,
          `Accounts Receivable,${financialData.assets.currentAssets.accountsReceivable.toFixed(2)}`,
          `Inventory,${financialData.assets.currentAssets.inventory.toFixed(2)}`,
          `Prepaid Expenses,${financialData.assets.currentAssets.prepaidExpenses.toFixed(2)}`,
          `Total Current Assets,${(
            financialData.assets.currentAssets.cash +
              financialData.assets.currentAssets.accountsReceivable +
              financialData.assets.currentAssets.inventory +
              financialData.assets.currentAssets.prepaidExpenses
          ).toFixed(2)}`,
          "",
          "Fixed Assets",
          `Property Plant & Equipment,${financialData.assets.fixedAssets.propertyPlantEquipment.toFixed(2)}`,
          `Less: Accumulated Depreciation,${financialData.assets.fixedAssets.accumulatedDepreciation.toFixed(2)}`,
          `Net Fixed Assets,${(
            financialData.assets.fixedAssets.propertyPlantEquipment +
              financialData.assets.fixedAssets.accumulatedDepreciation
          ).toFixed(2)}`,
          "",
          "LIABILITIES",
          "Current Liabilities",
          `Accounts Payable,${financialData.liabilities.currentLiabilities.accountsPayable.toFixed(2)}`,
          `Accrued Expenses,${financialData.liabilities.currentLiabilities.accruedExpenses.toFixed(2)}`,
          `Short-term Debt,${financialData.liabilities.currentLiabilities.shortTermDebt.toFixed(2)}`,
          `Taxes Payable,${financialData.liabilities.currentLiabilities.taxesPayable.toFixed(2)}`,
          "",
          "EQUITY",
          `Owner's Equity,${financialData.equity.ownerEquity.toFixed(2)}`,
          `Retained Earnings,${financialData.equity.retainedEarnings.toFixed(2)}`,
        ].join("\n")
        filename = "balance-sheet"
        break
      case "income-statement":
        csvContent = [
          "INCOME STATEMENT",
          "REVENUE",
          `Room Revenue,${financialData.revenue.roomRevenue.toFixed(2)}`,
          `Food & Beverage Revenue,${financialData.revenue.foodBeverageRevenue.toFixed(2)}`,
          `Other Revenue,${financialData.revenue.otherRevenue.toFixed(2)}`,
          `Total Revenue,${(
            financialData.revenue.roomRevenue +
              financialData.revenue.foodBeverageRevenue +
              financialData.revenue.otherRevenue
          ).toFixed(2)}`,
          "",
          "EXPENSES",
          `Cost of Sales,${financialData.expenses.costOfSales.toFixed(2)}`,
          `Operating Expenses,${financialData.expenses.operatingExpenses.toFixed(2)}`,
          `Administrative Expenses,${financialData.expenses.administrativeExpenses.toFixed(2)}`,
          `Interest Expense,${financialData.expenses.interestExpense.toFixed(2)}`,
          `Total Expenses,${(
            financialData.expenses.costOfSales +
              financialData.expenses.operatingExpenses +
              financialData.expenses.administrativeExpenses +
              financialData.expenses.interestExpense
          ).toFixed(2)}`,
          "",
          `Net Income,${(
            financialData.revenue.roomRevenue +
              financialData.revenue.foodBeverageRevenue +
              financialData.revenue.otherRevenue -
              financialData.expenses.costOfSales -
              financialData.expenses.operatingExpenses -
              financialData.expenses.administrativeExpenses -
              financialData.expenses.interestExpense
          ).toFixed(2)}`,
        ].join("\n")
        filename = "income-statement"
        break
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!financialData) {
    return <div>Loading financial data...</div>
  }

  const totalAssets =
    financialData.assets.currentAssets.cash +
    financialData.assets.currentAssets.accountsReceivable +
    financialData.assets.currentAssets.inventory +
    financialData.assets.currentAssets.prepaidExpenses +
    financialData.assets.fixedAssets.propertyPlantEquipment +
    financialData.assets.fixedAssets.accumulatedDepreciation

  const totalLiabilities =
    financialData.liabilities.currentLiabilities.accountsPayable +
    financialData.liabilities.currentLiabilities.accruedExpenses +
    financialData.liabilities.currentLiabilities.shortTermDebt +
    financialData.liabilities.currentLiabilities.taxesPayable +
    financialData.liabilities.longTermLiabilities.longTermDebt +
    financialData.liabilities.longTermLiabilities.deferredTaxLiabilities

  const totalEquity = financialData.equity.ownerEquity + financialData.equity.retainedEarnings

  const totalRevenue =
    financialData.revenue.roomRevenue + financialData.revenue.foodBeverageRevenue + financialData.revenue.otherRevenue

  const totalExpenses =
    financialData.expenses.costOfSales +
    financialData.expenses.operatingExpenses +
    financialData.expenses.administrativeExpenses +
    financialData.expenses.interestExpense

  const netIncome = totalRevenue - totalExpenses

  return (
    <RoleGuard allowedRoles={["administrator", "management", "accountant"]}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground">Professional financial statements and analysis</p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Period</SelectItem>
                <SelectItem value="previous">Previous Period</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
            <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          </TabsList>

          <TabsContent value="balance-sheet" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Balance Sheet</h2>
              <Button onClick={() => exportReport("balance-sheet")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Assets */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Current Assets</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Cash and Cash Equivalents</span>
                        <span>GHS {financialData.assets.currentAssets.cash.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accounts Receivable</span>
                        <span>GHS {financialData.assets.currentAssets.accountsReceivable.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inventory</span>
                        <span>GHS {financialData.assets.currentAssets.inventory.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prepaid Expenses</span>
                        <span>GHS {financialData.assets.currentAssets.prepaidExpenses.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total Current Assets</span>
                        <span>
                          GHS{" "}
                          {(
                            financialData.assets.currentAssets.cash +
                            financialData.assets.currentAssets.accountsReceivable +
                            financialData.assets.currentAssets.inventory +
                            financialData.assets.currentAssets.prepaidExpenses
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Fixed Assets</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Property, Plant & Equipment</span>
                        <span>GHS {financialData.assets.fixedAssets.propertyPlantEquipment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Less: Accumulated Depreciation</span>
                        <span>GHS {financialData.assets.fixedAssets.accumulatedDepreciation.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Net Fixed Assets</span>
                        <span>
                          GHS{" "}
                          {(
                            financialData.assets.fixedAssets.propertyPlantEquipment +
                            financialData.assets.fixedAssets.accumulatedDepreciation
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-lg border-t-2 pt-2">
                    <span>TOTAL ASSETS</span>
                    <span>GHS {totalAssets.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Liabilities & Equity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Liabilities & Equity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Current Liabilities</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Accounts Payable</span>
                        <span>GHS {financialData.liabilities.currentLiabilities.accountsPayable.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accrued Expenses</span>
                        <span>GHS {financialData.liabilities.currentLiabilities.accruedExpenses.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Short-term Debt</span>
                        <span>GHS {financialData.liabilities.currentLiabilities.shortTermDebt.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes Payable</span>
                        <span>GHS {financialData.liabilities.currentLiabilities.taxesPayable.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Long-term Liabilities</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Long-term Debt</span>
                        <span>GHS {financialData.liabilities.longTermLiabilities.longTermDebt.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deferred Tax Liabilities</span>
                        <span>
                          GHS {financialData.liabilities.longTermLiabilities.deferredTaxLiabilities.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Total Liabilities</span>
                    <span>GHS {totalLiabilities.toFixed(2)}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Equity</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Owner's Equity</span>
                        <span>GHS {financialData.equity.ownerEquity.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retained Earnings</span>
                        <span>GHS {financialData.equity.retainedEarnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Total Equity</span>
                    <span>GHS {totalEquity.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg border-t-2 pt-2">
                    <span>TOTAL LIABILITIES & EQUITY</span>
                    <span>GHS {(totalLiabilities + totalEquity).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="income-statement" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Income Statement</h2>
              <Button onClick={() => exportReport("income-statement")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>Revenue and expenses for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Revenue</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Room Revenue</span>
                      <span>GHS {financialData.revenue.roomRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Food & Beverage Revenue</span>
                      <span>GHS {financialData.revenue.foodBeverageRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Revenue</span>
                      <span>GHS {financialData.revenue.otherRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total Revenue</span>
                      <span>GHS {totalRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Expenses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cost of Sales</span>
                      <span>GHS {financialData.expenses.costOfSales.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operating Expenses</span>
                      <span>GHS {financialData.expenses.operatingExpenses.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Administrative Expenses</span>
                      <span>GHS {financialData.expenses.administrativeExpenses.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Expense</span>
                      <span>GHS {financialData.expenses.interestExpense.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total Expenses</span>
                      <span>GHS {totalExpenses.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-xl border-t-2 pt-4">
                  <span>Net Income</span>
                  <span className={netIncome >= 0 ? "text-green-600" : "text-red-600"}>
                    {netIncome >= 0 ? (
                      <TrendingUp className="h-5 w-5 inline mr-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 inline mr-1" />
                    )}
                    GHS {netIncome.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {totalRevenue > 0 ? ((netIncome / totalRevenue) * 100).toFixed(1) : "0"}%
                        </div>
                        <p className="text-sm text-muted-foreground">Net Profit Margin</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {totalRevenue > 0
                            ? ((financialData.expenses.costOfSales / totalRevenue) * 100).toFixed(1)
                            : "0"}
                          %
                        </div>
                        <p className="text-sm text-muted-foreground">Cost of Sales %</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {totalRevenue > 0
                            ? ((financialData.expenses.operatingExpenses / totalRevenue) * 100).toFixed(1)
                            : "0"}
                          %
                        </div>
                        <p className="text-sm text-muted-foreground">Operating Expense %</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cash-flow" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Cash Flow Statement</h2>
              <Button onClick={() => exportReport("cash-flow")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Statement</CardTitle>
                <CardDescription>Cash flows from operating, investing, and financing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Cash Flow Statement coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This feature will be available in the next update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
