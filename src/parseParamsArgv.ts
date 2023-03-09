export interface ParamsArgv {
  lang: string;
  outDir: string;
}

export function parseParamsArgv(argvs: string[]) {
  return argvs.reduce<ParamsArgv>(
    (res, item, index) => {
      if (item === '--lang') {
        res.lang = argvs[index + 1] || 'ru';
        return res;
      }

      if (item === '--outDir') {
        res.outDir = argvs[index + 1] || '';
        return res;
      }

      return res;
    },
    { lang: 'ru', outDir: '' }
  );
}
