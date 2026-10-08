# Brazis Neuro Trainer — System Status & Architectural Overview

> **Target Audience:** AI Overviewer / System Auditor / Technical Pair  
> **Repository:** `sepreciadolo/brazis-neuro-trainer`  
> **Clinical Domain:** Clinical Neuro-Localization for Neurology Residents  
> **Source Material:** *Localization in Clinical Neurology* (Brazis, Masdeu & Biller, 8th Edition)  
> **Status Date:** October 2026  
> **Build Status:** Builds cleanly (`tsc -b && vite build`, 4 Vitest tests passing). **Content is AI-checked, not reviewed by the owner**: 400 questions (314 `ai_checked` with a book-verified `source_quote`, 86 `draft`), none `approved`; every atlas/diagram/matrix/digest asset is `unverified` in `content/sources.json`. See sections 8 and 9.

---

## 1. Executive Summary & Vision

**Brazis Neuro Trainer** is a specialized, mobile-first progressive web application (PWA) designed specifically for a neurology resident to achieve instinctive, board-level mastery of neuro-localization. Unlike generic flashcard applications (e.g. Anki), it integrates:

1. **Step-by-Step Clinical Deduction** (Gates & Brazis Rule of 4 Engine).
2. **Interactive Neuro-Atlas** with dynamic lesion overlays on authentic textbook myelin-stained plates and high-res vector SVGs.
3. **Clinical Decision Trees** rendered as interactive vector flowcharts with pan, zoom, and export.
4. **Side-by-Side Syndrome Matrices** distinguishing neighboring brainstem vascular insults.
5. **FSRS-5 Spaced Repetition Algorithm** (`ts-fsrs`) backed by zero-dependency client-side IndexedDB.
6. **Full 23-Chapter Curriculum Coverage** based on the entirety of Brazis 8th Edition.

---

## 2. Technical Stack & Architectural Guarantees

| Layer | Technology | Rationale & Constraints |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript (Strict Mode) | Predictable typing, zero `any`, component encapsulation |
| **Bundler & Tooling** | Vite 8 + Tailwind CSS v4 | Sub-second HMR, modern CSS nesting, dark-mode custom variants |
| **PWA & Offline** | `vite-plugin-pwa` (Workbox) | Offline-first Service Worker precaching 117 assets (15 MB budget) |
| **Spaced Repetition** | `ts-fsrs` (v5.4.2) | Modern Free Spaced Repetition Scheduler (replaces archaic SM-2) |
| **Local Persistence** | IndexedDB via `idb` (v8) | No backend, no accounts, zero telemetry, 100% offline privacy |
| **Vector Flowcharts** | `mermaid` (v12) | Isolated staging container rendering with custom clinical themes |
| **Testing** | Vitest | Deterministic test runs for FSRS mathematical state & logic |
| **Extraction Engine** | Python 3 + PyMuPDF (`fitz`) | High-fidelity PDF book extraction in `/scripts` |

---

## 3. Directory Layout & File Organization

```
/
├── AGENTS.md                  # Core project charter, rules, contract & tech stack
├── status.md                  # Comprehensive architectural overview (this file)
├── .gitignore                 # Protects copyrighted book assets & private data
├── /source                    # Original Brazis PDF (git-ignored, read-only)
├── /scripts                   # Extraction, generation & validation utilities
│   ├── extract_chapter15_content.py # PyMuPDF extractor (only chapter 15 was extracted)
│   ├── build_batch*.py, expand_chapters_part*.py, generate_*.py # question content written inside scripts
│   ├── sync_chapters_to_app.py # copies content/approved + sources.json into app/src/data
│   ├── migrate_to_verification_schema.py # one-off: set every question to draft, add source_quote/external_source
│   ├── validate_questions.py  # question contract validator (errors + warnings)
│   └── validate_sources.py    # asset registry validator
├── /figures                   # Extracted textbook plates + figures.json index (fig01/fig02 swapped, see section 8)
├── /content
│   ├── sources.json           # Registry of non-question assets and their verification status
│   ├── /extracted             # Extracted chapter Markdown text with page numbers (chapter 15 only)
│   ├── /drafts                # AI-generated question candidate drafts (chapter 15)
│   └── /approved              # Question files bundled in the app (folder name kept; statuses are draft until reviewed)
└── /app                       # The React PWA
    ├── public/
    │   ├── atlas/             # Wikimedia Commons high-res vector SVGs
    │   └── figures/           # Brazis textbook figures (PNG)
    ├── src/
    │   ├── App.tsx            # Main application orchestrator & theme provider
    │   ├── index.css          # Tailwind v4 theme, custom dark variant, animations
    │   ├── types.ts           # Central TypeScript contracts (Questions, FSRS, etc.)
    │   ├── db/                # IndexedDB schema, migrations, backup/restore
    │   ├── fsrs/              # Free Spaced Repetition Scheduling logic & stats
    │   ├── data/chapters/     # 23 chapters of approved questions & index registry
    │   ├── components/
    │   │   ├── Header.tsx     # Navigation header with dark/light mode toggle
    │   │   ├── BottomNavBar.tsx # 6-tab persistent mobile navigation bar
    │   │   ├── BrainstemCrossSectionViewer.tsx # 4-mode Atlas with hotspot overlay
    │   │   ├── MermaidMaker.tsx # Clinical decision tree selector & viewer
    │   │   ├── MermaidRenderer.tsx # Robust staging-isolated Mermaid renderer
    │   │   ├── ClinicalDeductionAssistant.tsx # Gates Rule of 4 interactive solver
    │   │   ├── SyndromeDifferentialMatrix.tsx # Comparative matrix for 12 syndromes
    │   │   └── ChapterSummaryView.tsx # Resident digests for all 23 chapters
    │   └── views/
    │       ├── HomeView.tsx    # Chapter cards, mastery progress, FSRS counters
    │       ├── StudyView.tsx   # Board-style vignette question screen
    │       └── SettingsView.tsx # Backup JSON export/import & bad-question audit
    └── vite.config.ts         # PWA manifest, Workbox 15MB cache limit configuration
```

---

## 4. Key Features & Clinical Perks

### A. The 4-Mode Interactive Brainstem Atlas (`BrainstemCrossSectionViewer.tsx`)
1. **Mode 1: Authentic Brazis Book Plates with Interactive Layer (`viewMode = 'plates'`)**
   - High-fidelity scans from the book (`Figure 15-2` Medulla, `Figure 15-3` Medullary strokes, `Figure 15-4` Caudal Pons, `Figure 15-6` Midbrain syndromic fascicles, `Figure 15-5` Collicular mesencephalon).
   - **Targeting Beacon & Reticle:** Clicking any structure in the inspector activates an animated pulsing radar ripple (`animate-ping`) and reticle on top of the textbook figure. **Known defect:** the pin coordinates were estimated by the AI and do not land on the structures they name (see section 8).
   - **Floating Callout Card:** Displays structure name, anatomical zone, and high-yield clinical deficit teaser directly over the scan.
   - **Interactive Hotspot Pins:** Resident can tap pins directly on the figure or toggle all pins visible/hidden for self-testing.
   - **Syndrome Lesion Overlays:** Selecting a stroke syndrome (e.g. Weber, Benedikt, Wallenberg) illuminates all lesioned structures with glowing amber/crimson markers.
2. **Mode 2: Wikimedia Commons Vector SVGs (`viewMode = 'vector'`)**
   - Clean, scalable vector plates (`medulla_middle.svg`, `pons_inferior.svg`, `midbrain_cn3.svg`) from Wikimedia Commons.
3. **Mode 3: Dynamic Stroke Simulator (`viewMode = 'lesion_sim'`)**
   - Hand-drawn schematic cross-sections (not traced from any book figure). Only Wallenberg and Dejerine have a dedicated lesion polygon; the other syndromes highlight structures on the schematic.
   - Vascular territory selector (ASA, PICA, AICA, Basilar Paramedian, PCA); the structure-to-artery mapping was written by the AI and is unverified.
4. **Mode 4: 3D Interactive Canvas (`viewMode = '3d'`)**
   - Decorative canvas drawing of midbrain, pons, and medulla with a draggable rotation and slicing plane. It is not an anatomical model and has no source.

### B. Clinical Decision Engine & Flowcharts (`MermaidMaker.tsx`)
- Renders 6 comprehensive clinical decision algorithms:
  1. `Rule of 4 Master Decision Tree` (Cranial nerves + Long tracts)
  2. `Diplopia & Horizontal Gaze Localizer` (PPRF vs VI nucleus vs fascicle vs MLF)
  3. `Acute Vertigo & HINTS Localizer` (PICA vs AICA vs Vestibular neuritis)
  4. `Vertebrobasilar Arterial Hierarchy` (ASA, PICA, AICA, Basilar, SCA, PCA)
  5. `Midbrain CN III Fascicular Differential` (Weber vs Benedikt vs Claude vs Parinaud)
  6. `Brainstem Sensory Dissociation Pathways` (Lemniscal vs Spinothalamic)
- Pan, zoom (40% to 350%), fullscreen modal, and vector SVG export.

### C. Rule of 4 Deduction Assistant (`ClinicalDeductionAssistant.tsx`)
- Interactive Gates/Brazis Rule of 4 clinical engine:
  - **Rule 1 (The 4 midline 'M' structures):** Motor pathway (CST), Medial lemniscus, Medial longitudinal fasciculus (MLF), Motor cranial nuclei (3, 4, 6, 12).
  - **Rule 2 (The 4 lateral 'S' structures):** Spinothalamic tract, Spinocerebellar tract, Sympathetic pathway, Sensory trigeminal nucleus (V).
  - **Rule 3 (The 4 cranial nerves per level):** Midbrain (3–4), Pons (5–8), Medulla (9–12).
  - **Rule 4 (The 4 medial cranial nerves):** Divide evenly into 12 (3, 4, 6, 12).
- Automatically deduces exact axial level, medial vs lateral zone, culprit vessel, and pathognomonic clinical pearls.

### D. Full 23-Chapter Curriculum & Spaced Repetition
- All 23 chapters from Brazis 8th Edition are bundled into `app/src/data/chapters/`:
  - **400 board-style vignette questions** (14–22 per chapter): 188 original + 212 new. 314 are `ai_checked` (quote proven to exist in the extracted book text, page computed from the quote); 86 are `draft` (partial, unverifiable or contradicted by the book; see `content/audit/chapterNN_findings.md`). None is `approved`.
  - Answer positions are balanced (the original 160/188 option-0 bias was removed by reordering options only).
- Spaced repetition powered by `ts-fsrs` with 4 feedback buttons (*Again, Hard, Good, Easy*).
- Mastery percentage calculation and review due badges on Home screen.

### E. Resident Chapter Digests (`ChapterSummaryView.tsx`)
- Dropdown selector lists all 23 chapters, but digests exist only for chapters 1–5 and 15. Chapters 6–14 and 16–23 show an empty card (known bug, to fix).
- Summary, Core Functional Anatomy, Localization Rules and Board Traps. Page references come from the AI and are unverified; only chapter 15 has extracted text to check them against.

---

## 5. Technical Issues Solved & Engineering Notes

### 1. Mermaid Runtime DOM Collision (`Cannot read properties of null (reading 'firstChild')`)
- **Root Cause:** In React 19, rapid effect re-renders or theme switches triggered cleanup routines (`document.querySelectorAll('[id^="dmermaid-svg-"]').remove()`) while Mermaid's asynchronous layout calculation (`getBBox`) was still executing. When Mermaid attempted to read `container.firstChild`, it hit `null`.
- **Solution:** Configured `MermaidRenderer.tsx` with an isolated, dedicated staging element ref (`<div ref={stagingRef} />`) passed as the 3rd argument to `mermaid.render(id, chart, stagingRef.current)`. Removed all destructive DOM queries and added a sequential token (`renderSeqRef`) to discard stale promises safely.

### 2. PWA Workbox Precache File Size Limit
- **Root Cause:** High-resolution Wikimedia Commons SVG vector maps and textbook plates exceeded Vite PWA's default 2 MiB precache threshold, failing the build.
- **Solution:** Updated `app/vite.config.ts` to set `maximumFileSizeToCacheInBytes: 15 * 1024 * 1024` (15 MB), allowing all 117 assets (22.5 MB) to be precached into the offline Service Worker cache without errors.

### 3. Playwright Subagent Browser Driver CDN Issue (Local Windows Environment)
- **Root Cause:** When running autonomous browser subagents in this Windows environment, Playwright attempted to download driver version 1.57.0 from Azure/Akamai CDNs (`playwright-1.57.0-win32_x64.zip`) which returned HTTP 404 from upstream.
- **Impact:** Only affects automated headless browser recording via the IDE tool; **does not affect** the Vite dev server (`http://localhost:5173/`), production builds, or real browser execution by the user.

### 4. Language & Aesthetic Consistency
- **Rule Enforced:** 100% of the UI, question vignettes, rationales, buttons, and badges are in English.
- **Dark/Light Mode:** Implemented with Tailwind v4 `@custom-variant dark` without hardcoded dark background classes, seamlessly adapting between Day and Night modes.

---

## 6. Verification & Health Summary

```bash
# 1. TypeCheck & Production Bundler
$ npm run build
> tsc -b && vite build
✓ built in 1.29s
PWA v2.0.0 (mode generateSW, precache 117 entries: 22,505 KiB)
Result: 0 errors, 0 warnings

# 2. Automated Test Suite
$ npx vitest run
✓ src/fsrs/__tests__/fsrs.test.ts (4 tests passed)
Result: 100% passing

# 3. Active Local Dev Server
Port: http://localhost:5173/
Task: task-269 (Daemon running)
```

---

## 7. Next Recommended Milestones

Follow the roadmap in `AGENTS.md` section 11, in order:

1. **Verification layer (step 2):** schema, `content/sources.json`, Unverified badges, in-app review tool. *(done; waiting for the owner's confirmation)*
2. **Chapter-by-chapter quality pass (step 3):** extract the 22 missing chapters, re-check every question against extracted text with a real `source_quote`, fix or discard, expand to 10–15, correct answer-position bias, fix swapped figures and atlas pin coordinates.
3. **Tests (step 4), private deployment (step 5), then new features (step 6).**

## 8. Verification Layer & Known Issues (audit, October 2026)

**In the app:** Settings > Content Verification shows the counts and opens the **Review Tool** (one item at a time: Approve, Flag, Discard, note; filters by chapter and decision; export as JSON). Decisions are stored in IndexedDB (v2, store `reviews`), included in the backup file (version 2; version 1 backups still import) and override the file status in the UI. Discarded questions leave the study sets. "Reset Study Progress" does not delete review decisions. `npm test` runs 13 Vitest tests.

**Files:** `content/sources.json` (57 non-question assets, all `unverified`), `scripts/validate_questions.py` (question contract), `scripts/validate_sources.py` (asset registry), `scripts/migrate_to_verification_schema.py` (one-off migration that set every question to `draft`). Only the user can set `approved` (via the in-app review tool).

**Known issues found by the audit (not yet fixed):**
- ~~Atlas pins~~ **Fixed** (October 2026): pins are now percentages of the picture itself, read from the labelled structures; unlabelled structures are no longer pinned. ~~Swapped `ch15-fig01/02`~~ **Fixed**: files swapped to match `figures.json`.
- ~~Midbrain vascular map / Benedikt, Marie-Foix, Claude and locked-in wording~~ **Fixed** (see section 9, "Midbrain and pontine text correction").
- The HINTS flowchart is external knowledge cited under Brazis pages; the Rule of 4 is Gates' rule (Intern Med J 2005;35:263-266, Brazis ref. 77), not a Brazis original.
- Wikimedia SVGs: only `midbrain_cn3` has a recorded author/licence (Jmarchn, CC BY-SA 3.0); the other five have none and the false "Henry Gray / Dufendach" label was removed. Three of the six files are not used by the app.
- ~~Chapter-summary screen empty for 17 chapters~~ **Fixed** (see section 10). Chapters 1–14 and 16–23 now have verified digests; chapter 15 keeps its older interactive digest (unverified).
- Page labels in `content/extracted` can be off by one (the same book page appears on adjacent PDF pages); check against the printed page in `/source`.

## 9. Quality pass (roadmap step 3, October 2026)

- Chapter text for all 23 chapters is in `content/extracted/` with exact printed-page labels (`scripts/extract_chapters.py`).
- Each chapter was audited by a separate AI agent (`content/audit/chapterNN_review.json`, report in `chapterNN_findings.md`). Only `scripts/apply_audit.py` changed the question files: it accepts a `source_quote` only if it appears in the book text and computes `page` from it. `python scripts/validate_questions.py --check-quotes` re-proves every quote at any time.
- `ai_checked` means the quote supports the marked answer. It does **not** mean the question is clinically good: that is the owner's review.
- Questions the book contradicts (ch02-003, ch02-007, ch13-004, ch15-015, ch22-002, ch22-006) and nine near-duplicate questions were set to `discarded` in October 2026 on the owner's instruction; reasons in `content/audit/discard_log.md`. Nothing was deleted. Current status counts: 307 `ai_checked`, 78 `draft`, 15 `discarded`, 0 `approved`.
- Midbrain and pontine text correction (October 2026, done on the owner's instruction, checked against `content/extracted/chapter15_brainstem.md` and `chapter08_...md`): the vascular map now follows Brazis p. 452 (peduncular arteries supply the medial peduncles and tegmentum including oculomotor nucleus, red nucleus and substantia nigra; thalamoperforating arteries supply the thalamus; quadrigeminal arteries supply the colliculi). Benedikt, Claude, Marie-Foix and locked-in were rewritten to the book's wording; page citations for the midbrain syndromes were corrected to pp. 452-453. Note: Brazis Ch. 8 (p. 214) DOES mention choreiform movements for Benedikt and cerebellar outflow tremor for Claude, so the earlier "chorea is not in the book" finding was incomplete. The assets `vascular/midbrain` and `syndromes/benedikt|claude|marie_foix|locked_in` are now `ai_checked` (never `approved`).
- Still open: digests for 17 chapters, Wikimedia licences, figures for chapters other than 15. Unsourced "absent / spared" statements and some structure-card text elsewhere in the atlas (e.g. substantia nigra deficit, medial lemniscus supply in the midbrain) remain unverified.

## 10. Sprint of October 2026 (autonomous, on the owner's instruction)

- **Atlas pins:** hotspot coordinates are now percentages of the picture itself and were read from the labelled structures of each book figure; unlabelled structures are no longer pinned. `ch15-fig01/02` PNGs swapped to match `figures.json`.
- **Questions:** 6 book-contradicted and 9 duplicate questions set to `discarded` (`content/audit/discard_log.md`). Counts: 307 `ai_checked`, 78 `draft`, 15 `discarded`, 0 `approved`.
- **Verified chapter digests:** `content/summaries/chapterNN.json` (written by AI agents) -> `scripts/apply_summaries.py` keeps only items whose quote is verbatim in the chapter text and computes the page -> `app/src/data/summaries.json` -> Summary screen shows `[p. N]` per point. `scripts/register_summaries.py` registers them as `ai_checked` in `content/sources.json`. Chapters 1-14 and 16-23 are done (22 digests); chapter 15 keeps the interactive digest, which is still unverified. The old unverified digests of chapters 1-5 remain in the code only as a fallback.
- **Review tool:** new "file status" filter (AI-checked / Draft / Discarded).
- **Tests:** `src/data/__tests__/content.test.ts` (question contract, figure files, atlas data, red nucleus territory, digest items). 29 tests in total. No UI (DOM) tests: that needs jsdom and Testing Library, and AGENTS.md says to ask before adding libraries.
- **Book errata:** `content/audit/book_errata.md` lists passages that look wrong in the book itself (e.g. Ch. 7 p. 171 upper/lower field swap; Ch. 19 pp. 529-530 GPe/GPi). Nothing was changed because of them.
- **Not done:** offline check by hand, private deployment (roadmap step 5), figures for chapters other than 15, remaining unsourced statements in atlas structure cards.
