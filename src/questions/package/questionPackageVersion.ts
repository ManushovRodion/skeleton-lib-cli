import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';
import { validateRequiredPrompts } from '../../validates/validateRequiredPrompts';

export async function questionPackageVersion(defaultValue: string) {
  const title = i18next.t('questionsMessage.package.version');
  const messageRequired = i18next.t('validation.requiredInput');
  const message = `${title} (${messageRequired})`;

  return promptText(message, {
    validate: validateRequiredPrompts,
    defaultValue,
  });
}
