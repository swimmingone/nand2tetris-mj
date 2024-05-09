import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('Square', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/Square/Main.jack';
    const xmlPath = './test/res/Square/MainT.xml';
    const expectedXmlPath = './test/compare/Square/MainT.xml';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [xml, expectedXml] = await Promise.all([
        readFilePromise(xmlPath),
        readFilePromise(expectedXmlPath),
      ]);

      expect(xml).toBe(expectedXml.replace(/\r/g, '').trim());
    }, xmlPath);
  });

  it('should compile Square.jack', async () => {
    const jackPath = './test/res/Square/Square.jack';
    const xmlPath = './test/res/Square/SquareT.xml';
    const expectedXmlPath = './test/compare/Square/SquareT.xml';

    await fileTestTemplate(async () => {
      await jackAnalyzer(jackPath);

      const [xml, expectedXml] = await Promise.all([
        readFilePromise(xmlPath),
        readFilePromise(expectedXmlPath),
      ]);

      expect(xml).toBe(expectedXml.replace(/\r/g, '').trim());
    }, xmlPath);
  });

  it('should compile SquareGame.jack', async () => {
    const jackPath = './test/res/Square/SquareGame.jack';
    const xmlPath = './test/res/Square/SquareGameT.xml';
    const expectedXmlPath = './test/compare/Square/SquareGameT.xml';

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
      () => jackAnalyzer('./test/res/Square'),
      './test/res/Square/SquareT.xml',
      './test/res/Square/SquareGameT.xml',
      './test/res/Square/MainT.xml',
    );
  });
});
