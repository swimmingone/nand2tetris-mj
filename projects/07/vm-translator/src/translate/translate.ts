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
      return pop(memoryAddressKind as MemoryAddressKind, value);
    }

    switch (code) {
      case 'add':
      case 'sub':
        return arithmatic(code);
      case 'and':
      case 'or':
        return logical(code);
      case 'eq':
      case 'lt':
      case 'gt':
        return comparison(code, options);
      case 'neg':
      case 'not':
        return unary(code);
      default:
        throw new Error('Not implemented');
    }
  };

  return fixIndent(_translate(code, options));
};
