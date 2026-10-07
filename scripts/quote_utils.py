"""Verify that a source_quote really appears in the extracted book text and find its printed page.

Matching is done on letters and digits only, case-insensitive, so PDF artefacts (line breaks,
hyphenation at line ends, curly quotes, dashes, double spaces, page-break headings between lines)
cannot cause a false rejection, while an invented or paraphrased quote still cannot match.
"""
import bisect
import glob
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EXTRACTED = os.path.join(ROOT, "content", "extracted")

PAGE_HEADING = re.compile(r"^### \[Page (\d+) begins \| PDF \d+\]\s*$")
COMMENT = re.compile(r"^<!-- .* -->\s*$")
HEADER_LINE = re.compile(r"^(# Chapter|> )")
ALNUM = re.compile(r"[a-z0-9]")

_cache = {}


def chapter_path(chapter):
    matches = sorted(glob.glob(os.path.join(EXTRACTED, f"chapter{chapter:02d}_*.md")))
    return matches[0] if matches else None


def _squash(text):
    """Lower-case letters and digits only (accents folded to ASCII where possible)."""
    text = text.lower()
    repl = {"’": "'", "‘": "'", "“": '"', "”": '"'}
    for k, v in repl.items():
        text = text.replace(k, v)
    return "".join(ALNUM.findall(_fold(text)))


def _fold(text):
    try:
        import unicodedata
        return "".join(c for c in unicodedata.normalize("NFKD", text) if not unicodedata.combining(c))
    except Exception:  # noqa: BLE001
        return text


def load_chapter(chapter):
    """Return (squashed_text, offsets, pages): pages[i] is the printed page for squashed offset >= offsets[i]."""
    if chapter in _cache:
        return _cache[chapter]
    path = chapter_path(chapter)
    if not path:
        raise FileNotFoundError(f"No extracted text for chapter {chapter} in {EXTRACTED}")
    parts, offsets, pages = [], [], []
    total = 0
    current = None
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            m = PAGE_HEADING.match(line.strip())
            if m:
                current = int(m.group(1))
                offsets.append(total)
                pages.append(current)
                continue
            if COMMENT.match(line.strip()) or HEADER_LINE.match(line):
                continue
            s = _squash(line)
            parts.append(s)
            total += len(s)
    result = ("".join(parts), offsets, pages)
    _cache[chapter] = result
    return result


def find_quote(chapter, quote):
    """Return the printed page where `quote` starts, or None when it is not in the chapter text.

    A quote that occurs more than once returns the first occurrence.
    """
    squashed = _squash(quote)
    if len(squashed) < 20:  # too short to prove anything
        return None
    text, offsets, pages = load_chapter(chapter)
    pos = text.find(squashed)
    if pos < 0:
        return None
    i = bisect.bisect_right(offsets, pos) - 1
    return pages[max(i, 0)]


def word_count(quote):
    return len(quote.split())
