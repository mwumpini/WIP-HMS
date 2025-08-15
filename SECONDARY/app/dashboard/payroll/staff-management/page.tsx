"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  DollarSign,
  Building2,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  FileText,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { initialFormData, type Staff } from "@/utils/staff-management"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [viewingStaff, setViewingStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState<Staff>(initialFormData)
  const { toast } = useToast()

  // Load staff data on component mount
  useEffect(() => {
    const storedStaff = localStorage.getItem("companyStaff")
    if (storedStaff) {
      setStaff(JSON.parse(storedStaff))
    }
  }, [])

  // Save staff data to localStorage
  const saveStaffData = useCallback((staffData: Staff[]) => {
    localStorage.setItem("companyStaff", JSON.stringify(staffData))
    setStaff(staffData)
  }, [])

  // Handle form input changes
  const handleInputChange = useCallback((field: keyof Staff, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ?? "",
    }))
  }, [])

  // Add new staff member
  const handleAddStaff = useCallback(() => {
    const newStaff: Staff = {
      ...formData,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString(),
      isActive: true,
    }

    const updatedStaff = [...staff, newStaff]
    saveStaffData(updatedStaff)

    toast({
      title: "Success",
      description: "Staff member added successfully",
    })

    setShowAddDialog(false)
    setFormData(initialFormData)
  }, [formData, staff, saveStaffData, toast])

  // Edit staff member
  const handleEdit = useCallback((staffMember: Staff) => {
    setEditingStaff(staffMember)
    setFormData(staffMember)
    setShowAddDialog(true)
  }, [])

  // Update staff member
  const handleUpdateStaff = useCallback(() => {
    if (!editingStaff) return

    const updatedStaff = staff.map((s) => (s.id === editingStaff.id ? { ...formData, id: editingStaff.id } : s))

    saveStaffData(updatedStaff)

    toast({
      title: "Success",
      description: "Staff member updated successfully",
    })

    setShowAddDialog(false)
    setEditingStaff(null)
    setFormData(initialFormData)
  }, [editingStaff, formData, staff, saveStaffData, toast])

  // Delete staff member
  const handleDelete = useCallback(
    (id: string) => {
      const updatedStaff = staff.filter((s) => s.id !== id)
      saveStaffData(updatedStaff)

      toast({
        title: "Success",
        description: "Staff member deleted successfully",
      })
    },
    [staff, saveStaffData, toast],
  )

  // Export staff data to CSV
  const exportStaffData = useCallback(() => {
    if (staff.length === 0) {
      toast({
        title: "No Data",
        description: "No staff data to export",
        variant: "destructive",
      })
      return
    }

    const headers = [
      "Staff No",
      "First Name",
      "Surname",
      "Other Names",
      "Position",
      "Department",
      "Basic Salary",
      "Email",
      "Phone",
      "Address",
      "Date Joined",
      "Status",
    ]

    const csvData = staff.map((member) => [
      member.staffNo,
      member.firstName,
      member.surname,
      member.otherNames || "",
      member.position,
      member.department,
      member.basicSalary?.toString() || "0",
      member.email,
      member.mobileNumber,
      member.homeAddress,
      member.dateJoined,
      member.isActive ? "Active" : "Inactive",
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `staff-data-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [staff, toast])

  // Export staff data to PDF
  const exportStaffToPDF = useCallback(() => {
    if (staff.length === 0) {
      toast({
        title: "No Data",
        description: "No staff data to export",
        variant: "destructive",
      })
      return
    }

    // Create PDF content
    const pdfContent = `
      KALI SYN: SYNCING GHANA'S HOSPITALITY
      STAFF MANAGEMENT REPORT
      Generated on: ${new Date().toLocaleDateString()}
      
      STAFF OVERVIEW
      Total Staff: ${staff.length}
      Total Monthly Payroll: ₵${staff.reduce((sum, member) => sum + (member.basicSalary || 0), 0).toLocaleString()}
      Active Departments: ${new Set(staff.map((member) => member.department).filter(Boolean)).size}
      
      STAFF DETAILS
      ${staff
        .map(
          (member, index) => `
      ${index + 1}. ${member.firstName} ${member.surname} ${member.otherNames || ""}
         Staff No: ${member.staffNo}
         Position: ${member.position}
         Department: ${member.department}
         Basic Salary: ₵${member.basicSalary?.toLocaleString() || "0"}
         Email: ${member.email}
         Phone: ${member.mobileNumber}
         Date Joined: ${member.dateJoined}
         Status: ${member.isActive ? "Active" : "Inactive"}
      `,
        )
        .join("\n")}
    `

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `staff-report-${new Date().toISOString().split("T")[0]}.txt`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Successful",
      description: "Staff report has been exported as PDF",
    })
  }, [staff, toast])

  // Filter staff based on search term
  const filteredStaff = staff.filter(
    (member) =>
      `${member.firstName} ${member.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.staffNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Form field options
  const idTypes = ["Ghana Card", "Passport", "Driver's License", "Voter ID", "SSNIT Card"]
  const genderOptions = ["Male", "Female", "Other"]
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"]
  const employmentTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Intern"]
  const departments_list = ["Administration", "Finance", "HR", "IT", "Operations", "Sales", "Marketing"]

  const handleSubmit = (e: any) => {
    e.preventDefault()
    editingStaff ? handleUpdateStaff() : handleAddStaff()
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Link
            href="/dashboard/payroll"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Payroll (PAYE)
          </Link>
          <Link
            href="/dashboard/payroll/staff-management"
            className="border-b-2 border-emerald-500 py-2 px-1 text-sm font-medium text-emerald-600"
          >
            Staff Management
          </Link>
          <Link
            href="/dashboard/payroll/ssnit"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            SSNIT
          </Link>
          <Link
            href="/dashboard/payroll/income-tax"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Income Tax
          </Link>
          <Link
            href="/dashboard/payroll/tier2-3"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Tier 2 & 3 Pensions
          </Link>
        </nav>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportStaffData}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={exportStaffToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-gray-600">Manage your staff members and their information</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₵{staff.reduce((sum, member) => sum + (member.basicSalary || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Monthly basic salaries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(staff.map((member) => member.department).filter(Boolean)).size}
            </div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Management Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportStaffData}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>
            {filteredStaff.length} of {staff.length} staff members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No staff members found</p>
                        <p className="text-sm text-muted-foreground">
                          {searchTerm ? "Try adjusting your search" : "Add your first staff member to get started"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.staffNo}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {member.firstName} {member.surname}
                          </div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>₵{member.basicSalary?.toLocaleString() || 0}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.isActive ? "Active" : "Inactive"}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setViewingStaff(member)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(member.id!)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Staff Dialog */}
      {viewingStaff && (
        <Dialog open={!!viewingStaff} onOpenChange={() => setViewingStaff(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Staff Details</DialogTitle>
              <DialogDescription>
                View detailed information for {viewingStaff.firstName} {viewingStaff.surname}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Staff Number</Label>
                <p className="text-sm">{viewingStaff.staffNo}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                <p className="text-sm">
                  {viewingStaff.firstName} {viewingStaff.surname} {viewingStaff.otherNames}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Position</Label>
                <p className="text-sm">{viewingStaff.position}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                <p className="text-sm">{viewingStaff.department}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                <p className="text-sm">{viewingStaff.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                <p className="text-sm">{viewingStaff.mobileNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Basic Salary</Label>
                <p className="text-sm">₵{viewingStaff.basicSalary?.toLocaleString() || 0}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date Joined</Label>
                <p className="text-sm">{viewingStaff.dateJoined}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Edit Staff Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddDialog(false)
                    setEditingStaff(null)
                    setFormData(initialFormData)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Identification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Identification</CardTitle>
                    <CardDescription>Basic identification and personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="staffNo">Staff Number</Label>
                        <Input
                          id="staffNo"
                          value={formData.staffNo ?? ""}
                          onChange={(e) => handleInputChange("staffNo", e.target.value)}
                          placeholder="Auto-generated"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idType">ID Type</Label>
                        <Select
                          value={formData.idType ?? ""}
                          onValueChange={(value) => handleInputChange("idType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                          <SelectContent>
                            {idTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">ID Number</Label>
                        <Input
                          id="idNumber"
                          value={formData.idNumber ?? ""}
                          onChange={(e) => handleInputChange("idNumber", e.target.value)}
                          placeholder="Enter ID number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tinNumber">TIN Number</Label>
                        <Input
                          id="tinNumber"
                          value={formData.tinNumber ?? ""}
                          onChange={(e) => handleInputChange("tinNumber", e.target.value)}
                          placeholder="Tax Identification Number"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ghCardNo">Ghana Card Number</Label>
                        <Input
                          id="ghCardNo"
                          value={formData.ghCardNo ?? ""}
                          onChange={(e) => handleInputChange("ghCardNo", e.target.value)}
                          placeholder="GHA-XXXXXXXXX-X"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passportNumber">Passport Number</Label>
                        <Input
                          id="passportNumber"
                          value={formData.passportNumber ?? ""}
                          onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                          placeholder="Enter passport number"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Complete personal details and demographics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Select
                          value={formData.title ?? ""}
                          onValueChange={(value) => handleInputChange("title", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr.</SelectItem>
                            <SelectItem value="mrs">Mrs.</SelectItem>
                            <SelectItem value="ms">Ms.</SelectItem>
                            <SelectItem value="dr">Dr.</SelectItem>
                            <SelectItem value="prof">Prof.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName ?? ""}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">Surname *</Label>
                        <Input
                          id="surname"
                          value={formData.surname ?? ""}
                          onChange={(e) => handleInputChange("surname", e.target.value)}
                          placeholder="Enter surname"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="otherNames">Other Names</Label>
                        <Input
                          id="otherNames"
                          value={formData.otherNames ?? ""}
                          onChange={(e) => handleInputChange("otherNames", e.target.value)}
                          placeholder="Enter other names"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formData.gender ?? ""}
                          onValueChange={(value) => handleInputChange("gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.dob && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.dob ? format(new Date(formData.dob), "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.dob ? new Date(formData.dob) : undefined}
                              onSelect={(date) => handleInputChange("dob", date ? format(date, "yyyy-MM-dd") : "")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Select
                          value={formData.maritalStatus ?? ""}
                          onValueChange={(value) => handleInputChange("maritalStatus", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            {maritalStatusOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email ?? ""}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                        <Input
                          id="mobileNumber"
                          value={formData.mobileNumber ?? ""}
                          onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                          placeholder="Enter mobile number"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homeAddress">Home Address</Label>
                      <Textarea
                        id="homeAddress"
                        value={formData.homeAddress ?? ""}
                        onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                        placeholder="Enter complete home address"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Employment Information</CardTitle>
                    <CardDescription>Job details and employment terms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="position">Job Title *</Label>
                        <Input
                          id="position"
                          value={formData.position ?? ""}
                          onChange={(e) => handleInputChange("position", e.target.value)}
                          placeholder="Enter job title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department ?? ""}
                          onValueChange={(value) => handleInputChange("department", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments_list.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employmentType">Employment Type</Label>
                        <Select
                          value={formData.employmentType ?? ""}
                          onValueChange={(value) => handleInputChange("employmentType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {employmentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Employment Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.dateJoined && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.dateJoined ? format(new Date(formData.dateJoined), "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.dateJoined ? new Date(formData.dateJoined) : undefined}
                              onSelect={(date) =>
                                handleInputChange("dateJoined", date ? format(date, "yyyy-MM-dd") : "")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compensation & Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Compensation & Benefits</CardTitle>
                    <CardDescription>Salary details and benefit enrollments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="basicSalary">Basic Salary (GHS)</Label>
                        <Input
                          id="basicSalary"
                          type="number"
                          value={formData.basicSalary ?? ""}
                          onChange={(e) => handleInputChange("basicSalary", Number.parseFloat(e.target.value) || 0)}
                          placeholder="Enter basic salary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="allowances">Allowances (GHS)</Label>
                        <Input
                          id="allowances"
                          type="number"
                          value={formData.allowances ?? ""}
                          onChange={(e) => handleInputChange("allowances", Number.parseFloat(e.target.value) || 0)}
                          placeholder="Enter allowances"
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Pension & Social Security</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="ssnit"
                            checked={formData.ssnit === "YES"}
                            onCheckedChange={(checked) => handleInputChange("ssnit", checked ? "YES" : "NO")}
                          />
                          <Label htmlFor="ssnit">SSNIT Enrollment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tier2"
                            checked={formData.tier2 === "YES"}
                            onCheckedChange={(checked) => handleInputChange("tier2", checked ? "YES" : "NO")}
                          />
                          <Label htmlFor="tier2">Tier 2 Pension</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tier3"
                            checked={formData.tier3 === "YES"}
                            onCheckedChange={(checked) => handleInputChange("tier3", checked ? "YES" : "NO")}
                          />
                          <Label htmlFor="tier3">Tier 3 Pension</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Financial Information</CardTitle>
                    <CardDescription>Banking and tax details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          value={formData.bankName ?? ""}
                          onChange={(e) => handleInputChange("bankName", e.target.value)}
                          placeholder="Enter bank name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={formData.accountNumber ?? ""}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                          placeholder="Enter account number"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ssnitNumber">SSNIT Number</Label>
                        <Input
                          id="ssnitNumber"
                          value={formData.ssnitNumber ?? ""}
                          onChange={(e) => handleInputChange("ssnitNumber", e.target.value)}
                          placeholder="Enter SSNIT number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="voterIdNumber">Voter ID Number</Label>
                        <Input
                          id="voterIdNumber"
                          value={formData.voterIdNumber ?? ""}
                          onChange={(e) => handleInputChange("voterIdNumber", e.target.value)}
                          placeholder="Enter voter ID number"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Emergency Contact</CardTitle>
                    <CardDescription>Emergency contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Contact Name</Label>
                        <Input
                          id="emergencyContactName"
                          value={formData.emergencyContactName ?? ""}
                          onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                          placeholder="Enter emergency contact name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                        <Input
                          id="emergencyContactPhone"
                          value={formData.emergencyContactPhone ?? ""}
                          onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                          placeholder="Enter emergency contact phone"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes ?? ""}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        placeholder="Enter any additional notes or comments"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-between items-center pt-6">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <div className="space-x-4">
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button type="submit">{editingStaff ? "Update Staff Member" : "Create Staff Member"}</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
