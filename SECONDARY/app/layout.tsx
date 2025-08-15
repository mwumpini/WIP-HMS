import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kali Syn - Syncing Ghana's Hospitality | Tax & Business Management",
  description:
    "Comprehensive tax and business management system for Ghana's hospitality industry. Streamline payroll, expenses, sales, and compliance with GRA, GTA, and SSNIT requirements.",
  keywords:
    "Ghana hospitality, tax management, payroll, SSNIT, GRA, GTA, business management, tourism levy, VAT, income tax",
  authors: [{ name: "Kali Syn Team" }],
  creator: "Kali Syn",
  publisher: "Kali Syn",
  robots: "index, follow",
  openGraph: {
    title: "Kali Syn - Syncing Ghana's Hospitality",
    description: "Comprehensive tax and business management system for Ghana's hospitality industry",
    type: "website",
    locale: "en_GH",
    siteName: "Kali Syn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kali Syn - Syncing Ghana's Hospitality",
    description: "Comprehensive tax and business management system for Ghana's hospitality industry",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kali Syn" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
