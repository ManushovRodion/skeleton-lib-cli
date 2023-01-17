import i18next from 'i18next';
import prompts from 'prompts';

export async function questionAuthor() {
  const message = i18next.t('questions.author.message') + ':';
  const messageError = i18next.t('questions.author.validation');

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
