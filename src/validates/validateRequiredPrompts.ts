import i18next from 'i18next';
import { validateRequired } from './validateRequired';

export function validateRequiredPrompts(value?: string | string[]) {
  const message = i18next.t('base.requiredInput');

  return validateRequired(message, value);
}
