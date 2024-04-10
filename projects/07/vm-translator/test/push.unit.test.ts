import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { translateDefaultOptions } from './testHelper';

describe('Basic', () => {
  it('should print assembly code for push temp', async () => {
    // temp 0에 10을 넣어놓고 스택에 11을 넣은뒤 다시 스택에 temp 0의 값(10)을 넣는다.
    // 스택의 상태는 11, 10이다.
    const pushVm = `
push constant 10
pop temp 0
push constant 11
push temp 0
`.trim();
    const pushAsm = `
// push constant 10
   @10
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop temp 0
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of temp 0
   @R5
// set value to temp 0
   M=D

// push constant 11
   @11
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push temp 0
// calculate memory address temp 0
   @R5

// set D as value of temp 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
    `.trim();

    const vmCommandSplit = pushVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(pushAsm.trim());
  });

  it('should print assembly code for push local', async () => {
    // local 0에 10을 넣어놓고 스택에 11을 넣은뒤 다시 스택에 local 0의 값(10)을 넣는다.
    // 스택의 상태는 11, 10이다.
    const pushVm = `
push constant 10
pop local 0
push constant 11
push local 0
`.trim();
    const pushAsm = `
// push constant 10
   @10
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop local 0
// get memory address of local 0
   @LCL
   D=M
   @0
   D=D+A
// save memory address to R13
   @R13
   M=D

// pop to D
   @SP
   M=M-1
   A=M
   D=M

// set A to memory address
   @R13
   A=M

// set value to local 0
   M=D

// push constant 11
   @11
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push local 0
// calculate memory address local 0
   @LCL
   D=M
   @0
   A=D+A

// set D as value of local 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
    `.trim();

    const vmCommandSplit = pushVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(pushAsm.trim());
  });
});
