import { sum, cli } from './main';

describe('sum', () => {
  it('Return value', () => {
    expect(sum(1, 1)).toBe(2);
  });
});

describe('cli', () => {
  it('Return value', () => {
    expect(cli(process)).toEqual({
      process,
      sum,
    });
  });
});
