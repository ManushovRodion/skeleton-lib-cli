import i18next from 'i18next';
import prompts from 'prompts';

export async function questionСopyright(defValue: string = '') {
  const year = new Date().getFullYear();
  const value = defValue ? `${year} ${defValue}` : year;

  const postfix = `(${value}):`;
  const message = i18next.t('questions.copyright.message') + postfix;

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
  });

  return (data.value || value) as string;
}
