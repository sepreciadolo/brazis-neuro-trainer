import { useState } from 'react'

export type BrainstemLevel = 'medulla' | 'pons' | 'midbrain'

interface AnatomicalStructure {
  id: string
  name: string
  function: string
  deficit: string
  bloodSupply: string
  side?: 'medial' | 'lateral' | 'ventral' | 'dorsal'
}

interface SyndromeOverlay {
  id: string
  name: string
  eponym: string
  vessel: string
  structuresInvolved: string[]
  triad: string
  keyDifferentiator: string
}

const MEDULLA_STRUCTURES: Record<string, AnatomicalStructure> = {
  pyramid: {
    id: 'pyramid',
    name: 'Medullary Pyramid (Corticospinal Tract)',
    function: 'Carries descending voluntary motor fibers to contralateral extremities.',
    deficit: 'Contralateral hemiplegia (sparing the face).',
    bloodSupply: 'Anterior spinal artery / Paramedian branches of vertebral artery'
  },
  medial_lemniscus: {
    id: 'medial_lemniscus',
    name: 'Medial Lemniscus',
    function: 'Carries crossed sensory fibers for joint position, vibration, and fine touch.',
    deficit: 'Contralateral loss of vibration and joint position sense.',
    bloodSupply: 'Anterior spinal artery / Paramedian bulbar branches'
  },
  cn12: {
    id: 'cn12',
    name: 'Hypoglossal Nucleus & Exiting Fascicle (CN XII)',
    function: 'Motor innervation to all intrinsic and most extrinsic muscles of the tongue.',
    deficit: 'Ipsilateral tongue weakness, atrophy, and fasciculations; tongue deviates toward the side of the lesion.',
    bloodSupply: 'Anterior spinal artery'
  },
  nucleus_ambiguus: {
    id: 'nucleus_ambiguus',
    name: 'Nucleus Ambiguus (Motor CN IX & X)',
    function: 'Branchiomeric motor neurons for pharyngeal, laryngeal, and vocal cord muscles.',
    deficit: 'Ipsilateral palatal droop, absent gag reflex, hoarseness, and severe dysphagia.',
    bloodSupply: 'Posterior inferior cerebellar artery (PICA) / Vertebral artery'
  },
  spinal_trigeminal: {
    id: 'spinal_trigeminal',
    name: 'Spinal Trigeminal Tract & Nucleus (CN V)',
    function: 'Carries pain and temperature sensation from the ipsilateral face.',
    deficit: 'Ipsilateral facial loss of pain and temperature sensation.',
    bloodSupply: 'PICA / Lateral bulbar branches'
  },
  spinothalamic: {
    id: 'spinothalamic',
    name: 'Spinothalamic Tract (Anterolateral System)',
    function: 'Ascending pain and temperature pathway from contralateral body.',
    deficit: 'Contralateral loss of pain and temperature over trunk and extremities.',
    bloodSupply: 'PICA'
  },
  restiform_body: {
    id: 'restiform_body',
    name: 'Inferior Cerebellar Peduncle (Restiform Body)',
    function: 'Connects spinal cord and medullary olivary nuclei to the cerebellum.',
    deficit: 'Ipsilateral cerebellar limb and gait ataxia, ocular ipsipulsion.',
    bloodSupply: 'PICA'
  },
  sympathetic: {
    id: 'sympathetic',
    name: 'Descending Hypothalamospinal Sympathetic Fibers',
    function: 'First-order pupillomotor and sudomotor sympathetic pathway.',
    deficit: 'Ipsilateral Horner syndrome (ptosis, miosis, anhidrosis).',
    bloodSupply: 'PICA'
  },
  vestibular: {
    id: 'vestibular',
    name: 'Vestibular Nuclei (Medial & Inferior)',
    function: 'Coordinates balance, vestibulo-ocular reflexes, and spatial orientation.',
    deficit: 'Vertigo, vomiting, horizontal-torsional nystagmus, and skew deviation.',
    bloodSupply: 'PICA'
  }
}

const PONS_STRUCTURES: Record<string, AnatomicalStructure> = {
  basis_corticospinal: {
    id: 'basis_corticospinal',
    name: 'Basis Pontis (Corticospinal Bundles)',
    function: 'Descending pyramidal tract fibers interspersed between pontine nuclei.',
    deficit: 'Contralateral hemiplegia; dysarthria-clumsy hand or ataxic hemiparesis if small lacunar lesion.',
    bloodSupply: 'Paramedian branches of basilar artery'
  },
  cn6_fascicle: {
    id: 'cn6_fascicle',
    name: 'Abducens Nerve Fascicles (CN VI)',
    function: 'Motor innervation to ipsilateral lateral rectus muscle.',
    deficit: 'Ipsilateral lateral rectus palsy with horizontal diplopia worse on looking toward lesion.',
    bloodSupply: 'Paramedian branches of basilar artery'
  },
  cn6_nucleus: {
    id: 'cn6_nucleus',
    name: 'Abducens Nucleus & PPRF',
    function: 'Horizontal gaze center coordinating ipsilateral CN VI and contralateral CN III via MLF.',
    deficit: 'Ipsilateral conjugate horizontal gaze palsy (neither eye moves toward lesion side).',
    bloodSupply: 'Circumferential branches of basilar artery'
  },
  cn7_fascicle: {
    id: 'cn7_fascicle',
    name: 'Facial Nerve Fascicle & Internal Genu (CN VII)',
    function: 'Motor innervation to all ipsilateral facial expression muscles (loops around CN VI nucleus).',
    deficit: 'Complete ipsilateral peripheral facial paralysis (both upper forehead and lower face).',
    bloodSupply: 'Short & long circumferential branches / AICA'
  },
  brachium_pontis: {
    id: 'brachium_pontis',
    name: 'Middle Cerebellar Peduncle (Brachium Pontis)',
    function: 'Massive crossing corticopontocerebellar pathway connecting pons to cerebellum.',
    deficit: 'Ipsilateral cerebellar hemiataxia.',
    bloodSupply: 'Anterior inferior cerebellar artery (AICA)'
  },
  mlf: {
    id: 'mlf',
    name: 'Medial Longitudinal Fasciculus (MLF)',
    function: 'Interconnects vestibular and ocular motor nuclei (VI to contralateral III).',
    deficit: 'Internuclear ophthalmoplegia (INO): adduction lag of ipsilateral eye with contralateral abducting nystagmus.',
    bloodSupply: 'Paramedian branches of basilar artery'
  }
}

const MIDBRAIN_STRUCTURES: Record<string, AnatomicalStructure> = {
  crus_cerebri: {
    id: 'crus_cerebri',
    name: 'Crus Cerebri / Cerebral Peduncle (Middle 3/5)',
    function: 'Corticospinal and corticobulbar motor fibers from cerebral cortex.',
    deficit: 'Contralateral hemiplegia including lower face (central facial paresis).',
    bloodSupply: 'Peduncular branches of posterior cerebral artery'
  },
  cn3_fascicles: {
    id: 'cn3_fascicles',
    name: 'Oculomotor Nerve Fascicles (CN III)',
    function: 'Somatic motor to medial rectus, superior rectus, inferior rectus, inferior oblique; parasympathetics to pupil sphincter.',
    deficit: 'Ipsilateral oculomotor palsy (eye deviated down and out, severe ptosis, dilated unreactive pupil).',
    bloodSupply: 'Paramedian / peduncular branches of posterior cerebral artery'
  },
  red_nucleus: {
    id: 'red_nucleus',
    name: 'Red Nucleus (Nucleus Ruber)',
    function: 'Relay in cerebello-rubro-thalamic circuit; coordination of fine movements.',
    deficit: 'Contralateral coarse intention tremor, chorea, and hemiataxia.',
    bloodSupply: 'Thalamoperforating & paramedian branches of PCA'
  },
  brachium_conjunctivum: {
    id: 'brachium_conjunctivum',
    name: 'Superior Cerebellar Peduncle Decussation',
    function: 'Major efferent cerebellar pathway projecting to red nucleus and thalamus.',
    deficit: 'Contralateral cerebellar ataxia, dyssynergia, dysmetria without involuntary movements.',
    bloodSupply: 'Superior cerebellar artery / PCA'
  },
  substantia_nigra: {
    id: 'substantia_nigra',
    name: 'Substantia Nigra',
    function: 'Dopaminergic modulation of basal ganglia circuits.',
    deficit: 'Contralateral involuntary movements / tremors.',
    bloodSupply: 'Peduncular branches of PCA'
  },
  pretectal_area: {
    id: 'pretectal_area',
    name: 'Pretectal Area & Posterior Commissure (Tectum)',
    function: 'Coordinates vertical conjugate gaze and pupillary light reflex fibers.',
    deficit: 'Parinaud syndrome: upward gaze paralysis, light-near pupillary dissociation, convergence-retraction nystagmus, Collier lid retraction.',
    bloodSupply: 'Quadrigeminal & posterior choroidal arteries'
  }
}

const SYNDROMES_BY_LEVEL: Record<BrainstemLevel, SyndromeOverlay[]> = {
  medulla: [
    {
      id: 'wallenberg',
      name: 'Lateral Medullary Syndrome',
      eponym: 'Wallenberg Syndrome',
      vessel: 'PICA or Intracranial Vertebral Artery',
      structuresInvolved: ['nucleus_ambiguus', 'spinal_trigeminal', 'spinothalamic', 'restiform_body', 'sympathetic', 'vestibular'],
      triad: 'Crossed analgesia (face vs body) + Ipsilateral Horner + Dysphagia/Hoarseness + Ataxia',
      keyDifferentiator: 'Spares pyramids (no limb motor hemiplegia) and spares tongue.'
    },
    {
      id: 'dejerine',
      name: 'Medial Medullary Syndrome',
      eponym: 'Dejerine Anterior Bulbar Syndrome',
      vessel: 'Anterior Spinal Artery or Paramedian Vertebral Branches',
      structuresInvolved: ['pyramid', 'medial_lemniscus', 'cn12'],
      triad: 'Ipsilateral tongue paralysis + Contralateral hemiplegia (face spared) + Contralateral vibration loss',
      keyDifferentiator: 'Affects medial triad (Pyramid, Lemniscus, XII); completely spares pain & temperature.'
    },
    {
      id: 'opalski',
      name: 'Opalski Submedullary Syndrome',
      eponym: 'Opalski Syndrome',
      vessel: 'Vertebral Artery penetrating branch at cervicomedullary junction',
      structuresInvolved: ['spinal_trigeminal', 'spinothalamic', 'sympathetic', 'pyramid'],
      triad: 'Wallenberg syndrome features PLUS Ipsilateral spastic hemiparesis',
      keyDifferentiator: 'Lesion extends caudally BELOW pyramidal decussation, damaging crossed motor fibers to the ipsilateral side.'
    }
  ],
  pons: [
    {
      id: 'millard_gubler',
      name: 'Ventral Inferior Pontine Syndrome',
      eponym: 'Millard-Gubler Syndrome',
      vessel: 'Short circumferential & paramedian basilar branches',
      structuresInvolved: ['basis_corticospinal', 'cn6_fascicle', 'cn7_fascicle'],
      triad: 'Ipsilateral CN VI palsy + Ipsilateral complete peripheral CN VII palsy + Contralateral hemiplegia',
      keyDifferentiator: 'Isolated sixth nerve palsy (horizontal gaze to other side intact) + peripheral facial palsy.'
    },
    {
      id: 'raymond',
      name: 'Alternating Abducens Hemiplegia',
      eponym: 'Raymond Syndrome',
      vessel: 'Paramedian basilar branches',
      structuresInvolved: ['basis_corticospinal', 'cn6_fascicle'],
      triad: 'Ipsilateral CN VI palsy + Contralateral hemiplegia (with central facial paresis)',
      keyDifferentiator: 'Spares the facial motor nucleus/fascicle (no peripheral lower-motor-neuron facial palsy).'
    },
    {
      id: 'foville',
      name: 'Dorsal Caudal Pontine Tegmental Syndrome',
      eponym: 'Foville Syndrome',
      vessel: 'Circumferential basilar branches',
      structuresInvolved: ['cn6_nucleus', 'cn7_fascicle', 'basis_corticospinal'],
      triad: 'Conjugate horizontal gaze palsy toward lesion + Ipsilateral CN VII palsy + Contralateral hemiplegia',
      keyDifferentiator: 'Conjugate horizontal gaze palsy (PPRF/VI nucleus involved: neither eye looks toward lesion).'
    },
    {
      id: 'locked_in',
      name: 'Locked-In Syndrome (De-efferented State)',
      eponym: 'Locked-In Syndrome',
      vessel: 'Bilateral mid-basilar artery occlusion',
      structuresInvolved: ['basis_corticospinal', 'cn6_fascicle'],
      triad: 'Quadriplegia + Aphonia + Preserved consciousness + Intact vertical eye movements and blinking',
      keyDifferentiator: 'Bilateral basis pontis destroyed; tegmentum & ascending reticular activating system (SRAA) spared.'
    }
  ],
  midbrain: [
    {
      id: 'weber',
      name: 'Ventral Mesencephalic Syndrome',
      eponym: 'Weber Syndrome',
      vessel: 'Peduncular branches of Posterior Cerebral Artery',
      structuresInvolved: ['crus_cerebri', 'cn3_fascicles'],
      triad: 'Ipsilateral CN III palsy (dilated pupil, ptosis) + Contralateral spastic hemiplegia (including lower face)',
      keyDifferentiator: 'Pure pyramidal weakness combined with third nerve palsy; no tremor or ataxia.'
    },
    {
      id: 'benedikt',
      name: 'Dorsal/Tegmental Oculomotor Syndrome',
      eponym: 'Benedikt Syndrome',
      vessel: 'Thalamoperforating / paramedian branches of PCA',
      structuresInvolved: ['cn3_fascicles', 'red_nucleus', 'substantia_nigra', 'crus_cerebri'],
      triad: 'Ipsilateral CN III palsy + Contralateral coarse intention tremor & choreoathetosis + Mild hemiparesis',
      keyDifferentiator: 'Involvement of Red Nucleus and Substantia Nigra produces involuntary movements/chorea/rubral tremor.'
    },
    {
      id: 'claude',
      name: 'Dorsal Tegmental Cerebellar Syndrome',
      eponym: 'Claude Syndrome',
      vessel: 'Paramedian branches of PCA / Superior cerebellar artery',
      structuresInvolved: ['cn3_fascicles', 'brachium_conjunctivum'],
      triad: 'Ipsilateral CN III palsy + Contralateral pure cerebellar hemiataxia/asynergia',
      keyDifferentiator: 'Pure cerebellar kinetic ataxia without tremor, hemiballismus, or pyramidal weakness.'
    },
    {
      id: 'parinaud',
      name: 'Dorsal Mesencephalic / Pretectal Syndrome',
      eponym: 'Parinaud (Sylvian Aqueduct) Syndrome',
      vessel: 'Pineal region tumor compression / Hydrocephalus / Quadrigeminal ischemia',
      structuresInvolved: ['pretectal_area'],
      triad: 'Supranuclear upward gaze palsy + Light-near pupillary dissociation + Convergence-retraction nystagmus',
      keyDifferentiator: 'Affects dorsal pretectal tectum; vertical conjugate gaze and Collier lid retraction.'
    }
  ]
}

export function BrainstemCrossSectionViewer() {
  const [level, setLevel] = useState<BrainstemLevel>('medulla')
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null)
  const [activeSyndromeId, setActiveSyndromeId] = useState<string | null>(null)

  const structures = level === 'medulla'
    ? MEDULLA_STRUCTURES
    : level === 'pons'
    ? PONS_STRUCTURES
    : MIDBRAIN_STRUCTURES

  const syndromes = SYNDROMES_BY_LEVEL[level]

  const activeSyndrome = syndromes.find(s => s.id === activeSyndromeId)
  const selectedStructure = selectedStructureId ? structures[selectedStructureId] : null

  const handleSelectSyndrome = (synId: string) => {
    if (activeSyndromeId === synId) {
      setActiveSyndromeId(null)
      setSelectedStructureId(null)
    } else {
      setActiveSyndromeId(synId)
      const syn = syndromes.find(s => s.id === synId)
      if (syn && syn.structuresInvolved.length > 0) {
        setSelectedStructureId(syn.structuresInvolved[0])
      }
    }
  }

  const isHighlighted = (structId: string) => {
    if (selectedStructureId === structId) return true
    if (activeSyndrome && activeSyndrome.structuresInvolved.includes(structId)) return true
    return false
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-5 animate-fade-in pb-24">
      {/* Header & Level Selector */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Interactive Cross-Section Atlas • Brazis Chapter 15
          </span>
          <span className="text-xs text-slate-400 font-mono">Dynamic Lesion Pinpointer</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">
          Brainstem Axial Slice & Lesion Simulator
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Tap anatomical structures or select clinical syndromes to explore lesion territories, vascular supply, and pathognomonic neurological deficits.
        </p>

        {/* Level Tabs */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {(['medulla', 'pons', 'midbrain'] as BrainstemLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl)
                setSelectedStructureId(null)
                setActiveSyndromeId(null)
              }}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition active:scale-95 border min-h-[44px] ${
                level === lvl
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white'
              }`}
            >
              {lvl === 'medulla' ? '1. Medulla (Bulbo)' : lvl === 'pons' ? '2. Pons (Puente)' : '3. Midbrain (Mesencéfalo)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Schematic Section (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
            <span className="font-semibold text-slate-200">
              {level === 'medulla'
                ? 'Mid-Medulla (Level of CN XII & X)'
                : level === 'pons'
                ? 'Caudal Pons (Level of CN VI & VII)'
                : 'Upper Midbrain (Level of Superior Colliculus)'}
            </span>
            <span className="text-[11px] text-cyan-400">Click any structure to inspect</span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="w-full aspect-[4/3] max-w-md relative bg-slate-950/80 rounded-2xl border border-slate-850 p-3 flex items-center justify-center">
            {level === 'medulla' && (
              <svg viewBox="0 0 400 320" className="w-full h-full select-none">
                {/* Medulla contour */}
                <path
                  d="M 200 40 C 260 40, 340 80, 360 160 C 370 210, 330 260, 260 290 C 230 300, 200 305, 170 300 C 100 280, 40 230, 40 160 C 50 80, 140 40, 200 40 Z"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="3"
                />

                {/* Central canal / 4th ventricle */}
                <ellipse cx="200" cy="80" rx="35" ry="15" fill="#030712" stroke="#4b5563" strokeWidth="2" />

                {/* Pyramids (Ventral) */}
                <g
                  onClick={() => setSelectedStructureId('pyramid')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 150 240 C 150 270, 170 290, 195 290 L 195 230 Z"
                    fill={isHighlighted('pyramid') ? '#f43f5e' : '#1f2937'}
                    stroke={isHighlighted('pyramid') ? '#fda4af' : '#4b5563'}
                    strokeWidth="2"
                    className="transition-colors duration-200"
                  />
                  <path
                    d="M 250 240 C 250 270, 230 290, 205 290 L 205 230 Z"
                    fill={isHighlighted('pyramid') ? '#f43f5e' : '#1f2937'}
                    stroke={isHighlighted('pyramid') ? '#fda4af' : '#4b5563'}
                    strokeWidth="2"
                    className="transition-colors duration-200"
                  />
                  <text x="200" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Pyramid</text>
                </g>

                {/* Medial Lemniscus */}
                <g
                  onClick={() => setSelectedStructureId('medial_lemniscus')}
                  className="cursor-pointer group"
                >
                  <rect
                    x="180"
                    y="130"
                    width="40"
                    height="90"
                    rx="6"
                    fill={isHighlighted('medial_lemniscus') ? '#38bdf8' : '#1e293b'}
                    stroke={isHighlighted('medial_lemniscus') ? '#bae6fd' : '#475569'}
                    strokeWidth="2"
                    className="transition-colors duration-200"
                  />
                  <text x="200" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Med. Lemn.</text>
                </g>

                {/* Hypoglossal Nucleus & Nerve (CN XII) */}
                <g
                  onClick={() => setSelectedStructureId('cn12')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="185"
                    cy="85"
                    r="12"
                    fill={isHighlighted('cn12') ? '#fbbf24' : '#1e293b'}
                    stroke={isHighlighted('cn12') ? '#fef08a' : '#64748b'}
                    strokeWidth="2"
                  />
                  <circle
                    cx="215"
                    cy="85"
                    r="12"
                    fill={isHighlighted('cn12') ? '#fbbf24' : '#1e293b'}
                    stroke={isHighlighted('cn12') ? '#fef08a' : '#64748b'}
                    strokeWidth="2"
                  />
                  <line x1="185" y1="97" x2="155" y2="245" stroke={isHighlighted('cn12') ? '#fbbf24' : '#64748b'} strokeWidth="3" strokeDasharray="4" />
                  <text x="200" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">XII Nucleus</text>
                </g>

                {/* Nucleus Ambiguus (Lateral Medulla) */}
                <g
                  onClick={() => setSelectedStructureId('nucleus_ambiguus')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="110"
                    cy="165"
                    r="14"
                    fill={isHighlighted('nucleus_ambiguus') ? '#a855f7' : '#1e293b'}
                    stroke={isHighlighted('nucleus_ambiguus') ? '#d8b4fe' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="110" y="169" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontWeight="bold">Ambiguus</text>
                </g>

                {/* Spinal Trigeminal Nucleus & Tract (CN V) */}
                <g
                  onClick={() => setSelectedStructureId('spinal_trigeminal')}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="80"
                    cy="145"
                    rx="16"
                    ry="22"
                    fill={isHighlighted('spinal_trigeminal') ? '#ec4899' : '#1e293b'}
                    stroke={isHighlighted('spinal_trigeminal') ? '#fbcfe8' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="80" y="148" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">Spinal V</text>
                </g>

                {/* Spinothalamic Tract */}
                <g
                  onClick={() => setSelectedStructureId('spinothalamic')}
                  className="cursor-pointer group"
                >
                  <polygon
                    points="70,185 105,185 90,225"
                    fill={isHighlighted('spinothalamic') ? '#06b6d4' : '#1e293b'}
                    stroke={isHighlighted('spinothalamic') ? '#a5f3fc' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="88" y="202" textAnchor="middle" fill="#a5f3fc" fontSize="8" fontWeight="bold">Spinothal.</text>
                </g>

                {/* Inferior Cerebellar Peduncle / Restiform Body */}
                <g
                  onClick={() => setSelectedStructureId('restiform_body')}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="95"
                    cy="90"
                    rx="22"
                    ry="20"
                    fill={isHighlighted('restiform_body') ? '#10b981' : '#1e293b'}
                    stroke={isHighlighted('restiform_body') ? '#a7f3d0' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="95" y="93" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="bold">Restiform</text>
                </g>

                {/* Sympathetic descending tract */}
                <g
                  onClick={() => setSelectedStructureId('sympathetic')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="100"
                    cy="235"
                    r="10"
                    fill={isHighlighted('sympathetic') ? '#eab308' : '#1e293b'}
                    stroke={isHighlighted('sympathetic') ? '#fef08a' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="100" y="238" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">Symp</text>
                </g>
              </svg>
            )}

            {level === 'pons' && (
              <svg viewBox="0 0 400 320" className="w-full h-full select-none">
                {/* Pons contour */}
                <path
                  d="M 80 80 C 130 50, 270 50, 320 80 C 370 120, 380 200, 350 250 C 310 290, 240 310, 200 310 C 160 310, 90 290, 50 250 C 20 200, 30 120, 80 80 Z"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="3"
                />

                {/* 4th Ventricle floor */}
                <path d="M 120 75 Q 200 110 280 75 Z" fill="#030712" stroke="#4b5563" strokeWidth="2" />

                {/* Basis Pontis (Corticospinal bundles) */}
                <g
                  onClick={() => setSelectedStructureId('basis_corticospinal')}
                  className="cursor-pointer group"
                >
                  <rect
                    x="130"
                    y="220"
                    width="140"
                    height="70"
                    rx="16"
                    fill={isHighlighted('basis_corticospinal') ? '#f43f5e' : '#1f2937'}
                    stroke={isHighlighted('basis_corticospinal') ? '#fda4af' : '#4b5563'}
                    strokeWidth="2"
                  />
                  <text x="200" y="258" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">Basis Pontis (CST)</text>
                </g>

                {/* Abducens Nucleus (CN VI) & PPRF */}
                <g
                  onClick={() => setSelectedStructureId('cn6_nucleus')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="180"
                    cy="105"
                    r="15"
                    fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : '#1e293b'}
                    stroke={isHighlighted('cn6_nucleus') ? '#fef08a' : '#64748b'}
                    strokeWidth="2"
                  />
                  <circle
                    cx="220"
                    cy="105"
                    r="15"
                    fill={isHighlighted('cn6_nucleus') ? '#fbbf24' : '#1e293b'}
                    stroke={isHighlighted('cn6_nucleus') ? '#fef08a' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="200" y="109" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">VI Nucleus</text>
                </g>

                {/* Facial Nerve (CN VII) internal genu & loop */}
                <g
                  onClick={() => setSelectedStructureId('cn7_fascicle')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 130 160 Q 150 90 180 90 Q 200 90 195 125 L 140 220"
                    fill="none"
                    stroke={isHighlighted('cn7_fascicle') ? '#10b981' : '#64748b'}
                    strokeWidth="4"
                    strokeDasharray="4"
                  />
                  <circle
                    cx="130"
                    cy="165"
                    r="13"
                    fill={isHighlighted('cn7_fascicle') ? '#10b981' : '#1e293b'}
                    stroke={isHighlighted('cn7_fascicle') ? '#a7f3d0' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="130" y="169" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="bold">VII Nucleus</text>
                </g>

                {/* CN VI Fascicle exit */}
                <g
                  onClick={() => setSelectedStructureId('cn6_fascicle')}
                  className="cursor-pointer group"
                >
                  <line x1="180" y1="120" x2="160" y2="295" stroke={isHighlighted('cn6_fascicle') ? '#fbbf24' : '#475569'} strokeWidth="4" />
                  <text x="150" y="305" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">CN VI</text>
                </g>

                {/* Middle Cerebellar Peduncle (Brachium Pontis) */}
                <g
                  onClick={() => setSelectedStructureId('brachium_pontis')}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="65"
                    cy="180"
                    rx="30"
                    ry="45"
                    fill={isHighlighted('brachium_pontis') ? '#a855f7' : '#1e293b'}
                    stroke={isHighlighted('brachium_pontis') ? '#d8b4fe' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="65" y="183" textAnchor="middle" fill="#d8b4fe" fontSize="8" fontWeight="bold">Brachium</text>
                  <text x="65" y="195" textAnchor="middle" fill="#d8b4fe" fontSize="8" fontWeight="bold">Pontis</text>
                </g>

                {/* MLF */}
                <g
                  onClick={() => setSelectedStructureId('mlf')}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="200"
                    cy="128"
                    rx="12"
                    ry="8"
                    fill={isHighlighted('mlf') ? '#38bdf8' : '#1e293b'}
                    stroke={isHighlighted('mlf') ? '#bae6fd' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="200" y="131" textAnchor="middle" fill="#bae6fd" fontSize="7" fontWeight="bold">MLF</text>
                </g>
              </svg>
            )}

            {level === 'midbrain' && (
              <svg viewBox="0 0 400 320" className="w-full h-full select-none">
                {/* Midbrain contour */}
                <path
                  d="M 100 80 Q 200 40 300 80 C 350 110, 360 180, 340 230 C 310 280, 240 280, 200 240 C 160 280, 90 280, 60 230 C 40 180, 50 110, 100 80 Z"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="3"
                />

                {/* Cerebral Aqueduct */}
                <circle cx="200" cy="100" r="12" fill="#030712" stroke="#4b5563" strokeWidth="2" />
                <text x="200" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Aqueduct</text>

                {/* Pretectal / Tectum Area (Dorsal) */}
                <g
                  onClick={() => setSelectedStructureId('pretectal_area')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 140 60 Q 200 40 260 60 Q 200 85 140 60 Z"
                    fill={isHighlighted('pretectal_area') ? '#ec4899' : '#1e293b'}
                    stroke={isHighlighted('pretectal_area') ? '#fbcfe8' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="200" y="55" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">Pretectum / Colliculus</text>
                </g>

                {/* Crus Cerebri (Left & Right) */}
                <g
                  onClick={() => setSelectedStructureId('crus_cerebri')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 60 210 C 80 250, 130 265, 170 230 L 150 190 C 110 200, 80 190, 60 210 Z"
                    fill={isHighlighted('crus_cerebri') ? '#f43f5e' : '#1f2937'}
                    stroke={isHighlighted('crus_cerebri') ? '#fda4af' : '#4b5563'}
                    strokeWidth="2"
                  />
                  <text x="110" y="235" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">Crus Cerebri</text>
                </g>

                {/* Substantia Nigra */}
                <g
                  onClick={() => setSelectedStructureId('substantia_nigra')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 85 190 Q 130 180 160 170 L 150 160 Q 120 170 80 178 Z"
                    fill={isHighlighted('substantia_nigra') ? '#a855f7' : '#334155'}
                    stroke={isHighlighted('substantia_nigra') ? '#d8b4fe' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="115" y="180" textAnchor="middle" fill="#d8b4fe" fontSize="7" fontWeight="bold">Subst. Nigra</text>
                </g>

                {/* Red Nucleus */}
                <g
                  onClick={() => setSelectedStructureId('red_nucleus')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="155"
                    cy="140"
                    r="20"
                    fill={isHighlighted('red_nucleus') ? '#ef4444' : '#1e293b'}
                    stroke={isHighlighted('red_nucleus') ? '#fca5a5' : '#64748b'}
                    strokeWidth="2"
                  />
                  <text x="155" y="144" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">Red Nu.</text>
                </g>

                {/* CN III Nucleus & Fascicles */}
                <g
                  onClick={() => setSelectedStructureId('cn3_fascicles')}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="200"
                    cy="120"
                    r="12"
                    fill={isHighlighted('cn3_fascicles') ? '#fbbf24' : '#1e293b'}
                    stroke={isHighlighted('cn3_fascicles') ? '#fef08a' : '#64748b'}
                    strokeWidth="2"
                  />
                  <line x1="195" y1="130" x2="180" y2="235" stroke={isHighlighted('cn3_fascicles') ? '#fbbf24' : '#64748b'} strokeWidth="3" strokeDasharray="3" />
                  <text x="200" y="124" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">III Nu.</text>
                  <text x="180" y="245" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">CN III</text>
                </g>
              </svg>
            )}
          </div>

          {/* Quick instructions / legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Motor / CST
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Cranial Nerve
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span> Sensory Tract
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span> Cerebellar / Coordination
            </span>
          </div>
        </div>

        {/* Structure Detail & Clinical Syndromes Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Structure Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Structure Inspection
              </h3>
              {selectedStructure && (
                <button
                  onClick={() => setSelectedStructureId(null)}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            {selectedStructure ? (
              <div className="space-y-2.5 animate-fade-in">
                <h4 className="text-sm font-bold text-slate-100">{selectedStructure.name}</h4>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-400">Function: </span>
                    <span className="text-slate-300">{selectedStructure.function}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-rose-400">Clinical Deficit: </span>
                    <span className="text-rose-200 font-medium">{selectedStructure.deficit}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-400">Vascular Supply: </span>
                    <span className="text-cyan-200">{selectedStructure.bloodSupply}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 text-center italic">
                Tap any structure in the diagram to view its neuroanatomy, clinical deficit, and vascular supply.
              </p>
            )}
          </div>

          {/* Syndromes List for this Level */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Brainstem Syndromes at this Level
            </h3>

            <div className="space-y-2">
              {syndromes.map(syn => {
                const isActive = activeSyndromeId === syn.id
                return (
                  <div
                    key={syn.id}
                    onClick={() => handleSelectSyndrome(syn.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer select-none ${
                      isActive
                        ? 'bg-cyan-950/70 border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-100">{syn.eponym}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                        {syn.vessel.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{syn.triad}</p>

                    {isActive && (
                      <div className="mt-2 pt-2 border-t border-slate-800 space-y-1 text-[11px] animate-fade-in">
                        <div className="text-amber-300">
                          <span className="font-semibold">Vessel:</span> {syn.vessel}
                        </div>
                        <div className="text-emerald-300 font-medium">
                          <span className="font-semibold">Brazis Key Clue:</span> {syn.keyDifferentiator}
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
