import { readFilePromise } from './readFilePromise';
import { readdirPromise } from './readdirPromise';
import { JackTokenizer, jackTokenizer, JackTokenType, JackTokenTypeMap } from './jackTokenizer';
import { writeFilePromise } from './writeFilePromise';
import { compilationEngine } from './compilationEngine';
import { toLineWithIndent } from './utils/toLineWithIndent';
import { symbolTable } from './symbolTable';
import { vmWriter } from './vmWriter';

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

  let xmlResult = '';
  let vmResult = '';
  const vmResultArray = [];

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
  const nextToken = () => getNextToken(tokenizer);

  const printXml = (target: string) => {
    xmlResult += target;
  };
  const process = (
    target: string | number,
    test: (target: string | number) => boolean,
    indentLevel: number,
    exceptionOptions?: { withoutAdvance?: boolean; givenType?: JackTokenType },
  ): void => {
    const tokenType = tokenizer.tokenType();
    if (test(target) || tokenType === 'IDENTIFIER') {
      xmlResult += printXmlToken({
        target,
        tokenizer,
        indentLevel,
        givenType: exceptionOptions?.givenType,
      });
    } else {
      throw Error('Syntax error.');
    }

    if (!exceptionOptions?.withoutAdvance) {
      tokenizer.advance();
    }
  };
  const printVm = (target: string) => {
    vmResult += target;
    vmResultArray.push(target);
  };

  const jackFileNoPath = jackFile.split('/').pop();

  const codeGenerator = vmWriter({
    print: printVm,
    filename: jackFileNoPath?.replace('.jack', '') ?? '',
  });

  const engine = compilationEngine({
    print: printXml,
    process,
    currentToken,
    tokenizer,
    codeGenerator,
  });

  engine.compileClass();

  const xmlFilePath = jackFile.replace('.jack', '.xml');
  await writeFilePromise(xmlFilePath, xmlResult);

  const vmFilePath = jackFile.replace('.jack', '.vm');
  await writeFilePromise(vmFilePath, vmResult);
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

const getNextToken = (tokenizer: JackTokenizer) => {
  tokenizer.advance();
  return { value: getCurrentToken(tokenizer), type: tokenizer.tokenType() };
};

const printXmlToken = ({
  target,
  tokenizer,
  indentLevel,
  givenType,
}: {
  target: string | number;
  tokenizer: JackTokenizer;
  indentLevel: number;
  givenType?: JackTokenType;
}) => {
  const token = `<${JackTokenTypeMap[givenType ?? tokenizer.tokenType()]}> ${target} </${
    JackTokenTypeMap[givenType ?? tokenizer.tokenType()]
  }>`;

  return toLineWithIndent(token, indentLevel);
};
