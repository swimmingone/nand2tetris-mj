import { TranslateOptions } from '../translate';

export const comparison = (command: 'eq' | 'lt' | 'gt', options: TranslateOptions): string => {
  const instruction = (() => {
    switch (command) {
      case 'eq':
        return 'JEQ';
      case 'lt':
        return 'JLT';
      case 'gt':
        return 'JGT';
    }
  })();

  const asm = `// ${command}
// pop
   @SP
   M=M-1
   A=M
   D=M
   
// pop
   @SP
   M=M-1
   A=M
   
// ${command}
   D=M-D
   @TRUE${options.jumpCount}
   D;${instruction}

   @SP
   A=M
   M=0
   
   @END${options.jumpCount}
   0;JEQ
   
(TRUE${options.jumpCount})
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D
   
   @SP
   A=M
   M=D
// SP++
(END${options.jumpCount})
   @SP
   M=M+1
   `.trim();

  options.setJumpCount(options.jumpCount + 1);
  return asm;
};
