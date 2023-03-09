import type { Context, State } from './types';

import {
  CONTEXT,
  CONTEXT_DESCRIPTION,
  CONTEXT_TEXT_EMPTY,
  PATTERN_BLOCK_TITLE_H1,
  PATTERN_BLOCK_TITLE_H2,
  PATTERN_LICENSE,
  PATTERN_SH_INSTALL_NPM,
  PATTERN_SH_INSTALL_YARN,
} from './constants';
import { validationRequired } from './validationRequired';

export function generatorBase(state: State) {
  validationRequired(state.name, 'name');

  const context: Context = CONTEXT[state.lang] || CONTEXT['ru'];

  const name = PATTERN_BLOCK_TITLE_H1.replace(
    'TITLE',
    state.name.toUpperCase()
  );
  const description = `> ${state.description || '.......'}`;

  const titleFunctional = PATTERN_BLOCK_TITLE_H2.replace(
    'TITLE',
    context.titleLFunctional
  );

  const titleInstall = PATTERN_BLOCK_TITLE_H2.replace(
    'TITLE',
    context.titleInstall
  );

  const shInstallNPM = PATTERN_SH_INSTALL_NPM.replace(
    'PACKAGE_NAME',
    state.name
  );
  const textInstallNPM = context.patternInstall.replace(
    'PACKAGE_MANAGER_NAME',
    'npm'
  );

  const shInstallYARN = PATTERN_SH_INSTALL_YARN.replace(
    'PACKAGE_NAME',
    state.name
  );
  const textInstallYARN = context.patternInstall.replace(
    'PACKAGE_MANAGER_NAME',
    'yarn'
  );

  let titleLicense = '';
  let contextLicense = '';

  if (state.license) {
    titleLicense = PATTERN_BLOCK_TITLE_H2.replace(
      'TITLE',
      context.titleLicense
    );
    contextLicense = PATTERN_LICENSE.replace('LICENSE', state.license);
  }

  return [
    name,
    description,
    CONTEXT_DESCRIPTION,
    titleFunctional,
    CONTEXT_TEXT_EMPTY,
    titleInstall,
    textInstallNPM,
    shInstallNPM,
    textInstallYARN,
    shInstallYARN,
    titleLicense,
    contextLicense,
  ].join('\n');
}
