import prompts from 'prompts';
import i18next from 'i18next';

export interface State {
  aborted: boolean;
}

export async function promptToggle(message: string) {
  /**
   * CTRL + C не останавливают процесс
   * https://github.com/terkelg/prompts/issues/252
   */
  const onState = (state: State) => {
    if (state.aborted) process.exit(0);
  };

  const { value } = await prompts({
    type: 'toggle',
    name: 'value',
    message: `${message}? `,
    active: i18next.t('base.yes'),
    inactive: i18next.t('base.not'),
    initial: true,
    onState,
  });

  return value === true;
}
