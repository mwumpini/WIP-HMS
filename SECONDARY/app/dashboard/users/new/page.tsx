"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Settings, Eye, EyeOff, RefreshCw, Copy, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import type { User as UserType, UserRole, Department, Permission } from "@/types/auth"
import { ROLE_HIERARCHY, DEPARTMENT_ROLES } from "@/types/auth"

export default function NewUserPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [existingUsers, setExistingUsers] = useState<UserType[]>([])

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    position: "",

    // System Access
    role: "viewer" as UserRole, // Changed default from "guest" to "viewer"
    department: "administration" as Department, // Changed default from "general" to "administration"
    password: "",
    isActive: true,

    // Permissions
    customPermissions: [] as Permission[],

    // Reporting Structure
    reportsTo: "",
    canAuthorize: [] as string[],
    authorizationLimit: 0,
    requiresApproval: false,

    // Additional Settings
    shift: "morning" as "morning" | "afternoon" | "night" | "rotating",
  })

  useEffect(() => {
    // Load existing users for reporting structure
    const storedUsers = localStorage.getItem("companyUsers")
    if (storedUsers) {
      setExistingUsers(JSON.parse(storedUsers))
    }
  }, [])

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, password })
    toast({
      title: "Password Generated",
      description: "A secure password has been generated.",
    })
  }

  const copyPassword = () => {
    if (formData.password) {
      navigator.clipboard.writeText(formData.password)
      toast({
        title: "Password Copied",
        description: "Password has been copied to clipboard.",
      })
    }
  }

  const handleRoleChange = (role: UserRole) => {
    const rolePermissions = ROLE_HIERARCHY[role]?.permissions || []
    setFormData({
      ...formData,
      role,
      customPermissions: rolePermissions,
    })
  }

  const handlePermissionToggle = (permission: Permission) => {
    const updatedPermissions = formData.customPermissions.includes(permission)
      ? formData.customPermissions.filter((p) => p !== permission)
      : [...formData.customPermissions, permission]

    setFormData({ ...formData, customPermissions: updatedPermissions })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.role || !formData.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newUser: UserType = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      employeeId: formData.employeeId,
      position: formData.position,
      role: formData.role,
      department: formData.department,
      permissions: formData.customPermissions,
      isActive: formData.isActive,
      reportsTo: formData.reportsTo || undefined,
      canAuthorize: formData.canAuthorize,
      authorizationLimit: formData.authorizationLimit,
      requiresApproval: formData.requiresApproval,
      shift: formData.shift,
      accessLevel: ROLE_HIERARCHY[formData.role]?.accessLevel || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser]
    localStorage.setItem("companyUsers", JSON.stringify(updatedUsers))

    toast({
      title: "User Created Successfully",
      description: `${formData.name} has been added to the system.`,
    })

    router.push("/dashboard/users")
  }

  // Get available supervisors based on role hierarchy
  const getAvailableSupervisors = () => {
    if (!formData.role) return []

    return existingUsers.filter((user) => {
      const userRoleConfig = ROLE_HIERARCHY[user.role]
      return userRoleConfig?.canSupervise.includes(formData.role)
    })
  }

  // Get users this person can authorize
  const getAuthorizableUsers = () => {
    if (!formData.role) return []

    const roleConfig = ROLE_HIERARCHY[formData.role]
    return existingUsers.filter((user) => roleConfig?.canSupervise.includes(user.role))
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New User</h1>
        <p className="text-muted-foreground">
          Create a new system user with role-based permissions and reporting structure
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential user details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="Enter employee ID"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Job Title</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Enter job title"
              />
            </div>
          </CardContent>
        </Card>

        {/* System Access & Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Access & Role
            </CardTitle>
            <CardDescription>Define user role, department, and system access level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">User Role *</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLE_HIERARCHY).map(([role, config]) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex items-center justify-between w-full">
                          <span className="capitalize">{role.replace("-", " ")}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            Level {config.accessLevel}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.role && (
                  <p className="text-sm text-muted-foreground">{ROLE_HIERARCHY[formData.role]?.description}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value: Department) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(DEPARTMENT_ROLES).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Login Credentials</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                  />
                  <Label htmlFor="isActive" className="text-sm">
                    Account Active
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button type="button" variant="outline" onClick={generatePassword}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" onClick={copyPassword}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Work Shift</Label>
                  <Select
                    value={formData.shift}
                    onValueChange={(value: any) => setFormData({ ...formData, shift: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6AM - 2PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (2PM - 10PM)</SelectItem>
                      <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
                      <SelectItem value="rotating">Rotating Shifts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Permissions & Access Control
            </CardTitle>
            <CardDescription>Customize specific permissions for this user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Create Permissions */}
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-sm text-emerald-700">Create Permissions</h4>
                <p className="text-xs text-muted-foreground">Allow user to create new records and entries</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                {[
                  { key: "create_records", label: "Create Records" },
                  { key: "create_sales", label: "Create Sales" },
                  { key: "create_expenses", label: "Create Expenses" },
                  { key: "create_inventory", label: "Create Inventory Items" },
                  { key: "create_users", label: "Create Users" },
                  { key: "create_reports", label: "Create Reports" },
                ].map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.key}
                      checked={formData.customPermissions.includes(permission.key as Permission)}
                      onCheckedChange={() => handlePermissionToggle(permission.key as Permission)}
                    />
                    <Label htmlFor={permission.key} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Permissions */}
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-sm text-blue-700">Edit Permissions</h4>
                <p className="text-xs text-muted-foreground">Allow user to modify existing records and data</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                {[
                  { key: "edit_records", label: "Edit Records" },
                  { key: "edit_sales", label: "Edit Sales" },
                  { key: "edit_expenses", label: "Edit Expenses" },
                  { key: "edit_inventory", label: "Edit Inventory" },
                  { key: "edit_users", label: "Edit Users" },
                  { key: "edit_settings", label: "Edit Settings" },
                ].map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.key}
                      checked={formData.customPermissions.includes(permission.key as Permission)}
                      onCheckedChange={() => handlePermissionToggle(permission.key as Permission)}
                    />
                    <Label htmlFor={permission.key} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Delete Permissions */}
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-sm text-red-700">Delete Permissions</h4>
                <p className="text-xs text-muted-foreground">
                  Allow user to remove records and data (use with caution)
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                {[
                  { key: "delete_records", label: "Delete Records" },
                  { key: "delete_sales", label: "Delete Sales" },
                  { key: "delete_expenses", label: "Delete Expenses" },
                  { key: "delete_inventory", label: "Delete Inventory Items" },
                  { key: "delete_users", label: "Delete Users" },
                  { key: "delete_reports", label: "Delete Reports" },
                ].map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.key}
                      checked={formData.customPermissions.includes(permission.key as Permission)}
                      onCheckedChange={() => handlePermissionToggle(permission.key as Permission)}
                    />
                    <Label htmlFor={permission.key} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Permissions */}
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-sm text-purple-700">Approval Permissions</h4>
                <p className="text-xs text-muted-foreground">
                  Allow user to approve transactions and authorize actions
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                {[
                  { key: "approve_transactions", label: "Approve Transactions" },
                  { key: "approve_expenses", label: "Approve Expenses" },
                  { key: "approve_purchases", label: "Approve Purchase Orders" },
                  { key: "approve_requisitions", label: "Approve Requisitions" },
                  { key: "approve_payroll", label: "Approve Payroll" },
                  { key: "approve_discounts", label: "Approve Discounts" },
                ].map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.key}
                      checked={formData.customPermissions.includes(permission.key as Permission)}
                      onCheckedChange={() => handlePermissionToggle(permission.key as Permission)}
                    />
                    <Label htmlFor={permission.key} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* View Permissions */}
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-sm text-orange-700">View Permissions</h4>
                <p className="text-xs text-muted-foreground">Control access to sensitive data and reports</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                {[
                  { key: "view_sensitive_data", label: "View Sensitive Data" },
                  { key: "view_financial_reports", label: "View Financial Reports" },
                  { key: "view_payroll", label: "View Payroll Data" },
                  { key: "view_all_departments", label: "View All Departments" },
                  { key: "view_audit_logs", label: "View Audit Logs" },
                  { key: "view_analytics", label: "View Analytics Dashboard" },
                ].map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.key}
                      checked={formData.customPermissions.includes(permission.key as Permission)}
                      onCheckedChange={() => handlePermissionToggle(permission.key as Permission)}
                    />
                    <Label htmlFor={permission.key} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Administrative Permissions */}
            <div className="space-y-3">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-sm text-gray-700">Administrative Permissions</h4>
                <p className="text-xs text-muted-foreground">System administration and configuration access</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                {[
                  { key: "manage_system", label: "System Management" },
                  { key: "manage_integrations", label: "Manage Integrations" },
                  { key: "manage_backups", label: "Manage Backups" },
                  { key: "manage_permissions", label: "Manage User Permissions" },
                  { key: "export_data", label: "Export Data" },
                  { key: "import_data", label: "Import Data" },
                ].map((permission) => (
                  <div key={permission.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.key}
                      checked={formData.customPermissions.includes(permission.key as Permission)}
                      onCheckedChange={() => handlePermissionToggle(permission.key as Permission)}
                    />
                    <Label htmlFor={permission.key} className="text-sm">
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Reporting Structure & Authorization
            </CardTitle>
            <CardDescription>Define reporting relationships and authorization limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportsTo">Reports To</Label>
                <Select
                  value={formData.reportsTo}
                  onValueChange={(value) => setFormData({ ...formData, reportsTo: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Changed empty string value to "none" to fix lint error */}
                    <SelectItem value="none">No supervisor</SelectItem>
                    {getAvailableSupervisors().map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="authLimit">Authorization Limit (GHS)</Label>
                <Input
                  id="authLimit"
                  type="number"
                  value={formData.authorizationLimit}
                  onChange={(e) => setFormData({ ...formData, authorizationLimit: Number(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresApproval"
                  checked={formData.requiresApproval}
                  onCheckedChange={(checked) => setFormData({ ...formData, requiresApproval: !!checked })}
                />
                <Label htmlFor="requiresApproval">This user's actions require approval</Label>
              </div>

              {getAuthorizableUsers().length > 0 && (
                <div className="space-y-2">
                  <Label>Can Authorize Actions For:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {getAuthorizableUsers().map((user) => (
                      <div key={user.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`auth-${user.id}`}
                          checked={formData.canAuthorize.includes(user.id)}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...formData.canAuthorize, user.id]
                              : formData.canAuthorize.filter((id) => id !== user.id)
                            setFormData({ ...formData, canAuthorize: updated })
                          }}
                        />
                        <Label htmlFor={`auth-${user.id}`} className="text-sm">
                          {user.name} ({user.role})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/users")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            Create User
          </Button>
        </div>
      </form>
    </div>
  )
}
