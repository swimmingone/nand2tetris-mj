export const unary = (command: 'neg' | 'not'): string => {
  const instructions = (() => {
    switch (command) {
      case 'neg':
        return '@0\nD=A-D';
      case 'not':
        return 'D=!D';
    }
  })();

  const asm = `// ${command}
// pop
   @SP
   M=M-1
   A=M
   D=M

// ${command}
${instructions}

// push D to stack
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1`.trim();

  return asm;
};
