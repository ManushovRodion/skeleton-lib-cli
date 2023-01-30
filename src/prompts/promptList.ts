import prompts from 'prompts';

export interface State {
  aborted: boolean;
}

export interface Params {
  validate?: (value: string[]) => string | boolean;
  defaultValue?: string[];
}

export async function promptList(message: string, params?: Params) {
  /**
   * CTRL + C не останавливают процесс
   * https://github.com/terkelg/prompts/issues/252
   */
  const onState = (state: State) => {
    if (state.aborted) process.exit(0);
  };

  const { value } = await prompts({
    type: 'list',
    name: 'value',
    message: `${message}: `,
    initial: params?.defaultValue?.join(', '),
    validate: params?.validate,
    separator: ',',
    onState,
  });

  if (!value.length && params?.defaultValue) {
    return params.defaultValue;
  }

  return value as string[];
}
