"""Add/refresh the `summaries/chapterNN` entries of content/sources.json from content/summaries/*.json.

Run after scripts/apply_summaries.py. Status becomes `ai_checked` (every quote is proven to be in the book text);
`approved` is never set here.
"""
import glob
import json
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "content", "sources.json")
BUILT = os.path.join(ROOT, "app", "src", "data", "summaries.json")


def main():
    raw = open(SRC, encoding="utf-8").read()
    data = json.loads(raw)
    assets = {a["asset"]: a for a in data["assets"]}
    built = json.load(open(BUILT, encoding="utf-8"))
    for ch, d in built.items():
        n = int(ch)
        items = (
            sum(len(g["points"]) for g in d["coreAnatomy"])
            + len(d["localizationRules"]) + len(d["keySyndromes"]) + len(d["boardTraps"])
        )
        pages = sorted({p["page"] for g in d["coreAnatomy"] for p in g["points"]}
                       | {x["page"] for k in ("localizationRules", "keySyndromes", "boardTraps") for x in d[k]})
        key = f"summaries/chapter{n:02d}"
        entry = assets.get(key) or {"asset": key, "type": "chapter_digest", "external_source": None}
        entry["title"] = f"Chapter {n} digest: {d['title']}"
        entry["source"] = f"Brazis Ch. {n}, pp. {pages[0]}-{pages[-1]} (page of each point shown in the app)"
        entry["status"] = "ai_checked"
        entry["notes"] = [
            f"{items} items, each with a verbatim quote that scripts/apply_summaries.py found in content/extracted (chapter {n}); the page is computed from the quote.",
            "ai_checked means the quotes exist in the book text and the wording was written from them by an AI agent. It does not mean the owner reviewed it.",
            "Source files: content/summaries/chapter%02d.json (agent output) and app/src/data/summaries.json (verified build)." % n,
        ]
        if key not in assets:
            data["assets"].append(entry)
            assets[key] = entry
    for n in (1, 2, 3, 4, 5, 15):
        a = assets.get(f"summaries/chapter{n:02d}")
        if a and a["status"] == "unverified":
            a["notes"] = [x for x in a["notes"] if "No extracted chapter text exists" not in x] + [
                "Older AI-written digest without page references. Extracted chapter text now exists, so it can be replaced by a verified digest (content/summaries)."
            ]
    nl = "\n"
    out = json.dumps(data, indent=2, ensure_ascii=False) + (nl if raw.endswith(nl) else "")
    open(SRC, "w", encoding="utf-8", newline="\n").write(out)
    print("registered", len(built), "digests")


if __name__ == "__main__":
    main()
