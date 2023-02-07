import type { MapObject } from './types';

export const CLI_SCRIPT_BUILD =
  'rimraf dist && rollup --c rollup.config.ts --configPlugin typescript && rimraf dist/types';

export const CLI_SCRIPT_LINT = 'eslint --ignore-path .gitignore .';

export const CLI_SCRIPT_LINT_FORMAT =
  'prettier --ignore-path .gitignore --write .';

export const CLI_SCRIPT_TEST = 'jest';

export const DEV_DEPENDENCIES_BASE: MapObject = {
  '@rollup/plugin-json': '6.0.0',
  '@rollup/plugin-terser': '0.3.0',
  '@rollup/plugin-typescript': '11.0.0',
  '@types/node': '16.18.11',
  rimraf: '3.0.2',
  rollup: '3.9.1',
  'rollup-plugin-dts': '5.1.1',
  tslib: '2.4.1',
  typescript: '4.9.4',
};

export const DEV_DEPENDENCIES_ESLINT: MapObject = {
  eslint: '8.31.0',
  '@typescript-eslint/eslint-plugin': '5.48.0',
  '@typescript-eslint/parser': '5.48.0',
};

export const DEV_DEPENDENCIES_PRETTIER: MapObject = {
  prettier: '2.8.2',
};

export const DEV_DEPENDENCIES_ESLINT_PRETTIER: MapObject = {
  'eslint-config-prettier': '8.6.0',
};

export const DEV_DEPENDENCIES_JEST: MapObject = {
  jest: '29.3.1',
  'ts-jest': '29.0.3',
  '@types/jest': '29.2.5',
};
