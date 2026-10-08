# Chapter digests (roadmap step 6, sprint October 2026)

One file per chapter: `content/summaries/chapterNN.json`. The digest is a short study card that appears in the
app's Summary screen. Every statement must be traceable to the book, so every item carries a **verbatim quote**.
Only `scripts/apply_summaries.py` turns these files into app data; it rejects any item whose quote is not found in
the chapter text and computes the page itself. Agents write the digest file and nothing else.

## Your job for each chapter you are given

1. Read the chapter text: `content/extracted/chapterNN_*.md` (book text with `### [Page N begins | PDF x]` page markers).
   The reference list is at the end of the file; never quote from it. Chapter 8 and chapter 20 are huge: read the
   headings first (Grep for lines starting with `#` or short capitalised lines), then read the key sections.
2. Write a digest for a neurology resident who wants the high-yield localization content of this chapter.
   Use only this chapter's text. Do not add facts from memory. If the book does not say it, leave it out.
3. Save `content/summaries/chapterNN.json`, then run (writes nothing):
   `python scripts/apply_summaries.py --dry-run content/summaries/chapterNN.json`
   Fix every problem it reports (re-read the text and copy the exact words) until it reports 0 problems.

## File format (English)

```json
{
  "chapter": 9,
  "title": "Cranial Nerve V (Trigeminal Nerve)",
  "subtitle": "One line: what this chapter lets you localize",
  "pages": "pp. 353-368",
  "coreAnatomy": [
    {"title": "Group name", "points": [
      {"text": "Teaching sentence in your own words, 1-2 lines.", "quote": "exact words from the book (max 25 words)"}
    ]}
  ],
  "localizationRules": [
    {"rule": "Short rule name", "explanation": "How to use it at the bedside, 1-2 lines.", "quote": "exact words from the book"}
  ],
  "keySyndromes": [
    {"name": "Syndrome or lesion site", "triad": "Sign 1 + Sign 2 + Sign 3", "clue": "What distinguishes it from its neighbour.", "quote": "exact words from the book"}
  ],
  "boardTraps": [
    {"text": "A confusable point or exception the book warns about, 1-2 lines.", "quote": "exact words from the book"}
  ]
}
```

Targets: 2-4 `coreAnatomy` groups with 2-5 points each; 2-5 `localizationRules`; 3-6 `keySyndromes`;
3-6 `boardTraps`. Fewer, well-supported items are better than many weak ones.

## Rules for quotes and text

- `quote` must be copied exactly from the chapter text (same words, same order), 8-25 words, from the body
  of the chapter (not from references, figure legends are fine if they carry the fact). Page-break headings or line
  breaks inside the quote do not matter.
- The `text`, `explanation`, `triad`, `clue` must be fully supported by the quote or by the sentences around it.
  Do not generalise ("always", "never", "only") unless the book does. Keep the book's hedges ("often", "may").
- Use Brazis terminology. Prefer lesion-localization content: structure -> deficit, syndrome recognition,
  vascular territory, pitfalls.
- Every `keySyndromes.triad` is the book's list of findings for that syndrome, joined with " + ".
- Do not copy more than the 25-word quote from the book into any field; paraphrase.
