import i18next from 'i18next';
import prompts from 'prompts';

export async function questionMultiLangDocsList() {
  const message = i18next.t('questions.multiLangDocsList.message');
  const messageError = i18next.t('questions.multiLangDocsList.validation');

  const validate = (value: string[]) => {
    if (!value.length) {
      return messageError;
    }

    return true;
  };

  const data = await prompts({
    type: 'list',
    name: 'value',
    message,
    initial: 'ru, en',
    separator: ',',
    validate,
  });

  return (data.value as string[]) || [];
}
