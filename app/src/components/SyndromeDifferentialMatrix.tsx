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
      <div className="space-y-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
              Topographic Differentiation • Chapter 15
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Brainstem Syndromes Differential Matrix
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Localization in Clinical Neurology
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Side-by-side diagnostic criteria. A millimeter displacement between neighboring brainstem fascicles dramatically alters the clinical presentation.
        </p>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 max-w-md">
          {(['midbrain', 'pons', 'medulla'] as const).map(grp => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs capitalize transition active:scale-95 min-h-[38px] ${
                selectedGroup === grp
                  ? 'bg-white dark:bg-slate-100 text-slate-900 dark:text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
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
            className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#111726] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
              <div>
                <h3 className="text-[17px] font-serif font-semibold text-slate-900 dark:text-slate-100">
                  {row.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{row.level}</span>
                <div className="pt-1">
                  <AssetBadge assetId={`syndromes/${row.id}`} />
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
                Artery: {row.vessel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
                <span className="font-semibold text-amber-700 dark:text-amber-400 block uppercase tracking-wider text-[10px]">
                  Cranial Nerves
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{row.cranialNerveDeficit}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
                <span className="font-semibold text-rose-700 dark:text-rose-400 block uppercase tracking-wider text-[10px]">
                  Motor Findings
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{row.motorDeficit}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
                <span className="font-semibold text-sky-700 dark:text-sky-400 block uppercase tracking-wider text-[10px]">
                  Sensory Findings
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{row.sensoryDeficit}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
                <span className="font-semibold text-purple-700 dark:text-purple-400 block uppercase tracking-wider text-[10px]">
                  Cerebellar / Movement
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{row.cerebellarOrInvoluntary}</p>
              </div>
            </div>

            {/* Pathognomonic Clue */}
            <div className="p-3.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/20 border border-teal-500/20 text-xs">
              <span className="font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider text-[10px] block mb-0.5">
                ★ Brazis Diagnostic Hallmark:
              </span>
              <p className="text-teal-950 dark:text-teal-100 font-medium leading-relaxed">
                {row.keyClue}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
