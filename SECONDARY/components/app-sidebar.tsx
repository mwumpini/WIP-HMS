"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  ShoppingCart,
  Receipt,
  Package,
  Users,
  Calculator,
  MapPin,
  Wallet,
  BarChart3,
  UserCheck,
  Settings,
  ChevronDown,
  Shield,
  Building2,
  FileText,
  DollarSign,
  Search,
  Clock,
  Star,
  Plus,
  FolderOpen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarInput,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser, logout } from "@/lib/auth"
import type { UserRole } from "@/types/auth"

const navigationData = {
  main: {
    dashboard: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        roles: [
          "administrator",
          "management",
          "supervisor",
          "frontdesk",
          "sales",
          "storekeeper",
          "officer",
          "accountant",
          "viewer",
        ] as UserRole[],
      },
    ],
    business: [
      {
        title: "Sales",
        icon: ShoppingCart,
        roles: ["administrator", "management", "supervisor", "frontdesk", "sales"] as UserRole[],
        badge: "Active",
        items: [
          {
            title: "View Sales",
            url: "/dashboard/sales",
            roles: ["administrator", "management", "supervisor", "frontdesk", "sales", "accountant"] as UserRole[],
          },
          {
            title: "New Sale",
            url: "/dashboard/sales/new",
            roles: ["administrator", "management", "supervisor", "frontdesk", "sales"] as UserRole[],
            isQuickAction: true,
          },
          {
            title: "Customers",
            url: "/dashboard/sales/customers",
            roles: ["administrator", "management", "supervisor", "frontdesk", "sales"] as UserRole[],
          },
        ],
      },
      {
        title: "Expenses",
        icon: Receipt,
        roles: ["administrator", "management", "supervisor", "accountant", "officer"] as UserRole[],
        items: [
          {
            title: "View Expenses",
            url: "/dashboard/expenses",
            roles: ["administrator", "management", "supervisor", "accountant", "officer"] as UserRole[],
          },
          {
            title: "New Expense",
            url: "/dashboard/expenses/new",
            roles: ["administrator", "management", "supervisor", "accountant", "officer"] as UserRole[],
            isQuickAction: true,
          },
        ],
      },
      {
        title: "Inventory",
        icon: Package,
        roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
        items: [
          {
            title: "Stock Overview",
            url: "/dashboard/inventory",
            roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
          },
          {
            title: "New Inventory Item",
            url: "/dashboard/inventory/new",
            roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
            isQuickAction: true,
          },
          {
            title: "Stock Entry",
            url: "/dashboard/inventory/entry",
            roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
          },
          {
            title: "Stock Sheet",
            url: "/dashboard/inventory/sheet",
            roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
          },
          {
            title: "Stock Transfers",
            url: "/dashboard/inventory/transfers",
            roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
          },
          {
            title: "Requisitions",
            url: "/dashboard/inventory/requisitions",
            roles: ["administrator", "management", "supervisor", "storekeeper", "officer"] as UserRole[],
          },
          {
            title: "Purchase Orders",
            url: "/dashboard/inventory/purchase-orders",
            roles: ["administrator", "management", "supervisor"] as UserRole[],
          },
          {
            title: "Suppliers",
            url: "/dashboard/inventory/suppliers",
            roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
          },
          {
            title: "Recipe Calculator",
            url: "/dashboard/inventory/recipe-calculator",
            roles: ["administrator", "management", "supervisor", "storekeeper"] as UserRole[],
          },
        ],
      },
      {
        title: "Front Desk",
        icon: Users,
        roles: ["administrator", "management", "supervisor", "frontdesk"] as UserRole[],
        items: [
          {
            title: "Guest Management",
            url: "/dashboard/frontdesk",
            roles: ["administrator", "management", "supervisor", "frontdesk"] as UserRole[],
          },
        ],
      },
      {
        title: "Payroll",
        icon: Users,
        roles: ["administrator", "management", "supervisor", "accountant"] as UserRole[],
        badge: "Due Soon",
        badgeVariant: "destructive" as const,
        items: [
          {
            title: "Staff Management",
            url: "/dashboard/payroll/staff-management",
            roles: ["administrator", "management", "supervisor"] as UserRole[],
          },
          {
            title: "Payroll (PAYE)",
            url: "/dashboard/payroll",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "SSNIT",
            url: "/dashboard/payroll/ssnit",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Income Tax",
            url: "/dashboard/payroll/income-tax",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Tier 2 & 3 Pensions",
            url: "/dashboard/payroll/tier2-3",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
        ],
      },
    ],
    accounting: [
      {
        title: "Accounting & Finance",
        icon: Calculator,
        roles: ["administrator", "management", "accountant"] as UserRole[],
        items: [
          {
            title: "Overview",
            url: "/dashboard/accounting",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Financial Reports",
            url: "/dashboard/accounting/reports",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Chart of Accounts",
            url: "/dashboard/accounting/chart-of-accounts",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Journal Entries",
            url: "/dashboard/accounting/journal",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Accounts Payable",
            url: "/dashboard/accounting/payables",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Accounts Receivable",
            url: "/dashboard/accounting/receivables",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Fixed Assets",
            url: "/dashboard/accounting/assets",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
        ],
      },
    ],
    compliance: [
      {
        title: "GRA",
        icon: FileText,
        roles: ["administrator", "management", "accountant"] as UserRole[],
        badge: "Overdue",
        badgeVariant: "destructive" as const,
        items: [
          {
            title: "VAT Return",
            url: "/dashboard/gra/vat",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "GRA Levies",
            url: "/dashboard/gra/levies",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
        ],
      },
      {
        title: "GTA",
        icon: MapPin,
        roles: ["administrator", "management", "accountant"] as UserRole[],
        items: [
          {
            title: "Tourism Levy",
            url: "/dashboard/gta/tourism",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
        ],
      },
      {
        title: "Withholding Tax",
        icon: Wallet,
        roles: ["administrator", "management", "accountant"] as UserRole[],
        items: [
          {
            title: "View Records",
            url: "/dashboard/withholding",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "New Record",
            url: "/dashboard/withholding/new",
            roles: ["administrator", "management", "accountant"] as UserRole[],
            isQuickAction: true,
          },
        ],
      },
    ],
    reports: [
      {
        title: "Reports",
        icon: BarChart3,
        roles: ["administrator", "management", "supervisor", "accountant"] as UserRole[],
        items: [
          {
            title: "Reports Overview",
            url: "/dashboard/reports",
            roles: ["administrator", "management", "supervisor", "accountant", "sales", "frontdesk"] as UserRole[],
          },
          {
            title: "Sales Reports and Analysis",
            url: "/dashboard/reports/sales",
            roles: ["administrator", "management", "supervisor", "sales", "accountant"] as UserRole[],
          },
          {
            title: "Expenses Reports",
            url: "/dashboard/reports/expenses",
            roles: ["administrator", "management", "supervisor", "accountant"] as UserRole[],
          },
          {
            title: "Payroll Reports",
            url: "/dashboard/reports/payroll",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
          {
            title: "Tax & Compliance Reports",
            url: "/dashboard/reports/tax-compliance",
            roles: ["administrator", "management", "accountant"] as UserRole[],
          },
        ],
      },
    ],
    admin: [
      {
        title: "User Management",
        icon: UserCheck,
        roles: ["administrator", "management"] as UserRole[],
        items: [
          {
            title: "All Users",
            url: "/dashboard/users",
            roles: ["administrator", "management"] as UserRole[],
          },
          {
            title: "Add User",
            url: "/dashboard/users/new",
            roles: ["administrator", "management"] as UserRole[],
            isQuickAction: true,
          },
          {
            title: "Authorisers",
            url: "/dashboard/users/authorisers",
            roles: ["administrator", "management"] as UserRole[],
          },
        ],
      },
      {
        title: "Audit Trail",
        url: "/audit",
        icon: Shield,
        roles: ["administrator", "management"] as UserRole[],
      },
    ],
  },
  settings: [
    {
      title: "Settings",
      icon: Settings,
      roles: [
        "administrator",
        "management",
        "supervisor",
        "frontdesk",
        "sales",
        "storekeeper",
        "officer",
        "accountant",
        "viewer",
      ] as UserRole[],
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
          roles: [
            "administrator",
            "management",
            "supervisor",
            "frontdesk",
            "sales",
            "storekeeper",
            "officer",
            "accountant",
            "viewer",
          ] as UserRole[],
        },
        {
          title: "Preferences",
          url: "/dashboard/settings/preferences",
          roles: [
            "administrator",
            "management",
            "supervisor",
            "frontdesk",
            "sales",
            "storekeeper",
            "officer",
            "accountant",
            "viewer",
          ] as UserRole[],
        },
        {
          title: "System Settings",
          url: "/dashboard/settings/system",
          roles: ["administrator", "management"] as UserRole[],
        },
        {
          title: "Subscription",
          url: "/dashboard/subscription",
          roles: ["administrator", "management"] as UserRole[],
        },
      ],
    },
  ],
}

const hasAccessToItem = (item: any, userRole: UserRole | undefined): boolean => {
  if (!userRole || !item.roles) return true
  if (userRole === "administrator") return true
  return item.roles.includes(userRole)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [recentItems, setRecentItems] = React.useState<string[]>([])

  React.useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    const stored = localStorage.getItem("recentNavigation")
    if (stored) {
      setRecentItems(JSON.parse(stored))
    }
  }, [])

  React.useEffect(() => {
    if (pathname && pathname !== "/dashboard") {
      setRecentItems((prevItems) => {
        const newRecent = [pathname, ...prevItems.filter((item) => item !== pathname)].slice(0, 5)
        localStorage.setItem("recentNavigation", JSON.stringify(newRecent))
        return newRecent
      })
    }
  }, [pathname])

  const userRole = user?.role as UserRole
  const isManagement = userRole === "management" || userRole === "administrator"
  const canAccessAdmin = isManagement

  const getAllNavigationItems = () => {
    const allItems: Array<{ title: string; url: string; section: string }> = []

    // Process main navigation items
    Object.entries(navigationData.main).forEach(([sectionKey, sectionItems]) => {
      sectionItems.forEach((item) => {
        if (hasAccessToItem(item, userRole)) {
          if (item.url) {
            allItems.push({
              title: item.title,
              url: item.url,
              section: sectionKey,
            })
          }
          if (item.items) {
            item.items.forEach((subItem) => {
              if (hasAccessToItem(subItem, userRole)) {
                allItems.push({
                  title: subItem.title,
                  url: subItem.url,
                  section: item.title,
                })
              }
            })
          }
        }
      })
    })

    // Process settings items
    navigationData.settings.forEach((item) => {
      if (hasAccessToItem(item, userRole)) {
        if (item.url) {
          allItems.push({
            title: item.title,
            url: item.url,
            section: "settings",
          })
        }
        if (item.items) {
          item.items.forEach((subItem) => {
            if (hasAccessToItem(subItem, userRole)) {
              allItems.push({
                title: subItem.title,
                url: subItem.url,
                section: item.title,
              })
            }
          })
        }
      }
    })

    return allItems
  }

  const filteredItems = searchQuery
    ? getAllNavigationItems().filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const getQuickActions = () => {
    const quickActions: Array<{ title: string; url: string; icon: any }> = []

    Object.values(navigationData.main)
      .flat()
      .forEach((section) => {
        if (section.items && hasAccessToItem(section, userRole)) {
          section.items.forEach((item) => {
            if (item.isQuickAction && hasAccessToItem(item, userRole)) {
              quickActions.push({
                title: item.title,
                url: item.url,
                icon: Plus,
              })
            }
          })
        }
      })

    return quickActions
  }

  const handleExport = () => {
    // Export functionality
    console.log("Exporting data...")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-sidebar-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-orange-600">Kali Syn</span>
                  <span className="truncate text-xs text-muted-foreground">Syncing Ghana's Hospitality</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible asChild defaultOpen={true}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Main">
                      <FolderOpen />
                      <span>Main</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {recentItems.length > 0 && (
                        <SidebarMenuSubItem>
                          <div className="px-2 py-2">
                            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              Recently Visited
                            </div>
                            <div className="space-y-1">
                              {recentItems.slice(0, 3).map((url) => {
                                const item = getAllNavigationItems().find((item) => item.url === url)
                                if (!item) return null

                                return (
                                  <SidebarMenuSubButton key={url} asChild size="sm" isActive={pathname === url}>
                                    <Link href={url}>
                                      <Clock className="h-3 w-3" />
                                      <span>{item.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                )
                              })}
                            </div>
                          </div>
                        </SidebarMenuSubItem>
                      )}

                      <SidebarMenuSubItem>
                        <div className="px-2 py-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Search Navigation</div>
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <SidebarInput
                              placeholder="Search navigation..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-8"
                            />
                          </div>

                          {searchQuery && filteredItems.length > 0 && (
                            <div className="mt-2 rounded-md border bg-background p-2 shadow-md">
                              <div className="text-xs font-medium text-muted-foreground mb-2">Search Results</div>
                              {filteredItems.slice(0, 5).map((item) => (
                                <Link
                                  key={item.url}
                                  href={item.url}
                                  className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
                                  onClick={() => setSearchQuery("")}
                                >
                                  <div className="font-medium">{item.title}</div>
                                  <div className="text-xs text-muted-foreground">{item.section}</div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </SidebarMenuSubItem>

                      {getQuickActions().length > 0 && (
                        <SidebarMenuSubItem>
                          <div className="px-2 py-2">
                            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                              <Star className="h-3 w-3" />
                              Quick Actions
                            </div>
                            <div className="space-y-1">
                              {getQuickActions()
                                .slice(0, 3)
                                .map((action) => (
                                  <SidebarMenuSubButton key={action.url} asChild size="sm">
                                    <Link href={action.url} className="text-orange-600">
                                      <action.icon className="h-3 w-3" />
                                      <span>{action.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                ))}
                            </div>
                          </div>
                        </SidebarMenuSubItem>
                      )}

                      <div className="px-2 py-1">
                        <Separator />
                      </div>

                      {/* Dashboard */}
                      {navigationData.main.dashboard
                        .filter((item) => hasAccessToItem(item, userRole))
                        .map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                              <Link href={item.url}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}

                      <div className="px-2 py-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <ShoppingCart className="h-3 w-3" />
                          OPERATIONS
                        </div>
                      </div>

                      {/* Business Operations - Sales, Expenses, Inventory, Front Desk */}
                      {navigationData.main.business
                        .filter((item) => hasAccessToItem(item, userRole) && !item.title.includes("Payroll"))
                        .map((item) => (
                          <Collapsible key={item.title} asChild>
                            <SidebarMenuSubItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton>
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.title}</span>
                                  {item.badge && (
                                    <Badge variant={item.badgeVariant || "secondary"} className="ml-auto text-xs">
                                      {item.badge}
                                    </Badge>
                                  )}
                                  <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="ml-4">
                                  {item.items
                                    ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                                    .map((subItem) => (
                                      <SidebarMenuSubButton
                                        key={subItem.title}
                                        asChild
                                        isActive={pathname === subItem.url}
                                        className="my-1"
                                      >
                                        <Link href={subItem.url}>
                                          {subItem.isQuickAction && <Plus className="h-3 w-3 mr-1 text-orange-500" />}
                                          <span>{subItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    ))}
                                </div>
                              </CollapsibleContent>
                            </SidebarMenuSubItem>
                          </Collapsible>
                        ))}

                      <div className="px-2 py-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          HUMAN RESOURCES
                        </div>
                      </div>

                      {/* Payroll Section */}
                      {navigationData.main.business
                        .filter((item) => hasAccessToItem(item, userRole) && item.title.includes("Payroll"))
                        .map((item) => (
                          <Collapsible key={item.title} asChild>
                            <SidebarMenuSubItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton>
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.title}</span>
                                  {item.badge && (
                                    <Badge variant={item.badgeVariant || "secondary"} className="ml-auto text-xs">
                                      {item.badge}
                                    </Badge>
                                  )}
                                  <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="ml-4">
                                  {item.items
                                    ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                                    .map((subItem) => (
                                      <SidebarMenuSubButton
                                        key={subItem.title}
                                        asChild
                                        isActive={pathname === subItem.url}
                                        className="my-1"
                                      >
                                        <Link href={subItem.url}>
                                          {subItem.isQuickAction && <Plus className="h-3 w-3 mr-1 text-orange-500" />}
                                          <span>{subItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    ))}
                                </div>
                              </CollapsibleContent>
                            </SidebarMenuSubItem>
                          </Collapsible>
                        ))}

                      {(userRole === "administrator" || userRole === "management" || userRole === "accountant") && (
                        <div className="px-2 py-2">
                          <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                            <Calculator className="h-3 w-3" />
                            FINANCE & ACCOUNTING
                          </div>
                        </div>
                      )}

                      {/* Accounting & Finance */}
                      {(userRole === "administrator" || userRole === "management" || userRole === "accountant") &&
                        navigationData.main.accounting
                          .filter((item) => hasAccessToItem(item, userRole))
                          .map((item) => (
                            <Collapsible key={item.title} asChild>
                              <SidebarMenuSubItem>
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuSubButton>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                    <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                  </SidebarMenuSubButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="ml-4">
                                    {item.items
                                      ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                                      .map((subItem) => (
                                        <SidebarMenuSubButton
                                          key={subItem.title}
                                          asChild
                                          isActive={pathname === subItem.url}
                                          className="my-1"
                                        >
                                          <Link href={subItem.url}>
                                            <span>{subItem.title}</span>
                                          </Link>
                                        </SidebarMenuSubButton>
                                      ))}
                                  </div>
                                </CollapsibleContent>
                              </SidebarMenuSubItem>
                            </Collapsible>
                          ))}

                      {(userRole === "administrator" || userRole === "management" || userRole === "accountant") && (
                        <div className="px-2 py-2">
                          <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                            <Shield className="h-3 w-3" />
                            TAX & COMPLIANCE
                          </div>
                        </div>
                      )}

                      {/* Tax & Compliance */}
                      {(userRole === "administrator" || userRole === "management" || userRole === "accountant") &&
                        navigationData.main.compliance
                          .filter((item) => hasAccessToItem(item, userRole))
                          .map((item) => (
                            <Collapsible key={item.title} asChild>
                              <SidebarMenuSubItem>
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuSubButton>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                    {item.badge && (
                                      <Badge variant={item.badgeVariant || "secondary"} className="ml-auto text-xs">
                                        {item.badge}
                                      </Badge>
                                    )}
                                    <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                  </SidebarMenuSubButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="ml-4">
                                    {item.items
                                      ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                                      .map((subItem) => (
                                        <SidebarMenuSubButton
                                          key={subItem.title}
                                          asChild
                                          isActive={pathname === subItem.url}
                                          className="my-1"
                                        >
                                          <Link href={subItem.url}>
                                            {subItem.isQuickAction && <Plus className="h-3 w-3 mr-1 text-orange-500" />}
                                            <span>{subItem.title}</span>
                                          </Link>
                                        </SidebarMenuSubButton>
                                      ))}
                                  </div>
                                </CollapsibleContent>
                              </SidebarMenuSubItem>
                            </Collapsible>
                          ))}

                      <div className="px-2 py-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <BarChart3 className="h-3 w-3" />
                          ANALYTICS
                        </div>
                      </div>

                      {/* Analytics */}
                      {navigationData.main.reports
                        .filter((item) => hasAccessToItem(item, userRole))
                        .map((item) => (
                          <Collapsible key={item.title} asChild>
                            <SidebarMenuSubItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton>
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.title}</span>
                                  <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="ml-4">
                                  {item.items
                                    ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                                    .map((subItem) => (
                                      <SidebarMenuSubButton
                                        key={subItem.title}
                                        asChild
                                        isActive={pathname === subItem.url}
                                        className="my-1"
                                      >
                                        <Link href={subItem.url}>
                                          <span>{subItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    ))}
                                </div>
                              </CollapsibleContent>
                            </SidebarMenuSubItem>
                          </Collapsible>
                        ))}

                      {(userRole === "administrator" || userRole === "management") && (
                        <div className="px-2 py-2">
                          <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                            <UserCheck className="h-3 w-3" />
                            ADMINISTRATION
                          </div>
                        </div>
                      )}

                      {/* Administration */}
                      {(userRole === "administrator" || userRole === "management") &&
                        navigationData.main.admin
                          .filter((item) => hasAccessToItem(item, userRole))
                          .map((item) =>
                            item.items ? (
                              <Collapsible key={item.title} asChild>
                                <SidebarMenuSubItem>
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton>
                                      <item.icon className="h-4 w-4" />
                                      <span>{item.title}</span>
                                      <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="ml-4">
                                      {item.items
                                        ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                                        .map((subItem) => (
                                          <SidebarMenuSubButton
                                            key={subItem.title}
                                            asChild
                                            isActive={pathname === subItem.url}
                                            className="my-1"
                                          >
                                            <Link href={subItem.url}>
                                              {subItem.isQuickAction && (
                                                <Plus className="h-3 w-3 mr-1 text-orange-500" />
                                              )}
                                              <span>{subItem.title}</span>
                                            </Link>
                                          </SidebarMenuSubButton>
                                        ))}
                                    </div>
                                  </CollapsibleContent>
                                </SidebarMenuSubItem>
                              </Collapsible>
                            ) : (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                                  <Link href={item.url!}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ),
                          )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings & Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.settings
                .filter((item) => hasAccessToItem(item, userRole))
                .map((item) =>
                  item.items ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.items?.some((subItem) => pathname.startsWith(subItem.url))}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items
                              ?.filter((subItem) => hasAccessToItem(subItem, userRole))
                              .map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url!}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="outline" onClick={handleExport} className="w-full justify-start bg-transparent">
              <DollarSign className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700"
            >
              <span>Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
