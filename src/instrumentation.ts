import * as Sentry from '@sentry/nextjs';

import { setupLogger } from './utils/logger/logger';

export async function register(): Promise<void> {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    setupLogger();
    await import('../sentry.server.config');
  }

  if (process.env['NEXT_RUNTIME'] === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
