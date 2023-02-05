import { validateRequiredPrompts } from '../validateRequiredPrompts';

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

describe('validates/validateRequiredPrompts', () => {
  it('Корректный ключ локализации', () => {
    expect(validateRequiredPrompts('')).toBe('base.requiredInput');
  });
});
