import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SecuritySidebar } from "@/components/security-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Security Management - Mamani Hotel",
  description: "Standalone Security Management System for Hotel Safety and Protection",
  generator: "v0.app",
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SecuritySidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
