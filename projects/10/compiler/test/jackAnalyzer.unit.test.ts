import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { deleteFile, fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('jackAnalyzer', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/ExpressionLessSquare/Main.jack';
    const xmlPath = './test/res/ExpressionLessSquare/MainT.xml';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const expected = (await readFilePromise('./test/compare/ExpressionLessSquare/MainT.xml'))
        .replace(/\r/g, '')
        .trim();

      await expect(readFilePromise(xmlPath)).resolves.toEqual(expected);
    }, xmlPath);

    expect(() => deleteFile(xmlPath, false)).toThrowError(
      "ENOENT: no such file or directory, lstat './test/res/ExpressionLessSquare/MainT.xml'",
    );
  });
});
