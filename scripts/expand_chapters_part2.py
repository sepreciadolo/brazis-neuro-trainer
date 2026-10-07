import json
import os

APPROVED_DIR = "content/approved"

def add_questions_to_chapter(filename, new_questions):
    path = os.path.join(APPROVED_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        existing = json.load(f)
    
    existing_ids = {q["id"] for q in existing}
    added = 0
    for q in new_questions:
        if q["id"] not in existing_ids:
            existing.append(q)
            added += 1
            existing_ids.add(q["id"])
    
    with open(path, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
    print(f"Added {added} questions to {filename}. Total: {len(existing)}")

# CHAPTER 04: Spinal Roots (Expand to 8)
ch04_new = [
  {
    "id": "ch04-004",
    "chapter": "Spinal Nerve and Root",
    "section": "Cervical Radiculopathy Topodiagnosis",
    "page": 104,
    "vignette": "A 51-year-old accountant has sharp electric pain shooting down his left arm into the middle finger. Neck extension with lateral tilt to the left (Spurling maneuver) reproduces the pain. Examination reveals weak triceps and wrist flexors with a depressed triceps reflex.",
    "question": "Which cervical nerve root is compressed?",
    "options": [
      "C7 nerve root compressed at the C6–C7 neural foramen",
      "C6 nerve root compressed at the C5–C6 neural foramen",
      "C8 nerve root compressed at the C7–T1 neural foramen",
      "C5 nerve root compressed at the C4–C5 neural foramen"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The C7 root exits through the C6–C7 foramen; its compression causes middle finger pain/numbness, triceps weakness, wrist flexor weakness, and diminished triceps tendon reflex.",
      "distractors": [
        "C6 radiculopathy involves the thumb and index finger, biceps/brachioradialis weakness, and an absent brachioradialis reflex.",
        "C8 radiculopathy involves the little finger, intrinsic hand muscle weakness, and finger flexor reflex changes.",
        "C5 radiculopathy involves the lateral shoulder/deltoid with deltoid and supraspinatus weakness."
      ],
      "key_point": "Triceps weakness, diminished triceps reflex, and sensory disturbance radiating to the middle finger localize precisely to the C7 nerve root."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch04-005",
    "chapter": "Spinal Nerve and Root",
    "section": "Lumbosacral Radiculopathy Topodiagnosis",
    "page": 107,
    "vignette": "A 44-year-old runner presents with severe pain radiating down the posterior calf into the lateral foot and sole. Examination reveals weak gastrocnemius (inability to walk on tiptoes), numbness along the lateral fifth toe, and an absent Achilles tendon reflex.",
    "question": "Which lumbosacral root is injured?",
    "options": [
      "S1 nerve root compressed by an L5–S1 disc herniation",
      "L5 nerve root compressed by an L4–L5 disc herniation",
      "L4 nerve root compressed by an L3–L4 disc herniation",
      "S2 nerve root compressed within the sacral canal"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "S1 radiculopathy selectively impairs plantar flexion (gastrocnemius/soleus), sensation along the lateral foot and small toe, and the Achilles (calcaneal) reflex.",
      "distractors": [
        "L5 radiculopathy affects heel walking (extensor hallucis longus/tibialis anterior) with sensation on the great toe and dorsum of foot, sparing the Achilles reflex.",
        "L4 radiculopathy affects knee extension (quadriceps) and diminishes the patellar tendon reflex.",
        "S2 radiculopathy causes pain along the posterior thigh with normal gastrocnemius strength."
      ],
      "key_point": "Inability to walk on toes, absent ankle jerk (Achilles reflex), and lateral foot sensory loss define an S1 radiculopathy."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch04-006",
    "chapter": "Spinal Nerve and Root",
    "section": "Conus Medullaris vs Cauda Equina",
    "page": 109,
    "vignette": "A 60-year-old man presents with sudden urinary retention and fecal incontinence. Neurological exam reveals symmetrical perineal 'saddle' anesthesia, bilateral extensor plantar responses (Babinski signs), and hyperreflexic patellar reflexes, but minimal leg motor weakness and no back pain.",
    "question": "Which feature most strongly confirms a conus medullaris lesion rather than a cauda equina syndrome?",
    "options": [
      "Early, prominent sphincter dysfunction with extensor plantar responses and symmetric saddle anesthesia",
      "Severe asymmetrical radicular pain radiating down both sciatic distributions",
      "Profound flaccid paraparesis with absent knee and ankle reflexes",
      "Gradual progressive unilateral foot drop without bowel involvement"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Conus medullaris lesions affect the terminal spinal cord (sacral segments), causing early, severe sphincter failure, symmetric saddle anesthesia, and upper motor neuron signs (Babinski, hyperreflexia). Cauda equina lesions involve nerve roots, causing asymmetric radicular pain, flaccidity, and areflexia.",
      "distractors": [
        "Severe asymmetric radicular pain is the classic signature of cauda equina syndrome.",
        "Flaccid paraparesis with hyporeflexia indicates lower motor neuron root compromise (cauda equina).",
        "Unilateral foot drop reflects isolated L5 radiculopathy or fibular neuropathy."
      ],
      "key_point": "Early bilateral sphincter paralysis accompanied by extensor plantar responses (UMN signs) identifies a conus medullaris lesion, distinguishing it from cauda equina syndrome."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch04-007",
    "chapter": "Spinal Nerve and Root",
    "section": "L4 Radiculopathy",
    "page": 106,
    "vignette": "A 58-year-old woman complains of pain across the anterior thigh into the medial shin and medial malleolus. Examination shows weakness of the quadriceps and tibialis anterior, with a diminished patellar tendon jerk. Sensation over the first web space is normal.",
    "question": "Which spinal root is involved?",
    "options": [
      "L4 nerve root",
      "L5 nerve root",
      "L3 nerve root",
      "S1 nerve root"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "L4 root supplies sensation to the medial leg and malleolus, innervates the quadriceps and tibialis anterior, and mediates the patellar tendon reflex arc (L2–L4).",
      "distractors": [
        "L5 root innervates extensor hallucis longus and supplies the dorsum of foot/first web space without altering the patellar reflex.",
        "L3 root supplies the mid-anterior thigh and knee without radiating below the knee to the medial malleolus.",
        "S1 root supplies the lateral foot and alters the Achilles reflex."
      ],
      "key_point": "Depressed patellar reflex combined with sensory loss on the medial shin/malleolus localizes to the L4 nerve root."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch04-008",
    "chapter": "Spinal Nerve and Root",
    "section": "Thoracic Radiculopathy",
    "page": 108,
    "vignette": "A 65-year-old diabetic man develops a band-like burning sensation around his chest wall on the right side at the level of the xiphoid process. Light touch and pinprick are hypersensitive in a narrow strip. Motor examination of the limbs is normal.",
    "question": "Which dermatome corresponds to the xiphoid process landmark?",
    "options": [
      "T6 dermatome",
      "T4 dermatome",
      "T10 dermatome",
      "T12 dermatome"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "T6 corresponds to the xiphoid process. (Key clinical landmarks: T4 = nipples, T6 = xiphoid process, T10 = umbilicus, T12 = inguinal crease).",
      "distractors": [
        "T4 corresponds to the nipple line.",
        "T10 corresponds to the umbilicus.",
        "T12 corresponds to the inguinal crease / pubic symphysis boundary."
      ],
      "key_point": "The xiphoid process is the definitive anatomic landmark for the T6 dermatome."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

# CHAPTER 05: Spinal Cord (Expand to 10)
ch05_new = [
  {
    "id": "ch05-005",
    "chapter": "Spinal Cord",
    "section": "Central Cord Syndrome / Syringomyelia",
    "page": 121,
    "vignette": "A 38-year-old mechanic with an Arnold-Chiari malformation reports painless burns on both shoulders and hands. Examination reveals a 'cape-like' suspended sensory loss to pinprick and temperature across C4–T2, with completely preserved touch, vibration, and proprioception.",
    "question": "Which anatomical structure is damaged to produce this dissociated sensory loss?",
    "options": [
      "Anterior white commissure carrying decussating spinothalamic fibers",
      "Dorsal columns (fasciculus cuneatus and gracilis) bilaterally",
      "Posterior horn substantia gelatinosa sparing commissural fibers",
      "Lateral corticospinal tract in the lateral funiculus"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "An expanding central syrinx compresses the anterior white commissure, interrupting crossing spinothalamic fibers bilaterally at those segments while sparing the uncrossed dorsal columns and peripheral tracts, creating a suspended cape-like loss of pain and temperature.",
      "distractors": [
        "Dorsal column lesions impair vibration and joint position sense, leaving pinprick and temperature intact.",
        "Posterior horn lesions produce unilateral, not bilateral symmetric cape-like sensory loss.",
        "Lateral corticospinal tracts convey motor fibers and produce spasticity, not suspended analgesia."
      ],
      "key_point": "A suspended, cape-like bilateral loss of pain and temperature with preserved touch and proprioception indicates anterior white commissure disruption by a central cord lesion (syringomyelia)."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch05-006",
    "chapter": "Spinal Cord",
    "section": "Subacute Combined Degeneration",
    "page": 128,
    "vignette": "A 59-year-old man with pernicious anemia presents with severe sensory ataxia, walking with a wide-based slapping gait that markedly worsens in the dark (positive Romberg sign). Examination shows loss of vibration sense at the iliac crests, bilateral extensor plantar responses, and spastic leg weakness.",
    "question": "Which two spinal cord tracts are simultaneously degenerated in this condition?",
    "options": [
      "Posterior columns (dorsal funiculi) and lateral corticospinal tracts",
      "Anterior spinothalamic tracts and anterior horn motor neurons",
      "Spinocerebellar tracts and anterior white commissure",
      "Lateral spinothalamic tracts and dorsal root entry zones"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Vitamin B12 deficiency (subacute combined degeneration) selectively targets the posterior columns (causing loss of vibration/proprioception and sensory ataxia) and the lateral corticospinal tracts (causing spasticity and Babinski signs).",
      "distractors": [
        "Anterior spinothalamic and anterior horn involvement characterizes anterior spinal artery ischemia, not B12 deficiency.",
        "Spinocerebellar and commissural degeneration does not explain prominent posterior column and corticospinal loss.",
        "Pure spinothalamic tract loss spares dorsal columns and does not produce a positive Romberg sign."
      ],
      "key_point": "Subacute combined degeneration is characterized by the dual degeneration of posterior columns (proprioceptive loss) and lateral corticospinal tracts (spastic paraparesis)."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch05-007",
    "chapter": "Spinal Cord",
    "section": "Tabes Dorsalis",
    "page": 132,
    "vignette": "A 64-year-old man has severe lightning-like pains in his legs and unsteadiness. Examination reveals bilateral Argyll Robertson pupils (small, irregular pupils that accommodate but do not react to light), absent knee and ankle reflexes, total loss of vibration and position sense in the legs, and a positive Romberg sign.",
    "question": "What is the primary site of spinal cord pathology?",
    "options": [
      "Dorsal roots and dorsal columns (neurosyphilitic tabes dorsalis)",
      "Anterior horn cells and anterior roots",
      "Lateral funiculus corticospinal tract",
      "Central periaqueductal gray of the spinal cord"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Tabes dorsalis (tertiary syphilis) involves chronic degeneration of the dorsal sensory roots and posterior columns, resulting in lightning pains, sensory ataxia, areflexia (due to afferent arc disruption), and Argyll Robertson pupils.",
      "distractors": [
        "Anterior horn cell degeneration causes motor weakness and fasciculations (poliomyelitis/ALS), not sensory ataxia.",
        "Corticospinal lesions cause hyperreflexia and Babinski signs, whereas tabes causes hyporeflexia.",
        "Central cord lesions cause dissociated thermoanalgesia, not dorsal column proprioceptive loss."
      ],
      "key_point": "Sensory ataxia with hyporeflexia, lightning pains, and Argyll Robertson pupils localizes to dorsal root and dorsal column degeneration in tabes dorsalis."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch05-008",
    "chapter": "Spinal Cord",
    "section": "Anterior Horn Cell Diseases",
    "page": 135,
    "vignette": "A 52-year-old woman presents with progressive asymmetric hand wasting and widespread muscle twitching. Exam reveals atrophy and fasciculations in the tongue and thenar eminences (LMN signs) alongside hyperactive jaw jerk, 3+ patellar reflexes, and bilateral Babinski signs (UMN signs). Sensation is entirely normal.",
    "question": "Which combination of pathological structures is involved in amyotrophic lateral sclerosis (ALS)?",
    "options": [
      "Anterior horn cells (LMN) and corticospinal tracts (UMN) with total sensory sparing",
      "Posterior columns and spinothalamic tracts with motor sparing",
      "Neuromuscular junction postsynaptic acetylcholine receptors",
      "Peripheral autonomic preganglionic sympathetic chain"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "ALS is the classic motor neuron disease combining lower motor neuron signs (anterior horn cell loss: atrophy, fasciculations) and upper motor neuron signs (corticospinal degeneration: hyperreflexia, Babinski) with complete sparing of sensory and autonomic pathways.",
      "distractors": [
        "Sensory tract involvement rules out ALS and points to conditions like subacute combined degeneration or multiple sclerosis.",
        "Neuromuscular junction postsynaptic receptors are targeted in myasthenia gravis, which does not cause UMN signs or fasciculations.",
        "Autonomic chain involvement occurs in dysautonomias, not motor neuron disease."
      ],
      "key_point": "Coexistence of upper and lower motor neuron signs across the same limb or region without sensory loss is the hallmark of ALS."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch05-009",
    "chapter": "Spinal Cord",
    "section": "Brown-Séquard Syndrome",
    "page": 118,
    "vignette": "A 24-year-old man sustains a stab wound to the right side of his thoracic back. Neurological exam reveals right leg spastic paralysis with right extensor plantar response, loss of vibration sense in the right leg, and complete loss of pain and temperature sensation on the left leg up to T8.",
    "question": "What is the diagnosis and exact cord level?",
    "options": [
      "Right hemicord lesion (Brown-Séquard syndrome) at the T6–T7 level",
      "Left hemicord lesion at the T8 level",
      "Complete cord transection at the T8 level",
      "Central cord syndrome at the T10 level"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Hemicord lesion (Brown-Séquard) produces ipsilateral UMN weakness and dorsal column sensory loss (uncrossed) with contralateral spinothalamic pain/temp loss (crossed 1–2 segments above). A T8 sensory level on the left corresponds to a right hemicord lesion at T6–T7.",
      "distractors": [
        "A left hemicord lesion would cause left leg weakness and right leg analgesia.",
        "Complete transection causes bilateral paraplegia and bilateral anesthesia below the level.",
        "Central cord syndrome causes bilateral suspended dissociated sensory loss, not a crossed hemisyndrome."
      ],
      "key_point": "Brown-Séquard syndrome causes ipsilateral motor and proprioceptive loss with contralateral spinothalamic analgesia starting 1–2 segments below the lesion."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch05-010",
    "chapter": "Spinal Cord",
    "section": "Anterior Spinal Artery Syndrome",
    "page": 124,
    "vignette": "Following thoracoabdominal aortic aneurysm repair, a 71-year-old man develops acute flaccid paraplegia and urinary retention. Neurological exam reveals dense bilateral loss of pain and temperature below the T4 dermatome, but vibration and joint position sense remain completely intact in both legs.",
    "question": "Why are vibration and proprioception preserved in anterior spinal artery infarction?",
    "options": [
      "The posterior columns are supplied independently by the paired posterior spinal arteries",
      "Vibration and proprioception fibers decussate immediately upon spinal entry",
      "The artery of Adamkiewicz perfuses the posterior third of the spinal cord",
      "Posterior column sensory fibers travel through the autonomic sympathetic trunk"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The anterior spinal artery supplies the anterior two-thirds of the spinal cord (corticospinal tracts, spinothalamic tracts, anterior horns). The posterior one-third (dorsal columns) is supplied by the paired posterior spinal arteries, sparing dorsal column modalities.",
      "distractors": [
        "Vibration and proprioception ascend uncrossed in the cord until the medullary gracile and cuneate nuclei.",
        "The artery of Adamkiewicz feeds the anterior spinal artery (anterior two-thirds), not the posterior columns.",
        "Posterior column fibers are somatic sensory pathways that enter via the dorsal roots, not the sympathetic trunk."
      ],
      "key_point": "Anterior spinal artery infarction produces bilateral motor and spinothalamic loss with pathognomonic preservation of posterior column vibration and proprioception."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

# CHAPTER 06: CN I (Expand to 6)
ch06_new = [
  {
    "id": "ch06-003",
    "chapter": "Cranial Nerve I (Olfactory Nerve)",
    "section": "Olfactory Groove Meningioma",
    "page": 145,
    "vignette": "A 62-year-old woman develops progressive bilateral anosmia, apathy, executive dysfunction, and memory decline over two years. Brain MRI reveals a large subfrontal mass arising from the cribriform plate compressing the frontal lobes and olfactory tracts.",
    "question": "What is the typical clinical triad of an olfactory groove meningioma?",
    "options": [
      "Anosmia, visual impairment (optic atrophy/papilledema), and frontal lobe behavioral changes",
      "Bitemporal hemianopia, hyperprolactinemia, and cranial nerve III palsy",
      "Sensorineural hearing loss, facial numbness, and ataxia",
      "Epistaxis, conductive deafness, and Horner syndrome"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Olfactory groove meningiomas compress the olfactory bulbs (anosmia), subfrontal cortex (apathy, disinhibition, urinary incontinence), and eventually the optic nerves/chiasm (visual field deficits and optic atrophy).",
      "distractors": [
        "Bitemporal hemianopia and hyperprolactinemia define pituitary sellar masses, not olfactory groove meningiomas.",
        "Hearing loss, facial numbness, and ataxia characterize cerebellopontine angle vestibular schwannomas.",
        "Epistaxis, conductive deafness, and Horner syndrome define nasopharyngeal carcinoma (Trotter syndrome)."
      ],
      "key_point": "The triad of progressive anosmia, frontal lobe personality change, and optic nerve compression characterizes an olfactory groove meningioma."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch06-004",
    "chapter": "Cranial Nerve I (Olfactory Nerve)",
    "section": "Kallmann Syndrome",
    "page": 148,
    "vignette": "An 18-year-old man is evaluated for failure to enter puberty. He is tall with eunuchoid proportions, small testicles, and lack of secondary sexual characteristics. Neurological examination reveals total lifelong inability to smell (anosmia).",
    "question": "What embryologic defect links anosmia with hypogonadotropic hypogonadism in Kallmann syndrome?",
    "options": [
      "Failure of GnRH-releasing neurons to migrate from the olfactory placode into the hypothalamus",
      "Pituitary stalk transection due to perinatal traction",
      "Primary gonadal failure with secondary olfactory bulb hypoplasia",
      "Bilateral pineal gland dysgenesis disrupting melatonin production"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "In Kallmann syndrome, embryonic GnRH-secreting neuroendocrine cells fail to migrate from the olfactory placode alongside olfactory axons into the hypothalamus, resulting in the dual presentation of anosmia and hypogonadotropic hypogonadism.",
      "distractors": [
        "Pituitary stalk transection causes panhypopituitarism and diabetes insipidus, not isolated hypogonadotropic hypogonadism with congenital anosmia.",
        "Primary gonadal failure (e.g. Klinefelter) causes hypergonadotropic hypogonadism with normal olfaction.",
        "Pineal gland dysgenesis does not disrupt olfactory nerve development."
      ],
      "key_point": "Kallmann syndrome is caused by failed embryonic migration of GnRH neurons from the olfactory placode into the hypothalamus, pairing anosmia with delayed puberty."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch06-005",
    "chapter": "Cranial Nerve I (Olfactory Nerve)",
    "section": "Head Trauma & Anosmia",
    "page": 144,
    "vignette": "A 22-year-old cyclist hits the back of his head on pavement (occipital impact). Several days later, he notes that food tastes completely bland. Testing reveals loss of smell to coffee and vanilla, but normal perception of ammonia and vinegar vapor.",
    "question": "Why is the sensation of ammonia vapor preserved despite complete olfactory nerve avulsion?",
    "options": [
      "Ammonia stimulates free trigeminal (CN V) pain and chemoreceptor endings in the nasal mucosa rather than CN I",
      "Ammonia is detected by taste buds on the posterior third of the tongue (CN IX)",
      "CN I fibers for noxious vapors decussate in the anterior commissure and escape injury",
      "Ammonia is absorbed into the bloodstream stimulating carotid chemoreceptors"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Pungent or noxious chemical irritants (ammonia, vinegar, menthol) stimulate trigeminal (CN V) nociceptive receptors in the nasal mucosa. True olfactory testing requires non-pungent odorants (coffee, cinnamon, cloves, vanilla).",
      "distractors": [
        "Taste buds on the tongue detect sweet, salty, sour, bitter, and umami, not airborne volatile ammonia chemosensation.",
        "CN I fibers do not have a specialized noxious subcomponent that decussates in the anterior commissure.",
        "Carotid body chemoreceptors respond to arterial pO2, pCO2, and pH, not nasal vapor inhalation."
      ],
      "key_point": "Nasal trigeminal chemoreceptors (CN V) perceive noxious pungent vapors like ammonia; true olfactory nerve (CN I) testing requires non-irritating odorants like coffee or vanilla."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch06-006",
    "chapter": "Cranial Nerve I (Olfactory Nerve)",
    "section": "Temporal Lobe Olfactory Aura",
    "page": 149,
    "vignette": "A 45-year-old woman experiences brief recurring episodes where she smells an intense, unpleasant odor of burning rubber followed by lip-smacking automatisms and altered responsiveness lasting two minutes.",
    "question": "Where is the primary cortical epileptogenic zone located?",
    "options": [
      "Mesial temporal lobe (uncus / primary olfactory cortex)",
      "Orbitofrontal neocortex",
      "Insular gustatory cortex",
      "Calcarine visual cortex"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Unpleasant olfactory hallucinations (uncinate fits) arise from epileptic discharges in the uncus of the parahippocampal gyrus (primary olfactory cortex), typically accompanied by mesial temporal automatisms.",
      "distractors": [
        "Orbitofrontal lesions alter secondary olfactory processing and decision making, but do not produce paroxysmal uncinate fits.",
        "Insular cortex discharges produce gustatory sensations (unpleasant tastes) and visceral autonomic auras.",
        "Calcarine cortex discharges produce unformed visual hallucinations (phosphenes)."
      ],
      "key_point": "Paroxysmal phantom foul odors ('uncinate fits') localize seizure onset to the uncus of the medial temporal lobe."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

# CHAPTER 07: Visual Pathways (Expand to 10)
ch07_new = [
  {
    "id": "ch07-004",
    "chapter": "Visual Pathways",
    "section": "Chiasmal Syndromes",
    "page": 164,
    "vignette": "A 46-year-old man reports bumping into doorframes on either side. Automated perimetry reveals complete visual loss in the right temporal field and left temporal field. Visual acuity in both central fields is 20/20.",
    "question": "Which portion of the visual pathway is compressed?",
    "options": [
      "Optic chiasm decussating nasal retinal fibers (bitemporal hemianopia)",
      "Left optic tract carrying temporal fibers of left eye and nasal fibers of right eye",
      "Bilateral Meyer loops in the temporal lobes",
      "Optic nerve junction (junctional scotoma of Traquair)"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The optic chiasm contains crossing nasal retinal fibers (which view the temporal visual fields). Compression (most commonly by a pituitary adenoma) selectively destroys these crossing fibers, causing bitemporal hemianopia.",
      "distractors": [
        "Left optic tract lesions cause a right homonymous hemianopia.",
        "Bilateral Meyer loop lesions produce bilateral superior quadrantanopia ('pie in the sky').",
        "Junctional scotoma produces ipsilateral central scotoma with contralateral superior temporal quadrantanopia."
      ],
      "key_point": "Compression of decussating nasal retinal fibers at the optic chiasm produces classic bitemporal hemianopia."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch07-005",
    "chapter": "Visual Pathways",
    "section": "Temporal vs Parietal Optic Radiations",
    "page": 172,
    "vignette": "A 36-year-old woman undergoing left anterior temporal lobectomy for epilepsy awakens with an asymptomatic visual field deficit. Visual perimetry reveals a dense right superior homonymous quadrantanopia ('pie in the sky').",
    "question": "Which anatomical structure was transected?",
    "options": [
      "Meyer loop (ventral optic radiations looping around the temporal horn of the lateral ventricle)",
      "Baum loop (dorsal optic radiations traversing through the parietal lobe)",
      "Left calcarine cortex below the calcarine fissure (lingual gyrus)",
      "Left lateral geniculate nucleus magnocellular layers"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Meyer loop carries inferior retinal fibers representing the superior contralateral visual field. It loops anteriorly around the temporal horn of the lateral ventricle; temporal resection produces a contralateral superior quadrantanopia ('pie in the sky').",
      "distractors": [
        "Baum loop traverses the parietal lobe and represents the inferior contralateral visual field ('pie on the floor').",
        "Lingual gyrus lesions cause contralateral superior quadrantanopia, but this patient had an anterior temporal lobe resection.",
        "LGN lesions cause homonymous hemianopias with incongruous sectors."
      ],
      "key_point": "Meyer loop travels through the temporal lobe; its injury produces a contralateral superior homonymous quadrantanopia ('pie in the sky')."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch07-006",
    "chapter": "Visual Pathways",
    "section": "Occipital Cortex & Macular Sparing",
    "page": 179,
    "vignette": "A 70-year-old man suffers an acute left posterior cerebral artery (PCA) stroke. Visual field testing reveals a right homonymous hemianopia with 5 degrees of central vision preserved (macular sparing). Visual acuity is 20/20 in both eyes.",
    "question": "What anatomical mechanism accounts for macular sparing in PCA occipital pole infarction?",
    "options": [
      "Dual blood supply to the occipital pole from both the posterior cerebral artery and middle cerebral artery collaterals",
      "Macular fibers decussate in the anterior commissure",
      "The macula is represented exclusively in the frontal eye fields",
      "Collateral supply from the anterior spinal artery to the calcarine fissure"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The occipital pole represents the macula and enjoys dual collateral perfusion from terminal leptomeningeal anastomoses between the posterior cerebral artery (PCA) and the middle cerebral artery (MCA), sparing the foveal representation in pure PCA occlusion.",
      "distractors": [
        "Macular fibers travel through the chiasm and radiations; they do not cross in the anterior commissure.",
        "The frontal eye fields control saccadic conjugate gaze, not visual sensory perception.",
        "The anterior spinal artery supplies the anterior medulla and spinal cord, with no occipital reach."
      ],
      "key_point": "Dual collateral circulation to the occipital pole from both PCA and MCA preserves central vision (macular sparing) in posterior cerebral artery strokes."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch07-007",
    "chapter": "Visual Pathways",
    "section": "Anton Syndrome & Cortical Blindness",
    "page": 184,
    "vignette": "An 82-year-old woman with severe bilateral PCA strokes bumps into walls and furniture. When asked what the examiner is holding, she confabulates elaborate descriptions of nonexistent objects and adamantly denies that she has any visual difficulty.",
    "question": "What is the diagnosis?",
    "options": [
      "Anton syndrome (visual anosognosia associated with bilateral occipital cortical blindness)",
      "Bálint syndrome (optic ataxia, psychic paralysis of gaze, and simultanagnosia)",
      "Charles Bonnet syndrome (vivid visual hallucinations in peripheral visual impairment)",
      "Prosopagnosia (inability to recognize familiar faces)"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Anton syndrome (visual anosognosia) occurs with bilateral striate occipital cortex destruction: the patient is cortically blind but vigorously denies blindness and confabulates visual experiences.",
      "distractors": [
        "Bálint syndrome is caused by bilateral parieto-occipital watershed strokes, producing optic ataxia, ocular apraxia, and simultanagnosia without denial of vision.",
        "Charles Bonnet syndrome occurs in visually impaired individuals who experience vivid hallucinations but possess full insight that they are unreal.",
        "Prosopagnosia is the selective inability to recognize familiar faces caused by bilateral fusiform gyrus lesions."
      ],
      "key_point": "Anton syndrome is cortical blindness coupled with anosognosia (denial of blindness) and confabulation due to bilateral striate cortex destruction."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

# CHAPTER 08: Ocular Motor System (Expand to 12)
ch08_new = [
  {
    "id": "ch08-004",
    "chapter": "The Ocular Motor System (CN III, IV, VI)",
    "section": "Oculomotor Nerve: Pupil-Involving vs Sparing",
    "page": 215,
    "vignette": "A 54-year-old woman presents to the emergency department with a severe sudden headache, complete right ptosis, and a right pupil that is 7 mm and totally unreactive to light. The right eye is deviated down-and-out.",
    "question": "What is the most urgent diagnosis?",
    "options": [
      "Posterior communicating artery (PCom) aneurysm compressing the superficial parasympathetic pupillomotor fibers of CN III",
      "Microvascular diabetic ischemia affecting the central core of CN III",
      "Myasthenia gravis with asymmetric extraocular weakness",
      "Ophthalmoplegic migraine causing transient third nerve palsy"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Parasympathetic pupillomotor fibers run along the outer dorsomedial surface of CN III, making them exquisitely sensitive to external extrinsic compression by an expanding posterior communicating artery aneurysm (pupil-involving third nerve palsy is a neurosurgical emergency).",
      "distractors": [
        "Microvascular diabetic third nerve palsies cause ischemic infarction of the deep central core of the nerve, typically sparing the superficial pial pupillomotor fibers.",
        "Myasthenia gravis never affects pupillary size or pupillary light reflexes.",
        "Ophthalmoplegic neuropathy is rare and a diagnosis of strict exclusion after vascular imaging excludes aneurysm."
      ],
      "key_point": "A painful, pupil-involving third nerve palsy represents extrinsic compression by an expanding posterior communicating artery aneurysm until proven otherwise."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch08-005",
    "chapter": "The Ocular Motor System (CN III, IV, VI)",
    "section": "Trochlear Nerve (CN IV) Topodiagnosis",
    "page": 234,
    "vignette": "A 29-year-old man presents with vertical diplopia that worsens when reading a book or walking downstairs. He tilts his head toward his left shoulder to eliminate the double vision. On examination, right hypertropia worsens on left lateral gaze and increases on right head tilt (Bielschowsky test).",
    "question": "Which cranial nerve is palsied?",
    "options": [
      "Right trochlear nerve (CN IV)",
      "Left trochlear nerve (CN IV)",
      "Right abducens nerve (CN VI)",
      "Left oculomotor nerve (CN III)"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Right CN IV palsy causes right superior oblique paresis (failure of intorsion and depression in adduction). The resulting right hypertropia worsens on adduction (left gaze) and on ipsilateral head tilt (right tilt), which requires compensatory intorsion of the right eye (positive Parks-Bielschowsky 3-step test).",
      "distractors": [
        "Left CN IV palsy causes left hypertropia that worsens on right gaze and left head tilt.",
        "CN VI palsy causes horizontal, not vertical diplopia, worsening on lateral gaze to the paretic side.",
        "CN III palsy causes hypotropia in upgaze and ptosis, not isolated vertical diplopia relieved by head tilt."
      ],
      "key_point": "Vertical diplopia worsening on downgaze in adduction, with hypertropia increasing on ipsilateral head tilt and relieved by contralateral tilt, confirms a trochlear (CN IV) palsy."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch08-006",
    "chapter": "The Ocular Motor System (CN III, IV, VI)",
    "section": "Abducens Nerve & False-Localizing Sign",
    "page": 248,
    "vignette": "A 28-year-old obese woman presents with pulsatile tinnitus, severe morning headaches, transient visual obscurations, and horizontal diplopia on distant gaze. Exam reveals bilateral papilledema and inability of the right eye to abduct beyond midline.",
    "question": "Why is isolated unilateral or bilateral CN VI palsy considered a 'false-localizing sign' in elevated intracranial pressure?",
    "options": [
      "The abducens nerve has the longest subarachnoid course and is compressed against the petrous ridge or Dorello canal by downward brain displacement",
      "Elevated ICP selectively causes thrombosis of the posterior inferior cerebellar artery",
      "The abducens nucleus in the dorsal pons is directly destroyed by CSF hydrocephalus",
      "The abducens nerve is tethered directly to the cribriform plate"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "CN VI has a long subarachnoid path upward along the clivus through Dorello's canal. Downward displacement of the brainstem from generalized high ICP stretches or compresses the nerve against the sharp petroclival ridge, producing an abducens palsy without any focal pontine parenchymal lesion (false-localizing sign).",
      "distractors": [
        "PICA thrombosis causes lateral medullary infarction (Wallenberg), which affects eye movement via vestibular nuclei, not isolated VI palsy.",
        "Generalized ICP does not destroy the pontine nucleus directly without causing coma or dense long tract signs.",
        "CN VI travels along the petrous apex and cavernous sinus; it has no anatomical contact with the cribriform plate (CN I)."
      ],
      "key_point": "Abducens nerve palsy in high intracranial pressure is a classic false-localizing sign due to mechanical stretching along its long intracranial course through Dorello canal."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch08-007",
    "chapter": "The Ocular Motor System (CN III, IV, VI)",
    "section": "Internuclear Ophthalmoplegia (INO)",
    "page": 262,
    "vignette": "A 31-year-old woman with multiple sclerosis presents with horizontal diplopia on looking to the left. On left lateral gaze, her right eye fails to adduct past the midline, while her left eye abducts fully but displays prominent coarse horizontal nystagmus. Convergence of both eyes to a near target is completely normal.",
    "question": "Where is the anatomical lesion located?",
    "options": [
      "Right medial longitudinal fasciculus (MLF) in the dorsomedial brainstem",
      "Left medial longitudinal fasciculus (MLF)",
      "Right oculomotor nucleus in the midbrain",
      "Left abducens nucleus in the pons"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Internuclear ophthalmoplegia (INO) is named for the side of the adduction deficit. On left gaze, the right eye fails to adduct because the right MLF cannot relay the signal from the left VI nucleus to the right III subnucleus. Normal convergence confirms the right medial rectus muscle and oculomotor nucleus are intact.",
      "distractors": [
        "Left MLF lesion causes an adduction deficit of the left eye on rightward gaze.",
        "Right oculomotor nucleus lesion would abolish convergence and cause ptosis/mydriasis.",
        "Left abducens nucleus lesion causes conjugate left gaze paralysis (neither eye looks left)."
      ],
      "key_point": "Ipsilateral adduction failure with contralateral abducting nystagmus and preserved near convergence defines an internuclear ophthalmoplegia caused by a lesion in the ipsilateral MLF."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch08-008",
    "chapter": "The Ocular Motor System (CN III, IV, VI)",
    "section": "One-and-a-Half Syndrome",
    "page": 270,
    "vignette": "A 63-year-old hypertensive man sustains a dorsal pontine stroke. On ocular examination, on looking to the right, neither eye moves (complete right conjugate gaze palsy). On looking to the left, the right eye cannot adduct, while the left eye abducts with nystagmus. The only horizontal movement present in either eye is abduction of the left eye.",
    "question": "What is the diagnosis and anatomical substrate?",
    "options": [
      "Right one-and-a-half syndrome caused by combined lesion of the right PPRF/VI nucleus and the right MLF",
      "Left one-and-a-half syndrome caused by left MLF and left III nucleus lesion",
      "Bilateral abducens nerve fascicular lesions",
      "Bilateral internuclear ophthalmoplegia sparing conjugate gaze centers"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "One-and-a-half syndrome consists of a conjugate gaze palsy in one direction ('one') plus an INO in the other direction ('a half'). A right dorsal pontine lesion destroying both the right abducens nucleus/PPRF (right gaze palsy) and the adjacent crossing right MLF (adduction failure of right eye on left gaze) leaves only abduction of the contralateral eye.",
      "distractors": [
        "Left one-and-a-half syndrome would abolish left conjugate gaze and right adduction on right gaze.",
        "Bilateral VI fascicle lesions prevent abduction of both eyes, leaving adduction completely intact in both directions.",
        "Bilateral INO spares conjugate abduction in both eyes, whereas this patient has complete paralysis of right conjugate gaze."
      ],
      "key_point": "One-and-a-half syndrome combines a horizontal gaze palsy ('one') with an internuclear ophthalmoplegia ('half'), localizing to the dorsal pontine tegmentum involving the abducens nucleus/PPRF and adjacent MLF."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch08-009",
    "chapter": "The Ocular Motor System (CN III, IV, VI)",
    "section": "Dorsal Midbrain (Parinaud) Syndrome",
    "page": 284,
    "vignette": "A 16-year-old boy with a pineal germinoma presents with headaches. Eye exam reveals inability to look upward on voluntary command or pursuit (upgaze palsy), bilateral pupillary light-near dissociation (pupils constrict to accommodation but not to bright light), convergence-retraction nystagmus on attempted upward saccades, and bilateral eyelid retraction (Collier sign).",
    "question": "What is the eponym and localization for this syndrome?",
    "options": [
      "Parinaud syndrome (dorsal midbrain / pretectal syndrome)",
      "Horner syndrome (ciliospinal sympathetic pathway)",
      "Millard-Gubler syndrome (ventral caudal pons)",
      "Mobius syndrome (congenital VI and VII nuclear hypoplasia)"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Parinaud syndrome (pretectal/dorsal midbrain syndrome) is caused by pineal tumors or tectal compression. It features supranuclear upward gaze paralysis, pupillary light-near dissociation, convergence-retraction nystagmus, and Collier's sign.",
      "distractors": [
        "Horner syndrome causes ptosis and miosis, not upgaze palsy or light-near dissociation.",
        "Millard-Gubler syndrome involves ventral pons (VI and VII peripheral palsy with contralateral hemiplegia).",
        "Mobius syndrome is congenital bilateral facial and abducens paralysis without pineal involvement."
      ],
      "key_point": "The tetrad of supranuclear upgaze palsy, pupillary light-near dissociation, convergence-retraction nystagmus, and Collier sign defines Parinaud dorsal midbrain syndrome."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

add_questions_to_chapter("chapter04.json", ch04_new)
add_questions_to_chapter("chapter05.json", ch05_new)
add_questions_to_chapter("chapter06.json", ch06_new)
add_questions_to_chapter("chapter07.json", ch07_new)
add_questions_to_chapter("chapter08.json", ch08_new)
