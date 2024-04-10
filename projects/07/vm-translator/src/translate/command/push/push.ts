const pushes = {
  constant: 'SP',
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
  temp: 'temp',
} as const;

export type PushKind = keyof typeof pushes;

export const push =
  (kind: PushKind) =>
  (value: string): string => {
    if (kind === 'constant') {
      return `
  // push ${kind} ${value}
@${value}
D=A
@${pushes[kind]}
A=M
M=D
// ${pushes[kind]}++
@${pushes[kind]}
M=M+1
  `.trim();
    }

    throw new Error('Not implemented');
  };
