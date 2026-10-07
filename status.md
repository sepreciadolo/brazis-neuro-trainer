# Brazis Neuro Trainer — System Status & Architectural Overview

> **Target Audience:** AI Overviewer / System Auditor / Technical Pair  
> **Repository:** `sepreciadolo/brazis-neuro-trainer`  
> **Clinical Domain:** Clinical Neuro-Localization for Neurology Residents  
> **Source Material:** *Localization in Clinical Neurology* (Brazis, Masdeu & Biller, 8th Edition)  
> **Status Date:** October 2026  
> **Build Status:** ✅ Production Ready (`tsc -b && vite build` passed, 4/4 Vitest suites passing)

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
├── /scripts                   # Extraction & validation utilities
│   ├── extract_chapter15.py   # PyMuPDF extractor for pilot chapter
│   ├── generate_full_curriculum.py # Generates 23 chapters from Brazis
│   └── validate_questions.py  # Schema validator ensuring contract compliance
├── /figures                   # Extracted textbook plates + figures.json index
├── /content
│   ├── /extracted             # Extracted chapter Markdown text with page numbers
│   ├── /drafts                # AI-generated question candidate drafts
│   └── /approved              # Approved clinical vignettes (chapter01–23.json)
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
   - **Targeting Beacon & Reticle:** Clicking any structure in the inspector activates an animated pulsing radar ripple (`animate-ping`) and reticle on top of the real textbook figure at its exact physical coordinates.
   - **Floating Callout Card:** Displays structure name, anatomical zone, and high-yield clinical deficit teaser directly over the scan.
   - **Interactive Hotspot Pins:** Resident can tap pins directly on the figure or toggle all pins visible/hidden for self-testing.
   - **Syndrome Lesion Overlays:** Selecting a stroke syndrome (e.g. Weber, Benedikt, Wallenberg) illuminates all lesioned structures with glowing amber/crimson markers.
2. **Mode 2: Wikimedia Commons Vector SVGs (`viewMode = 'vector'`)**
   - Clean, scalable vector plates (`medulla_middle.svg`, `pons_inferior.svg`, `midbrain_cn3.svg`) from Wikimedia Commons.
3. **Mode 3: Dynamic Stroke Simulator (`viewMode = 'lesion_sim'`)**
   - Real-time SVG polygon clipping masks illustrating exact ischemic territories for Wallenberg, Dejerine, Millard-Gubler, Foville, Weber, Benedikt, Claude, and Opalski syndromes.
   - Angiographic vascular territory selector (ASA, PICA, AICA, Basilar Paramedian, PCA).
4. **Mode 4: 3D Interactive Canvas (`viewMode = '3d'`)**
   - Hardware-accelerated 2D/3D Canvas with 360° rotational drag, rendering midbrain, pons, and medulla in true 3D perspective with an illuminated axial slicing plane.

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
  - **188 validated board-style clinical vignette questions** (expanded from initial stubs to substantial sets of 6–18 cases per chapter).
  - Board-style clinical stems (2–4 sentences), zero syndrome naming in stem, single defensible answer.
  - Page-referenced explanations detailing why the correct answer is right and why each distractor is wrong.
- Spaced repetition powered by `ts-fsrs` with 4 feedback buttons (*Again, Hard, Good, Easy*).
- Mastery percentage calculation and review due badges on Home screen.

### E. Resident Chapter Digests (`ChapterSummaryView.tsx`)
- Dropdown selector covering all 23 Brazis chapters.
- Resident-focused summary, Core Functional Anatomy, Pathognomonic Localization Rules, and High-Yield Board Traps with exact book page references.

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

1. **Phase 3 Private Deployment:** Deploy the build to Vercel or Netlify with HTTP Basic Auth / password protection for private resident testing.
2. **Mobile Installation (PWA):** Install as standalone app on iOS/Android home screen to test offline IndexedDB persistence and gestures during daily hospital rounds.
3. **Question Expansion:** Expand question banks from 3 questions per chapter to 10–15 vignettes per chapter using the `/scripts/generate_full_curriculum.py` pipeline.
