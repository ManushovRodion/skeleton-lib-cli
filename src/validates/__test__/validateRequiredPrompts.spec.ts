import { validateRequiredPrompts } from '../validateRequiredPrompts';

describe('validates/validateRequiredPrompts', () => {
  it('Корректный ключ локализации', () => {
    expect(validateRequiredPrompts('')).toBe('validation.requiredInput');
  });
});
