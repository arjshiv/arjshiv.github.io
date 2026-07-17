#!/usr/bin/env node

import { chromium } from 'playwright';

const target = process.argv[2] || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const failures = [];
const stubVideo = async (page) => {
  await page.route('https://www.youtube-nocookie.com/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 180));
    await route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><title>Test video</title>',
    });
  });
};

const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await stubVideo(page);
await page.goto(target, { waitUntil: 'networkidle' });
await page.waitForTimeout(250);

const currentCount = await page.locator('.site-nav [aria-current="location"]').count();
if (currentCount !== 1) failures.push(`Navigation has ${currentCount} current links, expected exactly one.`);

await page.locator('.site-nav a[href="#story"]').click();
await page.waitForTimeout(250);
const currentHref = await page.locator('.site-nav [aria-current="location"]').getAttribute('href');
if (currentHref !== '#story') failures.push(`Story navigation settled on ${currentHref || 'no section'}.`);

const articleTitle = page.locator('.link-list > a').first().locator('strong');
await articleTitle.scrollIntoViewIfNeeded();
const titleTransformBefore = await articleTitle.evaluate((node) => getComputedStyle(node).transform);
await page.locator('.link-list > a').first().hover();
await page.waitForTimeout(200);
const titleTransformAfter = await articleTitle.evaluate((node) => getComputedStyle(node).transform);
if (titleTransformAfter === titleTransformBefore || titleTransformAfter === 'none') {
  failures.push('Article title does not move on fine-pointer hover.');
}

const externalLink = page.locator('.text-link').filter({ hasText: 'Read the Substack' });
const externalArrow = externalLink.locator('.direction-arrow');
await externalLink.hover();
await page.waitForTimeout(180);
const arrowTransform = await externalArrow.evaluate((node) => getComputedStyle(node).transform);
if (arrowTransform === 'none') failures.push('External arrow does not give directional hover feedback.');

const videoCount = await page.locator('[data-video-id]').count();
if (videoCount !== 3) failures.push(`Talk archive has ${videoCount} videos, expected three.`);
const video = page.locator('[data-video-id]').first();
await video.scrollIntoViewIfNeeded();
await video.click();
await page.locator('.video-shell iframe').waitFor({ state: 'attached' });
await page.waitForFunction(() => document.querySelector('.video-shell')?.dataset.videoState === 'ready', null, { timeout: 10000 });
const iframeHost = await page.locator('.video-shell iframe').evaluate((node) => new URL(node.src).host);
if (iframeHost !== 'www.youtube-nocookie.com') failures.push(`Video iframe uses unexpected host ${iframeHost}.`);

const keyboardPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await stubVideo(keyboardPage);
await keyboardPage.goto(target, { waitUntil: 'networkidle' });
const keyboardStoryLink = keyboardPage.locator('.site-nav a[href="#story"]');
await keyboardStoryLink.focus();
await keyboardPage.keyboard.press('Enter');
const keyboardNav = await keyboardPage.evaluate(() => ({
  modality: document.documentElement.dataset.inputModality,
  scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  transitionDurations: [...document.querySelectorAll('.site-nav a')]
    .map((link) => getComputedStyle(link, '::after').transitionDuration),
}));
if (keyboardNav.modality !== 'keyboard') failures.push('Keyboard navigation did not set keyboard modality.');
if (keyboardNav.scrollBehavior !== 'auto') failures.push('Keyboard navigation still uses animated scrolling.');
if (keyboardNav.transitionDurations.some((duration) => duration !== '0s')) {
  failures.push(`Keyboard nav underline still animates: ${keyboardNav.transitionDurations.join(', ')}.`);
}

const keyboardVideo = keyboardPage.locator('[data-video-id]').first();
const keyboardVideoShell = keyboardPage.locator('.video-shell').first();
await keyboardVideo.scrollIntoViewIfNeeded();
await keyboardVideo.focus();
await keyboardPage.keyboard.press('Enter');
await keyboardPage.locator('.video-shell iframe').waitFor({ state: 'attached' });
const keyboardLoading = await keyboardPage.evaluate(() => {
  const shell = document.querySelector('.video-shell');
  const copy = document.querySelector('.video-copy');
  const image = document.querySelector('.video-facade img');
  const iframe = document.querySelector('.video-shell iframe');
  return {
    input: shell?.dataset.videoInput,
    state: shell?.dataset.videoState,
    copyOpacity: getComputedStyle(copy).opacity,
    imageTransform: getComputedStyle(image).transform,
    iframeTransition: getComputedStyle(iframe).transitionDuration,
  };
});
if (keyboardLoading.input !== 'keyboard') failures.push('Keyboard video activation was not classified as keyboard input.');
if (keyboardLoading.state !== 'loading') failures.push('Keyboard video did not retain its loading state for the test stub.');
if (keyboardLoading.copyOpacity !== '1') failures.push('Keyboard video activation fades the facade copy.');
if (keyboardLoading.imageTransform !== 'none') failures.push('Keyboard video activation transforms the facade image.');
if (keyboardLoading.iframeTransition !== '0s') failures.push('Keyboard video iframe still has a transition.');
await keyboardPage.locator('.video-shell[data-video-state="ready"]').waitFor();
await keyboardVideoShell.locator('.video-facade').waitFor({ state: 'detached' });

const spacePage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await stubVideo(spacePage);
await spacePage.goto(target, { waitUntil: 'networkidle' });
const spaceVideo = spacePage.locator('[data-video-id]').first();
await spaceVideo.scrollIntoViewIfNeeded();
await spaceVideo.focus();
await spacePage.keyboard.down('Space');
const heldSpace = await spaceVideo.evaluate((node) => ({
  modality: document.documentElement.dataset.inputModality,
  transform: getComputedStyle(node).transform,
  transitionDuration: getComputedStyle(node).transitionDuration,
}));
await spacePage.keyboard.up('Space');
if (heldSpace.modality !== 'keyboard') failures.push('Held Space did not set keyboard modality.');
if (heldSpace.transform !== 'none') failures.push(`Held Space moves the video facade: ${heldSpace.transform}.`);
if (heldSpace.transitionDuration !== '0s') failures.push(`Held Space retains a ${heldSpace.transitionDuration} transition.`);

const reducedPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
await reducedPage.goto(target, { waitUntil: 'networkidle' });
const reducedLink = reducedPage.locator('.text-link').filter({ hasText: 'Read the Substack' });
const reducedArrow = reducedLink.locator('.direction-arrow');
await reducedLink.hover();
await reducedPage.waitForTimeout(180);
const reducedArrowTransform = await reducedArrow.evaluate((node) => getComputedStyle(node).transform);
if (reducedArrowTransform !== 'none' && reducedArrowTransform !== 'matrix(1, 0, 0, 1, 0, 0)') {
  failures.push(`Reduced-motion arrow still moves: ${reducedArrowTransform}.`);
}

const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobilePage.goto(target, { waitUntil: 'networkidle' });
await mobilePage.locator('#contact').scrollIntoViewIfNeeded();
await mobilePage.waitForFunction(() => (
  document.querySelector('.site-nav [aria-current="location"]')?.getAttribute('href') === '#contact'
), null, { timeout: 2000 });
const mobileOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
if (mobileOverflow) failures.push('Motion enhancements introduce mobile horizontal overflow.');

await browser.close();

if (failures.length) {
  console.error('Animation check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Animation check passed.');
