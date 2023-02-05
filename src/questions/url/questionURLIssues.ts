import i18next from 'i18next';
import { promptText } from '../../prompts/promptText';

export function questionURLIssues(defaultValue: string) {
  const message = i18next.t('questionsMessage.url.issues');

  return promptText(message, { defaultValue: `${defaultValue}/issues` });
}
