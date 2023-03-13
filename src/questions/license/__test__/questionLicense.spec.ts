import { questionLicense } from '../questionLicense';
import * as PromptSelect from '../../../prompts/promptSelect';

describe('questions/questionLicense', () => {
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

    const value = await questionLicense();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');

    await questionLicense();

    const message = promptSelect.mock.calls[0][0];
    expect(message).toBe('questionsMessage.license.list');
  });

  it('В функцию promptSelect передаются нужные опции', async () => {
    const promptSelect = jest.spyOn(PromptSelect, 'promptSelect');

    await questionLicense();

    const options = promptSelect.mock.calls[0][1];
    expect(options).toEqual([
      { title: 'MIT', value: 'MIT' },
      { title: 'base.not', value: '' },
    ]);
  });
});
