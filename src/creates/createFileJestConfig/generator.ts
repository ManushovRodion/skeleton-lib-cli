export function generator() {
  const context = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    modulePathIgnorePatterns: ['/stubs/'],

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

  return JSON.stringify(context);
}
