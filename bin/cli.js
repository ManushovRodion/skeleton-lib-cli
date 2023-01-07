#!/usr/bin/env node
const lib = require('../dist/skeleton-lib-cli.cjs.js');

try {
  lib.cli(process);
} catch (e) {
  console.error(e);
  process.exit(0);
}