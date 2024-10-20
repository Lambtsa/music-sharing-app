import pino from 'pino';

import packageDetails from '@/../package.json';

import type { Logger } from './logger.types';

const loggerClient = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
  formatters: {
    level: (label) => {
      return {
        level: label,
      };
    },
  },
});

export const logger = loggerClient.child({
  '@version': packageDetails.version,
  name: 'com.stockholm-family.audiolinx.application.front',
});

export const setupLogger = (name = 'console'): Logger => {
  const logger = loggerClient.child({ name });

  const serverLogger: Logger = {
    debug(msg, obj) {
      logger.debug(obj, msg);
    },
    info(msg, obj) {
      logger.info(obj, msg);
    },
    warn(msg, obj) {
      logger.warn(obj, msg);
    },
    error(msg, obj) {
      logger.error(obj, msg);
    },
  };

  return serverLogger;
};
