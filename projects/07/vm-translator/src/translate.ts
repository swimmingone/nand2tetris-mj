export const translate = (code: string): string[] => {
  if (code.includes('\n')) {
    throw new Error('Not supported');
  }

  if (code.startsWith('push constant ')) {
    const value = code.split('push constant ')[1];

    return `
  // push constant ${value}
@${value}
D=A
@SP
A=M
M=D
// SP++
@SP
M=M+1
  `
      .trim()
      .split('\n');
  }

  if (code === 'add') {
    return `// add
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
M=M+1`.split('\n');
  }

  throw new Error('Not implemented');
};
