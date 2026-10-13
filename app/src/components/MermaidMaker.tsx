import { useState } from 'react'
import { MermaidRenderer } from './MermaidRenderer'
import { AssetBadge } from './StatusBadge'

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
    classDef midbrain fill:#2d1b22,stroke:#e11d48,stroke-width:2px,color:#ffe4e6;
    classDef pons fill:#1a2528,stroke:#0d9488,stroke-width:2px,color:#ccfbf1;
    classDef medulla fill:#2c2014,stroke:#f59e0b,stroke-width:2px,color:#fef3c7;
    classDef decision fill:#222227,stroke:#d97706,stroke-width:2px,color:#fdf6e2;
    classDef syndrome fill:#14241d,stroke:#10b981,stroke-width:2px,color:#d1fae5;

    Start(["Patient with Crossed Neurologic Deficit"]) --> CN{"Examine Cranial Nerves"}
    
    CN -->|"CN 3 or 4 Involved"| Midbrain["MESENCEPHALON LEVEL"]
    CN -->|"CN 5, 6, 7, 8 Involved"| Pons["PONTINE LEVEL"]
    CN -->|"CN 9, 10, 11, 12 Involved"| Medulla["MEDULLARY LEVEL"]
    
    Midbrain --> M_Zone{"Motor Hemiplegia vs Tegmental Tremor?"}
    M_Zone -->|"Corticospinal Hemiplegia"| Weber["Weber Syndrome: Crus Cerebri"]
    M_Zone -->|"Hemiataxia + Intention Tremor + Hemiparesis"| Benedikt["Benedikt: Red Nucleus"]
    M_Zone -->|"Prominent Cerebellar Signs"| Claude["Claude: Dorsal Red Nucleus + Brachium Conjunctivum"]
    
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
    classDef pons fill:#1a2528,stroke:#0d9488,stroke-width:2px,color:#ccfbf1;
    classDef decision fill:#222227,stroke:#d97706,stroke-width:2px,color:#fdf6e2;
    classDef syndrome fill:#14241d,stroke:#10b981,stroke-width:2px,color:#d1fae5;

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
    classDef central fill:#2d1b22,stroke:#e11d48,stroke-width:2px,color:#ffe4e6;
    classDef periph fill:#14241d,stroke:#10b981,stroke-width:2px,color:#d1fae5;
    classDef decision fill:#222227,stroke:#d97706,stroke-width:2px,color:#fdf6e2;
    classDef syndrome fill:#1a2528,stroke:#0d9488,stroke-width:2px,color:#ccfbf1;

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
    classDef artery fill:#291a1e,stroke:#f43f5e,stroke-width:2px,color:#fecdd3;
    classDef zone fill:#14241d,stroke:#10b981,stroke-width:2px,color:#d1fae5;

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
    AICA -->|"Lateral Pontine Zone"| MarieFoix["Marie-Foix: Brachium Pontis (vessel not stated by Brazis)"]
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
    brazisReference: 'Brazis 8th Ed., Chapter 15, Pages 452–453, Figure 15-6; Chapter 8, Page 214',
    clinicalTakeaway: 'Weber damages the cerebral peduncle (contralateral hemiplegia); Benedikt damages the red nucleus (contralateral hemiataxia with intention tremor, hemiparesis); Claude damages the dorsal red nucleus and brachium conjunctivum (prominent cerebellar signs, no hemiballismus).',
    decisionPoints: [
      'Weber: CN III palsy + contralateral hemiplegia (including lower face).',
      'Benedikt: CN III palsy + contralateral hemiataxia with intention tremor (Ch. 8 also lists choreiform movements) + contralateral hemiparesis.',
      'Claude: CN III palsy + contralateral cerebellar signs (asynergia, ataxia, dysmetria, dysdiadochokinesia); no hemiballismus.',
      'Parinaud: Tectal/pretectal compression: supranuclear upward gaze paralysis + light-near dissociation + Collier sign.'
    ],
    code: `flowchart TD
    classDef midbrain fill:#2d1b22,stroke:#e11d48,stroke-width:2px,color:#ffe4e6;
    classDef decision fill:#222227,stroke:#d97706,stroke-width:2px,color:#fdf6e2;
    classDef syndrome fill:#14241d,stroke:#10b981,stroke-width:2px,color:#d1fae5;

    CN3["Ipsilateral CN III Palsy: Ptosis, Mydriasis, Down-and-Out"] --> MotorCheck{"Associated Motor / Movement Signs?"}
    
    MotorCheck -->|"Contralateral Spastic Hemiplegia"| Weber["Weber Syndrome: Crus Cerebri"]
    MotorCheck -->|"Contralateral Hemiataxia + Intention Tremor + Hemiparesis"| Benedikt["Benedikt Syndrome: Red Nucleus (+ Nigra if larger)"]
    MotorCheck -->|"Contralateral Prominent Cerebellar Signs"| Claude["Claude Syndrome: Dorsal Red Nucleus + Brachium Conjunctivum"]
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
    classDef sensory fill:#18262b,stroke:#0284c7,stroke-width:2px,color:#e0f2fe;
    classDef syndrome fill:#14241d,stroke:#10b981,stroke-width:2px,color:#d1fae5;
    classDef decision fill:#222227,stroke:#d97706,stroke-width:2px,color:#fdf6e2;

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
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 animate-fade-in pb-28">
      {/* Editorial Monograph Header - No box prison */}
      <header className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Brazis Chapter 15 • Clinical Decision Trees
          </p>
          <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
            Vector Pan & Zoom
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Brainstem Neuro-Localization Algorithms
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
          Visual decision flowcharts designed to deduce brainstem syndromes from clinical signs. Drag to pan, scroll to zoom.
        </p>
      </header>

      {/* Streamlined Selector Bar - Compact & responsive, no giant boxes */}
      <div className="space-y-2 border-y border-stone-200/80 dark:border-stone-800/80 py-3">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 mr-1 hidden sm:inline">
            Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                const inCat = cat === 'All' ? ALGORITHMS : ALGORITHMS.filter(a => a.category === cat)
                if (inCat.length > 0 && !inCat.some(a => a.id === selectedAlgoId)) {
                  setSelectedAlgoId(inCat[0].id)
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500/15 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Algorithm Selection Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {filteredAlgos.map(algo => {
            const isSelected = selectedAlgoId === algo.id
            return (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgoId(algo.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 shadow-sm font-semibold'
                    : 'bg-stone-100 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                <span>{algo.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Hero Flowchart Canvas & Active Header */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {currentAlgo.title}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {currentAlgo.subtitle} • {currentAlgo.brazisReference}
            </p>
          </div>
          <AssetBadge assetId={`flowcharts/${currentAlgo.id}`} detail className="self-start sm:self-auto" />
        </div>

        {/* Full-Height Hero Diagram Canvas */}
        <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
          <MermaidRenderer
            chart={currentAlgo.code}
            isDark={isDark}
            allowZoom={true}
            className="h-[62vh] min-h-[500px]"
          />
        </div>
      </section>

      {/* Clinical Pearls & Algorithmic Steps - Editorial Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
        <div className="md:col-span-5 space-y-2 border-l-2 border-amber-500 pl-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Brazis Clinical Core Takeaway
          </h3>
          <p className="text-sm font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
            {currentAlgo.clinicalTakeaway}
          </p>
        </div>

        <div className="md:col-span-7 space-y-2 border-l-2 border-stone-300 dark:border-stone-800 pl-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold">
            Algorithmic Checkpoints
          </h3>
          <ol className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            {currentAlgo.decisionPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
                  0{idx + 1}.
                </span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
