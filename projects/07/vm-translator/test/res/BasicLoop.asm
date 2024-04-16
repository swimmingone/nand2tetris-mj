// push constant 0
   @0
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

// label LOOP
(LOOP)

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

// pop argument 0
// get memory address of argument 0
   @ARG
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

// set value to argument 0
   M=D

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

// if-goto LOOP
   @SP
   A=M
   A=A-1
   D=M

// pop
   @SP
   M=M-1

// jump
   @LOOP
   D;JNE // D=2

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
