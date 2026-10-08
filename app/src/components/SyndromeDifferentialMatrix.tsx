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
    <div className="flex-1 max-w-5xl mx-auto w-full p-4 space-y-5 animate-fade-in pb-24">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Differential Diagnostic Matrix
          </span>
          <span className="text-xs text-slate-400 font-mono">Brazis Clinical Neurology</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">
          Brainstem Syndromes Comparison Guide
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Side-by-side clinical distinction for board examination. Notice how a single millimeter difference between neighboring brainstem structures shifts the clinical triad.
        </p>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {(['midbrain', 'pons', 'medulla'] as const).map(grp => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition active:scale-95 border min-h-[44px] ${
                selectedGroup === grp
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:bg-slate-850'
              }`}
            >
              {grp === 'midbrain' ? 'Midbrain (Weber vs Benedikt vs Claude)' : grp === 'pons' ? 'Pons (Millard-Gubler vs Foville)' : 'Medulla (Wallenberg vs Dejerine vs Opalski)'}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Cards / Table */}
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {row.name}
                </h3>
                <span className="text-xs text-slate-400">{row.level}</span>
                <div className="pt-1.5">
                  <AssetBadge assetId={`syndromes/${row.id}`} />
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 self-start sm:self-auto">
                Artery: {row.vessel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-1">
                <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">
                  Cranial Nerves
                </span>
                <p className="text-slate-200">{row.cranialNerveDeficit}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-1">
                <span className="font-bold text-rose-400 block uppercase tracking-wider text-[10px]">
                  Motor Findings
                </span>
                <p className="text-slate-200">{row.motorDeficit}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-1">
                <span className="font-bold text-sky-400 block uppercase tracking-wider text-[10px]">
                  Sensory Findings
                </span>
                <p className="text-slate-200">{row.sensoryDeficit}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-1">
                <span className="font-bold text-purple-400 block uppercase tracking-wider text-[10px]">
                  Cerebellar / Movement
                </span>
                <p className="text-slate-200">{row.cerebellarOrInvoluntary}</p>
              </div>
            </div>

            {/* Pathognomonic Clue */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
              <span className="font-bold text-emerald-300 uppercase tracking-wider text-[10px] block mb-0.5">
                ⭐ Brazis Differentiating Hallmark:
              </span>
              <p className="text-emerald-100 font-medium leading-relaxed">
                {row.keyClue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
