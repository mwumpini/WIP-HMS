export class AppError extends Error {
  constructor(
    message: string,
    public code = "UNKNOWN_ERROR",
    public statusCode = 500,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleError(error: unknown): { message: string; code: string } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "GENERIC_ERROR",
    }
  }

  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
  }
}

export function withErrorHandling<T extends any[], R>(fn: (...args: T) => R, fallback?: R): (...args: T) => R {
  return (...args: T): R => {
    try {
      return fn(...args)
    } catch (error) {
      console.error("Error in function:", error)
      if (fallback !== undefined) {
        return fallback
      }
      throw error
    }
  }
}

export async function withAsyncErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  fallback?: R,
): Promise<(...args: T) => Promise<R>> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error("Error in async function:", error)
      if (fallback !== undefined) {
        return fallback
      }
      throw error
    }
  }
}
