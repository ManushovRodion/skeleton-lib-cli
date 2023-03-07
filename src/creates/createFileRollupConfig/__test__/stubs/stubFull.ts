import tsPlugin from '@rollup/plugin-typescript';
import jsonPlugin from '@rollup/plugin-json';
import terserPlugin from '@rollup/plugin-terser';

import dtsPlugin from 'rollup-plugin-dts';

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
 * [RU] Создает на базе имени пакета название модуля
 * [EN] Generates a module name based on the package name
 * @param packageName
 * @returns
 */
const defineModuleName = (packageName = '') => {
  if (!packageName) return 'ModuleName';

  const chunckNames = packageName.split('-').map((chunck) => {
    return chunck[0].toUpperCase() + chunck.slice(1);
  });

  return chunckNames.join('');
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
 * [RU] Конфиг создания UMD модуля. Это модуль, который обьеденяет функционал CJS и AMD
 * [EN] Config for creating a UMD module. This is a module that combines the functionality of CJS and AMD
 * @param packageName
 * @returns
 */
const defineUMD = (packageName = '', name = '') => ({
  input: INPUT_FILE,
  output: [
    { file: `${DIR_OUTPUT}/${packageName}.umd.js`, format: 'umd', name },
  ],
  plugins: [jsonPlugin(), tsPlugin(), terserPlugin()],
});

/**
 * [RU] Конфиг создания ES модуля. Современный подход, который подходит для новых браузеров, которые поддерживают ES6
 * [EN] ES module creation config. A modern approach that suits newer browsers that support ES6
 * @param packageName
 * @returns
 */
const defineES = (packageName = '') => ({
  input: INPUT_FILE,
  output: [{ file: `${DIR_OUTPUT}/${packageName}.es.js`, format: 'es' }],
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
const MODULE_NAME = defineModuleName(PACKAGE_NAME);

export default [
  defineCJS(PACKAGE_NAME),
  defineUMD(PACKAGE_NAME, MODULE_NAME),
  defineES(PACKAGE_NAME),
  defineTypeTS(PACKAGE_NAME),
];
