import { useState, useEffect } from 'react'
import { CHAPTERS_META } from '../data/chapters'
import { getActiveQuestions } from '../data/activeQuestions'
import { useReviews } from '../data/reviews'
import { getAllProgress } from '../db'
import { computeChapterStats, type ChapterStats } from '../fsrs'

interface HomeViewProps {
  onStartStudy: (chapter: string, mode: 'new' | 'review' | 'all') => void
  onOpenDigest?: (chapterNumber: number) => void
  onOpenSettings?: () => void
}

type CategoryType = 'all' | 'peripheral' | 'spine' | 'cranial' | 'central'

export function HomeView({ onStartStudy, onOpenDigest }: HomeViewProps) {
  const [statsMap, setStatsMap] = useState<Record<string, ChapterStats>>({})
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all')
  const reviews = useReviews()

  useEffect(() => {
    async function loadData() {
      const progressList = await getAllProgress()
      const newStats: Record<string, ChapterStats> = {}

      for (const meta of CHAPTERS_META) {
        const questions = getActiveQuestions(meta.id, reviews)
        const stats = computeChapterStats(meta.id, questions, progressList)
        newStats[meta.id] = stats
      }
      setStatsMap(newStats)
    }
    loadData()
  }, [reviews])

  // Calculate global totals
  const totalDue = Object.values(statsMap).reduce((acc, s) => acc + s.dueCount, 0)
  const totalLearned = Object.values(statsMap).reduce((acc, s) => acc + s.learnedCount, 0)
  const totalQuestions = Object.values(statsMap).reduce((acc, s) => acc + s.totalQuestions, 0)
  const overallMastery = totalQuestions > 0 ? Math.round((totalLearned / totalQuestions) * 100) : 0

  const filteredChapters = CHAPTERS_META.filter(meta => {
    if (selectedCategory === 'peripheral') return meta.chapterNumber >= 1 && meta.chapterNumber <= 3
    if (selectedCategory === 'spine') return meta.chapterNumber >= 4 && meta.chapterNumber <= 5
    if (selectedCategory === 'cranial') return meta.chapterNumber >= 6 && meta.chapterNumber <= 14
    if (selectedCategory === 'central') return meta.chapterNumber >= 15 && meta.chapterNumber <= 23
    return true
  })

  const bannerData = {
    all: {
      src: `${import.meta.env.BASE_URL}illustrations/brainstem_hero.jpg`,
      title: "Reason from signs to anatomical coordinates",
      badge: "Anatomical Deduction & Spaced Repetition",
      desc: "Board-style vignettes rooted verbatim in Brazis Localization in Clinical Neurology, trained with FSRS memory optimization."
    },
    peripheral: {
      src: `${import.meta.env.BASE_URL}illustrations/brainstem_hero.jpg`,
      title: "Peripheral Nerves, Roots & Plexus Localization",
      badge: "Upper vs Lower Motor Neuron & Entrapment Syndromes",
      desc: "Localization of median, ulnar, radial, plexopathies, and radicular dermatomes vs peripheral nerve distributions."
    },
    spine: {
      src: `${import.meta.env.BASE_URL}illustrations/spinal_cord.jpg`,
      title: "Transverse Cord Pathways & Myelopathies",
      badge: "Ascending & Descending Tract Localization",
      desc: "Brown-Séquard, anterior spinal artery ischemia, subacute combined degeneration, and conus vs cauda equina."
    },
    cranial: {
      src: `${import.meta.env.BASE_URL}illustrations/brainstem_hero.jpg`,
      title: "Cranial Nerve Nuclei & Fascicular Syndromes",
      badge: "CN I through XII Topodiagnosis",
      desc: "Pupil-sparing third nerve palsy, cavernous sinus syndromes, petrous apex pathways, and bulbar palsies."
    },
    central: {
      src: `${import.meta.env.BASE_URL}illustrations/cerebral_territories.jpg`,
      title: "Supratentorial & Vascular Topodiagnosis",
      badge: "Vascular Territories & Cortical Syndromes",
      desc: "ACA, MCA, PCA territory infarctions, Gerstmann syndrome, Balint syndrome, and herniation patterns."
    }
  }[selectedCategory]

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-5 pb-24 space-y-7 animate-fade-in">
      {/* Editorial Hero & Monograph Intro */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e2dfd7] dark:border-[#28282e] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1 font-mono">
              <span>Brazis · Masdeu · Biller · 8th Ed.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Localization Curriculum
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
            <div>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-200">{totalLearned}</span>
              <span className="opacity-75"> / {totalQuestions} learned</span>
            </div>
            <div className="h-3 w-px bg-stone-300 dark:bg-stone-700" />
            <div>
              <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">{overallMastery}%</span>
              <span className="opacity-75"> retention</span>
            </div>
          </div>
        </div>

        {/* Anatomical Illustrated Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#e2dfd7] dark:border-[#28282e] bg-stone-900 text-white shadow-xs transition-all duration-300">
          <img
            key={bannerData.src}
            src={bannerData.src}
            alt={bannerData.title}
            className="w-full h-44 sm:h-52 object-cover object-center opacity-85 hover:scale-[1.01] transition duration-500 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-4 sm:p-5 flex flex-col justify-end">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300/90">
              {bannerData.badge}
            </span>
            <h3 className="text-lg font-serif font-semibold text-white leading-snug mt-0.5">
              {bannerData.title}
            </h3>
            <p className="text-xs text-stone-300/90 leading-relaxed max-w-lg mt-1 hidden sm:block">
              {bannerData.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Due Review Callout */}
      {totalDue > 0 ? (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
            <div>
              <div className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                {totalDue} {totalDue === 1 ? 'vignette due for review' : 'vignettes due for review'}
              </div>
              <div className="text-[11px] text-amber-800/80 dark:text-amber-300/70">
                Scheduled by FSRS retention decay
              </div>
            </div>
          </div>
          <button
            onClick={() => onStartStudy('Brainstem', 'review')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 text-xs font-semibold shadow-xs active:scale-95 transition min-h-[38px]"
          >
            Review Queue
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 px-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span>All retention schedules current for today.</span>
        </div>
      )}

      {/* Anatomical Tier Filter Chips */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
            Anatomical Sections
          </span>
          <span className="text-xs text-stone-400 font-mono">
            {filteredChapters.length} {filteredChapters.length === 1 ? 'Chapter' : 'Chapters'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all' as CategoryType, label: 'All Chapters' },
            { id: 'peripheral' as CategoryType, label: 'Peripheral (1–3)' },
            { id: 'spine' as CategoryType, label: 'Spine & Cord (4–5)' },
            { id: 'cranial' as CategoryType, label: 'Cranial Nerves (6–14)' },
            { id: 'central' as CategoryType, label: 'Brainstem & Central (15–23)' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition min-h-[36px] font-medium border ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold shadow-xs border-transparent'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-[#232328] border-stone-200/80 dark:border-[#28282e]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter Syllabus Table */}
      <div className="divide-y divide-[#e2dfd7] dark:divide-[#28282e]">
        {filteredChapters.map(meta => {
          const stats = statsMap[meta.id]
          const mastery = stats ? stats.masteryPercentage : 0
          const due = stats ? stats.dueCount : 0
          const total = stats ? stats.totalQuestions : meta.totalQuestions
          const unseen = stats ? stats.unseenCount : meta.totalQuestions
          const learned = stats ? stats.learnedCount : 0

          return (
            <article
              key={meta.id}
              className="py-4 first:pt-0 last:pb-0 group transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-stone-400 dark:text-stone-500 font-semibold">
                      {String(meta.chapterNumber).padStart(2, '0')}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="font-mono text-stone-500 dark:text-stone-400 text-[11px]">
                      pp. {meta.pdfPages}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-serif font-semibold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                    {meta.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pr-2">
                    {meta.description}
                  </p>
                </div>

                {/* Progress & Quick Actions */}
                <div className="sm:w-56 shrink-0 space-y-2 pt-1 sm:pt-0">
                  {/* Retention Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-medium text-stone-700 dark:text-stone-300">
                        {mastery}% retention
                      </span>
                      <span className="text-stone-500 dark:text-stone-400">
                        {learned}/{total}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-300"
                        style={{ width: `${mastery}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {onOpenDigest && (
                      <button
                        onClick={() => onOpenDigest(meta.chapterNumber)}
                        className="py-2 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-amber-500/10 dark:hover:bg-amber-500/15 text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-300 hover:border-amber-500/40 text-xs font-semibold transition active:scale-95 min-h-[44px] flex items-center justify-center gap-1 cursor-pointer shrink-0"
                        title={`Study Chapter ${meta.chapterNumber} Monograph Digest`}
                      >
                        <span className="text-amber-600 dark:text-amber-400">📖</span>
                        <span>Digest</span>
                      </button>
                    )}

                    {due > 0 ? (
                      <button
                        onClick={() => onStartStudy(meta.id, 'review')}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 font-semibold text-xs transition active:scale-95 min-h-[44px] flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                      >
                        <span>Review ({due})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onStartStudy(meta.id, 'new')}
                        disabled={unseen === 0}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 disabled:opacity-30 font-semibold text-xs transition active:scale-95 min-h-[44px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Learn ({unseen})</span>
                      </button>
                    )}

                    <button
                      onClick={() => onStartStudy(meta.id, 'all')}
                      className="py-2 px-2.5 rounded-xl border border-stone-200 dark:border-[#28282e] hover:bg-stone-100 dark:hover:bg-[#232328] text-stone-700 dark:text-stone-300 text-xs font-medium transition active:scale-95 min-h-[44px] flex items-center justify-center cursor-pointer shrink-0"
                      title="Practice all questions in chapter"
                    >
                      All ({total})
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
