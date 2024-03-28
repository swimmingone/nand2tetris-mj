import { describe, it, expect } from 'vitest';
import { translate } from '../src/translate';
import { translateDefaultOptions } from './testHelper';

describe('translate', () => {
  it('should support "push constant" only', () => {
    expect(() => translate('push local 9', translateDefaultOptions())).toThrow(
      new Error('Not implemented'),
    );
  });

  it('should not handle multiline vm codes', () => {
    expect(() => translate('push constant 7\npush constant 8', translateDefaultOptions())).toThrow(
      new Error('Not supported'),
    );
  });

  it('should translate "push constant 7"', () => {
    expect(translate('push constant 7', translateDefaultOptions())).toEqual(
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
    expect(translate('push constant 8', translateDefaultOptions())).toEqual(
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
    expect(translate('add', translateDefaultOptions())).toEqual(
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

  it('should handle "eq"', () => {
    let jumpCount = 0;
    expect(
      translate('eq', {
        jumpCount,
        setJumpCount: (count) => {
          jumpCount = count;
        },
      }),
    ).toEqual(
      `// eq
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// eq
   D=M-D
   @TRUE0
   D;JEQ

   @SP
   A=M
   M=0

   @END0
   0;JEQ

(TRUE0)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END0)
   @SP
   M=M+1
   `.trim(),
    );

    expect(jumpCount).toBe(1);
  });

  it('should handle "lt"', () => {
    let jumpCount = 0;
    expect(
      translate('lt', {
        jumpCount,
        setJumpCount: (count) => {
          jumpCount = count;
        },
      }),
    ).toEqual(
      `// lt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// lt
   D=M-D
   @TRUE0
   D;JLT

   @SP
   A=M
   M=0

   @END0
   0;JEQ

(TRUE0)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END0)
   @SP
   M=M+1
   `.trim(),
    );

    expect(jumpCount).toBe(1);
  });
});
