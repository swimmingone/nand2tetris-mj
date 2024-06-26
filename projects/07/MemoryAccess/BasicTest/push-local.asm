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

// push constant 10
   @10
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop local 0
// get memory address of local 0
   @LCL
   D=M
   @0
   D=D+A
// save memory address to R13
   @R13
   M=D

// pop to D
   @SP
   M=M-1
   A=M
   D=M

// set A to memory address
   @R13
   A=M

// set value to local 0
   M=D

// push constant 11
   @11
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

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

