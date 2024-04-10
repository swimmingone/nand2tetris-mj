import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { translateDefaultOptions } from './testHelper';

describe('Basic', () => {
  it('should print assembly code for pop temp', async () => {
    const popVm = `
push constant 10
pop temp 0
push constant 11
pop temp 1
`.trim();
    const popAsm = `
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

// pop temp 1
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of temp 1
   @R6
// set value to temp 1
   M=D
    `.trim();

    const vmCommandSplit = popVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(popAsm.trim());
  });

  it('should print assembly code for pop local', async () => {
    const popVm = `
push constant 10
pop local 0
push constant 11
pop local 1
`.trim();
    const popAsm = `
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

// pop local 1
// get memory address of local 1
   @LCL
   D=M
   @1
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

// set value to local 1
   M=D
    `.trim();

    const vmCommandSplit = popVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(popAsm.trim());
  });
});
