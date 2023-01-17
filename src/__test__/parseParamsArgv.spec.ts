import { parseParamsArgv } from './../parseParamsArgv';

describe('parseParamsArgv', () => {
  it('Если нет значений в argv, то возвращается обьект параметров с дефолтными значениями', () => {
    const params = parseParamsArgv([]);

    expect(params.help.value).toBe('');
    expect(params.help.has).toBeFalsy();

    expect(params.lang.value).toBe('ru');
    expect(params.lang.has).toBeFalsy();

    expect(params.outDir.value).toBe('');
    expect(params.outDir.has).toBeFalsy();
  });

  it('Возвращается обьект параметров с найденными значениями', () => {
    const params = parseParamsArgv([
      '--help',
      '--lang',
      'en',
      '--outDir',
      'test',
    ]);

    expect(params.help.value).toBe('');
    expect(params.help.has).toBeTruthy();

    expect(params.lang.value).toBe('en');
    expect(params.lang.has).toBeTruthy();

    expect(params.outDir.value).toBe('test');
    expect(params.outDir.has).toBeTruthy();
  });
});
