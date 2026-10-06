import { fsrs, createEmptyCard, Rating, type Card, type RecordLogItem } from 'ts-fsrs'
import type { Question, QuestionProgress } from '../types'

export const scheduler = fsrs()

export { Rating }
export type { Card }

export function getNewCard(date: Date = new Date()): Card {
  return createEmptyCard(date)
}

export function scheduleReview(
  card: Card,
  rating: Rating,
  reviewDate: Date = new Date()
): { card: Card; log: RecordLogItem['log'] } {
  // Ensure card dates are converted from string if loaded from JSON/IndexedDB
  const normalizedCard: Card = {
    ...card,
    due: new Date(card.due),
    last_review: card.last_review ? new Date(card.last_review) : undefined
  }
  const recordLog = scheduler.repeat(normalizedCard, reviewDate)
  const key = rating as 1 | 2 | 3 | 4
  const item = recordLog[key]
  return {
    card: item.card,
    log: item.log
  }
}

export function isCardDue(card: Card, now: Date = new Date()): boolean {
  const dueDate = new Date(card.due)
  return dueDate.getTime() <= now.getTime()
}

export interface ChapterStats {
  chapter: string
  totalQuestions: number
  unseenCount: number
  dueCount: number
  learnedCount: number
  masteredCount: number
  masteryPercentage: number
}

export function computeChapterStats(
  chapterName: string,
  questions: Question[],
  progressList: QuestionProgress[]
): ChapterStats {
  const progressMap = new Map<string, QuestionProgress>()
  for (const p of progressList) {
    if (p.chapter === chapterName) {
      progressMap.set(p.questionId, p)
    }
  }

  const now = new Date()
  let unseenCount = 0
  let dueCount = 0
  let learnedCount = 0
  let masteredCount = 0

  for (const q of questions) {
    const prog = progressMap.get(q.id)
    if (!prog) {
      unseenCount++
    } else {
      learnedCount++
      if (isCardDue(prog.fsrsCard, now)) {
        dueCount++
      }
      // FSRS: stability > 7 days or timesCorrect >= 2 with no recent lapses is considered mastered
      if (prog.fsrsCard.stability >= 7 || (prog.timesCorrect >= 2 && prog.timesIncorrect === 0)) {
        masteredCount++
      }
    }
  }

  const totalQuestions = questions.length
  const masteryPercentage = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0

  return {
    chapter: chapterName,
    totalQuestions,
    unseenCount,
    dueCount,
    learnedCount,
    masteredCount,
    masteryPercentage
  }
}
