import i18next from 'i18next';
import { promptList } from '../../prompts/promptList';

export async function questionMultiLangDocsList(defaultValue: string[]) {
  const message = i18next.t('questionsMessage.multiLangDocs.list');

  return promptList(message, { defaultValue });
}
