"use client"

import type React from "react"
import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react"
import Link from "next/link"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorId?: string
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundaryProvider extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    return {
      hasError: true,
      error,
      errorId,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.group("🚨 Error Boundary Caught Error")
      console.error("Error:", error)
      console.error("Error Info:", errorInfo)
      console.error("Error Details:", errorDetails)
      console.groupEnd()
    }

    // Track error count
    try {
      const currentCount = Number.parseInt(localStorage.getItem("errorCount") || "0")
      localStorage.setItem("errorCount", (currentCount + 1).toString())

      // Store error details for debugging
      const errorLog = JSON.parse(localStorage.getItem("errorLog") || "[]")
      errorLog.push(errorDetails)

      // Keep only last 10 errors
      if (errorLog.length > 10) {
        errorLog.splice(0, errorLog.length - 10)
      }

      localStorage.setItem("errorLog", JSON.stringify(errorLog))
    } catch (storageError) {
      console.error("Failed to log error to localStorage:", storageError)
    }

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.setState({ errorInfo })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state

    const report = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    // Copy to clipboard for easy reporting
    navigator.clipboard
      .writeText(JSON.stringify(report, null, 2))
      .then(() => {
        alert("Error report copied to clipboard. Please share this with support.")
      })
      .catch(() => {
        console.log("Error report:", report)
        alert("Error report logged to console. Please check browser console.")
      })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Something went wrong</CardTitle>
              <CardDescription className="text-gray-600">
                An unexpected error occurred. You can try refreshing the page or return to the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleRetry} className="bg-emerald-600 hover:bg-emerald-700">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" onClick={this.handleReportError}>
                  <Bug className="mr-2 h-4 w-4" />
                  Report Error
                </Button>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left text-xs text-gray-500 mt-4">
                  <summary className="cursor-pointer font-medium">Error Details (Development)</summary>
                  <div className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    <div className="font-medium mb-2">Error ID: {this.state.errorId}</div>
                    <div className="font-medium mb-1">Message:</div>
                    <pre className="mb-2">{this.state.error.message}</pre>
                    <div className="font-medium mb-1">Stack:</div>
                    <pre className="text-xs">{this.state.error.stack}</pre>
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
