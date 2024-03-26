import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise, translateDefaultOptions } from './testHelper';

describe('StackEq', () => {
  it('should print assembly code for eq', async () => {
    const stackEqVm = await readFilePromise('./test/res/StackEq.vm');
    const stackEqAsm = await readFilePromise('./test/res/StackEq.asm');

    const vmCommandSplit = stackEqVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(stackEqAsm.trim());
  });
});
