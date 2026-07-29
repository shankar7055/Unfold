export type UnfoldErrorCode =
  | "ProviderNotFound"
  | "ProviderUnsupportedOutput"
  | "ProviderUnavailable"
  | "InvalidInput"
  | "Auth"
  | "PaymentRequired"
  | "RateLimit"
  | "Timeout"
  | "ParseFailed"
  | "Unknown"

const unfoldErrorMarker = Symbol.for("unfold.error.UnfoldError")

export interface UnfoldErrorOptions {
  cause?: unknown
  code: UnfoldErrorCode
  providerId?: string
  requestId?: string
  retryable?: boolean
  retryAfterMs?: number
  statusCode?: number
}

export class UnfoldError extends Error {
  readonly code: UnfoldErrorCode
  readonly providerId: string | undefined
  readonly requestId: string | undefined
  readonly retryable: boolean
  readonly retryAfterMs: number | undefined
  readonly statusCode: number | undefined

  constructor(message: string, opts: UnfoldErrorOptions) {
    super(message)
    Object.defineProperty(this, unfoldErrorMarker, { value: true })
    this.name = "UnfoldError"
    this.code = opts.code
    this.providerId = opts.providerId
    this.requestId = opts.requestId
    this.retryable = opts.retryable ?? isRetryableCode(opts.code)
    this.retryAfterMs = opts.retryAfterMs
    this.statusCode = opts.statusCode
    this.cause = opts.cause
  }

  static isInstance(error: unknown): error is UnfoldError {
    return (
      typeof error === "object" &&
      error !== null &&
      ((error as Record<PropertyKey, unknown>)[unfoldErrorMarker] === true ||
        (error as Record<PropertyKey, unknown>)[
          Symbol.for("file_router.error.FileRouterError")
        ] === true)
    )
  }
}

export const toUnfoldError = (
  error: unknown,
  fallback: Omit<UnfoldErrorOptions, "cause">
): UnfoldError => {
  if (UnfoldError.isInstance(error)) {
    return error
  }

  const message =
    error instanceof Error ? error.message : "Unknown provider error"
  return new UnfoldError(message, { ...fallback, cause: error })
}

function isRetryableCode(code: UnfoldErrorCode): boolean {
  return (
    code === "ProviderUnavailable" || code === "RateLimit" || code === "Timeout"
  )
}

export const FileRouterError = UnfoldError
export type FileRouterError = UnfoldError
export const toFileRouterError = toUnfoldError
export type FileRouterErrorCode = UnfoldErrorCode
export type FileRouterErrorOptions = UnfoldErrorOptions
