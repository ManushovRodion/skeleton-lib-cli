### readme: [Home](./../README.md) | [RU](./README-RU.md)

# SKELETON-LIB-CLI

> Command line interface that activates the skeleton library.

## # Functionality

- [x] Rollup - the core used to build bundles in CJS(CommonJS), UMD and ES formats;
- [x] TypeScript support and assembly of types into a single type file;
- [x] Eslint and Pritter with base configuration;
- [x] Jest c Coverage;
- [x] Multilingual - Create skeletons for documentation with the specified languages;
- [x] GitHub issues template;
- [ ] Mono-repositories based on Lerna;
- [ ] Lint Git Commits - lint git commits according to [rules](https://www.conventionalcommits.org/en/v1.0.0/);

## # Install

```sh
npx skeleton-lib-cli
```

The cli also has optional parameters:

```sh
npx skeleton-lib-cli -lang en

npx skeleton-lib-cli -outDir DIR_PROJECT

npx skeleton-lib-cli -outDir DIR_PROJECT -lang en
```

| Option               | Type                   | Default | Description                                                                                                                                                    |
| -------------------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>-lang</nobr>   | <nobr>en \| ru </nobr> | ru      | What language should the UI cli be in?                                                                                                                         |
| <nobr>-outDir</nobr> | string                 | ---     | The path where to unload the library skeleton. If the -outDir parameter is not set, then it is unloaded to the folder from the value of the "name_package" tag |

## # License

[MIT](./../LICENSE)
