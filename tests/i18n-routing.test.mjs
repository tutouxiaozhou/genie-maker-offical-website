import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));

assert.ok(exists('app/[locale]/page.tsx'), 'locale route page should exist at app/[locale]/page.tsx');
assert.ok(exists('app/[locale]/layout.tsx'), 'locale route should own a root layout for localized html lang');
assert.ok(exists('app/(redirect)/page.tsx'), 'root redirect page should live in a route group');
assert.ok(exists('app/components/LocalizedHomePage.tsx'), 'localized client home page should exist');
assert.ok(exists('app/data/i18n.ts'), 'shared i18n metadata module should exist');

assert.ok(!exists('app/layout.tsx'), 'top-level layout should not force one html lang across all locales');
assert.ok(!exists('app/page.tsx'), 'top-level page should not compete with grouped root redirect');

const rootPage = read('app/(redirect)/page.tsx');
assert.match(rootPage, /redirect\(['"]\/zh['"]\)/, 'root page should redirect to /zh');

const localePage = read('app/[locale]/page.tsx');
assert.match(localePage, /generateStaticParams/, 'locale route should statically generate supported locales');
assert.match(localePage, /generateMetadata/, 'locale route should generate localized metadata');
assert.match(localePage, /alternates/, 'locale metadata should include alternates');

const layout = read('app/[locale]/layout.tsx');
assert.match(layout, /htmlLang/, 'root layout should derive html lang from locale metadata');
assert.doesNotMatch(layout, /lang="zh-CN"/, 'root layout should not hard-code zh-CN');

const copy = read('app/data/copy.ts');
for (const key of [
  'tabChat',
  'tabIdea',
  'tabNarration',
  'demoStatusDone',
  'demoStatusLive',
  'pricingPeriod',
  'signalHits',
]) {
  assert.match(copy, new RegExp(`${key}: string`), `UiCopy should define ${key}`);
}

const feature = read('app/components/sections/FeatureSection01.tsx');
assert.doesNotMatch(feature, /\['chat', 'idea', 'narration'\]/, 'feature tabs should not render raw internal ids');

const pricing = read('app/components/sections/PricingSection.tsx');
assert.match(pricing, /copy\.pricingPeriod/, 'pricing period should be localized');

const showcase = read('app/components/sections/ShowcaseSection.tsx');
assert.match(showcase, /copy\.signalHits/, 'signal hits label should be localized');

const builtEnHtml = '.next/server/app/en.html';
const builtZhHtml = '.next/server/app/zh.html';
if (exists(builtEnHtml) && exists(builtZhHtml)) {
  const enHtml = read(builtEnHtml);
  const zhHtml = read(builtZhHtml);
  assert.match(enHtml, /<html lang="en"/, 'built /en HTML should declare lang="en"');
  assert.match(zhHtml, /<html lang="zh-CN"/, 'built /zh HTML should declare lang="zh-CN"');
  assert.match(enHtml, /<link rel="alternate" hrefLang="zh-CN" href="\/zh"/, 'built /en HTML should link zh alternate');
  assert.match(zhHtml, /<link rel="alternate" hrefLang="en" href="\/en"/, 'built /zh HTML should link en alternate');
}

console.log('i18n routing checks passed');
