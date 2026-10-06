import type { Card } from 'ts-fsrs'

export interface QuestionExplanation {
  why_correct: string
  distractors: string[]
  key_point: string
}

export interface Question {
  id: string
  chapter: string
  section: string
  page: number
  vignette: string
  question: string
  options: string[]
  correct: number
  explanation: QuestionExplanation
  figure: string | null
  status: 'draft' | 'approved' | 'discarded'
  confidence: 'high' | 'medium' | 'low'
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
