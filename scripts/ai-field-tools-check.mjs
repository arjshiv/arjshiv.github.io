#!/usr/bin/env node

import { chromium } from 'playwright';

const target = process.argv[2] || 'http://127.0.0.1:4173';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const errors = [];

page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));

await page.goto(target, { waitUntil: 'networkidle' });
await page.click('.command-launcher');
await page.fill('#command-search', 'proof');
await page.click('.command-result[data-command-target="#recent"]');
await page.locator('#ai-field-tools').scrollIntoViewIfNeeded();

await page.fill('#ai-question', 'What does Arjun mean by demos are not adoption?');
await page.click('#ai-ask-form button');
await page.waitForFunction(() => !document.querySelector('#ai-answer')?.textContent.includes('Reading local site notes'));

await page.click('#conversation-map button[data-question="Why housing and ResiDesk?"]');
await page.selectOption('#guide-persona', 'journalist');
await page.click('#build-guide');
await page.selectOption('#talk-lens', 'greg');
await page.click('#run-lens');
await page.fill('#useful-ai-input', 'AI assistant that checks resident history and lease context, drafts a response, flags risky cases, routes unresolved work to the operator, and measures retention outcomes.');
await page.click('#score-ai-idea');
await page.selectOption('#building-type', 'urban');
await page.click('#simulate-signals');
await page.click('#toggle-highlights');
await page.click('#run-design-critique');
await page.click('#site-tweak-panel button[data-tweak="voice"]');
await page.selectOption('#proof-audience', 'founder');
await page.click('#build-proof-packet');
await page.fill('#private-notes', 'I care about demos versus adoption. The useful AI test is a good hook.');
await page.click('#summarize-notes');

const result = await page.evaluate(() => ({
  answer: document.querySelector('#ai-answer')?.textContent || '',
  guideCount: document.querySelectorAll('#guide-output li').length,
  lensCount: document.querySelectorAll('#lens-output li').length,
  score: document.querySelector('#ai-score-output')?.textContent || '',
  simCount: document.querySelectorAll('#signal-sim-output li').length,
  highlights: document.querySelectorAll('mark.signal-highlight').length,
  critiqueCount: document.querySelectorAll('#design-critique-output .critique-score').length,
  tweak: document.querySelector('#tweak-output')?.textContent || '',
  notes: document.querySelector('#notes-output')?.textContent || '',
  overflow: document.documentElement.scrollWidth - window.innerWidth,
}));

await page.setViewportSize({ width: 390, height: 900 });
await page.goto(target, { waitUntil: 'networkidle' });
await page.locator('#ai-field-tools').scrollIntoViewIfNeeded();
result.mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

await browser.close();

const failures = [];
if (!result.answer.includes('ResiDesk')) failures.push('Ask/conversation answer did not render expected grounded content.');
if (result.guideCount !== 5) failures.push(`Reading guide rendered ${result.guideCount} items, expected 5.`);
if (result.lensCount !== 3) failures.push(`Transcript lens rendered ${result.lensCount} items, expected 3.`);
if (!result.score.includes('5/5')) failures.push('Useful AI score did not reach expected 5/5 for the complete sample.');
if (result.simCount < 7) failures.push(`Resident simulator rendered ${result.simCount} list items, expected at least 7.`);
if (result.highlights < 20) failures.push(`Throughline highlighter rendered ${result.highlights} highlights, expected at least 20.`);
if (result.critiqueCount !== 5) failures.push(`Design critique rendered ${result.critiqueCount} dimensions, expected 5.`);
if (!result.tweak.includes('Voice pass')) failures.push('Tweak panel did not render the selected voice pass.');
if (!result.notes.includes('useful AI test')) failures.push('Private notes summary did not render saved note text.');
if (result.overflow !== 0) failures.push(`Desktop overflow is ${result.overflow}px.`);
if (result.mobileOverflow !== 0) failures.push(`Mobile overflow is ${result.mobileOverflow}px.`);
if (errors.length) failures.push(`Console/page errors: ${errors.join(' | ')}`);

if (failures.length) {
  console.error('AI field tools check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('AI field tools check passed.');
