import { describe, expect, it } from 'vitest';
import { translate } from '../src/translate';
import { readFilePromise } from './testHelper';
import { bootstrap } from '../src/bootstrap';

describe('simpleFunction', () => {
  it('should print assembly code for staticsTest', async () => {
    const vm = await readFilePromise('./test/res/StaticsTest.vm');
    const asm = '';

    const vmCommandSplit = vm
      .split('\n')
      .filter((it) => !it.trim().startsWith('//'))
      .filter((it) => !!it.trim())
      .map((it) => it.trim());

    let count = 0;

    const actualAsm =
      bootstrap() +
      '\n\n' +
      vmCommandSplit
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
