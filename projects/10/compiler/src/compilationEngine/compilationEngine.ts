import { toLineWithIndent } from '../utils/toLineWithIndent';
import { encodeForXml } from '../utils/encodeForXml';
import { EMPTY_SYMBOL_TABLE, Kind, symbolTable, SymbolTable } from '../symbolTable';
import { Command, VMWriter } from '../vmWriter';
import { JackTokenizer, JackTokenType } from '../jackTokenizer';

const operators = ['+', '-', '*', '/', '&', '|', '<', '>', '='];
const OperatorCommandMap: Record<string, Command> = {
  '+': 'ADD',
  '-': 'SUB',
  '&amp;': 'AND',
  '|': 'OR',
  '&lt;': 'LT',
  '&gt;': 'GT',
  '=': 'EQ',
} as const;

export type CompilationEngine = {
  compileClass: () => void;
  compileClassVarDec: () => void;
  compileSubroutine: () => void;
  compileParameterList: () => void;
  compileSubroutineBody: (name: string, keyword: string) => void;
  compileVarDec: () => void;
  compileStatements: () => void;
  compileLet: () => void;
  compileIf: () => void;
  compileWhile: () => void;
  compileDo: () => void;
  compileReturn: () => void;
  compileExpression: () => void;
  compileTerm: () => void;
  compileExpressionList: () => number;
};

export const compilationEngine = ({
  print,
  process,
  currentToken,
  tokenizer,
  codeGenerator,
}: {
  print: (target: string) => void;
  process: (
    target: string | number,
    test: (target: string | number) => boolean,
    indentLevel: number,
    exceptionOptions?: { withoutAdvance?: boolean; givenType?: JackTokenType },
  ) => void;
  currentToken: () => string | number;
  tokenizer: JackTokenizer;
  codeGenerator: VMWriter;
}): CompilationEngine => {
  let indentLevel = 0;
  let ifStatementCount = -1;
  let whileStatementCount = -1;
  let className = '';
  let classSymbolTable = EMPTY_SYMBOL_TABLE;
  let subroutineSymbolTable = EMPTY_SYMBOL_TABLE;

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
    classSymbolTable = symbolTable();
    subroutineSymbolTable = symbolTable();
    className = currentToken().toString();

    const extendedClassName = `name: ${currentToken()}, category: class, index: none, usage: declared`;
    process(extendedClassName, isStringStartsWithCapital, indentLevel); // className

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
    const category = currentToken(); // static | field
    process(category, isStaticOrField, indentLevel);
    const type = currentToken(); // type
    process(type, isString, indentLevel);

    const name = currentToken().toString();
    classSymbolTable.define(name, type.toString(), category as Kind);
    const extendedVarName = `name: ${name}, category: ${category}, index: ${classSymbolTable.indexOf(
      name,
    )}, usage: declared`;
    process(extendedVarName, isString, indentLevel); // varName

    while (currentToken() === ',') {
      process(',', exactly, indentLevel);

      const name = currentToken().toString();
      classSymbolTable.define(name, type.toString(), category as Kind);
      const extendedVarName = `name: ${name}, category: ${category}, index: ${classSymbolTable.indexOf(
        name,
      )}, usage: declared`;
      process(extendedVarName, isString, indentLevel); // varName
    }
    process(';', exactly, indentLevel);
    indentLevel -= 1;
    print(toLineWithIndent('</classVarDec>', indentLevel));
  };

  const compileSubroutine = () => {
    subroutineSymbolTable.reset();
    ifStatementCount = -1;
    whileStatementCount = -1;
    print(toLineWithIndent('<subroutineDec>', indentLevel));
    indentLevel += 1;
    const keyword = currentToken(); // constructor | function | method
    process(keyword, isSubroutineKeyword, indentLevel);
    process(currentToken(), isString, indentLevel); // type

    const name = currentToken().toString(); // subroutineName
    const extendedSubroutineName = `name: ${name}, category: subroutine, index: none, usage: declared`;
    process(extendedSubroutineName, isString, indentLevel);

    process('(', exactly, indentLevel);
    compileParameterList();
    process(')', exactly, indentLevel);
    compileSubroutineBody(name, keyword as string);

    indentLevel -= 1;
    print(toLineWithIndent('</subroutineDec>', indentLevel));
  };

  const compileParameterList = () => {
    print(toLineWithIndent('<parameterList>', indentLevel));
    indentLevel += 1;
    if (currentToken() !== ')') {
      const type = currentToken(); // type
      process(type, isString, indentLevel);
      const name = currentToken().toString();
      subroutineSymbolTable.define(name, type.toString(), 'arg');
      const extendedVarName = `name: ${name}, category: arg, index: ${subroutineSymbolTable.indexOf(
        name,
      )}, usage: declared`;
      process(extendedVarName, isString, indentLevel); // varName
      while (currentToken() === ',') {
        process(',', exactly, indentLevel);
        const type = currentToken(); // type
        process(type, isString, indentLevel);
        const name = currentToken().toString();
        subroutineSymbolTable.define(name, type.toString(), 'arg');
        const extendedVarName = `name: ${name}, category: arg, index: ${subroutineSymbolTable.indexOf(
          name,
        )}, usage: declared`;
        process(extendedVarName, isString, indentLevel); // varName
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</parameterList>', indentLevel));
  };

  const compileSubroutineBody = (subroutineName: string, subroutineKeyword: string) => {
    print(toLineWithIndent('<subroutineBody>', indentLevel));
    indentLevel += 1;
    process('{', exactly, indentLevel);
    while (currentToken() === 'var') {
      compileVarDec();
    }

    codeGenerator.writeFunction(subroutineName, subroutineSymbolTable.varCount('var'));

    if (subroutineKeyword === 'constructor') {
      codeGenerator.writePush('CONST', classSymbolTable.varCount('field'));
      codeGenerator.writeCall('Memory.alloc', 1);
      codeGenerator.writePop('POINTER', 0);
    } else if (subroutineKeyword === 'method') {
      codeGenerator.writePush('ARGUMENT', 0);
      codeGenerator.writePop('POINTER', 0);
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
    const type = currentToken();
    const isClass = isStringStartsWithCapital(type);
    if (isClass) {
      const extendedClassName = `name: ${type}, category: class, index: none, usage: used`;
      process(extendedClassName, isString, indentLevel);
    } else {
      process(type, isString, indentLevel);
    }
    const name = currentToken().toString();
    subroutineSymbolTable.define(name, type.toString(), 'var');
    const extendedVarName = `name: ${name}, category: var, index: ${subroutineSymbolTable.indexOf(
      name,
    )}, usage: declared`;
    process(extendedVarName, isString, indentLevel); // varName

    while (currentToken() === ',') {
      process(',', exactly, indentLevel);
      const name = currentToken().toString();
      subroutineSymbolTable.define(name, type.toString(), 'var');
      const extendedVarName = `name: ${name}, category: var, index: ${subroutineSymbolTable.indexOf(
        name,
      )}, usage: declared`;
      process(extendedVarName, isString, indentLevel); // varName
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
        ifStatementCount += 1;
        compileIf();
      } else if (currentToken() === 'while') {
        whileStatementCount += 1;
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
    const name = currentToken().toString();
    const extendedVarName = `name: ${name}, category: ${subroutineSymbolTable.kindOf(
      name,
    )}, index: ${subroutineSymbolTable.indexOf(name)}, usage: used`;
    process(extendedVarName, isString, indentLevel); // varName
    if (currentToken() === '[') {
      process('[', exactly, indentLevel);
      compileExpression();
      process(']', exactly, indentLevel);
    }
    process('=', exactly, indentLevel);
    compileExpression();
    process(';', exactly, indentLevel);
    const varKind = subroutineSymbolTable.kindOf(name);
    codeGenerator.writePop(
      varKind === 'var' ? 'LOCAL' : varKind === 'arg' ? 'ARGUMENT' : 'THIS',
      varKind === 'var' || varKind === 'arg'
        ? subroutineSymbolTable.indexOf(name)
        : classSymbolTable.indexOf(name),
    );

    indentLevel -= 1;
    print(toLineWithIndent('</letStatement>', indentLevel));
  };

  const compileIf = () => {
    const localIfStatementCount = ifStatementCount;
    print(toLineWithIndent('<ifStatement>', indentLevel));
    indentLevel += 1;
    process('if', exactly, indentLevel);
    process('(', exactly, indentLevel);
    compileExpression();
    codeGenerator.writeIf(`IF_TRUE${localIfStatementCount}`);
    codeGenerator.writeGoto(`IF_FALSE${localIfStatementCount}`);
    process(')', exactly, indentLevel);
    process('{', exactly, indentLevel);
    codeGenerator.writeLabel(`IF_TRUE${localIfStatementCount}`);
    compileStatements();
    process('}', exactly, indentLevel);
    if (currentToken() === 'else') {
      process('else', exactly, indentLevel);
      process('{', exactly, indentLevel);
      codeGenerator.writeGoto(`IF_END${localIfStatementCount}`);
      codeGenerator.writeLabel(`IF_FALSE${localIfStatementCount}`);
      compileStatements();
      process('}', exactly, indentLevel);
      codeGenerator.writeLabel(`IF_END${localIfStatementCount}`);
    } else {
      codeGenerator.writeLabel(`IF_FALSE${localIfStatementCount}`);
    }
    indentLevel -= 1;
    print(toLineWithIndent('</ifStatement>', indentLevel));
  };

  const compileWhile = () => {
    const localWhileStatementCount = whileStatementCount;
    print(toLineWithIndent('<whileStatement>', indentLevel));
    indentLevel += 1;
    process('while', exactly, indentLevel);
    process('(', exactly, indentLevel);
    codeGenerator.writeLabel(`WHILE_EXP${localWhileStatementCount}`);
    compileExpression();
    codeGenerator.writeArithmetic('NOT');
    codeGenerator.writeIf(`WHILE_END${localWhileStatementCount}`);
    process(')', exactly, indentLevel);
    process('{', exactly, indentLevel);
    compileStatements();
    codeGenerator.writeGoto(`WHILE_EXP${localWhileStatementCount}`);
    process('}', exactly, indentLevel);
    codeGenerator.writeLabel(`WHILE_END${localWhileStatementCount}`);
    indentLevel -= 1;
    print(toLineWithIndent('</whileStatement>', indentLevel));
  };

  const compileDo = () => {
    let argCount = 0;
    let subroutineName = '';

    print(toLineWithIndent('<doStatement>', indentLevel));
    indentLevel += 1;
    process('do', exactly, indentLevel);
    const name = currentToken().toString(); // subroutineName | className | varName
    if (subroutineSymbolTable.kindOf(name) !== 'none') {
      const kind = subroutineSymbolTable.kindOf(name);
      codeGenerator.writePush(
        kind === 'var' ? 'LOCAL' : kind === 'arg' ? 'ARGUMENT' : 'POINTER',
        kind === 'var' || kind === 'arg'
          ? subroutineSymbolTable.indexOf(name)
          : classSymbolTable.indexOf(name),
      );
      subroutineName = subroutineSymbolTable.typeOf(name);
      argCount += 1;
    } else if (classSymbolTable.kindOf(name) !== 'none') {
      const kind = classSymbolTable.kindOf(name);
      codeGenerator.writePush(
        kind === 'static' ? 'STATIC' : kind === 'field' ? 'THIS' : 'POINTER',
        classSymbolTable.indexOf(name),
      );
      subroutineName = classSymbolTable.typeOf(name);
      argCount += 1;
    } else {
      if (isStringStartsWithCapital(name)) {
        subroutineName = name;
      } else {
        codeGenerator.writePush('POINTER', 0);
        subroutineName = `${className}.${name}`;
        argCount += 1;
      }
    }

    process(name, isString, indentLevel);
    if (currentToken() === '(') {
      process('(', exactly, indentLevel);
      argCount += compileExpressionList();
      process(')', exactly, indentLevel);
    } else if (currentToken() === '.') {
      process('.', exactly, indentLevel);
      const name = currentToken().toString(); // subroutineName
      subroutineName += `.${name}`;
      const extendedSubroutineName = `name: ${name}, category: subroutine, index: none, usage: used`;
      process(extendedSubroutineName, isString, indentLevel);
      process('(', exactly, indentLevel);
      argCount += compileExpressionList();
      process(')', exactly, indentLevel);
    }
    process(';', exactly, indentLevel);

    codeGenerator.writeCall(subroutineName, argCount);
    codeGenerator.writePop('TEMP', 0);
    indentLevel -= 1;
    print(toLineWithIndent('</doStatement>', indentLevel));
  };

  const compileReturn = () => {
    print(toLineWithIndent('<returnStatement>', indentLevel));
    indentLevel += 1;
    process('return', exactly, indentLevel);
    if (currentToken() !== ';') {
      compileExpression();
    } else {
      codeGenerator.writePush('CONST', 0);
    }
    process(';', exactly, indentLevel);
    codeGenerator.writeReturn();
    indentLevel -= 1;
    print(toLineWithIndent('</returnStatement>', indentLevel));
  };

  const compileExpression = () => {
    print(toLineWithIndent('<expression>', indentLevel));
    indentLevel += 1;
    compileTerm();
    while (isOperator(currentToken())) {
      const operator = currentToken();
      process(operator, isOperator, indentLevel);
      compileTerm();
      if (operator === '*') {
        codeGenerator.writeCall('Math.multiply', 2);
      } else if (operator === '/') {
        codeGenerator.writeCall('Math.divide', 2);
      } else {
        codeGenerator.writeArithmetic(OperatorCommandMap[operator as string]);
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</expression>', indentLevel));
  };

  const compileExpressionList = () => {
    let numberOfExpressions = 0;
    print(toLineWithIndent('<expressionList>', indentLevel));
    indentLevel += 1;
    if (currentToken() !== ')') {
      compileExpression();
      numberOfExpressions += 1;
      while (currentToken() === ',') {
        process(',', exactly, indentLevel);
        compileExpression();
        numberOfExpressions += 1;
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</expressionList>', indentLevel));
    return numberOfExpressions;
  };

  const compileTerm = () => {
    print(toLineWithIndent('<term>', indentLevel));
    indentLevel += 1;
    if (currentToken() === '(') {
      process('(', exactly, indentLevel);
      compileExpression();
      process(')', exactly, indentLevel);
    } else if (isUnaryOperator(currentToken())) {
      const unaryOperator = currentToken();
      process(unaryOperator, isUnaryOperator, indentLevel);
      compileTerm();
      codeGenerator.writeArithmetic(unaryOperator === '-' ? 'NEG' : 'NOT');
    } else {
      const savedToken = currentToken();
      const savedTokenType = tokenizer.tokenType();
      if (savedTokenType === 'IDENTIFIER') {
        let functionName = '';
        let argCount = 0;
        tokenizer.advance();
        const nextToken = currentToken();
        if (nextToken === '[') {
          const varName = savedToken.toString();
          const extendedVarName = `name: ${varName}, category: ${subroutineSymbolTable.kindOf(
            varName,
          )}, index: ${subroutineSymbolTable.indexOf(varName)}, usage: used`;
          codeGenerator.writePop('LOCAL', subroutineSymbolTable.indexOf(varName));
          codeGenerator.writePush('LOCAL', subroutineSymbolTable.indexOf(varName));
          process(extendedVarName, () => true, indentLevel, {
            withoutAdvance: true,
            givenType: savedTokenType,
          });
          process('[', exactly, indentLevel);
          compileExpression();
          process(']', exactly, indentLevel);
        } else if (nextToken === '(') {
          const subroutineName = savedToken.toString();
          functionName = subroutineName;
          const extendedSubroutineName = `name: ${subroutineName}, category: subroutine, index: none, usage: used`;
          process(extendedSubroutineName, () => true, indentLevel, {
            withoutAdvance: true,
            givenType: savedTokenType,
          });
          process('(', exactly, indentLevel);
          argCount = compileExpressionList();
          process(')', exactly, indentLevel);
        } else if (nextToken === '.') {
          const className = savedToken.toString();
          const extendedClassName = `name: ${className}, category: class, index: none, usage: used`;
          process(extendedClassName, () => true, indentLevel, {
            withoutAdvance: true,
            givenType: savedTokenType,
          });
          process('.', exactly, indentLevel);
          const subroutineName = currentToken();
          functionName = `${className}.${subroutineName}`;
          const extendedSubroutineName = `name: ${subroutineName}, category: subroutine, index: none, usage: used`;
          process(extendedSubroutineName, isString, indentLevel);
          process('(', exactly, indentLevel);
          argCount = compileExpressionList();
          process(')', exactly, indentLevel);
        } else {
          const varName = savedToken.toString();
          const extendedVarName = `varName: ${varName}, category: ${subroutineSymbolTable.kindOf(
            varName,
          )}, index: ${subroutineSymbolTable.indexOf(varName)}, usage: used`;
          process(extendedVarName, isString, indentLevel, {
            withoutAdvance: true,
            givenType: savedTokenType,
          });
          const varKind = subroutineSymbolTable.kindOf(varName);
          codeGenerator.writePush(
            varKind === 'var' ? 'LOCAL' : varKind === 'arg' ? 'ARGUMENT' : 'THIS',
            varKind === 'var' || varKind === 'arg'
              ? subroutineSymbolTable.indexOf(varName)
              : classSymbolTable.indexOf(varName),
          );
        }
        if (functionName.length !== 0) {
          codeGenerator.writeCall(functionName, argCount);
        }
      } else if (savedTokenType === 'INT_CONST') {
        process(savedToken, isNumber, indentLevel);
        codeGenerator.writePush('CONST', savedToken as number);
      } else if (savedTokenType === 'STRING_CONST') {
        process(savedToken, isString, indentLevel);
        const string = savedToken as string;
        codeGenerator.writePush('CONST', string.length);
        codeGenerator.writeCall('String.new', 1);
        for (let i = 0; i < string.length; i++) {
          codeGenerator.writePush('CONST', string.charCodeAt(i));
          codeGenerator.writeCall('String.appendChar', 2);
        }
      } else if (savedToken === 'true') {
        process('true', exactly, indentLevel);
        codeGenerator.writePush('CONST', 0);
        codeGenerator.writeArithmetic('NOT');
      } else if (savedToken === 'false' || savedToken === 'null') {
        process(savedToken, () => true, indentLevel);
        codeGenerator.writePush('CONST', 0);
      } else if (savedToken === 'this') {
        process('this', exactly, indentLevel);
        codeGenerator.writePush('POINTER', 0);
      }
    }
    indentLevel -= 1;
    print(toLineWithIndent('</term>', indentLevel));
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
