import type { State } from './types';

export function defineState(): State {
  return {
    groups: [
      {
        name: 'Node artifact file',
        items: ['node_modules', 'dist', 'coverage'],
      },
      {
        name: 'Generated OS',
        items: ['.DS_Store', 'Thumbs.db'],
      },
      {
        name: 'Local files',
        items: ['.local'],
      },
      {
        name: 'Log files',
        items: ['*.log'],
      },
      {
        name: 'IDE',
        items: [
          '.idea',
          '.vscode',
          '*.suo',
          '*.ntvs*',
          '*.njsproj',
          '*.sln',
          '*.sw?',
        ],
      },
    ],
  };
}
