import fitz
import re
import json

doc = fitz.open("source/Brazis.8ed. Localization in Clinical Neurology.pdf")

chapters_table = {}

for p in range(len(doc)):
    text = doc[p].get_text()
    # Find CHAPTER X
    m = re.search(r"CHAPTER\s+(\d+)\s*\n\s*([^\n\r]+)", text)
    if m:
        chap_num = int(m.group(1))
        chap_title = m.group(2).strip()
        # Find print pagebreak if present
        pb = re.search(r"\(Print pagebreak\s+(\d+)\)", text)
        print_page = int(pb.group(1)) if pb else None
        
        # Keep the earliest page where CHAPTER X appears if multiple
        if chap_num not in chapters_table:
            chapters_table[chap_num] = {
                "chapter": chap_num,
                "title": chap_title,
                "pdf_start_page": p + 1,
                "print_start_page": print_page
            }

sorted_chaps = [chapters_table[k] for k in sorted(chapters_table.keys())]

# Calculate end pages
for i in range(len(sorted_chaps)):
    current = sorted_chaps[i]
    if i + 1 < len(sorted_chaps):
        next_chap = sorted_chaps[i + 1]
        current["pdf_end_page"] = next_chap["pdf_start_page"] - 1
    else:
        current["pdf_end_page"] = len(doc)
    current["page_count"] = current["pdf_end_page"] - current["pdf_start_page"] + 1

with open("content/chapters_index.json", "w", encoding="utf-8") as f:
    json.dump(sorted_chaps, f, indent=2, ensure_ascii=False)

print("\n" + "="*85)
print(f"{'Capítulo':<10} | {'PDF Págs':<14} | {'Cant. Págs':<10} | {'Título'}")
print("="*85)
for ch in sorted_chaps:
    p_range = f"{ch['pdf_start_page']}-{ch['pdf_end_page']}"
    print(f"Capítulo {ch['chapter']:<2} | {p_range:<14} | {ch['page_count']:<10} | {ch['title']}")
print("="*85)
