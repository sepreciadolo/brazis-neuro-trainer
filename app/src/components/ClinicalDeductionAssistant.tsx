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
    levelColor = 'text-rose-400'
  } else if (hasPontineCN && !hasMidbrainCN && !hasMedullaryCN) {
    level = 'The Pons'
    levelColor = 'text-cyan-400'
  } else if (hasMedullaryCN && !hasMidbrainCN && !hasPontineCN) {
    level = 'Medulla Oblongata'
    levelColor = 'text-amber-400'
  } else if (selectedCN.length > 0) {
    level = 'Multifocal / Junctional Brainstem'
    levelColor = 'text-purple-400'
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
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-5 animate-fade-in pb-24">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Gates' Rule of 4 (cited in Brazis)
          </span>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800"
          >
            Reset
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-100">
          Clinical Localization Deduction Assistant
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Toggle clinical exam findings to deduce the exact rostrocaudal level, axial zone (Medial vs Lateral), and candidate brainstem vascular syndromes using Gates' Rule of 4.
        </p>
        <AssetBadge assetId="deduction/rule_of_4" detail />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Input selectors (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Long Tract Signs */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Long Tract & Autonomic Deficits
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  motorWeakness
                    ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Contralateral Hemiplegia (Motor)</span>
                <input
                  type="checkbox"
                  checked={motorWeakness}
                  onChange={e => setMotorWeakness(e.target.checked)}
                  className="rounded accent-rose-500"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  vibrationLoss
                    ? 'bg-sky-950/70 border-sky-500 text-sky-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Vibration / Proprioception Loss</span>
                <input
                  type="checkbox"
                  checked={vibrationLoss}
                  onChange={e => setVibrationLoss(e.target.checked)}
                  className="rounded accent-sky-500"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  painTempLoss
                    ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Pain & Temperature Loss (Body)</span>
                <input
                  type="checkbox"
                  checked={painTempLoss}
                  onChange={e => setPainTempLoss(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none ${
                  ataxia
                    ? 'bg-purple-950/70 border-purple-500 text-purple-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Ipsilateral Limb Ataxia</span>
                <input
                  type="checkbox"
                  checked={ataxia}
                  onChange={e => setAtaxia(e.target.checked)}
                  className="rounded accent-purple-500"
                />
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs font-medium select-none sm:col-span-2 ${
                  horner
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>Ipsilateral Horner Syndrome (Sympathetic)</span>
                <input
                  type="checkbox"
                  checked={horner}
                  onChange={e => setHorner(e.target.checked)}
                  className="rounded accent-amber-500"
                />
              </label>
            </div>
          </div>

          {/* Cranial Nerve Signs */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              2. Cranial Nerve Signs (Pinpoints Rostrocaudal Level)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { num: 3, label: 'CN III', desc: 'Ptosis / Mydriasis' },
                { num: 4, label: 'CN IV', desc: 'Trochlear' },
                { num: 5, label: 'CN V', desc: 'Facial Numbness' },
                { num: 6, label: 'CN VI', desc: 'Abduction Palsy' },
                { num: 7, label: 'CN VII', desc: 'Facial Paralysis' },
                { num: 8, label: 'CN VIII', desc: 'Vertigo / Hearing' },
                { num: 9, label: 'CN IX/X', desc: 'Dysphagia / Palate' },
                { num: 12, label: 'CN XII', desc: 'Tongue Deviation' }
              ].map(item => {
                const isSelected = selectedCN.includes(item.num)
                return (
                  <button
                    key={item.num}
                    onClick={() => toggleCN(item.num)}
                    className={`p-3 rounded-xl border text-left transition select-none flex flex-col justify-between min-h-[56px] active:scale-95 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold">{item.label}</span>
                    <span className={`text-[10px] truncate ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                      {item.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Deduction Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Diagnostic Synthesis
            </h3>

            {/* Level & Zone */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                  Rostrocaudal Level
                </span>
                <span className={`text-base font-extrabold ${levelColor}`}>
                  {level}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                  Axial Territory
                </span>
                <span className="text-sm font-bold text-slate-200">
                  {axialZone}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                  Vascular Territory
                </span>
                <span className="text-xs font-semibold text-cyan-300">
                  {likelyVessel}
                </span>
              </div>
            </div>

            {/* Syndromes matching */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Top Candidate Syndromes
              </span>
              {predictedSyndromes.length > 0 ? (
                <div className="space-y-1.5">
                  {predictedSyndromes.map((syn, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-xs font-bold text-emerald-200 flex items-center gap-2"
                    >
                      <span>🎯</span>
                      <span>{syn}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic py-2">
                  Select signs and cranial nerves on the left to activate diagnostic matching.
                </p>
              )}
            </div>

            {/* Rule of 4 reminder */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-slate-300">Gates "Rule of 4" Axioms:</div>
              <p>• 4 Medial structures (M): Motor tract, Medial lemniscus, MLF, Motor nuclei (3, 4, 6, 12).</p>
              <p>• 4 Lateral structures (S): Spinothalamic, Spinocerebellar, Sympathetic, Sensory V.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
