import { validateRequiredPrompts } from '../validateRequiredPrompts';

jest.mock('i18next', () => ({
  t: (key: string) => {
    if (key === 'base.requiredInput') return 'REQUIRED';
    return '';
  },
}));

describe('validates/validateRequiredPrompts', () => {
  it('Если нет значений, то вернет сообщение из стора i18next', () => {
    expect(validateRequiredPrompts('')).toBe('REQUIRED');
    expect(validateRequiredPrompts([])).toBe('REQUIRED');
    expect(validateRequiredPrompts()).toBe('REQUIRED');
  });

  it('Если есть значение, то вернет TRUE', () => {
    expect(validateRequiredPrompts('text')).toBeTruthy();
    expect(validateRequiredPrompts(['text'])).toBeTruthy();
  });
});
