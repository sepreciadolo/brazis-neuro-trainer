import { createContext, useContext } from 'react'
import type { ReviewRecord } from '../types'

/** The user's review decisions keyed by item id (question id or asset id). */
export type ReviewMap = Record<string, ReviewRecord>

const ReviewsContext = createContext<ReviewMap>({})

export const ReviewsProvider = ReviewsContext.Provider

export function useReviews(): ReviewMap {
  return useContext(ReviewsContext)
}
