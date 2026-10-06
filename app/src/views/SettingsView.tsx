import { useState, useEffect, useRef } from 'react'
import {
  exportUserData,
  importUserData,
  clearAllUserData,
  getAllReports,
  type BackupData
} from '../db'
import type { ReportedQuestion } from '../types'

interface SettingsViewProps {
  isDark: boolean
  onToggleTheme: () => void
  onClose: () => void
}

export function SettingsView({ isDark, onToggleTheme, onClose }: SettingsViewProps) {
  const [reports, setReports] = useState<ReportedQuestion[]>([])
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function loadReports() {
      const reps = await getAllReports()
      setReports(reps)
    }
    loadReports()
  }, [])

  const handleExportBackup = async () => {
    const data = await exportUserData()
    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const dateStr = new Date().toISOString().split('T')[0]
    a.href = url
    a.download = `brazis_neuro_backup_${dateStr}.json`
    a.click()
    URL.revokeObjectURL(url)
    setStatusMessage('Progress backup exported successfully.')
  }

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const parsed: BackupData = JSON.parse(text)
      const res = await importUserData(parsed)
      setStatusMessage(`Backup imported! Restored progress for ${res.count} questions.`)
      setTimeout(() => window.location.reload(), 1200)
    } catch {
      setStatusMessage('Error: Failed to import backup file. Ensure it is valid JSON.')
    }
  }

  const handleExportReports = async () => {
    const all = await getAllReports()
    const jsonStr = JSON.stringify(all, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'brazis_reported_questions.json'
    a.click()
    URL.revokeObjectURL(url)
    setStatusMessage(`Exported ${all.length} reported questions.`)
  }

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all progress and start fresh? This cannot be undone.')) {
      await clearAllUserData()
      setStatusMessage('All progress reset.')
      setTimeout(() => window.location.reload(), 800)
    }
  }

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full p-4 pb-20 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100">Settings & Backup</h2>
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
        >
          Done
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs font-medium text-center">
          {statusMessage}
        </div>
      )}

      {/* Appearance */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-200">Theme</div>
            <div className="text-xs text-slate-400">Default dark mode designed for reduced eye strain</div>
          </div>
          <button
            onClick={onToggleTheme}
            className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-750 flex items-center gap-2 active:scale-95 transition"
          >
            <span>{isDark ? '🌙 Dark' : '☀️ Light'}</span>
          </button>
        </div>
      </div>

      {/* Backup and Restore */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Data & Backup</h3>
        <p className="text-xs text-slate-400">
          All progress is stored 100% locally in your device via IndexedDB. You can export a JSON backup anytime to transfer to another device.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 active:scale-95 transition min-h-[44px]"
          >
            <span>💾</span>
            <span>Export Backup</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 active:scale-95 transition min-h-[44px]"
          >
            <span>📥</span>
            <span>Import Backup</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportBackup}
            className="hidden"
          />
        </div>
      </div>

      {/* Reported Questions */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Question Feedback</h3>
          <span className="text-xs text-amber-400 font-mono font-bold">{reports.length} reported</span>
        </div>
        <p className="text-xs text-slate-400">
          Questions you marked for review or correction during study sessions.
        </p>

        {reports.length > 0 && (
          <button
            onClick={handleExportReports}
            className="w-full py-3 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 active:scale-95 transition min-h-[44px]"
          >
            <span>📋</span>
            <span>Export Reported Questions ({reports.length})</span>
          </button>
        )}
      </div>

      {/* Danger Zone */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-rose-950 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-200">Reset Study Progress</div>
            <div className="text-xs text-slate-400">Clear all review schedules and history</div>
          </div>
          <button
            onClick={handleResetData}
            className="px-3 py-2 rounded-xl bg-rose-950/80 border border-rose-800 hover:bg-rose-900 text-rose-300 text-xs font-bold active:scale-95 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* App Info & Copyright */}
      <div className="text-center text-xs text-slate-500 space-y-1 pt-4">
        <p className="font-semibold text-slate-400">Brazis Neuro Trainer • MVP v0.1.0</p>
        <p>Offline-ready Progressive Web App with ts-fsrs & IndexedDB.</p>
        <p className="text-[11px] text-slate-600">Personal study application. Content copyrighted by Brazis et al.</p>
      </div>
    </div>
  )
}
