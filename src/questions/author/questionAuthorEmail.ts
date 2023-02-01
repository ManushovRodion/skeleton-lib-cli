import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';

export function questionAuthorEmail() {
  const message = i18next.t('questionsMessage.author.email');

  return promptText(message);
}
