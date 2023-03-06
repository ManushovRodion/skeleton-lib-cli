import {
  IMPORT_BASE,
  IMPORT_TYPE,
  CONST,
  FUNC_PACKAGE_NAME,
  FUNC_MODULE_NAME,
  FUNC_CJS,
  FUNC_UMD,
  FUNC_ES,
  FUNC_TYPE,
  CONST_PACKAGE_NAME,
  CONST_MODULE_NAME,
  DEFINE_CJS,
  DEFINE_UMD,
  DEFINE_ES,
  DEFINE_TYPE,
} from './constants';

export function generator() {
  return `
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
}
