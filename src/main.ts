import i18next from 'i18next';

import ru from './assets/locales/ru.json';
import en from './assets/locales/en.json';

import { parseParamsArgv } from './parseParamsArgv';

import { runHelp } from './runHelp';
import { runCreate } from './runCreate';

export async function cli(process: NodeJS.Process) {
  const paramsArgv = parseParamsArgv(process.argv);

  const rootDir = process.cwd();
  const outDir = paramsArgv.outDir.has
    ? `${rootDir}/${paramsArgv.outDir.value}`
    : '';

  i18next.init({
    lng: paramsArgv.lang.value,
    resources: { ru, en },
  });

  if (paramsArgv.help.has) {
    return runHelp();
  }

  runCreate({ rootDir, outDir });
}
