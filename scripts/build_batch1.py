import json
import os

BATCH1 = {
  "chapter01": [
    {
      "id": "ch01-001",
      "chapter": "General Principles of Neurologic Localization",
      "section": "Upper vs Lower Motor Neuron",
      "page": 5,
      "vignette": "A 52-year-old man presents with progressive weakness of the right upper extremity. Neurologic examination demonstrates marked spasticity with a pronator catch, hyperactive biceps and triceps reflexes, a positive Hoffmann sign, and an extensor plantar response on the right. Fasciculations and muscle atrophy are absent.",
      "question": "Which motor system localization is indicated by these clinical findings?",
      "options": [
        "Upper motor neuron lesion rostral to C5",
        "Lower motor neuron lesion of the anterior horn cells",
        "Peripheral neuropathy of the radial nerve",
        "Neuromuscular junction transmission defect",
        "Primary myopathic process"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The constellation of spasticity, hyperreflexia, pathological reflexes (Hoffmann sign, extensor plantar response/Babinski), and absence of fasciculations/atrophy represents the hallmark of an Upper Motor Neuron (UMN) lesion. Because the right upper extremity reflexes and tone are increased, the lesion must lie rostral to the C5 cervical motor segments (e.g., motor cortex, internal capsule, brainstem, or high cervical cord).",
        "distractors": [
          "Lower motor neuron lesions produce flaccidity, hyporeflexia, muscle atrophy, and visible fasciculations, not spasticity.",
          "Radial neuropathy produces wrist and finger drop with diminished brachioradialis/triceps reflexes without spasticity or extensor plantar responses.",
          "Neuromuscular junction defects produce fatigable weakness without tone changes or pathological reflexes.",
          "Myopathies cause symmetric proximal weakness with normal or diminished reflexes and no pyramidal signs."
        ],
        "key_point": "Upper motor neuron lesions are characterized by spasticity, hyperreflexia, and pathological reflexes (Babinski, Hoffmann) without denervation atrophy."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch01-002",
      "chapter": "General Principles of Neurologic Localization",
      "section": "Pattern Recognition in Neurologic Disease",
      "page": 12,
      "vignette": "A 64-year-old woman presents with acute-onset right facial droop, slurred speech, and right arm weakness. Sensory examination reveals intact primary modalities (light touch, pinprick, vibration), but the patient cannot identify a key placed in her right hand with eyes closed (astereognosis) and fails to identify numbers drawn on her right palm (agraphästhesia). Language testing reveals fluent paraphasic speech with impaired comprehension.",
      "question": "Which neuroanatomic level accounts for cortical sensory loss coupled with language dysfunction?",
      "options": [
        "Left cerebral cortex (perisylvian and anterior parietal cortex)",
        "Left thalamic sensory nuclei (VPL/VPM)",
        "Left posterior limb of the internal capsule",
        "Left basis pontis",
        "Cervical posterior columns"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Cortical sensory loss (astereognosis, agraphesthesia, two-point discrimination deficit) with intact primary sensory modalities indicates dysfunction of the contralateral somatosensory cortex (parietal lobe). Concomitant fluent aphasia with comprehension impairment localizes definitively to the left hemisphere cerebral cortex, as subcortical or brainstem lesions do not produce cortical sensory signs or fluent aphasia.",
        "distractors": [
          "Thalamic lesions impair primary sensory modalities (pinprick, temperature, vibration) rather than isolated discriminative cortical modalities, and do not cause fluent aphasia.",
          "Internal capsule lesions produce dense pure motor or sensorimotor hemiparesis without cortical deficits such as aphasia or astereognosis.",
          "Basis pontis lesions produce crossed cranial nerve deficits or pure motor hemiparesis, sparing language and parietal sensations.",
          "Posterior column spinal cord lesions impair vibration and joint position sense bilaterally or ipsilaterally, without speech or language disturbance."
        ],
        "key_point": "Astereognosis and agraphesthesia in the presence of intact primary sensation localize specifically to the contralateral cerebral cortex."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch01-003",
      "chapter": "General Principles of Neurologic Localization",
      "section": "Brainstem Alternating Syndromes",
      "page": 18,
      "vignette": "A 58-year-old man presents with sudden double vision and left-sided body weakness. Neurologic examination shows a complete right third cranial nerve palsy with ptosis and a dilated, unreactive pupil, accompanied by left-sided spastic hemiparesis affecting the face, arm, and leg.",
      "question": "What classic localization principle is demonstrated by this patient's clinical presentation?",
      "options": [
        "Alternating (crossed) brainstem syndrome localizing the lesion to the ipsilateral midbrain",
        "Cerebral hemispheric cortical stroke with uncal herniation",
        "Cervical spinal cord hemicord lesion (Brown-Séquard syndrome)",
        "Polyradiculopathy affecting cranial nerves and spinal roots",
        "Bilateral internal capsule lacunar infarcts"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "This is the classic prototype of an 'alternating' or 'crossed' brainstem syndrome (Weber syndrome). The cranial nerve deficit (CN III) is ipsilateral to the lesion and marks the rostral-caudal level (midbrain), while the long tract sign (corticospinal hemiplegia) is contralateral because the corticospinal tract decussates lower in the medulla.",
        "distractors": [
          "Cortical strokes do not produce lower motor neuron third cranial nerve palsies; uncal herniation causes depressed consciousness and is preceded by severe intracranial mass effect.",
          "Spinal cord hemicord lesions do not cause cranial nerve III palsy or facial weakness.",
          "Polyradiculopathy causes flaccid areflexic weakness, not spastic pyramidal hemiparesis.",
          "Capsular lacunar strokes produce pure motor hemiparesis without nuclear or fascicular ocular motor cranial nerve palsies."
        ],
        "key_point": "Ipsilateral cranial nerve palsy combined with contralateral long-tract motor or sensory signs is the cardinal hallmark of brainstem localization."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch01-004",
      "chapter": "General Principles of Neurologic Localization",
      "section": "Functional vs Organic Localization",
      "page": 24,
      "vignette": "A 34-year-old woman is evaluated for acute left leg weakness following an emotional dispute. On examination in the supine position, the examiner places a hand under the patient's right heel while asking her to flex the left hip against resistance. Normal involuntary downward pressure is felt under the examiner's right hand. Pinprick sensory testing reveals an abrupt, sharp loss of sensation beginning precisely at the abdominal midline.",
      "question": "Which diagnostic sign and localization interpretation is most accurate?",
      "options": [
        "Positive Hoover sign with midline sensory splitting, indicating non-organic (functional) weakness",
        "Brown-Séquard hemicord syndrome with accurate dermatomal sensory cut-off",
        "Anterior cerebral artery territory infarction with unilateral leg weakness",
        "Conus medullaris compression with asymmetric radiculopathy",
        "Femoral nerve compression neuropathy"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The Hoover sign evaluates involuntary extension of the contralateral hip during voluntary hip flexion of the paretic leg. Normal downward pressure in the opposite heel indicates intact subcortical motor pathways. Midline splitting of sensation precisely at the anatomical sagittal line is non-anatomical because sensory nerve fibers overlap by 1 to 2 cm across the midline.",
        "distractors": [
          "Brown-Séquard syndrome produces contralateral pain/temperature loss starting 1-2 segments below the lesion with preserved ipsilateral pain/temp, never exact midline splitting.",
          "ACA infarction causes true upper motor neuron leg weakness with hyperreflexia and Babinski sign, with negative Hoover sign.",
          "Conus medullaris lesions produce symmetric saddle anesthesia, sphincter dysfunction, and mixed UMN/LMN signs.",
          "Femoral neuropathy causes weakness limited to quadriceps with absent knee jerk and sensory loss over anterior thigh/medial calf."
        ],
        "key_point": "Hoover sign and exact cutaneous midline sensory splitting are reliable clinical indicators of non-organic (functional) neurological deficits."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter02": [
    {
      "id": "ch02-001",
      "chapter": "Peripheral Nerves",
      "section": "Median Nerve Entrapment Syndromes",
      "page": 38,
      "vignette": "A 45-year-old typist reports numbness and tingling in the right thumb, index, and middle fingers that awakens her from sleep. Shaking her hand provides temporary relief. Examination demonstrates weakness and wasting of the abductor pollicis brevis muscle. Tapping over the volar wrist reproduces paresthesias in the radial three-and-a-half digits. Sensation over the thenar eminence is entirely normal.",
      "question": "Why is sensation over the thenar eminence preserved despite severe carpal tunnel syndrome?",
      "options": [
        "The palmar cutaneous branch of the median nerve branches proximal to the flexor retinaculum and passes superficial to the carpal tunnel",
        "The thenar eminence is innervated exclusively by the superficial branch of the radial nerve",
        "The anterior interosseous nerve supplies sensation to the base of the thumb",
        "The recurrent motor branch of the median nerve carries all thenar sensory fibers",
        "Sensory fibers to the thenar eminence are spared within the deepest fascicles of the carpal tunnel"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The palmar cutaneous branch arises from the median nerve approximately 5 cm proximal to the wrist and travels superficial to the flexor retinaculum (transverse carpal ligament). Consequently, it is spared in carpal tunnel compression, preserving sensation over the thenar eminence. Sensory loss extending onto the thenar eminence indicates a more proximal lesion (such as pronator teres syndrome or C6 radiculopathy).",
        "distractors": [
          "The superficial radial nerve supplies the dorsum of the thumb and first web space, not the volar thenar eminence.",
          "The anterior interosseous nerve is a pure motor nerve supplying deep forearm muscles and the wrist joint capsule, with no cutaneous sensory distribution.",
          "The recurrent motor branch supplies thenar muscles (LOAF: Lumbricals 1-2, APB, OP, FPB superficial head) and has no cutaneous sensory innervation.",
          "Thenar sensory fibers do not run inside the carpal tunnel; their sparing is anatomical due to superficial routing."
        ],
        "key_point": "Sparing of thenar eminence sensation differentiates carpal tunnel syndrome from proximal median nerve lesions (pronator syndrome) and C6 radiculopathy."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch02-002",
      "chapter": "Peripheral Nerves",
      "section": "Anterior Interosseous Nerve Syndrome",
      "page": 44,
      "vignette": "A 32-year-old tennis player develops deep proximal forearm pain followed by difficulty pinching small objects. On examination, when asked to make an 'OK' sign with the thumb and index finger, the patient pinches using extended terminal phalanges (pulp-to-pulp contact) rather than flexing the distal interphalangeal joints (tip-to-tip contact). Cutaneous sensory examination across the entire hand and arm is completely normal.",
      "question": "Which nerve and muscles are specifically impaired in this condition?",
      "options": [
        "Anterior interosseous nerve impairing flexor pollicis longus and flexor digitorum profundus to the index finger",
        "Posterior interosseous nerve impairing extensor pollicis longus and extensor digitorum",
        "Recurrent motor branch of the median nerve impairing abductor pollicis brevis",
        "Deep branch of the ulnar nerve impairing first dorsal interosseous and adductor pollicis",
        "Musculocutaneous nerve impairing the brachialis muscle"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The patient exhibits the classic Kiloh-Nevin syndrome (anterior interosseous nerve syndrome). The AIN is a pure motor branch of the median nerve supplying the flexor pollicis longus (flexion of thumb interphalangeal joint), the radial half of the flexor digitorum profundus (flexion of index and middle DIP joints), and the pronator quadratus. Inability to flex the thumb IP and index DIP joints prevents forming a normal tip-to-tip circle, causing the pathognomonic flat pinch ('pulp-to-pulp' pinch) without any sensory loss.",
        "distractors": [
          "Posterior interosseous nerve palsy causes weakness of finger and thumb extension (finger drop), not distal flexion.",
          "Recurrent motor median palsy impairs thumb abduction and opposition, but DIP and IP flexion are preserved.",
          "Deep ulnar nerve lesion produces Froment sign and interosseous weakness, but does not prevent tip-to-tip flexion of the thumb IP and index DIP.",
          "Musculocutaneous nerve innervates biceps and coracobrachialis, with sensory loss along the lateral forearm via the lateral antebrachial cutaneous nerve."
        ],
        "key_point": "Anterior interosseous neuropathy (Kiloh-Nevin) produces failure of the 'OK' sign (pulp-to-pulp pinch) due to weak FPL and radial FDP without sensory loss."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch02-003",
      "chapter": "Peripheral Nerves",
      "section": "Ulnar Nerve Entrapment: Elbow vs Wrist",
      "page": 52,
      "vignette": "A 56-year-old cyclist presents with numbness in the little finger and hypothenar wasting of the right hand. Sensory examination confirms dense sensory loss on the palmar surface of the little finger and hypothenar eminence, but pinprick sensation on the dorsal ulnar aspect of the hand is entirely intact. Motor examination demonstrates weakness of the interossei and adductor pollicis with mild clawing of the fourth and fifth digits, while flexor carpi ulnaris strength is normal.",
      "question": "Where is the ulnar nerve lesion localized?",
      "options": [
        "Ulnar canal at the wrist (Guyon canal)",
        "Cubital tunnel behind the medial epicondyle",
        "Cervical spinal nerve root C8",
        "Medial cord of the brachial plexus",
        "Thoracic outlet with compression by a cervical rib"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The dorsal ulnar cutaneous branch arises 5 to 8 cm proximal to the wrist and travels superficially to innervate the dorsoulnar hand. In lesions at or distal to the wrist within Guyon canal, this dorsal branch is spared, leaving dorsal ulnar hand sensation intact while palmar ulnar sensation is impaired. In contrast, lesions at the elbow (cubital tunnel) produce sensory loss on both the palmar and dorsal surfaces of the ulnar hand and usually weaken the flexor carpi ulnaris and medial flexor digitorum profundus.",
        "distractors": [
          "Cubital tunnel lesions impair sensation on the dorsal ulnar hand because the lesion is proximal to the takeoff of the dorsal cutaneous branch.",
          "C8 radiculopathy produces sensory loss that extends proximally into the medial forearm and impairs C8-innervated median muscles (FPL, APB).",
          "Medial cord lesions involve median-innervated C8-T1 muscles (thenar muscles) and cause medial antebrachial cutaneous sensory loss.",
          "Thoracic outlet syndrome characteristically causes prominent thenar wasting (C8-T1 fibers via median nerve) and medial arm/forearm sensory loss."
        ],
        "key_point": "Sparing of dorsal ulnar hand sensation differentiates ulnar nerve entrapment at Guyon canal (wrist) from cubital tunnel syndrome (elbow)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch02-004",
      "chapter": "Peripheral Nerves",
      "section": "Radial Nerve Lesions: Spiral Groove vs Axilla vs PIN",
      "page": 60,
      "vignette": "A 48-year-old man awakens after falling asleep with his arm draped over the back of a wooden chair following heavy alcohol consumption. He cannot extend his wrist or fingers on the right side. On examination, there is wrist drop and finger drop. The brachioradialis muscle is weak, and there is numbness over the dorsal first web space. However, elbow extension against resistance is completely normal with a brisk, symmetrical triceps reflex.",
      "question": "Where is the radial nerve lesion localized?",
      "options": [
        "Spiral (radial) groove of the humerus",
        "Axilla (proximal to branches to the triceps)",
        "Supinator muscle (arcade of Fröhse) affecting the posterior interosseous nerve",
        "Posterior cord of the brachial plexus",
        "C7 spinal nerve root"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Compression at the spiral groove (Saturday night palsy) damages the radial nerve after the branches to the triceps muscle have already exited in the axilla. Therefore, triceps strength and the triceps reflex are intact, while muscles innervated distally (brachioradialis, extensor carpi radialis longus, and all PIN-innervated extensors) are paralyzed, along with numbness over the superficial radial sensory distribution.",
        "distractors": [
          "Axillary radial compression impairs elbow extension and abolishes the triceps reflex because branches to the triceps arise in the axilla.",
          "Posterior interosseous nerve (PIN) entrapment at the arcade of Fröhse produces pure finger and thumb drop without wrist drop (ECRL is spared) and has zero sensory loss.",
          "Posterior cord plexopathy involves the axillary nerve (deltoid weakness) and thoracodorsal nerve (latissimus dorsi weakness) as well as the triceps.",
          "C7 radiculopathy impairs the triceps reflex and elbow extension, but spares the brachioradialis (C5-C6)."
        ],
        "key_point": "Radial nerve compression at the spiral groove spares the triceps and triceps reflex while causing wrist drop, finger drop, and dorsal web space numbness."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch02-005",
      "chapter": "Peripheral Nerves",
      "section": "Peroneal (Fibular) Neuropathy vs L5 Radiculopathy",
      "page": 71,
      "vignette": "A 62-year-old man who recently lost 15 kg develops a left foot drop. Examination demonstrates marked weakness of ankle dorsiflexion and ankle eversion. Sensation is decreased over the lateral lower leg and dorsum of the foot. Ankle inversion is completely normal, and the patellar and Achilles reflexes are symmetrical and intact.",
      "question": "What anatomical distinction confirms common fibular (peroneal) neuropathy at the fibular head over an L5 radiculopathy?",
      "options": [
        "Preservation of ankle inversion (tibialis posterior muscle innervated by the tibial nerve)",
        "Preservation of ankle eversion (fibularis longus muscle innervated by the superficial fibular nerve)",
        "Absence of sensory loss over the first dorsal web space",
        "Sparing of the extensor hallucis longus muscle",
        "Loss of the Achilles tendon reflex"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The tibialis posterior muscle inverts the foot and is innervated by the tibial nerve (L5). In a common fibular (peroneal) neuropathy at the fibular head, eversion and dorsiflexion are weak, but foot inversion is completely preserved. In an L5 radiculopathy, both the fibular muscles (eversion) AND the tibialis posterior (inversion) are weak. Preserved inversion definitively localizes the foot drop to the fibular nerve.",
        "distractors": [
          "Ankle eversion is weak in fibular neuropathy because the superficial fibular nerve is damaged at the fibular head.",
          "The first web space is supplied by the deep fibular nerve and is typically numb in common fibular neuropathy.",
          "Extensor hallucis longus is innervated by the deep fibular nerve and is profoundly weak in fibular neuropathy.",
          "The Achilles reflex is mediated by S1 via the tibial nerve; it is intact in both fibular neuropathy and L5 radiculopathy."
        ],
        "key_point": "Normal foot inversion (tibialis posterior, tibial nerve) distinguishes common fibular neuropathy at the fibular head from an L5 radiculopathy."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter03": [
    {
      "id": "ch03-001",
      "chapter": "Cervical, Brachial, and Lumbosacral Plexuses",
      "section": "Upper Trunk Brachial Plexopathy",
      "page": 87,
      "vignette": "A 22-year-old motorcyclist suffers a traction injury to his shoulder. On examination, the right upper extremity hangs limply at his side in adduction, internal rotation, and forearm pronation (the 'waiter's tip' position). There is profound weakness of shoulder abduction, external rotation, and elbow flexion. The biceps and brachioradialis reflexes are absent. Sensation is impaired over the lateral shoulder, lateral arm, and radial forearm.",
      "question": "Which portion of the brachial plexus is injured in Erb-Duchenne palsy?",
      "options": [
        "Upper trunk (C5-C6 roots/trunk)",
        "Lower trunk (C8-T1 roots/trunk)",
        "Posterior cord",
        "Medial cord",
        "Lateral cord"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Erb-Duchenne palsy involves the upper trunk of the brachial plexus (C5-C6 ventral rami). Paralysis affects the deltoid and supraspinatus (loss of abduction), infraspinatus and teres minor (loss of external rotation), biceps and brachialis (loss of elbow flexion), and supinator (forearm pronation). Unopposed adductors, internal rotators, and pronators create the classic 'waiter's tip' posture, with sensory loss in C5-C6 dermatomes and lost biceps/brachioradialis reflexes.",
        "distractors": [
          "Lower trunk plexopathy (Klumpke palsy, C8-T1) affects intrinsic hand muscles causing a claw hand, frequently with an associated Horner syndrome.",
          "Posterior cord lesions cause weakness of shoulder abduction (axillary) and elbow/wrist extension (radial), but spare the musculocutaneous-innervated biceps.",
          "Medial cord lesions impair ulnar and medial-median innervated muscles without affecting shoulder abduction or biceps flexion.",
          "Lateral cord lesions impair the musculocutaneous nerve, but spare axillary (deltoid) and suprascapular (supraspinatus/infraspinatus) muscles, which arise directly from the trunk/posterior elements."
        ],
        "key_point": "Upper trunk (Erb-Duchenne, C5-C6) plexopathy produces the 'waiter's tip' limb posture with lost shoulder abduction, external rotation, and elbow flexion."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch03-002",
      "chapter": "Cervical, Brachial, and Lumbosacral Plexuses",
      "section": "Lower Trunk Brachial Plexopathy vs TOS",
      "page": 93,
      "vignette": "A 54-year-old woman with a history of apical lung carcinoma presents with progressive weakness and wasting of all intrinsic muscles of the right hand. Neurologic examination shows a claw hand deformity, marked atrophy of both thenar and hypothenar muscles, and sensory loss along the medial hand, medial forearm, and distal medial arm. In addition, there is mild ptosis and pupillary miosis of the right eye with preserved sweating on the face.",
      "question": "Why does a lower trunk brachial plexopathy frequently produce an associated Horner syndrome?",
      "options": [
        "Preganglionic sympathetic T1 fibers join the lower trunk as they exit the spinal cord through the T1 ventral ramus",
        "The sympathetic trunk runs directly inside the axillary sheath with the posterior cord",
        "The lesion compresses the brainstem hypothalamospinal sympathetic tract",
        "The stellate ganglion is directly innervated by the radial nerve",
        "Microvascular ischemia to the carotid bifurcation sympathetics"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The lower trunk of the brachial plexus is formed by the union of the C8 and T1 ventral rami. Sympathetic preganglionic fibers destined for the head and eye exit the spinal cord in the T1 ventral ramus before ascending to the superior cervical ganglion. Apical thoracic tumors (Pancoast tumor) compressing the lower trunk invariably disrupt these T1 sympathetic fibers, producing an ipsilateral Horner syndrome alongside C8-T1 intrinsic hand wasting.",
        "distractors": [
          "The sympathetic chain lies paravertebrally over the rib necks and apical pleura, not within the distal axillary sheath.",
          "Brainstem hypothalamospinal tract lesions produce Horner syndrome with crossed body analgesia or other central brainstem signs, not isolated hand wasting.",
          "The radial nerve is derived from C5-T1 posterior cord and has no connection with the stellate sympathetic ganglion.",
          "Carotid bifurcation lesions produce third-order postganglionic Horner syndrome, which spares facial sweating but does not cause plexus hand wasting."
        ],
        "key_point": "Lower trunk brachial plexopathy (C8-T1) commonly causes an ipsilateral Horner syndrome because preganglionic sympathetic axons travel in the T1 ventral ramus."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch03-003",
      "chapter": "Cervical, Brachial, and Lumbosacral Plexuses",
      "section": "Neuralgic Amyotrophy (Parsonage-Turner Syndrome)",
      "page": 96,
      "vignette": "A 38-year-old previously healthy man develops excruciating, deep, boring pain in his right shoulder that wakes him from sleep and persists for 5 days. As the pain subsides, he notices that his right scapula protrudes backwards when pushing against a wall. Examination reveals medial winging of the right scapula and profound weakness of the serratus anterior muscle. Sensation is minimally decreased over the lateral shoulder, and the rest of the arm is intact.",
      "question": "What is the diagnosis and anatomical structure predominantly involved?",
      "options": [
        "Neuralgic amyotrophy (Parsonage-Turner syndrome) with long thoracic nerve involvement",
        "C5 cervical radiculopathy due to acute disk herniation",
        "Suprascapular nerve entrapment at the spinoglenoid notch",
        "Spinal accessory nerve (CN XI) injury from lymph node biopsy",
        "Thoracic outlet syndrome"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Neuralgic amyotrophy (brachial amyotrophy / Parsonage-Turner syndrome) is an acute idiopathic/immune-mediated inflammatory plexopathy characterized by sudden severe unrelenting shoulder/arm pain lasting days to weeks, followed rapidly by patchy weakness and denervation atrophy as pain abates. The long thoracic nerve (supplying the serratus anterior, causing medial scapular winging) is the most commonly affected isolated nerve, followed by the anterior interosseous and suprascapular nerves.",
        "distractors": [
          "C5 radiculopathy causes prominent deltoid and biceps weakness with diminished biceps reflex, not isolated medial scapular winging.",
          "Suprascapular nerve entrapment at the spinoglenoid notch causes isolated infraspinatus weakness (external rotation deficit) without scapular winging.",
          "Spinal accessory nerve injury paralyses the trapezius, producing lateral (not medial) scapular winging with downward and outward displacement.",
          "Thoracic outlet syndrome causes chronic progressive thenar wasting and ulnar sensory complaints, not acute nocturnal severe shoulder pain."
        ],
        "key_point": "Parsonage-Turner syndrome presents with acute severe shoulder pain followed by patchy motor weakness, most frequently targeting the long thoracic nerve (medial scapular winging)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter04": [
    {
      "id": "ch04-001",
      "chapter": "Spinal Nerve and Root",
      "section": "Cervical Radiculopathies",
      "page": 105,
      "vignette": "A 49-year-old carpenter presents with shooting pain from his neck down the dorsolateral arm into the middle finger of his right hand. Examination reveals weakness of elbow extension (triceps), wrist flexion (flexor carpi radialis), and finger extension. The triceps tendon reflex is absent on the right. Biceps and brachioradialis reflexes are brisk and equal.",
      "question": "Which cervical nerve root is compressed?",
      "options": [
        "C7 nerve root",
        "C5 nerve root",
        "C6 nerve root",
        "C8 nerve root",
        "T1 nerve root"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "C7 is the most frequently affected cervical nerve root. Its hallmark features are: (1) motor weakness in the triceps (elbow extension), wrist flexors, and finger extensors; (2) absent or depressed triceps tendon reflex; and (3) radicular pain and sensory disturbance radiating down the posterior/dorsal arm and forearm into the middle finger (third digit).",
        "distractors": [
          "C5 radiculopathy impairs shoulder abduction (deltoid) and elbow flexion (biceps), with sensory loss over the lateral shoulder badge area.",
          "C6 radiculopathy causes numbness in the thumb and index finger, weakness in biceps/brachioradialis, and an absent biceps/brachioradialis reflex.",
          "C8 radiculopathy impairs finger flexors and hand intrinsics, produces numbness in the little finger and medial hand, and spares the triceps reflex.",
          "T1 radiculopathy impairs intrinsic hand muscles and causes medial forearm/arm sensory disturbance, without reflex changes."
        ],
        "key_point": "C7 radiculopathy is characterized by weak triceps (elbow extension), absent triceps reflex, and sensory symptoms radiating into the middle finger."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch04-002",
      "chapter": "Spinal Nerve and Root",
      "section": "Lumbosacral Radiculopathies",
      "page": 108,
      "vignette": "A 55-year-old runner develops severe lower back pain radiating down the posterior right thigh and calf into the sole and lateral border of the foot. On examination, he is unable to walk on his toes on the right side. The right Achilles tendon reflex is absent. Sensation to pinprick is diminished over the lateral foot and fifth digit. Knee extension, ankle dorsiflexion, and patellar reflexes are normal.",
      "question": "Which nerve root is compressed by a herniated intervertebral disk?",
      "options": [
        "S1 nerve root (typically via an L5-S1 disk herniation)",
        "L5 nerve root (typically via an L4-L5 disk herniation)",
        "L4 nerve root (typically via an L3-L4 disk herniation)",
        "L3 nerve root (typically via an L2-L3 disk herniation)",
        "S2-S4 nerve roots (cauda equina compression)"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "S1 radiculopathy typically results from an L5-S1 posterolateral disk herniation. Its clinical hallmark is: (1) weakness of plantar flexion (gastrocnemius/soleus), making the patient unable to walk on their toes; (2) absent or depressed Achilles tendon (ankle jerk) reflex; and (3) radicular pain and numbness radiating down the posterior calf into the lateral foot, sole, and little toe.",
        "distractors": [
          "L5 radiculopathy causes weakness of foot dorsiflexion and great toe extension (extensor hallucis longus), difficulty walking on heels, sensory loss over the dorsum of foot/first web space, and characteristically preserves the Achilles reflex.",
          "L4 radiculopathy causes quadriceps and tibialis anterior weakness, an absent patellar (knee jerk) reflex, and medial calf sensory loss.",
          "L3 radiculopathy impairs hip flexion and knee extension, diminishes the knee jerk, and affects the anterior mid-thigh.",
          "S2-S4 compression produces saddle anesthesia, sphincter incontinence, and bilateral sacral deficits."
        ],
        "key_point": "S1 radiculopathy causes inability to walk on toes (weak gastrocnemius), an absent Achilles reflex, and numbness of the lateral foot and sole."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch04-003",
      "chapter": "Spinal Nerve and Root",
      "section": "Conus Medullaris vs Cauda Equina",
      "page": 109,
      "vignette": "A 58-year-old man presents with sudden urinary retention and bilateral lower extremity numbness. Neurologic examination shows symmetric loss of pinprick sensation in the perianal and saddle region (S3-S5), loss of the bulbocavernosus reflex and anal sphincter tone, and bilateral extensor plantar responses (Babinski signs). Leg strength and ankle reflexes are largely preserved, and there is no radicular pain.",
      "question": "Which clinical feature conclusively localizes the lesion to the conus medullaris rather than the cauda equina?",
      "options": [
        "Bilateral extensor plantar responses (Babinski signs) indicating upper motor neuron spinal cord involvement",
        "Presence of urinary retention with a neurogenic bladder",
        "Saddle distribution of cutaneous sensory loss",
        "Loss of the bulbocavernosus reflex",
        "Preservation of ankle tendon reflexes"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The conus medullaris represents the distal terminal cone of the spinal cord (containing sacral and coccygeal cord segments) opposite the L1-L2 vertebral bodies. Lesions directly involving the conus often produce upper motor neuron signs (Babinski signs, hyperreflexia) because descending pyramidal pathways are damaged before or at their termination. In contrast, the cauda equina consists solely of peripheral lower motor neuron nerve roots; cauda equina syndrome can NEVER produce Babinski signs or spasticity.",
        "distractors": [
          "Urinary retention and sphincter disturbance occur in both conus medullaris and cauda equina syndromes.",
          "Saddle anesthesia (S3-S5) is present in both syndromes (characteristically symmetric in conus, asymmetric in cauda equina).",
          "Loss of the bulbocavernosus reflex reflects damage to the S2-S4 reflex arc, which occurs in both conditions.",
          "Preservation of ankle reflexes is common in isolated conus lesions (since S1 is located slightly above the conus), but does not prove cord vs root as definitively as an extensor plantar response."
        ],
        "key_point": "Extensor plantar responses (Babinski sign) are upper motor neuron signs seen in conus medullaris lesions and NEVER in pure cauda equina root compression."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter05": [
    {
      "id": "ch05-001",
      "chapter": "Spinal Cord",
      "section": "Hemicord Lesion (Brown-Séquard Syndrome)",
      "page": 118,
      "vignette": "A 28-year-old man survives a knife wound to the right side of his mid-thoracic spine. On examination, he has spastic paralysis of the right leg with hyperreflexia and a right extensor plantar response. Vibratory and position senses are lost in the right leg. Pinprick and temperature sensations are completely normal on the right, but are absent on the left side of the trunk and left leg beginning at the T8 dermatome.",
      "question": "What is the pathophysiology of the dissociated sensory loss in Brown-Séquard syndrome?",
      "options": [
        "Posterior columns ascend uncrossed on the ipsilateral side, while the spinothalamic tract decussates 1 to 2 segments above entry and ascends contralaterally",
        "Spinothalamic fibers ascend uncrossed on the ipsilateral side, while dorsal column fibers decussate at the spinal entry level",
        "Both sensory tracts decussate immediately at the segmental level within the anterior white commissure",
        "Posterior columns terminate in the dorsal horn, while spinothalamic tracts project directly to the cerebellum",
        "Spinothalamic fibers travel through the medial lemniscus within the spinal cord"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "In a spinal cord hemisection (Brown-Séquard syndrome), the dorsal column fibers (vibration and joint position sense) ascend uncrossed in the ipsilateral cord to decussate in the medulla, so their loss is IPSILATERAL. The spinothalamic fibers (pain and temperature) synapse in the dorsal horn, decussate across the anterior white commissure within 1 to 2 spinal segments, and ascend in the contralateral anterolateral cord. Therefore, a right hemicord lesion causes CONTRALATERAL pain and temperature loss beginning 1 to 2 segments below the lesion level.",
        "distractors": [
          "Spinothalamic fibers decussate within the spinal cord, whereas dorsal columns remain uncrossed until the medulla.",
          "Dorsal columns do not decussate in the anterior white commissure; only spinothalamic and anterior corticospinal fibers cross there.",
          "Posterior column primary axons do not synapse in the dorsal horn; they ascend directly to the gracile and cuneate nuclei in the medulla.",
          "The medial lemniscus is formed only after the decussation in the medulla, not within the spinal cord."
        ],
        "key_point": "Brown-Séquard syndrome produces ipsilateral spastic motor weakness and proprioceptive loss with contralateral loss of pain and temperature 1-2 segments below the lesion."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch05-002",
      "chapter": "Spinal Cord",
      "section": "Anterior Spinal Artery Syndrome",
      "page": 125,
      "vignette": "A 67-year-old man undergoes repair of an abdominal aortic aneurysm. Postoperatively, he has flaccid paraplegia with absent deep tendon reflexes and bilateral extensor plantar responses. Sensation to pinprick and temperature is absent below the T10 dermatome bilaterally. However, testing of vibration and joint position sense reveals perfectly preserved sensation in both lower extremities.",
      "question": "Why are vibration and proprioception selectively spared in anterior spinal artery infarction?",
      "options": [
        "The posterior columns are supplied by the paired posterior spinal arteries, which remain patent",
        "The anterior spinal artery supplies all four columns, but dorsal column neurons are resistant to ischemia",
        "Proprioceptive axons cross the anterior white commissure and bypass the ischemic territory",
        "Vibratory fibers travel within the anterior corticospinal tract",
        "The artery of Adamkiewicz directly perfuses the posterior spinal arteries"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The anterior spinal artery (ASA) supplies the anterior two-thirds of the spinal cord, which includes the anterior horns, the corticospinal tracts, and the spinothalamic tracts. The posterior one-third of the cord, containing the dorsal (posterior) columns (fasciculus gracilis and cuneatus), is supplied independently by the paired posterior spinal arteries (PSAs). Consequently, ASA infarction causes bilateral motor paralysis and loss of pain/temperature while selectively sparing proprioception and vibration.",
        "distractors": [
          "Dorsal columns are not metabolically resistant to ischemia; their sparing is purely vascular due to dual posterior spinal artery supply.",
          "Proprioceptive fibers travel uncrossed in the posterior columns and do not cross the anterior white commissure.",
          "Vibratory fibers ascend in the posterior columns, not the anterior corticospinal tract.",
          "The artery of Adamkiewicz (great radicular artery) joins the anterior spinal artery, not the posterior spinal arteries."
        ],
        "key_point": "Anterior spinal artery syndrome produces bilateral paralysis and loss of pain/temperature with characteristic preservation of dorsal column vibration and position sense."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch05-003",
      "chapter": "Spinal Cord",
      "section": "Central Cord Syndrome & Syringomyelia",
      "page": 132,
      "vignette": "A 71-year-old man with cervical spondylosis sustains a hyperextension injury to his neck in a motor vehicle collision. On examination, he has severe flaccid weakness and wasting of both hands and forearms, but only mild spastic weakness in his legs. Sensory testing demonstrates loss of pain and temperature sensation across the neck, shoulders, and upper arms in a 'cape-like' distribution, while vibration and position senses are preserved throughout.",
      "question": "What anatomical feature explains why the upper extremities are weaker than the lower extremities in central cord syndrome?",
      "options": [
        "Lamination of the lateral corticospinal tract places hand and arm fibers centrally/medially and leg fibers peripherally/laterally",
        "Upper extremity motor fibers cross in the anterior white commissure, whereas leg fibers do not",
        "The cervical anterior horn cells are selectively vulnerable to contusion, while corticospinal tracts are spared",
        "The brachial plexus is stretched during cervical hyperextension",
        "Leg fibers travel in the anterior corticospinal tract, which is spared in central lesions"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "In the lateral corticospinal tract, motor axons are somatotopically laminated: cervical (arm/hand) fibers lie medially (centrally), while thoracic, lumbar, and sacral (leg) fibers lie laterally (peripherally). An expanding central lesion (such as central cord contusion or syringomyelia) compresses the medial cervical fibers first, causing profound arm and hand weakness while largely sparing the more peripheral leg fibers. Decussating spinothalamic fibers in the central canal commissure are simultaneously destroyed, producing the cape-like loss of pain and temperature.",
        "distractors": [
          "Corticospinal tracts do not decussate in the anterior white commissure; they cross at the medullary pyramidal decussation.",
          "Corticospinal tracts are definitely involved; the disproportionate weakness is due to the somatotopic medial position of cervical fibers, not isolated anterior horns.",
          "Brachial plexus traction does not produce bilateral cape-like sensory loss or spasticity in the legs.",
          "Leg fibers travel in the lateral corticospinal tract in a peripheral/lateral position, not in the anterior corticospinal tract."
        ],
        "key_point": "Central cervical cord lesions cause arms > legs weakness due to the medial somatotopic lamination of cervical fibers in the lateral corticospinal tract, with a cape-like dissociated sensory loss."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch05-004",
      "chapter": "Spinal Cord",
      "section": "Subacute Combined Degeneration",
      "page": 136,
      "vignette": "A 60-year-old strict vegan presents with progressive unsteadiness when walking, especially in the dark or while washing his face in the shower. Neurologic examination demonstrates sensory ataxia with a positive Romberg sign, severe loss of vibration and joint position sense in both lower extremities, spastic paraparesis with hyperactive knee jerks, bilateral extensor plantar responses, and absent ankle reflexes.",
      "question": "Which spinal cord tracts are selectively degenerated in vitamin B12 deficiency (subacute combined degeneration)?",
      "options": [
        "Posterior (dorsal) columns and lateral corticospinal tracts",
        "Anterior spinothalamic tracts and anterior horn cells",
        "Anterior white commissure and medial lemniscus",
        "Spinocerebellar tracts and rubrospinal tracts alone",
        "Autonomic intermedio-lateral cell columns exclusively"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Subacute Combined Degeneration (SCD) of the spinal cord is characterized by combined degeneration of: (1) the posterior (dorsal) columns (loss of vibration and position sense, sensory ataxia, positive Romberg sign) and (2) the lateral corticospinal tracts (spastic paraparesis, hyperreflexia, extensor plantar responses). Concomitant peripheral large-fiber neuropathy accounts for the lost Achilles tendon reflexes despite upper motor neuron signs.",
        "distractors": [
          "Spinothalamic tracts and anterior horn cells are spared; pain and temperature sensation is preserved.",
          "The anterior white commissure is damaged in syringomyelia, not in B12 deficiency.",
          "Spinocerebellar tract involvement may contribute to ataxia, but degeneration of the posterior columns and corticospinal tracts is the defining pathologic hallmark.",
          "Autonomic columns are not the primary target of B12 deficiency."
        ],
        "key_point": "Subacute combined degeneration (vitamin B12 deficiency) selectively damages the posterior columns (sensory ataxia) and lateral corticospinal tracts (spasticity/Babinski)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ]
}

# Write out batch 1
for ch_name, q_list in BATCH1.items():
    ch_num = int(ch_name.replace("chapter", ""))
    target_path = f"content/approved/{ch_name}.json"
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(q_list, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(q_list)} questions to {target_path}")

print("Batch 1 (Chapters 1-5) complete!")
