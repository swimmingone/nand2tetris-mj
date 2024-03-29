export const arithmatic = (command: 'add' | 'sub'): string => {
  const operator = (() => {
    switch (command) {
      case 'add':
        return '+';
      case 'sub':
        return '-';
    }
  })();

  return `// ${command}
// pop to D
@SP
M=M-1
A=M
D=M

// pop to A
@SP
M=M-1
A=M

// ${command}
D=M${operator}D

// push
@SP
A=M
M=D
// SP++
@SP
M=M+1`;
};
