import { validatePackageNamePrompts } from '../validatePackageNamePrompts';

describe('validates/validatePackageNamePrompts', () => {
  it('Корректный ключ локализации', () => {
    expect(validatePackageNamePrompts('')).toBe('validation.namePackage');
  });
});
