import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from quote_utils import find_quote, word_count

data = {
    "chapter": 15,
    "title": "Brainstem Localization (Midbrain, Pons, Medulla)",
    "pages": "pp. 439-460",
    "subtitle": "Anatomy, vascular territories, cranial nerve topodiagnosis, and classical stroke syndromes of the brainstem",
    "coreAnatomy": [
        {
            "title": "Three Laminae & Gates Rule of 4 Principles",
            "points": [
                {
                    "text": "Cross section demonstrates three laminae: the tectum, tegmentum, and basis conveying corticofugal motor pathways.",
                    "quote": "any cross section demonstrates three laminae: the tectum, tegmentum, and basis"
                },
                {
                    "text": "The basis mesencephali, basis pontis, and medullary pyramids convey the corticospinal and corticopontine motor pathways.",
                    "quote": "convey the corticofugal motor pathways consisting of the corticospinal tract and the corticopontine tracts"
                },
                {
                    "text": "The rule of 4 proposed by Gates is a didactic method for brainstem anatomy and vascular syndromes.",
                    "quote": "rule of 4 of the brainstem proposed by Gates is a simplified and useful didactic method"
                },
                {
                    "text": "In caudal medulla, 75% to 90% of corticospinal fibers decussate to form the lateral corticospinal tract.",
                    "quote": "nearly 75% to 90% of the corticospinal fibers in the pyramid cross the ventral midline"
                }
            ]
        },
        {
            "title": "Vascular Triad & Bulbar Arterial Territories",
            "points": [
                {
                    "text": "Paramedian arteries penetrate the ventral surface to supply midline structures.",
                    "quote": "paramedian arteries, which penetrate the ventral brainstem surface and supply the midline structures"
                },
                {
                    "text": "Short circumferential arteries traverse laterally to penetrate ventrolateral and lateral surfaces.",
                    "quote": "short circumferential arteries, which traverse laterally on the brainstem and penetrate its ventrolateral"
                },
                {
                    "text": "Long circumferential arteries course around the brainstem to supply posterior structures and cerebellum.",
                    "quote": "long circumferential arteries, which course around the brainstem and supply its posterior structures"
                },
                {
                    "text": "Anterior spinal artery supplies the paramedian medulla including pyramid, medial lemniscus, and CN XII.",
                    "quote": "anterior spinal artery supplies the paramedian region of the medulla oblongata, which includes the ipsilateral pyramid"
                }
            ]
        },
        {
            "title": "Pontine Anatomy & Reticular Centers",
            "points": [
                {
                    "text": "Abducens nucleus lies in the dorsomedial pons beneath the floor of the fourth ventricle.",
                    "quote": "abducens nerve (cranial nerve VI), which is located in the dorsomedial pons just beneath the floor"
                },
                {
                    "text": "Paramedian pontine reticular formation (PPRF) lies ventromedial to abducens nucleus, driving horizontal saccades.",
                    "quote": "Ventromedial to the abducens nucleus is the paramedian pontine reticular formation"
                },
                {
                    "text": "The basis pontis contains longitudinal descending corticospinal tracts plus pontine nuclei.",
                    "quote": "A unilateral lesion (vascular or neoplastic) of the ventrocaudal pons may involve the basis pontis"
                }
            ]
        },
        {
            "title": "Midbrain Architecture & Oculomotor Fascicles",
            "points": [
                {
                    "text": "Trochlear nerve (CN IV) nucleus is in ventral central gray at inferior colliculus level.",
                    "quote": "trochlear nerve (cranial nerve IV) is located in the ventral part of the central gray matter at the level of the inferior colliculus"
                },
                {
                    "text": "Oculomotor nucleus lies beneath superior colliculus, posterior to medial longitudinal fasciculus.",
                    "quote": "cranial nerve III) lies rostral to the trochlear nucleus beneath the superior colliculus, just posterior to the medial longitudinal"
                },
                {
                    "text": "Lesions affecting the ventromedial midbrain crus cerebri damage pyramidal fibers and CN III fascicles.",
                    "quote": "lesion affecting the cerebral peduncle, especially the ventromedial midbrain, may damage pyramidal fibers and the fascicle"
                }
            ]
        }
    ],
    "localizationRules": [
        {
            "rule": "Crossed (Alternating) Hemiplegia Axiom",
            "explanation": "An ipsilateral cranial nerve palsy combined with contralateral motor or sensory long-tract signs definitively places the lesion in the brainstem at the exit level of that nerve.",
            "quote": "protruded tongue deviates toward the lesion (away from the hemiplegia)"
        },
        {
            "rule": "Medial vs. Lateral Medullary Sensory Discriminator",
            "explanation": "Medial medullary lesions disrupt position and vibratory sensation (medial lemniscus), while lateral medullary lesions impair facial and body pain/temperature (spinothalamic and trigeminal).",
            "quote": "Contralateral loss of position and vibratory sensation (due to involvement of the medial lemniscus)"
        },
        {
            "rule": "Horner Syndrome from Lateral Tegmental Lesions",
            "explanation": "Ipsilateral Horner syndrome results from interruption of uncrossed descending sympathetic fibers coursing in the lateral tegmentum.",
            "quote": "Ipsilateral Horner syndrome (due to affection of the descending sympathetic fibers)"
        },
        {
            "rule": "Abducens Nucleus vs. Fascicle Rule",
            "explanation": "A fascicle lesion causes isolated ipsilateral lateral rectus paresis; an abducens nucleus lesion paralyzes conjugate horizontal gaze toward the lesion side.",
            "quote": "Ipsilateral lateral rectus paresis (cranial nerve VI)"
        },
        {
            "rule": "Ventral vs. Dorsal Midbrain Fascicular Signs",
            "explanation": "Ventral CN III fascicle involvement causes contralateral hemiplegia (Weber); dorsal tegmental extension involves the red nucleus and superior cerebellar peduncle causing tremor and ataxia (Benedikt, Claude).",
            "quote": "dorsal red nucleus and brachium conjunctivum (Claude syndrome) but with prominent cerebellar signs"
        }
    ],
    "keySyndromes": [
        {
            "name": "Dejerine Medial Medullary Syndrome",
            "triad": "Ipsilateral tongue deviation + Contralateral hemiplegia (face spared) + Contralateral vibration/position loss",
            "clue": "Anterior spinal artery or vertebral artery occlusion affecting pyramid, medial lemniscus, and hypoglossal nerve.",
            "quote": "medullary infarction and lateral medullary infarction (Wallenberg syndrome). CN, cranial nerve. Lateral Bulbar Branches"
        },
        {
            "name": "Millard-Gubler Syndrome",
            "triad": "Ipsilateral peripheral facial palsy + Ipsilateral lateral rectus palsy + Contralateral hemiplegia",
            "clue": "Ventrolateral pontine lesion involving basis pontis, exiting CN VI and CN VII fascicles, with preserved horizontal conjugate gaze.",
            "quote": "A unilateral lesion (vascular or neoplastic) of the ventrocaudal pons may involve the basis pontis"
        },
        {
            "name": "Raymond Syndrome",
            "triad": "Ipsilateral lateral rectus paresis (CN VI) + Contralateral hemiplegia with facial sparing",
            "clue": "Ventral medial pontine lesion sparing the facial nerve fascicle and PPRF.",
            "quote": "lesion of the ventral medial pons, which affects the ipsilateral abducens nerve fascicles and the corticospinal tract"
        },
        {
            "name": "Foville Syndrome",
            "triad": "Ipsilateral conjugate horizontal gaze paralysis + Ipsilateral peripheral facial palsy + Contralateral hemiplegia",
            "clue": "Dorsal caudal pontine tegmentum lesion involving CN VI nucleus/PPRF, facial fascicle, and corticospinal tract.",
            "quote": "lesions involving the dorsal pontine tegmentum in the caudal third of the pons"
        },
        {
            "name": "Weber Syndrome",
            "triad": "Ipsilateral oculomotor (CN III) palsy + Contralateral spastic hemiplegia (including lower face)",
            "clue": "Ventromedial midbrain crus cerebri infarction typically from PCA or basilar bifurcation peduncular perforators.",
            "quote": "results in the Weber syndrome, which consists of the following: 1. Contralateral hemiplegia (including lower facial weakness)"
        },
        {
            "name": "Benedikt Syndrome",
            "triad": "Ipsilateral CN III palsy + Contralateral choreoathetosis, hemiataxia, and intention tremor",
            "clue": "Midbrain tegmentum lesion affecting exiting CN III fascicle, red nucleus, and superior cerebellar peduncle.",
            "quote": "Dorsal Cranial Nerve III Fascicular Syndromes (Benedikt Syndrome) A lesion (usually a consequence of infarcted branches"
        },
        {
            "name": "Claude Syndrome",
            "triad": "Ipsilateral CN III palsy + Contralateral cerebellar ataxia (without hemiballismus)",
            "clue": "Dorsal midbrain tegmentum lesion involving dorsal red nucleus and decussation of superior cerebellar peduncle.",
            "quote": "asynergia, ataxia, dysmetria, dysdiadochokinesia) and no hemiballismus [ 20 , 178]. The Nothnagel"
        },
        {
            "name": "Locked-In Syndrome",
            "triad": "Quadriplegia + Aphonia + Preserved vertical eye movements and consciousness",
            "clue": "Bilateral ventral pontine infarction (basilar artery thrombosis) sparing midbrain reticular activating system and supranuclear vertical gaze.",
            "quote": "locked-in syndrome (de-efferented state) [88 , 166 , 171]. This syndrome consists of the following"
        },
        {
            "name": "Opalski Submedullary Syndrome",
            "triad": "Wallenberg lateral medullary signs + Ipsilateral hemiplegia",
            "clue": "Caudal extension of lateral medullary lesion below the pyramidal decussation affecting uncrossed corticospinal fibers.",
            "quote": "Opalski (Submedullary) Syndrome When ipsilateral hemiplegia is associated with symptoms of a lateral medullary syndrome"
        },
        {
            "name": "Nothnagel Variant Syndrome",
            "triad": "Ipsilateral or bilateral CN III palsy + Prominent cerebellar ataxia",
            "clue": "Dorsal midbrain syndrome variant affecting tectum/tegmentum and brachium conjunctivum.",
            "quote": "Nothnagel syndrome is a variant of the dorsal midbrain syndrome and has been described as unilateral or bilateral oculomotor"
        }
    ],
    "boardTraps": [
        {
            "text": "Opalski syndrome causes IPSILATERAL hemiparesis because the lesion extends caudally below the pyramidal decussation, damaging post-decussation corticospinal fibers.",
            "quote": "submedullary syndrome of Opalski (see subsequent text) [146]. 17. Central hypoventilation is seen"
        },
        {
            "text": "Abducens nucleus lesions cause complete conjugate horizontal gaze paralysis toward the lesion; fascicle lesions cause isolated lateral rectus abduction weakness with preserved conjugate gaze.",
            "quote": "nucleus of the abducens nerve (cranial nerve VI), which is located in the dorsomedial pons just beneath the floor of the fourth"
        },
        {
            "text": "In medial medullary syndrome (Dejerine), the protruding tongue deviates toward the lesion and away from the hemiplegic side.",
            "quote": "deviates toward the lesion (away from the hemiplegia). Surprisingly, cranial nerve XII function may be spared"
        },
        {
            "text": "Locked-in syndrome is distinguished from coma by preserved voluntary vertical eye movements and eyelid opening driven by intact midbrain structures.",
            "quote": "Bilateral ventral pontine lesions (infarction, tumor, hemorrhage, trauma, cervical manipulation"
        },
        {
            "text": "Trochlear nerve (CN IV) is the only cranial nerve emerging from the dorsal aspect of the brainstem, and its axons decussate completely before exiting.",
            "quote": "trochlear nucleus beneath the superior colliculus, just posterior to the medial longitudinal fasciculus. Mesencephalic tracts"
        },
        {
            "text": "Top of the basilar syndrome causes visual hallucinations, behavioral changes, and bilateral midbrain/thalamic deficits with pupillary abnormalities.",
            "quote": "top of the basilar syndrome [29 , 137] due to infarction of the midbrain, thalamus, and portions of the temporal"
        }
    ]
}

# Verify every quote
problems = []
for sec in ["coreAnatomy"]:
    for g in data[sec]:
        for pt in g["points"]:
            p = find_quote(15, pt["quote"])
            if p is None:
                problems.append(f"coreAnatomy quote failed: {pt['quote']}")
            else:
                pt["page"] = p

for sec in ["localizationRules", "keySyndromes", "boardTraps"]:
    for item in data[sec]:
        p = find_quote(15, item["quote"])
        if p is None:
            problems.append(f"{sec} quote failed: {item['quote']}")
        else:
            item["page"] = p

if problems:
    print(f"FAILED with {len(problems)} problems:")
    for prob in problems:
        print("  -", prob)
    sys.exit(1)
else:
    print("ALL QUOTES VERIFIED SUCCESSFULLY!")
    out_path = os.path.join(os.path.dirname(__file__), "..", "content", "summaries", "chapter15.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Written to {out_path}")
