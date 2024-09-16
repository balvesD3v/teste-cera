export class BadRequestException extends Error {
  public readonly statusCode: number
  public readonly message: string
  public readonly error: string

  constructor(message: string, error = 'Bad Request') {
    super(message)
    this.statusCode = 400
    this.message = message
    this.error = error

    // Preserve the stack trace (optional, for better debugging)
    Error.captureStackTrace(this, this.constructor)
  }
}
