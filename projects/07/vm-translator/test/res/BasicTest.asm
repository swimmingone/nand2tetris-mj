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

// push constant 21
   @21
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 22
   @22
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop argument 2
// get memory address of argument 2
   @ARG
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

// set value to argument 2
   M=D

// pop argument 1
// get memory address of argument 1
   @ARG
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

// set value to argument 1
   M=D

// push constant 36
   @36
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop this 6
// get memory address of this 6
   @THIS
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

// set value to this 6
   M=D

// push constant 42
   @42
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 45
   @45
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop that 5
// get memory address of that 5
   @THAT
   D=M
   @5
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

// set value to that 5
   M=D

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

// push constant 510
   @510
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// pop temp 6
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of temp 6
   @R11
// set value to temp 6
   M=D

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

// push that 5
// calculate memory address that 5
   @THAT
   D=M
   @5
   A=D+A

// set D as value of that 5
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

// push this 6
// calculate memory address this 6
   @THIS
   D=M
   @6
   A=D+A

// set D as value of this 6
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push this 6
// calculate memory address this 6
   @THIS
   D=M
   @6
   A=D+A

// set D as value of this 6
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

// push temp 6
// calculate memory address temp 6
   @R11

// set D as value of temp 6
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
