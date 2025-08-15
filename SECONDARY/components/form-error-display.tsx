import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface FormErrorDisplayProps {
  errors: string[]
  className?: string
}

export function FormErrorDisplay({ errors, className = "" }: FormErrorDisplayProps) {
  if (errors.length === 0) return null

  return (
    <Alert variant="destructive" className={`border-red-200 bg-red-50 ${className}`}>
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        {errors.length === 1 ? (
          <span>{errors[0]}</span>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  )
}

interface FormSuccessDisplayProps {
  message: string
  className?: string
}

export function FormSuccessDisplay({ message, className = "" }: FormSuccessDisplayProps) {
  return (
    <Alert className={`border-green-200 bg-green-50 ${className}`}>
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">{message}</AlertDescription>
    </Alert>
  )
}
