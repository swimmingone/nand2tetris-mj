// bootstrap
// set SP=256
   @256
   D=A
   @5
   D=D+A
   @SP
   M=D
// call Sys.init
   @Sys.init
   0;JMP

// function Sys.init 0
(Sys.init)
   @0
   D=A
   @Sys.init.init.end
   D;JEQ
(Sys.init.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Sys.init.init
   D;JNE
(Sys.init.init.end)

// push constant 6
   @6
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 8
   @8
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// call Class1.set 2
   @Class1.set.return.0
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @2
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Class1.set
   @Class1.set
   0;JMP
(Class1.set.return.0)


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

// push constant 23
   @23
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 15
   @15
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// call Class2.set 2
   @Class2.set.return.1
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @2
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Class2.set
   @Class2.set
   0;JMP
(Class2.set.return.1)


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

// call Class1.get 0
   @Class1.get.return.2
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @0
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Class1.get
   @Class1.get
   0;JMP
(Class1.get.return.2)


// call Class2.get 0
   @Class2.get.return.3
   D=A
   // save caller's environments

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @LCL
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @ARG
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THIS
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
   @THAT
   D=M

   @SP
   A=M
   M=D
   @SP
   M=M+1
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @0
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function Class2.get
   @Class2.get
   0;JMP
(Class2.get.return.3)


// label END
(END)

// goto END
   @END
   0;JMP

// function Class1.set 0
(Class1.set)
   @0
   D=A
   @Class1.set.init.end
   D;JEQ
(Class1.set.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Class1.set.init
   D;JNE
(Class1.set.init.end)

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

// pop static 0
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of static 0
   @16
// set value to static 0
   M=D

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

// push constant 0
   @0
   D=A
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
   A=D
   D=M
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

// function Class1.get 0
(Class1.get)
   @0
   D=A
   @Class1.get.init.end
   D;JEQ
(Class1.get.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Class1.get.init
   D;JNE
(Class1.get.init.end)

// push static 0
// calculate memory address static 0
   @16

// set D as value of static 0
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
   A=D
   D=M
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

// function Class2.set 0
(Class2.set)
   @0
   D=A
   @Class2.set.init.end
   D;JEQ
(Class2.set.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Class2.set.init
   D;JNE
(Class2.set.init.end)

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

// pop static 0
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of static 0
   @16
// set value to static 0
   M=D

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

// push constant 0
   @0
   D=A
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
   A=D
   D=M
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

// function Class2.get 0
(Class2.get)
   @0
   D=A
   @Class2.get.init.end
   D;JEQ
(Class2.get.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @Class2.get.init
   D;JNE
(Class2.get.init.end)

// push static 0
// calculate memory address static 0
   @16

// set D as value of static 0
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
   A=D
   D=M
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
