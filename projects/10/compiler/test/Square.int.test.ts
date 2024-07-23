import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('Square', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/Square/Main.jack';
    const vmPath = './test/res/Square/Main.vm';
    const expectedVmPath = './test/compare/Square/Main.vm';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [vm, expectedVm] = await Promise.all([
        readFilePromise(vmPath),
        readFilePromise(expectedVmPath),
      ]);

      expect(vm).toBe(expectedVm.replace(/\r/g, ''));
    }, vmPath);
  });

  it('should compile Square.jack', async () => {
    const jackPath = './test/res/Square/Square.jack';
    const vmPath = './test/res/Square/Square.vm';
    const expectedVmPath = './test/compare/Square/Square.vm';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [vm, expectedVm] = await Promise.all([
        readFilePromise(vmPath),
        readFilePromise(expectedVmPath),
      ]);

      expect(vm).toBe(expectedVm.replace(/\r/g, ''));
    }, vmPath);
  });

  it('should compile SquareGame.jack', async () => {
    const jackPath = './test/res/Square/SquareGame.jack';
    const vmPath = './test/res/Square/SquareGame.vm';
    const expectedVmPath = './test/compare/Square/SquareGame.vm';

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
      () => jackAnalyzer('./test/res/Square'),
      './test/res/Square/Square.vm',
      './test/res/Square/SquareGame.vm',
      './test/res/Square/Main.vm',
    );
  });
});
