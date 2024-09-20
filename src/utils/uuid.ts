import { v5 as uuid } from 'uuid';

/**
 * Create a stable UUID from a string (only needed in client)
 */
export const createStableUUID = (input: string): string => {
  const namespace = 'deeabe8e-7ff4-4b23-805d-e0d1ff1d6678';
  return uuid(input, namespace);
};
