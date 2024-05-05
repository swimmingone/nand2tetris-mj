const lexicalElements = {
  KEYWORD: [
    'class',
    'method',
    'function',
    'constructor',
    'int',
    'boolean',
    'char',
    'void',
    'var',
    'static',
    'field',
    'let',
    'do',
    'if',
    'else',
    'while',
    'return',
    'true',
    'false',
    'null',
    'this',
  ],
  SYMBOL: [
    '{',
    '}',
    '(',
    ')',
    '[',
    ']',
    '.',
    ',',
    ';',
    '+',
    '-',
    '*',
    '/',
    '&',
    '|',
    '<',
    '>',
    '=',
    '~',
  ],
  IDENTIFIER: (str: string) => /^[a-zA-Z_]\w*$/.test(str),
  INT_CONST: (str: string) => /^\d+$/.test(str),
  STRING_CONST: (str: string) => /^".*"$/.test(str),
} as const;

const symbolSet = new Set(lexicalElements.SYMBOL);

export type JackTokenType = keyof typeof lexicalElements;
export type JackKeyword = (typeof lexicalElements.KEYWORD)[number];
type JackSymbol = (typeof lexicalElements.SYMBOL)[number];

// 묻지말고 시키라는 객체지향 원칙에 어긋나지만.. 일단 책에 선언되어있는 인터페이스 그대로 구현한다
export type JackTokenizer = {
  hasMoreTokens: () => boolean;
  advance: () => void;
  tokenType: () => JackTokenType;
  keyword: () => JackKeyword;
  symbol: () => string;
  identifier: () => string;
  intVal: () => number;
  stringVal: () => string;
};

const isBlank = (line: string): boolean => {
  return line.trim().length === 0;
};

const isSingleLineComment = (line: string): boolean => {
  return line.startsWith('//');
};

const isMultilineComment = (line: string): boolean => {
  return line.startsWith('/*');
};

const isMultilineCommentEnd = (line: string): boolean => {
  return line.endsWith('*/');
};

export const jackTokenizer = (readLine: () => string | null): JackTokenizer => {
  let currentToken = '';
  let currentLine = '';
  let moreToken = true;
  let multilineCommentStarted = false;

  const readLineUntilToken = (): void => {
    const nextLine = readLine();
    if (nextLine === null) {
      currentLine = '';
      moreToken = false;
      return;
    }

    if (isBlank(nextLine)) {
      readLineUntilToken();
      return;
    }

    currentLine = nextLine;

    if (moreToken && isBlank(currentLine) && isBlank(currentToken)) {
      readLineUntilToken();
    }
  };

  const advance = (): void => {
    if (currentLine.length === 0) {
      readLineUntilToken();
    }

    const f = () => {
      const indexToSplit = currentLine.replace(/\t/g, ' ').indexOf(' ');

      const setCurrentTokenAndLine = (token: string, line: string): void => {
        currentToken = token;
        currentLine = line;
      };

      if (indexToSplit === -1) {
        setCurrentTokenAndLine(currentLine, '');
        return;
      }

      const newToken = currentLine.substring(0, indexToSplit).trim();
      const newCurrentLine = currentLine.substring(indexToSplit).trim();

      setCurrentTokenAndLine(newToken, newCurrentLine);

      if (isBlank(newToken)) {
        f();
      }
    };

    f();
  };

  // 파일에서 코드를 읽을 때 줄 단위가 아니라 문자 단위로 읽어오면 편할듯..
  const advanceWithCommentHandling = (): void => {
    advance();

    if (multilineCommentStarted) {
      if (isMultilineCommentEnd(currentToken)) {
        multilineCommentStarted = false;
      }
      advanceWithCommentHandling();
    }

    if (isSingleLineComment(currentToken)) {
      // get next line
      currentLine = '';
      currentToken = '';
      advanceWithCommentHandling();
    }

    if (isMultilineComment(currentToken)) {
      multilineCommentStarted = true;
      advanceWithCommentHandling();
    }

    // if a token has a symbol, split it and add the symbol to new current line
    for (let i = 0; i < currentToken.length; i++) {
      if (!symbolSet.has(currentToken[i] as any)) {
        continue;
      }

      if (i === 0) {
        currentLine = currentToken.substring(1) + currentLine;
        currentToken = currentToken[0];
        return;
      } else {
        currentLine = currentToken.substring(i) + currentLine;
        currentToken = currentToken.substring(0, i);
      }
    }
  };

  const assertThatCurrentTokenIsExistent = (): void => {
    if (currentToken.length === 0) {
      throw Error('No token. Call advance() first.');
    }
  };

  return {
    hasMoreTokens: () => moreToken,
    advance: advanceWithCommentHandling,
    tokenType: (): JackTokenType => {
      assertThatCurrentTokenIsExistent();

      if (lexicalElements.KEYWORD.includes(currentToken as JackKeyword)) {
        return 'KEYWORD';
      }

      if (lexicalElements.SYMBOL.includes(currentToken as JackSymbol)) {
        return 'SYMBOL';
      }

      if (lexicalElements.IDENTIFIER(currentToken)) {
        return 'IDENTIFIER';
      }

      if (lexicalElements.INT_CONST(currentToken)) {
        return 'INT_CONST';
      }

      if (lexicalElements.STRING_CONST(currentToken)) {
        return 'STRING_CONST';
      }

      throw Error(`Unknown token: ${currentToken}`);
    },

    keyword: (): JackKeyword => {
      assertThatCurrentTokenIsExistent();

      if (!lexicalElements.KEYWORD.includes(currentToken as JackKeyword)) {
        throw Error(`Not a keyword: ${currentToken}`);
      }

      return currentToken as JackKeyword;
    },

    symbol: (): JackSymbol => {
      assertThatCurrentTokenIsExistent();

      if (!lexicalElements.SYMBOL.includes(currentToken as JackSymbol)) {
        throw Error(`Not a symbol: ${currentToken}`);
      }

      return currentToken as JackSymbol;
    },

    identifier: (): string => {
      assertThatCurrentTokenIsExistent();

      if (!lexicalElements.IDENTIFIER(currentToken)) {
        throw Error(`Not an identifier: ${currentToken}`);
      }

      return currentToken;
    },

    intVal: (): number => {
      assertThatCurrentTokenIsExistent();

      if (!lexicalElements.INT_CONST(currentToken)) {
        throw Error(`Not an integer constant: ${currentToken}`);
      }

      return Number(currentToken);
    },

    stringVal: (): string => {
      assertThatCurrentTokenIsExistent();

      if (!lexicalElements.STRING_CONST(currentToken)) {
        throw Error(`Not a string constant: ${currentToken}`);
      }

      return currentToken.substring(1, currentToken.length - 1);
    },
  };
};
