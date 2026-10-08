# AGENTS.md — Brazis Neuro Trainer (v2)

Project rules for the coding agent. Read this file and `status.md` before every task.

## 1. Project summary

A personal study PWA for a neurology resident, based on *Localization in Clinical Neurology*
(Brazis, Masdeu & Biller, 8th ed.). It covers all chapters with board-style vignettes, an
interactive brainstem atlas, decision flowcharts, a syndrome matrix, chapter digests, and FSRS
spaced repetition.

- Single user, personal use. The book content is copyrighted: never publish it publicly.
- Current phase: **build on what exists — fix errors, verify content, then improve.**
  Do not rewrite working parts from scratch. Do not delete features without asking.

## 2. The core principle: verified vs. unverified

This is a study tool. A confident-looking error teaches wrong neurology, which is worse than
no content. Therefore:

- Every clinical claim, question, overlay, coordinate, territory, or diagram must have a
  traceable source: a Brazis page, or an explicitly labeled external source.
- Content I have not personally reviewed is **unverified** and must be visibly marked in the UI.
- Never mark anything as reviewed by me. Only I can do that.
- If you find a likely clinical error, flag it to me with the page and your reasoning. Do not
  silently "fix" clinical content.

## 3. How to work with me

- Work in small steps, one task at a time. Use plan mode for anything touching more than 3 files.
- At the end of every step: STOP, summarize in Spanish, list open issues, wait for confirmation.
- Ask instead of guessing. Explain simply: I am a physician, not a developer.
- Commit after every working step with a clear message.
- Never delete or overwrite `/source`, `/content/approved`, or `/figures` without asking.
- Priority order for any task: 1) correctness of clinical content, 2) bugs, 3) usability, 4) new features.

## 4. Language

- Questions, explanations, and UI: **English**, with Brazis terminology.
- Your messages to me: **Spanish**.

## 5. Tech stack (keep as is; ask before adding libraries)

React 19 + TypeScript (strict) · Vite + Tailwind v4 · vite-plugin-pwa · ts-fsrs ·
IndexedDB via idb · mermaid · Vitest · Python + PyMuPDF for extraction in `/scripts`.
Keep code compatible with a future Capacitor wrap.

## 6. Question data schema (contract)

```json
{
  "id": "ch15-012",
  "chapter": "Brainstem",
  "section": "Midbrain syndromes",
  "page": 123,
  "source_quote": "Short excerpt (max ~25 words) from the page that supports the answer.",
  "vignette": "A 62-year-old man presents with ...",
  "question": "Where is the lesion most likely located?",
  "options": ["...", "...", "...", "..."],
  "correct": 2,
  "explanation": {
    "why_correct": "...",
    "distractors": ["Why option 0 is wrong", "..."],
    "key_point": "One-sentence takeaway."
  },
  "figure": "figures/ch15-fig03.png",
  "status": "ai_checked",
  "confidence": "high",
  "external_source": null
}
```

- `options`: 4 or 5. `correct`: zero-based. `distractors`: one per wrong option, in order.
- `status`:
  - `draft`: generated, not checked.
  - `ai_checked`: you verified it against the extracted text and `source_quote` matches the page.
  - `approved`: I reviewed it. **Only I set this**, via the in-app review tool.
  - `discarded`: removed from rotation.
- `external_source`: `null` if from Brazis; otherwise a citation (e.g. "Gates P. Pract Neurol 2005").
- `source_quote` is for verification only; do not display long book passages in the UI.
- Existing questions without a verifiable `source_quote` go back to `draft`.

## 7. Same rule for visual and clinical assets

Atlas hotspots, lesion overlays, vascular territories, the 3D model, flowcharts, the syndrome
matrix, and chapter digests each need a source registry entry in `/content/sources.json`:

```json
{ "asset": "lesion_sim/weber", "source": "Brazis p. 000, Fig 15-6", "status": "unverified" }
```

- `status`: `unverified` | `ai_checked` | `approved` (only I set `approved`).
- Unverified assets show a small, unobtrusive "Unverified" badge in the UI.
- External sources (e.g. Gates' Rule of 4, Wikimedia images) are labeled as such in the UI.
- Wikimedia images: record license and author, and show attribution in an About/Credits screen.

## 8. In-app review tool (for me)

A review mode where I see one item at a time with its page and `source_quote`, and choose:
Approve · Edit note · Discard · Flag. My decisions are stored in IndexedDB and exportable as
JSON so you can apply them to the content files.

## 9. Question quality rules

- Board-style vignettes, 2–4 sentences, reasoning from signs to localization.
- One defensible answer, supported by the cited page. Never invent clinical facts.
- Plausible distractors: neighboring locations or confusable syndromes.
- Do not name the syndrome in the stem.
- Explanations teach the reasoning and address every distractor.
- Prefer variety: localization, syndrome recognition, vascular territory, structure → deficit.
- Target per chapter: 10–15 questions, generated from that chapter's extracted text only.
- If a question does not meet the rules, discard it.

## 10. Design guidelines

Mobile-first, one-handed use, dark mode default with toggle, base font ≥ 16 px, tap targets
≥ 44 px, never rely on color alone, figures tappable to full-screen zoom, one question per
screen, accessible semantic HTML. Do not add visual complexity that hurts readability.

## 11. Roadmap (in order)

1. **Audit:** report what exists, how each content type was produced, and its source. No code.
2. **Verification layer:** schema update, `sources.json`, unverified badges, review tool.
3. **Chapter-by-chapter quality pass:** re-check existing questions against extracted text,
   fix or discard, expand to 10–15. One chapter per session; I review before the next.
4. **Tests:** schema validation for all content files, plus tests for core UI flows.
5. **Private deployment + phone install** (Netlify/Vercel with password).
6. **Improvements and new features**, only after the above.

## 12. Definition of done (every task)

Builds with no TypeScript errors · tests pass · content files pass schema validation ·
works offline · checked at ~390 px width · committed · short summary to me in Spanish.
