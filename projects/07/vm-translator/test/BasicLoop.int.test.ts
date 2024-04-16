import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';

describe('basicLoop', () => {
  it('should print assembly code for basicLoop', async () => {
    const basicLoopVm = await readFilePromise('./test/res/BasicLoop.vm');
    const basicLoopAsm = await readFilePromise('./test/res/BasicLoop.asm');

    const vmCommandSplit = basicLoopVm
      .split('\n')
      .filter((it) => !it.trim().startsWith('//'))
      .filter((it) => !!it.trim())
      .map((it) => it.trim());

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

    expect(actualAsm.trim()).toEqual(basicLoopAsm.trim());
  });
});
