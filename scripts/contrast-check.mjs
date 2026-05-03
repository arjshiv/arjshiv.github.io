#!/usr/bin/env node

import { chromium } from 'playwright';

const target = process.argv[2] || 'http://127.0.0.1:4173';
const minRatio = Number(process.env.CONTRAST_MIN || 4.5);
const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'tablet', width: 900, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
];

async function auditText(root, minRatio) {
  return root.evaluate((scanRoot, minimum) => {
    const transparent = (color) => !color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)';
    const parse = (value) => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const [r, g, b, a = '1'] = match[1].split(/,\s*/).map(Number);
      if ([r, g, b, a].some(Number.isNaN)) return null;
      return { r, g, b, a };
    };
    const luminance = ({ r, g, b }) => {
      const linear = [r, g, b].map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    };
    const contrast = (fg, bg) => {
      const a = luminance(fg);
      const b = luminance(bg);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const labelFor = (element) => {
      if (element.id) return `#${element.id}`;
      if (element.className) {
        return `${element.tagName.toLowerCase()}.${String(element.className).trim().split(/\s+/).slice(0, 3).join('.')}`;
      }
      return element.tagName.toLowerCase();
    };
    const candidates = scanRoot === document.body
      ? Array.from(document.body.querySelectorAll('*'))
      : [scanRoot, ...scanRoot.querySelectorAll('*')];
    const textElements = candidates.filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
      if (rect.width < 1 || rect.height < 1) return false;
      return Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });

    return textElements.flatMap((element) => {
      const style = getComputedStyle(element);
      const fg = parse(style.color);
      if (!fg || fg.a === 0) return [];

      let cursor = element;
      let bg = null;
      let backgroundOwner = 'body';
      while (cursor) {
        const cursorStyle = getComputedStyle(cursor);
        if (!transparent(cursorStyle.backgroundColor)) {
          const parsed = parse(cursorStyle.backgroundColor);
          if (parsed && parsed.a > 0.92) {
            bg = parsed;
            backgroundOwner = labelFor(cursor);
            break;
          }
        }
        cursor = cursor.parentElement;
      }
      bg ||= parse(getComputedStyle(document.body).backgroundColor) || { r: 248, g: 252, b: 252, a: 1 };

      const ratio = contrast(fg, bg);
      if (ratio >= minimum) return [];

      const text = Array.from(element.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent.trim())
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .slice(0, 90);

      return [{
        selector: labelFor(element),
        text,
        ratio: Number(ratio.toFixed(2)),
        color: style.color,
        background: `rgb(${bg.r}, ${bg.g}, ${bg.b}) via ${backgroundOwner}`,
      }];
    });
  }, minRatio);
}

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  await page.goto(target, { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const body = await page.$('body');
  const stateFailures = (await auditText(body, minRatio)).map((failure) => ({ ...failure, state: 'default' }));
  const interactive = await page.$$('a, button, summary, [tabindex]:not([tabindex="-1"])');

  for (const element of interactive) {
    const visible = await element.evaluate((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    }).catch(() => false);
    if (!visible) continue;

    await element.hover({ timeout: 750 }).catch(() => {});
    stateFailures.push(...(await auditText(element, minRatio)).map((failure) => ({ ...failure, state: 'hover' })));

    await element.focus({ timeout: 750 }).catch(() => {});
    stateFailures.push(...(await auditText(element, minRatio)).map((failure) => ({ ...failure, state: 'focus' })));
  }

  const unique = new Map();
  for (const failure of stateFailures) {
    const key = `${failure.state}|${failure.selector}|${failure.text}|${failure.color}|${failure.background}`;
    unique.set(key, { viewport: viewport.name, ...failure });
  }
  failures.push(...unique.values());
  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(`Contrast audit failed: ${failures.length} text samples below ${minRatio}:1`);
  for (const failure of failures.slice(0, 120)) {
    console.error(
      `[${failure.viewport}/${failure.state}] ${failure.ratio}:1 ${failure.selector} "${failure.text}" ${failure.color} on ${failure.background}`,
    );
  }
  if (failures.length > 120) console.error(`...and ${failures.length - 120} more`);
  process.exit(1);
}

console.log(`Contrast audit passed across ${viewports.map((viewport) => viewport.name).join(', ')} at ${minRatio}:1.`);
