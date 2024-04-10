// init
   @256
   D=A
   @SP
   M=D

   @300
   D=A
   @LCL
   M=D

   @400
   D=A
   @ARG
   M=D

   @3000
   D=A
   @THIS
   M=D

   @3010
   D=A
   @THAT
   M=D

// push constant 1
   @1
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push local 2
   @2
   D=A
   @LCL
   A=M
   M=D
// LCL++
   @LCL
   M=M+1

// push argument 3
   @3
   D=A
   @ARG
   A=M
   M=D
// ARG++
   @ARG
   M=M+1

// push this 4
   @4
   D=A
   @THIS
   A=M
   M=D
// THIS++
   @THIS
   M=M+1

// push that 5
   @5
   D=A
   @THAT
   A=M
   M=D
// THAT++
   @THAT
   M=M+1
