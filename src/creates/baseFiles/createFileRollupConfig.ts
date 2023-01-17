import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

const IMPORT_BASE = `
    import tsPlugin from '@rollup/plugin-typescript';
    import jsonPlugin from '@rollup/plugin-json';
    import terserPlugin from '@rollup/plugin-terser';
`;

const IMPORT_TYPE = `
    import dtsPlugin from 'rollup-plugin-dts';
`;

const CONST = `
    const DIR_OUTPUT = './dist';
    const INPUT_FILE = 'src/main.ts';
    `;

const FUNC_PACKAGE_NAME = `
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

const FUNC_MODULE_NAME = `
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

const FUNC_CJS = `
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

const FUNC_UMD = `
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

const FUNC_ES = `
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

const FUNC_TYPE = `
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

const CONST_PACKAGE_NAME = `const PACKAGE_NAME = definePackageName(process.env['npm_package_name'] || '');`;
const CONST_MODULE_NAME = `const MODULE_NAME = defineModuleName(PACKAGE_NAME);`;

const DEFINE_CJS = `defineCJS(PACKAGE_NAME),`;
const DEFINE_UMD = `defineUMD(PACKAGE_NAME, MODULE_NAME),`;
const DEFINE_ES = `defineES(PACKAGE_NAME),`;
const DEFINE_TYPE = `defineTypeTS(PACKAGE_NAME),`;

export interface Params {
  projectDir: string;
}

export function createFileRollupConfig(params: Params) {
  const context = `
    ${IMPORT_BASE}
    ${IMPORT_TYPE}

    ${CONST}

    ${FUNC_PACKAGE_NAME}
    ${FUNC_MODULE_NAME}

    ${FUNC_CJS}
    ${FUNC_UMD}
    ${FUNC_ES}
    ${FUNC_TYPE}

    ${CONST_PACKAGE_NAME}
    ${CONST_MODULE_NAME}

    export default [
        ${DEFINE_CJS}
        ${DEFINE_UMD}
        ${DEFINE_ES}
        ${DEFINE_TYPE}
    ];
  `;

  const path = `${params.projectDir}/rollup.config.ts`;

  return writeFile(path, format(context, { parser: 'typescript' }), {
    encoding: 'utf8',
  });
}
