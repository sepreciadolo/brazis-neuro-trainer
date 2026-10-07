"""Migrate question files to the verification schema (AGENTS.md section 6).

What it does (and nothing else):
  * adds `source_quote: null` after `page`
  * adds `external_source: null` after `confidence`
  * demotes `status: "approved"` to `"draft"` -- the previous "approved" values were
    set by generation scripts, never by the user, and no question has a source_quote.

It never invents a source_quote and never touches clinical text. Idempotent: a question
that already has a `source_quote` key is left exactly as it is.

Usage:  python scripts/migrate_to_verification_schema.py [--dry-run]
"""
import glob
import json
import sys

TARGETS = sorted(glob.glob("content/approved/chapter*.json")) + sorted(
    glob.glob("content/drafts/*.json")
)


def migrate_question(q):
    """Return (new_question, changed)."""
    if "source_quote" in q:
        return q, False
    new = {}
    for key, value in q.items():
        new[key] = value
        if key == "page":
            new["source_quote"] = None
        if key == "confidence":
            new["external_source"] = None
    # Defensive: files missing `page` / `confidence` still get the keys.
    new.setdefault("source_quote", None)
    new.setdefault("external_source", None)
    if new.get("status") == "approved":
        new["status"] = "draft"
    return new, True


def main():
    dry_run = "--dry-run" in sys.argv
    total = changed_total = demoted = 0
    for path in TARGETS:
        with open(path, "r", encoding="utf-8") as f:
            questions = json.load(f)
        out = []
        changed_file = 0
        for q in questions:
            total += 1
            was_approved = q.get("status") == "approved"
            new_q, changed = migrate_question(q)
            if changed:
                changed_file += 1
                changed_total += 1
                if was_approved and new_q["status"] == "draft":
                    demoted += 1
            out.append(new_q)
        if changed_file and not dry_run:
            # Same formatting convention as the existing files: indent=2, UTF-8, no trailing newline.
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                json.dump(out, f, indent=2, ensure_ascii=False)
        print(f"{path}: {changed_file}/{len(questions)} migrated")
    mode = "DRY RUN - nothing written" if dry_run else "written"
    print(f"\n{changed_total}/{total} questions migrated, {demoted} demoted approved->draft ({mode}).")


if __name__ == "__main__":
    main()
