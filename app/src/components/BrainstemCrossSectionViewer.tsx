import { useState, useEffect } from 'react'
import { AssetBadge } from './StatusBadge'

// GitHub Pages serves the app from a repo subpath, not the domain root.
const BASE = import.meta.env.BASE_URL

export type BrainstemLevel = 'medulla' | 'pons' | 'midbrain'
export type ViewMode = 'plates' | 'simulator'
export type OverlayMode = 'structures' | 'vascular' | 'syndromes'

interface AnatomicalStructure {
  id: string
  name: string
  function: string
  deficit: string
  bloodSupply: string
  zone: 'Medial (Paramedian)' | 'Lateral (Circumferential)' | 'Dorsal (Tegmental)'
}

interface SyndromeOverlay {
  id: string
  name: string
  eponym: string
  vessel: string
  structuresInvolved: string[]
  triad: string
  keyDifferentiator: string
  brazisReference: string
}

interface VascularTerritory {
  id: string
  name: string
  vessel: string
  color: string
  lightColor: string
  structures: string[]
  description: string
}

interface BookPlateInfo {
  id: string
  image: string
  figNum: string
  title: string
  caption: string
  printPage: string
  /** Natural pixel size of the image; hotspots are % of the image itself. */
  width: number
  height: number
}

export const MEDULLA_STRUCTURES: Record<string, AnatomicalStructure> = {
  pyramid: {
    id: 'pyramid',
    name: 'Medullary Pyramid (Corticospinal Tract)',
    function: 'Carries descending voluntary motor fibers to contralateral limbs.',
    deficit: 'Contralateral hemiplegia sparing the face (facial fibers already exited above).',
    bloodSupply: 'Anterior spinal artery (ASA) / Paramedian branches of vertebral artery',
    zone: 'Medial (Paramedian)'
  },
  medial_lemniscus: {
    id: 'medial_lemniscus',
    name: 'Medial Lemniscus',
    function: 'Ascending crossed second-order sensory fibers for vibration, proprioception, and discriminative touch.',
    deficit: 'Contralateral loss of vibration and joint position sense (sparing pain and temperature).',
    bloodSupply: 'Anterior spinal artery / Paramedian bulbar branches',
    zone: 'Medial (Paramedian)'
  },
  cn12: {
    id: 'cn12',
    name: 'Hypoglossal Nucleus & Exiting Nerve (CN XII)',
    function: 'Lower motor neuron innervation to all intrinsic and most extrinsic tongue muscles.',
    deficit: 'Ipsilateral tongue weakness, hemiatrophy, and fasciculations; tongue protrudes toward the side of the lesion.',
    bloodSupply: 'Anterior spinal artery',
    zone: 'Medial (Paramedian)'
  },
  nucleus_ambiguus: {
    id: 'nucleus_ambiguus',
    name: 'Nucleus Ambiguus (Motor CN IX, X, XI)',
    function: 'Special visceral efferent branchiomeric motor neurons to palate, pharynx, larynx, and vocal cords.',
    deficit: 'Ipsilateral palatal weakness (uvula deviates to opposite side), absent gag reflex, hoarseness, and dysphagia.',
    bloodSupply: 'Posterior inferior cerebellar artery (PICA)',
    zone: 'Lateral (Circumferential)'
  },
  spinal_trigeminal: {
    id: 'spinal_trigeminal',
    name: 'Spinal Trigeminal Tract & Nucleus (CN V)',
    function: 'Descending primary pain and temperature afferents from the ipsilateral face.',
    deficit: 'Ipsilateral facial loss of pain and temperature sensation (crossed sensory pattern).',
    bloodSupply: 'Posterior inferior cerebellar artery (PICA)',
    zone: 'Lateral (Circumferential)'
  },
  spinothalamic: {
    id: 'spinothalamic',
    name: 'Spinothalamic Tract (Anterolateral System)',
    function: 'Ascending second-order pain and temperature pathway from contralateral trunk and limbs.',
    deficit: 'Contralateral loss of pain and temperature sensation on trunk and extremities.',
    bloodSupply: 'PICA / Lateral bulbar branches of vertebral artery',
    zone: 'Lateral (Circumferential)'
  },
  inferior_olive: {
    id: 'inferior_olive',
    name: 'Inferior Olivary Nucleus (Ribbon / Complex)',
    function: 'Source of climbing fibers to the contralateral cerebellar cortex; coordinates motor learning and timing.',
    deficit: 'Palatal myoclonus (when dentatorubral-olivary tract disrupted); ataxia.',
    bloodSupply: 'PICA & Anterior spinal artery',
    zone: 'Lateral (Circumferential)'
  },
  restiform_body: {
    id: 'restiform_body',
    name: 'Inferior Cerebellar Peduncle (Restiform Body)',
    function: 'Carries dorsal spinocerebellar and olivocerebellar fibers into the cerebellum.',
    deficit: 'Ipsilateral limb ataxia, dysmetria, dysdiadochokinesia, and ocular ipsipulsion.',
    bloodSupply: 'Posterior inferior cerebellar artery (PICA)',
    zone: 'Lateral (Circumferential)'
  },
  sympathetic: {
    id: 'sympathetic',
    name: 'Descending Hypothalamospinal Sympathetic Tract',
    function: 'Uncrossed descending autonomic pathway to the ciliospinal center of Budge (T1–T2).',
    deficit: 'Ipsilateral Horner syndrome (partial ptosis, miosis, facial anhidrosis).',
    bloodSupply: 'Posterior inferior cerebellar artery (PICA)',
    zone: 'Lateral (Circumferential)'
  },
  vestibular: {
    id: 'vestibular',
    name: 'Vestibular Nuclei (Medial & Inferior)',
    function: 'Coordinates balance, vestibulo-ocular reflexes, and spatial equilibrium.',
    deficit: 'Acute rotational vertigo, intractable nausea, horizontal-torsional nystagmus, and skew deviation.',
    bloodSupply: 'PICA',
    zone: 'Dorsal (Tegmental)'
  }
}

export const PONS_STRUCTURES: Record<string, AnatomicalStructure> = {
  basis_corticospinal: {
    id: 'basis_corticospinal',
    name: 'Basis Pontis (Corticospinal Bundles)',
    function: 'Descending pyramidal motor fascicles interdigitating between transverse fibers and pontine nuclei.',
    deficit: 'Contralateral hemiplegia; dysarthria-clumsy hand syndrome or ataxic hemiparesis in smaller lacunar infarcts.',
    bloodSupply: 'Paramedian branches of the basilar artery',
    zone: 'Medial (Paramedian)'
  },
  cn6_nucleus: {
    id: 'cn6_nucleus',
    name: 'Abducens Nucleus & PPRF (Horizontal Gaze Center)',
    function: 'Coordinates lateral rectus with contralateral medial rectus via MLF for horizontal conjugate gaze.',
    deficit: 'Ipsilateral conjugate horizontal gaze paralysis (neither eye moves toward the side of the lesion).',
    bloodSupply: 'Circumferential branches of basilar artery',
    zone: 'Medial (Paramedian)'
  },
  cn6_fascicle: {
    id: 'cn6_fascicle',
    name: 'Abducens Nerve Fascicle (CN VI)',
    function: 'Exiting motor axons supplying the ipsilateral lateral rectus muscle.',
    deficit: 'Isolated ipsilateral lateral rectus palsy; horizontal diplopia worse on looking toward lesion.',
    bloodSupply: 'Paramedian branches of the basilar artery',
    zone: 'Medial (Paramedian)'
  },
  cn7_nucleus_genu: {
    id: 'cn7_nucleus_genu',
    name: 'Facial Nucleus & Internal Genu (CN VII)',
    function: 'Motor neurons to ipsilateral facial expression muscles; fibers loop dorsally around the abducens nucleus.',
    deficit: 'Complete ipsilateral peripheral facial paralysis (both upper and lower face).',
    bloodSupply: 'AICA / Circumferential pontine branches',
    zone: 'Lateral (Circumferential)'
  },
  mlf: {
    id: 'mlf',
    name: 'Medial Longitudinal Fasciculus (MLF)',
    function: 'Internuclear pathway linking abducens nucleus to contralateral oculomotor subnucleus for conjugate gaze.',
    deficit: 'Internuclear Ophthalmoplegia (INO): ipsilateral adduction failure with contralateral abducting nystagmus.',
    bloodSupply: 'Paramedian branches of basilar artery',
    zone: 'Medial (Paramedian)'
  },
  medial_lemniscus_pons: {
    id: 'medial_lemniscus_pons',
    name: 'Medial Lemniscus (Pontine Band)',
    function: 'Crossed proprioception and vibration fibers flattened horizontally across the tegmental boundary.',
    deficit: 'Contralateral loss of vibration and joint position sense.',
    bloodSupply: 'Paramedian & short circumferential basilar branches',
    zone: 'Medial (Paramedian)'
  },
  brachium_pontis: {
    id: 'brachium_pontis',
    name: 'Middle Cerebellar Peduncle (Brachium Pontis)',
    function: 'Massive input bridge carrying pontocerebellar fibers from the contralateral cerebral cortex.',
    deficit: 'Severe ipsilateral kinetic cerebellar ataxia and gait unsteadiness.',
    bloodSupply: 'Anterior inferior cerebellar artery (AICA)',
    zone: 'Lateral (Circumferential)'
  },
  spinothalamic_pons: {
    id: 'spinothalamic_pons',
    name: 'Spinothalamic Tract (Anterolateral System)',
    function: 'Ascending pain and temperature pathway located laterally in the pontine tegmentum.',
    deficit: 'Contralateral loss of pain and temperature on trunk and limbs.',
    bloodSupply: 'AICA / Circumferential basilar branches',
    zone: 'Lateral (Circumferential)'
  }
}

export const MIDBRAIN_STRUCTURES: Record<string, AnatomicalStructure> = {
  crus_cerebri: {
    id: 'crus_cerebri',
    name: 'Crus Cerebri (Cerebral Peduncle / CST)',
    function: 'Descending corticospinal and corticobulbar motor fibers in the middle three-fifths of the peduncle.',
    deficit: 'Contralateral spastic hemiplegia, including contralateral lower facial weakness.',
    bloodSupply: 'Peduncular perforators of Posterior Cerebral Artery (PCA) & Basilar bifurcation',
    zone: 'Medial (Paramedian)'
  },
  substantia_nigra: {
    id: 'substantia_nigra',
    name: 'Substantia Nigra (Pars Compacta & Reticulata)',
    function: 'Dopaminergic projection to striatum regulating motor planning, initiation, and muscle tone.',
    deficit: 'Contralateral rigidity, resting tremor, hypokinesia, or involuntary movements.',
    bloodSupply: 'Peduncular arteries (paramedian branches of the PCA origin)',
    zone: 'Medial (Paramedian)'
  },
  red_nucleus: {
    id: 'red_nucleus',
    name: 'Red Nucleus (Rubrospinal / Rubro-olivary)',
    function: 'Coordinates upper limb flexion and relays cerebellar output to the thalamus and olive.',
    deficit: 'Contralateral hemiataxia with intention tremor (Benedikt); rubral/Holmes tremor.',
    bloodSupply: 'Peduncular arteries (paramedian branches of the PCA origin); not the thalamoperforating arteries, which supply the thalamus',
    zone: 'Dorsal (Tegmental)'
  },
  cn3_complex: {
    id: 'cn3_complex',
    name: 'Oculomotor Nucleus & Exiting Fascicles (CN III)',
    function: 'Supplies levator palpebrae, pupillary sphincter, and extraocular muscles (SR, MR, IR, IO).',
    deficit: 'Ipsilateral third nerve palsy: ptosis, dilated unreactive pupil (mydriasis), and eye turned "down-and-out".',
    bloodSupply: 'Paramedian mesencephalic branches of PCA and basilar tip',
    zone: 'Medial (Paramedian)'
  },
  superior_colliculus: {
    id: 'superior_colliculus',
    name: 'Superior Colliculus & Pretectal Area',
    function: 'Rostral tectal center for conjugate vertical gaze reflexes, saccades, and pupillary light reflexes.',
    deficit: 'Parinaud syndrome: supranuclear upward gaze palsy, light-near pupillary dissociation, Collier sign.',
    bloodSupply: 'Quadrigeminal and posterior choroidal arteries (PCA)',
    zone: 'Dorsal (Tegmental)'
  },
  medial_lemniscus_midbrain: {
    id: 'medial_lemniscus_midbrain',
    name: 'Medial Lemniscus & Spinothalamic Tract',
    function: 'Ascending sensory tracts positioned ventrolateral to the red nucleus.',
    deficit: 'Contralateral hemianesthesia involving all sensory modalities across the face and body.',
    bloodSupply: 'Posterior cerebral artery (PCA) branches',
    zone: 'Lateral (Circumferential)'
  },
  cerebral_aqueduct: {
    id: 'cerebral_aqueduct',
    name: 'Cerebral Aqueduct of Sylvius & PAG',
    function: 'Connects third and fourth ventricles; surrounded by periaqueductal gray for pain modulation.',
    deficit: 'Aqueductal stenosis produces obstructive hydrocephalus and downward pressure on tectum.',
    bloodSupply: 'Paramedian mesencephalic perforators',
    zone: 'Dorsal (Tegmental)'
  }
}

export const SYNDROMES_BY_LEVEL: Record<BrainstemLevel, SyndromeOverlay[]> = {
  medulla: [
    {
      id: 'wallenberg',
      name: 'Lateral Medullary Syndrome',
      eponym: 'Wallenberg Syndrome',
      vessel: 'Posterior Inferior Cerebellar Artery (PICA) / Vertebral Artery (V4)',
      structuresInvolved: ['nucleus_ambiguus', 'spinal_trigeminal', 'spinothalamic', 'restiform_body', 'sympathetic', 'vestibular'],
      triad: 'Crossed analgesia (ipsilateral face + contralateral body) + Ipsilateral Horner syndrome + Dysphagia/hoarseness + Ataxia/vertigo',
      keyDifferentiator: 'Motor power is preserved (pyramids spared). Characteristic crossed thermoanalgesia with hoarseness and intractable hiccups.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 443–446, Figure 15-3'
    },
    {
      id: 'dejerine',
      name: 'Medial Medullary Syndrome',
      eponym: 'Dejerine (Anterior Bulbar) Syndrome',
      vessel: 'Anterior Spinal Artery (ASA) / Paramedian Vertebral branches',
      structuresInvolved: ['pyramid', 'medial_lemniscus', 'cn12'],
      triad: 'Ipsilateral tongue atrophy & deviation + Contralateral spastic hemiplegia (face spared) + Contralateral vibration/proprioception loss',
      keyDifferentiator: 'The tongue deviates toward the lesion; hemiplegia and sensory loss are contralateral. Pain and temperature are completely spared.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 441–443, Figure 15-3'
    },
    {
      id: 'opalski',
      name: 'Sub-Bulbar Syndrome',
      eponym: 'Opalski Syndrome',
      vessel: 'Vertebral Artery distal branch below PICA',
      structuresInvolved: ['nucleus_ambiguus', 'spinal_trigeminal', 'spinothalamic', 'sympathetic', 'pyramid'],
      triad: 'Full Wallenberg syndrome features PLUS Ipsilateral spastic hemiparesis',
      keyDifferentiator: 'Lesion extends caudally to involve the post-decussation corticospinal tract, causing ipsilateral limb weakness.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 446'
    }
  ],
  pons: [
    {
      id: 'millard_gubler',
      name: 'Ventral Pontine Syndrome',
      eponym: 'Millard-Gubler Syndrome',
      vessel: 'Circumferential & Paramedian branches of Basilar Artery',
      structuresInvolved: ['basis_corticospinal', 'cn6_fascicle', 'cn7_nucleus_genu'],
      triad: 'Ipsilateral peripheral CN VII palsy + Ipsilateral CN VI lateral rectus palsy + Contralateral hemiplegia',
      keyDifferentiator: 'Peripheral facial palsy (forehead involved) with isolated lateral rectus palsy; horizontal conjugate gaze is preserved.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 449–450, Figure 15-4'
    },
    {
      id: 'foville',
      name: 'Inferior Pontine Tegmental Syndrome',
      eponym: 'Foville Syndrome',
      vessel: 'Circumferential branches of Basilar Artery',
      structuresInvolved: ['basis_corticospinal', 'cn6_nucleus', 'cn7_nucleus_genu'],
      triad: 'Ipsilateral conjugate horizontal gaze palsy + Ipsilateral peripheral CN VII palsy + Contralateral hemiplegia',
      keyDifferentiator: 'Involves the CN VI nucleus/PPRF, producing conjugate gaze palsy (neither eye moves toward lesion), not isolated VI nerve palsy.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 450'
    },
    {
      id: 'raymond',
      name: 'Ventral Paramedian Pontine Syndrome',
      eponym: 'Raymond Syndrome',
      vessel: 'Paramedian branches of Basilar Artery',
      structuresInvolved: ['basis_corticospinal', 'cn6_fascicle'],
      triad: 'Ipsilateral CN VI lateral rectus palsy + Contralateral hemiplegia (with central lower facial paresis)',
      keyDifferentiator: 'Sparing of CN VII nucleus; facial weakness is central (contralateral, forehead spared) due to corticobulbar tract involvement.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 450'
    }
  ],
  midbrain: [
    {
      id: 'weber',
      name: 'Ventral Mesencephalic Syndrome',
      eponym: 'Weber Syndrome',
      vessel: 'Peduncular perforators of Posterior Cerebral Artery (PCA)',
      structuresInvolved: ['crus_cerebri', 'cn3_complex'],
      triad: 'Ipsilateral CN III palsy (ptosis, mydriasis, down-and-out) + Contralateral spastic hemiplegia (including lower face)',
      keyDifferentiator: 'Ventral lesion (cerebral peduncle): pyramidal weakness with third nerve palsy, without the tegmental red nucleus / brachium conjunctivum signs of Benedikt and Claude.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 452, Figure 15-6'
    },
    {
      id: 'benedikt',
      name: 'Tegmental Mesencephalic Syndrome',
      eponym: 'Benedikt Syndrome',
      vessel: 'PCA branches (red nucleus: peduncular arteries)',
      structuresInvolved: ['cn3_complex', 'red_nucleus', 'substantia_nigra', 'crus_cerebri'],
      triad: 'Ipsilateral CN III palsy + Contralateral hemiataxia with intention tremor (red nucleus) + Contralateral hemiparesis with hyperactive reflexes',
      keyDifferentiator: 'Ventral tegmental lesion damaging the red nucleus (and, in larger lesions, the substantia nigra region): contralateral intention tremor; Ch. 8 (p. 214) also lists choreiform movements.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 453, Figure 15-6; Chapter 8, Page 214'
    },
    {
      id: 'claude',
      name: 'Dorsal Tegmental Cerebellar Syndrome',
      eponym: 'Claude Syndrome',
      vessel: 'Unspecified (Brazis names no vessel for Claude syndrome)',
      structuresInvolved: ['cn3_complex', 'red_nucleus'],
      triad: 'Ipsilateral CN III palsy + Contralateral cerebellar signs (asynergia, ataxia, dysmetria, dysdiadochokinesia); outflow-tract cerebellar tremor (Ch. 8)',
      keyDifferentiator: 'More dorsal tegmental lesion (dorsal red nucleus and brachium conjunctivum): prominent cerebellar signs and no hemiballismus.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 453, Figure 15-6; Chapter 8, Page 214'
    },
    {
      id: 'parinaud',
      name: 'Dorsal Midbrain / Pretectal Syndrome',
      eponym: 'Parinaud (Sylvian Aqueduct) Syndrome',
      vessel: 'Pineal region mass / Quadrigeminal artery ischemia / Hydrocephalus',
      structuresInvolved: ['superior_colliculus', 'cerebral_aqueduct'],
      triad: 'Supranuclear upward gaze palsy + Light-near pupillary dissociation + Convergence-retraction nystagmus',
      keyDifferentiator: 'Tectal pretectal pathology with Collier lid retraction; vertical gaze deficit rather than third nerve fascicle paralysis.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 453'
    }
  ]
}

export const VASCULAR_MAP: Record<BrainstemLevel, VascularTerritory[]> = {
  medulla: [
    {
      id: 'asa',
      name: 'Anterior Spinal Artery (ASA)',
      vessel: 'Paramedian Branches of ASA & Vertebral Artery',
      color: '#ef4444',
      lightColor: '#f87171',
      structures: ['pyramid', 'medial_lemniscus', 'cn12'],
      description: 'Perfuses the medial paramedian wedge: medullary pyramids, medial lemniscus, and hypoglossal nucleus/nerve.'
    },
    {
      id: 'pica',
      name: 'Posterior Inferior Cerebellar Artery (PICA)',
      vessel: 'PICA & Lateral Bulbar Branches of Vertebral Artery (V4)',
      color: '#d97706',
      lightColor: '#fbbf24',
      structures: ['nucleus_ambiguus', 'spinal_trigeminal', 'spinothalamic', 'restiform_body', 'sympathetic', 'vestibular', 'inferior_olive'],
      description: 'Perfuses the lateral bulbar territory: nucleus ambiguus, spinal V, spinothalamic tract, restiform body, and sympathetic fibers.'
    }
  ],
  pons: [
    {
      id: 'basilar_paramedian',
      name: 'Basilar Paramedian Branches',
      vessel: 'Short penetrating paramedian branches of the Basilar Artery',
      color: '#3b82f6',
      lightColor: '#60a5fa',
      structures: ['basis_corticospinal', 'cn6_nucleus', 'cn6_fascicle', 'mlf', 'medial_lemniscus_pons'],
      description: 'Supplies the basis pontis (pyramidal bundles), abducens nucleus, exiting VI nerve, and medial longitudinal fasciculus.'
    },
    {
      id: 'aica',
      name: 'Anterior Inferior Cerebellar Artery (AICA)',
      vessel: 'Circumferential branches of Basilar & AICA',
      color: '#06b6d4',
      lightColor: '#22d3ee',
      structures: ['cn7_nucleus_genu', 'brachium_pontis', 'spinothalamic_pons'],
      description: 'Supplies the lateral caudal tegmentum, facial motor nucleus and internal genu, and middle cerebellar peduncle.'
    }
  ],
  midbrain: [
    {
      id: 'pca_peduncular',
      name: 'Peduncular Arteries (paramedian)',
      vessel: 'Retromamillary trunk arising at the origins of the Posterior Cerebral Arteries',
      color: '#f59e0b',
      lightColor: '#fbbf24',
      structures: ['crus_cerebri', 'cn3_complex', 'red_nucleus', 'substantia_nigra'],
      description: 'Supplies the medial peduncles and the midbrain tegmentum, including the oculomotor nucleus, red nucleus, and substantia nigra. (The thalamoperforating arteries of the same trunk supply the thalamus.)'
    },
    {
      id: 'quadrigeminal',
      name: 'Quadrigeminal Arteries (circumferential)',
      vessel: 'Posterior Cerebral Artery',
      color: '#10b981',
      lightColor: '#34d399',
      structures: ['superior_colliculus'],
      description: 'Supply the superior and inferior colliculi. Brazis does not assign the medial lemniscus, spinothalamic tract, or periaqueductal gray to a specific artery in this section.'
    }
  ]
}

interface PlateHotspot {
  structureId: string
  label: string
  x: number // percentage from left
  y: number // percentage from top
  zone: string
  deficitTeaser: string
}

export const PLATE_HOTSPOTS: Record<string, PlateHotspot[]> = {
  'fig15-2': [
    {
      structureId: 'cn12',
      label: 'Hypoglossal Nucleus (CN XII)',
      x: 35.1,
      y: 39.8,
      zone: 'Paramedian Dorsal',
      deficitTeaser: 'Ipsilateral tongue deviation on protrusion'
    },
    {
      structureId: 'medial_lemniscus',
      label: 'Medial Lemniscus',
      x: 35.1,
      y: 59.9,
      zone: 'Paramedian Tegmental',
      deficitTeaser: 'Contralateral loss of vibration & proprioception'
    },
    {
      structureId: 'pyramid',
      label: 'Medullary Pyramid (CST)',
      x: 33.2,
      y: 80.9,
      zone: 'Paramedian Ventral',
      deficitTeaser: 'Contralateral spastic hemiplegia'
    },
    {
      structureId: 'inferior_olive',
      label: 'Inferior Olivary Nucleus',
      x: 45.9,
      y: 68.6,
      zone: 'Lateral Bulbar',
      deficitTeaser: 'Palatal myoclonus & cerebellar ataxia'
    },
    {
      structureId: 'nucleus_ambiguus',
      label: 'Nucleus Ambiguus (IX & X)',
      x: 29.4,
      y: 52.4,
      zone: 'Lateral Tegmentum',
      deficitTeaser: 'Dysphagia, dysarthria, hoarseness, absent gag reflex'
    },
    {
      structureId: 'spinal_trigeminal',
      label: 'Spinal Trigeminal Tract & Nucleus (V)',
      x: 46.8,
      y: 44.7,
      zone: 'Lateral Circumferential',
      deficitTeaser: 'Ipsilateral facial analgesia & loss of corneal reflex'
    },
    {
      structureId: 'restiform_body',
      label: 'Inferior Cerebellar Peduncle (Restiform Body)',
      x: 48.0,
      y: 37.2,
      zone: 'Dorsolateral',
      deficitTeaser: 'Ipsilateral limb ataxia, dysmetria, ocular ipsipulsion'
    },
    {
      structureId: 'vestibular',
      label: 'Vestibular Nuclei (Medial & Inferior)',
      x: 29.4,
      y: 30.1,
      zone: 'Dorsal Floor IV Ventricle',
      deficitTeaser: 'Vertigo, skew deviation, horizontal-rotary nystagmus'
    }
  ],
  'fig15-3': [
    {
      structureId: 'pyramid',
      label: 'Pyramid (Dejerine Paramedian Zone)',
      x: 48.8,
      y: 81.3,
      zone: 'Medial Territory (ASA)',
      deficitTeaser: 'Contralateral hemiplegia (Dejerine syndrome)'
    },
    {
      structureId: 'medial_lemniscus',
      label: 'Medial Lemniscus (Dejerine Zone)',
      x: 46.1,
      y: 48.4,
      zone: 'Medial Territory (ASA)',
      deficitTeaser: 'Contralateral dorsal column sensory loss'
    },
    {
      structureId: 'cn12',
      label: 'CN XII Fascicle / Nucleus',
      x: 48.0,
      y: 29.6,
      zone: 'Medial Territory (ASA)',
      deficitTeaser: 'Ipsilateral tongue deviation to lesion side'
    },
    {
      structureId: 'spinal_trigeminal',
      label: 'Spinal V (Wallenberg Zone)',
      x: 57.9,
      y: 42.9,
      zone: 'Lateral Territory (PICA)',
      deficitTeaser: 'Ipsilateral facial analgesia (Wallenberg syndrome)'
    },
    {
      structureId: 'nucleus_ambiguus',
      label: 'Nucleus Ambiguus (Wallenberg Zone)',
      x: 54.1,
      y: 47.0,
      zone: 'Lateral Territory (PICA)',
      deficitTeaser: 'Severe dysphagia, vocal cord paralysis, dysarthria'
    },
    {
      structureId: 'spinothalamic',
      label: 'Spinothalamic Tract (Wallenberg Zone)',
      x: 61.8,
      y: 64.7,
      zone: 'Lateral Territory (PICA)',
      deficitTeaser: 'Contralateral hemibody analgesia'
    }
  ],
  'fig15-4': [
    {
      structureId: 'cn6_nucleus',
      label: 'Abducens Nucleus (VI)',
      x: 33.1,
      y: 39.8,
      zone: 'Dorsal Paramedian (Facial Colliculus)',
      deficitTeaser: 'Conjugate horizontal gaze palsy toward lesion side'
    },
    {
      structureId: 'cn7_nucleus_genu',
      label: 'Facial Nucleus (CN VII)',
      x: 31.2,
      y: 45.9,
      zone: 'Tegmentum, lateral to abducens nucleus',
      deficitTeaser: 'Complete peripheral facial palsy (upper + lower face)'
    },
    {
      structureId: 'cn6_fascicle',
      label: 'Abducens Nerve Fascicle (CN VI)',
      x: 29.1,
      y: 78.6,
      zone: 'Paramedian Tegmentum/Basis',
      deficitTeaser: 'Isolated lateral rectus palsy (Millard-Gubler / Raymond)'
    },
    {
      structureId: 'basis_corticospinal',
      label: 'Basis Pontis (Pyramidal Tracts)',
      x: 40.0,
      y: 74.9,
      zone: 'Ventral Basis Pontis',
      deficitTeaser: 'Contralateral hemiplegia; ataxic hemiparesis'
    },
    {
      structureId: 'medial_lemniscus_pons',
      label: 'Medial Lemniscus',
      x: 36.5,
      y: 53.8,
      zone: 'Intermediate Tegmentum',
      deficitTeaser: 'Contralateral loss of proprioception and vibration'
    },
    {
      structureId: 'mlf',
      label: 'Medial Longitudinal Fasciculus (MLF)',
      x: 35.6,
      y: 41.3,
      zone: 'Paramedian Dorsum',
      deficitTeaser: 'Internuclear Ophthalmoplegia (INO): adduction lag'
    }
  ],
  'fig15-6': [
    {
      structureId: 'crus_cerebri',
      label: 'Crus Cerebri (Weber Syndrome Area)',
      x: 24.5,
      y: 77.4,
      zone: 'Ventral Mesencephalon',
      deficitTeaser: 'Contralateral spastic hemiplegia + CN III palsy (Weber)'
    },
    {
      structureId: 'red_nucleus',
      label: 'Red Nucleus (Benedikt Syndrome Area)',
      x: 38.6,
      y: 59.2,
      zone: 'Dorsal Tegmentum',
      deficitTeaser: 'Contralateral hemiataxia with intention tremor (Benedikt)'
    }
  ],
  'fig15-5': [
    {
      structureId: 'superior_colliculus',
      label: 'Superior Colliculus (Upper Mesencephalon)',
      x: 59.1,
      y: 54.4,
      zone: 'Tectum',
      deficitTeaser: 'Vertical gaze reflex failure (Parinaud syndrome)'
    },
    {
      structureId: 'cerebral_aqueduct',
      label: 'Cerebral Aqueduct of Sylvius & PAG',
      x: 52.7,
      y: 56.8,
      zone: 'Central Periaqueductal',
      deficitTeaser: 'Hydrocephalus, autonomic pain pathway disruption'
    },
    {
      structureId: 'red_nucleus',
      label: 'Red Nucleus (Tegmentum)',
      x: 59.6,
      y: 62.6,
      zone: 'Midbrain Tegmentum',
      deficitTeaser: 'Contralateral intention tremor & kinetic hemiataxia'
    },
    {
      structureId: 'substantia_nigra',
      label: 'Substantia Nigra (Pars Compacta)',
      x: 43.7,
      y: 65.1,
      zone: 'Intermediate Ventral',
      deficitTeaser: 'Contralateral motor tone dysregulation'
    },
    {
      structureId: 'crus_cerebri',
      label: 'Crus Cerebri (Corticospinal Motor)',
      x: 42.4,
      y: 68.0,
      zone: 'Basis Mesencephali',
      deficitTeaser: 'Contralateral hemiplegia'
    },
    {
      structureId: 'cn3_complex',
      label: 'Oculomotor Nuclear Complex',
      x: 55.0,
      y: 60.2,
      zone: 'Paramedian Ventral PAG',
      deficitTeaser: 'Ipsilateral third nerve palsy'
    }
  ]
}

export const BOOK_PLATES_BY_LEVEL: Record<BrainstemLevel, BookPlateInfo[]> = {
  medulla: [
    {
      id: 'fig15-2',
      image: `${BASE}figures/ch15-fig02.png`,
      figNum: 'Figure 15-2',
      title: 'Midportion of Medulla at CN XII & X (Diagram & Myelin Stain)',
      caption: 'FIGURE 15-2. Midportion of the medulla at the origin of the hypoglossal and vagus nerves. Myelin-stained section on the right; diagrammatic representation on the left with hypoglossal nucleus, medial lemniscus, pyramid, and inferior olivary nucleus.',
      printPage: 'Page 441',
      width: 850,
      height: 309
    },
    {
      id: 'fig15-3',
      image: `${BASE}figures/ch15-fig03.png`,
      figNum: 'Figure 15-3',
      title: 'Medial (Dejerine) vs. Lateral (Wallenberg) Infarction Zones',
      caption: 'FIGURE 15-3. Cross section of medulla oblongata showing the precise area involved in medial medullary infarction (anterior spinal artery territory) and lateral medullary infarction (PICA territory).',
      printPage: 'Page 442',
      width: 850,
      height: 541
    }
  ],
  pons: [
    {
      id: 'fig15-4',
      image: `${BASE}figures/ch15-fig04.png`,
      figNum: 'Figure 15-4',
      title: 'Lower Pons at Level of CN VI & VII (Diagram & Myelin Stain)',
      caption: 'FIGURE 15-4. Cross section of the lower pons at the level of cranial nerves VI and VII. Myelin-stained section on the right. Labeled in the diagram: facial colliculus, abducens nucleus, facial nucleus, medial longitudinal fasciculus, spinal tract and nucleus of V, trapezoid body, medial lemniscus, and the corticospinal, corticobulbar and corticopontine fibers.',
      printPage: 'Page 447',
      width: 850,
      height: 327
    }
  ],
  midbrain: [
    {
      id: 'fig15-6',
      image: `${BASE}figures/ch15-fig06.png`,
      figNum: 'Figure 15-6',
      title: 'Mesencephalon: Weber, Benedikt, and Claude Fascicular Zones',
      caption: 'FIGURE 15-6. Diagram through mesencephalon showing regions in which the oculomotor nerve fascicles or roots are affected: (1) Weber syndrome; (2) Benedikt syndrome; (3) Claude syndrome (region numbers as in the book legend).',
      printPage: 'Page 453',
      width: 817,
      height: 633
    },
    {
      id: 'fig15-5',
      image: `${BASE}figures/ch15-fig05.png`,
      figNum: 'Figure 15-5',
      title: 'Cross Section of Mesencephalon (Collicular Levels)',
      caption: 'FIGURE 15-5. Cross section of the mesencephalon. A: Lower mesencephalon at inferior colliculus. B: Upper mesencephalon at superior colliculus and red nucleus.',
      printPage: 'Page 452',
      width: 389,
      height: 850
    }
  ]
}

export function BrainstemCrossSectionViewer({ isDark = true }: { isDark?: boolean }) {
  const [level, setLevel] = useState<BrainstemLevel>('medulla')
  const [viewMode, setViewMode] = useState<ViewMode>('simulator')
  const [selectedPlateIndex, setSelectedPlateIndex] = useState<number>(0)
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null)
  const [activeSyndromeId, setActiveSyndromeId] = useState<string | null>(null)
  const [activeVesselId, setActiveVesselId] = useState<string | null>(null)
  const [overlayMode, setOverlayMode] = useState<'structures' | 'vascular' | 'syndromes'>('structures')
  const [isZoomingPlate, setIsZoomingPlate] = useState(false)
  const [showAllPins, setShowAllPins] = useState(true)

  // Reset selection and plate index when level changes
  useEffect(() => {
    setSelectedPlateIndex(0)
    setSelectedStructureId(null)
    setActiveSyndromeId(null)
    setActiveVesselId(null)
  }, [level])

  const structures = level === 'medulla'
    ? MEDULLA_STRUCTURES
    : level === 'pons'
    ? PONS_STRUCTURES
    : MIDBRAIN_STRUCTURES

  const syndromes = SYNDROMES_BY_LEVEL[level]
  const vascularTerritories = VASCULAR_MAP[level]
  const availablePlates = BOOK_PLATES_BY_LEVEL[level]
  const currentPlate = availablePlates[Math.min(selectedPlateIndex, availablePlates.length - 1)] || availablePlates[0]
  const currentHotspots = PLATE_HOTSPOTS[currentPlate.id] || []

  const activeSyndrome = syndromes.find(s => s.id === activeSyndromeId)
  const selectedStructure = selectedStructureId ? structures[selectedStructureId] : null

  // Select a structure from SVG or list, and automatically map to its stroke syndrome
  const handleSelectStructure = (structId: string) => {
    if (selectedStructureId === structId) {
      setSelectedStructureId(null)
      setActiveSyndromeId(null)
      return
    }
    setSelectedStructureId(structId)
    // Map structure to corresponding classic stroke syndrome
    const syn = syndromes.find(s => s.structuresInvolved.includes(structId))
    if (syn) {
      setActiveSyndromeId(syn.id)
    }
  }

  const handleSelectSyndrome = (synId: string) => {
    if (activeSyndromeId === synId) {
      setActiveSyndromeId(null)
      setSelectedStructureId(null)
    } else {
      setActiveSyndromeId(synId)
      setActiveVesselId(null)
      const syn = syndromes.find(s => s.id === synId)
      if (syn && syn.structuresInvolved.length > 0) {
        setSelectedStructureId(syn.structuresInvolved[0])
      }
    }
  }

  const handleSelectVessel = (vesselId: string) => {
    if (activeVesselId === vesselId) {
      setActiveVesselId(null)
    } else {
      setActiveVesselId(vesselId)
      setActiveSyndromeId(null)
    }
  }

  const isHighlighted = (structId: string) => {
    if (selectedStructureId === structId) return true
    if (activeSyndrome && activeSyndrome.structuresInvolved.includes(structId)) return true
    if (activeVesselId) {
      const terr = vascularTerritories.find(v => v.id === activeVesselId)
      if (terr && terr.structures.includes(structId)) return true
    }
    return false
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 animate-fade-in pb-28">
      {/* Editorial Neuro-Atlas Header */}
      <header className="space-y-3 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Clinical Neuro-Atlas • Brazis 8th Edition
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Brainstem Cross-Section Atlas & Lesion Simulator
            </h1>
          </div>

          {/* Unified View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('simulator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                viewMode === 'simulator'
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900/60'
              }`}
            >
              🔬 Vector & Stroke Simulator
            </button>
            <button
              onClick={() => setViewMode('plates')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                viewMode === 'plates'
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900/60'
              }`}
            >
              📖 Book Plates
            </button>
          </div>
        </div>

        {/* Level Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {(['medulla', 'pons', 'midbrain'] as BrainstemLevel[]).map(lvl => {
            const isCurrent = level === lvl
            return (
              <button
                key={lvl}
                onClick={() => {
                  setLevel(lvl)
                  setSelectedPlateIndex(0)
                  setSelectedStructureId(null)
                  setActiveSyndromeId(null)
                  setActiveVesselId(null)
                }}
                className={`py-2 px-3 rounded-xl font-medium text-xs transition cursor-pointer border flex flex-col items-center justify-center ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-950 dark:text-amber-200 font-bold shadow-xs'
                    : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <span className="font-serif text-sm">
                  {lvl === 'medulla' ? '1. Medulla Oblongata' : lvl === 'pons' ? '2. Pons' : '3. Midbrain'}
                </span>
                <span className="text-[10px] font-mono opacity-70 lowercase">
                  {lvl === 'medulla' ? 'cn ix, x, xii' : lvl === 'pons' ? 'cn v, vi, vii, viii' : 'cn iii, iv'}
                </span>
              </button>
            )
          })}
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-2">
            <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
              {level === 'medulla'
                ? 'Mid-Medulla: Origin of CN XII & X'
                : level === 'pons'
                ? 'Caudal Pons: Facial Colliculus & CN VI/VII'
                : 'Upper Midbrain: Superior Colliculus & CN III'}
            </span>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
              {viewMode === 'plates'
                ? `${currentPlate.figNum} (${currentPlate.printPage})`
                : 'Interactive Vector & Stroke Simulator'}
            </span>
          </div>

          {/* Verification status of whatever is on screen (registry: content/sources.json) */}
          <div className="w-full flex flex-wrap items-center gap-1.5" aria-label="Verification status of the current view">
            {viewMode === 'plates' && (
              <>
                <AssetBadge assetId={`atlas/plates/${currentPlate.id}`} label="Plate" />
                <AssetBadge assetId={`atlas/hotspots/${currentPlate.id}`} label="Pins" />
              </>
            )}
            {viewMode === 'simulator' && (
              <>
                <AssetBadge assetId={`lesion_sim/schematic_${level}`} label="Drawing" />
                {overlayMode === 'vascular' && <AssetBadge assetId={`vascular/${level}`} label="Territories" />}
                {activeSyndromeId && (
                  <>
                    <AssetBadge assetId={`syndromes/${activeSyndromeId}`} label="Syndrome" />
                    {(activeSyndromeId === 'wallenberg' || activeSyndromeId === 'dejerine') && (
                      <AssetBadge assetId={`lesion_sim/${activeSyndromeId}`} label="Lesion mask" />
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* VIEW MODE 1: AUTHENTIC BRAZIS BOOK PLATES WITH INTERACTIVE OVERLAYS */}
          {viewMode === 'plates' && (
            <div className="w-full space-y-3">
              {/* Multi-plate selector pills & interactive pin controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Plate:</span>
                  {availablePlates.map((plate, idx) => (
                    <button
                      key={plate.id}
                      onClick={() => {
                        setSelectedPlateIndex(idx)
                        setIsZoomingPlate(false)
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                        selectedPlateIndex === idx
                          ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950 border-amber-400 shadow-xs font-bold'
                          : 'bg-stone-100 dark:bg-[#131315] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#28282e] hover:border-stone-400'
                      }`}
                    >
                      {plate.figNum}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowAllPins(p => !p)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition ${
                      showAllPins
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                        : 'bg-stone-100 dark:bg-[#131315] text-stone-500 border-stone-200 dark:border-[#28282e]'
                    }`}
                  >
                    {showAllPins ? '📍 All Pins: Visible' : '📍 All Pins: Hidden'}
                  </button>

                  {selectedStructureId && (
                    <button
                      onClick={() => setSelectedStructureId(null)}
                      className="px-2 py-1 rounded-xl text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      Clear Pin
                    </button>
                  )}
                </div>
              </div>

              {/* Cross-plate indicator if selected structure is on another plate */}
              {selectedStructureId && !currentHotspots.some(h => h.structureId === selectedStructureId) && (() => {
                const altPlateIdx = availablePlates.findIndex(p => (PLATE_HOTSPOTS[p.id] || []).some(h => h.structureId === selectedStructureId))
                if (altPlateIdx !== -1) {
                  const altPlate = availablePlates[altPlateIdx]
                  return (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200">
                      <span>📍 <strong>{structures[selectedStructureId]?.name}</strong> is mapped on {altPlate.figNum}.</span>
                      <button
                        onClick={() => setSelectedPlateIndex(altPlateIdx)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:text-stone-950 font-bold text-[11px]"
                      >
                        Switch to {altPlate.figNum}
                      </button>
                    </div>
                  )
                }
                return null
              })()}

              {/* Book Image Display with Interactive Pinpoint Layer */}
              <div
                className={`relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black/95 transition-all shadow-md flex items-center justify-center ${
                  isZoomingPlate ? 'h-[560px]' : ''
                }`}
                style={{
                  containerType: 'size',
                  ...(isZoomingPlate
                    ? {}
                    : { aspectRatio: String(Math.min(4 / 3, Math.max(3 / 4, currentPlate.width / currentPlate.height))) })
                }}
              >
                {/* Frame that exactly matches the displayed image, so pin percentages refer to the picture */}
                <div
                  className="relative"
                  style={{
                    aspectRatio: `${currentPlate.width} / ${currentPlate.height}`,
                    width: `min(calc(100cqw - 16px), calc((100cqh - 16px) * ${currentPlate.width / currentPlate.height}))`
                  }}
                >
                <img
                  src={currentPlate.image}
                  alt={currentPlate.title}
                  className="w-full h-full block select-none"
                />

                {/* INTERACTIVE LAYER ON TOP OF THE IMAGE */}
                <div className="absolute inset-0 pointer-events-none">
                  {currentHotspots.map(spot => {
                    const isSelected = selectedStructureId === spot.structureId
                    const isInSyndrome = activeSyndrome && activeSyndrome.structuresInvolved.includes(spot.structureId)

                    if (!isSelected && !isInSyndrome && !showAllPins) return null

                    return (
                      <div
                        key={spot.structureId}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                          isSelected ? 'z-40' : isInSyndrome ? 'z-30' : 'z-20'
                        }`}
                      >
                        {/* 1. Target Beacon for Selected Structure */}
                        {isSelected && (
                          <div className="relative flex items-center justify-center">
                            {/* Radial pulsing ripple */}
                            <span className="absolute w-12 h-12 rounded-full bg-amber-400 opacity-75 animate-ping pointer-events-none" />
                            {/* Reticle ring */}
                            <span className="absolute w-8 h-8 rounded-full border-2 border-amber-300 border-dashed animate-spin pointer-events-none" />
                            {/* Center Target Pin */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedStructureId(spot.structureId)
                              }}
                              className="pointer-events-auto relative w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs border-2 border-white shadow-[0_0_20px_rgba(245,158,11,1)] flex items-center justify-center transform active:scale-90"
                              title={spot.label}
                            >
                              📍
                            </button>
                            {/* Floating Callout Card on top of Image */}
                            <div className="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-stone-950/95 text-amber-300 border border-amber-400 shadow-2xl text-[11px] font-bold backdrop-blur-md flex flex-col items-center animate-fade-in z-50">
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                {spot.label}
                              </span>
                              <span className="text-[10px] text-stone-300 font-normal">
                                {spot.deficitTeaser}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* 2. Active Stroke Syndrome Lesion Highlight */}
                        {!isSelected && isInSyndrome && (
                          <div className="relative flex items-center justify-center">
                            <span className="absolute w-10 h-10 rounded-full bg-rose-500/40 animate-pulse pointer-events-none" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedStructureId(spot.structureId)
                              }}
                              className="pointer-events-auto relative w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] border border-white shadow-lg flex items-center justify-center hover:scale-125 transition-transform"
                              title={`${spot.label} (Compromised in ${activeSyndrome.eponym})`}
                            >
                              ⚡
                            </button>
                          </div>
                        )}

                        {/* 3. Subtle Interactive Hotspot Pins in "Show All" Mode */}
                        {!isSelected && !isInSyndrome && showAllPins && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedStructureId(spot.structureId)
                            }}
                            className="pointer-events-auto relative group w-4 h-4 rounded-full bg-stone-900/80 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-amber-400/60 shadow-md text-[9px] font-bold flex items-center justify-center transition-all hover:scale-150"
                            title={spot.label}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-stone-950" />
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden group-hover:flex whitespace-nowrap px-2 py-0.5 rounded-md bg-black/95 text-white text-[10px] border border-slate-700 pointer-events-none z-50 font-medium">
                              {spot.label}
                            </span>
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-30">
                  <button
                    onClick={() => setIsZoomingPlate(z => !z)}
                    className="px-2.5 py-1 rounded-xl bg-black/80 hover:bg-black text-[11px] text-white font-mono shadow-md border border-slate-700 backdrop-blur-md"
                  >
                    {isZoomingPlate ? '🔍 Fit' : '🔍 Expand'}
                  </button>
                </div>
              </div>

              {/* Plate Description Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  {currentPlate.title} ({currentPlate.printPage})
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentPlate.caption}
                </p>
              </div>
            </div>
          )}

          {/* VIEW MODE: INTERACTIVE VECTOR & STROKE SIMULATOR */}
          {viewMode === 'simulator' && (
            <div className="w-full space-y-3">
              {/* Overlay controls */}
              <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => {
                    setOverlayMode('structures')
                    setActiveSyndromeId(null)
                    setActiveVesselId(null)
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    overlayMode === 'structures'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-transparent shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                  }`}
                >
                  🔬 Structures
                </button>
                <button
                  onClick={() => {
                    setOverlayMode('vascular')
                    setActiveSyndromeId(null)
                    if (vascularTerritories.length > 0) setActiveVesselId(vascularTerritories[0].id)
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    overlayMode === 'vascular'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-rose-400'
                  }`}
                >
                  🩸 Vascular (Angio)
                </button>
                <button
                  onClick={() => {
                    setOverlayMode('syndromes')
                    setActiveVesselId(null)
                    if (syndromes.length > 0) handleSelectSyndrome(syndromes[0].id)
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    overlayMode === 'syndromes'
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xs font-bold'
                      : 'bg-stone-100 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  ⚡ Stroke Syndromes
                </button>
              </div>

              {overlayMode === 'vascular' && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mr-1">Vessel Territory:</span>
                  {vascularTerritories.map(v => (
                    <button
                      key={v.id}
                      onClick={() => handleSelectVessel(v.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        activeVesselId === v.id
                          ? 'bg-rose-600 text-white border-rose-500 shadow-xs'
                          : 'bg-stone-100 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-rose-400'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Dynamic SVG Lesion Canvas with full interactivity */}
              <div className="w-full aspect-[4/3] max-w-lg relative bg-stone-100 dark:bg-stone-950/90 rounded-2xl border border-stone-200 dark:border-stone-800/80 p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-xs">
                {level === 'medulla' && (
                  <svg viewBox="0 0 500 400" className="w-full h-full select-none transition-all">
                    <path
                      d="M 250 45 C 330 45, 430 85, 455 180 C 465 240, 420 295, 335 340 C 295 355, 255 360, 215 355 C 135 340, 90 295, 45 180 C 70 85, 170 45, 250 45 Z"
                      fill={isDark ? '#0b1120' : '#f8fafc'}
                      stroke={isDark ? '#334155' : '#94a3b8'}
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 170 50 C 210 85, 290 85, 330 50 C 300 70, 200 70, 170 50 Z"
                      fill={isDark ? '#030712' : '#cbd5e1'}
                      stroke={isDark ? '#475569' : '#64748b'}
                      strokeWidth="2"
                    />

                    {/* Wallenberg Lesion Mask */}
                    {(activeSyndromeId === 'wallenberg' || activeSyndromeId === 'opalski') && (
                      <path
                        d="M 55 140 C 50 250, 110 300, 210 260 C 180 180, 160 120, 120 90 Z"
                        fill="#d97706"
                        fillOpacity="0.45"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        className="animate-pulse cursor-pointer"
                        onClick={() => handleSelectSyndrome('wallenberg')}
                      />
                    )}

                    {/* Dejerine Lesion Mask */}
                    {activeSyndromeId === 'dejerine' && (
                      <path
                        d="M 215 90 L 285 90 L 300 350 L 200 350 Z"
                        fill="#ef4444"
                        fillOpacity="0.45"
                        stroke="#f87171"
                        strokeWidth="3"
                        className="animate-pulse cursor-pointer"
                        onClick={() => handleSelectSyndrome('dejerine')}
                      />
                    )}

                    {/* Pyramids */}
                    <g onClick={() => handleSelectStructure('pyramid')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <path
                        d="M 195 280 C 195 330, 215 350, 245 350 L 245 270 Z"
                        fill={isHighlighted('pyramid') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                        stroke={isHighlighted('pyramid') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                        strokeWidth="2.5"
                      />
                      <path
                        d="M 305 280 C 305 330, 285 350, 255 350 L 255 270 Z"
                        fill={isHighlighted('pyramid') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                        stroke={isHighlighted('pyramid') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                        strokeWidth="2.5"
                      />
                      <text x="250" y="320" textAnchor="middle" fill={isHighlighted('pyramid') ? '#ffffff' : isDark ? '#cbd5e1' : '#334155'} fontSize="11" fontWeight="bold">Pyramid (CST)</text>
                    </g>

                    {/* Medial Lemniscus */}
                    <g onClick={() => handleSelectStructure('medial_lemniscus')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <rect
                        x="228"
                        y="140"
                        width="44"
                        height="115"
                        rx="8"
                        fill={isHighlighted('medial_lemniscus') ? '#38bdf8' : isDark ? '#1e293b' : '#e2e8f0'}
                        stroke={isHighlighted('medial_lemniscus') ? '#bae6fd' : isDark ? '#475569' : '#94a3b8'}
                        strokeWidth="2.5"
                      />
                      <text x="250" y="195" textAnchor="middle" fill={isHighlighted('medial_lemniscus') ? '#0284c7' : isDark ? '#94a3b8' : '#475569'} fontSize="10" fontWeight="bold">Med. Lemn.</text>
                    </g>

                    {/* CN XII */}
                    <g onClick={() => handleSelectStructure('cn12')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <circle cx="230" cy="88" r="14" fill={isHighlighted('cn12') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'} stroke={isHighlighted('cn12') ? '#fef08a' : '#64748b'} strokeWidth="2.5" />
                      <circle cx="270" cy="88" r="14" fill={isHighlighted('cn12') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'} stroke={isHighlighted('cn12') ? '#fef08a' : '#64748b'} strokeWidth="2.5" />
                      <path d="M 230 102 L 195 285" stroke={isHighlighted('cn12') ? '#fbbf24' : '#64748b'} strokeWidth="3.5" strokeDasharray="4" />
                      <text x="250" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">CN XII</text>
                    </g>

                    {/* Olive */}
                    <g onClick={() => handleSelectStructure('inferior_olive')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <path
                        d="M 160 210 Q 140 180 165 170 Q 185 180 180 215 Q 175 250 150 260 Q 130 255 140 230"
                        fill="none"
                        stroke={isHighlighted('inferior_olive') ? '#10b981' : isDark ? '#475569' : '#64748b'}
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <text x="140" y="275" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Olive</text>
                    </g>

                    {/* Ambiguus */}
                    <g onClick={() => handleSelectStructure('nucleus_ambiguus')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <circle cx="145" cy="150" r="15" fill={isHighlighted('nucleus_ambiguus') ? '#059669' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#6ee7b7" strokeWidth="2.5" />
                      <text x="145" y="154" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="bold">Ambiguus</text>
                    </g>

                    {/* Spinal V */}
                    <g onClick={() => handleSelectStructure('spinal_trigeminal')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <ellipse cx="95" cy="160" rx="20" ry="28" fill={isHighlighted('spinal_trigeminal') ? '#ec4899' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fbcfe8" strokeWidth="2.5" />
                      <text x="95" y="164" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">Spinal V</text>
                    </g>

                    {/* Spinothalamic */}
                    <g onClick={() => handleSelectStructure('spinothalamic')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <polygon points="85,215 125,215 105,255" fill={isHighlighted('spinothalamic') ? '#06b6d4' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#a5f3fc" strokeWidth="2.5" />
                      <text x="105" y="235" textAnchor="middle" fill="#a5f3fc" fontSize="8" fontWeight="bold">Spinothal</text>
                    </g>
                  </svg>
                )}

                {level === 'pons' && (
                  <svg viewBox="0 0 500 400" className="w-full h-full select-none transition-all">
                    <path
                      d="M 100 95 C 160 55, 340 55, 400 95 C 465 145, 475 250, 440 310 C 390 365, 305 385, 250 385 C 195 385, 110 365, 60 310 C 25 250, 35 145, 100 95 Z"
                      fill={isDark ? '#0b1120' : '#f8fafc'}
                      stroke={isDark ? '#334155' : '#94a3b8'}
                      strokeWidth="3.5"
                    />
                    <path d="M 150 90 C 200 130, 225 130, 250 110 C 275 130, 300 130, 350 90 Z" fill={isDark ? '#030712' : '#cbd5e1'} stroke="#64748b" strokeWidth="2" />

                    {/* Millard-Gubler Lesion Mask */}
                    {activeSyndromeId === 'millard_gubler' && (
                      <rect x="155" y="260" width="105" height="105" rx="16" fill="#f43f5e" fillOpacity="0.45" stroke="#fb7185" strokeWidth="2.5" className="animate-pulse cursor-pointer" onClick={() => handleSelectSyndrome('millard_gubler')} />
                    )}

                    {/* Foville Lesion Mask */}
                    {activeSyndromeId === 'foville' && (
                      <path d="M 200 110 C 240 90, 290 90, 310 145 C 290 170, 220 170, 200 110 Z" fill="#d97706" fillOpacity="0.45" stroke="#fbbf24" strokeWidth="2.5" className="animate-pulse cursor-pointer" onClick={() => handleSelectSyndrome('foville')} />
                    )}

                    {/* Raymond Lesion Mask */}
                    {activeSyndromeId === 'raymond' && (
                      <rect x="180" y="270" width="85" height="95" rx="14" fill="#ef4444" fillOpacity="0.45" stroke="#f87171" strokeWidth="2.5" className="animate-pulse cursor-pointer" onClick={() => handleSelectSyndrome('raymond')} />
                    )}

                    <g onClick={() => handleSelectStructure('basis_corticospinal')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <rect x="160" y="265" width="180" height="95" rx="20" fill={isHighlighted('basis_corticospinal') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fda4af" strokeWidth="2.5" />
                      <text x="250" y="315" textAnchor="middle" fill="#fda4af" fontSize="12" fontWeight="bold">Basis Pontis (CST)</text>
                    </g>

                    <g onClick={() => handleSelectStructure('cn6_nucleus')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <circle cx="225" cy="125" r="16" fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fef08a" strokeWidth="2.5" />
                      <circle cx="275" cy="125" r="16" fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fef08a" strokeWidth="2.5" />
                      <text x="250" y="110" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">VI Nucleus</text>
                    </g>

                    <g onClick={() => handleSelectStructure('cn7_nucleus_genu')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <path d="M 165 195 Q 190 100 225 105 Q 245 105 240 145 L 175 270" fill="none" stroke={isHighlighted('cn7_nucleus_genu') ? '#10b981' : '#64748b'} strokeWidth="4.5" strokeDasharray="4" />
                      <circle cx="165" cy="200" r="16" fill={isHighlighted('cn7_nucleus_genu') ? '#10b981' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#a7f3d0" strokeWidth="2.5" />
                      <text x="165" y="204" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">VII Nu.</text>
                    </g>

                    <g onClick={() => handleSelectStructure('cn6_fascicle')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <line x1="225" y1="140" x2="200" y2="365" stroke={isHighlighted('cn6_fascicle') ? '#fbbf24' : '#64748b'} strokeWidth="4.5" />
                      <text x="195" y="380" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">CN VI</text>
                    </g>
                  </svg>
                )}

                {level === 'midbrain' && (
                  <svg viewBox="0 0 500 400" className="w-full h-full select-none transition-all">
                    <path
                      d="M 120 100 Q 250 45 380 100 C 440 140, 455 230, 425 295 C 385 360, 305 360, 250 305 C 195 360, 115 360, 75 295 C 45 230, 60 140, 120 100 Z"
                      fill={isDark ? '#0b1120' : '#f8fafc'}
                      stroke={isDark ? '#334155' : '#94a3b8'}
                      strokeWidth="3.5"
                    />
                    <circle cx="250" cy="120" r="14" fill={isDark ? '#030712' : '#cbd5e1'} stroke="#64748b" strokeWidth="2.5" />

                    {/* Weber Lesion Mask */}
                    {activeSyndromeId === 'weber' && (
                      <path d="M 75 265 C 100 330, 175 345, 220 295 L 190 235 C 135 250, 95 240, 75 265 Z" fill="#ef4444" fillOpacity="0.45" stroke="#f87171" strokeWidth="2.5" className="animate-pulse cursor-pointer" onClick={() => handleSelectSyndrome('weber')} />
                    )}

                    {/* Benedikt / Claude Lesion Mask */}
                    {(activeSyndromeId === 'benedikt' || activeSyndromeId === 'claude') && (
                      <ellipse cx="195" cy="175" rx="36" ry="32" fill="#d97706" fillOpacity="0.45" stroke="#fbbf24" strokeWidth="2.5" className="animate-pulse cursor-pointer" onClick={() => handleSelectSyndrome(activeSyndromeId)} />
                    )}

                    <g onClick={() => handleSelectStructure('crus_cerebri')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <path d="M 80 270 C 105 325, 170 340, 215 295 L 190 240 C 140 255, 100 245, 80 270 Z" fill={isHighlighted('crus_cerebri') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fda4af" strokeWidth="2.5" />
                      <path d="M 420 270 C 395 325, 330 340, 285 295 L 310 240 C 360 255, 400 245, 420 270 Z" fill={isHighlighted('crus_cerebri') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fda4af" strokeWidth="2.5" />
                      <text x="145" y="300" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">Crus Cerebri (CST)</text>
                    </g>

                    <g onClick={() => handleSelectStructure('red_nucleus')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <circle cx="195" cy="175" r="24" fill={isHighlighted('red_nucleus') ? '#ef4444' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fca5a5" strokeWidth="2.5" />
                      <circle cx="305" cy="175" r="24" fill={isHighlighted('red_nucleus') ? '#ef4444' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fca5a5" strokeWidth="2.5" />
                      <text x="195" y="179" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">Red Nu.</text>
                    </g>

                    <g onClick={() => handleSelectStructure('cn3_complex')} className="cursor-pointer hover:opacity-85 transition-opacity">
                      <circle cx="250" cy="148" r="15" fill={isHighlighted('cn3_complex') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'} stroke="#fef08a" strokeWidth="2.5" />
                      <line x1="245" y1="160" x2="225" y2="300" stroke={isHighlighted('cn3_complex') ? '#fbbf24' : '#64748b'} strokeWidth="4" strokeDasharray="4" />
                      <text x="250" y="152" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">III Nu.</text>
                    </g>
                  </svg>
                )}
              </div>

              {/* Reactive Stroke Outcome Banner */}
              {activeSyndrome && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between animate-fade-in shadow-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 font-serif text-sm">
                      <span>⚡ Simulated Stroke Syndrome:</span> {activeSyndrome.eponym}
                    </span>
                    <span className="text-[11px] text-stone-600 dark:text-stone-400 block font-mono">
                      Vessel: {activeSyndrome.vessel.split('/')[0]} • Structure: {selectedStructure?.name.split('(')[0].trim() || 'Zone'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveSyndromeId(null)
                      setSelectedStructureId(null)
                    }}
                    className="text-[11px] font-mono text-amber-700 dark:text-amber-400 hover:underline cursor-pointer shrink-0 ml-3 font-semibold"
                  >
                    Clear Stroke
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Color Legend - Warm, no purple */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Motor / CST
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Cranial Nerve
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span> Sensory Lemniscus
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Cerebellar / Coordination
            </span>
          </div>
        </div>

        {/* Right Column: Structure Detail & Clinical Syndromes Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Structure Inspection Section - No nested box cards */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                Structure Inspection
              </h2>
              {selectedStructure && (
                <button
                  onClick={() => setSelectedStructureId(null)}
                  className="text-[11px] font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>
            <AssetBadge assetId="atlas/structures" label="Structures" />

            {selectedStructure ? (
              <div className="space-y-3 animate-fade-in pt-1">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold block">
                    {selectedStructure.zone}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                    {selectedStructure.name}
                  </h3>
                </div>

                <dl className="space-y-3 text-xs">
                  <div>
                    <dt className="text-[10px] font-mono uppercase text-stone-400 font-bold">Function:</dt>
                    <dd className="text-stone-700 dark:text-stone-300 leading-relaxed mt-0.5">{selectedStructure.function}</dd>
                  </div>

                  <div className="border-l-2 border-rose-500 pl-3">
                    <dt className="text-[10px] font-mono uppercase text-rose-600 dark:text-rose-400 font-bold">Clinical Deficit:</dt>
                    <dd className="text-rose-950 dark:text-rose-200 font-medium leading-relaxed mt-0.5">{selectedStructure.deficit}</dd>
                  </div>

                  <div className="border-l-2 border-stone-300 dark:border-stone-800 pl-3">
                    <dt className="text-[10px] font-mono uppercase text-stone-400 font-bold">Vascular Supply:</dt>
                    <dd className="text-stone-800 dark:text-stone-200 font-mono text-[11px] mt-0.5">{selectedStructure.bloodSupply}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                  Select a structure from this level to view its functional anatomy and deficit:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Object.values(structures).map(st => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStructureId(st.id)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 dark:bg-stone-900/60 hover:bg-stone-200 dark:hover:bg-stone-800 transition text-stone-800 dark:text-stone-300 cursor-pointer"
                    >
                      {st.name.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Syndromes List for this Level - Clean Editorial List */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold">
                Brainstem Stroke Syndromes
              </h2>
              <span className="text-[11px] font-mono text-stone-400">Tap to highlight</span>
            </div>

            <div className="space-y-3">
              {syndromes.map(syn => {
                const isActive = activeSyndromeId === syn.id
                return (
                  <article
                    key={syn.id}
                    onClick={() => handleSelectSyndrome(syn.id)}
                    className={`border-l-2 pl-3.5 py-1.5 transition cursor-pointer select-none space-y-1 ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/[0.04]'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                        {syn.eponym}
                      </h3>
                      <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 shrink-0">
                        {syn.vessel.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug">
                      {syn.triad}
                    </p>
                    <AssetBadge assetId={`syndromes/${syn.id}`} />

                    {isActive && (
                      <div className="mt-2 pt-2 border-t border-stone-200/80 dark:border-stone-800/80 space-y-1 text-xs animate-fade-in">
                        <p className="text-stone-800 dark:text-stone-200">
                          <strong className="text-stone-500">Culprit Vessel:</strong> {syn.vessel}
                        </p>
                        <p className="text-amber-900 dark:text-amber-200/90 font-medium">
                          <strong>★ Brazis Pearl:</strong> {syn.keyDifferentiator}
                        </p>
                        <p className="text-[10px] text-stone-400 font-mono">
                          Source: {syn.brazisReference}
                        </p>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
