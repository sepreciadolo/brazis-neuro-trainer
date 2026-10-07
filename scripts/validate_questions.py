"""Validate question files against the contract in AGENTS.md section 6.

Usage:
    python scripts/validate_questions.py                 # all content/approved/chapter*.json
    python scripts/validate_questions.py FILE [FILE...]  # specific files

Errors fail validation (exit code 1). Warnings never fail it; they point at content
that needs the chapter-by-chapter quality pass (roadmap step 3).
"""
import collections
import glob
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CHAPTERS_INDEX = os.path.join(ROOT, "content", "chapters_index.json")

VALID_STATUSES = {"draft", "ai_checked", "approved", "discarded"}
VALID_CONFIDENCES = {"high", "medium", "low"}
REQUIRED_FIELDS = [
    "id", "chapter", "section", "page", "source_quote", "vignette", "question",
    "options", "correct", "explanation", "figure", "status", "confidence",
    "external_source",
]
ID_PATTERN = re.compile(r"^ch(\d{2})-(\d{3})$")
QUOTE_WARN_WORDS = 25   # contract: "max ~25 words"
QUOTE_MAX_WORDS = 40    # hard limit: source_quote is for verification, not for display
SKEW_MIN_QUESTIONS = 6
SKEW_SHARE = 0.5        # warn when one answer position is correct in more than half of a file


def load_page_ranges():
    """Return {chapter_number: (first_print_page, last_print_page)}.

    `page_count` in chapters_index.json counts PDF pages including figure pages, so it is
    not a reliable chapter length. The end of a chapter is the page before the next one
    starts; for the last chapter we fall back to start + page_count - 1 (lenient).
    """
    if not os.path.exists(CHAPTERS_INDEX):
        return {}
    with open(CHAPTERS_INDEX, "r", encoding="utf-8") as f:
        chapters = sorted(json.load(f), key=lambda c: c["chapter"])
    ranges = {}
    for i, c in enumerate(chapters):
        start = c["print_start_page"]
        if i + 1 < len(chapters):
            end = chapters[i + 1]["print_start_page"] - 1
        else:
            end = start + c["page_count"] - 1
        ranges[c["chapter"]] = (start, end)
    return ranges


def validate_questions(questions, file_path, page_ranges):
    """Return (errors, warnings) for a parsed list of questions."""
    errors, warnings = [], []

    if not isinstance(questions, list):
        return ["Root must be a JSON array of question objects."], warnings

    file_chapter = None
    m = re.search(r"chapter(\d+)", os.path.basename(file_path))
    if m:
        file_chapter = int(m.group(1))

    seen_ids = set()
    for idx, q in enumerate(questions):
        qid = q.get("id", f"index-{idx}")
        prefix = f"[{qid}]"

        for field in REQUIRED_FIELDS:
            if field not in q:
                errors.append(f"{prefix} Missing required field '{field}'")

        # id
        id_match = ID_PATTERN.match(str(q.get("id", "")))
        if not id_match:
            errors.append(f"{prefix} 'id' must look like 'ch15-012'")
        elif file_chapter is not None and int(id_match.group(1)) != file_chapter:
            errors.append(f"{prefix} id chapter number does not match file name ({os.path.basename(file_path)})")
        if qid in seen_ids:
            errors.append(f"{prefix} Duplicate id in file")
        seen_ids.add(qid)

        # options / correct
        options = q.get("options", [])
        if not isinstance(options, list) or len(options) not in (4, 5):
            errors.append(f"{prefix} 'options' must be a list of 4 or 5 strings, got "
                          f"{len(options) if isinstance(options, list) else type(options)}")
            options = options if isinstance(options, list) else []
        correct = q.get("correct")
        if not isinstance(correct, int) or isinstance(correct, bool) or correct < 0 or correct >= len(options):
            errors.append(f"{prefix} 'correct' must be a 0-based integer index into options, got {correct}")

        # explanation
        exp = q.get("explanation")
        if not isinstance(exp, dict):
            errors.append(f"{prefix} 'explanation' must be an object")
        else:
            if not exp.get("why_correct") or not isinstance(exp.get("why_correct"), str):
                errors.append(f"{prefix} explanation.why_correct is missing or not a string")
            if not exp.get("key_point") or not isinstance(exp.get("key_point"), str):
                errors.append(f"{prefix} explanation.key_point is missing or not a string")
            distractors = exp.get("distractors")
            if not isinstance(distractors, list):
                errors.append(f"{prefix} explanation.distractors must be a list")
            elif options and len(distractors) != len(options) - 1:
                errors.append(f"{prefix} explanation.distractors must have {len(options) - 1} items "
                              f"(one per wrong option), got {len(distractors)}")

        # figure
        figure = q.get("figure")
        if figure is not None:
            if not isinstance(figure, str):
                errors.append(f"{prefix} 'figure' must be a string path or null")
            elif not os.path.exists(os.path.join(ROOT, figure)):
                errors.append(f"{prefix} Figure path does not exist on disk: '{figure}'")

        # status / confidence
        status = q.get("status")
        if status not in VALID_STATUSES:
            errors.append(f"{prefix} 'status' must be one of {sorted(VALID_STATUSES)}, got '{status}'")
        if q.get("confidence") not in VALID_CONFIDENCES:
            errors.append(f"{prefix} 'confidence' must be one of {sorted(VALID_CONFIDENCES)}, got '{q.get('confidence')}'")

        # source_quote: verification only, never invented
        quote = q.get("source_quote")
        if quote is not None and not isinstance(quote, str):
            errors.append(f"{prefix} 'source_quote' must be a string or null")
        elif isinstance(quote, str):
            words = len(quote.split())
            if words > QUOTE_MAX_WORDS:
                errors.append(f"{prefix} 'source_quote' has {words} words (hard limit {QUOTE_MAX_WORDS}, target ~{QUOTE_WARN_WORDS})")
            elif words > QUOTE_WARN_WORDS:
                warnings.append(f"{prefix} 'source_quote' has {words} words (target ~{QUOTE_WARN_WORDS})")
        if status in ("ai_checked", "approved") and not (isinstance(quote, str) and quote.strip()):
            errors.append(f"{prefix} status '{status}' requires a non-empty source_quote")

        # external_source
        ext = q.get("external_source")
        if ext is not None and (not isinstance(ext, str) or not ext.strip()):
            errors.append(f"{prefix} 'external_source' must be null or a non-empty citation string")

        # page (warning only: fixing it is part of the quality pass)
        page = q.get("page")
        if not isinstance(page, int) or isinstance(page, bool):
            errors.append(f"{prefix} 'page' must be an integer")
        elif id_match and int(id_match.group(1)) in page_ranges:
            lo, hi = page_ranges[int(id_match.group(1))]
            if not lo <= page <= hi:
                warnings.append(f"{prefix} page {page} is outside chapter {int(id_match.group(1))} "
                                f"(book pages {lo}-{hi})")

    # answer-position bias
    valid = [q for q in questions if isinstance(q.get("correct"), int)]
    if len(valid) >= SKEW_MIN_QUESTIONS:
        counts = collections.Counter(q["correct"] for q in valid)
        pos, n = counts.most_common(1)[0]
        if n / len(valid) > SKEW_SHARE:
            warnings.append(f"Answer-position bias: option {pos} is correct in {n}/{len(valid)} questions "
                            f"(distribution {dict(sorted(counts.items()))})")

    return errors, warnings


def validate_question_file(file_path):
    """Validate one file; print a report; return True when there are no errors."""
    print(f"Validating {file_path}...")
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist.")
        return False
    with open(file_path, "r", encoding="utf-8") as f:
        try:
            questions = json.load(f)
        except Exception as e:  # noqa: BLE001 - report any parse problem
            print(f"JSON Parse Error: {e}")
            return False

    errors, warnings = validate_questions(questions, file_path, load_page_ranges())

    for w in warnings:
        print("  [warn]", w)
    if errors:
        print(f"\n[FAILED] Found {len(errors)} validation errors:")
        for err in errors:
            print("  -", err)
        return False

    print(f"\n[PASSED] {len(questions)} questions in {file_path} ({len(warnings)} warnings).")
    return True


if __name__ == "__main__":
    targets = sys.argv[1:] or sorted(glob.glob(os.path.join(ROOT, "content", "approved", "chapter*.json")))
    results = [validate_question_file(t) for t in targets]
    failed = results.count(False)
    if len(targets) > 1:
        print(f"\n{len(targets) - failed}/{len(targets)} files passed.")
    sys.exit(1 if failed else 0)
