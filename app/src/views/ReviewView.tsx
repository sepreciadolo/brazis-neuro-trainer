import { useMemo, useState } from 'react'
import { AssetBadge, QuestionBadge } from '../components/StatusBadge'
import { FigureViewerModal } from '../components/FigureViewerModal'
import { CHAPTERS_META } from '../data/chapters'
import {
  buildReviewItems,
  countByDecision,
  filterReviewItems,
  isPageOutsideChapter,
  type ReviewFilter,
  type ReviewItem,
  type ReviewState
} from '../data/reviewItems'
import type { ReviewMap } from '../data/reviews'
import { exportReviews } from '../db'
import type { ReviewDecision, ReviewRecord } from '../types'

interface ReviewViewProps {
  reviews: ReviewMap
  onSaveReview: (record: ReviewRecord) => Promise<void>
}

const DECISION_TEXT: Record<ReviewDecision, string> = {
  approve: 'Approved by you',
  discard: 'Discarded by you',
  flag: 'Flagged by you'
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E']

function figureSrcFor(item: ReviewItem): string | null {
  if (item.question?.figure) return `/${item.question.figure}`
  if (item.asset?.asset.startsWith('figures/')) return `/${item.asset.asset}.png`
  if (item.asset?.asset.startsWith('atlas/vector/')) return `/atlas/${item.asset.asset.split('/').pop()}.svg`
  return null
}

export function ReviewView({ reviews, onSaveReview }: ReviewViewProps) {
  const allItems = useMemo(() => buildReviewItems(), [])
  const [filter, setFilter] = useState<ReviewFilter>({ kind: 'question', chapter: 'all', state: 'pending' })
  const [index, setIndex] = useState(0)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteDraft, setNoteDraft] = useState('')
  const [isFigureOpen, setIsFigureOpen] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const visible = useMemo(() => filterReviewItems(allItems, reviews, filter), [allItems, reviews, filter])
  const kindItems = useMemo(() => allItems.filter(i => i.kind === filter.kind), [allItems, filter.kind])
  const counts = useMemo(() => countByDecision(kindItems, reviews), [kindItems, reviews])

  // When a decision removes the item from a filtered list, the same index now points at the next one.
  const safeIndex = Math.min(index, Math.max(visible.length - 1, 0))
  const item: ReviewItem | undefined = visible[safeIndex]
  const record = item ? reviews[item.id] : undefined
  const figureSrc = item ? figureSrcFor(item) : null

  const updateFilter = (patch: Partial<ReviewFilter>) => {
    setFilter(prev => ({ ...prev, ...patch }))
    setIndex(0)
    setNoteOpen(false)
  }

  const go = (delta: number) => {
    setIndex(Math.min(Math.max(safeIndex + delta, 0), Math.max(visible.length - 1, 0)))
    setNoteOpen(false)
  }

  const decide = async (decision: ReviewDecision) => {
    if (!item) return
    await onSaveReview({
      itemId: item.id,
      kind: item.kind,
      // Pressing the active decision again clears it.
      decision: record?.decision === decision ? null : decision,
      note: record?.note ?? '',
      updatedAt: new Date().toISOString()
    })
    setNoteOpen(false)
  }

  const openNote = () => {
    setNoteDraft(record?.note ?? '')
    setNoteOpen(true)
  }

  const saveNote = async () => {
    if (!item) return
    await onSaveReview({
      itemId: item.id,
      kind: item.kind,
      decision: record?.decision ?? null,
      note: noteDraft.trim(),
      updatedAt: new Date().toISOString()
    })
    setNoteOpen(false)
  }

  const handleExport = async () => {
    const data = await exportReviews()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `brazis_reviews_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage(`Exported ${data.reviews.length} review decision${data.reviews.length === 1 ? '' : 's'}.`)
  }

  const selectClass =
    'w-full min-h-[44px] px-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100'

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full p-4 pb-28 space-y-4 animate-fade-in">
      {/* Summary and export */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-100">Review Tool</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Only your decision here can mark content as approved. Export the decisions so they can be applied to the content files.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="shrink-0 px-3 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-100 active:scale-95 transition"
          >
            Export reviews (JSON)
          </button>
        </div>
        <p className="text-xs font-mono text-slate-400" aria-live="polite">
          {filter.kind === 'question' ? 'Questions' : 'Assets'}: {counts.pending} pending · {counts.approve} approved ·{' '}
          {counts.discard} discarded · {counts.flag} flagged
        </p>
        {message && <p className="text-xs text-emerald-300">{message}</p>}
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="What to review">
          {(['question', 'asset'] as const).map(kind => (
            <button
              key={kind}
              onClick={() => updateFilter({ kind })}
              aria-pressed={filter.kind === kind}
              className={`min-h-[44px] rounded-xl border text-sm font-semibold transition active:scale-95 ${
                filter.kind === kind
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              {kind === 'question' ? 'Questions' : 'Atlas, diagrams, digests'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {filter.kind === 'question' ? (
            <select
              aria-label="Chapter"
              value={filter.chapter}
              onChange={e => updateFilter({ chapter: e.target.value })}
              className={selectClass}
            >
              <option value="all">All chapters</option>
              {CHAPTERS_META.map(m => (
                <option key={m.id} value={m.id}>
                  Ch {m.chapterNumber} · {m.id}
                </option>
              ))}
            </select>
          ) : (
            <div className="min-h-[44px] flex items-center px-1 text-xs text-slate-500">All asset types</div>
          )}
          <select
            aria-label="Decision filter"
            value={filter.state}
            onChange={e => updateFilter({ state: e.target.value as ReviewState })}
            className={selectClass}
          >
            <option value="pending">Pending</option>
            <option value="approve">Approved</option>
            <option value="discard">Discarded</option>
            <option value="flag">Flagged</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {!item ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-300 text-center">
          Nothing to review with these filters.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono" aria-live="polite">
              {safeIndex + 1} of {visible.length}
            </span>
            <span className="font-semibold text-slate-300">
              {record?.decision ? DECISION_TEXT[record.decision] : 'No decision yet'}
            </span>
          </div>

          <article className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            {item.question ? (
              <QuestionContent item={item} onOpenFigure={() => setIsFigureOpen(true)} />
            ) : item.asset ? (
              <AssetContent item={item} figureSrc={figureSrc} onOpenFigure={() => setIsFigureOpen(true)} />
            ) : null}

            {record?.note && !noteOpen && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-slate-200">Your note: </span>
                {record.note}
              </div>
            )}

            {noteOpen && (
              <div className="space-y-2">
                <label htmlFor="review-note" className="text-xs font-bold text-slate-300">
                  Note for this item
                </label>
                <textarea
                  id="review-note"
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={saveNote}
                    className="min-h-[44px] rounded-xl bg-cyan-500 text-slate-950 text-sm font-bold active:scale-95 transition"
                  >
                    Save note
                  </button>
                  <button
                    onClick={() => setNoteOpen(false)}
                    className="min-h-[44px] rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 active:scale-95 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </article>

          {/* Previous / next */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => go(-1)}
              disabled={safeIndex === 0}
              className="min-h-[44px] rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-200 disabled:opacity-40 active:scale-95 transition"
            >
              ← Previous
            </button>
            <button
              onClick={() => go(1)}
              disabled={safeIndex >= visible.length - 1}
              className="min-h-[44px] rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-200 disabled:opacity-40 active:scale-95 transition"
            >
              Next →
            </button>
          </div>

          {/* Decision bar */}
          <div className="sticky bottom-3 p-2 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Your decision">
              <DecisionButton
                label="Approve"
                activeLabel="Approved"
                glyph="✓"
                active={record?.decision === 'approve'}
                activeClass="bg-emerald-500 text-slate-950 border-emerald-400"
                onClick={() => decide('approve')}
              />
              <DecisionButton
                label="Flag"
                activeLabel="Flagged"
                glyph="⚑"
                active={record?.decision === 'flag'}
                activeClass="bg-orange-400 text-slate-950 border-orange-300"
                onClick={() => decide('flag')}
              />
              <DecisionButton
                label="Discard"
                activeLabel="Discarded"
                glyph="✕"
                active={record?.decision === 'discard'}
                activeClass="bg-rose-500 text-white border-rose-400"
                onClick={() => decide('discard')}
              />
              <button
                onClick={openNote}
                className="min-h-[48px] rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-100 flex flex-col items-center justify-center active:scale-95 transition"
              >
                <span aria-hidden="true">✎</span>
                <span>{record?.note ? 'Edit note' : 'Add note'}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {item && figureSrc && (
        <FigureViewerModal
          isOpen={isFigureOpen}
          onClose={() => setIsFigureOpen(false)}
          imageSrc={figureSrc}
          title={item.title}
        />
      )}
    </div>
  )
}

interface DecisionButtonProps {
  label: string
  activeLabel: string
  glyph: string
  active: boolean
  activeClass: string
  onClick: () => void
}

function DecisionButton({ label, activeLabel, glyph, active, activeClass, onClick }: DecisionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[48px] rounded-xl border text-xs font-bold flex flex-col items-center justify-center active:scale-95 transition ${
        active ? activeClass : 'bg-slate-900 border-slate-700 text-slate-100'
      }`}
    >
      <span aria-hidden="true">{glyph}</span>
      <span>{active ? activeLabel : label}</span>
    </button>
  )
}

function QuestionContent({ item, onOpenFigure }: { item: ReviewItem; onOpenFigure: () => void }) {
  const q = item.question!
  const outside = isPageOutsideChapter(q.page, item.chapterPages)
  return (
    <>
      <div className="space-y-2">
        <QuestionBadge question={q} />
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
          {q.id} · {q.chapter} · {q.section}
        </div>
        <div className="text-xs font-mono text-slate-400">
          Cited: Brazis p. {q.page}
          {item.chapterPages ? ` (chapter pp. ${item.chapterPages[0]}–${item.chapterPages[1]})` : ''}
        </div>
        {outside && (
          <p className="text-xs font-semibold text-amber-300">
            ⚠ This page is outside the chapter's page range. Check it against the book.
          </p>
        )}
      </div>

      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
        <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Source quote (verification only)</div>
        {q.source_quote ? (
          <p className="text-slate-200 leading-relaxed">“{q.source_quote}”</p>
        ) : (
          <p className="text-amber-300">No source quote: this question cannot be AI-checked yet.</p>
        )}
        {q.external_source && <p className="text-violet-300">External source: {q.external_source}</p>}
      </div>

      <p className="text-base text-slate-100 leading-relaxed">{q.vignette}</p>
      <p className="text-base font-semibold text-slate-100 leading-relaxed">{q.question}</p>

      <ol className="space-y-2" aria-label="Answer options">
        {q.options.map((opt, i) => (
          <li
            key={i}
            className={`p-3 rounded-xl border text-sm leading-snug ${
              i === q.correct ? 'border-emerald-500 bg-emerald-500/10 text-emerald-100' : 'border-slate-800 bg-slate-950 text-slate-300'
            }`}
          >
            <span className="font-bold mr-2">{OPTION_LETTERS[i]}.</span>
            {opt}
            {i === q.correct && <span className="block text-xs font-bold text-emerald-300 mt-1">✓ Marked correct</span>}
          </li>
        ))}
      </ol>

      <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-slate-100">Why correct: </span>
          {q.explanation.why_correct}
        </p>
        <div>
          <span className="font-bold text-slate-100">Distractors:</span>
          <ul className="mt-1 space-y-1">
            {q.options
              .map((_, i) => i)
              .filter(i => i !== q.correct)
              .map((optIndex, k) => (
                <li key={optIndex}>
                  <span className="font-semibold">{OPTION_LETTERS[optIndex]}.</span> {q.explanation.distractors[k]}
                </li>
              ))}
          </ul>
        </div>
        <p>
          <span className="font-bold text-slate-100">Key point: </span>
          {q.explanation.key_point}
        </p>
      </div>

      {q.figure && (
        <button
          onClick={onOpenFigure}
          className="w-full min-h-[44px] rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-cyan-300 active:scale-95 transition"
        >
          🔍 Open the linked figure ({q.figure.split('/').pop()})
        </button>
      )}
    </>
  )
}

function AssetContent({
  item,
  figureSrc,
  onOpenFigure
}: {
  item: ReviewItem
  figureSrc: string | null
  onOpenFigure: () => void
}) {
  const a = item.asset!
  return (
    <>
      <div className="space-y-2">
        <AssetBadge assetId={a.asset} />
        <h3 className="text-base font-bold text-slate-100">{a.title}</h3>
        <div className="text-xs font-mono text-slate-400 break-all">
          {a.asset} · {a.type}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
        <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Source</div>
        <p className="text-slate-200 leading-relaxed">{a.source}</p>
        {a.external_source && <p className="text-violet-300">External source: {a.external_source}</p>}
      </div>

      {a.notes.length > 0 && (
        <div className="space-y-1.5">
          <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Audit notes</div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-4">
            {a.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {figureSrc && (
        <button
          onClick={onOpenFigure}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2 active:scale-95 transition"
          aria-label="Open the image full screen"
        >
          <img src={figureSrc} alt={a.title} className="max-h-56 mx-auto object-contain" />
          <span className="block text-xs font-semibold text-cyan-300 mt-1">🔍 Tap to enlarge</span>
        </button>
      )}
    </>
  )
}
