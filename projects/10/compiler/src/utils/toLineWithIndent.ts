export const toLineWithIndent = (target: string, indentLevel = 0) =>
  ' '.repeat(indentLevel * 2) + target + '\n';
