import type { State } from './types';

interface Context {
  root: boolean;
  parser: string;
  parserOptions: {
    project: string;
  };
  plugins: string[];
  extends: string[];
  ignorePatterns: string[];
}

export function generator(state: State) {
  const context: Context = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.eslint.json',
    },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: [],
  };

  if (state.isPrettier) {
    context.extends.push('prettier');
  }

  if (state.isCommandLineInterface) {
    context.ignorePatterns.push('cli.js');
  }

  return JSON.stringify(context);
}
