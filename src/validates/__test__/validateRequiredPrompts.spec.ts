import { validateRequiredPrompts } from '../validateRequiredPrompts';

jest.mock('prompts', () => ({
  ...jest.requireActual('i18next'),
  __esModule: true,
  t: jest.fn(),
}));

describe('validates/validateRequiredPrompts', () => {
  it('Если нет значений, то вернет сообщение', () => {
    const i18next = require('i18next');
    i18next.t = () => 'ERROR';

    expect(validateRequiredPrompts('')).toBe('ERROR');
    expect(validateRequiredPrompts([])).toBe('ERROR');
    expect(validateRequiredPrompts()).toBe('ERROR');
  });

  it('Если есть значение, то вернет TRUE', () => {
    const i18next = require('i18next');
    i18next.t = () => 'ERROR';

    expect(validateRequiredPrompts('text')).toBeTruthy();
    expect(validateRequiredPrompts(['text'])).toBeTruthy();
  });
});
