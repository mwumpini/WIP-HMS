export interface CSVColumn {
  key: string
  label: string
  format?: (value: any) => string
}

export interface CSVExportOptions {
  filename?: string
  includeHeaders?: boolean
  delimiter?: string
  encoding?: string
}

export function escapeCSVField(field: any): string {
  if (field === null || field === undefined) {
    return ""
  }

  const stringField = String(field)

  // If field contains comma, newline, or quote, wrap in quotes and escape internal quotes
  if (stringField.includes(",") || stringField.includes("\n") || stringField.includes('"')) {
    return `"${stringField.replace(/"/g, '""')}"`
  }

  return stringField
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

export function formatDate(date: string | Date): string {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("en-GB")
}

export function buildCSV(data: any[], columns: CSVColumn[], options: CSVExportOptions = {}): string {
  const { includeHeaders = true, delimiter = "," } = options

  if (!data || data.length === 0) {
    return includeHeaders ? columns.map((col) => escapeCSVField(col.label)).join(delimiter) : ""
  }

  const rows: string[] = []

  // Add headers if requested
  if (includeHeaders) {
    const headerRow = columns.map((col) => escapeCSVField(col.label)).join(delimiter)
    rows.push(headerRow)
  }

  // Add data rows
  data.forEach((item) => {
    const row = columns
      .map((col) => {
        const value = item[col.key]
        const formattedValue = col.format ? col.format(value) : value
        return escapeCSVField(formattedValue)
      })
      .join(delimiter)
    rows.push(row)
  })

  return rows.join("\n")
}

export function generateFilename(prefix: string, extension = "csv"): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "")
  return `${prefix}_${timestamp}.${extension}`
}

export function downloadCSV(csvContent: string, filename: string): void {
  try {
    // Add UTF-8 BOM for Excel compatibility
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })

    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up the URL object
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloading CSV:", error)
    throw new Error("Failed to download CSV file")
  }
}

export function exportToCSV(
  data: any[],
  columns: CSVColumn[],
  filenamePrefix: string,
  options?: CSVExportOptions,
): void {
  try {
    const csvContent = buildCSV(data, columns, options)
    const filename = generateFilename(filenamePrefix)
    downloadCSV(csvContent, filename)
  } catch (error) {
    console.error("Error exporting to CSV:", error)
    throw new Error("Failed to export data to CSV")
  }
}
