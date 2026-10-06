import type { Question, ChapterMeta } from '../../types'
import chapter15Data from './chapter15.json'

export const CHAPTERS_REGISTRY: Record<string, Question[]> = {
  'Brainstem': chapter15Data as Question[]
}

export const CHAPTERS_META: ChapterMeta[] = [
  {
    id: 'Brainstem',
    chapterNumber: 15,
    title: 'Brainstem',
    description: 'Medullary, pontine, and mesencephalic vascular and nuclear localization syndromes.',
    totalQuestions: chapter15Data.length,
    pdfPages: '440–456'
  }
]

export function getAllQuestions(): Question[] {
  const all: Question[] = []
  for (const questions of Object.values(CHAPTERS_REGISTRY)) {
    all.push(...questions)
  }
  return all
}

export function getQuestionsByChapter(chapter: string): Question[] {
  return CHAPTERS_REGISTRY[chapter] || []
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find(q => q.id === id)
}
