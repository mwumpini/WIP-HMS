"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Shield,
  Mail,
  Phone,
  Building,
  Calendar,
  UserCheck,
  UserX,
} from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  role:
    | "administrator"
    | "management"
    | "supervisor"
    | "frontdesk"
    | "sales"
    | "storekeeper"
    | "officer"
    | "accountant"
    | "viewer"
  department: string
  position: string
  phone: string
  dateJoined: string
  isActive: boolean
  lastLogin?: string
  permissions?: {
    create: string[]
    edit: string[]
    delete: string[]
    approve: string[]
    view: string[]
    admin: string[]
  }
  reportsTo?: string
  canAuthorize?: string[]
  authorizationLimit?: number
  accessLevel?: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Load current user
    const userData = localStorage.getItem("user")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }

    // Load users from localStorage
    loadUsers()
  }, [])

  const loadUsers = () => {
    try {
      const storedUsers = localStorage.getItem("companyUsers")
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers))
      } else {
        // Initialize with current user if no users exist
        const userData = localStorage.getItem("user")
        if (userData) {
          const user = JSON.parse(userData)
          const initialUsers: User[] = [
            {
              id: "1",
              name: user.name || "Admin User",
              email: user.email || "admin@company.com",
              role: "administrator",
              department: "Administration",
              position: "System Administrator",
              phone: "+233 20 000 0000",
              dateJoined: new Date().toISOString().split("T")[0],
              isActive: true,
              lastLogin: new Date().toISOString(),
            },
          ]
          setUsers(initialUsers)
          localStorage.setItem("companyUsers", JSON.stringify(initialUsers))
        }
      }
    } catch (error) {
      console.error("Error loading users:", error)
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user })
    setIsEditDialogOpen(true)
  }

  const handleSaveUser = () => {
    if (!editingUser) return

    try {
      const updatedUsers = users.map((user) => (user.id === editingUser.id ? editingUser : user))
      setUsers(updatedUsers)
      localStorage.setItem("companyUsers", JSON.stringify(updatedUsers))

      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      })

      setIsEditDialogOpen(false)
      setEditingUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user information.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const updatedUsers = users.filter((user) => user.id !== userId)
        setUsers(updatedUsers)
        localStorage.setItem("companyUsers", JSON.stringify(updatedUsers))

        toast({
          title: "User Deleted",
          description: "User has been successfully deleted.",
        })
      } catch (error) {
        console.error("Error deleting user:", error)
        toast({
          title: "Error",
          description: "Failed to delete user.",
          variant: "destructive",
        })
      }
    }
  }

  const handleToggleUserStatus = (userId: string) => {
    try {
      const updatedUsers = users.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user))
      setUsers(updatedUsers)
      localStorage.setItem("companyUsers", JSON.stringify(updatedUsers))

      const user = users.find((u) => u.id === userId)
      toast({
        title: "User Status Updated",
        description: `User has been ${user?.isActive ? "deactivated" : "activated"}.`,
      })
    } catch (error) {
      console.error("Error updating user status:", error)
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "administrator":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "management":
        return "bg-red-100 text-red-800 border-red-200"
      case "supervisor":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "frontdesk":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "sales":
        return "bg-green-100 text-green-800 border-green-200"
      case "storekeeper":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "officer":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "accountant":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "viewer":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "administrator":
        return <Shield className="h-3 w-3" />
      case "management":
        return <Users className="h-3 w-3" />
      case "supervisor":
        return <UserCheck className="h-3 w-3" />
      case "frontdesk":
        return <Mail className="h-3 w-3" />
      case "sales":
        return <Phone className="h-3 w-3" />
      case "storekeeper":
        return <Building className="h-3 w-3" />
      case "officer":
        return <Calendar className="h-3 w-3" />
      case "accountant":
        return <UserX className="h-3 w-3" />
      case "viewer":
        return <Users className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Administrators</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.role === "administrator").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserX className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold">{users.filter((u) => !u.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>System Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No users found</p>
              <p className="text-sm mt-2">Add users to manage system access</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">User</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-left p-3">Department</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Date Joined</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-600 font-semibold">{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-gray-500 text-xs">{user.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={`${getRoleBadgeColor(user.role)} flex items-center space-x-1 w-fit`}>
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{user.department}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={user.isActive ? "default" : "secondary"}
                          className={user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(user.dateJoined).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={
                              user.isActive
                                ? "text-orange-600 hover:text-orange-800"
                                : "text-green-600 hover:text-green-800"
                            }
                          >
                            {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.id !== "1" && ( // Don't allow deleting the main admin
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog - Comprehensive Version */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information, permissions, and access control</DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="space-y-8 py-4">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Full Name *</Label>
                      <Input
                        id="edit-name"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email Address *</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone">Phone Number</Label>
                      <Input
                        id="edit-phone"
                        value={editingUser.phone}
                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-position">Position</Label>
                      <Input
                        id="edit-position"
                        value={editingUser.position}
                        onChange={(e) => setEditingUser({ ...editingUser, position: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Select
                      value={editingUser.department}
                      onValueChange={(value) => setEditingUser({ ...editingUser, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="Front Desk">Front Desk</SelectItem>
                        <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                        <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
                        <SelectItem value="Accounting">Accounting</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Inventory">Inventory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* System Access & Role */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Access & Role</CardTitle>
                  <CardDescription>Define user role and access level within the organization hierarchy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">User Role *</Label>
                    <Select
                      value={editingUser.role}
                      onValueChange={(value: any) => setEditingUser({ ...editingUser, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrator">Administrator (Super User)</SelectItem>
                        <SelectItem value="management">Management (Executive Level)</SelectItem>
                        <SelectItem value="supervisor">Supervisor (Department Head)</SelectItem>
                        <SelectItem value="frontdesk">Front Desk Staff</SelectItem>
                        <SelectItem value="sales">Sales Personnel</SelectItem>
                        <SelectItem value="storekeeper">Storekeeper</SelectItem>
                        <SelectItem value="officer">Officer</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                        <SelectItem value="viewer">Viewer (Read Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-active"
                      checked={editingUser.isActive}
                      onCheckedChange={(checked) => setEditingUser({ ...editingUser, isActive: checked })}
                    />
                    <Label htmlFor="edit-active">Active User Account</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Reporting Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reporting Structure & Authorization</CardTitle>
                  <CardDescription>Define reporting relationships and authorization limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-reports-to">Reports To</Label>
                    <Select
                      value={editingUser.reportsTo || "none"}
                      onValueChange={(value) =>
                        setEditingUser({ ...editingUser, reportsTo: value === "none" ? "" : value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No supervisor</SelectItem>
                        {users
                          .filter(
                            (u) =>
                              u.id !== editingUser.id &&
                              (u.role === "administrator" || u.role === "management" || u.role === "supervisor"),
                          )
                          .map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.role})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-auth-limit">Authorization Limit (GHS)</Label>
                    <Input
                      id="edit-auth-limit"
                      type="number"
                      value={editingUser.authorizationLimit || 0}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, authorizationLimit: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="0"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
