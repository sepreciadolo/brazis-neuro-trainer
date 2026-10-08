# Possible errors in the book text (found by the AI; NOT changed anywhere)

These are statements in the extracted Brazis text that look inconsistent with other passages of the same book or with
standard teaching. The app never uses them as teaching points. Check them against the printed book (`/source`) before
deciding anything: the extraction could also have misread a word.

| Chapter / page | What the text says | Why it looks wrong | Status |
|---|---|---|---|
| Ch. 7, p. 171 (Lateral geniculate paragraph) | "Upper field fibers originate in the medial aspect of lateral geniculate nucleus and travel through the parietal lobes, whereas lower field fibers ... make a loop in the temporal lobe (Meyer loop)." | Contradicts p. 157 (the lower bundle, from the lower retina, loops around the temporal horn as Meyer loop) and p. 172 (Meyer loop lesions give a superior quadrantanopia, "pie-in-the-sky"). The Meyer loop carries the UPPER visual field, so "upper" and "lower" look swapped on p. 171. | Confirmed as an internal contradiction in the extracted text; check the printed page. |
| Ch. 19, pp. 529-530 (basal ganglia pathways) | Direct pathway written as cortex-striatum-GPE-thalamus-motor cortex; indirect pathway as cortex-striatum-GPI-STN-GPE-thalamus-cortex; dopamine "excites" for D1 and "inhibits" for D2; direct labelled excitatory, indirect inhibitory. | The usual circuit has the direct pathway through GPi and the indirect through GPe-STN-GPi, so GPE/GPI look swapped. | Reported by the AI that wrote the chapter 19 digest; the digest quotes only one safe sentence. Check the printed page. |
| Ch. 22, p. 665 | "Precommunal" | Probable typo for "precommunicating". | Cosmetic. |
| Ch. 23, p. 697 | "Ping-gong gaze" | Typo for "ping-pong". | Cosmetic. |
| Ch. 22 p. 668 vs Ch. 23 p. 700 | Ch. 22: bilateral ACA-MCA border zone ischemia gives bibrachial impairment often confined to the forearms and hands. Ch. 23 uses "man-in-the-barrel" for bilateral arm weakness from anoxic border-zone lesions with relatively spared legs. | Usual teaching describes proximal arm weakness; the book's wording in Ch. 22 stresses forearms and hands. Not necessarily contradictory. | Questions ch22-002 and ch22-006 were discarded for this reason (see `discard_log.md`). |
| Ch. 10, p. 374 vs p. 379 | p. 374: cerebellopontine angle lesions give peripheral facial paralysis "without hyperacusis". p. 379: lesions in the same region may give impaired taste, hyperacusis, hearing loss and vestibular symptoms. | Internal inconsistency about hyperacusis. The digest follows p. 374. | Reported by the chapter 10-12 digest agent. |
| Ch. 11, p. 397 | "Even if bilateral, lesions of the auditory cortex do not cause complete deafness", yet the same page says bilateral auditory cortical lesions "may result in cortical deafness". | Internal inconsistency. | Not used in the digest. |
| Ch. 11, p. 402 | "A normal HIT is a useful bedside test to identify a peripheral vestibular deficit." | Looks inverted: an abnormal head impulse test indicates a peripheral deficit. | Not used in the digest. |
| Ch. 11, pp. 399-400 | BPPV nystagmus called "upbeat geotropic" on p. 399 and "torsional, geotropic" on p. 400; two list items both labelled "(d)". | Wording inconsistencies. | Not used in the digest. |
| Ch. 18, p. 509 | "Thalamic hemorrhage is discussed in Chapter 21." | Chapter 21 (autonomic nervous system) has no thalamic hemorrhage section; cross-reference looks wrong. | Reported by the digest agent. |
| Ch. 21, p. 646 | Frey syndrome: "sweating and flashing of the temporal and retroauricular area". | "Flashing" is probably "flushing". | Cosmetic. |
| Ch. 18, pp. 508 and 514 | Hemiataxia-hypesthesia syndrome: "isolated hemiataxia and ipsilateral sensory loss" while nearby text says the cerebellar and sensory deficits are contralateral to the lesion. | Ambiguous side wording. | Not used in the digest. |
| Ch. 18, p. 507 vs pp. 510-511 | Persistent memory loss "only" with dominant anterior nucleus or mammillothalamic tract damage; pp. 510-511 describe permanent amnesia after bilateral anterior thalamic infarcts. | The word "only" is loose. | Not used in the digest. |
| Ch. 16, p. 463 | "All afferent projections from these nuclei are excitatory, except those to the inferior olive." | Probably "efferent". | Reported by the digest agent. |
| Ch. 16, p. 466 | Under SCA-10: "In Brazil, the SCA-2 phenotype is that of pure cerebellar ataxia." | Probably a typo for SCA-10. | Reported. |
| Ch. 16, p. 471 | "paralysis or upward gaze" | Probably "paralysis of upward gaze". | Cosmetic. |
| Ch. 13, p. 422 | Collet-Sicard case cited as ref 42 (Hsu); ictal head-deviation study is ref 44; ref 42 also cited for head-turning mechanics. | Reference numbering looks mixed up. | Cosmetic. |
| Ch. 14, pp. 430-431 | Cross-references "Video 9-1" and "Video 10-2". | Do not match the chapter's own numbering. | Cosmetic. |
| Ch. 13 vs Ch. 14 | Collet-Sicard described as a skull-base lesion in both; Table 13-1 says "usually" retroparotid space. | Location stated differently. | Not used in the digests. |
| Ch. 7, p. 165 vs p. 166 | p. 165: monocular altitudinal defects "are often accompanied by macular sparing" in central retinal artery disease. p. 166: "only altitudinal defects due to occipital infarcts spare macular vision." | Two statements conflict. | Not used in the digest. |
| Ch. 6, Table 6-1 footnote (p. 146) | Expands "REM" as "range of motion". | Should be rapid eye movement. | Cosmetic. |
| Ch. 9, p. 363 | The sentence on etiologies of Raeder paratrigeminal syndrome (tumor, aneurysm, trauma, infection, e.g. Lyme disease) appears twice in a row. | Probable editing leftover. | Cosmetic. |
| Ch. 8, Table 8-27 (p. 291) vs p. 289 | Table: "Ipsilateral downbeat nystagmus and contralateral incyclorotatory nystagmus" in INO. | The body text on p. 289 does not say the downbeat component is ipsilateral. | Not used in the digest. |
| Ch. 1 Table 1-2 (p. 18) vs Ch. 4 (p. 101) | Ch. 1: touch loss may extend over a larger territory than pain/temperature loss (dorsal root row). Ch. 4: with multiple dorsal root lesions the area of analgesia is larger than the area of anesthesia to light touch. | The two statements point in opposite directions. | Reported by the digest agent; not used. |
| Ch. 4, p. 107 | Tensor fasciae latae action given as "adduction and internal rotation of thigh". | It is normally an abductor; Ch. 3 (p. 95) says "abduction and internal rotation" for the superior gluteal nerve. | Reported; not used. |
| Ch. 1, p. 13 | Brown-Sequard grouped under "extramedullary spinal cord lesion" as a cause of single-limb weakness. | Hemicord syndrome is usually described as intrinsic; extramedullary compression can also cause it. | Reported; not used. |
| Ch. 4, p. 108 | Cross straight-leg raising "sensitivity 29% and specificity 88%" while the plain test is said to have low specificity (about 0.4). | Numbers may be reversed; cannot be confirmed from the text. | Reported; not used. |
| Ch. 4, Table 4-2 (p. 109) | Vascular claudication relief "Prompt (15-16 seconds)". | Probable typo. | Cosmetic. |
| Ch. 3, p. 83 | Geniohyoid listed among infrahyoid muscles supplied by the ansa cervicalis. | Anatomy not checked; geniohyoid is usually supplied by C1 via XII. | Reported; not used. |
| Ch. 2, p. 48 | Ulnar lesions in the forearm: flexor digitorum profundus "I and II" often spared. | The ulnar part of FDP is III and IV (as the chapter says on pp. 46 and 48). Probable typo. | Reported; not used. |
| Ch. 2, p. 52 vs p. 31 | Radial lesion in the axilla: finger abduction weak "because the dorsal interossei require wrist flexion". | p. 31 says interossei look weak because the wrist cannot be fixed; "flexion" may be a slip. | Digest uses the p. 31 wording. |
| Ch. 2, pp. 50 and 54 | Superficial radial nerve supplies the "dorsum of the first four fingers" (p. 50) vs "first three-and-a-half fingers" (p. 54). | Inconsistent. | Reported; not used. |
| Ch. 2, p. 57 | Femoral nerve arises from the "posterior rami" of L2-L4. | Probably the posterior divisions of the anterior rami. | Reported; not used. |
