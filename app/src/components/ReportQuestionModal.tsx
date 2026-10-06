import { useState } from 'react'
import { addReportedQuestion } from '../db'
import type { Question } from '../types'

interface ReportQuestionModalProps {
  question: Question
  isOpen: boolean
  onClose: () => void
  onReported?: () => void
}

export function ReportQuestionModal({
  question,
  isOpen,
  onClose,
  onReported
}: ReportQuestionModalProps) {
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addReportedQuestion({
        id: `rep-${Date.now()}`,
        questionId: question.id,
        chapter: question.chapter,
        note: note.trim() || undefined,
        timestamp: new Date().toISOString()
      })
      setDone(true)
      setTimeout(() => {
        setDone(false)
        setNote('')
        onReported?.()
        onClose()
      }, 1000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-amber-400">Report Question</h3>
            <p className="text-xs text-slate-400">Question ID: {question.id} • {question.section}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {done ? (
          <div className="py-8 text-center text-emerald-400 font-medium">
            ✓ Report recorded locally. Thank you!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="report-note" className="block text-xs font-medium text-slate-300 mb-1.5">
                Note / Clinical Correction (Optional)
              </label>
              <textarea
                id="report-note"
                rows={4}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="e.g. Distractor C typo, or question stem ambiguity..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition active:scale-95 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
