import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';
import { validateRequiredPrompts } from '../../validates/validateRequiredPrompts';

export function questionAuthorName() {
  const title = i18next.t('questionsMessage.author.name');
  const messageRequired = i18next.t('validation.requiredInput');
  const message = `${title} (${messageRequired})`;

  return promptText(message, { validate: validateRequiredPrompts });
}
