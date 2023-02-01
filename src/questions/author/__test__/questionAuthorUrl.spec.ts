import { questionAuthorUrl } from '../questionAuthorUrl';

import * as PromptText from '../../../prompts/promptText';

jest.mock('i18next', () => ({
  t: (key: string) => {
    if (key === 'questionsMessage.author.url') return 'TITLE';
    return '';
  },
}));

describe('questions/author/questionAuthorUrl', () => {
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

    const value = await questionAuthorUrl();
    expect(value).toBe('value');
  });

  it('Проверка, что для promptText корректно передается сообщение', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionAuthorUrl();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('TITLE');
  });
});
