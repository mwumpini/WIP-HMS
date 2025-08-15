import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { HousekeepingSidebar } from "@/components/housekeeping-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Housekeeping & Maintenance - Mamani Hotel",
  description: "Standalone Housekeeping and Maintenance Management System",
  generator: "v0.app",
}

export default function HousekeepingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <HousekeepingSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
