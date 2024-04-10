import { memoryAddresses, MemoryAddressKind } from '../memoryAddresses';

export const pop =
  (kind: MemoryAddressKind) =>
  (value: string): string => {
    if (kind === 'constant') {
      throw new Error('Not implemented');
    }

    if (kind === 'temp') {
      return `
// pop ${kind} ${value}
// pop to D
   @SP
   M=M-1
   A=M
   D=M

// get memory address of ${kind} ${value}
   @${memoryAddresses[kind](Number(value))}
// set value to ${kind} ${value}
   M=D
`.trim();
    }

    return `
// pop ${kind} ${value}
// get memory address of ${kind} ${value}
   @${memoryAddresses[kind]}
   D=M
   @${value}
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

// set value to ${kind} ${value}
   M=D
`.trim();
  };
