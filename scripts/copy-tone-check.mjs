#!/usr/bin/env node

import fs from 'node:fs';

const html = fs.readFileSync('public/index.html', 'utf8')
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[^;]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const banned = [
  'what shows up across the talks',
  'show up with context or do not show up',
  'workflow orchestration',
  'resident engagement signals',
  'public trail',
  'proof, not posture',
  'operating cadence',
  'leverage the power of AI',
];

const found = banned.filter((phrase) => html.toLowerCase().includes(phrase));
if (found.length) {
  console.error('Copy tone check failed:');
  for (const phrase of found) console.error('- ' + phrase);
  process.exit(1);
}

console.log('Copy tone check passed.');
