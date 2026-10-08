# Chapter audits (roadmap step 3)

One review file per chapter: `content/audit/chapterNN_review.json`.
Only `scripts/apply_audit.py` turns these files into question data. Agents write the review file and nothing else.

## Your job for each chapter you are given

1. Read the chapter text: `content/extracted/chapterNN_*.md` (book text with `### [Page N begins | PDF x]` page markers).
   It may include the chapter's reference list at the end; never quote from references.
   Chapter 8 is very large: use Grep to find the passage for each question instead of reading everything.
2. Read the existing questions: `content/approved/chapterNN.json` (read only; do not edit).
3. For EVERY existing question, find the book passage that supports the **marked correct answer** and decide:
   - `supported`: a passage in this chapter supports the correct answer and the question is clinically sound.
     Give `source_quote`.
   - `partial`: the passage supports only part of the claim, or the question adds details the book does not state.
   - `contradicted`: the book says something different from the marked answer or the explanation.
     State in `note` what the book says and on which page. Do NOT try to repair the original.
   - `unverifiable`: you cannot find support in this chapter (it may be true but the book chapter does not say it).
4. Write new questions so that (supported questions + new questions) is **10 to 15** for the chapter.
   Also write a replacement for every `contradicted` question. Use only this chapter's text.
5. Save `content/audit/chapterNN_review.json`, then run (this writes nothing):
   `python scripts/apply_audit.py content/audit/chapterNN_review.json --dry-run`
   Fix every rejected quote it reports (re-read the text and copy the exact words) until nothing important is rejected.

## File format

```json
{
  "chapter": 9,
  "reviewed": [
    {"id": "ch09-001", "verdict": "supported", "source_quote": "exact words from the book", "note": "short reason"},
    {"id": "ch09-002", "verdict": "contradicted", "source_quote": "what the book actually says", "note": "Book p. 357 says X, the question says Y"}
  ],
  "new_questions": [
    {
      "section": "Short topic label",
      "vignette": "A 58-year-old man ... (2-4 sentences)",
      "question": "Where is the lesion most likely located?",
      "options": ["...", "...", "...", "..."],
      "correct": 2,
      "explanation": {
        "why_correct": "...",
        "distractors": ["why the 1st wrong option is wrong", "2nd wrong option", "3rd wrong option"],
        "key_point": "One-sentence takeaway."
      },
      "source_quote": "exact words from the book that support the correct answer",
      "confidence": "high",
      "figure": null
    }
  ]
}
```

Do not write `id`, `page`, or `status`: the script sets them (the page comes from your quote, so the quote decides it).

## Rules for `source_quote`

- Copy the words exactly from the extracted text (line breaks, hyphenation at line ends, quote marks and capitalisation do not matter).
- One contiguous passage, **at most 25 words** (hard limit 40), and long enough to be meaningful (not 3 words).
- It must support the **correct answer**, not just mention the topic. Never paraphrase. Never invent.
- If you cannot find a quote, the verdict is not `supported`.

## Rules for questions (AGENTS.md section 9)

- English, board style; vignette of 2-4 sentences reasoning from signs to localization or diagnosis.
- One defensible answer, supported by the quote. Never invent clinical facts; if the chapter does not say it, do not ask it.
- 4 or 5 options. Plausible distractors (neighbouring locations, confusable syndromes). Avoid "all/none of the above" and
  do not refer to options by letter in the explanation (the app reorders options).
- `distractors` has exactly one entry per wrong option, in the order the wrong options appear. `correct` is a 0-based index.
- Do not name the syndrome or the answer in the stem.
- Explanations teach the reasoning and address every distractor.
- Vary the type: localization, syndrome recognition, vascular territory, structure to deficit, anatomy.
- `confidence`: `high` when the quote states the answer directly, `medium` when it needs one inference, never `low` (drop those).

## Do not

- Edit any file except your own `content/audit/chapterNN_review.json`. Do not run git commands.
- Run `apply_audit.py` without `--dry-run`.
- Use outside knowledge to override the book: if you think the book is wrong, say so in `note` and keep the verdict honest.

## Chapter 15 only: figures

`figure` for existing questions (add a `"figure"` key to a `reviewed` entry) and new questions must name the file that really
shows what the question is about, or `null`. The files in `/figures` are mislabeled in `figures/figures.json`; the real content is:

| File | Shows |
|---|---|
| `figures/ch15-fig01.png` | Fig 15-1: brainstem, ventral view (cranial nerve exits) |
| `figures/ch15-fig02.png` | Fig 15-2: midmedulla cross-section (diagram + myelin stain) |
| `figures/ch15-fig03.png` | Fig 15-3: medulla, medial and lateral medullary infarct zones |
| `figures/ch15-fig04.png` | Fig 15-4: lower pons at CN VI and VII |
| `figures/ch15-fig05.png` | Fig 15-5: mesencephalon, A inferior colliculus level, B superior colliculus level |
| `figures/ch15-fig06.png` | Fig 15-6: mesencephalon, regions 1 Weber, 2 Benedikt, 3 Claude |

Use a figure only when it genuinely helps the question; otherwise `null`.
