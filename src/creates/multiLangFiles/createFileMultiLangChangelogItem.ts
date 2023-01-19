import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Data {
  name: string;
  lang: string;
}
export interface Params {
  projectDir: string;
}

export function createFileMultiLangChangelogItem(data: Data, params: Params) {
  const context = `
  # ${data.name.toUpperCase()}

  ...
  `;

  const path = `${
    params.projectDir
  }/docs/CHANGELOG-${data.lang.toUpperCase()}.md`;

  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
