### changelog: [Home](./../README.md) | [RU](./CHANGELOG-RU.md)

# SKELETON-LIB-CLI

### # v0.2.0 (2023-03-13)

Refactors:

- [x] Refinement and coverage of application questions with tests.
- [x] Refinement and coverage of application file creation tests.
- [x] Removed exception handling in bin/cli.js file.

Bug Fixes:

- [x] Not caught by git push and not loaded by test, lint and lint:format

### # v0.1.2 (2023-01-30)

Bug Fixes:

- [x] Cli detection error: `ReferenceError: ib not defined`

### # v0.1.1 (2023-01-29)

Bug Fixes:

- [x] When you need to import functions from a package that builds on `skeleton-lib-cli` in your project and using `@rollup/plugin-node-resolve`, the package is marked as external and not part of the new project.

- [x] Missing README.md for multilanguage.

- [x] Crash on linter detection when it parses node cli definition

### # v0.1.0 (2023-01-20)

- [x] Alpha Release of `skeleton-lib-cli` package
