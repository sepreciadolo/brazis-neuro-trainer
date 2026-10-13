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
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 animate-fade-in pb-28">
      {/* Editorial Monograph Header */}
      <header className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Brazis Chapter 15 • Topographic Differentiation
          </p>
          <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
            Comparative Matrix
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Brainstem Syndromes Differential Matrix
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl">
          Side-by-side topographic comparison. A millimeter shift between neighboring fascicles transforms the clinical picture.
        </p>
      </header>

      {/* Level Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-stone-500 mr-2">
          Level:
        </span>
        {(['midbrain', 'pons', 'medulla'] as const).map(grp => (
          <button
            key={grp}
            onClick={() => setSelectedGroup(grp)}
            className={`py-1.5 px-4 rounded-xl text-xs font-medium capitalize transition cursor-pointer ${
              selectedGroup === grp
                ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {grp}
          </button>
        ))}
      </div>

      {/* Desktop & Tablet: Authentic Comparative Matrix Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-[#141417]/50 backdrop-blur-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 bg-stone-50/75 dark:bg-[#18181c]/75">
              <th className="py-3 px-4 w-[22%] font-semibold">Syndrome & Topography</th>
              <th className="py-3 px-4 w-[18%] font-semibold">Cranial Nerves (Ipsilateral)</th>
              <th className="py-3 px-4 w-[18%] font-semibold">Motor CST</th>
              <th className="py-3 px-4 w-[20%] font-semibold">Sensory & Cerebellar</th>
              <th className="py-3 px-4 w-[22%] font-semibold">Brazis Hallmark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800/70">
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-amber-500/[0.03] transition-colors">
                {/* Syndrome, Level & Artery */}
                <td className="py-4 px-4 align-top space-y-1.5">
                  <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {row.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                    {row.level}
                  </div>
                  <div className="text-[10px] font-mono text-stone-600 dark:text-stone-400 pt-0.5">
                    <span className="text-stone-400 dark:text-stone-500">Vessel: </span>{row.vessel}
                  </div>
                  <AssetBadge assetId={`syndromes/${row.id}`} />
                </td>

                {/* Cranial Nerves */}
                <td className="py-4 px-4 align-top leading-relaxed text-stone-800 dark:text-stone-200">
                  <span className="font-medium">{row.cranialNerveDeficit}</span>
                </td>

                {/* Motor */}
                <td className="py-4 px-4 align-top leading-relaxed text-stone-800 dark:text-stone-200">
                  <span>{row.motorDeficit}</span>
                </td>

                {/* Sensory & Cerebellar */}
                <td className="py-4 px-4 align-top space-y-2 leading-relaxed text-stone-800 dark:text-stone-200">
                  {row.sensoryDeficit !== 'Not part of the described syndrome' && row.sensoryDeficit !== 'Spared' && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-sky-700 dark:text-sky-400 block font-semibold">
                        Sensory:
                      </span>
                      <span>{row.sensoryDeficit}</span>
                    </div>
                  )}
                  {row.cerebellarOrInvoluntary !== 'Not part of the described syndrome' && row.cerebellarOrInvoluntary !== 'None' && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-400 block font-semibold">
                        Coordination / Move:
                      </span>
                      <span>{row.cerebellarOrInvoluntary}</span>
                    </div>
                  )}
                  {((row.sensoryDeficit === 'Spared' || row.sensoryDeficit === 'Not part of the described syndrome') &&
                    (row.cerebellarOrInvoluntary === 'None' || row.cerebellarOrInvoluntary === 'Not part of the described syndrome')) && (
                    <span className="text-stone-400 dark:text-stone-600 italic">Spared / Unaffected</span>
                  )}
                </td>

                {/* Brazis Hallmark */}
                <td className="py-4 px-4 align-top border-l border-stone-200/40 dark:border-stone-800/40">
                  <p className="text-[11px] font-serif font-medium leading-relaxed text-amber-900 dark:text-amber-200/90">
                    {row.keyClue}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Clean Editorial Definition List (No nested card boxes) */}
      <div className="md:hidden space-y-6">
        {rows.map(row => (
          <article
            key={row.id}
            className="border-l-2 border-amber-500 pl-4 py-1 space-y-3"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  {row.name}
                </h2>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 shrink-0">
                  {row.vessel}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">{row.level}</p>
              <AssetBadge assetId={`syndromes/${row.id}`} className="mt-1" />
            </div>

            <dl className="space-y-2 text-xs">
              <div>
                <dt className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                  Cranial Nerves:
                </dt>
                <dd className="text-stone-800 dark:text-stone-200 mt-0.5 leading-snug">
                  {row.cranialNerveDeficit}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">
                  Motor Deficit:
                </dt>
                <dd className="text-stone-800 dark:text-stone-200 mt-0.5 leading-snug">
                  {row.motorDeficit}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-bold">
                  Sensory & Cerebellar:
                </dt>
                <dd className="text-stone-800 dark:text-stone-200 mt-0.5 leading-snug">
                  {row.sensoryDeficit !== 'Not part of the described syndrome' && `${row.sensoryDeficit}. `}
                  {row.cerebellarOrInvoluntary !== 'Not part of the described syndrome' && row.cerebellarOrInvoluntary}
                </dd>
              </div>

              <div className="pt-1">
                <dt className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                  ★ Brazis Hallmark:
                </dt>
                <dd className="text-stone-900 dark:text-amber-100/90 font-serif text-xs font-medium mt-0.5 leading-snug">
                  {row.keyClue}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
