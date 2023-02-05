import i18next from 'i18next';
import { promptText } from '../../prompts/promptText';

export function questionLicenseСopyright(defaultValue?: string) {
  const year = new Date().getFullYear().toString();
  const value = defaultValue ? `${year} ${defaultValue}` : year;
  const message = i18next.t('questionsMessage.license.copyright');

  return promptText(message, { defaultValue: value });
}
