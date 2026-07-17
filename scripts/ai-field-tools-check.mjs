#!/usr/bin/env node

import { chromium } from 'playwright';

const target = process.argv[2] || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.route('https://www.youtube-nocookie.com/**', async (route) => {
  await new Promise((resolve) => setTimeout(resolve, 120));
  await route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>Test video</title>',
  });
});

page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));

await page.goto(target, { waitUntil: 'networkidle' });

const desktop = await page.evaluate(() => ({
  sections: document.querySelectorAll('main > section').length,
  nodes: document.querySelectorAll('*').length,
  height: document.documentElement.scrollHeight,
  overflow: document.documentElement.scrollWidth - window.innerWidth,
  heading: document.querySelector('h1')?.textContent || '',
  commandPalette: Boolean(document.querySelector('.command-launcher, #site-command-palette')),
  toolLab: Boolean(document.querySelector('#ai-field-tools')),
  preservedAnchors: ['work', 'residesk-loop', 'background', 'links', 'site-contact', 'faq']
    .every((id) => Boolean(document.getElementById(id))),
  repeatedCopy: /\b(\w+)\s+\1\s+\1\b/i.test(document.body.innerText),
  directionalArrows: [...document.querySelectorAll('.direction-arrow')].every((arrow) => (
    arrow.getAttribute('aria-hidden') === 'true'
    && (arrow.classList.contains('is-down') || arrow.classList.contains('is-external'))
  )),
  currentLocations: document.querySelectorAll('[aria-current="location"]').length,
}));

await page.click('[data-video-id]');
const loadingState = await page.locator('.video-shell').getAttribute('data-video-state');
const iframe = await page.locator('.video-shell iframe').getAttribute('src');
await page.locator('.video-shell[data-video-state="ready"]').waitFor();
await page.locator('.video-facade').waitFor({ state: 'detached' });

await page.locator('#work').scrollIntoViewIfNeeded();
await page.waitForFunction(() => (
  document.querySelector('.site-nav a[href="#work"]')?.getAttribute('aria-current') === 'location'
));
const currentWorkLocations = await page.locator('[aria-current="location"]').count();

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(target, { waitUntil: 'networkidle' });
const mobile = await page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth - window.innerWidth,
  height: document.documentElement.scrollHeight,
}));

const noScript = await browser.newPage({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false,
});
await noScript.goto(target, { waitUntil: 'networkidle' });
const noScriptText = await noScript.locator('main').innerText();

const reducedMotion = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await reducedMotion.emulateMedia({ reducedMotion: 'reduce' });
await reducedMotion.goto(target, { waitUntil: 'networkidle' });
const reducedTransforms = await reducedMotion.evaluate(() => {
  const videoImage = document.querySelector('.video-facade img');
  const arrow = document.querySelector('.direction-arrow');
  const articleTitle = document.querySelector('.link-list strong');
  return [videoImage, arrow, articleTitle].map((element) => getComputedStyle(element).transform);
});

await browser.close();

const failures = [];
if (desktop.sections !== 6) failures.push('Found ' + desktop.sections + ' main sections, expected 6.');
if (desktop.nodes > 350) failures.push('DOM contains ' + desktop.nodes + ' nodes, expected at most 350.');
if (desktop.height > 12000) failures.push('Desktop page is ' + desktop.height + 'px tall, expected at most 12000px.');
if (desktop.overflow !== 0) failures.push('Desktop overflow is ' + desktop.overflow + 'px.');
if (!desktop.heading.includes('messy work')) failures.push('Hero heading did not render.');
if (desktop.commandPalette) failures.push('Old command palette remains in the page.');
if (desktop.toolLab) failures.push('Old tool lab remains in the page.');
if (!desktop.preservedAnchors) failures.push('One or more legacy anchors are missing.');
if (desktop.repeatedCopy) failures.push('Repeated three-word copy bug remains in visible text.');
if (!desktop.directionalArrows) failures.push('One or more directional arrows lacks normalized decorative markup.');
if (desktop.currentLocations !== 1) failures.push('Navigation did not initialize exactly one current location.');
if (loadingState !== 'loading') failures.push('Video facade did not enter its loading state before the embed loaded.');
if (!iframe?.includes('youtube-nocookie.com/embed/LIsSQ_8ZZIw')) failures.push('Video facade did not create the privacy-enhanced embed.');
if (currentWorkLocations !== 1) failures.push('Section observer did not retain exactly one current location.');
if (mobile.overflow !== 0) failures.push('Mobile overflow is ' + mobile.overflow + 'px.');
if (mobile.height > 10000) failures.push('Mobile page is ' + mobile.height + 'px tall, expected at most 10000px.');
if (!noScriptText.includes('Most of my time goes into ResiDesk')) failures.push('Core story is not readable with JavaScript disabled.');
if (reducedTransforms.some((transform) => transform !== 'none')) failures.push('Reduced motion did not remove movement transforms.');
if (errors.length) failures.push('Console/page errors: ' + errors.join(' | '));

if (failures.length) {
  console.error('Simplified site check failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Simplified site check passed.');
