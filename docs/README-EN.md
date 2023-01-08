### readme: [Home](./../README.md) | [RU](./README-RU.md)

# SKELETON-LIB-CLI

> Command line interface that activates the skeleton library.

The task of the utility is to: launch it, answer questions and get a skeleton for writing your own library, which can be used both for servers on nodejs and in the browser. If you want to use a utility to create UI components for vue, for example, then you should use more specialized solutions.

## # Functionality

- [x] Rollup - the core used to build bundles in CJS(CommonJS), UMD and ES formats;
- [x] TypeScript support and assembly of types into a single type file;
- [x] Eslint and Pritter with base configuration;
- [x] Jest c Coverage;
- [x] Multilingual - Create skeletons for documentation with the specified languages;
- [x] GitHub issues template;
- [ ] JavaScript support;
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

| Option                | Type                   | Default | Description                                                                                                                                              |
| --------------------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>--lang</nobr>   | <nobr>en \| ru </nobr> | ru      | What language should the UI cli be in?                                                                                                                   |
| <nobr>--outDir</nobr> | string                 | ---     | The path where to unload the library skeleton. If the -outDir parameter is not set, then it is unloaded to the folder from the value of the project name |

## # Questions/Answers

1. Question:<br>
   \- I have installed github templates that have labels, but I can't see those labels in the github panel. How can I put these labels?<br><br>
   Answer:<br>
   \- After publishing the project on github, the action "UpdateLabels" will be available in actions - it will start adding labels to the github panel from the list: .github/labels.yml
   <br><br>

2. Question:<br>
   \- I see CJS(CommonJS), UMD and ES formats being built. How can I disable an unnecessary format?<br><br>
   Answer:<br>
   \- Rollup is responsible for the assembly and the config for it is rollup.config.ts - just comment out the extra call.

   ```ts
   // rollup.config.ts

   export default [
     defineCJS(PACKAGE_NAME),
     //defineUMD(PACKAGE_NAME, MODULE_NAME),
     //defineES(PACKAGE_NAME),
     defineTypeTS(PACKAGE_NAME),
   ];
   ```

   But you also need to understand that you will need to fix the package.json file in order to disable the extra:

   ```json
   // package.json

   {
     // ....
     "main": "dist/lib-cli.cjs.js",
     // "unpkg": "dist/lib-cli.umd.js", remove
     // "module": "dist/lib-cli.esm.js", remove
     "types": "dist/lib-cli.d.ts"
     // ...
   }
   ```

   <br>

3. Question:<br>
   \- What is multilingualism and how does it work?<br><br>
   Answer:<br>
   \- If you chose multilingual when starting the utility, then you will be asked which languages you want to use - just list in the format: ru, en, ch.<br>
   After that, files will be created in the docs folder README-\* and CHANGELOG-\*, where "\*" are the specified languages. And there will be links to them in the README and CHANGELOG.<br>
   It follows from this that multilingualism is the support of a project / package in different languages in the same way. How it works can be seen on the current project.
   <br><br>

4. Question:<br>
   \- I created a project with a utility and didn't select some packages when initializing. How do I add these packages?<br><br>
   Answer:<br>
   \- For the current day, it is not possible to add to a previously created project or update dependencies using this utility.<br>
   The best solution today is to create a new project using the utility and transfer the necessary part from the old one to it.<br>

## # License

[MIT](./../LICENSE)
