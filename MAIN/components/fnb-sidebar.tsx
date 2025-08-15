"use client"

import type * as React from "react"
import {
  Settings2,
  Coffee,
  ChefHat,
  Wine,
  MenuSquare,
  Package,
  BarChart3,
  Users,
  Home,
  CreditCard,
  Building2,
  LinkIcon,
  Calculator,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "F&B Manager",
    email: "fnb@mamanihotel.com",
    avatar: "/avatars/fnb-manager.jpg",
  },
  teams: [
    {
      name: "F&B Operations",
      logo: Coffee,
      plan: "Restaurant Operations",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/fnb",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Live covers counter",
          url: "/fnb/covers",
        },
        {
          title: "Top/floor items",
          url: "/fnb/top-items",
        },
      ],
    },
    {
      title: "Point of Sale",
      url: "/fnb/pos",
      icon: CreditCard,
      items: [
        {
          title: "Dine-in orders",
          url: "/fnb/pos/dine-in",
        },
        {
          title: "Room service panel",
          url: "/fnb/pos/room-service",
        },
        {
          title: "Quick-modifier buttons",
          url: "/fnb/pos/modifiers",
        },
      ],
    },
    {
      title: "Kitchen Operations",
      url: "/fnb/kitchen",
      icon: ChefHat,
      items: [
        {
          title: "KOT display simulator",
          url: "/fnb/kitchen/kot",
        },
        {
          title: "Prep station alerts",
          url: "/fnb/kitchen/prep",
        },
        {
          title: "Chef's notes",
          url: "/fnb/kitchen/notes",
        },
      ],
    },
    {
      title: "Bar Management",
      url: "/fnb/bar",
      icon: Wine,
      items: [
        {
          title: "Bottle pour tracking",
          url: "/fnb/bar/pour",
        },
        {
          title: "Signature drink recipes",
          url: "/fnb/bar/recipes",
        },
        {
          title: "Liquor cost calculator",
          url: "/fnb/bar/costs",
        },
      ],
    },
    {
      title: "Menu Management",
      url: "/fnb/menu",
      icon: MenuSquare,
      items: [
        {
          title: "Seasonal menu planner",
          url: "/fnb/menu/seasonal",
        },
        {
          title: "Dietary tag engine",
          url: "/fnb/menu/dietary",
        },
        {
          title: "Printer routing",
          url: "/fnb/menu/printing",
        },
      ],
    },
    {
      title: "Inventory",
      url: "/fnb/inventory",
      icon: Package,
      items: [
        {
          title: "Auto-par generator",
          url: "/fnb/inventory/par",
        },
        {
          title: "Waste tracker",
          url: "/fnb/inventory/waste",
        },
        {
          title: "Supplier portal",
          url: "/fnb/inventory/suppliers",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "/fnb/reports",
      icon: BarChart3,
      items: [
        {
          title: "Food cost %",
          url: "/fnb/reports/food-cost",
        },
        {
          title: "Server sales rankings",
          url: "/fnb/reports/server-sales",
        },
        {
          title: "Menu engineering",
          url: "/fnb/reports/menu-engineering",
        },
      ],
    },
    {
      title: "Staff Management",
      url: "/fnb/staff",
      icon: Users,
      items: [
        {
          title: "Tip distribution",
          url: "/fnb/staff/tips",
        },
        {
          title: "Certification tracker",
          url: "/fnb/staff/certifications",
        },
        {
          title: "Shift trade board",
          url: "/fnb/staff/shifts",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Integration Hub",
      url: "/fnb/integration",
      icon: LinkIcon,
    },
    {
      name: "Hotel PMS Link",
      url: "/fnb/integration/pms",
      icon: Building2,
    },
    {
      name: "Tax Group Setup",
      url: "/fnb/settings/tax",
      icon: Calculator,
    },
    {
      name: "Settings",
      url: "/fnb/settings",
      icon: Settings2,
    },
  ],
}

export function FnbSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
