#!/usr/bin/env node

import { chromium } from 'playwright';

const target = process.argv[2] || 'http://127.0.0.1:4173';
const maxInitialBytes = Number(process.env.PERF_MAX_INITIAL_BYTES || 380000);
const maxCssBytes = Number(process.env.PERF_MAX_CSS_BYTES || 220000);
const maxInitialJsBytes = Number(process.env.PERF_MAX_INITIAL_JS_BYTES || 2000);

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
]) {
  const page = await browser.newPage({ viewport });
  await page.goto(target, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const resources = performance.getEntriesByType('resource').map((resource) => ({
      name: resource.name,
      transferSize: resource.transferSize,
      encodedBodySize: resource.encodedBodySize,
      duration: resource.duration,
    }));
    const css = resources.find((resource) => resource.name.endsWith('/styles.css'));
    const initialJs = resources.filter((resource) => resource.name.endsWith('.js'));
    return {
      resources,
      cssBytes: css?.encodedBodySize || 0,
      initialJsBytes: initialJs.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
      initialBytes: resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
      aiLoadedInitially: resources.some((resource) => resource.name.endsWith('/ai-field-tools.js')),
    };
  });
  results.push({ viewport: viewport.name, ...result });
  await page.close();
}

await browser.close();

const failures = [];
for (const result of results) {
  if (result.initialBytes > maxInitialBytes) failures.push(`${result.viewport}: initial resource bytes ${result.initialBytes} > ${maxInitialBytes}`);
  if (result.cssBytes > maxCssBytes) failures.push(`${result.viewport}: CSS bytes ${result.cssBytes} > ${maxCssBytes}`);
  if (result.initialJsBytes > maxInitialJsBytes) failures.push(`${result.viewport}: initial JS bytes ${result.initialJsBytes} > ${maxInitialJsBytes}`);
  if (result.aiLoadedInitially) failures.push(`${result.viewport}: AI tools script loaded before the AI section was near the viewport`);
}

console.log(JSON.stringify(results.map(({ viewport, initialBytes, cssBytes, initialJsBytes, aiLoadedInitially }) => ({
  viewport,
  initialBytes,
  cssBytes,
  initialJsBytes,
  aiLoadedInitially,
})), null, 2));

if (failures.length) {
  console.error('Performance check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Performance check passed.');
