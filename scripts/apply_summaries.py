"""Verify chapter digests against the extracted book text and build app/src/data/summaries.json.

Input : content/summaries/chapterNN.json (written by an agent; see content/summaries/README.md)
Output: app/src/data/summaries.json (only items whose `quote` is found verbatim in the chapter text;
        `page` is computed from the quote, never trusted from the input)

Usage:
  python scripts/apply_summaries.py --dry-run content/summaries/chapter09.json   # check one file, write nothing
  python scripts/apply_summaries.py                                                # rebuild everything
"""
import glob
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from quote_utils import find_quote, word_count  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "app", "src", "data", "summaries.json")

# list name -> (text keys that must be non-empty)
SECTIONS = {
    "localizationRules": ("rule", "explanation"),
    "keySyndromes": ("name", "triad", "clue"),
    "boardTraps": ("text",),
}
MAX_QUOTE_WORDS = 30


def check_item(chapter, item, keys, where, problems):
    for k in keys:
        if not isinstance(item.get(k), str) or not item[k].strip():
            problems.append(f"{where}: missing '{k}'")
            return None
    quote = item.get("quote")
    if not isinstance(quote, str) or not quote.strip():
        problems.append(f"{where}: missing quote")
        return None
    if word_count(quote) > MAX_QUOTE_WORDS:
        problems.append(f"{where}: quote longer than {MAX_QUOTE_WORDS} words")
        return None
    page = find_quote(chapter, quote)
    if page is None:
        problems.append(f"{where}: quote not found in chapter text: {quote[:80]!r}")
        return None
    out = {k: item[k].strip() for k in keys}
    out["quote"] = quote.strip()
    out["page"] = page
    return out


def build(path):
    with open(path, encoding="utf-8") as f:
        src = json.load(f)
    chapter = src["chapter"]
    problems = []
    result = {"number": chapter}
    for k in ("title", "subtitle", "pages"):
        if not isinstance(src.get(k), str) or not src[k].strip():
            problems.append(f"missing '{k}'")
        result[k] = (src.get(k) or "").strip()

    groups = []
    for gi, g in enumerate(src.get("coreAnatomy", [])):
        pts = []
        for pi, p in enumerate(g.get("points", [])):
            ok = check_item(chapter, p, ("text",), f"coreAnatomy[{gi}].points[{pi}]", problems)
            if ok:
                pts.append(ok)
        if pts and g.get("title"):
            groups.append({"title": g["title"].strip(), "points": pts})
    result["coreAnatomy"] = groups

    for name, keys in SECTIONS.items():
        kept = []
        for i, item in enumerate(src.get(name, [])):
            ok = check_item(chapter, item, keys, f"{name}[{i}]", problems)
            if ok:
                kept.append(ok)
        result[name] = kept

    total = sum(len(g["points"]) for g in groups) + sum(len(result[n]) for n in SECTIONS)
    return chapter, result, problems, total


def main(argv):
    dry = "--dry-run" in argv
    files = [a for a in argv if not a.startswith("--")]
    rebuild_all = not files
    if rebuild_all:
        files = sorted(glob.glob(os.path.join(ROOT, "content", "summaries", "chapter*.json")))
    built = {}
    bad = 0
    for path in files:
        chapter, result, problems, total = build(path)
        print(f"chapter {chapter:02d}: {total} verified items, {len(problems)} problems  ({os.path.basename(path)})")
        for p in problems:
            print("   -", p)
        bad += len(problems)
        built[str(chapter)] = result
    if dry:
        return 1 if bad else 0
    # merge with what is already stored when only some files were given
    existing = {}
    if not rebuild_all and os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            existing = json.load(f)
    existing.update(built)
    existing = dict(sorted(existing.items(), key=lambda kv: int(kv[0])))
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"wrote {OUT} ({len(existing)} chapters)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
