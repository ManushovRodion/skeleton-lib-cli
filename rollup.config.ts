import tsPlugin from '@rollup/plugin-typescript';
import jsonPlugin from '@rollup/plugin-json';
import dtsPlugin from 'rollup-plugin-dts';
import terserPlugin from '@rollup/plugin-terser';

const DIR_OUTPUT = './dist';
const INPUT_FILE = 'src/main.ts';

/**
 * [RU] Убирает все лишнее и создает на базе строки название пакета
 * [EN] Removes all unnecessary and creates a package name based on the string
 * @param npmName
 * @returns
 */
const definePackageName = (npmName = '') => {
  const name = npmName.split('/').pop();
  if (!name) return 'package-name';

  return name.replace(new RegExp('_', 'g'), '-');
};

/**
 * [RU] Конфиг создания CJS модуля. Подходит для серверных библиотек
 * [EN] Config for creating a CJS module. Suitable for server libraries
 * @param packageName
 * @returns
 */
const defineCJS = (packageName = '') => ({
  input: INPUT_FILE,
  output: [{ file: `${DIR_OUTPUT}/${packageName}.cjs.js`, format: 'cjs' }],
  plugins: [jsonPlugin(), tsPlugin(), terserPlugin()],
});

/**
 * [RU] Создает на базе ранее созданных *.d.ts единый файл типов.
 * [EN] Creates a single type file based on previously created *.d.ts.
 * @param packageName
 * @returns
 */
const defineTypeTS = (packageName = '') => ({
  input: `${DIR_OUTPUT}/types/src/main.d.ts`,
  output: { file: `${DIR_OUTPUT}/${packageName}.d.ts` },
  plugins: [dtsPlugin()],
});

const PACKAGE_NAME = definePackageName(process.env['npm_package_name'] || '');

const defineCJSProxy = (packageName = '') => ({
  ...defineCJS(packageName),
  external: ['i18next', 'prompts', 'node:fs/promises', 'prettier'],
});

export default [defineCJSProxy(PACKAGE_NAME), defineTypeTS(PACKAGE_NAME)];
