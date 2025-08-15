export type UserRole =
  | "administrator"
  | "management"
  | "supervisor"
  | "frontdesk"
  | "sales"
  | "storekeeper"
  | "officer"
  | "accountant"
  | "viewer"

export type Department =
  | "front-office"
  | "housekeeping"
  | "food-beverage"
  | "sales-marketing"
  | "accounting-finance"
  | "inventory-stores"
  | "human-resources"
  | "maintenance"
  | "security"
  | "administration"

export type Permission =
  | "view_dashboard"
  | "manage_users"
  | "view_reports"
  | "manage_inventory"
  | "process_sales"
  | "handle_reservations"
  | "manage_accounting"
  | "approve_purchases"
  | "manage_payroll"
  | "view_analytics"
  | "export_data"
  | "system_settings"
  | "create_records"
  | "edit_records"
  | "delete_records"
  | "approve_transactions"
  | "view_sensitive_data"
  | "manage_departments"
  | "override_limits"
  | "access_audit_logs"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department: Department
  permissions: Permission[]
  isActive: boolean
  employeeId?: string
  position: string
  phone?: string
  avatar?: string
  lastLogin?: string
  createdAt: string
  updatedAt: string
  reportsTo?: string // User ID of supervisor
  canAuthorize?: string[] // Array of user IDs this user can authorize
  authorizationLimit?: number // Maximum amount this user can authorize
  requiresApproval?: boolean // Whether this user's actions need approval
  approvedBy?: string // User ID of who approved this user
  shift?: "morning" | "afternoon" | "night" | "rotating"
  accessLevel: 1 | 2 | 3 | 4 | 5 | 6 // 1=lowest, 6=highest
}

export interface RolePermissions {
  [key: string]: {
    permissions: Permission[]
    accessLevel: number
    canSupervise: UserRole[]
    description: string
  }
}

export const ROLE_HIERARCHY: RolePermissions = {
  administrator: {
    permissions: [
      "view_dashboard",
      "manage_users",
      "view_reports",
      "manage_inventory",
      "process_sales",
      "handle_reservations",
      "manage_accounting",
      "approve_purchases",
      "manage_payroll",
      "view_analytics",
      "export_data",
      "system_settings",
      "create_records",
      "edit_records",
      "delete_records",
      "approve_transactions",
      "view_sensitive_data",
      "manage_departments",
      "override_limits",
      "access_audit_logs",
    ],
    accessLevel: 6, // Higher than management
    canSupervise: ["management", "supervisor", "frontdesk", "sales", "storekeeper", "officer", "accountant", "viewer"],
    description: "Super user with unrestricted access to all system functions",
  },
  management: {
    permissions: [
      "view_dashboard",
      "manage_users",
      "view_reports",
      "manage_inventory",
      "process_sales",
      "handle_reservations",
      "manage_accounting",
      "approve_purchases",
      "manage_payroll",
      "view_analytics",
      "export_data",
      "system_settings",
      "create_records",
      "edit_records",
      "delete_records",
      "approve_transactions",
      "view_sensitive_data",
      "manage_departments",
      "override_limits",
      "access_audit_logs",
    ],
    accessLevel: 5,
    canSupervise: ["supervisor", "frontdesk", "sales", "storekeeper", "officer", "accountant", "viewer"],
    description: "Full system access with all management capabilities",
  },
  supervisor: {
    permissions: [
      "view_dashboard",
      "view_reports",
      "manage_inventory",
      "process_sales",
      "handle_reservations",
      "approve_purchases",
      "view_analytics",
      "export_data",
      "create_records",
      "edit_records",
      "approve_transactions",
    ],
    accessLevel: 4,
    canSupervise: ["frontdesk", "sales", "storekeeper", "officer", "viewer"],
    description: "Departmental supervision with approval authority",
  },
  accountant: {
    permissions: [
      "view_dashboard",
      "view_reports",
      "manage_accounting",
      "manage_payroll",
      "view_analytics",
      "export_data",
      "create_records",
      "edit_records",
      "view_sensitive_data",
    ],
    accessLevel: 4,
    canSupervise: ["officer", "viewer"],
    description: "Financial management and accounting operations",
  },
  frontdesk: {
    permissions: [
      "view_dashboard",
      "handle_reservations",
      "process_sales",
      "view_reports",
      "create_records",
      "edit_records",
    ],
    accessLevel: 3,
    canSupervise: ["viewer"],
    description: "Guest services and front office operations",
  },
  sales: {
    permissions: [
      "view_dashboard",
      "process_sales",
      "handle_reservations",
      "view_reports",
      "view_analytics",
      "create_records",
      "edit_records",
    ],
    accessLevel: 3,
    canSupervise: ["viewer"],
    description: "Sales operations and customer management",
  },
  storekeeper: {
    permissions: [
      "view_dashboard",
      "manage_inventory",
      "view_reports",
      "export_data",
      "create_records",
      "edit_records",
    ],
    accessLevel: 3,
    canSupervise: ["viewer"],
    description: "Inventory management and stock control",
  },
  officer: {
    permissions: ["view_dashboard", "view_reports", "create_records"],
    accessLevel: 2,
    canSupervise: ["viewer"],
    description: "General operations and administrative tasks",
  },
  viewer: {
    permissions: ["view_dashboard", "view_reports"],
    accessLevel: 1,
    canSupervise: [],
    description: "Read-only access to assigned areas",
  },
}

export const DEPARTMENT_ROLES: Record<Department, UserRole[]> = {
  "front-office": ["administrator", "management", "supervisor", "frontdesk", "officer", "viewer"],
  housekeeping: ["administrator", "management", "supervisor", "officer", "viewer"],
  "food-beverage": ["administrator", "management", "supervisor", "sales", "officer", "viewer"],
  "sales-marketing": ["administrator", "management", "supervisor", "sales", "officer", "viewer"],
  "accounting-finance": ["administrator", "management", "accountant", "officer", "viewer"],
  "inventory-stores": ["administrator", "management", "supervisor", "storekeeper", "officer", "viewer"],
  "human-resources": ["administrator", "management", "supervisor", "officer", "viewer"],
  maintenance: ["administrator", "management", "supervisor", "officer", "viewer"],
  security: ["administrator", "management", "supervisor", "officer", "viewer"],
  administration: ["administrator", "management", "supervisor", "officer", "viewer"],
}
