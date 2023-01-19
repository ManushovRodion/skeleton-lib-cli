import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import i18next from 'i18next';

export interface Data {
  name: string;
  description: string;
  lang: string;
}
export interface Params {
  projectDir: string;
}

export function createFileMultiLangReadmeItem(data: Data, params: Params) {
  const langData = {
    titleInstall: 'TITLE_INSTALL',
    npmInstall: 'DESC_INSTALL_NPM',
    yarnInstall: 'DESC_INSTALL_YARN',
    licenseTitle: 'TITLE_LICENSE',
  };

  if (['ru', 'en'].includes(data.lang.toLowerCase())) {
    langData.titleInstall = i18next.getResource(
      data.lang,
      'translation',
      'readme.install.title'
    );

    langData.npmInstall = i18next.getResource(
      data.lang,
      'translation',
      'readme.install.npm'
    );

    langData.yarnInstall = i18next.getResource(
      data.lang,
      'translation',
      'readme.install.yarn'
    );

    langData.licenseTitle = i18next.getResource(
      data.lang,
      'translation',
      'readme.license.title'
    );
  }

  const context = `
  # ${data.name.toUpperCase()}

  ${data.description ? `> ${data.description}` : ''}

  ## # ${langData.titleInstall}

  ${langData.npmInstall}

  \`\`\`sh
  npm install --save-dev ${data.name}
  \`\`\`

  ${langData.yarnInstall}

  \`\`\`sh
  yarn add ${data.name} --dev
  \`\`\`

  ## # ${langData.licenseTitle}

  [MIT](./../LICENSE)
  `;

  const path = `${params.projectDir}/docs/README-${data.lang.toUpperCase()}.md`;

  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
