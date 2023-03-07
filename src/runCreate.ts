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
//import { questionMultiLangDocsList } from './questions/multiLangDocs/questionMultiLangDocsList';

//import { questionLicense } from './questions/license/questionLicense';
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

import { createFileJsonPackage } from './creates/createFileJsonPackage/index';
import { createFileNVMRC } from './creates/createFileNVMRC/index';
import { createFileGitignore } from './creates/createFileGitignore/index';
import { createFileCommandLineInterface } from './creates/createFileCommandLineInterface/index';
import { createFileLicense } from './creates/createFileLicense/index';
import { createFileRollupConfig } from './creates/createFileRollupConfig/index';
import { createFileTsConfig } from './creates/createFileTsConfig/index';
import { createFileMain } from './creates/createFileMain/index';
import { createFileEslintrc } from './creates/createFileEslintrc/index';
import { createFileTsConfigEsLint } from './creates/createFileTsConfigEsLint/index';
import { createFilePrettierrc } from './creates/createFilePrettierrc/index';
import { createFileJestConfig } from './creates/createFileJestConfig/index';

// import { createFileReadme } from './creates/baseFiles/createFileReadme';
// import { createFileChangelog } from './creates/baseFiles/createFileChangelog';

// import { createFileSrcTestMain } from './creates/codeTestFiles/createFileSrcTestMain';
// import { createFileMultiLangReadme } from './creates/multiLangFiles/createFileMultiLangReadme';
// import { createFileMultiLangChangelog } from './creates/multiLangFiles/createFileMultiLangChangelog';
// import { createFileMultiLangReadmeItem } from './creates/multiLangFiles/createFileMultiLangReadmeItem';
// import { createFileMultiLangChangelogItem } from './creates/multiLangFiles/createFileMultiLangChangelogItem';

export interface Options {
  rootDir: string;
}

const PRETTIER_CONFIG = prettierConfig as PrettierOptions;

export async function runCreate({ rootDir }: Options) {
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
  const fileEslintrc = createFileEslintrc(PRETTIER_CONFIG);
  const fileTsConfigEsLint = createFileTsConfigEsLint(PRETTIER_CONFIG);
  const filePrettierrc = createFilePrettierrc(PRETTIER_CONFIG);
  const fileJestConfig = createFileJestConfig(PRETTIER_CONFIG);

  /**
   * QUESTIONS
   * ================================================================
   */

  // name
  const packageName = await questionPackageName();
  fileJsonPackage.updateName(packageName);
  fileJsonPackage.updateVersion('0.1.0');
  fileCLI.updateName(packageName);

  // description
  const packageDescription = await questionPackageDescription();
  fileJsonPackage.updateDescription(packageDescription);

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
  //const isLicense = await questionLicense()
  const licenseCopyright = await questionLicenseСopyright(authorName);
  fileLicense.updateCopyright(licenseCopyright);
  fileJsonPackage.updateLicense('MIT'); // @TODO план на получения значения извне

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
    fileEslintrc.onCommandLineInterface();
  }

  // multiLangDocs
  const isMultiLangDocs = await questionMultiLangDocs();
  if (isMultiLangDocs) {
    fileJsonPackage.onMultiLangDocs();
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
    await createDirPackage(`${packageDir}/docs`);
  }

  if (codeStyle === 'FULL' || codeStyle === 'ESLINT') {
    promiseList.push(() => fileEslintrc.render(packageDir));
    promiseList.push(() => fileTsConfigEsLint.render(packageDir));
  }

  if (codeStyle === 'FULL' || codeStyle === 'PRETTIER') {
    promiseList.push(() => filePrettierrc.render(packageDir));
  }

  if (unitTest === 'JEST') {
    promiseList.push(() => fileJestConfig.render(packageDir));
  }

  await Promise.all([
    // core dir
    fileJsonPackage.render(packageDir),
    fileNVMRC.render(packageDir),
    fileGitignore.render(packageDir),
    fileLicense.render(packageDir),
    fileRollupConfig.render(packageDir),
    fileTsConfig.render(packageDir),

    // core/src dir
    fileMain.render(packageSrcDir),

    // any
    ...promiseList.map((item) => item()),
  ]);

  // =========

  //  let multiLangDocsList: string[] = [];
  //  if (await questionMultiLangDocs()) {
  //    multiLangDocsList = await questionMultiLangDocsList(['ru', 'en']);
  //  }

  // if (!multiLangDocsList.length) {
  //   await Promise.all([
  //     createFileReadme(
  //       { name, description: packageDescription },
  //       { projectDir }
  //     ),
  //     createFileChangelog({ name }, { projectDir }),
  //   ]);
  // }

  // if (isJest) {
  //   await Promise.all([
  //
  //     createFileSrcTestMain({ projectDir }),
  //   ]);
  // }

  // if (!!multiLangDocsList.length) {
  //   await mkdir(`${projectDir}/docs`);

  //   await Promise.all([
  //     createFileMultiLangReadme(
  //       { name, lang: multiLangDocsList },
  //       { projectDir }
  //     ),
  //     createFileMultiLangChangelog(
  //       { name, lang: multiLangDocsList },
  //       { projectDir }
  //     ),
  //     ...multiLangDocsList.map((lang) => {
  //       return [
  //         createFileMultiLangReadmeItem(
  //           { name, description: packageDescription, lang },
  //           { projectDir }
  //         ),
  //         createFileMultiLangChangelogItem({ name, lang }, { projectDir }),
  //       ];
  //     }),
  //   ]);
  // }
}
