import { pushConstant } from './command/push/constant';
import { add } from './command/add';
import { sub } from './command/sub';
import { and } from './command/and';
import { or } from './command/or';
import { eq } from './command/eq';
import { lt } from './command/lt';
import { gt } from './command/gt';
import { neg } from './command/neg';
import { not } from './command/not';

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

    if (code.startsWith('push constant ')) {
      const value = code.split('push constant ')[1];
      return pushConstant(value);
    }

    switch (code) {
      case 'add':
        return add();
      case 'sub':
        return sub();
      case 'and':
        return and();
      case 'or':
        return or();
      case 'eq':
        return eq(options);
      case 'lt':
        return lt(options);
      case 'gt':
        return gt(options);
      case 'neg':
        return neg();
      case 'not':
        return not();
      default:
        throw new Error('Not implemented');
    }
  };

  return fixIndent(_translate(code, options));
};
