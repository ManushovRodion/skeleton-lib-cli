import i18next from 'i18next';
import { mkdir } from 'node:fs/promises';

export async function createDirPackage(packageDir: string) {
  try {
    await mkdir(packageDir, { recursive: true });
  } catch (e) {
    throw i18next.t('error.notCreateDirPackage');
  }
}
