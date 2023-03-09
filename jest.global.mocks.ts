jest.mock('i18next', () => ({
  init: (data: unknown) => data,
  t: (key: string) => key,
}));
