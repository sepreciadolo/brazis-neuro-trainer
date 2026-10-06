import { useState } from 'react'
import { MermaidRenderer } from './MermaidRenderer'

interface DiagramPreset {
  id: string
  title: string
  description: string
  code: string
}

const CLINICAL_PRESETS: DiagramPreset[] = [
  {
    id: 'rule_of_4',
    title: 'Rule of 4 Diagnostic Tree',
    description: 'Algorithmic decision tree from long tract signs and cranial nerves to brainstem level.',
    code: `flowchart TD
    Start[Clinical Presentation: Crossed Signs] --> CN{Which Cranial Nerves?}
    
    CN -->|CN 3 or 4| Midbrain[MESENCEPHALON]
    CN -->|CN 5, 6, 7, 8| Pons[PONS]
    CN -->|CN 9, 10, 11, 12| Medulla[MEDULLA OBLONGATA]
    
    Midbrain --> M_Zone{Motor Hemiplegia vs Ataxia/Tremor?}
    M_Zone -->|Motor Hemiplegia| Weber[Weber Syndrome: Crus Cerebri]
    M_Zone -->|Intention Tremor + Chorea| Benedikt[Benedikt: Red Nucleus]
    M_Zone -->|Pure Hemiataxia| Claude[Claude: SCP Decussation]
    
    Pons --> P_Zone{CN 6 vs CN 7 vs Conjugate Gaze?}
    P_Zone -->|VI + VII Peripheral + Hemiplegia| MG[Millard-Gubler: Basis Pontis]
    P_Zone -->|VI + Central Face + Hemiplegia| Raymond[Raymond Syndrome]
    P_Zone -->|Conjugate Gaze Palsy + VII| Foville[Foville: Dorsal Tegmentum]
    
    Medulla --> Med_Zone{Tongue Palsy vs Crossed Analgesia?}
    Med_Zone -->|Tongue XII + Motor Hemiplegia| Dejerine[Medial Medullary: Dejerine]
    Med_Zone -->|Crossed Thermoanalgesia + Horner + Ataxia| Wallenberg[Lateral Medullary: Wallenberg]
    Med_Zone -->|Wallenberg + IPSILATERAL Hemiparesis| Opalski[Opalski: Post-Decussation]`
  },
  {
    id: 'vascular_tree',
    title: 'Brainstem Arterial Territories',
    description: 'Vertebrobasilar circulation mapping to medial vs lateral brainstem zones.',
    code: `flowchart LR
    subgraph Vertebral_Basilar[Vertebrobasilar System]
        VA[Vertebral Artery] --> ASA[Anterior Spinal Artery]
        VA --> PICA[Posterior Inferior Cerebellar Artery]
        VA --> BA[Basilar Artery]
        BA --> AICA[Anterior Inferior Cerebellar Artery]
        BA --> Paramedian[Paramedian Pontine Branches]
        BA --> SCA[Superior Cerebellar Artery]
        BA --> PCA[Posterior Cerebral Artery]
    end

    subgraph Syndromes[Clinical Syndromes]
        ASA -->|Medial Medulla| Dejerine[Dejerine Syndrome]
        PICA -->|Lateral Medulla| Wallenberg[Wallenberg Syndrome]
        AICA -->|Lateral Lower Pons| MarieFoix[Marie-Foix Syndrome]
        Paramedian -->|Basis Pontis| Lacunar[Pure Motor / Dysarthria-Clumsy Hand]
        PCA -->|Ventromedial Midbrain| Weber[Weber Syndrome]
        PCA -->|Midbrain Tegmentum| Benedikt[Benedikt Syndrome]
    end`
  },
  {
    id: 'midbrain_triad',
    title: 'Midbrain CN III Fascicular Differential',
    description: 'Differentiating Weber, Benedikt, and Claude syndromes by associated tegmental findings.',
    code: `flowchart TD
    CN3[Ipsilateral CN III Palsy: Ptosis, Mydriasis, Down-and-Out] --> Check{Associated Motor / Movement Signs?}
    
    Check -->|Contralateral Spastic Hemiplegia| Weber[Weber Syndrome]
    Weber -.->|Lesion Site| Crus[Crus Cerebri / Cerebral Peduncle]
    
    Check -->|Contralateral Coarse Tremor + Chorea| Benedikt[Benedikt Syndrome]
    Benedikt -.->|Lesion Site| RedNigra[Red Nucleus + Substantia Nigra]
    
    Check -->|Contralateral Pure Cerebellar Ataxia & Dysmetria| Claude[Claude Syndrome]
    Claude -.->|Lesion Site| SCP[Dorsal Red Nucleus & Superior Cerebellar Peduncle]
    
    Check -->|Supranuclear Upgaze Palsy + Light-Near Dissociation| Parinaud[Parinaud / Pretectal Syndrome]
    Parinaud -.->|Lesion Site| Tectum[Dorsal Tectum / Posterior Commissure]`
  },
  {
    id: 'pontine_triad',
    title: 'Pontine Alternating Hemiplegia Differential',
    description: 'Precise distinction between Millard-Gubler, Raymond, and Foville syndromes.',
    code: `flowchart TD
    PonsSign[Contralateral Hemiplegia + Abducens Involvement] --> Gaze{Look at Gaze & Facial Nerve}
    
    Gaze -->|Isolated VI Palsy + PERIPHERAL VII Palsy| MG[Millard-Gubler Syndrome]
    MG -.->|Key Feature| MG_Note[Upper and Lower facial palsy on lesion side]
    
    Gaze -->|Isolated VI Palsy + CENTRAL Facial Paresis| Raymond[Raymond Syndrome]
    Raymond -.->|Key Feature| Ray_Note[Forehead spared; supranuclear facial pathway]
    
    Gaze -->|CONJUGATE Horizontal Gaze Palsy + VII Palsy| Foville[Foville Syndrome]
    Foville -.->|Key Feature| Fov_Note[PPRF or VI Nucleus destroyed: neither eye looks toward lesion]
    
    Gaze -->|Ipsilateral Ataxia + Spinothalamic Loss| MF[Marie-Foix Syndrome]
    MF -.->|Key Feature| MF_Note[Brachium Pontis / AICA territory]`
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
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Clinical Flowchart & Neuro-Algorithm Studio
          </span>
          <span className="text-xs text-slate-400 font-mono">Brazis Flowcharts</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">
          Mermaid Clinical Flowchart Studio
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Interactive diagram renderer and creator for clinical localization algorithms, decision trees, and vascular hierarchies. Edit code in real-time or pick from pre-built Brazis templates.
        </p>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {CLINICAL_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-xl text-left border transition active:scale-95 text-xs select-none min-h-[50px] flex flex-col justify-between ${
                selectedPresetId === preset.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="font-bold truncate">{preset.title}</span>
              <span className={`text-[10px] truncate ${selectedPresetId === preset.id ? 'text-slate-900' : 'text-slate-400'}`}>
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Live Render Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Code Editor (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mermaid Editor
            </h3>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 hover:text-white transition active:scale-95 flex items-center gap-1.5"
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            Live editable: modify syntax below to customize nodes, colors, and clinical arrows.
          </p>

          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs font-mono text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-y leading-relaxed"
            spellCheck={false}
          />

          <div className="text-[10px] text-slate-400 pt-1">
            Tip: Uses standard Mermaid syntax (flowchart TD, arrows, subgraph).
          </div>
        </div>

        {/* Live Diagram Render (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Interactive Diagram Render
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Client-Side SVG</span>
          </div>

          <div className="flex-1 bg-slate-950/80 rounded-xl border border-slate-850 p-4 flex items-center justify-center min-h-[350px]">
            <MermaidRenderer chart={code} isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  )
}
