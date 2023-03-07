import type { State } from './types';

export function generator(state: State) {
  if (!state.name) {
    throw new Error("Нет значения для 'name'");
  }

  return `#!/usr/bin/env node\nconst lib = require('../dist/${state.name}.cjs.js');\n\nlib.cli(process);`;
}
