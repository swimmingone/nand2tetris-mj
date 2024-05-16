import { readFilePromise } from './readFilePromise';
import { readdirPromise } from './readdirPromise';
import { JackTokenizer, jackTokenizer, JackTokenType, JackTokenTypeMap } from './jackTokenizer';
import { writeFilePromise } from './writeFilePromise';
import { compilationEngine } from './compilationEngine';
import { printLineWithIndent } from './utils/printLineWithIndent';

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

  let result = '';

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
  tokenizer.advance();

  const currentToken = () => getCurrentToken(tokenizer);

  const print = (target: string) => {
    result += target;
  };
  const process = (
    target: string | number,
    test: (target: string | number) => boolean,
    indentLevel: number,
  ) => {
    const currentToken = getCurrentToken(tokenizer);

    console.log({ currentToken, target });
    if (test(target)) {
      result += printXmlToken({ target, tokenizer, indentLevel });
    } else {
      console.log({ currentToken, target });
      console.log(test);
      throw Error('Syntax error.');
    }

    tokenizer.advance();
  };

  const engine = compilationEngine({ print, process, currentToken });

  engine.compileClass();

  const xmlFilePath = jackFile.replace('.jack', '.xml');
  await writeFilePromise(xmlFilePath, result);
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

const printXmlToken = ({
  target,
  tokenizer,
  indentLevel,
}: {
  target: string | number;
  tokenizer: JackTokenizer;
  indentLevel: number;
}) => {
  const token = `<${JackTokenTypeMap[tokenizer.tokenType()]}> ${target} </${
    JackTokenTypeMap[tokenizer.tokenType()]
  }>`;

  return printLineWithIndent(token, indentLevel);
};
