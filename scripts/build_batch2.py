import json
import os

BATCH2 = {
  "chapter06": [
    {
      "id": "ch06-001",
      "chapter": "Cranial Nerve I (The Olfactory Nerve)",
      "section": "Foster Kennedy Syndrome",
      "page": 144,
      "vignette": "A 52-year-old woman presents with progressive headaches, personality changes, and unsteadiness. Examination demonstrates anosmia in the right nostril, pallor and atrophy of the right optic disc with decreased visual acuity in the right eye, and marked papilledema in the left eye. Visual field testing reveals an enlarged blind spot on the left and a central scotoma on the right.",
      "question": "What is the diagnosis and anatomical localization?",
      "options": [
        "Foster Kennedy syndrome due to a subfrontal mass (e.g., olfactory groove meningioma)",
        "Pseudo-Foster Kennedy syndrome due to bilateral anterior ischemic optic neuropathy",
        "Pituitary macroadenoma with suprasellar extension",
        "Bilateral retrobulbar optic neuritis",
        "Multiple sclerosis affecting the optic chiasm"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The triad of: (1) ipsilateral anosmia, (2) ipsilateral optic atrophy, and (3) contralateral papilledema is the classic Foster Kennedy syndrome. A tumor in the subfrontal region (most typically an olfactory groove or sphenoid wing meningioma) directly compresses the ipsilateral olfactory tract and optic nerve, producing direct compression atrophy and anosmia. As the tumor enlarges, increased intracranial pressure produces papilledema in the opposite, non-compressed optic nerve.",
        "distractors": [
          "Pseudo-Foster Kennedy syndrome is non-neoplastic, usually caused by sequential bilateral AION with optic atrophy in the older eye and acute disc edema in the second eye, without anosmia or subfrontal tumor.",
          "Pituitary macroadenomas characteristically compress the chiasm producing bitemporal hemianopia, without ipsilateral anosmia and unilateral disc atrophy.",
          "Retrobulbar optic neuritis presents acutely with painful vision loss and a normal optic disc acutely ('neither patient nor doctor sees anything').",
          "Chiasmal MS causes bitemporal defects or scotomas without direct compression anosmia and asymmetric contralateral papilledema."
        ],
        "key_point": "Foster Kennedy syndrome (ipsilateral anosmia + ipsilateral optic atrophy + contralateral papilledema) localizes to a subfrontal mass compressing the olfactory tract and optic nerve."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch06-002",
      "chapter": "Cranial Nerve I (The Olfactory Nerve)",
      "section": "Kallmann Syndrome & Congenital Anosmia",
      "page": 147,
      "vignette": "An 18-year-old man is evaluated for delayed puberty. He has eunuchoid proportions, micropenis, and absence of secondary sexual characteristics. Laboratory evaluation confirms hypogonadotropic hypogonadism with low LH and FSH levels. On sensory examination, he is unable to smell coffee, cinnamon, or soap through either nostril, but can detect ammonia (pungent trigeminal irritant). MRI shows absence of the olfactory bulbs and sulci.",
      "question": "Which developmental condition accounts for this clinical combination?",
      "options": [
        "Kallmann syndrome (hypogonadotropic hypogonadism with congenital anosmia)",
        "Craniopharyngioma with chiasmal and pituitary stalk compression",
        "Pituitary apoplexy with Sheehan syndrome",
        "Klinefelter syndrome (47,XXY)",
        "Esthesioneuroblastoma of the cribriform plate"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Kallmann syndrome is caused by failure of embryonic migration of GnRH-synthesizing neurons from the olfactory placode to the hypothalamus, accompanied by hypoplasia or agenesis of the olfactory bulbs and tracts. This results in the pathognomonic pairing of congenital anosmia and hypogonadotropic hypogonadism. Detection of ammonia is preserved because volatile chemical irritants stimulate ophthalmic and maxillary trigeminal (CN V) free nerve endings rather than true olfactory (CN I) receptors.",
        "distractors": [
          "Craniopharyngioma causes bitemporal hemianopia, growth failure, or diabetes insipidus, without developmental agenesis of olfactory bulbs.",
          "Sheehan syndrome causes postpartum pituitary necrosis with panhypopituitarism, but does not cause congenital anosmia.",
          "Klinefelter syndrome (47,XXY) causes hypergonadotropic hypogonadism (elevated LH and FSH) with normal olfaction.",
          "Esthesioneuroblastoma is a malignant tumor of the olfactory neuroepithelium presenting with epistaxis, nasal obstruction, and unilateral acquired anosmia."
        ],
        "key_point": "Kallmann syndrome pairs congenital anosmia (absent olfactory bulbs) with hypogonadotropic hypogonadism due to defective embryologic GnRH neuronal migration."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter07": [
    {
      "id": "ch07-001",
      "chapter": "Visual Pathways",
      "section": "Chiasmal Syndromes",
      "page": 162,
      "vignette": "A 44-year-old man reports bumping into doorframes and difficulty parking his car. Formal automated perimetry reveals complete loss of the temporal hemifield of vision in both eyes (bitemporal hemianopia). Visual acuity is 20/20 in both eyes. Fundus examination shows subtle bilateral bitemporal optic disc pallor.",
      "question": "Which fibers are compressed to produce a bitemporal hemianopia?",
      "options": [
        "Decussating nasal retinal axons in the body of the optic chiasm",
        "Uncrossed temporal retinal axons in the lateral chiasm",
        "Meyer loop fibers coursing through the temporal lobe",
        "Baum loop fibers coursing through the parietal lobe",
        "Optic tract axons projecting to the lateral geniculate nucleus"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Axons originating from the nasal hemiretinae receive light from the temporal visual fields. In the body of the optic chiasm, these nasal retinal axons decussate to project to the contralateral optic tract. A mass compressing the optic chiasm from below (e.g., pituitary adenoma) or above (e.g., craniopharyngioma) selectively disrupts these crossing nasal fibers, producing the classic bitemporal hemianopia.",
        "distractors": [
          "Uncrossed temporal retinal axons receive images from the nasal visual field; their lesion produces nasal visual field loss.",
          "Meyer loop fibers in the temporal lobe carry superior quadrant visual information, producing a contralateral superior quadrantanopia ('pie-in-the-sky').",
          "Baum loop fibers in the parietal lobe carry inferior quadrant information, producing a contralateral inferior quadrantanopia ('pie-on-the-floor').",
          "Optic tract lesions produce an incongruous contralateral homonymous hemianopia, not a bitemporal hemianopia."
        ],
        "key_point": "Bitemporal hemianopia results from compression of the decussating nasal retinal fibers in the body of the optic chiasm."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch07-002",
      "chapter": "Visual Pathways",
      "section": "Temporal vs Parietal Optic Radiations",
      "page": 175,
      "vignette": "A 35-year-old woman with drug-resistant temporal lobe epilepsy undergoes left anterior temporal lobectomy. Postoperatively, visual field testing demonstrates a dense right superior homonymous quadrantanopia ('pie-in-the-sky' defect). Visual acuity and pupillary light reflexes are entirely normal.",
      "question": "Which specific anatomic bundle of the optic radiations was transected?",
      "options": [
        "Meyer loop (anterior temporal optic radiation fibers looping around the temporal horn of the lateral ventricle)",
        "Baum loop (superior parietal optic radiation fibers passing through the retrolenticular capsule)",
        "Axons within the lateral geniculate nucleus dorsal division",
        "Calcarine cortex inferior lip (lingual gyrus)",
        "Interhemispheric visual fibers crossing the splenium of the corpus callosum"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The optic radiations divide into two major bundles: (1) Meyer loop, which originates in the lateral geniculate nucleus and loops anteroinferiorly around the temporal horn of the lateral ventricle before turning posteriorly to terminate in the lingual gyrus (inferior lip of the calcarine fissure). Meyer loop carries fibers representing the contralateral superior visual field. Resection of the anterior temporal lobe disrupts Meyer loop, causing a contralateral superior quadrantanopia ('pie-in-the-sky').",
        "distractors": [
          "Baum loop courses through the parietal lobe and represents the inferior visual field; its lesion causes contralateral inferior quadrantanopia ('pie-on-the-floor').",
          "Lateral geniculate nucleus lesions cause incongruous homonymous hemianopias or wedge defects.",
          "Calcarine lingual gyrus resection causes superior quadrantanopia, but the surgery was a temporal lobectomy, not an occipital resection.",
          "Splenium of the corpus callosum disruption causes alexia without agraphia, not a superior quadrantanopia."
        ],
        "key_point": "Temporal lobe lesions involving Meyer loop produce a contralateral superior homonymous quadrantanopia ('pie-in-the-sky')."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch07-003",
      "chapter": "Visual Pathways",
      "section": "Occipital Cortex & Macular Sparing",
      "page": 184,
      "vignette": "A 70-year-old man sustains an ischemic stroke in the territory of the left posterior cerebral artery. Perimetry reveals a right homonymous hemianopia with 5 degrees of central macular vision preserved ('macular sparing'). Pupillary light reflexes are brisk and symmetric in both eyes.",
      "question": "What is the primary anatomical explanation for macular sparing in occipital pole ischemia?",
      "options": [
        "Dual blood supply to the occipital pole from both the posterior cerebral artery and terminal branches of the middle cerebral artery",
        "Bilateral decussation of foveal axons within the superior colliculus",
        "Direct innervation of the macula via the anterior choroidal artery",
        "Spared geniculocalcarine fibers within the temporal Meyer loop",
        "Pretectal pupillary light reflex fibers bypassing the striate cortex"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The occipital pole (which has an enormous cortical representation for central macular vision) possesses a dual blood supply: its primary supply is the calcarine branch of the posterior cerebral artery (PCA), but its caudal tip receives collateral anastomotic flow from terminal branches of the middle cerebral artery (MCA). When the PCA trunk is occluded, collateral MCA perfusion preserves the occipital tip, resulting in macular sparing (central 3 to 5 degrees spared). In contrast, optic tract or optic radiation infarctions cause total macular splitting.",
        "distractors": [
          "Foveal axons do not decussate in the superior colliculus; all visual pathway projections are hemifield-organized.",
          "The anterior choroidal artery supplies the optic tract and lateral geniculate nucleus, not the occipital pole.",
          "Meyer loop fibers represent the superior peripheral field, not the macular pole.",
          "Pretectal fibers mediate the pupillary light reflex (which is preserved in all cortical lesions because the reflex arc leaves the optic tract before the LGN), but do not explain vision sparing."
        ],
        "key_point": "Macular sparing in occipital PCA infarction is explained by dual collateral arterial perfusion of the occipital pole from the middle cerebral artery (MCA)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter08": [
    {
      "id": "ch08-001",
      "chapter": "The Localization of Lesions Affecting the Ocular Motor",
      "section": "Third Nerve Palsy: Pupil-Sparing vs Pupil-Involved",
      "page": 215,
      "vignette": "A 62-year-old man with poorly controlled type 2 diabetes presents with acute, painful double vision. Examination of the right eye reveals severe ptosis, limited elevation, depression, and adduction. The right pupil is 3 mm and reacts briskly to light, identical to the left pupil. Visual acuity is normal.",
      "question": "What is the pathophysiologic mechanism explaining pupillary sparing in microvascular diabetic CN III neuropathy?",
      "options": [
        "Microvascular ischemia affects the centrally located nutrient vessels (vasa nervorum) in the core of the nerve, sparing peripheral superficial parasympathetic pupillomotor fibers",
        "The pupillomotor fibers exit the oculomotor fascicle within the midbrain tegmentum and bypass the peripheral nerve",
        "Pupillary constriction is mediated by the ophthalmic branch of the trigeminal nerve",
        "Diabetic neuropathy selectively attacks myelin rather than unmyelinated axons",
        "Parasympathetic fibers run exclusively on the inferior division of the oculomotor nerve"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Parasympathetic pupillomotor fibers travel in the outer, superficial, dorsal periphery of the third cranial nerve, where they receive pial collateral blood supply. Microvascular diabetic/hypertensive ischemia selectively infarcts the deep central core of the nerve supplied by the vasa nervorum, paralyzing somatic extraocular motor axons while sparing the superficial pupillary fibers (pupil-sparing third nerve palsy). Conversely, external compressive lesions (such as a posterior communicating artery aneurysm or uncal herniation) compress the outer pial surface first, causing a dilated, unreactive 'blown' pupil.",
        "distractors": [
          "Pupillomotor fibers travel with the peripheral third nerve and do not bypass it in the midbrain.",
          "The trigeminal nerve carries sensory afferents and postganglionic sympathetics, not parasympathetic pupillary constriction fibers.",
          "Diabetic ischemic neuropathy is primarily microvascular axonopathy of the central core, not pure demyelinating disease.",
          "Parasympathetic fibers travel in the main trunk and enter the inferior division to reach the ciliary ganglion, but the superficial pial position explains compression vs ischemia."
        ],
        "key_point": "Diabetic oculomotor neuropathy typically spares the pupil because central core ischemia of the vasa nervorum spares the superficially located pial parasympathetic fibers."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch08-002",
      "chapter": "The Localization of Lesions Affecting the Ocular Motor",
      "section": "Trochlear Nerve (CN IV) Palsy & Bielschowsky Test",
      "page": 248,
      "vignette": "A 28-year-old man presents with vertical double vision after a mild closed head injury. The diplopia worsens on looking downward and to the left, and is particularly troublesome when walking down stairs. On examination, there is a right hypertropia in primary position. The hypertropia increases on left lateral gaze and increases further on right head tilt, but diminishes when he tilts his head to the left.",
      "question": "Which cranial nerve is injured and what is the diagnostic maneuver?",
      "options": [
        "Right trochlear nerve (CN IV) palsy demonstrated by a positive Bielschowsky head tilt test",
        "Left trochlear nerve (CN IV) palsy with anomalous head posture",
        "Right abducens nerve (CN VI) palsy with vertical deviation",
        "Left oculomotor nerve (CN III) superior rectus palsy",
        "Right inferior rectus muscle entrapment in an orbital floor blowout fracture"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The clinical picture demonstrates a right CN IV (trochlear nerve) palsy. The superior oblique muscle depresses the eye when adducted and incyclotorts the eye. In a right CN IV palsy: (1) the right eye is hypertropic (elevated); (2) the hypertropia worsens when the eye is adducted (looking left); and (3) on right head tilt (Bielschowsky test), the vestibular reflex commands the right eye to incyclotort. Because the right superior oblique is paralyzed, the right superior rectus acts alone to incyclotort, which inadvertently elevates the eye further, dramatically worsening the hypertropia. Tilting the head to the left requires excyclotorsion (inferior oblique/inferior rectus), relieving the diplopia.",
        "distractors": [
          "Left CN IV palsy produces a left hypertropia that worsens on right gaze and left head tilt.",
          "Abducens palsy causes horizontal uncrossed diplopia worse on looking toward the lesion side, not vertical diplopia.",
          "Oculomotor superior rectus palsy produces hypotropia (inability to elevate), not hypertropia.",
          "Orbital floor blowout fracture with inferior rectus entrapment causes restriction of upgaze with hypotropia of the affected eye, not a positive Bielschowsky test."
        ],
        "key_point": "Right CN IV palsy produces right hypertropia that worsens on left gaze and right head tilt (positive Bielschowsky head tilt test); patients compensate by tilting head to the left."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch08-003",
      "chapter": "The Localization of Lesions Affecting the Ocular Motor",
      "section": "Internuclear Ophthalmoplegia & One-and-a-Half Syndrome",
      "page": 285,
      "vignette": "A 42-year-old woman with multiple sclerosis presents with horizontal diplopia on right lateral gaze. On examination, when she attempts to look to the right, the left eye fails to adduct past the midline, and the right eye exhibits prominent horizontal abducting nystagmus. Convergence of both eyes is fully preserved. On left lateral gaze, eye movements are completely normal.",
      "question": "Where is the causative lesion located?",
      "options": [
        "Left medial longitudinal fasciculus (MLF) in the dorsomedial brainstem",
        "Right medial longitudinal fasciculus (MLF)",
        "Left oculomotor nerve nucleus",
        "Right paramedian pontine reticular formation (PPRF)",
        "Left abducens nerve nucleus"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The patient has a Left Internuclear Ophthalmoplegia (INO). The medial longitudinal fasciculus (MLF) connects the abducens nucleus to the contralateral oculomotor subnucleus for medial rectus activation during conjugate lateral gaze. A lesion of the left MLF disrupts the signal to the left medial rectus during right conjugate gaze, resulting in left eye adduction failure. The right abducting eye demonstrates compensatory dissociated horizontal nystagmus. Convergence is preserved because convergence signals descend directly to the third nerve nuclei via the pretectal area, bypassing the MLF.",
        "distractors": [
          "Right MLF lesion causes right adduction failure on left conjugate gaze.",
          "Left oculomotor nucleus lesion impairs left adduction during BOTH lateral gaze AND convergence, and typically involves other CN III muscles.",
          "Right PPRF lesion causes a conjugate gaze palsy to the right (neither eye looks right).",
          "Left abducens nucleus lesion causes a complete conjugate gaze palsy to the left."
        ],
        "key_point": "Left Internuclear Ophthalmoplegia (INO) is caused by a lesion of the left MLF, producing left eye adduction failure on right gaze with contralateral abducting nystagmus and preserved convergence."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter09": [
    {
      "id": "ch09-001",
      "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
      "section": "Nuclear Anatomy of CN V",
      "page": 357,
      "vignette": "A 61-year-old man presents with loss of pain and temperature sensation over the right side of his face. Touch and vibration sensations over the face are entirely intact, the corneal reflex is present on both sides, and jaw clenching strength (masseter and temporalis muscles) is completely normal.",
      "question": "Which trigeminal nucleus is selectively damaged?",
      "options": [
        "Spinal trigeminal nucleus and tract",
        "Principal (main sensory) trigeminal nucleus",
        "Mesencephalic trigeminal nucleus",
        "Motor trigeminal nucleus",
        "Trigeminal (Gasserian) ganglion"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The trigeminal nuclear complex has three sensory nuclei: (1) the spinal trigeminal nucleus and tract (extending from the pons down to C2 in the spinal cord), which exclusively mediates pain and temperature sensation from the face; (2) the principal (main sensory) nucleus in the mid-pons, which mediates light touch, tactile discrimination, and vibration; and (3) the mesencephalic nucleus in the midbrain, which mediates proprioception from the jaw and periodontal ligaments. Sparing of light touch with loss of pain/temperature indicates selective disruption of the spinal trigeminal nucleus/tract (dissociated facial sensory loss, as seen in Wallenberg syndrome).",
        "distractors": [
          "The principal nucleus mediates tactile discrimination and light touch, which are preserved in this patient.",
          "The mesencephalic nucleus mediates jaw proprioception and the afferent limb of the jaw jerk reflex.",
          "The motor nucleus innervates muscles of mastication (masseter, temporalis, pterygoids); its lesion produces jaw weakness.",
          "The Gasserian ganglion contains primary cell bodies for all modalities; its lesion impairs all sensory modalities across affected divisions."
        ],
        "key_point": "The spinal trigeminal nucleus mediates facial pain and temperature, while the principal sensory nucleus mediates touch and vibration, creating dissociated sensory loss when selectively lesioned."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch09-002",
      "chapter": "Cranial Nerve V (The Trigeminal Nerve)",
      "section": "Cavernous Sinus vs Superior Orbital Fissure",
      "page": 364,
      "vignette": "A 46-year-old woman presents with severe retro-orbital pain, diplopia, and numbness of the right forehead and cheek. On examination, she has complete right ptosis, total external ophthalmoplegia (CN III, IV, VI palsies), a dilated non-reactive pupil, and sensory loss in the distributions of both V1 (ophthalmic) and V2 (maxillary) divisions of the trigeminal nerve. Mandibular (V3) sensation and mastication strength are normal.",
      "question": "Which anatomical structure is involved by the pathological process?",
      "options": [
        "Right cavernous sinus",
        "Right superior orbital fissure",
        "Right orbital apex",
        "Meckel cave in the middle cranial fossa",
        "Jugular foramen"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The cavernous sinus contains: CN III, CN IV, CN VI, the ophthalmic division of CN V (V1), the maxillary division of CN V (V2), and sympathetic pupillomotor fibers traversing the internal carotid artery. The superior orbital fissure contains CN III, IV, VI, and V1, but NOT V2 (which exits the middle cranial fossa through the foramen rotundum). Therefore, involvement of V2 alongside CN III, IV, VI, and V1 definitively localizes the lesion to the cavernous sinus rather than the superior orbital fissure.",
        "distractors": [
          "The superior orbital fissure does not contain V2 (which exits via the foramen rotundum); superior orbital fissure syndrome spares V2 sensation.",
          "The orbital apex syndrome involves the optic nerve (CN II) causing visual acuity loss, in addition to the superior orbital fissure contents, but spares V2.",
          "Meckel cave contains the entire trigeminal ganglion (V1, V2, and V3) without ocular motor nerves III, IV, or VI.",
          "The jugular foramen contains cranial nerves IX, X, and XI, causing dysphagia, hoarseness, and trapezius weakness."
        ],
        "key_point": "Involvement of both V1 and V2 alongside CN III, IV, and VI localizes to the cavernous sinus; superior orbital fissure syndrome spares V2."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter10": [
    {
      "id": "ch10-001",
      "chapter": "Cranial Nerve VII (The Facial Nerve)",
      "section": "Upper vs Lower Motor Neuron Facial Palsy",
      "page": 372,
      "vignette": "A 65-year-old man with a history of atrial fibrillation presents with sudden left facial weakness and left arm hemiparesis. On examination, he is unable to smile on the left and has flattening of the left nasolabial fold. However, he is able to wrinkle his forehead bilaterally and close both eyes tightly with symmetrical eyelid resistance.",
      "question": "Why is the upper face (forehead wrinkling and eye closure) spared in an upper motor neuron facial lesion?",
      "options": [
        "The facial motor subnuclei supplying the upper face (frontalis and orbicularis oculi) receive bilateral corticobulbar innervation from the motor cortices",
        "Forehead muscles are innervated by the ophthalmic division of the trigeminal nerve",
        "The frontalis muscle receives sympathetic motor innervation via the carotid plexus",
        "Fibers to the upper face decussate twice within the basis pontis",
        "Upper facial muscles are spared because of collateral branches from the accessory nerve"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The facial motor nucleus in the caudal pons is organized into distinct subnuclei: the upper subnucleus (supplying the frontalis and orbicularis oculi) receives bilateral corticobulbar projections from both cerebral hemispheres. The lower subnucleus (supplying muscles of the lower face, mouth, and platysma) receives strictly contralateral corticobulbar input. Therefore, a unilateral corticobulbar/UMN lesion (e.g., motor cortex or internal capsule stroke) paralyzes only the contralateral lower face while sparing the forehead. In contrast, a lower motor neuron lesion of the facial nucleus or nerve (e.g., Bell palsy) paralyzes the entire half of the face (upper and lower).",
        "distractors": [
          "The trigeminal nerve provides sensory innervation to the face, not motor innervation to the frontalis.",
          "Sympathetics do not innervate facial expression muscles.",
          "Corticobulbar fibers do not decussate twice in the pons.",
          "The spinal accessory nerve innervates SCM and trapezius, not the frontalis or orbicularis oculi."
        ],
        "key_point": "Bilateral corticobulbar innervation to the upper facial subnuclei spares the forehead in UMN lesions; peripheral LMN lesions (Bell palsy) paralyze both upper and lower face."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch10-002",
      "chapter": "Cranial Nerve VII (The Facial Nerve)",
      "section": "Topodiagnosis of Facial Nerve Lesions",
      "page": 381,
      "vignette": "A 36-year-old woman develops acute right peripheral facial paralysis involving both forehead and lower face. Examination reveals loss of taste on the anterior two-thirds of the right tongue, hyperacusis in the right ear (painful sensitivity to loud sounds), and dry right eye (Schirmer test demonstrates absent lacrimation on the right).",
      "question": "At what anatomical level is the facial nerve injured to produce this complete constellation?",
      "options": [
        "Geniculate ganglion or proximal to the greater superficial petrosal nerve in the internal auditory canal",
        "Facial canal distal to the nerve to the stapedius, involving the chorda tympani",
        "Stylomastoid foramen",
        "Parotid gland substance",
        "Caudal pontine basis pontis"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The branches of the facial nerve exit sequentially along its petrous bone course: (1) Greater superficial petrosal nerve arises at the geniculate ganglion, mediating lacrimation; (2) Nerve to the stapedius arises in the vertical mastoid segment, mediating acoustic dampening (loss causes hyperacusis); (3) Chorda tympani arises near the stylomastoid foramen, mediating taste to anterior 2/3 of tongue and submandibular salivation; (4) Motor branches exit the stylomastoid foramen to supply facial expression muscles. Sparing none of these (dry eye + hyperacusis + loss of taste + complete facial palsy) localizes the lesion proximal to or at the geniculate ganglion / internal auditory canal.",
        "distractors": [
          "Lesions distal to the stapedial nerve spare hyperacusis and lacrimation, causing only loss of taste and facial palsy.",
          "Lesions at the stylomastoid foramen produce pure motor facial paralysis with normal lacrimation, hearing, and taste.",
          "Parotid gland lesions produce pure motor facial paralysis or isolated branch weakness without taste or tear deficits.",
          "Basis pontis lesions cause Millard-Gubler syndrome (facial palsy + contralateral hemiplegia), sparing lacrimation and hyperacusis."
        ],
        "key_point": "Impaired lacrimation (dry eye via greater petrosal nerve) places a facial nerve lesion at or proximal to the geniculate ganglion in the petrous temporal bone."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ]
}

# Write out batch 2
for ch_name, q_list in BATCH2.items():
    target_path = f"content/approved/{ch_name}.json"
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(q_list, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(q_list)} questions to {target_path}")

print("Batch 2 (Chapters 6-10) complete!")
