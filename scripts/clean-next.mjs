import { rm, stat } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptsDir, '..');
const args = new Set(process.argv.slice(2));

const targetNames = args.has('--dev')
  ? ['.next-dev']
  : args.has('--prod')
    ? ['.next']
    : ['.next', '.next-dev'];

function resolveSafeTarget(name) {
  const target = resolve(projectRoot, name);
  const rel = relative(projectRoot, target);

  if (!rel || rel.startsWith('..') || rel.includes(':')) {
    throw new Error(`Refusing to clean outside project root: ${target}`);
  }

  return target;
}

for (const name of targetNames) {
  const target = resolveSafeTarget(name);
  const exists = await stat(target).then(() => true, () => false);

  if (!exists) {
    console.log(`skip ${name}: not found`);
    continue;
  }

  await rm(target, { recursive: true, force: true });
  console.log(`removed ${name}`);
}
