import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';

describe('staticEq', () => {
  it('should print assembly code for staticTest', async () => {
    const staticTestVm = await readFilePromise('./test/res/StaticTest.vm');
    const staticTestAsm = await readFilePromise('./test/res/StaticTest.asm');

    const vmCommandSplit = staticTestVm
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

    expect(actualAsm.trim()).toEqual(staticTestAsm.trim());
  });
});
