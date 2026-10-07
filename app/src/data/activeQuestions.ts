import type { Question } from '../types'
import { getQuestionsByChapter } from './chapters'
import { effectiveQuestionStatus } from './effectiveStatus'
import type { ReviewMap } from './reviews'

/** Questions of a chapter that are still in rotation: everything except discarded ones. */
export function getActiveQuestions(chapter: string, reviews: ReviewMap): Question[] {
  return getQuestionsByChapter(chapter).filter(
    q => effectiveQuestionStatus(q.status, reviews[q.id]) !== 'discarded'
  )
}
