import { unlink, readFile } from 'node:fs/promises';
import { format } from 'prettier';

import { FILE_NAME } from './constants';
import { createFileGitignore } from './index';

const dir = './src/creates/files/createFileGitignore';
const path = `${dir}/${FILE_NAME}`;

const RESULT_DATA = `
# Node artifact file

node_modules
dist
coverage

# Generated OS

.DS_Store
Thumbs.db

# Local files

.local

# Log files

\\*.log

# IDE

.idea
.vscode
_.suo
_.ntvs*
_.njsproj
_.sln
\\*.sw?
`;

describe('createFileNVMRC', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileGitignore();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    const result = format(RESULT_DATA, { parser: 'markdown' });

    expect(context).toBe(result);
    unlink(path);
  });
});
