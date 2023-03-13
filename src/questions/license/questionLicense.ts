import i18next from 'i18next';
import { promptSelect, type Option } from '../../prompts/promptSelect';

export type Value = 'MIT' | '';

export function questionLicense() {
  const message = i18next.t('questionsMessage.license.list');

  const options: Option<Value>[] = [
    { title: 'MIT', value: 'MIT' },
    { title: i18next.t('base.not'), value: '' },
  ];

  return promptSelect<Value>(message, options);
}
