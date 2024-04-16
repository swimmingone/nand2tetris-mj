import { comparison } from './command/comparison';
import { logical } from './command/logical';
import { arithmatic } from './command/arithmatic';
import { unary } from './command/unary';
import { push } from './command/push';
import { MemoryAddressKind } from './command/memoryAddresses';
import { pop } from './command/pop';

export type TranslateOptions = {
  jumpCount: number;
  setJumpCount: (jc: number) => void;
};

const indent = '   ';
const fixIndent = (code: string) => {
  return code
    .split('\n')
    .map((eachLine) => {
      if (eachLine.trim().length === 0) {
        return '';
      }

      if (eachLine.startsWith('(') || eachLine.startsWith('//') || eachLine.startsWith(indent)) {
        return eachLine;
      }

      return indent + eachLine;
    })
    .join('\n');
};

export const translate = (code: string, options: TranslateOptions): string => {
  const _translate = (code: string, options: TranslateOptions): string => {
    if (code.includes('\n')) {
      throw new Error('Not supported');
    }

    if (code.startsWith('push ')) {
      const [_, memoryAddressKind, value] = code.split(' ');
      return push(memoryAddressKind as MemoryAddressKind, value);
    }

    if (code.startsWith('pop ')) {
      const [_, memoryAddressKind, value] = code.split(' ');
      return pop(memoryAddressKind as MemoryAddressKind, value.trim());
    }

    if (code.startsWith('label ')) {
      const [_, label] = code.split(' ');
      return `// label ${label}
(${label})`;
    }

    if (code.startsWith('if-goto ')) {
      const [_, label] = code.split(' ');
      return `// if-goto ${label}
   @SP
   A=M
   A=A-1
   D=M

// pop
   @SP
   M=M-1

// jump
   @${label}
   D;JNE // D=2`;
    }

    if (code.startsWith('goto ')) {
      const [_, label] = code.split(' ');
      return `// goto ${label}
   @${label}
   0;JMP`;
    }

    const zeroArgumentOperator = code.split(' ')[0];
    switch (zeroArgumentOperator) {
      case 'add':
      case 'sub':
        return arithmatic(zeroArgumentOperator);
      case 'and':
      case 'or':
        return logical(zeroArgumentOperator);
      case 'eq':
      case 'lt':
      case 'gt':
        return comparison(zeroArgumentOperator, options);
      case 'neg':
      case 'not':
        return unary(zeroArgumentOperator);
      default:
        throw new Error('Not implemented');
    }
  };

  return fixIndent(_translate(code, options));
};
