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
M=M-1
A=M
D=M

// pop to A
@SP
M=M-1
A=M

// add
D=D+M

// push
@SP
A=M
M=D
// SP++
@SP
M=M+1
