---
name: lino-explore-repo
description: Explore a bound local folder — a code repository, a document vault, or a mix of both — and propose a set of cards that map it. Use when asked to explore, map, onboard, survey, or make cards from a folder attached to this conversation.
trigger: "explore this repo"、"map this folder"、"onboard me to this codebase"、"survey these notes"、"探索这个仓库"、"梳理一下这个文件夹"
author: lino
version: 2.1.0
visibility: public
---

# Explore a bound folder

Aim for 5–12 cards, **not one per file**. Someone who has never opened the
folder should be able to find their way around with them.

## 1. Look before you plan

Two calls, in the foreground, before any other decision:

1. `bash` — one listing, two levels deep, with dependency and build trees left
   out (`node_modules`, `.git`, `dist`, `build`, `target`).
2. `read` — the front door: `README*`, `index.md`, a home or MOC note,
   `package.json`/`pyproject.toml`/`Cargo.toml`. If there is no obvious one,
   the largest text file at the root.

## 2. Name the shape

It decides the front door, what the cards are about, and what to leave out. If
two fit, take the one that explains more of the tree, and say which you took.

| shape | units | what relates them | skip |
|---|---|---|---|
| **Application** | app shell, routes, state, data layer, storage | imports, route → handler | `node_modules`, `dist`, `build`, `.next`, `target`, coverage, lockfiles |
| **Library** | public API, core modules, examples | what re-exports what | the above, plus generated docs |
| **Monorepo** | apps, packages, services | dependency direction between packages | the above, per package |
| **Document vault** | topics, note clusters | links, tags, frontmatter refs | `.obsidian`, `.trash`, attachment folders, daily-note archives |
| **Mixed** | code units *and* doc topics | where a doc describes code | both rows above |
| **Sparse or unknown** | — | — | nothing — read it all |

Nothing in the third column is drawn. It is what to look for, and then whose
Concept to name in the prose of the cards that depend on it.

A sparse folder gets an Open-questions card and no invented certainty.

## 3. Slice by seams, or by question — never by count

Send scouts when there are three or more real seams, or the tree is too large to
read here. Otherwise do it yourself.

- **By seams**, when the folder has them: one scout per app, package, service,
  or top-level topic folder.
- **By question**, when it does not — a flat folder of 300 notes has no seams.
  Give each scout the whole tree and one question: *which topics recur and
  where*, *what links to what and what is orphaned*, *what looks stale*.

A slice that does not correspond to something real produces a report that does
not either.

Ask each scout for exactly this:

```
- Purpose: one line.
- Key files: up to 8, each as `path — what it is`.
- Connections: which other slices this depends on or is used by.
- Conventions: what a newcomer would get wrong here.
- Unknowns: what you could not determine.
```

Wait for them together, then read the reports you are going to use.

**A scout tells you where to look; it does not read for you.**

## 4. The cards

Each body, in this order:

- **What it is** — one or two lines.
- **Why it matters** — what gets hard without understanding it.
- **Key files** — link each one.
- **Unclear** — omit the heading if nothing is.

**The units you named in §2 are what the rest of the cards refer to by name.**
Whether any of them takes a Concept is not this survey's question — `Writing a
Card` already answers it, and answering it twice is how the two came to
disagree.

One card is **Open questions**: what you did not look at, and what a second pass
would cover. On a first pass there is always something.

## 5. Leave the shape behind

Write the shape you named and the front door you read into canvas memory. A
later turn starts from those two facts instead of listing the folder again.
