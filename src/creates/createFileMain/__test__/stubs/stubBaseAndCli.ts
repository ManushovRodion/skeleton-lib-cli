export function sum(a: number, b: number) {
  return a + b;
}

export function cli(process: NodeJS.Process) {
  return {
    process,
    sum,
  };
}
