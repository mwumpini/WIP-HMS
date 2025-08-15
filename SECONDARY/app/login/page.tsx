"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
// Added form validation components
import { FormErrorDisplay } from "@/components/form-error-display"
import { validateFormData } from "@/lib/validation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Changed error to array for better validation handling
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()

  // Enhanced form validation
  const validateForm = (): boolean => {
    const validationRules = {
      email: ["required", "email"],
      password: ["required"],
    }

    const validationResult = validateFormData({ email, password }, validationRules)
    setErrors(validationResult.errors)
    return validationResult.isValid
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    // Use enhanced validation
    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      try {
        // Initialize user access system
        if (typeof window !== "undefined") {
          const { initializeUserAccess, loginUser } = require("@/lib/auth")
          initializeUserAccess()

          // Attempt login with user management system
          const loginSuccess = loginUser(email, password)

          if (loginSuccess) {
            router.push("/dashboard")
          } else {
            // Fallback to demo login for development
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: Date.now().toString(),
                email,
                name: email === "mwumpini@gmail.com" ? "System Administrator" : "Demo User",
                role: email === "mwumpini@gmail.com" ? "administrator" : "viewer",
                department: "administration",
                position: email === "mwumpini@gmail.com" ? "System Administrator" : "Demo User",
                permissions:
                  email === "mwumpini@gmail.com"
                    ? [
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
                      ]
                    : ["view_dashboard", "view_reports"],
                accessLevel: email === "mwumpini@gmail.com" ? 6 : 1,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
              }),
            )
            router.push("/dashboard")
          }
        }
      } catch (error) {
        setErrors(["An error occurred during login. Please try again."])
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  // Clear errors when user starts typing
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
              <Calculator className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Ghana Tax Calculator</CardTitle>
          <CardDescription>Sign in to your account to manage your tax calculations</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {/* Enhanced error display */}
            <FormErrorDisplay errors={errors} />

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm text-gray-600">Demo credentials: any email and password</div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
