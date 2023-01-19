import i18next from 'i18next';
import prompts from 'prompts';

export async function questionMultiLangDocs() {
  const message = i18next.t('questions.multiLangDocs.message');

  const data = await prompts({
    type: 'toggle',
    name: 'value',
    message,
    initial: true,
    active: i18next.t('yes'),
    inactive: i18next.t('not'),
  });

  return data.value ? 'TRUE' : 'FALSE';
}
