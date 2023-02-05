import i18next from 'i18next';
import { promptText } from '../../prompts/promptText';

export async function questionPackageDescription() {
  const message = i18next.t('questionsMessage.package.description');

  return promptText(message);
}
