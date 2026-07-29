import { UnfoldError } from "../errors"
import { parsePageFieldIds } from "../types"
import type { ParseOptions, ParseOutput, ParsePageField } from "../types"

const MAX_TIMER_DELAY_MS = 2_147_483_647

export function providerOptions<T>(
  options: ParseOptions,
  providerId: string
): T {
  const value = options.providerOptions?.[providerId]
  if (value === undefined) {
    return {} as T
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new UnfoldError(
      `Provider options for "${providerId}" must be an object.`,
      { code: "ParseFailed", providerId }
    )
  }
  return value as T
}

export function assertPages(pages: Array<number> | undefined): void {
  if (pages?.some((page) => !Number.isSafeInteger(page) || page < 1)) {
    throw new UnfoldError("Pages must be positive, one-based integers.", {
      code: "ParseFailed",
    })
  }
}

export function assertPageFields(
  outputs: Array<ParseOutput>,
  pageFields: Array<ParsePageField> | undefined
): void {
  if (!pageFields) {
    return
  }
  if (
    pageFields.length === 0 ||
    pageFields.some((field) => !parsePageFieldIds.includes(field))
  ) {
    throw new UnfoldError("pageFields must contain supported page fields.", {
      code: "InvalidInput",
    })
  }
  if (!outputs.includes("pages")) {
    throw new UnfoldError("pageFields requires the pages output.", {
      code: "InvalidInput",
    })
  }
}

export function assertTimeoutMs(timeoutMs: number | undefined): void {
  if (
    timeoutMs !== undefined &&
    (!Number.isSafeInteger(timeoutMs) ||
      timeoutMs < 0 ||
      timeoutMs > MAX_TIMER_DELAY_MS)
  ) {
    throw new UnfoldError(
      `timeoutMs must be an integer between 0 and ${MAX_TIMER_DELAY_MS}.`,
      { code: "InvalidInput" }
    )
  }
}
