import i18next from 'i18next';
import prompts from 'prompts';

export async function questionDescPackage() {
  const message = i18next.t('questions.descPackage.message') + ':';

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
  });

  return data.value as string;
}
