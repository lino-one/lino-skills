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
name: My Skill
description: One-line summary shown in search results
trigger: When the agent should use this skill (short phrases users might say)
author: your-github-handle
visibility: public
---

(Method body in markdown — the agent reads this to learn how to apply the skill)
```

All four of `name`, `description`, `trigger`, `author` are required. `visibility` must be `public` for community skills.

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
