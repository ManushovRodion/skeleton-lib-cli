import prompts from 'prompts';

export interface State {
  aborted: boolean;
}

export interface Params {
  validate?: (value: string) => string | boolean;
  defaultValue?: string;
}

export async function promptText(message: string, params?: Params) {
  /**
   * CTRL + C не останавливают процесс
   * https://github.com/terkelg/prompts/issues/252
   */
  const onState = (state: State) => {
    if (state.aborted) process.exit(0);
  };

  const { value } = await prompts({
    type: 'text',
    name: 'value',
    message: `${message}: `,
    initial: params?.defaultValue || '',
    validate: params?.validate,
    onState,
  });

  if (!value && params?.defaultValue) {
    return params.defaultValue;
  }

  return String(value).trim();
}
