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
```

## SKILL.md Format

```yaml
---
name: My Skill
description: One-line summary
trigger: When the agent should use this skill
author: your-name
visibility: public
---

(Method body in markdown — the agent reads this to learn how to apply the skill)
```

## Install a Skill

Copy any skill folder into `~/.lino/skills/` and restart Lino. The agent will discover it automatically.

## Contribute

Submit a PR with your skill folder under `skills/`. Each PR is reviewed before merging.

## License

MIT
