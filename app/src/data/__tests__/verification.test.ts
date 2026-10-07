import { describe, it, expect } from 'vitest'
import { effectiveAssetStatus, effectiveQuestionStatus, isFlagged } from '../effectiveStatus'
import { getActiveQuestions } from '../activeQuestions'
import { buildReviewItems, countByDecision, filterReviewItems, isPageOutsideChapter, parsePageRange } from '../reviewItems'
import { getAllQuestions } from '../chapters'
import { SOURCES, getSource } from '../sources'
import type { ReviewMap } from '../reviews'
import type { ReviewRecord } from '../../types'

const rec = (itemId: string, decision: ReviewRecord['decision'], kind: ReviewRecord['kind'] = 'question'): ReviewRecord => ({
  itemId,
  kind,
  decision,
  note: '',
  updatedAt: '2026-10-07T00:00:00.000Z'
})

describe('effective status (the user decision wins over the file status)', () => {
  it('keeps the file status without a review', () => {
    expect(effectiveQuestionStatus('draft', undefined)).toBe('draft')
    expect(effectiveAssetStatus('unverified', undefined)).toBe('unverified')
  })

  it('maps approve and discard, and leaves flag as a marker only', () => {
    expect(effectiveQuestionStatus('draft', rec('q', 'approve'))).toBe('approved')
    expect(effectiveQuestionStatus('draft', rec('q', 'discard'))).toBe('discarded')
    expect(effectiveQuestionStatus('draft', rec('q', 'flag'))).toBe('draft')
    expect(effectiveAssetStatus('unverified', rec('a', 'approve', 'asset'))).toBe('approved')
    expect(isFlagged(rec('q', 'flag'))).toBe(true)
    expect(isFlagged(rec('q', null))).toBe(false)
  })
})

describe('question content files', () => {
  const questions = getAllQuestions()

  it('has at least the original 188 questions, none approved by anything but the review tool', () => {
    expect(questions.length).toBeGreaterThanOrEqual(188)
    for (const q of questions) {
      expect(q.status, q.id).not.toBe('approved')
      expect(q, q.id).toHaveProperty('source_quote')
      expect(q, q.id).toHaveProperty('external_source')
      if (q.status === 'ai_checked') expect(q.source_quote, q.id).toBeTruthy()
    }
  })

  it('excludes discarded questions from the active set', () => {
    const first = getAllQuestions().find(q => q.chapter === 'Brainstem')!
    const before = getActiveQuestions('Brainstem', {})
    const reviews: ReviewMap = { [first.id]: rec(first.id, 'discard') }
    const after = getActiveQuestions('Brainstem', reviews)
    expect(after).toHaveLength(before.length - 1)
    expect(after.find(q => q.id === first.id)).toBeUndefined()
  })
})

describe('asset registry (content/sources.json)', () => {
  it('has unique ids and nothing approved without user provenance', () => {
    const ids = SOURCES.map(s => s.asset)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of SOURCES) {
      if (s.status === 'approved') {
        expect(s.approved_by, s.asset).toBe('user')
        expect(s.approved_at, s.asset).toBeTruthy()
      }
    }
  })

  it('contains every asset id the UI builds', () => {
    const expected = [
      ...['fig15-2', 'fig15-3', 'fig15-4', 'fig15-5', 'fig15-6'].flatMap(f => [`atlas/plates/${f}`, `atlas/hotspots/${f}`]),
      ...['medulla_middle', 'pons_inferior', 'midbrain_cn3', 'brainstem_dorsal', 'brainstem_ventral', 'midbrain_superior'].map(f => `atlas/vector/${f}`),
      ...['medulla', 'pons', 'midbrain'].flatMap(l => [`lesion_sim/schematic_${l}`, `vascular/${l}`]),
      'lesion_sim/wallenberg', 'lesion_sim/dejerine', 'atlas/structures', 'atlas/3d_model', 'deduction/rule_of_4',
      ...['wallenberg', 'dejerine', 'opalski', 'millard_gubler', 'raymond', 'foville', 'marie_foix', 'locked_in', 'weber', 'benedikt', 'claude', 'parinaud'].map(s => `syndromes/${s}`),
      ...['rule_of_4', 'gaze_palsies', 'vertigo_nystagmus', 'vascular_tree', 'midbrain_triad', 'sensory_patterns'].map(f => `flowcharts/${f}`),
      ...['01', '02', '03', '04', '05', '15'].map(n => `summaries/chapter${n}`)
    ]
    for (const id of expected) expect(getSource(id), id).toBeDefined()
  })
})

describe('review items', () => {
  const items = buildReviewItems()

  it('lists every question and every asset', () => {
    expect(items.filter(i => i.kind === 'question')).toHaveLength(getAllQuestions().length)
    expect(items.filter(i => i.kind === 'asset')).toHaveLength(SOURCES.length)
  })

  it('removes an item from the pending list once the user decides', () => {
    const filter = { kind: 'question' as const, chapter: 'all', state: 'pending' as const }
    const pendingBefore = filterReviewItems(items, {}, filter)
    const reviews: ReviewMap = { 'ch15-001': rec('ch15-001', 'approve') }
    const pendingAfter = filterReviewItems(items, reviews, filter)
    expect(pendingAfter).toHaveLength(pendingBefore.length - 1)
    expect(filterReviewItems(items, reviews, { ...filter, state: 'approve' }).map(i => i.id)).toEqual(['ch15-001'])
    expect(countByDecision(items.filter(i => i.kind === 'question'), reviews).approve).toBe(1)
  })

  it('detects pages outside the chapter range', () => {
    expect(parsePageRange('439–460')).toEqual([439, 460])
    expect(isPageOutsideChapter(445, [439, 460])).toBe(false)
    expect(isPageOutsideChapter(388, [391, 410])).toBe(true)
  })
})
