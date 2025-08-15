import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InvoiceTemplatePreviewProps {
  template: string
  invoiceData?: any
}

export function InvoiceTemplatePreview({ template, invoiceData }: InvoiceTemplatePreviewProps) {
  const getTemplateStyles = (template: string) => {
    switch (template) {
      case "modern-luxury":
        return {
          primary: "#1f2937",
          secondary: "#f3f4f6",
          accent: "#3b82f6",
        }
      case "classic-business":
        return {
          primary: "#374151",
          secondary: "#f9fafb",
          accent: "#059669",
        }
      case "boutique-style":
        return {
          primary: "#7c2d12",
          secondary: "#fef7ed",
          accent: "#ea580c",
        }
      case "resort-paradise":
        return {
          primary: "#065f46",
          secondary: "#ecfdf5",
          accent: "#10b981",
        }
      default:
        return {
          primary: "#1f2937",
          secondary: "#f3f4f6",
          accent: "#3b82f6",
        }
    }
  }

  const styles = getTemplateStyles(template)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: styles.primary }}>
                Your Hotel Name
              </h1>
              <p className="text-sm text-gray-600">123 Hotel Street, City, State 12345</p>
            </div>
            <div className="text-right">
              <Badge style={{ backgroundColor: styles.accent, color: "white" }}>INVOICE</Badge>
              <p className="text-sm mt-2">INV-001</p>
              <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Client Info */}
          <div style={{ backgroundColor: styles.secondary }} className="p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Bill To:</h3>
            <p>John Doe</p>
            <p className="text-sm text-gray-600">john@example.com</p>
            <p className="text-sm text-gray-600">456 Client Ave, City, State 67890</p>
          </div>

          {/* Line Items */}
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: styles.accent }}>
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2">Deluxe Suite - 3 nights</td>
                  <td className="text-right py-2">3</td>
                  <td className="text-right py-2">$150.00</td>
                  <td className="text-right py-2">$450.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$450.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>$45.00</span>
              </div>
              <div
                className="flex justify-between font-bold text-lg border-t pt-2"
                style={{ borderColor: styles.accent }}
              >
                <span>Total:</span>
                <span>$495.00</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 pt-6 border-t">
            <p>Thank you for your business!</p>
            <p>Payment terms: Net 30 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
