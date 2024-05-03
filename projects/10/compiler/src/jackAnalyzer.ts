import { jackTokenizer } from './jackTokenizer';
import { readFilePromise } from './readFilePromise';
import { writeFilePromise } from './writeFilePromise';
import { readdirPromise } from './readdirPromise';

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

  const jackCode = await readFilePromise(jackFile);

  const xml = jackTokenizer(jackCode);
  const xmlFile = jackFile.replace('.jack', '.xml');

  await writeFilePromise(xmlFile, xml);
};
