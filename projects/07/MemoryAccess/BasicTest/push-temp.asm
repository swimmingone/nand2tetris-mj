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

// pop temp 0
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of temp 0
   @R5
// set value to temp 0
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

// push temp 0
// calculate memory address temp 0
   @R5

// set D as value of temp 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
