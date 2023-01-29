import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
  isPretter: boolean;
  isCli: boolean;
}

export function createFileEslintrc(params: Params) {
  const extendsList = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ];

  const ignorePatterns: string[] = [];

  if (params.isPretter) {
    extendsList.push('prettier');
  }

  if (params.isCli) {
    ignorePatterns.push('cli.js');
  }

  const context = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.eslint.json',
    },
    plugins: ['@typescript-eslint'],
    extends: extendsList,
    ignorePatterns,
    rules: {},
  };

  const path = `${params.projectDir}/.eslintrc`;

  return writeFile(path, format(JSON.stringify(context), { parser: 'json' }), {
    encoding: 'utf8',
  });
}
