import type { State } from './types';

export function generator(state: State) {
  const context = ['#!/usr/bin/env sh', '. "$(dirname -- "$0")/_/husky.sh"\n'];

  if (state.isPrettier || state.isEslint) {
    if (state.isPrettier) {
      context.push('npx yarn lint:format');
    }

    if (state.isEslint) {
      context.push('npx yarn lint');
    }

    return context.join('\n') + '\n';
  }

  return context.join('\n');
}
