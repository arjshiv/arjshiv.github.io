#!/usr/bin/env node

import { chromium } from 'playwright';

const target = process.argv[2] || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of [
  { name: 'desktop', width: 1792, height: 1000 },
  { name: 'tablet', width: 900, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });
  await page.goto(target, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const r = element.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    const title = rect('.hero h1');
    const portrait = rect('.portrait-frame');
    const overflow = Math.round(document.documentElement.scrollWidth - window.innerWidth);
    const overlapX = title && portrait ? Math.max(0, Math.min(title.right, portrait.right) - Math.max(title.left, portrait.left)) : 0;
    const overlapY = title && portrait ? Math.max(0, Math.min(title.bottom, portrait.bottom) - Math.max(title.top, portrait.top)) : 0;
    const portraitOutsideViewport = portrait ? portrait.left < 0 || portrait.right > window.innerWidth : true;
    return { overflow, heroOverlap: Math.round(overlapX * overlapY), portraitOutsideViewport };
  });
  if (result.overflow !== 0) failures.push(viewport.name + ': horizontal overflow ' + result.overflow + 'px');
    if (result.heroOverlap !== 0) failures.push(viewport.name + ': hero title overlaps portrait');
    if (result.portraitOutsideViewport) failures.push(viewport.name + ': portrait leaves the viewport');
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error('Layout check failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Layout check passed.');
