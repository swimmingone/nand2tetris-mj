import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';

describe('basicEq', () => {
  it('should print assembly code for basicTest', async () => {
    const basicTestVm = await readFilePromise('./test/res/BasicTest.vm');
    const basicTestAsm = await readFilePromise('./test/res/BasicTest.asm');

    const vmCommandSplit = basicTestVm
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

    expect(actualAsm.trim()).toEqual(basicTestAsm.trim());
  });
});
