import { useState, useRef, useEffect } from 'react'

export type BrainstemLevel = 'medulla' | 'pons' | 'midbrain'
export type ViewMode = 'vector' | 'plate' | '3d'
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

const MEDULLA_STRUCTURES: Record<string, AnatomicalStructure> = {
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

const PONS_STRUCTURES: Record<string, AnatomicalStructure> = {
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

const MIDBRAIN_STRUCTURES: Record<string, AnatomicalStructure> = {
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
    bloodSupply: 'Peduncular branches of PCA / Quadrigeminal artery',
    zone: 'Medial (Paramedian)'
  },
  red_nucleus: {
    id: 'red_nucleus',
    name: 'Red Nucleus (Rubrospinal / Rubro-olivary)',
    function: 'Coordinates upper limb flexion and relays cerebellar output to the thalamus and olive.',
    deficit: 'Contralateral coarse intention tremor, choreiform movements, and ataxia (Holmes/rubral tremor).',
    bloodSupply: 'Paramedian thalamoperforating branches of PCA',
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

const SYNDROMES_BY_LEVEL: Record<BrainstemLevel, SyndromeOverlay[]> = {
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
      keyDifferentiator: 'Pure pyramidal weakness combined with third nerve palsy; involuntary movements, tremor, and ataxia are completely absent.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 452–453, Figure 15-6'
    },
    {
      id: 'benedikt',
      name: 'Tegmental Mesencephalic Syndrome',
      eponym: 'Benedikt Syndrome',
      vessel: 'Paramedian thalamoperforating branches of PCA / Basilar tip',
      structuresInvolved: ['cn3_complex', 'red_nucleus', 'substantia_nigra', 'crus_cerebri'],
      triad: 'Ipsilateral CN III palsy + Contralateral coarse intention tremor, chorea, and athetosis + Mild hemiparesis',
      keyDifferentiator: 'Direct damage to the Red Nucleus and Substantia Nigra generates hyperkinetic involuntary movements (rubral tremor / choreoathetosis).',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 453–454, Figure 15-6'
    },
    {
      id: 'claude',
      name: 'Dorsal Tegmental Cerebellar Syndrome',
      eponym: 'Claude Syndrome',
      vessel: 'Paramedian branches of PCA / Superior Cerebellar Artery (SCA)',
      structuresInvolved: ['cn3_complex', 'red_nucleus'],
      triad: 'Ipsilateral CN III palsy + Contralateral pure kinetic cerebellar hemiataxia and dysmetria',
      keyDifferentiator: 'Lesion involves the decussation of superior cerebellar peduncles; produces pure cerebellar ataxia without chorea or tremor.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Page 454, Figure 15-6'
    },
    {
      id: 'parinaud',
      name: 'Dorsal Midbrain / Pretectal Syndrome',
      eponym: 'Parinaud (Sylvian Aqueduct) Syndrome',
      vessel: 'Pineal region mass / Quadrigeminal artery ischemia / Hydrocephalus',
      structuresInvolved: ['superior_colliculus', 'cerebral_aqueduct'],
      triad: 'Supranuclear upward gaze palsy + Light-near pupillary dissociation + Convergence-retraction nystagmus',
      keyDifferentiator: 'Tectal pretectal pathology with Collier lid retraction; vertical gaze deficit rather than third nerve fascicle paralysis.',
      brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 454–456'
    }
  ]
}

const VASCULAR_MAP: Record<BrainstemLevel, VascularTerritory[]> = {
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
      color: '#8b5cf6',
      lightColor: '#a78bfa',
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
      name: 'Peduncular Branches of PCA',
      vessel: 'Posterior Cerebral Artery & Basilar Bifurcation',
      color: '#f59e0b',
      lightColor: '#fbbf24',
      structures: ['crus_cerebri', 'cn3_complex', 'substantia_nigra'],
      description: 'Supplies the crus cerebri (corticospinal and corticobulbar tracts), substantia nigra, and emerging oculomotor fascicles.'
    },
    {
      id: 'pca_thalamoperforating',
      name: 'Thalamoperforating & Quadrigeminal Branches',
      vessel: 'Paramedian PCA branches & SCA',
      color: '#10b981',
      lightColor: '#34d399',
      structures: ['red_nucleus', 'superior_colliculus', 'medial_lemniscus_midbrain', 'cerebral_aqueduct'],
      description: 'Supplies the midbrain tegmentum: red nucleus, superior colliculus, pretectal area, and periaqueductal gray.'
    }
  ]
}

const BOOK_PLATES: Record<BrainstemLevel, { image: string; title: string; subtitle: string; page: string }> = {
  medulla: {
    image: '/figures/ch15-fig02.png',
    title: 'Mid-Medulla: CN XII & X Level',
    subtitle: 'Brazis Figure 15-2 with authentic myelin-stained histological section and schematic localization.',
    page: 'Page 441'
  },
  pons: {
    image: '/figures/ch15-fig04.png',
    title: 'Lower Pons: CN VI & VII Level',
    subtitle: 'Brazis Figure 15-4 with myelin-stained section showing facial colliculus, abducens nucleus, and internal genu.',
    page: 'Page 447'
  },
  midbrain: {
    image: '/figures/ch15-fig06.png',
    title: 'Mesencephalon: Oculomotor Fascicular Syndromes',
    subtitle: 'Brazis Figure 15-6 diagrammatic section illustrating regions of Weber, Benedikt, and Claude syndromes.',
    page: 'Page 453'
  }
}

export function BrainstemCrossSectionViewer({ isDark = true }: { isDark?: boolean }) {
  const [level, setLevel] = useState<BrainstemLevel>('medulla')
  const [viewMode, setViewMode] = useState<ViewMode>('vector')
  const [overlayMode, setOverlayMode] = useState<OverlayMode>('structures')
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null)
  const [activeSyndromeId, setActiveSyndromeId] = useState<string | null>(null)
  const [activeVesselId, setActiveVesselId] = useState<string | null>(null)
  const [isZoomingPlate, setIsZoomingPlate] = useState(false)

  // 3D Canvas rotation state
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const isDragging3D = useRef(false)
  const lastMouseX = useRef(0)

  const structures = level === 'medulla'
    ? MEDULLA_STRUCTURES
    : level === 'pons'
    ? PONS_STRUCTURES
    : MIDBRAIN_STRUCTURES

  const syndromes = SYNDROMES_BY_LEVEL[level]
  const vascularTerritories = VASCULAR_MAP[level]
  const currentPlate = BOOK_PLATES[level]

  const activeSyndrome = syndromes.find(s => s.id === activeSyndromeId)
  const selectedStructure = selectedStructureId ? structures[selectedStructureId] : null

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

  // Draw 3D interactive brainstem on Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || viewMode !== '3d') return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const angle = (rotationAngle * Math.PI) / 180
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      // Background ambient gradient
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 180)
      if (isDark) {
        bgGrad.addColorStop(0, '#0f172a')
        bgGrad.addColorStop(1, '#020617')
      } else {
        bgGrad.addColorStop(0, '#f1f5f9')
        bgGrad.addColorStop(1, '#e2e8f0')
      }
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Perspective 3D Brainstem Outline with Depth
      ctx.save()
      ctx.translate(centerX, centerY)

      // Draw Midbrain (Top)
      ctx.beginPath()
      const mbX1 = -55 * cosA - 15 * sinA
      const mbX2 = 55 * cosA + 15 * sinA
      ctx.fillStyle = isDark ? '#881337' : '#fda4af'
      ctx.strokeStyle = '#f43f5e'
      ctx.lineWidth = 2.5
      ctx.moveTo(mbX1, -110)
      ctx.bezierCurveTo(-75 * cosA, -80, -50 * cosA, -60, -40 * cosA, -50)
      ctx.lineTo(40 * cosA, -50)
      ctx.bezierCurveTo(50 * cosA, -60, 75 * cosA, -80, mbX2, -110)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Midbrain label
      ctx.fillStyle = isDark ? '#ffffff' : '#881337'
      ctx.font = 'bold 11px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('MESENCEPHALON', 0, -80)

      // Draw Pons (Middle Bulge)
      ctx.beginPath()
      ctx.fillStyle = isDark ? '#0e7490' : '#bae6fd'
      ctx.strokeStyle = '#22d3ee'
      ctx.lineWidth = 2.5
      ctx.moveTo(-40 * cosA, -50)
      ctx.bezierCurveTo(-85 * cosA, -20, -90 * cosA, 30, -35 * cosA, 50)
      ctx.lineTo(35 * cosA, 50)
      ctx.bezierCurveTo(90 * cosA, 30, 85 * cosA, -20, 40 * cosA, -50)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Pons transverse striations
      ctx.strokeStyle = isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(14, 116, 144, 0.4)'
      ctx.lineWidth = 1.5
      for (let y = -35; y <= 35; y += 14) {
        ctx.beginPath()
        ctx.moveTo(-50 * cosA, y)
        ctx.quadraticCurveTo(0, y + 8, 50 * cosA, y)
        ctx.stroke()
      }

      ctx.fillStyle = isDark ? '#ffffff' : '#0e7490'
      ctx.fillText('PONS', 0, 5)

      // Draw Medulla (Bottom)
      ctx.beginPath()
      ctx.fillStyle = isDark ? '#78350f' : '#fde68a'
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2.5
      ctx.moveTo(-35 * cosA, 50)
      ctx.bezierCurveTo(-30 * cosA, 75, -20 * cosA, 110, -15 * cosA, 130)
      ctx.lineTo(15 * cosA, 130)
      ctx.bezierCurveTo(20 * cosA, 110, 30 * cosA, 75, 35 * cosA, 50)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Medullary anterior median fissure & pyramids
      ctx.beginPath()
      ctx.moveTo(0, 50)
      ctx.lineTo(0, 130)
      ctx.strokeStyle = isDark ? '#fbbf24' : '#b45309'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = isDark ? '#ffffff' : '#78350f'
      ctx.fillText('MEDULLA', 0, 95)

      // Active Axial Slicing Plane
      const sliceY = level === 'midbrain' ? -80 : level === 'pons' ? 0 : 90
      const sliceColor = level === 'midbrain' ? '#f43f5e' : level === 'pons' ? '#22d3ee' : '#fbbf24'

      ctx.save()
      ctx.shadowColor = sliceColor
      ctx.shadowBlur = 18
      ctx.beginPath()
      ctx.ellipse(0, sliceY, 95, 24, 0, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? `${sliceColor}33` : `${sliceColor}44`
      ctx.fill()
      ctx.strokeStyle = sliceColor
      ctx.lineWidth = 3
      ctx.setLineDash([6, 4])
      ctx.stroke()
      ctx.restore()

      // Slice label marker
      ctx.fillStyle = sliceColor
      ctx.font = 'bold 10px monospace'
      ctx.fillText(`AXIAL LEVEL: ${level.toUpperCase()}`, 0, sliceY - 30)

      ctx.restore()
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [viewMode, level, rotationAngle, isDark])

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging3D.current = true
    lastMouseX.current = e.clientX
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging3D.current) return
    const delta = e.clientX - lastMouseX.current
    lastMouseX.current = e.clientX
    setRotationAngle(prev => (prev + delta * 0.7) % 360)
  }

  const handleCanvasMouseUp = () => {
    isDragging3D.current = false
  }

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDragging3D.current = true
      lastMouseX.current = e.touches[0].clientX
    }
  }

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging3D.current || e.touches.length !== 1) return
    const delta = e.touches[0].clientX - lastMouseX.current
    lastMouseX.current = e.touches[0].clientX
    setRotationAngle(prev => (prev + delta * 0.7) % 360)
  }

  const handleCanvasTouchEnd = () => {
    isDragging3D.current = false
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 space-y-5 animate-fade-in pb-28">
      {/* Top Atlas Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                Clinical Neuro-Atlas • Brazis 8th Edition
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Chapter 15</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Brainstem Axial Slices & Stroke Simulator
            </h2>
          </div>

          {/* View Mode Switcher (Vector vs Authentic Plate vs 3D Axis) */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('vector')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'vector'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🎨 Vector Slice
            </button>
            <button
              onClick={() => setViewMode('plate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'plate'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              📖 Brazis Plate
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === '3d'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🧊 3D Axis
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
                  setSelectedStructureId(null)
                  setActiveSyndromeId(null)
                  setActiveVesselId(null)
                }}
                className={`py-2.5 px-3 rounded-2xl font-black text-xs uppercase tracking-wider transition active:scale-95 border min-h-[48px] flex flex-col items-center justify-center ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-black'
                    : 'bg-slate-50 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                <span>
                  {lvl === 'medulla' ? '1. Medulla Oblongata' : lvl === 'pons' ? '2. Pons' : '3. Midbrain (Mesencephalon)'}
                </span>
                <span className="text-[10px] font-normal opacity-75 font-mono lowercase">
                  {lvl === 'medulla' ? 'cn ix, x, xii' : lvl === 'pons' ? 'cn v, vi, vii, viii' : 'cn iii, iv'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Overlay Filters (Anatomy vs Vascular Territories vs Clinical Syndromes) */}
        {viewMode === 'vector' && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Overlay Layer:
            </span>
            <button
              onClick={() => {
                setOverlayMode('structures')
                setActiveSyndromeId(null)
                setActiveVesselId(null)
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                overlayMode === 'structures'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              🔬 Anatomical Structures
            </button>
            <button
              onClick={() => {
                setOverlayMode('vascular')
                setActiveSyndromeId(null)
                if (vascularTerritories.length > 0) setActiveVesselId(vascularTerritories[0].id)
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                overlayMode === 'vascular'
                  ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              🩸 Vascular Territories (Angio)
            </button>
            <button
              onClick={() => {
                setOverlayMode('syndromes')
                setActiveVesselId(null)
                if (syndromes.length > 0) handleSelectSyndrome(syndromes[0].id)
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition ${
                overlayMode === 'syndromes'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm font-bold'
                  : 'bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              ⚡ Stroke Syndromes & Lesions
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Visual Canvas (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/80 pb-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {level === 'medulla'
                ? 'Mid-Medulla: Level of Cranial Nerves XII & X'
                : level === 'pons'
                ? 'Caudal Pons: Level of Facial Colliculus & CN VI/VII'
                : 'Upper Midbrain: Level of Superior Colliculus & CN III'}
            </span>
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
              {viewMode === 'vector'
                ? 'Interactive Medical SVG'
                : viewMode === 'plate'
                ? currentPlate.page
                : 'Interactive 3D WebGL/Canvas'}
            </span>
          </div>

          {/* VIEW MODE 1: HIGH-PRECISION VECTOR CROSS SECTION */}
          {viewMode === 'vector' && (
            <div className="w-full aspect-[4/3] max-w-lg relative bg-slate-100 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
              {/* MEDULLA VECTOR SLICE */}
              {level === 'medulla' && (
                <svg viewBox="0 0 500 400" className="w-full h-full select-none transition-all">
                  <defs>
                    <radialGradient id="medulla_pica_grad" cx="25%" cy="50%" r="45%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
                    </radialGradient>
                    <radialGradient id="medulla_asa_grad" cx="50%" cy="75%" r="35%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
                    </radialGradient>
                  </defs>

                  {/* Anatomical Medulla Contour with Olives and Pyramids */}
                  <path
                    d="M 250 45 C 330 45, 430 85, 455 180 C 465 240, 420 295, 335 340 C 295 355, 255 360, 215 355 C 135 340, 90 295, 45 180 C 70 85, 170 45, 250 45 Z"
                    fill={isDark ? '#0b1120' : '#f8fafc'}
                    stroke={isDark ? '#334155' : '#94a3b8'}
                    strokeWidth="3.5"
                  />

                  {/* Fourth Ventricle Rhomboid Fossa / Floor */}
                  <path
                    d="M 170 50 C 210 85, 290 85, 330 50 C 300 70, 200 70, 170 50 Z"
                    fill={isDark ? '#030712' : '#cbd5e1'}
                    stroke={isDark ? '#475569' : '#64748b'}
                    strokeWidth="2"
                  />
                  <line x1="250" y1="50" x2="250" y2="70" stroke={isDark ? '#64748b' : '#475569'} strokeWidth="1.5" strokeDasharray="2" />

                  {/* Vascular Overlays if active */}
                  {overlayMode === 'vascular' && activeVesselId === 'pica' && (
                    <path
                      d="M 55 150 C 50 240, 120 300, 210 260 C 180 180, 150 120, 120 90 Z"
                      fill="url(#medulla_pica_grad)"
                      stroke="#8b5cf6"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  )}

                  {overlayMode === 'vascular' && activeVesselId === 'asa' && (
                    <path
                      d="M 215 90 L 285 90 L 305 350 L 195 350 Z"
                      fill="url(#medulla_asa_grad)"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Stroke Syndrome Highlight Mask */}
                  {overlayMode === 'syndromes' && activeSyndromeId === 'wallenberg' && (
                    <path
                      d="M 55 140 C 50 250, 110 300, 210 260 C 180 180, 160 120, 120 90 Z"
                      fill="#8b5cf6"
                      fillOpacity="0.4"
                      stroke="#c084fc"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                  )}

                  {overlayMode === 'syndromes' && activeSyndromeId === 'dejerine' && (
                    <path
                      d="M 215 90 L 285 90 L 300 350 L 200 350 Z"
                      fill="#ef4444"
                      fillOpacity="0.4"
                      stroke="#f87171"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                  )}

                  {/* 1. Medullary Pyramids (Ventral CST) */}
                  <g
                    onClick={() => setSelectedStructureId('pyramid')}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 195 280 C 195 330, 215 350, 245 350 L 245 270 Z"
                      fill={isHighlighted('pyramid') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('pyramid') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth="2.5"
                      className="transition-colors duration-200"
                    />
                    <path
                      d="M 305 280 C 305 330, 285 350, 255 350 L 255 270 Z"
                      fill={isHighlighted('pyramid') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('pyramid') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth="2.5"
                      className="transition-colors duration-200"
                    />
                    <text x="250" y="320" textAnchor="middle" fill={isHighlighted('pyramid') ? '#ffffff' : isDark ? '#cbd5e1' : '#334155'} fontSize="11" fontWeight="bold">
                      Pyramid (CST)
                    </text>
                  </g>

                  {/* 2. Medial Lemniscus (Tall vertical midline column) */}
                  <g
                    onClick={() => setSelectedStructureId('medial_lemniscus')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="228"
                      y="140"
                      width="44"
                      height="115"
                      rx="8"
                      fill={isHighlighted('medial_lemniscus') ? '#38bdf8' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('medial_lemniscus') ? '#bae6fd' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth="2.5"
                      className="transition-colors duration-200"
                    />
                    <text x="250" y="195" textAnchor="middle" fill={isHighlighted('medial_lemniscus') ? '#0284c7' : isDark ? '#94a3b8' : '#475569'} fontSize="10" fontWeight="bold">
                      Medial Lemniscus
                    </text>
                  </g>

                  {/* 3. Hypoglossal Nucleus & Exiting CN XII Fascicle */}
                  <g
                    onClick={() => setSelectedStructureId('cn12')}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="230"
                      cy="88"
                      r="14"
                      fill={isHighlighted('cn12') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('cn12') ? '#fef08a' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="270"
                      cy="88"
                      r="14"
                      fill={isHighlighted('cn12') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('cn12') ? '#fef08a' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 230 102 L 195 285"
                      stroke={isHighlighted('cn12') ? '#fbbf24' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="3.5"
                      strokeDasharray="4"
                    />
                    <text x="250" y="75" textAnchor="middle" fill={isHighlighted('cn12') ? '#fbbf24' : isDark ? '#fbbf24' : '#b45309'} fontSize="10" fontWeight="bold">
                      CN XII Nucleus
                    </text>
                  </g>

                  {/* 4. Convoluted Inferior Olivary Nucleus Ribbon */}
                  <g
                    onClick={() => setSelectedStructureId('inferior_olive')}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 160 210 Q 140 180 165 170 Q 185 180 180 215 Q 175 250 150 260 Q 130 255 140 230"
                      fill="none"
                      stroke={isHighlighted('inferior_olive') ? '#10b981' : isDark ? '#475569' : '#64748b'}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <text x="140" y="275" textAnchor="middle" fill={isHighlighted('inferior_olive') ? '#10b981' : isDark ? '#a7f3d0' : '#047857'} fontSize="9" fontWeight="bold">
                      Inferior Olive
                    </text>
                  </g>

                  {/* 5. Nucleus Ambiguus (Deep in reticular formation) */}
                  <g
                    onClick={() => setSelectedStructureId('nucleus_ambiguus')}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="145"
                      cy="150"
                      r="15"
                      fill={isHighlighted('nucleus_ambiguus') ? '#a855f7' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('nucleus_ambiguus') ? '#d8b4fe' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="145" y="154" textAnchor="middle" fill={isHighlighted('nucleus_ambiguus') ? '#ffffff' : isDark ? '#d8b4fe' : '#6b21a8'} fontSize="8" fontWeight="bold">
                      Ambiguus
                    </text>
                  </g>

                  {/* 6. Spinal Trigeminal Nucleus & Tract (CN V) */}
                  <g
                    onClick={() => setSelectedStructureId('spinal_trigeminal')}
                    className="cursor-pointer group"
                  >
                    <ellipse
                      cx="95"
                      cy="160"
                      rx="20"
                      ry="28"
                      fill={isHighlighted('spinal_trigeminal') ? '#ec4899' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('spinal_trigeminal') ? '#fbcfe8' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="95" y="164" textAnchor="middle" fill={isHighlighted('spinal_trigeminal') ? '#ffffff' : isDark ? '#fbcfe8' : '#be185d'} fontSize="9" fontWeight="bold">
                      Spinal V
                    </text>
                  </g>

                  {/* 7. Spinothalamic Tract */}
                  <g
                    onClick={() => setSelectedStructureId('spinothalamic')}
                    className="cursor-pointer group"
                  >
                    <polygon
                      points="85,215 125,215 105,255"
                      fill={isHighlighted('spinothalamic') ? '#06b6d4' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('spinothalamic') ? '#a5f3fc' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="105" y="235" textAnchor="middle" fill={isHighlighted('spinothalamic') ? '#083344' : isDark ? '#a5f3fc' : '#0e7490'} fontSize="8" fontWeight="bold">
                      Spinothal.
                    </text>
                  </g>

                  {/* 8. Restiform Body (Inferior Cerebellar Peduncle) */}
                  <g
                    onClick={() => setSelectedStructureId('restiform_body')}
                    className="cursor-pointer group"
                  >
                    <ellipse
                      cx="115"
                      cy="95"
                      rx="26"
                      ry="24"
                      fill={isHighlighted('restiform_body') ? '#10b981' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('restiform_body') ? '#a7f3d0' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="115" y="99" textAnchor="middle" fill={isHighlighted('restiform_body') ? '#064e3b' : isDark ? '#a7f3d0' : '#047857'} fontSize="9" fontWeight="bold">
                      Restiform
                    </text>
                  </g>

                  {/* 9. Descending Sympathetic Tract */}
                  <g
                    onClick={() => setSelectedStructureId('sympathetic')}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="115"
                      cy="268"
                      r="12"
                      fill={isHighlighted('sympathetic') ? '#eab308' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('sympathetic') ? '#fef08a' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="115" y="272" textAnchor="middle" fill={isHighlighted('sympathetic') ? '#713f12' : isDark ? '#fef08a' : '#854d0e'} fontSize="8" fontWeight="bold">
                      Symp
                    </text>
                  </g>
                </svg>
              )}

              {/* PONS VECTOR SLICE */}
              {level === 'pons' && (
                <svg viewBox="0 0 500 400" className="w-full h-full select-none transition-all">
                  <defs>
                    <radialGradient id="pons_basilar_grad" cx="50%" cy="75%" r="45%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
                    </radialGradient>
                    <radialGradient id="pons_aica_grad" cx="20%" cy="50%" r="40%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
                    </radialGradient>
                  </defs>

                  {/* Caudal Pons Contour */}
                  <path
                    d="M 100 95 C 160 55, 340 55, 400 95 C 465 145, 475 250, 440 310 C 390 365, 305 385, 250 385 C 195 385, 110 365, 60 310 C 25 250, 35 145, 100 95 Z"
                    fill={isDark ? '#0b1120' : '#f8fafc'}
                    stroke={isDark ? '#334155' : '#94a3b8'}
                    strokeWidth="3.5"
                  />

                  {/* 4th Ventricle Floor with Facial Colliculi Bulges */}
                  <path
                    d="M 150 90 C 200 130, 225 130, 250 110 C 275 130, 300 130, 350 90 Z"
                    fill={isDark ? '#030712' : '#cbd5e1'}
                    stroke={isDark ? '#475569' : '#64748b'}
                    strokeWidth="2"
                  />

                  {/* Vascular / Syndrome Highlights */}
                  {overlayMode === 'vascular' && activeVesselId === 'basilar_paramedian' && (
                    <path
                      d="M 160 110 L 340 110 L 320 380 L 180 380 Z"
                      fill="url(#pons_basilar_grad)"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  )}

                  {overlayMode === 'vascular' && activeVesselId === 'aica' && (
                    <path
                      d="M 45 150 C 50 290, 150 340, 180 250 C 140 180, 120 120, 80 110 Z"
                      fill="url(#pons_aica_grad)"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* 1. Basis Pontis (Corticospinal bundles) */}
                  <g
                    onClick={() => setSelectedStructureId('basis_corticospinal')}
                    className="cursor-pointer group"
                  >
                    <rect
                      x="160"
                      y="265"
                      width="180"
                      height="95"
                      rx="20"
                      fill={isHighlighted('basis_corticospinal') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('basis_corticospinal') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="250" y="315" textAnchor="middle" fill={isHighlighted('basis_corticospinal') ? '#ffffff' : isDark ? '#fda4af' : '#991b1b'} fontSize="12" fontWeight="bold">
                      Basis Pontis (CST)
                    </text>
                  </g>

                  {/* 2. Abducens Nucleus (CN VI) */}
                  <g
                    onClick={() => setSelectedStructureId('cn6_nucleus')}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="225"
                      cy="125"
                      r="16"
                      fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('cn6_nucleus') ? '#fef08a' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="275"
                      cy="125"
                      r="16"
                      fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('cn6_nucleus') ? '#fef08a' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="250" y="110" textAnchor="middle" fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : isDark ? '#fbbf24' : '#b45309'} fontSize="9" fontWeight="bold">
                      VI Nucleus (PPRF)
                    </text>
                  </g>

                  {/* 3. Facial Nerve (CN VII) internal genu & loop */}
                  <g
                    onClick={() => setSelectedStructureId('cn7_nucleus_genu')}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 165 195 Q 190 100 225 105 Q 245 105 240 145 L 175 270"
                      fill="none"
                      stroke={isHighlighted('cn7_nucleus_genu') ? '#10b981' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="4.5"
                      strokeDasharray="4"
                    />
                    <circle
                      cx="165"
                      cy="200"
                      r="16"
                      fill={isHighlighted('cn7_nucleus_genu') ? '#10b981' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('cn7_nucleus_genu') ? '#a7f3d0' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="165" y="204" textAnchor="middle" fill={isHighlighted('cn7_nucleus_genu') ? '#ffffff' : isDark ? '#a7f3d0' : '#047857'} fontSize="9" fontWeight="bold">
                      VII Nu.
                    </text>
                  </g>

                  {/* 4. Exiting CN VI Fascicle */}
                  <g
                    onClick={() => setSelectedStructureId('cn6_fascicle')}
                    className="cursor-pointer group"
                  >
                    <line x1="225" y1="140" x2="200" y2="365" stroke={isHighlighted('cn6_fascicle') ? '#fbbf24' : isDark ? '#475569' : '#94a3b8'} strokeWidth="4.5" />
                    <text x="195" y="380" textAnchor="middle" fill={isHighlighted('cn6_fascicle') ? '#fbbf24' : isDark ? '#fbbf24' : '#b45309'} fontSize="10" fontWeight="bold">
                      CN VI
                    </text>
                  </g>

                  {/* 5. Middle Cerebellar Peduncle (Brachium Pontis) */}
                  <g
                    onClick={() => setSelectedStructureId('brachium_pontis')}
                    className="cursor-pointer group"
                  >
                    <ellipse
                      cx="75"
                      cy="215"
                      rx="38"
                      ry="58"
                      fill={isHighlighted('brachium_pontis') ? '#a855f7' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('brachium_pontis') ? '#d8b4fe' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="75" y="215" textAnchor="middle" fill={isHighlighted('brachium_pontis') ? '#ffffff' : isDark ? '#d8b4fe' : '#6b21a8'} fontSize="9" fontWeight="bold">
                      Brachium
                    </text>
                    <text x="75" y="228" textAnchor="middle" fill={isHighlighted('brachium_pontis') ? '#ffffff' : isDark ? '#d8b4fe' : '#6b21a8'} fontSize="9" fontWeight="bold">
                      Pontis (MCP)
                    </text>
                  </g>

                  {/* 6. Medial Longitudinal Fasciculus (MLF) */}
                  <g
                    onClick={() => setSelectedStructureId('mlf')}
                    className="cursor-pointer group"
                  >
                    <ellipse
                      cx="250"
                      cy="150"
                      rx="14"
                      ry="10"
                      fill={isHighlighted('mlf') ? '#38bdf8' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('mlf') ? '#bae6fd' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="250" y="153" textAnchor="middle" fill={isHighlighted('mlf') ? '#0284c7' : isDark ? '#bae6fd' : '#0369a1'} fontSize="8" fontWeight="bold">
                      MLF
                    </text>
                  </g>
                </svg>
              )}

              {/* MIDBRAIN VECTOR SLICE */}
              {level === 'midbrain' && (
                <svg viewBox="0 0 500 400" className="w-full h-full select-none transition-all">
                  {/* Midbrain Contour with Tectum Colliculi and Peduncles */}
                  <path
                    d="M 120 100 Q 250 45 380 100 C 440 140, 455 230, 425 295 C 385 360, 305 360, 250 305 C 195 360, 115 360, 75 295 C 45 230, 60 140, 120 100 Z"
                    fill={isDark ? '#0b1120' : '#f8fafc'}
                    stroke={isDark ? '#334155' : '#94a3b8'}
                    strokeWidth="3.5"
                  />

                  {/* Cerebral Aqueduct of Sylvius */}
                  <circle cx="250" cy="120" r="14" fill={isDark ? '#030712' : '#cbd5e1'} stroke={isDark ? '#64748b' : '#475569'} strokeWidth="2.5" />
                  <text x="250" y="100" textAnchor="middle" fill={isDark ? '#94a3b8' : '#475569'} fontSize="10">Aqueduct of Sylvius</text>

                  {/* 1. Crus Cerebri (Left & Right Cerebral Peduncles) */}
                  <g
                    onClick={() => setSelectedStructureId('crus_cerebri')}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 80 270 C 105 325, 170 340, 215 295 L 190 240 C 140 255, 100 245, 80 270 Z"
                      fill={isHighlighted('crus_cerebri') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('crus_cerebri') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 420 270 C 395 325, 330 340, 285 295 L 310 240 C 360 255, 400 245, 420 270 Z"
                      fill={isHighlighted('crus_cerebri') ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('crus_cerebri') ? '#fda4af' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="145" y="300" textAnchor="middle" fill={isHighlighted('crus_cerebri') ? '#ffffff' : isDark ? '#fda4af' : '#991b1b'} fontSize="11" fontWeight="bold">
                      Crus Cerebri (CST)
                    </text>
                  </g>

                  {/* 2. Substantia Nigra (Pigmented crescent) */}
                  <g
                    onClick={() => setSelectedStructureId('substantia_nigra')}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 115 245 Q 165 230 205 220 L 195 205 Q 150 215 105 230 Z"
                      fill={isHighlighted('substantia_nigra') ? '#a855f7' : isDark ? '#334155' : '#cbd5e1'}
                      stroke={isHighlighted('substantia_nigra') ? '#d8b4fe' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2"
                    />
                    <text x="150" y="230" textAnchor="middle" fill={isHighlighted('substantia_nigra') ? '#ffffff' : isDark ? '#d8b4fe' : '#6b21a8'} fontSize="8" fontWeight="bold">
                      Subst. Nigra
                    </text>
                  </g>

                  {/* 3. Red Nucleus (Large vascular rubral round nucleus) */}
                  <g
                    onClick={() => setSelectedStructureId('red_nucleus')}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="195"
                      cy="175"
                      r="24"
                      fill={isHighlighted('red_nucleus') ? '#ef4444' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('red_nucleus') ? '#fca5a5' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="305"
                      cy="175"
                      r="24"
                      fill={isHighlighted('red_nucleus') ? '#ef4444' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('red_nucleus') ? '#fca5a5' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="195" y="179" textAnchor="middle" fill={isHighlighted('red_nucleus') ? '#ffffff' : isDark ? '#fca5a5' : '#b91c1c'} fontSize="10" fontWeight="bold">
                      Red Nu.
                    </text>
                  </g>

                  {/* 4. CN III Oculomotor Complex & Fascicles */}
                  <g
                    onClick={() => setSelectedStructureId('cn3_complex')}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="250"
                      cy="148"
                      r="15"
                      fill={isHighlighted('cn3_complex') ? '#fbbf24' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('cn3_complex') ? '#fef08a' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <line x1="245" y1="160" x2="225" y2="300" stroke={isHighlighted('cn3_complex') ? '#fbbf24' : isDark ? '#64748b' : '#94a3b8'} strokeWidth="4" strokeDasharray="4" />
                    <text x="250" y="152" textAnchor="middle" fill={isHighlighted('cn3_complex') ? '#713f12' : isDark ? '#fef08a' : '#854d0e'} fontSize="9" fontWeight="bold">
                      III Nu.
                    </text>
                    <text x="225" y="315" textAnchor="middle" fill={isHighlighted('cn3_complex') ? '#fbbf24' : isDark ? '#fbbf24' : '#b45309'} fontSize="10" fontWeight="bold">
                      CN III
                    </text>
                  </g>

                  {/* 5. Superior Colliculus / Pretectal Tectum */}
                  <g
                    onClick={() => setSelectedStructureId('superior_colliculus')}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 175 70 Q 250 45 325 70 Q 250 100 175 70 Z"
                      fill={isHighlighted('superior_colliculus') ? '#ec4899' : isDark ? '#1e293b' : '#e2e8f0'}
                      stroke={isHighlighted('superior_colliculus') ? '#fbcfe8' : isDark ? '#64748b' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                    <text x="250" y="65" textAnchor="middle" fill={isHighlighted('superior_colliculus') ? '#ffffff' : isDark ? '#fbcfe8' : '#be185d'} fontSize="9" fontWeight="bold">
                      Superior Colliculus (Pretectum)
                    </text>
                  </g>
                </svg>
              )}
            </div>
          )}

          {/* VIEW MODE 2: AUTHENTIC BRAZIS BOOK PLATE */}
          {viewMode === 'plate' && (
            <div className="w-full space-y-3">
              <div
                onClick={() => setIsZoomingPlate(z => !z)}
                className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black/90 cursor-zoom-in transition-all ${
                  isZoomingPlate ? 'h-[500px]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={currentPlate.image}
                  alt={currentPlate.title}
                  className="w-full h-full object-contain p-2 select-none"
                />
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md text-[11px] text-white font-mono">
                  {isZoomingPlate ? 'Tap to Shrink' : 'Tap to Enlarge'}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  {currentPlate.title} ({currentPlate.page})
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentPlate.subtitle}
                </p>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: INTERACTIVE 3D BRAINSTEM CANVAS */}
          {viewMode === '3d' && (
            <div className="w-full flex flex-col items-center space-y-3">
              <div className="relative w-full aspect-[4/3] max-w-md rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={320}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onTouchStart={handleCanvasTouchStart}
                  onTouchMove={handleCanvasTouchMove}
                  onTouchEnd={handleCanvasTouchEnd}
                  className="w-full h-full cursor-grab active:cursor-grabbing select-none"
                />
                <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-black/60 backdrop-blur-md py-1 rounded-xl">
                  Drag left/right to rotate 3D brainstem • Active slice illuminates current axial level
                </div>
              </div>
            </div>
          )}

          {/* Quick Color Legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
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
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span> Cerebellar / Coordination
            </span>
          </div>
        </div>

        {/* Right Column: Structure Detail & Clinical Syndromes Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Structure Inspection Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Structure Inspection
              </h3>
              {selectedStructure && (
                <button
                  onClick={() => setSelectedStructureId(null)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {selectedStructure ? (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-800">
                    {selectedStructure.zone}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 mt-1">
                    {selectedStructure.name}
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Function:</span>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedStructure.function}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">Clinical Deficit:</span>
                    <span className="text-rose-900 dark:text-rose-200 leading-relaxed font-medium">{selectedStructure.deficit}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/60">
                    <span className="font-bold text-cyan-800 dark:text-cyan-300 block mb-0.5">Vascular Supply:</span>
                    <span className="text-cyan-900 dark:text-cyan-200">{selectedStructure.bloodSupply}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center italic">
                Tap any structure or tract in the cross-section to view its exact neuroanatomy, clinical deficit, and vascular supply.
              </p>
            )}
          </div>

          {/* Vascular Territories Card (When in Vascular Mode) */}
          {overlayMode === 'vascular' && (
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Arterial Supply Territories
              </h3>
              <div className="space-y-2">
                {vascularTerritories.map(v => {
                  const isSelected = activeVesselId === v.id
                  return (
                    <div
                      key={v.id}
                      onClick={() => handleSelectVessel(v.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer select-none space-y-1.5 ${
                        isSelected
                          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 ring-1 ring-rose-500/30 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">{v.name}</span>
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: v.color }}
                        ></span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Syndromes List for this Level */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Brainstem Stroke Syndromes
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Tap to highlight lesion</span>
            </div>

            <div className="space-y-2.5">
              {syndromes.map(syn => {
                const isActive = activeSyndromeId === syn.id
                return (
                  <div
                    key={syn.id}
                    onClick={() => handleSelectSyndrome(syn.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer select-none space-y-1.5 ${
                      isActive
                        ? 'bg-amber-50 dark:bg-cyan-950/70 border-amber-500 dark:border-cyan-500 shadow-md ring-1 ring-amber-500/30 dark:ring-cyan-500/30'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-slate-100">{syn.eponym}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-cyan-300">
                        {syn.vessel.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                      {syn.triad}
                    </p>

                    {isActive && (
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px] animate-fade-in">
                        <div className="text-amber-800 dark:text-amber-300">
                          <span className="font-bold">Culprit Vessel:</span> {syn.vessel}
                        </div>
                        <div className="text-emerald-800 dark:text-emerald-300 font-medium">
                          <span className="font-bold">Brazis Clinical Pearl:</span> {syn.keyDifferentiator}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Source: {syn.brazisReference}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
