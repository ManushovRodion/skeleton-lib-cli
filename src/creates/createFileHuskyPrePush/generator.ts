import type { State } from './types';

export function generator(state: State) {
  const context = ['#!/usr/bin/env sh', '. "$(dirname -- "$0")/_/husky.sh"\n'];

  if (state.isJest) {
    context.push('npx yarn test');

    return context.join('\n') + '\n';
  }

  return context.join('\n');
}
