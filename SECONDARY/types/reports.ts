export type ColumnType = "string" | "number" | "date" | "percent" | "boolean"

export interface ColumnDef {
  key: string
  label: string
  type: ColumnType
  aggregate?: "sum" | "count" | "avg" | "min" | "max"
  formula?: string // simple formula expression (parsed by backend or computed client-side)
  width?: number
}

export interface ReportDef {
  id: string
  name: string
  description?: string
  columns: ColumnDef[]
  filters: string[] // e.g. date_range, department, staff_id
  default_group_by?: string
  default_sort?: { col: string; dir: "asc" | "desc" }[]
  export?: ("csv" | "pdf")[]
  ui_features?: string[] // e.g. pagination, column_visibility, top_n_picker
}
