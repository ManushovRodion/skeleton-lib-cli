import i18next from 'i18next';
import prompts from 'prompts';

export async function questionСopyright(defValue = '') {
  const year = new Date().getFullYear();
  const value = defValue ? `${year} ${defValue}` : year;

  const message = i18next.t('questions.copyright.message') + ':';

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
    initial: value,
  });

  return (data.value || value) as string;
}
