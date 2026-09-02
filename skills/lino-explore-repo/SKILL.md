---
name: lino-explore-repo
description: Explore a bound local folder — a code repository, a document vault, or a mix of both — and propose a map of it: cards for its parts, connections between them, and one diagram of the whole shape. Use when asked to explore, map, onboard, survey, or make cards from a folder attached to this conversation.
trigger: "explore this repo"、"map this folder"、"onboard me to this codebase"、"survey these notes"、"探索这个仓库"、"梳理一下这个文件夹"
author: lino
version: 3.0.0
visibility: public
---

# Explore a bound folder

Someone who has never opened the folder should be able to find their way around
with what you propose. That takes three different things, and they are not
interchangeable:

| | how many | what it carries |
|---|---|---|
| **Cards** | 5–12, **not one per file** | what each part *is* |
| **Connections** | fewer than the cards | that two parts are related, and how |
| **Diagram** | **one** | the shape of the whole folder, at a glance |

A survey that proposes only cards leaves two thirds of what it found buried in
prose. One that draws arrows without writing the cards has drawn a picture of
names nobody can look up.

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

**The second column becomes the cards; the third becomes the connections and
the arrows in the diagram.** Both are things to go and find, not things to
assume: a dependency you did not read is not a dependency.

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
- Relates to: one line per other slice, as `<slice> — <what the relation is>`,
  and say which way it runs.
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

## 5. The connections

The `Relates to:` lines are what these are made of. Propose them in the same
turn as the cards.

**Name both ends by the `tempId` you gave the card in `propose_create_cards`.**
The cards do not exist yet, and that is exactly what a tempId is for — the edge
finds the real card once it is made, and switches itself off if the user
declines that card in the review.

Three rules, and the first is the one that goes wrong:

- **One edge per relation you actually established.** Not one per mention, and
  never every card to every other: eight cards joined all round is
  twenty-eight rows to tick, which is a review nobody reads. **Fewer edges than
  cards** is the normal shape of a survey.
- **Give it the word from §2's third column** — `imports`, `describes`,
  `depends on`, `links to`. `references` is what an edge says when nobody said
  anything; a survey that found a direction can do better.
- **Say which way it runs.** `unidirectional`, from the part that depends to
  the part depended on. An arrow both ways means you did not find out.

A mention inside a card's prose is a different mechanism and still works: name
another card's Concept in a sentence and Lino offers the user a chip that makes
the connection. Use that for *a card that happens to mention another*. Use an
edge for *a relation you are reporting as a finding*.

⚠️ Applied cards land in the Inbox, and **the Inbox does not draw edges** — it
holds artifacts, not the lines between them. A connection is real from the
moment it is applied and appears the moment the user puts both cards on a
canvas. So say in your reply what you connected to what; do not assume they can
see it yet.

## 6. The diagram

One `propose_create_diagram`, holding the shape you named in §2: its units as
nodes, its third column as arrows. Give it a caption — that is the only place
a diagram can be named.

It earns its place by holding **what the cards cannot**:

- things that get no card of their own — a build step, an external service, a
  route, a folder you decided to skip and want to show you skipped;
- the direction of the whole thing at once, which eight separate cards cannot
  show however well each one is written.

So it is not a second copy of the card list. If every node in it is a card and
every arrow is an edge you already proposed, you have drawn the review twice.

Keep it under about fifteen nodes. A diagram of the whole file tree is a
picture of nothing. `flowchart LR` for a codebase's dependency direction,
`graph TD` for a vault's link structure — and send the mermaid text on its own,
with no ``` fence.

Unlike a connection, the diagram is **visible the moment it is applied**: it
lands in the Inbox as a Sketch, drawn, beside the cards. It is the one thing in
this survey the user can read without placing anything, which is why it is
worth the row even on a folder with three files in it.

## 7. Leave the shape behind

Write the shape you named and the front door you read into canvas memory. A
later turn starts from those two facts instead of listing the folder again.

You cannot record the diagram's id there — it has none until the user applies
it. So a later pass over the same folder **searches for the map before drawing
one**, and replaces its source with `propose_edit_diagram_source` rather than
leaving two maps of one folder on the canvas.
