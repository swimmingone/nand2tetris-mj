// init
   @256
   D=A
   @SP
   M=D
   
   // push
   @892
   D=A
   @SP
   A=M
   M=D
   // SP++
   @SP
   M=M+1
   
   // push
   @891
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
   
   // lt
   D=M-D
   @TRUE0
   D;JLT

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
   
   
