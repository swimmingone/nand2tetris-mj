export const and = (): string => {
  return `// and
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
M=M+1`;
};
