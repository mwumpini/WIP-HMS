import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { FnbSidebar } from "@/components/fnb-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "F&B Management System - Mamani Hotel",
  description: "Standalone Food & Beverage Management System for Restaurant Operations",
  generator: "v0.app",
}

export default function FnbLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <FnbSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
