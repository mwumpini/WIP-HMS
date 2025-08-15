"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Eye, EyeOff, Upload } from "lucide-react"
import Link from "next/link"
import { FormErrorDisplay } from "@/components/form-error-display"
import { validateFormData, validatePassword } from "@/lib/validation"

const ghanaRegions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Northern",
  "Upper East",
  "Upper West",
  "Volta",
  "Brong Ahafo",
  "Western North",
  "Ahafo",
  "Bono East",
  "Oti",
  "North East",
  "Savannah",
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    taxId: "",
    email: "",
    password: "",
    confirmPassword: "",
    region: "",
    city: "",
    mobileNumber: "",
    logo: null as File | null,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()

  const validateForm = (): boolean => {
    const validationRules = {
      companyName: ["required"],
      taxId: ["required"],
      email: ["required", "email"],
      password: ["required", "password"],
      confirmPassword: ["required"],
      region: ["required"],
      city: ["required"],
      mobileNumber: ["required", "phone"],
    }

    const validationResult = validateFormData(formData, validationRules)
    const newErrors = [...validationResult.errors]

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match")
    }

    // Additional password validation
    if (formData.password) {
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        newErrors.push(...passwordValidation.errors)
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Simulate signup process
    setTimeout(() => {
      try {
        // Create company and user
        const companyId = Date.now()
        const company = {
          id: companyId,
          name: formData.companyName,
          taxId: formData.taxId,
          region: formData.region,
          city: formData.city,
          mobileNumber: formData.mobileNumber,
          logo: formData.logo ? URL.createObjectURL(formData.logo) : null,
          createdAt: new Date().toISOString(),
        }

        const user = {
          id: Date.now(),
          email: formData.email,
          name: "Admin User",
          rank: "Administrator",
          companyId,
          companyName: formData.companyName,
          isAdmin: true,
          subscription: "professional",
          subscriptionStatus: "active",
        }

        // Store in localStorage (in real app, send to API)
        localStorage.setItem("company", JSON.stringify(company))
        localStorage.setItem("user", JSON.stringify(user))

        router.push("/dashboard")
      } catch (error) {
        setErrors(["An error occurred during signup. Please try again."])
      } finally {
        setIsLoading(false)
      }
    }, 2000)
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setErrors(["Logo file size must be less than 5MB"])
      return
    }
    setFormData((prev) => ({ ...prev, logo: file }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
              <Calculator className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create Company Account</CardTitle>
          <CardDescription>Set up your company account to start managing tax calculations</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <FormErrorDisplay errors={errors} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID/TIN *</Label>
                <Input
                  id="taxId"
                  placeholder="Enter tax identification number"
                  value={formData.taxId}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                  required
                  maxLength={20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {ghanaRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                  maxLength={50}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter mobile number (e.g., +233 XX XXX XXXX)"
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                required
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo (Optional)</Label>
              <div className="flex items-center space-x-2">
                <Input id="logo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("logo")?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {formData.logo ? formData.logo.name : "Upload Logo (Max 5MB)"}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
