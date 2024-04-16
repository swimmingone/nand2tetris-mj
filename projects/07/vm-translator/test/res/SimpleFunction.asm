// function SimpleFunction.test 2
   @2
   D=A
(SimpleFunction.test.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @SimpleFunction.test.init
   D;JNE

// push local 0
// calculate memory address local 0
   @LCL
   D=M
   @0
   A=D+A

// set D as value of local 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push local 1
// calculate memory address local 1
   @LCL
   D=M
   @1
   A=D+A

// set D as value of local 1
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

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

// not
// pop
   @SP
   M=M-1
   A=M
   D=M

// not
   D=!D

// push D to stack
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

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

// push argument 1
// calculate memory address argument 1
   @ARG
   D=M
   @1
   A=D+A

// set D as value of argument 1
   D=M

// push
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
