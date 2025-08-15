import { dataManager } from "./data-manager"
import { safeGetItem, safeSetItem } from "./storage"
import type { Sale, Expense } from "./data-manager"

export interface IntegrationEvent {
  id: string
  type: string
  module: string
  data: any
  timestamp: string
  processed: boolean
}

export interface InventoryItem {
  id: string
  name: string
  sku: string
  quantity: number
  unitCost: number
  location: string
  category: string
}

export interface AccountingEntry {
  id: string
  date: string
  description: string
  debitAccount: string
  creditAccount: string
  amount: number
  reference: string
  module: string
}

class IntegrationService {
  private static instance: IntegrationService
  private eventQueue: IntegrationEvent[] = []

  private constructor() {
    this.loadEventQueue()
  }

  public static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService()
    }
    return IntegrationService.instance
  }

  // Event management
  private loadEventQueue(): void {
    this.eventQueue = safeGetItem<IntegrationEvent[]>("integrationEvents", [])
  }

  private saveEventQueue(): void {
    safeSetItem("integrationEvents", this.eventQueue)
  }

  private addEvent(type: string, module: string, data: any): void {
    const event: IntegrationEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      module,
      data,
      timestamp: new Date().toISOString(),
      processed: false,
    }

    this.eventQueue.push(event)
    this.saveEventQueue()
    this.processEvents()
  }

  // Sales integration workflows
  public processSaleCreated(sale: Sale): void {
    // Update inventory if applicable
    this.updateInventoryFromSale(sale)

    // Create accounting entries
    this.createAccountingEntriesFromSale(sale)

    // Update customer records
    this.updateCustomerFromSale(sale)

    this.addEvent("SALE_CREATED", "sales", sale)
  }

  private updateInventoryFromSale(sale: Sale): void {
    // Get inventory items
    const inventory = safeGetItem<InventoryItem[]>("inventory", [])

    // For service-based sales, we might not need inventory updates
    // But for product sales, we would reduce inventory quantities
    if (sale.serviceType === "product") {
      // This would be expanded based on actual product details in the sale
      console.log("Updating inventory for product sale:", sale.id)
    }
  }

  private createAccountingEntriesFromSale(sale: Sale): void {
    const entries: AccountingEntry[] = []

    // Debit: Accounts Receivable or Cash
    entries.push({
      id: `${sale.id}-ar`,
      date: sale.date,
      description: `Sale to ${sale.customerName}`,
      debitAccount: "1200", // Accounts Receivable
      creditAccount: "4000", // Sales Revenue
      amount: sale.amount,
      reference: sale.id,
      module: "sales",
    })

    // Credit: VAT Payable
    if (sale.vatAmount > 0) {
      entries.push({
        id: `${sale.id}-vat`,
        date: sale.date,
        description: `VAT on sale to ${sale.customerName}`,
        debitAccount: "1200", // Accounts Receivable
        creditAccount: "2300", // VAT Payable
        amount: sale.vatAmount,
        reference: sale.id,
        module: "sales",
      })
    }

    // Save accounting entries
    const existingEntries = safeGetItem<AccountingEntry[]>("accountingEntries", [])
    existingEntries.push(...entries)
    safeSetItem("accountingEntries", existingEntries)
  }

  private updateCustomerFromSale(sale: Sale): void {
    const customers = safeGetItem<any[]>("customers", [])
    const existingCustomer = customers.find((c) => c.email === sale.customerEmail)

    if (existingCustomer) {
      existingCustomer.lastSaleDate = sale.date
      existingCustomer.totalSales = (existingCustomer.totalSales || 0) + sale.totalAmount
      existingCustomer.saleCount = (existingCustomer.saleCount || 0) + 1
    } else if (sale.customerEmail) {
      customers.push({
        id: `cust-${Date.now()}`,
        name: sale.customerName,
        email: sale.customerEmail,
        phone: sale.customerPhone,
        firstSaleDate: sale.date,
        lastSaleDate: sale.date,
        totalSales: sale.totalAmount,
        saleCount: 1,
        createdAt: new Date().toISOString(),
      })
    }

    safeSetItem("customers", customers)
  }

  // Expense integration workflows
  public processExpenseCreated(expense: Expense): void {
    this.createAccountingEntriesFromExpense(expense)
    this.updateSupplierFromExpense(expense)
    this.addEvent("EXPENSE_CREATED", "expenses", expense)
  }

  private createAccountingEntriesFromExpense(expense: Expense): void {
    const entries: AccountingEntry[] = []

    // Debit: Expense Account
    entries.push({
      id: `${expense.id}-exp`,
      date: expense.date,
      description: `Expense: ${expense.paymentDetails}`,
      debitAccount: this.getExpenseAccount(expense.category),
      creditAccount: "1000", // Cash or Accounts Payable
      amount: expense.amount,
      reference: expense.id,
      module: "expenses",
    })

    // Input VAT if applicable
    if (expense.inputVat > 0) {
      entries.push({
        id: `${expense.id}-vat`,
        date: expense.date,
        description: `Input VAT: ${expense.paymentDetails}`,
        debitAccount: "1400", // Input VAT
        creditAccount: "1000", // Cash
        amount: expense.inputVat,
        reference: expense.id,
        module: "expenses",
      })
    }

    const existingEntries = safeGetItem<AccountingEntry[]>("accountingEntries", [])
    existingEntries.push(...entries)
    safeSetItem("accountingEntries", existingEntries)
  }

  private getExpenseAccount(category: string): string {
    const categoryMap: Record<string, string> = {
      "Office Supplies": "5100",
      Travel: "5200",
      Utilities: "5300",
      Marketing: "5400",
      "Professional Services": "5500",
      Equipment: "1600",
      Maintenance: "5600",
      Insurance: "5700",
      Other: "5900",
    }
    return categoryMap[category] || "5900"
  }

  private updateSupplierFromExpense(expense: Expense): void {
    const suppliers = safeGetItem<any[]>("suppliers", [])
    const existingSupplier = suppliers.find((s) => s.name === expense.supplier)

    if (existingSupplier) {
      existingSupplier.lastTransactionDate = expense.date
      existingSupplier.totalSpent = (existingSupplier.totalSpent || 0) + expense.amount
      existingSupplier.transactionCount = (existingSupplier.transactionCount || 0) + 1
    } else {
      suppliers.push({
        id: `supp-${Date.now()}`,
        name: expense.supplier,
        firstTransactionDate: expense.date,
        lastTransactionDate: expense.date,
        totalSpent: expense.amount,
        transactionCount: 1,
        createdAt: new Date().toISOString(),
      })
    }

    safeSetItem("suppliers", suppliers)
  }

  // Payroll integration workflows
  public processPayrollCreated(payroll: any): void {
    this.createAccountingEntriesFromPayroll(payroll)
    this.addEvent("PAYROLL_CREATED", "payroll", payroll)
  }

  private createAccountingEntriesFromPayroll(payroll: any): void {
    const entries: AccountingEntry[] = []

    // Debit: Salary Expense
    entries.push({
      id: `${payroll.id}-salary`,
      date: payroll.date,
      description: `Salary expense for ${payroll.period}`,
      debitAccount: "6000", // Salary Expense
      creditAccount: "2100", // Salaries Payable
      amount: payroll.grossSalary,
      reference: payroll.id,
      module: "payroll",
    })

    // SSNIT Contributions
    if (payroll.ssnitEmployee > 0) {
      entries.push({
        id: `${payroll.id}-ssnit-emp`,
        date: payroll.date,
        description: `SSNIT Employee contribution`,
        debitAccount: "2100", // Salaries Payable
        creditAccount: "2400", // SSNIT Payable
        amount: payroll.ssnitEmployee,
        reference: payroll.id,
        module: "payroll",
      })
    }

    const existingEntries = safeGetItem<AccountingEntry[]>("accountingEntries", [])
    existingEntries.push(...entries)
    safeSetItem("accountingEntries", existingEntries)
  }

  // Inventory integration workflows
  public processInventoryUpdate(item: InventoryItem, changeType: string): void {
    this.updateInventoryValuation(item, changeType)
    this.checkReorderLevels(item)
    this.addEvent("INVENTORY_UPDATED", "inventory", { item, changeType })
  }

  private updateInventoryValuation(item: InventoryItem, changeType: string): void {
    if (changeType === "STOCK_IN") {
      // Create accounting entry for inventory increase
      const entries: AccountingEntry[] = [
        {
          id: `inv-${item.id}-${Date.now()}`,
          date: new Date().toISOString(),
          description: `Inventory increase: ${item.name}`,
          debitAccount: "1300", // Inventory
          creditAccount: "2000", // Accounts Payable
          amount: item.quantity * item.unitCost,
          reference: item.id,
          module: "inventory",
        },
      ]

      const existingEntries = safeGetItem<AccountingEntry[]>("accountingEntries", [])
      existingEntries.push(...entries)
      safeSetItem("accountingEntries", existingEntries)
    }
  }

  private checkReorderLevels(item: InventoryItem): void {
    const reorderLevel = 10 // This would be configurable per item

    if (item.quantity <= reorderLevel) {
      // Create reorder notification
      const notifications = safeGetItem<any[]>("notifications", [])
      notifications.push({
        id: `reorder-${item.id}-${Date.now()}`,
        type: "REORDER_ALERT",
        title: "Low Stock Alert",
        message: `${item.name} is running low (${item.quantity} remaining)`,
        itemId: item.id,
        createdAt: new Date().toISOString(),
        read: false,
      })
      safeSetItem("notifications", notifications)
    }
  }

  // Event processing
  private processEvents(): void {
    const unprocessedEvents = this.eventQueue.filter((e) => !e.processed)

    unprocessedEvents.forEach((event) => {
      try {
        this.processEvent(event)
        event.processed = true
      } catch (error) {
        console.error("Failed to process integration event:", error)
      }
    })

    this.saveEventQueue()
  }

  private processEvent(event: IntegrationEvent): void {
    // Additional event processing logic can be added here
    console.log(`Processing integration event: ${event.type} from ${event.module}`)
  }

  // Data synchronization
  public syncModuleData(): void {
    // Sync sales with accounting
    const sales = dataManager.getSales()
    sales.forEach((sale) => {
      const existingEntries = safeGetItem<AccountingEntry[]>("accountingEntries", [])
      const hasEntry = existingEntries.some((entry) => entry.reference === sale.id)

      if (!hasEntry) {
        this.createAccountingEntriesFromSale(sale)
      }
    })

    // Sync expenses with accounting
    const expenses = dataManager.getExpenses()
    expenses.forEach((expense) => {
      const existingEntries = safeGetItem<AccountingEntry[]>("accountingEntries", [])
      const hasEntry = existingEntries.some((entry) => entry.reference === expense.id)

      if (!hasEntry) {
        this.createAccountingEntriesFromExpense(expense)
      }
    })
  }

  // Reporting integration
  public generateIntegratedReport(type: string, dateRange: { start: string; end: string }) {
    const report = {
      type,
      dateRange,
      generatedAt: new Date().toISOString(),
      data: {} as any,
    }

    switch (type) {
      case "FINANCIAL_SUMMARY":
        report.data = this.generateFinancialSummary(dateRange)
        break
      case "OPERATIONAL_SUMMARY":
        report.data = this.generateOperationalSummary(dateRange)
        break
      default:
        throw new Error(`Unknown report type: ${type}`)
    }

    return report
  }

  private generateFinancialSummary(dateRange: { start: string; end: string }) {
    const sales = dataManager.getSales().filter((s) => s.date >= dateRange.start && s.date <= dateRange.end)
    const expenses = dataManager.getExpenses().filter((e) => e.date >= dateRange.start && e.date <= dateRange.end)

    return {
      totalRevenue: sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
      netIncome:
        sales.reduce((sum, sale) => sum + sale.totalAmount, 0) -
        expenses.reduce((sum, expense) => sum + expense.amount, 0),
      salesCount: sales.length,
      expenseCount: expenses.length,
    }
  }

  private generateOperationalSummary(dateRange: { start: string; end: string }) {
    const inventory = safeGetItem<InventoryItem[]>("inventory", [])
    const staff = dataManager.getStaff()

    return {
      inventoryValue: inventory.reduce((sum, item) => sum + item.quantity * item.unitCost, 0),
      lowStockItems: inventory.filter((item) => item.quantity <= 10).length,
      activeStaff: staff.filter((member) => member.isActive).length,
      totalStaff: staff.length,
    }
  }
}

export const integrationService = IntegrationService.getInstance()
