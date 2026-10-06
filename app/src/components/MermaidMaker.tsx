import { useState } from 'react'
import { MermaidRenderer } from './MermaidRenderer'

interface DiagramPreset {
  id: string
  title: string
  category: string
  description: string
  code: string
}

const CLINICAL_PRESETS: DiagramPreset[] = [
  {
    id: 'rule_of_4',
    title: 'Rule of 4 Diagnostic Tree',
    category: 'Core Localization',
    description: 'Brazis/Gates Rule of 4 algorithm: Cranial nerves determine level; Long tracts determine medial vs lateral.',
    code: `flowchart TD
    classDef midbrain fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef pons fill:#0e7490,stroke:#22d3ee,stroke-width:2px,color:#fff;
    classDef medulla fill:#78350f,stroke:#fbbf24,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    Start([Crossed Brainstem Deficit]) :::decision --> CN{Examine Cranial Nerves}:::decision
    
    CN -->|CN 3 or 4| Midbrain[MESENCEPHALON]:::midbrain
    CN -->|CN 5, 6, 7, 8| Pons[PONS]:::pons
    CN -->|CN 9, 10, 11, 12| Medulla[MEDULLA OBLONGATA]:::medulla
    
    Midbrain --> M_Zone{Medial Motor vs Dorsal Tremor?}:::decision
    M_Zone -->|Corticospinal Hemiplegia| Weber[Weber Syndrome: Crus Cerebri]:::syndrome
    M_Zone -->|Intention Tremor + Chorea| Benedikt[Benedikt: Red Nucleus]:::syndrome
    M_Zone -->|Pure Cerebellar Ataxia| Claude[Claude: SCP Decussation]:::syndrome
    
    Pons --> P_Zone{CN 6 vs CN 7 vs Conjugate Gaze?}:::decision
    P_Zone -->|VI Fascicle + VII Peripheral + Hemiplegia| MG[Millard-Gubler: Basis Pontis]:::syndrome
    P_Zone -->|VI Fascicle + Central Face + Hemiplegia| Raymond[Raymond Syndrome]:::syndrome
    P_Zone -->|Conjugate Gaze Palsy + VII Peripheral| Foville[Foville: Dorsal Tegmentum]:::syndrome
    
    Medulla --> Med_Zone{Tongue XII vs Crossed Analgesia?}:::decision
    Med_Zone -->|Tongue XII + Motor CST + Lemniscus| Dejerine[Medial Medullary: Dejerine]:::syndrome
    Med_Zone -->|Crossed Analgesia + Horner + Ataxia| Wallenberg[Lateral Medullary: Wallenberg / PICA]:::syndrome
    Med_Zone -->|Wallenberg + IPSILATERAL Hemiparesis| Opalski[Opalski: Post-Decussation]:::syndrome`
  },
  {
    id: 'gaze_palsies',
    title: 'Diplopia & Horizontal Gaze Localizer',
    category: 'Neuro-Ophthalmology',
    description: 'Differentiating nuclear VI, fascicular VI, PPRF, and MLF lesions in the brainstem.',
    code: `flowchart TD
    classDef pons fill:#0e7490,stroke:#22d3ee,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    GazeStart([Horizontal Eye Movement Deficit]) :::decision --> Pattern{Conjugate Gaze vs Isolated Muscle?}:::decision
    
    Pattern -->|Conjugate Palsy: Neither Eye Looks Toward Lesion| Conj[PPRF or Abducens Nucleus Lesion]:::pons
    Conj --> CheckVII{Is CN VII also paralyzed?}:::decision
    CheckVII -->|Yes: Full Peripheral VII Palsy + Hemiplegia| Foville[Foville Syndrome]:::syndrome
    CheckVII -->|No: Isolated Horizontal Gaze Palsy| PPRF_Pure[Isolated PPRF / VI Nucleus Infarct]:::pons
    
    Pattern -->|Isolated Abduction Failure of One Eye| Abducens[Exiting CN VI Fascicle Lesion]:::pons
    Abducens --> CheckFace{Facial Nerve Status?}:::decision
    CheckFace -->|Peripheral VII Palsy + Hemiplegia| MG[Millard-Gubler Syndrome]:::syndrome
    CheckFace -->|Central Facial Paresis + Hemiplegia| Raymond[Raymond Syndrome]:::syndrome
    
    Pattern -->|Adduction Lag + Contralateral Abducting Nystagmus| INO[Internuclear Ophthalmoplegia]:::syndrome
    INO --> INO_Loc[Medial Longitudinal Fasciculus: Dorsomedial Brainstem]:::pons`
  },
  {
    id: 'vertigo_nystagmus',
    title: 'Vertigo & Cerebellar Stroke Differential',
    category: 'Vascular & Ataxia',
    description: 'Differentiating central brainstem strokes (PICA/AICA) from acute peripheral vestibulopathy.',
    code: `flowchart TD
    classDef central fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef periph fill:#065f46,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#38bdf8;

    Vertigo([Acute Vestibular Syndrome: Vertigo, Nausea, Nystagmus]) :::decision --> HINTS{Perform HINTS Exam}:::decision
    
    HINTS -->|Normal Head Impulse OR Direction-Changing Nystagmus OR Skew| Central[CENTRAL BRAINSTEM / CEREBELLAR STROKE]:::central
    HINTS -->|Abnormal Head Impulse + Unidirectional Nystagmus + No Skew| Periph[Acute Peripheral Vestibulopathy / Neuritis]:::periph
    
    Central --> FocalSigns{Check Accompanying Brainstem Signs}:::decision
    FocalSigns -->|Crossed Analgesia + Horner + Dysphagia| Wallenberg[Lateral Medullary / PICA Infarct]:::syndrome
    FocalSigns -->|Hearing Loss + Peripheral Facial Palsy + Ataxia| AICA[AICA / Lateral Lower Pontine Infarct]:::syndrome
    FocalSigns -->|Severe Truncal Ataxia + No Cranial Nerve Signs| PICA_Cereb[Medial Branch PICA Cerebellar Infarct]:::syndrome`
  },
  {
    id: 'vascular_tree',
    title: 'Vertebrobasilar Vascular Hierarchy',
    category: 'Vascular Topography',
    description: 'Complete branch-to-territory architecture from Subclavian to Posterior Cerebral Arteries.',
    code: `flowchart LR
    classDef artery fill:#0f172a,stroke:#f43f5e,stroke-width:2px,color:#fda4af;
    classDef zone fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    subgraph Vertebral_Circulation[Vertebral Artery Branches]
        VA[Vertebral Artery V4]:::artery --> ASA[Anterior Spinal Artery]:::artery
        VA --> PICA[Posterior Inferior Cerebellar Artery]:::artery
    end

    subgraph Basilar_Circulation[Basilar Artery Branches]
        BA[Basilar Artery Trunk]:::artery --> AICA[Anterior Inferior Cerebellar Artery]:::artery
        BA --> Paramedian[Paramedian Pontine Branches]:::artery
        BA --> ShortCirc[Short Circumferential Branches]:::artery
        BA --> SCA[Superior Cerebellar Artery]:::artery
        BA --> PCA[Posterior Cerebral Artery]:::artery
    end

    ASA -->|Medial Bulbar Zone| Dejerine[Dejerine Syndrome: Pyramid + XII + Lemniscus]:::zone
    PICA -->|Lateral Bulbar Zone| Wallenberg[Wallenberg Syndrome: Ambiguus + V + Spinothalamic]:::zone
    AICA -->|Lateral Pontine Zone| MarieFoix[Marie-Foix: Brachium Pontis + CN VII/VIII]:::zone
    Paramedian -->|Basis Pontis| Lacunar[Pure Motor Hemiparesis / Dysarthria-Clumsy Hand]:::zone
    PCA -->|Ventromedial Midbrain| Weber[Weber Syndrome: Crus Cerebri + CN III]:::zone
    PCA -->|Midbrain Tegmentum| Benedikt[Benedikt: Red Nucleus + Substantia Nigra]:::zone`
  },
  {
    id: 'midbrain_triad',
    title: 'Midbrain CN III Fascicular Differential',
    category: 'Mesencephalon',
    description: 'Detailed distinction between Weber, Benedikt, and Claude syndromes.',
    code: `flowchart TD
    classDef midbrain fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    CN3[Ipsilateral CN III Palsy: Ptosis, Mydriasis, Down-and-Out] :::midbrain --> MotorCheck{Associated Motor / Movement Signs?}:::decision
    
    MotorCheck -->|Contralateral Spastic Hemiplegia| Weber[Weber Syndrome: Crus Cerebri]:::syndrome
    MotorCheck -->|Contralateral Coarse Intention Tremor + Chorea| Benedikt[Benedikt Syndrome: Red Nucleus + Nigra]:::syndrome
    MotorCheck -->|Contralateral Pure Cerebellar Ataxia & Dysmetria| Claude[Claude Syndrome: SCP Decussation]:::syndrome
    MotorCheck -->|Supranuclear Upgaze Palsy + Light-Near Dissociation| Parinaud[Parinaud Syndrome: Pretectal Tectum]:::syndrome`
  },
  {
    id: 'sensory_patterns',
    title: 'Brainstem Sensory Deficit Map',
    category: 'Sensory Tracts',
    description: 'Patterns of sensory dissociation: Crossed thermoanalgesia vs. Pure proprioceptive vs. Universal.',
    code: `flowchart TD
    classDef sensory fill:#0e7490,stroke:#22d3ee,stroke-width:2px,color:#fff;
    classDef syndrome fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef decision fill:#312e81,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;

    SensoryStart([Sensory Deficit Examination]) :::decision --> Modality{Which Modality is Lost?}:::decision
    
    Modality -->|Vibration & Proprioception Lost, Pain/Temp Spared| Lemniscal[Medial Lemniscus Infarct]:::sensory
    Lemniscal --> Dejerine[Medial Medullary Syndrome: Contralateral Body]:::syndrome
    
    Modality -->|Pain & Temp Lost, Vibration/Proprioception Spared| Spinothalamic[Spinothalamic + Spinal V Tract]:::sensory
    Spinothalamic --> CheckDistribution{Body Distribution?}:::decision
    CheckDistribution -->|Ipsilateral Face + Contralateral Body| Crossed[Wallenberg Syndrome: Lateral Medulla]:::syndrome
    CheckDistribution -->|Bilateral Entire Face, Trunk & Limbs| Universal[Universal Dissociative Anesthesia: Combined Infarct]:::syndrome`
  }
]

export function MermaidMaker({ isDark = true }: { isDark?: boolean }) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(CLINICAL_PRESETS[0].id)
  const [code, setCode] = useState<string>(CLINICAL_PRESETS[0].code)
  const [copied, setCopied] = useState<boolean>(false)

  const handleSelectPreset = (preset: DiagramPreset) => {
    setSelectedPresetId(preset.id)
    setCode(preset.code)
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-4 space-y-5 animate-fade-in pb-24">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Clinical Flowchart & Decision Studio • Brazis
          </span>
          <span className="text-xs text-slate-400 font-mono">Interactive Vector Algorithms</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">
          Mermaid Clinical Algorithm Engine
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Pan, zoom, inspect, or modify clinical decision algorithms in real time. Choose from 6 board-tested neuro-localization templates below or write your own Mermaid architecture.
        </p>

        {/* Preset Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {CLINICAL_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-xl text-left border transition active:scale-95 text-xs select-none min-h-[58px] flex flex-col justify-between ${
                selectedPresetId === preset.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80 truncate">
                {preset.category}
              </span>
              <span className="font-bold text-[11px] truncate leading-tight">
                {preset.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Diagram Viewer (Prominent, High-Resolution, Pan/Zoom) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interactive Vector Flowchart Canvas
          </h3>
          <button
            onClick={handleCopyCode}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 hover:text-white transition active:scale-95 flex items-center gap-1.5"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'Copied Code' : 'Copy Mermaid Code'}</span>
          </button>
        </div>

        <MermaidRenderer
          chart={code}
          isDark={isDark}
          allowZoom={true}
          className="min-h-[420px] shadow-2xl"
        />
      </div>

      {/* Collapsible / Expandable Code Editor */}
      <details className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <summary className="text-xs font-bold uppercase tracking-wider text-cyan-400 cursor-pointer list-none flex items-center justify-between select-none">
          <span>⚙️ Advanced: View & Edit Diagram Source Code</span>
          <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
        </summary>

        <div className="pt-3 space-y-2">
          <p className="text-xs text-slate-400">
            Edit the flowchart syntax below to add clinical branches, symptoms, or custom color tags:
          </p>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={12}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs font-mono text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-y leading-relaxed"
            spellCheck={false}
          />
        </div>
      </details>
    </div>
  )
}
