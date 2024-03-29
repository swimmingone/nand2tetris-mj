export const or = (): string => {
  return `// or
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
M=M+1`;
};
