#!/usr/bin/env node

import fs from 'node:fs';

const names = [
  'resident-work-map',
  'founder-route',
  'useful-next-move',
];
const failures = [];
const html = fs.readFileSync('public/index.html', 'utf8');
const css = fs.readFileSync('public/refinements.css', 'utf8');

for (const name of names) {
  for (const suffix of ['', '-mobile']) {
    const relativePath = `assets/visualizations/${name}${suffix}.svg`;
    const filePath = `public/${relativePath}`;
    if (!fs.existsSync(filePath)) {
      failures.push(`Missing ${relativePath}.`);
      continue;
    }

    const svg = fs.readFileSync(filePath, 'utf8');
    if (!/<title\b[^>]*>[^<]+<\/title>/.test(svg)) failures.push(`${relativePath} has no title.`);
    if (!/<desc\b[^>]*>[^<]+<\/desc>/.test(svg)) failures.push(`${relativePath} has no description.`);
    if (!/aria-labelledby="title desc"/.test(svg)) failures.push(`${relativePath} does not expose its title and description.`);
    if (!/viewBox="0 0 \d+ \d+"/.test(svg)) failures.push(`${relativePath} has no stable viewBox.`);
    if (/<script\b/i.test(svg) || /on(?:load|click|mouseover)=/i.test(svg)) failures.push(`${relativePath} contains executable behavior.`);
    if (!html.includes(relativePath)) failures.push(`${relativePath} is not referenced by the page.`);
  }
}

if ((html.match(/class="story-visual"/g) || []).length !== names.length) {
  failures.push(`Expected ${names.length} story visual figures.`);
}
if (!/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.story-visual[\s\S]*?transform: none/.test(css)) {
  failures.push('Story visualizations do not provide a reduced-motion override.');
}

if (failures.length) {
  console.error('Visualization check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Visualization check passed.');
