'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Download, Printer, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface WithholdingTax {
  id: number
  date: string
  businessName: string
  amount: number
  withholdingType: string
  withholdingAmount: number
  createdAt: string
}

export default function WithholdingTaxLogPage() {
  const [withholdingTaxes, setWithholdingTaxes] = useState<WithholdingTax[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })

  useEffect(() => {
    const storedWithholding = JSON.parse(localStorage.getItem('ghanaTaxWithholding') || '[]')
    setWithholdingTaxes(storedWithholding)
  }, [])

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  }

  const handleDelete = (id: number) => {
    const updatedWithholding = withholdingTaxes.filter(w => w.id !== id)
    setWithholdingTaxes(updatedWithholding)
    localStorage.setItem('ghanaTaxWithholding', JSON.stringify(updatedWithholding))
  }

  const handleSort = (key: string) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredAndSortedWithholding = withholdingTaxes
    .filter(withholding =>
      Object.values(withholding).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aVal = a[sortConfig.key as keyof WithholdingTax]
      const bVal = b[sortConfig.key as keyof WithholdingTax]
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

  const exportToCSV = () => {
    const headers = ['Date', 'Business Name', 'Amount', 'Withholding Type', 'Withholding Amount']
    const csvData = filteredAndSortedWithholding.map(withholding => [
      withholding.date,
      withholding.businessName,
      withholding.amount.toFixed(2),
      withholding.withholdingType,
      withholding.withholdingAmount.toFixed(2)
    ])

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `withholding-tax-log-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const totals = filteredAndSortedWithholding.reduce((acc, withholding) => ({
    amount: acc.amount + withholding.amount,
    withholdingAmount: acc.withholdingAmount + withholding.withholdingAmount
  }), {
    amount: 0,
    withholdingAmount: 0
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Withholding Tax Log</h1>
          <p className="text-gray-600">View and manage all withholding tax transactions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Withholding Taxes</CardTitle>
              <CardDescription>
                {filteredAndSortedWithholding.length} withholding tax{filteredAndSortedWithholding.length !== 1 ? 'es' : ''} found
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search withholding taxes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={exportToCSV}>
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
                  <th 
                    className="text-left p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('date')}
                  >
                    Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('businessName')}
                  >
                    Business Name {sortConfig.key === 'businessName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-right p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left p-3">Withholding Type</th>
                  <th 
                    className="text-right p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('withholdingAmount')}
                  >
                    Withholding Amount {sortConfig.key === 'withholdingAmount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedWithholding.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No withholding taxes found
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredAndSortedWithholding.map((withholding) => (
                      <tr key={withholding.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{withholding.date}</td>
                        <td className="p-3">{withholding.businessName}</td>
                        <td className="p-3 text-right font-bold">{formatCurrency(withholding.amount)}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs">
                            {withholding.withholdingType === '7%' ? '7% Auto' : 'Manual'}
                          </Badge>
                        </td>
                        <td className="p-3 text-right font-medium text-emerald-600">
                          {formatCurrency(withholding.withholdingAmount)}
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(withholding.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                      <td className="p-3" colSpan={2}>TOTALS</td>
                      <td className="p-3 text-right">{formatCurrency(totals.amount)}</td>
                      <td className="p-3"></td>
                      <td className="p-3 text-right text-emerald-600">{formatCurrency(totals.withholdingAmount)}</td>
                      <td className="p-3"></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
