import { questionUnitTest } from '../questionUnitTest';
import * as PromptSelect from '../../prompts/promptSelect';

describe('questions/questionUnitTest', () => {
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

    const value = await questionUnitTest();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');

    await questionUnitTest();

    const message = promptSelect.mock.calls[0][0];
    expect(message).toBe('questionsMessage.unitTest');
  });

  it('В функцию promptSelect передаются нужные опции', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');

    await questionUnitTest();

    const options = promptSelect.mock.calls[0][1];
    expect(options).toEqual([
      { title: 'Jest', value: 'JEST' },
      { title: 'base.not', value: '' },
    ]);
  });
});
