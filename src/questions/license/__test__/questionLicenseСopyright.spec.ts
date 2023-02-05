import { questionLicenseСopyright } from './../questionLicenseСopyright';
import * as PromptText from '../../../prompts/promptText';

describe('questions/author/questionLicenseСopyright', () => {
  beforeEach(() => {
    /**
     * Чтобы мы не ждали ответа ввода в консоле -> кидаем сразу результат
     */
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('');
  });

  it('Данные возврщаются через функцию promptText', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');
    promptText.mockResolvedValue('value');

    const value = await questionLicenseСopyright();
    expect(value).toBe('value');
  });

  it('Корректный ключ локализации', async () => {
    const promptText = jest.spyOn(PromptText, 'promptText');

    await questionLicenseСopyright();

    const message = promptText.mock.calls[0][0];
    expect(message).toBe('questionsMessage.license.copyright');
  });

  it('Дефолтное значение пробрасывается в функцию promptText', async () => {
    const year = new Date().getFullYear().toString();
    const promptText = jest.spyOn(PromptText, 'promptText');
    let message;

    await questionLicenseСopyright();

    message = promptText.mock.calls[0][1];
    expect(message?.defaultValue).toBe(year);

    await questionLicenseСopyright('TEXT');

    message = promptText.mock.calls[1][1];
    expect(message?.defaultValue).toBe(`${year} TEXT`);
  });
});
