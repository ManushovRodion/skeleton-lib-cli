import i18next from 'i18next';

import { promptText } from '../../prompts/promptText';
import { validatePackageNamePrompts } from '../../validates/validatePackageNamePrompts';

export async function questionPackageName() {
  const title = i18next.t('questionsMessage.package.name');
  const messageRequired = i18next.t('base.requiredInput');
  const message = `${title} (${messageRequired})`;

  return promptText(message, { validate: validatePackageNamePrompts });
}
