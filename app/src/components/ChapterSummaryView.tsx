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
      className="inline-flex items-center ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/15 dark:bg-amber-500/25 text-amber-900 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap cursor-help transition hover:scale-105 shadow-2xs"
      title={quote ? `Brazis 8th ed., p. ${page}: "${quote}"` : `Brazis 8th ed., p. ${page}`}
    >
      p. {page}
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
  selectedChapter?: number
  onSelectChapter?: (num: number) => void
  onOpenTab?: (tab: any) => void
  onStartStudy?: (chapterTitle: string, mode: 'new' | 'review' | 'all') => void
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

export function ChapterSummaryView({
  isDark: _isDark = true,
  selectedChapter: controlledChapter,
  onSelectChapter,
  onOpenTab,
  onStartStudy
}: ChapterSummaryProps) {
  const [internalChapter, setInternalChapter] = useState<number>(1)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [catalogCategory, setCatalogCategory] = useState<string>('all')
  const [catalogSearch, setCatalogSearch] = useState<string>('')
  const [isRuleOf4QuickOpen, setIsRuleOf4QuickOpen] = useState(false)

  const selectedChapter = controlledChapter ?? internalChapter
  const setSelectedChapter = (num: number) => {
    if (onSelectChapter) onSelectChapter(num)
    else setInternalChapter(num)
  }

  const currentGenericDigest = getViewDigest(selectedChapter, ALL_CHAPTER_DIGESTS[selectedChapter])

  const currentIndex = ALL_NUMBERS.indexOf(selectedChapter)
  const prevChapter = currentIndex > 0 ? ALL_NUMBERS[currentIndex - 1] : null
  const nextChapter = currentIndex < ALL_NUMBERS.length - 1 ? ALL_NUMBERS[currentIndex + 1] : null

  const currentChapterMeta = CHAPTERS_CATALOG.flatMap(g => g.items).find(i => i.num === selectedChapter)

  const chapterTitle = currentGenericDigest?.title || currentChapterMeta?.title || `Chapter ${selectedChapter}`
  const chapterSubtitle = currentGenericDigest?.subtitle || 'Clinical localization pearls and diagnostic differentiators.'
  const chapterPages = currentGenericDigest?.pages || currentChapterMeta?.pages || ''

  // Filter items in directory modal
  const filteredCatalog = CHAPTERS_CATALOG.map(group => {
    const items = group.items.filter(item => {
      const matchesSearch =
        catalogSearch.trim() === '' ||
        item.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        `ch${item.num}`.includes(catalogSearch.toLowerCase()) ||
        String(item.num) === catalogSearch.trim()

      const matchesCategory =
        catalogCategory === 'all' ||
        (catalogCategory === 'peripheral' && item.num >= 1 && item.num <= 3) ||
        (catalogCategory === 'spine' && item.num >= 4 && item.num <= 5) ||
        (catalogCategory === 'cranial' && item.num >= 6 && item.num <= 14) ||
        (catalogCategory === 'central' && item.num >= 15 && item.num <= 23)

      return matchesSearch && matchesCategory
    })
    return { ...group, items }
  }).filter(group => group.items.length > 0)

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-5 space-y-6 animate-fade-in pb-28">
      {/* Chapter Stepper & Catalog Trigger */}
      <div className="flex items-center justify-between gap-2 bg-stone-100 dark:bg-[#1b1b22] p-1.5 rounded-2xl border border-stone-200 dark:border-[#2c2c36] shadow-xs">
        <button
          onClick={() => prevChapter && setSelectedChapter(prevChapter)}
          disabled={!prevChapter}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-[#282834] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>←</span>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <button
          onClick={() => setIsCatalogOpen(true)}
          className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#131318] hover:bg-stone-50 dark:hover:bg-[#23232c] border border-stone-200/90 dark:border-[#2e2e3a] text-stone-900 dark:text-stone-100 transition shadow-xs flex items-center justify-center gap-2 group min-w-0 cursor-pointer"
        >
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 shrink-0">
            Ch. {selectedChapter}
          </span>
          <span className="text-xs font-bold truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
            {currentChapterMeta?.title || chapterTitle}
          </span>
          <span className="text-[10px] text-stone-400 shrink-0">▾</span>
        </button>

        <button
          onClick={() => nextChapter && setSelectedChapter(nextChapter)}
          disabled={!nextChapter}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-[#282834] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <span>→</span>
        </button>
      </div>

      {/* Chapter Directory Modal */}
      {isCatalogOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsCatalogOpen(false)}
        >
          <div 
            className="w-full max-w-xl max-h-[85vh] bg-[#f9f8f5] dark:bg-[#18181e] border border-stone-300 dark:border-[#2e2e38] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-[#282832] bg-white dark:bg-[#131317] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-50">
                    Brazis Monograph Directory
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Localization in Clinical Neurology (8th ed.) • 23 Chapters
                  </p>
                </div>
                <button
                  onClick={() => setIsCatalogOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 dark:bg-[#23232c] hover:bg-stone-200 dark:hover:bg-[#2f2f3a] text-stone-600 dark:text-stone-300 text-xs font-bold transition flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={e => setCatalogSearch(e.target.value)}
                  placeholder="Search chapter title, number, or topic..."
                  className="w-full px-3.5 py-2 pl-9 rounded-xl text-xs bg-stone-100 dark:bg-[#1d1d24] border border-stone-200 dark:border-[#323240] text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <span className="absolute left-3 top-2.5 text-xs text-stone-400">🔍</span>
                {catalogSearch && (
                  <button
                    onClick={() => setCatalogSearch('')}
                    className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[11px]">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'peripheral', label: 'Peripheral (1-3)' },
                  { id: 'spine', label: 'Spine (4-5)' },
                  { id: 'cranial', label: 'Cranial (6-14)' },
                  { id: 'central', label: 'Central (15-23)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCatalogCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                      catalogCategory === cat.id
                        ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950 font-bold shadow-xs'
                        : 'bg-stone-100 dark:bg-[#23232c] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2f2f3a]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto p-4 space-y-4">
              {filteredCatalog.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  No chapters match your search.
                </div>
              ) : (
                filteredCatalog.map(group => (
                  <div key={group.group} className="space-y-1.5">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-1">
                      {group.group}
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {group.items.map(item => {
                        const isSelected = item.num === selectedChapter
                        return (
                          <button
                            key={item.num}
                            onClick={() => {
                              setSelectedChapter(item.num)
                              setIsCatalogOpen(false)
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition flex items-center justify-between gap-2 border cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500/50 text-amber-950 dark:text-amber-200 font-bold shadow-xs'
                                : 'bg-white dark:bg-[#1c1c22] border-stone-200/80 dark:border-[#2d2d38] text-stone-800 dark:text-stone-200 hover:border-amber-400/60 dark:hover:border-amber-500/50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <span className={`text-[11px] font-mono w-7 shrink-0 ${isSelected ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-stone-400 dark:text-stone-500'}`}>
                                Ch.{item.num}
                              </span>
                              <span className="truncate font-medium">{item.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500 shrink-0">
                              {item.pages}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* High-Contrast Editorial Masthead */}
      <header className="space-y-3.5 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
            Brazis Clinical Monograph • Chapter {selectedChapter}
          </p>
          <span className="text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 shrink-0">
            {chapterPages}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
          {chapterTitle}
        </h1>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
          {chapterSubtitle}
        </p>

        <div className="flex items-center gap-3 pt-1">
          <AssetBadge assetId={`summaries/chapter${String(selectedChapter).padStart(2, '0')}`} />
        </div>

        {/* Chapter 15 Cross-Tool Integration */}
        {selectedChapter === 15 && onOpenTab && (
          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onOpenTab('atlas')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/90 hover:bg-stone-300 dark:bg-[#25252e] dark:hover:bg-[#2e2e38] text-stone-800 dark:text-stone-100 text-xs font-bold border border-stone-300 dark:border-stone-700 transition cursor-pointer"
              >
                <span>🗺️</span> Open Interactive Atlas & Simulator
              </button>
              <button
                onClick={() => onOpenTab('mermaid')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-500/35 transition cursor-pointer"
              >
                <span>🌿</span> Solve in Rule of 4 Engine
              </button>
              <button
                onClick={() => onOpenTab('matrix')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/90 hover:bg-stone-300 dark:bg-[#25252e] dark:hover:bg-[#2e2e38] text-stone-800 dark:text-stone-100 text-xs font-bold border border-stone-300 dark:border-stone-700 transition cursor-pointer"
              >
                <span>📋</span> Compare in Syndromes Matrix
              </button>
            </div>

            {/* Expandable Rule of 4 Quick Reference Toggle */}
            <button
              onClick={() => setIsRuleOf4QuickOpen(prev => !prev)}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>{isRuleOf4QuickOpen ? '▾ Hide' : '▸ View'} Gates Rule of 4 Medial vs Lateral Quick Guide</span>
            </button>

            {isRuleOf4QuickOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 animate-fade-in">
                <div className="bg-rose-500/[0.08] dark:bg-rose-500/[0.12] border border-rose-300 dark:border-rose-900/60 rounded-2xl p-4.5 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-300">
                    Paramedian Artery Axis
                  </span>
                  <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                    The 4 Medial 'M' Structures
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <li>• <strong>1. Motor pathway (Corticospinal):</strong> Contralateral hemiparesis.</li>
                    <li>• <strong>2. Medial lemniscus:</strong> Contralateral vibration/position loss.</li>
                    <li>• <strong>3. Medial longitudinal fasciculus (MLF):</strong> INO (adduction lag + nystagmus).</li>
                    <li>• <strong>4. Motor cranial nerves:</strong> CN 3, 4, 6, 12 (divide evenly into 12).</li>
                  </ul>
                </div>

                <div className="bg-amber-500/[0.08] dark:bg-amber-500/[0.12] border border-amber-300 dark:border-amber-900/60 rounded-2xl p-4.5 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    Circumferential Artery Axis
                  </span>
                  <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                    The 4 Lateral 'S' Structures
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-800 dark:text-stone-200">
                    <li>• <strong>1. Spinothalamic tract:</strong> Contralateral pain/temperature loss.</li>
                    <li>• <strong>2. Spinocerebellar tracts:</strong> Ipsilateral limb/gait ataxia.</li>
                    <li>• <strong>3. Sympathetic pathway:</strong> Ipsilateral Horner syndrome.</li>
                    <li>• <strong>4. Sensory trigeminal (spinal V):</strong> Ipsilateral facial pain/temp loss.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Monograph Verified Content */}
      {!currentGenericDigest ? (
        <div className="py-12 text-center space-y-2">
          <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">Chapter {selectedChapter}</h2>
          <p className="text-xs text-stone-600 dark:text-stone-400">Loading verified chapter digest...</p>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in pt-1">
          {/* 1. Core Neuroanatomy */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
                <span>🧠</span> Core Neuroanatomical Landmarks
              </h3>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {currentGenericDigest.coreAnatomy.length} structural systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentGenericDigest.coreAnatomy.map((block, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a1a20] border border-stone-200/90 dark:border-[#2a2a36] rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-50 border-b border-stone-200/80 dark:border-stone-800 pb-2">
                    {block.title}
                  </h4>
                  <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-200">
                    {block.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-relaxed flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                        <span>{pt.text}<PageTag page={pt.page} quote={pt.quote} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Pathognomonic Localization Axioms */}
          <section className="space-y-4 border-t border-stone-200/80 dark:border-stone-850 pt-6">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
                <span>⚖️</span> Pathognomonic Localization Axioms (Brazis)
              </h3>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {currentGenericDigest.localizationRules.length} rules
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGenericDigest.localizationRules.map((r, rIdx) => (
                <div key={rIdx} className="bg-white dark:bg-[#1a1a20] border-l-4 border-amber-500 border border-stone-200/90 dark:border-[#2a2a36] rounded-r-2xl rounded-l-md p-4.5 space-y-2 shadow-xs">
                  <div className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-stone-50">{r.rule}</div>
                  <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{r.explanation}<PageTag page={r.page} quote={r.quote} /></div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Key Syndromes */}
          <section className="space-y-4 border-t border-stone-200/80 dark:border-stone-850 pt-6">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
                <span>📋</span> Classic Clinical Syndromes & Triads
              </h3>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {currentGenericDigest.keySyndromes.length} syndromes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGenericDigest.keySyndromes.map((syn, sIdx) => (
                <div key={sIdx} className="bg-white dark:bg-[#1a1a20] border border-stone-200/90 dark:border-[#2a2a36] rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="text-sm font-serif font-bold text-stone-900 dark:text-stone-50">{syn.name}</div>
                  <div className="p-3 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-950 dark:text-amber-100">
                    <span className="font-bold uppercase tracking-wider text-[10px] block text-amber-800 dark:text-amber-300 mb-1">
                      Classic Triad / Presentation
                    </span>
                    {syn.triad}
                  </div>
                  <div className="text-xs text-stone-700 dark:text-stone-300 pt-0.5">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Key Clue: </span>
                    {syn.clue}<PageTag page={syn.page} quote={syn.quote} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Board Traps */}
          <section className="bg-amber-500/[0.08] dark:bg-amber-500/[0.12] border-2 border-amber-400 dark:border-amber-600/70 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-amber-500/30 pb-2.5">
              <span className="text-base">★</span>
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-900 dark:text-amber-200 font-bold">
                High-Yield Board Traps & Pitfalls (Brazis)
              </h3>
              <span className="ml-auto text-[10px] font-mono text-amber-800/80 dark:text-amber-300/80">
                {currentGenericDigest.boardTraps.length} critical pitfalls
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
              {currentGenericDigest.boardTraps.map((trap, tIdx) => (
                <li key={tIdx} className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a20] border border-amber-200/80 dark:border-amber-900/50 leading-relaxed flex items-start gap-2.5 shadow-2xs">
                  <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{trap.text}<PageTag page={trap.page} quote={trap.quote} /></span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Bottom Call to Action: Study Clinical Cases */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 dark:text-amber-300 font-bold">
                Theory Mastered • Chapter {selectedChapter}
              </span>
              <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-50">
                Ready to Apply Localization in Practice?
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 max-w-md">
                Test your diagnostic deduction with board-style clinical vignettes directly based on this chapter.
              </p>
            </div>

            <button
              onClick={() => {
                if (onStartStudy) {
                  onStartStudy(currentChapterMeta?.title || chapterTitle, 'all')
                } else if (onOpenTab) {
                  onOpenTab('cases')
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>🎯</span>
              <span>Practice Clinical Cases</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
