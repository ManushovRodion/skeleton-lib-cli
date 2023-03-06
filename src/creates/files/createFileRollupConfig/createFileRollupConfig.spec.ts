import { unlink, readFile } from 'node:fs/promises';
import { format } from 'prettier';

import {
  CONST,
  CONST_MODULE_NAME,
  CONST_PACKAGE_NAME,
  DEFINE_CJS,
  DEFINE_ES,
  DEFINE_TYPE,
  DEFINE_UMD,
  FILE_NAME,
  FUNC_CJS,
  FUNC_ES,
  FUNC_MODULE_NAME,
  FUNC_PACKAGE_NAME,
  FUNC_TYPE,
  FUNC_UMD,
  IMPORT_BASE,
  IMPORT_TYPE,
} from './constants';
import { createFileRollupConfig } from './index';

const dir = './src/creates/files/createFileRollupConfig';
const path = `${dir}/${FILE_NAME}`;

describe('createFileRollupConfig', () => {
  it('Создается файл с установленными параметрами', async () => {
    const file = createFileRollupConfig();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    const resultData = `
    ${IMPORT_BASE}
    ${IMPORT_TYPE}

    ${CONST}

    ${FUNC_PACKAGE_NAME}
    ${FUNC_MODULE_NAME}

    ${FUNC_CJS}
    ${FUNC_UMD}
    ${FUNC_ES}
    ${FUNC_TYPE}

    ${CONST_PACKAGE_NAME}
    ${CONST_MODULE_NAME}

    export default [
        ${DEFINE_CJS}
        ${DEFINE_UMD}
        ${DEFINE_ES}
        ${DEFINE_TYPE}
    ];
  `;

    const result = format(resultData, {
      parser: 'typescript',
    });

    expect(context).toBe(result);
    unlink(path);
  });
});
