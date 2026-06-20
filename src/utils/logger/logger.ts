import pino from "pino";

import {
  ErrorContext, LogContext, Logger 
} from "./logger.types";

const isDevelopment = process.env.NODE_ENV === "development";
const isServer = typeof window === "undefined";

// 1. Completely fresh, standard Pino initialization
const pinoInstance = pino({
  name: "Audiolinx",
  level: process.env.APP_LOG_LEVEL ?? (isDevelopment ? "debug" : "info"),
  base: isServer ? {
    env: process.env.NODE_ENV 
  } : undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isDevelopment && isServer
    ? {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname",
      },
    }
    : undefined,
  browser: {
    asObject: true,
    disabled: !isDevelopment,
  },
});

export const logger: Logger = {
  debug: (msg: string, obj?: LogContext) => {
    if (obj) pinoInstance.debug(obj, msg);
    else pinoInstance.debug(msg);
  },
  info: (msg: string, obj?: LogContext) => {
    if (obj) pinoInstance.info(obj, msg);
    else pinoInstance.info(msg);
  },
  warn: (msg: string, obj?: LogContext) => {
    if (obj) pinoInstance.warn(obj, msg);
    else pinoInstance.warn(msg);
  },
  error: (msg: string, obj: ErrorContext) => {
    pinoInstance.error(obj, msg);
  },
};