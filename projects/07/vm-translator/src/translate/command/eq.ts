import { TranslateOptions } from '../translate';

export const eq = (options: TranslateOptions): string => {
  const asm = `// eq
// pop
   @SP
   M=M-1
   A=M
   D=M
   
// pop
   @SP
   M=M-1
   A=M
   
// eq
   D=M-D
   @TRUE${options.jumpCount}
   D;JEQ

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
