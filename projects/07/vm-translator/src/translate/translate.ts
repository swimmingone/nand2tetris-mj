import { comparison } from './command/comparison';
import { logical } from './command/logical';
import { arithmatic } from './command/arithmatic';
import { unary } from './command/unary';
import { push } from './command/push';
import { MemoryAddressKind } from './command/memoryAddresses';
import { pop } from './command/pop';
import { rt } from './command/return';

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

    if (code.startsWith('function ')) {
      const [_, functionName, localVariablesCount] = code.split(' ');
      return `// function ${functionName} ${localVariablesCount}
(${functionName})
   @${localVariablesCount}
   D=A
   @${functionName}.init.end
   D;JEQ
(${functionName}.init)
   @SP
   A=M
   M=0
   @SP
   M=M+1

   D=D-1
   @${functionName}.init
   D;JNE
(${functionName}.init.end)`;
    }

    if (code.startsWith('call ')) {
      const pushDToStack = () => `
   @SP
   A=M
   M=D
   @SP
   M=M+1`;

      const jumpCount = options.jumpCount;
      options.setJumpCount(options.jumpCount + 1);

      const [_, functionName, argumentsCount] = code.split(' ');
      return `// call ${functionName} ${argumentsCount}
   @${functionName}.return.${jumpCount}
   D=A
   // save caller's environments
${pushDToStack()}
   @LCL
   D=M
${pushDToStack()}
   @ARG
   D=M
${pushDToStack()}
   @THIS
   D=M
${pushDToStack()}
   @THAT
   D=M
${pushDToStack()}
// update ARG and LCL for callee
// ARG = SP - 5 - nArgs
   @SP
   D=M
   @5
   D=D-A
   @${argumentsCount}
   D=D-A
   @ARG
   M=D
// LCL = SP
   @SP
   D=M
   @LCL
   M=D
// goto function ${functionName}
   @${functionName}
   0;JMP
(${functionName}.return.${jumpCount})
   `;
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
      case 'return':
        return rt();
      default:
        throw new Error('Not implemented');
    }
  };

  return fixIndent(_translate(code, options));
};
