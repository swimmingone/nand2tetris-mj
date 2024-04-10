// push constant 111
   @111
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 333
   @333
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 888
   @888
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop static 8
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of static 8
   @24
// set value to static 8
   M=D

// pop static 3
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of static 3
   @19
// set value to static 3
   M=D

// pop static 1
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of static 1
   @17
// set value to static 1
   M=D

// push static 3
// calculate memory address static 3
   @19

// set D as value of static 3
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push static 1
// calculate memory address static 1
   @17

// set D as value of static 1
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

// push static 8
// calculate memory address static 8
   @24

// set D as value of static 8
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
