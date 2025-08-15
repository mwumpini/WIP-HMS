"use client"

import type * as React from "react"
import { Settings, Home, Bell, HelpCircle, Building, ChefHat, Shield, Wrench, UserCheck, Users } from "lucide-react"

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
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Sample data for the sidebar
const data = {
  user: {
    name: "Hotel Manager",
    email: "mwumpini@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32&text=MH",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Front Office Operations",
      url: "/frontdesk",
      icon: UserCheck,
      badge: "Live",
      items: [
        {
          title: "Dashboard",
          url: "/frontdesk",
        },
        {
          title: "Rooms",
          url: "/frontdesk/rooms",
          items: [
            { title: "Room Status Matrix", url: "/frontdesk/rooms/status" },
            { title: "Availability Calendar", url: "/frontdesk/rooms/availability" },
            { title: "Room Types & Rates", url: "/frontdesk/rooms/types" },
            { title: "Room Assignments", url: "/frontdesk/rooms/assignments" },
          ],
        },
        {
          title: "Bookings",
          url: "/frontdesk/bookings",
          items: [
            { title: "Reservation System", url: "/frontdesk/bookings/reservations" },
            { title: "Walk-in Registration", url: "/frontdesk/bookings/walkin" },
            { title: "Group Bookings", url: "/frontdesk/bookings/group" },
            { title: "Booking Modifications", url: "/frontdesk/bookings/modifications" },
          ],
        },
        {
          title: "Guest Services",
          url: "/frontdesk/guests",
          items: [
            { title: "Check-in Process", url: "/frontdesk/guests/checkin" },
            { title: "Check-out Process", url: "/frontdesk/guests/checkout" },
            { title: "Guest Profiles", url: "/frontdesk/guests/profiles" },
            { title: "VIP Management", url: "/frontdesk/guests/vip" },
            { title: "Guest Requests", url: "/frontdesk/guests/requests" },
          ],
        },
        {
          title: "Billing & Payments",
          url: "/frontdesk/billing",
          items: [
            { title: "Guest Folios", url: "/frontdesk/billing/folios" },
            { title: "Payment Processing", url: "/frontdesk/billing/payments" },
            { title: "Invoice Generation", url: "/frontdesk/billing/invoices" },
            { title: "Credit Management", url: "/frontdesk/billing/credit" },
          ],
        },
        {
          title: "Concierge Services",
          url: "/frontdesk/concierge",
          items: [
            { title: "Service Requests", url: "/frontdesk/concierge/requests" },
            { title: "Local Information", url: "/frontdesk/concierge/local" },
            { title: "Transportation", url: "/frontdesk/concierge/transport" },
            { title: "Recommendations", url: "/frontdesk/concierge/recommendations" },
          ],
        },
        {
          title: "Events & Conferences",
          url: "/frontdesk/events",
          items: [
            { title: "Event Calendar", url: "/frontdesk/events" },
            { title: "Venue Management", url: "/frontdesk/events/venues" },
            { title: "Event Planning", url: "/frontdesk/events/planning" },
            { title: "Equipment & AV", url: "/frontdesk/events/equipment" },
            { title: "Catering Coordination", url: "/frontdesk/events/catering" },
          ],
        },
      ],
    },
    {
      title: "F&B Operations",
      url: "/fnb",
      icon: ChefHat,
      badge: "Active",
      items: [
        {
          title: "Dashboard",
          url: "/fnb",
        },
        {
          title: "Point of Sale",
          url: "/fnb/pos",
          items: [
            { title: "Restaurant POS", url: "/fnb/pos/restaurant" },
            { title: "Bar POS", url: "/fnb/pos/bar" },
            { title: "Room Service", url: "/fnb/pos/roomservice" },
            { title: "Takeaway Orders", url: "/fnb/pos/takeaway" },
          ],
        },
        {
          title: "Kitchen Operations",
          url: "/fnb/kitchen",
          items: [
            { title: "Kitchen Display", url: "/fnb/kitchen/display" },
            { title: "Order Management", url: "/fnb/kitchen/orders" },
            { title: "Recipe Management", url: "/fnb/kitchen/recipes" },
            { title: "Food Cost Control", url: "/fnb/kitchen/costing" },
          ],
        },
        {
          title: "Bar Management",
          url: "/fnb/bar",
          items: [
            { title: "Bar Operations", url: "/fnb/bar/operations" },
            { title: "Beverage Inventory", url: "/fnb/bar/inventory" },
            { title: "Pour Control", url: "/fnb/bar/pour" },
            { title: "Wine Management", url: "/fnb/bar/wine" },
          ],
        },
        {
          title: "Menu Management",
          url: "/fnb/menu",
          items: [
            { title: "Menu Engineering", url: "/fnb/menu/engineering" },
            { title: "Pricing Strategy", url: "/fnb/menu/pricing" },
            { title: "Seasonal Menus", url: "/fnb/menu/seasonal" },
            { title: "Special Diets", url: "/fnb/menu/diets" },
          ],
        },
        {
          title: "Inventory",
          url: "/fnb/inventory",
          items: [
            { title: "Stock Management", url: "/fnb/inventory/stock" },
            { title: "Procurement", url: "/fnb/inventory/procurement" },
            { title: "Supplier Management", url: "/fnb/inventory/suppliers" },
            { title: "Waste Tracking", url: "/fnb/inventory/waste" },
          ],
        },
      ],
    },
    {
      title: "Housekeeping & Maintenance",
      url: "/housekeeping",
      icon: Wrench,
      badge: "24/7",
      items: [
        {
          title: "Room Status Matrix",
          url: "/housekeeping/rooms",
        },
        {
          title: "Task Dispatcher",
          url: "/housekeeping/tasks",
        },
        {
          title: "Maintenance Console",
          url: "/housekeeping/maintenance",
        },
        {
          title: "Linen Management",
          url: "/housekeeping/linen",
        },
        {
          title: "Quality Control",
          url: "/housekeeping/quality",
        },
        {
          title: "Reports",
          url: "/housekeeping/reports",
        },
      ],
    },
    {
      title: "Security",
      url: "/security",
      icon: Shield,
      badge: "Secure",
      items: [
        {
          title: "Incident Logbook",
          url: "/security/incidents",
        },
        {
          title: "Access Control",
          url: "/security/access",
        },
        {
          title: "Surveillance",
          url: "/security/surveillance",
        },
        {
          title: "Emergency Protocols",
          url: "/security/emergency",
        },
        {
          title: "Staff Management",
          url: "/security/staff",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Admin & Management",
      url: "/admin",
      icon: Users,
      items: [
        {
          title: "User Management",
          url: "/admin/users",
        },
        {
          title: "Rate Management",
          url: "/admin/rates",
        },
        {
          title: "Staff Scheduling",
          url: "/admin/scheduling",
        },
        {
          title: "Performance Management",
          url: "/admin/performance",
        },
        {
          title: "Reports & Analytics",
          url: "/admin/reports",
          items: [
            { title: "Executive Dashboard", url: "/admin/reports" },
            { title: "Financial Reports", url: "/admin/reports/financial" },
            { title: "Occupancy Analytics", url: "/admin/reports/occupancy" },
            { title: "F&B Performance", url: "/admin/reports/fnb" },
            { title: "Guest Satisfaction", url: "/admin/reports/satisfaction" },
          ],
        },
      ],
    },
    {
      title: "System Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "General Settings",
          url: "/settings/general",
        },
        {
          title: "Integration Hub",
          url: "/settings/integrations",
        },
        {
          title: "Backup & Security",
          url: "/settings/backup",
        },
        {
          title: "System Maintenance",
          url: "/settings/maintenance",
        },
        {
          title: "License Management",
          url: "/settings/license",
        },
      ],
    },
  ],
  navSupport: [
    {
      title: "Help Center",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      badge: "3",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Building className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mamani Hotel</span>
                  <span className="truncate text-xs">Management System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                              {subItem.items?.length ? (
                                <SidebarMenuSub>
                                  {subItem.items.map((subSubItem) => (
                                    <SidebarMenuSubItem key={subSubItem.title}>
                                      <SidebarMenuSubButton asChild>
                                        <Link href={subSubItem.url}>
                                          <span>{subSubItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              ) : null}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                              {subItem.items?.length ? (
                                <SidebarMenuSub>
                                  {subItem.items.map((subSubItem) => (
                                    <SidebarMenuSubItem key={subSubItem.title}>
                                      <SidebarMenuSubButton asChild>
                                        <Link href={subSubItem.url}>
                                          <span>{subSubItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              ) : null}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSupport.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar || "/placeholder.svg"} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">MH</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
