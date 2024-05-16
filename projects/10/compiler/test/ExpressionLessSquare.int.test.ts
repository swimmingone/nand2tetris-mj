import { describe, expect, it } from 'vitest';
import { jackAnalyzer } from '../src/jackAnalyzer';
import { fileTestTemplate } from './testHelper';
import { readFilePromise } from '../src/readFilePromise';

describe('ExpressionLessSquare', () => {
  it('should compile Main.jack', async () => {
    const jackPath = './test/res/ExpressionLessSquare/Main.jack';
    const xmlPath = './test/res/ExpressionLessSquare/Main.xml';
    const expectedXmlPath = './test/compare/ExpressionLessSquare/Main.xml';

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
    const jackPath = './test/res/ExpressionLessSquare/Square.jack';
    const xmlPath = './test/res/ExpressionLessSquare/SquareT.xml';
    const expectedXmlPath = './test/compare/ExpressionLessSquare/SquareT.xml';

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
    const jackPath = './test/res/ExpressionLessSquare/SquareGame.jack';
    const xmlPath = './test/res/ExpressionLessSquare/SquareGameT.xml';
    const expectedXmlPath = './test/compare/ExpressionLessSquare/SquareGameT.xml';

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
      () => jackAnalyzer('./test/res/ExpressionLessSquare'),
      './test/res/ExpressionLessSquare/SquareT.xml',
      './test/res/ExpressionLessSquare/SquareGameT.xml',
      './test/res/ExpressionLessSquare/MainT.xml',
    );
  });
});
