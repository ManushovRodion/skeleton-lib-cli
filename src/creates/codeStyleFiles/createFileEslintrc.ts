import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
  isPretter: boolean;
}

export function createFileEslintrc(params: Params) {
  const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ];

  if (params.isPretter) {
    extendsList.push('prettier');
  }

  const context = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.eslint.json',
    },
    plugins: ['@typescript-eslint'],
    extends: extendsList,
    rules: {},
  };

  const path = `${params.projectDir}/.eslintrc`;

  return writeFile(path, format(JSON.stringify(context), { parser: 'json' }), {
    encoding: 'utf8',
  });
}
