"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { getCurrentUser, hasPermission, hasAccessLevel, canSupervise } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"
import type { UserRole, Permission } from "@/types/auth"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole | UserRole[]
  requiredPermission?: Permission | Permission[]
  requiredAccessLevel?: number
  canSuperviseRole?: UserRole
  fallback?: React.ReactNode
  showFallback?: boolean
}

export function RoleGuard({
  children,
  requiredRole,
  requiredPermission,
  requiredAccessLevel,
  canSuperviseRole,
  fallback,
  showFallback = true,
}: RoleGuardProps) {
  const [canAccess, setCanAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = () => {
      try {
        const user = getCurrentUser()
        if (!user) {
          console.log("No user found, access denied")
          setCanAccess(false)
          setIsLoading(false)
          return
        }

        console.log("Checking access for user:", { email: user.email, role: user.role })

        if (user.role === "administrator") {
          console.log("✅ Administrator access granted for:", user.email)
          setCanAccess(true)
          setIsLoading(false)
          return
        }

        let hasAccess = true

        // Check role requirement
        if (requiredRole) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
          hasAccess = hasAccess && roles.includes(user.role)
          console.log("Role check:", { userRole: user.role, requiredRoles: roles, hasAccess })
        }

        // Check permission requirement
        if (requiredPermission) {
          const permissions = Array.isArray(requiredPermission) ? requiredPermission : [requiredPermission]
          const hasAllPermissions = permissions.every((permission) => hasPermission(permission))
          hasAccess = hasAccess && hasAllPermissions
          console.log("Permission check:", {
            userPermissions: user.permissions,
            requiredPermissions: permissions,
            hasAccess: hasAllPermissions,
          })
        }

        // Check access level requirement
        if (requiredAccessLevel) {
          const hasLevel = hasAccessLevel(requiredAccessLevel)
          hasAccess = hasAccess && hasLevel
          console.log("Access level check:", {
            userLevel: user.accessLevel,
            requiredLevel: requiredAccessLevel,
            hasAccess: hasLevel,
          })
        }

        // Check supervision capability
        if (canSuperviseRole) {
          const canSuperviseCheck = canSupervise(canSuperviseRole)
          hasAccess = hasAccess && canSuperviseCheck
          console.log("Supervision check:", { canSuperviseRole, hasAccess: canSuperviseCheck })
        }

        console.log("Final access decision:", { hasAccess, user: user.email, role: user.role })
        setCanAccess(hasAccess)
        setIsLoading(false)
      } catch (error) {
        console.error("❌ Error checking access:", error)
        setCanAccess(false)
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [requiredRole, requiredPermission, requiredAccessLevel, canSuperviseRole])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!canAccess) {
    if (!showFallback) return null

    if (fallback) {
      return <>{fallback}</>
    }

    const user = getCurrentUser()
    const isAuthenticated = !!user

    return (
      <Alert variant="destructive" className="m-6">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          {!isAuthenticated ? (
            "Please sign in to access this feature."
          ) : (
            <>
              Access denied.{" "}
              {requiredRole &&
                `Required role: ${Array.isArray(requiredRole) ? requiredRole.join(" or ") : requiredRole}.`}
              {requiredPermission &&
                ` Required permission: ${Array.isArray(requiredPermission) ? requiredPermission.join(", ") : requiredPermission}.`}
              {requiredAccessLevel && ` Required access level: ${requiredAccessLevel}.`}
            </>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
}

interface ConditionalRenderProps {
  children: React.ReactNode
  condition: "authenticated" | "management" | "supervisor" | "canApprove" | "administrator"
  role?: UserRole
  permission?: Permission
  accessLevel?: number
}

export function ConditionalRender({ children, condition, role, permission, accessLevel }: ConditionalRenderProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const checkCondition = () => {
      const user = getCurrentUser()

      if (user?.role === "administrator") {
        setShouldRender(true)
        return
      }

      switch (condition) {
        case "authenticated":
          setShouldRender(!!user)
          break
        case "administrator":
          setShouldRender(user?.role === "administrator")
          break
        case "management":
          setShouldRender(user?.role === "management" || user?.role === "administrator")
          break
        case "supervisor":
          setShouldRender(user?.role === "supervisor" || user?.role === "management" || user?.role === "administrator")
          break
        case "canApprove":
          setShouldRender(user?.accessLevel >= 4) // Supervisor level and above
          break
        default:
          if (role) {
            setShouldRender(user?.role === role)
          } else if (permission) {
            setShouldRender(hasPermission(permission))
          } else if (accessLevel) {
            setShouldRender(hasAccessLevel(accessLevel))
          } else {
            setShouldRender(false)
          }
      }
    }

    checkCondition()
  }, [condition, role, permission, accessLevel])

  return shouldRender ? <>{children}</> : null
}

// Utility component for showing user-specific content
interface UserInfoProps {
  children: (user: any) => React.ReactNode
}

export function UserInfo({ children }: UserInfoProps) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  return user ? <>{children(user)}</> : null
}
