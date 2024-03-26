// init
// RAM[SP] = 256
@256
D=A
@SP
M=D

// push constant 7
@7
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

// add
// pop to D
@SP
M=M-1 // SP--
A=M // get address
A=M // get value of the address
D=A // D = RAM[SP]

// pop to A
@SP
M=M-1 // SP--
A=M // get address
A=M // A = RAM[SP]

// RAM[SP] = D+A
D=D+A

@SP
A=M // A = RAM[SP]
M=D // RAM[A] = D

@SP // SP++
M=M+1 
