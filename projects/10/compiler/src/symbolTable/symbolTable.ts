export type Kind = 'static' | 'field' | 'arg' | 'var';

export type SymbolTable = {
  reset: () => void;
  define: (name: string, type: string, kind: Kind) => void;
  varCount: (kind: Kind) => number;
  kindOf: (name: string) => Kind | 'none';
  typeOf: (name: string) => string;
  indexOf: (name: string) => number;
};

export const EMPTY_SYMBOL_TABLE: SymbolTable = {
  reset: () => {},
  define: () => {},
  varCount: () => 0,
  kindOf: () => 'none',
  typeOf: () => '',
  indexOf: () => 0,
};

export const symbolTable = (): SymbolTable => {
  let staticIndex = 0;
  let fieldIndex = 0;
  let argIndex = 0;
  let varIndex = 0;

  let table: Record<string, { type: string; kind: Kind; index: number }> = {};

  const reset = () => {
    staticIndex = 0;
    fieldIndex = 0;
    argIndex = 0;
    varIndex = 0;
    table = {};
  };

  const define = (name: string, type: string, kind: Kind) => {
    switch (kind) {
      case 'static':
        table[name] = { type, kind, index: staticIndex };
        staticIndex += 1;
        break;
      case 'field':
        table[name] = { type, kind, index: fieldIndex };
        fieldIndex += 1;
        break;
      case 'arg':
        table[name] = { type, kind, index: argIndex };
        argIndex += 1;
        break;
      case 'var':
        table[name] = { type, kind, index: varIndex };
        varIndex += 1;
        break;
    }
  };

  const varCount = (kind: Kind) => {
    switch (kind) {
      case 'static':
        return staticIndex;
      case 'field':
        return fieldIndex;
      case 'arg':
        return argIndex;
      case 'var':
        return varIndex;
    }
  };

  const kindOf = (name: string) => {
    const entry = table[name];
    if (!entry) {
      return 'none';
    }

    return entry.kind;
  };

  const typeOf = (name: string) => {
    const entry = table[name];
    if (!entry) {
      return '';
    }

    return entry.type;
  };

  const indexOf = (name: string) => {
    const entry = table[name];
    if (!entry) {
      return 0;
    }

    return entry.index;
  };

  return {
    reset,
    define,
    varCount,
    kindOf,
    typeOf,
    indexOf,
  };
};
