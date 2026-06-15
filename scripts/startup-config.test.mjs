import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const config = await readFile(new URL('../next.config.ts', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

assert.match(config, /distDir\s*:/, 'next.config.ts should set distDir explicitly');
assert.match(config, /\.next-dev/, 'development output should use .next-dev');
assert.doesNotMatch(config, /^\s*output:\s*['"]standalone['"]/m, 'standalone output should not be unconditional');
assert.notEqual(packageJson.scripts.clean, 'next clean', 'clean script should not use unsupported next clean');
assert.equal(packageJson.scripts['check:startup'], 'node scripts/check-startup.mjs');

console.log('startup config ok');
