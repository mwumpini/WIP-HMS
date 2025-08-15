export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense"

export type AccountSubType =
  // Assets
  | "current-asset"
  | "fixed-asset"
  | "intangible-asset"
  // Liabilities
  | "current-liability"
  | "long-term-liability"
  // Equity
  | "owner-equity"
  | "retained-earnings"
  // Revenue
  | "operating-revenue"
  | "other-revenue"
  // Expenses
  | "operating-expense"
  | "administrative-expense"
  | "financial-expense"

export interface ChartOfAccount {
  id: string
  code: string
  name: string
  type: AccountType
  subType: AccountSubType
  parentId?: string
  isActive: boolean
  balance: number
  description?: string
  createdAt: string
  updatedAt: string
}

export interface JournalEntry {
  id: string
  date: string
  reference: string
  description: string
  totalDebit: number
  totalCredit: number
  isPosted: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  lineItems: JournalLineItem[]
}

export interface JournalLineItem {
  id: string
  accountId: string
  accountCode: string
  accountName: string
  debit: number
  credit: number
  description?: string
}

export interface AccountsPayable {
  id: string
  vendorId: string
  vendorName: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  amount: number
  paidAmount: number
  remainingAmount: number
  status: "pending" | "partial" | "paid" | "overdue"
  description?: string
  createdAt: string
  updatedAt: string
}

export interface AccountsReceivable {
  id: string
  customerId: string
  customerName: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  amount: number
  paidAmount: number
  remainingAmount: number
  status: "pending" | "partial" | "paid" | "overdue"
  description?: string
  createdAt: string
  updatedAt: string
}

export interface FixedAsset {
  id: string
  name: string
  category: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  depreciationMethod: "straight-line" | "declining-balance" | "units-of-production"
  usefulLife: number
  salvageValue: number
  accumulatedDepreciation: number
  location: string
  condition: "excellent" | "good" | "fair" | "poor"
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FinancialStatement {
  id: string
  type: "balance-sheet" | "income-statement" | "cash-flow"
  period: string
  startDate: string
  endDate: string
  data: any
  generatedAt: string
  generatedBy: string
}

// Hospitality-specific chart of accounts
export const HOSPITALITY_CHART_OF_ACCOUNTS: Omit<ChartOfAccount, "id" | "balance" | "createdAt" | "updatedAt">[] = [
  // ASSETS
  { code: "1000", name: "ASSETS", type: "asset", subType: "current-asset", isActive: true },
  { code: "1100", name: "Current Assets", type: "asset", subType: "current-asset", parentId: "1000", isActive: true },
  {
    code: "1110",
    name: "Cash and Cash Equivalents",
    type: "asset",
    subType: "current-asset",
    parentId: "1100",
    isActive: true,
  },
  { code: "1111", name: "Petty Cash", type: "asset", subType: "current-asset", parentId: "1110", isActive: true },
  {
    code: "1112",
    name: "Bank Account - Operating",
    type: "asset",
    subType: "current-asset",
    parentId: "1110",
    isActive: true,
  },
  {
    code: "1113",
    name: "Bank Account - Payroll",
    type: "asset",
    subType: "current-asset",
    parentId: "1110",
    isActive: true,
  },
  {
    code: "1120",
    name: "Accounts Receivable",
    type: "asset",
    subType: "current-asset",
    parentId: "1100",
    isActive: true,
  },
  {
    code: "1121",
    name: "Guest Accounts Receivable",
    type: "asset",
    subType: "current-asset",
    parentId: "1120",
    isActive: true,
  },
  {
    code: "1122",
    name: "Corporate Accounts Receivable",
    type: "asset",
    subType: "current-asset",
    parentId: "1120",
    isActive: true,
  },
  { code: "1130", name: "Inventory", type: "asset", subType: "current-asset", parentId: "1100", isActive: true },
  { code: "1131", name: "Food Inventory", type: "asset", subType: "current-asset", parentId: "1130", isActive: true },
  {
    code: "1132",
    name: "Beverage Inventory",
    type: "asset",
    subType: "current-asset",
    parentId: "1130",
    isActive: true,
  },
  {
    code: "1133",
    name: "Housekeeping Supplies",
    type: "asset",
    subType: "current-asset",
    parentId: "1130",
    isActive: true,
  },
  {
    code: "1134",
    name: "Maintenance Supplies",
    type: "asset",
    subType: "current-asset",
    parentId: "1130",
    isActive: true,
  },

  { code: "1200", name: "Fixed Assets", type: "asset", subType: "fixed-asset", parentId: "1000", isActive: true },
  {
    code: "1210",
    name: "Property, Plant & Equipment",
    type: "asset",
    subType: "fixed-asset",
    parentId: "1200",
    isActive: true,
  },
  { code: "1211", name: "Land", type: "asset", subType: "fixed-asset", parentId: "1210", isActive: true },
  { code: "1212", name: "Buildings", type: "asset", subType: "fixed-asset", parentId: "1210", isActive: true },
  {
    code: "1213",
    name: "Furniture & Fixtures",
    type: "asset",
    subType: "fixed-asset",
    parentId: "1210",
    isActive: true,
  },
  { code: "1214", name: "Kitchen Equipment", type: "asset", subType: "fixed-asset", parentId: "1210", isActive: true },
  { code: "1215", name: "Room Equipment", type: "asset", subType: "fixed-asset", parentId: "1210", isActive: true },
  {
    code: "1220",
    name: "Accumulated Depreciation",
    type: "asset",
    subType: "fixed-asset",
    parentId: "1200",
    isActive: true,
  },

  // LIABILITIES
  { code: "2000", name: "LIABILITIES", type: "liability", subType: "current-liability", isActive: true },
  {
    code: "2100",
    name: "Current Liabilities",
    type: "liability",
    subType: "current-liability",
    parentId: "2000",
    isActive: true,
  },
  {
    code: "2110",
    name: "Accounts Payable",
    type: "liability",
    subType: "current-liability",
    parentId: "2100",
    isActive: true,
  },
  {
    code: "2120",
    name: "Accrued Expenses",
    type: "liability",
    subType: "current-liability",
    parentId: "2100",
    isActive: true,
  },
  {
    code: "2130",
    name: "Tax Liabilities",
    type: "liability",
    subType: "current-liability",
    parentId: "2100",
    isActive: true,
  },
  {
    code: "2131",
    name: "VAT Payable",
    type: "liability",
    subType: "current-liability",
    parentId: "2130",
    isActive: true,
  },
  {
    code: "2132",
    name: "Income Tax Payable",
    type: "liability",
    subType: "current-liability",
    parentId: "2130",
    isActive: true,
  },
  {
    code: "2133",
    name: "SSNIT Payable",
    type: "liability",
    subType: "current-liability",
    parentId: "2130",
    isActive: true,
  },
  {
    code: "2134",
    name: "GRA Levies Payable",
    type: "liability",
    subType: "current-liability",
    parentId: "2130",
    isActive: true,
  },
  {
    code: "2140",
    name: "Guest Deposits",
    type: "liability",
    subType: "current-liability",
    parentId: "2100",
    isActive: true,
  },

  {
    code: "2200",
    name: "Long-term Liabilities",
    type: "liability",
    subType: "long-term-liability",
    parentId: "2000",
    isActive: true,
  },
  {
    code: "2210",
    name: "Bank Loans",
    type: "liability",
    subType: "long-term-liability",
    parentId: "2200",
    isActive: true,
  },
  {
    code: "2220",
    name: "Equipment Financing",
    type: "liability",
    subType: "long-term-liability",
    parentId: "2200",
    isActive: true,
  },

  // EQUITY
  { code: "3000", name: "EQUITY", type: "equity", subType: "owner-equity", isActive: true },
  { code: "3100", name: "Owner's Equity", type: "equity", subType: "owner-equity", parentId: "3000", isActive: true },
  {
    code: "3200",
    name: "Retained Earnings",
    type: "equity",
    subType: "retained-earnings",
    parentId: "3000",
    isActive: true,
  },

  // REVENUE
  { code: "4000", name: "REVENUE", type: "revenue", subType: "operating-revenue", isActive: true },
  {
    code: "4100",
    name: "Room Revenue",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4000",
    isActive: true,
  },
  { code: "4110", name: "Room Sales", type: "revenue", subType: "operating-revenue", parentId: "4100", isActive: true },
  {
    code: "4200",
    name: "Food & Beverage Revenue",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4000",
    isActive: true,
  },
  {
    code: "4210",
    name: "Restaurant Sales",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4200",
    isActive: true,
  },
  { code: "4220", name: "Bar Sales", type: "revenue", subType: "operating-revenue", parentId: "4200", isActive: true },
  {
    code: "4230",
    name: "Room Service Sales",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4200",
    isActive: true,
  },
  {
    code: "4300",
    name: "Other Operating Revenue",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4000",
    isActive: true,
  },
  {
    code: "4310",
    name: "Conference & Events",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4300",
    isActive: true,
  },
  {
    code: "4320",
    name: "Spa & Recreation",
    type: "revenue",
    subType: "operating-revenue",
    parentId: "4300",
    isActive: true,
  },
  { code: "4400", name: "Other Revenue", type: "revenue", subType: "other-revenue", parentId: "4000", isActive: true },

  // EXPENSES
  { code: "5000", name: "COST OF SALES", type: "expense", subType: "operating-expense", isActive: true },
  { code: "5100", name: "Food Cost", type: "expense", subType: "operating-expense", parentId: "5000", isActive: true },
  {
    code: "5200",
    name: "Beverage Cost",
    type: "expense",
    subType: "operating-expense",
    parentId: "5000",
    isActive: true,
  },

  { code: "6000", name: "OPERATING EXPENSES", type: "expense", subType: "operating-expense", isActive: true },
  {
    code: "6100",
    name: "Payroll & Benefits",
    type: "expense",
    subType: "operating-expense",
    parentId: "6000",
    isActive: true,
  },
  {
    code: "6110",
    name: "Salaries & Wages",
    type: "expense",
    subType: "operating-expense",
    parentId: "6100",
    isActive: true,
  },
  {
    code: "6120",
    name: "Employee Benefits",
    type: "expense",
    subType: "operating-expense",
    parentId: "6100",
    isActive: true,
  },
  { code: "6200", name: "Utilities", type: "expense", subType: "operating-expense", parentId: "6000", isActive: true },
  {
    code: "6210",
    name: "Electricity",
    type: "expense",
    subType: "operating-expense",
    parentId: "6200",
    isActive: true,
  },
  { code: "6220", name: "Water", type: "expense", subType: "operating-expense", parentId: "6200", isActive: true },
  {
    code: "6300",
    name: "Maintenance & Repairs",
    type: "expense",
    subType: "operating-expense",
    parentId: "6000",
    isActive: true,
  },
  {
    code: "6400",
    name: "Marketing & Advertising",
    type: "expense",
    subType: "operating-expense",
    parentId: "6000",
    isActive: true,
  },

  { code: "7000", name: "ADMINISTRATIVE EXPENSES", type: "expense", subType: "administrative-expense", isActive: true },
  {
    code: "7100",
    name: "Office Expenses",
    type: "expense",
    subType: "administrative-expense",
    parentId: "7000",
    isActive: true,
  },
  {
    code: "7200",
    name: "Professional Services",
    type: "expense",
    subType: "administrative-expense",
    parentId: "7000",
    isActive: true,
  },
  {
    code: "7300",
    name: "Insurance",
    type: "expense",
    subType: "administrative-expense",
    parentId: "7000",
    isActive: true,
  },

  { code: "8000", name: "OTHER EXPENSES", type: "expense", subType: "financial-expense", isActive: true },
  {
    code: "8100",
    name: "Interest Expense",
    type: "expense",
    subType: "financial-expense",
    parentId: "8000",
    isActive: true,
  },
  {
    code: "8200",
    name: "Bank Charges",
    type: "expense",
    subType: "financial-expense",
    parentId: "8000",
    isActive: true,
  },
]
