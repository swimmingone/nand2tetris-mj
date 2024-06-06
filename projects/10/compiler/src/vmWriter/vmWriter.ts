import { toLineWithIndent } from '../utils/toLineWithIndent';

export type Segment =
  | 'CONST'
  | 'ARGUMENT'
  | 'LOCAL'
  | 'STATIC'
  | 'THIS'
  | 'THAT'
  | 'POINTER'
  | 'TEMP';
export const SegmentMap: Record<Segment, string> = {
  CONST: 'constant',
  ARGUMENT: 'argument',
  LOCAL: 'local',
  STATIC: 'static',
  THIS: 'this',
  THAT: 'that',
  POINTER: 'pointer',
  TEMP: 'temp',
};

export type Command = 'ADD' | 'SUB' | 'NEG' | 'EQ' | 'GT' | 'LT' | 'AND' | 'OR' | 'NOT';
export const CommandMap: Record<Command, string> = {
  ADD: 'add',
  SUB: 'sub',
  NEG: 'neg',
  EQ: 'eq',
  GT: 'gt',
  LT: 'lt',
  AND: 'and',
  OR: 'or',
  NOT: 'not',
};

export type VMWriter = {
  writePush: (segment: Segment, index: number) => void;
  writePop: (segment: Segment, index: number) => void;
  writeArithmetic: (command: Command) => void;
  writeLabel: (label: string) => void;
  writeGoto: (label: string) => void;
  writeIf: (label: string) => void;
  writeCall: (name: string, nArgs: number) => void;
  writeFunction: (name: string, nVars: number) => void;
  writeReturn: () => void;
  close: () => void;
};

export const vmWriter = ({
  filename,
  print,
}: {
  filename: string;
  print: (target: string) => void;
}): VMWriter => {
  return {
    writePush: (segment, index) => {
      print(toLineWithIndent(`push ${SegmentMap[segment]} ${index}`));
    },
    writePop: (segment, index) => {
      print(toLineWithIndent(`pop ${SegmentMap[segment]} ${index}`));
    },
    writeArithmetic: (command) => {
      print(toLineWithIndent(CommandMap[command]));
    },
    writeLabel: (label) => {
      print(toLineWithIndent(`label ${label}`));
    },
    writeGoto: (label) => {
      print(toLineWithIndent(`goto ${label}`));
    },
    writeIf: (label) => {
      print(toLineWithIndent(`if-goto ${label}`));
    },
    writeCall: (name, nArgs) => {
      print(toLineWithIndent(`call ${name} ${nArgs}`));
    },
    writeFunction: (name, nVars) => {
      print(toLineWithIndent(`function ${filename + '.' + name} ${nVars}`));
    },
    writeReturn: () => {
      print(toLineWithIndent('return'));
    },
    close: () => {
      // remove the last line break
      print('');
    },
  };
};
