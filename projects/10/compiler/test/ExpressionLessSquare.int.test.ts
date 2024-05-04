import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('ExpressionLessSquare', () => {
  it('should compile a file', async () => {
    const jackPath = './test/res/ExpressionLessSquare/Main.jack';
    const xmlPath = './test/res/ExpressionLessSquare/Main.xml';
    const expectedXmlPath = './test/res/ExpressionLessSquare/MainT.xml';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [xml, expectedXml] = await Promise.all([
        readFilePromise(xmlPath),
        readFilePromise(expectedXmlPath),
      ]);

      expect(xml).toBe(expectedXml);
    }, xmlPath);
  });
});
