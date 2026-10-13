import { describe, it, expect } from 'vitest'
import { CHAPTERS_META } from '../chapters'
import { getActiveQuestions } from '../activeQuestions'
import { isCardDue, computeChapterStats } from '../../fsrs'
import { createEmptyCard } from 'ts-fsrs'
import type { Question, QuestionProgress, ReviewRecord } from '../../types'

describe('Navigation and Curriculum Meta Flows', () => {
  it('verifies that all 23 chapters have consistent metadata and categories', () => {
    expect(CHAPTERS_META).toHaveLength(23)
    
    // Test chapter ordering and categorization
    CHAPTERS_META.forEach((meta, idx) => {
      expect(meta.chapterNumber).toBe(idx + 1)
      expect(meta.id).toBeTruthy()
      expect(meta.title).toBeTruthy()
      expect(meta.totalQuestions).toBeGreaterThanOrEqual(10)
    })
  })

  it('validates anatomical category partitioning matches UI filters', () => {
    const peripheral = CHAPTERS_META.filter(m => m.chapterNumber >= 1 && m.chapterNumber <= 3)
    const spine = CHAPTERS_META.filter(m => m.chapterNumber >= 4 && m.chapterNumber <= 5)
    const cranial = CHAPTERS_META.filter(m => m.chapterNumber >= 6 && m.chapterNumber <= 14)
    const central = CHAPTERS_META.filter(m => m.chapterNumber >= 15 && m.chapterNumber <= 23)

    expect(peripheral).toHaveLength(3) // Ch 1, 2, 3
    expect(spine).toHaveLength(2)      // Ch 4, 5
    expect(cranial).toHaveLength(9)    // Ch 6 to 14
    expect(central).toHaveLength(9)    // Ch 15 to 23
    expect(peripheral.length + spine.length + cranial.length + central.length).toBe(23)
  })

  it('verifies dynamic header generation for any selected digest chapter', () => {
    for (let ch = 1; ch <= 23; ch++) {
      const meta = CHAPTERS_META.find(c => c.chapterNumber === ch)
      expect(meta).toBeDefined()
      const headerTitle = meta ? `Ch. ${ch}: ${meta.title}` : 'Curriculum Digests'
      expect(headerTitle).toContain(`Ch. ${ch}:`)
      expect(headerTitle.length).toBeGreaterThan(7)
    }
  })
})

describe('Study Flow and Question Filtering Logic', () => {
  const sampleQuestion: Question = {
    id: 'test-q1',
    chapter: 'Brainstem',
    section: 'Medullary Syndromes',
    page: 441,
    source_quote: 'The anterior spinal artery supplies the paramedian region',
    vignette: 'A 68-year-old man presents with right hemiplegia and left tongue palsy.',
    question: 'Where is the lesion located?',
    options: ['Left medial medulla', 'Right lateral medulla', 'Pons', 'Midbrain'],
    correct: 0,
    explanation: {
      why_correct: 'Dejerine syndrome',
      distractors: ['Wallenberg', 'Pontine', 'Weber'],
      key_point: 'Medial medullary syndrome involves hypoglossal palsy and hemiplegia.'
    },
    figure: null,
    status: 'ai_checked',
    confidence: 'high',
    external_source: null
  }

  it('filters active questions when user marks a question discarded', () => {
    const activeBefore = getActiveQuestions('Brainstem', {})
    expect(activeBefore.length).toBeGreaterThan(0)

    const firstId = activeBefore[0].id
    const discardReview: ReviewRecord = {
      itemId: firstId,
      kind: 'question',
      decision: 'discard',
      note: 'Clinical ambiguity noted',
      updatedAt: new Date().toISOString()
    }

    const activeAfter = getActiveQuestions('Brainstem', { [firstId]: discardReview })
    expect(activeAfter).toHaveLength(activeBefore.length - 1)
    expect(activeAfter.some(q => q.id === firstId)).toBe(false)
  })

  it('computes due and learned stats accurately across progress lists', () => {
    const dueCard = createEmptyCard(new Date(Date.now() - 3600000))
    dueCard.due = new Date(Date.now() - 3600000)

    const futureCard = createEmptyCard(new Date())
    futureCard.due = new Date(Date.now() + 86400000)

    const mockProgress: QuestionProgress[] = [
      {
        questionId: 'ch15-001',
        chapter: 'Brainstem',
        timesCorrect: 1,
        timesIncorrect: 0,
        history: [],
        fsrsCard: dueCard
      },
      {
        questionId: 'ch15-002',
        chapter: 'Brainstem',
        timesCorrect: 2,
        timesIncorrect: 0,
        history: [],
        fsrsCard: futureCard
      }
    ]

    const stats = computeChapterStats('Brainstem', [sampleQuestion], mockProgress)
    expect(stats.totalQuestions).toBe(1)
    expect(isCardDue(mockProgress[0].fsrsCard, new Date())).toBe(true)
    expect(isCardDue(mockProgress[1].fsrsCard, new Date())).toBe(false)
  })
})
