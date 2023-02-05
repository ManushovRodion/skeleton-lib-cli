import { validatePackageName } from '../validatePackageName';

describe('validates/validatePackageName', () => {
  it('Возвращается текст об ошибке', () => {
    expect(validatePackageName('ERROR')).toBe('ERROR');
    expect(validatePackageName('ERROR', '')).toBe('ERROR');
    expect(validatePackageName('ERROR', 'Text')).toBe('ERROR');
    expect(validatePackageName('ERROR', 'text/text')).toBe('ERROR');
    expect(validatePackageName('ERROR', 'text_text')).toBe('ERROR');
    expect(validatePackageName('ERROR', 'Text/text')).toBe('ERROR');
    expect(validatePackageName('ERROR', 'Text_text')).toBe('ERROR');
  });

  it('Возвращается "true", в случае отстутсвия ошибки ', () => {
    expect(validatePackageName('ERROR', 'text')).toBeTruthy();
    expect(validatePackageName('ERROR', 'text-text')).toBeTruthy();
  });
});
