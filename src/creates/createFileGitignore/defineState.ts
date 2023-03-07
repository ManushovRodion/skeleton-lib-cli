import type { State } from './types';

export const defineState = (): State => ({
  groups: [
    {
      name: 'Node artifact files',
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
});
