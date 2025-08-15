"use client"

import type React from "react"
import { useToast } from "@/components/ui/use-toast"
import { validateFormData, sanitizeString } from "@/lib/validation"
import { safeGetItem, safeSetItem } from "@/lib/storage"
import { handleError } from "@/lib/error-handling"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, MapPin, Calendar, Building, Save, Loader2 } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  position: string
  department: string
  dateJoined: string
  avatar?: string
  bio: string
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    position: "",
    department: "",
    dateJoined: "",
    avatar: "",
    bio: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setIsLoading(true)

      // Load user data from localStorage
      const userData = localStorage.getItem("user")
      const companyUsers = localStorage.getItem("companyUsers")
      const companyStaff = localStorage.getItem("payrollStaff")

      let userInfo = {}
      let systemUserInfo = {}
      let staffInfo = {}

      if (userData) {
        userInfo = JSON.parse(userData)
      }

      if (companyUsers) {
        const usersList = JSON.parse(companyUsers)
        const currentUserEmail = (userInfo as any)?.email
        if (currentUserEmail) {
          systemUserInfo = usersList.find((user: any) => user.email === currentUserEmail) || {}
        }
      }

      if (companyStaff) {
        const staffList = JSON.parse(companyStaff)
        const currentUserEmail = (userInfo as any)?.email
        if (currentUserEmail) {
          staffInfo = staffList.find((staff: any) => staff.email === currentUserEmail) || {}
        }
      }

      const mergedProfile = {
        name: (systemUserInfo as any)?.name || (userInfo as any)?.name || (staffInfo as any)?.name || "",
        email: (systemUserInfo as any)?.email || (userInfo as any)?.email || (staffInfo as any)?.email || "",
        phone: (systemUserInfo as any)?.phone || (staffInfo as any)?.phone || "",
        address: (staffInfo as any)?.address || "",
        dateOfBirth: (staffInfo as any)?.dateOfBirth || "",
        position: (systemUserInfo as any)?.position || (staffInfo as any)?.position || "",
        department: (systemUserInfo as any)?.department || (staffInfo as any)?.department || "",
        dateJoined: (systemUserInfo as any)?.dateJoined || (staffInfo as any)?.dateJoined || "",
        avatar: (userInfo as any)?.avatar || "",
        bio: (staffInfo as any)?.bio || "",
      }

      setProfile(mergedProfile)
    } catch (error) {
      console.error("Error loading profile:", error)
      setMessage("Error loading profile data")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage("")

    try {
      const validationRules = {
        name: ["required"],
        email: ["required", "email"],
        phone: ["phone"],
      }

      const validationResult = validateFormData(profile, validationRules)

      if (!validationResult.isValid) {
        toast({
          title: "Validation Error",
          description: validationResult.errors.join(", "),
          variant: "destructive",
        })
        return
      }

      const sanitizedProfile = {
        ...profile,
        name: sanitizeString(profile.name),
        email: sanitizeString(profile.email),
        phone: sanitizeString(profile.phone),
        address: sanitizeString(profile.address),
        position: sanitizeString(profile.position),
        department: sanitizeString(profile.department),
        bio: sanitizeString(profile.bio),
      }

      const userData = safeGetItem("user", {})
      if (userData) {
        const updatedUser = {
          ...userData,
          name: sanitizedProfile.name,
          email: sanitizedProfile.email,
          avatar: sanitizedProfile.avatar,
        }
        safeSetItem("user", updatedUser)
      }

      const companyUsers = safeGetItem("companyUsers", [])
      if (companyUsers.length > 0) {
        const updatedUsersList = companyUsers.map((user: any) => {
          if (user.email === sanitizedProfile.email) {
            return {
              ...user,
              name: sanitizedProfile.name,
              phone: sanitizedProfile.phone,
              position: sanitizedProfile.position,
              department: sanitizedProfile.department,
            }
          }
          return user
        })
        safeSetItem("companyUsers", updatedUsersList)
      }

      const companyStaff = safeGetItem("payrollStaff", [])
      if (companyStaff.length > 0) {
        const updatedStaffList = companyStaff.map((staff: any) => {
          if (staff.email === sanitizedProfile.email) {
            return { ...staff, ...sanitizedProfile }
          }
          return staff
        })
        safeSetItem("payrollStaff", updatedStaffList)
      }

      toast({
        title: "Success",
        description: "Profile updated successfully across all systems!",
      })
    } catch (error) {
      const { message } = handleError(error)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
      </div>

      {/* Success/Error Message */}
      {/* {message && (
        <Alert className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          <AlertDescription className={messageType === "success" ? "text-green-800" : "text-red-800"}>
            {message}
          </AlertDescription>
        </Alert>
      )} */}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="text-2xl">
                {profile.name
                  ? profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{profile.name || "User Name"}</CardTitle>
            <CardDescription>{profile.email || "user@example.com"}</CardDescription>
            {profile.position && (
              <Badge variant="secondary" className="mt-2">
                {profile.position}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building className="h-4 w-4" />
              <span>{profile.department || "Department not set"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Joined: {profile.dateJoined ? new Date(profile.dateJoined).toLocaleDateString() : "Not set"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{profile.phone || "Phone not set"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{profile.address || "Address not set"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>

              {/* Work Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Work Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="Enter your position"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="Enter your department"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateJoined">Date Joined</Label>
                    <Input
                      id="dateJoined"
                      type="date"
                      value={profile.dateJoined}
                      onChange={(e) => handleInputChange("dateJoined", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
