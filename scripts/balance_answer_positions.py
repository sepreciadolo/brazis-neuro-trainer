"""Remove answer-position bias by moving the correct option to a balanced target position.

Only the order of `options` and the `correct` index change; no wording changes. Because the
other options keep their relative order, `explanation.distractors` (one per wrong option, in
order) stays valid.

Skipped, and listed for manual review, are questions where position matters:
  * an option says "all / none / both of the above" (or similar)
  * the explanation or question refers to options by letter

Idempotent: a file whose most common correct position is already <= 40 % is left alone.

Usage:  python scripts/balance_answer_positions.py [--dry-run] [FILE ...]
"""
import collections
import glob
import json
import os
import random
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MAX_SHARE = 0.4
POSITIONAL_OPTION = re.compile(r"\b(all|none|both|neither)\b[^.]{0,20}\b(above|these|them|of the)\b|\bA and B\b|\bB and C\b", re.I)
LETTER_REFERENCE = re.compile(r"\b(option|choice|answer)s?\s+\(?[A-E]\b|\([A-E]\)|\b[A-E]\s+(?:and|or)\s+[A-E]\b", re.I)


def is_position_sensitive(q):
    if any(POSITIONAL_OPTION.search(o) for o in q["options"]):
        return "positional option text"
    blob = json.dumps(q["explanation"], ensure_ascii=False) + " " + q["question"]
    if LETTER_REFERENCE.search(blob):
        return "mentions option letters"
    return None


def balance_file(path, dry):
    with open(path, "r", encoding="utf-8") as f:
        questions = json.load(f)
    counts = collections.Counter(q["correct"] for q in questions)
    if len(questions) < 6 or max(counts.values()) / len(questions) <= MAX_SHARE:
        return 0, [], False
    chapter = int(re.search(r"chapter(\d+)", os.path.basename(path)).group(1))
    movable = [q for q in questions if not is_position_sensitive(q)]
    skipped = [(q["id"], is_position_sensitive(q)) for q in questions if is_position_sensitive(q)]
    rng = random.Random(chapter)
    # balanced targets per group of questions with the same number of options (so every target is valid)
    moved = 0
    by_size = collections.defaultdict(list)
    for q in sorted(movable, key=lambda x: x["id"]):
        by_size[len(q["options"])].append(q)
    for size, group in sorted(by_size.items()):
        targets = [i % size for i in range(len(group))]
        rng.shuffle(targets)
        for q, target in zip(group, targets):
            if q["correct"] == target:
                continue
            correct_text = q["options"][q["correct"]]
            others = [o for i, o in enumerate(q["options"]) if i != q["correct"]]
            others.insert(target, correct_text)
            assert 0 <= target < len(others) + 1 and others[target] == correct_text
            q["options"], q["correct"] = others, target
            moved += 1
    if not dry:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)
    return moved, skipped, True


def main():
    dry = "--dry-run" in sys.argv
    files = [a for a in sys.argv[1:] if not a.startswith("--")] or sorted(glob.glob(os.path.join(ROOT, "content", "approved", "chapter*.json")))
    total_moved, all_skipped = 0, []
    for path in files:
        moved, skipped, touched = balance_file(path, dry)
        total_moved += moved
        all_skipped += skipped
        with open(path, "r", encoding="utf-8") as f:
            qs = json.load(f)
        dist = dict(sorted(collections.Counter(q["correct"] for q in qs).items()))
        print(f"{os.path.basename(path)}: moved {moved}, skipped {len(skipped)}, distribution {dist}" + ("" if touched else " (already balanced or too small)"))
    print(f"\nTotal moved: {total_moved}" + (" (DRY RUN, nothing written)" if dry else ""))
    if all_skipped:
        print("Position-sensitive questions left as they are (review by hand):")
        for qid, why in all_skipped:
            print(f"  {qid}: {why}")


if __name__ == "__main__":
    main()
