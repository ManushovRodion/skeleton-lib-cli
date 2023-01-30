import i18next from 'i18next';
import prompts from 'prompts';

export interface State {
  aborted: boolean;
}

export interface Option {
  title: string;
  value: string;
}

export async function promptSelect(message: string, options: Option[]) {
  /**
   * CTRL + C не останавливают процесс
   * https://github.com/terkelg/prompts/issues/252
   */
  const onState = (state: State) => {
    if (state.aborted) process.exit(0);
  };

  const { value } = await prompts({
    type: 'select',
    name: 'value',
    message: `${message}: `,
    choices: [...options, { title: i18next.t('not'), value: 'NONE' }],
    initial: 0,
    onState,
  });

  return value as string;
}
