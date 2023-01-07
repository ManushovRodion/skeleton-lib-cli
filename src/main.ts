import { test } from './test/tets';
import p from './test/t.json';

export { test };

export function testIndex(n: number) {
  const num = test();

  console.log('test', n + num, p.d);
}
