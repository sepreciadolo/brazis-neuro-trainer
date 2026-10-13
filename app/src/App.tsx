import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { Header } from './components/Header'
import { BottomNavBar, type TabType } from './components/BottomNavBar'
import { HomeView } from './views/HomeView'
import { StudyView } from './views/StudyView'
import { ChapterSummaryView } from './components/ChapterSummaryView'
import { CHAPTERS_META } from './data/chapters'
import { getActiveQuestions } from './data/activeQuestions'
import { ReviewsProvider, type ReviewMap } from './data/reviews'
import { getAllProgress, getAllReviews, saveReview, deleteReview } from './db'
import { isCardDue } from './fsrs'
import { PasscodeGate } from './components/PasscodeGate'
import type { Question, ReviewRecord } from './types'

// Lazy-loaded heavy modules for fast PWA initial render
const BrainstemCrossSectionViewer = lazy(() =>
  import('./components/BrainstemCrossSectionViewer').then(m => ({ default: m.BrainstemCrossSectionViewer }))
)
const SyndromeDifferentialMatrix = lazy(() =>
  import('./components/SyndromeDifferentialMatrix').then(m => ({ default: m.SyndromeDifferentialMatrix }))
)
const MermaidMaker = lazy(() =>
  import('./components/MermaidMaker').then(m => ({ default: m.MermaidMaker }))
)
const SettingsView = lazy(() =>
  import('./views/SettingsView').then(m => ({ default: m.SettingsView }))
)
const ReviewView = lazy(() =>
  import('./views/ReviewView').then(m => ({ default: m.ReviewView }))
)

export type Overlay = 'settings' | 'review' | null

interface ActiveStudySession {
  chapter: string
  mode: 'new' | 'review' | 'all'
  questions: Question[]
}

function ModuleSuspenseFallback() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-pulse">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-xs font-mono text-stone-500 dark:text-stone-400">Loading module...</span>
    </div>
  )
}

export default function App() {
  // Navigation & Study state with localStorage persistence
  const [currentTab, setCurrentTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('brazis_active_tab')
    if (saved && ['summary', 'cases', 'atlas', 'matrix', 'mermaid'].includes(saved)) {
      return saved as TabType
    }
    return 'summary'
  })

  const [digestChapter, setDigestChapter] = useState<number>(() => {
    const saved = localStorage.getItem('brazis_digest_chapter')
    const parsed = saved ? parseInt(saved, 10) : 1
    return !isNaN(parsed) && parsed >= 1 && parsed <= 23 ? parsed : 1
  })

  const [overlay, setOverlay] = useState<Overlay>(null)
  const [activeStudy, setActiveStudy] = useState<ActiveStudySession | null>(null)
  const [reviews, setReviews] = useState<ReviewMap>({})

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('brazis_theme')
    if (saved) return saved === 'dark'
    return true
  })

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('brazis_active_tab', currentTab)
  }, [currentTab])

  useEffect(() => {
    localStorage.setItem('brazis_digest_chapter', String(digestChapter))
  }, [digestChapter])

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

  // Native mobile back button handling (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (activeStudy) {
        setActiveStudy(null)
      } else if (overlay) {
        setOverlay(null)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [activeStudy, overlay])

  // Load reviews on mount
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

    window.history.pushState({ screen: 'study' }, '')
    setActiveStudy({
      chapter,
      mode,
      questions: filtered
    })
    setOverlay(null)
  }

  const handleBackToHome = () => {
    setActiveStudy(null)
  }

  const openOverlay = (target: Overlay) => {
    if (target) {
      window.history.pushState({ screen: target }, '')
    }
    setOverlay(target)
  }

  const getHeaderTitle = () => {
    if (overlay === 'review') return 'Review Tool'
    if (overlay === 'settings') return 'Settings & Backup'
    if (activeStudy) return activeStudy.chapter
    switch (currentTab) {
      case 'summary': {
        const meta = CHAPTERS_META.find(c => c.chapterNumber === digestChapter)
        return meta ? `Ch. ${digestChapter}: ${meta.title}` : 'Curriculum Digests'
      }
      case 'cases': return 'Brazis Neuro Trainer'
      case 'atlas': return 'Interactive Brainstem Atlas'
      case 'matrix': return 'Syndromes Differential Matrix'
      case 'mermaid': return 'Clinical Localization Flowcharts'
    }
  }

  const getHeaderSubtitle = () => {
    if (overlay === 'review') return 'Only you can approve content'
    if (overlay === 'settings') return 'Preferences & data management'
    if (activeStudy) {
      return activeStudy.mode === 'new'
        ? 'Learning New Questions'
        : activeStudy.mode === 'review'
        ? 'Spaced Repetition Review'
        : 'Complete Practice'
    }
    switch (currentTab) {
      case 'summary': return 'Core Functional Anatomy, Localization Rules & Board Traps'
      case 'cases': return 'Board-Style Clinical Vignettes'
      case 'atlas': return 'Cross-sections: Medulla, Pons, Midbrain'
      case 'matrix': return 'Side-by-side localization comparison'
      case 'mermaid': return 'Visual Decision Trees & Diagnostic Pathways'
    }
  }

  return (
    <PasscodeGate>
      <ReviewsProvider value={reviews}>
        <div className="min-h-screen flex flex-col bg-[#f9f8f5] text-[#181715] dark:bg-[#131315] dark:text-[#f4f4f6] transition-colors">
          <Header
            title={getHeaderTitle()}
            subtitle={getHeaderSubtitle()}
            onBack={
              activeStudy
                ? handleBackToHome
                : overlay
                ? () => setOverlay(null)
                : undefined
            }
            onOpenSettings={!activeStudy && !overlay ? () => openOverlay('settings') : undefined}
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
          />

          <main className="flex-1 flex flex-col pb-16">
            <Suspense fallback={<ModuleSuspenseFallback />}>
              {overlay === 'review' && (
                <ReviewView reviews={reviews} onSaveReview={handleSaveReview} />
              )}

              {overlay === 'settings' && (
                <SettingsView
                  isDark={isDark}
                  onToggleTheme={handleToggleTheme}
                  onClose={() => setOverlay(null)}
                  onOpenReview={() => setOverlay('review')}
                />
              )}

              {!overlay && activeStudy && (
                <StudyView
                  questions={activeStudy.questions}
                  chapterTitle={activeStudy.chapter}
                  mode={activeStudy.mode}
                  onFinish={handleBackToHome}
                  onOpenAtlas={() => {
                    setActiveStudy(null)
                    setCurrentTab('atlas')
                  }}
                  onOpenDigest={() => {
                    setActiveStudy(null)
                    const meta = CHAPTERS_META.find(m => m.id === activeStudy.chapter)
                    if (meta) setDigestChapter(meta.chapterNumber)
                    setCurrentTab('summary')
                  }}
                />
              )}

              {!overlay && !activeStudy && (
                <>
                  {currentTab === 'summary' && (
                    <ChapterSummaryView
                      isDark={isDark}
                      selectedChapter={digestChapter}
                      onSelectChapter={setDigestChapter}
                      onOpenTab={setCurrentTab}
                      onStartStudy={handleStartStudy}
                    />
                  )}

                  {currentTab === 'cases' && (
                    <HomeView
                      onStartStudy={handleStartStudy}
                      onOpenDigest={chNum => {
                        setDigestChapter(chNum)
                        setCurrentTab('summary')
                      }}
                      onOpenSettings={() => openOverlay('settings')}
                    />
                  )}

                  {currentTab === 'atlas' && (
                    <BrainstemCrossSectionViewer isDark={isDark} />
                  )}

                  {currentTab === 'matrix' && (
                    <SyndromeDifferentialMatrix />
                  )}

                  {currentTab === 'mermaid' && (
                    <MermaidMaker isDark={isDark} />
                  )}
                </>
              )}
            </Suspense>
          </main>

          {/* Persistent Bottom Bar when in primary navigation mode */}
          {!activeStudy && !overlay && (
            <BottomNavBar
              currentTab={currentTab}
              onSelectTab={tab => {
                setCurrentTab(tab)
                setOverlay(null)
              }}
            />
          )}
        </div>
      </ReviewsProvider>
    </PasscodeGate>
  )
}
