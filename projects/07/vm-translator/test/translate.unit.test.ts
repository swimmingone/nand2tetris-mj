import { describe, it, expect } from 'vitest';
import { translate } from '../src/translate';
import { translateDefaultOptions } from './testHelper';

describe('translate', () => {
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
   D=M+D

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

  it('should handle "gt"', () => {
    let jumpCount = 0;
    expect(
      translate('gt', {
        jumpCount,
        setJumpCount: (count) => {
          jumpCount = count;
        },
      }),
    ).toEqual(
      `// gt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// gt
   D=M-D
   @TRUE0
   D;JGT

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

  it('should handle "sub"', () => {
    expect(translate('sub', translateDefaultOptions())).toEqual(
      `// sub
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// sub
   D=M-D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1`.trim(),
    );
  });

  it('should handle "neg"', () => {
    expect(translate('neg', translateDefaultOptions())).toEqual(
      `// neg
// pop
   @SP
   M=M-1
   A=M
   D=M

// neg
   @0
   D=A-D

// push D to stack
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1`.trim(),
    );
  });

  it('should handle "and"', () => {
    expect(translate('and', translateDefaultOptions())).toEqual(
      `// and
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// and
   D=M&D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1`.trim(),
    );
  });

  it('should handle "or"', () => {
    expect(translate('or', translateDefaultOptions())).toEqual(
      `// or
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// or
   D=M|D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1`.trim(),
    );
  });

  it('should handle "not"', () => {
    expect(translate('not', translateDefaultOptions())).toEqual(
      `// not
// pop
   @SP
   M=M-1
   A=M
   D=M

// not
   D=!D

// push D to stack
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1`.trim(),
    );
  });
});
