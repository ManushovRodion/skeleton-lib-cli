export const FILE_NAME = 'rollup.config.ts';

export const IMPORT_BASE = `
import tsPlugin from '@rollup/plugin-typescript';
import jsonPlugin from '@rollup/plugin-json';
import terserPlugin from '@rollup/plugin-terser';
`;

export const IMPORT_TYPE = `
import dtsPlugin from 'rollup-plugin-dts';
`;

export const CONST = `
const DIR_OUTPUT = './dist';
const INPUT_FILE = 'src/main.ts';
`;

export const FUNC_PACKAGE_NAME = `
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
`;

export const FUNC_MODULE_NAME = `
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
`;

export const FUNC_CJS = `
/**
 * [RU] Конфиг создания CJS модуля. Подходит для серверных библиотек
 * [EN] Config for creating a CJS module. Suitable for server libraries
 * @param packageName
 * @returns
 */
const defineCJS = (packageName = '') => ({
    input: INPUT_FILE,
    output: [{ file: \`\${DIR_OUTPUT}/\${packageName}.cjs.js\`, format: 'cjs' }],
    plugins: [jsonPlugin(), tsPlugin(), terserPlugin()],
});
`;

export const FUNC_UMD = `
/**
 * [RU] Конфиг создания UMD модуля. Это модуль, который обьеденяет функционал CJS и AMD
 * [EN] Config for creating a UMD module. This is a module that combines the functionality of CJS and AMD
 * @param packageName
 * @returns
 */
const defineUMD = (packageName = '', name = '') => ({
    input: INPUT_FILE,
    output: [
    { file: \`\${DIR_OUTPUT}/\${packageName}.umd.js\`, format: 'umd', name },
    ],
    plugins: [jsonPlugin(), tsPlugin(), terserPlugin()],
});
`;

export const FUNC_ES = `
/**
 * [RU] Конфиг создания ES модуля. Современный подход, который подходит для новых браузеров, которые поддерживают ES6
 * [EN] ES module creation config. A modern approach that suits newer browsers that support ES6
 * @param packageName
 * @returns
 */
const defineES = (packageName = '') => ({
    input: INPUT_FILE,
    output: [{ file: \`\${DIR_OUTPUT}/\${packageName}.es.js\`, format: 'es' }],
    plugins: [jsonPlugin(), tsPlugin(), terserPlugin()],
});
`;

export const FUNC_TYPE = `
/**
 * [RU] Создает на базе ранее созданных *.d.ts единый файл типов.
 * [EN] Creates a single type file based on previously created *.d.ts.
 * @param packageName
 * @returns
 */
const defineTypeTS = (packageName = '') => ({
    input: \`\${DIR_OUTPUT}/types/src/main.d.ts\`,
    output: { file: \`\${DIR_OUTPUT}/\${packageName}.d.ts\` },
    plugins: [dtsPlugin()],
});
`;

export const CONST_PACKAGE_NAME = `const PACKAGE_NAME = definePackageName(process.env['npm_package_name'] || '');`;
export const CONST_MODULE_NAME = `const MODULE_NAME = defineModuleName(PACKAGE_NAME);`;

export const DEFINE_CJS = `defineCJS(PACKAGE_NAME),`;
export const DEFINE_UMD = `defineUMD(PACKAGE_NAME, MODULE_NAME),`;
export const DEFINE_ES = `defineES(PACKAGE_NAME),`;
export const DEFINE_TYPE = `defineTypeTS(PACKAGE_NAME),`;
