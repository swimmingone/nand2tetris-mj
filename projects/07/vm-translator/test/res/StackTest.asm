// push constant 17
   @17
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 17
   @17
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// eq
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// eq
   D=M-D
   @TRUE0
   D;JEQ

   @SP
   A=M
   M=0

   @END0
   0;JEQ

(TRUE0)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END0)
   @SP
   M=M+1

// push constant 17
   @17
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 16
   @16
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// eq
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// eq
   D=M-D
   @TRUE1
   D;JEQ

   @SP
   A=M
   M=0

   @END1
   0;JEQ

(TRUE1)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END1)
   @SP
   M=M+1

// push constant 16
   @16
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 17
   @17
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// eq
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// eq
   D=M-D
   @TRUE2
   D;JEQ

   @SP
   A=M
   M=0

   @END2
   0;JEQ

(TRUE2)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END2)
   @SP
   M=M+1

// push constant 892
   @892
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 891
   @891
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// lt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// lt
   D=M-D
   @TRUE3
   D;JLT

   @SP
   A=M
   M=0

   @END3
   0;JEQ

(TRUE3)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END3)
   @SP
   M=M+1

// push constant 891
   @891
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 892
   @892
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// lt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// lt
   D=M-D
   @TRUE4
   D;JLT

   @SP
   A=M
   M=0

   @END4
   0;JEQ

(TRUE4)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END4)
   @SP
   M=M+1

// push constant 891
   @891
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 891
   @891
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// lt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// lt
   D=M-D
   @TRUE5
   D;JLT

   @SP
   A=M
   M=0

   @END5
   0;JEQ

(TRUE5)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END5)
   @SP
   M=M+1

// push constant 32767
   @32767
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 32766
   @32766
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// gt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// gt
   D=M-D
   @TRUE6
   D;JGT

   @SP
   A=M
   M=0

   @END6
   0;JEQ

(TRUE6)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END6)
   @SP
   M=M+1

// push constant 32766
   @32766
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 32767
   @32767
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// gt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// gt
   D=M-D
   @TRUE7
   D;JGT

   @SP
   A=M
   M=0

   @END7
   0;JEQ

(TRUE7)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END7)
   @SP
   M=M+1

// push constant 32766
   @32766
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 32766
   @32766
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// gt
// pop
   @SP
   M=M-1
   A=M
   D=M

// pop
   @SP
   M=M-1
   A=M

// gt
   D=M-D
   @TRUE8
   D;JGT

   @SP
   A=M
   M=0

   @END8
   0;JEQ

(TRUE8)
   @0
   A=A-1
   D=A
   @SP
   A=M
   M=D

   @SP
   A=M
   M=D
// SP++
(END8)
   @SP
   M=M+1

// push constant 57
   @57
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 31
   @31
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 53
   @53
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

// push constant 112
   @112
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

// and
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// and
   D=M&D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// push constant 82
   @82
   D=A
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// or
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// pop to A
   @SP
   M=M-1
   A=M

// or
   D=M|D

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1

// not
// pop
   @SP
   M=M-1
   A=M
   D=M

// not
   D=!D

// push D to stack
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
