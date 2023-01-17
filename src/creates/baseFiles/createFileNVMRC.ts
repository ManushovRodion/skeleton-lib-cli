import { writeFile } from 'node:fs/promises';

export interface Params {
  projectDir: string;
}

export function createFileNVMRC(params: Params) {
  const context = `v16.19.0
  `;

  const path = `${params.projectDir}/.nvmrc`;

  return writeFile(path, context, {
    encoding: 'utf8',
  });
}
