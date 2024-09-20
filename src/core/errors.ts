import { type userAgent } from 'next/server';
import pino, { type Logger } from 'pino';
import { z } from 'zod';

import type { MusicProviders } from '@/types/music';

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

export class GatewayError extends BaseError {
  statusCode = 502;
  type: MusicProviders;

  constructor({
    message,
    statusCode,
    type,
  }: Pick<ErrorDetails, 'message' | 'statusCode'> & { type: MusicProviders }) {
    super(message);
    this.message = message;
    this.name = 'InternalServerError';
    this.statusCode = statusCode;
    this.type = type;
    this.log({
      statusCode: this.statusCode,
      name: this.name,
      type: this.type,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
    });

    Object.setPrototypeOf(this, GatewayError.prototype);
  }
}

export class InternalServerError extends BaseError {
  statusCode = 500;
  url: string;
  userAgentInfo: ReturnType<typeof userAgent> | null;

  constructor({
    message,
    statusCode,
    url,
    userAgentInfo,
  }: ErrorDetails) {
    super(message);
    this.message = message;
    this.name = 'InternalServerError';
    this.statusCode = statusCode;
    this.url = url;
    this.userAgentInfo = userAgentInfo;
    this.log({
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      url: this.url,
      userAgent: this.userAgentInfo,
      timestamp: this.timestamp.toISOString(),
    });

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class BadRequestError extends BaseError {
  statusCode = 400;
  url: string;
  userAgentInfo: ReturnType<typeof userAgent> | null;

  constructor({
    message,
    statusCode,
    url,
    userAgentInfo,
  }: ErrorDetails) {
    super(message);
    this.message = message;
    this.name = 'BadRequestError';
    this.statusCode = statusCode;
    this.url = url;
    this.userAgentInfo = userAgentInfo;
    this.log({
      statusCode: this.statusCode,
      name: this.name,
      message: this.message,
      url: this.url,
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
