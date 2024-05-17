import { toLineWithIndent } from '../utils/toLineWithIndent';
import { encodeForXml } from '../utils/encodeForXml';

const operators = ['+', '-', '*', '/', '&', '|', '<', '>', '='];

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

  const exactly = (target: string | number) =>
    (typeof target === 'string' ? encodeForXml(target) : target) === currentToken();
  const isString = (target: string | number) => typeof target === 'string';
  const isStringStartsWithCapital = (target: string | number) => {
    return typeof target === 'string' && /^[A-Z]/.test(target);
  };
  const isNumber = (target: string | number) => typeof target === 'number';
  const isStaticOrField = (target: string | number) => target === 'static' || target === 'field';
  const isSubroutineKeyword = (target: string | number) =>
    target === 'constructor' || target === 'function' || target === 'method';
  const isOperator = (target: string | number) =>
    operators.map((op) => encodeForXml(op)).includes(target as string);
  const isUnaryOperator = (target: string | number) => target === '-' || target === '~';

  const compileClass = () => {
    print(toLineWithIndent('<class>', indentLevel));
    indentLevel += 1;
    process('class', exactly, indentLevel);
    process(currentToken(), isStringStartsWithCapital, indentLevel); // className
    process('{', exactly, indentLevel);
    while (isStaticOrField(currentToken())) {
      compileClassVarDec();
    }
    while (isSubroutineKeyword(currentToken())) {
      compileSubroutine();
    }
    process('}', exactly, indentLevel);
    indentLevel -= 1;
    print('</class>');
  };

  const compileClassVarDec = () => {
    print(toLineWithIndent('<classVarDec>', indentLevel));
    indentLevel += 1;
    process(currentToken(), isStaticOrField, indentLevel); // static | field
    process(currentToken(), isString, indentLevel); // type
    process(currentToken(), isString, indentLevel); // varName
    while (currentToken() === ',') {
      process(',', exactly, indentLevel);
      process(currentToken(), isString, indentLevel); // varName
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</classVarDec>', indentLevel));
  };

  const compileSubroutine = () => {
    print(toLineWithIndent('<subroutineDec>', indentLevel));
    indentLevel += 1;
    process(currentToken(), isSubroutineKeyword, indentLevel);
    process(currentToken(), isString, indentLevel); // type
    process(currentToken(), isString, indentLevel); // subroutineName
    process('(', exactly, indentLevel);
    compileParameterList();
    process(')', exactly, indentLevel);
    compileSubroutineBody();
    indentLevel -= 1;
    print(toLineWithIndent('</subroutineDec>', indentLevel));
  };

  const compileParameterList = () => {
    print(toLineWithIndent('<parameterList>', indentLevel));
    indentLevel += 1;
    if (currentToken() !== ')') {
      process(currentToken(), isString, indentLevel); // type
      process(currentToken(), isString, indentLevel); // varName
      while (currentToken() === ',') {
        process(',', exactly, indentLevel);
        process(currentToken(), isString, indentLevel); // type
        process(currentToken(), isString, indentLevel); // varName
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</parameterList>', indentLevel));
  };

  const compileSubroutineBody = () => {
    print(toLineWithIndent('<subroutineBody>', indentLevel));
    indentLevel += 1;
    process('{', exactly, indentLevel);
    while (currentToken() === 'var') {
      compileVarDec();
    }
    compileStatements();
    process('}', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</subroutineBody>', indentLevel));
  };

  const compileVarDec = () => {
    print(toLineWithIndent('<varDec>', indentLevel));
    indentLevel += 1;
    process('var', exactly, indentLevel);
    process(currentToken(), isString, indentLevel); // type
    process(currentToken(), isString, indentLevel); // varName
    while (currentToken() === ',') {
      process(',', exactly, indentLevel);
      process(currentToken(), isString, indentLevel); // varName
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</varDec>', indentLevel));
  };

  const compileStatements = () => {
    print(toLineWithIndent('<statements>', indentLevel));
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
    print(toLineWithIndent('</statements>', indentLevel));
  };

  const compileLet = () => {
    print(toLineWithIndent('<letStatement>', indentLevel));
    indentLevel += 1;
    process('let', exactly, indentLevel);
    process(currentToken(), isString, indentLevel); // varName
    if (currentToken() === '[') {
      process('[', exactly, indentLevel);
      compileExpression();
      process(']', exactly, indentLevel);
    }
    process('=', exactly, indentLevel);
    compileExpression();
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</letStatement>', indentLevel));
  };

  const compileIf = () => {
    print(toLineWithIndent('<ifStatement>', indentLevel));
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
    print(toLineWithIndent('</ifStatement>', indentLevel));
  };

  const compileWhile = () => {
    print(toLineWithIndent('<whileStatement>', indentLevel));
    indentLevel += 1;
    process('while', exactly, indentLevel);
    process('(', exactly, indentLevel);
    compileExpression();
    process(')', exactly, indentLevel);
    process('{', exactly, indentLevel);
    compileStatements();
    process('}', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</whileStatement>', indentLevel));
  };

  const compileDo = () => {
    print(toLineWithIndent('<doStatement>', indentLevel));
    indentLevel += 1;
    process('do', exactly, indentLevel);
    process(currentToken(), isString, indentLevel); // subroutineName | varName
    if (currentToken() === '(') {
      process('(', exactly, indentLevel);
      compileExpressionList();
      process(')', exactly, indentLevel);
    } else if (currentToken() === '.') {
      process('.', exactly, indentLevel);
      process(currentToken(), isString, indentLevel); // subroutineName
      process('(', exactly, indentLevel);
      compileExpressionList();
      process(')', exactly, indentLevel);
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</doStatement>', indentLevel));
  };

  const compileReturn = () => {
    print(toLineWithIndent('<returnStatement>', indentLevel));
    indentLevel += 1;
    process('return', exactly, indentLevel);
    if (currentToken() !== ';') {
      compileExpression();
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</returnStatement>', indentLevel));
  };

  const compileExpression = () => {
    print(toLineWithIndent('<expression>', indentLevel));
    indentLevel += 1;
    compileTerm();
    while (isOperator(currentToken())) {
      process(currentToken(), isOperator, indentLevel);
      compileTerm();
    }
    indentLevel -= 1;
    print(toLineWithIndent('</expression>', indentLevel));
  };

  const compileTerm = () => {
    print(toLineWithIndent('<term>', indentLevel));
    indentLevel += 1;
    if (currentToken() === '(') {
      process('(', exactly, indentLevel);
      compileExpression();
      process(')', exactly, indentLevel);
    } else if (isUnaryOperator(currentToken())) {
      process(currentToken(), isUnaryOperator, indentLevel);
      compileTerm();
    } else {
      process(currentToken(), () => true, indentLevel); // varName | subroutineName | className | keywordConstant
      if (currentToken() === '[') {
        process('[', exactly, indentLevel);
        compileExpression();
        process(']', exactly, indentLevel);
      } else if (currentToken() === '(') {
        process('(', exactly, indentLevel);
        compileExpressionList();
        process(')', exactly, indentLevel);
      } else if (currentToken() === '.') {
        process('.', exactly, indentLevel);
        process(currentToken(), isString, indentLevel); // subroutineName
        process('(', exactly, indentLevel);
        compileExpressionList();
        process(')', exactly, indentLevel);
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</term>', indentLevel));
  };

  const compileExpressionList = () => {
    print(toLineWithIndent('<expressionList>', indentLevel));
    indentLevel += 1;
    if (currentToken() !== ')') {
      compileExpression();
      while (currentToken() === ',') {
        process(',', exactly, indentLevel);
        compileExpression();
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</expressionList>', indentLevel));
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
