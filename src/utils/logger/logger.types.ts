/**
 * Base metadata allowed in all logs
 */
export interface LogContext {
  status?: number;
  path?: string;
  userId?: string;
  [key: string]: unknown; // Allow other specific metadata
}

/**
 * Specifically for Errors to ensure stack traces are captured
 */
export interface ErrorContext extends LogContext {
  err: Error;
  requestId?: string;
}

export interface Logger {
  debug: (msg: string, obj?: LogContext) => void;
  info: (msg: string, obj?: LogContext) => void;
  warn: (msg: string, obj?: LogContext) => void;
  error: (msg: string, obj: ErrorContext) => void;
}
