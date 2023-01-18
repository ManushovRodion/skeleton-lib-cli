import { writeFile, mkdir } from 'node:fs/promises';
import { format } from 'prettier';

export interface Data {
  name: string;
}
export interface Params {
  projectDir: string;
}

export async function createFileBinCli(data: Data, params: Params) {
  const context = `
#!/usr/bin/env node
const lib = require('../dist/${data.name}.cjs.js');

try {
    ib.cli(process);
} catch (e) {
    console.error(e);
    process.exit(0);
}
`;

  const path = `${params.projectDir}/bin/cli.js`;

  await mkdir(`${params.projectDir}/bin`, { recursive: true });
  return writeFile(path, format(context, { parser: 'markdown' }), {
    encoding: 'utf8',
  });
}
