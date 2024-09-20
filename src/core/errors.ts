import { type userAgent } from 'next/server';
import pino, { type Logger } from 'pino';
import { z } from 'zod';

export enum ErrorMessages {
  AuthenticationError = 'Authentication failed',
  ApiServerError = 'Api error',
  InternalServer = 'Internal Server Error',
  ApiResponseTypeError = 'Issue with the format of the response from Api',
  Unauthorized = 'No authorised session',
}

type ErrorDetails = {
  message: string;
  statusCode: number;
  url: string;
  userId: string;
  userAgentInfo: ReturnType<typeof userAgent> | null;
};

export class BaseError extends Error {
  logger: Logger = pino();
  timestamp: Date;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'BaseError';
    this.timestamp = new Date();

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  log(input: Record<string, unknown>) {
    this.logger.error(input);
  }
}

export class InternalServerError extends BaseError {
  statusCode = 500;
  userId: string;
  url: string;
  userAgentInfo: ReturnType<typeof userAgent> | null;

  constructor({
    message,
    statusCode,
    userId,
    url,
    userAgentInfo,
  }: ErrorDetails) {
    super(message);
    this.message = message;
    this.name = 'InternalServerError';
    this.statusCode = statusCode;
    this.userId = userId;
    this.url = url;
    this.userAgentInfo = userAgentInfo;
    this.log({
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      url: this.url,
      userId: this.userId,
      userAgent: this.userAgentInfo,
      timestamp: this.timestamp.toISOString(),
    });

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class BadRequestError extends BaseError {
  statusCode = 400;
  userId: string;
  url: string;
  userAgentInfo: ReturnType<typeof userAgent> | null;

  constructor({
    message,
    statusCode,
    userId,
    url,
    userAgentInfo,
  }: ErrorDetails) {
    super(message);
    this.message = message;
    this.name = 'BadRequestError';
    this.statusCode = statusCode;
    this.userId = userId;
    this.url = url;
    this.userAgentInfo = userAgentInfo;
    this.log({
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      url: this.url,
      userId: this.userId,
      userAgent: this.userAgentInfo,
      timestamp: this.timestamp.toISOString(),
    });

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Global error handler
 */
export const globalApiErrorHandler = (err: unknown): Response => {
  switch (true) {
    case err instanceof BadRequestError:
    case err instanceof InternalServerError: {
      return new Response(err.message, {
        status: err.statusCode,
        statusText: err.message,
        timestamp: err.timestamp.toISOString(),
      });
    }
    case err instanceof z.ZodError: {
      return new Response(err.message, {
        status: 400,
        statusText: err.message,
        timestamp: new Date().toISOString(),
      });
    }
    default: {
      console.error({
        status: 500,
        err,
      });
      return new Response(ErrorMessages.InternalServer, {
        status: 500,
        timestamp: new Date().toISOString(),
      });
    }
  }
};
