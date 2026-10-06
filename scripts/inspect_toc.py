import os
import sys
import fitz  # PyMuPDF

def inspect_pdf():
    pdf_path = os.path.join("source", "Brazis.8ed. Localization in Clinical Neurology.pdf")
    if not os.path.exists(pdf_path):
        # Check files in source
        files = os.listdir("source")
        print(f"Error: {pdf_path} not found. Files in source: {files}")
        return

    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Total pages in PDF: {total_pages}")

    # Check if text is selectable by testing a few pages (e.g., page 50, 100, 200)
    samples = [10, 50, 100]
    has_text = False
    for p in samples:
        if p < total_pages:
            text = doc[p].get_text()
            if len(text.strip()) > 50:
                has_text = True
                print(f"Page {p+1} has {len(text)} characters of text. Sample: {text[:120].strip()!r}...")
                break

    if has_text:
        print("\n[SUCCESS] The PDF contains selectable text (not scanned images only).")
    else:
        print("\n[WARNING] Could not find substantial selectable text on sample pages.")

    # Check Table of Contents (bookmarks/outlines)
    toc = doc.get_toc()
    print(f"\nExtracted {len(toc)} Table of Contents entries.")
    if toc:
        print("\n--- TABLE OF CONTENTS (Chapters & Major Sections) ---")
        # Filter for top level (level 1 or 2)
        for item in toc:
            level, title, page = item
            if level <= 2:
                indent = "  " * (level - 1)
                print(f"{indent}[L{level}] Page {page}: {title}")
    else:
        print("No built-in PDF outline found. Searching for 'Contents' in the first 25 pages...")
        for p in range(min(25, total_pages)):
            t = doc[p].get_text()
            if "contents" in t.lower():
                print(f"\nFound potential TOC page {p+1}:\n{t[:1000]}")

if __name__ == "__main__":
    inspect_pdf()
