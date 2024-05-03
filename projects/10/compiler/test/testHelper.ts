import fs from 'node:fs';

export const deleteFile = (path: string, ignoreError = true): void => {
  fs.rmSync(path, { force: ignoreError });
};

export const fileTestTemplate = async (
  f: () => void | Promise<void>,
  ...filePaths: string[]
): Promise<void> => {
  await Promise.all(filePaths.map((it) => deleteFile(it)));

  const result = f();

  if (typeof (result as any)['then'] === 'function') {
    await result;
  }

  await Promise.all(filePaths.map((it) => deleteFile(it)));
};
