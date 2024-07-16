import { describe, expect, it } from 'vitest';
import { fileTestTemplate } from './testHelper';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { readFilePromise } from '../src/readFilePromise';

describe('ConvertToBin', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/ConvertToBin/Main.jack';
    const vmPath = './test/res/ConvertToBin/Main.vm';
    const expectedVmPath = './test/compare/ConvertToBin/Main.vm';

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
    await fileTestTemplate(
      () => jackAnalyzer('./test/res/ConvertToBin'),
      './test/res/ConvertToBin/Main.vm',
    );
  });
});
