export function sanitizeString(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[0-9\s\-()]{10,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

export function validateRequired(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === "string") return value.trim().length > 0
  if (typeof value === "number") return !isNaN(value)
  if (Array.isArray(value)) return value.length > 0
  return true
}

export function validateNumber(value: any): boolean {
  return !isNaN(Number(value)) && isFinite(Number(value))
}

export function validateDate(date: string): boolean {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateAmount(amount: string | number): { isValid: boolean; error?: string } {
  const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

  if (isNaN(numAmount)) {
    return { isValid: false, error: "Amount must be a valid number" }
  }

  if (numAmount < 0) {
    return { isValid: false, error: "Amount cannot be negative" }
  }

  if (numAmount > 999999999) {
    return { isValid: false, error: "Amount is too large" }
  }

  return { isValid: true }
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateFormData(data: Record<string, any>, rules: Record<string, string[]>): ValidationResult {
  const errors: string[] = []

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = data[field]

    fieldRules.forEach((rule) => {
      switch (rule) {
        case "required":
          if (!validateRequired(value)) {
            errors.push(`${field.replace(/([A-Z])/g, " $1").toLowerCase()} is required`)
          }
          break
        case "email":
          if (value && !validateEmail(value)) {
            errors.push(`${field.replace(/([A-Z])/g, " $1").toLowerCase()} must be a valid email`)
          }
          break
        case "phone":
          if (value && !validatePhone(value)) {
            errors.push(`${field.replace(/([A-Z])/g, " $1").toLowerCase()} must be a valid phone number`)
          }
          break
        case "number":
          if (value && !validateNumber(value)) {
            errors.push(`${field.replace(/([A-Z])/g, " $1").toLowerCase()} must be a valid number`)
          }
          break
        case "date":
          if (value && !validateDate(value)) {
            errors.push(`${field.replace(/([A-Z])/g, " $1").toLowerCase()} must be a valid date`)
          }
          break
        case "amount":
          if (value) {
            const amountValidation = validateAmount(value)
            if (!amountValidation.isValid) {
              errors.push(amountValidation.error!)
            }
          }
          break
        case "password":
          if (value) {
            const passwordValidation = validatePassword(value)
            if (!passwordValidation.isValid) {
              errors.push(...passwordValidation.errors)
            }
          }
          break
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}
