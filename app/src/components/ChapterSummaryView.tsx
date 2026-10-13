import { useState } from 'react'
import { AssetBadge } from './StatusBadge'
import verifiedSummaries from '../data/summaries.json'

/** A digest point; `page` and `quote` exist only on verified digests (built by scripts/apply_summaries.py). */
interface DigestPoint { text: string; page?: number; quote?: string }
interface ViewDigest {
  number: number
  title: string
  subtitle: string
  pages: string
  verified: boolean
  coreAnatomy: { title: string; points: DigestPoint[] }[]
  localizationRules: { rule: string; explanation: string; page?: number; quote?: string }[]
  keySyndromes: { name: string; triad: string; clue: string; page?: number; quote?: string }[]
  boardTraps: DigestPoint[]
}

interface VerifiedDigestFile {
  number: number
  title: string
  subtitle: string
  pages: string
  coreAnatomy: { title: string; points: { text: string; page: number; quote: string }[] }[]
  localizationRules: { rule: string; explanation: string; page: number; quote: string }[]
  keySyndromes: { name: string; triad: string; clue: string; page: number; quote: string }[]
  boardTraps: { text: string; page: number; quote: string }[]
}

const VERIFIED = verifiedSummaries as unknown as Record<string, VerifiedDigestFile>

function PageTag({ page, quote }: { page?: number; quote?: string }) {
  if (page === undefined) return null
  return (
    <span
      className="ml-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap"
      title={quote ? `Book p. ${page}: "${quote}"` : `Book p. ${page}`}
    >
      [p. {page}]
    </span>
  )
}

function getViewDigest(n: number, legacy?: GenericChapterDigest): ViewDigest | null {
  const v = VERIFIED[String(n)]
  if (v && (v.coreAnatomy.length > 0 || v.keySyndromes.length > 0)) {
    return { ...v, verified: true }
  }
  if (!legacy) return null
  return {
    ...legacy,
    verified: false,
    coreAnatomy: legacy.coreAnatomy.map(g => ({ title: g.title, points: g.points.map(text => ({ text })) })),
    boardTraps: legacy.boardTraps.map(text => ({ text }))
  }
}

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

const CHAPTERS_CATALOG = [
  {
    group: 'Peripheral & Spine',
    items: [
      { num: 1, title: 'General Principles of Localization', pages: 'pp. 1–30' },
      { num: 2, title: 'Peripheral Nerves', pages: 'pp. 31–82' },
      { num: 3, title: 'Plexuses (Cervical, Brachial, Lumbosacral)', pages: 'pp. 83–100' },
      { num: 4, title: 'Spinal Nerve and Root', pages: 'pp. 101–110' },
      { num: 5, title: 'Spinal Cord', pages: 'pp. 111–140' },
    ]
  },
  {
    group: 'Cranial Nerves',
    items: [
      { num: 6, title: 'CN I (Olfactory)', pages: 'pp. 141–148' },
      { num: 7, title: 'Visual Pathways', pages: 'pp. 149–190' },
      { num: 8, title: 'Ocular Motor System (CN III, IV, VI)', pages: 'pp. 191–270' },
      { num: 9, title: 'CN V (Trigeminal)', pages: 'pp. 271–296' },
      { num: 10, title: 'CN VII (Facial)', pages: 'pp. 297–324' },
      { num: 11, title: 'CN VIII (Vestibulocochlear)', pages: 'pp. 325–364' },
      { num: 12, title: 'CN IX & X (Glossopharyngeal/Vagus)', pages: 'pp. 365–384' },
      { num: 13, title: 'CN XI (Accessory)', pages: 'pp. 385–394' },
      { num: 14, title: 'CN XII (Hypoglossal)', pages: 'pp. 395–404' },
    ]
  },
  {
    group: 'Brainstem & Cerebellum',
    items: [
      { num: 15, title: 'Brainstem (Master Interactive)', pages: 'pp. 405–456' },
      { num: 16, title: 'The Cerebellum', pages: 'pp. 457–484' },
    ]
  },
  {
    group: 'Supratentorial & Systemic',
    items: [
      { num: 17, title: 'Hypothalamus & Neuroendocrine', pages: 'pp. 485–514' },
      { num: 18, title: 'Thalamus', pages: 'pp. 515–540' },
      { num: 19, title: 'Basal Ganglia', pages: 'pp. 541–570' },
      { num: 20, title: 'Cerebral Cortex', pages: 'pp. 571–620' },
      { num: 21, title: 'Autonomic Nervous System', pages: 'pp. 621–646' },
      { num: 22, title: 'Vascular Syndromes', pages: 'pp. 647–676' },
      { num: 23, title: 'Localization in Coma', pages: 'pp. 677–700' },
    ]
  }
]

const ALL_NUMBERS = CHAPTERS_CATALOG.flatMap(g => g.items.map(i => i.num))

export function ChapterSummaryView({ isDark: _isDark = true }: ChapterSummaryProps) {
  const [selectedChapter, setSelectedChapter] = useState<number>(15)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [activeTabCh15, setActiveTabCh15] = useState<'overview' | 'medulla' | 'pons' | 'midbrain' | 'pitfalls'>('overview')

  const currentGenericDigest = getViewDigest(selectedChapter, ALL_CHAPTER_DIGESTS[selectedChapter])

  const currentIndex = ALL_NUMBERS.indexOf(selectedChapter)
  const prevChapter = currentIndex > 0 ? ALL_NUMBERS[currentIndex - 1] : null
  const nextChapter = currentIndex < ALL_NUMBERS.length - 1 ? ALL_NUMBERS[currentIndex + 1] : null

  const currentChapterMeta = CHAPTERS_CATALOG.flatMap(g => g.items).find(i => i.num === selectedChapter)

  const chapterTitle = selectedChapter === 15 
    ? 'Brainstem Localization Master Summary'
    : currentGenericDigest?.title || currentChapterMeta?.title || `Chapter ${selectedChapter}`

  const chapterSubtitle = selectedChapter === 15
    ? 'High-yield neuroanatomical landmarks, vascular boundaries, and pathognomonic clinical signs distilled directly from Brazis.'
    : currentGenericDigest?.subtitle || 'Clinical localization pearls and diagnostic differentiators.'

  const chapterPages = selectedChapter === 15 ? 'pp. 440–456' : currentGenericDigest?.pages || currentChapterMeta?.pages || ''

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-5 space-y-5 animate-fade-in pb-28">
      {/* Chapter Stepper & Catalog Trigger */}
      <div className="flex items-center justify-between gap-2 bg-stone-100 dark:bg-[#1b1b1e] p-1.5 rounded-2xl border border-stone-200 dark:border-[#28282e] shadow-sm">
        <button
          onClick={() => prevChapter && setSelectedChapter(prevChapter)}
          disabled={!prevChapter}
          className="px-3 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#28282e] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 shrink-0"
        >
          <span>←</span>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <button
          onClick={() => setIsCatalogOpen(true)}
          className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#131315] hover:bg-stone-50 dark:hover:bg-[#232328] border border-stone-200/80 dark:border-[#28282e] text-stone-900 dark:text-stone-100 transition shadow-xs flex items-center justify-center gap-2 group min-w-0"
        >
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 shrink-0">
            Ch. {selectedChapter}
          </span>
          <span className="text-xs font-semibold truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
            {currentChapterMeta?.title || chapterTitle}
          </span>
          <span className="text-[10px] text-stone-400 shrink-0">▾</span>
        </button>

        <button
          onClick={() => nextChapter && setSelectedChapter(nextChapter)}
          disabled={!nextChapter}
          className="px-3 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#28282e] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 shrink-0"
        >
          <span className="hidden sm:inline">Next</span>
          <span>→</span>
        </button>
      </div>

      {/* Chapter Directory Modal */}
      {isCatalogOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsCatalogOpen(false)}
        >
          <div 
            className="w-full max-w-xl max-h-[85vh] bg-[#f9f8f5] dark:bg-[#1b1b1e] border border-stone-300 dark:border-[#28282e] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-[#28282e] flex items-center justify-between bg-white dark:bg-[#131315]">
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  Chapters Directory
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Brazis Localization in Clinical Neurology (8th ed.)
                </p>
              </div>
              <button
                onClick={() => setIsCatalogOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-[#232328] hover:bg-stone-200 dark:hover:bg-[#2e2e34] text-stone-500 text-xs font-bold transition flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-4">
              {CHAPTERS_CATALOG.map(group => (
                <div key={group.group} className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-1">
                    {group.group}
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {group.items.map(item => {
                      const isSelected = item.num === selectedChapter
                      return (
                        <button
                          key={item.num}
                          onClick={() => {
                            setSelectedChapter(item.num)
                            setIsCatalogOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex items-center justify-between gap-2 border ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200 font-semibold shadow-xs'
                              : 'bg-white dark:bg-[#131315] border-stone-200/70 dark:border-[#28282e] text-stone-800 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`text-[11px] font-mono w-7 shrink-0 ${isSelected ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-400'}`}>
                              Ch.{item.num}
                            </span>
                            <span className="truncate">{item.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-stone-400 shrink-0">
                            {item.pages}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Cohesive Masthead - Editorial, No box prison */}
      <header className="space-y-3 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
            Brazis Clinical Monograph • Chapter {selectedChapter}
          </p>
          <span className="text-xs font-mono text-stone-400 dark:text-stone-500 shrink-0">{chapterPages}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          {chapterTitle}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
          {chapterSubtitle}
        </p>

        <div className="flex items-center gap-3 pt-1">
          <AssetBadge assetId={`summaries/chapter${String(selectedChapter).padStart(2, '0')}`} />
        </div>

        {selectedChapter !== 15 && currentGenericDigest && (
          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed pt-1 border-t border-stone-200/60 dark:border-stone-850">
            {currentGenericDigest.verified
              ? 'Every point carries the book page where its supporting sentence was found (hover or long-press the page tag to see the sentence).'
              : 'This older digest was written by the AI without page references. Treat it as unverified.'}
          </p>
        )}

        {/* Chapter 15 internal navigation tabs */}
        {selectedChapter === 15 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
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
                className={`py-1.5 px-3.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeTabCh15 === tab.id
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CHAPTER 15 CONTENT - Editorial layout */}
      {selectedChapter === 15 ? (
        <div className="space-y-6 animate-fade-in pt-1">
          {/* Tab 1: Rule of 4 Axioms */}
          {activeTabCh15 === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              {/* Medial M Structures */}
              <div className="border-l-2 border-rose-500 pl-4 space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold">
                    The 4 Medial 'M' Structures
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Supplied by paramedian perforators (e.g., ASA, Basilar paramedians)
                  </p>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">1. Motor Pathway (Corticospinal)</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Contralateral spastic hemiplegia (face spared in lower brainstem lesions).</span>
                  </li>
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">2. Medial Lemniscus</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Contralateral loss of vibration and joint position sense.</span>
                  </li>
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">3. Medial Longitudinal Fasciculus (MLF)</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Internuclear ophthalmoplegia (INO): ipsilateral adduction lag + contralateral nystagmus.</span>
                  </li>
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">4. Motor Cranial Nerves</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">CN 3, 4, 6, 12 (the numbers that divide evenly into 12, except 1 and 2).</span>
                  </li>
                </ul>
              </div>

              {/* Lateral S Structures */}
              <div className="border-l-2 border-amber-500 pl-4 space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                    The 4 Lateral 'S' Structures
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Supplied by circumferential arteries (e.g., PICA, AICA, SCA)
                  </p>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">1. Spinothalamic Tract</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Contralateral loss of pain and temperature on trunk and limbs.</span>
                  </li>
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">2. Spinocerebellar Tracts</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Ipsilateral limb and gait ataxia (inferior/middle cerebellar peduncles).</span>
                  </li>
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">3. Sympathetic Pathway (Descending)</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Ipsilateral Horner syndrome (ptosis, miosis, hemifacial anhidrosis).</span>
                  </li>
                  <li className="leading-snug">
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">4. Sensory Trigeminal Nucleus & Tract</strong>
                    <span className="text-stone-600 dark:text-stone-400 text-xs">Ipsilateral facial loss of pain and temperature.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Medulla */}
          {activeTabCh15 === 'medulla' && (
            <div className="space-y-6 animate-fade-in">
              <article className="border-l-2 border-amber-500 pl-4 space-y-1.5">
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  Wallenberg Syndrome (Lateral Medullary / PICA)
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  Ischemia of the PICA or vertebral artery affecting the nucleus ambiguus, spinal V, spinothalamic tract, restiform body, and sympathetics.
                </p>
                <p className="text-xs text-amber-900 dark:text-amber-200/90 font-medium">
                  ★ Pathognomonic: Crossed sensory loss (ipsilateral face, contralateral body) + hoarseness/dysphagia + Horner syndrome without motor hemiplegia.
                </p>
              </article>

              <article className="border-l-2 border-rose-500 pl-4 space-y-1.5">
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  Dejerine Syndrome (Medial Medullary / ASA)
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  Ischemia of the anterior spinal artery affecting the pyramid, medial lemniscus, and hypoglossal nerve.
                </p>
                <p className="text-xs text-rose-900 dark:text-rose-200/90 font-medium">
                  ★ Pathognomonic: Ipsilateral tongue deviation + contralateral hemiplegia (face spared) + contralateral vibration loss.
                </p>
              </article>
            </div>
          )}

          {/* Tab 3: Pons */}
          {activeTabCh15 === 'pons' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-l-2 border-stone-400 dark:border-stone-700 pl-4 space-y-3">
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  Millard-Gubler vs. Foville vs. Raymond
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Millard-Gubler Syndrome:</strong>
                    <span>Exiting CN VI fascicle + peripheral CN VII palsy + contralateral hemiplegia. Conjugate horizontal gaze is preserved.</span>
                  </li>
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Foville Syndrome:</strong>
                    <span>CN VI nucleus / PPRF + peripheral CN VII + hemiplegia. Produces complete conjugate horizontal gaze paralysis toward lesion.</span>
                  </li>
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Raymond Syndrome:</strong>
                    <span>CN VI fascicle + hemiplegia with central facial paresis (forehead spared, corticobulbar fibers).</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Midbrain */}
          {activeTabCh15 === 'midbrain' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-l-2 border-stone-400 dark:border-stone-700 pl-4 space-y-3">
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  Weber vs. Benedikt vs. Claude vs. Parinaud
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Weber Syndrome:</strong>
                    <span>CN III palsy + contralateral spastic hemiplegia (cerebral peduncle crus cerebri).</span>
                  </li>
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Benedikt Syndrome:</strong>
                    <span>CN III palsy + contralateral hemiataxia with intention tremor (red nucleus) + contralateral hemiparesis.</span>
                  </li>
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Claude Syndrome:</strong>
                    <span>CN III palsy + prominent contralateral cerebellar signs (dorsal red nucleus & brachium conjunctivum).</span>
                  </li>
                  <li>
                    <strong className="text-stone-900 dark:text-stone-100 block font-serif">Parinaud Syndrome:</strong>
                    <span>Supranuclear upward gaze palsy + light-near pupillary dissociation + Collier lid retraction (pretectal tectum).</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 5: Pitfalls */}
          {activeTabCh15 === 'pitfalls' && (
            <div className="border-l-4 border-amber-500 pl-4 py-1 space-y-3 animate-fade-in">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                ★ High-Yield Board Traps (Brazis)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                <li>• <strong>Opalski Syndrome:</strong> Lateral medullary lesion extending caudally below the pyramidal decussation produces Wallenberg syndrome PLUS <em>ipsilateral</em> hemiparesis.</li>
                <li>• <strong>Abducens Nucleus vs. Fascicle:</strong> Fascicle lesions cause isolated lateral rectus palsy; nucleus lesions cause conjugate gaze palsy.</li>
                <li>• <strong>Trochlear Nerve (CN IV):</strong> The only cranial nerve exiting dorsally, and the only one that decussates completely before exiting.</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* GENERIC CHAPTER SUMMARY VIEW */
        !currentGenericDigest ? (
          <div className="py-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">Chapter {selectedChapter}</h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">No digest has been written for this chapter yet.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in pt-1">
            {/* Core Neuroanatomy */}
            <section className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                Core Neuroanatomical Landmarks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentGenericDigest.coreAnatomy.map((block, idx) => (
                  <div key={idx} className="border-l-2 border-stone-300 dark:border-stone-800 pl-4 space-y-2">
                    <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                      {block.title}
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                      {block.points.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">• {pt.text}<PageTag page={pt.page} quote={pt.quote} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Localization Rules */}
            <section className="space-y-4 border-t border-stone-200/80 dark:border-stone-850 pt-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                Pathognomonic Localization Axioms (Brazis)
              </h3>
              <div className="space-y-4">
                {currentGenericDigest.localizationRules.map((r, rIdx) => (
                  <div key={rIdx} className="border-l-2 border-stone-300 dark:border-stone-800 pl-4 space-y-1">
                    <div className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-stone-100">{r.rule}</div>
                    <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{r.explanation}<PageTag page={r.page} quote={r.quote} /></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Syndromes */}
            <section className="space-y-4 border-t border-stone-200/80 dark:border-stone-850 pt-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                Classic Clinical Syndromes & Triads
              </h3>
              <div className="space-y-4">
                {currentGenericDigest.keySyndromes.map((syn, sIdx) => (
                  <div key={sIdx} className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <div className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">{syn.name}</div>
                    <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <span className="text-amber-700 dark:text-amber-400 font-medium">Triad: </span>{syn.triad}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      <span className="font-medium text-stone-500">Key Clue: </span>{syn.clue}<PageTag page={syn.page} quote={syn.quote} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Board Traps */}
            <section className="border-l-4 border-amber-500 pl-4 py-2 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                ★ High-Yield Board Traps & Pitfalls (Brazis)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                {currentGenericDigest.boardTraps.map((trap, tIdx) => (
                  <li key={tIdx} className="leading-relaxed">• {trap.text}<PageTag page={trap.page} quote={trap.quote} /></li>
                ))}
              </ul>
            </section>
          </div>
        )
      )}
    </div>
  )
}
