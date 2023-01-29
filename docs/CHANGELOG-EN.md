### changelog: [Home](./../README.md) | [RU](./CHANGELOG-RU.md)

# SKELETON-LIB-CLI

### # v0.1.0 (2023-01-20)

Package Alpha-Release `skeleton-lib-cli`

### # v0.1.1 (2023-01-29)

FIX:

- If you need to import functions from a package that is built on top of `skeleton-lib-cli` into your project and use `@rollup/plugin-node-resolve`, the package is marked as external and not part of the new project.

- Missing README.md for multilanguage.

- Crash when starting linter when it tries to parse cli node
