import { printLineWithIndent } from '../utils/printLineWithIndent';

export type CompilationEngine = {
  compileClass: () => void;
  compileClassVarDec: () => void;
  compileSubroutine: () => void;
  compileParameterList: () => void;
  compileSubroutineBody: () => void;
  compileVarDec: () => void;
  compileStatements: () => void;
  compileLet: () => void;
  compileIf: () => void;
  compileWhile: () => void;
  compileDo: () => void;
  compileReturn: () => void;
  compileExpression: () => void;
  compileTerm: () => void;
  compileExpressionList: () => void;
};

export const compilationEngine = ({
  print,
  process,
  currentToken,
}: {
  print: (target: string) => void;
  process: (
    target: string | number,
    test: (target: string | number) => boolean,
    indentLevel: number,
  ) => void;
  currentToken: () => string | number;
}): CompilationEngine => {
  let indentLevel = 0;

  const exactly = (target: string | number) => currentToken() === target;
  const isString = (target: string | number) => typeof target === 'string';
  const isStringStartsWithSmall = (target: string | number) =>
    typeof target === 'string' && /^[a-z]/.test(target);
  const isStringStartsWithCapital = (target: string | number) => {
    return typeof target === 'string' && /^[A-Z]/.test(target);
  };
  const isStaticOrField = (target: string | number) => target === 'static' || target === 'field';
  const isSubroutineKeyword = (target: string | number) =>
    target === 'constructor' || target === 'function' || target === 'method';
  const isOperator = (target: string | number) =>
    target === '+' ||
    target === '-' ||
    target === '*' ||
    target === '/' ||
    target === '&' ||
    target === '|' ||
    target === '<' ||
    target === '>' ||
    target === '=';
  const isUnaryOperator = (target: string | number) => target === '-' || target === '~';

  const compileClass = () => {
    print(printLineWithIndent('<class>', indentLevel));
    indentLevel += 1;
    process('class', exactly, indentLevel);
    process(currentToken(), isStringStartsWithCapital, indentLevel); // className
    process('{', exactly, indentLevel);
    compileClassVarDec();
    while (isSubroutineKeyword(currentToken())) {
      compileSubroutine();
    }
    process('}', exactly, indentLevel);
    indentLevel -= 1;
    print('</class>');
  };

  const compileClassVarDec = () => {
    print(printLineWithIndent('<classVarDec>', indentLevel));
    indentLevel += 1;
    process(currentToken(), isStaticOrField, indentLevel); // static | field
    process(currentToken(), isString, indentLevel); // type
    process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
    while (currentToken() === ',') {
      process(',', exactly, indentLevel);
      process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</classVarDec>', indentLevel));
  };

  const compileSubroutine = () => {
    print(printLineWithIndent('<subroutineDec>', indentLevel));
    indentLevel += 1;
    process(currentToken(), isSubroutineKeyword, indentLevel);
    process(currentToken(), isString, indentLevel); // type
    process(currentToken(), isStringStartsWithSmall, indentLevel); // subroutineName
    process('(', exactly, indentLevel);
    compileParameterList();
    process(')', exactly, indentLevel);
    compileSubroutineBody();
    indentLevel -= 1;
    print(printLineWithIndent('</subroutineDec>', indentLevel));
  };

  const compileParameterList = () => {
    print(printLineWithIndent('<parameterList>', indentLevel));
    indentLevel += 1;
    if (currentToken() !== ')') {
      process(currentToken(), isString, indentLevel); // type
      process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
      while (currentToken() === ',') {
        process(',', exactly, indentLevel);
        process(currentToken(), isString, indentLevel); // type
        process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
      }
    }
    indentLevel -= 1;
    print(printLineWithIndent('</parameterList>', indentLevel));
  };

  const compileSubroutineBody = () => {
    print(printLineWithIndent('<subroutineBody>', indentLevel));
    indentLevel += 1;
    process('{', exactly, indentLevel);
    compileVarDec();
    compileStatements();
    process('}', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</subroutineBody>', indentLevel));
  };

  const compileVarDec = () => {
    print(printLineWithIndent('<varDec>', indentLevel));
    indentLevel += 1;
    process('var', exactly, indentLevel);
    process(currentToken(), isString, indentLevel); // type
    process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
    while (currentToken() === ',') {
      process(',', exactly, indentLevel);
      process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</varDec>', indentLevel));
  };

  const compileStatements = () => {
    print(printLineWithIndent('<statements>', indentLevel));
    indentLevel += 1;
    while (currentToken() !== '}') {
      if (currentToken() === 'let') {
        compileLet();
      } else if (currentToken() === 'if') {
        compileIf();
      } else if (currentToken() === 'while') {
        compileWhile();
      } else if (currentToken() === 'do') {
        compileDo();
      } else if (currentToken() === 'return') {
        compileReturn();
      }
    }
    indentLevel -= 1;
    print(printLineWithIndent('</statements>', indentLevel));
  };

  const compileLet = () => {
    print(printLineWithIndent('<letStatement>', indentLevel));
    indentLevel += 1;
    process('let', exactly, indentLevel);
    process(currentToken(), isStringStartsWithSmall, indentLevel); // varName
    if (currentToken() === '[') {
      process('[', exactly, indentLevel);
      compileExpression();
      process(']', exactly, indentLevel);
    }
    process('=', exactly, indentLevel);
    compileExpression();
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</letStatement>', indentLevel));
  };

  const compileIf = () => {
    print(printLineWithIndent('<ifStatement>', indentLevel));
    indentLevel += 1;
    process('if', exactly, indentLevel);
    process('(', exactly, indentLevel);
    compileExpression();
    process(')', exactly, indentLevel);
    process('{', exactly, indentLevel);
    compileStatements();
    process('}', exactly, indentLevel);
    if (currentToken() === 'else') {
      process('else', exactly, indentLevel);
      process('{', exactly, indentLevel);
      compileStatements();
      process('}', exactly, indentLevel);
    }
    indentLevel -= 1;
    print(printLineWithIndent('</ifStatement>', indentLevel));
  };

  const compileWhile = () => {
    print(printLineWithIndent('<whileStatement>', indentLevel));
    indentLevel += 1;
    process('while', exactly, indentLevel);
    process('(', exactly, indentLevel);
    compileExpression();
    process(')', exactly, indentLevel);
    process('{', exactly, indentLevel);
    compileStatements();
    process('}', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</whileStatement>', indentLevel));
  };

  const compileDo = () => {
    print(printLineWithIndent('<doStatement>', indentLevel));
    indentLevel += 1;
    process('do', exactly, indentLevel);
    process(currentToken(), isStringStartsWithSmall, indentLevel); // subroutineName | varName
    if (currentToken() === '(') {
      process('(', exactly, indentLevel);
      compileExpressionList();
      process(')', exactly, indentLevel);
    } else if (currentToken() === '.') {
      process('.', exactly, indentLevel);
      process(currentToken(), isStringStartsWithSmall, indentLevel); // subroutineName
      process('(', exactly, indentLevel);
      compileExpressionList();
      process(')', exactly, indentLevel);
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</doStatement>', indentLevel));
  };

  const compileReturn = () => {
    print(printLineWithIndent('<returnStatement>', indentLevel));
    indentLevel += 1;
    process('return', exactly, indentLevel);
    if (currentToken() !== ';') {
      compileExpression();
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(printLineWithIndent('</returnStatement>', indentLevel));
  };

  const compileExpression = () => {
    print(printLineWithIndent('<expression>', indentLevel));
    indentLevel += 1;
    compileTerm();
    // while (currentToken()) {
    //   process(currentToken(), isOperator, indentLevel);
    //   compileTerm();
    // }
    indentLevel -= 1;
    print(printLineWithIndent('</expression>', indentLevel));
  };

  const compileTerm = () => {
    print(printLineWithIndent('<term>', indentLevel));
    indentLevel += 1;
    if (currentToken() === '(') {
      process('(', exactly, indentLevel);
      compileExpression();
      process(')', exactly, indentLevel);
    } else if (currentToken() === '-' || currentToken() === '~') {
      process(currentToken(), isUnaryOperator, indentLevel);
      compileTerm();
    } else {
      process(currentToken(), isStringStartsWithSmall, indentLevel);
    }
    indentLevel -= 1;
    print(printLineWithIndent('</term>', indentLevel));
  };

  const compileExpressionList = () => {
    print(printLineWithIndent('<expressionList>', indentLevel));
    indentLevel += 1;
    if (currentToken() !== ')') {
      compileExpression();
      while (currentToken() === ',') {
        process(',', exactly, indentLevel);
        compileExpression();
      }
    }
    indentLevel -= 1;
    print(printLineWithIndent('</expressionList>', indentLevel));
  };

  return {
    compileClass,
    compileClassVarDec,
    compileSubroutine,
    compileParameterList,
    compileSubroutineBody,
    compileVarDec,
    compileStatements,
    compileLet,
    compileIf,
    compileWhile,
    compileDo,
    compileReturn,
    compileExpression,
    compileTerm,
    compileExpressionList,
  };
};
