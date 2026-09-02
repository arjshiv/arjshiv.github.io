#!/usr/bin/env node

import { launchBrowser } from './playwright-browser.mjs';

const target = process.argv[2] || 'http://127.0.0.1:4173';
const browser = await launchBrowser();
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
    const hero = rect('.hero.wide');
    const scene = rect('.hero-scene');
    const portrait = rect('.portrait-frame');
    const primaryAction = rect('.hero .button.primary');
    const founderNote = rect('.hero .hero-copy > p:last-of-type');
    const overflow = Math.round(document.documentElement.scrollWidth - window.innerWidth);
    const overlapX = title && portrait ? Math.max(0, Math.min(title.right, portrait.right) - Math.max(title.left, portrait.left)) : 0;
    const overlapY = title && portrait ? Math.max(0, Math.min(title.bottom, portrait.bottom) - Math.max(title.top, portrait.top)) : 0;
    const portraitOutsideViewport = portrait ? portrait.left < 0 || portrait.right > window.innerWidth : true;
    const founderOverlapX = founderNote && portrait ? Math.max(0, Math.min(founderNote.right, portrait.right) - Math.max(founderNote.left, portrait.left)) : 0;
    const founderOverlapY = founderNote && portrait ? Math.max(0, Math.min(founderNote.bottom, portrait.bottom) - Math.max(founderNote.top, portrait.top)) : 0;
    const mobileActionBelowFold = window.innerWidth <= 390 && (!primaryAction || primaryAction.bottom > window.innerHeight);
    const sceneMiss = !hero || !scene || Math.abs(hero.width - scene.width) > 1 || Math.abs(hero.height - scene.height) > 1;
    const sceneHidden = document.querySelector('.hero-scene')?.getAttribute('aria-hidden') === 'true';
    const decorativeImages = [...document.querySelectorAll('.hero-scene img')].every((image) => image.alt === '');
    return { overflow, heroOverlap: Math.round(overlapX * overlapY), founderOverlap: Math.round(founderOverlapX * founderOverlapY), portraitOutsideViewport, mobileActionBelowFold, sceneMiss, sceneHidden, decorativeImages };
  });
  if (result.overflow !== 0) failures.push(viewport.name + ': horizontal overflow ' + result.overflow + 'px');
    if (result.heroOverlap !== 0) failures.push(viewport.name + ': hero title overlaps portrait');
    if (result.founderOverlap !== 0) failures.push(viewport.name + ': founder note overlaps portrait');
    if (result.portraitOutsideViewport) failures.push(viewport.name + ': portrait leaves the viewport');
    if (result.mobileActionBelowFold) failures.push(viewport.name + ': primary action falls below the first viewport');
    if (result.sceneMiss) failures.push(viewport.name + ': parallax scene does not fill the hero');
    if (!result.sceneHidden || !result.decorativeImages) failures.push(viewport.name + ': decorative scene enters the accessibility tree');
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error('Layout check failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Layout check passed.');
