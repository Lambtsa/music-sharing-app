import { createStableUUID } from '@/utils/uuid';

describe('UUID helper functions', () => {
  test('createStableUUID fn', () => {
    expect(createStableUUID('Hello world')).toBe(
      '9f6c9e82-badf-551d-843f-397aef0acb29'
    );
    expect(createStableUUID('Bonjour monde')).toBe(
      '74a88ac0-9724-5005-92bb-62b020b73683'
    );
    expect(createStableUUID('Hej världen')).toBe(
      '23e12204-ad73-5019-8bec-8215878818db'
    );
  });
});
