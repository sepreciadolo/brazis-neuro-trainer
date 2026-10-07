# Brazis Neuro Trainer

Personal study PWA for neurology residents focused on clinical localization, based on *Localization in Clinical Neurology* (Brazis, 8th Edition).

> **Status: content is unverified.** Every question is a `draft` and every atlas, diagram, matrix and digest asset is `unverified` until the owner reviews it. See `status.md` section 8 for the known issues.

## Project Structure

- `/source`: Original PDF (local, read-only, git-ignored)
- `/scripts`: Python extraction, generation and validation scripts
- `/content`:
  - `sources.json`: registry of non-question assets (figures, atlas, diagrams, matrix, digests) and their verification status
  - `/extracted`: Extracted chapter markdown with page anchors (chapter 15 only so far)
  - `/drafts`: AI-generated clinical vignette question drafts
  - `/approved`: Question files bundled in the app (the folder name is historical; items are drafts until reviewed)
- `/figures`: High-resolution figures extracted from the book
- `/app`: React + Vite + TypeScript PWA (Tailwind, ts-fsrs, idb)

## Verification

Only the owner can mark content `approved`, through the review tool in the app. Check the content files with:

```bash
python scripts/validate_questions.py   # all question files (errors fail, warnings are reported)
python scripts/validate_sources.py     # asset registry
```

See `AGENTS.md` for project rules and development guidelines.
