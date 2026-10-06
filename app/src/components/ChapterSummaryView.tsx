import { useState } from 'react'
import { MermaidRenderer } from './MermaidRenderer'

interface ChapterSummaryProps {
  isDark?: boolean
}

export function ChapterSummaryView({ isDark = true }: ChapterSummaryProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'medulla' | 'pons' | 'midbrain' | 'pitfalls'>('overview')

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-6 animate-fade-in pb-24">
      {/* Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase tracking-wider">
            Clinical Resident Digest • Chapter 15
          </span>
          <span className="text-xs font-mono text-slate-400">Brazis pp. 440–456</span>
        </div>
        <h2 className="text-2xl font-black text-slate-100 tracking-tight">
          Brainstem Localization Master Summary
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          High-yield neuroanatomical landmarks, vascular boundaries, and pathognomonic clinical signs distilled directly from Brazis. No fluff: only structures, signs, and localizing rules.
        </p>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3">
          {[
            { id: 'overview' as const, label: 'Rule of 4 Axioms' },
            { id: 'medulla' as const, label: 'Medulla' },
            { id: 'pons' as const, label: 'Pons' },
            { id: 'midbrain' as const, label: 'Midbrain' },
            { id: 'pitfalls' as const, label: 'Board Traps' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition active:scale-95 border truncate ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Rule of 4 Axioms */}
      {activeTab === 'overview' && (
        <div className="space-y-5 animate-fade-in">
          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The 4 Medial M's */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  The 4 Medial Structures ("M")
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-400 shrink-0">1. Motor Pathway (CST):</span>
                  <span>Produces contralateral hemiplegia sparing or involving the face depending on rostrocaudal level.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-400 shrink-0">2. Medial Lemniscus:</span>
                  <span>Produces contralateral loss of vibration and joint position sense (spares pain and temperature).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-400 shrink-0">3. Medial Longitudinal Fasciculus:</span>
                  <span>Produces internuclear ophthalmoplegia (ipsilateral adduction lag + contralateral abducting nystagmus).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-400 shrink-0">4. Motor Nuclei:</span>
                  <span>Divisors of 12 (CN III, IV, VI, XII) except IV which exits dorsally. Deficit is ipsilateral LMN.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300">
                Supplied by: Paramedian penetrating branches (ASA, Basilar, PCA).
              </div>
            </div>

            {/* The 4 Lateral S's */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  The 4 Lateral Structures ("S")
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">1. Spinothalamic Tract:</span>
                  <span>Produces contralateral loss of pain and temperature sensation over trunk and limbs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">2. Spinocerebellar / Peduncles:</span>
                  <span>Produces ipsilateral limb and gait ataxia (ICP in medulla, MCP in pons).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">3. Sympathetic Pathway:</span>
                  <span>Descending hypothalamospinal tract produces ipsilateral Horner syndrome (ptosis, miosis, anhidrosis).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">4. Sensory Trigeminal (Spinal V):</span>
                  <span>Produces ipsilateral loss of pain and temperature on the face (crosses body sensory loss).</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300">
                Supplied by: Circumferential arteries (PICA, AICA, SCA).
              </div>
            </div>
          </div>

          {/* Embedded Flowchart */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Diagnostic Decision Tree • Gates / Brazis Framework
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
              <MermaidRenderer
                chart={`flowchart TD
    Crossed[Patient with Crossed Neurological Signs] --> CheckCN[Check Cranial Nerves for Axial Level]
    
    CheckCN -->|CN 3, 4| Midbrain[Midbrain Level]
    CheckCN -->|CN 5, 6, 7, 8| Pons[Pontine Level]
    CheckCN -->|CN 9, 10, 11, 12| Medulla[Medullary Level]
    
    Midbrain --> CheckZone1{Medial M vs Lateral S?}
    Pons --> CheckZone2{Medial M vs Lateral S?}
    Medulla --> CheckZone3{Medial M vs Lateral S?}
    
    CheckZone1 -->|Motor CST + 3rd Nerve| Weber[Weber Syndrome]
    CheckZone1 -->|Red Nucleus + Tremor| Benedikt[Benedikt Syndrome]
    
    CheckZone2 -->|Motor CST + 6th & 7th| MG[Millard-Gubler]
    CheckZone2 -->|PPRF Gaze Palsy + 7th| Foville[Foville]
    
    CheckZone3 -->|Motor CST + 12th Tongue| Dejerine[Medial Medullary]
    CheckZone3 -->|Spinal V + Ambiguus + Horner| Wallenberg[Lateral Medullary / PICA]`}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Medulla */}
      {activeTab === 'medulla' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Medulla Oblongata: Essential Anatomy & Syndromes
              </h3>
              <span className="text-xs font-mono text-cyan-300">Book pp. 440–446</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Wallenberg card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">Lateral Medullary (Wallenberg)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">PICA / VA</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Most common brainstem infarct. Caused by intracranial vertebral artery occlusion (50%) or PICA. Wedge-shaped dorsolateral necrosis.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 space-y-1 text-[11px]">
                  <div><span className="text-amber-300 font-semibold">• Nucleus Ambiguus:</span> Palatal paralysis, hoarseness, dysphagia.</div>
                  <div><span className="text-sky-300 font-semibold">• Spinal Tract V:</span> Ipsilateral facial thermoanalgesia.</div>
                  <div><span className="text-rose-300 font-semibold">• Spinothalamic:</span> Contralateral body thermoanalgesia.</div>
                  <div><span className="text-purple-300 font-semibold">• Restiform Body:</span> Ipsilateral ataxia + ocular ipsipulsion.</div>
                  <div><span className="text-emerald-300 font-semibold">• Sympathetic:</span> Ipsilateral Horner syndrome.</div>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Cardinal Rule: Motor pyramids and tongue are ALWAYS spared.
                </div>
              </div>

              {/* Dejerine card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400">Medial Medullary (Dejerine)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">ASA / Paramedian</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Infarction of the paramedian wedge between ventral median fissure and hypoglossal rootlets.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 space-y-1 text-[11px]">
                  <div><span className="text-amber-300 font-semibold">• CN XII:</span> Ipsilateral tongue weakness/wasting (deviates to lesion).</div>
                  <div><span className="text-rose-300 font-semibold">• Pyramid:</span> Contralateral hemiplegia (face completely spared).</div>
                  <div><span className="text-sky-300 font-semibold">• Medial Lemniscus:</span> Contralateral vibration/proprioception loss.</div>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Cardinal Rule: Pain and temperature sensation are completely preserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Pons */}
      {activeTab === 'pons' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                The Pons: Basis Pontis vs. Tegmental Gaze Centers
              </h3>
              <span className="text-xs font-mono text-cyan-300">Book pp. 446–451</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-cyan-300 block">Millard-Gubler</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Ventrocaudal pons lesion. Damages exiting CN VI fascicle + CN VII fascicle + corticospinal tract.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Triad: Ipsilateral VI + Ipsilateral Peripheral VII + Contralateral Hemiplegia.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-purple-300 block">Raymond Syndrome</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Ventromedial pons lesion. Damages CN VI fascicle + corticospinal/corticobulbar tract. Spares CN VII nucleus.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Triad: Ipsilateral VI + Contralateral Hemiplegia with CENTRAL facial paresis.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-emerald-300 block">Foville Syndrome</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Dorsal caudal pontine tegmentum. Involves PPRF and/or abducens nucleus + CN VII + corticospinal tract.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Triad: Conjugate gaze palsy toward lesion + Peripheral VII + Contralateral Hemiplegia.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Midbrain */}
      {activeTab === 'midbrain' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                The Mesencephalon: Fascicular III Syndromes
              </h3>
              <span className="text-xs font-mono text-cyan-300">Book pp. 451–454</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-rose-300 block">Weber Syndrome</span>
                <p className="text-slate-300 text-[11px]">
                  Ventromedial crus cerebri. Involves exiting CN III fascicles and descending motor peduncle.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Ipsilateral CN III palsy (dilated pupil, ptosis) + Contralateral spastic hemiplegia.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-300 block">Benedikt Syndrome</span>
                <p className="text-slate-300 text-[11px]">
                  Midbrain tegmentum. Involves CN III fascicles, red nucleus, and substantia nigra.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Ipsilateral CN III palsy + Contralateral intention tremor, chorea, and hemiparesis.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-sky-300 block">Claude Syndrome</span>
                <p className="text-slate-300 text-[11px]">
                  Dorsal midbrain tegmentum. Involves CN III fascicles and superior cerebellar peduncle decussation.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Ipsilateral CN III palsy + Contralateral pure cerebellar ataxia (no tremor or hemiballismus).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Board Pitfalls */}
      {activeTab === 'pitfalls' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">
              Critical Board Traps & Localization Nuances (Brazis 8th Ed.)
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <span className="font-bold text-rose-300 block text-xs">
                  ⚠️ Trap 1: The Opalski Syndrome Paradox
                </span>
                <p className="text-slate-300 leading-relaxed">
                  In a classic Wallenberg syndrome, there is NO motor limb weakness. If a patient presents with Wallenberg features but has <strong className="text-rose-200">ipsilateral hemiparesis</strong>, the lesion has extended caudally below the pyramidal decussation to damage already-crossed corticospinal fibers. This is Opalski (submedullary) syndrome.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <span className="font-bold text-cyan-300 block text-xs">
                  ⚠️ Trap 2: Foville vs. Millard-Gubler Gaze Mechanics
                </span>
                <p className="text-slate-300 leading-relaxed">
                  In Millard-Gubler, the exiting CN VI <em className="text-cyan-200">fascicle</em> is damaged: the patient has isolated lateral rectus palsy (the other eye adducts normally on gaze). In Foville, the lesion is in the tegmentum involving the <strong className="text-cyan-200">abducens nucleus or PPRF</strong>: this creates a <strong className="text-cyan-200">conjugate horizontal gaze palsy</strong> (neither eye can look toward the lesion).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <span className="font-bold text-amber-300 block text-xs">
                  ⚠️ Trap 3: Dejerine Syndrome with Sparing of the Tongue
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Brazis emphasizes that because hypoglossal rootlets run somewhat laterally to the medial lemniscus and pyramid, cranial nerve XII may surprisingly be spared in anterior spinal artery occlusion, mimicking a pure capsular or medullary pyramid motor hemiparesis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
