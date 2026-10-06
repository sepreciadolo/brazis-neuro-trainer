interface HeaderProps {
  title?: string
  subtitle?: string
  onBack?: () => void
  onOpenSettings?: () => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Header({
  title = 'Brazis Neuro Trainer',
  subtitle,
  onBack,
  onOpenSettings,
  isDark,
  onToggleTheme
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 py-3 transition-colors">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95 transition"
              aria-label="Back"
            >
              ←
            </button>
          )}
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 leading-tight">
              <span>🧠</span>
              <span>{title}</span>
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95 transition shadow-sm"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95 transition text-sm shadow-sm"
              title="Settings & Backup"
              aria-label="Settings"
            >
              ⚙️
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
