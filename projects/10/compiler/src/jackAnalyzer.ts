import { readFilePromise } from './readFilePromise';
import { readdirPromise } from './readdirPromise';
import { JackTokenizer, jackTokenizer, JackTokenType, JackTokenTypeMap } from './jackTokenizer';
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

    xml = `${xml}<${JackTokenTypeMap[tokenizer.tokenType()]}> ${getCurrentToken(tokenizer)} </${
      JackTokenTypeMap[tokenizer.tokenType()]
    }>\n`;
  }

  xml = `${xml}</tokens>`;

  const tokenizedXmlFile = jackFile.replace('.jack', 'T.xml');
  await writeFilePromise(tokenizedXmlFile, xml);
};

const getCurrentToken = (tokenizer: JackTokenizer) => {
  switch (tokenizer.tokenType()) {
    case 'KEYWORD':
      return tokenizer.keyword();
    case 'SYMBOL':
      return tokenizer.symbol();
    case 'IDENTIFIER':
      return tokenizer.identifier();
    case 'INT_CONST':
      return tokenizer.intVal();
    case 'STRING_CONST':
      return tokenizer.stringVal();
    default:
      throw Error('Invalid token type.');
  }
};
