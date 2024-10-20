export interface LogFn {
  (msg: string, obj?: object): void;
}

export interface Logger {
  debug: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
}
