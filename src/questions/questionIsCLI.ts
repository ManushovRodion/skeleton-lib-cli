import i18next from 'i18next';
import { promptToggle } from '../prompts/promptToggle';

export function questionIsCLI() {
  const message = i18next.t('questionsMessage.cli');

  return promptToggle(message);
}
