import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';

export interface Params {
  projectDir: string;
}

export function createFileJestConfig(params: Params) {
  const context = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],

    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
    },
  };

  const path = `${params.projectDir}/jest.config.json`;

  return writeFile(path, format(JSON.stringify(context), { parser: 'json' }), {
    encoding: 'utf8',
  });
}
