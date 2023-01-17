import { writeFile, mkdir } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
}

export async function createFileSrcMain(params: Params) {
  const context = `
        export function sum(a: number, b: number) {
            return a + b;
        }
    `;

  const path = `${params.projectDir}/src/main.ts`;

  await mkdir(`${params.projectDir}/src`, { recursive: true });
  return writeFile(path, format(context, { parser: 'typescript' }), {
    encoding: 'utf8',
  });
}
