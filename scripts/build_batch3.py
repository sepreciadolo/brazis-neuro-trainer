import json
import os

BATCH3 = {
  "chapter11": [
    {
      "id": "ch11-001",
      "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
      "section": "Sensorineural Hearing Loss & Vestibular Schwannoma",
      "page": 398,
      "vignette": "A 48-year-old man presents with progressive hearing loss and tinnitus in the right ear over the past 18 months, along with mild unsteadiness. Tuning fork examination shows that the Weber test lateralizes to the left ear, and the Rinne test is positive (air conduction > bone conduction) bilaterally. Audiometry reveals high-frequency sensorineural hearing loss with disproportionately poor speech discrimination score (28% in the right ear). Corneal reflex is slightly diminished on the right.",
      "question": "What is the diagnosis and anatomical localization of this lesion?",
      "options": [
        "Vestibular schwannoma (acoustic neuroma) in the right cerebellopontine angle",
        "Ménière disease affecting the right membranous labyrinth",
        "Otosclerosis with conductive stapedial fixation",
        "Right lateral medullary infarction (Wallenberg syndrome)",
        "Benign paroxysmal positional vertigo (BPPV)"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The combination of progressive unilateral high-frequency sensorineural hearing loss, disproportionate speech discrimination impairment (characteristic of retrocochlear eighth nerve pathology), and early adjacent trigeminal nerve involvement (diminished corneal reflex) is the classic presentation of a vestibular schwannoma in the internal auditory canal and cerebellopontine angle (CPA). In retrocochlear lesions, speech comprehension is degraded far more severely than pure tone thresholds.",
        "distractors": [
          "Ménière disease causes episodic vertigo with fluctuating low-frequency hearing loss, full sensation in the ear, and normal speech discrimination without corneal reflex changes.",
          "Otosclerosis causes conductive hearing loss with bone conduction > air conduction (negative Rinne test).",
          "Lateral medullary infarction affects vestibular nuclei (vertigo and nystagmus), but typically spares hearing because the cochlear nerve and nuclei are located more rostrally in the inferior pons.",
          "BPPV causes brief (< 1 minute) positional vertigo triggered by head turns, with completely normal hearing and no cranial neuropathies."
        ],
        "key_point": "Disproportionate impairment of speech discrimination compared to pure-tone thresholds is the hallmark of retrocochlear eighth nerve lesions (e.g., vestibular schwannoma in the CPA)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch11-002",
      "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
      "section": "BPPV vs Central Positional Nystagmus",
      "page": 405,
      "vignette": "A 59-year-old woman experiences brief, violent spinning sensations lasting 20 to 30 seconds each time she rolls over onto her right side in bed or tilts her head back to look up at a high shelf. When the right Dix-Hallpike maneuver is performed, there is a 5-second latency, followed by a burst of mixed upbeating and torsional nystagmus (top poles of eyes beating toward the right ear) that fatigues after 25 seconds. When she sits upright, the nystagmus reverses direction.",
      "question": "Which semicircular canal is affected and what is the underlying mechanism?",
      "options": [
        "Right posterior semicircular canal canalithiasis (Benign Paroxysmal Positional Vertigo)",
        "Right horizontal semicircular canal cupulolithiasis",
        "Cerebellar vermis nodulus medulloblastoma",
        "Vestibular neuritis of the superior vestibular nerve",
        "Superior semicircular canal dehiscence syndrome"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Posterior canal canalithiasis is the most common form of BPPV. The pathognomonic findings on the Dix-Hallpike maneuver are: (1) brief latency (2 to 10 seconds), (2) mixed torsional and upbeating nystagmus with the torsional component beating toward the affected dependent ear, (3) crescendo-decrescendo intensity lasting under 60 seconds (fatigability), and (4) reversal of nystagmus upon sitting up. In contrast, central positional nystagmus has zero latency, does not fatigue, and is typically pure vertical (downbeating) or pure torsional.",
        "distractors": [
          "Horizontal canal BPPV produces direction-changing horizontal nystagmus on head turns in the supine position (geotropic or apogeotropic), not upbeating-torsional.",
          "Cerebellar nodulus lesions cause persistent central positional downbeat nystagmus without latency or fatigability.",
          "Vestibular neuritis causes continuous spontaneous vertigo lasting days, not brief positional paroxysms lasting seconds.",
          "Superior canal dehiscence causes vertigo triggered by loud sounds (Tullio phenomenon) or pressure changes (Hennebert sign), not classic Dix-Hallpike canalithiasis."
        ],
        "key_point": "Posterior canal BPPV produces paroxysmal upbeating-torsional nystagmus with latency, fatigability (< 60s), and reversal upon sitting during the Dix-Hallpike maneuver."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter12": [
    {
      "id": "ch12-001",
      "chapter": "Cranial Nerves IX and X (The Glossopharyngeal and Vagus",
      "section": "Jugular Foramen Syndrome (Vernet Syndrome)",
      "page": 414,
      "vignette": "A 50-year-old woman presents with hoarseness, difficulty swallowing, and right shoulder weakness. Neurologic examination reveals: (1) loss of taste on the posterior third of the right tongue, (2) absent gag reflex on the right with the uvula deviating to the left on phonation, and (3) paresis of the right sternocleidomastoid and upper trapezius muscles with downward drooping of the right shoulder. Tongue movement and sensation are completely normal.",
      "question": "Which anatomical structure transmits the cranial nerves lesioned in Vernet syndrome?",
      "options": [
        "Jugular foramen (transmitting CN IX, X, and XI)",
        "Hypoglossal canal (transmitting CN XII)",
        "Retroparotid space (Villaret syndrome)",
        "Posterior lacerated foramen and foramen magnum (Collet-Sicard syndrome)",
        "Superior orbital fissure"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Vernet syndrome (jugular foramen syndrome) involves cranial nerves IX (glossopharyngeal), X (vagus), and XI (spinal accessory) as they exit the skull base through the jugular foramen. This produces loss of posterior tongue taste and gag afferent (CN IX), palatal paralysis, vocal cord paralysis, and dysphagia (CN X), and weakness of SCM and trapezius (CN XI). Sparing of the hypoglossal nerve (CN XII, which exits through the separate hypoglossal canal) definitively confirms isolation to the jugular foramen (differentiating Vernet syndrome from Collet-Sicard and Villaret syndromes).",
        "distractors": [
          "The hypoglossal canal transmits only CN XII; its involvement causes tongue hemiatrophy.",
          "Villaret syndrome (retroparotid space) involves CN IX, X, XI, XII, and the cervical sympathetic chain (Horner syndrome).",
          "Collet-Sicard syndrome involves CN IX, X, XI, AND XII (condylar-jugular syndrome), which would paralyze the tongue.",
          "Superior orbital fissure transmits CN III, IV, V1, and VI, producing external ophthalmoplegia."
        ],
        "key_point": "Vernet syndrome affects cranial nerves IX, X, and XI at the jugular foramen; sparing of the hypoglossal nerve (CN XII) differentiates it from Collet-Sicard and Villaret syndromes."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter13": [
    {
      "id": "ch13-001",
      "chapter": "Cranial Nerve XI (The Spinal Accessory Nerve)",
      "section": "Iatrogenic Accessory Neuropathy & Trapezius Winging",
      "page": 424,
      "vignette": "A 29-year-old woman undergoes an excisional biopsy of a lymph node in the right posterior cervical triangle. Two weeks later, she notes a dragging sensation, dull aching pain in the right shoulder, and difficulty styling her hair. On examination, the right shoulder droops downwards and outwards. When she abducts her arm in the scapular plane, the right scapula wings with its inferior angle shifting laterally and upwards. Neck rotation against resistance to the left is entirely normal.",
      "question": "Why is sternocleidomastoid strength preserved while the trapezius is paralyzed?",
      "options": [
        "The spinal accessory nerve supplies the sternocleidomastoid muscle in the anterior neck before traversing the posterior triangle to reach the trapezius",
        "The sternocleidomastoid is innervated exclusively by the ansa cervicalis",
        "The biopsy injured the dorsal scapular nerve rather than the accessory nerve",
        "The trapezius muscle is innervated by the cervical plexus roots C1 and C2",
        "The spinal accessory nerve decussates within the posterior triangle"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The spinal accessory nerve (CN XI) exits the jugular foramen, descends in the anterior neck, and pierces the sternocleidomastoid (SCM) to supply it. It then emerges from the posterior border of the SCM and traverses the posterior cervical triangle obliquely and superficially, covered only by skin and cervical fascia, before entering the anterior border of the trapezius. Lymph node biopsies in the posterior triangle frequently sever the nerve distal to the SCM branches, paralyzing the trapezius (lateral scapular winging, shoulder droop) while leaving the SCM completely intact.",
        "distractors": [
          "The ansa cervicalis innervates the strap muscles (omohyoid, sternohyoid, sternothyroid), not the SCM.",
          "The dorsal scapular nerve innervates the rhomboids and levator scapulae; its lesion causes medial scapular winging without shoulder drooping.",
          "The trapezius receives motor innervation from CN XI, while C3-C4 branches provide mainly proprioception.",
          "The spinal accessory nerve does not decussate in the neck."
        ],
        "key_point": "Superficial traversal of the posterior cervical triangle renders the spinal accessory nerve vulnerable to iatrogenic biopsy injury, paralyzing the trapezius while sparing the SCM."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter14": [
    {
      "id": "ch14-001",
      "chapter": "Cranial Nerve XII (The Hypoglossal Nerve)",
      "section": "Hypoglossal Neuropathy & Tapia Syndrome",
      "page": 434,
      "vignette": "A 45-year-old man awakens following a prolonged shoulder arthroscopy performed in the beach-chair position with endotracheal intubation. He complains of hoarseness and difficulty chewing. On examination, the right side of the tongue shows fasciculations and hemiatrophy; when protruded, the tongue deviates markedly to the right. Indirect laryngoscopy shows paralysis of the right vocal cord in the paramedian position. SCM and trapezius strength, soft palate elevation, and facial sensation are normal.",
      "question": "What is the eponym and localization for combined paralysis of cranial nerves XII and the recurrent laryngeal branch of X?",
      "options": [
        "Tapia syndrome caused by pressure injury at the crossover of CN XII and the vagal laryngeal fibers near the angle of the mandible",
        "Jackson syndrome due to a jugular foramen and hypoglossal canal skull base lesion",
        "Collet-Sicard syndrome from a retroparotid space infection",
        "Avellis syndrome due to a medullary tegmental infarction",
        "Schmidt syndrome from a high cervical spine lesion"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Tapia syndrome is the combination of unilateral paralysis of the hypoglossal nerve (CN XII) and the recurrent laryngeal nerve (or vagus nerve, CN X), sparing the accessory nerve and sympathetic chain. It characteristically occurs as an iatrogenic complication of endotracheal intubation and throat packs, where compression between the inflated cuff, displaced tongue, and the greater horn of the hyoid bone / transverse process of C1 injures CN XII and the recurrent laryngeal branch of CN X simultaneously.",
        "distractors": [
          "Jackson syndrome involves CN X, XI, and XII, causing additional paralysis of the SCM and trapezius.",
          "Collet-Sicard syndrome involves CN IX, X, XI, and XII, with additional loss of the gag reflex and palate elevation.",
          "Avellis syndrome involves CN X and contralateral spinothalamic / corticospinal long tracts within the brainstem.",
          "Schmidt syndrome involves CN X and XI, sparing the hypoglossal nerve."
        ],
        "key_point": "Tapia syndrome is the isolated combination of CN XII (tongue deviation) and recurrent laryngeal CN X (hoarseness/vocal cord palsy), often due to endotracheal cuff compression."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter16": [
    {
      "id": "ch16-001",
      "chapter": "The Cerebellum",
      "section": "Midline Vermis vs Hemispheric Syndromes",
      "page": 466,
      "vignette": "A 58-year-old man with a 30-year history of alcohol dependence is admitted for unsteady walking. When standing, he has marked truncal instability with a broad-based, staggering gait, and cannot perform tandem gait. However, when tested in the seated position, he performs finger-to-nose and rapid alternating movements smoothly without dysmetria or intention tremor in the arms. Heel-to-knee-to-shin testing shows mild heel decomposition that improves with support.",
      "question": "Which anatomical region of the cerebellum is selectively atrophied in alcoholic cerebellar degeneration?",
      "options": [
        "Anterior lobe vermis (paleocerebellum / spinocerebellum)",
        "Lateral cerebellar hemispheres (neocerebellum / pontocerebellum)",
        "Flocculonodular lobe (archicerebellum / vestibulocerebellum)",
        "Dentate nuclei bilaterally",
        "Superior cerebellar peduncle decussation"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Alcoholic cerebellar degeneration selectively affects the anterior superior vermis (lingula, central lobule, culmen) due to chronic alcohol toxicity and thiamine malnutrition. The vermis coordinates axial and pelvic girdle musculature for equilibrium, posture, and gait. Selective anterior vermis atrophy produces severe truncal and gait ataxia with a wide-based gait, while the lateral neocerebellar hemispheres (which coordinate coordinated multijoint limb movements of the upper extremities) are completely spared, leaving finger-to-nose testing normal.",
        "distractors": [
          "Lateral cerebellar hemisphere lesions produce ipsilateral limb ataxia, dysmetria, dysdiadochokinesia, and intention tremor on finger-to-nose testing.",
          "Flocculonodular lobe lesions cause profound equilibrium disturbances with vertigo, vomiting, downbeat nystagmus, and ocular dysmetria, but are typical of medulloblastomas.",
          "Dentate nucleus lesions cause severe intention tremor and rubral-like resting/kinetic tremors.",
          "Superior cerebellar peduncle decussation lesions produce Claude syndrome or bilateral severe intention tremor."
        ],
        "key_point": "Alcoholic cerebellar degeneration selectively affects the anterior superior vermis, producing marked truncal and gait ataxia while sparing upper extremity finger-to-nose testing."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch16-002",
      "chapter": "The Cerebellum",
      "section": "Cerebellar Peduncles & Afferent/Efferent Circuits",
      "page": 472,
      "vignette": "A 64-year-old woman develops acute clumsy movements of her left hand and left-sided staggering. Examination demonstrates severe left limb dysmetria, intention tremor on left finger-to-nose testing, and left dysdiadochokinesia. MRI demonstrates an acute ischemic infarction involving the left superior cerebellar peduncle (brachium conjunctivum).",
      "question": "What is the primary fiber composition and projection pathway of the superior cerebellar peduncle?",
      "options": [
        "Major efferent outflow pathway from the deep cerebellar nuclei (dentate and interposed) projecting to the contralateral red nucleus and VL thalamus",
        "Primary afferent input carrying pontocerebellar fibers from the contralateral cerebral cortex",
        "Afferent olivocerebellar climbing fibers from the inferior olivary nucleus",
        "Primary vestibular afferents from the semicircular canals to the fastigial nucleus",
        "Uncrossed corticospinal motor tracts traversing the cerebellum"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The superior cerebellar peduncle (SCP, brachium conjunctivum) is the primary EFFERENT outflow tract of the cerebellum. It carries axons originating in the dentate, emboliform, and globose nuclei. These fibers ascend, decussate in the caudal midbrain (SCP decussation), and project to the contralateral red nucleus (rubrospinal/rubro-olivary circuits) and the ventrolateral (VL) thalamic nucleus (dentatorubrothalamic tract), which relays back to the primary motor cortex.",
        "distractors": [
          "Pontocerebellar fibers enter via the middle cerebellar peduncle (MCP, brachium pontis), the largest afferent pathway.",
          "Olivocerebellar climbing fibers enter exclusively through the inferior cerebellar peduncle (restiform body).",
          "Vestibular afferents enter through the juxtarestiform body of the inferior cerebellar peduncle.",
          "Corticospinal tracts travel in the basis pontis and medullary pyramids, never entering the cerebellum."
        ],
        "key_point": "The superior cerebellar peduncle (brachium conjunctivum) is the primary efferent output of the cerebellum, carrying dentatothalamic fibers that decussate in the midbrain."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter17": [
    {
      "id": "ch17-001",
      "chapter": "The Localization of Lesions Affecting the Hypothalamus and",
      "section": "Hypothalamic Nuclei & Diabetes Insipidus",
      "page": 484,
      "vignette": "A 32-year-old woman presents with severe thirst, consuming over 8 liters of water per day, and profound polyuria with dilute urine (urine osmolality 110 mOsm/kg). Serum sodium is 149 mEq/L. Following subcutaneous administration of desmopressin (dDAVP), urine osmolality increases to 580 mOsm/kg. Pituitary MRI demonstrates loss of the normal T1 hyperintense 'bright spot' in the posterior pituitary and thickening of the pituitary stalk.",
      "question": "Which hypothalamic nuclei synthesize the hormone deficient in central diabetes insipidus?",
      "options": [
        "Supraoptic and paraventricular nuclei",
        "Ventromedial and lateral hypothalamic nuclei",
        "Suprachiasmatic and preoptic nuclei",
        "Arcuate and periventricular nuclei",
        "Mammillary bodies and posterior hypothalamic nucleus"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Antidiuretic hormone (arginine vasopressin, AVP) is synthesized primarily by magnocellular neurosecretory neurons in the supraoptic and paraventricular nuclei of the hypothalamus. Their axons travel down the pituitary stalk (hypothalamo-hypophysial tract) to be stored and released into the capillaries of the posterior pituitary (neurohypophysis). The normal posterior pituitary 'bright spot' on T1-weighted MRI reflects stored vasopressin-neurophysin complexes; its absence signifies central diabetes insipidus.",
        "distractors": [
          "The ventromedial nucleus is the satiety center, and the lateral hypothalamic nucleus is the hunger/feeding center.",
          "The suprachiasmatic nucleus regulates circadian rhythms, and the preoptic nucleus regulates thermoregulation.",
          "The arcuate nucleus secretes dopamine (prolactin-inhibiting factor) and hypothalamic releasing hormones into the portal hypophysial circulation.",
          "The mammillary bodies are part of the Papez limbic memory circuit and are affected in Wernicke encephalopathy."
        ],
        "key_point": "Central diabetes insipidus results from disruption of the supraoptic and paraventricular hypothalamic nuclei or the pituitary stalk, causing loss of the normal T1 posterior pituitary bright spot."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch17-002",
      "chapter": "The Localization of Lesions Affecting the Hypothalamus and",
      "section": "Wernicke Encephalopathy & Limbic Hypothalamus",
      "page": 492,
      "vignette": "A 54-year-old chronic alcoholic man is brought to the emergency department confused and somnolent. Examination demonstrates bilateral abducens nerve palsies, horizontal and vertical gaze-evoked nystagmus, and profound truncal ataxia making standing impossible. MRI of the brain reveals symmetric T2/FLAIR hyperintensity in the mammillary bodies, periaqueductal gray, and medial thalami surrounding the third ventricle.",
      "question": "What is the diagnosis and biochemical deficiency responsible for this triad?",
      "options": [
        "Wernicke encephalopathy caused by thiamine (vitamin B1) deficiency",
        "Central pontine myelinolysis caused by rapid correction of hyponatremia",
        "Marchiafava-Bignami disease causing corpus callosum demyelination",
        "Hepatic encephalopathy caused by hyperammonemia",
        "Pellagra caused by niacin (vitamin B3) deficiency"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The classic clinical triad of Wernicke encephalopathy consists of: (1) encephalopathy / mental status changes, (2) ocular motor abnormalities (bilateral CN VI palsies, nystagmus, conjugate gaze palsies), and (3) gait ataxia. It is caused by acute thiamine (vitamin B1) deficiency, leading to failure of transketolase, pyruvate dehydrogenase, and alpha-ketoglutarate dehydrogenase. MRI shows pathognomonic selective vulnerability of the mammillary bodies, periaqueductal gray, and paraventricular hypothalamic regions.",
        "distractors": [
          "Central pontine myelinolysis causes spastic quadriplegia, pseudobulbar palsy, and locked-in syndrome with T2 changes in the basis pontis.",
          "Marchiafava-Bignami disease causes selective necrosis and demyelination of the central corpus callosum.",
          "Hepatic encephalopathy produces asterixis, inverted sleep-wake cycle, and bilateral globus pallidus T1 hyperintensity.",
          "Pellagra produces the 4 D's (dermatitis, diarrhea, dementia, death) without acute ocular motor palsies and mammillary body lesions."
        ],
        "key_point": "Wernicke encephalopathy produces the triad of encephalopathy, ocular motor palsies, and ataxia, with symmetric MRI signal changes in the mammillary bodies and periaqueductal gray."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ]
}

# Write out batch 3
for ch_name, q_list in BATCH3.items():
    target_path = f"content/approved/{ch_name}.json"
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(q_list, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(q_list)} questions to {target_path}")

print("Batch 3 (Chapters 11-14, 16-17) complete!")
