import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { BottomNavBar, type TabType } from './components/BottomNavBar'
import { HomeView } from './views/HomeView'
import { StudyView } from './views/StudyView'
import { SettingsView } from './views/SettingsView'
import { ReviewView } from './views/ReviewView'
import { BrainstemCrossSectionViewer } from './components/BrainstemCrossSectionViewer'
import { ClinicalDeductionAssistant } from './components/ClinicalDeductionAssistant'
import { SyndromeDifferentialMatrix } from './components/SyndromeDifferentialMatrix'
import { ChapterSummaryView } from './components/ChapterSummaryView'
import { MermaidMaker } from './components/MermaidMaker'
import { getActiveQuestions } from './data/activeQuestions'
import { ReviewsProvider, type ReviewMap } from './data/reviews'
import { getAllProgress, getAllReviews, saveReview, deleteReview } from './db'
import { isCardDue } from './fsrs'
import type { Question, ReviewRecord } from './types'

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('cases')
  const [isStudying, setIsStudying] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [reviews, setReviews] = useState<ReviewMap>({})

  useEffect(() => {
    getAllReviews().then(list => setReviews(Object.fromEntries(list.map(r => [r.itemId, r]))))
  }, [])

  const handleSaveReview = useCallback(async (record: ReviewRecord) => {
    if (record.decision === null && record.note.trim() === '') {
      await deleteReview(record.itemId)
      setReviews(prev => {
        const next = { ...prev }
        delete next[record.itemId]
        return next
      })
    } else {
      await saveReview(record)
      setReviews(prev => ({ ...prev, [record.itemId]: record }))
    }
  }, [])

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('brazis_theme')
    if (saved) return saved === 'dark'
    return true
  })

  const [activeStudy, setActiveStudy] = useState<{
    chapter: string
    mode: 'new' | 'review' | 'all'
    questions: Question[]
  } | null>(null)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage.setItem('brazis_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('brazis_theme', 'light')
    }
  }, [isDark])

  const handleToggleTheme = () => setIsDark(prev => !prev)

  const handleStartStudy = async (chapter: string, mode: 'new' | 'review' | 'all') => {
    const allQuestions = getActiveQuestions(chapter, reviews)
    const progressList = await getAllProgress()
    const progressMap = new Map(progressList.map(p => [p.questionId, p]))

    let filtered: Question[] = []

    if (mode === 'new') {
      filtered = allQuestions.filter(q => !progressMap.has(q.id))
      if (filtered.length === 0) filtered = allQuestions
    } else if (mode === 'review') {
      const now = new Date()
      filtered = allQuestions.filter(q => {
        const prog = progressMap.get(q.id)
        return prog && isCardDue(prog.fsrsCard, now)
      })
      if (filtered.length === 0) {
        filtered = allQuestions.filter(q => progressMap.has(q.id))
        if (filtered.length === 0) filtered = allQuestions
      }
    } else {
      filtered = allQuestions
    }

    setActiveStudy({
      chapter,
      mode,
      questions: filtered
    })
    setIsStudying(true)
    setIsSettingsOpen(false)
  }

  const handleBackToHome = () => {
    setIsStudying(false)
    setActiveStudy(null)
  }

  const getHeaderTitle = () => {
    if (isReviewOpen) return 'Review Tool'
    if (isSettingsOpen) return 'Settings & Backup'
    if (isStudying && activeStudy) return activeStudy.chapter
    switch (currentTab) {
      case 'cases': return 'Brazis Neuro Trainer'
      case 'atlas': return 'Interactive Brainstem Atlas'
      case 'summary': return 'Chapter 15 Master Summary'
      case 'deduction': return 'Rule of 4 Deduction Engine'
      case 'matrix': return 'Syndromes Differential Matrix'
      case 'mermaid': return 'Clinical Localization Flowcharts'
    }
  }

  const getHeaderSubtitle = () => {
    if (isReviewOpen) return 'Only you can approve content'
    if (isSettingsOpen) return 'Preferences & data management'
    if (isStudying && activeStudy) {
      return activeStudy.mode === 'new'
        ? 'Learning New Questions'
        : activeStudy.mode === 'review'
        ? 'Spaced Repetition Review'
        : 'Complete Practice'
    }
    switch (currentTab) {
      case 'cases': return 'Board-Style Clinical Vignettes'
      case 'atlas': return 'Cross-sections: Medulla, Pons, Midbrain'
      case 'summary': return 'Core Anatomy, Vessels & Pearls'
      case 'deduction': return 'Gates Rule of 4 Diagnostic Solver'
      case 'matrix': return 'Side-by-side localization comparison'
      case 'mermaid': return 'Visual Decision Trees & Diagnostic Pathways'
    }
  }

  return (
    <ReviewsProvider value={reviews}>
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Header
        title={getHeaderTitle()}
        subtitle={getHeaderSubtitle()}
        onBack={isStudying ? handleBackToHome : isReviewOpen ? () => setIsReviewOpen(false) : isSettingsOpen ? () => setIsSettingsOpen(false) : undefined}
        onOpenSettings={!isStudying && !isSettingsOpen && !isReviewOpen ? () => setIsSettingsOpen(true) : undefined}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 flex flex-col pb-16">
        {isReviewOpen ? (
          <ReviewView reviews={reviews} onSaveReview={handleSaveReview} />
        ) : isSettingsOpen ? (
          <SettingsView
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            onClose={() => setIsSettingsOpen(false)}
            onOpenReview={() => setIsReviewOpen(true)}
          />
        ) : isStudying && activeStudy ? (
          <StudyView
            questions={activeStudy.questions}
            chapterTitle={activeStudy.chapter}
            mode={activeStudy.mode}
            onFinish={handleBackToHome}
            onOpenAtlas={() => {
              setIsStudying(false)
              setCurrentTab('atlas')
            }}
          />
        ) : (
          <>
            {currentTab === 'cases' && (
              <HomeView
                onStartStudy={handleStartStudy}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            )}

            {currentTab === 'atlas' && (
              <BrainstemCrossSectionViewer isDark={isDark} />
            )}

            {currentTab === 'summary' && (
              <ChapterSummaryView isDark={isDark} />
            )}

            {currentTab === 'deduction' && (
              <ClinicalDeductionAssistant />
            )}

            {currentTab === 'matrix' && (
              <SyndromeDifferentialMatrix />
            )}

            {currentTab === 'mermaid' && (
              <MermaidMaker isDark={isDark} />
            )}
          </>
        )}
      </main>

      {/* Persistent Bottom Bar when not studying active questions */}
      {!isStudying && !isSettingsOpen && !isReviewOpen && (
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={tab => {
            setCurrentTab(tab)
            setIsSettingsOpen(false)
          }}
        />
      )}
    </div>
    </ReviewsProvider>
  )
}
