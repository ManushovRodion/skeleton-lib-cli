import { questionAuthorName } from './../questionAuthorName';

import * as PromptText from '../../../prompts/promptText';

jest.mock('i18next', () => ({
  t: (key: string) => {
    if (key === 'questionsMessage.author.name') return 'TITLE';
    if (key === 'base.requiredInput') return 'REQUIRED';
    return '';
  },
}));

describe('questions/author/questionAuthorName', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('');
  });

  it('Проверка, что переданные данные из promptText передаются как результат функции', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('value');

    const value = await questionAuthorName();
    expect(value).toBe('value');
  });

  it('Проверка, что для promptText корректно передается сообщение', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorName();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('TITLE (REQUIRED)');
  });

  it('Проверка, что для promptText передается функция валидации validateRequiredPrompts', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorName();

    const validate = promptText.mock.calls[0][1]?.validate?.name;
    expect(validate).toBe('validateRequiredPrompts');
  });
});
