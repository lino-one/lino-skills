---
name: lino-skill-creator
description: Write a new Lino skill or revise an existing one — its folder, its frontmatter, its body, and the judgement of what belongs in a skill versus in the base instructions. Use when asked to create, draft, improve, or fix a skill; not for using a skill that already exists.
trigger: "写一个 skill"、"做个技能"、"create a skill"、"write a skill"、"improve this skill"、"新建技能"、"改一下这个 skill"
author: lino
version: 1.1.0
visibility: public
---

# Write a Lino skill

A skill is what someone installed for **one kind of task**. Everything below
follows from that: if it applies to every task it is not a skill, and if it
describes machinery that is not attached it is worse than nothing.

## 1. First decide it should be a skill at all

| what you are writing | where it goes |
|---|---|
| Only holds for one kind of task | **A skill.** |
| Holds for every task | The base instructions. A rule every skill would have to copy is a gap in the base, not a skill's content. |
| Describes a tool that is not attached | **Neither.** Wait for the tool. Advertising a toolset that is not there is what makes weaker models write tool calls into their prose. |

If the answer is row two or three, say so and stop. Writing it as a skill
anyway produces a file that looks like an answer and is not one.

## 2. A skill is a folder

```
<name>/
  SKILL.md        required
  references/     optional — read when the body sends you there
  scripts/        optional — only if something can run them
```

**The folder name is the skill's name, and the frontmatter must repeat it
exactly.** They are read by different code paths: `/name` uses the folder,
the catalogue uses the frontmatter. Disagreeing makes them point at different
things and nothing reports it.

Names are lowercase letters, digits and hyphens (`^[a-z0-9][a-z0-9-]*$`).
Published skills carry a `lino-` prefix. A skill grown out of a Spark is
`lino-spark-<name>`.

## 3. Frontmatter — which fields do anything

| field | required | who reads it |
|---|---|---|
| `name` | yes | Must equal the folder name. |
| `description` | yes | **The only thing the model matches on.** It goes into the system prompt, capped at 1024 characters. A skill with no description is **dropped from the catalogue entirely** — not listed bare, gone. |
| `trigger` | by the library | **Never reaches the model.** It feeds the community recommendation card only. |
| `author`, `version` | by the library | The manager panel. `version` is semver. |
| `visibility` | no | `public` or `private`. |
| `disable-model-invocation` | no | `true` removes it from the catalogue while `/name` and the composer chip keep working. For a skill someone wants on hand but not on the model's initiative. |

Write the description as **what it does and when it applies**. Add an exclusion
only when similar requests should not route here. Avoid capability lists and
catch-alls: they attract work the skill was not written for.

## 4. The body — write what the model does not already know

- **Assume the model is capable.** Include only what changes a decision. Cut
  generic advice, restated policy, and examples that clarify nothing.
- **Match specificity to risk.** Where several approaches are reasonable,
  describe the outcome and the criteria. Reserve fixed sequences for places
  where deviating causes a concrete problem.
- **Disclose progressively.** Shared purpose, real constraints and routing stay
  in `SKILL.md`. Substantial branch-specific detail goes to `references/` and is
  read only when that branch is taken.
- **Say what a good result looks like**, not only the steps to reach it.

One test settles most of what to cut: **move a sentence into a different task —
does it still hold? If it does, it does not belong in this skill.**

Three things it catches over and over:

1. **A tool name that is not attached.** It fails several seconds into a turn,
   as an apology, and weaker models start writing tool calls into their prose.
2. **Discipline every skill would repeat.** That is a gap in the base
   instructions wearing a skill's clothes. Say so instead of copying it.
3. **What a tool's own description already says.** "Delegate work large enough
   to be worth a subagent" is already in `spawn_agent`; restating it is paid for
   on every use of this skill and goes stale when the tool changes.

`README.md`, install notes and changelogs stay out too — the folder holds what
the work needs, not documentation about itself.

## 5. references/

Link each reference from `SKILL.md` and say when it should be read. Keep each
fact in one place instead of repeating it in the entrypoint.

A reference is reached two ways, and they are for different jobs: call `skill`
again with the **same name** and that file's skill-relative path, or `read` the
absolute path — the skills list gives each entry a short path and expands it in
the roots table at the end. Use `skill` for a whole file, `read` when you want
part of one.

Either way, read only the ones the instructions send you to. Do not read the
whole folder because it is there.

## 6. Getting it onto a machine

`~/.lino/skills` is a folder the file tools reach, so writing one is ordinary
work: `write` the `SKILL.md`, `write` whatever else it needs. The list is
rescanned at the start of every turn, so a skill created now is available now —
its `/name` included. No restart, and nothing to hand over.

Two other routes, for different reasons:

- **The community library** (`lino-one/lino-skills`) — add
  `skills/<name>/SKILL.md`, run `node scripts/build-index.mjs`, push, then
  install it from inside Lino. This is the route for anything worth versioning
  or sharing; a skill that only exists in one home directory is one disk failure
  from gone.
- **Finder** — Settings opens the skills folder, for someone who would rather
  edit it themselves.

Do not use `bash` to move a skill folder around when `write` will do. A file
each is legible in the turn's record; a shell one-liner that creates four is one
row saying `bash`.

## 7. Check it

The manager panel reports four things about a folder, and each has a fix:

| what it says | what happened |
|---|---|
| no description | The catalogue drops the skill entirely — not listed bare, absent. Add a `description:`. |
| name mismatch | `name:` and the folder disagree. **The folder is the name that works.** |
| unusual folder name | Outside `[a-z0-9-]`, over 64 characters, or ending in a hyphen. It runs; it reads badly as a `/command`. |
| already a built-in command | `compact`, `explain`, `eli5` and their kin are taken. A skill named one of those is silently left out of the slash list. Rename it. |

Then read it back the way the model gets it:

- **Read the body with the frontmatter stripped.** If it does not stand on its
  own there, it does not stand.
- Check that the description discriminates — it is the only thing a task is
  matched against.
- Check that every reference is reachable from the body, and that nothing in the
  text names a tool that is not attached.
