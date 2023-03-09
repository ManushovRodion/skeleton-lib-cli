import i18next from 'i18next';

import ru from './assets/locales/ru.json';
import en from './assets/locales/en.json';

import { parseParamsArgv } from './parseParamsArgv';

import { runCreate } from './runCreate';

export async function cli(process: NodeJS.Process) {
  const { lang, outDir } = parseParamsArgv(process.argv);

  const rootDir = process.cwd();

  i18next.init({
    lng: lang,
    resources: { ru, en },
  });

  try {
    await runCreate({ rootDir: outDir || rootDir, lang });
  } catch (e) {
    console.log(e);
  }
}
