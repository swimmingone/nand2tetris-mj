import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';

describe('pointerEq', () => {
  it('should print assembly code for pointerTest', async () => {
    const pointerTestVm = await readFilePromise('./test/res/PointerTest.vm');
    // const pointerTestAsm = await readFilePromise('./test/res/PointerTest.asm');
    const pointerTestAsm = '';

    const vmCommandSplit = pointerTestVm
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

    expect(actualAsm.trim()).toEqual(pointerTestAsm.trim());
  });
});
