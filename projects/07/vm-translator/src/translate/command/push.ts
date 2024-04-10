import { memoryAddresses, MemoryAddressKind } from './memoryAddresses';

export const push = (kind: MemoryAddressKind, value: string): string => {
  if (kind === 'constant') {
    return `
  // push ${kind} ${value}
@${value}
D=A
@${memoryAddresses[kind]}
A=M
M=D
// ${memoryAddresses[kind]}++
@${memoryAddresses[kind]}
M=M+1
  `.trim();
  }

  if (kind === 'temp' || kind === 'pointer' || kind === 'static') {
    return `
// push ${kind} ${value}
// calculate memory address ${kind} ${value}
   @${memoryAddresses[kind](Number(value))}

// set D as value of ${kind} ${value}
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
    `.trim();
  }

  return `
// push ${kind} ${value}
// calculate memory address ${kind} ${value}
   @${memoryAddresses[kind]}
   D=M
   @${value}
   A=D+A

// set D as value of ${kind} ${value}
   D=M

// push
   @SP
   A=M
   M=D
// SP++
   @SP
   M=M+1
    `.trim();
};
