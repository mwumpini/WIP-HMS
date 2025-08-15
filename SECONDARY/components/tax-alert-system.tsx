"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, CheckCircle, DollarSign, Calendar, Settings } from "lucide-react"

interface TaxObligation {
  id: string
  type: "VAT" | "PAYE" | "SSNIT" | "Tier2" | "Tier3" | "GRA_Levies" | "GTA_Tourism"
  name: string
  dueDate: string
  amount: number
  status: "Pending" | "Paid" | "Overdue" | "Snoozed"
  lastPaid?: string
  amountPaid?: number
  snoozeUntil?: string
  journalReference?: string
}

interface AlertSettings {
  vatDueDay: number
  leviesDueDay: number
  gtaDueDay: number
  ssnitDueDay: number
  payeDueDay: number
  tier2DueDay: number
  tier3DueDay: number
  reminderDaysBefore: number
}

export function TaxAlertSystem() {
  const [obligations, setObligations] = useState<TaxObligation[]>([])
  const [selectedObligation, setSelectedObligation] = useState<TaxObligation | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showSnoozeDialog, setShowSnoozeDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [journalRef, setJournalRef] = useState("")
  const [snoozeDate, setSnoozeDate] = useState("")
  const [snoozeTime, setSnoozeTime] = useState("")

  const [settings, setSettings] = useState<AlertSettings>({
    vatDueDay: 31, // End of month
    leviesDueDay: 31, // End of month
    gtaDueDay: 31, // End of month
    ssnitDueDay: 15, // 15th of month
    payeDueDay: 15, // 15th of month
    tier2DueDay: 15, // 15th of month
    tier3DueDay: 15, // 15th of month
    reminderDaysBefore: 5,
  })

  // Load settings and obligations from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("taxAlertSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    const savedObligations = localStorage.getItem("taxObligations")
    if (savedObligations) {
      setObligations(JSON.parse(savedObligations))
    } else {
      generateCurrentObligations()
    }
  }, [])

  const generateCurrentObligations = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Calculate amounts from existing data
    const sales = JSON.parse(localStorage.getItem("sales") || "[]")
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]")
    const staff = JSON.parse(localStorage.getItem("companyStaff") || "[]")

    const totalGrossSales = sales.reduce((sum: number, s: any) => sum + (s.subtotal || s.grossAmount || 0), 0)
    const totalPayroll = staff.reduce((sum: number, s: any) => sum + Number.parseFloat(s.basicSalary || "0"), 0)

    const newObligations: TaxObligation[] = [
      {
        id: "vat-" + currentMonth,
        type: "VAT",
        name: "VAT Return",
        dueDate: getNextDueDate(settings.vatDueDay),
        amount: totalGrossSales * 0.15 * 0.85, // Approximate VAT payable
        status: "Pending",
      },
      {
        id: "levies-" + currentMonth,
        type: "GRA_Levies",
        name: "GRA Levies (NHIL, GETFund, COVID)",
        dueDate: getNextDueDate(settings.leviesDueDay),
        amount: totalGrossSales * 0.06, // 6% total levies
        status: "Pending",
      },
      {
        id: "gta-" + currentMonth,
        type: "GTA_Tourism",
        name: "Tourism Development Levy",
        dueDate: getNextDueDate(settings.gtaDueDay),
        amount: totalGrossSales * 0.01, // 1% tourism levy
        status: "Pending",
      },
      {
        id: "ssnit-" + currentMonth,
        type: "SSNIT",
        name: "SSNIT Contributions",
        dueDate: getNextDueDate(settings.ssnitDueDay),
        amount: totalPayroll * 0.185, // 18.5% total SSNIT
        status: "Pending",
      },
      {
        id: "paye-" + currentMonth,
        type: "PAYE",
        name: "PAYE Income Tax",
        dueDate: getNextDueDate(settings.payeDueDay),
        amount: totalPayroll * 0.15, // Approximate PAYE
        status: "Pending",
      },
      {
        id: "tier2-" + currentMonth,
        type: "Tier2",
        name: "Tier 2 Pension Contributions",
        dueDate: getNextDueDate(settings.tier2DueDay),
        amount: totalPayroll * 0.05, // 5% Tier 2
        status: "Pending",
      },
      {
        id: "tier3-" + currentMonth,
        type: "Tier3",
        name: "Tier 3 Pension Contributions",
        dueDate: getNextDueDate(settings.tier3DueDay),
        amount: totalPayroll * 0.055, // 5.5% Tier 3
        status: "Pending",
      },
    ]

    setObligations(newObligations)
    localStorage.setItem("taxObligations", JSON.stringify(newObligations))
  }

  const getNextDueDate = (dueDay: number) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    let dueDate: Date

    if (dueDay === 31) {
      // End of month
      dueDate = new Date(currentYear, currentMonth + 1, 0) // Last day of current month
    } else {
      dueDate = new Date(currentYear, currentMonth, dueDay)

      // If due date has passed this month, move to next month
      if (dueDate < currentDate) {
        dueDate = new Date(currentYear, currentMonth + 1, dueDay)
      }
    }

    return dueDate.toISOString().split("T")[0]
  }

  const getStatusColor = (status: string, dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    switch (status) {
      case "Paid":
        return "text-green-600 bg-green-50 border-green-200"
      case "Overdue":
        return "text-red-600 bg-red-50 border-red-200"
      case "Snoozed":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        if (daysUntilDue <= settings.reminderDaysBefore) {
          return "text-orange-600 bg-orange-50 border-orange-200"
        }
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  const getStatusIcon = (status: string, dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4" />
      case "Overdue":
        return <AlertTriangle className="h-4 w-4" />
      case "Snoozed":
        return <Clock className="h-4 w-4" />
      default:
        if (daysUntilDue <= settings.reminderDaysBefore) {
          return <AlertTriangle className="h-4 w-4" />
        }
        return <Calendar className="h-4 w-4" />
    }
  }

  const recordPayment = () => {
    if (!selectedObligation) return

    const payment = Number.parseFloat(paymentAmount)
    const updatedObligation = {
      ...selectedObligation,
      amountPaid: (selectedObligation.amountPaid || 0) + payment,
      lastPaid: paymentDate,
      journalReference: journalRef,
      status:
        (selectedObligation.amountPaid || 0) + payment >= selectedObligation.amount
          ? ("Paid" as const)
          : ("Pending" as const),
    }

    const updatedObligations = obligations.map((obl) => (obl.id === selectedObligation.id ? updatedObligation : obl))

    setObligations(updatedObligations)
    localStorage.setItem("taxObligations", JSON.stringify(updatedObligations))

    // Create journal entry
    const journalEntry = {
      id: Date.now().toString(),
      date: paymentDate,
      reference: journalRef,
      description: `${selectedObligation.name} Payment`,
      debit: { account: `${selectedObligation.name} Payable`, amount: payment },
      credit: { account: "Cash/Bank", amount: payment },
    }

    const existingJournal = JSON.parse(localStorage.getItem("journalEntries") || "[]")
    existingJournal.push(journalEntry)
    localStorage.setItem("journalEntries", JSON.stringify(existingJournal))

    setShowPaymentDialog(false)
    resetPaymentForm()
  }

  const snoozeObligation = () => {
    if (!selectedObligation) return

    const snoozeDateTime = `${snoozeDate}T${snoozeTime}`
    const updatedObligation = {
      ...selectedObligation,
      status: "Snoozed" as const,
      snoozeUntil: snoozeDateTime,
    }

    const updatedObligations = obligations.map((obl) => (obl.id === selectedObligation.id ? updatedObligation : obl))

    setObligations(updatedObligations)
    localStorage.setItem("taxObligations", JSON.stringify(updatedObligations))

    setShowSnoozeDialog(false)
    setSnoozeDate("")
    setSnoozeTime("")
    setSelectedObligation(null)
  }

  const saveSettings = () => {
    localStorage.setItem("taxAlertSettings", JSON.stringify(settings))
    setShowSettingsDialog(false)
    generateCurrentObligations() // Regenerate with new settings
  }

  const resetPaymentForm = () => {
    setPaymentAmount("")
    setPaymentDate("")
    setJournalRef("")
    setSelectedObligation(null)
  }

  const formatCurrency = (amount: number) => {
    return `GH₵${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilDue
  }

  // Check for overdue obligations
  useEffect(() => {
    const today = new Date()
    const updatedObligations = obligations.map((obl) => {
      const dueDate = new Date(obl.dueDate)
      if (dueDate < today && obl.status === "Pending") {
        return { ...obl, status: "Overdue" as const }
      }
      return obl
    })

    if (JSON.stringify(updatedObligations) !== JSON.stringify(obligations)) {
      setObligations(updatedObligations)
      localStorage.setItem("taxObligations", JSON.stringify(updatedObligations))
    }
  }, [obligations])

  const pendingObligations = obligations.filter((obl) => obl.status !== "Paid")
  const urgentObligations = pendingObligations.filter((obl) => {
    const daysUntilDue = getDaysUntilDue(obl.dueDate)
    return daysUntilDue <= settings.reminderDaysBefore || obl.status === "Overdue"
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Tax & Compliance Alerts
              </CardTitle>
              <CardDescription>{urgentObligations.length} urgent obligations requiring attention</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowSettingsDialog(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingObligations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-medium">All tax obligations are up to date!</p>
                <p className="text-sm">Great job staying compliant.</p>
              </div>
            ) : (
              pendingObligations.map((obligation) => {
                const daysUntilDue = getDaysUntilDue(obligation.dueDate)
                const isUrgent = daysUntilDue <= settings.reminderDaysBefore || obligation.status === "Overdue"

                return (
                  <div
                    key={obligation.id}
                    className={`border rounded-lg p-4 ${isUrgent ? "border-orange-200 bg-orange-50" : "border-gray-200"}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {getStatusIcon(obligation.status, obligation.dueDate)}
                          {obligation.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(obligation.dueDate).toLocaleDateString()}
                          {daysUntilDue > 0
                            ? ` (${daysUntilDue} days)`
                            : daysUntilDue === 0
                              ? " (Today)"
                              : ` (${Math.abs(daysUntilDue)} days overdue)`}
                        </p>
                      </div>
                      <Badge className={getStatusColor(obligation.status, obligation.dueDate)}>
                        {obligation.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Amount Due</p>
                        <p className="font-semibold">{formatCurrency(obligation.amount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount Paid</p>
                        <p className="font-semibold">{formatCurrency(obligation.amountPaid || 0)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Balance</p>
                        <p className="font-semibold text-red-600">
                          {formatCurrency(obligation.amount - (obligation.amountPaid || 0))}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Paid</p>
                        <p className="font-semibold">
                          {obligation.lastPaid ? new Date(obligation.lastPaid).toLocaleDateString() : "Never"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedObligation(obligation)
                          setShowPaymentDialog(true)
                        }}
                        disabled={obligation.status === "Paid"}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Record Payment
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedObligation(obligation)
                          setShowSnoozeDialog(true)
                        }}
                        disabled={obligation.status === "Paid"}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Snooze
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>Record payment for {selectedObligation?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>
                Amount Due:{" "}
                {selectedObligation
                  ? formatCurrency(selectedObligation.amount - (selectedObligation.amountPaid || 0))
                  : "0.00"}
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

      {/* Snooze Dialog */}
      <Dialog open={showSnoozeDialog} onOpenChange={setShowSnoozeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Snooze Alert</DialogTitle>
            <DialogDescription>Set a reminder date and time for {selectedObligation?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="snoozeDate">Reminder Date</Label>
              <Input id="snoozeDate" type="date" value={snoozeDate} onChange={(e) => setSnoozeDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snoozeTime">Reminder Time</Label>
              <Input id="snoozeTime" type="time" value={snoozeTime} onChange={(e) => setSnoozeTime(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSnoozeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={snoozeObligation} disabled={!snoozeDate || !snoozeTime}>
              Set Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tax Alert Settings</DialogTitle>
            <DialogDescription>Customize due dates and reminder settings for tax obligations</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Due Dates (Day of Month)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>VAT Return</Label>
                  <Select
                    value={settings.vatDueDay.toString()}
                    onValueChange={(value) => setSettings({ ...settings, vatDueDay: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="31">End of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>GRA Levies</Label>
                  <Select
                    value={settings.leviesDueDay.toString()}
                    onValueChange={(value) => setSettings({ ...settings, leviesDueDay: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="31">End of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>GTA Tourism Levy</Label>
                  <Select
                    value={settings.gtaDueDay.toString()}
                    onValueChange={(value) => setSettings({ ...settings, gtaDueDay: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="31">End of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>SSNIT</Label>
                  <Select
                    value={settings.ssnitDueDay.toString()}
                    onValueChange={(value) => setSettings({ ...settings, ssnitDueDay: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="31">End of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>PAYE</Label>
                  <Select
                    value={settings.payeDueDay.toString()}
                    onValueChange={(value) => setSettings({ ...settings, payeDueDay: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="31">End of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tier 2 & 3 Pensions</Label>
                  <Select
                    value={settings.tier2DueDay.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        tier2DueDay: Number.parseInt(value),
                        tier3DueDay: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="31">End of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reminder Days Before Due Date</Label>
              <Select
                value={settings.reminderDaysBefore.toString()}
                onValueChange={(value) => setSettings({ ...settings, reminderDaysBefore: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="10">10 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
