import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { translate } from '../src/translate';
import { translateDefaultOptions } from './testHelper';

const readFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

describe('StackAdd', () => {
  it('should print assembly code for add', async () => {
    const simpleAddVm = await readFile('./test/res/SimpleAdd.vm');
    const simpleAddAsm = await readFile('./test/res/SimpleAdd.asm');
    // expect(simpleAddAsm).toEqual('');

    const vmCommandSplit = simpleAddVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(simpleAddAsm.trim());
  });
});
