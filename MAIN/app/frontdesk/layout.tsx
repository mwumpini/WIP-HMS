import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { FrontDeskSidebar } from "@/components/frontdesk-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Front Desk Operations - Mamani Hotel",
  description: "Standalone Front Desk Management System for Hotel Operations",
  generator: "v0.app",
}

export default function FrontDeskLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <FrontDeskSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
