"use client"

import { useMemo, useState } from "react"
import type { ReportDef } from "@/types/reports"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Search, ArrowUpDown } from "lucide-react"

type Props = {
  report?: ReportDef
  rows?: Record<string, any>[]
  data?: Record<string, any>[]
  columns?: Array<{ key: string; label: string; type: string }>
  title?: string
  onRequestMore?: (params: any) => void
}

export function ReportTable({ report, rows, data, columns, title }: Props) {
  const actualRows = rows || data || []
  const actualColumns = report?.columns || columns || []
  const actualTitle = report?.name || title || "Report"
  const actualDescription = report?.description

  const [sort, setSort] = useState<{ col: string; dir: "asc" | "desc" } | null>(report?.default_sort?.[0] ?? null)
  const [visibleCols, setVisibleCols] = useState<string[]>(actualColumns.map((c) => c.key))
  const [search, setSearch] = useState("")
  const [pageSize, setPageSize] = useState(25)

  const filtered = useMemo(() => {
    let out = actualRows
    if (search) {
      out = out.filter((r) =>
        actualColumns.some((c) =>
          String(r[c.key] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      )
    }
    if (sort) {
      out = [...out].sort((a, b) => {
        const A = a[sort.col]
        const B = b[sort.col]
        if (A == null) return 1
        if (B == null) return -1
        return sort.dir === "asc" ? (A > B ? 1 : -1) : A > B ? -1 : 1
      })
    }
    return out
  }, [actualRows, search, sort, actualColumns])

  function exportCSV() {
    const cols = actualColumns.filter((c) => visibleCols.includes(c.key))
    const header = cols.map((c) => `"${c.label}"`).join(",")
    const lines = filtered.map((r) => cols.map((c) => `"${String(r[c.key] ?? "")}"`).join(","))
    const csv = [header, ...lines].join("\r\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${report?.id || "report"}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function formatValue(val: any, type: any) {
    if (val == null) return "-"
    if (type === "number") return Number(val).toLocaleString()
    if (type === "date") return new Date(val).toLocaleDateString()
    if (type === "percent") return `${(Number(val) * 100).toFixed(2)}%`
    return String(val)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{actualTitle}</CardTitle>
        {actualDescription && <p className="text-sm text-muted-foreground">{actualDescription}</p>}
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-10"
            />
          </div>
          <Button onClick={exportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <div className="text-sm text-muted-foreground">{filtered.length} rows</div>
        </div>

        <div className="overflow-auto max-h-[60vh] border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted/50 sticky top-0">
              <tr>
                {actualColumns
                  .filter((c) => visibleCols.includes(c.key))
                  .map((col) => (
                    <th key={col.key} className="px-3 py-2 text-left text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <span>{col.label}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (!sort || sort.col !== col.key) setSort({ col: col.key, dir: "asc" })
                            else setSort({ col: col.key, dir: sort.dir === "asc" ? "desc" : "asc" })
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {filtered.slice(0, pageSize).map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/50">
                  {actualColumns
                    .filter((c) => visibleCols.includes(c.key))
                    .map((col) => (
                      <td key={col.key} className="px-3 py-2 text-sm">
                        {formatValue(row[col.key], col.type)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(filtered.length, pageSize)} of {filtered.length}
          </div>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
