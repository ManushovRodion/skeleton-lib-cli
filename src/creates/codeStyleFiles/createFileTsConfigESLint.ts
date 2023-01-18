import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
}

export function createFileTsConfigESLint(params: Params) {
  const context = {
    extends: './tsconfig.json',
  };

  const path = `${params.projectDir}/tsconfig.eslint.json`;

  return writeFile(path, format(JSON.stringify(context), { parser: 'json' }), {
    encoding: 'utf8',
  });
}
