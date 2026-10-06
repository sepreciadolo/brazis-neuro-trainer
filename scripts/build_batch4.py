import json
import os

BATCH4 = {
  "chapter18": [
    {
      "id": "ch18-001",
      "chapter": "The Anatomic Localization of Lesions in the Thalamus",
      "section": "Thalamic Pain Syndrome (Dejerine-Roussy)",
      "page": 512,
      "vignette": "A 66-year-old man recovers from an acute ischemic stroke that caused initial left hemianesthesia and mild hemiparesis. Three months later, he returns with unbearable, burning, agonizing pain across his entire left face, arm, trunk, and leg. Light touch with a cotton wisp triggers excruciating dysesthesia and paroxysms of severe burning pain (allodynia and hyperpathia). Neurologic examination confirms hemianesthesia to pinprick and temperature on the left, with left hemiataxia and pseudoathetosis of the left fingers.",
      "question": "Which thalamic vascular territory and nuclei were infarcted in Déjerine-Roussy syndrome?",
      "options": [
        "Thalamogeniculate territory involving the ventral posterolateral (VPL) and ventral posteromedial (VPM) nuclei",
        "Paramedian (thalamoperforating) territory involving the dorsomedial and intralaminar nuclei",
        "Tuberothalamic (polar) territory involving the anterior thalamic nucleus",
        "Posterior choroidal territory involving the pulvinar and lateral geniculate nucleus",
        "Anterior choroidal territory involving the reticular thalamic nucleus"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The classic Déjerine-Roussy thalamic syndrome is caused by infarction in the territory of the thalamogeniculate arteries (branches of the P2 segment of the posterior cerebral artery). This territory supplies the primary somatosensory relay nuclei of the thalamus: the Ventral Posterolateral (VPL, receiving spinothalamic and medial lemniscus tracts from the body) and Ventral Posteromedial (VPM, receiving trigeminothalamic tracts from the face). Infarction causes contralateral hemianesthesia followed by central neuropathic pain, allodynia, hyperpathia, sensory hemiataxia, and pseudoathetosis.",
        "distractors": [
          "Paramedian artery infarction (artery of Percheron) causes fluctuating somnolence, hypersomnia, cognitive abulia, and vertical gaze palsy, not the classic Déjerine-Roussy sensory pain syndrome.",
          "Tuberothalamic (polar) artery infarction causes severe personality changes, perseveration, abulia, and memory loss, without contralateral hemianesthesia or burning pain.",
          "Posterior choroidal artery infarction causes visual field defects (horizontal sectoranopia or wedge defects) via LGN ischemia.",
          "Anterior choroidal artery infarction causes hemiplegia, hemianesthesia, and homonymous hemianopia via posterior limb of the internal capsule, not isolated sensory relay thalamic pain."
        ],
        "key_point": "Déjerine-Roussy syndrome (central thalamic pain and allodynia) results from thalamogeniculate artery infarction of the VPL and VPM sensory relay nuclei."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch18-002",
      "chapter": "The Anatomic Localization of Lesions in the Thalamus",
      "section": "Artery of Percheron & Paramedian Thalamic Infarction",
      "page": 520,
      "vignette": "A 72-year-old woman is found unresponsive in bed. On examination, she is stuporous, opening her eyes only to painful stimuli, and shows vertical conjugate gaze paralysis (inability to look upward or downward on command or with doll's eye maneuvers). Over the following days, she remains profoundly apathetic, abulic, and hypersomnolent with severe memory loss. MRI demonstrates bilateral, symmetric acute infarctions restricted to the paramedian thalami and rostral midbrain tegmentum.",
      "question": "What anatomical arterial variant accounts for bilateral symmetric paramedian thalamic infarction from a single occlusion?",
      "options": [
        "Artery of Percheron (a single solitary arterial trunk arising from one P1 segment that bifurcates to supply both paramedian thalami)",
        "Agenesis of the anterior communicating artery leading to bihemispheric ACA infarction",
        "Persistent hypoglossal artery with basilar trunk hypoplasia",
        "Duplicate posterior inferior cerebellar artery",
        "Bilateral internal carotid artery siphon dissection"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The artery of Percheron is an uncommon anatomic variant in which a single dominant paramedian artery trunk arises from the P1 segment of one posterior cerebral artery and branches to supply both the right and left medial/paramedian thalami and the rostral mesencephalon. Occlusion of this single solitary vessel causes bilateral, symmetric paramedian thalamic and rostral midbrain infarction, presenting with the classic triad of: (1) altered mental status/hypersomnolence, (2) vertical gaze palsy, and (3) memory loss and abulia.",
        "distractors": [
          "Agenesis of the ACoA causes anterior communicating aneurysm predisposition, not bilateral thalamic strokes.",
          "Persistent hypoglossal artery connects the cervical ICA to the basilar artery, a primitive persistent fetal anastomosis.",
          "Duplicate PICA is an anatomical curiosity that does not perfuse the thalamus.",
          "Carotid dissection causes hemispheric MCA/ACA ischemic strokes, not isolated bilateral paramedian thalamic strokes."
        ],
        "key_point": "Occlusion of the artery of Percheron produces bilateral paramedian thalamic and rostral midbrain infarctions with hypersomnolence, vertical gaze palsy, and abulia."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter19": [
    {
      "id": "ch19-001",
      "chapter": "Basal Ganglia",
      "section": "Hemiballismus & Subthalamic Nucleus",
      "page": 545,
      "vignette": "A 71-year-old diabetic woman suddenly develops continuous, violent, flinging, wide-amplitude, involuntary movements of her right arm and right leg. The wild movements occur continuously while awake and subside only during sleep. Neurologic examination shows no weakness, and deep tendon reflexes and sensation are intact. Brain MRI reveals a small acute focal ischemic lacunar infarction.",
      "question": "Which basal ganglia structure is infarcted to produce contralateral hemiballismus?",
      "options": [
        "Left subthalamic nucleus of Luys",
        "Right globus pallidus pars interna (GPi)",
        "Left substantia nigra pars compacta",
        "Right caudate nucleus head",
        "Left putamen"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Hemiballismus is caused by a lesion in the contralateral subthalamic nucleus (STN) of Luys or its immediate connections in the indirect basal ganglia pathway. The STN normally provides powerful excitatory glutamatergic drive to the internal segment of the globus pallidus (GPi) and substantia nigra pars reticulata (SNr), which in turn exert inhibitory GABAergic control over the motor thalamus. Loss of STN drive disinhibits the thalamus (thalamocortical motor loop disinhibition), unleashing violent, involuntary flinging ballistic movements on the contralateral side of the body.",
        "distractors": [
          "GPi lesions or stimulation reduce hyperkinetic movements and treat dystonia/dyskinesias.",
          "Substantia nigra pars compacta degeneration causes Parkinson disease (rigidity, bradykinesia, resting tremor).",
          "Caudate nucleus atrophy causes chorea, as seen in Huntington disease.",
          "Putaminal lesions typically cause dystonia or parkinsonism, not hemiballismus."
        ],
        "key_point": "Hemiballismus (violent flinging unilateral limb movements) localizes to an acute lesion (usually ischemic) in the contralateral subthalamic nucleus (STN)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch19-002",
      "chapter": "Basal Ganglia",
      "section": "Direct vs Indirect Basal Ganglia Pathways",
      "page": 558,
      "vignette": "A 44-year-old man presents with insidious choreiform jerks of the face and limbs, emotional volatility, and executive cognitive decline. Family history is notable for his father having developed similar symptoms in his 40s. Brain MRI shows profound bilateral atrophy of the caudate nuclei with compensatory enlargement of the frontal horns of the lateral ventricles.",
      "question": "What is the primary neurochemical pathology in the early stages of Huntington disease?",
      "options": [
        "Loss of striatal GABAergic and enkephalinergic medium spiny neurons projecting to the external globus pallidus (GPe), disabling the indirect pathway",
        "Degeneration of dopaminergic neurons in the substantia nigra pars compacta",
        "Loss of cholinergic interneurons in the striatum",
        "Destruction of glutamatergic projections from the subthalamic nucleus to the GPi",
        "Selective necrosis of the globus pallidus pars interna"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "In early Huntington disease, there is selective degeneration of striatal medium spiny GABAergic neurons expressing enkephalin and D2 dopamine receptors that project to the external segment of the globus pallidus (GPe). These neurons constitute the first link in the indirect pathway. Disruption of this inhibitory input causes GPe hyperactivation, which in turn excessively inhibits the subthalamic nucleus. As a result, the STN fails to excite the GPi/SNr, producing net disinhibition of the motor thalamus and chorea.",
        "distractors": [
          "Degeneration of dopaminergic neurons in the substantia nigra pars compacta defines Parkinson disease.",
          "Cholinergic interneurons in the striatum are relatively spared in Huntington disease.",
          "Glutamatergic projection loss from the STN occurs in hemiballismus, not Huntington disease.",
          "Selective globus pallidus necrosis occurs in carbon monoxide poisoning and cyanide toxicity."
        ],
        "key_point": "Huntington disease is characterized by bilateral caudate atrophy and early loss of GABA/enkephalin indirect pathway neurons, causing thalamocortical disinhibition and chorea."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter20": [
    {
      "id": "ch20-001",
      "chapter": "The Localization of Lesions Affecting the Cerebral Cortex",
      "section": "Parietal Lobe: Gerstmann Syndrome",
      "page": 588,
      "vignette": "A 62-year-old right-handed woman presents with sudden cognitive difficulty. On examination, language fluency and auditory comprehension are intact. However, she is unable to perform simple calculations like 7 + 5 (acalculia), cannot write a simple sentence despite normal motor hand strength (agraphia), cannot tell her left hand from her right hand (right-left disorientation), and cannot distinguish or name individual fingers when touched (finger agnosia). Primary sensory modalities are intact.",
      "question": "Which cortical region is infarcted to produce Gerstmann syndrome?",
      "options": [
        "Left (dominant) angular gyrus of the inferior parietal lobule",
        "Right (non-dominant) inferior parietal lobule",
        "Left supramarginal gyrus and arcuate fasciculus",
        "Left inferior frontal gyrus (Broca area)",
        "Left superior temporal gyrus (Wernicke area)"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The tetrad of: (1) agraphia without alexia, (2) acalculia, (3) finger agnosia, and (4) right-left disorientation constitutes classic Gerstmann syndrome. It localizes precisely to the dominant (usually left) angular gyrus of the inferior parietal lobule (Brodmann area 39), which serves as a major multimodal integration zone for language, spatial representation of the body schema, and arithmetic symbols.",
        "distractors": [
          "Non-dominant (right) parietal lesions produce hemispatial neglect, anosognosia, constructional apraxia, and dressing apraxia.",
          "Supramarginal gyrus and arcuate fasciculus lesions produce conduction aphasia (impaired repetition with intact comprehension).",
          "Broca area (inferior frontal gyrus) lesions produce non-fluent expressive motor aphasia.",
          "Wernicke area (superior temporal gyrus) lesions produce fluent sensory aphasia with impaired comprehension and neologisms."
        ],
        "key_point": "Gerstmann syndrome (acalculia, agraphia, finger agnosia, right-left disorientation) localizes to the dominant (left) angular gyrus of the inferior parietal lobule."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch20-002",
      "chapter": "The Localization of Lesions Affecting the Cerebral Cortex",
      "section": "Bálint Syndrome & Bilateral Parieto-Occipital Lesions",
      "page": 602,
      "vignette": "A 68-year-old man suffers cardiac arrest with severe hypotension. After resuscitation, his visual acuity is 20/20, but he cannot reach out and grab a pen held in front of him (reaching wildly off to the side). When shown a picture of a busy street scene, he can describe individual details (such as a red car) but cannot perceive or comprehend the scene as a unified whole. He is also unable to voluntarily direct his gaze toward new visual targets, although involuntary ocular pursuit is normal.",
      "question": "What is the diagnosis and anatomic localization of Bálint syndrome?",
      "options": [
        "Bilateral watershed parieto-occipital infarctions (Bálint syndrome: optic ataxia, simultanagnosia, and psychic paralysis of gaze)",
        "Unilateral dominant parietal lobe infarction with visual agnosia",
        "Bilateral occipital calcarine infarctions (Anton syndrome)",
        "Frontal eye field bilateral infarctions",
        "Corpus callosum anterior trunk infarction"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Bálint syndrome is the classic clinical triad of: (1) optic ataxia (inability to guide the hand to reach an object under visual guidance despite normal limb strength), (2) simultanagnosia (inability to perceive more than one visual item at a time or integrate parts into a whole), and (3) ocular apraxia / psychic paralysis of gaze (inability to voluntarily redirect gaze to a new visual target). It is caused by bilateral damage to the dorsal visual stream in the parieto-occipital junctions, classically occurring after watershed borderzone infarction between the MCA and PCA following severe systemic hypotension.",
        "distractors": [
          "Unilateral parietal lesions cause hemispatial neglect or Gerstmann syndrome, not the full triad of Bálint syndrome.",
          "Anton syndrome is cortical blindness with visual anosognosia (denial of blindness), caused by bilateral calcarine striate cortex infarctions.",
          "Frontal eye field lesions cause gaze deviation toward the lesion acutely, but do not produce simultanagnosia or optic ataxia.",
          "Corpus callosum lesions cause split-brain disconnection syndromes (callosal apraxia, alien hand syndrome)."
        ],
        "key_point": "Bálint syndrome consists of optic ataxia, simultanagnosia, and ocular apraxia, localizing to bilateral parieto-occipital borderzone lesions."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter21": [
    {
      "id": "ch21-001",
      "chapter": "Localization of Lesions in the Autonomic Nervous System",
      "section": "Horner Syndrome: Pharmacologic Localization",
      "page": 646,
      "vignette": "A 48-year-old man develops right ptosis and miosis following a motor vehicle collision with cervical hyperextension. Anisocoria is greater in darkness. Instillation of topical 0.5% apraclonidine into both eyes results in reversal of the anisocoria, with dilation of the right pupil and subtle elevation of the right eyelid. Forty-eight hours later, topical 1% hydroxyamphetamine is instilled: the left (normal) pupil dilates briskly, while the right (miotic) pupil fails to dilate.",
      "question": "What order neuron is disrupted in this patient's Horner syndrome?",
      "options": [
        "Third-order (postganglionic) sympathetic neuron located at or distal to the superior cervical ganglion",
        "First-order (central) sympathetic neuron in the brainstem or spinal cord",
        "Second-order (preganglionic) sympathetic neuron in the apex of the lung or cervical sympathetic chain",
        "Parasympathetic preganglionic neuron in the Edinger-Westphal nucleus",
        "Ciliary ganglion postganglionic parasympathetic fiber"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Topical apraclonidine confirms a Horner syndrome via denervation supersensitivity of alpha-1 receptors (dilating the Horner pupil and reversing anisocoria). The hydroxyamphetamine test localizes the order of the neuron: hydroxyamphetamine stimulates the release of stored norepinephrine from intact third-order postganglionic nerve terminals. In a first- or second-order lesion, the third-order axon is intact, so hydroxyamphetamine dilates both pupils normally. In a third-order (postganglionic) lesion (e.g., internal carotid artery dissection, cavernous sinus mass), the postganglionic nerve terminal has degenerated and contains no stored norepinephrine; therefore, the pupil FAILS to dilate.",
        "distractors": [
          "In first-order (central) Horner syndrome, hydroxyamphetamine dilates both pupils symmetrically because the postganglionic axon is intact.",
          "In second-order (preganglionic) Horner syndrome, the postganglionic third-order axon is intact, so hydroxyamphetamine dilates both pupils equally.",
          "Edinger-Westphal parasympathetic lesions produce a dilated pupil (mydriasis), not miosis.",
          "Ciliary ganglion lesions cause an Adie tonic pupil with light-near dissociation and mydriasis, not Horner syndrome."
        ],
        "key_point": "Failure of the miotic pupil to dilate with topical hydroxyamphetamine confirms a third-order (postganglionic) Horner syndrome (e.g., carotid artery dissection)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter22": [
    {
      "id": "ch22-001",
      "chapter": "Vascular Syndromes of the Forebrain, Brainstem, and",
      "section": "Anterior vs Middle Cerebral Artery Syndromes",
      "page": 662,
      "vignette": "A 74-year-old man presents with acute weakness of the left lower extremity that is far more severe than the left upper extremity (leg strength 1/5, arm strength 4/5, face strength normal). He has marked left leg sensory loss to pinprick and vibration, urinary incontinence, and exhibits profound abulia with delayed verbal responses and bilateral grasping reflexes.",
      "question": "Which arterial territory is occluded?",
      "options": [
        "Right anterior cerebral artery (ACA)",
        "Right middle cerebral artery (MCA) superior division",
        "Right middle cerebral artery (MCA) inferior division",
        "Right posterior cerebral artery (PCA)",
        "Right anterior choroidal artery"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The anterior cerebral artery (ACA) supplies the medial surface of the cerebral hemisphere, which corresponds to the homunculus representation of the contralateral lower extremity (paracentral lobule). Consequently, ACA infarction produces contralateral hemiparesis and hemisensory loss affecting the LEG far more than the arm, while completely sparing the face. Involvement of the medial frontal lobe, cingulate gyrus, and supplementary motor area accounts for the abulia, urinary urgency/incontinence, and primitive grasp reflexes.",
        "distractors": [
          "MCA superior division infarction causes hemiparesis affecting the face and ARM far more than the leg (brachiofacial), with Broca aphasia (left) or hemineglect (right).",
          "MCA inferior division infarction causes homonymous hemianopia and sensory loss, sparing motor power.",
          "PCA infarction causes homonymous hemianopia with macular sparing and thalamic sensory loss, not isolated leg paresis.",
          "Anterior choroidal artery infarction causes dense, equal hemiplegia of the face, arm, and leg (posterior limb of internal capsule) with hemianesthesia."
        ],
        "key_point": "Anterior cerebral artery (ACA) infarction produces leg > arm weakness and sensory loss, accompanied by abulia, urinary incontinence, and primitive frontal release reflexes."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch22-002",
      "chapter": "Vascular Syndromes of the Forebrain, Brainstem, and",
      "section": "Watershed (Borderzone) Infarctions",
      "page": 678,
      "vignette": "A 79-year-old woman develops profound hypotension during emergency coronary bypass surgery. Postoperatively, when she awakens, she has severe bilateral proximal arm and leg weakness ('man-in-a-barrel' syndrome), such that she cannot raise her arms or thighs, but has preserved movement in her hands and feet. Sensory testing shows patchy bilateral proximal trunk numbness. Cranial nerves, language, and facial movements are normal.",
      "question": "What is the hemodynamic mechanism and localization of 'man-in-a-barrel' syndrome?",
      "options": [
        "Bilateral cortical borderzone (watershed) infarctions between the anterior and middle cerebral arteries",
        "Bilateral anterior spinal artery infarction in the mid-cervical cord",
        "Basilar artery trunk thrombosis causing locked-in syndrome",
        "Acute bilateral brachial plexopathy from surgical positioning",
        "Central pontine myelinolysis"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The cortical watershed (borderzone) between the anterior cerebral artery (ACA) and middle cerebral artery (MCA) territories lies in the parasagittal frontal cortex, which corresponds anatomically to the motor homunculus representation of the shoulder and hip girdles. Severe systemic hypotension selectively deprives these distal borderzones of perfusion, producing bilateral infarctions that present as proximal arm and proximal leg paralysis with distal hand and foot preservation ('man-in-a-barrel' syndrome).",
        "distractors": [
          "Anterior spinal artery cervical cord infarction causes spastic paraplegia of both legs and flaccid arms, with bilateral loss of pain and temperature below the neck.",
          "Basilar artery thrombosis causes quadriplegia with preserved vertical eye movements and consciousness (locked-in syndrome), not isolated proximal weakness.",
          "Brachial plexopathy impairs the upper extremities only and causes sensory loss along peripheral distributions, sparing the lower extremities.",
          "Central pontine myelinolysis causes pseudobulbar palsy and spastic quadriplegia, not selective proximal 'man-in-a-barrel' weakness."
        ],
        "key_point": "Bilateral ACA-MCA watershed (borderzone) infarctions from systemic hypotension cause 'man-in-a-barrel' syndrome (bilateral proximal arm and shoulder weakness with distal sparing)."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ],
  "chapter23": [
    {
      "id": "ch23-001",
      "chapter": "The Localization of Lesions Causing Coma",
      "section": "Uncal vs Central Transtentorial Herniation",
      "page": 696,
      "vignette": "A 36-year-old man with a traumatic right acute subdural hematoma deteriorates rapidly in the neuro-ICU. His Glasgow Coma Scale drops from 12 to 5. Neurologic examination reveals that the right pupil is 7 mm, fixed, and unreactive to light, while the left pupil is 3 mm and reactive. He demonstrates decerebrate (extensor) posturing of the left upper and lower extremities in response to noxious stimulation.",
      "question": "What herniation syndrome is present and what explains the dilated right pupil?",
      "options": [
        "Right uncal (lateral transtentorial) herniation compressing the ipsilateral third cranial nerve against the petroclinoid ligament",
        "Central transtentorial herniation with downward displacement of the diencephalon",
        "Subfalcine herniation compressing the anterior cerebral artery",
        "Tonsillar herniation through the foramen magnum",
        "Upward transtentorial herniation compressing the superior cerebellar artery"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "Uncal herniation occurs when an expanding supratentorial lateral mass (e.g., temporal lobe mass or acute subdural hematoma) forces the medial uncus of the temporal lobe over the tentorial notch. The herniating uncus directly compresses the ipsilateral (right) third cranial nerve as it crosses the subarachnoid space and tentorial edge, causing ipsilateral pupillary dilation (Hutchinson pupil) due to parasympathetic paralysis. Subsequent compression of the adjacent cerebral peduncle in the midbrain produces contralateral (left) hemiparesis and extensor posturing.",
        "distractors": [
          "Central transtentorial herniation causes downward displacement of both thalami and the midbrain, presenting with small reactive pupils (diencephalic stage) and Cheyne-Stokes respirations before pupillary enlargement.",
          "Subfalcine herniation forces the cingulate gyrus under the falx cerebri, compressing the ACA without third nerve palsy.",
          "Tonsillar herniation forces cerebellar tonsils into the foramen magnum, causing rapid medullary compression, respiratory arrest, and flaccidity.",
          "Upward herniation occurs from posterior fossa masses pushing the vermis upward through the tentorial notch, causing coma and downbeat nystagmus."
        ],
        "key_point": "Uncal herniation produces the classic sequence of an ipsilateral dilated, fixed pupil (CN III compression) followed by contralateral hemiparesis and coma."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    },
    {
      "id": "ch23-002",
      "chapter": "The Localization of Lesions Causing Coma",
      "section": "Kernohan Notch Phenomenon & False Localizing Signs",
      "page": 708,
      "vignette": "A 55-year-old woman with a large left temporal glioblastoma presents with progressive stupor. Examination reveals a dilated, fixed left pupil (7 mm) and dense spastic hemiparesis and hyperreflexia of the LEFT arm and leg with a left extensor plantar response. The right arm and leg have normal motor strength.",
      "question": "What anatomic mechanism explains why the hemiparesis is IPSILATERAL to the hemispheric mass lesion (Kernohan notch phenomenon)?",
      "options": [
        "The expanding left mass shifts the midbrain across the tentorial notch, compressing the contralateral right cerebral peduncle against the opposite tentorial edge",
        "The left corticospinal tract fails to decussate at the medullary pyramids",
        "The lesion directly invades the contralateral primary motor cortex across the corpus callosum",
        "Paradoxical herniation through the foramen of Monro",
        "Selective occlusion of the left anterior spinal artery"
      ],
      "correct": 0,
      "explanation": {
        "why_correct": "The Kernohan notch phenomenon is a classic false-localizing sign in neurosurgery. A large supratentorial mass on one side (left) pushes the upper brainstem sideways across the tentorial aperture, impacting the CONTRALATERAL (right) cerebral peduncle against the rigid contralateral tentorial free edge (producing a groove or notch, the Kernohan-Woltman notch). Because the right cerebral peduncle is damaged, the resulting hemiparesis is on the LEFT side of the body (ipsilateral to the tumor). The dilated pupil remains ipsilateral (left) due to direct local uncal compression of the left third nerve.",
        "distractors": [
          "Failure of corticospinal decussation is an exceedingly rare congenital malformation, not the acquired mechanism of Kernohan notch.",
          "Corpus callosum invasion causes cognitive slowing and apraxia, not a sudden false-localizing uncal shift.",
          "Herniation through the foramen of Monro causes unilateral hydrocephalus, not brainstem compression.",
          "Anterior spinal artery occlusion causes bilateral spinal deficits, not unilateral cerebral peduncle compression."
        ],
        "key_point": "The Kernohan notch phenomenon produces motor hemiparesis ipsilateral to a supratentorial mass due to compression of the contralateral cerebral peduncle against the opposite tentorial edge."
      },
      "figure": None,
      "status": "approved",
      "confidence": "high"
    }
  ]
}

# Write out batch 4
for ch_name, q_list in BATCH4.items():
    target_path = f"content/approved/{ch_name}.json"
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(q_list, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(q_list)} questions to {target_path}")

print("Batch 4 (Chapters 18-23) complete!")
