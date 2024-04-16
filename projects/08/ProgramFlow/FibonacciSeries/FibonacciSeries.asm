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

// pop pointer 1
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of pointer 1
   @THAT
// set value to pointer 1
   M=D

// push constant 0
   @0
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop that 0
// get memory address of that 0
   @THAT
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

// set value to that 0
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

// pop that 1
// get memory address of that 1
   @THAT
   D=M
   @1
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

// set value to that 1
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

// if-goto COMPUTE_ELEMENT
   @SP
   A=M
   A=A-1
   D=M

// pop
   @SP
   M=M-1

// jump
   @COMPUTE_ELEMENT
   D;JNE // D=2

// goto END
   @END
   0;JMP

// label COMPUTE_ELEMENT
(COMPUTE_ELEMENT)

// push that 0
// calculate memory address that 0
   @THAT
   D=M
   @0
   A=D+A

// set D as value of that 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push that 1
// calculate memory address that 1
   @THAT
   D=M
   @1
   A=D+A

// set D as value of that 1
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

// pop that 2
// get memory address of that 2
   @THAT
   D=M
   @2
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

// set value to that 2
   M=D

// push pointer 1
// calculate memory address pointer 1
   @THAT

// set D as value of pointer 1
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

// pop pointer 1
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of pointer 1
   @THAT
// set value to pointer 1
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

// goto LOOP
   @LOOP
   0;JMP

// label END
(END)
