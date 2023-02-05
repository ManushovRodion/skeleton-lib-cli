import i18next from 'i18next';
import { validatePackageName } from './validatePackageName';

export function validatePackageNamePrompts(value?: string) {
  const message = i18next.t('validation.namePackage');

  return validatePackageName(message, value);
}
