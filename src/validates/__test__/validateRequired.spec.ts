import { validateRequired } from './../validateRequired';

describe('validates/validateRequired', () => {
  it('Возвращается текст об ошибке', () => {
    expect(validateRequired('ERROR', '')).toBe('ERROR');
    expect(validateRequired('ERROR', [])).toBe('ERROR');
    expect(validateRequired('ERROR')).toBe('ERROR');
  });

  it('Возвращается "true", в случае отстутсвия ошибки ', () => {
    expect(validateRequired('ERROR', 'text')).toBeTruthy();
    expect(validateRequired('ERROR', ['text'])).toBeTruthy();
  });
});
