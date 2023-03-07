export const FILE_NAME = 'main.spec.ts';

export const IMPORT_SUM = "import { sum } from './main';";
export const IMPORT_SUM_AND_CLI = "import { sum, cli } from './main';";

export const FUNCTION_SUM = `
describe('sum', () => {
  it('Return value', () => {
    expect(sum(1, 1)).toBe(2)
  });
});
`;

export const FUNCTION_CLI = `
describe('cli', () => {
  it('Return value', () => {
    expect(cli(process)).toEqual({
      process,
      sum,
    });
  });
});
`;
