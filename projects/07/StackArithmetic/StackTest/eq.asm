// init
   @256
   D=A
   @SP
   M=D
   
   // push
   @17
   D=A
   @SP
   A=M
   M=D
   // SP++
   @SP
   M=M+1
   
   // push
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
   D=D-M
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
   
   
