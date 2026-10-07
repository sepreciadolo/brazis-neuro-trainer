import { useState, useEffect } from 'react'
import type { Question, QuestionProgress } from '../types'
import { getQuestionProgress, saveQuestionProgress } from '../db'
import { getNewCard, scheduleReview, Rating, scheduler, type Card } from '../fsrs'
import { FigureViewerModal } from '../components/FigureViewerModal'
import { ReportQuestionModal } from '../components/ReportQuestionModal'
import { QuestionBadge } from '../components/StatusBadge'

interface StudyViewProps {
  questions: Question[]
  chapterTitle?: string
  mode?: 'new' | 'review' | 'all'
  onFinish: () => void
  onOpenAtlas?: () => void
}

export function StudyView({ questions, onFinish, onOpenAtlas }: StudyViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [currentProgress, setCurrentProgress] = useState<QuestionProgress | null>(null)
  const [isFigureOpen, setIsFigureOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [sessionResults, setSessionResults] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 })
  const [highlightMode, setHighlightMode] = useState(false)
  const [highlightedSnippet, setHighlightedSnippet] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]

  // Reset question state
  useEffect(() => {
    async function loadProgress() {
      if (!currentQuestion) return
      const prog = await getQuestionProgress(currentQuestion.id)
      setCurrentProgress(prog || null)
      setSelectedOption(null)
      setEliminatedOptions([])
      setIsAnswered(false)
      setHighlightedSnippet(null)
    }
    loadProgress()
  }, [currentIndex, currentQuestion])

  if (!currentQuestion || currentIndex >= questions.length) {
    const accuracy = sessionResults.total > 0
      ? Math.round((sessionResults.correct / sessionResults.total) * 100)
      : 100

    return (
      <div className="flex-1 max-w-md mx-auto w-full p-6 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in pb-24">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/10">
          🏆
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Session Completed!</h2>
          <p className="text-sm text-slate-400">
            All {sessionResults.total} clinical vignettes reviewed and scheduled into your FSRS retention matrix.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-extrabold text-cyan-400">{sessionResults.correct} / {sessionResults.total}</div>
            <div className="text-xs text-slate-400 mt-0.5">Correct</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-extrabold text-emerald-400">{accuracy}%</div>
            <div className="text-xs text-slate-400 mt-0.5">Accuracy</div>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full max-w-xs py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition min-h-[48px]"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return
    setSelectedOption(idx)
    setIsAnswered(true)

    const isCorrect = idx === currentQuestion.correct
    setSessionResults(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const toggleEliminate = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    if (isAnswered) return
    setEliminatedOptions(prev =>
      prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]
    )
  }

  const handleRating = async (rating: Rating) => {
    const isCorrect = selectedOption === currentQuestion.correct
    const now = new Date()
    const baseCard: Card = currentProgress?.fsrsCard || getNewCard(now)
    const { card: nextCard } = scheduleReview(baseCard, rating, now)

    const updatedProg: QuestionProgress = {
      questionId: currentQuestion.id,
      chapter: currentQuestion.chapter,
      fsrsCard: nextCard,
      lastAnswered: now.toISOString(),
      lastRating: rating,
      timesCorrect: (currentProgress?.timesCorrect || 0) + (isCorrect ? 1 : 0),
      timesIncorrect: (currentProgress?.timesIncorrect || 0) + (isCorrect ? 0 : 1),
      history: [
        ...(currentProgress?.history || []),
        {
          date: now.toISOString(),
          selectedOption: selectedOption ?? -1,
          correct: isCorrect,
          rating
        }
      ]
    }

    await saveQuestionProgress(updatedProg)
    setCurrentIndex(prev => prev + 1)
  }

  const baseCardForPreview: Card = currentProgress?.fsrsCard || getNewCard()
  const previews = scheduler.repeat(baseCardForPreview, new Date())

  const formatInterval = (due: Date) => {
    const diffMs = due.getTime() - Date.now()
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays <= 0) return '<1d'
    if (diffDays === 1) return '1d'
    return `${diffDays}d`
  }

  const isUserCorrect = selectedOption === currentQuestion.correct

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full p-4 pb-32 space-y-4">
      {/* Top Bar: Question Index, Tools */}
      <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">
            Case {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
            {currentQuestion.id}
          </span>
        </div>

        {/* Board Tools: Highlighter, Atlas Link */}
        <div className="flex items-center gap-2">
          {onOpenAtlas && (
            <button
              onClick={onOpenAtlas}
              className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-1 rounded-lg hover:bg-cyan-900 transition flex items-center gap-1"
              title="Open Interactive Brainstem Cross-Section"
            >
              <span>🔬</span> Atlas
            </button>
          )}

          <button
            onClick={() => setHighlightMode(m => !m)}
            className={`text-[11px] font-semibold px-2 py-1 rounded-lg border transition flex items-center gap-1 ${
              highlightMode
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
            title="Toggle Clinical Sign Highlighter"
          >
            <span>🖍️</span> {highlightMode ? 'Highlight ON' : 'Highlight'}
          </button>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Clinical Vignette Card */}
      <div
        className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3 ${
          highlightMode ? 'ring-1 ring-amber-400/50' : ''
        }`}
        onMouseUp={() => {
          if (!highlightMode) return
          const selection = window.getSelection()?.toString()
          if (selection && selection.length > 3) {
            setHighlightedSnippet(selection)
          }
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Clinical Vignette • {currentQuestion.section}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Brazis p. {currentQuestion.page}
          </span>
        </div>
        <QuestionBadge question={currentQuestion} />

        <p className="text-base text-slate-100 leading-relaxed font-normal">
          {highlightedSnippet ? (
            <span>
              {currentQuestion.vignette.split(highlightedSnippet).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <mark className="bg-amber-400/30 text-amber-200 px-1 rounded font-medium">
                      {highlightedSnippet}
                    </mark>
                  )}
                </span>
              ))}
            </span>
          ) : (
            currentQuestion.vignette
          )}
        </p>

        <div className="pt-2 border-t border-slate-800/80">
          <p className="text-sm font-semibold text-slate-200">
            {currentQuestion.question}
          </p>
        </div>
      </div>

      {/* Option Instruction Hint */}
      {!isAnswered && (
        <div className="flex justify-between items-center text-[11px] text-slate-500 px-1">
          <span>Tap option to answer</span>
          <span>Tap <s>abc</s> to rule out distractors</span>
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQuestion.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx)
          const isSelected = selectedOption === idx
          const isCorrect = idx === currentQuestion.correct
          const isEliminated = eliminatedOptions.includes(idx)

          let buttonClasses = "w-full p-4 rounded-xl text-left border transition min-h-[52px] flex items-start gap-3 text-sm leading-snug cursor-pointer select-none active:scale-[0.99] "

          if (!isAnswered) {
            if (isEliminated) {
              buttonClasses += "bg-slate-950/40 border-slate-900 text-slate-600 line-through opacity-50"
            } else {
              buttonClasses += "bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white"
            }
          } else {
            if (isCorrect) {
              buttonClasses += "bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30"
            } else if (isSelected) {
              buttonClasses += "bg-rose-950/70 border-rose-500 text-rose-100 ring-2 ring-rose-500/30"
            } else {
              buttonClasses += "bg-slate-900/40 border-slate-850 text-slate-500 opacity-60"
            }
          }

          return (
            <div key={idx} className="relative group">
              <button
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={buttonClasses}
              >
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    !isAnswered
                      ? isEliminated ? 'bg-slate-900 text-slate-600' : 'bg-slate-800 text-slate-300'
                      : isCorrect
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : isSelected
                      ? 'bg-rose-500 text-white font-black'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {isAnswered && isCorrect ? '✓' : isAnswered && isSelected ? '✕' : letter}
                </span>
                <span className="flex-1 font-medium">{opt}</span>
              </button>

              {/* Strikethrough toggle button for board elimination strategy */}
              {!isAnswered && (
                <button
                  onClick={(e) => toggleEliminate(e, idx)}
                  className={`absolute right-3 top-3.5 px-2 py-0.5 rounded text-[11px] font-mono border transition ${
                    isEliminated
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-slate-950/70 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                  title="Cross out option"
                >
                  <s>abc</s>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Immediate Feedback & Comprehensive Explanation */}
      {isAnswered && (
        <div className="pt-2 space-y-4 animate-fade-in">
          {/* Feedback banner */}
          <div
            className={`p-4 rounded-2xl flex items-center justify-between border ${
              isUserCorrect
                ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-200'
                : 'bg-rose-950/60 border-rose-600/50 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isUserCorrect ? '🎯' : '💡'}</span>
              <div>
                <h4 className="text-sm font-bold">
                  {isUserCorrect ? 'Correct Localization!' : 'Incorrect'}
                </h4>
                <p className="text-xs opacity-90">
                  {isUserCorrect
                    ? 'Clinical deduction matches Brazis localization criteria.'
                    : `Correct choice was option ${String.fromCharCode(65 + currentQuestion.correct)}.`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 hover:text-amber-400 active:scale-95 transition"
            >
              Report Question
            </button>
          </div>

          {/* Explanation Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            {/* Why Correct */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <span>✓</span> Why Correct
              </h5>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                {currentQuestion.explanation.why_correct}
              </p>
            </div>

            {/* Distractors Breakdown */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5">
                <span>✕</span> Distractor Breakdown
              </h5>
              <div className="space-y-2 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                {currentQuestion.explanation.distractors.map((dis, dIdx) => (
                  <p key={dIdx} className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-rose-300 mr-1.5">•</span>
                    {dis}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Point Callout */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                <span>⭐</span> Key Point Takeaway
              </h5>
              <p className="text-xs font-medium text-amber-100/90 leading-relaxed">
                {currentQuestion.explanation.key_point}
              </p>
            </div>

            {/* Figure if available */}
            {currentQuestion.figure && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Book Anatomy Diagram
                  </h5>
                  <button
                    onClick={() => setIsFigureOpen(true)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/50 px-2.5 py-1 rounded-lg border border-cyan-800/60"
                  >
                    <span>🔍</span> Tap to Enlarge / Zoom
                  </button>
                </div>
                <div
                  onClick={() => setIsFigureOpen(true)}
                  className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer group relative flex justify-center p-2"
                >
                  <img
                    src={`/${currentQuestion.figure}`}
                    alt="Clinical Anatomy Figure"
                    className="max-h-56 object-contain group-hover:scale-[1.02] transition duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-bold text-white backdrop-blur-[1px]">
                    Click to Open Fullscreen
                  </div>
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-500 text-right">
              Citation: Brazis et al., Localization in Clinical Neurology, 8th Ed., Chapter {currentQuestion.chapter}, Page {currentQuestion.page}.
            </div>
          </div>

          {/* FSRS Rating Buttons - Sticky in lower half */}
          <div className="sticky bottom-3 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-slate-800/90 shadow-2xl space-y-2">
            <div className="text-center text-[11px] font-semibold text-slate-400">
              Rate recall to schedule spaced repetition interval:
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRating(Rating.Again)}
                className="py-2.5 px-1 rounded-xl bg-rose-950/70 border border-rose-800 hover:bg-rose-900 active:scale-95 transition flex flex-col items-center justify-center min-h-[48px]"
              >
                <span className="text-xs font-bold text-rose-300">Again</span>
                <span className="text-[10px] text-rose-400 font-mono">
                  {formatInterval(new Date(previews[Rating.Again].card.due))}
                </span>
              </button>

              <button
                onClick={() => handleRating(Rating.Hard)}
                className="py-2.5 px-1 rounded-xl bg-amber-950/70 border border-amber-800 hover:bg-amber-900 active:scale-95 transition flex flex-col items-center justify-center min-h-[48px]"
              >
                <span className="text-xs font-bold text-amber-300">Hard</span>
                <span className="text-[10px] text-amber-400 font-mono">
                  {formatInterval(new Date(previews[Rating.Hard].card.due))}
                </span>
              </button>

              <button
                onClick={() => handleRating(Rating.Good)}
                className="py-2.5 px-1 rounded-xl bg-cyan-950/70 border border-cyan-800 hover:bg-cyan-900 active:scale-95 transition flex flex-col items-center justify-center min-h-[48px]"
              >
                <span className="text-xs font-bold text-cyan-300">Good</span>
                <span className="text-[10px] text-cyan-400 font-mono">
                  {formatInterval(new Date(previews[Rating.Good].card.due))}
                </span>
              </button>

              <button
                onClick={() => handleRating(Rating.Easy)}
                className="py-2.5 px-1 rounded-xl bg-emerald-950/70 border border-emerald-800 hover:bg-emerald-900 active:scale-95 transition flex flex-col items-center justify-center min-h-[48px]"
              >
                <span className="text-xs font-bold text-emerald-300">Easy</span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {formatInterval(new Date(previews[Rating.Easy].card.due))}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Figure Fullscreen Zoom Modal */}
      {currentQuestion.figure && (
        <FigureViewerModal
          isOpen={isFigureOpen}
          onClose={() => setIsFigureOpen(false)}
          imageSrc={`/${currentQuestion.figure}`}
          title={`${currentQuestion.section} • Brazis p. ${currentQuestion.page}`}
          caption={currentQuestion.explanation.key_point}
        />
      )}

      {/* Report Question Modal */}
      <ReportQuestionModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        question={currentQuestion}
      />
    </div>
  )
}
