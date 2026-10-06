import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { BottomNavBar, type TabType } from './components/BottomNavBar'
import { HomeView } from './views/HomeView'
import { StudyView } from './views/StudyView'
import { SettingsView } from './views/SettingsView'
import { BrainstemCrossSectionViewer } from './components/BrainstemCrossSectionViewer'
import { ClinicalDeductionAssistant } from './components/ClinicalDeductionAssistant'
import { SyndromeDifferentialMatrix } from './components/SyndromeDifferentialMatrix'
import { ChapterSummaryView } from './components/ChapterSummaryView'
import { MermaidMaker } from './components/MermaidMaker'
import { getQuestionsByChapter } from './data/chapters'
import { getAllProgress } from './db'
import { isCardDue } from './fsrs'
import type { Question } from './types'

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('cases')
  const [isStudying, setIsStudying] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
    const allQuestions = getQuestionsByChapter(chapter)
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
    if (isSettingsOpen) return 'Settings & Backup'
    if (isStudying && activeStudy) return activeStudy.chapter
    switch (currentTab) {
      case 'cases': return 'Brazis Neuro Trainer'
      case 'atlas': return 'Interactive Brainstem Atlas'
      case 'summary': return 'Chapter 15 Master Summary'
      case 'deduction': return 'Rule of 4 Deduction Engine'
      case 'matrix': return 'Syndromes Differential Matrix'
      case 'mermaid': return 'Clinical Flowcharts & Mermaid Studio'
    }
  }

  const getHeaderSubtitle = () => {
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
      case 'mermaid': return 'Visual Decision Trees & Architecture'
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors">
      <Header
        title={getHeaderTitle()}
        subtitle={getHeaderSubtitle()}
        onBack={isStudying ? handleBackToHome : isSettingsOpen ? () => setIsSettingsOpen(false) : undefined}
        onOpenSettings={!isStudying && !isSettingsOpen ? () => setIsSettingsOpen(true) : undefined}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 flex flex-col pb-16">
        {isSettingsOpen ? (
          <SettingsView
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            onClose={() => setIsSettingsOpen(false)}
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
              <BrainstemCrossSectionViewer />
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
      {!isStudying && !isSettingsOpen && (
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={tab => {
            setCurrentTab(tab)
            setIsSettingsOpen(false)
          }}
        />
      )}
    </div>
  )
}
