import { validateRequired } from './../validateRequired';

describe('validates/validateRequired', () => {
  it('Если нет значений, то вернет сообщение', () => {
    expect(validateRequired('ERROR', '')).toBe('ERROR');
    expect(validateRequired('ERROR', [])).toBe('ERROR');
    expect(validateRequired('ERROR')).toBe('ERROR');
  });

  it('Если есть значение, то вернет TRUE', () => {
    expect(validateRequired('ERROR', 'text')).toBeTruthy();
    expect(validateRequired('ERROR', ['text'])).toBeTruthy();
  });
});
