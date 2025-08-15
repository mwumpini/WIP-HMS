"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import type { FixedAsset } from "@/types/accounting"

export default function FixedAssetsPage() {
  const [assets, setAssets] = useState<FixedAsset[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = () => {
    const existingAssets = localStorage.getItem("fixedAssets")
    if (existingAssets) {
      setAssets(JSON.parse(existingAssets))
    }
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === "all" || asset.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const getConditionColor = (condition: string) => {
    const colors = {
      excellent: "bg-green-100 text-green-800 border-green-200",
      good: "bg-blue-100 text-blue-800 border-blue-200",
      fair: "bg-yellow-100 text-yellow-800 border-yellow-200",
      poor: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[condition as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
  const totalDepreciation = assets.reduce((sum, asset) => sum + asset.accumulatedDepreciation, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Fixed Assets</h1>
          <p className="text-gray-600">Track property, equipment, and depreciation</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalAssetValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Depreciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalDepreciation)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Book Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalAssetValue - totalDepreciation)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterCategory === "all" ? "default" : "outline"}
                onClick={() => setFilterCategory("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterCategory === "Equipment" ? "default" : "outline"}
                onClick={() => setFilterCategory("Equipment")}
                size="sm"
              >
                Equipment
              </Button>
              <Button
                variant={filterCategory === "Furniture" ? "default" : "outline"}
                onClick={() => setFilterCategory("Furniture")}
                size="sm"
              >
                Furniture
              </Button>
            </div>
            <Button asChild>
              <Link href="/dashboard/accounting/assets/new">
                <Plus className="h-4 w-4 mr-2" />
                New Asset
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fixed Assets</CardTitle>
          <CardDescription>
            {filteredAssets.length} asset{filteredAssets.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAssets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No assets found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Asset Name</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Purchase Date</th>
                    <th className="text-right p-3">Purchase Price</th>
                    <th className="text-right p-3">Current Value</th>
                    <th className="text-center p-3">Condition</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.location}</div>
                      </td>
                      <td className="p-3">{asset.category}</td>
                      <td className="p-3">{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(asset.purchasePrice)}</td>
                      <td className="p-3 text-right font-mono">{formatCurrency(asset.currentValue)}</td>
                      <td className="p-3 text-center">
                        <Badge className={`${getConditionColor(asset.condition)} text-xs`}>{asset.condition}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant={asset.isActive ? "default" : "secondary"}>
                          {asset.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
