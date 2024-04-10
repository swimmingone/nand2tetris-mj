// push constant 3030
   @3030
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop pointer 0
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of pointer 0
   @THIS
// set value to pointer 0
   M=D

// push constant 3040
   @3040
   D=A
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

// push constant 32
   @32
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop this 2
// get memory address of this 2
   @THIS
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

// set value to this 2
   M=D

// push constant 46
   @46
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop that 6
// get memory address of that 6
   @THAT
   D=M
   @6
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

// set value to that 6
   M=D

// push pointer 0
// calculate memory address pointer 0
   @THIS

// set D as value of pointer 0
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

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

// push this 2
// calculate memory address this 2
   @THIS
   D=M
   @2
   A=D+A

// set D as value of this 2
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

// push that 6
// calculate memory address that 6
   @THAT
   D=M
   @6
   A=D+A

// set D as value of that 6
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
