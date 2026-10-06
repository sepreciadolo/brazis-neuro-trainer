# AGENTS.md — Brazis Neuro Trainer

Project rules for the coding agent. Read this file before every task and follow it strictly.

## 1. Project summary

A personal study app (PWA) for a neurology resident. It teaches clinical localization with
board-style clinical vignette questions generated from the book *Localization in Clinical
Neurology* (Brazis). Each question has an explanation and, when available, a figure from the book.

- Single user, personal use only. Content is copyrighted: never publish it publicly.
- MVP = ONE pilot chapter, end to end. Do not build features outside the MVP scope (section 7).

## 2. How to work with me

- Work in small steps. One task at a time.
- At the end of every phase or major step, STOP, summarize what you did, show results,
  list open issues, and wait for my confirmation before continuing.
- Before writing code for a new feature, briefly state your plan (files to create/change).
- If something is ambiguous, ask me instead of guessing.
- Never delete or overwrite files in `/source`, `/content/approved`, or `/figures`
  without asking first.
- Commit to git after every working step with a clear message (e.g. `feat: quiz screen`).
- Explain things simply: I am a physician, not a professional developer.

## 3. Language

- All questions, explanations, and app UI text: **English**.
- Use standard neuroanatomical terminology exactly as Brazis uses it.
- Your messages to me (summaries, questions): Spanish.

## 4. Tech stack (do not change without asking)

- React + Vite + TypeScript (strict mode).
- PWA: `vite-plugin-pwa` (manifest + service worker, full offline support).
- Styling: Tailwind CSS.
- Spaced repetition: `ts-fsrs` library. Do not invent a custom algorithm.
- Storage: IndexedDB via `idb` (progress, review schedule). No backend, no accounts, no external APIs at runtime.
- Content: static JSON files + images bundled with the app.
- Testing: Vitest for logic (scheduling, scoring, JSON validation).
- PDF extraction scripts (phase 1): Python with PyMuPDF (`fitz`), kept in `/scripts`.
- Keep dependencies minimal. Ask before adding any library not listed here.
- Code must stay compatible with a future Capacitor wrap (no browser-only hacks).

## 5. Folder structure

```
/source            Original PDF (read-only, git-ignored)
/scripts           Python extraction + validation scripts
/content
  /extracted       Chapter text as Markdown, with page numbers
  /drafts          AI-generated questions (status: draft)
  /approved        Questions I approved (only these ship in the app)
/figures           Extracted figures (PNG) + figures.json index
/app               The React PWA
AGENTS.md
```

Add `/source`, `/content`, and `/figures` to `.gitignore` if the repository is ever pushed
to a public remote. Default: keep the repository private.

## 6. Question data schema (the contract — do not change without asking)

One JSON file per chapter: an array of question objects.

```json
{
  "id": "ch05-012",
  "chapter": "Brainstem",
  "section": "Midbrain syndromes",
  "page": 123,
  "vignette": "A 62-year-old man presents with ...",
  "question": "Where is the lesion most likely located?",
  "options": ["...", "...", "...", "...", "..."],
  "correct": 2,
  "explanation": {
    "why_correct": "...",
    "distractors": ["Why A is wrong", "Why B is wrong", "..."],
    "key_point": "One-sentence takeaway."
  },
  "figure": "figures/ch05-fig03.png",
  "status": "draft",
  "confidence": "high"
}
```

Rules:
- `options`: 4 or 5 items. `correct`: zero-based index.
- `distractors`: one entry per wrong option, in option order.
- `figure`: path or `null`.
- `status`: `draft` | `approved` | `discarded`.
- `confidence`: `high` | `medium` | `low` (your own confidence in accuracy).
- Write a validation script (`/scripts/validate.py` or a Vitest test) that checks every file against this schema.

## 7. MVP scope

IN:
- Chapter list with mastery percentage per chapter.
- Two modes: new questions from a chapter, and review of due questions.
- Question screen: vignette, options, no timer.
- Immediate feedback (correct / incorrect).
- Explanation screen: why correct, why each distractor is wrong, key point, figure, page reference.
- Figures with pinch-to-zoom / tap-to-enlarge.
- FSRS scheduling of every answered question.
- "Report bad question" button: stores the question id + optional note locally; exportable as JSON.
- Export / import of all progress as a JSON backup file.
- Installable PWA that works fully offline.

OUT (do not build unless I ask):
- Accounts, login, sync, backend, analytics.
- Chat with the book, open-ended cases, AI calls at runtime.
- Advanced statistics dashboards.
- Other books or chapters beyond the pilot.
- App store packaging.

## 8. Question quality rules (for content generation)

- Board-style clinical vignettes, 2–4 sentences, requiring reasoning from signs to lesion localization.
- Exactly one defensible answer, supported by the chapter text. Cite the page.
- If a fact is not in the chapter, do not ask about it. Never invent clinical facts.
- Distractors must be plausible: neighboring locations or syndromes a resident could confuse.
- The vignette must not give away the answer (avoid naming the syndrome in the stem).
- Explanations teach the reasoning, not just the fact.
- Prefer variety: localization, syndrome recognition, vascular territory, structure → deficit.
- If a question does not meet these rules, discard it rather than force it.
- After generating, list low-confidence questions first so I review them first.

## 9. Design guidelines

- Mobile-first, usable with one hand (primary buttons in the lower half of the screen).
- Clean, calm, clinical look. References: Anki (simplicity), AMBOSS (readability).
- Dark mode by default with a light mode toggle; follow system preference on first launch.
- High readability: base font size at least 16 px, comfortable line height, max text width ~70 characters.
- Large tap targets (at least 44 px).
- Clear feedback colors for correct/incorrect, but never rely on color alone (add icons/text).
- Figures: shown large, tappable to open full-screen with zoom.
- No clutter: one question per screen, minimal navigation.
- Accessible: semantic HTML, keyboard navigable, sufficient contrast.

## 10. Phases and checkpoints

0. Setup: repo, folders, git, `.gitignore`. → STOP and confirm.
1. Content: extract pilot chapter text + figures, generate draft questions, validate schema. → STOP; I review and approve.
2. App: build the PWA reading `/content/approved`. → STOP; I test on desktop.
3. Real use: deploy privately (Netlify or Vercel with password protection), install on phone. → STOP; I use it for one week.

## 11. Definition of done (every task)

- Builds with no TypeScript errors.
- Tests pass.
- Works offline after first load.
- Tested at a mobile viewport (~390 px wide).
- Committed to git.
- Short summary sent to me in Spanish.
