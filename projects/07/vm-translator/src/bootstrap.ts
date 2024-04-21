export const bootstrap = (): string => {
  return `
// bootstrap
// set SP=256
   @256
   D=A
   @5
   D=D+A
   @SP
   M=D
// call Sys.init
   @Sys.init
   0;JMP
  `.trim();
};
