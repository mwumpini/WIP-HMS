"use client"

import type * as React from "react"
import {
  Settings2,
  Sparkles,
  Wrench,
  ClipboardList,
  Building2,
  LinkIcon,
  Shield,
  Grid3X3,
  Send,
  Shirt,
  Star,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Housekeeping Manager",
    email: "housekeeping@mamanihotel.com",
    avatar: "/avatars/housekeeping-manager.jpg",
  },
  teams: [
    {
      name: "Housekeeping & Maintenance",
      logo: Sparkles,
      plan: "Operations Management",
    },
  ],
  navMain: [
    {
      title: "Room Status Matrix",
      url: "/housekeeping/rooms",
      icon: Grid3X3,
      isActive: true,
      items: [
        {
          title: "Floor-by-floor view",
          url: "/housekeeping/rooms/floors",
        },
        {
          title: "Color-coded priorities",
          url: "/housekeeping/rooms/priorities",
        },
        {
          title: "Deep clean scheduler",
          url: "/housekeeping/rooms/deep-clean",
        },
      ],
    },
    {
      title: "Task Dispatcher",
      url: "/housekeeping/tasks",
      icon: Send,
      items: [
        {
          title: "Assign to teams",
          url: "/housekeeping/tasks/assign",
        },
        {
          title: "Urgency tags",
          url: "/housekeeping/tasks/urgency",
        },
        {
          title: "Photo verification",
          url: "/housekeeping/tasks/photos",
        },
      ],
    },
    {
      title: "Maintenance Console",
      url: "/housekeeping/maintenance",
      icon: Wrench,
      items: [
        {
          title: "Work order dashboard",
          url: "/housekeeping/maintenance/orders",
        },
        {
          title: "Equipment lifespan tracker",
          url: "/housekeeping/maintenance/equipment",
        },
        {
          title: "Contractor portal",
          url: "/housekeeping/maintenance/contractors",
        },
      ],
    },
    {
      title: "Linen Management",
      url: "/housekeeping/linen",
      icon: Shirt,
      items: [
        {
          title: "Laundry cycle tracker",
          url: "/housekeeping/linen/cycles",
        },
        {
          title: "Loss/damage logger",
          url: "/housekeeping/linen/damage",
        },
        {
          title: "Par level alerts",
          url: "/housekeeping/linen/par-levels",
        },
      ],
    },
    {
      title: "Quality Control",
      url: "/housekeeping/quality",
      icon: Star,
      items: [
        {
          title: "Inspection checklist",
          url: "/housekeeping/quality/inspections",
        },
        {
          title: "Guest feedback triage",
          url: "/housekeeping/quality/feedback",
        },
        {
          title: "HSKP scorecards",
          url: "/housekeeping/quality/scorecards",
        },
      ],
    },
    {
      title: "Reports",
      url: "/housekeeping/reports",
      icon: ClipboardList,
      items: [
        {
          title: "Room turnaround times",
          url: "/housekeeping/reports/turnaround",
        },
        {
          title: "Maintenance cost analysis",
          url: "/housekeeping/reports/costs",
        },
        {
          title: "Linen reconciliation",
          url: "/housekeeping/reports/linen",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Integration Hub",
      url: "/housekeeping/integration",
      icon: LinkIcon,
    },
    {
      name: "Front Desk Link",
      url: "/housekeeping/integration/frontdesk",
      icon: Building2,
    },
    {
      name: "Safety & Security",
      url: "/housekeeping/safety",
      icon: Shield,
    },
    {
      name: "Settings",
      url: "/housekeeping/settings",
      icon: Settings2,
    },
  ],
}

export function HousekeepingSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
