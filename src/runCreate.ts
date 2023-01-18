import i18next from 'i18next';
import { mkdir } from 'node:fs/promises';

import { questionAuthor } from './questions/questionAuthor';
import { questionAuthorEmail } from './questions/questionAuthorEmail';
import { questionAuthorUrl } from './questions/questionAuthorUrl';
import { questionDescPackage } from './questions/questionDescPackage';
import { questionNamePackage } from './questions/questionNamePackage';
import { questionUrlHome } from './questions/questionUrlHome';
import { questionUrlIssues } from './questions/questionUrlIssues';
import { questionUrlRepository } from './questions/questionUrlRepository';
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

import { createFileJestConfig } from './creates/codeTest/createFileJestConfig';
import { createFileSrcTestMain } from './creates/codeTest/createFileSrcTestMain';

export interface Options {
  rootDir: string;
  outDir: string;
}

export async function runCreate({ outDir, rootDir }: Options) {
  const name = await questionNamePackage();
  const description = await questionDescPackage();
  const urlRepository = await questionUrlRepository();
  const urlIssues = await questionUrlIssues(`${urlRepository}/issues`);
  const urlHome = await questionUrlHome(urlRepository);
  const author = await questionAuthor();
  const authorEmail = await questionAuthorEmail();
  const authorUrl = await questionAuthorUrl();
  const copyright = await questionСopyright(author);
  const codeStyle = await questionСodeStyle();
  const codeTest = await questionСodeTest();

  const projectDir = outDir ? outDir : `${rootDir}/${name}`;
  const isESLint = codeStyle === 'ESLINT' || codeStyle === 'FULL';
  const isPretter = codeStyle === 'PRETTER' || codeStyle === 'FULL';
  const isJest = codeTest === 'JEST';

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
        author,
        authorEmail,
        authorUrl,
        urlRepository,
        urlIssues,
        urlHome,
      },
      {
        projectDir,
        isESLint,
        isPretter,
        isJest,
      }
    ),
    createFileLicense({ copyright }, { projectDir }),

    createFileNVMRC({ projectDir }),
    createFileGitignore({ projectDir }),

    createFileTsConfig({ projectDir }),
    createFileRollupConfig({ projectDir }),

    createFileReadme({ name, description }, { projectDir }),
    createFileChangelog({ name }, { projectDir }),

    createFileSrcMain({ projectDir }),
  ]);

  if (isPretter) {
    await createFilePretter({ projectDir });
  }

  if (isESLint) {
    await Promise.all([
      createFileTsConfigESLint({ projectDir }),
      createFileEslintrc({ projectDir, isPretter }),
    ]);
  }

  if (isJest) {
    await Promise.all([
      createFileJestConfig({ projectDir }),
      createFileSrcTestMain({ projectDir }),
    ]);
  }
}
