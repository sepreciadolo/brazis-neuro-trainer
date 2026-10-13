import { useState } from 'react'
import { AssetBadge } from './StatusBadge'

export function ClinicalDeductionAssistant() {
  // Long tract selections
  const [motorWeakness, setMotorWeakness] = useState<boolean>(false)
  const [vibrationLoss, setVibrationLoss] = useState<boolean>(false)
  const [painTempLoss, setPainTempLoss] = useState<boolean>(false)
  const [ataxia, setAtaxia] = useState<boolean>(false)
  const [horner, setHorner] = useState<boolean>(false)

  // Cranial nerves
  const [selectedCN, setSelectedCN] = useState<number[]>([])

  const toggleCN = (num: number) => {
    setSelectedCN(prev =>
      prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]
    )
  }

  // Gates' Rule of 4 deduction
  let level = 'Indeterminate'
  let levelColor = 'text-slate-400'
  let axialZone = 'Indeterminate'
  const predictedSyndromes: string[] = []
  let likelyVessel = 'Vertebrobasilar system'

  // Deduce level by cranial nerves
  const hasMidbrainCN = selectedCN.some(cn => [3, 4].includes(cn))
  const hasPontineCN = selectedCN.some(cn => [5, 6, 7, 8].includes(cn))
  const hasMedullaryCN = selectedCN.some(cn => [9, 10, 11, 12].includes(cn))

  if (hasMidbrainCN && !hasPontineCN && !hasMedullaryCN) {
    level = 'Mesencephalon (Midbrain)'
    levelColor = 'text-rose-600 dark:text-rose-400'
  } else if (hasPontineCN && !hasMidbrainCN && !hasMedullaryCN) {
    level = 'The Pons'
    levelColor = 'text-amber-600 dark:text-amber-400'
  } else if (hasMedullaryCN && !hasMidbrainCN && !hasPontineCN) {
    level = 'Medulla Oblongata'
    levelColor = 'text-amber-700 dark:text-amber-300'
  } else if (selectedCN.length > 0) {
    level = 'Multifocal / Junctional Brainstem'
    levelColor = 'text-stone-800 dark:text-stone-200'
  }

  // Deduce axial zone (Medial "4 M's" vs Lateral "4 S's")
  const isMedial = motorWeakness || vibrationLoss || selectedCN.some(cn => [3, 4, 6, 12].includes(cn))
  const isLateral = painTempLoss || ataxia || horner || selectedCN.some(cn => [5, 7, 8, 9, 10].includes(cn))

  if (isMedial && !isLateral) {
    axialZone = 'Medial (Paramedian Zone)'
  } else if (isLateral && !isMedial) {
    axialZone = 'Lateral / Dorsolateral Zone'
  } else if (isMedial && isLateral) {
    axialZone = 'Extensive (Medial + Lateral or Hemimedullary)'
  }

  // Deduce specific syndromes
  if (level.includes('Medulla')) {
    if (isLateral && selectedCN.some(cn => [9, 10, 5].includes(cn))) {
      predictedSyndromes.push('Lateral Medullary (Wallenberg) Syndrome')
      likelyVessel = 'PICA or Intracranial Vertebral Artery'
    }
    if (isMedial && selectedCN.includes(12) && motorWeakness) {
      predictedSyndromes.push('Medial Medullary (Dejerine) Syndrome')
      likelyVessel = 'Anterior Spinal Artery / Paramedian Vertebral'
    }
  }

  if (level.includes('Pons')) {
    if (selectedCN.includes(6) && selectedCN.includes(7) && motorWeakness) {
      predictedSyndromes.push('Millard-Gubler Syndrome')
      likelyVessel = 'Basilar artery paramedian / short circumferential branches'
    } else if (selectedCN.includes(6) && motorWeakness && !selectedCN.includes(7)) {
      predictedSyndromes.push('Raymond Syndrome (Alternating Abducens Hemiplegia)')
      likelyVessel = 'Basilar artery paramedian branches'
    }
    if (selectedCN.includes(6) && selectedCN.includes(7) && isLateral) {
      predictedSyndromes.push('Foville Syndrome (Dorsal pontine tegmentum)')
      likelyVessel = 'Circumferential basilar branches'
    }
    if (isLateral && ataxia && motorWeakness) {
      predictedSyndromes.push('Marie-Foix Syndrome')
      likelyVessel = 'Anterior Inferior Cerebellar Artery (AICA)'
    }
  }

  if (level.includes('Midbrain')) {
    if (selectedCN.includes(3) && motorWeakness && !ataxia) {
      predictedSyndromes.push('Weber Syndrome (Crus cerebri + CN III)')
      likelyVessel = 'Peduncular branches of Posterior Cerebral Artery'
    }
    if (selectedCN.includes(3) && (ataxia || vibrationLoss)) {
      predictedSyndromes.push('Benedikt / Claude Syndrome (Midbrain Tegmentum)')
      likelyVessel = 'Paramedian branches of PCA'
    }
  }

  const handleReset = () => {
    setMotorWeakness(false)
    setVibrationLoss(false)
    setPainTempLoss(false)
    setAtaxia(false)
    setHorner(false)
    setSelectedCN([])
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 animate-fade-in pb-28">
      {/* Editorial Header */}
      <header className="space-y-1 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Gates' Rule of 4 • Localization Engine
          </p>
          <button
            onClick={handleReset}
            className="text-xs font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 px-3 py-1 rounded-lg border border-stone-200 dark:border-stone-800 transition cursor-pointer"
          >
            Reset
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Clinical Localization Deduction Assistant
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Select long tract deficits and cranial nerve signs to deduce the exact vertical level, axial territory, and vascular syndrome.
        </p>
        <AssetBadge assetId="deduction/rule_of_4" detail className="pt-1" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input examination findings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Long Tract Signs */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold">
              01. Long Tract & Autonomic Deficits
            </h2>

            <div className="space-y-1.5">
              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  motorWeakness
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-900 dark:text-rose-200'
                    : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div>
                  <span className="font-semibold block">Contralateral Hemiplegia (Motor CST)</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Paramedian ventral tract</span>
                </div>
                <input
                  type="checkbox"
                  checked={motorWeakness}
                  onChange={e => setMotorWeakness(e.target.checked)}
                  className="w-4 h-4 rounded accent-rose-600 cursor-pointer"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  vibrationLoss
                    ? 'bg-sky-500/10 border-sky-500/40 text-sky-900 dark:text-sky-200'
                    : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div>
                  <span className="font-semibold block">Vibration & Proprioception Loss (Medial Lemniscus)</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Contralateral dorsal column tract</span>
                </div>
                <input
                  type="checkbox"
                  checked={vibrationLoss}
                  onChange={e => setVibrationLoss(e.target.checked)}
                  className="w-4 h-4 rounded accent-sky-600 cursor-pointer"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  painTempLoss
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200'
                    : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div>
                  <span className="font-semibold block">Pain & Temperature Loss (Spinothalamic)</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Contralateral lateral pathway</span>
                </div>
                <input
                  type="checkbox"
                  checked={painTempLoss}
                  onChange={e => setPainTempLoss(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-600 cursor-pointer"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  ataxia
                    ? 'bg-stone-200 dark:bg-stone-800 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100'
                    : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div>
                  <span className="font-semibold block">Ipsilateral Limb Ataxia (Spinocerebellar)</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Restiform body / brachium pontis</span>
                </div>
                <input
                  type="checkbox"
                  checked={ataxia}
                  onChange={e => setAtaxia(e.target.checked)}
                  className="w-4 h-4 rounded accent-stone-700 cursor-pointer"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  horner
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200'
                    : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div>
                  <span className="font-semibold block">Ipsilateral Horner Syndrome (Sympathetics)</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Descending pupillomotor tract</span>
                </div>
                <input
                  type="checkbox"
                  checked={horner}
                  onChange={e => setHorner(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-600 cursor-pointer"
                />
              </label>
            </div>
          </section>

          {/* Section 2: Cranial Nerves */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold">
              02. Cranial Nerve Signs (Pinpoints Rostrocaudal Level)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { num: 3, label: 'CN III', desc: 'Ptosis / Pupil' },
                { num: 4, label: 'CN IV', desc: 'Trochlear' },
                { num: 5, label: 'CN V', desc: 'Face Numb' },
                { num: 6, label: 'CN VI', desc: 'Abduction' },
                { num: 7, label: 'CN VII', desc: 'Facial Palsy' },
                { num: 8, label: 'CN VIII', desc: 'Vertigo / Audio' },
                { num: 9, label: 'CN IX/X', desc: 'Dysphagia' },
                { num: 12, label: 'CN XII', desc: 'Tongue Weak' }
              ].map(item => {
                const isSelected = selectedCN.includes(item.num)
                return (
                  <button
                    key={item.num}
                    onClick={() => toggleCN(item.num)}
                    className={`p-3 rounded-xl border text-left transition select-none flex flex-col justify-between min-h-[58px] cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 border-stone-900 dark:border-stone-100 font-bold shadow-xs'
                        : 'bg-stone-50/60 dark:bg-[#151518]/60 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono">{item.label}</span>
                    <span className={`text-[11px] truncate ${isSelected ? 'text-stone-200 dark:text-stone-800' : 'text-stone-500'}`}>
                      {item.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right: Authoritative Diagnostic Verdict (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <section className="border-l-2 border-amber-500 pl-4 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              Diagnostic Synthesis
            </h2>

            {/* Level Verdict */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Rostrocaudal Level
              </span>
              <p className={`text-2xl font-serif font-bold ${levelColor}`}>
                {level}
              </p>
            </div>

            {/* Axial Territory */}
            <div className="space-y-1 border-t border-stone-200/80 dark:border-stone-800/80 pt-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Axial Territory
              </span>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                {axialZone}
              </p>
            </div>

            {/* Vascular Territory */}
            <div className="space-y-1 border-t border-stone-200/80 dark:border-stone-800/80 pt-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Vascular Territory
              </span>
              <p className="text-xs font-mono text-stone-700 dark:text-stone-300">
                {likelyVessel}
              </p>
            </div>

            {/* Candidate Syndromes */}
            <div className="border-t border-stone-200/80 dark:border-stone-800/80 pt-3 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Candidate Syndromes
              </span>
              {predictedSyndromes.length > 0 ? (
                <ul className="space-y-1.5">
                  {predictedSyndromes.map((syn, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-medium text-amber-900 dark:text-amber-200 flex items-start gap-2"
                    >
                      <span className="text-amber-600 dark:text-amber-400">✓</span>
                      <span>{syn}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-stone-400 italic">
                  Select signs and cranial nerves on the left to activate diagnostic matching.
                </p>
              )}
            </div>
          </section>

          {/* Gates Rule of 4 Axioms Summary */}
          <div className="border-l-2 border-stone-300 dark:border-stone-800 pl-4 py-1 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
            <span className="font-mono text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Gates Axioms Reminder:
            </span>
            <p>• <strong>4 Medial (M):</strong> Motor CST, Medial lemniscus, MLF, Motor CNs (3, 4, 6, 12).</p>
            <p>• <strong>4 Lateral (S):</strong> Spinothalamic, Spinocerebellar, Sympathetic, Sensory V.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
