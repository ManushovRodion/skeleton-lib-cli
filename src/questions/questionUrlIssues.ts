import i18next from 'i18next';
import prompts from 'prompts';

export async function questionUrlIssues(defValue = '') {
  const message = i18next.t('questions.urlIssue.message') + ':';

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
    initial: defValue,
  });

  return (data.value || defValue) as string;
}
