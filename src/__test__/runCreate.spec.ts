import fs from 'fs/promises';

/**
 * QUESTIONS...
 */

import * as QAuthorName from './../questions/author/questionAuthorName';
import * as QAuthorEmail from './../questions/author/questionAuthorEmail';
import * as QAuthorURL from './../questions/author/questionAuthorURL';

import * as QURLRepository from './../questions/url/questionURLRepository';
import * as QURLIssues from './../questions/url/questionURLIssues';
import * as QURLHome from './../questions/url/questionURLHome';

import * as QMultiLangDocs from './../questions/multiLangDocs/questionMultiLangDocs';
import * as QMultiLangDocsList from './../questions/multiLangDocs/questionMultiLangDocsList';

import * as QLicense from './../questions/license/questionLicense';
import * as QLicenseСopyright from './../questions/license/questionLicenseСopyright';

import * as QPackageName from './../questions/package/questionPackageName';
import * as QPackageDescription from './../questions/package/questionPackageDescription';

import * as QCommandLineInterface from './../questions/questionCommandLineInterface';
import * as QСodeStyle from './../questions/questionСodeStyle';
import * as QUnitTest from './../questions/questionUnitTest';

import { runCreate } from '../runCreate';

type Files =
  | 'package.json'
  | '.nvmrc'
  | '.gitignore'
  | 'LICENSE'
  | 'rollup.config.ts'
  | 'tsconfig.json'
  | 'README.md'
  | 'CHANGELOG.md'
  | 'src/main.ts'
  | 'bin/cli.js'
  | '.eslintrc'
  | 'tsconfig.eslint.json'
  | '.prettierrc'
  | 'jest.config.json'
  | 'src/main.spec.ts'
  | 'docs/README-RU.md'
  | 'docs/README-EN.md'
  | 'docs/CHANGELOG-RU.md'
  | 'docs/CHANGELOG-EN.md'
  | '.husky/pre-commit'
  | '.husky/pre-push';

const DIR_TEST = './src/__test__/runCreate';
const PACKAGE_NAME = 'package_name';

const getFileName = (name: Files) => {
  return `${DIR_TEST}/${PACKAGE_NAME}/${name}`;
};

describe('runCreate', () => {
  beforeEach(async () => {
    /**
     * AUTHOR
     */
    jest.spyOn(QAuthorName, 'questionAuthorName').mockResolvedValue('');
    jest.spyOn(QAuthorEmail, 'questionAuthorEmail').mockResolvedValue('');
    jest.spyOn(QAuthorURL, 'questionAuthorURL').mockResolvedValue('');

    /**
     * URL`s
     */
    jest.spyOn(QURLRepository, 'questionURLRepository').mockResolvedValue('');
    jest.spyOn(QURLIssues, 'questionURLIssues').mockResolvedValue('');
    jest.spyOn(QURLHome, 'questionURLHome').mockResolvedValue('');

    /**
     * MULTIDOCS
     */
    jest
      .spyOn(QMultiLangDocs, 'questionMultiLangDocs')
      .mockResolvedValue(false);
    jest
      .spyOn(QMultiLangDocsList, 'questionMultiLangDocsList')
      .mockResolvedValue(['ru', 'en']);

    /**
     * LICENSE
     */
    jest.spyOn(QLicense, 'questionLicense').mockResolvedValue('');
    jest
      .spyOn(QLicenseСopyright, 'questionLicenseСopyright')
      .mockResolvedValue('copyright');

    /**
     * PACKAGE
     */
    jest
      .spyOn(QPackageName, 'questionPackageName')
      .mockResolvedValue(PACKAGE_NAME);

    jest
      .spyOn(QPackageDescription, 'questionPackageDescription')
      .mockResolvedValue('');

    /**
     * OTHER
     */

    jest
      .spyOn(QCommandLineInterface, 'questionCommandLineInterface')
      .mockResolvedValue(false);
    jest.spyOn(QСodeStyle, 'questionСodeStyle').mockResolvedValue('');
    jest.spyOn(QUnitTest, 'questionUnitTest').mockResolvedValue('');
  });

  afterAll(async () => {
    await fs.rmdir(DIR_TEST, { recursive: true });
  });

  it('Создаются базовые файлы', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
    ]);
  });

  it('Созданы базовые файлы + необходимые файды для cli', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest
      .spyOn(QCommandLineInterface, 'questionCommandLineInterface')
      .mockResolvedValue(true);

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('bin/cli.js'),
    ]);
  });

  it('Созданы базовые файлы + необходимые файды для eslint', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(QСodeStyle, 'questionСodeStyle').mockResolvedValue('ESLINT');

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('.eslintrc'),
      getFileName('tsconfig.eslint.json'),
      getFileName('.husky/pre-commit'),
    ]);
  });

  it('Созданы базовые файлы + необходимые файды для prettier', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(QСodeStyle, 'questionСodeStyle').mockResolvedValue('PRETTIER');

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('.prettierrc'),
      getFileName('.husky/pre-commit'),
    ]);
  });

  it('Созданы базовые файлы + необходимые файды для eslint and prettier', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(QСodeStyle, 'questionСodeStyle').mockResolvedValue('FULL');

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('.eslintrc'),
      getFileName('tsconfig.eslint.json'),
      getFileName('.prettierrc'),
      getFileName('.husky/pre-commit'),
    ]);
  });

  it('Созданы базовые файлы + необходимые файды для jest', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(QUnitTest, 'questionUnitTest').mockResolvedValue('JEST');

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('jest.config.json'),
      getFileName('src/main.spec.ts'),
      getFileName('.husky/pre-push'),
    ]);
  });

  it('Созданы базовые файлы + необходимые файды для multilang', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(QMultiLangDocs, 'questionMultiLangDocs').mockResolvedValue(true);

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('docs/README-RU.md'),
      getFileName('docs/CHANGELOG-RU.md'),
      getFileName('docs/README-EN.md'),
      getFileName('docs/CHANGELOG-EN.md'),
    ]);
  });

  it('Созданы базовые файлы + license', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(QLicense, 'questionLicense').mockResolvedValue('MIT');

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('LICENSE'),
    ]);
  });

  it('Созданы все файла для полного конплекта', async () => {
    const mock = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest
      .spyOn(QCommandLineInterface, 'questionCommandLineInterface')
      .mockResolvedValue(true);
    jest.spyOn(QСodeStyle, 'questionСodeStyle').mockResolvedValue('FULL');
    jest.spyOn(QUnitTest, 'questionUnitTest').mockResolvedValue('JEST');
    jest.spyOn(QMultiLangDocs, 'questionMultiLangDocs').mockResolvedValue(true);
    jest.spyOn(QLicense, 'questionLicense').mockResolvedValue('MIT');

    await runCreate({ rootDir: DIR_TEST, lang: 'ru' });
    const files: unknown[] = mock.mock.calls.map((item) => item[0]);

    expect(files).toEqual([
      getFileName('package.json'),
      getFileName('.nvmrc'),
      getFileName('.gitignore'),
      getFileName('rollup.config.ts'),
      getFileName('tsconfig.json'),
      getFileName('README.md'),
      getFileName('CHANGELOG.md'),
      getFileName('src/main.ts'),
      getFileName('bin/cli.js'),
      getFileName('docs/README-RU.md'),
      getFileName('docs/CHANGELOG-RU.md'),
      getFileName('docs/README-EN.md'),
      getFileName('docs/CHANGELOG-EN.md'),
      getFileName('.eslintrc'),
      getFileName('tsconfig.eslint.json'),
      getFileName('.prettierrc'),
      getFileName('.husky/pre-commit'),
      getFileName('jest.config.json'),
      getFileName('src/main.spec.ts'),
      getFileName('.husky/pre-push'),
      getFileName('LICENSE'),
    ]);
  });
});
