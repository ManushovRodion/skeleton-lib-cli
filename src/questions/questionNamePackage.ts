import i18next from 'i18next';
import prompts from 'prompts';

export async function questionNamePackage() {
  const message = i18next.t('questions.namePackage.message') + ':';
  const messageError = i18next.t('questions.namePackage.validation');

  const validate = (value: string) => {
    const regexp = new RegExp('^[a-z-]+', 'mg');

    if (!value || !regexp.test(value)) {
      return messageError;
    }

    return true;
  };

  const data = await prompts({
    type: 'text',
    name: 'value',
    message,
    validate,
  });

  return data.value as string;
}
