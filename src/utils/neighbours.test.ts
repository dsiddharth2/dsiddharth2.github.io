import { describe, expect, it } from 'vitest';
import { neighbours } from '@/utils/neighbours';

describe('neighbours', () => {
  const list = ['a', 'b', 'c'];

  it('returns the adjacent items', () => {
    expect(neighbours(list, 'b')).toEqual({ prev: 'a', next: 'c' });
  });

  it('wraps at both ends', () => {
    expect(neighbours(list, 'a')).toEqual({ prev: 'c', next: 'b' });
    expect(neighbours(list, 'c')).toEqual({ prev: 'b', next: 'a' });
  });

  it('throws for an item that is not in the list', () => {
    expect(() => neighbours(list, 'z')).toThrow();
  });
});
