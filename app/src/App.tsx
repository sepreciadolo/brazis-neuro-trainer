import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HomeView } from './views/HomeView'
import { StudyView } from './views/StudyView'
import { SettingsView } from './views/SettingsView'
import { getQuestionsByChapter } from './data/chapters'
import { getAllProgress } from './db'
import { isCardDue } from './fsrs'
import type { Question } from './types'

type ViewMode = 'home' | 'study' | 'settings'

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home')
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('brazis_theme')
    if (saved) return saved === 'dark'
    return true // Default dark mode as per AGENTS.md
  })

  const [activeStudy, setActiveStudy] = useState<{
    chapter: string
    mode: 'new' | 'review' | 'all'
    questions: Question[]
  } | null>(null)

  // Apply theme to html root
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
      if (filtered.length === 0) {
        // Fallback to all if no new questions remain
        filtered = allQuestions
      }
    } else if (mode === 'review') {
      const now = new Date()
      filtered = allQuestions.filter(q => {
        const prog = progressMap.get(q.id)
        return prog && isCardDue(prog.fsrsCard, now)
      })
      if (filtered.length === 0) {
        // If none due, review all learned questions or all questions
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
    setCurrentView('study')
  }

  const handleBackToHome = () => {
    setActiveStudy(null)
    setCurrentView('home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors">
      <Header
        title={
          currentView === 'study' && activeStudy
            ? activeStudy.chapter
            : currentView === 'settings'
            ? 'Settings'
            : 'Brazis Neuro Trainer'
        }
        subtitle={
          currentView === 'study' && activeStudy
            ? activeStudy.mode === 'new'
              ? 'Learning New Questions'
              : activeStudy.mode === 'review'
              ? 'Spaced Repetition Review'
              : 'Complete Practice'
            : undefined
        }
        onBack={currentView !== 'home' ? handleBackToHome : undefined}
        onOpenSettings={currentView === 'home' ? () => setCurrentView('settings') : undefined}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <HomeView
            onStartStudy={handleStartStudy}
            onOpenSettings={() => setCurrentView('settings')}
          />
        )}

        {currentView === 'study' && activeStudy && (
          <StudyView
            questions={activeStudy.questions}
            chapterTitle={activeStudy.chapter}
            mode={activeStudy.mode}
            onFinish={handleBackToHome}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            onClose={() => setCurrentView('home')}
          />
        )}
      </main>
    </div>
  )
}
