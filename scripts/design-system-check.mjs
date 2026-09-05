#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const design = readFileSync('DESIGN.md', 'utf8');
const styles = [
  readFileSync('public/styles.css', 'utf8'),
  readFileSync('public/refinements.css', 'utf8'),
  readFileSync('public/parallax.css', 'utf8'),
].join('\n');
const html = readFileSync('public/index.html', 'utf8');
const failures = [];

const contractTokens = new Map([
  ['--canvas', '#000000'],
  ['--surface', '#0b0e11'],
  ['--surface-raised', '#111417'],
  ['--hairline', '#292d30'],
  ['--hairline-strong', '#464a4d'],
  ['--heading', '#ffffff'],
  ['--text', '#f0f0f0'],
  ['--muted', '#a1a4a5'],
  ['--quiet', '#7d8186'],
  ['--accent', '#baa7ff'],
  ['--accent-strong', '#d1c7ff'],
  ['--focus', '#3b9eff'],
]);

for (const heading of [
  '## Source And Intent',
  '## Design Tokens',
  '## Typography',
  '## Layout And Rhythm',
  '## Motion',
  '## Enforcement',
]) {
  if (!design.includes(heading)) failures.push(`DESIGN.md is missing ${heading}`);
}

for (const [token, value] of contractTokens) {
  if (!design.includes(`${token}: ${value};`)) {
    failures.push(`DESIGN.md must define ${token} as ${value}`);
  }
}

let stagedDiff = '';
try {
  stagedDiff = execFileSync(
    'git',
    ['diff', '--cached', '--unified=0', '--', 'public', 'DESIGN.md'],
    { encoding: 'utf8' },
  );
} catch {
  failures.push('Could not inspect the staged frontend diff.');
}

// The optional console has its own material treatment, scoped in DESIGN.md.
let funModeFile = false;
const addedLines = stagedDiff.split('\n').flatMap((line) => {
  if (line.startsWith('+++ b/')) funModeFile = line.startsWith('+++ b/public/fun/');
  return !funModeFile && line.startsWith('+') && !line.startsWith('+++') ? [line.slice(1)] : [];
});

const forbiddenAdditions = [
  [/transition\s*:\s*all\b/i, 'Use explicit transition properties instead of transition: all.'],
  [/(?:linear|radial|conic)-gradient\s*\(/i, 'The design contract does not use gradients.'],
  [/box-shadow\s*:(?!\s*none)/i, 'The design contract does not use shadows for elevation.'],
  [/backdrop-filter\s*:/i, 'The design contract does not use glass effects.'],
  [/letter-spacing\s*:\s*-\d/i, 'The design contract uses zero letter spacing.'],
];

for (const line of addedLines) {
  for (const [pattern, message] of forbiddenAdditions) {
    if (line.includes('parallax-fade-allow') && message.includes('gradients')) continue;
    if (pattern.test(line)) failures.push(`${message} Added line: ${line.trim()}`);
  }
}

if (styles.includes('refero-resend-contract')) {
  for (const [token, value] of contractTokens) {
    const declaration = new RegExp(`${token.replace('--', '\\-\\-')}\\s*:\\s*${value}`, 'i');
    if (!declaration.test(styles)) failures.push(`Production CSS is missing ${token}: ${value}.`);
  }

  if (!/color-scheme\s*:\s*dark/i.test(styles)) {
    failures.push('Production CSS must declare color-scheme: dark.');
  }

  if (!html.includes('<meta name="theme-color" content="#000000"')) {
    failures.push('The page theme-color must match the black canvas.');
  }

  for (const requirement of [
    'background: var(--canvas)',
    'border: 1px solid var(--hairline)',
    'box-shadow: none',
    'font-family: Georgia, "Times New Roman", serif',
  ]) {
    if (!styles.includes(requirement)) {
      failures.push(`Production CSS is missing the adapted design rule: ${requirement}.`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Design-system check failed with ${failures.length} issue${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Design-system contract and staged frontend diff passed.');
