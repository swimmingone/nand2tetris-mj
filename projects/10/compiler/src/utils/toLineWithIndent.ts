export const toLineWithIndent = (target: string, indentLevel: number) =>
  ' '.repeat(indentLevel * 2) + target + '\n';
