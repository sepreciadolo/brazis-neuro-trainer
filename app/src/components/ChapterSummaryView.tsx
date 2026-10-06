import { useState } from 'react'

interface ChapterSummaryProps {
  isDark?: boolean
}

interface GenericChapterDigest {
  number: number
  title: string
  subtitle: string
  pages: string
  coreAnatomy: { title: string; points: string[] }[]
  localizationRules: { rule: string; explanation: string }[]
  keySyndromes: { name: string; triad: string; clue: string }[]
  boardTraps: string[]
}

const ALL_CHAPTER_DIGESTS: Record<number, GenericChapterDigest> = {
  1: {
    number: 1,
    title: "General Principles of Neurologic Localization",
    subtitle: "Upper vs Lower Motor Neuron, Cortical vs Subcortical, and Diagnostic Patterns",
    pages: "pp. 1–30",
    coreAnatomy: [
      {
        title: "Upper vs. Lower Motor Neuron Hallmarks",
        points: [
          "UMN: Spasticity (velocity-dependent tone), hyperactive tendon reflexes, clonus, extensor plantar response (Babinski), and Hoffmann sign without denervation atrophy.",
          "LMN: Flaccidity (hypotonia), hyporeflexia or areflexia, early neurogenic muscle atrophy, and visible spontaneous fasciculations.",
          "Lesion level: Increased tone and reflexes in a limb place the UMN lesion rostral to that limb's segmental spinal reflex arc."
        ]
      },
      {
        title: "Cortical vs. Subcortical Discriminators",
        points: [
          "Cortical: Higher cognitive deficits (aphasia, apraxia, hemispatial neglect, astereognosis, agraphesthesia, visual field cuts).",
          "Subcortical: Pure motor hemiparesis or pure sensory stroke (lacunar syndromes), dense sensorimotor hemiplegia without aphasia or neglect."
        ]
      }
    ],
    localizationRules: [
      {
        rule: "Alternating (Crossed) Brainstem Axiom",
        explanation: "An ipsilateral cranial nerve deficit combined with a contralateral motor or sensory long-tract sign points definitively to the brainstem at the exit level of the involved cranial nerve."
      },
      {
        rule: "Hoover Sign for Functional Weakness",
        explanation: "During voluntary hip flexion of the paretic leg, involuntary downward pressure under the contralateral heel indicates intact subcortical motor pathways."
      }
    ],
    keySyndromes: [
      {
        name: "Transverse Myelopathy",
        triad: "Bilateral paraplegia + Sharp sensory level on trunk + Early bladder/sphincter retention",
        clue: "The sensory level on the trunk marks the segmental level of the cord lesion, not the vertebral level."
      },
      {
        name: "Alternating Hemiplegia",
        triad: "Ipsilateral cranial nerve palsy + Contralateral spastic hemiplegia",
        clue: "Localizes precisely to the brainstem: CN III = Midbrain, CN VI/VII = Pons, CN XII = Medulla."
      }
    ],
    boardTraps: [
      "Midline sensory splitting: A sharp sensory cutoff precisely at the midline indicates non-organic (functional) sensory loss; anatomical cutaneous nerves overlap across the midline by 1 to 2 cm.",
      "Spinal shock: Acute severe UMN spinal cord transection initially presents with flaccidity and areflexia, mimicking an acute LMN lesion for days to weeks before spasticity appears."
    ]
  },
  2: {
    number: 2,
    title: "Peripheral Nerves",
    subtitle: "Upper & Lower Extremity Entrapment Neuropathies and Clinical Differentiations",
    pages: "pp. 31–82",
    coreAnatomy: [
      {
        title: "Upper Extremity Major Nerves",
        points: [
          "Median: Forearm pronation, wrist flexion, thumb opposition and abduction, and index/middle distal flexion (AIN).",
          "Ulnar: Medial wrist/finger flexion (FCU, FDP 4-5) and all intrinsic hand muscles (interossei, adductor pollicis, hypothenar).",
          "Radial: Triceps (elbow extension), brachioradialis, wrist and finger extension, and dorsal first web space sensation."
        ]
      },
      {
        title: "Lower Extremity Major Nerves",
        points: [
          "Common Fibular (Peroneal): Ankle dorsiflexion, toe extension, ankle eversion, and dorsum of foot sensation.",
          "Tibial: Ankle plantar flexion (gastrocnemius/soleus), foot inversion (tibialis posterior), and sole sensation.",
          "Femoral: Quadriceps (knee extension), patellar reflex, and anterior thigh / medial calf (saphenous) sensation."
        ]
      }
    ],
    localizationRules: [
      {
        rule: "Carpal Tunnel vs. Proximal Median Neuropathy",
        explanation: "Sensation over the thenar eminence is spared in carpal tunnel syndrome because the palmar cutaneous branch arises proximal to the flexor retinaculum and passes superficially."
      },
      {
        rule: "Fibular (Peroneal) Neuropathy vs. L5 Radiculopathy",
        explanation: "Ankle inversion (tibialis posterior, tibial nerve) is normal in fibular neuropathy at the fibular head, but is weak in an L5 radiculopathy."
      }
    ],
    keySyndromes: [
      {
        name: "Anterior Interosseous Syndrome (Kiloh-Nevin)",
        triad: "Weak flexor pollicis longus + Weak radial FDP + Failed 'OK' sign (pulp-to-pulp pinch)",
        clue: "Pure motor neuropathy of deep median branch; cutaneous sensation is 100% normal."
      },
      {
        name: "Saturday Night Palsy (Spiral Groove)",
        triad: "Wrist drop + Finger drop + Sparing of triceps and triceps reflex",
        clue: "Compression in the humeral groove damages the radial nerve after triceps branches have already exited in the axilla."
      },
      {
        name: "Guyon Canal vs. Cubital Tunnel",
        triad: "Palmar ulnar numbness + Sparing of dorsal ulnar hand sensation",
        clue: "The dorsal ulnar cutaneous branch arises 5–8 cm proximal to the wrist, sparing dorsal sensation in Guyon canal lesions."
      }
    ],
    boardTraps: [
      "Froment sign: During thumb-index pinch of paper, compensatory flexion of the thumb IP joint (median-innervated FPL) compensates for paralyzed adductor pollicis in ulnar neuropathy.",
      "Posterior interosseous nerve (PIN) entrapment causes finger and thumb drop without wrist drop because extensor carpi radialis longus branches arise proximal to the arcade of Fröhse."
    ]
  },
  3: {
    number: 3,
    title: "Cervical, Brachial, and Lumbosacral Plexuses",
    subtitle: "Plexopathy Syndromes, Anatomical Trunks, and Radiculoplexus Neuropathies",
    pages: "pp. 83–100",
    coreAnatomy: [
      {
        title: "Brachial Plexus Organization",
        points: [
          "Upper Trunk (C5–C6): Suprascapular, axillary, and musculocutaneous pathways.",
          "Middle Trunk (C7): Continues predominantly into the radial nerve.",
          "Lower Trunk (C8–T1): Ulnar nerve, medial head of median nerve, and sympathetic T1 pupillomotor fibers."
        ]
      }
    ],
    localizationRules: [
      {
        rule: "Erb-Duchenne Waiter's Tip Posture",
        explanation: "Upper trunk traction (C5–C6) paralyzes abductors, external rotators, and supinators, resulting in an adducted, internally rotated, and pronated arm."
      },
      {
        rule: "Lower Trunk Plexopathy + Horner Syndrome",
        explanation: "Preganglionic sympathetic fibers leave the spinal cord in the T1 ventral ramus before joining the lower trunk; lesions here produce intrinsic hand wasting with ipsilateral Horner syndrome."
      }
    ],
    keySyndromes: [
      {
        name: "Neuralgic Amyotrophy (Parsonage-Turner)",
        triad: "Severe acute shoulder pain + Rapid patchy denervation weakness + Medial scapular winging",
        clue: "Most commonly targets the long thoracic nerve (serratus anterior) or anterior interosseous nerve."
      },
      {
        name: "True Neurogenic Thoracic Outlet Syndrome",
        triad: "T1 > C8 thenar atrophy + Medial forearm sensory loss + Fibrous band from cervical rib",
        clue: "Selectively wastes APB and thenar muscles via lower trunk compression, often misdiagnosed as CTS."
      }
    ],
    boardTraps: [
      "Medial vs. Lateral Scapular Winging: Serratus anterior (long thoracic nerve) causes medial winging (scapula shifts medially and upward); trapezius (CN XI) causes lateral winging (scapula droops downward and outward)."
    ]
  },
  4: {
    number: 4,
    title: "Spinal Nerve and Root",
    subtitle: "Cervical and Lumbosacral Radiculopathies & Cauda Equina Differentiation",
    pages: "pp. 101–110",
    coreAnatomy: [
      {
        title: "Cervical Radiculopathies Key Pearls",
        points: [
          "C5: Deltoid/biceps weakness, absent biceps reflex, lateral shoulder sensory loss.",
          "C6: Biceps/brachioradialis weakness, absent brachioradialis reflex, thumb/index sensory loss.",
          "C7: Triceps weakness, absent triceps reflex, middle finger sensory loss (most common cervical root!).",
          "C8: Hand intrinsics/finger flexors weakness, little finger sensory loss, normal reflexes."
        ]
      },
      {
        title: "Lumbosacral Radiculopathies Key Pearls",
        points: [
          "L4: Quadriceps/tibialis anterior weakness, absent patellar reflex, medial calf sensory loss.",
          "L5: Extensor hallucis longus & tibialis posterior (inversion) weakness, dorsum of foot numbness, preserved reflexes.",
          "S1: Gastrocnemius (plantarflexion/toe walking) weakness, absent Achilles reflex, lateral foot sensory loss."
        ]
      }
    ],
    localizationRules: [
      {
        rule: "Conus Medullaris vs. Cauda Equina",
        explanation: "Conus medullaris lesions are symmetric, acute, cause early bladder retention, and produce Babinski signs (UMN). Cauda equina lesions are asymmetric, painful, cause late bladder changes, and produce pure LMN flaccid signs (never Babinski)."
      }
    ],
    keySyndromes: [
      {
        name: "S1 Radiculopathy",
        triad: "Inability to walk on toes + Absent Achilles reflex + Lateral foot / sole numbness",
        clue: "Typically caused by an L5-S1 posterolateral disc herniation."
      },
      {
        name: "L5 Radiculopathy",
        triad: "Inability to walk on heels + Weak ankle inversion + Normal Achilles reflex",
        clue: "Typically caused by an L4-L5 disc herniation; weak inversion separates it from fibular neuropathy."
      }
    ],
    boardTraps: [
      "The Achilles reflex is S1, NOT L5. A lost ankle jerk with foot drop indicates either S1 root involvement or sciatic neuropathy, not pure L5 radiculopathy."
    ]
  },
  5: {
    number: 5,
    title: "Spinal Cord",
    subtitle: "Myelopathies, Hemicord Syndromes, and Vascular Cord Territorials",
    pages: "pp. 111–140",
    coreAnatomy: [
      {
        title: "Spinal Cord Tracts Organization",
        points: [
          "Posterior Columns: Ascend uncrossed ipsilaterally (vibration and proprioception).",
          "Lateral Corticospinal: Decussated in medulla; descends ipsilaterally in cord (voluntary motor).",
          "Spinothalamic Tract: Decussates within 1–2 segments via anterior white commissure; ascends contralaterally."
        ]
      }
    ],
    localizationRules: [
      {
        rule: "Brown-Séquard Dissociated Sensory Loss",
        explanation: "A hemicord lesion produces ipsilateral loss of vibration/proprioception and spastic paralysis, with contralateral loss of pain and temperature 1 to 2 segments below the lesion level."
      },
      {
        rule: "Anterior Spinal Artery (ASA) Infarction Sparing",
        explanation: "ASA infarction damages the anterior two-thirds of the cord (bilateral paralysis and spinothalamic loss) while posterior spinal arteries preserve the posterior columns (intact vibration/proprioception)."
      }
    ],
    keySyndromes: [
      {
        name: "Central Cord Syndrome (Hyperextension)",
        triad: "Arms > legs flaccid weakness + Bilateral 'cape-like' pain/temp loss + Preserved vibration",
        clue: "Cervical motor fibers lie medially/centrally in the corticospinal tract, making them most vulnerable to central contusion."
      },
      {
        name: "Subacute Combined Degeneration (B12)",
        triad: "Sensory ataxia (Romberg +) + Spastic paraparesis + Absent ankle reflexes",
        clue: "Selective degeneration of posterior columns and lateral corticospinal tracts with peripheral neuropathy."
      }
    ],
    boardTraps: [
      "In Brown-Séquard syndrome, pain and temperature sensation is lost CONTRALATERALLY, while vibratory sense is lost IPSILATERALLY."
    ]
  }
}

export function ChapterSummaryView({ isDark: _isDark = true }: ChapterSummaryProps) {
  const [selectedChapter, setSelectedChapter] = useState<number>(15)
  const [activeTabCh15, setActiveTabCh15] = useState<'overview' | 'medulla' | 'pons' | 'midbrain' | 'pitfalls'>('overview')

  const currentGenericDigest = ALL_CHAPTER_DIGESTS[selectedChapter]

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-6 animate-fade-in pb-24">
      {/* Chapter Selection Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-0.5">
            Brazis Curriculum Digest • Select Chapter
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {selectedChapter === 15 ? 'Chapter 15: Brainstem (Master Digest)' : `Chapter ${selectedChapter}: ${currentGenericDigest?.title || 'Neuro-Localization'}`}
          </h3>
        </div>

        <select
          value={selectedChapter}
          onChange={e => setSelectedChapter(Number(e.target.value))}
          className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shadow-sm"
        >
          <option value={15}>Chapter 15: Brainstem (Interactive Master)</option>
          <option value={1}>Chapter 1: General Principles of Localization</option>
          <option value={2}>Chapter 2: Peripheral Nerves</option>
          <option value={3}>Chapter 3: Plexuses (Cervical, Brachial, Lumbosacral)</option>
          <option value={4}>Chapter 4: Spinal Nerve and Root</option>
          <option value={5}>Chapter 5: Spinal Cord</option>
          <option value={6}>Chapter 6: Cranial Nerve I (Olfactory)</option>
          <option value={7}>Chapter 7: Visual Pathways</option>
          <option value={8}>Chapter 8: Ocular Motor System (CN III, IV, VI)</option>
          <option value={9}>Chapter 9: Cranial Nerve V (Trigeminal)</option>
          <option value={10}>Chapter 10: Cranial Nerve VII (Facial)</option>
          <option value={11}>Chapter 11: Cranial Nerve VIII (Vestibulocochlear)</option>
          <option value={12}>Chapter 12: Cranial Nerves IX & X (Glossopharyngeal/Vagus)</option>
          <option value={13}>Chapter 13: Cranial Nerve XI (Accessory)</option>
          <option value={14}>Chapter 14: Cranial Nerve XII (Hypoglossal)</option>
          <option value={16}>Chapter 16: The Cerebellum</option>
          <option value={17}>Chapter 17: Hypothalamus & Neuroendocrine</option>
          <option value={18}>Chapter 18: Thalamus</option>
          <option value={19}>Chapter 19: Basal Ganglia</option>
          <option value={20}>Chapter 20: Cerebral Cortex</option>
          <option value={21}>Chapter 21: Autonomic Nervous System</option>
          <option value={22}>Chapter 22: Vascular Syndromes</option>
          <option value={23}>Chapter 23: Localization of Lesions Causing Coma</option>
        </select>
      </div>

      {/* CHAPTER 15 DEEP DIVE VIEW */}
      {selectedChapter === 15 ? (
        <div className="space-y-6 animate-fade-in">
          {/* Hero Banner */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative overflow-hidden transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60 uppercase tracking-wider">
                Clinical Resident Digest • Chapter 15
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Brazis pp. 440–456</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Brainstem Localization Master Summary
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
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
                  onClick={() => setActiveTabCh15(tab.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition active:scale-95 border truncate ${
                    activeTabCh15 === tab.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Rule of 4 Axioms */}
          {activeTabCh15 === 'overview' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">The 4 Medial 'M' Structures</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li><strong className="text-rose-600 dark:text-rose-400">1. Motor Pathway (CST):</strong> Contralateral hemiplegia (face spared in lower lesions).</li>
                    <li><strong className="text-rose-600 dark:text-rose-400">2. Medial Lemniscus:</strong> Contralateral loss of vibration & proprioception.</li>
                    <li><strong className="text-rose-600 dark:text-rose-400">3. Medial Longitudinal Fasciculus (MLF):</strong> Internuclear ophthalmoplegia (INO).</li>
                    <li><strong className="text-rose-600 dark:text-rose-400">4. Motor Cranial Nerves:</strong> CN 3, 4, 6, 12 (divisible into 12).</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">The 4 Lateral 'S' Structures</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li><strong className="text-cyan-600 dark:text-cyan-400">1. Spinothalamic Tract:</strong> Contralateral loss of pain and temperature.</li>
                    <li><strong className="text-cyan-600 dark:text-cyan-400">2. Spinocerebellar Tract:</strong> Ipsilateral limb and gait ataxia.</li>
                    <li><strong className="text-cyan-600 dark:text-cyan-400">3. Sympathetic Pathway:</strong> Ipsilateral Horner syndrome (ptosis, miosis, anhidrosis).</li>
                    <li><strong className="text-cyan-600 dark:text-cyan-400">4. Sensory Trigeminal Nucleus:</strong> Ipsilateral facial loss of pain and temperature.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Medulla */}
          {activeTabCh15 === 'medulla' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400">Wallenberg Syndrome (Lateral Medullary / PICA)</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ischemia of the PICA or vertebral artery affecting the nucleus ambiguus, spinal V, spinothalamic tract, restiform body, and sympathetics.
                  <strong> Pathognomonic:</strong> Crossed sensory loss (ipsilateral face, contralateral body) + hoarseness/dysphagia + Horner syndrome without motor hemiplegia.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">Dejerine Syndrome (Medial Medullary / ASA)</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ischemia of the anterior spinal artery affecting the pyramid, medial lemniscus, and hypoglossal nerve.
                  <strong> Pathognomonic:</strong> Ipsilateral tongue deviation + contralateral hemiplegia (face spared) + contralateral vibration loss.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Pons */}
          {activeTabCh15 === 'pons' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-cyan-600 dark:text-cyan-400">Millard-Gubler vs. Foville vs. Raymond</h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li><strong>Millard-Gubler:</strong> Exiting CN VI fascicle + peripheral CN VII palsy + contralateral hemiplegia. Conjugate gaze is normal.</li>
                  <li><strong>Foville:</strong> CN VI nucleus / PPRF + peripheral CN VII + hemiplegia. Causes conjugate horizontal gaze paralysis.</li>
                  <li><strong>Raymond:</strong> CN VI fascicle + hemiplegia with central facial paresis (forehead spared).</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Midbrain */}
          {activeTabCh15 === 'midbrain' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400">Weber vs. Benedikt vs. Claude vs. Parinaud</h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li><strong>Weber:</strong> CN III palsy + contralateral spastic hemiplegia (crus cerebri).</li>
                  <li><strong>Benedikt:</strong> CN III palsy + contralateral intention tremor, chorea, and athetosis (red nucleus & substantia nigra).</li>
                  <li><strong>Claude:</strong> CN III palsy + contralateral pure cerebellar hemiataxia (superior cerebellar peduncle decussation).</li>
                  <li><strong>Parinaud:</strong> Supranuclear upward gaze palsy + light-near pupillary dissociation + Collier lid retraction (pretectal tectum).</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 5: Pitfalls */}
          {activeTabCh15 === 'pitfalls' && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">High-Yield Board Traps (Brazis)</h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li>• <strong>Opalski Syndrome:</strong> A lateral medullary lesion extending caudally below the pyramidal decussation produces Wallenberg syndrome PLUS <em>ipsilateral</em> hemiparesis.</li>
                <li>• <strong>Abducens Nucleus vs. Fascicle:</strong> Fascicle lesions cause isolated lateral rectus palsy (other eye adducts normally); nucleus lesions cause conjugate gaze palsy (neither eye moves).</li>
                <li>• <strong>Trochlear Nerve (CN IV):</strong> The only cranial nerve exiting dorsally, and the only one that decussates completely before exiting the brainstem.</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* GENERIC CHAPTER SUMMARY VIEW (Chapters 1-14, 16-23) */
        <div className="space-y-5 animate-fade-in">
          {/* Header Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60 uppercase tracking-wider">
                Clinical Resident Digest • Chapter {currentGenericDigest?.number}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{currentGenericDigest?.pages}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {currentGenericDigest?.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentGenericDigest?.subtitle}
            </p>
          </div>

          {/* Core Neuroanatomy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGenericDigest?.coreAnatomy.map((block, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {block.title}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {block.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Localization Rules */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Pathognomonic Localization Axioms (Brazis)
            </h4>
            <div className="space-y-2.5">
              {currentGenericDigest?.localizationRules.map((r, rIdx) => (
                <div key={rIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{r.rule}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{r.explanation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Syndromes */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Classic Clinical Syndromes & Triads
            </h4>
            <div className="space-y-2.5">
              {currentGenericDigest?.keySyndromes.map((syn, sIdx) => (
                <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="text-xs font-black text-slate-900 dark:text-slate-100">{syn.name}</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">Triad: </span>{syn.triad}
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    <span className="font-bold">Key Clue: </span>{syn.clue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Board Traps */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-rose-600 dark:text-rose-400 text-sm">⚠️</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                High-Yield Board Traps & Pitfalls
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-rose-900 dark:text-rose-200">
              {currentGenericDigest?.boardTraps.map((trap, tIdx) => (
                <li key={tIdx} className="leading-relaxed">• {trap}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
