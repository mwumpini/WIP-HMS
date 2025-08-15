"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle, Book, Video, Bot, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function HelpPage() {
  const [showAIChat, setShowAIChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI assistant. I can help you navigate the system, answer questions about features, and guide you through common tasks. What would you like to know?",
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We will get back to you soon.")
  }

  const handleAIChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    const userMessage = currentMessage.trim()
    setCurrentMessage("")

    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)

    setTimeout(() => {
      const responses = getAIResponse(userMessage)
      setChatMessages((prev) => [...prev, { role: "assistant", content: responses }])
      setIsTyping(false)
    }, 1000)
  }

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("vat") || lowerMessage.includes("tax")) {
      return "VAT is calculated at 15% on VAT-inclusive amounts. You can find VAT calculations in the GRA section under Tax & Compliance. Would you like me to guide you there?"
    }

    if (lowerMessage.includes("expense") || lowerMessage.includes("add expense")) {
      return "To add a new expense, go to Expenses → New Expense in the sidebar. You can also use the Quick Actions section for faster access. The system will automatically categorize your expenses for tax reporting."
    }

    if (lowerMessage.includes("sale") || lowerMessage.includes("add sale")) {
      return "To record a new sale, navigate to Sales → New Sale. You can enter customer details, items, and the system will automatically calculate VAT and levies. All sales data feeds into your tax reports."
    }

    if (lowerMessage.includes("inventory") || lowerMessage.includes("stock")) {
      return "For inventory management, check the Inventory section. You can view stock levels, add new items, create purchase orders, and track stock movements. The Recipe Calculator helps with cost calculations."
    }

    if (lowerMessage.includes("report") || lowerMessage.includes("export")) {
      return "Reports are available in the Reports section. You can generate sales reports, expense reports, tax compliance reports, and more. Most reports can be exported to CSV format using the Export button."
    }

    if (lowerMessage.includes("user") || lowerMessage.includes("staff") || lowerMessage.includes("employee")) {
      return "User management is in the Administration section (admin access required). You can add users, set roles, and manage permissions. For payroll, check the Payroll section under Business Operations."
    }

    if (lowerMessage.includes("dashboard") || lowerMessage.includes("navigate")) {
      return "The dashboard shows your business overview with key metrics. Use the sidebar to navigate between sections. The Main dropdown contains all major features, and you can use the search function to find specific pages quickly."
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "You're already in the Help section! You can contact support via phone (+233 24 123 4567), email (support@ghanataxcalculator.com), or use the contact form. Check the FAQ and video tutorials for quick answers."
    }

    return "I can help you with VAT calculations, adding expenses/sales, inventory management, generating reports, user management, and navigating the system. Could you be more specific about what you need help with?"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-gray-600">Get help with your Ghana Tax Calculator</p>
        </div>
      </div>

      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Bot className="h-5 w-5" />
            AI Assistant
            <Sparkles className="h-4 w-4" />
          </CardTitle>
          <CardDescription>
            Get instant help with navigation, features, and common tasks using our AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowAIChat(!showAIChat)} className="bg-emerald-600 hover:bg-emerald-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            {showAIChat ? "Close AI Chat" : "Start AI Chat"}
          </Button>

          {showAIChat && (
            <div className="mt-4 border rounded-lg bg-white">
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-1 mb-1">
                          <Bot className="h-3 w-3" />
                          <span className="text-xs font-medium">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <Bot className="h-3 w-3" />
                        <span className="text-xs">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleAIChat} className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask me anything about the system..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" disabled={isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-gray-600">+233 24 123 4567</p>
                <p className="text-xs text-gray-500">Mon-Fri, 8:00 AM - 6:00 PM GMT</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">support@ghanataxcalculator.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Office Address</p>
                <p className="text-sm text-gray-600">123 Liberation Road</p>
                <p className="text-sm text-gray-600">Accra, Ghana</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-sm text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Your last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What can we help you with?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue or question in detail..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help Resources</CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Book className="h-8 w-8 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">User Guide</p>
                <p className="text-xs text-gray-600">Step-by-step instructions</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Video className="h-8 w-8 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">Video Tutorials</p>
                <p className="text-xs text-gray-600">Watch how-to videos</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <MessageCircle className="h-8 w-8 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">FAQ</p>
                <p className="text-xs text-gray-600">Frequently asked questions</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues & Solutions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">How do I calculate VAT correctly?</h4>
            <p className="text-sm text-gray-600 mt-1">
              VAT is calculated at 15% on the VAT-inclusive amount. The system automatically calculates this when you
              enter your sales data.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">What are the current levy rates?</h4>
            <p className="text-sm text-gray-600 mt-1">
              NHIL: 2.5%, GETFund: 2.5%, COVID-19 Levy: 1%, Tourism Levy: 1%. These are automatically applied to your
              gross sales.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">How do I export my reports?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Go to any report page (VAT Return, GRA Levies, etc.) and click the "Export CSV" button to download your
              data.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-medium">Can I delete incorrect entries?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Yes, you can delete entries from the Sales Log and Expenses Log pages using the delete button next to each
              entry.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
