import { describe, expect, it } from 'vitest';
import { jackTokenizer } from '../src/jackTokenizer';

describe('jackTokenizer', () => {
  it('should pass', () => {
    expect(jackTokenizer('jack code here')).toBe('<xml>...</xml>');
  });
});
