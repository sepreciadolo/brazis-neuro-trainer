"""Extract chapter text from the Brazis PDF into content/extracted/ (text only, no figures).

The book embeds "(Print pagebreak N)" inside the text where printed page N begins, so each
text segment is labelled with its true printed page. (extract_chapter15_content.py used only
the first marker of each PDF page, which produced repeated page labels.)

Usage:
    python scripts/extract_chapters.py                # chapters 1-14 and 16-23 (15 already exists)
    python scripts/extract_chapters.py 15 --out DIR   # any chapters, into another directory
    python scripts/extract_chapters.py --all          # all 23 (never overwrites existing files)

Never overwrites an existing file. Reads /source (read-only).
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PDF_PATH = os.path.join(ROOT, "source", "Brazis.8ed. Localization in Clinical Neurology.pdf")
INDEX_PATH = os.path.join(ROOT, "content", "chapters_index.json")

MARKER = re.compile(r"\(\s*Print\s+pagebreak\s+(\d+)\s*\)", re.IGNORECASE)
NOISE = ("Localization in Clinical Neurology", "ISBN: 978-1-9751-6024-1", "urosario999")


def slug(title):
    s = re.sub(r"[^a-z0-9]+", "_", title.lower()).strip("_")
    return "_".join(s.split("_")[:5])


def clean(text):
    out = []
    for line in text.split("\n"):
        t = line.strip()
        if any(n in t for n in NOISE):
            continue
        out.append(t)
    return "\n".join(out)


def extract_chapter(doc, ch, out_dir):
    first, last = ch["pdf_start_page"], ch["pdf_end_page"]
    printed = ch["print_start_page"]
    name = f"chapter{ch['chapter']:02d}_{slug(ch['title'])}.md"
    path = os.path.join(out_dir, name)
    if os.path.exists(path):
        print(f"  skip (exists): {name}")
        return None

    lines = [
        f"# Chapter {ch['chapter']}: {ch['title']}",
        "",
        "> Source: *Localization in Clinical Neurology* (Brazis, 8th Edition)",
        f"> Book page labels start at {printed}; PDF pages {first}-{last}. Page labels come from the book's own",
        "> '(Print pagebreak N)' markers. This file may include the chapter's reference list.",
        "",
        "---",
        f"\n### [Page {printed} begins | PDF {first}]\n",
    ]
    empty_pages = []
    for pno in range(first - 1, last):
        raw = doc[pno].get_text()
        if len(raw.strip()) < 40:
            empty_pages.append(pno + 1)
        if pno + 1 != first:
            lines.append(f"\n<!-- PDF page {pno + 1} -->\n")
        pos = 0
        for m in MARKER.finditer(raw):
            lines.append(clean(raw[pos:m.start()]))
            printed = int(m.group(1))
            lines.append(f"\n### [Page {printed} begins | PDF {pno + 1}]\n")
            pos = m.end()
        lines.append(clean(raw[pos:]))

    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")
    print(f"  wrote {name}: PDF pp. {first}-{last}, last book page label {printed}"
          + (f", near-empty PDF pages: {empty_pages}" if empty_pages else ""))
    return path


def main():
    args = sys.argv[1:]
    out_dir = os.path.join(ROOT, "content", "extracted")
    if "--out" in args:
        i = args.index("--out")
        out_dir = os.path.abspath(args[i + 1])
        del args[i:i + 2]
    with open(INDEX_PATH, "r", encoding="utf-8") as f:
        chapters = {c["chapter"]: c for c in json.load(f)}
    if "--all" in args:
        wanted = sorted(chapters)
    elif args:
        wanted = [int(a) for a in args]
    else:
        wanted = [n for n in sorted(chapters) if n != 15]
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(PDF_PATH)
    for n in wanted:
        extract_chapter(doc, chapters[n], out_dir)


if __name__ == "__main__":
    main()
