export interface CSVColumn {
  key: string
  label: string
  format?: (value: any) => string
}

export function buildCSV(data: any[], columns: CSVColumn[]): string {
  // Helper to escape CSV values
  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) return ""
    const str = String(value)
    // If contains comma, quote, or newline, wrap in quotes and escape internal quotes
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  // Build header row
  const headers = columns.map((col) => escapeCSV(col.label))

  // Build data rows
  const rows = data.map((item) =>
    columns.map((col) => {
      const value = item[col.key]
      const formatted = col.format ? col.format(value) : value
      return escapeCSV(formatted)
    }),
  )

  // Combine header and rows
  return [headers, ...rows].map((row) => row.join(",")).join("\n")
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function generateFilename(prefix: string, extension = "csv"): string {
  const date = new Date().toISOString().split("T")[0]
  return `${prefix}-${date}.${extension}`
}
