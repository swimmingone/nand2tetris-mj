import fs from 'node:fs';

type WriteFileParams = Parameters<typeof fs.writeFile>;

export const writeFilePromise = (
  path: WriteFileParams[0],
  data: WriteFileParams[1],
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
