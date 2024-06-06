import { describe, expect, it } from 'vitest';
import { fileTestTemplate } from './testHelper';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { readFilePromise } from '../src/readFilePromise';

describe('Seven', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/Seven/Main.jack';
    const vmPath = './test/res/Seven/Main.vm';
    const expectedVmPath = './test/compare/Seven/Main.vm';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [vm, expectedVm] = await Promise.all([
        readFilePromise(vmPath),
        readFilePromise(expectedVmPath),
      ]);

      expect(vm).toBe(expectedVm.replace(/\r/g, ''));
    }, vmPath);
  });
  it('should compile a directory', async () => {
    await fileTestTemplate(() => jackAnalyzer('./test/res/Seven'), './test/res/Seven/Main.vm');
  });
});
