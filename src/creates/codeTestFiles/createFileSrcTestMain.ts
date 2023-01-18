import { mkdir, writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
}

export async function createFileSrcTestMain(params: Params) {
  const context = `
    import { sum } from './../main';

    describe('sum', () => {
      it('Return value', () => {
        expect(sum(1, 1)).toBe(2)
      });
    });
  `;

  const path = `${params.projectDir}/src/__test__/main.spec.ts`;

  await mkdir(`${params.projectDir}/src/__test__`, { recursive: true });
  return writeFile(path, format(context, { parser: 'typescript' }), {
    encoding: 'utf8',
  });
}
