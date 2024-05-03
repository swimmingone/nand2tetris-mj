// bootstrap
// set SP=256
   @256
   D=A
   @5
   D=D+A
   @SP
   M=D
// call Sys.init
   @Sys.init
   0;JMP

// function Sys.init 0
(Sys.init)
   @0
   D=A
   @Sys.init.init.end
   D;JEQ
(Sys.init.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Sys.init.init
   D;JNE
(Sys.init.init.end)

// push constant 4
   @4
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// call Main.fibonacci 1
   @Main.fibonacci.return.0
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @1
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Main.fibonacci
   @Main.fibonacci
   0;JMP
(Main.fibonacci.return.0)


// label END
(END)

// goto END
   @END
   0;JMP

// function Main.fibonacci 0
(Main.fibonacci)
   @0
   D=A
   @Main.fibonacci.init.end
   D;JEQ
(Main.fibonacci.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Main.fibonacci.init
   D;JNE
(Main.fibonacci.init.end)

// push argument 0
// calculate memory address argument 0
   @ARG
   D=M
   @0
   A=D+A

// set D as value of argument 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 2
   @2
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// lt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// lt
   D=M-D
   @TRUE1
   D;JLT

   @SP
   A=M
   M=0

   @END1
   0;JEQ

(TRUE1)
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
(END1)
   @SP
   M=M+1

// if-goto N_LT_2
   @SP
   A=M
   A=A-1
   D=M

// pop
   @SP
   M=M-1

// jump
   @N_LT_2
   D;JNE // D=2

// goto N_GE_2
   @N_GE_2
   0;JMP

// label N_LT_2
(N_LT_2)

// push argument 0
// calculate memory address argument 0
   @ARG
   D=M
   @0
   A=D+A

// set D as value of argument 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// return
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
   0;JMP

// label N_GE_2
(N_GE_2)

// push argument 0
// calculate memory address argument 0
   @ARG
   D=M
   @0
   A=D+A

// set D as value of argument 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 2
   @2
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// sub
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// sub
   D=M-D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// call Main.fibonacci 1
   @Main.fibonacci.return.2
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @1
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Main.fibonacci
   @Main.fibonacci
   0;JMP
(Main.fibonacci.return.2)


// push argument 0
// calculate memory address argument 0
   @ARG
   D=M
   @0
   A=D+A

// set D as value of argument 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 1
   @1
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// sub
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// sub
   D=M-D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// call Main.fibonacci 1
   @Main.fibonacci.return.3
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @1
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Main.fibonacci
   @Main.fibonacci
   0;JMP
(Main.fibonacci.return.3)


// add
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// add
   D=M+D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// return
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
   0;JMP
