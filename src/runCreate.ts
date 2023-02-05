import i18next from 'i18next';
import { mkdir } from 'node:fs/promises';

import { questionAuthorName } from './questions/author/questionAuthorName';
import { questionAuthorEmail } from './questions/author/questionAuthorEmail';
import { questionAuthorURL } from './questions/author/questionAuthorURL';

import { questionURLRepository } from './questions/url/questionURLRepository';
import { questionURLIssues } from './questions/url/questionURLIssues';
import { questionURLHome } from './questions/url/questionURLHome';

import { questionIsCLI } from './questions/questionIsCLI';

// ....
import { questionDescPackage } from './questions/questionDescPackage';
import { questionNamePackage } from './questions/questionNamePackage';

import { questionСopyright } from './questions/questionСopyright';
import { questionСodeStyle } from './questions/questionСodeStyle';
import { questionСodeTest } from './questions/questionСodeTest';

import { createFileLicense } from './creates/baseFiles/createFileLicense';
import { createFilePackage } from './creates/baseFiles/createFilePackage';
import { createFileNVMRC } from './creates/baseFiles/createFileNVMRC';
import { createFileGitignore } from './creates/baseFiles/createFileGitignore';
import { createFileRollupConfig } from './creates/baseFiles/createFileRollupConfig';
import { createFileTsConfig } from './creates/baseFiles/createFileTsConfig';
import { createFileReadme } from './creates/baseFiles/createFileReadme';
import { createFileChangelog } from './creates/baseFiles/createFileChangelog';
import { createFileSrcMain } from './creates/baseFiles/createFileSrcMain';

import { createFilePretter } from './creates/codeStyleFiles/createFilePretter';
import { createFileTsConfigESLint } from './creates/codeStyleFiles/createFileTsConfigESLint';
import { createFileEslintrc } from './creates/codeStyleFiles/createFileEslintrc';

import { createFileJestConfig } from './creates/codeTestFiles/createFileJestConfig';
import { createFileSrcTestMain } from './creates/codeTestFiles/createFileSrcTestMain';
import { createFileBinCli } from './creates/cliFiles/createFileBinCli';
import { questionMultiLangDocs } from './questions/questionMultiLangDocs';
import { questionMultiLangDocsList } from './questions/questionMultiLangDocsList';
import { createFileMultiLangReadme } from './creates/multiLangFiles/createFileMultiLangReadme';
import { createFileMultiLangChangelog } from './creates/multiLangFiles/createFileMultiLangChangelog';
import { createFileMultiLangReadmeItem } from './creates/multiLangFiles/createFileMultiLangReadmeItem';
import { createFileMultiLangChangelogItem } from './creates/multiLangFiles/createFileMultiLangChangelogItem';

export interface Options {
  rootDir: string;
  outDir: string;
}

export async function runCreate({ outDir, rootDir }: Options) {
  const name = await questionNamePackage();
  const description = await questionDescPackage();

  // url
  const urlRepository = await questionURLRepository();
  const urlIssues = await questionURLIssues(urlRepository);
  const urlHome = await questionURLHome(urlRepository);

  // author
  const authorName = await questionAuthorName();
  const authorEmail = await questionAuthorEmail();
  const authorURL = await questionAuthorURL();

  const copyright = await questionСopyright(authorName);
  const codeStyle = await questionСodeStyle();
  const codeTest = await questionСodeTest();
  const isCLI = await questionIsCLI();
  const multiLangDocs = await questionMultiLangDocs();

  const projectDir = outDir ? outDir : `${rootDir}/${name}`;
  const isESLint = codeStyle === 'ESLINT' || codeStyle === 'FULL';
  const isPretter = codeStyle === 'PRETTER' || codeStyle === 'FULL';
  const isJest = codeTest === 'JEST';
  const isMltiLangDocs = multiLangDocs === 'TRUE';

  let multiLangDocsList: string[] = [];
  if (isMltiLangDocs) {
    multiLangDocsList = await questionMultiLangDocsList();
  }

  try {
    await mkdir(projectDir, { recursive: true });
  } catch (e) {
    const message = i18next.t('error.NotCreatedProject');
    console.log(message, e);
    return;
  }

  // BASE files
  await Promise.all([
    createFilePackage(
      {
        name,
        description,
        author: authorName,
        authorEmail,
        authorUrl: authorURL,
        urlRepository,
        urlIssues,
        urlHome,
      },
      {
        projectDir,
        isESLint,
        isPretter,
        isJest,
        isCli: isCLI,
        isMltiLangDocs,
      }
    ),
    createFileLicense({ copyright }, { projectDir }),

    createFileNVMRC({ projectDir }),
    createFileGitignore({ projectDir }),

    createFileTsConfig({ projectDir }),
    createFileRollupConfig({ projectDir }),

    createFileSrcMain({ projectDir }),
  ]);

  if (!isMltiLangDocs) {
    await Promise.all([
      createFileReadme({ name, description }, { projectDir }),
      createFileChangelog({ name }, { projectDir }),
    ]);
  }

  if (isPretter) {
    await createFilePretter({ projectDir });
  }

  if (isESLint) {
    await Promise.all([
      createFileTsConfigESLint({ projectDir }),
      createFileEslintrc({ projectDir, isPretter, isCli: isCLI }),
    ]);
  }

  if (isJest) {
    await Promise.all([
      createFileJestConfig({ projectDir }),
      createFileSrcTestMain({ projectDir }),
    ]);
  }

  if (isCLI) {
    await createFileBinCli({ name }, { projectDir });
  }

  if (isMltiLangDocs) {
    await mkdir(`${projectDir}/docs`);

    await Promise.all([
      createFileMultiLangReadme(
        { name, lang: multiLangDocsList },
        { projectDir }
      ),
      createFileMultiLangChangelog(
        { name, lang: multiLangDocsList },
        { projectDir }
      ),
      ...multiLangDocsList.map((lang) => {
        return [
          createFileMultiLangReadmeItem(
            { name, description, lang },
            { projectDir }
          ),
          createFileMultiLangChangelogItem({ name, lang }, { projectDir }),
        ];
      }),
    ]);
  }
}
