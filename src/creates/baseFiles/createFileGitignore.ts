import { writeFile } from 'node:fs/promises';

export interface Params {
  projectDir: string;
}

export function createFileGitignore(params: Params) {
  const context = `# Node artifact files
node_modules
dist
coverage

# Generated OS
.DS_Store
Thumbs.db

# Local files
.local

# Log files
*.log

# IDE
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
  `;

  const path = `${params.projectDir}/.gitignore`;

  return writeFile(path, context, {
    encoding: 'utf8',
  });
}
