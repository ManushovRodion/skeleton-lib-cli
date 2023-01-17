import i18next from 'i18next';
import prompts from 'prompts';

export async function questionUrlIssues(defValue: string = '') {
  const postfix = defValue ? ` (${defValue}):` : ':';
  const message = i18next.t('questions.urlIssue.message') + postfix;

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
  });

  return (data.value || defValue) as string;
}
