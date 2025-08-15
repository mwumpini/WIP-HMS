"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  accounting: "Accounting",
  payroll: "Payroll",
  inventory: "Inventory",
  reports: "Reports",
  settings: "Settings",
  profile: "Profile",
  subscription: "Subscription",
  help: "Help",
  audit: "Audit",
  expenses: "Expenses",
  withholding: "Withholding",
  sales: "Sales",
  assets: "Assets",
  "chart-of-accounts": "Chart of Accounts",
  journal: "Journal",
  "general-ledger": "General Ledger",
  "trial-balance": "Trial Balance",
  "balance-sheet": "Balance Sheet",
  "income-statement": "Income Statement",
  "cash-flow": "Cash Flow",
  new: "New",
  edit: "Edit",
  view: "View",
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) return null

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/")
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === pathSegments.length - 1

    return {
      href,
      label,
      isLast,
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-1">
            <BreadcrumbSeparator>
              <ChevronRight className="h-3 w-3" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
