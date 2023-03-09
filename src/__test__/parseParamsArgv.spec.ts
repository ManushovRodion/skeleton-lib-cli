import { parseParamsArgv } from './../parseParamsArgv';

describe('parseParamsArgv', () => {
  it('Возвращаем дефолтные значение', () => {
    let params;

    params = parseParamsArgv([]);
    expect(params.lang).toBe('ru');
    expect(params.outDir).toBe('');

    params = parseParamsArgv(['--lang']);
    expect(params.lang).toBe('ru');
    expect(params.outDir).toBe('');

    params = parseParamsArgv(['--outDir']);
    expect(params.lang).toBe('ru');
    expect(params.outDir).toBe('');
  });

  it('Возвращается найденные значения', () => {
    const params = parseParamsArgv([
      '--help',
      '--lang',
      'en',
      '--outDir',
      'test',
    ]);

    expect(params.lang).toBe('en');
    expect(params.outDir).toBe('test');
  });
});
