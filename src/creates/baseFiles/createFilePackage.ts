import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Data {
  name: string;
  description: string;
  author: string;
  authorEmail: string;
  authorUrl: string;
  urlRepository: string;
  urlIssues: string;
  urlHome: string;
}
export interface Params {
  projectDir: string;
  isESLint: boolean;
  isPretter: boolean;
  isJest: boolean;
  isCli: boolean;
}

export type MapObject = { [key: string]: string };

export function createFilePackage(data: Data, params: Params) {
  const meta: { [key: string]: string | [] } = {
    name: data.name,
    version: '1.0.0',
    description: data.description,
    license: 'MIT',
    keywords: [],
  };

  if (data.urlHome) {
    meta['homepage'] = data.urlHome;
  }

  const dist = {
    files: ['dist'],
    main: `dist/${data.name}.cjs.js`,
    unpkg: `dist/${data.name}.umd.js`,
    module: `dist/${data.name}.esm.js`,
    types: `dist/${data.name}.d.ts`,
  };

  const cli: { bin?: MapObject } = {};
  if (params.isCli) {
    cli['bin'] = {};
    cli.bin[data.name] = './bin/cli.js';
  }

  const scripts: MapObject = {
    build:
      'rimraf dist && rollup --c rollup.config.ts --configPlugin typescript && rimraf dist/types',
  };

  if (params.isESLint) {
    scripts['lint'] = 'eslint --ignore-path .gitignore .';
  }

  if (params.isPretter) {
    scripts['lint:format'] = 'prettier --ignore-path .gitignore --write .';
  }

  if (params.isJest) {
    scripts['test'] = 'jest';
  }

  const author: MapObject = {
    name: data.author,
  };

  if (data.authorEmail) {
    author['email'] = data.authorEmail;
  }

  if (data.authorUrl) {
    author['url'] = data.authorUrl;
  }

  const repository = {
    type: 'git',
    url: `git+${data.urlRepository}.git`,
  };

  const bugs = {
    url: data.urlIssues,
  };

  const dependencies = {};

  const devDependencies: MapObject = {
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

  const husky: { husky?: { hooks: MapObject }; 'lint-staged'?: MapObject } = {};

  if (params.isESLint || params.isPretter) {
    devDependencies['husky'] = '8.0.3';
    devDependencies['lint-staged'] = '13.1.0';

    husky['husky'] = {
      hooks: { 'pre-commit': 'lint-staged' },
    };

    if (params.isJest) {
      husky['husky']['hooks']['pre-push'] = 'yarn test';
    }

    husky['lint-staged'] = {};
    if (params.isPretter) husky['lint-staged']['*.*'] = 'yarn lint:format';
    if (params.isESLint) husky['lint-staged']['*.ts'] = 'yarn lint';
  }

  if (params.isESLint) {
    devDependencies['eslint'] = '8.31.0';
    devDependencies['@typescript-eslint/eslint-plugin'] = '5.48.0';
    devDependencies['@typescript-eslint/parser'] = '5.48.0';
  }

  if (params.isPretter) {
    devDependencies['prettier'] = '2.8.2';
  }

  if (params.isESLint && params.isPretter) {
    devDependencies['eslint-config-prettier'] = '8.6.0';
  }

  if (params.isJest) {
    devDependencies['jest'] = '29.3.1';
    devDependencies['@types/jest'] = '29.2.5';
    devDependencies['ts-jest'] = '29.0.3';
  }

  const context: { [key: string]: unknown } = {
    ...meta,
    author,
    ...dist,
    ...cli,
    repository,
    bugs,
    scripts,
    dependencies,
    devDependencies,
    ...husky,
  };

  const path = `${params.projectDir}/package.json`;

  return writeFile(
    path,
    format(JSON.stringify(context), { parser: 'json', printWidth: 20 }),
    {
      encoding: 'utf8',
    }
  );
}
