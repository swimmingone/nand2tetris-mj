import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('ComplexArrays', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/ComplexArrays/Main.jack';
    const vmPath = './test/res/ComplexArrays/Main.vm';
    const expectedVmPath = './test/compare/ComplexArrays/Main.vm';

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
      () => jackAnalyzer('./test/res/ComplexArrays'),
      './test/res/ComplexArrays/Main.vm',
    );
  });
});
