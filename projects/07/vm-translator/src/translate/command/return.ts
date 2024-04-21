export const rt = (): string => `// return
// frame = LCL
   @LCL
   D=M
   @R13 // frame
   M=D
// retAddr = *(frame-5)
   @R13
   D=M
   @5
   D=D-A
   A=D
   D=M
   @R14 // retAddr
   M=D
// *ARG = pop()
   @SP
   M=M-1
   A=M
   D=M // D = pop()
   @ARG
   A=M
   M=D // *ARG = D
// SP=ARG+1
   @ARG
   D=M+1 // D = ARG+1
   @SP
   M=D
// THAT = *(frame-1)
   @R13
   D=M-1
   A=D
   D=M
   @THAT
   M=D
// THIS = *(frame-2)
   @R13
   D=M
   @2
   A=D-A
   D=M
   @THIS
   M=D
// ARG = *(frame-3)
   @R13
   D=M
   @3
   A=D-A
   D=M
   @ARG
   M=D
// LCL = *(frame-4)
   @R13
   D=M
   @4
   A=D-A
   D=M
   @LCL
   M=D
// goto retAddr
   @R14
   A=M
   0;JMP`;
