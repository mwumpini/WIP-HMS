"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PageNavigation {
  previous?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
}

const pageSequences: Record<string, PageNavigation> = {
  "/dashboard/expenses/new": {
    previous: {
      title: "Expenses",
      href: "/dashboard/expenses",
    },
    next: {
      title: "Expense Reports",
      href: "/dashboard/reports?filter=expenses",
    },
  },
  "/dashboard/accounting/chart-of-accounts": {
    previous: {
      title: "Accounting",
      href: "/dashboard/accounting",
    },
    next: {
      title: "Journal Entries",
      href: "/dashboard/accounting/journal",
    },
  },
  "/dashboard/accounting/journal": {
    previous: {
      title: "Chart of Accounts",
      href: "/dashboard/accounting/chart-of-accounts",
    },
    next: {
      title: "Trial Balance",
      href: "/dashboard/accounting/trial-balance",
    },
  },
  "/dashboard/payroll": {
    previous: {
      title: "Dashboard",
      href: "/dashboard",
    },
    next: {
      title: "SSNIT Compliance",
      href: "/dashboard/payroll/ssnit",
    },
  },
}

export function PageNavigation() {
  const pathname = usePathname()
  const navigation = pageSequences[pathname]

  if (!navigation || (!navigation.previous && !navigation.next)) return null

  return (
    <div className="flex items-center justify-between py-4 border-t">
      <div>
        {navigation.previous && (
          <Button asChild variant="outline">
            <Link href={navigation.previous.href} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span>{navigation.previous.title}</span>
            </Link>
          </Button>
        )}
      </div>

      <div>
        {navigation.next && (
          <Button asChild>
            <Link href={navigation.next.href} className="flex items-center gap-2">
              <span>{navigation.next.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
