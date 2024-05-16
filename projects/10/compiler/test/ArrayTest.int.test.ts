import { describe, expect, it } from 'vitest';
import { fileTestTemplate } from './testHelper';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { readFilePromise } from '../src/readFilePromise';

describe('ArrayTest', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/ArrayTest/Main.jack';
    const xmlPath = './test/res/ArrayTest/Main.xml';
    const expectedXmlPath = './test/compare/ArrayTest/Main.xml';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [xml, expectedXml] = await Promise.all([
        readFilePromise(xmlPath),
        readFilePromise(expectedXmlPath),
      ]);

      expect(xml).toBe(expectedXml.replace(/\r/g, '').trim());
    }, xmlPath);
  });
  it('should compile a directory', async () => {
    await fileTestTemplate(
      () => jackAnalyzer('./test/res/ArrayTest'),
      './test/res/ArrayTest/Main.xml',
    );
  });
});
