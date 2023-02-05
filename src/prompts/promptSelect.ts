import prompts from 'prompts';

export interface State {
  aborted: boolean;
}

export interface Option<Value> {
  title: string;
  value: Value;
}

export async function promptSelect<Value>(
  message: string,
  options: Option<Value>[]
) {
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
    choices: options,
    initial: 0,
    onState,
  });

  return value as Value;
}
