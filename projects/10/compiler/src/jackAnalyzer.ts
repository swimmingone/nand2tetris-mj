import { readFilePromise } from './readFilePromise';
import { readdirPromise } from './readdirPromise';
import * as readline from 'readline/promises';
import fs from 'node:fs';

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

  // create a stream interface to read line by line from path of jackFile

  const rl = readline.createInterface({
    input: fs.createReadStream(jackFile),
    terminal: false,
  });

  const jackCode = await readFilePromise(jackFile);

  let currentLineNumber = 0;
  const readLine = () => {
    const line = jackCode.split('\n')[currentLineNumber];
    currentLineNumber += 1;
    return line;
  };

  // const tokenizer = jackTokenizer(readLine);
  // const xmlFile = jackFile.replace('.jack', '.xml');
  //
  // await writeFilePromise(xmlFile, xml);
};
