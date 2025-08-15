"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Calculator, FileText, Users, BarChart3, Settings, Plus, Edit, TrendingUp } from "lucide-react"

interface NavigationSuggestion {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  badge?: string
  priority: "high" | "medium" | "low"
}

const contextualSuggestions: Record<string, NavigationSuggestion[]> = {
  "/dashboard": [
    {
      title: "Add New Expense",
      description: "Record a business expense",
      href: "/dashboard/expenses/new",
      icon: <Plus className="h-4 w-4" />,
      badge: "Quick Action",
      priority: "high",
    },
    {
      title: "View Reports",
      description: "Check your financial reports",
      href: "/dashboard/reports",
      icon: <BarChart3 className="h-4 w-4" />,
      priority: "high",
    },
    {
      title: "Payroll Management",
      description: "Manage employee payroll",
      href: "/dashboard/payroll",
      icon: <Users className="h-4 w-4" />,
      priority: "medium",
    },
  ],
  "/dashboard/accounting": [
    {
      title: "Chart of Accounts",
      description: "Manage your account structure",
      href: "/dashboard/accounting/chart-of-accounts",
      icon: <FileText className="h-4 w-4" />,
      priority: "high",
    },
    {
      title: "Journal Entries",
      description: "Record journal transactions",
      href: "/dashboard/accounting/journal",
      icon: <Edit className="h-4 w-4" />,
      priority: "high",
    },
    {
      title: "Trial Balance",
      description: "View trial balance report",
      href: "/dashboard/accounting/trial-balance",
      icon: <Calculator className="h-4 w-4" />,
      priority: "medium",
    },
  ],
  "/dashboard/expenses": [
    {
      title: "Add New Expense",
      description: "Record a new business expense",
      href: "/dashboard/expenses/new",
      icon: <Plus className="h-4 w-4" />,
      badge: "Quick Action",
      priority: "high",
    },
    {
      title: "Expense Reports",
      description: "View expense analytics",
      href: "/dashboard/reports?filter=expenses",
      icon: <TrendingUp className="h-4 w-4" />,
      priority: "medium",
    },
    {
      title: "Tax Categories",
      description: "Manage expense categories",
      href: "/dashboard/settings?tab=categories",
      icon: <Settings className="h-4 w-4" />,
      priority: "low",
    },
  ],
  "/dashboard/payroll": [
    {
      title: "Add Employee",
      description: "Add a new employee to payroll",
      href: "/dashboard/payroll/employees/new",
      icon: <Plus className="h-4 w-4" />,
      badge: "Quick Action",
      priority: "high",
    },
    {
      title: "SSNIT Compliance",
      description: "Check SSNIT compliance status",
      href: "/dashboard/payroll/ssnit",
      icon: <FileText className="h-4 w-4" />,
      priority: "high",
    },
    {
      title: "Payroll Reports",
      description: "Generate payroll reports",
      href: "/dashboard/reports?filter=payroll",
      icon: <BarChart3 className="h-4 w-4" />,
      priority: "medium",
    },
  ],
}

export function ContextualNavigation() {
  const pathname = usePathname()
  const suggestions = contextualSuggestions[pathname] || []

  return null
}
