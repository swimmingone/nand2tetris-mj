import { TranslateOptions } from '../src/translate';
import fs from 'node:fs';

export const translateDefaultOptions: () => TranslateOptions = () => ({
  jumpCount: 0,
  setJumpCount: () => {},
});

export const readFilePromise = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
