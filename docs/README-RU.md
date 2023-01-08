### readme: [Главная](./../README.md) | [EN](./README-EN.md)

# SKELETON-LIB-CLI

> Интерфейс командной строки, который инициализирует скелет библиотеки.

## # Функционал

- [x] Rollup - ядро, с помощью которого собираются бандлы в формате CJS(CommonJS), UMD и ES;
- [x] Поддержка TypeScript и сборка типов в единный файл типов;
- [x] Eslint и Pritter c базовой конфигурацией;
- [x] Jest c Coverage;
- [x] Мультиязычность - Создаст скелеты для документации с указанными языками;
- [x] Шаблон issues для GitHub;
- [ ] Монорепозитории на базе Lerna;
- [ ] Lint Git Commits - линтер коммитов в гит по [правилам](https://www.conventionalcommits.org/ru/v1.0.0/);

## # Установка

```sh
npx skeleton-lib-cli
```

Так же у cli есть не обязательные параметры:

```sh
npx skeleton-lib-cli -lang en

npx skeleton-lib-cli -outDir DIR_PROJECT

npx skeleton-lib-cli -outDir DIR_PROJECT -lang en

```

| Опция                | Тип                    | По умолчанию | Описание                                                                                                                       |
| -------------------- | ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| <nobr>-lang</nobr>   | <nobr>en \| ru </nobr> | ru           | На каком языке должен быть UI cli                                                                                              |
| <nobr>-outDir</nobr> | string                 | ---          | Путь, куда выгрузить скелет библиотеки. Если не задан параметр -outDir, то выгружается в папку из значения тега "name_package" |

## # Лицензия

[MIT](./../LICENSE)
