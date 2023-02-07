import i18next from 'i18next';
import { promptSelect, type Option } from '../prompts/promptSelect';

export type Value = 'FULL' | 'ESLINT' | 'PRETTER' | '';

export async function questionСodeStyle() {
  const message = i18next.t('questionsMessage.codeStyle');

  const options: Option<Value>[] = [
    { title: 'ESLint + Pretter', value: 'FULL' },
    { title: 'ESLint', value: 'ESLINT' },
    { title: 'Pretter', value: 'PRETTER' },
    { title: i18next.t('base.not'), value: '' },
  ];

  return promptSelect<Value>(message, options);
}
