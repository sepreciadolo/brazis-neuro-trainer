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

# CHAPTER 21: Autonomic Nervous System
ch21_questions = [
    {
        "id": "ch21-002",
        "chapter": "The Autonomic Nervous System",
        "section": "Horner Syndrome Pharmacologic Testing",
        "page": 536,
        "vignette": "A 48-year-old man presents with right ptosis and miosis. Instillation of apraclonidine 0.5% drops into both eyes produces marked dilation of the right pupil and elevation of the right upper eyelid, while having minimal effect on the left pupil, reversing the anisocoria (the right pupil is now larger than the left). Forty-eight hours later, instillation of hydroxyamphetamine 1% drops produces robust, equal dilation of both pupils.",
        "question": "What is the precise pharmacological localization of this patient's Horner syndrome?",
        "options": [
            "First-order (central) or second-order (preganglionic) Horner syndrome, with an intact postganglionic third-order neuron",
            "Third-order (postganglionic) Horner syndrome due to internal carotid dissection",
            "Physiologic anisocoria with spurious pupillary asymmetry",
            "Adie tonic pupil with cholinergic supersensitivity",
            "Oculomotor (CN III) parasympathetic paresis"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The diagnosis and localization of Horner syndrome rely on sequential pharmacological testing: (1) Apraclonidine 0.5% (alpha-2 agonist with weak alpha-1 agonist activity) causes reversal of anisocoria in ANY Horner syndrome due to alpha-1 denervation supersensitivity of the dilator pupillae; the miotic pupil dilates and the ptotic lid elevates. (2) Hydroxyamphetamine 1% differentiates preganglionic from postganglionic lesions by stimulating the release of stored norepinephrine from the third-order (postganglionic) nerve ending. If the third-order neuron is intact (central/first-order or preganglionic/second-order lesion), hydroxyamphetamine releases normal stores of NE and dilates the pupil normally. If the postganglionic neuron is damaged, NE stores are depleted and the pupil fails to dilate. Symmetrical dilation here confirms a first- or second-order lesion.",
            "distractors": [
                "A third-order postganglionic lesion depletes axonal norepinephrine; the affected pupil would FAIL to dilate with hydroxyamphetamine, worsening anisocoria.",
                "Physiologic anisocoria does not reverse with apraclonidine (the pupils do not switch which one is larger).",
                "Adie pupil is parasympathetic (dilated pupil) tested with dilute pilocarpine, not apraclonidine.",
                "CN III palsy produces a dilated pupil, not miosis and ptosis responsive to adrenergic agents."
            ],
            "key_point": "Apraclonidine reversal confirms Horner syndrome; normal dilation with hydroxyamphetamine localizes the lesion to the first-order (central) or second-order (preganglionic) neuron."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch21-003",
        "chapter": "The Autonomic Nervous System",
        "section": "Autonomic Dysreflexia",
        "page": 542,
        "vignette": "A 28-year-old man who sustained a complete traumatic spinal cord transection at the T4 level 2 years ago is brought to the emergency department with a pounding headache, facial flushing, profuse sweating above the nipple line, and severe hypertension (blood pressure 220/120 mmHg). Heart rate is 44 bpm (marked sinus bradycardia). The skin on his legs is pale, cold, and covered with goosebumps (piloerection). Catheterization reveals an acutely distended urinary bladder due to a blocked Foley catheter.",
        "question": "What is the pathophysiology of autonomic dysreflexia in spinal cord injuries at or above T6?",
        "options": [
            "Uninhibited sympathetic hyperreflexia triggered by visceral afferents below the lesion level, with descending inhibitory brainstem pathways blocked at the transected cord",
            "Acute intracranial hemorrhage triggering the Cushing triad from elevated intracranial pressure",
            "Pheochromocytoma crisis triggered by bladder palpation",
            "Loss of parasympathetic cardiac innervation from the vagus nerve",
            "Primary nephrogenic hyperreninemic hypertension"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Autonomic dysreflexia occurs in patients with spinal cord injuries at or above the T6 level (the major sympathetic outflow to the splanchnic vascular bed). Noxious visceral stimuli below the lesion (e.g., bladder distention, fecal impaction) send afferent signals through spinothalamic/pelvic pathways that trigger massive, uninhibited sympathetic preganglionic discharge in the isolated caudal spinal cord. This causes severe splanchnic vasoconstriction and life-threatening hypertension. Carotid and aortic baroreceptors detect the high pressure and signal the medulla, which fires the vagus nerve (producing bradycardia) and attempts to send descending sympathetic inhibition; however, the descending inhibitory impulses cannot cross the cord transection, resulting in flushing/sweating above the lesion and intense vasoconstriction below.",
            "distractors": [
                "Cushing triad is caused by intracranial hypertension; here the intracranial exam is normal and the trigger is an obstructed catheter.",
                "Pheochromocytoma causes episodic hypertension but does not produce the precise rostral-caudal thermal/sweating demarcation at the spinal level.",
                "The vagus nerve is fully intact and responsible for the profound compensatory bradycardia.",
                "Hyperreninism is a slow hormonal axis, whereas autonomic dysreflexia is an instantaneous neural spinal reflex."
            ],
            "key_point": "Autonomic dysreflexia (in T6 and above cord lesions) is caused by uninhibited sympathetic outflow from the isolated caudal spinal cord provoked by pelvic/visceral noxious stimuli."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch21-004",
        "chapter": "The Autonomic Nervous System",
        "section": "Adie Tonic Pupil vs Argyll Robertson Pupil",
        "page": 538,
        "vignette": "A 29-year-old woman presents for evaluation of an enlarged right pupil. In bright light, the right pupil fails to constrict. When she focuses on a near reading target, the right pupil constricts slowly and tonicly, remaining constricted for several seconds after gaze shifts back to distance. Slit-lamp examination demonstrates segmental vermiform movements of the pupillary margin. Instillation of dilute (0.1%) pilocarpine drops produces robust pupillary constriction in the right eye, but causes no constriction in the left normal eye.",
        "question": "Where is the underlying anatomical lesion in Adie tonic pupil?",
        "options": [
            "Ciliary ganglion or short ciliary nerves in the orbit",
            "Edinger-Westphal nucleus in the rostral midbrain",
            "Superior cervical ganglion in the neck",
            "Pretectal nuclei in the tectum of the midbrain",
            "Oculomotor nucleus proper in the ventral midbrain"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Adie tonic pupil is caused by postganglionic parasympathetic denervation localized to the ciliary ganglion or short ciliary nerves within the orbit (often viral or idiopathic). Denervation of the iris sphincter leads to pupillary dilation and segmental sphincter palsy. Subsequent aberrant reinnervation by surviving axons originally destined for the ciliary muscle (which outnumber iris fibers 30:1) results in light-near dissociation (stronger constriction to near accommodation than to light). Denervated postganglionic muscarinic receptors develop cholinergic supersensitivity, causing the Adie pupil to constrict to ultra-dilute pilocarpine (0.1% or 0.125%), which has no effect on a normal pupil.",
            "distractors": [
                "Edinger-Westphal lesions cause preganglionic third nerve parasympathetic deficits that do NOT exhibit denervation supersensitivity to ultra-dilute 0.1% pilocarpine.",
                "The superior cervical ganglion is sympathetic; its lesion produces Horner syndrome (miosis), not pupillary enlargement.",
                "Pretectal midbrain lesions produce Argyll Robertson pupils (bilateral small, irregular pupils with light-near dissociation), not a unilateral dilated tonic pupil.",
                "The oculomotor nucleus proper contains somatic motor neurons to extraocular muscles, not parasympathetic pupillomotor fibers."
            ],
            "key_point": "Adie tonic pupil is caused by postganglionic parasympathetic denervation of the ciliary ganglion, characterized by light-near dissociation and constriction to dilute (0.1%) pilocarpine."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch21-005",
        "chapter": "The Autonomic Nervous System",
        "section": "Pure Autonomic Failure vs Multiple System Atrophy",
        "page": 541,
        "vignette": "A 64-year-old man presents with severe orthostatic hypotension (blood pressure drops from 145/88 supine to 78/45 standing without compensatory tachycardia), erectile dysfunction, and anhydrosis. Plasma norepinephrine levels are drawn: his resting supine norepinephrine is profoundly low (45 pg/mL; normal 150-500 pg/mL) and fails to rise upon 5 minutes of upright standing (52 pg/mL). Neurological examination shows no parkinsonism, no cerebellar ataxia, and normal pyramidal reflexes.",
        "question": "What is the primary anatomical site of neurodegeneration in pure autonomic failure (Bradbury-Eggleston syndrome) that accounts for this low baseline norepinephrine?",
        "options": [
            "Postganglionic sympathetic autonomic neurons",
            "Preganglionic sympathetic neurons in the intermediolateral cell column of the spinal cord",
            "Dorsal motor nucleus of the vagus nerve alone",
            "Substantia nigra pars compacta dopaminergic neurons",
            "Purkinje cells of the cerebellar cortex"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Pure autonomic failure (PAF, Bradbury-Eggleston syndrome) is an idiopathic synucleinopathy characterized by selective degeneration of postganglionic sympathetic noradrenergic neurons. Because the postganglionic terminal endings are lost, baseline supine circulating norepinephrine levels are profoundly subnormal (<100 pg/mL) and fail to increase upon standing. In contrast, in Multiple System Atrophy (MSA / Shy-Drager syndrome), the neurodegeneration is preganglionic/central (intermediolateral cell column of the spinal cord, Onuf nucleus, brainstem); baseline supine norepinephrine is typically normal or near normal, but fails to rise upon orthostatic challenge.",
            "distractors": [
                "Preganglionic intermediolateral column degeneration is the hallmark of Multiple System Atrophy (MSA), where resting supine norepinephrine is usually normal.",
                "Isolated dorsal motor nucleus vagal lesions cause parasympathetic gastrointestinal dysfunction, not profound postganglionic noradrenergic depletion.",
                "Substantia nigra degeneration characterizes Parkinson disease and MSA-P, which feature prominent resting tremor, bradykinesia, and rigidity, absent here.",
                "Cerebellar Purkinje cell loss characterizes MSA-C, featuring cerebellar ataxia."
            ],
            "key_point": "Pure autonomic failure is a postganglionic sympathetic neuropathy with very low baseline supine norepinephrine; MSA is preganglionic with normal supine norepinephrine."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch21-006",
        "chapter": "The Autonomic Nervous System",
        "section": "Neurogenic Bladder: Suprasacral vs Sacral Cord Lesions",
        "page": 544,
        "vignette": "A 35-year-old woman with relapsing-remitting multiple sclerosis presents with urinary urgency, frequency, and urge incontinence. Urodynamic studies reveal involuntary detrusor contractions during filling at low bladder volumes, along with simultaneous contraction of the external urethral sphincter during attempted micturition (detrusor-sphincter dyssynergia).",
        "question": "What level of neuroaxis lesion produces detrusor hyperreflexia accompanied by detrusor-sphincter dyssynergia?",
        "options": [
            "Suprasacral spinal cord lesion (between the pontine micturition center and S2-S4 sacral cord)",
            "Suprapontine cortical lesion in the medial frontal micturition center",
            "Conus medullaris or cauda equina lesion destroying the S2-S4 sacral segments",
            "Peripheral pelvic nerve neuropathy",
            "Pudendal nerve entrapment in the Alcock canal"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Urinary bladder control is hierarchically organized: (1) Suprapontine (frontal cortex) lesions cause loss of voluntary inhibition, resulting in detrusor hyperreflexia (uninhibited bladder) with COORDINATED sphincter relaxation (no dyssynergia). (2) Suprasacral spinal cord lesions (cervical or thoracic spinal cord, below the pontine micturition center and above S2) disrupt descending reticulospinal coordination between bladder contraction and sphincter relaxation, leading to BOTH detrusor hyperreflexia AND detrusor-sphincter dyssynergia (simultaneous bladder contraction against a closed sphincter, risking high intravesical pressures and hydronephrosis). (3) Sacral / infrasacral lesions (conus, cauda equina) destroy the LMN reflex arc, producing a flaccid, atonic bladder with overflow incontinence.",
            "distractors": [
                "Suprapontine cortical lesions cause uninhibited detrusor contractions, but the pontine micturition center is intact so the sphincter relaxes synchronously (no dyssynergia).",
                "Conus medullaris and cauda equina lesions cause a flaccid, hypocontractile bladder with absent detrusor contractions and overflow incontinence, not detrusor hyperreflexia.",
                "Peripheral pelvic neuropathy produces a flaccid neurogenic bladder.",
                "Pudendal nerve entrapment produces perineal pain, not detrusor hyperreflexia with dyssynergia."
            ],
            "key_point": "Suprasacral spinal cord lesions interrupt descending coordination from the pontine micturition center, causing detrusor hyperreflexia WITH detrusor-sphincter dyssynergia."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 22: Vascular Syndromes
ch22_questions = [
    {
        "id": "ch22-003",
        "chapter": "Vascular Syndromes",
        "section": "Anterior Cerebral Artery (ACA) Territory",
        "page": 554,
        "vignette": "A 71-year-old woman develops acute weakness and sensory loss. Neurological examination reveals severe spastic paresis and dense loss of pinprick and proprioception in her right lower extremity, while strength and sensation in her right face and upper extremity are almost completely preserved. She is remarkably indifferent, responds with long latencies (abulia), and has uninhibited urinary incontinence.",
        "question": "Which vascular territory is infarcted in this patient?",
        "options": [
            "Left anterior cerebral artery (ACA) distal to the anterior communicating artery",
            "Left middle cerebral artery (MCA) superior division",
            "Left anterior choroidal artery",
            "Left posterior cerebral artery calcarine branch",
            "Left lenticulostriate penetrating arteries"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The anterior cerebral artery (ACA) supplies the medial surface of the cerebral hemisphere, including the paracentral lobule (which contains the motor and sensory representations of the contralateral lower extremity and foot). ACA infarction classically causes contralateral motor and sensory deficits affecting the LEG disproportionately more than the arm or face (the reverse of MCA strokes). In addition, ischemia to the medial frontal lobe, supplementary motor area, and cingulate cortex results in abulia (psychomotor slowing, apathy) and frontal lobe incontinence due to loss of the medial frontal micturition inhibition center.",
            "distractors": [
                "MCA superior division stroke affects the convexity of the motor strip, causing weakness of the face and arm much more than the leg, with Broca aphasia.",
                "Anterior choroidal stroke affects the posterior limb of internal capsule, causing dense, proportional hemiplegia (face = arm = leg) with hemianopia.",
                "PCA calcarine stroke causes contralateral homonymous hemianopia without primary leg motor paresis.",
                "Lenticulostriate stroke in the posterior limb causes pure motor hemiparesis equally affecting face, arm, and leg."
            ],
            "key_point": "ACA infarction causes contralateral lower extremity motor and sensory loss exceeding arm/face deficits, associated with abulia and frontal urinary incontinence."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch22-004",
        "chapter": "Vascular Syndromes",
        "section": "Anterior Choroidal Artery Syndrome",
        "page": 558,
        "vignette": "A 56-year-old diabetic man presents with an acute stroke. Neurological exam reveals dense contralateral right hemiplegia equally involving the face, arm, and leg; contralateral right hemianesthesia for all modalities; and a complete right homonymous hemianopia. Higher cognitive functions including language, praxias, and neglect are completely intact.",
        "question": "What classic triad is produced by infarction of the anterior choroidal artery (AChA)?",
        "options": [
            "Contralateral hemiplegia (posterior limb of internal capsule), hemianesthesia (thalamocortical fibers), and homonymous hemianopia (retrolenticular capsule / optic tract / lateral geniculate body)",
            "Ipsilateral cranial nerve III palsy, contralateral ataxia, and chorea",
            "Contralateral leg weakness, abulia, and grasping reflex",
            "Receptive aphasia, visual agnosia, and prosopagnosia",
            "Ophthalmoplegia, cerebellar ataxia, and areflexia"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The anterior choroidal artery (AChA) arises from the internal carotid artery and supplies critical deep structures: (1) Posterior limb of the internal capsule (corticospinal fibers -> contralateral dense hemiplegia); (2) Posterior thalamocortical sensory radiations / retrolenticular internal capsule (somatosensory fibers -> contralateral hemianesthesia); (3) Retrolenticular internal capsule, optic tract, and lateral geniculate nucleus (visual fibers -> contralateral homonymous hemianopia). The classic AChA triad is contralateral hemiplegia, hemianesthesia, and homonymous hemianopia, with notable preservation of cortical higher functions (no aphasia or neglect).",
            "distractors": [
                "CN III palsy with contralateral ataxia/tremor defines midbrain syndromes (Claude/Benedikt syndrome), supplied by PCA/basilar perforators.",
                "Contralateral leg weakness and abulia characterize the ACA territory.",
                "Wernicke aphasia and agnosias characterize the MCA inferior division or cortical temporal strokes.",
                "Ophthalmoplegia, ataxia, and areflexia define Miller Fisher syndrome."
            ],
            "key_point": "The anterior choroidal artery triad comprises contralateral hemiplegia, hemianesthesia, and homonymous hemianopia with preserved cortical cognitive functions."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch22-005",
        "chapter": "Vascular Syndromes",
        "section": "Posterior Cerebral Artery: Macular Sparing",
        "page": 560,
        "vignette": "A 68-year-old woman with atrial fibrillation develops an acute left posterior cerebral artery (PCA) infarction involving the calcarine cortex. Automated visual field testing reveals a complete right homonymous hemianopia, but the central 5 degrees of the visual field in both eyes are completely intact and preserved ('macular sparing').",
        "question": "What is the anatomical and vascular basis of macular sparing in PCA occipital lobe infarctions?",
        "options": [
            "Dual collateral vascular supply to the occipital pole from terminal cortical branches of the middle cerebral artery (MCA)",
            "Direct innervation of the macula by the anterior ciliary arteries",
            "Bilateral retinal ganglion cell projections from the central fovea to both lateral geniculate nuclei",
            "Sprouting of new collateral axons from the superior colliculus to the occipital pole",
            "Macular visual fibers bypass the striate cortex and terminate in the frontal eye fields"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The primary visual cortex (Brodmann area 17) along the calcarine fissure is supplied primarily by the calcarine branch of the posterior cerebral artery (PCA). However, the representation of the macula (central 5-10 degrees of vision) occupies a disproportionately massive territory at the most posterior tip of the occipital pole. This occipital pole has a rich dual/overlapping collateral blood supply, receiving anastomotic branches from both the terminal cortical branches of the middle cerebral artery (MCA) and the PCA. Therefore, when the main PCA trunk is occluded, the MCA collaterals maintain perfusion of the occipital pole, preserving central visual acuity and central visual fields (macular sparing).",
            "distractors": [
                "Anterior ciliary arteries supply the anterior uvea and ciliary body of the eye, not the occipital cerebral cortex.",
                "Foveal ganglion cells split at the vertical meridian and project strictly hemispherically (contralaterally), not bilaterally to both LGNs.",
                "Axonal sprouting takes weeks-months and cannot explain immediate macular sparing at acute stroke onset.",
                "Macular visual fibers do not bypass the striate cortex; primary vision requires V1."
            ],
            "key_point": "Macular sparing in PCA strokes occurs because the occipital pole receives dual collateral circulation from terminal branches of the middle cerebral artery (MCA)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch22-006",
        "chapter": "Vascular Syndromes",
        "section": "Watershed / Borderzone Infarctions",
        "page": 562,
        "vignette": "A 63-year-old man experiences prolonged systemic hypotension and cardiac arrest during an elective procedure. Following resuscitation, neurological examination reveals severe weakness of both proximal shoulder girdles and hips (inability to lift arms above head or stand without assistance), while strength in his hands and feet is remarkably preserved ('man-in-a-barrel' syndrome).",
        "question": "Which borderzone vascular territory is damaged bilaterally to produce the 'man-in-a-barrel' syndrome?",
        "options": [
            "Anterior cortical borderzone between the anterior cerebral artery (ACA) and middle cerebral artery (MCA) territories",
            "Posterior cortical borderzone between the middle cerebral artery (MCA) and posterior cerebral artery (PCA)",
            "Internal borderzone between the lenticulostriate and middle cerebral artery branches",
            "Vertebrobasilar junction borderzone",
            "Spinal anterior cord watershed at T1-T2"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The cortical motor strip is somatotopically organized as a homunculus: the trunk and proximal limbs (shoulder and hip) lie in the superior convexity of the cerebral cortex, right at the boundary/watershed zone between the distal perfusion territories of the anterior cerebral artery (ACA) and middle cerebral artery (MCA). During episodes of severe systemic hypotension, hypovolemia, or cardiac arrest, perfusion pressure drops lowest at these furthest distal arterial boundary zones. Bilateral ACA-MCA watershed infarctions selectively damage the cortical representations of the shoulder and hip girdles while sparing the distal hand (lateral MCA convexity) and foot (deep medial ACA), creating the classic 'man-in-a-barrel' syndrome.",
            "distractors": [
                "MCA-PCA posterior watershed infarctions produce transcortical sensory aphasia, Balint syndrome, or cortical visual processing deficits, not proximal motor weakness.",
                "Internal borderzone infarctions produce rosary-like subcortical white matter infarctions, often causing hemiparesis or pure motor deficits.",
                "Vertebrobasilar borderzone ischemia produces brainstem and cerebellar symptoms.",
                "T1-T2 spinal watershed causes paraplegia of the legs, not isolated proximal arm and hip weakness."
            ],
            "key_point": "Bilateral ACA-MCA anterior borderzone (watershed) infarctions produce 'man-in-a-barrel' syndrome: severe proximal shoulder and hip weakness with preserved distal extremities."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch22-007",
        "chapter": "Vascular Syndromes",
        "section": "Basilar Artery Occlusion / Top of the Basilar",
        "page": 564,
        "vignette": "A 69-year-old man experiences sudden stupor. When aroused, he has bilateral pupillary asymmetry, limitation of upward gaze, bilateral ptosis, and vivid visual hallucinations of colorful flowers and animals in his room (peduncular hallucinosis). Brain MRI reveals acute ischemic lesions in the rostral mesencephalon, bilateral paramedian thalami, and bilateral occipital lobes.",
        "question": "What vascular syndrome, described by C. Miller Fisher, results from embolic occlusion of the rostral termination of the basilar artery?",
        "options": [
            "'Top of the basilar' syndrome",
            "Locked-in syndrome",
            "Lateral medullary syndrome",
            "Subclavian steal syndrome",
            "Moyamoya syndrome"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "'Top of the basilar' syndrome, classically described by C. Miller Fisher, occurs when a cardiac or vertebrobasilar embolus lodges at the bifurcation of the basilar artery into the posterior cerebral arteries (PCAs) and superior cerebellar arteries (SCAs). Ischemia affects the rostral brainstem (midbrain tegmentum), diencephalon (thalami), and occipital/temporal lobes. The syndrome is characterized by: (1) Visual deficits (cortical blindness, hemianopia, Balint syndrome); (2) Ocular motor abnormalities (vertical gaze palsy, skew deviation, pupillary abnormalities, third nerve palsies); (3) Behavioral/consciousness disturbances (fluctuating stupor, akinetic mutism, amnesia); and (4) Peduncular hallucinosis (vivid, colorful, well-formed visual hallucinations).",
            "distractors": [
                "Locked-in syndrome is caused by ventral pontine basilar occlusion (infarction of bilateral corticospinal and corticobulbar tracts), sparing consciousness and vertical eye movements.",
                "Lateral medullary syndrome (Wallenberg) is caused by PICA/vertebral occlusion, involving lower cranial nerves and cerebellar ataxia.",
                "Subclavian steal syndrome causes arm claudication and transient posterior circulation hypoperfusion during arm exercise.",
                "Moyamoya syndrome is chronic progressive stenosis of the terminal internal carotid arteries with basal collateral networks."
            ],
            "key_point": "'Top of the basilar' syndrome results from embolic occlusion of the rostral basilar apex, causing midbrain, thalamic, and occipital infarctions with vertical gaze palsies, coma/stupor, and peduncular hallucinosis."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch22-008",
        "chapter": "Vascular Syndromes",
        "section": "Lacunar Stroke Syndromes",
        "page": 556,
        "vignette": "A 62-year-old hypertensive woman develops sudden clumsiness of her left hand and weakness of her left lower face, accompanied by dysarthria and hyperactive left deep tendon reflexes with a positive left Babinski sign. Testing of motor strength shows mild weakness (4/5) in the left arm, but finger tapping and rapid alternating movements in the left hand are severely slow, clumsy, and out of proportion to the motor weakness (dysarthria-clumsy hand syndrome). Sensation is completely intact.",
        "question": "Which anatomical structure is most classically infarcted in dysarthria-clumsy hand syndrome?",
        "options": [
            "Genu or anterior limb of the internal capsule, or the base of the rostral/middle pons",
            "Posterior third of the posterior limb of the internal capsule",
            "Ventral posterolateral (VPL) nucleus of the thalamus",
            "Dentate nucleus of the ipsilateral cerebellum",
            "Primary motor cortex in the precentral gyrus"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Dysarthria-clumsy hand syndrome (one of Fisher's classical lacunar stroke syndromes) is characterized by severe dysarthria, facial weakness, dysphagia, and prominent clumsiness/dysmetria of the hand that is out of proportion to the mild motor weakness. It is caused by a small penetrating artery lacunar infarction located either in: (1) The genu / anterior limb of the internal capsule (and adjacent coronally descending fibers); or (2) The anterior upper to middle third of the basis pontis (disrupting crossing corticopontocerebellar fibers and corticobulbar fibers).",
            "distractors": [
                "Posterior limb of the internal capsule infarction causes pure motor hemiparesis (proportional dense weakness of face, arm, and leg without prominent disproportionate cerebellar-like clumsiness).",
                "VPL thalamic infarction causes pure sensory stroke.",
                "The dentate nucleus causes true cerebellar intention tremor and limb dysmetria, but not upper motor neuron facial palsy and Babinski sign.",
                "Cortical lesions typically cause associated cortical signs (aphasia, apraxia, neglect) not seen in lacunar syndromes."
            ],
            "key_point": "Dysarthria-clumsy hand syndrome is a lacunar stroke localized to the genu/anterior limb of the internal capsule or the ventral basis pontis."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

# CHAPTER 23: Coma and Herniation Syndromes
ch23_questions = [
    {
        "id": "ch23-003",
        "chapter": "Coma and Brain Herniation Syndromes",
        "section": "Uncal Herniation and Cranial Nerve III",
        "page": 575,
        "vignette": "A 38-year-old man sustains severe head trauma resulting in an acute, expanding right epidural hematoma. Over the next two hours, his Glasgow Coma Scale score drops from 14 to 8. On examination, his right pupil is 6 mm and unreactive to light, while the left pupil is 3 mm and reacts briskly. He demonstrates weakness of the left arm and leg with extensor posturing on noxious stimulation.",
        "question": "What is the earliest reliable clinical sign of uncal (lateral transtentorial) brain herniation, and what anatomical mechanism causes it?",
        "options": [
            "Ipsilateral sluggish, then dilated and unreactive pupil (Hutchinson pupil), caused by compression of the peripheral parasympathetic pupillomotor fibers on the superficial surface of CN III against the tentorial edge or posterior cerebral artery",
            "Immediate bilateral pin-point pupils from pontine tegmental hemorrhage",
            "Contralateral abducens nerve palsy from stretching across the petrous ridge",
            "Cheyne-Stokes breathing from diencephalic depression",
            "Bilateral complete ptosis from levator palpebrae subnucleus infarction"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "In uncal (lateral transtentorial) herniation, the medial temporal lobe (uncus and parahippocampal gyrus) is driven medially and downward through the tentorial notch (incisura). The earliest and most critical warning sign is ipsilateral pupillomotor dysfunction: the pupil becomes sluggish and then widely dilated and unreactive to light (Hutchinson pupil). This occurs because the preganglionic parasympathetic pupillomotor fibers ride on the superficial, dorsomedial surface of the third cranial nerve, making them exquisitely vulnerable to early mechanical compression between the herniating uncus, the posterior cerebral artery, and the petroclinoid ligament/tentorial free edge, before somatic motor fibers are damaged.",
            "distractors": [
                "Bilateral pinpoint pupils occur in pontine tegmental hemorrhage or opioid toxicity, not early uncal herniation.",
                "Abducens palsy is a non-localizing sign of generalized ICP elevation, not the hallmark primary driver of uncal herniation.",
                "Cheyne-Stokes breathing occurs in central transtentorial herniation or bilateral hemispheric/diencephalic disease.",
                "Bilateral ptosis occurs late when the central caudal subnucleus is destroyed, not as the earliest sign of uncal herniation."
            ],
            "key_point": "The earliest sign of uncal herniation is an ipsilateral dilated and unreactive pupil (Hutchinson pupil), caused by mechanical compression of superficial parasympathetic fibers of CN III."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch23-004",
        "chapter": "Coma and Brain Herniation Syndromes",
        "section": "Kernohan-Woltman Notch Phenomenon",
        "page": 577,
        "vignette": "A 45-year-old woman is admitted following a traumatic brain injury with a large left acute subdural hematoma. Neurological examination reveals a widely dilated, unreactive left pupil and dense HEMIPARESIS OF THE LEFT ARM AND LEG (weakness on the SAME side as the hematoma). CT confirms a massive left hemispheric hematoma with 15 mm of midline shift.",
        "question": "What is the neuroanatomical explanation for this ipsilateral hemiparesis (Kernohan-Woltman notch phenomenon)?",
        "options": [
            "The expanding left mass pushed the midbrain laterally across the incisura, compressing the CONTRALATERAL (right) cerebral peduncle against the sharp right tentorial edge",
            "Direct compression of the left cerebral peduncle by the uncus before decussation",
            "Ischemic infarction of the left anterior spinal artery in the medulla",
            "Bilateral pontine hemorrhage extending into the corticospinal tracts",
            "Compression of the ipsilateral motor strip against the inner table of the parietal skull"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The Kernohan-Woltman notch phenomenon is a classic 'false-localizing sign' in neurosurgery and neurology. An expanding unilateral supratentorial mass (here, on the left) shifts the entire upper brainstem laterally across the tentorial incisura. The CONTRALATERAL (right) cerebral peduncle is forced against the sharp, rigid free edge of the opposite (right) tentorium cerebelli (the Kernohan notch). The indentation/damage to the right cerebral peduncle destroys corticospinal fibers that subsequently cross in the medullary pyramids to innervate the LEFT side of the body. Thus, the patient develops a paradoxical ipsilateral hemiparesis (weakness on the same side as the original intracranial lesion).",
            "distractors": [
                "Compression of the ipsilateral (left) cerebral peduncle would produce CONTRALATERAL (right) hemiparesis, which is the standard expected finding, not the Kernohan notch paradox.",
                "Anterior spinal artery infarction causes medial medullary syndrome with contralateral weakness, not ipsilateral uncal notch indentation.",
                "Duret hemorrhages occur in the midline brainstem tegmentum during downward herniation.",
                "Motor strip compression against skull produces contralateral limb weakness, not ipsilateral."
            ],
            "key_point": "Kernohan notch phenomenon: lateral displacement of the midbrain compresses the contralateral cerebral peduncle against the opposite tentorial edge, causing paradoxical ipsilateral hemiparesis."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch23-005",
        "chapter": "Coma and Brain Herniation Syndromes",
        "section": "Decorticate vs Decerebrate Posturing",
        "page": 580,
        "vignette": "A comatose patient in the neuro-ICU is evaluated for motor responses to noxious stimulation. In response to sternal rub, the patient demonstrates flexion of the arms, wrists, and fingers, with extension, internal rotation, and plantarflexion of the lower extremities (decorticate posturing). Six hours later, repeated stimulation elicits extension, adduction, and hyperpronation of the upper extremities along with extension of the lower extremities (decerebrate posturing).",
        "question": "What anatomical boundary in the brainstem demarcates the transition from decorticate (flexor) posturing to decerebrate (extensor) posturing?",
        "options": [
            "The red nucleus in the midbrain (decorticate = rostral to red nucleus; decerebrate = caudal to red nucleus between red nucleus and vestibular nuclei)",
            "The pontomedullary junction",
            "The medullary pyramidal decussation",
            "The optic chiasm",
            "The anterior commissure"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "The neuroanatomical level of motor posturing is determined by the RED NUCLEUS: (1) Decorticate (flexor) posturing results from destructive lesions ROSTRAL to the red nucleus (cortex, internal capsule, or diencephalon). The rubrospinal tract (originating in the red nucleus) remains functional and drives flexion of the upper limbs, while lost corticospinal inhibition permits vestibulospinal/pontine reticulospinal extension in the legs. (2) Decerebrate (extensor) posturing results from lesions CAUDAL to the red nucleus (transection of the midbrain below the red nucleus, but rostral to the lateral vestibular / Deiters nucleus in the pons). Loss of the rubrospinal tract eliminates upper limb flexion, leaving the lateral vestibulospinal tract entirely unopposed, which fires massive tonic extensor excitation into both the arms and legs.",
            "distractors": [
                "Lesions at the pontomedullary junction compromise the vestibular nuclei, leading to flaccid paralysis rather than extensor posturing.",
                "The pyramidal decussation is in the caudal medulla; lesions produce flaccid quadriplegia.",
                "The optic chiasm and anterior commissure are forebrain structures well above the postural brainstem integrators.",
                "Decerebrate posturing requires an intact lateral vestibular nucleus in the pons."
            ],
            "key_point": "Decorticate posturing (flexed arms) occurs with lesions rostral to the red nucleus; decerebrate posturing (extended arms) occurs with lesions caudal to the red nucleus, driven by unopposed vestibulospinal tone."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch23-006",
        "chapter": "Coma and Brain Herniation Syndromes",
        "section": "Subfalcine and Tonsillar Herniation",
        "page": 574,
        "vignette": "A 60-year-old man with a massive frontal glioblastoma develops acute left leg monoplegia followed hours later by sudden respiratory arrest, extreme hypertension, bradycardia (Cushing response), and bilateral flaccidity. Postmortem neuropathology demonstrates two distinct brain herniations: the cingulate gyrus pushed beneath the falx cerebri, and the cerebellar tonsils impacted downward into the foramen magnum.",
        "question": "Which secondary complications are directly caused by subfalcine (cingulate) herniation and tonsillar herniation, respectively?",
        "options": [
            "Subfalcine: compression of the ipsilateral anterior cerebral artery (ACA) causing leg weakness; Tonsillar: compression of the medulla oblongata causing respiratory arrest",
            "Subfalcine: compression of the posterior cerebral artery; Tonsillar: third nerve palsy",
            "Subfalcine: compression of the basilar artery; Tonsillar: bitemporal hemianopia",
            "Subfalcine: compression of the cavernous sinus; Tonsillar: Horner syndrome",
            "Subfalcine: compression of the middle cerebral artery; Tonsillar: optic nerve avulsion"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Herniation syndromes have distinct anatomical mechanisms and vascular consequences: (1) Subfalcine (cingulate) herniation occurs when the cingulate gyrus is displaced medially beneath the rigid free margin of the falx cerebri; this frequently compresses the ipsilateral anterior cerebral artery (ACA) against the falx, producing secondary ACA territory infarction manifested as contralateral lower extremity paresis (leg monoplegia). (2) Tonsillar (infratentorial) herniation occurs when the cerebellar tonsils are driven downward through the foramen magnum; this directly impacts and compresses the medulla oblongata, crushing the ventrolateral respiratory centers (causing instantaneous apnea/respiratory arrest) and provoking the Cushing response (hypertension and bradycardia).",
            "distractors": [
                "PCA compression occurs in uncal transtentorial herniation, not subfalcine herniation.",
                "Basilar artery compression and bitemporal hemianopia are not the features of subfalcine or tonsillar herniations.",
                "The cavernous sinus is in the middle cranial fossa, unrelated to subfalcine displacement.",
                "MCA compression and optic nerve avulsion do not characterize subfalcine or tonsillar herniations."
            ],
            "key_point": "Subfalcine herniation compresses the ACA against the falx (causing leg paresis); tonsillar herniation compresses the medulla into the foramen magnum (causing apnea and death)."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch23-007",
        "chapter": "Coma and Brain Herniation Syndromes",
        "section": "Brain Death Criteria and Cold Caloric Testing",
        "page": 582,
        "vignette": "A 50-year-old woman with a catastrophic aneurysmal subarachnoid hemorrhage is evaluated for brain death. The patient is deeply comatose, normothermic, and free of sedating medications or paralytics. During testing of brainstem reflexes, the examiner irrigates each external auditory canal with 50 mL of ice water (cold caloric / oculovestibular testing) while holding the head at 30 degrees.",
        "question": "What is the expected oculovestibular response in an intact, comatose patient with a fully functional brainstem, versus a patient with brain death?",
        "options": [
            "Intact brainstem: tonic conjugate deviation of both eyes TOWARD the irrigated ear; Brain death: completely absent eye movement (eyes remain fixed at midline)",
            "Intact brainstem: rapid nystagmus beating TOWARD the irrigated ear; Brain death: vertical skew deviation",
            "Intact brainstem: dilation of the ipsilateral pupil; Brain death: pupillary miosis",
            "Intact brainstem: roving horizontal eye movements away from the ear; Brain death: nystagmus",
            "Intact brainstem: bilateral upward ocular elevation; Brain death: convergence spasm"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "In oculovestibular testing with cold water (cold caloric test): (1) In awake individuals with intact cortex, cold water produces tonic deviation of the eyes toward the cold ear, followed by fast corrective saccades beating AWAY from the cold ear (COWS: Cold Opposite, Warm Same). (2) In a comatose patient with an INTACT BRAINSTEM, cortical saccadic generation is absent, so the patient demonstrates TONIC conjugate deviation of both eyes TOWARD the cold-irrigated ear lasting 1-2 minutes. (3) In brain death, brainstem vestibular nuclei (CN VIII), PPRF, MLF, and oculomotor nuclei (CN III, VI) are non-functional; therefore, no ocular movement occurs whatsoever (the eyes remain stationary and fixed in midline).",
            "distractors": [
                "Comatose patients do not produce the rapid corrective nystagmus phase because cortical saccade generation is suppressed by coma.",
                "Pupillary dilation is an autonomic response, not the vestibulo-ocular reflex arc.",
                "Roving eye movements indicate metabolic encephalopathy with an intact brainstem, not cold caloric reflex response.",
                "Vertical elevation occurs with bilateral warm water irrigation in intact brains, not unilateral cold irrigation."
            ],
            "key_point": "In a comatose patient with an intact brainstem, cold caloric irrigation produces tonic conjugate eye deviation toward the cold ear; in brain death, eye movements are completely absent."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    },
    {
        "id": "ch23-008",
        "chapter": "Coma and Brain Herniation Syndromes",
        "section": "Duret Hemorrhages and Central Herniation",
        "page": 576,
        "vignette": "A 72-year-old man with acute intracerebral hemorrhage deteriorates rapidly from lethargy to deep coma. Neurological examination reveals bilateral mid-position unreactive pupils (5 mm), loss of vertical and horizontal doll's eye reflexes, central neurogenic hyperventilation, and bilateral extensor posturing. Postmortem examination reveals linear, flame-shaped hemorrhages in the midline paramedian tegmentum of the rostral pons and midbrain (Duret hemorrhages).",
        "question": "What is the physical mechanical mechanism that produces Duret hemorrhages during central downward brain herniation?",
        "options": [
            "Downward displacement and elongation of the brainstem stretches and tears paramedian penetrating basilar artery branches against a tethered basilar trunk",
            "Primary rupture of a Charcot-Bouchard microaneurysm in the dorsal midbrain",
            "Retrograde venous thrombosis of the straight sinus",
            "Embolization of the anterior inferior cerebellar artery",
            "Direct laceration of the brainstem by the clivus bone"
        ],
        "correct": 0,
        "explanation": {
            "why_correct": "Duret hemorrhages are secondary brainstem hemorrhages occurring late in severe downward transtentorial herniation (central herniation). As the supratentorial mass forces the diencephalon and brainstem to shift caudally into the posterior fossa, the basilar artery remains anchored and tethered to the skull base (anterior to the clivus) by the circle of Willis. The downward displacement of the parenchyma causes severe longitudinal stretching, shearing, and eventual rupture of the delicate, short paramedian penetrating pontine and mesencephalic branches of the basilar artery, creating fatal linear midline and tegmental hemorrhages.",
            "distractors": [
                "Charcot-Bouchard microaneurysms cause primary hypertensive intraparenchymal hemorrhage (e.g., in putamen/thalamus), not secondary brainstem herniation hemorrhages.",
                "Straight sinus thrombosis causes bilateral thalamic hemorrhagic infarctions, not classic paramedian tegmental Duret hemorrhages.",
                "AICA embolization causes lateral inferior pontine / cerebellar infarction.",
                "Duret hemorrhages are vascular stretch tears within the parenchyma, not external clival lacerations."
            ],
            "key_point": "Duret hemorrhages are paramedian brainstem tegmental hemorrhages caused by mechanical stretching and tearing of penetrating basilar arteries during caudal brainstem herniation."
        },
        "figure": None,
        "status": "approved",
        "confidence": "high"
    }
]

if __name__ == '__main__':
    add_questions_to_chapter('content/approved/chapter21.json', ch21_questions)
    add_questions_to_chapter('content/approved/chapter22.json', ch22_questions)
    add_questions_to_chapter('content/approved/chapter23.json', ch23_questions)
