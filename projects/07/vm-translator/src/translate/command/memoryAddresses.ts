export const memoryAddresses = {
  constant: 'SP',
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
  temp: (index: number) => `R${5 + index}`,
  pointer: (index: number) => (index === 0 ? 'THIS' : 'THAT'),
} as const;

export type MemoryAddressKind = keyof typeof memoryAddresses;