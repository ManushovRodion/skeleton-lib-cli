import type { Options as PrettierOptions } from 'prettier';
import prettierConfig from './../.prettierrc.json';

/**
 * QUESTIONS...
 */

import { questionAuthorName } from './questions/author/questionAuthorName';
import { questionAuthorEmail } from './questions/author/questionAuthorEmail';
import { questionAuthorURL } from './questions/author/questionAuthorURL';

import { questionURLRepository } from './questions/url/questionURLRepository';
import { questionURLIssues } from './questions/url/questionURLIssues';
import { questionURLHome } from './questions/url/questionURLHome';

import { questionMultiLangDocs } from './questions/multiLangDocs/questionMultiLangDocs';
import { questionMultiLangDocsList } from './questions/multiLangDocs/questionMultiLangDocsList';

import { questionLicense } from './questions/license/questionLicense';
import { questionLicenseСopyright } from './questions/license/questionLicenseСopyright';

import { questionPackageName } from './questions/package/questionPackageName';
import { questionPackageDescription } from './questions/package/questionPackageDescription';

import { questionCommandLineInterface } from './questions/questionCommandLineInterface';
import { questionСodeStyle } from './questions/questionСodeStyle';
import { questionUnitTest } from './questions/questionUnitTest';

/**
 * CREATE DIRS...
 */

import { createDirPackage } from './creates/createDirPackage';

/**
 * CREATE FILES...
 */

import { createFileJsonPackage } from './creates/createFileJsonPackage';
import { createFileNVMRC } from './creates/createFileNVMRC';
import { createFileGitignore } from './creates/createFileGitignore';
import { createFileCommandLineInterface } from './creates/createFileCommandLineInterface';
import { createFileLicense } from './creates/createFileLicense';
import { createFileRollupConfig } from './creates/createFileRollupConfig';
import { createFileTsConfig } from './creates/createFileTsConfig';
import { createFileMain } from './creates/createFileMain';
import { createFileMainSpec } from './creates/createFileMainSpec';
import { createFileEslintrc } from './creates/createFileEslintrc';
import { createFileTsConfigEsLint } from './creates/createFileTsConfigEsLint';
import { createFilePrettierrc } from './creates/createFilePrettierrc';
import { createFileJestConfig } from './creates/createFileJestConfig';
import {
  createFileReadme,
  createFileReadmeMultilang,
} from './creates/createFileReadme';
import {
  createFileChangelog,
  createFileChangelogMultilang,
} from './creates/createFileChangelog';
import { createFileHuskyPreCommit } from './creates/createFileHuskyPreCommit/index';
import { createFileHuskyPrePush } from './creates/createFileHuskyPrePush/index';

export interface Options {
  rootDir: string;
  lang: string;
}

const PRETTIER_CONFIG = prettierConfig as PrettierOptions;

export async function runCreate({ rootDir, lang }: Options) {
  /**
   * FILES
   * ================================================================
   */
  const fileJsonPackage = createFileJsonPackage(PRETTIER_CONFIG);
  const fileNVMRC = createFileNVMRC(PRETTIER_CONFIG);
  const fileGitignore = createFileGitignore();
  const fileCLI = createFileCommandLineInterface(PRETTIER_CONFIG);
  const fileLicense = createFileLicense(PRETTIER_CONFIG);
  const fileRollupConfig = createFileRollupConfig(PRETTIER_CONFIG);
  const fileTsConfig = createFileTsConfig(PRETTIER_CONFIG);
  const fileMain = createFileMain(PRETTIER_CONFIG);
  const fileMainSpec = createFileMainSpec(PRETTIER_CONFIG);
  const fileEslintrc = createFileEslintrc(PRETTIER_CONFIG);
  const fileTsConfigEsLint = createFileTsConfigEsLint(PRETTIER_CONFIG);
  const filePrettierrc = createFilePrettierrc(PRETTIER_CONFIG);
  const fileJestConfig = createFileJestConfig(PRETTIER_CONFIG);
  const fileReadme = createFileReadme(PRETTIER_CONFIG);
  const fileReadmeMultilang = createFileReadmeMultilang(PRETTIER_CONFIG);
  const fileChangelog = createFileChangelog(PRETTIER_CONFIG);
  const fileChangelogMultilang = createFileChangelogMultilang(PRETTIER_CONFIG);
  const fileHuskyPreCommit = createFileHuskyPreCommit();
  const fileHuskyPrePush = createFileHuskyPrePush();

  /**
   * QUESTIONS
   * ================================================================
   */
  fileReadme.updateLang(lang);

  // name
  const packageName = await questionPackageName();

  fileJsonPackage.updateName(packageName);
  fileCLI.updateName(packageName);
  fileReadme.updateName(packageName);
  fileReadmeMultilang.updateName(packageName);
  fileChangelog.updateName(packageName);
  fileChangelogMultilang.updateName(packageName);

  // version
  const packageVersion = '0.1.0';

  fileJsonPackage.updateVersion(packageVersion);
  fileChangelog.updateVersion(packageVersion);
  fileChangelogMultilang.updateVersion(packageVersion);

  // description
  const packageDescription = await questionPackageDescription();

  fileJsonPackage.updateDescription(packageDescription);
  fileReadme.updateDescription(packageDescription);
  fileReadmeMultilang.updateDescription(packageDescription);

  // repository
  const urlRepository = await questionURLRepository();
  fileJsonPackage.updateUrlRepository(urlRepository);

  // issues
  const urlIssues = await questionURLIssues(urlRepository);
  fileJsonPackage.updateUrlIssues(urlIssues);

  // home
  const urlHome = await questionURLHome(urlRepository);
  fileJsonPackage.updateUrlHome(urlHome);

  // author
  const authorName = await questionAuthorName();
  const authorEmail = await questionAuthorEmail();
  const authorURL = await questionAuthorURL();
  fileJsonPackage.updateAuthor(authorName, authorEmail, authorURL);

  // license
  const license = await questionLicense();
  if (license) {
    const licenseCopyright = await questionLicenseСopyright(authorName);

    fileLicense.updateCopyright(licenseCopyright);
    fileJsonPackage.updateLicense(license);
    fileReadme.updateLicense(license);
    fileReadmeMultilang.updateLicense(license);
  }

  // codeStyle
  const codeStyle = await questionСodeStyle();
  switch (codeStyle) {
    case 'FULL': {
      fileJsonPackage.onESLint();
      fileJsonPackage.onPrettier();
      fileEslintrc.onPrettier();
      break;
    }
    case 'ESLINT': {
      fileJsonPackage.onESLint();
      break;
    }
    case 'PRETTIER': {
      fileJsonPackage.onPrettier();
      break;
    }
  }

  // unitTest
  const unitTest = await questionUnitTest();
  switch (unitTest) {
    case 'JEST': {
      fileJsonPackage.onJest();
      break;
    }
  }

  // commandLineInterface (CLI)
  const isCommandLineInterface = await questionCommandLineInterface();
  if (isCommandLineInterface) {
    fileJsonPackage.onCommandLineInterface();
    fileMain.onCommandLineInterface();
    fileMainSpec.onCommandLineInterface();
    fileEslintrc.onCommandLineInterface();
  }

  // multiLangDocs
  const isMultiLangDocs = await questionMultiLangDocs();
  let multiLangDocs: string[] = [];
  if (isMultiLangDocs) {
    multiLangDocs = await questionMultiLangDocsList(['ru', 'en']);

    const rootPathURLByIndex = './docs';
    const rootPathURL = './..';

    fileJsonPackage.onMultiLangDocs();

    fileReadme.onMultiLangDocs();
    fileReadme.updateLangsURL(multiLangDocs);
    fileReadme.updateRootPathURL(rootPathURLByIndex);

    fileReadmeMultilang.updateLangsURL(multiLangDocs);
    fileReadmeMultilang.updateRootPathURL(rootPathURL);

    fileChangelog.onMultiLangDocs();
    fileChangelog.updateLangsURL(multiLangDocs);
    fileChangelog.updateRootPathURL(rootPathURLByIndex);

    fileChangelogMultilang.updateLangsURL(multiLangDocs);
    fileChangelogMultilang.updateRootPathURL(rootPathURL);
  }

  /**
   * CREATES
   * ================================================================
   */
  const promiseList: (() => Promise<void>)[] = [];

  const packageDir = `${rootDir}/${packageName}`;
  await createDirPackage(packageDir);

  const packageSrcDir = `${rootDir}/${packageName}/src`;
  await createDirPackage(packageSrcDir);

  if (isCommandLineInterface) {
    const binDir = `${packageDir}/bin`;

    await createDirPackage(binDir);
    promiseList.push(() => fileCLI.render(binDir));
  }

  if (isMultiLangDocs) {
    const docsDir = `${packageDir}/docs`;

    await createDirPackage(docsDir);

    multiLangDocs.forEach((lang) => {
      promiseList.push(() => fileReadmeMultilang.render(docsDir, lang));
      promiseList.push(() => fileChangelogMultilang.render(docsDir, lang));
    });
  }

  if (codeStyle || unitTest) {
    const huskyDir = `${packageDir}/.husky`;

    await createDirPackage(huskyDir);

    switch (codeStyle) {
      case 'FULL': {
        fileHuskyPreCommit.onESLint();
        fileHuskyPreCommit.onPrettier();

        promiseList.push(() => fileEslintrc.render(packageDir));
        promiseList.push(() => fileTsConfigEsLint.render(packageDir));
        promiseList.push(() => filePrettierrc.render(packageDir));
        promiseList.push(() => fileHuskyPreCommit.render(huskyDir));

        break;
      }
      case 'ESLINT': {
        fileHuskyPreCommit.onESLint();

        promiseList.push(() => fileEslintrc.render(packageDir));
        promiseList.push(() => fileTsConfigEsLint.render(packageDir));
        promiseList.push(() => fileHuskyPreCommit.render(huskyDir));

        break;
      }
      case 'PRETTIER': {
        fileHuskyPreCommit.onPrettier();

        promiseList.push(() => filePrettierrc.render(packageDir));
        promiseList.push(() => fileHuskyPreCommit.render(huskyDir));
        break;
      }
    }

    if (unitTest === 'JEST') {
      fileHuskyPrePush.onJest();

      promiseList.push(() => fileJestConfig.render(packageDir));
      promiseList.push(() => fileMainSpec.render(packageSrcDir));
      promiseList.push(() => fileHuskyPrePush.render(huskyDir));
    }
  }

  if (license) {
    promiseList.push(() => fileLicense.render(packageDir));
  }

  await Promise.all([
    // core dir
    fileJsonPackage.render(packageDir),
    fileNVMRC.render(packageDir),
    fileGitignore.render(packageDir),
    fileRollupConfig.render(packageDir),
    fileTsConfig.render(packageDir),
    fileReadme.render(packageDir),
    fileChangelog.render(packageDir),

    // core/src dir
    fileMain.render(packageSrcDir),

    // any
    ...promiseList.map((item) => item()),
  ]);
}
