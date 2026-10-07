import type { Card } from 'ts-fsrs'

export interface QuestionExplanation {
  why_correct: string
  distractors: string[]
  key_point: string
}

// draft: generated, not checked. ai_checked: matched against the extracted text.
// approved: reviewed by the user (only the in-app review tool sets it). discarded: out of rotation.
export type QuestionStatus = 'draft' | 'ai_checked' | 'approved' | 'discarded'

export interface Question {
  id: string
  chapter: string
  section: string
  page: number
  /** Short excerpt (max ~25 words) that supports the answer; for verification only. */
  source_quote: string | null
  vignette: string
  question: string
  options: string[]
  correct: number
  explanation: QuestionExplanation
  figure: string | null
  status: QuestionStatus
  confidence: 'high' | 'medium' | 'low'
  /** null when the content comes from Brazis; otherwise a citation. */
  external_source: string | null
}

export type AssetStatus = 'unverified' | 'ai_checked' | 'approved'

/** One entry of content/sources.json (non-question assets). */
export interface SourceEntry {
  asset: string
  type: string
  title: string
  source: string
  status: AssetStatus
  external_source: string | null
  notes: string[]
  approved_by?: 'user'
  approved_at?: string
}

export type ReviewDecision = 'approve' | 'discard' | 'flag'

/** The user's review of one question or asset, stored in IndexedDB and exportable as JSON. */
export interface ReviewRecord {
  itemId: string
  kind: 'question' | 'asset'
  decision: ReviewDecision | null
  note: string
  updatedAt: string
}

export interface ChapterMeta {
  id: string
  chapterNumber: number
  title: string
  description: string
  totalQuestions: number
  pdfPages: string
}

export interface QuestionProgress {
  questionId: string
  chapter: string
  fsrsCard: Card
  lastAnswered?: string
  lastRating?: number // 1: Again, 2: Hard, 3: Good, 4: Easy
  timesCorrect: number
  timesIncorrect: number
  history: Array<{
    date: string
    selectedOption: number
    correct: boolean
    rating: number
  }>
}

export interface ReportedQuestion {
  id: string
  questionId: string
  timestamp: string
  note?: string
  chapter: string
}

export interface UserSettings {
  theme: 'dark' | 'light'
}
