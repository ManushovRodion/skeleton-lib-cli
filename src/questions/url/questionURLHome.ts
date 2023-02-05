import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';

export async function questionURLHome(defaultValue: string) {
  const message = i18next.t('questionsMessage.url.home');

  return promptText(message, { defaultValue });
}
