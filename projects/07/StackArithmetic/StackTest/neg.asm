// init
   @256
   D=A
   @SP
   M=D

// push contant 28
   @28
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// neg
// pop
   @SP
   M=M-1
   A=M
   D=M

// neg
   @0
   D=A-D

// push D to stack
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
