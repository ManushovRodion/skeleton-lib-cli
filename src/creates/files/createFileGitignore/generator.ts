import type { State } from './types';

export function generator(state: State) {
  let data = '';

  state.groups.forEach((group) => {
    data += `# ${group.name}\n`;
    data += `${group.items.join('\n')}\n`;
  });

  return data;
}
