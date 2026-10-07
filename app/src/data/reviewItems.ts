import type { AssetStatus, Question, QuestionStatus, ReviewDecision, SourceEntry } from '../types'
import { CHAPTERS_META, CHAPTERS_REGISTRY } from './chapters'
import { effectiveAssetStatus, effectiveQuestionStatus } from './effectiveStatus'
import type { ReviewMap } from './reviews'
import { SOURCES } from './sources'

/** One thing the user can review: a question or a non-question asset from sources.json. */
export interface ReviewItem {
  id: string
  kind: 'question' | 'asset'
  /** Short label for lists and counters. */
  title: string
  /** Chapter registry id for questions; asset type for assets. */
  group: string
  fileStatus: QuestionStatus | AssetStatus
  question?: Question
  asset?: SourceEntry
  /** Book pages the chapter spans, parsed from the chapter metadata (questions only). */
  chapterPages?: [number, number]
}

export type ReviewState = 'pending' | ReviewDecision | 'all'

export interface ReviewFilter {
  kind: 'question' | 'asset'
  /** Chapter registry id, or 'all'. Only applies to questions. */
  chapter: string
  state: ReviewState
}

/** '439–460' -> [439, 460]; null when the text has no two numbers. */
export function parsePageRange(text: string): [number, number] | null {
  const m = text.match(/(\d+)\D+(\d+)/)
  return m ? [Number(m[1]), Number(m[2])] : null
}

/** True when a question cites a page outside the chapter it belongs to. */
export function isPageOutsideChapter(page: number, range?: [number, number]): boolean {
  return !!range && (page < range[0] || page > range[1])
}

export function buildReviewItems(): ReviewItem[] {
  const items: ReviewItem[] = []
  for (const meta of CHAPTERS_META) {
    const chapterPages = parsePageRange(meta.pdfPages) ?? undefined
    for (const q of CHAPTERS_REGISTRY[meta.id] ?? []) {
      items.push({
        id: q.id,
        kind: 'question',
        title: `${q.id} · ${q.section}`,
        group: meta.id,
        fileStatus: q.status,
        question: q,
        chapterPages
      })
    }
  }
  for (const a of SOURCES) {
    items.push({ id: a.asset, kind: 'asset', title: a.title, group: a.type, fileStatus: a.status, asset: a })
  }
  return items
}

/** The status the UI uses for an item once the user's decision is applied. */
export function itemEffectiveStatus(item: ReviewItem, reviews: ReviewMap): string {
  const review = reviews[item.id]
  return item.kind === 'question'
    ? effectiveQuestionStatus(item.fileStatus as QuestionStatus, review)
    : effectiveAssetStatus(item.fileStatus as AssetStatus, review)
}

export function filterReviewItems(items: ReviewItem[], reviews: ReviewMap, filter: ReviewFilter): ReviewItem[] {
  return items.filter(item => {
    if (item.kind !== filter.kind) return false
    if (item.kind === 'question' && filter.chapter !== 'all' && item.group !== filter.chapter) return false
    const decision = reviews[item.id]?.decision ?? null
    if (filter.state === 'all') return true
    if (filter.state === 'pending') return decision === null
    return decision === filter.state
  })
}

export function countByDecision(items: ReviewItem[], reviews: ReviewMap): Record<'pending' | ReviewDecision, number> {
  const out = { pending: 0, approve: 0, discard: 0, flag: 0 }
  for (const item of items) {
    const d = reviews[item.id]?.decision ?? null
    if (d === null) out.pending++
    else out[d]++
  }
  return out
}
