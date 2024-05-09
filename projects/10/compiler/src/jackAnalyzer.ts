import { readFilePromise } from './readFilePromise';
import { readdirPromise } from './readdirPromise';
import { jackTokenizer } from './jackTokenizer';
import { writeFilePromise } from './writeFilePromise';

export const jackAnalyzer = async (path: string): Promise<void> => {
  const jackExtension = '.jack';
  if (path.endsWith(jackExtension)) {
    await handleSingleFile(path);
    return;
  }

  const jackFiles = (await readdirPromise(path)).filter((it) => it.endsWith(jackExtension));

  if (jackFiles.length === 0) {
    throw Error('No `.jack` files found.');
  }

  await Promise.all(jackFiles.map((it) => handleSingleFile(`${path}/${it}`)));
};

const handleSingleFile = async (jackFile: string) => {
  if (!jackFile.endsWith('.jack')) {
    throw Error('The path must have a `.jack` extension.');
  }

  const jackCode = await readFilePromise(jackFile);

  let currentLineNumber = 0;
  const readLine = () => {
    const line = jackCode.replace(/\r/g, '').split('\n')[currentLineNumber];
    currentLineNumber += 1;

    if (line === undefined) {
      return null;
    }

    return line;
  };

  const tokenizer = jackTokenizer(readLine);
  let xml = '<tokens>\n';
  for (;;) {
    tokenizer.advance();
    if (!tokenizer.hasMoreTokens()) {
      break;
    }

    xml = `${xml}<${tokenizer
      .tokenType()
      .toLocaleLowerCase()}> ${tokenizer.currentToken()} </${tokenizer
      .tokenType()
      .toLocaleLowerCase()}>\n`;
  }

  xml = `${xml}</tokens>`;

  const tokenizedXmlFile = jackFile.replace('.jack', 'T.xml');
  await writeFilePromise(tokenizedXmlFile, xml);
};
