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

import { createDirPackage } from './creates/dirs/createDirPackage';

/**
 * CREATE FILES...
 */

import { createFileJsonPackage } from './creates/files/createFileJsonPackage';
import { createFileNVMRC } from './creates/files/createFileNVMRC';
import { createFileGitignore } from './creates/files/createFileGitignore';
import { createFileCommandLineInterface } from './creates/files/createFileCommandLineInterface';
import { createFileLicense } from './creates/files/createFileLicense';
import { createFileRollupConfig } from './creates/files/createFileRollupConfig';
import { createFileTsConfig } from './creates/files/createFileTsConfig';

// import { createFileReadme } from './creates/baseFiles/createFileReadme';
// import { createFileChangelog } from './creates/baseFiles/createFileChangelog';
// import { createFileSrcMain } from './creates/baseFiles/createFileSrcMain';

// import { createFilePrettier } from './creates/codeStyleFiles/createFilePrettier';
// import { createFileTsConfigESLint } from './creates/codeStyleFiles/createFileTsConfigESLint';
// import { createFileEslintrc } from './creates/codeStyleFiles/createFileEslintrc';

// import { createFileJestConfig } from './creates/codeTestFiles/createFileJestConfig';
// import { createFileSrcTestMain } from './creates/codeTestFiles/createFileSrcTestMain';
// import { createFileMultiLangReadme } from './creates/multiLangFiles/createFileMultiLangReadme';
// import { createFileMultiLangChangelog } from './creates/multiLangFiles/createFileMultiLangChangelog';
// import { createFileMultiLangReadmeItem } from './creates/multiLangFiles/createFileMultiLangReadmeItem';
// import { createFileMultiLangChangelogItem } from './creates/multiLangFiles/createFileMultiLangChangelogItem';

export interface Options {
  rootDir: string;
}

export async function runCreate({ rootDir }: Options) {
  /**
   * FILES
   * ================================================================
   */
  const fileJsonPackage = createFileJsonPackage();
  const fileNVMRC = createFileNVMRC();
  const fileGitignore = createFileGitignore();
  const fileCommandLineInterface = createFileCommandLineInterface();
  const fileLicense = createFileLicense();
  const fileRollupConfig = createFileRollupConfig();
  const fileTsConfig = createFileTsConfig();

  /**
   * QUESTIONS
   * ================================================================
   */

  // name
  const packageName = await questionPackageName();
  fileJsonPackage.updateName(packageName);
  fileJsonPackage.updateVersion('0.1.0');
  fileCommandLineInterface.updateName(packageName);

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
      break;
    }
    case 'ESLINT': {
      fileJsonPackage.onESLint();
      break;
    }
    case 'PRETTER': {
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

  if (isCommandLineInterface) {
    const binDir = `${packageDir}/bin`;

    await createDirPackage(binDir);
    promiseList.push(() => fileCommandLineInterface.render(binDir));
  }

  if (isMultiLangDocs) {
    await createDirPackage(`${packageDir}/docs`);
  }

  await Promise.all([
    fileJsonPackage.render(packageDir),
    fileNVMRC.render(packageDir),
    fileGitignore.render(packageDir),
    fileLicense.render(packageDir),
    fileRollupConfig.render(packageDir),
    fileTsConfig.render(packageDir),
    ...promiseList.map((item) => item()),
  ]);

  // =========

  //  let multiLangDocsList: string[] = [];
  //  if (await questionMultiLangDocs()) {
  //    multiLangDocsList = await questionMultiLangDocsList(['ru', 'en']);
  //  }

  // const isESLint = codeStyle === 'ESLINT' || codeStyle === 'FULL';
  // const isPrettier = codeStyle === 'PRETTER' || codeStyle === 'FULL';
  // const isJest = unitTest === 'JEST';

  // BASE files
  // await Promise.all([
  //   createFileSrcMain({ projectDir }),
  // ]);

  // if (!multiLangDocsList.length) {
  //   await Promise.all([
  //     createFileReadme(
  //       { name, description: packageDescription },
  //       { projectDir }
  //     ),
  //     createFileChangelog({ name }, { projectDir }),
  //   ]);
  // }

  // if (isPrettier) {
  //   await createFilePrettier({ projectDir });
  // }

  // if (isESLint) {
  //   await Promise.all([
  //     createFileTsConfigESLint({ projectDir }),
  //     createFileEslintrc({
  //       projectDir,
  //       isPrettier,
  //       isCli: isCommandLineInterface,
  //     }),
  //   ]);
  // }

  // if (isJest) {
  //   await Promise.all([
  //     createFileJestConfig({ projectDir }),
  //     createFileSrcTestMain({ projectDir }),
  //   ]);
  // }

  // if (isCommandLineInterface) {
  //   await createFileBinCli({ name }, { projectDir });
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
