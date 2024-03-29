export const pushConstant = (value: string): string => {
  return `
  // push constant ${value}
@${value}
D=A
@SP
A=M
M=D
// SP++
@SP
M=M+1
  `.trim();
};
