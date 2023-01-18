import i18next from 'i18next';
import prompts from 'prompts';

export async function questionUrlHome(defValue = '') {
  const message = i18next.t('questions.urlHome.message') + ':';

  const data = await prompts({
    type: 'text',
    name: 'value',
    initial: defValue,
    message,
  });

  return (data.value || defValue) as string;
}
