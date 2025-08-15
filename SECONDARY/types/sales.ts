export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  company?: string
  customerType: "individual" | "corporate" | "government"
  creditLimit: number
  paymentTerms: number // days
  taxId?: string
  status: "active" | "inactive" | "blocked"
  createdAt: string
  updatedAt: string
  totalPurchases: number
  outstandingBalance: number
  lastPurchaseDate?: string
  salesRepId?: string
}

export interface SalesQuote {
  id: string
  quoteNumber: string
  customerId: string
  customerName: string
  salesRepId: string
  salesRepName: string
  items: SalesItem[]
  subtotal: number
  taxAmount: number
  totalAmount: number
  validUntil: string
  status: "draft" | "sent" | "accepted" | "rejected" | "expired"
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface SalesItem {
  id: string
  productId?: string
  productName: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  lineTotal: number
  taxRate: number
  taxAmount: number
}

export interface SalesInvoice {
  id: string
  invoiceNumber: string
  customerId: string
  customerName: string
  salesRepId: string
  salesRepName: string
  quoteId?: string
  items: SalesItem[]
  subtotal: number
  taxAmount: number
  totalAmount: number
  paidAmount: number
  outstandingAmount: number
  dueDate: string
  status: "draft" | "sent" | "paid" | "partial" | "overdue" | "cancelled"
  paymentTerms: number
  notes?: string
  createdAt: string
  updatedAt: string
  accountingEntries?: string[] // Journal entry IDs
}

export interface SalesCommission {
  id: string
  salesRepId: string
  salesRepName: string
  invoiceId: string
  saleAmount: number
  commissionRate: number
  commissionAmount: number
  status: "pending" | "approved" | "paid"
  period: string // YYYY-MM
  createdAt: string
}

export interface SalesPipeline {
  id: string
  customerId: string
  customerName: string
  salesRepId: string
  salesRepName: string
  title: string
  description: string
  value: number
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  probability: number
  expectedCloseDate: string
  actualCloseDate?: string
  source: "website" | "referral" | "cold-call" | "marketing" | "walk-in" | "other"
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface SalesTarget {
  id: string
  salesRepId: string
  salesRepName: string
  period: string // YYYY-MM
  targetAmount: number
  achievedAmount: number
  achievementPercentage: number
  status: "active" | "completed" | "missed"
}

export interface SalesAnalytics {
  totalSales: number
  totalProfit: number
  averageOrderValue: number
  customerCount: number
  repeatCustomerRate: number
  salesGrowth: number
  topProducts: Array<{
    productName: string
    quantity: number
    revenue: number
  }>
  topCustomers: Array<{
    customerName: string
    totalPurchases: number
    revenue: number
  }>
  salesByPeriod: Array<{
    period: string
    sales: number
    profit: number
  }>
  salesByRep: Array<{
    salesRepName: string
    sales: number
    commissions: number
  }>
}
