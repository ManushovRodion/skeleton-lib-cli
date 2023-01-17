export type Lang = 'ru' | 'en';

export interface ParamArgv {
  has: boolean;
  value: string;
}

export interface ParamLangArgv extends ParamArgv {
  value: Lang;
}

export interface ParamsArgv {
  help: ParamArgv;
  lang: ParamLangArgv;
  outDir: ParamArgv;
}

function findParamArgv<T extends ParamArgv>(
  argvs: string[],
  paramName: string,
  options?: { defaultValue?: T['value']; findValue?: boolean }
) {
  const findIndex = argvs.findIndex((argv) => argv === paramName);
  const has = findIndex > -1;

  if (!options?.defaultValue && !options?.findValue) {
    return { has, value: '' };
  }

  if (!has && options.defaultValue) {
    return { has, value: options.defaultValue };
  }

  const value = argvs[findIndex + 1] || options.defaultValue || '';

  return { has, value };
}

export function parseParamsArgv(argvs: string[]): ParamsArgv {
  return {
    help: findParamArgv(argvs, '--help'),
    lang: <ParamLangArgv>findParamArgv(argvs, '--lang', { defaultValue: 'ru' }),
    outDir: findParamArgv(argvs, '--outDir', { findValue: true }),
  };
}
