export const not = (): string => {
  const asm = `// not
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
   M=M+1`.trim();

  return asm;
};
