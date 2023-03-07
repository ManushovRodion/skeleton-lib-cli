import { sum } from './main';

describe('sum', () => {
  it('Return value', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
