import i18next from 'i18next';
import prompts from 'prompts';

export async function questionСodeStyle() {
  const message = i18next.t('questions.codeStyle.message');

  const data = await prompts({
    type: 'select',
    name: 'value',
    message,
    choices: [
      { title: 'ESLint + Pretter', value: 'FULL' },
      { title: 'ESLint', value: 'ESLINT' },
      { title: 'Pretter', value: 'PRETTER' },
      { title: i18next.t('not'), value: 'NONE' },
    ],
    initial: 0,
  });

  return (data.value || 'NONE') as 'FULL' | 'ESLINT' | 'PRETTER' | 'NONE';
}
