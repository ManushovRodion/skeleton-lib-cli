import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';
import { validateRequiredPrompts } from '../../validates/validateRequiredPrompts';

export async function questionURLRepository() {
  const title = i18next.t('questionsMessage.url.repository');
  const messageRequired = i18next.t('base.requiredInput');
  const message = `${title} (${messageRequired})`;

  return promptText(message, { validate: validateRequiredPrompts });
}
