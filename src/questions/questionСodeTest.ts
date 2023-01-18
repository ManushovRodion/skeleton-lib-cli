import i18next from 'i18next';
import prompts from 'prompts';

export async function questionСodeTest() {
  const message = i18next.t('questions.codeTest.message');

  const data = await prompts({
    type: 'select',
    name: 'value',
    message,
    choices: [
      { title: 'Jest', value: 'JEST' },
      { title: i18next.t('not'), value: 'NONE' },
    ],
    initial: 0,
  });

  return (data.value || 'NONE') as 'JEST' | 'NONE';
}
