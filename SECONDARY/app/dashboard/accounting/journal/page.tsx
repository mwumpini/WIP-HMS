"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import type { JournalEntry, JournalLineItem, ChartOfAccount } from "@/types/accounting"
import { HOSPITALITY_CHART_OF_ACCOUNTS } from "@/types/accounting"

export default function JournalEntriesPage() {
  const [accounts, setAccounts] = useState<ChartOfAccount[]>([])
  const [journalEntry, setJournalEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split("T")[0],
    reference: "",
    description: "",
    lineItems: [
      { id: "1", accountId: "", accountCode: "", accountName: "", debit: 0, credit: 0, description: "" },
      { id: "2", accountId: "", accountCode: "", accountName: "", debit: 0, credit: 0, description: "" },
    ],
  })
  const { toast } = useToast()

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = () => {
    const existingAccounts = localStorage.getItem("chartOfAccounts")
    if (existingAccounts) {
      setAccounts(JSON.parse(existingAccounts))
    } else {
      // Initialize with default accounts
      const initialAccounts: ChartOfAccount[] = HOSPITALITY_CHART_OF_ACCOUNTS.map((account, index) => ({
        ...account,
        id: (index + 1).toString(),
        balance: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))
      setAccounts(initialAccounts)
      localStorage.setItem("chartOfAccounts", JSON.stringify(initialAccounts))
    }
  }

  const addLineItem = () => {
    const newLineItem: JournalLineItem = {
      id: Date.now().toString(),
      accountId: "",
      accountCode: "",
      accountName: "",
      debit: 0,
      credit: 0,
      description: "",
    }
    setJournalEntry((prev) => ({
      ...prev,
      lineItems: [...(prev.lineItems || []), newLineItem],
    }))
  }

  const removeLineItem = (id: string) => {
    setJournalEntry((prev) => ({
      ...prev,
      lineItems: prev.lineItems?.filter((item) => item.id !== id) || [],
    }))
  }

  const updateLineItem = (id: string, field: keyof JournalLineItem, value: any) => {
    setJournalEntry((prev) => ({
      ...prev,
      lineItems:
        prev.lineItems?.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, [field]: value }

            // Auto-populate account details when account is selected
            if (field === "accountId") {
              const selectedAccount = accounts.find((acc) => acc.id === value)
              if (selectedAccount) {
                updatedItem.accountCode = selectedAccount.code
                updatedItem.accountName = selectedAccount.name
              }
            }

            return updatedItem
          }
          return item
        }) || [],
    }))
  }

  const calculateTotals = () => {
    const totalDebit = journalEntry.lineItems?.reduce((sum, item) => sum + (item.debit || 0), 0) || 0
    const totalCredit = journalEntry.lineItems?.reduce((sum, item) => sum + (item.credit || 0), 0) || 0
    return { totalDebit, totalCredit }
  }

  const saveJournalEntry = () => {
    const { totalDebit, totalCredit } = calculateTotals()

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      toast({
        title: "Entry Not Balanced",
        description: "Total debits must equal total credits",
        variant: "destructive",
      })
      return
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: journalEntry.date || new Date().toISOString().split("T")[0],
      reference: journalEntry.reference || "",
      description: journalEntry.description || "",
      totalDebit,
      totalCredit,
      isPosted: false,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lineItems: journalEntry.lineItems || [],
    }

    const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    existingEntries.push(newEntry)
    localStorage.setItem("journalEntries", JSON.stringify(existingEntries))

    toast({
      title: "Journal Entry Saved",
      description: "Entry has been saved successfully",
    })

    // Reset form
    setJournalEntry({
      date: new Date().toISOString().split("T")[0],
      reference: "",
      description: "",
      lineItems: [
        { id: "1", accountId: "", accountCode: "", accountName: "", debit: 0, credit: 0, description: "" },
        { id: "2", accountId: "", accountCode: "", accountName: "", debit: 0, credit: 0, description: "" },
      ],
    })
  }

  const { totalDebit, totalCredit } = calculateTotals()
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Journal Entries</h1>
          <p className="text-gray-600">Create and manage journal entries</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
          <CardDescription>Enter journal entry details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={journalEntry.date}
                onChange={(e) => setJournalEntry((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                placeholder="JE-001"
                value={journalEntry.reference}
                onChange={(e) => setJournalEntry((prev) => ({ ...prev, reference: e.target.value }))}
              />
            </div>
            <div className="md:col-span-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Entry description"
                value={journalEntry.description}
                onChange={(e) => setJournalEntry((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Line Items</h3>
              <Button onClick={addLineItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Line
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Account</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-right p-2">Debit</th>
                    <th className="text-right p-2">Credit</th>
                    <th className="text-center p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {journalEntry.lineItems?.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">
                        <Select
                          value={item.accountId}
                          onValueChange={(value) => updateLineItem(item.id, "accountId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.code} - {account.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-2">
                        <Input
                          placeholder="Line description"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={item.debit}
                          onChange={(e) => updateLineItem(item.id, "debit", Number.parseFloat(e.target.value) || 0)}
                          className="text-right"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={item.credit}
                          onChange={(e) => updateLineItem(item.id, "credit", Number.parseFloat(e.target.value) || 0)}
                          className="text-right"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 font-semibold">
                    <td colSpan={2} className="p-2 text-right">
                      Totals:
                    </td>
                    <td className="p-2 text-right">GHS {totalDebit.toFixed(2)}</td>
                    <td className="p-2 text-right">GHS {totalCredit.toFixed(2)}</td>
                    <td className="p-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <div className={`text-sm ${isBalanced ? "text-green-600" : "text-red-600"}`}>
                {isBalanced ? "✓ Entry is balanced" : "⚠ Entry is not balanced"}
              </div>
              <Button onClick={saveJournalEntry} disabled={!isBalanced}>
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
