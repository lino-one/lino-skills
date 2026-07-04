#!/usr/bin/env node
// Builds index.json from skills/*/SKILL.md frontmatter.
// Usage:
//   node scripts/build-index.mjs           # validate + write index.json
//   node scripts/build-index.mjs --check   # validate only; fail if index.json is stale
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const checkOnly = process.argv.includes('--check');

const ID_RE = /^[a-z0-9][a-z0-9-]*$/;
const REQUIRED_FIELDS = ['name', 'description', 'trigger', 'author'];

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx < 1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (key && val) meta[key] = val;
  }
  return meta;
}

const errors = [];
const entries = [];

if (!existsSync(skillsDir)) {
  console.error('No skills/ directory found.');
  process.exit(1);
}

for (const id of readdirSync(skillsDir).sort()) {
  const dir = join(skillsDir, id);
  if (!statSync(dir).isDirectory()) continue;
  const fail = (msg) => errors.push(`skills/${id}: ${msg}`);

  if (!ID_RE.test(id)) fail('folder name must be lowercase letters, numbers, and hyphens');
  const skillMdPath = join(dir, 'SKILL.md');
  if (!existsSync(skillMdPath)) { fail('missing SKILL.md'); continue; }

  const meta = parseFrontmatter(readFileSync(skillMdPath, 'utf-8'));
  if (!meta) { fail('SKILL.md has no frontmatter block'); continue; }
  for (const field of REQUIRED_FIELDS) {
    if (!meta[field]) fail(`frontmatter missing required field "${field}"`);
  }
  if (meta.visibility && meta.visibility !== 'public') {
    fail(`visibility must be "public" for community skills (got "${meta.visibility}")`);
  }

  let references = [];
  const refsDir = join(dir, 'references');
  if (existsSync(refsDir)) {
    references = readdirSync(refsDir).filter((f) => statSync(join(refsDir, f)).isFile()).sort();
    if (references.length === 0) fail('references/ directory exists but is empty');
  }

  entries.push({
    id,
    name: meta.name ?? id,
    description: meta.description ?? '',
    trigger: meta.trigger ?? '',
    author: meta.author ?? '',
    hasReferences: references.length > 0,
    references,
  });
}

if (errors.length > 0) {
  console.error('Validation failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

const json = JSON.stringify(entries, null, 2) + '\n';
const indexPath = join(root, 'index.json');

if (checkOnly) {
  const current = existsSync(indexPath) ? readFileSync(indexPath, 'utf-8') : '';
  if (current !== json) {
    console.error('index.json is out of date. Run: node scripts/build-index.mjs');
    process.exit(1);
  }
  console.log(`OK — ${entries.length} skill(s) validated, index.json up to date.`);
} else {
  writeFileSync(indexPath, json, 'utf-8');
  console.log(`Wrote index.json with ${entries.length} skill(s).`);
}
