import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import i18next from 'i18next';

export interface Data {
  name: string;
  description: string;
}
export interface Params {
  projectDir: string;
}

export function createFileReadme(data: Data, params: Params) {
  const context = `
  # ${data.name.toUpperCase()}

  ${data.description ? `> ${data.description}` : ''}

  ## # ${i18next.t('readme.install.title')}

  ${i18next.t('readme.install.npm')}

  \`\`\`sh
  npm install --save-dev ${data.name}
  \`\`\`

  ${i18next.t('readme.install.yarn')}

  \`\`\`sh
  yarn add ${data.name} --dev
  \`\`\`

  ## # ${i18next.t('readme.license.title')}

  [MIT](./../LICENSE)
  `;

  const path = `${params.projectDir}/README.md`;

  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
