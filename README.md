# Brazis Neuro Trainer

Personal study PWA for neurology residents focused on clinical localization, based on *Localization in Clinical Neurology* (Brazis, 8th Edition).

## Project Structure

- `/source`: Original PDF (local, read-only, git-ignored)
- `/scripts`: Python extraction and validation scripts
- `/content`:
  - `/extracted`: Extracted chapter markdown with page anchors
  - `/drafts`: AI-generated clinical vignette question drafts
  - `/approved`: Curated and approved questions bundled in the app
- `/figures`: High-resolution figures extracted from the book
- `/app`: React + Vite + TypeScript PWA (Tailwind, ts-fsrs, idb)

See `AGENTS.md` for project rules and development guidelines.
