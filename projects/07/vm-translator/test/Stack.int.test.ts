import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';

describe('StackEq', () => {
  it('should print assembly code for StackTest', async () => {
    const stackTestVm = await readFilePromise('./test/res/StackTest.vm');
    const stackTestAsm = await readFilePromise('./test/res/StackTest.asm');

    const vmCommandSplit = stackTestVm
      .split('\n')
      .filter((it) => !it.startsWith('//'))
      .filter((it) => !!it.trim());

    let count = 0;
    const actualAsm = vmCommandSplit
      .map((it) =>
        translate(it, {
          jumpCount: count,
          setJumpCount: (c) => {
            count = c;
          },
        }),
      )
      .join('\n\n');

    expect(actualAsm.trim()).toEqual(stackTestAsm.trim());
  });
});
