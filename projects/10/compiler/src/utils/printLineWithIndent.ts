export const printLineWithIndent = (target: string, indentLevel: number) =>
  ' '.repeat(indentLevel * 2) + target + '\n';
