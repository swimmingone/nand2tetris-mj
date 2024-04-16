import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';

describe('fibonacciSeries', () => {
  it('should print assembly code for fibonacciSeries', async () => {
    const vm = await readFilePromise('./test/res/FibonacciSeries.vm');
    const asm = await readFilePromise('./test/res/FibonacciSeries.asm');

    const vmCommandSplit = vm
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

    expect(actualAsm.trim()).toEqual(asm.trim());
  });
});
