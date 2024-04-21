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

  // TODO: 파일이 달라지면 static 영역이 달라져야 한다.
  //  정확히는 클래스별로 static 영역이 달라져야 한다.
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
