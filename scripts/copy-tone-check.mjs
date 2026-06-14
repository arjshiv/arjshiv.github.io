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
  'throughline',
  'current test',
  'main thing right now',
  'product lead',
  'owner context',
  'customer truth',
  'unlock customer truth',
  'operationalize insights',
  'signal layer',
  'journey of proof',
  'authentic founder journey',
  'evidence ledger',
  'proof packet',
  'curated journey',
  'manufactured journey',
  'founder energy narrative',
  'inevitable founder arc',
  'audience pathway',
  'stakeholder pathway',
  'customer truth system',
  'defensible work system',
  'operating intelligence layer',
  'AI transformation partner',
  'applied intelligence practice',
  'strategic AI partner',
  'customer signal engine',
  'resident signal layer',
  'workflow intelligence',
  'human-centered AI platform',
  'next-generation resident experience',
  'unlock the power',
  'transformative platform',
  'mission-critical workflow',
  'browser model hook',
  'useful object',
  'proof constellation',
  'context receipt',
  'local model state',
  'reader pathway',
  'system gets brittle',
  'diligence binder',
  'legal document',
];

const found = banned.filter((phrase) => {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(html);
});
if (found.length) {
  console.error('Copy tone check failed:');
  for (const phrase of found) console.error('- ' + phrase);
  process.exit(1);
}

console.log('Copy tone check passed.');
