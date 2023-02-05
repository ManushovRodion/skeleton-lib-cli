import i18next from 'i18next';
import { promptToggle } from '../../prompts/promptToggle';

export async function questionMultiLangDocs() {
  const message = i18next.t('questionsMessage.multiLangDocs.toggle');

  return promptToggle(message);
}
