import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('Pong', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/Pong/Main.jack';
    const vmPath = './test/res/Pong/Main.vm';
    const expectedVmPath = './test/compare/Pong/Main.vm';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [vm, expectedVm] = await Promise.all([
        readFilePromise(vmPath),
        readFilePromise(expectedVmPath),
      ]);

      expect(vm).toBe(expectedVm.replace(/\r/g, ''));
    }, vmPath);
  });

  it('should compile Ball.jack', async () => {
    const jackPath = './test/res/Pong/Ball.jack';
    const vmPath = './test/res/Pong/Ball.vm';
    const expectedVmPath = './test/compare/Pong/Ball.vm';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [vm, expectedVm] = await Promise.all([
        readFilePromise(vmPath),
        readFilePromise(expectedVmPath),
      ]);

      expect(vm).toBe(expectedVm.replace(/\r/g, ''));
    }, vmPath);
  });

  it('should compile Bat.jack', async () => {
    const jackPath = './test/res/Pong/Bat.jack';
    const vmPath = './test/res/Pong/Bat.vm';
    const expectedVmPath = './test/compare/Pong/Bat.vm';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [vm, expectedVm] = await Promise.all([
        readFilePromise(vmPath),
        readFilePromise(expectedVmPath),
      ]);

      expect(vm).toBe(expectedVm.replace(/\r/g, ''));
    }, vmPath);
  });

  it('should compile PongGame.jack', async () => {
    const jackPath = './test/res/Pong/PongGame.jack';
    const vmPath = './test/res/Pong/PongGame.vm';
    const expectedVmPath = './test/compare/Pong/PongGame.vm';

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
      () => jackAnalyzer('./test/res/Pong'),
      './test/res/Pong/Ball.vm',
      './test/res/Pong/Bat.vm',
      './test/res/Pong/PongGame.vm',
      './test/res/Pong/Main.vm',
    );
  });
});
