import { safeGetItem, safeSetItem, safeRemoveItem } from "./storage"
import { validateFormData } from "./validation"

// Data type definitions
export interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
  position: string
  permissions: string[]
  accessLevel: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLogin: string
}

export interface Sale {
  id: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  serviceType: string
  description?: string
  amount: number
  vatAmount: number
  nhilAmount: number
  getfundAmount: number
  covidAmount: number
  tourismAmount: number
  totalAmount: number
  date: string
  createdAt: string
}

export interface Expense {
  id: string
  date: string
  paymentDetails: string
  supplier: string
  amount: number
  category: string
  vatType: string
  mop: string
  isWithholding: boolean
  withholdingType: string | null
  inputVat: number
  createdAt: string
}

export interface Staff {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  basicSalary: number
  ssnit: string
  tier2: string
  dateJoined: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Storage keys enum for consistency
export enum StorageKeys {
  USER = "user",
  COMPANY = "company",
  SALES = "sales",
  EXPENSES = "ghanaTaxExpenses",
  STAFF = "payrollStaff",
  COMPANY_USERS = "companyUsers",
  DATA_CLEARED = "dataCleared",
  BACKUP_TIMESTAMP = "lastBackupTimestamp",
  APP_VERSION = "appVersion",
}

// Data validation schemas
const userValidationRules = {
  id: ["required"],
  email: ["required", "email"],
  name: ["required"],
  role: ["required"],
}

const saleValidationRules = {
  id: ["required"],
  customerName: ["required"],
  amount: ["required", "amount"],
  date: ["required", "date"],
}

const expenseValidationRules = {
  id: ["required"],
  supplier: ["required"],
  amount: ["required", "amount"],
  date: ["required", "date"],
}

const staffValidationRules = {
  id: ["required"],
  name: ["required"],
  email: ["required", "email"],
  basicSalary: ["required", "amount"],
}

// Data Manager Class
export class DataManager {
  private static instance: DataManager
  private backupInterval: NodeJS.Timeout | null = null

  private constructor() {
    this.initializeBackupSystem()
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  // Generic data operations with validation
  private validateData<T>(data: T, rules: Record<string, string[]>): boolean {
    const validation = validateFormData(data as any, rules)
    if (!validation.isValid) {
      console.error("Data validation failed:", validation.errors)
      return false
    }
    return true
  }

  // User management
  public getUser(): User | null {
    const user = safeGetItem<User>(StorageKeys.USER, null)
    if (user && this.validateData(user, userValidationRules)) {
      return user
    }
    return null
  }

  public setUser(user: User): boolean {
    if (!this.validateData(user, userValidationRules)) {
      return false
    }
    user.updatedAt = new Date().toISOString()
    return safeSetItem(StorageKeys.USER, user)
  }

  // Sales management
  public getSales(): Sale[] {
    const sales = safeGetItem<Sale[]>(StorageKeys.SALES, [])
    return sales.filter((sale) => this.validateData(sale, saleValidationRules))
  }

  public addSale(sale: Omit<Sale, "id" | "createdAt">): boolean {
    const newSale: Sale = {
      ...sale,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    }

    if (!this.validateData(newSale, saleValidationRules)) {
      return false
    }

    const sales = this.getSales()
    sales.push(newSale)
    return safeSetItem(StorageKeys.SALES, sales)
  }

  public updateSale(id: string, updates: Partial<Sale>): boolean {
    const sales = this.getSales()
    const index = sales.findIndex((sale) => sale.id === id)

    if (index === -1) return false

    const updatedSale = { ...sales[index], ...updates }
    if (!this.validateData(updatedSale, saleValidationRules)) {
      return false
    }

    sales[index] = updatedSale
    return safeSetItem(StorageKeys.SALES, sales)
  }

  public deleteSale(id: string): boolean {
    const sales = this.getSales()
    const filteredSales = sales.filter((sale) => sale.id !== id)
    return safeSetItem(StorageKeys.SALES, filteredSales)
  }

  // Expenses management
  public getExpenses(): Expense[] {
    const expenses = safeGetItem<Expense[]>(StorageKeys.EXPENSES, [])
    return expenses.filter((expense) => this.validateData(expense, expenseValidationRules))
  }

  public addExpense(expense: Omit<Expense, "id" | "createdAt">): boolean {
    const newExpense: Expense = {
      ...expense,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    }

    if (!this.validateData(newExpense, expenseValidationRules)) {
      return false
    }

    const expenses = this.getExpenses()
    expenses.push(newExpense)
    return safeSetItem(StorageKeys.EXPENSES, expenses)
  }

  public updateExpense(id: string, updates: Partial<Expense>): boolean {
    const expenses = this.getExpenses()
    const index = expenses.findIndex((expense) => expense.id === id)

    if (index === -1) return false

    const updatedExpense = { ...expenses[index], ...updates }
    if (!this.validateData(updatedExpense, expenseValidationRules)) {
      return false
    }

    expenses[index] = updatedExpense
    return safeSetItem(StorageKeys.EXPENSES, expenses)
  }

  public deleteExpense(id: string): boolean {
    const expenses = this.getExpenses()
    const filteredExpenses = expenses.filter((expense) => expense.id !== id)
    return safeSetItem(StorageKeys.EXPENSES, filteredExpenses)
  }

  // Staff management
  public getStaff(): Staff[] {
    const staff = safeGetItem<Staff[]>(StorageKeys.STAFF, [])
    return staff.filter((member) => this.validateData(member, staffValidationRules))
  }

  public addStaff(staff: Omit<Staff, "id" | "createdAt" | "updatedAt">): boolean {
    const newStaff: Staff = {
      ...staff,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (!this.validateData(newStaff, staffValidationRules)) {
      return false
    }

    const staffList = this.getStaff()
    staffList.push(newStaff)
    return safeSetItem(StorageKeys.STAFF, staffList)
  }

  public updateStaff(id: string, updates: Partial<Staff>): boolean {
    const staffList = this.getStaff()
    const index = staffList.findIndex((member) => member.id === id)

    if (index === -1) return false

    const updatedStaff = {
      ...staffList[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    if (!this.validateData(updatedStaff, staffValidationRules)) {
      return false
    }

    staffList[index] = updatedStaff
    return safeSetItem(StorageKeys.STAFF, staffList)
  }

  public deleteStaff(id: string): boolean {
    const staffList = this.getStaff()
    const filteredStaff = staffList.filter((member) => member.id !== id)
    return safeSetItem(StorageKeys.STAFF, filteredStaff)
  }

  // Backup and restore functionality
  public createBackup(): string | null {
    try {
      const backup = {
        timestamp: new Date().toISOString(),
        version: safeGetItem(StorageKeys.APP_VERSION, "1.0.0"),
        data: {
          user: this.getUser(),
          company: safeGetItem(StorageKeys.COMPANY, null),
          sales: this.getSales(),
          expenses: this.getExpenses(),
          staff: this.getStaff(),
          companyUsers: safeGetItem(StorageKeys.COMPANY_USERS, []),
        },
      }

      const backupString = JSON.stringify(backup, null, 2)
      safeSetItem(StorageKeys.BACKUP_TIMESTAMP, backup.timestamp)

      return backupString
    } catch (error) {
      console.error("Failed to create backup:", error)
      return null
    }
  }

  public restoreFromBackup(backupString: string): boolean {
    try {
      const backup = JSON.parse(backupString)

      if (!backup.data || !backup.timestamp) {
        throw new Error("Invalid backup format")
      }

      // Restore data with validation
      if (backup.data.user) {
        this.setUser(backup.data.user)
      }

      if (backup.data.company) {
        safeSetItem(StorageKeys.COMPANY, backup.data.company)
      }

      if (backup.data.sales) {
        safeSetItem(StorageKeys.SALES, backup.data.sales)
      }

      if (backup.data.expenses) {
        safeSetItem(StorageKeys.EXPENSES, backup.data.expenses)
      }

      if (backup.data.staff) {
        safeSetItem(StorageKeys.STAFF, backup.data.staff)
      }

      if (backup.data.companyUsers) {
        safeSetItem(StorageKeys.COMPANY_USERS, backup.data.companyUsers)
      }

      return true
    } catch (error) {
      console.error("Failed to restore backup:", error)
      return false
    }
  }

  // Data statistics and health checks
  public getDataStats() {
    return {
      salesCount: this.getSales().length,
      expensesCount: this.getExpenses().length,
      staffCount: this.getStaff().length,
      lastBackup: safeGetItem(StorageKeys.BACKUP_TIMESTAMP, null),
      storageUsage: this.calculateStorageUsage(),
    }
  }

  private calculateStorageUsage(): number {
    try {
      let totalSize = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length
        }
      }
      return totalSize
    } catch (error) {
      return 0
    }
  }

  // Utility methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeBackupSystem(): void {
    // Auto-backup every 30 minutes
    if (typeof window !== "undefined") {
      this.backupInterval = setInterval(
        () => {
          this.createBackup()
        },
        30 * 60 * 1000,
      )
    }
  }

  public cleanup(): void {
    if (this.backupInterval) {
      clearInterval(this.backupInterval)
      this.backupInterval = null
    }
  }

  // Data migration and cleanup
  public migrateData(): boolean {
    try {
      // Check if migration is needed
      const currentVersion = safeGetItem(StorageKeys.APP_VERSION, "1.0.0")

      // Add migration logic here as needed
      safeSetItem(StorageKeys.APP_VERSION, "1.1.0")

      return true
    } catch (error) {
      console.error("Data migration failed:", error)
      return false
    }
  }

  public clearAllData(): boolean {
    try {
      const keysToKeep = [StorageKeys.USER, StorageKeys.COMPANY, StorageKeys.DATA_CLEARED]

      Object.values(StorageKeys).forEach((key) => {
        if (!keysToKeep.includes(key)) {
          safeRemoveItem(key)
        }
      })

      return true
    } catch (error) {
      console.error("Failed to clear data:", error)
      return false
    }
  }
}

// Export singleton instance
export const dataManager = DataManager.getInstance()
