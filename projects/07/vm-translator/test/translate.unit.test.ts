import { describe, it, expect } from 'vitest';
import { translate } from '../src/translate';

describe('translate', () => {
  it('should support "push constant" only', () => {
    expect(() => translate('push local 9')).toThrow(new Error('Not implemented'));
  });

  it('should not handle multiline vm codes', () => {
    expect(() => translate('push constant 7\npush constant 8')).toThrow(new Error('Not supported'));
  });

  it('should translate "push constant 7"', () => {
    expect(translate('push constant 7')).toEqual(
      `
// push constant 7
@7
D=A
@SP
A=M
M=D
// SP++
@SP
M=M+1
    `.trim(),
    );
  });

  it('should translate "push constant 8"', () => {
    expect(translate('push constant 8')).toEqual(
      `
// push constant 8
@8
D=A
@SP
A=M
M=D
// SP++
@SP
M=M+1
    `.trim(),
    );
  });

  it('should handle "add"', () => {
    expect(translate('add')).toEqual(
      `// add
// pop to D
@SP
M=M-1
A=M
D=M

// pop to A
@SP
M=M-1
A=M

// add
D=D+M

// push
@SP
A=M
M=D
// SP++
@SP
M=M+1`.trim(),
    );
  });
});
