import { unlink, readFile } from 'node:fs/promises';

import {
  CLI_SCRIPT_BUILD,
  CLI_SCRIPT_LINT,
  CLI_SCRIPT_LINT_FORMAT,
  CLI_SCRIPT_TEST,
  DEV_DEPENDENCIES_BASE,
  DEV_DEPENDENCIES_ESLINT,
  DEV_DEPENDENCIES_ESLINT_PRETTIER,
  DEV_DEPENDENCIES_JEST,
  DEV_DEPENDENCIES_PRETTIER,
  FILE_NAME,
} from './constants';
import { createFileJsonPackage } from './index';

const dir = './src/creates/files/createFileJsonPackage';
const path = `${dir}/${FILE_NAME}`;

describe('createFileJsonPackage', () => {
  it('Кидается исключение, когда неуказаны обязательные параметры', async () => {
    const file = createFileJsonPackage();

    try {
      await file.render(dir);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'name'"));
    }

    try {
      file.updateName('name');
      await file.render(dir);
    } catch (e) {
      expect(e).toEqual(new Error("Нет значения для 'version'"));
    }
  });

  it('Создается файл: кейс, когда установлены только обязательные параметры', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
      },
      dependencies: {},
      devDependencies: {
        ...DEV_DEPENDENCIES_BASE,
      },
    });

    unlink(path);
  });

  describe('Создается файл: кейс, когда установлены поразному параметры по автору проекта', () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');

    it('Указано только имя', async () => {
      file.updateAuthor('author');

      await file.render(dir);

      const context = await readFile(path, { encoding: 'utf-8' });
      expect(JSON.parse(context)).toEqual({
        name: 'name',
        version: 'version',
        keywords: [],
        files: ['dist'],
        main: 'dist/name.cjs.js',
        unpkg: 'dist/name.umd.js',
        module: 'dist/name.es.js',
        types: 'dist/name.d.js',
        scripts: {
          build: CLI_SCRIPT_BUILD,
        },
        author: 'author',
        dependencies: {},
        devDependencies: {
          ...DEV_DEPENDENCIES_BASE,
        },
      });

      unlink(path);
    });

    it('Указано имя и email', async () => {
      file.updateAuthor('author_name', 'author_email');

      await file.render(dir);

      const context = await readFile(path, { encoding: 'utf-8' });
      expect(JSON.parse(context)).toEqual({
        name: 'name',
        version: 'version',
        keywords: [],
        files: ['dist'],
        main: 'dist/name.cjs.js',
        unpkg: 'dist/name.umd.js',
        module: 'dist/name.es.js',
        types: 'dist/name.d.js',
        scripts: {
          build: CLI_SCRIPT_BUILD,
        },
        author: {
          name: 'author_name',
          email: 'author_email',
        },
        dependencies: {},
        devDependencies: {
          ...DEV_DEPENDENCIES_BASE,
        },
      });

      unlink(path);
    });

    it('Указано имя и url', async () => {
      file.updateAuthor('author_name', '', 'author_url');

      await file.render(dir);

      const context = await readFile(path, { encoding: 'utf-8' });
      expect(JSON.parse(context)).toEqual({
        name: 'name',
        version: 'version',
        keywords: [],
        files: ['dist'],
        main: 'dist/name.cjs.js',
        unpkg: 'dist/name.umd.js',
        module: 'dist/name.es.js',
        types: 'dist/name.d.js',
        scripts: {
          build: CLI_SCRIPT_BUILD,
        },
        author: {
          name: 'author_name',
          url: 'author_url',
        },
        dependencies: {},
        devDependencies: {
          ...DEV_DEPENDENCIES_BASE,
        },
      });

      unlink(path);
    });

    it('Указано полное значение автора', async () => {
      file.updateAuthor('author_name', 'author_email', 'author_url');

      await file.render(dir);

      const context = await readFile(path, { encoding: 'utf-8' });
      expect(JSON.parse(context)).toEqual({
        name: 'name',
        version: 'version',
        keywords: [],
        files: ['dist'],
        main: 'dist/name.cjs.js',
        unpkg: 'dist/name.umd.js',
        module: 'dist/name.es.js',
        types: 'dist/name.d.js',
        scripts: {
          build: CLI_SCRIPT_BUILD,
        },
        author: {
          name: 'author_name',
          email: 'author_email',
          url: 'author_url',
        },
        dependencies: {},
        devDependencies: {
          ...DEV_DEPENDENCIES_BASE,
        },
      });

      unlink(path);
    });
  });

  it('Создается файл: кейс, когда установлены дополнительные параметры', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.updateDescription('description');
    file.updateLicense('MIT');
    file.updateUrlHome('homepage');
    file.updateAuthor('author');
    file.updateUrlRepository('repository');
    file.updateUrlIssues('bugs');

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      description: 'description',
      keywords: [],
      license: 'MIT',
      homepage: 'homepage',
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
      },
      author: 'author',
      repository: {
        type: 'git',
        url: `git+repository.git`,
      },
      bugs: {
        url: 'bugs',
      },
      dependencies: {},
      devDependencies: {
        ...DEV_DEPENDENCIES_BASE,
      },
    });

    unlink(path);
  });

  it('Создается файл: кейс, когда установлены параметры eslint', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.onESLint();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
        lint: CLI_SCRIPT_LINT,
      },
      dependencies: {},
      devDependencies: {
        ...DEV_DEPENDENCIES_BASE,
        ...DEV_DEPENDENCIES_ESLINT,
      },
    });

    unlink(path);
  });

  it('Создается файл: кейс, когда установлены параметры prettier', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.onPrettier();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
        'lint:format': CLI_SCRIPT_LINT_FORMAT,
      },
      dependencies: {},
      devDependencies: {
        ...DEV_DEPENDENCIES_BASE,
        ...DEV_DEPENDENCIES_PRETTIER,
      },
    });

    unlink(path);
  });

  it('Создается файл: кейс, когда установлены параметры eslint и prettier', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.onESLint();
    file.onPrettier();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
        lint: CLI_SCRIPT_LINT,
        'lint:format': CLI_SCRIPT_LINT_FORMAT,
      },
      dependencies: {},
      devDependencies: {
        ...DEV_DEPENDENCIES_BASE,
        ...DEV_DEPENDENCIES_ESLINT,
        ...DEV_DEPENDENCIES_PRETTIER,
        ...DEV_DEPENDENCIES_ESLINT_PRETTIER,
      },
    });

    unlink(path);
  });

  it('Создается файл: кейс, когда установлены параметры jest', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.onJest();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
        test: CLI_SCRIPT_TEST,
      },
      dependencies: {},
      devDependencies: {
        ...DEV_DEPENDENCIES_BASE,
        ...DEV_DEPENDENCIES_JEST,
      },
    });

    unlink(path);
  });

  it('Создается файл: кейс, когда установлены параметры cli', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.onCommandLineInterface();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      bin: {
        name: './bin/cli.js',
      },
      scripts: {
        build: CLI_SCRIPT_BUILD,
      },
      dependencies: {},
      devDependencies: DEV_DEPENDENCIES_BASE,
    });

    unlink(path);
  });

  it('Создается файл: кейс, когда установлены параметры multilang docs', async () => {
    const file = createFileJsonPackage();

    file.updateName('name');
    file.updateVersion('version');
    file.onMultiLangDocs();

    await file.render(dir);

    const context = await readFile(path, { encoding: 'utf-8' });
    expect(JSON.parse(context)).toEqual({
      name: 'name',
      version: 'version',
      keywords: [],
      files: ['dist', 'docs'],
      main: 'dist/name.cjs.js',
      unpkg: 'dist/name.umd.js',
      module: 'dist/name.es.js',
      types: 'dist/name.d.js',
      scripts: {
        build: CLI_SCRIPT_BUILD,
      },
      dependencies: {},
      devDependencies: DEV_DEPENDENCIES_BASE,
    });

    unlink(path);
  });
});
