"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Paperclip, X } from "lucide-react"

interface EmailComposerProps {
  recipientEmail?: string
  subject?: string
  invoiceId?: string
  onSend?: (emailData: any) => void
  onCancel?: () => void
}

export function EmailComposer({
  recipientEmail = "",
  subject = "",
  invoiceId = "",
  onSend,
  onCancel,
}: EmailComposerProps) {
  const [emailData, setEmailData] = useState({
    to: recipientEmail,
    subject: subject || `Invoice ${invoiceId} from Your Hotel`,
    message: `Dear Valued Guest,

Thank you for choosing our hotel. Please find attached your invoice ${invoiceId}.

If you have any questions about this invoice, please don't hesitate to contact us.

Best regards,
Your Hotel Team`,
    template: "professional",
    attachments: invoiceId ? [`${invoiceId}.pdf`] : [],
  })

  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    setIsSending(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (onSend) {
        onSend(emailData)
      }

      console.log("Email sent:", emailData)
    } catch (error) {
      console.error("Failed to send email:", error)
    } finally {
      setIsSending(false)
    }
  }

  const removeAttachment = (index: number) => {
    setEmailData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Send Email</CardTitle>
        <CardDescription>Send invoice via email to your client</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email-to">To</Label>
          <Input
            id="email-to"
            type="email"
            value={emailData.to}
            onChange={(e) => setEmailData((prev) => ({ ...prev, to: e.target.value }))}
            placeholder="client@example.com"
          />
        </div>

        <div>
          <Label htmlFor="email-subject">Subject</Label>
          <Input
            id="email-subject"
            value={emailData.subject}
            onChange={(e) => setEmailData((prev) => ({ ...prev, subject: e.target.value }))}
            placeholder="Invoice from Your Hotel"
          />
        </div>

        <div>
          <Label htmlFor="email-template">Email Template</Label>
          <Select
            value={emailData.template}
            onValueChange={(value) => setEmailData((prev) => ({ ...prev, template: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="reminder">Payment Reminder</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="email-message">Message</Label>
          <Textarea
            id="email-message"
            value={emailData.message}
            onChange={(e) => setEmailData((prev) => ({ ...prev, message: e.target.value }))}
            rows={8}
            placeholder="Enter your message..."
          />
        </div>

        {emailData.attachments.length > 0 && (
          <div>
            <Label>Attachments</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {emailData.attachments.map((attachment, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  {attachment}
                  <button onClick={() => removeAttachment(index)} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        <div className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isSending}>
            <Send className="mr-2 h-4 w-4" />
            {isSending ? "Sending..." : "Send Email"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
