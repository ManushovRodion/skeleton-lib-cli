import {
  CompilerOptions,
  ModuleResolutionKind,
  ScriptTarget,
  ModuleKind,
} from 'typescript';

type KeyModuleKind = keyof typeof ModuleKind;
type KeyModuleResolutionKind = keyof typeof ModuleResolutionKind;
type KeyScriptTarget = keyof typeof ScriptTarget;
type Exlude = 'module' | 'moduleResolution' | 'target';

export type Options = Omit<CompilerOptions, Exlude> & {
  module: KeyModuleKind;
  moduleResolution: KeyModuleResolutionKind;
  target: KeyScriptTarget;
};

export interface State {
  /**
   * Правила работы с TS
   */
  compilerOptions: Options;

  /**
   * К каким папкам и файлам надо применять TS
   */
  include: string[];

  /**
   * Исключения, к которым не надо применять правила
   */
  exclude: string[];
}
