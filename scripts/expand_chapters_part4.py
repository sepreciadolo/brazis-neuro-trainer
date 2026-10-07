import json

def add_questions_to_chapter(file_path, new_questions):
    with open(file_path, 'r', encoding='utf-8') as f:
        existing = json.load(f)
    
    existing_ids = {q['id'] for q in existing}
    added = 0
    for q in new_questions:
        if q['id'] not in existing_ids:
            existing.append(q)
            added += 1
            
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
        
    print(f"Added {added} questions to {file_path}. Total: {len(existing)}")

# CHAPTER 16: Cerebellum
ch16_questions = [
    {
        "id": "ch16-003",
        "chapter": "The Cerebellum",
        "section": "Anterior Vermis vs Cerebellar Hemispheres",
        "page": 448,
        "vignette": "A 56-year-old chronic alcoholic man presents with progressive gait unsteadiness. On examination, he walks with a wide base, staggers, and cannot perform tandem gait. When standing with feet together, he sways with his eyes open and this swaying does not worsen when his eyes are closed. In contrast, finger-to-nose testing, rapid alternating movements of the hands, speech fluency, and cranial nerve examination are completely normal.",
        "question": "Which anatomical region of the cerebellum is selectively degenerated in this condition (alcoholic cerebellar degeneration)?",
        "options": [
            "Anterior lobe and superior vermis (paleocerebellum / spinocerebellum)",
            "Posterior cerebellar hemisphere (neocerebellum / cerebrocerebellum)",
            "Flocculonodular lobe (vestibulocerebellum)",
            "Dentate nucleus and superior cerebellar peduncle",
            "Tonsillar folia and foramen magnum margins"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Alcoholic cerebellar degeneration characteristically causes selective atrophy of Purkinje cells and molecular layer thinning restricted to the superior vermis and anterior lobe (spinocerebellum / paleocerebellum). This structure coordinates trunk stability and lower extremity gait rhythms. Because the neocerebellar hemispheres are spared, patients exhibit pronounced truncal ataxia, wide-based staggering gait, and lower limb ataxia (heel-knee-shin impairment), while speech and upper extremity coordination (finger-to-nose, rapid hand alternating movements) remain remarkably intact.",
            "distractors": [
                "Posterior cerebellar hemispheric lesions produce prominent ipsilateral limb dysmetria, intention tremor, and dysdiadochokinesia in the arms, which are absent here.",
                "Flocculonodular lobe lesions cause severe dysequilibrium, spontaneous nystagmus (often downbeat), and impaired vestibulo-ocular reflex suppression.",
                "Dentate nucleus lesions cause profound rubral/cerebellar outflow intention tremors and dysmetria in the limbs.",
                "Tonsillar lesions produce tonsillar herniation or foramen magnum compression (neck stiffness, lower cranial nerve palsies, quadriparesis)."
            ],
            "key_point": "Alcoholic cerebellar degeneration selectively damages the anterior vermis and anterior lobe, producing severe truncal and gait ataxia with preserved arm coordination."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch16-004",
        "chapter": "The Cerebellum",
        "section": "Vascular Territories of Cerebellar Arteries",
        "page": 454,
        "vignette": "A 64-year-old man develops sudden vertigo, headache, and severe incoordination of his right arm and leg. Examination shows marked right-sided intention tremor, dysmetria on right finger-to-nose and heel-to-shin testing, right dysdiadochokinesia, and ipsilateral Horner syndrome. Cranial nerve examination shows no facial sensory loss and no hearing loss. MRI confirms acute infarction restricted to the superior cerebellar artery (SCA) territory.",
        "question": "Which of the following structures is supplied by the superior cerebellar artery (SCA), distinguishing its territory from PICA and AICA?",
        "options": [
            "Superior cerebellar cortex, superior vermis, and the superior cerebellar peduncle (brachium conjunctivum)",
            "Posterior inferior cerebellar hemisphere and inferior vermis",
            "Inferolateral pons, middle cerebellar peduncle, and inner ear labyrinth",
            "Dorsolateral medulla including nucleus ambiguus and spinal trigeminal nucleus",
            "Anterior spinal cord and medial medullary pyramid"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The superior cerebellar artery (SCA) arises from the distal basilar artery immediately proximal to the posterior cerebral artery. It supplies the superior surface of the cerebellar hemisphere, the superior vermis, the deep cerebellar nuclei (including the dentate), and the superior cerebellar peduncle (brachium conjunctivum), as well as the dorsolateral rostral pontine tegmentum. SCA infarction classically causes severe ipsilateral limb ataxia (dysmetria and kinetic tremor from dentate/SCP damage) with relatively little or no lower cranial nerve or auditory involvement.",
            "distractors": [
                "The posterior inferior cerebellar hemisphere and inferior vermis are supplied by the posterior inferior cerebellar artery (PICA).",
                "The middle cerebellar peduncle and labyrinth are supplied by the anterior inferior cerebellar artery (AICA).",
                "The dorsolateral medulla is supplied by PICA and vertebral branches (Wallenberg syndrome).",
                "The medial medullary pyramid is supplied by the anterior spinal artery (Déjerine syndrome)."
            ],
            "key_point": "The SCA supplies the superior cerebellum, superior vermis, and superior cerebellar peduncle; SCA stroke produces severe ipsilateral limb ataxia and intention tremor."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch16-005",
        "chapter": "The Cerebellum",
        "section": "Peduncular Anatomy and Decussation",
        "page": 451,
        "vignette": "A 42-year-old woman develops severe, coarse, high-amplitude resting and intention tremor of the left arm and leg (Holmes / rubral tremor) along with left limb ataxia following surgical resection of a midbrain cavernoma located rostral to the decussation of the brachium conjunctivum in the right red nucleus region.",
        "question": "Why did a unilateral right midbrain tegmental lesion produce cerebellar ataxia and tremor on the LEFT side of the body?",
        "options": [
            "Cerebellar efferents from the left dentate nucleus crossed the midline in the caudal midbrain decussation to enter the right red nucleus, which then connects to the left motor cortex",
            "The lesion damaged uncrossed spinocerebellar ascending tracts",
            "Cerebellar signs are always contralateral regardless of lesion location",
            "The right middle cerebellar peduncle carries decussated vestibular fibers",
            "Efferent fibers from the fastigial nucleus crossed twice within the pons"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Cerebellar hemisphere lesions cause IPSILATERAL ataxia because the cerebellar control pathways double-cross: (1) Dentatothalamic/dentatorubral fibers exit the dentate nucleus via the superior cerebellar peduncle and DECUSSATE in the caudal midbrain (decussation of brachium conjunctivum) to reach the CONTRALATERAL red nucleus and VL thalamus. (2) The thalamus projects to the motor cortex, whose corticospinal tract CROSSES AGAIN in the medullary pyramidal decussation. Therefore, a lesion caudal to the decussation (in the cerebellum or SCP) causes IPSILATERAL ataxia; a lesion rostral to the SCP decussation (in the red nucleus, VL thalamus, or motor cortex) causes CONTRALATERAL ataxia.",
            "distractors": [
                "Uncrossed spinocerebellar tracts carry sensory information into the cerebellum; their lesion produces ipsilateral ataxia, not contralateral.",
                "Cerebellar lesions in the cerebellar hemisphere or posterior fossa cause ipsilateral ataxia, not contralateral.",
                "The middle cerebellar peduncle carries afferent corticopontocerebellar fibers from contralateral pontine nuclei.",
                "Fastigial efferents project to vestibular nuclei and reticular formation to govern midline equilibrium."
            ],
            "key_point": "Superior cerebellar peduncle fibers cross in the caudal midbrain; lesions BEFORE the decussation cause ipsilateral ataxia, while lesions AFTER the decussation (red nucleus/VL thalamus) cause contralateral ataxia."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch16-006",
        "chapter": "The Cerebellum",
        "section": "Cerebellar Cognitive Affective Syndrome",
        "page": 456,
        "vignette": "A 60-year-old executive undergoes complete surgical excision of a benign hemangioblastoma in the posterior lobe and vermis of the cerebellum. Following recovery, his motor coordination is largely restored, but his family notes marked personality change, blunted affect, disinhibition, impaired executive planning, concrete thinking, and agrammatic language deficits.",
        "question": "What is the recognized term for this neurobehavioral syndrome described by Jeremy Schmahmann?",
        "options": [
            "Cerebellar cognitive affective syndrome (Schmahmann syndrome)",
            "Kl\u00fcver-Bucy syndrome",
            "Gerstmann syndrome",
            "Foix-Chavany-Marie syndrome",
            "Alien limb phenomenon"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The cerebellar cognitive affective syndrome (CCAS, or Schmahmann syndrome) results from lesions involving the posterior lobe of the cerebellum (especially lobules VI, VII, Crus I and Crus II) and the vermis. These regions are anatomically interconnected with prefrontal, posterior parietal, superior temporal, and limbic cortices via reciprocal cerebro-cerebellar loops. Damage disrupts the 'universal cerebellar transform,' leading to deficits in: (1) executive function (planning, set-shifting, working memory), (2) spatial cognition, (3) language (agrammatism, anomia), and (4) affect (flattening, disinhibition, affective instability).",
            "distractors": [
                "Klüver-Bucy syndrome results from bilateral anterior temporal / amygdala lesions (hyperorality, hypersexuality, placidity, visual agnosia).",
                "Gerstmann syndrome results from dominant angular gyrus lesions (acalculia, agraphia, finger agnosia, left-right disorientation).",
                "Foix-Chavany-Marie syndrome is anterior opercular syndrome (bilateral voluntary faciopharyngoglossomasticatory diplegia).",
                "Alien limb phenomenon results from callosal, supplementary motor area, or parietal lesions."
            ],
            "key_point": "Cerebellar cognitive affective syndrome (Schmahmann syndrome) involves lesions of the posterior cerebellar lobes and vermis, causing executive dysfunction, language impairment, and affective changes."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch16-007",
        "chapter": "The Cerebellum",
        "section": "Ocular Motor Signs of Cerebellar Disease",
        "page": 453,
        "vignette": "A 48-year-old woman is evaluated for oscillopsia and unsteady gait. On examination, when she attempts to look rapidly at a newly presented target, her primary saccade regularly overshoots the target (hypermetria), followed by a corrective backward saccade. On primary gaze, she exhibits spontaneous downbeat nystagmus that worsens on downward and lateral gaze.",
        "question": "Which cerebellar structures normally calibrate saccadic accuracy and prevent downbeat nystagmus?",
        "options": [
            "Dorsal oculomotor vermis (lobules VI and VII) for saccadic amplitude; flocculus and paraflocculus for gaze holding and vertical stability",
            "Anterior lobe paleocerebellum for saccades; dentate nucleus for gaze holding",
            "Dentatorubrothalamic tract for pursuit; neocerebellar cortex for saccades",
            "Fastigial nucleus for horizontal convergence; nodulus for pupillary dilation",
            "Middle cerebellar peduncle exclusively for saccadic metric control"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Ocular motor control by the cerebellum is divided anatomically: (1) The dorsal oculomotor vermis (lobules VI-VII) and caudal fastigial nuclei calibrate saccadic accuracy (gain and metrics); lesions cause saccadic dysmetria (ocular hypometria or hypermetria) and macrosaccadic oscillations. (2) The flocculus and paraflocculus optimize gaze holding and smooth pursuit; floccular dysfunction disrupts otolith/vestibular projections and neural integrators, classically causing downbeat nystagmus, rebound nystagmus, and failure of vestibulo-ocular reflex (VOR) cancellation.",
            "distractors": [
                "The anterior lobe coordinates spinocerebellar limb/gait tone, not saccadic ocular metrics.",
                "The dentatorubrothalamic tract coordinates limb motor output, not primary pursuit calibration.",
                "The fastigial nucleus coordinates saccades and balance, not pupillary dilation.",
                "The middle cerebellar peduncle is an afferent white matter bundle, not the specific integrator for saccadic gain."
            ],
            "key_point": "Dorsal vermis lesions cause saccadic dysmetria (hypermetria/hypometria); floccular lesions cause downbeat nystagmus and defective VOR suppression."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch16-008",
        "chapter": "The Cerebellum",
        "section": "Sensory Ataxia vs Cerebellar Ataxia",
        "page": 447,
        "vignette": "A 65-year-old man presents with progressive gait instability. On examination, when he stands with his feet together and eyes open, he stands steadily. When he closes his eyes, he immediately sways violently and must be caught by the examiner (positive Romberg test). Joint position sense and vibration sense are severely reduced at the toes and ankles. Heel-knee-shin testing is smooth when performed with visual guidance, but becomes clumsy and erratic when his eyes are closed.",
        "question": "How does sensory ataxia differ from true cerebellar ataxia?",
        "options": [
            "Sensory ataxia is substantially compensated by visual input and worsens dramatically with eye closure (positive Romberg); cerebellar ataxia persists and is severe even with eyes open",
            "Sensory ataxia produces pendular reflexes, whereas cerebellar ataxia produces hyperreflexia with clonus",
            "Sensory ataxia causes intention tremor of the hands; cerebellar ataxia causes resting tremor",
            "Sensory ataxia is characterized by scanning dysarthria and titubation; cerebellar ataxia spares speech",
            "Romberg test is positive in cerebellar ataxia but negative in sensory ataxia"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The Romberg test differentiates sensory ataxia (posterior columns, dorsal root ganglion, peripheral sensory neuropathy) from cerebellar ataxia: In sensory ataxia, loss of proprioceptive input to the brain can be compensated for by intact visual and vestibular feedback while eyes are open; closing the eyes removes visual compensation, provoking severe instability (positive Romberg). In contrast, in true cerebellar ataxia, the coordination generator itself is damaged; patients are unsteady and wide-based with eyes open, and closing their eyes produces little or no dramatic exacerbation (negative Romberg). Cerebellar ataxia also features dysarthria, titubation, and intention tremor, which are absent in pure sensory ataxia.",
            "distractors": [
                "Cerebellar lesions cause hypotonia and pendular reflexes (e.g., knee jerk swings like a pendulum), not spastic hyperreflexia or clonus.",
                "Cerebellar ataxia produces intention tremor, not resting tremor (which is characteristic of parkinsonism).",
                "Scanning dysarthria and titubation are hallmarks of cerebellar disease, not sensory ataxia.",
                "Romberg is positive in sensory ataxia, NOT in pure cerebellar vermian disease."
            ],
            "key_point": "Sensory ataxia depends on visual compensation and worsens dramatically with eye closure (positive Romberg); cerebellar ataxia is prominent even with eyes open."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 17: Hypothalamus
ch17_questions = [
    {
        "id": "ch17-003",
        "chapter": "The Hypothalamus",
        "section": "Thermoregulation Centers",
        "page": 465,
        "vignette": "A 48-year-old woman undergoes surgical resection of a craniopharyngioma. In the neuro-intensive care unit, she exhibits fluctuating body temperature: when her room is cool, her core temperature drops to 34.0°C (93.2°F), and when warming blankets are applied, her core temperature climbs rapidly to 39.5°C (103.1°F), taking on the ambient environmental temperature (poikilothermia).",
        "question": "Which hypothalamic region normally acts as the heat-conservation center and whose lesion results in poikilothermia?",
        "options": [
            "Posterior hypothalamic nucleus / area",
            "Anterior hypothalamic / preoptic area",
            "Ventromedial nucleus",
            "Suprachiasmatic nucleus",
            "Lateral hypothalamic area"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The hypothalamus contains distinct dual thermoregulatory centers: (1) Anterior hypothalamus / preoptic area functions as the heat-DISSIPATION center (triggers sweating and cutaneous vasodilation; lesions cause hyperthermia); (2) Posterior hypothalamus functions as the heat-CONSERVATION center (triggers shivering, piloerection, and vasoconstriction; extensive bilateral lesions disrupt both conservation and descending sympathetic autonomic pathways, destroying endogenous thermal setpoints and causing poikilothermia, where body temperature drifts passively with ambient temperature).",
            "distractors": [
                "Anterior hypothalamic lesions produce neurogenic hyperthermia (loss of heat dissipation), not poikilothermia.",
                "The ventromedial nucleus regulates satiety, hunger, and emotional behavior, not thermoregulation.",
                "The suprachiasmatic nucleus regulates circadian rhythms (sleep-wake cycles).",
                "The lateral hypothalamic area is the hunger/feeding center."
            ],
            "key_point": "Posterior hypothalamic lesions destroy heat conservation and descending autonomic regulation, causing poikilothermia (body temperature drifting with the environment)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch17-004",
        "chapter": "The Hypothalamus",
        "section": "Satiety vs Feeding Centers",
        "page": 466,
        "vignette": "A 36-year-old man undergoes resection of a hypothalamic hamartoma. Postoperatively, he exhibits uncontrollable, voracious appetite, compulsive foraging for food, rapid weight gain of 25 kg in 4 months, and episodic explosive aggressive outbursts (sham rage).",
        "question": "Bilateral damage to which hypothalamic nucleus is responsible for this hyperphagia, obesity, and affective aggression?",
        "options": [
            "Ventromedial nucleus",
            "Lateral hypothalamic nucleus",
            "Supraoptic nucleus",
            "Mammillary bodies",
            "Arcuate nucleus"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The ventromedial nucleus (VMN) of the hypothalamus is classically identified as the 'satiety center'. Bilateral lesions of the VMN abolish satiety signaling, resulting in uncontrollable hyperphagia, severe obesity, and hyperinsulinemia. In addition, VMN lesions frequently produce savage behavior and rage reactions ('hypothalamic rage' or sham rage). In contrast, lesions of the lateral hypothalamus (the 'feeding center') cause aphagia, anorexia, and severe wasting.",
            "distractors": [
                "The lateral hypothalamic nucleus is the feeding center; its destruction leads to aphagia and fatal cachexia.",
                "The supraoptic nucleus synthesizes vasopressin (ADH); its destruction causes diabetes insipidus.",
                "The mammillary bodies are involved in memory consolidation (Papez circuit); damage produces Korsakoff amnestic syndrome.",
                "The arcuate nucleus contains neuroendocrine tuberoinfundibular dopamine neurons regulating prolactin."
            ],
            "key_point": "Ventromedial hypothalamic nucleus = satiety center; bilateral lesions cause hyperphagia, morbid obesity, and sham rage."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch17-005",
        "chapter": "The Hypothalamus",
        "section": "Central Diabetes Insipidus and Neurohypophysis",
        "page": 468,
        "vignette": "A 24-year-old man involved in a high-speed motor vehicle collision sustains a skull base fracture involving the sella turcica with transection of the pituitary infundibular stalk. Within 24 hours, he develops severe polyuria (10 L/day) and intense thirst. Laboratory evaluation shows serum sodium of 152 mEq/L and urine osmolality of 95 mOsm/kg. Administration of subcutaneous desmopressin (DDAVP) leads to a rapid reduction in urine volume and an increase in urine osmolality to 580 mOsm/kg.",
        "question": "Which hypothalamic nuclei synthesize the antidiuretic hormone (arginine vasopressin) that was depleted by stalk transection?",
        "options": [
            "Supraoptic and paraventricular nuclei",
            "Anterior and preoptic nuclei",
            "Ventromedial and dorsomedial nuclei",
            "Suprachiasmatic and arcuate nuclei",
            "Posterior and premammillary nuclei"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Antidiuretic hormone (ADH / arginine vasopressin) and oxytocin are synthesized in the magnocellular neurosecretory cells of the supraoptic (SON) and paraventricular (PVN) nuclei of the hypothalamus. Their axons travel in the supraopticohypophyseal tract down the infundibulum (pituitary stalk) to terminate on fenestrated capillaries in the posterior pituitary (neurohypophysis). Traumatic transection of the high pituitary stalk interrupts this axonal transport, causing acute central diabetes insipidus (hypernatremia, polyuria, low urine osmolality responsive to DDAVP).",
            "distractors": [
                "The preoptic nuclei regulate temperature dissipation and GnRH release, not ADH synthesis.",
                "The ventromedial and dorsomedial nuclei regulate satiety and autonomic cardiovascular reactivity.",
                "The suprachiasmatic nucleus regulates circadian rhythm, and arcuate regulates anterior pituitary releasing hormones.",
                "Posterior and premammillary nuclei regulate heat conservation and emotional memory."
            ],
            "key_point": "Vasopressin (ADH) is synthesized in the supraoptic and paraventricular hypothalamic nuclei; disruption of their tract down the stalk causes central diabetes insipidus."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch17-006",
        "chapter": "The Hypothalamus",
        "section": "Papez Circuit and Wernicke-Korsakoff Syndrome",
        "page": 471,
        "vignette": "A 58-year-old homeless man with chronic severe alcohol dependence presents with ophthalmoparesis (abducens palsies and vertical gaze restriction), wide-based gait ataxia, and acute confusion. Prompt IV thiamine administration resolves his eye movement abnormalities and ataxia over several days. However, he is left with dense anterograde amnesia and spontaneous, elaborate confabulation. Brain MRI reveals bilateral hyperintensities and atrophy of the mammillary bodies.",
        "question": "In the limbic circuit of memory (Papez circuit), what tract carries axonal projections directly FROM the mammillary bodies to the anterior nucleus of the thalamus?",
        "options": [
            "Mammillothalamic tract (bundle of Vicq d'Azyr)",
            "Fornix",
            "Stria terminalis",
            "Medial forebrain bundle",
            "Cingulum bundle"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The circuit of Papez represents the anatomical substrate of emotional expression and episodic memory encoding: Hippocampus -> Fornix -> Mammillary bodies -> MAMMILLOTHALAMIC TRACT (bundle of Vicq d'Azyr) -> Anterior thalamic nucleus -> Cingulate gyrus -> Cingulum -> Parahippocampal gyrus / Entorhinal cortex -> Hippocampus. In Wernicke-Korsakoff syndrome, thiamine deficiency selectively damages the mammillary bodies, dorsomedial thalamus, and periaqueductal gray, disconnecting the mammillothalamic relay and resulting in permanent anterograde amnesia and confabulation (Korsakoff syndrome).",
            "distractors": [
                "The fornix carries projections from the subiculum/hippocampus TO the mammillary bodies, not from the mammillary bodies to the thalamus.",
                "The stria terminalis carries projections from the amygdala to the bed nucleus of the stria terminalis and hypothalamus.",
                "The medial forebrain bundle interconnects the basal forebrain, lateral hypothalamus, and brainstem tegmentum.",
                "The cingulum bundle connects the cingulate cortex to the parahippocampal gyrus."
            ],
            "key_point": "The mammillothalamic tract (bundle of Vicq d'Azyr) connects the mammillary bodies to the anterior thalamic nucleus in the memory circuit of Papez."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch17-007",
        "chapter": "The Hypothalamus",
        "section": "Circadian Pacemaker and Narcolepsy",
        "page": 469,
        "vignette": "A 21-year-old college student presents with uncontrollable daytime sleep attacks, cataplexy (sudden loss of muscle tone provoked by laughter), sleep paralysis, and hypnagogic hallucinations. Lumbar puncture demonstrates undetectable levels of orexin-A (hypocretin-1) in the cerebrospinal fluid.",
        "question": "Which hypothalamic area contains the orexinergic neurons whose autoimmune destruction produces type 1 narcolepsy?",
        "options": [
            "Lateral hypothalamic area / perifornical region",
            "Ventromedial hypothalamic nucleus",
            "Ventrolateral preoptic nucleus (VLPO)",
            "Suprachiasmatic nucleus",
            "Median eminence"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Type 1 narcolepsy is caused by selective autoimmune loss of approximately 70,000 hypocretin/orexin-producing neurons located almost exclusively in the lateral hypothalamic area and perifornical hypothalamus. Orexin peptides project widely to monoaminergic and cholinergic arousal centers (locus coeruleus, dorsal raphe, tuberomammillary nucleus, and pedunculopontine nucleus), stabilizing the 'flip-flop switch' of wakefulness and suppressing inappropriate intrusions of REM sleep (such as cataplexy and hypnagogic hallucinations).",
            "distractors": [
                "The ventromedial nucleus is the satiety center and does not synthesize hypocretin/orexin.",
                "The ventrolateral preoptic nucleus (VLPO) contains GABAergic/galaninergic neurons that PROMOTE sleep (the 'sleep center' of the flip-flop switch).",
                "The suprachiasmatic nucleus is the master circadian pacemaker, entrained by light via the retinohypothalamic tract.",
                "The median eminence is the vascular neurohemal portal site for hypophysiotropic hormones."
            ],
            "key_point": "Type 1 narcolepsy is caused by selective loss of hypocretin (orexin) neurons in the lateral hypothalamic area, destabilizing wakefulness and permitting REM intrusions."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch17-008",
        "chapter": "The Hypothalamus",
        "section": "Diencephalic Syndrome of Infancy (Russell Syndrome)",
        "page": 472,
        "vignette": "A 10-month-old infant presents with profound emaciation, near-total absence of subcutaneous adipose tissue, failure to thrive, but paradoxical euphoria, hyperalertness, hyperactivity, and horizontal rotary nystagmus. Neurological workup identifies an exophytic low-grade pilocytic astrocytoma involving the optic chiasm and anterior hypothalamic wall.",
        "question": "What is the name of this rare clinical syndrome of infancy associated with anterior hypothalamic / chiasmatic tumors?",
        "options": [
            "Russell diencephalic syndrome of infancy",
            "Prader-Willi syndrome",
            "Kallmann syndrome",
            "Laurence-Moon-Biedl syndrome",
            "Frohlich adiposogenital dystrophy"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Russell diencephalic syndrome of infancy is a rare condition caused by low-grade neoplasms (typically pilocytic astrocytomas) involving the anterior hypothalamus and optic chiasm. It is characterized by the striking clinical picture of profound, progressive emaciation and lipoatrophy despite normal or even high caloric intake, accompanied paradoxically by euphoria, alertness, vigor, and rotational nystagmus. Loss of subcutaneous fat is attributed to excessive growth hormone release and altered hypothalamic lipolytic metabolic signaling.",
            "distractors": [
                "Prader-Willi syndrome is a genetic 15q microdeletion causing neonatal hypotonia followed in early childhood by uncontrollable hyperphagia, hypogonadism, and morbid obesity.",
                "Kallmann syndrome is hypogonadotropic hypogonadism associated with anosmia due to failure of GnRH and olfactory axonal migration.",
                "Laurence-Moon-Biedl syndrome features obesity, retinitis pigmentosa, polydactyly, and cognitive impairment.",
                "Fröhlich syndrome (adiposogenital dystrophy) features obesity and hypogonadism due to ventromedial hypothalamic lesions."
            ],
            "key_point": "Russell diencephalic syndrome of infancy is caused by anterior hypothalamic tumors, presenting with severe emaciation, normal food intake, and paradoxical euphoria."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 18: Thalamus
ch18_questions = [
    {
        "id": "ch18-003",
        "chapter": "The Thalamus",
        "section": "Thalamic Pain Syndrome (Déjerine-Roussy)",
        "page": 482,
        "vignette": "A 62-year-old man had an ischemic stroke 3 months ago that initially caused complete loss of touch, pinprick, and temperature sensation on his left face, arm, and leg. Over the past month, sensation began to return, but he now experiences continuous, agonizing, burning pain in his left limbs. The light touch of his clothing or a cool breeze elicits severe excruciating pain (allodynia and hyperpathia).",
        "question": "Which thalamic arterial territory and nuclei are damaged in Déjerine-Roussy (thalamic pain) syndrome?",
        "options": [
            "Thalamogeniculate artery territory involving the ventral posterolateral (VPL) and ventral posteromedial (VPM) nuclei",
            "Tuberothalamic (polar) artery territory involving the anterior nucleus",
            "Paramedian thalamic artery territory involving the dorsomedial nucleus",
            "Posterior choroidal artery territory involving the lateral geniculate nucleus",
            "Anterior choroidal artery territory involving the reticular nucleus"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Déjerine-Roussy syndrome (central thalamic pain syndrome) is caused by infarction in the territory of the thalamogeniculate branches of the posterior cerebral artery (PCA), which supply the somatosensory relay nuclei: ventral posterolateral (VPL, carrying sensation from the body) and ventral posteromedial (VPM, carrying sensation from the face). After an initial period of hemihypesthesia, patients develop intolerable, refractory, delayed burning pain, hyperpathia, and allodynia on the contralateral side, reflecting maladaptive central sensitization and loss of inhibitory gating in thalamocortical networks.",
            "distractors": [
                "Tuberothalamic artery infarction damages the anterior thalamus, producing apathy, abulia, executive dysfunction, and memory loss without central burning pain.",
                "Paramedian artery infarction damages the mediodorsal nucleus and intralaminar nuclei, producing hypersomnolence, coma, and Korsakoff-like amnesia.",
                "Posterior choroidal branches supply the pulvinar and lateral geniculate nucleus; infarction causes visual field defects (e.g., homonymous horizontal sectoranopia).",
                "Anterior choroidal artery arises from the ICA and supplies the posterior limb of internal capsule and optic tract, not the primary somatosensory thalamic nuclei."
            ],
            "key_point": "Déjerine-Roussy syndrome is caused by thalamogeniculate artery infarction of the VPL/VPM nuclei, leading to delayed excruciating contralateral neuropathic pain (allodynia/hyperpathia)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch18-004",
        "chapter": "The Thalamus",
        "section": "Artery of Percheron Infarction",
        "page": 484,
        "vignette": "A 71-year-old woman is found unresponsive by her family. In the ED, she has fluctuating stupor and deep hypersomnolence. When aroused, she exhibits vertical gaze palsy (limitation of upward and downward gaze) and severe confusion with bilateral memory deficits. Brain MRI demonstrates acute symmetric bilateral paramedian thalamic and rostral midbrain infarctions without basilar artery occlusion.",
        "question": "What vascular anatomical variant accounts for bilateral symmetric paramedian thalamic infarction from a single arterial occlusion?",
        "options": [
            "Artery of Percheron (a single arterial trunk arising from one P1 PCA branch supplying both paramedian thalami)",
            "Persistent trigeminal artery connecting cavernous ICA to basilar artery",
            "Azygos anterior cerebral artery supplying bilateral medial frontal lobes",
            "Circumflex scapular collateral branch to the vertebral artery",
            "Accessory middle cerebral artery arising from the anterior communicating artery"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The artery of Percheron is an uncommon anatomical variant (present in ~4-11% of individuals) in which a solitary dominant arterial trunk arises from the P1 segment of a single posterior cerebral artery and branches to supply the bilateral paramedian thalami and frequently the rostral mesencephalic tegmentum. Occlusion of this single vessel produces the classic triad: (1) fluctuating stupor / hypersomnolence (bilateral intralaminar nuclei / ARAS disruption), (2) vertical gaze palsy (rostral interstitial nucleus of MLF involvement), and (3) severe memory impairment (dorsomedial nuclei).",
            "distractors": [
                "Persistent trigeminal artery is a fetal carotid-basilar anastomosis; its occlusion does not explain isolated bilateral paramedian thalamic infarction.",
                "Azygos ACA is a single trunk supplying both medial hemispheres; its occlusion causes bilateral leg weakness and abulia.",
                "Circumflex scapular artery is an extracranial shoulder collateral vessel.",
                "Accessory MCA supplies the anterior sylvian territory, not the paramedian thalamus."
            ],
            "key_point": "Artery of Percheron occlusion causes bilateral paramedian thalamic and midbrain infarctions, presenting with stupor/hypersomnolence, vertical gaze palsy, and memory loss."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch18-005",
        "chapter": "The Thalamus",
        "section": "Tuberothalamic / Polar Artery Syndrome",
        "page": 481,
        "vignette": "A 55-year-old man undergoes clipping of a posterior communicating artery aneurysm. Postoperatively, his family notices a profound change in personality: he is severely apathetic, lacks spontaneous initiative, responds only after long delays with monosyllables (abulia), and displays significant deficits in learning new verbal material. Motor, sensory, and visual examinations are completely intact. MRI confirms an infarction restricted to the tuberothalamic (polar) artery territory.",
        "question": "Which thalamic nuclei are supplied by the tuberothalamic (polar) artery?",
        "options": [
            "Anterior nucleus, rostral pole, and ventral anterior (VA) nucleus",
            "Ventral posterolateral (VPL) and ventral posteromedial (VPM) nuclei",
            "Lateral geniculate nucleus and pulvinar",
            "Centromedian nucleus and habenula",
            "Medial geniculate nucleus and pineal stalk"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The tuberothalamic (polar) artery arises from the posterior communicating artery (PCoA) and supplies the anterior pole of the thalamus, including the anterior thalamic nucleus, the rostral portion of the ventrolateral/ventral anterior (VA) nuclei, and the mammillothalamic tract. Infarction of this territory (frequently after PCoA aneurysm surgery) disrupts limbic circuits (Papez circuit) and frontothalamic networks, producing prominent neurobehavioral changes: profound abulia, apathy, lack of motivation, executive dysfunction, and anterograde amnesia, typically without motor or primary sensory deficits.",
            "distractors": [
                "VPL and VPM are supplied by the thalamogeniculate artery; their lesion causes sensory loss and central pain.",
                "The LGN and pulvinar are supplied by the posterior choroidal artery; their lesion causes visual field cuts.",
                "The centromedian nucleus is supplied by paramedian thalamoperforating arteries.",
                "The MGN is supplied by posterior choroidal and quadrigeminal branches; its lesion impairs auditory processing."
            ],
            "key_point": "Tuberothalamic (polar) artery infarction damages the anterior and VA thalamic nuclei, resulting in profound abulia, apathy, and memory impairment without motor deficits."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch18-006",
        "chapter": "The Thalamus",
        "section": "Thalamic Astasia and Motor Control",
        "page": 485,
        "vignette": "A 68-year-old woman is admitted after an acute stroke. On examination in bed, her muscle strength in all four limbs is entirely normal (5/5), sensation to light touch and pinprick is preserved, and she has no limb dysmetria or ataxia on finger-to-nose or heel-to-shin testing. However, when the examiner asks her to stand, she cannot maintain an upright posture, falls backwards or to the side, and cannot take a step (thalamic astasia).",
        "question": "Lesions in which thalamic nuclei produce thalamic astasia (inability to stand or balance despite preserved limb strength)?",
        "options": [
            "Posterolateral / centromedian-ventrolateral thalamus disrupting thalamocortical vestibular and postural networks",
            "Anterior nucleus disrupting olfactory projections",
            "Lateral geniculate nucleus disrupting optic radiations",
            "Medial geniculate nucleus disrupting auditory reflexes",
            "Reticular thalamic nucleus disrupting sleep spindles"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Thalamic astasia is a distinctive syndrome characterized by severe impairment of standing and walking (astasia-abasia) in the absence of motor weakness, primary sensory loss, or cerebellar ataxia in the limbs. It is caused by unilateral lesions in the posterolateral or central thalamus (involving the ventral lateral nucleus, centromedian nucleus, or posterior thalamic peduncle), which disrupt ascending vestibular, proprioceptive, and basal ganglia inputs projecting to the vestibular and premotor cortices, disturbing the patient's internal vertical representation and postural balance.",
            "distractors": [
                "The anterior nucleus mediates memory (Papez circuit), not postural balance.",
                "LGN lesions cause homonymous hemianopia or sectoranopia, not isolated astasia.",
                "MGN lesions affect auditory relays, not postural verticality.",
                "The reticular nucleus modulates thalamocortical oscillatory rhythms (sleep spindles), not postural stability."
            ],
            "key_point": "Thalamic astasia (inability to stand or balance without motor weakness) results from posterolateral thalamic lesions disrupting vestibular and postural thalamocortical networks."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch18-007",
        "chapter": "The Thalamus",
        "section": "Sensory Relay Somatotopy: VPL vs VPM",
        "page": 479,
        "vignette": "A 58-year-old man presents with acute loss of pinprick and light touch sensation strictly restricted to the left half of his face and tongue, with complete sparing of sensation over his left neck, trunk, arm, and leg. Taste sensation on the left side of the tongue is also diminished. Motor strength is entirely normal.",
        "question": "Which specific thalamic nucleus is selectively involved in this circumscribed sensory deficit?",
        "options": [
            "Ventral posteromedial (VPM) nucleus",
            "Ventral posterolateral (VPL) nucleus",
            "Centromedian nucleus",
            "Pulvinar",
            "Ventral anterior (VA) nucleus"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The primary somatosensory thalamus is anatomically subdivided into: (1) Ventral posteromedial (VPM) nucleus: receives secondary trigeminothalamic (quintothalamic) fibers mediating sensation from the contralateral face, oral cavity, and tongue, as well as ascending gustatory fibers from the solitary tract; (2) Ventral posterolateral (VPL) nucleus: receives spinothalamic (pain/temperature) and medial lemniscal (vibration/proprioception) fibers mediating sensation from the contralateral body, neck, and limbs. Therefore, an isolated hemifacial and lingual sensory deficit localizes specifically to the VPM nucleus.",
            "distractors": [
                "The VPL nucleus receives sensory input from the body and limbs; its lesion spares the face and affects the contralateral arm/leg/trunk.",
                "The centromedian nucleus is an intralaminar nucleus involved in arousal, attention, and basal ganglia loops.",
                "The pulvinar is a visual and multimodal association nucleus.",
                "The VA nucleus is a motor relay from the basal ganglia to the premotor cortex."
            ],
            "key_point": "VPM nucleus = sensory relay for the face (trigeminal) and taste; VPL nucleus = sensory relay for the body and limbs (spinothalamic and medial lemniscus)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch18-008",
        "chapter": "The Thalamus",
        "section": "Visual Field Deficit from Lateral Geniculate Nucleus",
        "page": 480,
        "vignette": "A 64-year-old woman develops a visual disturbance following occlusion of the anterior choroidal artery. Automated perimetry reveals an upper and lower homonymous horizontal visual defect sparing a narrow horizontal wedge (homonymous horizontal sectoranopia or homonymous quadruple sectoranopia).",
        "question": "Which laminated thalamic structure is uniquely supplied by both the anterior choroidal artery and the lateral posterior choroidal artery, producing sectoranopic field defects when selectively infarcted?",
        "options": [
            "Lateral geniculate nucleus (LGN)",
            "Medial geniculate nucleus (MGN)",
            "Pulvinar nucleus",
            "Optic chiasm",
            "Meyer loop in the temporal lobe"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The lateral geniculate nucleus (LGN) is the thalamic relay for vision, consisting of 6 cellular layers with precise retinotopic organization. It has a dual blood supply: (1) Anterior choroidal artery supplies the hilum and anteromedial/anterolateral aspects (mediating the peripheral visual fields); (2) Lateral posterior choroidal artery supplies the posterior and middle hilum (mediating the central and horizontal wedge). Ischemia in either branch produces unique wedge-shaped 'sectoranopias' (e.g., quadruple sectoranopia or horizontal sectoranopia) pathognomonic of LGN infarction.",
            "distractors": [
                "The MGN is the auditory relay nucleus; lesions cause auditory processing deficits, not visual sectoranopia.",
                "The pulvinar mediates visual attention and saccades; lesions do not produce discrete geometric homonymous sectoranopias.",
                "Optic chiasm lesions produce bitemporal hemianopia, not homonymous sectoranopias.",
                "Meyer loop lesions in the temporal lobe produce contralateral superior quadrantanopia ('pie in the sky'), not horizontal sectoranopia."
            ],
            "key_point": "Homonymous horizontal sectoranopias are pathognomonic of lateral geniculate nucleus (LGN) infarction due to its distinct retinotopy and dual anterior/posterior choroidal blood supply."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 19: Basal Ganglia
ch19_questions = [
    {
        "id": "ch19-003",
        "chapter": "The Basal Ganglia",
        "section": "Hemiballismus and the Subthalamic Nucleus",
        "page": 498,
        "vignette": "A 70-year-old diabetic man develops sudden, violent, continuous, flinging and flailing movements of his left arm and leg. The movements are large-amplitude, rotary, and exhausting, persisting during wakefulness but subsiding during deep sleep.",
        "question": "What is the clinical diagnosis and the precise anatomical localization of the lesion?",
        "options": [
            "Hemiballismus due to infarction of the contralateral (right) subthalamic nucleus of Luys",
            "Chorea due to degeneration of the contralateral (right) caudate nucleus",
            "Athetosis due to bilateral putaminal necrosis",
            "Asterixis due to acute hepatic failure and cortical depression",
            "Dystonia due to infarction of the ipsilateral globus pallidus interna"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Hemiballismus consists of wild, violent, large-amplitude flinging movements of the contralateral limbs. It is caused by an acute lesion (most commonly a lacunar ischemic or hemorrhagic stroke) in the contralateral subthalamic nucleus (STN) of Luys or its immediate connections. In the indirect pathway of the basal ganglia, the STN normally provides excitatory glutamatergic drive to the internal segment of the globus pallidus (GPi) and substantia nigra pars reticulata (SNr), which in turn inhibit the thalamus. Loss of STN drive disinhibits the thalamus and motor cortex, unleashing hyperkinetic ballismus.",
            "distractors": [
                "Caudate degeneration produces progressive Huntington chorea (flowing, dance-like movements), not acute violent unilateral flinging hemiballismus.",
                "Putaminal necrosis produces slow, writhing distal movements (athetosis or dystonia), not violent proximal flinging.",
                "Asterixis is negative myoclonus (flapping tremor) associated with metabolic encephalopathy.",
                "GPi infarction causes hypokinesia or dystonia, and lesions in the basal ganglia produce contralateral (not ipsilateral) motor signs."
            ],
            "key_point": "Hemiballismus is caused by an acute destructive lesion of the CONTRALATERAL subthalamic nucleus of Luys, leading to loss of indirect pathway thalamic inhibition."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch19-004",
        "chapter": "The Basal Ganglia",
        "section": "Huntington Disease and Caudate Atrophy",
        "page": 501,
        "vignette": "A 44-year-old man presents with progressive irritability, depression, choreiform twitching of his fingers and facial grimacing, and motor impersistence (inability to maintain tongue protrusion, 'serpentine tongue'). Brain MRI shows profound atrophy of the caudate nuclei, causing characteristic frontal horn dilatation ('boxcar ventricles').",
        "question": "What is the primary cellular and neurotransmitter loss in the striatum early in Huntington disease?",
        "options": [
            "Loss of GABAergic and enkephalinergic medium spiny projection neurons projecting to the external globus pallidus (indirect pathway)",
            "Loss of dopaminergic neurons in the substantia nigra pars compacta",
            "Loss of cholinergic interneurons in the nucleus accumbens",
            "Loss of glutamatergic neurons in the subthalamic nucleus",
            "Loss of serotonergic neurons in the median raphe"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Huntington disease is an autosomal dominant CAG trinucleotide repeat expansion disorder. Neuropathologically, it is characterized by premature loss of medium spiny GABAergic neurons in the striatum (caudate and putamen). Early in the disease, there is selective degeneration of striatal neurons expressing D2 receptors and enkephalin that project to the external segment of the globus pallidus (GPe) in the indirect pathway. Disinhibition of the GPe leads to excessive inhibition of the STN, disinhibition of the thalamus, and resulting chorea.",
            "distractors": [
                "Loss of substantia nigra pars compacta dopaminergic neurons causes Parkinson disease (hypokinetic rigidity and bradykinesia).",
                "Striatal large aspiny cholinergic interneurons are remarkably spared in Huntington disease.",
                "STN neurons are secondarily modulated, but the primary site of neurodegeneration is the striatal medium spiny neurons.",
                "Raphe serotonergic neurons modulate mood and sleep, but are not the primary degenerative locus of HD."
            ],
            "key_point": "Huntington disease causes selective degeneration of GABAergic/enkephalinergic medium spiny neurons in the caudate (indirect pathway), leading to chorea and frontal horn dilatation."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch19-005",
        "chapter": "The Basal Ganglia",
        "section": "Direct vs Indirect Basal Ganglia Pathways",
        "page": 496,
        "vignette": "A neuroscientist records neuronal firing rates across the basal ganglia circuitry in a non-human primate model of Parkinson disease created with MPTP neurotoxin.",
        "question": "According to the classical Albin-DeLong basal ganglia model, what change occurs in the firing rate of the internal segment of the globus pallidus (GPi) and substantia nigra pars reticulata (SNr) in parkinsonism?",
        "options": [
            "Pathological HYPERACTIVITY (increased inhibitory GABAergic outflow from GPi/SNr to the thalamus)",
            "Pathological HYPOACTIVITY (decreased inhibitory outflow, disinhibiting the motor thalamus)",
            "Complete electrical silence of GPi with hyperactive thalamic firing",
            "Selective switch from GABAergic to glutamatergic neurotransmission",
            "Conversion of GPi into an excitatory pacemaker"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "In Parkinson disease, loss of dopamine from the substantia nigra pars compacta reduces D1 receptor stimulation (decreasing the direct, pro-kinetic pathway) and reduces D2 receptor inhibition (overactivating the indirect, anti-kinetic pathway via striatum -> GPe -> STN). Both alterations converge to produce excessive, pathological HYPERACTIVITY of the STN and the output nuclei: the internal segment of the globus pallidus (GPi) and SNr. Hyperactive GPi/SNr fires excessive inhibitory GABA onto the motor thalamus (VL/VA), producing profound thalamocortical suppression, bradykinesia, and rigidity.",
            "distractors": [
                "Hypoactivity of GPi/SNr occurs in hyperkinetic disorders (chorea, hemiballismus), NOT in Parkinson disease.",
                "GPi is never electrically silent in parkinsonism; high-frequency deep brain stimulation (DBS) is applied to GPi/STN specifically to disrupt this pathological hyperactivity.",
                "Basal ganglia output neurons do not switch neurotransmitter identities; they remain GABAergic.",
                "GPi neurons remain GABAergic inhibitory projecting neurons, not excitatory pacemakers."
            ],
            "key_point": "In parkinsonism, dopamine depletion causes pathological HYPERACTIVITY of the GPi and STN, which excessively inhibits the thalamocortical motor drive, producing bradykinesia."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch19-006",
        "chapter": "The Basal Ganglia",
        "section": "Wilson Disease and Putaminal Necrosis",
        "page": 503,
        "vignette": "A 19-year-old college student presents with progressive dysarthria, drooling, postural 'wing-beating' tremor of the arms, emotional lability, and declining academic performance. Slit-lamp examination reveals golden-brown copper deposits in the Descemet membrane of the corneas (Kayser-Fleischer rings). Brain MRI displays T2 hyperintensity and cavitation in the bilateral putamina and the 'giant panda face' sign in the midbrain.",
        "question": "What is the inherited molecular defect in Wilson disease (hepatolenticular degeneration)?",
        "options": [
            "Mutation in the ATP7B gene encoding a copper-transporting P-type ATPase",
            "Mutation in the ATP7A gene encoding Menkes copper-transport ATPase",
            "CAG trinucleotide repeat expansion in the huntingtin gene",
            "Mutation in the parkin (PRKN) gene encoding an E3 ubiquitin ligase",
            "Expansion of CTG repeats in the DMPK gene"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Wilson disease (hepatolenticular degeneration) is an autosomal recessive disorder caused by mutations in the ATP7B gene on chromosome 13, which encodes an intracellular copper-transporting P-type ATPase in hepatocytes. Impaired copper biliary excretion and ceruloplasmin incorporation lead to toxic copper accumulation in tissues, particularly the liver, cornea (Kayser-Fleischer rings), and basal ganglia (especially the putamen and globus pallidus, leading to cavitation, wing-beating tremor, dystonia, and parkinsonism).",
            "distractors": [
                "ATP7A mutations cause Menkes kinky hair disease (an X-linked copper deficiency disorder).",
                "CAG expansion in huntingtin causes Huntington disease.",
                "PRKN mutations cause autosomal recessive early-onset Parkinson disease.",
                "DMPK expansion causes myotonic dystrophy type 1."
            ],
            "key_point": "Wilson disease is caused by mutations in the ATP7B copper transporter gene, leading to putaminal cavitation, Kayser-Fleischer rings, and wing-beating tremor."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch19-007",
        "chapter": "The Basal Ganglia",
        "section": "Toxin-Induced Basal Ganglia Lesions",
        "page": 505,
        "vignette": "A 34-year-old man is rescued from a burning house fire with smoke inhalation. After initial resuscitation and hyperbaric oxygen therapy, he awakens. However, two weeks later he develops progressive psychomotor slowing, masked facies, severe rigidity in all limbs, and a resting tremor. Brain MRI shows bilateral, symmetric, well-demarcated necrosis restricted to the globus pallidus.",
        "question": "Which toxic exposure is characteristically associated with selective delayed necrosis of the globus pallidus?",
        "options": [
            "Carbon monoxide (CO) poisoning",
            "Methanol ingestion",
            "Lead intoxication",
            "Mercury poisoning (Minamata disease)",
            "MPTP intoxication"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Carbon monoxide (CO) poisoning characteristically produces delayed post-hypoxic encephalopathy and selective bilateral necrosis of the globus pallidus (often extending to the subcortical white matter). The globus pallidus is uniquely vulnerable to CO toxicity due to its high iron content, high metabolic demand, and specific cellular sensitivity to cellular hypoxia and mitochondrial cytochrome c oxidase inhibition. In contrast, methanol poisoning selectively targets the bilateral putamen (putaminal necrosis).",
            "distractors": [
                "Methanol poisoning selectively produces bilateral putaminal necrosis and optic neuropathy.",
                "Lead poisoning causes peripheral motor neuropathy (wrist drop) and diffuse encephalopathy in children, not selective globus pallidus cavitation.",
                "Mercury poisoning targets the visual cortex and cerebellar Purkinje cells.",
                "MPTP selectively destroys dopaminergic neurons in the substantia nigra pars compacta."
            ],
            "key_point": "Carbon monoxide poisoning classically produces bilateral necrosis of the globus pallidus; methanol poisoning characteristically produces bilateral necrosis of the putamen."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch19-008",
        "chapter": "The Basal Ganglia",
        "section": "Sydenham Chorea and PANDAS",
        "page": 502,
        "vignette": "An 11-year-old girl is brought to the clinic because of rapid, uncoordinated, purposeless jerking movements of her face and hands, emotional lability, and obsessive-compulsive behaviors that developed 6 weeks after an untreated episode of pharyngitis. Throat culture 6 weeks ago had grown group A beta-hemolytic Streptococcus.",
        "question": "What is the underlying immunological mechanism of Sydenham chorea in acute rheumatic fever?",
        "options": [
            "Molecular mimicry: anti-streptococcal antibodies cross-react with neuronal surface antigens (tubulin and gangliosides) in the basal ganglia",
            "Direct bacterial invasion of the subthalamic nucleus forming microabscesses",
            "Immune complex vasculitis occluding the lenticulostriate arteries",
            "Autoimmune demyelination of the corticospinal tract in the corona radiata",
            "Cytotoxic CD8+ T-cell attack against dopamine receptors in the substantia nigra"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Sydenham chorea (St. Vitus dance) is a major manifestation of acute rheumatic fever following group A beta-hemolytic streptococcal infection. It is mediated by molecular mimicry: host antibodies raised against streptococcal antigens (such as group A carbohydrate and M protein) cross-react with autoantigens on the surface of striatal neurons in the basal ganglia (such as lysoganglioside GM1 and tubulin), inducing calcium calmodulin kinase II activation and excessive dopamine release, leading to chorea, motor impersistence, and emotional lability.",
            "distractors": [
                "Sydenham chorea is an immune-mediated post-infectious disorder, not direct bacterial invasion or cerebral abscess formation.",
                "It is mediated by cross-reactive autoantibodies, not primary immune complex occlusive arteritis.",
                "Demyelination is not a feature of Sydenham chorea.",
                "The primary mechanism is antibody-mediated cross-reactivity against striatal gangliosides, not CD8+ T-cell destruction of substantia nigra."
            ],
            "key_point": "Sydenham chorea is caused by molecular mimicry where post-streptococcal autoantibodies cross-react with striatal neuronal surface antigens in the basal ganglia."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 20: Cerebral Cortex
ch20_questions = [
    {
        "id": "ch20-003",
        "chapter": "The Cerebral Cortex",
        "section": "Aphasia Syndromes: Conduction Aphasia",
        "page": 518,
        "vignette": "A 58-year-old right-handed man presents with a sudden speech abnormality after a cardioembolic stroke. During testing, his spontaneous speech is fluent and effortless, though peppered with phonemic paraphasias (e.g., saying 'plip' for 'clip'). His auditory comprehension is remarkably intact, and he readily obeys complex multi-step commands. However, when asked to repeat the simple phrase 'No ifs, ands, or buts', he is completely unable to do so, repeatedly stumbling and producing distorted phonemes.",
        "question": "Which white matter tract / cortical region disconnection classically characterizes conduction aphasia?",
        "options": [
            "Arcuate fasciculus / superior longitudinal fasciculus connecting Wernicke and Broca areas",
            "Corpus callosum anterior forceps connecting bilateral frontal lobes",
            "Uncinate fasciculus connecting amygdala to orbitofrontal cortex",
            "Inferior longitudinal fasciculus connecting occipital to temporal cortex",
            "Anterior commissure connecting bilateral middle temporal gyri"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Conduction aphasia is classical disconnective aphasia characterized by: (1) FLUENT spontaneous speech with prominent phonemic paraphasias, (2) INTACT auditory comprehension, and (3) DISPROPORTIONATELY SEVERE impairment in repetition. It is caused by lesions in the arcuate fasciculus (or supramarginal gyrus / auditory-motor interface area Spt) in the dominant parietal/temporal operculum, disconnecting Wernicke area (auditory comprehension) from Broca area (motor articulation).",
            "distractors": [
                "The anterior forceps connects bilateral prefrontal cortices; its disruption does not cause isolated severe repetition failure.",
                "The uncinate fasciculus connects the anterior temporal lobe with the orbitofrontal cortex (social behavior and naming), not repetition.",
                "The inferior longitudinal fasciculus connects visual cortex to anterior temporal lobe (visual object recognition).",
                "The anterior commissure mediates interhemispheric transfer of temporal and olfactory information."
            ],
            "key_point": "Conduction aphasia = fluent speech + intact comprehension + severely impaired repetition, localized to the arcuate fasciculus or supramarginal gyrus."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch20-004",
        "chapter": "The Cerebral Cortex",
        "section": "Gerstmann Syndrome",
        "page": 523,
        "vignette": "A 62-year-old right-handed woman is evaluated following an ischemic stroke. On cognitive testing, she cannot perform simple subtraction or addition (acalculia), cannot write sentences or her name despite normal hand motor power (agraphia), cannot identify or distinguish between the fingers on her own hand or the examiner's hand (finger agnosia), and confuses her right hand with her left hand (right-left disorientation). Her speech is fluent and comprehension is intact.",
        "question": "Which cortical region of the dominant (left) hemisphere is damaged in Gerstmann syndrome?",
        "options": [
            "Left angular gyrus (Brodmann area 39) in the inferior parietal lobule",
            "Left Broca area (Brodmann area 44/45) in the inferior frontal gyrus",
            "Left Wernicke area (Brodmann area 22) in the superior temporal gyrus",
            "Right supramarginal gyrus (Brodmann area 40)",
            "Left fusiform gyrus (Brodmann area 37)"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Gerstmann syndrome is a classic tetrad consisting of: (1) Agraphia without alexia, (2) Acalculia (loss of arithmetic capacity), (3) Finger agnosia (inability to recognize, name, or select individual fingers), and (4) Right-left disorientation. This tetrad localizes precisely to a lesion in the dominant (usually left) angular gyrus (Brodmann area 39) in the inferior parietal lobule, or subcortical white matter immediately beneath it, supplied by the angular branch of the middle cerebral artery.",
            "distractors": [
                "Broca area lesions cause expressive nonfluent aphasia, not isolated Gerstmann tetrad.",
                "Wernicke area lesions cause receptive fluent aphasia with impaired comprehension, not preserved comprehension.",
                "Right parietal lesions cause left hemispatial neglect, anosognosia, and constructional apraxia.",
                "Fusiform gyrus lesions cause prosopagnosia (inability to recognize familiar faces), not acalculia and finger agnosia."
            ],
            "key_point": "Gerstmann syndrome (acalculia, agraphia, finger agnosia, right-left disorientation) localizes to the dominant (left) angular gyrus (Brodmann area 39)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch20-005",
        "chapter": "The Cerebral Cortex",
        "section": "Alexia Without Agraphia (Pure Alexia)",
        "page": 525,
        "vignette": "A 66-year-old retired schoolteacher experiences an acute left posterior cerebral artery stroke. When given a pen, he can fluently write a detailed paragraph describing his symptoms. However, a minute later, when asked to read the very paragraph he just wrote, he is completely unable to read it ('I cannot read the words, though I know I wrote them'). Visual field testing shows a complete right homonymous hemianopia.",
        "question": "What two anatomical structures are infarcted/disconnected to produce alexia without agraphia (pure alexia)?",
        "options": [
            "Left primary visual cortex (calcarine cortex) and the splenium of the corpus callosum",
            "Left angular gyrus and the anterior corpus callosum",
            "Bilateral frontal eye fields and the genu of the internal capsule",
            "Left Broca area and the optic chiasm",
            "Left superior temporal gyrus and the arcuate fasciculus"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Alexia without agraphia (pure alexia or Dejerine alexia) is the archetypal cerebral disconnection syndrome. It requires two components: (1) Infarction of the left primary visual cortex (producing a right homonymous hemianopia); and (2) Infarction of the splenium of the corpus callosum (which normally carries visual information from the intact right visual cortex across to the language centers in the left hemisphere). Visual input received by the intact right hemisphere cannot reach the left angular gyrus for reading decoding; however, writing is preserved because the left angular gyrus and Broca area remain intact.",
            "distractors": [
                "A lesion of the left angular gyrus causes alexia WITH agraphia, destroying both reading and writing.",
                "Frontal eye fields control voluntary saccades, not reading comprehension.",
                "Broca area does not cause pure alexia and optic chiasm produces bitemporal hemianopia.",
                "Arcuate fasciculus lesions produce conduction aphasia, not pure alexia."
            ],
            "key_point": "Alexia without agraphia results from combined infarction of the left visual cortex and splenium of the corpus callosum (left PCA occlusion)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch20-006",
        "chapter": "The Cerebral Cortex",
        "section": "Bálint Syndrome",
        "page": 526,
        "vignette": "A 59-year-old woman suffers severe systemic hypotension during coronary artery bypass surgery. Postoperatively, she has profound visual difficulty despite 20/20 visual acuity. When shown a pen and asked to grab it, her hand erratically misses the pen entirely (optic ataxia). When shown a picture containing a comb, a spoon, and a coin, she can see only the spoon and is completely blind to the other objects in the scene (simultanagnosia). She cannot voluntarily direct her gaze toward objects presented in her visual periphery (ocular apraxia / psychic paralysis of gaze).",
        "question": "What is the eponym for this triad (optic ataxia, simultanagnosia, ocular apraxia), and where is the anatomical lesion located?",
        "options": [
            "B\u00e1lint syndrome due to bilateral watershed infarctions of the parieto-occipital association cortices",
            "Anton syndrome due to bilateral striate cortex infarctions",
            "Capgras syndrome due to bifrontal contusions",
            "Charles Bonnet syndrome due to peripheral macular degeneration",
            "Kl\u00fcver-Bucy syndrome due to bilateral anterior temporal lobectomies"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Bálint syndrome is the classic triad of: (1) Simultanagnosia (inability to perceive more than one object at a time or comprehend a visual scene as a whole); (2) Optic ataxia (impaired visually guided reaching in the absence of primary motor or cerebellar deficit); and (3) Ocular apraxia / psychic paralysis of gaze (inability to initiate voluntary saccades to visual targets). It is caused by bilateral infarctions of the posterior parietal and parieto-occipital cortices (Brodmann areas 7 and 19), typically resulting from watershed/borderzone hypoperfusion between the MCA and PCA territories after severe hypotension.",
            "distractors": [
                "Anton syndrome is visual anosognosia (cortical blindness where the patient denies being blind and confabulates visual experiences) due to bilateral calcarine cortex destruction.",
                "Capgras delusion is the belief that familiar persons have been replaced by identical impostors.",
                "Charles Bonnet syndrome refers to vivid, formed visual hallucinations occurring in mentally intact individuals with severe peripheral visual loss.",
                "Klüver-Bucy syndrome involves hyperorality, hypersexuality, and psychic blindness from bilateral amygdala/anterior temporal lesions."
            ],
            "key_point": "Bálint syndrome (simultanagnosia, optic ataxia, ocular apraxia) is caused by bilateral parieto-occipital watershed infarctions (MCA-PCA boundary zone)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch20-007",
        "chapter": "The Cerebral Cortex",
        "section": "Nondominant Parietal Lobe: Hemispatial Neglect",
        "page": 524,
        "vignette": "A 72-year-old man suffers an acute ischemic stroke of the right cerebral hemisphere. On examination, he lies in bed with his head and eyes turned to the right. When asked to draw a clock face, he crowds all the numbers 1 through 12 onto the right half of the circle and completely ignores the left half. When the examiner touches both of the patient's hands simultaneously, he perceives touch only on the right hand (sensory extinction to double simultaneous stimulation), despite perceiving left touch normally when tested alone.",
        "question": "Which cortical region is most critical for directing bilateral spatial attention, whose unilateral lesion produces severe hemispatial neglect?",
        "options": [
            "Right inferior parietal lobule (temporoparietal junction) of the non-dominant hemisphere",
            "Left precentral motor cortex of the dominant hemisphere",
            "Bilateral medial occipital lobes (cuneus and lingual gyri)",
            "Right gyrus rectus in the orbitofrontal cortex",
            "Left superior temporal pole"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The right (nondominant) hemisphere—particularly the right inferior parietal lobule and temporoparietal junction (Brodmann area 39/40)—plays a dominant, asymmetric role in directing spatial attention across BOTH the right and left visual hemispaces. The left hemisphere directs attention almost exclusively to the contralateral right hemispace. Therefore, a right hemispheric lesion leaves only the left hemisphere operating, creating dense, profound neglect of the left hemispace (anosognosia, left hemineglect, clock drawing error, sensory extinction). A left hemispheric lesion rarely causes severe neglect because the intact right hemisphere attends to both sides.",
            "distractors": [
                "Left precentral motor cortex produces contralateral right hemiplegia without left-sided neglect.",
                "Bilateral medial occipital lesions cause cortical blindness or lower visual field cuts.",
                "The gyrus rectus is involved in olfaction and emotional regulation, not visuospatial attention.",
                "The left superior temporal pole mediates auditory memory and semantic processing."
            ],
            "key_point": "Right inferior parietal lobule / temporoparietal junction lesions produce contralateral hemispatial neglect because the right hemisphere uniquely attends to both hemispaces."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch20-008",
        "chapter": "The Cerebral Cortex",
        "section": "Frontal Eye Field (FEF) Lesions",
        "page": 516,
        "vignette": "A 65-year-old man suffers an acute destructive ischemic stroke of the right frontal lobe involving Brodmann area 8. On examination, his eyes are conjugate and deviated to the right ('looking toward the lesion'). He cannot voluntarily look to the left. However, when the examiner briskly turns the patient's head to the right, his eyes reflexively deviate smoothly and fully across to the left (positive oculocephalic reflex).",
        "question": "What neuroanatomical pathway does the frontal eye field (FEF) drive to produce horizontal saccades, and why did the doll's eye maneuver succeed?",
        "options": [
            "FEF drives the CONTRALATERAL pontine paramedian reticular formation (PPRF) via crossed descending corticopontine pathways; the oculocephalic reflex uses an intact brainstem VOR circuit that bypasses the cortex",
            "FEF drives the ipsilateral abducens nucleus directly; the reflex activates the cerebellum",
            "FEF projects to the spinal accessory nucleus to turn the head first; the reflex acts through the cervical cord",
            "FEF controls only vertical saccades; the horizontal deviation was purely an epileptic focus",
            "FEF innervates the medial rectus directly without brainstem relays"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The frontal eye field (FEF, Brodmann area 8) initiates voluntary, fast horizontal saccades to the CONTRALATERAL side by sending descending fibers that decussate at the pontine level to activate the contralateral paramedian pontine reticular formation (PPRF) and CN VI nucleus. An acute destructive right FEF lesion leaves the left FEF unopposed, driving gaze tonically to the RIGHT ('the patient looks toward the destructive hemispheric lesion'). The preserved oculocephalic reflex (doll's eyes) proves that the lower pontine machinery (PPRF, CN VI, MLF, CN III) is fully intact and activated directly by vestibular labyrinthine afferents.",
            "distractors": [
                "FEF projects to the CONTRALATERAL PPRF, not ipsilateral CN VI directly.",
                "Head turning is driven by SCM, but conjugate saccades are driven by PPRF relays.",
                "FEF coordinates horizontal saccades; vertical saccades are coordinated in the midbrain (riMLF).",
                "FEF does not project monosynaptically to the medial rectus; it requires PPRF and MLF relays."
            ],
            "key_point": "A destructive frontal eye field lesion causes conjugate gaze deviation toward the lesion; preserved oculocephalic reflex confirms the pontine gaze center is intact."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

if __name__ == '__main__':
    add_questions_to_chapter('content/approved/chapter16.json', ch16_questions)
    add_questions_to_chapter('content/approved/chapter17.json', ch17_questions)
    add_questions_to_chapter('content/approved/chapter18.json', ch18_questions)
    add_questions_to_chapter('content/approved/chapter19.json', ch19_questions)
    add_questions_to_chapter('content/approved/chapter20.json', ch20_questions)
