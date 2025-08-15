import type { User, UserRole, Permission, Department } from "@/types/auth"
import { ROLE_HIERARCHY } from "@/types/auth"

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userData = localStorage.getItem("user")
    if (!userData) return null

    const user = JSON.parse(userData)
    return user && user.email ? user : null
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasRole(requiredRole: UserRole): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (user.role === "administrator") return true

  return user.role === requiredRole
}

export function hasPermission(permission: Permission): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (user.role === "administrator") return true

  return user.permissions?.includes(permission) || false
}

export function hasAccessLevel(requiredLevel: number): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (user.role === "administrator") return true

  return user.accessLevel >= requiredLevel
}

export function canSupervise(targetRole: UserRole): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (user.role === "administrator") return true

  const roleConfig = ROLE_HIERARCHY[user.role]
  return roleConfig?.canSupervise.includes(targetRole) || false
}

export function isManagement(): boolean {
  const user = getCurrentUser()
  return user?.role === "management" || user?.role === "administrator"
}

export function isSupervisor(): boolean {
  const user = getCurrentUser()
  return user?.role === "supervisor" || user?.role === "management" || user?.role === "administrator"
}

export function canAccessDepartment(department: Department): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (user.role === "administrator") return true

  // Management can access all departments
  if (user.role === "management") return true

  // Users can access their own department
  if (user.department === department) return true

  // Supervisors can access related departments
  if (user.role === "supervisor") {
    const relatedDepts: Record<Department, Department[]> = {
      "front-office": ["sales-marketing", "accounting-finance"],
      "food-beverage": ["inventory-stores", "sales-marketing"],
      "inventory-stores": ["food-beverage", "housekeeping"],
      "accounting-finance": ["human-resources", "administration"],
      "sales-marketing": ["front-office", "food-beverage"],
      housekeeping: ["inventory-stores", "maintenance"],
      "human-resources": ["administration"],
      maintenance: ["housekeeping", "security"],
      security: ["front-office", "maintenance"],
      administration: ["human-resources", "accounting-finance"],
    }

    return relatedDepts[user.department]?.includes(department) || false
  }

  return false
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    administrator: "Administrator", // Added administrator role
    management: "Management",
    supervisor: "Supervisor",
    frontdesk: "Front Desk",
    sales: "Sales",
    storekeeper: "Store Keeper",
    officer: "Officer",
    accountant: "Accountant",
    viewer: "Viewer",
  }

  return roleNames[role] || role
}

export function getDepartmentDisplayName(department: Department): string {
  const deptNames: Record<Department, string> = {
    "front-office": "Front Office",
    housekeeping: "Housekeeping",
    "food-beverage": "Food & Beverage",
    "sales-marketing": "Sales & Marketing",
    "accounting-finance": "Accounting & Finance",
    "inventory-stores": "Inventory & Stores",
    "human-resources": "Human Resources",
    maintenance: "Maintenance",
    security: "Security",
    administration: "Administration",
  }

  return deptNames[department] || department
}

export function createUserSession(userData: Partial<User>): void {
  if (typeof window === "undefined") return

  const user: User = {
    id: userData.id || Date.now().toString(),
    email: userData.email || "",
    name: userData.name || "",
    role: userData.role || "viewer",
    department: userData.department || "administration",
    permissions: userData.permissions || ROLE_HIERARCHY[userData.role || "viewer"].permissions,
    isActive: userData.isActive ?? true,
    position: userData.position || "",
    accessLevel: userData.accessLevel || ROLE_HIERARCHY[userData.role || "viewer"].accessLevel,
    createdAt: userData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }

  localStorage.setItem("user", JSON.stringify(user))
}

export function updateUserSession(updates: Partial<User>): void {
  const currentUser = getCurrentUser()
  if (!currentUser) return

  const updatedUser = {
    ...currentUser,
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem("user", JSON.stringify(updatedUser))
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    localStorage.removeItem("companyData")
    window.location.href = "/login"
  }
}

// Utility functions for UI
export function getUserInitials(user: User): string {
  return user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    administrator: "bg-red-100 text-red-800 border-red-200", // Added administrator color
    management: "bg-purple-100 text-purple-800 border-purple-200",
    supervisor: "bg-blue-100 text-blue-800 border-blue-200",
    accountant: "bg-green-100 text-green-800 border-green-200",
    frontdesk: "bg-orange-100 text-orange-800 border-orange-200",
    sales: "bg-pink-100 text-pink-800 border-pink-200",
    storekeeper: "bg-yellow-100 text-yellow-800 border-yellow-200",
    officer: "bg-gray-100 text-gray-800 border-gray-200",
    viewer: "bg-slate-100 text-slate-800 border-slate-200",
  }

  return colors[role] || colors.viewer
}

export function setUserAsAdministrator(email: string): void {
  if (typeof window === "undefined") return

  // Check if user exists in company users
  const companyUsers = JSON.parse(localStorage.getItem("companyUsers") || "[]")
  const userIndex = companyUsers.findIndex((user: any) => user.email === email)

  if (userIndex !== -1) {
    // Update company user role
    companyUsers[userIndex].role = "administrator"
    companyUsers[userIndex].accessLevel = 6
    companyUsers[userIndex].permissions = ROLE_HIERARCHY.administrator?.permissions || []
    localStorage.setItem("companyUsers", JSON.stringify(companyUsers))
  }

  // Update current user session if it's the same email
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.email === email) {
    updateUserSession({
      role: "administrator",
      accessLevel: 6,
      permissions: ROLE_HIERARCHY.administrator?.permissions || [],
    })
  }
}

export function initializeAdministrator(): void {
  if (typeof window === "undefined") return

  const adminEmail = "mwumpini@gmail.com"

  // Set the specific user as administrator
  setUserAsAdministrator(adminEmail)

  // If current user is the admin email, update their session
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.email === adminEmail && currentUser.role !== "administrator") {
    updateUserSession({
      role: "administrator",
      accessLevel: 6,
      permissions: ROLE_HIERARCHY.administrator?.permissions || [],
    })
  }
}

export function initializeUserAccess(): void {
  if (typeof window === "undefined") return

  try {
    console.log("🔧 Initializing user access system...")

    // Initialize administrator user if not exists
    const adminEmail = "mwumpini@gmail.com"

    // Get or create company users
    let companyUsers = []
    try {
      const storedUsers = localStorage.getItem("companyUsers")
      companyUsers = storedUsers ? JSON.parse(storedUsers) : []
    } catch {
      companyUsers = []
    }

    // Check if admin user exists
    let adminUser = companyUsers.find((user: any) => user.email === adminEmail)

    if (!adminUser) {
      console.log("👤 Creating administrator user:", adminEmail)
      // Create admin user
      adminUser = {
        id: "admin-001",
        name: "System Administrator",
        email: adminEmail,
        role: "administrator",
        department: "administration",
        position: "System Administrator",
        phone: "+233 20 000 0000",
        isActive: true,
        permissions: ROLE_HIERARCHY.administrator?.permissions || [],
        accessLevel: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        dateJoined: new Date().toISOString().split("T")[0],
      }
      companyUsers.push(adminUser)
    } else {
      console.log("🔄 Updating existing administrator user:", adminEmail)
      // Update existing admin user to ensure proper role
      adminUser.role = "administrator"
      adminUser.accessLevel = 6
      adminUser.permissions = ROLE_HIERARCHY.administrator?.permissions || []
      adminUser.updatedAt = new Date().toISOString()
    }

    // Save updated company users
    localStorage.setItem("companyUsers", JSON.stringify(companyUsers))

    // Check current user session
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.email === adminEmail) {
      console.log("🔐 Updating current user session to administrator")
      // Update current user session to admin
      updateUserSession({
        role: "administrator",
        accessLevel: 6,
        permissions: ROLE_HIERARCHY.administrator?.permissions || [],
      })
    }

    console.log("✅ User access system initialized successfully")
  } catch (error) {
    console.error("❌ Error initializing user access:", error)
  }
}

export function loginUser(email: string, password: string): boolean {
  if (typeof window === "undefined") return false

  try {
    // Get company users
    const companyUsers = JSON.parse(localStorage.getItem("companyUsers") || "[]")
    const user = companyUsers.find((u: any) => u.email === email && u.isActive)

    if (!user) {
      return false
    }

    // Create user session
    const sessionUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      position: user.position,
      phone: user.phone,
      permissions: user.permissions || ROLE_HIERARCHY[user.role]?.permissions || [],
      isActive: user.isActive,
      accessLevel: user.accessLevel || ROLE_HIERARCHY[user.role]?.accessLevel || 1,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      reportsTo: user.reportsTo,
      canAuthorize: user.canAuthorize,
      authorizationLimit: user.authorizationLimit,
      requiresApproval: user.requiresApproval,
      shift: user.shift,
    }

    localStorage.setItem("user", JSON.stringify(sessionUser))

    // Update last login in company users
    const updatedUsers = companyUsers.map((u: any) =>
      u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u,
    )
    localStorage.setItem("companyUsers", JSON.stringify(updatedUsers))

    return true
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

export function ensureAdminAccess(email = "mwumpini@gmail.com"): void {
  if (typeof window === "undefined") return

  try {
    // Initialize user access first
    initializeUserAccess()

    // Force login as admin if current user matches
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.email === email && currentUser.role !== "administrator") {
      // Update current session
      updateUserSession({
        role: "administrator",
        accessLevel: 6,
        permissions: ROLE_HIERARCHY.administrator?.permissions || [],
      })
    }
  } catch (error) {
    console.error("Error ensuring admin access:", error)
  }
}
