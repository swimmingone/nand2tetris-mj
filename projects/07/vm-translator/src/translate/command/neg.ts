export const neg = (): string => {
  const asm = `// neg
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
   M=M+1`.trim();

  return asm;
};
