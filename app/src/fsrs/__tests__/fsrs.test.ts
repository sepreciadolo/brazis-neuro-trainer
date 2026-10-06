import { describe, it, expect } from 'vitest'
import { getNewCard, scheduleReview, isCardDue, Rating, computeChapterStats } from '../index'
import type { Question, QuestionProgress } from '../../types'

describe('FSRS Scheduling and Progress Logic', () => {
  it('creates an empty initial card with valid parameters', () => {
    const card = getNewCard()
    expect(card.reps).toBe(0)
    expect(card.lapses).toBe(0)
    expect(card.state).toBe(0) // State.New
  })

  it('correctly schedules review when answered Good', () => {
    const card = getNewCard(new Date('2026-01-01T12:00:00Z'))
    const { card: nextCard } = scheduleReview(card, Rating.Good, new Date('2026-01-01T12:00:00Z'))
    expect(nextCard.reps).toBe(1)
    expect(nextCard.stability).toBeGreaterThan(0)
    expect(new Date(nextCard.due).getTime()).toBeGreaterThan(new Date('2026-01-01T12:00:00Z').getTime())
  })

  it('correctly identifies due vs future cards', () => {
    const pastCard = { ...getNewCard(), due: new Date(Date.now() - 60000) }
    const futureCard = { ...getNewCard(), due: new Date(Date.now() + 86400000) }
    expect(isCardDue(pastCard)).toBe(true)
    expect(isCardDue(futureCard)).toBe(false)
  })

  it('accurately computes chapter mastery statistics', () => {
    const mockQuestions: Question[] = [
      { id: 'q1', chapter: 'Brainstem' } as Question,
      { id: 'q2', chapter: 'Brainstem' } as Question,
      { id: 'q3', chapter: 'Brainstem' } as Question,
      { id: 'q4', chapter: 'Brainstem' } as Question
    ]

    const card = getNewCard()
    const progressList: QuestionProgress[] = [
      {
        questionId: 'q1',
        chapter: 'Brainstem',
        fsrsCard: { ...card, stability: 14, due: new Date(Date.now() + 1000000) },
        timesCorrect: 3,
        timesIncorrect: 0,
        history: []
      },
      {
        questionId: 'q2',
        chapter: 'Brainstem',
        fsrsCard: { ...card, stability: 1, due: new Date(Date.now() - 10000) }, // due
        timesCorrect: 1,
        timesIncorrect: 1,
        history: []
      }
    ]

    const stats = computeChapterStats('Brainstem', mockQuestions, progressList)
    expect(stats.totalQuestions).toBe(4)
    expect(stats.unseenCount).toBe(2)
    expect(stats.dueCount).toBe(1)
    expect(stats.learnedCount).toBe(2)
    expect(stats.masteredCount).toBe(1)
    expect(stats.masteryPercentage).toBe(25) // 1 out of 4 = 25%
  })
})
