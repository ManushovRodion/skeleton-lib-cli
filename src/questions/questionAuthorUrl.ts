import i18next from 'i18next';
import prompts from 'prompts';

export async function questionAuthorUrl() {
  const message = i18next.t('questions.authorUrl.message') + ':';

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
  });

  return data.value as string;
}
