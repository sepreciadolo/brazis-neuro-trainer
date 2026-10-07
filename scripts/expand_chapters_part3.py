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

# CHAPTER 09: Trigeminal Nerve (CN V)
ch09_questions = [
    {
        "id": "ch09-003",
        "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
        "section": "Brainstem Nuclear Anatomy and Tracts",
        "page": 355,
        "vignette": "A 58-year-old man presents with progressive numbness across his face. Sensory testing demonstrates loss of pain and temperature sensation starting circumferentially around the mouth and nose (perioral region), while sensation over the lateral cheeks, jaw angle, and preauricular regions is completely preserved.",
        "question": "An 'onion-skin' (concentric) pattern of facial sensory loss indicates a lesion at which anatomical location?",
        "options": [
            "Main sensory nucleus of V in the midpons",
            "Rostral portion of the spinal trigeminal nucleus (pars oralis)",
            "Caudal portion of the spinal trigeminal nucleus (pars caudalis) / upper cervical spinal cord",
            "Gasserian (semilunar) ganglion in Meckel cave",
            "Mesencephalic nucleus of V in the midbrain"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "The spinal trigeminal tract and nucleus exhibit a somatotopic 'onion-skin' (concentric) arrangement from central to peripheral facial zones. The perioral area projects to the rostral portion of the spinal nucleus (pars oralis / subnucleus oralis), whereas peripheral zones of the face (lateral cheeks, ears) project to the most caudal portion (pars caudalis) reaching down to C2-C3 levels of the cervical cord. Hence rostral lesions affect the perioral core and caudal lesions spare the snout.",
            "distractors": [
                "The main sensory nucleus mediates light touch and conscious proprioception from the entire face, not dissociated concentric thermal/pain patterns.",
                "The pars caudalis mediates pain/temperature for the outer concentric zones (lateral face, hairline) rather than the isolated perioral area.",
                "Lesions of the Gasserian ganglion cause sensory loss along divisional boundaries (V1, V2, V3) rather than concentric 'onion-skin' rings.",
                "The mesencephalic nucleus carries primary afferents for muscle spindle proprioception from masticatory muscles and periodontal ligaments, subserving the jaw jerk."
            ],
            "key_point": "Concentric 'onion-skin' facial sensory loss reflects the rostrocaudal somatotopy of the spinal trigeminal nucleus (rostral/oralis = perioral; caudal = lateral/peripheral face)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch09-004",
        "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
        "section": "Trigeminal Neuralgia and Cisternal Segment",
        "page": 358,
        "vignette": "A 64-year-old woman experiences paroxysms of excruciating, lancinating, electric shock-like pain triggered by touching her upper lip, brushing her teeth, or chewing. The pain lasts 2 to 5 seconds and is confined strictly to the distribution of the right maxillary and mandibular divisions. Her neurological examination, including facial sensation and corneal reflexes, is entirely normal.",
        "question": "What is the most frequent anatomical cause of classical (primary) trigeminal neuralgia?",
        "options": [
            "Vascular compression of the trigeminal root entry zone at the prepontine cistern, usually by the superior cerebellar artery",
            "Demyelinating plaque in the spinal trigeminal tract in the medulla",
            "Compression of the mandibular nerve as it exits through the foramen ovale by a sphenoid wing meningioma",
            "Microvascular ischemia of the gasserian ganglion within Meckel cave",
            "Entrapment of the infraorbital nerve within the maxillary sinus floor"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Classical trigeminal neuralgia is most commonly caused by neurovascular conflict/compression of the trigeminal root entry zone (REZ) in the prepontine cistern as it enters the anterolateral pons, most frequently by an aberrant loop of the superior cerebellar artery (SCA) or occasionally the anterior inferior cerebellar artery (AICA) or petrosal vein. This causes focal demyelination, ephaptic cross-talk, and paroxysmal ectopic firing.",
            "distractors": [
                "Demyelinating plaques in the brainstem (e.g., in multiple sclerosis) cause secondary trigeminal neuralgia, but classical idiopathic neuralgia without exam deficits is predominantly neurovascular.",
                "Foramen ovale compression produces persistent hypesthesia in V3 and motor weakness/atrophy of the temporalis/masseter, absent here.",
                "Microvascular ischemia of Meckel cave causes continuous dull pain and sensory deficit rather than brief electric paroxysms.",
                "Infraorbital nerve entrapment produces persistent localized numbness or pain limited strictly to the cheek and upper teeth without V3 involvement."
            ],
            "key_point": "Neurovascular compression of the trigeminal root entry zone by the superior cerebellar artery (SCA) is the cardinal cause of classical trigeminal neuralgia."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch09-005",
        "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
        "section": "Cavernous Sinus vs Superior Orbital Fissure",
        "page": 361,
        "vignette": "A 45-year-old woman develops progressive severe right retro-orbital pain, complete right ophthalmoplegia (CN III, IV, and VI), ptosis, and numbness over her right forehead and upper cheek down to the upper lip. Sensation over her lower jaw and chin is normal. Corneal reflex is absent on the right.",
        "question": "Which anatomical structure is the lesion localizing to?",
        "options": [
            "Superior orbital fissure",
            "Orbital apex",
            "Cavernous sinus",
            "Meckel cave",
            "Cerebellopontine angle"
        ],
        "correct": 2,
        "explanation": {
            "why_correct": "The presence of CN III, IV, and VI palsies combined with sensory deficits in BOTH the ophthalmic (V1) and maxillary (V2) divisions pinpoints the lesion to the cavernous sinus. The superior orbital fissure transmits III, IV, VI, and V1 (plus sympathetic fibers), but V2 exits the middle cranial fossa separately through the foramen rotundum outside the fissure. Therefore, V2 involvement rules out an isolated superior orbital fissure syndrome.",
            "distractors": [
                "The superior orbital fissure contains III, IV, VI, and V1, but spares V2 (which exits via the foramen rotundum).",
                "The orbital apex syndrome involves III, IV, VI, V1 AND the optic nerve (CN II, causing visual loss/afferent pupillary defect); optic nerve involvement is absent here and V2 is spared at the apex.",
                "Meckel cave lesions affect V1, V2, and V3 (or predominantly V) without early complete palsies of III, IV, and VI.",
                "Cerebellopontine angle lesions typically involve CN VII and VIII early, alongside V, but spare III and IV."
            ],
            "key_point": "Sensory loss in both V1 and V2 accompanied by ophthalmoplegia (III, IV, VI) localizes to the cavernous sinus, because V2 does not traverse the superior orbital fissure."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch09-006",
        "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
        "section": "Reflex Arcs and Motor Division",
        "page": 356,
        "vignette": "A 68-year-old man undergoes neurological evaluation for suspected amyotrophic lateral sclerosis. Tapping the examiner's finger placed horizontally across the patient's half-open chin elicits a brisk, hyperactive jaw closure (hyperactive jaw jerk reflex).",
        "question": "Which of the following statements correctly describes the anatomical pathways of the jaw jerk reflex?",
        "options": [
            "Afferent fibers synapse in the main sensory nucleus of V; efferents travel via the facial nerve (CN VII)",
            "Primary afferent cell bodies reside uniquely in the mesencephalic nucleus of V; efferents originate in the trigeminal motor nucleus",
            "Primary afferents travel through the maxillary division (V2); efferents travel through the mandibular division (V3)",
            "Afferent fibers descend to the spinal trigeminal nucleus; efferents exit via the glossopharyngeal nerve (CN IX)",
            "The reflex arc is polysynaptic traversing the reticular formation and bilateral nucleus ambiguus"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "The jaw jerk is a monosynaptic deep tendon (stretch) reflex. The primary sensory afferents from masseter muscle spindles travel via V3 and have their unipolar cell bodies located directly within the CNS in the mesencephalic trigeminal nucleus (the only primary sensory cell bodies within the central neural axis). Collaterals synapse directly onto the motor nucleus of V in the midpons, which innervates the masticatory muscles via V3. A pathologically brisk jaw jerk signifies a bilateral supranuclear (corticobulbar) lesion above the midpons.",
            "distractors": [
                "Afferents do not synapse in the main sensory nucleus, and efferents travel via V3 to the masseter/temporalis, not the facial nerve.",
                "Both the afferent and efferent limbs travel exclusively in the mandibular division (V3), not V2.",
                "The spinal trigeminal nucleus mediates pain and temperature, not muscle spindle stretch proprioception, and CN IX is not involved in jaw closure.",
                "The jaw jerk is a monosynaptic stretch reflex, not a polysynaptic reticular/ambiguus pathway."
            ],
            "key_point": "The jaw jerk is a monosynaptic stretch reflex: afferents have cell bodies in the mesencephalic nucleus of V and synapse directly on the motor nucleus of V (both limbs in V3)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch09-007",
        "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
        "section": "Corneal Reflex Localization",
        "page": 357,
        "vignette": "A 52-year-old man presents with an acoustic neuroma (vestibular schwannoma). Examination reveals that when the right cornea is touched with a wisp of cotton, neither the right eye nor the left eye blinks. However, when the left cornea is touched, both the right eye and the left eye blink normally and promptly.",
        "question": "Where is the defect in this corneal reflex arc localized?",
        "options": [
            "Right efferent limb (right facial nerve / orbicularis oculi)",
            "Left efferent limb (left facial nerve / orbicularis oculi)",
            "Right afferent limb (right ophthalmic division V1 or spinal trigeminal tract)",
            "Bilateral corticobulbar tract lesion in the genu of the internal capsule",
            "Left afferent limb (left ophthalmic division V1)"
        ],
        "correct": 2,
        "explanation": {
            "why_correct": "The corneal reflex consists of an afferent limb via CN V1 (nasociliary branch) synapsing in the spinal trigeminal nucleus, with interneurons projecting bilaterally to both facial motor nuclei (CN VII) to produce direct and consensual blinking. When stimulating the right cornea fails to produce a blink in either eye (direct and consensual absent), but stimulating the left cornea produces bilateral blinks (proving both right and left CN VII efferent pathways are fully functional), the lesion is strictly isolated to the right afferent limb (right V1 / spinal nucleus).",
            "distractors": [
                "If the right CN VII (efferent) were defective, left corneal stimulation would blink only the left eye (the right eye would fail to blink consensually). Here left stimulation produced bilateral blinks.",
                "If the left CN VII were defective, left stimulation would not blink the left eye.",
                "Corticobulbar upper motor neuron lesions do not abolish the brainstem corneal reflex arc.",
                "The left afferent limb is intact because touching the left cornea successfully produces bilateral responses."
            ],
            "key_point": "Failure of both eyes to blink upon unilateral corneal stimulation, while contralateral stimulation produces bilateral blinks, identifies a defect in the afferent limb (CN V1) on the unresponsive side."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch09-008",
        "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
        "section": "Motor Trigeminal Lesions and Foramen Ovale",
        "page": 364,
        "vignette": "A 39-year-old woman develops weakness of chewing on the left side following resection of a skull base lesion at the foramen ovale. On examination, when she opens her mouth, her jaw deviates distinctly to the left. Palpation of the left temporalis and masseter shows reduced muscle bulk and lack of contraction during teeth clenching.",
        "question": "Why does the jaw deviate toward the side of the lesion in a lower motor neuron trigeminal deficit?",
        "options": [
            "Hyperactivity of the ipsilateral masseter muscle pulls the mandible toward the affected side",
            "Unapposed action of the intact contralateral lateral pterygoid muscle pushes the mandible toward the paralyzed side",
            "Spasm of the ipsilateral medial pterygoid muscle shifts the condylar head",
            "Paralysis of the contralateral buccinator muscle allows the jaw to drift",
            "Weakness of the ipsilateral digastric posterior belly drops the jaw angle"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "The lateral pterygoid muscle normally protrudes the mandible and moves it toward the opposite side. When the left motor division of V (V3) is paralyzed, the intact right lateral pterygoid muscle acts unopposed during jaw opening and pushes the mandible across toward the weak (left) side. Thus, the jaw deviates TOWARD the side of the lesion.",
            "distractors": [
                "The masseter on the affected side is paralyzed and atrophic, not hyperactive.",
                "The medial pterygoid elevates and assists in protrusion; it is denervated on the left side, not in spasm.",
                "The buccinator is innervated by the facial nerve (CN VII) and flattens the cheek, playing no primary role in mandibular deviation.",
                "The posterior belly of the digastric is innervated by CN VII, whereas the anterior belly is innervated by CN V3; weakness of the anterior belly does not drive mandibular lateral deviation."
            ],
            "key_point": "In lower motor neuron lesions of CN V3, the jaw deviates toward the paralyzed side on opening due to the unopposed action of the contralateral lateral pterygoid."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 10: Facial Nerve (CN VII)
ch10_questions = [
    {
        "id": "ch10-003",
        "chapter": "Cranial Nerve VII (The Facial Nerve)",
        "section": "Central vs Peripheral Facial Palsy",
        "page": 372,
        "vignette": "A 62-year-old man presents to the emergency room with an acute facial droop on the right side. On examination, he has flattening of the right nasolabial fold and weakness of the right corner of the mouth. However, when asked to wrinkle his forehead and raise his eyebrows, both sides of his forehead wrinkle symmetrically, and he can close both eyes tightly with full strength.",
        "question": "What anatomical principle explains the sparing of the upper facial muscles in this patient?",
        "options": [
            "The frontalis muscle is innervated by the trigeminal nerve rather than the facial nerve",
            "The upper facial motor subnuclei receive bilateral corticobulbar projections from the motor cortices",
            "The upper facial branches exit the temporal bone through a separate canal that bypasses the lesion",
            "The frontalis muscle possesses abundant intrinsic pacemakers independent of neural control",
            "The contralateral facial nerve sends crossing peripheral anastomoses in the scalp"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "The facial motor nucleus has a distinct somatotopy: the upper subnucleus (innervating the frontalis and upper orbicularis oculi) receives bilateral corticobulbar innervation from both cerebral hemispheres. In contrast, the lower subnucleus (innervating perioral muscles) receives almost exclusively contralateral corticobulbar projections. Therefore, a unilateral central upper motor neuron (UMN) lesion (e.g., motor cortex or internal capsule) paralyzes only the contralateral lower face, while forehead wrinkling and eye closure are preserved.",
            "distractors": [
                "The frontalis muscle is strictly innervated by the temporal branch of the facial nerve (CN VII), not the trigeminal nerve.",
                "All peripheral branches of CN VII arise after the single motor root traverses the facial canal; there is no separate canal for upper branches.",
                "Skeletal muscle does not possess intrinsic pacemakers.",
                "There is no functional peripheral cross-innervation across the midline of the scalp that compensates for lower motor neuron denervation."
            ],
            "key_point": "Upper motor neuron facial palsy spares the forehead due to bilateral corticobulbar input to the upper facial motor subnuclei; lower motor neuron (peripheral) lesions paralyze the entire hemiface."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch10-004",
        "chapter": "Cranial Nerve VII (The Facial Nerve)",
        "section": "Geniculate Ganglion and Ramsay Hunt Syndrome",
        "page": 376,
        "vignette": "A 54-year-old woman presents with severe right otalgia, followed two days later by complete right hemifacial paralysis, ipsilateral taste loss on the anterior tongue, and reduced lacrimation in the right eye. Otoscopy reveals erythematous, painful vesicular eruptions clustered in the right external auditory canal and concha of the auricle.",
        "question": "What is the primary anatomical site of herpes zoster reactivation in this condition (Ramsay Hunt syndrome)?",
        "options": [
            "Geniculate ganglion of the facial nerve",
            "Gasserian ganglion of the trigeminal nerve",
            "Sphenopalatine (pterygopalatine) ganglion",
            "Superior cervical ganglion",
            "Spiral ganglion of the cochlea"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Ramsay Hunt syndrome (herpes zoster oticus) represents reactivation of latent varicella-zoster virus in the geniculate ganglion of CN VII. Because the lesion affects the nerve at or proximal to the geniculate ganglion, it causes: (1) complete LMN facial palsy (motor root), (2) loss of lacrimation (greater superficial petrosal nerve), (3) loss of anterior tongue taste and submandibular salivation (chorda tympani), and (4) painful vesicles in the sensory cutaneous zone of CN VII (external auditory canal, concha, and tragus).",
            "distractors": [
                "Gasserian ganglion reactivation causes herpes zoster ophthalmicus or maxillary/mandibular shingles, without complete peripheral facial motor palsy.",
                "The sphenopalatine ganglion is a parasympathetic relay station in the pterygopalatine fossa; VZV does not primarily establish latency here.",
                "The superior cervical ganglion is sympathetic; its involvement causes Horner syndrome, not acute facial palsy and vesicles in the ear.",
                "While the spiral ganglion and CN VIII are frequently affected in contiguous inflammation (causing sensorineural hearing loss and vertigo), the primary epicenter and facial nerve latency site is the geniculate ganglion."
            ],
            "key_point": "Ramsay Hunt syndrome results from varicella-zoster virus reactivation in the geniculate ganglion, causing facial paralysis, ear canal vesicles, hyperacusis, and loss of lacrimation/taste."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch10-005",
        "chapter": "Cranial Nerve VII (The Facial Nerve)",
        "section": "Intratemporal Localization and Branch Points",
        "page": 374,
        "vignette": "A 34-year-old man presents with complete right peripheral facial paralysis and painful sensitivity to loud sounds (hyperacusis) in his right ear. Taste sensation on the anterior two-thirds of the tongue is lost, but Schirmer test demonstrates normal and symmetric tearing in both eyes.",
        "question": "Based on the branch points of the facial nerve within the fallopian canal, where is this lesion localized?",
        "options": [
            "In the internal acoustic meatus proximal to the geniculate ganglion",
            "In the facial canal between the branching of the greater superficial petrosal nerve and the nerve to the stapedius",
            "At the stylomastoid foramen distal to all intratemporal branches",
            "Within the parotid gland involving the pes anserinus",
            "In the facial canal distal to the branching of the chorda tympani"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "The facial nerve branches sequentially within the temporal bone: (1) Greater superficial petrosal nerve (lacrimation) leaves at the geniculate ganglion; (2) Nerve to the stapedius (dampens loud sounds) branches in the mastoid segment; (3) Chorda tympani (taste to anterior 2/3 tongue, submandibular/lingual salivation) leaves before the stylomastoid foramen; (4) Motor branches exit the stylomastoid foramen. Since lacrimation is normal, the lesion is distal to the geniculate ganglion/greater superficial petrosal nerve. Since hyperacusis and taste loss are present, the lesion is proximal to (or at) the nerve to the stapedius.",
            "distractors": [
                "A lesion in the internal acoustic meatus would abolish lacrimation (Schirmer test abnormal) and typically affect CN VIII.",
                "A lesion at the stylomastoid foramen spares the stapedius (no hyperacusis) and spares the chorda tympani (normal taste).",
                "A lesion in the parotid gland produces purely motor facial weakness without hyperacusis, taste loss, or tearing defects.",
                "A lesion distal to the chorda tympani would cause facial palsy without hyperacusis and without taste loss."
            ],
            "key_point": "Preserved lacrimation with hyperacusis and taste loss localizes the facial nerve lesion within the fallopian canal between the greater petrosal nerve branch and the nerve to the stapedius."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch10-006",
        "chapter": "Cranial Nerve VII (The Facial Nerve)",
        "section": "Brainstem Fascicular Syndromes",
        "page": 378,
        "vignette": "A 59-year-old hypertensive man experiences sudden diplopia and weakness. Neurological exam reveals complete right peripheral-type facial palsy (forehead, eye, and mouth), inability to abduct the right eye on attempted rightward horizontal gaze (right sixth nerve palsy), and dense left-sided hemiparesis sparing the left face.",
        "question": "Which pontine syndrome is described, and what specific brainstem structures are damaged?",
        "options": [
            "Millard-Gubler syndrome (ventrolateral pontine lesion involving CN VI/VII fascicles and corticospinal tract)",
            "Foville syndrome (dorsal pontine tegmentum involving PPRF, CN VI nucleus, and facial colliculus)",
            "Raymond syndrome (ventral medial pons involving CN VI fascicle and corticospinal tract only)",
            "Benedikt syndrome (midbrain tegmentum involving CN III fascicle and red nucleus)",
            "Wallenberg syndrome (dorsolateral medulla involving nucleus ambiguus and spinothalamic tract)"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Millard-Gubler syndrome is a classic ventral pontine syndrome caused by occlusion of circumferential branches of the basilar artery. It damages: (1) exiting fascicles of CN VI (causing ipsilateral lateral rectus palsy), (2) exiting fascicles of CN VII (causing ipsilateral lower motor neuron facial palsy), and (3) the uncrossed corticospinal tract (causing contralateral hemiparesis). In contrast, Foville syndrome involves the pontine paramedian reticular formation (PPRF) or CN VI nucleus causing conjugate gaze palsy rather than isolated abducens palsy.",
            "distractors": [
                "Foville syndrome features conjugate horizontal gaze palsy to the side of the lesion (PPRF/abducens nucleus lesion) rather than an isolated abducens nerve fascicular palsy.",
                "Raymond syndrome involves CN VI fascicle and corticospinal tract, sparing CN VII.",
                "Benedikt syndrome is in the midbrain (CN III + red nucleus tremor/ataxia), not the pons.",
                "Wallenberg syndrome is in the dorsolateral medulla, causing Horner, ataxia, and crossed analgesia, not hemiparesis or facial motor palsy."
            ],
            "key_point": "Millard-Gubler syndrome = ipsilateral CN VI and CN VII fascicular palsies + contralateral corticospinal hemiparesis (ventral caudal pons)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch10-007",
        "chapter": "Cranial Nerve VII (The Facial Nerve)",
        "section": "Aberrant Regeneration / Synkinesis",
        "page": 375,
        "vignette": "One year after an episode of severe idiopathic Bell palsy on the left side, a 42-year-old woman notes that whenever she smiles or talks, her left eyelid involuntarily twitches and narrows. In addition, when eating meals, she experiences copious tearing from her left eye ('crocodile tears' or Bogorad syndrome).",
        "question": "What pathophysiology accounts for this constellation of post-paralytic symptoms?",
        "options": [
            "Central cortical reorganization in the contralateral primary motor strip",
            "Misdirection and aberrant regeneration of regenerating peripheral facial nerve axons into inappropriate target branches",
            "Autoimmune demyelination of the geniculate ganglion and greater petrosal nerve",
            "Persistent viral infection within the lacrimal and submandibular glands",
            "Denervation supersensitivity of the sphenopalatine ganglion receptors alone"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "Following axonal injury (axonotmesis or neurotmesis) in Bell palsy, regenerating motor and autonomic axons misroute into distal Schwann cell sheaths intended for other targets. Motor-motor synkinesis occurs when voluntary smile axons reinnervate the orbicularis oculi, causing eye closure during mouth movement. Autonomic synkinesis ('gustatolacrimal reflex' or crocodile tears) occurs when regenerating secretomotor parasympathetic fibers originally destined for the submandibular/lingual glands (via chorda tympani) inadvertently misroute via the greater superficial petrosal nerve to the pterygopalatine ganglion and lacrimal gland, causing tearing during salivation/eating.",
            "distractors": [
                "Central cortical reorganization does not cause peripheral autonomic crocodile tears or local fascicular co-contraction.",
                "Autoimmune demyelination causes conduction block, not precise cross-wiring between salivary and lacrimal pathways.",
                "Persistent viral infection does not cause structured meal-induced tearing and motor synkinesis.",
                "Denervation supersensitivity may lower threshold, but true gustatory lacrimation requires aberrant axonal sprouting of salivary parasympathetic fibers into lacrimal pathways."
            ],
            "key_point": "Aberrant axonal regeneration after facial nerve injury causes motor synkinesis (mouth-eye co-contraction) and crocodile tears (salivary secretomotor axons misrouting to the lacrimal gland)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch10-008",
        "chapter": "Cranial Nerve VII (The Facial Nerve)",
        "section": "Emotional vs Volitional Facial Paresis",
        "page": 371,
        "vignette": "A 55-year-old woman who suffered a right subcortical thalamocapsular stroke demonstrates marked left lower facial weakness when asked to smile or show her teeth on command. However, when the examiner tells a humorous joke, she laughs spontaneously and symmetrically, with vigorous and equal elevation of both mouth corners.",
        "question": "This dissociation between volitional and emotional facial movement ('voluntary facial paresis') is due to disruption of which pathway, with preservation of which alternative pathway?",
        "options": [
            "Disruption of corticobulbar motor fibers with preservation of non-pyramidal limbic/thalamic emotional motor inputs",
            "Disruption of peripheral facial motor root with preserved sensory trigeminal reflexes",
            "Disruption of the facial motor nucleus with preserved cerebellar projections",
            "Disruption of the emotional limbic motor system with intact voluntary pyramidal motor tracts",
            "Bilateral pontine tegmental infarction sparing the corticospinal bundles"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Facial movements have dual descending supranuclear control: (1) Voluntary (volitional) motor control travels from the precentral motor cortex via the classical corticobulbar tract through the internal capsule to the facial motor nucleus. (2) Emotional (mimetic/spontaneous) facial movement originates in limbic structures, supplementary motor area, and anterior cingulate/thalamus, descending through non-pyramidal reticular pathways. Lesions of the motor strip or internal capsule cause 'voluntary facial paresis' (paralysis on command, normal with genuine laughter). Conversely, lesions in the thalamus or anterior frontal lobe can cause 'emotional facial paresis' (paresis during laughter, intact on command).",
            "distractors": [
                "Peripheral facial nerve lesions abolish BOTH voluntary and emotional movements identically.",
                "Nuclear facial lesions cause lower motor neuron paralysis of both voluntary and emotional movements.",
                "Disruption of emotional pathways would produce emotional facial paresis (asymmetry on laughing, intact smiling on command), the exact opposite of this patient.",
                "Pontine tegmental lesions involving the nucleus would paralyze both forms of facial movement."
            ],
            "key_point": "Voluntary facial paresis (paresis on command, normal on spontaneous laughter) results from disruption of the corticobulbar tract with preservation of descending limbic/emotional motor pathways."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 11: Vestibulocochlear Nerve (CN VIII)
ch11_questions = [
    {
        "id": "ch11-003",
        "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
        "section": "Acoustic Neuroma / Cerebellopontine Angle",
        "page": 388,
        "vignette": "A 48-year-old man presents with slowly progressive hearing loss in his left ear over 3 years, associated with high-pitched tinnitus and mild unsteadiness when walking in the dark. Audiometry confirms left high-frequency sensorineural hearing loss with poor speech discrimination. On exam, he has an absent left corneal reflex and mild left-sided past-pointing on finger-to-nose testing.",
        "question": "What is the most characteristic anatomical origin of this mass lesion (vestibular schwannoma)?",
        "options": [
            "Schwann cell sheath of the inferior or superior vestibular nerve within the internal acoustic meatus",
            "Ependymal lining of the fourth ventricle extending through the foramen of Luschka",
            "Arachnoid cap cells of the petrous ridge dura",
            "Cochlear nerve root entry zone in the pontomedullary junction",
            "Facial nerve sensory fascicles in the fallopian canal"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Vestibular schwannomas (traditionally called acoustic neuromas) arise almost exclusively from the Schwann cell sheath of the vestibular division of CN VIII (most commonly the inferior vestibular nerve) within the internal auditory canal (IAC) near the Obersteiner-Redlich transition zone. As the tumor expands, it protrudes into the cerebellopontine angle, compressing the adjacent cochlear nerve (causing hearing loss and tinnitus), CN VII (corneal reflex efferent, though motor fibers resist compression), CN V (corneal reflex afferent, causing early corneal hypesthesia), and the middle cerebellar peduncle.",
            "distractors": [
                "Ependymomas arise from fourth ventricle ependyma; they are not benign Schwann cell sheath neoplasms.",
                "Meningiomas arise from arachnoid cap cells; while they can occur at the CPA, the classical tumor presenting as described in the IAC is a vestibular schwannoma.",
                "The cochlear nerve itself is compressed secondary to the vestibular nerve tumor; schwannomas rarely originate directly on the acoustic division.",
                "Facial nerve schwannomas are rare (<1%) and present with early primary peripheral facial palsy rather than insidious hearing loss and tinnitus."
            ],
            "key_point": "Vestibular schwannomas originate from the Schwann cell sheath of the vestibular nerve inside the internal acoustic meatus and compress the cochlear nerve, CN V, and cerebellum at the CPA."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch11-004",
        "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
        "section": "Acute Vestibular Syndrome: HINTS Exam",
        "page": 393,
        "vignette": "A 68-year-old diabetic woman presents with acute continuous vertigo, nausea, and gait ataxia lasting 6 hours. Bedside examination shows horizontal nystagmus that beats to the right on rightward gaze and beats to the left on leftward gaze (direction-changing nystagmus). The head impulse test (HIT) shows normal, sharp fixation maintenance without any corrective catch-up saccades. Alternate cover testing reveals a vertical divergence (skew deviation).",
        "question": "Based on the HINTS (Head Impulse, Nystagmus, Test of Skew) algorithm, what is the most likely diagnosis?",
        "options": [
            "Acute vestibular neuritis (peripheral vestibulopathy)",
            "Benign paroxysmal positional vertigo (BPPV)",
            "Posterior circulation stroke (e.g., cerebellar or brainstem infarction)",
            "Meniere disease attack",
            "Ototoxicity from aminoglycoside therapy"
        ],
        "correct": 2,
        "explanation": {
            "why_correct": "The HINTS protocol distinguishes peripheral vestibulopathy from central posterior circulation stroke in acute vestibular syndrome with greater sensitivity than early MRI. The findings pointing to a CENTRAL stroke ('INFARCT' rule) are: (1) Normal Head Impulse Test (in peripheral neuritis, the vestibulo-ocular reflex is defective, producing a corrective catch-up saccade); (2) Direction-Changing Nystagmus (peripheral nystagmus is unidirectional, beating away from the diseased ear); and (3) Skew Deviation (vertical misalignment on alternate cover test indicates central otolith/brainstem pathway injury).",
            "distractors": [
                "Vestibular neuritis causes an abnormal head impulse test (refixation saccade toward affected ear), unidirectional horizontal-torsional nystagmus, and no skew deviation.",
                "BPPV causes brief episodic vertigo provoked by head positioning (seconds), not hours of continuous acute vertigo at rest.",
                "Meniere disease presents with episodic vertigo with prominent auditory symptoms (fluctuating low-frequency hearing loss, roaring tinnitus), not direction-changing nystagmus and skew deviation.",
                "Ototoxicity causes bilateral vestibulopathy without skew deviation or acute asymmetric central signs."
            ],
            "key_point": "In the HINTS exam, a NORMAL head impulse test, direction-changing nystagmus, or skew deviation indicates a central etiology (posterior circulation stroke)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch11-005",
        "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
        "section": "Benign Paroxysmal Positional Vertigo (BPPV)",
        "page": 391,
        "vignette": "A 56-year-old woman experiences brief, 20-second episodes of intense rotational vertigo when rolling over to the right side in bed or looking up at a high shelf. When the examiner quickly lowers her from a seated position to supine with her head turned 45 degrees to the right and extended 20 degrees (Dix-Hallpike maneuver), after a 5-second latency she develops torsional upbeating nystagmus and severe vertigo that fatigues after 25 seconds.",
        "question": "What is the underlying pathophysiology and the most frequently involved semicircular canal?",
        "options": [
            "Canalithiasis (free-floating otoconia) within the posterior semicircular canal",
            "Endolymphatic hydrops distending the cochlear duct and saccule",
            "Cupulolithiasis of the horizontal (lateral) semicircular canal",
            "Microvascular compression of the superior vestibular nerve in the cerebellomedullary cistern",
            "Ischemia of the common crus supplied by the labyrinthe artery"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "BPPV is most commonly caused by canalithiasis: dislodged calcium carbonate otoconia (otoliths) from the utricle migrate into the dependent posterior semicircular canal (85-90% of cases). Head position changes cause gravity-driven movement of these particles, creating drag on the endolymph and stimulating the ampullary cupula. The Dix-Hallpike test elicits diagnostic paroxysmal, torsional, upbeating nystagmus with latency and fatigue.",
            "distractors": [
                "Endolymphatic hydrops causes Meniere disease (episodic spontaneous vertigo, low-frequency hearing loss, tinnitus), not brief position-induced positional vertigo.",
                "Horizontal canal BPPV causes purely horizontal direction-changing positional nystagmus (geotropic or apogeotropic) on supine head turns (Pagnini-McClure maneuver), not torsional upbeating.",
                "Microvascular compression produces vestibular paroxysmia (frequent brief vertigo spells at rest lasting seconds, treated with carbamazepine).",
                "Labyrinthine artery ischemia causes acute permanent hearing loss and profound acute peripheral vertigo, not transient fatigueable spells."
            ],
            "key_point": "Posterior canal BPPV (canalithiasis) presents with brief positional vertigo, and a positive Dix-Hallpike test showing latent, fatiguing, torsional upbeating nystagmus."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch11-006",
        "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
        "section": "Audiometric and Tuning Fork Tests",
        "page": 386,
        "vignette": "A 29-year-old woman with a history of recurrent otitis media presents with progressive right-sided hearing loss. A 512-Hz tuning fork placed on the vertex of her head (Weber test) lateralizes distinctly to the right ear. When the fork is placed on her right mastoid process and then moved next to her right ear canal (Rinne test), bone conduction is heard longer and louder than air conduction (BC > AC on the right).",
        "question": "What type of hearing loss does this pattern indicate, and what is its anatomical category?",
        "options": [
            "Right conductive hearing loss (external auditory canal, tympanic membrane, or middle ear ossicles)",
            "Right sensorineural hearing loss (right cochlea or cochlear nerve)",
            "Left sensorineural hearing loss (left cochlea or cochlear nerve)",
            "Central auditory pathway lesion in the lateral lemniscus",
            "Normal physiologic auditory function"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "In a conductive hearing loss (e.g., cerumen impaction, otitis media, otosclerosis), ambient background noise is blocked from entering the affected middle ear, making bone-conducted sound resonate louder in that ear; thus, the Weber test lateralizes to the IMPAIRED ear. The Rinne test normally shows air conduction greater than bone conduction (AC > BC); a negative Rinne test (BC > AC) definitively confirms conductive hearing loss on that side.",
            "distractors": [
                "In right sensorineural hearing loss, the Weber test lateralizes to the UNAFFECTED (left) ear, and the Rinne test remains AC > BC (both reduced, but AC still exceeds BC).",
                "If the patient had left sensorineural loss, Weber would lateralize to the right, but the Rinne in the right ear would be normal (AC > BC), not BC > AC.",
                "Central auditory pathway lesions rostral to the cochlear nuclei do not cause unilateral hearing loss due to extensive bilateral crossover in the trapezoid body and lateral lemniscus.",
                "A negative Rinne (BC > AC) is never normal."
            ],
            "key_point": "Conductive hearing loss: Weber lateralizes to the impaired ear; Rinne test shows bone conduction greater than air conduction (BC > AC) in the affected ear."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch11-007",
        "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
        "section": "Meniere Disease vs Labyrinthitis",
        "page": 390,
        "vignette": "A 44-year-old man experiences recurrent attacks of severe spinning vertigo lasting 2 to 4 hours each, accompanied by roaring tinnitus, a sensation of fullness in his left ear, and fluctuating hearing loss. Pure-tone audiometry performed during an episode shows low-frequency sensorineural hearing loss in the left ear.",
        "question": "What is the underlying histopathologic hallmark of this condition (Meniere disease)?",
        "options": [
            "Endolymphatic hydrops (distention of the endolymphatic system from inadequate absorption)",
            "Purulent bacterial infection of the perilymphatic space",
            "Ischemic microinfarction of the anterior vestibular artery",
            "Demyelination of the internal acoustic canal vestibular root",
            "Dehiscence of the superior semicircular canal bone"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Meniere disease is pathologically characterized by endolymphatic hydrops: excess accumulation and distention of endolymph within the membranous labyrinth (cochlear duct and saccule), likely due to impaired resorption by the endolymphatic sac. This leads to episodic membrane ruptures and mixing of potassium-rich endolymph with perilymph, paralyzing vestibular and cochlear hair cells, generating the clinical tetrad: episodic vertigo (hours), fluctuating low-frequency sensorineural hearing loss, roaring tinnitus, and aural fullness.",
            "distractors": [
                "Purulent bacterial infection of the perilymph causes acute suppurative labyrinthitis, leading to permanent deafness and acute profound labyrinthine destruction.",
                "Ischemia of the anterior vestibular artery causes isolated acute prolonged vertigo sparing hearing (mimicking vestibular neuritis).",
                "Demyelination of CN VIII occurs in multiple sclerosis plaques, producing acute continuous vertigo without low-frequency fluctuant hearing loss and aural pressure.",
                "Superior canal dehiscence syndrome presents with sound- or pressure-induced vertigo and nystagmus (Tullio phenomenon and Hennebert sign) with autophony."
            ],
            "key_point": "Meniere disease is caused by endolymphatic hydrops, presenting with episodic vertigo (hours), fluctuating low-frequency sensorineural hearing loss, roaring tinnitus, and aural fullness."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch11-008",
        "chapter": "Cranial Nerve VIII (The Vestibulocochlear Nerve)",
        "section": "Central Auditory Pathways and Unilateral Hearing Loss",
        "page": 387,
        "vignette": "A 60-year-old man suffers an ischemic stroke resulting in a dense lesion of the right lateral lemniscus and right inferior colliculus in the midbrain. Detailed audiological testing is conducted.",
        "question": "Why do unilateral central lesions of the auditory pathway rostral to the cochlear nuclei rarely, if ever, produce complete unilateral deafness in either ear?",
        "options": [
            "Auditory signals bypass the midbrain entirely via direct reticulospinal relays",
            "Bilateral representation: ascending fibers from each cochlear nucleus decussate extensively at the trapezoid body and project to both inferior colliculi and auditory cortices",
            "The contralateral inner ear hyper-sensitizes its inner hair cells to compensate instantaneously",
            "The medial geniculate body receives auditory information exclusively through bone conduction",
            "Primary auditory cortex is located in the medulla below the level of the stroke"
        ],
        "correct": 1,
        "explanation": {
            "why_correct": "Unlike the visual system or somatic sensory pathways, the auditory system features extensive bilateral representation starting at the lowest levels of the brainstem. Second-order fibers from the ventral and dorsal cochlear nuclei cross through the trapezoid body and acoustic striae to synapse in the superior olivary complex, while ascending fibers form the lateral lemnisci projecting to BOTH inferior colliculi, medial geniculate bodies, and Heschl gyri. Consequently, a unilateral brainstem or cortical lesion rostral to the cochlear nuclei causes impaired sound localization or mild bilateral speech processing deficits, but NEVER unilateral deafness.",
            "distractors": [
                "Auditory signals do not bypass the midbrain; the inferior colliculus is an obligatory relay for hearing.",
                "The inner ear hair cells do not adapt to compensate for central pathway tract transections.",
                "The medial geniculate body receives auditory information from the lateral lemniscus/inferior colliculus, not via direct bone conduction.",
                "Primary auditory cortex (transverse temporal gyri of Heschl) is in the superior temporal gyrus, well rostral to the medulla."
            ],
            "key_point": "Unilateral deafness can only be caused by lesions of the middle/inner ear, cochlear nerve (CN VIII), or cochlear nuclei; rostral central auditory pathway lesions do not cause monaural deafness due to bilateral crossover."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 12: Glossopharyngeal and Vagus Nerves (CN IX and X)
ch12_questions = [
    {
        "id": "ch12-002",
        "chapter": "Cranial Nerves IX and X (Glossopharyngeal and Vagus Nerves)",
        "section": "Glossopharyngeal Neuralgia",
        "page": 402,
        "vignette": "A 61-year-old man complains of sudden, excruciating paroxysms of stabbing, lancinating pain originating deep in his left tonsillar pillar and posterior pharynx, radiating to the left ear canal. The attacks are triggered by swallowing cold liquids, talking, or yawning. During one severe episode in the office, he suddenly loses consciousness for 10 seconds; telemetry reveals profound sinus bradycardia with a 6-second asystolic pause.",
        "question": "What anatomical connection explains the syncope and bradycardia during paroxysms of glossopharyngeal neuralgia?",
        "options": [
            "Afferent pain impulses carried by CN IX stimulate the dorsal motor nucleus of the vagus and nucleus solitarius, triggering excessive efferent vagal parasympathetic discharge",
            "Direct compression of the internal carotid artery by a displaced styloid process",
            "Spread of epileptic seizure discharge across the insular cortex to the sympathetic trunk",
            "Ischemic steal from the vertebrobasilar circulation via the anterior spinal artery",
            "Spasm of the stylopharyngeus muscle compressing the carotid sinus baroreceptors"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Glossopharyngeal neuralgia can cause life-threatening syncope, bradycardia, or asystole. Afferent somatic and visceral pain impulses traveling via the glossopharyngeal nerve enter the nucleus tractus solitarius (NTS) in the medulla. Interneurons from the NTS project directly to the dorsal motor nucleus of the vagus (DMN) and nucleus ambiguus, which provide parasympathetic cardioinhibitory innervation to the heart. Hyperactivity of this reflex arc triggers massive vagal discharge, leading to sinus arrest, high-grade AV block, and neurocardiogenic syncope.",
            "distractors": [
                "Eagle syndrome involves an elongated styloid process, but vascular compression alone does not explain paroxysmal electric triggerable neuralgic pain and reflexive asystole.",
                "Glossopharyngeal neuralgia is a peripheral cranial nerve disorder, not a primary insular cortical epileptic seizure.",
                "Vertebrobasilar steal is unrelated to swallowing-triggered tonsillar pain and reflex bradycardia.",
                "Stylopharyngeus spasm does not mechanically compress the carotid sinus to produce asystole."
            ],
            "key_point": "Glossopharyngeal neuralgia syncope results from afferent CN IX pain impulses reflexively activating medullary vagal nuclei, causing intense bradycardia or asystolic arrest."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch12-003",
        "chapter": "Cranial Nerves IX and X (Glossopharyngeal and Vagus Nerves)",
        "section": "Jugular Foramen Syndrome (Vernet Syndrome)",
        "page": 405,
        "vignette": "A 53-year-old woman presents with hoarseness, difficulty swallowing solids and liquids, and a drooping right shoulder. On examination, she has absent gag reflex on the right, the uvula deviates to the left when she says 'ah', the right vocal cord is paralyzed in an intermediate position, and she has weakness and atrophy of the right trapezius and sternocleidomastoid muscles. Tongue protrusion and movements are entirely normal.",
        "question": "Which anatomical structure transmits the specific nerves involved in this clinical presentation (Vernet syndrome)?",
        "options": [
            "Jugular foramen (transmitting CN IX, X, and XI)",
            "Hypoglossal canal (transmitting CN XII)",
            "Foramen lacerum (transmitting internal carotid artery and deep petrosal nerve)",
            "Foramen magnum (transmitting spinal cord and vertebral arteries)",
            "Stylomastoid foramen (transmitting CN VII)"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Vernet syndrome (jugular foramen syndrome) involves cranial nerves IX, X, and XI as they traverse the jugular foramen in the skull base (frequently by glomus jugulare tumors, schwannomas, or skull base metastases). The deficits include: (1) loss of taste on posterior 1/3 tongue and absent gag reflex (CN IX); (2) dysphagia, hoarseness, vocal cord paralysis, and contralateral uvula deviation (CN X); and (3) trapezius/SCM paralysis (CN XI). Sparing of the tongue (CN XII) confirms the lesion is confined to the jugular foramen and spares the adjacent hypoglossal canal.",
            "distractors": [
                "The hypoglossal canal transmits CN XII; involvement of CN IX, X, XI AND XII constitutes Collet-Sicard syndrome, but CN XII is completely spared here.",
                "Foramen lacerum is filled with fibrocartilage and does not transmit these lower cranial nerves.",
                "Foramen magnum lesions cause lower cranial nerve signs along with upper motor neuron quadriparesis and sensory level, not isolated IX, X, XI palsies.",
                "The stylomastoid foramen transmits the facial nerve (CN VII), which is normal here."
            ],
            "key_point": "Vernet syndrome = paralysis of CN IX, X, and XI due to a lesion at the jugular foramen, sparing the hypoglossal nerve (CN XII)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch12-004",
        "chapter": "Cranial Nerves IX and X (Glossopharyngeal and Vagus Nerves)",
        "section": "Collet-Sicard and Villaret Syndromes",
        "page": 406,
        "vignette": "A 62-year-old man with a carcinoma of the deep lobe of the parotid gland develops dysphagia, hoarseness, right shoulder weakness, and difficulty moving his tongue. Examination reveals loss of the right gag reflex (CN IX), right vocal cord paralysis with uvular deviation to the left (CN X), right trapezius weakness (CN XI), and right tongue hemiatrophy with deviation to the right on protrusion (CN XII). Pupillary and palpebral examinations are normal.",
        "question": "What is the eponym for this lower cranial neuropathy (CN IX, X, XI, and XII), and which space is involved?",
        "options": [
            "Collet-Sicard syndrome (involvement of retroparotid / posterior condylar space)",
            "Villaret syndrome (retroparotid space lesion including the cervical sympathetic trunk)",
            "Vernet syndrome (isolated jugular foramen lesion)",
            "Tapia syndrome (isolated extracranial paralysis of CN X and XII)",
            "Schmidt syndrome (involvement of CN X and XI only)"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Collet-Sicard syndrome is characterized by combined unilateral paralysis of cranial nerves IX, X, XI, and XII. It occurs when a lesion involves the retroparotid space, posterior condylar space, or skull base near both the jugular foramen and hypoglossal canal. In contrast, Villaret syndrome involves all four lower cranial nerves (IX, X, XI, XII) PLUS the cervical sympathetic trunk, producing an ipsilateral Horner syndrome. Because Horner syndrome is absent, this is Collet-Sicard syndrome.",
            "distractors": [
                "Villaret syndrome requires the presence of an ipsilateral Horner syndrome (ptosis, miosis, anhidrosis) alongside IX, X, XI, and XII palsies.",
                "Vernet syndrome affects only IX, X, and XI, completely sparing CN XII.",
                "Tapia syndrome involves CN X and XII, sparing CN IX and XI.",
                "Schmidt syndrome involves CN X and XI, sparing CN IX and XII."
            ],
            "key_point": "Collet-Sicard syndrome involves CN IX, X, XI, and XII; the addition of an ipsilateral Horner syndrome designates Villaret syndrome (retroparotid space)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch12-005",
        "chapter": "Cranial Nerves IX and X (Glossopharyngeal and Vagus Nerves)",
        "section": "Vagal Examination: Palatal and Uvular Movement",
        "page": 404,
        "vignette": "A 50-year-old woman is evaluated for mild dysphagia following endarterectomy. On oral examination, when the patient phonates ('say ah'), the soft palate on the left fails to elevate, and the uvula is pulled upwards and deviates toward the right side.",
        "question": "Which muscle and nerve lesion accounts for this direction of uvular deviation?",
        "options": [
            "Left vagus nerve (CN X) lesion causing paralysis of the left levator veli palatini; unopposed right levator pulls uvula rightward",
            "Right vagus nerve (CN X) lesion causing spasm of the right levator veli palatini",
            "Left glossopharyngeal nerve (CN IX) lesion causing paralysis of the left stylopharyngeus",
            "Right hypoglossal nerve (CN XII) lesion causing asymmetric push against the oropharynx",
            "Left facial nerve (CN VII) lesion causing buccinator paralysis"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The levator veli palatini muscle, innervated by the pharyngeal branch of the vagus nerve (CN X) via the pharyngeal plexus (originating from the nucleus ambiguus), elevates the soft palate during phonation and swallowing. When the left vagus nerve is damaged, the left palate remains flaccid and fails to elevate, while the intact right levator veli palatini contracts normally, pulling the palatal raphe and uvula TOWARD the normal (contralateral/right) side. Thus, the uvula deviates AWAY from the side of the lesion.",
            "distractors": [
                "A right vagus lesion would cause the right palate to droop and the uvula to deviate toward the left side.",
                "The stylopharyngeus is innervated by CN IX and elevates the pharynx during swallowing, but does not primarily elevate the soft palate or pull the uvula.",
                "The hypoglossal nerve innervates the tongue, not the soft palate.",
                "The facial nerve innervates the facial muscles and posterior digastric/stylohyoid, not the palatal musculature."
            ],
            "key_point": "In unilateral vagal (CN X) palsy, the soft palate droops on the affected side and the uvula deviates AWAY from the lesion (toward the normal side) during phonation."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch12-006",
        "chapter": "Cranial Nerves IX and X (Glossopharyngeal and Vagus Nerves)",
        "section": "Recurrent Laryngeal Nerve Palsy",
        "page": 403,
        "vignette": "A 58-year-old smoker presents with persistent hoarseness and a 'bovine' cough of 2 months' duration. Fiberoptic laryngoscopy demonstrates that the left vocal cord is paralyzed in the paramedian position, while the right vocal cord abducts and adducts normally. Soft palate elevation, gag reflex, and all other cranial nerves are completely intact.",
        "question": "Given the unique anatomy of the recurrent laryngeal nerve, which mediastinal lesion is most characteristically associated with this isolated left-sided deficit (Ortner syndrome)?",
        "options": [
            "Aortic arch aneurysm or subaortic/aortopulmonary lymphadenopathy compressing the left recurrent laryngeal nerve",
            "Right subclavian artery aneurysm compressing the right recurrent laryngeal nerve",
            "Sphenoid wing meningioma compressing the superior laryngeal nerve in the neck",
            "Carotid body paraganglioma at the bifurcation of the external and internal carotid arteries",
            "Thymoma in the anterior superior mediastinum compressing the phrenic nerve"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The left recurrent laryngeal nerve has a much longer course than the right: it branches from the vagus in the thorax, loops around the aortic arch (just lateral to the ligamentum arteriosum), and ascends in the tracheoesophageal groove to enter the larynx. It is highly vulnerable to thoracic pathology, including aortic arch aneurysms (cardiovocal or Ortner syndrome), left hilar/aortopulmonary window lymphadenopathy, and apical bronchogenic carcinoma. The right recurrent laryngeal nerve loops much higher around the right subclavian artery and does not enter the mediastinum.",
            "distractors": [
                "The right subclavian artery is related to the right recurrent laryngeal nerve, not the left.",
                "A sphenoid wing meningioma is intracranial and does not produce an isolated vocal cord palsy.",
                "Carotid body tumors occur high in the neck at the carotid bifurcation and affect the main trunk of the vagus (producing palatal paralysis and gag loss as well), not isolated recurrent laryngeal palsy.",
                "Phrenic nerve compression causes diaphragm paralysis/elevation, not vocal cord palsy."
            ],
            "key_point": "The left recurrent laryngeal nerve loops under the aortic arch, making it uniquely vulnerable to mediastinal pathology (e.g., aortic aneurysm, bronchogenic carcinoma, Ortner syndrome)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 13: Spinal Accessory Nerve (CN XI)
ch13_questions = [
    {
        "id": "ch13-002",
        "chapter": "Cranial Nerve XI (The Spinal Accessory Nerve)",
        "section": "Posterior Cervical Triangle Injury",
        "page": 412,
        "vignette": "A 32-year-old woman undergoes an uncomplicated excisional biopsy of a lymph node in the right posterior cervical triangle. Two weeks later, she complains of a constant dull ache in her right neck and shoulder, and difficulty lifting her right arm above her head to dry her hair. On examination, the right shoulder droops, and the vertebral border of her right scapula flares laterally and downward.",
        "question": "Which nerve was most likely injured during this procedure?",
        "options": [
            "Spinal accessory nerve (CN XI) in the posterior triangle of the neck",
            "Long thoracic nerve of Bell supplying the serratus anterior",
            "Dorsal scapular nerve supplying the rhomboids",
            "Suprascapular nerve in the suprascapular notch",
            "Axillary nerve in the quadrangular space"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The spinal accessory nerve (CN XI) has a superficial, vulnerable course as it crosses the posterior cervical triangle (between the posterior border of the sternocleidomastoid and the anterior border of the trapezius), lying just beneath the investing layer of deep cervical fascia. It is the most frequently injured cranial nerve during minor neck procedures (e.g., lymph node biopsy, branchial cleft cyst excision). Denervation of the trapezius produces shoulder droop, impaired arm abduction above horizontal, and lateral/downward winging of the scapula.",
            "distractors": [
                "The long thoracic nerve innervates the serratus anterior; its injury causes MEDIAL winging of the scapula (inferior angle moves medially and posteriorly when pushing against a wall).",
                "The dorsal scapular nerve innervates the rhomboids and levator scapulae; injury causes subtle medial retraction weakness without major shoulder droop.",
                "The suprascapular nerve innervates the supraspinatus and infraspinatus; injury impairs initial 15° abduction and external rotation without trapezius atrophy or shoulder droop.",
                "The axillary nerve innervates the deltoid and teres minor; it is injured in anterior shoulder dislocations or surgical neck humerus fractures."
            ],
            "key_point": "The spinal accessory nerve (CN XI) runs superficially across the posterior cervical triangle; iatrogenic injury during lymph node biopsy causes trapezius palsy, shoulder droop, and lateral scapular winging."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch13-003",
        "chapter": "Cranial Nerve XI (The Spinal Accessory Nerve)",
        "section": "Sternocleidomastoid vs Trapezius Action",
        "page": 410,
        "vignette": "A 45-year-old man sustains a high cervical stab wound damaging the right spinal accessory nerve rootlets as they ascend through the foramen magnum. On physical examination, the examiner assesses the sternocleidomastoid (SCM) muscle.",
        "question": "Weakness of the right sternocleidomastoid muscle causes impairment in which of the following head movements?",
        "options": [
            "Turning the head to the left against resistance",
            "Turning the head to the right against resistance",
            "Extending the neck backwards against resistance",
            "Tucking the chin backward with the head maintained in midline",
            "Tilting the ear toward the left shoulder"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The sternocleidomastoid muscle attaches to the mastoid process and the sternum/clavicle. When the RIGHT SCM contracts, it pulls the mastoid forward and downward, rotating the chin to the OPPOSITE (LEFT) side. Therefore, a lesion of the right SCM or right spinal accessory nerve causes weakness in turning the head to the CONTRALATERAL (LEFT) side against manual resistance.",
            "distractors": [
                "Turning the head to the right against resistance is performed by the LEFT sternocleidomastoid muscle.",
                "Neck extension is mediated by bilateral splenius capitis, semispinalis, and upper trapezius, not SCM.",
                "Retraction of the chin is performed by deep cervical flexors and suboccipital muscles.",
                "Lateral flexion of the neck tilts the head toward the IPSILATERAL (right) shoulder, while rotating the face to the left."
            ],
            "key_point": "Contraction of the sternocleidomastoid muscle rotates the head to the CONTRALATERAL side; a right CN XI lesion impairs head turning to the left."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch13-004",
        "chapter": "Cranial Nerve XI (The Spinal Accessory Nerve)",
        "section": "Central Cortical Control of SCM and Trapezius",
        "page": 411,
        "vignette": "A 64-year-old right-handed woman suffers an acute ischemic stroke of the right cerebral hemisphere involving the precentral motor cortex. On examination, she has left hemiparesis and left lower facial weakness. When her neck musculature is tested, she has difficulty turning her head to the right, while head turning to the left is strong.",
        "question": "What neuroanatomical principle governs the supranuclear (cortical) innervation of the sternocleidomastoid muscle?",
        "options": [
            "The sternocleidomastoid motor subnucleus receives predominantly ipsilateral (uncrossed) corticobulbar innervation from the motor cortex",
            "The sternocleidomastoid receives purely contralateral crossed corticobulbar innervation like standard limb muscles",
            "The sternocleidomastoid receives no cortical innervation and is driven entirely by spinal cord C1-C4 pacemakers",
            "Both sternocleidomastoid muscles receive bilateral symmetric innervation cancelling all unilateral hemispheric stroke deficits",
            "The sternocleidomastoid is innervated exclusively by the cerebellum without corticospinal input"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The corticobulbar control of the SCM is clinically unique: each cerebral hemisphere innervates the IPSILATERAL SCM motor nucleus in the cervical cord (uncrossed). Because the right SCM turns the head to the LEFT, the right cerebral hemisphere normally turns the head to the left (synergistic with the frontal eye field driving leftward gaze and the motor cortex driving the left arm/leg). Therefore, a RIGHT hemispheric stroke paralyzes the right SCM, causing weakness in turning the head to the CONTRALATERAL (LEFT) side, or clinically, the patient's head turns preferentially toward the side of the hemispheric lesion ('looking toward the lesion').",
            "distractors": [
                "If SCM received classical crossed innervation, a right hemispheric lesion would paralyze the left SCM, which turns the head to the right, contradicting clinical observation.",
                "The SCM is under voluntary cortical motor control, not autonomous spinal pacemakers.",
                "Bilateral symmetric innervation would produce no head-turning deficit after a unilateral hemispheric stroke.",
                "The SCM receives robust corticobulbar projection, not cerebellar-exclusive control."
            ],
            "key_point": "Supranuclear control of the sternocleidomastoid is IPSILATERAL; a right hemispheric lesion impairs the right SCM, leading to difficulty turning the head to the left."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch13-005",
        "chapter": "Cranial Nerve XI (The Spinal Accessory Nerve)",
        "section": "Scapular Winging Differential",
        "page": 413,
        "vignette": "A 28-year-old tennis player presents with shoulder asymmetry and fatigue. Physical examination reveals that when the patient's arms are resting by his side, the superior and vertebral borders of the right scapula are displaced laterally, and the shoulder is depressed. When he attempts to abduct the arm laterally, the lateral winging worsens. However, when he performs a wall push-up, there is no medial displacement or posterior flaring of the vertebral border.",
        "question": "How does lateral scapular winging (CN XI / trapezius) differ from medial scapular winging (long thoracic nerve / serratus anterior)?",
        "options": [
            "Trapezius weakness produces lateral winging accented by arm abduction; serratus anterior weakness produces medial winging accented by arm forward flexion and pushing against resistance",
            "Trapezius weakness produces medial winging with arm forward elevation; serratus weakness causes lateral winging when resting",
            "Both nerves produce identical medial winging, distinguished only by electromyography of the biceps brachii",
            "Trapezius paralysis spares scapular position completely because the rhomboids fully substitute for all trapezius vectors",
            "Serratus anterior winging resolves completely when pushing against a wall"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The distinction between trapezius and serratus anterior winging is a high-yield clinical localization point: (1) Trapezius palsy (CN XI) causes LATERAL winging: the vertebral border shifts laterally and the superior angle moves away from the spine; it is accented when abducting the arm laterally in the coronal plane. (2) Serratus anterior palsy (long thoracic nerve) causes MEDIAL winging: the vertebral border moves medially and posterior flaring occurs away from the thoracic wall; it is dramatically accented by pushing against a wall with arms flexed forward in the sagittal plane.",
            "distractors": [
                "This reverses the characteristics: trapezius produces lateral winging, not medial winging with forward elevation.",
                "They produce distinct geometric winging patterns (lateral vs medial) clinically evident on exam without relying on biceps EMG.",
                "Rhomboids retract the scapula medially, but cannot substitute for the extensive upward rotation and stabilization of the trapezius.",
                "Serratus anterior winging is maximal and most prominent during wall push-ups, not resolved."
            ],
            "key_point": "Trapezius palsy (CN XI) = lateral scapular winging accentuated by arm abduction; Serratus anterior palsy (long thoracic nerve) = medial scapular winging accentuated by forward pushing."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch13-006",
        "chapter": "Cranial Nerve XI (The Spinal Accessory Nerve)",
        "section": "Origin and Course of Spinal Accessory Nerve",
        "page": 409,
        "vignette": "A neurosurgeon performs a posterior fossa craniectomy and suboccipital decompression. During exposure of the craniocervical junction and foramen magnum, she identifies the spinal accessory nerve.",
        "question": "From where do the motor rootlets that form the spinal accessory nerve (CN XI) arise, and what path do they take to exit the skull?",
        "options": [
            "Arise from anterior horn cells of C1 to C5-C6 cervical spinal cord, ascend through the foramen magnum into the posterior fossa, and exit through the jugular foramen",
            "Arise from the nucleus ambiguus in the rostral medulla, traverse the internal acoustic meatus, and exit through the stylomastoid foramen",
            "Arise from the spinal trigeminal nucleus in the caudal medulla and exit through the hypoglossal canal",
            "Arise from the dorsal motor nucleus of the vagus and exit through the foramen rotundum",
            "Arise from the cuneate nucleus in the lower medulla and exit through the foramen spinosum"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The spinal accessory nerve is anatomically unique: its motor neurons arise in the accessory nucleus in the posterolateral part of the anterior horn of the upper cervical spinal cord (segments C1 through C5 or C6). The rootlets emerge from the lateral funiculus of the cord, coalesce into a single ascending trunk that enters the posterior cranial fossa through the foramen magnum, and then exits the skull base through the jugular foramen (pars venosa) alongside CN IX and X.",
            "distractors": [
                "The internal acoustic meatus and stylomastoid foramen transmit CN VII and VIII, not CN XI.",
                "The spinal trigeminal nucleus is sensory, not motor, and CN XI exits via the jugular foramen, not the hypoglossal canal.",
                "The dorsal motor nucleus is parasympathetic, and foramen rotundum transmits V2.",
                "The cuneate nucleus is somatic sensory, and foramen spinosum transmits the middle meningeal artery."
            ],
            "key_point": "The spinal accessory nerve originates from upper cervical spinal anterior horns (C1-C5/6), ascends through the foramen magnum, and exits through the jugular foramen."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 14: Hypoglossal Nerve (CN XII)
ch14_questions = [
    {
        "id": "ch14-002",
        "chapter": "Cranial Nerve XII (The Hypoglossal Nerve)",
        "section": "LMN vs UMN Tongue Deviation",
        "page": 418,
        "vignette": "A 52-year-old man presents with progressive dysarthria. When asked to protrude his tongue, the tongue deviates markedly to the left. Inspection of the left half of the tongue reveals pronounced wasting, loss of muscle bulk, furrowing of the mucosal surface, and prominent spontaneous fasciculations. Sensation over the tongue is intact.",
        "question": "What is the localization and mechanism of this tongue deviation?",
        "options": [
            "Left lower motor neuron (LMN) hypoglossal lesion; unopposed action of the intact right genioglossus muscle pushes the tongue to the left",
            "Right upper motor neuron (UMN) corticobulbar lesion; hyperactive right genioglossus pulls the tongue to the left",
            "Left trigeminal nerve lesion; weakness of the left tensor veli palatini permits tongue drift",
            "Right lower motor neuron hypoglossal lesion; atrophy pulls the tongue towards the healthy side",
            "Bilateral nucleus ambiguus lesion affecting pharyngeal constrictor stabilization"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The genioglossus muscle is the primary tongue protruder; its fibers push the tongue forward and toward the OPPOSITE side. In a lower motor neuron (LMN) lesion of the left hypoglossal nerve (nucleus, fascicle, or peripheral nerve), the left genioglossus is paralyzed and atrophic with fasciculations. When the patient protrudes his tongue, the intact right genioglossus contracts unopposed and pushes the tongue toward the weak (left) side ('the tongue points toward the LMN lesion').",
            "distractors": [
                "A right UMN corticobulbar lesion would cause deviation to the left, but without fasciculations or marked hemiatrophy, because UMN lesions spare lower motor unit trophies.",
                "The trigeminal nerve innervates masticatory muscles and tongue sensation (lingual nerve), not intrinsic or extrinsic tongue motor function.",
                "LMN weakness causes the tongue to deviate toward the AFFECTED side, not away from it.",
                "The nucleus ambiguus innervates the palate, pharynx, and larynx via CN IX and X, not the genioglossus (CN XII)."
            ],
            "key_point": "In lower motor neuron (LMN) CN XII lesions, the tongue exhibits atrophy/fasciculations and deviates TOWARD the side of the lesion on protrusion."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch14-003",
        "chapter": "Cranial Nerve XII (The Hypoglossal Nerve)",
        "section": "Tapia Syndrome",
        "page": 421,
        "vignette": "A 35-year-old man undergoes shoulder arthroscopy in the beach-chair position with endotracheal intubation. In the recovery room, he is noticed to have hoarseness and severe difficulty pronouncing lingual consonants. Physical examination reveals complete paralysis of the left vocal cord in the paramedian position and left tongue weakness with leftward deviation on protrusion. The soft palate elevates symmetrically, the gag reflex is intact, and trapezius/SCM strength is completely normal.",
        "question": "What eponym designates this combined paralysis of CN X and XII (sparing CN IX and XI)?",
        "options": [
            "Tapia syndrome",
            "Vernet syndrome",
            "Collet-Sicard syndrome",
            "Jackson syndrome",
            "Schmidt syndrome"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Tapia syndrome is the concurrent paralysis of the recurrent laryngeal branch of the vagus nerve (CN X) and the hypoglossal nerve (CN XII) with preservation of the glossopharyngeal (CN IX) and spinal accessory (CN XI) nerves. It typically arises extracranially in the parapharyngeal or submandibular space, most frequently as a complication of endotracheal intubation or improper patient positioning (hyperextension/lateral flexion of the head), where the inflated cuff or laryngoscope compresses CN X and XII against the transverse process of the upper cervical vertebrae.",
            "distractors": [
                "Vernet syndrome affects CN IX, X, and XI (jugular foramen), sparing CN XII.",
                "Collet-Sicard syndrome affects CN IX, X, XI, and XII (retroparotid space).",
                "Jackson syndrome involves CN X, XI, and XII (usually high medullary or skull base lesion).",
                "Schmidt syndrome involves CN X and XI, sparing CN XII."
            ],
            "key_point": "Tapia syndrome consists of unilateral paralysis of the vagus nerve (CN X) and hypoglossal nerve (CN XII), frequently occurring after endotracheal intubation or head malpositioning."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch14-004",
        "chapter": "Cranial Nerve XII (The Hypoglossal Nerve)",
        "section": "Internal Carotid Artery Dissection and CN XII",
        "page": 420,
        "vignette": "A 41-year-old man experiences sudden severe right neck pain and right periorbital headache after coughing violently. Three days later, he notices right ptosis and miosis (right Horner syndrome) without facial anhidrosis, accompanied by dysarthria and rightward deviation of his tongue with early right tongue weakness. Computed tomography angiography confirms internal carotid artery (ICA) dissection.",
        "question": "Why does cervical internal carotid artery dissection cause hypoglossal nerve palsy and partial Horner syndrome?",
        "options": [
            "Expanding hematoma in the carotid sheath compresses the ascending sympathetic plexus and the adjacent descending CN XII, which crosses the ICA extracranially",
            "Direct occlusion of the anterior spinal artery supplying the hypoglossal nucleus in the medulla",
            "Embolization of the ophthalmic artery causing reflex cavernous sinus inflammation",
            "Retrograde thrombosis of the transverse sinus extending into the jugular vein",
            "Microinfarction of the contralateral motor strip via anterior choroidal artery ischemia"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Extracranially in the upper cervical / retrostyloid space, the hypoglossal nerve (CN XII) courses downward adjacent to the internal carotid artery before hooking forward around the occipital artery. Expanding intramural hematoma or pseudoaneurysm from cervical ICA dissection exerts direct mechanical compression or ischemic injury on the adjacent CN XII and the sympathetic plexus traveling along the ICA adventitia. This produces the classical triad of neck pain, postganglionic Horner syndrome (sparing facial sweating), and lower cranial neuropathy (most commonly CN XII).",
            "distractors": [
                "Anterior spinal artery occlusion causes medial medullary infarction (Déjerine syndrome), which would produce contralateral hemiparesis and dorsal column loss, absent here.",
                "Ophthalmic artery emboli cause amaurosis fugax, not neck pain, Horner, and tongue deviation.",
                "Transverse sinus thrombosis causes intracranial hypertension and papilledema, not isolated carotid sheath compression.",
                "Anterior choroidal ischemia causes hemiplegia, hemianesthesia, and hemianopia, not a peripheral LMN tongue palsy and neck pain."
            ],
            "key_point": "Cervical internal carotid artery dissection compresses the adjacent sympathetic fibers and hypoglossal nerve (CN XII) in the carotid space, presenting with painful Horner syndrome and tongue palsy."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch14-005",
        "chapter": "Cranial Nerve XII (The Hypoglossal Nerve)",
        "section": "Medial Medullary Syndrome (Déjerine Syndrome)",
        "page": 419,
        "vignette": "A 67-year-old man presents with acute onset of right-sided weakness, decreased sensation in the right arm and leg, and speech difficulty. On examination, he has left tongue weakness with leftward tongue deviation on protrusion and fasciculations, right spastic hemiparesis sparing the face, and loss of vibration and joint position sense on the right side of his body. Pain and temperature sensation are preserved bilaterally.",
        "question": "Which vascular territory and anatomical syndrome is described?",
        "options": [
            "Medial medullary syndrome (Déjerine syndrome) due to occlusion of the anterior spinal artery or paramedian vertebral branches",
            "Lateral medullary syndrome (Wallenberg syndrome) due to occlusion of the PICA",
            "Ventral pontine syndrome (Millard-Gubler syndrome) due to basilar branch occlusion",
            "Ventral midbrain syndrome (Weber syndrome) due to posterior cerebral artery occlusion",
            "Lateral pontine syndrome due to AICA occlusion"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Medial medullary syndrome (Déjerine syndrome) is caused by infarction of the paramedian medulla from occlusion of the anterior spinal artery or vertebral artery paramedian branches. The ischemic territory damages: (1) hypoglossal nucleus or exiting CN XII fascicles (ipsilateral LMN tongue paralysis, deviating toward the lesion); (2) pyramid / uncrossed corticospinal tract (contralateral hemiparesis sparing face); and (3) medial lemniscus (contralateral loss of vibration and proprioception). Pain/temperature is spared because the spinothalamic tract lies dorsolaterally.",
            "distractors": [
                "Wallenberg syndrome involves the dorsolateral medulla (PICA), causing ipsilateral Horner, ataxia, facial numbness, and contralateral loss of pain/temperature, without hemiparesis or tongue weakness.",
                "Millard-Gubler syndrome is pontine (CN VI, VII + contralateral hemiparesis), sparing CN XII.",
                "Weber syndrome is midbrain (CN III + contralateral hemiparesis).",
                "Lateral pontine syndrome involves CN VII, VIII, and spinothalamic tracts, sparing the pyramid and hypoglossal nerve."
            ],
            "key_point": "Medial medullary syndrome (Déjerine syndrome) = ipsilateral CN XII palsy + contralateral hemiparesis (pyramid) + contralateral loss of vibration/proprioception (medial lemniscus)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch14-006",
        "chapter": "Cranial Nerve XII (The Hypoglossal Nerve)",
        "section": "Hypoglossal Canal Lesion",
        "page": 420,
        "vignette": "A 49-year-old woman presents with progressive dysarthria. Neurological examination reveals isolated atrophy and fasciculations of the right half of the tongue, with rightward tongue deviation on protrusion. Extensive testing demonstrates completely normal function of cranial nerves I through XI, normal sensory and motor systems in all four limbs, and no cerebellar signs. High-resolution skull base CT demonstrates bone erosion restricted to a solitary osseous channel situated anterolateral to the foramen magnum.",
        "question": "What osseous foramen is involved in this isolated cranial neuropathy?",
        "options": [
            "Hypoglossal canal (anterior condylar canal)",
            "Jugular foramen",
            "Stylomastoid foramen",
            "Foramen rotundum",
            "Optic canal"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The hypoglossal nerve (CN XII) leaves the posterior cranial fossa through the hypoglossal canal (historically anterior condylar canal), located in the occipital bone anterolateral to the foramen magnum. Bone erosion of the hypoglossal canal by a skull base metastasis, chordoma, or hypoglossal schwannoma produces an isolated lower motor neuron CN XII palsy with hemiatrophy, fasciculations, and deviation to the affected side, without involving adjacent nerves (IX, X, XI in jugular foramen) or the brainstem.",
            "distractors": [
                "The jugular foramen transmits CN IX, X, and XI; lesions there produce Vernet syndrome.",
                "The stylomastoid foramen transmits CN VII; lesions produce peripheral facial palsy.",
                "The foramen rotundum transmits CN V2; lesions produce maxillary numbness.",
                "The optic canal transmits CN II and the ophthalmic artery; lesions cause visual loss."
            ],
            "key_point": "Isolated CN XII paralysis accompanied by focal skull base bone erosion localizes to the hypoglossal canal in the occipital bone."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

if __name__ == '__main__':
    add_questions_to_chapter('content/approved/chapter09.json', ch09_questions)
    add_questions_to_chapter('content/approved/chapter10.json', ch10_questions)
    add_questions_to_chapter('content/approved/chapter11.json', ch11_questions)
    add_questions_to_chapter('content/approved/chapter12.json', ch12_questions)
    add_questions_to_chapter('content/approved/chapter13.json', ch13_questions)
    add_questions_to_chapter('content/approved/chapter14.json', ch14_questions)
