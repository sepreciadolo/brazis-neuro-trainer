import { useState } from 'react'
import { MermaidRenderer } from './MermaidRenderer'

interface ClinicalAlgorithm {
  id: string
  title: string
  category: 'Rule of 4' | 'Eye Movements' | 'Vascular' | 'Vertigo & Ataxia' | 'Sensory'
  subtitle: string
  brazisReference: string
  clinicalTakeaway: string
  decisionPoints: string[]
  code: string
}

const ALGORITHMS: ClinicalAlgorithm[] = [
  {
    id: 'rule_of_4',
    title: 'Rule of 4 Master Decision Tree',
    category: 'Rule of 4',
    subtitle: 'Step-by-step localization from long tracts and cranial nerves',
    brazisReference: 'Brazis 8th Ed., Chapter 15, Page 439',
    clinicalTakeaway: 'Cranial nerves identify the rostrocaudal slice (Midbrain 3-4, Pons 5-8, Medulla 9-12). Long tract signs identify medial (Motor/Lemniscus) vs lateral (Spinothalamic/Sympathetic) zone.',
    decisionPoints: [
      'Step 1: Check cranial nerves to establish vertical level (Midbrain vs Pons vs Medulla).',
      'Step 2: Check for motor hemiplegia or dorsal column loss (Medial paramedian territory).',
      'Step 3: Check for spinothalamic loss, Horner syndrome, or ataxia (Lateral circumferential territory).'
    ],
    code: `flowchart TD
    classDef midbrain fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef pons fill:#0e7490,stroke:#22d3ee,stroke-width:2px,color:#fff;
    classDef medulla fill:#78350f,stroke:#fbbf24,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    Start(["Patient with Crossed Neurologic Deficit"]) --> CN{"Examine Cranial Nerves"}
    
    CN -->|"CN 3 or 4 Involved"| Midbrain["MESENCEPHALON LEVEL"]
    CN -->|"CN 5, 6, 7, 8 Involved"| Pons["PONTINE LEVEL"]
    CN -->|"CN 9, 10, 11, 12 Involved"| Medulla["MEDULLARY LEVEL"]
    
    Midbrain --> M_Zone{"Motor Hemiplegia vs Tegmental Tremor?"}
    M_Zone -->|"Corticospinal Hemiplegia"| Weber["Weber Syndrome: Crus Cerebri"]
    M_Zone -->|"Coarse Intention Tremor + Chorea"| Benedikt["Benedikt: Red Nucleus"]
    M_Zone -->|"Pure Cerebellar Ataxia"| Claude["Claude: SCP Decussation"]
    
    Pons --> P_Zone{"CN 6 vs CN 7 vs Conjugate Gaze?"}
    P_Zone -->|"VI Fascicle + VII Peripheral + Hemiplegia"| MG["Millard-Gubler: Basis Pontis"]
    P_Zone -->|"VI Fascicle + Central Face + Hemiplegia"| Raymond["Raymond Syndrome"]
    P_Zone -->|"Conjugate Gaze Palsy + VII Peripheral"| Foville["Foville: Dorsal Tegmentum"]
    
    Medulla --> Med_Zone{"Tongue XII vs Crossed Analgesia?"}
    Med_Zone -->|"Tongue XII + Motor CST + Lemniscus"| Dejerine["Medial Medullary: Dejerine / ASA"]
    Med_Zone -->|"Crossed Analgesia + Horner + Ataxia"| Wallenberg["Lateral Medullary: Wallenberg / PICA"]
    Med_Zone -->|"Wallenberg + IPSILATERAL Hemiparesis"| Opalski["Opalski: Post-Decussation CST"]

    class Start,CN,M_Zone,P_Zone,Med_Zone decision;
    class Midbrain midbrain;
    class Pons pons;
    class Medulla medulla;
    class Weber,Benedikt,Claude,MG,Raymond,Foville,Dejerine,Wallenberg,Opalski syndrome;`
  },
  {
    id: 'gaze_palsies',
    title: 'Diplopia & Horizontal Gaze Localizer',
    category: 'Eye Movements',
    subtitle: 'PPRF vs. VI Nucleus vs. VI Fascicle vs. MLF (INO)',
    brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 447–449',
    clinicalTakeaway: 'A lesion of the abducens fascicle produces isolated lateral rectus paresis (other eye adducts normally on gaze). A lesion of the abducens nucleus or PPRF produces conjugate gaze paralysis (neither eye moves toward the lesion).',
    decisionPoints: [
      'Conjugate gaze palsy to lesion side + peripheral VII + hemiplegia = Foville syndrome (dorsal tegmentum).',
      'Isolated VI palsy + complete peripheral VII + hemiplegia = Millard-Gubler (ventral basis pontis).',
      'Isolated VI palsy + central facial paresis + hemiplegia = Raymond syndrome.',
      'Ipsilateral adduction lag + contralateral abducting nystagmus = MLF lesion (Internuclear Ophthalmoplegia).'
    ],
    code: `flowchart TD
    classDef pons fill:#0e7490,stroke:#22d3ee,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    GazeStart(["Horizontal Eye Movement Deficit"]) --> Pattern{"Conjugate Gaze vs Isolated Muscle?"}
    
    Pattern -->|"Conjugate Palsy: Neither Eye Looks Toward Lesion"| Conj["PPRF or Abducens Nucleus Lesion"]
    Conj --> CheckVII{"Facial Nerve Status?"}
    CheckVII -->|"Complete Peripheral VII Palsy + Hemiplegia"| Foville["Foville Syndrome: Dorsal Tegmentum"]
    CheckVII -->|"Isolated Gaze Palsy: No Other Cranial Nerves"| PPRF_Pure["Isolated PPRF / VI Nucleus Infarct"]
    
    Pattern -->|"Isolated Abduction Failure of One Eye"| Abducens["Exiting CN VI Fascicle Lesion"]
    Abducens --> CheckFace{"Facial Nerve Status?"}
    CheckFace -->|"Complete Peripheral VII Palsy + Hemiplegia"| MG["Millard-Gubler Syndrome: Ventral Basis"]
    CheckFace -->|"Central Facial Paresis + Hemiplegia"| Raymond["Raymond Syndrome: Ventromedial Pons"]
    
    Pattern -->|"Adduction Lag + Contralateral Abducting Nystagmus"| INO["Internuclear Ophthalmoplegia"]
    INO --> INO_Loc["Medial Longitudinal Fasciculus: Dorsomedial Brainstem"]

    class GazeStart,Pattern,CheckVII,CheckFace decision;
    class Conj,PPRF_Pure,Abducens,INO_Loc pons;
    class Foville,MG,Raymond,INO syndrome;`
  },
  {
    id: 'vertigo_nystagmus',
    title: 'Acute Vertigo & HINTS Localizer',
    category: 'Vertigo & Ataxia',
    subtitle: 'Central Posterior Circulation Stroke vs. Peripheral Vestibulopathy',
    brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 443–446',
    clinicalTakeaway: 'In acute continuous vertigo with nystagmus, any ONE central HINTS sign (normal head impulse, direction-changing nystagmus, skew deviation) indicates a central posterior circulation stroke (PICA or AICA).',
    decisionPoints: [
      'Normal Head Impulse Test (HIT) in continuous vertigo points strongly to a central cerebellar/brainstem stroke.',
      'Direction-changing gaze-evoked nystagmus indicates central vestibular brainstem injury.',
      'Skew deviation (vertical ocular misalignment) indicates disruption of central otolithic projections.',
      'Hearing loss + facial numbness + ataxia points to AICA / lateral pontine stroke.'
    ],
    code: `flowchart TD
    classDef central fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef periph fill:#065f46,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#38bdf8;

    Vertigo(["Acute Vestibular Syndrome: Vertigo, Nausea, Nystagmus"]) --> HINTS{"Evaluate HINTS Bedside Battery"}
    
    HINTS -->|"Normal Head Impulse OR Direction-Changing Nystagmus OR Skew"| Central["CENTRAL POSTERIOR CIRCULATION STROKE"]
    HINTS -->|"Abnormal Head Impulse + Unidirectional Nystagmus + No Skew"| Periph["Acute Peripheral Vestibulopathy: Vestibular Neuritis"]
    
    Central --> FocalSigns{"Accompanying Neurological Signs?"}
    FocalSigns -->|"Crossed Analgesia + Horner + Dysphagia"| Wallenberg["Lateral Medullary / PICA Infarct"]
    FocalSigns -->|"Hearing Loss + Peripheral VII Palsy + Ataxia"| AICA["AICA / Lateral Inferior Pontine Infarct"]
    FocalSigns -->|"Severe Truncal Ataxia + No Cranial Nerve Signs"| PICA_Cereb["Medial Branch PICA Cerebellar Infarct"]

    class Vertigo,HINTS,FocalSigns decision;
    class Central central;
    class Periph periph;
    class Wallenberg,AICA,PICA_Cereb syndrome;`
  },
  {
    id: 'vascular_tree',
    title: 'Vertebrobasilar Arterial Hierarchy',
    category: 'Vascular',
    subtitle: 'From Subclavian & Vertebral branches to Midbrain termination',
    brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 440, 447, 452',
    clinicalTakeaway: 'Paramedian vessels supply ventral/midline structures (pyramids, lemniscus, motor nuclei); circumferential arteries (PICA, AICA, SCA) supply lateral tegmentum and cerebellum.',
    decisionPoints: [
      'Anterior Spinal Artery: Paramedian medulla (Dejerine syndrome).',
      'PICA / Vertebral V4: Lateral medulla (Wallenberg syndrome).',
      'Basilar Paramedians: Basis pontis motor bundles (pure motor, clumsy hand, ataxic hemiparesis).',
      'AICA: Lateral lower pons & middle cerebellar peduncle (Marie-Foix syndrome).',
      'Posterior Cerebral Artery (PCA): Ventral midbrain crus cerebri (Weber) & tegmentum (Benedikt).'
    ],
    code: `flowchart LR
    classDef artery fill:#0f172a,stroke:#f43f5e,stroke-width:2px,color:#fda4af;
    classDef zone fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    subgraph Vertebral_Circulation["Vertebral Artery System"]
        VA["Vertebral Artery V4"] --> ASA["Anterior Spinal Artery"]
        VA --> PICA["Posterior Inferior Cerebellar Artery"]
    end

    subgraph Basilar_Circulation["Basilar Artery System"]
        BA["Basilar Artery Trunk"] --> AICA["Anterior Inferior Cerebellar Artery"]
        BA --> Paramedian["Paramedian Pontine Branches"]
        BA --> ShortCirc["Short Circumferential Branches"]
        BA --> SCA["Superior Cerebellar Artery"]
        BA --> PCA["Posterior Cerebral Artery"]
    end

    ASA -->|"Medial Bulbar Zone"| Dejerine["Dejerine: Pyramid + XII + Lemniscus"]
    PICA -->|"Lateral Bulbar Zone"| Wallenberg["Wallenberg: Ambiguus + V + Spinothalamic"]
    AICA -->|"Lateral Pontine Zone"| MarieFoix["Marie-Foix: Brachium Pontis + CN VII/VIII"]
    Paramedian -->|"Basis Pontis"| Lacunar["Pure Motor Hemiparesis / Clumsy Hand"]
    PCA -->|"Ventromedial Midbrain"| Weber["Weber: Crus Cerebri + CN III"]
    PCA -->|"Midbrain Tegmentum"| Benedikt["Benedikt: Red Nucleus + Substantia Nigra"]

    class VA,ASA,PICA,BA,AICA,Paramedian,ShortCirc,SCA,PCA artery;
    class Dejerine,Wallenberg,MarieFoix,Lacunar,Weber,Benedikt zone;`
  },
  {
    id: 'midbrain_triad',
    title: 'Midbrain CN III Fascicular Differential',
    category: 'Eye Movements',
    subtitle: 'Weber vs. Benedikt vs. Claude vs. Parinaud syndromes',
    brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 452–454, Figure 15-6',
    clinicalTakeaway: 'Weber damages the cerebral peduncle (motor hemiplegia); Benedikt damages the red nucleus/nigra (involuntary chorea/tremor); Claude damages superior cerebellar peduncle (pure kinetic hemiataxia).',
    decisionPoints: [
      'Weber: CN III palsy + contralateral spastic hemiplegia (including lower face).',
      'Benedikt: CN III palsy + contralateral intention tremor, chorea, and hemiparesis.',
      'Claude: CN III palsy + contralateral pure cerebellar ataxia and dysmetria (no tremor or chorea).',
      'Parinaud: Tectal/pretectal compression: supranuclear upward gaze paralysis + light-near dissociation + Collier sign.'
    ],
    code: `flowchart TD
    classDef midbrain fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    CN3["Ipsilateral CN III Palsy: Ptosis, Mydriasis, Down-and-Out"] --> MotorCheck{"Associated Motor / Movement Signs?"}
    
    MotorCheck -->|"Contralateral Spastic Hemiplegia"| Weber["Weber Syndrome: Crus Cerebri"]
    MotorCheck -->|"Contralateral Coarse Intention Tremor + Chorea"| Benedikt["Benedikt Syndrome: Red Nucleus + Nigra"]
    MotorCheck -->|"Contralateral Pure Cerebellar Ataxia & Dysmetria"| Claude["Claude Syndrome: SCP Decussation"]
    MotorCheck -->|"Supranuclear Upgaze Palsy + Light-Near Dissociation"| Parinaud["Parinaud Syndrome: Pretectal Tectum"]

    class CN3 midbrain;
    class MotorCheck decision;
    class Weber,Benedikt,Claude,Parinaud syndrome;`
  },
  {
    id: 'sensory_patterns',
    title: 'Brainstem Sensory Dissociation Pathways',
    category: 'Sensory',
    subtitle: 'Dorsal Column Lemniscal vs. Anterolateral Spinothalamic Localization',
    brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 442, 451',
    clinicalTakeaway: 'The medial lemniscus (proprioception/vibration) runs medially and anteriorly; the spinothalamic tract (pain/temperature) runs dorsolaterally. Their anatomical separation produces distinct dissociated sensory syndromes.',
    decisionPoints: [
      'Contralateral vibration/proprioception loss with intact pain/temp = Medial medullary / lemniscal lesion.',
      'Crossed thermoanalgesia (ipsilateral face + contralateral body) = Wallenberg lateral medullary lesion.',
      'Total bilateral loss of pain/temp over face and body with intact touch/proprioception = Universal dissociative anesthesia.'
    ],
    code: `flowchart TD
    classDef sensory fill:#0e7490,stroke:#22d3ee,stroke-width:2px,color:#fff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;

    SensoryStart(["Sensory Deficit Examination"]) --> Modality{"Which Modality is Selectively Impaired?"}
    
    Modality -->|"Vibration & Proprioception Lost, Pain/Temp Spared"| Lemniscal["Medial Lemniscus Infarct"]
    Lemniscal --> Dejerine["Medial Medullary Syndrome: Contralateral Body"]
    
    Modality -->|"Pain & Temp Lost, Vibration/Proprioception Spared"| Spinothalamic["Spinothalamic + Spinal V Tract"]
    Spinothalamic --> CheckDistribution{"Body Distribution?"}
    CheckDistribution -->|"Ipsilateral Face + Contralateral Body"| Crossed["Wallenberg Syndrome: Lateral Medulla / PICA"]
    CheckDistribution -->|"Bilateral Entire Face, Trunk & Limbs"| Universal["Universal Dissociative Anesthesia: Combined Infarctions"]

    class SensoryStart,Modality,CheckDistribution decision;
    class Lemniscal,Spinothalamic sensory;
    class Dejerine,Crossed,Universal syndrome;`
  }
]

export function MermaidMaker({ isDark = true }: { isDark?: boolean }) {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(ALGORITHMS[0].id)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const currentAlgo = ALGORITHMS.find(a => a.id === selectedAlgoId) || ALGORITHMS[0]

  const categories = ['All', 'Rule of 4', 'Eye Movements', 'Vascular', 'Vertigo & Ataxia', 'Sensory']

  const filteredAlgos = activeCategory === 'All'
    ? ALGORITHMS
    : ALGORITHMS.filter(a => a.category === activeCategory)

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-4 space-y-5 animate-fade-in pb-24">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/40 border border-slate-200 dark:border-slate-800 space-y-3 transition-colors">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 uppercase tracking-wider">
            Clinical Decision Engine • Brazis Chapter 15
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Interactive Vector Algorithms</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Brainstem Neuro-Localization Algorithms
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Visual decision flowcharts designed to solve complex brainstem localizations in seconds. Drag to pan, zoom in/out, or open fullscreen to inspect every clinical branch.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 border ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                  : 'bg-white dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Organized Algorithm Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {filteredAlgos.map(algo => {
          const isSelected = selectedAlgoId === algo.id
          const icon = algo.id === 'rule_of_4' ? '🌳'
            : algo.id === 'gaze_palsies' ? '👁️'
            : algo.id === 'vertigo_nystagmus' ? '💫'
            : algo.id === 'vascular_tree' ? '🩸'
            : algo.id === 'midbrain_triad' ? '🎯'
            : '⚡'

          return (
            <div
              key={algo.id}
              onClick={() => setSelectedAlgoId(algo.id)}
              className={`p-3 rounded-2xl border transition cursor-pointer select-none space-y-1 ${
                isSelected
                  ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-500 ring-2 ring-cyan-500/30 shadow-md'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  <span>{icon}</span>
                  <span className="truncate">{algo.title}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                  {algo.brazisReference.split(',')[2]?.trim() || ''}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 leading-snug">
                {algo.subtitle}
              </p>
            </div>
          )
        })}
      </div>

      {/* Selected Diagram Details & Canvas */}
      <div className="space-y-4">
        {/* Active Title & Key Takeaway Banner */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {currentAlgo.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Source: {currentAlgo.brazisReference}
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs font-mono text-cyan-700 dark:text-cyan-300 shrink-0 self-start sm:self-auto">
            {currentAlgo.category}
          </div>
        </div>

        {/* Interactive Pan-Zoom Diagram Canvas */}
        <MermaidRenderer
          chart={currentAlgo.code}
          isDark={isDark}
          allowZoom={true}
          className="min-h-[460px] shadow-lg"
        />

        {/* Clinical Reasoning & Decision Steps Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-2">
            <span className="text-emerald-500 font-bold">⭐</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Clinical Takeaway & Diagnostic Steps (Brazis)
            </h4>
          </div>

          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-850">
            {currentAlgo.clinicalTakeaway}
          </p>

          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Algorithmic Decision Checkpoints:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {currentAlgo.decisionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
