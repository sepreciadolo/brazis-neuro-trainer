import os
import shutil
import json

CHAPTERS_DIR = "app/src/data/chapters"
APPROVED_DIR = "content/approved"

os.makedirs(CHAPTERS_DIR, exist_ok=True)

# Copy all approved json files to app/src/data/chapters
chapter_files = sorted([f for f in os.listdir(APPROVED_DIR) if f.startswith("chapter") and f.endswith(".json")])

chapters_meta_raw = [
  {"num": 1, "id": "Principles", "file": "chapter01.json", "title": "General Principles of Neurologic Localization", "pages": "1–30", "desc": "Upper vs Lower motor neuron, cortical vs subcortical signs, and diagnostic patterns."},
  {"num": 2, "id": "Peripheral Nerves", "file": "chapter02.json", "title": "Peripheral Nerves", "pages": "31–82", "desc": "Median, ulnar, radial, fibular, and femoral entrapment neuropathies and differentiations."},
  {"num": 3, "id": "Plexuses", "file": "chapter03.json", "title": "Cervical, Brachial, & Lumbosacral Plexuses", "pages": "83–100", "desc": "Erb-Duchenne, Klumpke, Parsonage-Turner, thoracic outlet, and lumbosacral plexopathies."},
  {"num": 4, "id": "Spinal Roots", "file": "chapter04.json", "title": "Spinal Nerve and Root", "pages": "101–110", "desc": "Cervical and lumbosacral radiculopathies; conus medullaris vs cauda equina."},
  {"num": 5, "id": "Spinal Cord", "file": "chapter05.json", "title": "Spinal Cord", "pages": "111–140", "desc": "Brown-Séquard, anterior spinal artery, central cord, subacute combined degeneration, and myelopathies."},
  {"num": 6, "id": "CN I (Olfactory)", "file": "chapter06.json", "title": "Cranial Nerve I (Olfactory Nerve)", "pages": "141–150", "desc": "Foster Kennedy syndrome, olfactory groove tumors, and Kallmann syndrome."},
  {"num": 7, "id": "Visual Pathways", "file": "chapter07.json", "title": "Visual Pathways", "pages": "151–196", "desc": "Optic chiasm, Meyer loop vs Baum loop, occipital stroke with macular sparing, and visual agnosias."},
  {"num": 8, "id": "Ocular Motor", "file": "chapter08.json", "title": "The Ocular Motor System (CN III, IV, VI)", "pages": "197–352", "desc": "Pupil-sparing diabetic CN III, Bielschowsky head tilt CN IV, and internuclear ophthalmoplegia."},
  {"num": 9, "id": "CN V (Trigeminal)", "file": "chapter09.json", "title": "Cranial Nerve V (Trigeminal Nerve)", "pages": "353–368", "desc": "Nuclear division, cavernous sinus vs superior orbital fissure, and facial dissociated sensory loss."},
  {"num": 10, "id": "CN VII (Facial)", "file": "chapter10.json", "title": "Cranial Nerve VII (Facial Nerve)", "pages": "369–390", "desc": "UMN vs LMN facial palsy, topodiagnosis, petrous temporal course, and hyperacusis."},
  {"num": 11, "id": "CN VIII (Vestibulocochlear)", "file": "chapter11.json", "title": "Cranial Nerve VIII (Vestibulocochlear)", "pages": "391–410", "desc": "CPA vestibular schwannoma, BPPV Dix-Hallpike mechanics, and central vs peripheral nystagmus."},
  {"num": 12, "id": "CN IX & X", "file": "chapter12.json", "title": "Cranial Nerves IX and X (Glossopharyngeal & Vagus)", "pages": "411–418", "desc": "Jugular foramen (Vernet syndrome), nucleus ambiguus vocal cord palsies, and gag reflex anatomy."},
  {"num": 13, "id": "CN XI (Accessory)", "file": "chapter13.json", "title": "Cranial Nerve XI (Spinal Accessory Nerve)", "pages": "419–428", "desc": "Posterior cervical triangle biopsy injuries, trapezius vs SCM localization, and scapular winging."},
  {"num": 14, "id": "CN XII (Hypoglossal)", "file": "chapter14.json", "title": "Cranial Nerve XII (Hypoglossal Nerve)", "pages": "429–438", "desc": "Tapia syndrome, hypoglossal canal lesions, tongue deviation, and lower motor neuron fasciculations."},
  {"num": 15, "id": "Brainstem", "file": "chapter15.json", "title": "Brainstem (Midbrain, Pons, Medulla)", "pages": "439–460", "desc": "Wallenberg, Dejerine, Millard-Gubler, Foville, Raymond, Weber, Benedikt, and Claude syndromes."},
  {"num": 16, "id": "Cerebellum", "file": "chapter16.json", "title": "The Cerebellum", "pages": "461–478", "desc": "Anterior vermis degeneration vs hemispheric dysmetria; cerebellar peduncles and ataxia circuits."},
  {"num": 17, "id": "Hypothalamus", "file": "chapter17.json", "title": "Hypothalamus & Neuroendocrine System", "pages": "479–500", "desc": "Central diabetes insipidus, Wernicke encephalopathy, and neuroendocrine hypothalamic nuclei."},
  {"num": 18, "id": "Thalamus", "file": "chapter18.json", "title": "Thalamus", "pages": "501–528", "desc": "Déjerine-Roussy VPL/VPM thalamic pain syndrome and artery of Percheron bilateral infarctions."},
  {"num": 19, "id": "Basal Ganglia", "file": "chapter19.json", "title": "Basal Ganglia", "pages": "529–568", "desc": "Hemiballismus subthalamic nucleus, Huntington indirect pathway, and movement disorder circuits."},
  {"num": 20, "id": "Cerebral Cortex", "file": "chapter20.json", "title": "Cerebral Cortex", "pages": "569–640", "desc": "Gerstmann angular gyrus syndrome, Bálint parieto-occipital syndrome, and higher cortical functions."},
  {"num": 21, "id": "Autonomic Nervous System", "file": "chapter21.json", "title": "Autonomic Nervous System", "pages": "641–652", "desc": "First vs second vs third order Horner syndrome pharmacologic localization and autonomic failure."},
  {"num": 22, "id": "Vascular Syndromes", "file": "chapter22.json", "title": "Vascular Syndromes", "pages": "653–688", "desc": "ACA paracentral lobule leg weakness and ACA-MCA watershed \\\"man-in-a-barrel\\\" borderzone infarction."},
  {"num": 23, "id": "Coma & Herniation", "file": "chapter23.json", "title": "Localization of Lesions Causing Coma", "pages": "689–720", "desc": "Uncal herniation, central transtentorial deterioration, and Kernohan notch false-localizing signs."}
]

imports_lines = []
registry_entries = []
meta_entries = []

total_q_count = 0

for item in chapters_meta_raw:
    src_json = os.path.join(APPROVED_DIR, item["file"])
    dst_json = os.path.join(CHAPTERS_DIR, item["file"])
    shutil.copy(src_json, dst_json)
    
    with open(src_json, "r", encoding="utf-8") as f:
        data = json.load(f)
        q_count = len(data)
        total_q_count += q_count
    
    var_name = f"chapter{item['num']:02d}Data"
    imports_lines.append(f"import {var_name} from './{item['file']}'")
    registry_entries.append(f"  '{item['id']}': {var_name} as Question[],")
    desc_str = json.dumps(item['desc'])
    meta_entries.append(f"""  {{
    id: '{item['id']}',
    chapterNumber: {item['num']},
    title: '{item['title']}',
    description: {desc_str},
    totalQuestions: {var_name}.length,
    pdfPages: '{item['pages']}'
  }},""")

index_ts_content = f"""import type {{ Question, ChapterMeta }} from '../../types'
{chr(10).join(imports_lines)}

export const CHAPTERS_REGISTRY: Record<string, Question[]> = {{
{chr(10).join(registry_entries)}
}}

export const CHAPTERS_META: ChapterMeta[] = [
{chr(10).join(meta_entries)}
]

export function getAllQuestions(): Question[] {{
  const all: Question[] = []
  for (const questions of Object.values(CHAPTERS_REGISTRY)) {{
    all.push(...questions)
  }}
  return all
}}

export function getQuestionsByChapter(chapter: string): Question[] {{
  return CHAPTERS_REGISTRY[chapter] || []
}}

export function getQuestionById(id: string): Question | undefined {{
  return getAllQuestions().find(q => q.id === id)
}}
"""

with open(os.path.join(CHAPTERS_DIR, "index.ts"), "w", encoding="utf-8") as f:
    f.write(index_ts_content)

# Copy the asset registry so the app can show Unverified badges.
shutil.copy("content/sources.json", os.path.join("app", "src", "data", "sources.json"))

print(f"Successfully synced all 23 chapters into the app! Total questions: {total_q_count}")
