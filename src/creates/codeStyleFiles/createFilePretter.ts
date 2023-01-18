import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
}

export function createFilePretter(params: Params) {
  const context = {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
  };

  const path = `${params.projectDir}/.prettierrc`;

  return writeFile(path, format(JSON.stringify(context), { parser: 'json' }), {
    encoding: 'utf8',
  });
}
