export interface InventoryItem {
  id: string
  name: string
  description?: string
  category: string
  subcategory?: string
  sku: string
  barcode?: string
  unit: string
  costPrice: number
  sellingPrice?: number
  supplier: string
  location: string
  department: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderPoint: number
  reorderQuantity: number
  lastRestocked: string
  expiryDate?: string
  batchNumber?: string
  status: "active" | "inactive" | "discontinued"
  valuationMethod: "FIFO" | "LIFO" | "WeightedAverage"
  createdAt: string
  updatedAt: string
}

export interface StockMovement {
  id: string
  itemId: string
  itemName: string
  type: "in" | "out" | "transfer" | "adjustment" | "waste"
  quantity: number
  unitCost: number
  totalCost: number
  fromLocation?: string
  toLocation?: string
  department: string
  reference: string
  reason?: string
  performedBy: string
  approvedBy?: string
  date: string
  batchNumber?: string
  expiryDate?: string
}

export interface StockTransfer {
  id: string
  transferNumber: string
  fromLocation: string
  toLocation: string
  fromDepartment: string
  toDepartment: string
  items: {
    itemId: string
    itemName: string
    quantity: number
    unitCost: number
    totalCost: number
  }[]
  status: "pending" | "approved" | "completed" | "cancelled"
  requestedBy: string
  approvedBy?: string
  completedBy?: string
  requestDate: string
  approvedDate?: string
  completedDate?: string
  notes?: string
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  department: string
  items: {
    itemId: string
    itemName: string
    quantity: number
    unitCost: number
    totalCost: number
  }[]
  subtotal: number
  tax: number
  total: number
  status: "draft" | "sent" | "approved" | "received" | "cancelled"
  createdBy: string
  approvedBy?: string
  receivedBy?: string
  createdDate: string
  approvedDate?: string
  receivedDate?: string
  expectedDelivery?: string
  notes?: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  paymentTerms: string
  deliveryTerms: string
  categories: string[]
  status: "active" | "inactive"
  rating: number
  totalOrders: number
  totalValue: number
  lastOrderDate?: string
  createdAt: string
}

export interface Recipe {
  id: string
  name: string
  description?: string
  category: string
  servingSize: number
  ingredients: {
    itemId: string
    itemName: string
    quantity: number
    unit: string
    cost: number
  }[]
  totalCost: number
  costPerServing: number
  sellingPrice?: number
  margin?: number
  preparationTime: number
  instructions?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export const INVENTORY_CATEGORIES = [
  "Food & Beverage",
  "Cleaning Supplies",
  "Linen & Textiles",
  "Amenities",
  "Office Supplies",
  "Maintenance",
  "Kitchen Equipment",
  "Bar Supplies",
  "Event Supplies",
  "Other",
]

export const DEPARTMENTS = [
  "Central Store",
  "Restaurant",
  "Bar",
  "Housekeeping",
  "Event Venues",
  "Pool Bar",
  "Kitchen",
  "Front Office",
  "Maintenance",
]

export const UNITS = ["pcs", "kg", "g", "l", "ml", "bottles", "cases", "boxes", "rolls", "sets"]
