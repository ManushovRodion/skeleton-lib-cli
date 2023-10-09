import type { State } from './types';

export const defineState = (): State => ({
  compilerOptions: {
    /**
     * ==================================================================================================================
     * BASE
     * ==================================================================================================================
     */

    /**
     * [RU]: Тип модуля
     * [EN]: Type module
     * https://www.typescriptlang.org/tsconfig#module
     */
    module: 'ES2022',
    /**
     * [RU]: Стратегия модуля
     * [EN]: Module strategy
     * https://www.typescriptlang.org/tsconfig#moduleResolution
     */
    moduleResolution: 'Bundler',
    /**
     * [RU]: Конвертация в нужный стандарт
     * [EN]: Convert to the desired standard
     * https://www.typescriptlang.org/tsconfig#target
     */
    target: 'ES2022',
    /**
     * [RU]: Позволяет импортировать json
     * [EN]: Allows you to import json
     * https://www.typescriptlang.org/tsconfig#resolveJsonModule
     */
    resolveJsonModule: true,
    /**
     * [RU]: Позволяет использовать модули в стиле ES
     * [EN]: Allows you to use ES-style modules
     * https://www.typescriptlang.org/tsconfig#esModuleInterop
     */
    esModuleInterop: true,
    /**
     * [RU]: Позволяет создать файлы с типами *.d.ts
     * [EN]: Allows you to create files with types *.d.ts
     * https://www.typescriptlang.org/tsconfig#declaration
     */
    declaration: true,
    /**
     * [RU]: Позволяет указать путь где будут создаваться типы
     * [EN]: Allows you to specify the path where types will be created
     * https://www.typescriptlang.org/tsconfig#declarationDir
     */
    declarationDir: './types',
    /**
     * [RU]: Создавать только *.d.ts без *.js
     * [EN]: Create only *.d.ts without *.js
     * https://www.typescriptlang.org/tsconfig#emitDeclarationOnly
     */
    emitDeclarationOnly: false,
    /**
     * [RU]: Удаляет все комменты в *.js
     * [EN]: Removes all comments in *.js
     * https://www.typescriptlang.org/tsconfig#removeComments
     */
    removeComments: true,

    /**
     * ==================================================================================================================
     * LINT
     * ==================================================================================================================
     */

    /**
     * [RU]: Включает все параметры строгости языка
     * [EN]: Includes all language severity options
     * https://www.typescriptlang.org/tsconfig#strict
     */
    strict: true,
    /**
     * [RU]: Убирает абсурдные выражения
     * [EN]: Removes absurd expressions
     * https://www.typescriptlang.org/tsconfig#allowUnreachableCode
     */
    allowUnreachableCode: false,
    /**
     * [RU]: Более строгая обработка случай с undefined в type и interface
     * [EN]: Stricter handling of the case with undefined in type and interface
     * https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
     */
    exactOptionalPropertyTypes: true,
    /**
     * [RU]: Блок case должен возвращать значение или использовать breack
     * [EN]: The case block must return a value or use break
     * https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch
     */
    noFallthroughCasesInSwitch: true,
    /**
     * [RU]: Запрет на использование any
     * [EN]: The ban on the use of any
     * https://www.typescriptlang.org/tsconfig#noImplicitAny
     */
    noImplicitAny: true,
    /**
     * [RU]: Дает понимание, что метод перезагружает родительский метод за счет override
     * [EN]: Gives the understanding that the method is reloading the traditional account substitution method
     * https://www.typescriptlang.org/tsconfig#noImplicitOverride
     */
    noImplicitOverride: true,
    /**
     * [RU]: Дает гарантию что метод возвращает указанный тип
     * [EN]: Ensures that the method returns the specified type
     * https://www.typescriptlang.org/tsconfig#noImplicitReturns
     */
    noImplicitReturns: true,
    /**
     * [RU]: Позволяет видеть this в рамках явного контекста
     * [EN]: Allows you to see this within an explicit context
     * https://www.typescriptlang.org/tsconfig#noImplicitThis
     */
    noImplicitThis: true,
    /**
     * [RU]: Запрещает обращаться к полям, которых нет через точку {}.test => {}['test']
     * [EN]: Forbids accessing fields that do not exist through the dot {}.test => {}['test']
     * https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature
     */
    noPropertyAccessFromIndexSignature: true,
    /**
     * [RU]: Ругается на переменные, которые не используются
     * [EN]: Swears at variables that are not used
     * https://www.typescriptlang.org/tsconfig#noUnusedLocals
     */
    noUnusedLocals: true,
    /**
     * [RU]: Ругается на параметры, которые не используются
     * [EN]: Swears at params that are not used
     * https://www.typescriptlang.org/tsconfig#noUnusedParameters
     */
    noUnusedParameters: true,
    /**
     * [RU]: Дает гарантию, что в catch попадает unknown вместо any
     * [EN]: Ensures that catch gets unknown instead of any
     * https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables
     */
    useUnknownInCatchVariables: true,
    /**
     * [RU]: Зависимость в реестре импорта
     * [EN]: Import registry dependency
     * https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames
     */
    forceConsistentCasingInFileNames: true,
  },
  include: ['**/*.ts'],
  exclude: ['node_modules', 'dist'],
});
