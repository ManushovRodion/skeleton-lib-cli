import type { State } from './types';

export function generator(state: State) {
  return state.groups
    .reduce((data, group) => {
      data += `\n# ${group.name}\n`;
      data += `${group.items.join('\n')}\n`;

      return data;
    }, '')
    .replace('\n', '');
}
