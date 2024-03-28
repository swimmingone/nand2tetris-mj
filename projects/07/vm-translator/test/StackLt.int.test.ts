import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise, translateDefaultOptions } from './testHelper';

describe('StackEq', () => {
  it('should print assembly code for lt', async () => {
    const stackLtVm = await readFilePromise('./test/res/StackLt.vm');
    const stackLtAsm = await readFilePromise('./test/res/StackLt.asm');

    const vmCommandSplit = stackLtVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    const actualAsm = vmCommandSplit
      .map((it) => translate(it, translateDefaultOptions()))
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(stackLtAsm.trim());
  });
});
