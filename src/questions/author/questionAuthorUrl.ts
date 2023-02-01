import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';

export function questionAuthorURL() {
  const message = i18next.t('questionsMessage.author.url');

  return promptText(message);
}
