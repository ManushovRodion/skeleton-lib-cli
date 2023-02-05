import i18next from 'i18next';
import { promptToggle } from '../../prompts/promptToggle';

export function questionLicense() {
  const message = i18next.t('questionsMessage.license.toggle');

  return promptToggle(message);
}
