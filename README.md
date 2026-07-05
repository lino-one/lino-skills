# lino-skills

Community skills for Lino — reusable methods that teach the AI agent how to do things.

## What is a Skill?

A skill is a method that Lino's AI agent can learn and apply. It can be a study technique, a design pattern, a workflow, a decision framework, or anything that tells the agent *how* to do something.

## Structure

```
skills/
  knowledge-alchemy/
    SKILL.md              # Frontmatter + method body
    references/           # Optional reference files (examples, templates)
      genai-alchemy.html
index.json                # Generated — do not edit by hand
```

`index.json` is rebuilt automatically by CI from the frontmatter of every `skills/*/SKILL.md`. Never edit it manually.

## SKILL.md Format

```yaml
---
name: my-skill        # MUST equal the folder name (Claude Code convention)
description: One-line summary shown in search results
trigger: When the agent should use this skill (short phrases users might say)
author: original-creator-handle
version: 1.0.0                                           # semver; bump on every change
tags: learning, notes                                    # optional, comma-separated
submitted_by: your-github-handle                         # optional, if you are not the author
source: https://github.com/original-creator/their-repo   # optional, for ported skills
visibility: public
---

(Method body in markdown — the agent reads this to learn how to apply the skill)
```

`name`, `description`, `trigger`, `author`, and `version` are required. `name` must equal the folder name (lowercase-hyphen, same rule as Claude Code skills) — put the human-readable title in the body's `#` heading instead. `visibility` must be `public` for community skills. Bump `version` in every PR that changes the skill — installed copies use it to detect available updates.

`author` credits the **original creator** of the skill, not whoever opens the PR — submitters are already recorded in git history. When porting a skill from elsewhere, keep the original author, add `source` pointing to the upstream repo, and make sure the license permits redistribution.

### Lino-specific skills

Skills that depend on Lino features — e.g. they bundle a Spark HTML reference — must carry a `lino` or `spark` marker in their id (e.g. `lino-spark-drum-kit`), so users of other ecosystems can tell at a glance the skill won't fully work outside Lino.

## Extra Files (manifest.json)

By default only `SKILL.md` and flat files under `references/` are installed. If your skill ships more (subdirectories, templates, data), add a `manifest.json` next to SKILL.md:

```json
{ "files": ["references/*", "template-pack/**"] }
```

`*` matches within a path segment, `**` matches across segments. CI expands the globs into a concrete file list in `index.json`; the installer downloads exactly that list.

## Install a Skill

In Lino, ask the agent to search community skills, or copy any skill folder into `~/.lino/skills/` and restart Lino. The agent discovers it automatically.

## Publish a Skill

1. Fork this repo.
2. Add one folder under `skills/` — lowercase letters, numbers, and hyphens only (e.g. `skills/my-skill/`), containing a `SKILL.md` (and optionally `references/`).
3. Do **not** touch `index.json` — CI regenerates it after merge.
4. Check locally with `node scripts/build-index.mjs` (requires Node 20+).
5. Open a pull request. Every PR runs validation and is reviewed before merging.

Tip: if you built the skill inside Lino, it already lives in `~/.lino/skills/<id>/` in the right format — copy that folder into your fork.

## License

MIT
