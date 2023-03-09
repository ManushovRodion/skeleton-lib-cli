export interface Context {
  titleInstall: string;
  titleLicense: string;
  titleLFunctional: string;
  patternInstall: string;
}

export type License = 'MIT' | '';

export interface State {
  /**
   * Название пакета
   */
  name: string;

  /**
   * Описание пакета
   */
  description: string;

  /**
   * Тип лицензии пакета
   */
  license: License;

  /**
   * Включена поддержка мультиязычности?
   */
  isMultiLangDocs: boolean;

  /**
   * Язык по умолчанию
   */
  lang: string;

  /**
   * Перечень языков для ссылок
   */
  langsURL: string[];

  /**
   * Корневойпуть ссылок
   */
  rootPathURL: string;
}
