import { memoryAddresses, MemoryAddressKind } from '../memoryAddresses';

export const push =
  (kind: MemoryAddressKind) =>
  (value: string): string => {
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

    throw new Error('Not implemented');
  };
