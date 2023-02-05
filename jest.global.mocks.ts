jest.mock('i18next', () => ({
  t: (key: string) => key,
}));
