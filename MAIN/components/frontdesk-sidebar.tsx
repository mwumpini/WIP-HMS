"use client"

import type * as React from "react"
import {
  Settings2,
  Hotel,
  Calendar,
  Users,
  Bed,
  Home,
  Building2,
  LinkIcon,
  Bell,
  Key,
  FileText,
  Receipt,
  PartyPopper,
  Hammer,
  BarChart3,
  DollarSign,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Front Desk Manager",
    email: "frontdesk@mamanihotel.com",
    avatar: "/avatars/frontdesk-manager.jpg",
  },
  teams: [
    {
      name: "Front Office Operations",
      logo: Hotel,
      plan: "Guest Services",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/frontdesk",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Real-time occupancy stats",
          url: "/frontdesk/occupancy",
        },
        {
          title: "Today's critical alerts",
          url: "/frontdesk/alerts",
        },
      ],
    },
    {
      title: "Rooms",
      url: "/frontdesk/rooms",
      icon: Bed,
      items: [
        {
          title: "Availability calendar",
          url: "/frontdesk/rooms/calendar",
        },
        {
          title: "Room status matrix",
          url: "/frontdesk/rooms/status",
        },
        {
          title: "Maintenance flags",
          url: "/frontdesk/rooms/maintenance",
        },
      ],
    },
    {
      title: "Bookings",
      url: "/frontdesk/bookings",
      icon: Calendar,
      items: [
        {
          title: "New reservation wizard",
          url: "/frontdesk/bookings/new",
        },
        {
          title: "Group bookings manager",
          url: "/frontdesk/bookings/groups",
        },
        {
          title: "Channel manager sync",
          url: "/frontdesk/bookings/channels",
        },
      ],
    },
    {
      title: "Invoices",
      url: "/frontdesk/invoices",
      icon: Receipt,
      items: [
        {
          title: "Folio viewer",
          url: "/frontdesk/invoices/folios",
        },
        {
          title: "Receipt generator",
          url: "/frontdesk/invoices/receipts",
        },
        {
          title: "Tax exemption handler",
          url: "/frontdesk/invoices/tax",
        },
      ],
    },
    {
      title: "Clients",
      url: "/frontdesk/clients",
      icon: Users,
      items: [
        {
          title: "Guest profiles",
          url: "/frontdesk/clients/profiles",
        },
        {
          title: "Corporate accounts",
          url: "/frontdesk/clients/corporate",
        },
        {
          title: "Loyalty program",
          url: "/frontdesk/clients/loyalty",
        },
      ],
    },
    {
      title: "Services & Facilities",
      url: "/frontdesk/services",
      icon: Bell,
      items: [
        {
          title: "Spa booking console",
          url: "/frontdesk/services/spa",
        },
        {
          title: "Gym access tracker",
          url: "/frontdesk/services/gym",
        },
        {
          title: "Business center requests",
          url: "/frontdesk/services/business",
        },
      ],
    },
    {
      title: "Events & Conferences",
      url: "/frontdesk/events",
      icon: PartyPopper,
      items: [
        {
          title: "Banquet orders",
          url: "/frontdesk/events/banquets",
        },
        {
          title: "Floorplan designer",
          url: "/frontdesk/events/floorplan",
        },
        {
          title: "AV equipment log",
          url: "/frontdesk/events/equipment",
        },
      ],
    },
    {
      title: "Tools",
      url: "/frontdesk/tools",
      icon: Hammer,
      items: [
        {
          title: "Night audit wizard",
          url: "/frontdesk/tools/audit",
        },
        {
          title: "Bulk room assignment",
          url: "/frontdesk/tools/assignment",
        },
        {
          title: "Rate comparison tool",
          url: "/frontdesk/tools/rates",
        },
      ],
    },
    {
      title: "Templates",
      url: "/frontdesk/templates",
      icon: FileText,
      items: [
        {
          title: "Registration card designs",
          url: "/frontdesk/templates/registration",
        },
        {
          title: "Email/SMS templates",
          url: "/frontdesk/templates/communication",
        },
        {
          title: "Legal forms",
          url: "/frontdesk/templates/legal",
        },
      ],
    },
    {
      title: "Reports",
      url: "/frontdesk/reports",
      icon: BarChart3,
      items: [
        {
          title: "Daily revenue pulse",
          url: "/frontdesk/reports/revenue",
        },
        {
          title: "Occupancy heatmaps",
          url: "/frontdesk/reports/occupancy",
        },
        {
          title: "Guest origin analysis",
          url: "/frontdesk/reports/analytics",
        },
      ],
    },
    {
      title: "Payments",
      url: "/frontdesk/payments",
      icon: DollarSign,
      items: [
        {
          title: "Payment processor hub",
          url: "/frontdesk/payments/processors",
        },
        {
          title: "Credit card auth",
          url: "/frontdesk/payments/cards",
        },
        {
          title: "Cash drawer reconciliation",
          url: "/frontdesk/payments/cash",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Integration Hub",
      url: "/frontdesk/integration",
      icon: LinkIcon,
    },
    {
      name: "F&B Integration",
      url: "/frontdesk/integration/fnb",
      icon: Building2,
    },
    {
      name: "Key Management",
      url: "/frontdesk/keys",
      icon: Key,
    },
    {
      name: "Settings",
      url: "/frontdesk/settings",
      icon: Settings2,
    },
  ],
}

export function FrontDeskSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
