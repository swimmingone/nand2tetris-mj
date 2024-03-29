import { TranslateOptions } from '../translate';

export const gt = (options: TranslateOptions): string => {
  const asm = `// gt
// pop
   @SP
   M=M-1
   A=M
   D=M
   
// pop
   @SP
   M=M-1
   A=M
   
// gt
   D=M-D
   @TRUE${options.jumpCount}
   D;JGT

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
