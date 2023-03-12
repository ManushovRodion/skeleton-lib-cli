export interface State {
  /**
   * Название пакета
   */
  name: string;

  /**
   * Версия пакета
   */
  version: string;

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
