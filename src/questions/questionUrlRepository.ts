import i18next from 'i18next';
import prompts from 'prompts';

export async function questionUrlRepository() {
  const message = i18next.t('questions.urlRepository.message') + ':';
  const messageError = i18next.t('questions.urlRepository.validation');

  const validate = (value: string) => {
    if (!value) {
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
