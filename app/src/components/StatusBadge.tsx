import { effectiveAssetStatus, effectiveQuestionStatus, isFlagged } from '../data/effectiveStatus'
import { useReviews } from '../data/reviews'
import { getSource } from '../data/sources'
import type { AssetStatus, Question, QuestionStatus } from '../types'

type ChipStatus = AssetStatus | QuestionStatus

const CHIP: Record<string, { glyph: string; text: string; sentence: string; cls: string }> = {
  unverified: {
    glyph: '⚠',
    text: 'Unverified',
    sentence: 'Unverified: not yet reviewed against the book',
    cls: 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40'
  },
  ai_checked: {
    glyph: '◐',
    text: 'AI-checked',
    sentence: 'AI-checked: matched to the book text by the AI, not yet reviewed by you',
    cls: 'bg-sky-100 text-sky-900 border-sky-400 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40'
  },
  discarded: {
    glyph: '✕',
    text: 'Discarded',
    sentence: 'Discarded: removed from rotation',
    cls: 'bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/40'
  },
  external: {
    glyph: '↗',
    text: 'External source',
    sentence: 'External source: not from Brazis',
    cls: 'bg-violet-100 text-violet-900 border-violet-400 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/40'
  },
  flagged: {
    glyph: '⚑',
    text: 'Flagged',
    sentence: 'Flagged by you for follow-up',
    cls: 'bg-orange-100 text-orange-900 border-orange-400 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/40'
  }
}

interface ChipProps {
  kind: 'unverified' | 'ai_checked' | 'discarded' | 'external' | 'flagged'
  prefix?: string
}

/** Small pill: a glyph plus text, so the meaning never relies on colour alone. */
export function Chip({ kind, prefix }: ChipProps) {
  const c = CHIP[kind]
  return (
    <span
      role="note"
      aria-label={prefix ? `${prefix}: ${c.sentence}` : c.sentence}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold leading-tight whitespace-nowrap ${c.cls}`}
    >
      <span aria-hidden="true">{c.glyph}</span>
      {prefix ? `${prefix}: ` : ''}
      {c.text}
    </span>
  )
}

function statusToKind(status: ChipStatus): ChipProps['kind'] | null {
  if (status === 'approved') return null
  if (status === 'draft' || status === 'unverified') return 'unverified'
  return status
}

interface AssetBadgeProps {
  /** Id in content/sources.json, e.g. 'flowcharts/rule_of_4'. Unknown ids show as unverified. */
  assetId: string
  /** Short prefix such as 'Pins' when several badges sit side by side. */
  label?: string
  /** Also spell out the external citation (if any) as a muted line under the chips. */
  detail?: boolean
  className?: string
}

/** Status badge for a non-question asset (figure, atlas layer, diagram, matrix row, digest...). */
export function AssetBadge({ assetId, label, detail = false, className = '' }: AssetBadgeProps) {
  const reviews = useReviews()
  const source = getSource(assetId)
  const review = reviews[assetId]
  const kind = statusToKind(effectiveAssetStatus(source?.status ?? 'unverified', review))
  const external = source?.external_source ?? null
  const flagged = isFlagged(review)

  if (!kind && !external && !flagged) return null

  return (
    <span className={`inline-flex flex-col gap-1 ${className}`}>
      <span className="inline-flex flex-wrap items-center gap-1">
        {kind && <Chip kind={kind} prefix={label} />}
        {external && <Chip kind="external" prefix={kind ? undefined : label} />}
        {flagged && <Chip kind="flagged" />}
      </span>
      {detail && external && (
        <span className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
          External source: {external}
        </span>
      )}
    </span>
  )
}

interface QuestionBadgeProps {
  question: Pick<Question, 'id' | 'status' | 'external_source'>
  className?: string
}

/** Status badge for a question; the user's review decision wins over the file status. */
export function QuestionBadge({ question, className = '' }: QuestionBadgeProps) {
  const reviews = useReviews()
  const review = reviews[question.id]
  const kind = statusToKind(effectiveQuestionStatus(question.status, review))
  const flagged = isFlagged(review)

  if (!kind && !question.external_source && !flagged) return null

  return (
    <span className={`inline-flex flex-wrap items-center gap-1 ${className}`}>
      {kind && <Chip kind={kind} />}
      {question.external_source && <Chip kind="external" />}
      {flagged && <Chip kind="flagged" />}
    </span>
  )
}
