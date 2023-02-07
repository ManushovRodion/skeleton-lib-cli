import i18next from 'i18next';
import { promptSelect, type Option } from '../prompts/promptSelect';

export type Value = 'JEST' | '';

export function questionUnitTest() {
  const message = i18next.t('questionsMessage.unitTest');

  const options: Option<Value>[] = [
    { title: 'Jest', value: 'JEST' },
    { title: i18next.t('base.not'), value: '' },
  ];

  return promptSelect<Value>(message, options);
}
