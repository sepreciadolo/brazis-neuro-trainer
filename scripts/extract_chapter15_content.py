import fitz
import json
import os
import re

PDF_PATH = "source/Brazis.8ed. Localization in Clinical Neurology.pdf"
START_PAGE = 614  # 1-indexed (PDF page 614)
END_PAGE = 633    # Text ends at page 633, references start at 633/634

os.makedirs("content/extracted", exist_ok=True)
os.makedirs("figures", exist_ok=True)

doc = fitz.open(PDF_PATH)

# --- 1. Extract Figures and build figures.json ---

figure_definitions = [
    {
        "id": "ch15-fig01",
        "fig_number": "15-1",
        "pdf_page": 615,
        "print_page": 441,
        "filename": "ch15-fig01.png",
        "xref": 7925,
        "title": "The brainstem (ventral view)",
        "caption": "FIGURE 15-1. The brainstem (ventral view)."
    },
    {
        "id": "ch15-fig02",
        "fig_number": "15-2",
        "pdf_page": 615,
        "print_page": 441,
        "filename": "ch15-fig02.png",
        "xref": 7926,
        "title": "Midportion of the medulla at the origin of cranial nerves XII and X",
        "caption": "FIGURE 15-2. Midportion of the medulla at the origin of the hypoglossal and vagus nerves. Myelin-stained section is shown on the right."
    },
    {
        "id": "ch15-fig03",
        "fig_number": "15-3",
        "pdf_page": 616,
        "print_page": 442,
        "filename": "ch15-fig03.png",
        "xref": 7929,
        "title": "Cross section of medulla oblongata showing medial and lateral medullary infarction",
        "caption": "FIGURE 15-3. Cross section of medulla oblongata showing area involved in medial medullary infarction and lateral medullary infarction."
    },
    {
        "id": "ch15-fig04",
        "fig_number": "15-4",
        "pdf_page": 623,
        "print_page": 447,
        "filename": "ch15-fig04.png",
        "xref": 8117,
        "title": "Cross section of lower pons at the level of cranial nerves VI and VII",
        "caption": "FIGURE 15-4. Cross section of the lower pons at the level of cranial nerves VI and VII. Myelin-stained section is shown on the right."
    },
    {
        "id": "ch15-fig05",
        "fig_number": "15-5",
        "pdf_page": 629,
        "print_page": 452,
        "filename": "ch15-fig05.png",
        "xref": 8244,
        "title": "Cross section of the mesencephalon (inferior and superior colliculi)",
        "caption": "FIGURE 15-5. Cross section of the mesencephalon. A: Lower mesencephalon at the level of inferior colliculus. B: Upper mesencephalon at the level of superior colliculus."
    },
    {
        "id": "ch15-fig06",
        "fig_number": "15-6",
        "pdf_page": 631,
        "print_page": 453,
        "filename": "ch15-fig06.png",
        "xref": 8254,
        "title": "Diagram through mesencephalon showing oculomotor fascicular syndrome regions",
        "caption": "FIGURE 15-6. Diagram of a section through the mesencephalon showing regions in which the oculomotor nerve fascicles or roots may be affected (Weber, Benedikt, and Claude syndromes)."
    }
]

figures_index = []
for fig in figure_definitions:
    base_image = doc.extract_image(fig["xref"])
    img_bytes = base_image["image"]
    file_path = os.path.join("figures", fig["filename"])
    with open(file_path, "wb") as f:
        f.write(img_bytes)
    
    figures_index.append({
        "id": fig["id"],
        "chapter": "Brainstem",
        "figure_number": fig["fig_number"],
        "file": f"figures/{fig['filename']}",
        "pdf_page": fig["pdf_page"],
        "print_page": fig["print_page"],
        "title": fig["title"],
        "caption": fig["caption"]
    })
    print(f"Extracted {fig['filename']} ({len(img_bytes)} bytes)")

with open("figures/figures.json", "w", encoding="utf-8") as f:
    json.dump(figures_index, f, indent=2, ensure_ascii=False)
print("Saved figures/figures.json")

# --- 2. Extract Structured Markdown Text with Page Numbers ---

md_lines = [
    "# Chapter 15: Brainstem",
    "",
    "> Source: *Localization in Clinical Neurology* (Brazis, 8th Edition)",
    "> Pages: Book pp. 440–456 (PDF pp. 614–633)",
    "",
    "---",
    ""
]

current_print_page = 440

for p_idx in range(START_PAGE - 1, END_PAGE):
    page = doc[p_idx]
    pdf_p = p_idx + 1
    raw_text = page.get_text()
    
    # Check if print pagebreak occurs
    pb_match = re.search(r"\(Print pagebreak\s+(\d+)\)", raw_text)
    if pb_match:
        current_print_page = int(pb_match.group(1))
    
    md_lines.append(f"\n<!-- PDF Page {pdf_p} | Book Page {current_print_page} -->\n")
    md_lines.append(f"### [Page {current_print_page} | PDF {pdf_p}]\n")
    
    # Clean up watermark / headers
    lines = raw_text.split("\n")
    clean_lines = []
    skip_next = False
    
    for line in lines:
        l_str = line.strip()
        if not l_str:
            clean_lines.append("")
            continue
        # Skip watermark lines
        if any(h in l_str for h in [
            "Localization in Clinical Neurology",
            "ISBN: 978-1-9751-6024-1",
            "urosario999",
            "(Print pagebreak"
        ]):
            continue
            
        clean_lines.append(l_str)
        
    md_lines.append("\n".join(clean_lines))

full_markdown = "\n".join(md_lines)
extracted_md_path = "content/extracted/chapter15_brainstem.md"
with open(extracted_md_path, "w", encoding="utf-8") as f:
    f.write(full_markdown)

print(f"Extracted markdown saved to {extracted_md_path} ({len(full_markdown)} characters)")
