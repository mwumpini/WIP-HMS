"use client"

import type * as React from "react"
import {
  Settings2,
  Shield,
  Camera,
  Key,
  Users,
  AlertTriangle,
  Building2,
  LinkIcon,
  Phone,
  FileText,
  BookOpen,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// Security Management Navigation Data
const data = {
  user: {
    name: "Security Manager",
    email: "security@mamanihotel.com",
    avatar: "/avatars/security-manager.jpg",
  },
  teams: [
    {
      name: "Security Management",
      logo: Shield,
      plan: "Safety & Protection",
    },
  ],
  navMain: [
    {
      title: "Incident Logbook",
      url: "/security/incidents",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Digital case files",
          url: "/security/incidents/cases",
        },
        {
          title: "Witness statements",
          url: "/security/incidents/witnesses",
        },
        {
          title: "Resolution tracking",
          url: "/security/incidents/resolution",
        },
      ],
    },
    {
      title: "Access Control",
      url: "/security/access",
      icon: Key,
      items: [
        {
          title: "Keycard activity",
          url: "/security/access/keycards",
        },
        {
          title: "Restricted area log",
          url: "/security/access/restricted",
        },
        {
          title: "VIP security plans",
          url: "/security/access/vip",
        },
      ],
    },
    {
      title: "Surveillance",
      url: "/security/surveillance",
      icon: Camera,
      items: [
        {
          title: "Camera grid map",
          url: "/security/surveillance/grid",
        },
        {
          title: "Export footage tool",
          url: "/security/surveillance/export",
        },
        {
          title: "Night patrol tracker",
          url: "/security/surveillance/patrol",
        },
      ],
    },
    {
      title: "Emergency Protocols",
      url: "/security/emergency",
      icon: AlertTriangle,
      items: [
        {
          title: "Fire drill checklist",
          url: "/security/emergency/fire",
        },
        {
          title: "Medical response",
          url: "/security/emergency/medical",
        },
        {
          title: "Crisis contacts",
          url: "/security/emergency/contacts",
        },
      ],
    },
    {
      title: "Staff Management",
      url: "/security/staff",
      icon: Users,
      items: [
        {
          title: "Guard tour system",
          url: "/security/staff/tours",
        },
        {
          title: "Certification tracker",
          url: "/security/staff/certifications",
        },
        {
          title: "Shift rotation planner",
          url: "/security/staff/shifts",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Integration Hub",
      url: "/security/integration",
      icon: LinkIcon,
    },
    {
      name: "Emergency Services",
      url: "/security/emergency-services",
      icon: Phone,
    },
    {
      name: "Fire Safety System",
      url: "/security/fire-safety",
      icon: Building2,
    },
    {
      name: "Compliance & Training",
      url: "/security/training",
      icon: FileText,
    },
    {
      name: "Settings",
      url: "/security/settings",
      icon: Settings2,
    },
  ],
}

export function SecuritySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
