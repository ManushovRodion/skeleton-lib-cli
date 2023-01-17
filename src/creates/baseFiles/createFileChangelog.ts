import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Data {
  name: string;
}
export interface Params {
  projectDir: string;
}

export function createFileChangelog(data: Data, params: Params) {
  const context = `
  # ${data.name.toUpperCase()}

  ...
  `;

  const path = `${params.projectDir}/CHANGELOG.md`;

  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
