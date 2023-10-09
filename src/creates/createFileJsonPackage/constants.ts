import type { MapObject } from './types';

export const FILE_NAME = 'package.json';

export const CLI_SCRIPT_BUILD =
  'rimraf dist && rollup --c rollup.config.ts --configPlugin typescript && rimraf dist/types';

export const CLI_SCRIPT_LINT = 'eslint --ignore-path .gitignore .';

export const CLI_SCRIPT_LINT_FORMAT =
  'prettier --ignore-path .gitignore --write .';

export const CLI_SCRIPT_TEST = 'jest';

export const DEV_DEPENDENCIES_BASE: MapObject = {
  '@rollup/plugin-json': '6.0.1',
  '@rollup/plugin-terser': '0.4.4',
  '@rollup/plugin-typescript': '11.1.5',
  '@types/node': '20.8.3',
  rimraf: '5.0.5',
  rollup: '4.0.2',
  'rollup-plugin-dts': '6.1.0',
  tslib: '2.6.2',
  typescript: '5.2.2',
};

export const DEV_DEPENDENCIES_ESLINT: MapObject = {
  eslint: '8.51.0',
  '@typescript-eslint/eslint-plugin': '6.7.4',
  '@typescript-eslint/parser': '6.7.4',
  husky: '8.0.3',
};

export const DEV_DEPENDENCIES_PRETTIER: MapObject = {
  prettier: '3.0.3',
  husky: '8.0.3',
};

export const DEV_DEPENDENCIES_ESLINT_PRETTIER: MapObject = {
  'eslint-config-prettier': '9.0.0',
  husky: '8.0.3',
};

export const DEV_DEPENDENCIES_JEST: MapObject = {
  jest: '29.7.0',
  'ts-jest': '29.1.1',
  '@types/jest': '29.5.5',
  husky: '8.0.3',
};
