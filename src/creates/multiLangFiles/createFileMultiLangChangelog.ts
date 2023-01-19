import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Data {
  name: string;
  lang: string[];
}
export interface Params {
  projectDir: string;
}

export function createFileMultiLangChangelog(data: Data, params: Params) {
  const context = `
  # ${data.name.toUpperCase()}
  
  ${data.lang
    .map((lang) => {
      const nameLang = lang.toUpperCase();
      let value = '';

      switch (nameLang) {
        case 'RU': {
          value = 'Changelog [Русский]';
          break;
        }
        case 'EN': {
          value = 'Changelog: [English]';
          break;
        }
        default: {
          value = `Changelog [${nameLang}]`;
        }
      }

      return `- ${value}(./docs/README-${nameLang}.md)`;
    })
    .join('\r\r')}
  `;

  const path = `${params.projectDir}/CHANGELOG.md`;

  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
