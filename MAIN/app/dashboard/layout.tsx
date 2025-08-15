import type React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main role="main" aria-label="Hotel Command Center Dashboard">
        {children}
      </main>
    </div>
  )
}
