import type { Context } from './types';

export const FILE_NAME = 'README.md';
export const LANG_FILE_NAME = 'README-LANG.md';

export const CONTEXT: { [key: string]: Context } = {
  ru: {
    titleInstall: 'Установка',
    titleLFunctional: 'Функционал',
    titleLicense: 'Лицензия',
    patternInstall: 'Для тех кто использует PACKAGE_MANAGER_NAME',
  },
  en: {
    titleInstall: 'Install',
    titleLFunctional: 'Functional',
    titleLicense: 'License',
    patternInstall: 'For those who use PACKAGE_MANAGER_NAME',
  },
};

export const CONTEXT_MENU: { [key: string]: string } = {
  ru: 'Документация [Русский]',
  en: 'Documentation: [English]',
};

export const CONTEXT_MENU_INDEX: { [key: string]: string } = {
  ru: 'Главная',
  en: 'Home',
};

export const CONTEXT_DESCRIPTION = `
......................................................
...............................................
`;

export const CONTEXT_TEXT_EMPTY = '........';

export const PATTERN_BLOCK_TITLE_H1 = '# TITLE';
export const PATTERN_BLOCK_TITLE_H2 = '## # TITLE';

export const PATTERN_SH_INSTALL_NPM = `
\`\`\`sh
npm install --save-dev PACKAGE_NAME
\`\`\`
`;

export const PATTERN_SH_INSTALL_YARN = `
\`\`\`sh
yarn add PACKAGE_NAME --dev
\`\`\`
`;

export const PATTERN_LICENSE = '[LICENSE](./LICENSE)';
