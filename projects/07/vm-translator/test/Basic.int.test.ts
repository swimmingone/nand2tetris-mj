import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';

describe('Basic', () => {
  it('should print assembly code for BasicTest', async () => {
    const stackTestVm = `
push constant 1
push local 2
push argument 3
push this 4
push that 5
`.trim();
    const stackTestAsm = `
// push constant 1
   @1
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push local 2
   @2
   D=A
   @LCL
   A=M
   M=D
// LCL++
   @LCL
   M=M+1

// push argument 3
   @3
   D=A
   @ARG
   A=M
   M=D
// ARG++
   @ARG
   M=M+1

// push this 4
   @4
   D=A
   @THIS
   A=M
   M=D
// THIS++
   @THIS
   M=M+1

// push that 5
   @5
   D=A
   @THAT
   A=M
   M=D
// THAT++
   @THAT
   M=M+1
`;

    const vmCommandSplit = stackTestVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    let count = 0;
    const actualAsm = vmCommandSplit
      .map((it) =>
        translate(it, {
          jumpCount: count,
          setJumpCount: (c) => {
            count = c;
          },
        }),
      )
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(stackTestAsm.trim());
  });
});
