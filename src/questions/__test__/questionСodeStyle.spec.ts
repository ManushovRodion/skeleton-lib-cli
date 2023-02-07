import { questionСodeStyle } from '../questionСodeStyle';
import * as PromptSelect from '../../prompts/promptSelect';

describe('questions/questionСodeStyle', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');
    promptSelect.mockResolvedValue('');
  });

  it('Данные возврщаются через функцию promptSelect', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');
    promptSelect.mockResolvedValue('value');

    const value = await questionСodeStyle();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');

    await questionСodeStyle();

    const message = promptSelect.mock.calls[0][0];
    expect(message).toBe('questionsMessage.codeStyle');
  });

  it('В функцию promptSelect передаются нужные опции', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');

    await questionСodeStyle();

    const options = promptSelect.mock.calls[0][1];
    expect(options).toEqual([
      { title: 'ESLint + Pretter', value: 'FULL' },
      { title: 'ESLint', value: 'ESLINT' },
      { title: 'Pretter', value: 'PRETTER' },
      { title: 'base.not', value: '' },
    ]);
  });
});
