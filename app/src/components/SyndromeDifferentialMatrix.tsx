import { useState } from 'react'
import { AssetBadge } from './StatusBadge'

interface SyndromeRow {
  /** Asset id suffix in content/sources.json ('syndromes/<id>'). */
  id: string
  name: string
  level: string
  vessel: string
  cranialNerveDeficit: string
  motorDeficit: string
  sensoryDeficit: string
  cerebellarOrInvoluntary: string
  keyClue: string
}

const COMPARISON_DATA: Record<'midbrain' | 'pons' | 'medulla', SyndromeRow[]> = {
  midbrain: [
    {
      id: 'weber',
      name: 'Weber Syndrome',
      level: 'Ventral Midbrain (Crus Cerebri)',
      vessel: 'PCA (Peduncular branches)',
      cranialNerveDeficit: 'Ipsilateral CN III paresis, including dilated pupil',
      motorDeficit: 'Contralateral hemiplegia (including lower facial weakness)',
      sensoryDeficit: 'Not part of the described syndrome',
      cerebellarOrInvoluntary: 'Not part of the described syndrome',
      keyClue: 'Ventral lesion (cerebral peduncle): third nerve palsy + contralateral hemiplegia, without tegmental cerebellar signs.'
    },
    {
      id: 'benedikt',
      name: 'Benedikt Syndrome',
      level: 'Midbrain Tegmentum (Red Nucleus, Brachium Conjunctivum; larger lesions include Substantia Nigra)',
      vessel: 'Branches of the PCA (red nucleus: peduncular arteries)',
      cranialNerveDeficit: 'Ipsilateral CN III paresis, usually with dilated pupil',
      motorDeficit: 'Contralateral hemiparesis with hyperactive stretch reflexes',
      sensoryDeficit: 'Not part of the described syndrome',
      cerebellarOrInvoluntary: 'Contralateral hemiataxia with intention tremor (red nucleus); Ch. 8 also lists choreiform movements',
      keyClue: 'Third nerve palsy + contralateral hemiataxia/intention tremor (red nucleus) + hemiparesis.'
    },
    {
      id: 'claude',
      name: 'Claude Syndrome',
      level: 'Dorsal Midbrain Tegmentum (dorsal Red Nucleus & Brachium Conjunctivum)',
      vessel: 'Not specified by Brazis',
      cranialNerveDeficit: 'Ipsilateral CN III',
      motorDeficit: 'Not specified (picture is "similar" to Benedikt)',
      sensoryDeficit: 'Not part of the described syndrome',
      cerebellarOrInvoluntary: 'Contralateral prominent cerebellar signs (asynergia, ataxia, dysmetria, dysdiadochokinesia); outflow-tract cerebellar tremor (Ch. 8)',
      keyClue: 'Third nerve palsy + prominent contralateral cerebellar signs; no hemiballismus.'
    },
    {
      id: 'parinaud',
      name: 'Parinaud (Pretectal) Syndrome',
      level: 'Dorsal Midbrain Tectum (Pretectal area & Posterior Commissure)',
      vessel: 'Pineal mass compression / Hydrocephalus / PCA',
      cranialNerveDeficit: 'Supranuclear upgaze paralysis, light-near dissociation',
      motorDeficit: 'Spared',
      sensoryDeficit: 'Spared',
      cerebellarOrInvoluntary: 'Convergence-retraction nystagmus, Collier lid retraction',
      keyClue: 'Supranuclear vertical upgaze palsy + light-near dissociation (Collier sign).'
    }
  ],
  pons: [
    {
      id: 'millard_gubler',
      name: 'Millard-Gubler Syndrome',
      level: 'Ventral Caudal Pons (Basis Pontis)',
      vessel: 'Basilar branches',
      cranialNerveDeficit: 'Ipsilateral CN VI (abduction) + Ipsilateral peripheral CN VII (full face)',
      motorDeficit: 'Contralateral hemiplegia (sparing face)',
      sensoryDeficit: 'Spared',
      cerebellarOrInvoluntary: 'None',
      keyClue: 'Isolated VI palsy + complete peripheral VII palsy + contralateral hemiplegia.'
    },
    {
      id: 'raymond',
      name: 'Raymond Syndrome',
      level: 'Ventral Medial Pons',
      vessel: 'Paramedian basilar branches',
      cranialNerveDeficit: 'Ipsilateral CN VI (abduction paresis)',
      motorDeficit: 'Contralateral hemiplegia WITH central facial paresis',
      sensoryDeficit: 'Spared',
      cerebellarOrInvoluntary: 'None',
      keyClue: 'Spares facial motor nucleus (spares upper forehead; central facial weakness).'
    },
    {
      id: 'foville',
      name: 'Foville Syndrome',
      level: 'Dorsal Caudal Pontine Tegmentum',
      vessel: 'Circumferential basilar branches',
      cranialNerveDeficit: 'Conjugate horizontal gaze palsy toward lesion (PPRF/VI) + CN VII palsy',
      motorDeficit: 'Contralateral hemiplegia',
      sensoryDeficit: 'Spared',
      cerebellarOrInvoluntary: 'None',
      keyClue: 'Conjugate gaze palsy (neither eye moves toward lesion) + peripheral CN VII.'
    },
    {
      id: 'marie_foix',
      name: 'Marie-Foix Syndrome',
      level: 'Lateral Pons & Middle Cerebellar Peduncle (Brachium Pontis)',
      vessel: 'Not specified by Brazis',
      cranialNerveDeficit: 'None listed',
      motorDeficit: 'Contralateral hemiparesis (corticospinal tract)',
      sensoryDeficit: 'Variable contralateral hemihypesthesia for pain & temperature (spinothalamic tract)',
      cerebellarOrInvoluntary: 'Ipsilateral cerebellar ataxia',
      keyClue: 'Ipsilateral ataxia + contralateral hemiparesis ± contralateral pain/temperature loss.'
    },
    {
      id: 'locked_in',
      name: 'Locked-In Syndrome',
      level: 'Bilateral Ventral Pons (Basis Pontis)',
      vessel: 'Bilateral ventral pontine lesions (infarction, tumor, hemorrhage, etc.); basilar artery thrombosis',
      cranialNerveDeficit: 'Aphonia (corticobulbar fibers); occasional impairment of horizontal eye movements (bilateral CN VI fascicles)',
      motorDeficit: 'Quadriplegia (bilateral corticospinal tracts)',
      sensoryDeficit: 'Not part of the described syndrome',
      cerebellarOrInvoluntary: 'Vertical eye movements and blinking intact (dorsal supranuclear ocular pathways spared)',
      keyClue: 'Fully awake (reticular formation spared), quadriplegic, aphonic; can communicate with vertical eye movements and blinking.'
    }
  ],
  medulla: [
    {
      id: 'wallenberg',
      name: 'Wallenberg (Lateral Medullary)',
      level: 'Dorsolateral Medulla Oblongata',
      vessel: 'PICA or Intracranial Vertebral Artery',
      cranialNerveDeficit: 'Ipsilateral facial numbness (CN V), dysphagia/hoarseness (Ambiguus IX/X)',
      motorDeficit: 'Spared (pyramids unaffected)',
      sensoryDeficit: 'Crossed analgesia: ipsilateral face + contralateral body',
      cerebellarOrInvoluntary: 'Ipsilateral ataxia, ocular ipsipulsion, ipsilateral Horner syndrome',
      keyClue: 'Crossed thermoanalgesia + Horner + dysphagia; ZERO limb motor weakness.'
    },
    {
      id: 'dejerine',
      name: 'Dejerine (Medial Medullary)',
      level: 'Paramedian Medulla',
      vessel: 'Anterior Spinal Artery / Paramedian Vertebral',
      cranialNerveDeficit: 'Ipsilateral tongue weakness & atrophy (CN XII)',
      motorDeficit: 'Contralateral hemiplegia (sparing face)',
      sensoryDeficit: 'Contralateral vibration & joint position sense loss (Medial Lemniscus)',
      cerebellarOrInvoluntary: 'None',
      keyClue: 'Ipsilateral tongue deviation + contralateral hemiplegia + dorsal column loss.'
    },
    {
      id: 'opalski',
      name: 'Opalski (Submedullary)',
      level: 'Lateral Medulla extending BELOW pyramidal decussation',
      vessel: 'Vertebral Artery distal penetrating branches',
      cranialNerveDeficit: 'Wallenberg signs (CN V, IX, X, Horner)',
      motorDeficit: 'Ipsilateral spastic hemiparesis',
      sensoryDeficit: 'Crossed analgesia (face vs body)',
      cerebellarOrInvoluntary: 'Ipsilateral ataxia',
      keyClue: 'Looks like Wallenberg but with IPSILATERAL hemiparesis (post-decussation).'
    }
  ]
}

export function SyndromeDifferentialMatrix() {
  const [selectedGroup, setSelectedGroup] = useState<'midbrain' | 'pons' | 'medulla'>('midbrain')

  const rows = COMPARISON_DATA[selectedGroup]

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-5 space-y-6 animate-fade-in pb-28">
      {/* Header */}
      <div className="space-y-4 border-b border-[#e2dfd7] dark:border-[#28282e] pb-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1 font-mono">
              Topographic Differentiation • Chapter 15
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Brainstem Syndromes Differential Matrix
            </h2>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Localization in Clinical Neurology
          </span>
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-3xl">
          Side-by-side diagnostic criteria. A millimeter displacement between neighboring brainstem fascicles dramatically alters the clinical presentation.
        </p>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-[#1b1b1e] border border-stone-200 dark:border-[#28282e] max-w-md">
          {(['midbrain', 'pons', 'medulla'] as const).map(grp => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs capitalize transition active:scale-95 min-h-[38px] ${
                selectedGroup === grp
                  ? 'bg-white dark:bg-[#131315] text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-4">
        {rows.map((row, idx) => (
          <article
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1b1b1e] border border-stone-200 dark:border-[#28282e] space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-[#28282e] pb-3">
              <div>
                <h3 className="text-[17px] font-serif font-semibold text-stone-900 dark:text-stone-100">
                  {row.name}
                </h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">{row.level}</span>
                <div className="pt-1">
                  <AssetBadge assetId={`syndromes/${row.id}`} />
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-100 dark:bg-[#131315] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-[#28282e] self-start sm:self-auto">
                Artery: {row.vessel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#131315] border border-stone-200/70 dark:border-[#28282e] space-y-1">
                <span className="font-semibold text-amber-700 dark:text-amber-400 block uppercase tracking-wider text-[10px] font-mono">
                  Cranial Nerves
                </span>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{row.cranialNerveDeficit}</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#131315] border border-stone-200/70 dark:border-[#28282e] space-y-1">
                <span className="font-semibold text-rose-700 dark:text-rose-400 block uppercase tracking-wider text-[10px] font-mono">
                  Motor Findings
                </span>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{row.motorDeficit}</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#131315] border border-stone-200/70 dark:border-[#28282e] space-y-1">
                <span className="font-semibold text-sky-700 dark:text-sky-400 block uppercase tracking-wider text-[10px] font-mono">
                  Sensory Findings
                </span>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{row.sensoryDeficit}</p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#131315] border border-stone-200/70 dark:border-[#28282e] space-y-1">
                <span className="font-semibold text-purple-700 dark:text-purple-400 block uppercase tracking-wider text-[10px] font-mono">
                  Cerebellar / Movement
                </span>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{row.cerebellarOrInvoluntary}</p>
              </div>
            </div>

            {/* Pathognomonic Clue */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">
              <span className="font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wider text-[10px] block mb-0.5 font-mono">
                ★ Brazis Diagnostic Hallmark:
              </span>
              <p className="text-amber-950 dark:text-amber-100/90 font-medium leading-relaxed">
                {row.keyClue}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
