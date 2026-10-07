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

# CHAPTER 01: General Principles (Expand to 8)
ch01_new = [
  {
    "id": "ch01-005",
    "chapter": "General Principles of Neurologic Localization",
    "section": "Motor Examination & Reflexes",
    "page": 12,
    "vignette": "A 45-year-old construction worker presents with progressive weakness in his right arm. Examination reveals profound muscle atrophy in the biceps and brachioradialis, prominent fasciculations, absent biceps and brachioradialis reflexes, but normal sensation and no spasticity.",
    "question": "Which combination of findings defines this clinical presentation?",
    "options": [
      "Lower motor neuron lesion characterized by flaccidity, fasciculations, and hyporeflexia",
      "Upper motor neuron lesion characterized by spasticity, hyperreflexia, and clonus",
      "Neuromuscular junction disorder with fatigable ptosis and normal bulk",
      "Primary myopathy with symmetrical proximal weakness and preserved reflexes"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Lower motor neuron (LMN) lesions disrupt alpha motor neurons in the anterior horn or peripheral nerve, causing flaccid weakness, muscle wasting, fasciculations, and loss of tendon jerks.",
      "distractors": [
        "Upper motor neuron lesions produce spastic hypertonia, hyperreflexia, and extensor plantar responses (Babinski sign).",
        "Neuromuscular junction disorders produce fatigable weakness without fasciculations or early atrophy.",
        "Myopathies present with symmetric proximal limb weakness with preserved deep tendon reflexes until late stages."
      ],
      "key_point": "Muscle atrophy, visible fasciculations, and absent tendon jerks are pathognomonic hallmarks of a lower motor neuron lesion."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch01-006",
    "chapter": "General Principles of Neurologic Localization",
    "section": "Reflex Topodiagnosis",
    "page": 18,
    "vignette": "A 58-year-old woman is evaluated for leg weakness. Tapping the right patellar tendon elicits a brisk quadriceps contraction followed by three beats of clonus, while plantar stimulation produces great toe extension and fanning of other toes.",
    "question": "Where is the lesion definitively localized relative to the lumbar motor neurons?",
    "options": [
      "Above the L2–L4 spinal segments interrupting the descending corticospinal tract",
      "At the L3–L4 anterior horn cells causing localized anterior motor neuron injury",
      "Within the femoral nerve trunk causing mixed sensory-motor denervation",
      "In the posterior columns sparing the descending motor pathways"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Hyperreflexia, clonus, and a positive Babinski sign are classic upper motor neuron (UMN) signs indicating disruption of descending corticospinal fibers rostral to the segmental reflex arc (L2–L4).",
      "distractors": [
        "Anterior horn cell lesions produce lower motor neuron signs (hyporeflexia, flaccidity), not hyperreflexia or Babinski.",
        "Femoral nerve lesions diminish the patellar reflex (areflexia) and never cause extensor plantar responses.",
        "Posterior column lesions cause sensory ataxia and loss of vibration/proprioception, leaving plantar responses flexor."
      ],
      "key_point": "A positive Babinski sign combined with patellar hyperreflexia and clonus confirms a corticospinal (UMN) tract lesion above the L2–L4 spinal level."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch01-007",
    "chapter": "General Principles of Neurologic Localization",
    "section": "Sensory Dissociation",
    "page": 24,
    "vignette": "A 34-year-old woman notes that while showering, hot water feels cool on her left leg and trunk up to the level of the umbilicus (T10). Pinprick sensation is severely impaired in the same distribution, but vibration and joint position sense remain completely intact bilaterally.",
    "question": "Which tract is selectively damaged and where does it decussate?",
    "options": [
      "Spinothalamic tract, which decussates 1 to 2 segments above its spinal entry level in the anterior white commissure",
      "Dorsal columns (fasciculus gracilis), which decussate in the medulla as internal arcuate fibers",
      "Corticospinal tract, which decussates at the cervicomedullary junction into the lateral column",
      "Spinocerebellar tract, which enters the cerebellum via the restiform body without thalamic projection"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The spinothalamic tract transmits pain and temperature; its second-order axons cross in the anterior white commissure 1–2 segments rostral to entry. A contralateral loss of pain/temperature indicates damage to this anterolateral tract.",
      "distractors": [
        "The dorsal columns transmit vibration and joint position sense and ascend uncrossed in the cord until the medullary nuclei.",
        "The lateral corticospinal tract is a descending motor pathway and does not mediate cutaneous thermoanalgesia.",
        "The spinocerebellar tracts carry unconscious proprioception to the cerebellum and do not cause conscious sensory loss."
      ],
      "key_point": "Dissociated sensory loss (loss of pain/temperature with preserved vibration/proprioception) reflects selective anterolateral spinothalamic tract impairment."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch01-008",
    "chapter": "General Principles of Neurologic Localization",
    "section": "Cortical vs Subcortical Signs",
    "page": 28,
    "vignette": "A 67-year-old man has acute right hemiparesis and right hemianesthesia. Neurologic exam reveals right homonymous hemianopia, expressive nonfluent aphasia, and impaired gaze preference to the left, but no limb ataxia.",
    "question": "Which feature most reliably confirms a cerebral cortical localization rather than an internal capsule lacunar infarct?",
    "options": [
      "Presence of aphasia and conjugate gaze preference toward the lesion",
      "Dense pure motor hemiparesis equally affecting face, arm, and leg",
      "Preservation of pupillary light reflexes and extraocular range on doll's head maneuver",
      "Hyperreflexia in the paretic limbs with extensor plantar response"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Higher cortical cognitive deficits (aphasia, apraxia, agnosia, neglect) and cortical gaze deviation toward the damaged hemisphere localize the lesion to the cerebral cortex, ruling out deep pure subcortical capsular lacunes.",
      "distractors": [
        "Dense hemiparesis equally affecting face, arm, and leg (pure motor stroke) is the classic hallmark of internal capsule lacunar infarction.",
        "Preserved pupillary reflexes and positive oculocephalic reflexes merely exclude midbrain or pontine brainstem lesions.",
        "Hyperreflexia and extensor plantar responses occur in both cortical and subcortical upper motor neuron injuries."
      ],
      "key_point": "Cortical 'neighborhood signs' such as aphasia, neglect, and apraxia definitively distinguish hemispheric cortical strokes from deep subcortical lacunar syndromes."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

# CHAPTER 02: Peripheral Nerves (Expand to 10)
ch02_new = [
  {
    "id": "ch02-006",
    "chapter": "Peripheral Nerves",
    "section": "Radial Nerve Neuropathies",
    "page": 44,
    "vignette": "A 28-year-old man awakens after a deep alcohol-induced sleep with his arm draped over a hard chair. He cannot extend his wrist or fingers, causing prominent wrist drop. The brachioradialis reflex is absent, and he has numbness over the first dorsal web space, but his triceps strength and triceps reflex are completely normal.",
    "question": "Where is the radial nerve compressed?",
    "options": [
      "Spiral (radial) groove of the humerus, distal to the branch to the triceps",
      "Axilla, proximal to the radial nerve branch to the triceps muscle",
      "Supinator muscle canal (arcade of Frohse) affecting the posterior interosseous nerve",
      "Anatomic snuffbox affecting the superficial sensory radial nerve branch"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Compression at the humeral spiral groove ('Saturday night palsy') spares the triceps branch (which arises proximally in the axilla) but paralyses the brachioradialis, wrist extensors, and finger extensors, with numbness over the dorsal first web space.",
      "distractors": [
        "Axillary compression (e.g. crutch palsy) affects the triceps, causing inability to extend the elbow with loss of the triceps jerk.",
        "Posterior interosseous nerve compression at the arcade of Frohse causes finger drop without sensory deficit or brachioradialis weakness.",
        "Superficial radial sensory entrapment (cheiralgia paresthetica) produces isolated sensory symptoms without any motor weakness."
      ],
      "key_point": "Radial neuropathy at the spiral groove causes wrist and finger drop with brachioradialis weakness, but uniquely spares triceps extension."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch02-007",
    "chapter": "Peripheral Nerves",
    "section": "Ulnar Nerve Neuropathies",
    "page": 52,
    "vignette": "A 54-year-old cyclist reports tingling and numbness in his right little finger and medial half of the ring finger. Examination shows weakness of the abductor digiti minimi and first dorsal interosseous, with a positive Froment sign. Sensation over the dorsal medial aspect of the hand is completely normal, and sensation over the hypothenar palm is also normal.",
    "question": "Where is the ulnar nerve lesion located?",
    "options": [
      "Deep palmar motor branch of the ulnar nerve in Guyon canal (Zone II)",
      "Retrocondylar groove of the elbow behind the medial epicondyle",
      "Cubital tunnel beneath the aponeurotic arch of flexor carpi ulnaris",
      "Lower trunk of the brachial plexus in the scalene triangle"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The deep motor branch in Guyon canal spares the dorsal cutaneous branch (which branches in the forearm) and the palmar sensory branch, producing motor weakness of intrinsic hand muscles without dorsal hand sensory loss.",
      "distractors": [
        "Elbow lesions at the retrocondylar groove or cubital tunnel cause sensory loss over the dorsal medial hand due to involvement of the dorsal ulnar cutaneous nerve.",
        "Cubital tunnel syndrome typically presents with sensory symptoms in the medial hand and flexor carpi ulnaris involvement.",
        "Lower trunk brachial plexopathy causes weakness of all C8-T1 muscles (including median-innervated thenar muscles) and Horner syndrome."
      ],
      "key_point": "Normal sensation over the dorsal medial hand rules out an elbow ulnar neuropathy, localizing the lesion to Guyon's canal at the wrist."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch02-008",
    "chapter": "Peripheral Nerves",
    "section": "Fibular (Peroneal) Neuropathies",
    "page": 63,
    "vignette": "A 42-year-old woman presents with acute right foot drop after wearing tight leg casts. Examination shows weak foot dorsiflexion (tibialis anterior 1/5) and foot eversion (peroneus longus 2/5). However, foot inversion (tibialis posterior) and ankle jerk reflex are completely normal.",
    "question": "Which localization is confirmed by the preservation of foot inversion?",
    "options": [
      "Common fibular (peroneal) nerve at the fibular head",
      "L5 nerve root radiculopathy",
      "Sciatic nerve trunk in the piriformis canal",
      "Tibial nerve in the popliteal fossa"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The tibialis posterior muscle (foot inversion) is innervated by the tibial nerve (L5). A common fibular neuropathy impairs dorsiflexion and eversion but spares inversion. An L5 radiculopathy impairs both dorsiflexion AND inversion.",
      "distractors": [
        "L5 radiculopathy causes weakness of both foot dorsiflexion and foot inversion (tibialis posterior), distinguishing it from fibular neuropathy.",
        "Sciatic nerve trunk injury affects both fibular and tibial branches, causing weak inversion and impaired ankle jerk.",
        "Tibial nerve injury paralyzes plantar flexion and inversion, leaving dorsiflexion intact."
      ],
      "key_point": "Preserved foot inversion (tibialis posterior) is the cardinal clinical sign distinguishing a common fibular nerve lesion from an L5 radiculopathy."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch02-009",
    "chapter": "Peripheral Nerves",
    "section": "Lateral Femoral Cutaneous Nerve",
    "page": 71,
    "vignette": "A 48-year-old obese police officer wearing a heavy duty belt reports burning dysesthesias and numbness over the anterolateral right thigh. Sensory testing reveals hypoesthesia strictly limited to the lateral thigh, with normal quadriceps strength and normal patellar reflex.",
    "question": "What is the diagnosis?",
    "options": [
      "Meralgia paresthetica (entrapment of the lateral femoral cutaneous nerve under the inguinal ligament)",
      "Femoral neuropathy caused by retroperitoneal hematoma",
      "L2–L3 radiculopathy from disc herniation",
      "Obturator neuropathy compressed in the obturator canal"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The lateral femoral cutaneous nerve (L2–L3) is a purely sensory nerve. Entrapment under the inguinal ligament (meralgia paresthetica) produces burning pain over the anterolateral thigh with completely normal motor exam and knee jerk.",
      "distractors": [
        "Femoral neuropathy causes quadriceps weakness, thigh wasting, and an absent patellar reflex.",
        "L2-L3 radiculopathy involves motor weakness (hip flexion/knee extension) and dermatomal pain radiating across the anterior thigh.",
        "Obturator neuropathy causes pain and weakness in the medial thigh adductors, not the lateral thigh."
      ],
      "key_point": "Meralgia paresthetica is a pure sensory syndrome of the anterolateral thigh with strictly normal motor power and preserved patellar reflex."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch02-010",
    "chapter": "Peripheral Nerves",
    "section": "Median Nerve: Anterior Interosseous Syndrome",
    "page": 40,
    "vignette": "A 32-year-old violinist presents with difficulty writing and buttoning shirts. On examination, when asked to make an 'OK' sign with thumb and index finger, she forms a pinch sign with extended distal phalanges ('pad-to-pad' instead of 'tip-to-tip'). Sensation across the entire hand is completely intact.",
    "question": "Which nerve branch is selectively compromised?",
    "options": [
      "Anterior interosseous nerve (Kiloh-Nevin syndrome)",
      "Recurrent thenar motor branch of the median nerve at the flexor retinaculum",
      "Main trunk of the median nerve within the carpal tunnel",
      "Deep motor branch of the ulnar nerve at the hook of hamate"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The anterior interosseous nerve (AIN) is a purely motor branch of the median nerve supplying the flexor pollicis longus (FPL), flexor digitorum profundus (FDP) I & II, and pronator quadratus. Inability to flex the distal thumb and index phalanges prevents a round 'OK' sign, with no sensory loss.",
      "distractors": [
        "The recurrent motor branch supplies the abductor pollicis brevis, opponens pollicis, and superficial FPB; its lesion weakens thumb abduction, not distal flexion.",
        "Carpal tunnel syndrome causes paresthesias in the thumb, index, and middle fingers with sensory loss over the lateral palm.",
        "Deep ulnar motor branch paralysis impairs the first dorsal interosseous and adductor pollicis, causing a positive Froment sign, not an abnormal 'OK' pinch."
      ],
      "key_point": "Anterior interosseous neuropathy (Kiloh-Nevin syndrome) produces pure motor failure of FPL and FDP index, collapsing the 'OK' sign into a flat pinch without sensory loss."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

# CHAPTER 03: Plexuses (Expand to 8)
ch03_new = [
  {
    "id": "ch03-004",
    "chapter": "Cervical, Brachial, & Lumbosacral Plexuses",
    "section": "Upper Brachial Trunk Lesions",
    "page": 88,
    "vignette": "A neonate born via complicated breech delivery with shoulder dystocia presents with a right arm adducted at the shoulder, internally rotated, elbow extended, and forearm pronated ('waiter's tip' posture). The Moro and biceps reflexes are absent on that side.",
    "question": "Which roots and trunk of the brachial plexus are injured?",
    "options": [
      "C5 and C6 roots (Upper trunk of brachial plexus — Erb-Duchenne palsy)",
      "C8 and T1 roots (Lower trunk of brachial plexus — Klumpke palsy)",
      "Middle trunk (C7 root) causing isolated triceps and extensor paralysis",
      "Posterior cord injury affecting radial and axillary nerves"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Traction on the neck during delivery ruptures or stretches the upper trunk (C5–C6), paralyzing the deltoid, supraspinatus/infraspinatus, biceps, and brachioradialis, yielding the classic 'waiter's tip' posture.",
      "distractors": [
        "Lower trunk (C8–T1) Klumpke palsy involves intrinsic hand muscles with a claw hand and often an ipsilateral Horner syndrome.",
        "Middle trunk (C7) lesions selectively impair triceps and forearm extensors without the classic Erb posture.",
        "Posterior cord lesions cause axillary (deltoid) and radial weakness but spare biceps and supraspinatus."
      ],
      "key_point": "Erb-Duchenne palsy involves C5–C6 (upper trunk), producing the 'waiter's tip' deformity with adducted, internally rotated shoulder and extended, pronated elbow."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch03-005",
    "chapter": "Cervical, Brachial, & Lumbosacral Plexuses",
    "section": "Lower Brachial Trunk Lesions",
    "page": 91,
    "vignette": "A 56-year-old woman with a history of apical lung carcinoma presents with progressive left hand weakness, severe pain along the medial forearm, and clawing of the fingers. Examination reveals partial ptosis and miosis of the left eye with anhidrosis of the left face.",
    "question": "Which plexus structure is compromised to explain both the claw hand and Horner syndrome?",
    "options": [
      "Lower trunk of the brachial plexus (C8–T1) in contact with the cervical sympathetic chain (Pancoast tumor)",
      "Upper trunk of the brachial plexus (C5–C6) compressing the suprascapular nerve",
      "Lateral cord of the brachial plexus anterior to the axillary artery",
      "Posterior cord of the brachial plexus within the axilla"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Pancoast tumors invade the lower trunk of the brachial plexus (C8–T1) and the adjacent stellate ganglion, producing total intrinsic hand weakness (claw hand) and an ipsilateral Horner syndrome.",
      "distractors": [
        "Upper trunk lesions spare intrinsic hand muscles and do not cause Horner syndrome.",
        "The lateral cord gives rise to the musculocutaneous and lateral median roots and does not cause a claw hand or Horner syndrome.",
        "Posterior cord lesions involve radial, axillary, and thoracodorsal nerves, leaving autonomic sympathetic fibers unaffected."
      ],
      "key_point": "Lower trunk brachial plexopathy combined with Horner syndrome is pathognomonic of an apical superior sulcus (Pancoast) lesion."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch03-006",
    "chapter": "Cervical, Brachial, & Lumbosacral Plexuses",
    "section": "Lumbosacral Plexopathy",
    "page": 96,
    "vignette": "A 62-year-old diabetic man develops sudden excruciating deep aching pain in his right anterior thigh, followed days later by marked weakness in hip flexion (iliopsoas 2/5), knee extension (quadriceps 2/5), and hip adduction (adductor longus 2/5). His patellar reflex is absent.",
    "question": "Why does weakness of the hip adductors confirm a lumbar plexopathy rather than an isolated femoral neuropathy?",
    "options": [
      "Adductor longus is innervated by the obturator nerve (L2–L4), which originates from the lumbar plexus alongside the femoral nerve",
      "Adductor longus is innervated by the superior gluteal nerve arising from the sacral plexus",
      "Femoral nerve directly innervates all medial thigh adductors in the femoral triangle",
      "Adductors are supplied exclusively by the sciatic nerve trunk"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The obturator nerve (L2–L4) innervates the adductor group. Because the femoral nerve does not innervate the adductors, weakness of both quadriceps (femoral) and adductors (obturator) proves a proximal lumbar plexus lesion.",
      "distractors": [
        "The superior gluteal nerve innervates gluteus medius and minimus (hip abductors), not the adductor longus.",
        "The femoral nerve innervates the quadriceps, sartorius, and pectineus, not the main adductor mass.",
        "The sciatic nerve innervates the hamstrings and muscles below the knee."
      ],
      "key_point": "Weakness of hip adductors (obturator nerve) combined with quadriceps weakness (femoral nerve) definitively localizes the lesion to the lumbar plexus."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch03-007",
    "chapter": "Cervical, Brachial, & Lumbosacral Plexuses",
    "section": "Neuralgic Amyotrophy",
    "page": 93,
    "vignette": "A 35-year-old marathon runner experiences acute, severe, relentless burning pain in the right shoulder and periscapular region. Two weeks later, as the pain subsides, he develops marked scapular winging and profound weakness in shoulder abduction.",
    "question": "What is the diagnosis?",
    "options": [
      "Parsonage-Turner syndrome (acute idiopathic brachial plexopathy / neuralgic amyotrophy)",
      "C5 cervical disc herniation with acute motor radiculopathy",
      "Rotator cuff tear with secondary subacromial bursitis",
      "Thoracic outlet syndrome with subclavius entrapment"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "Parsonage-Turner syndrome (neuralgic amyotrophy) is characterized by acute severe unilateral shoulder pain lasting days to weeks, rapidly followed by patchy multifocal muscle weakness and amyotrophy (often involving long thoracic or suprascapular nerves).",
      "distractors": [
        "C5 radiculopathy causes pain radiating along the lateral arm, not severe periscapular burning followed by patchy serratus/deltoid paralysis.",
        "Rotator cuff tears cause mechanical pain with movement, not severe unprovoked neuropathic pain followed by scapular winging.",
        "Thoracic outlet syndrome causes chronic aching and numbness along the ulnar border of the forearm and hand (C8-T1)."
      ],
      "key_point": "Severe unprovoked shoulder pain that resolves only to give way to severe patchy weakness and wasting is the classic biphasic signature of Parsonage-Turner syndrome."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  },
  {
    "id": "ch03-008",
    "chapter": "Cervical, Brachial, & Lumbosacral Plexuses",
    "section": "Cervical Plexus",
    "page": 84,
    "vignette": "Following a carotid endarterectomy, a 68-year-old man notes numbness over his angle of the jaw and earlobe. Neurological exam reveals preserved facial nerve motor function, but sensory loss over the skin of the parotid region, mastoid process, and lower pinna.",
    "question": "Which branch of the cervical plexus was traumatized?",
    "options": [
      "Great auricular nerve (C2–C3)",
      "Transverse cervical nerve (C2–C3)",
      "Lesser occipital nerve (C2)",
      "Supraclavicular nerves (C3–C4)"
    ],
    "correct": 0,
    "explanation": {
      "why_correct": "The great auricular nerve (C2–C3) curves around the posterior border of the sternocleidomastoid muscle to supply sensation to the lower earlobe, angle of the mandible, and parotid area; it is vulnerable during carotid surgery.",
      "distractors": [
        "The transverse cervical nerve innervates the anterior triangle of the neck.",
        "The lesser occipital nerve supplies the scalp behind and superior to the ear.",
        "The supraclavicular nerves supply the skin over the clavicle and upper chest down to the second rib."
      ],
      "key_point": "Sensory loss over the angle of the jaw and lower pinna following carotid surgery reflects injury to the great auricular nerve (cervical plexus C2–C3)."
    },
    "figure": None,
    "status": "approved",
    "confidence": "high"
  }
]

add_questions_to_chapter("chapter01.json", ch01_new)
add_questions_to_chapter("chapter02.json", ch02_new)
add_questions_to_chapter("chapter03.json", ch03_new)
