"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search, Download, Edit, Trash2, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { exportToCSV } from "@/lib/csv-export"
import { safeGetItem, safeSetItem } from "@/lib/storage"
import { validateFormData, sanitizeString, validateNumber } from "@/lib/validation"
import { handleError } from "@/lib/error-handling"
import { ContextualNavigation } from "@/components/contextual-navigation"
import { PageNavigation } from "@/components/page-navigation"

interface Expense {
  id: number
  date: string
  paymentDetails: string
  supplier: string
  amount: number
  category: string
  vatType: string
  mop: string
  isWithholding: boolean
  withholdingType: string | null
  inputVat: number
}

const categories = [
  "Office Supplies",
  "Travel & Transport",
  "Utilities",
  "Marketing",
  "Professional Services",
  "Equipment",
  "Maintenance",
  "Insurance",
  "Other",
]

const vatTypes = ["standard", "zero-rated", "exempt"]
const mopOptions = ["cash", "cheque", "bank transfer", "mobile money", "card"]
const withholdingTypes = ["5% Services", "10% Rent", "15% Goods", "20% Commission"]

export default function ExpensesLogPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [loading, setLoading] = useState(true)
  const [editFormData, setEditFormData] = useState({
    date: "",
    paymentDetails: "",
    supplier: "",
    amount: "",
    category: "",
    vatType: "",
    mop: "",
    isWithholding: false,
    withholdingType: "",
  })

  const { toast } = useToast()

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = () => {
    try {
      setLoading(true)
      const storedExpenses = safeGetItem<Expense[]>("ghanaTaxExpenses", [])
      setExpenses(storedExpenses)
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Error Loading Expenses",
        description: message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const calculateInputVat = (amount: number, vatType: string) => {
    if (vatType === "standard") {
      return (amount * 0.15) / 1.15 // VAT inclusive calculation
    }
    return 0
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        const updatedExpenses = expenses.filter((e) => e.id !== id)
        setExpenses(updatedExpenses)
        safeSetItem("ghanaTaxExpenses", updatedExpenses)

        toast({
          title: "Success",
          description: "Expense deleted successfully",
        })
      } catch (error) {
        const { message } = handleError(error)
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setEditFormData({
      date: expense.date,
      paymentDetails: expense.paymentDetails,
      supplier: expense.supplier,
      amount: expense.amount.toString(),
      category: expense.category,
      vatType: expense.vatType,
      mop: expense.mop,
      isWithholding: expense.isWithholding,
      withholdingType: expense.withholdingType || "",
    })
  }

  const handleDuplicate = (expense: Expense) => {
    try {
      const newId = Math.max(...expenses.map((e) => e.id)) + 1
      const duplicatedExpense = {
        ...expense,
        id: newId,
        date: new Date().toISOString().split("T")[0],
      }
      const updatedExpenses = [...expenses, duplicatedExpense]
      setExpenses(updatedExpenses)
      safeSetItem("ghanaTaxExpenses", updatedExpenses)

      toast({
        title: "Success",
        description: "Expense duplicated successfully",
      })
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    }
  }

  const handleSaveEdit = () => {
    if (!editingExpense) return

    try {
      const validationRules = {
        date: ["required", "date"],
        paymentDetails: ["required"],
        supplier: ["required"],
        amount: ["required", "number"],
        category: ["required"],
        vatType: ["required"],
        mop: ["required"],
      }

      const validationResult = validateFormData(editFormData, validationRules)

      if (!validationResult.isValid) {
        toast({
          title: "Validation Error",
          description: validationResult.errors.join(", "),
          variant: "destructive",
        })
        return
      }

      const amount = Number.parseFloat(editFormData.amount)
      if (!validateNumber(amount) || amount <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid positive amount",
          variant: "destructive",
        })
        return
      }

      const inputVat = calculateInputVat(amount, editFormData.vatType)

      const updatedExpense = {
        ...editingExpense,
        date: editFormData.date,
        paymentDetails: sanitizeString(editFormData.paymentDetails),
        supplier: sanitizeString(editFormData.supplier),
        amount,
        category: editFormData.category,
        vatType: editFormData.vatType,
        mop: editFormData.mop,
        isWithholding: editFormData.isWithholding,
        withholdingType: editFormData.isWithholding ? editFormData.withholdingType : null,
        inputVat,
      }

      const updatedExpenses = expenses.map((e) => (e.id === editingExpense.id ? updatedExpense : e))
      setExpenses(updatedExpenses)
      safeSetItem("ghanaTaxExpenses", updatedExpenses)
      setEditingExpense(null)

      toast({
        title: "Success",
        description: "Expense updated successfully",
      })
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    }
  }

  const handleSort = (key: string) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const filteredAndSortedExpenses = expenses
    .filter((expense) =>
      Object.values(expense).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      const aVal = a[sortConfig.key as keyof Expense]
      const bVal = b[sortConfig.key as keyof Expense]

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })

  const handleExportCSV = () => {
    try {
      const columns = [
        { key: "date", label: "Date" },
        { key: "paymentDetails", label: "Payment Details" },
        { key: "supplier", label: "Supplier" },
        { key: "amount", label: "Amount", format: (value: number) => value.toFixed(2) },
        { key: "category", label: "Category" },
        { key: "mop", label: "MOP", format: (value: string) => value.toUpperCase() },
        { key: "vatType", label: "VAT Type" },
        {
          key: "isWithholding",
          label: "Withholding",
          format: (value: boolean, row: Expense) => (value ? `Yes (${row.withholdingType})` : "No"),
        },
        { key: "inputVat", label: "Input VAT", format: (value: number) => value.toFixed(2) },
      ]

      exportToCSV(filteredAndSortedExpenses, columns, "expenses_log")

      toast({
        title: "Export Successful",
        description: "Expenses data has been exported to CSV",
      })
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Export Failed",
        description: message,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading expenses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ContextualNavigation />

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Expenses Log</h1>
          <p className="text-gray-600">View and manage all expense transactions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>
                {filteredAndSortedExpenses.length} expense{filteredAndSortedExpenses.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("date")}>
                    Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("supplier")}>
                    Supplier {sortConfig.key === "supplier" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-right p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("amount")}>
                    Amount {sortConfig.key === "amount" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("category")}>
                    Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left p-3">MOP</th>
                  <th className="text-left p-3">VAT Type</th>
                  <th className="text-left p-3">Withholding</th>
                  <th className="text-right p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("inputVat")}>
                    Input VAT {sortConfig.key === "inputVat" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-500">
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedExpenses.map((expense) => (
                    <tr key={expense.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{expense.date}</td>
                      <td className="p-3">{expense.supplier}</td>
                      <td className="p-3 text-right font-bold">{formatCurrency(expense.amount)}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {expense.category}
                        </Badge>
                      </td>
                      <td className="p-3">{expense.mop.toUpperCase()}</td>
                      <td className="p-3 capitalize">{expense.vatType}</td>
                      <td className="p-3">
                        {expense.isWithholding ? (
                          <Badge variant="secondary" className="text-xs">
                            Yes ({expense.withholdingType})
                          </Badge>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-medium text-emerald-600">
                        {formatCurrency(expense.inputVat)}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(expense)}
                            className="text-blue-500 hover:text-blue-700 h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDuplicate(expense)}
                            className="text-green-500 hover:text-green-700 h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(expense.id)}
                            className="text-red-500 hover:text-red-700 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>Make changes to the expense transaction. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editFormData.date}
                  onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editFormData.amount}
                  onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-supplier">Supplier</Label>
              <Input
                id="edit-supplier"
                value={editFormData.supplier}
                onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-paymentDetails">Payment Details</Label>
              <Input
                id="edit-paymentDetails"
                value={editFormData.paymentDetails}
                onChange={(e) => setEditFormData({ ...editFormData, paymentDetails: e.target.value })}
                maxLength={200}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editFormData.category}
                  onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-mop">Method of Payment</Label>
                <Select
                  value={editFormData.mop}
                  onValueChange={(value) => setEditFormData({ ...editFormData, mop: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select MOP" />
                  </SelectTrigger>
                  <SelectContent>
                    {mopOptions.map((mop) => (
                      <SelectItem key={mop} value={mop}>
                        {mop.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-vatType">VAT Type</Label>
              <Select
                value={editFormData.vatType}
                onValueChange={(value) => setEditFormData({ ...editFormData, vatType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select VAT type" />
                </SelectTrigger>
                <SelectContent>
                  {vatTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-withholding"
                checked={editFormData.isWithholding}
                onCheckedChange={(checked) => setEditFormData({ ...editFormData, isWithholding: checked as boolean })}
              />
              <Label htmlFor="edit-withholding">Subject to withholding tax</Label>
            </div>
            {editFormData.isWithholding && (
              <div className="space-y-2">
                <Label htmlFor="edit-withholdingType">Withholding Type</Label>
                <Select
                  value={editFormData.withholdingType}
                  onValueChange={(value) => setEditFormData({ ...editFormData, withholdingType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select withholding type" />
                  </SelectTrigger>
                  <SelectContent>
                    {withholdingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditingExpense(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PageNavigation />
    </div>
  )
}
