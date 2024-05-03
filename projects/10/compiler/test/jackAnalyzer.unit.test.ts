import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { deleteFile, fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('jackAnalyzer', () => {
  it('should compile a file', async () => {
    const jackPath = './test/res/Square/Square.jack';
    const xmlPath = './test/res/Square/Square.xml';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);
      await expect(readFilePromise(xmlPath)).resolves.toEqual('<xml>...</xml>');
    }, xmlPath);

    expect(() => deleteFile(xmlPath, false)).toThrowError(
      "ENOENT: no such file or directory, lstat './test/res/Square/Square.xml'",
    );
  });

  it('should compile a directory', async () => {
    const xmlPath = './test/res/Square/Square.xml';

    await fileTestTemplate(() => jackAnalyzer('./test/res/Square'), xmlPath);
  });
});
