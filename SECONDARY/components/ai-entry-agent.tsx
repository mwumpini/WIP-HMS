"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, X, Upload, Sparkles, DollarSign, Receipt, Package, Users, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  type: "user" | "ai" | "success"
  content: string
  timestamp: Date
  action?: "sales" | "expense" | "inventory" | "customer"
  data?: any
}

interface ParsedCommand {
  type: "sales" | "expense" | "inventory" | "customer" | "conversation"
  amount?: number
  customerName?: string
  description?: string
  category?: string
  quantity?: number
  confidence: number
  response?: string
}

export function AIEntryAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const GEMINI_API_KEY = "AIzaSyCBMrW8gFIjZGhCHqWQZ2Wq51E5WTnZdhI"
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage
  }

  const processWithGemini = async (userInput: string, retryCount = 0): Promise<ParsedCommand> => {
    const maxRetries = 3
    const baseDelay = 1000 // 1 second

    try {
      const systemPrompt = `You are Mamani, an AI assistant for business operations. Analyze user input and respond with JSON in this exact format:

{
  "type": "sales|expense|inventory|customer|conversation",
  "amount": number (if applicable),
  "customerName": "string (if applicable)",
  "description": "string (if applicable)", 
  "category": "string (if applicable)",
  "quantity": number (if applicable),
  "confidence": 0.0-1.0,
  "response": "conversational response (if type is conversation)"
}

For business commands, extract the relevant data. For greetings/conversation, set type to "conversation" and provide a friendly response.

Examples:
- "Record sales of 5000 for John" → {"type": "sales", "amount": 5000, "customerName": "John", "confidence": 0.9}
- "Hi there" → {"type": "conversation", "response": "Hello! I'm Mamani, ready to help with your business operations!", "confidence": 1.0}
- "Add expense of 200 for supplies" → {"type": "expense", "amount": 200, "description": "supplies", "category": "General", "confidence": 0.9}

User input: ${userInput}`

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
            topP: 0.8,
            topK: 10,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: { message: errorText, code: response.status } }
        }

        console.error("Gemini API Error Response:", errorData)

        if (response.status === 503 || response.status === 429 || response.status >= 500) {
          if (retryCount < maxRetries) {
            const delay = baseDelay * Math.pow(2, retryCount) // Exponential backoff
            console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})`)
            await new Promise((resolve) => setTimeout(resolve, delay))
            return processWithGemini(userInput, retryCount + 1)
          }
        }

        if (response.status === 503) {
          throw new Error("The AI service is temporarily overloaded. Using fallback processing.")
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Using fallback processing.")
        } else if (response.status === 401) {
          throw new Error("API authentication failed. Using fallback processing.")
        } else {
          throw new Error(`AI service error (${response.status}). Using fallback processing.`)
        }
      }

      const data = await response.json()
      console.log("Gemini API Response:", data)

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!aiResponse) {
        throw new Error("No response from Gemini API")
      }

      try {
        const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || aiResponse.match(/\{[\s\S]*\}/)
        const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : aiResponse
        const parsed = JSON.parse(jsonString.trim())
        return parsed
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw response:", aiResponse)
        return {
          type: "conversation",
          response: aiResponse || "I'm here to help! Try asking me to record a sale or add an expense.",
          confidence: 0.5,
        }
      }
    } catch (error) {
      console.error("Gemini API error:", error)
      if (retryCount >= maxRetries) {
        console.log("Max retries reached, using fallback processing")
      }
      return fallbackParsing(userInput)
    }
  }

  const fallbackParsing = (input: string): ParsedCommand => {
    const text = input.toLowerCase().trim()

    // Handle greetings
    if (text.match(/^(hi|hello|hey|good morning|good afternoon|good evening)!?$/)) {
      return {
        type: "conversation",
        response:
          "Hello! I'm Mamani, your AI assistant. The AI service is temporarily unavailable, but I can still help with basic commands like 'Record sales of 1000 for John' or 'Add expense of 200 for supplies'.",
        confidence: 0.8,
      }
    }

    // Handle help requests
    if (text.match(/help|what can you do|commands/)) {
      return {
        type: "conversation",
        response:
          "I can help you with: Record sales (e.g., 'Record sales of 1000 for John'), Add expenses (e.g., 'Add expense of 200 for supplies'), Add customers, and manage inventory. The AI service is temporarily unavailable but basic commands still work.",
        confidence: 0.9,
      }
    }

    // Sales pattern matching
    const salesMatch = text.match(
      /(?:record|add|create|new)?\s*sales?\s+(?:of\s+)?(?:ghs\s+)?(\d+(?:\.\d{2})?)\s*(?:for\s+(.+?))?$/i,
    )
    if (salesMatch) {
      return {
        type: "sales",
        amount: Number.parseFloat(salesMatch[1]),
        customerName: salesMatch[2]?.trim() || "Walk-in Customer",
        confidence: 0.7,
      }
    }

    // Expense pattern matching
    const expenseMatch = text.match(
      /(?:record|add|create|new)?\s*expense\s+(?:of\s+)?(?:ghs\s+)?(\d+(?:\.\d{2})?)\s*(?:for\s+(.+?))?$/i,
    )
    if (expenseMatch) {
      return {
        type: "expense",
        amount: Number.parseFloat(expenseMatch[1]),
        description: expenseMatch[2]?.trim() || "General Expense",
        category: "General",
        confidence: 0.7,
      }
    }

    // Customer pattern matching
    const customerMatch = text.match(/(?:add|new|create)\s+customer\s+(.+)/i)
    if (customerMatch) {
      return {
        type: "customer",
        customerName: customerMatch[1].trim(),
        confidence: 0.7,
      }
    }

    return {
      type: "conversation",
      response:
        "I'm running in offline mode due to AI service issues. I can still help with basic commands like 'Record sales of 1000 for John' or 'Add expense of 200 for supplies'. Please be specific with your request.",
      confidence: 0.3,
    }
  }

  const calculateTaxes = (amount: number) => {
    const vatAmount = (amount * 12.5) / 100
    const nhilAmount = (amount * 2.5) / 100
    const getfundAmount = (amount * 2.5) / 100
    const covidAmount = (amount * 1) / 100
    const tourismAmount = (amount * 1) / 100
    const totalTaxes = vatAmount + nhilAmount + getfundAmount + covidAmount + tourismAmount
    const totalAmount = amount + totalTaxes

    return {
      subtotal: amount,
      vatAmount,
      nhilAmount,
      getfundAmount,
      covidAmount,
      tourismAmount,
      totalTaxes,
      totalAmount,
    }
  }

  const executeCommand = async (command: ParsedCommand) => {
    switch (command.type) {
      case "sales": {
        const existingSales = JSON.parse(localStorage.getItem("sales") || "[]")
        const taxes = calculateTaxes(command.amount!)

        const newSale = {
          id: Date.now().toString(),
          customerName: command.customerName!,
          customerEmail: "",
          customerPhone: "",
          serviceType: "OTHERS",
          description: `AI Generated: Sales entry`,
          amount: command.amount!.toString(),
          date: new Date().toISOString().split("T")[0],
          ...taxes,
          createdAt: new Date().toISOString(),
        }

        localStorage.setItem("sales", JSON.stringify([...existingSales, newSale]))

        return {
          message: `Sales entry created! Customer: ${command.customerName}, Total: GHS ${taxes.totalAmount.toFixed(2)} (including taxes)`,
          data: newSale,
        }
      }

      case "expense": {
        const existingExpenses = JSON.parse(localStorage.getItem("expenses") || "[]")

        const newExpense = {
          id: Date.now().toString(),
          description: command.description!,
          category: command.category || "General",
          amount: command.amount!,
          date: new Date().toISOString().split("T")[0],
          createdAt: new Date().toISOString(),
          aiGenerated: true,
        }

        localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newExpense]))

        return {
          message: `Expense entry created! Description: ${command.description}, Amount: GHS ${command.amount!.toFixed(2)}`,
          data: newExpense,
        }
      }

      case "customer": {
        const existingCustomers = JSON.parse(localStorage.getItem("customers") || "[]")

        const newCustomer = {
          id: `customer-${Date.now()}`,
          name: command.customerName!,
          email: "",
          phone: "",
          address: "",
          customerType: "individual",
          creditLimit: 10000,
          paymentTerms: 30,
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          totalPurchases: 0,
          outstandingBalance: 0,
          aiGenerated: true,
        }

        localStorage.setItem("customers", JSON.stringify([...existingCustomers, newCustomer]))

        return {
          message: `Customer "${command.customerName}" added successfully!`,
          data: newCustomer,
        }
      }

      case "inventory": {
        const existingInventory = JSON.parse(localStorage.getItem("inventory") || "[]")

        const newItem = {
          id: Date.now().toString(),
          name: command.description!,
          sku: `AI-${Date.now()}`,
          category: "General",
          quantity: command.quantity!,
          unitPrice: 0,
          totalValue: 0,
          reorderLevel: 10,
          status: "active",
          createdAt: new Date().toISOString(),
          aiGenerated: true,
        }

        localStorage.setItem("inventory", JSON.stringify([...existingInventory, newItem]))

        return {
          message: `Inventory item "${command.description}" added with ${command.quantity} units!`,
          data: newItem,
        }
      }

      default:
        throw new Error("Unknown command type")
    }
  }

  const processInput = async (userInput: string) => {
    if (!userInput.trim()) return

    setIsProcessing(true)
    addMessage({ type: "user", content: userInput })

    try {
      const command = await processWithGemini(userInput)

      if (command.type === "conversation") {
        addMessage({
          type: "ai",
          content: command.response || "I'm here to help! What would you like me to do?",
        })
        return
      }

      if (command.confidence < 0.6) {
        addMessage({
          type: "ai",
          content:
            "I'm not entirely sure what you want me to do. Could you be more specific? For example: 'Record sales of 1000 for John Doe' or 'Add expense of 200 for office supplies'",
        })
        return
      }

      const result = await executeCommand(command)

      addMessage({
        type: "success",
        content: result.message,
        action: command.type,
        data: result.data,
      })

      toast({
        title: "Success!",
        description: result.message,
      })
    } catch (error) {
      addMessage({
        type: "ai",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Something went wrong"}. Please try again or rephrase your request.`,
      })

      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isProcessing) {
      processInput(input.trim())
      setInput("")
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast({
        title: "Invalid File",
        description: "Please upload an image or PDF file",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    addMessage({ type: "user", content: `📄 Uploaded: ${file.name}` })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockData = {
      vendor: "Sample Store",
      amount: 125.5,
      date: new Date().toISOString().split("T")[0],
      category: "Office Supplies",
    }

    addMessage({
      type: "ai",
      content: `Document processed!\n\nVendor: ${mockData.vendor}\nAmount: GHS ${mockData.amount}\nDate: ${mockData.date}\nCategory: ${mockData.category}\n\nShall I create an expense entry? Type 'yes' to confirm.`,
    })

    setIsProcessing(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const getActionIcon = (action?: string) => {
    switch (action) {
      case "sales":
        return <DollarSign className="h-4 w-4" />
      case "expense":
        return <Receipt className="h-4 w-4" />
      case "inventory":
        return <Package className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-300 hover:scale-110 group"
        >
          <div className="relative">
            <Bot className="h-8 w-8 transition-transform group-hover:scale-110" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 right-6 z-50 w-[440px] h-[600px]">
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="h-6 w-6" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Mamani</h3>
              <p className="text-xs text-blue-100">Powered by Gemini AI</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hi! I'm Mamani</h4>
                  <p className="text-sm text-gray-600 mb-4">Your AI assistant powered by Gemini</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Try: "Record sales of 5000 for John"</p>
                    <p>Or: "Add expense of 200 for supplies"</p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : message.type === "success"
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border border-green-200"
                          : "bg-gray-50 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.type === "success" && (
                      <div className="flex items-center gap-2 mb-2">
                        {getActionIcon(message.action)}
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {message.action?.toUpperCase()}
                        </Badge>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-gray-600">Mamani is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t border-gray-100">
            <div
              className={`border-2 border-dashed rounded-xl p-3 mb-4 transition-all ${
                isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Upload className="h-4 w-4" />
                Drop receipts here or
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-blue-600 hover:text-blue-700 underline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  browse files
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Mamani anything..."
                disabled={isProcessing}
                className="flex-1 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="submit"
                disabled={isProcessing || !input.trim()}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
