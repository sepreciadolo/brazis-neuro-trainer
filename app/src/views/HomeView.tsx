import { useState, useEffect } from 'react'
import { CHAPTERS_META, getQuestionsByChapter } from '../data/chapters'
import { getAllProgress } from '../db'
import { computeChapterStats, type ChapterStats } from '../fsrs'

interface HomeViewProps {
  onStartStudy: (chapter: string, mode: 'new' | 'review' | 'all') => void
  onOpenSettings?: () => void
}

export function HomeView({ onStartStudy }: HomeViewProps) {
  const [statsMap, setStatsMap] = useState<Record<string, ChapterStats>>({})

  useEffect(() => {
    async function loadData() {
      const progressList = await getAllProgress()
      const newStats: Record<string, ChapterStats> = {}

      for (const meta of CHAPTERS_META) {
        const questions = getQuestionsByChapter(meta.id)
        const stats = computeChapterStats(meta.id, questions, progressList)
        newStats[meta.id] = stats
      }
      setStatsMap(newStats)
    }
    loadData()
  }, [])

  // Calculate global due count
  const totalDue = Object.values(statsMap).reduce((acc, s) => acc + s.dueCount, 0)

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full p-4 pb-20 space-y-5 animate-fade-in">
      {/* Due Banner */}
      {totalDue > 0 ? (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="text-sm font-bold text-amber-300">
                {totalDue} {totalDue === 1 ? 'Question Due for Review' : 'Questions Due for Review'}
              </h3>
              <p className="text-xs text-slate-300">Spaced repetition schedule is ready</p>
            </div>
          </div>
          <button
            onClick={() => onStartStudy('Brainstem', 'review')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 active:scale-95 transition"
          >
            Review Now
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            All reviews up to date for today!
          </span>
          <span className="font-mono text-slate-500">ts-fsrs algorithm</span>
        </div>
      )}

      {/* Hero card / Welcome */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60">
            Complete 23-Chapter Curriculum
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Localization in Clinical Neurology</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Neurology Board Localization Practice</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Master clinical lesion localization from symptoms and signs through board-style clinical vignettes with detailed anatomical reasoning and publisher figures.
        </p>
      </div>

      {/* Chapters list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Available Chapters</h3>
          <span className="text-xs text-slate-500">{CHAPTERS_META.length} Chapters</span>
        </div>

        {CHAPTERS_META.map(meta => {
          const stats = statsMap[meta.id]
          const mastery = stats ? stats.masteryPercentage : 0
          const due = stats ? stats.dueCount : 0
          const unseen = stats ? stats.unseenCount : meta.totalQuestions
          const learned = stats ? stats.learnedCount : 0

          return (
            <div
              key={meta.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition space-y-4 shadow-sm dark:shadow-black/20"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Chapter {meta.chapterNumber}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">pp. {meta.pdfPages}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{meta.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{meta.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{mastery}%</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Mastery</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${mastery}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>{learned} / {meta.totalQuestions} learned</span>
                  <span>{unseen} new remaining</span>
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-2 text-center py-1">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-sm font-bold text-sky-600 dark:text-sky-400">{unseen}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">New</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{due}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Due Review</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats?.masteredCount || 0}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Mastered</div>
                </div>
              </div>

              {/* Actions - Ergonomic bottom touch targets */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {due > 0 ? (
                  <button
                    onClick={() => onStartStudy(meta.id, 'review')}
                    className="py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition min-h-[44px]"
                  >
                    <span>⚡</span>
                    <span>Review Due ({due})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStartStudy(meta.id, 'new')}
                    disabled={unseen === 0}
                    className="py-3 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition min-h-[44px]"
                  >
                    <span>✨</span>
                    <span>Learn New ({unseen})</span>
                  </button>
                )}

                <button
                  onClick={() => onStartStudy(meta.id, 'all')}
                  className="py-3 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 active:scale-95 transition min-h-[44px]"
                >
                  <span>📚</span>
                  <span>Practice All ({meta.totalQuestions})</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
