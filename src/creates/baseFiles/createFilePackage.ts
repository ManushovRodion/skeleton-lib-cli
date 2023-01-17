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
}

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

  // const bin = {
  //   [data.name]: './bin/cli.js',
  // };

  const scripts = {
    build:
      'rimraf dist && rollup --c rollup.config.ts --configPlugin typescript && rimraf dist/types',
    //lint: 'eslint --ignore-path .gitignore .',
    //'lint:format': 'prettier --ignore-path .gitignore --write .',
    //test: 'jest',
  };

  const author: { [key: string]: string } = {
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

  // const husky = {
  //   hooks: {
  //     'pre-commit': 'yarn lint:format && yarn lint --fix && yarn test',
  //   },
  // };

  const dependencies = {};

  const devDependencies = {
    '@rollup/plugin-json': '6.0.0',
    '@rollup/plugin-terser': '0.3.0',
    '@rollup/plugin-typescript': '11.0.0',
    //'@types/jest': '29.2.5',
    '@types/node': '16.18.11',
    //'@typescript-eslint/eslint-plugin': '5.48.0',
    // '@typescript-eslint/parser': '5.48.0',
    // eslint: '8.31.0',
    //'eslint-config-prettier': '8.6.0',
    //husky: '8.0.3',
    //jest: '29.3.1',
    //prettier: '2.8.2',
    rimraf: '3.0.2',
    rollup: '3.9.1',
    'rollup-plugin-dts': '5.1.1',
    //'ts-jest': '29.0.3',
    tslib: '2.4.1',
    typescript: '4.9.4',
  };

  const context: { [key: string]: unknown } = {
    ...meta,
    author,
    ...dist,
    //bin,
    repository,
    bugs,
    scripts,
    dependencies,
    devDependencies,
    //husky,
  };

  const path = `${params.projectDir}/package.json`;

  return writeFile(path, format(JSON.stringify(context), { parser: 'json' }), {
    encoding: 'utf8',
  });
}
