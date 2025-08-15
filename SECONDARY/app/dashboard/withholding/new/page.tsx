'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'

export default function NewWithholdingTaxPage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    businessName: '',
    amount: '',
    withholdingType: '7%',
    manualWithholding: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const amount = parseFloat(formData.amount)
    let withholdingAmount = 0

    if (formData.withholdingType === '7%') {
      withholdingAmount = amount * 0.07
    } else {
      withholdingAmount = parseFloat(formData.manualWithholding) || 0
    }

    const existingWithholding = JSON.parse(localStorage.getItem('ghanaTaxWithholding') || '[]')
    const nextId = existingWithholding.length > 0 ? Math.max(...existingWithholding.map((w: any) => w.id)) + 1 : 1

    const withholdingTax = {
      id: nextId,
      date: formData.date,
      businessName: formData.businessName,
      amount,
      withholdingType: formData.withholdingType,
      withholdingAmount,
      createdAt: new Date().toISOString()
    }

    existingWithholding.push(withholdingTax)
    localStorage.setItem('ghanaTaxWithholding', JSON.stringify(existingWithholding))

    setIsLoading(false)
    setSuccess(true)

    setTimeout(() => {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        businessName: '',
        amount: '',
        withholdingType: '7%',
        manualWithholding: ''
      })
      setSuccess(false)
    }, 2000)
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateWithholding = () => {
    if (formData.amount && formData.withholdingType === '7%') {
      return (parseFloat(formData.amount) * 0.07).toFixed(2)
    }
    return '0.00'
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
          <h1 className="text-3xl font-bold">New Withholding Tax</h1>
          <p className="text-gray-600">Record a new withholding tax transaction</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Withholding Tax Details</CardTitle>
          <CardDescription>
            Enter the withholding tax information with automatic 7% calculation or manual entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-6 border-emerald-200 bg-emerald-50">
              <AlertDescription className="text-emerald-800">
                Withholding tax recorded successfully!
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Name of Business</Label>
              <Input
                id="businessName"
                placeholder="Enter business/supplier name"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (GHS)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Enter transaction amount"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="withholdingType">Withholding Tax Type</Label>
              <Select value={formData.withholdingType} onValueChange={(value) => handleChange('withholdingType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7%">7% (Automatic)</SelectItem>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.withholdingType === 'manual' ? (
              <div className="space-y-2">
                <Label htmlFor="manualWithholding">Manual Withholding Amount (GHS)</Label>
                <Input
                  id="manualWithholding"
                  type="number"
                  step="0.01"
                  placeholder="Enter withholding amount manually"
                  value={formData.manualWithholding}
                  onChange={(e) => handleChange('manualWithholding', e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Calculated Withholding (7%):</span>
                  <span className="text-lg font-bold text-emerald-600">
                    GHS {calculateWithholding()}
                  </span>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                'Recording Withholding Tax...'
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Record Withholding Tax
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
