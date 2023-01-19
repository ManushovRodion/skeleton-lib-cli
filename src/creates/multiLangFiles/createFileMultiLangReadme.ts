import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Data {
  name: string;
  lang: string[];
}
export interface Params {
  projectDir: string;
}

export function createFileMultiLangReadme(data: Data, params: Params) {
  const context = `
  # ${data.name.toUpperCase()}
  
  ${data.lang
    .map((lang) => {
      const nameLang = lang.toUpperCase();
      let value = '';

      switch (nameLang) {
        case 'RU': {
          value = 'Документация [Русский]';
          break;
        }
        case 'EN': {
          value = 'Documentation: [English]';
          break;
        }
        default: {
          value = `Документация [${nameLang}]`;
        }
      }

      return `- ${value}(./docs/README-${nameLang}.md)`;
    })
    .join('\r\r')}
  `;

  const path = `${params.projectDir}/README.md`;

  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
