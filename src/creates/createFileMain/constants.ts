export const FILE_NAME = 'main.ts';

export const FUNCTION_SUM = `
export function sum(a: number, b: number) {
    return a + b;
}
`;

export const FUNCTION_CLI = `
export function cli(process: NodeJS.Process) {
  return {
    process,
    sum,
  };
}
`;
