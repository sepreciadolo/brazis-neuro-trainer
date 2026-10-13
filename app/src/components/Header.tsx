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
    <header className="sticky top-0 z-40 bg-[#ffffff]/90 dark:bg-[#131315]/90 backdrop-blur-md border-b border-[#e2dfd7] dark:border-[#28282e] px-4 py-2.5 transition-colors">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#f3f1ec] dark:bg-[#1b1b1e] border border-[#e2dfd7] dark:border-[#28282e] text-[#6e6b63] dark:text-[#9595a0] hover:text-[#181715] dark:hover:text-white hover:bg-[#eae7df] dark:hover:bg-[#232328] active:scale-95 transition"
              aria-label="Back"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/25 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" strokeWidth="2" />
                <path strokeWidth="1.5" strokeLinecap="round" d="M12 3v4m0 10v4m-9-9h4m10 0h4" />
                <path strokeWidth="1.2" strokeLinecap="round" d="M5.6 5.6l2.8 2.8m7.2 7.2l2.8 2.8m0-12.8l-2.8 2.8m-7.2 7.2l-2.8 2.8" opacity="0.6" />
              </svg>
            </div>
          )}

          <div>
            <h1 className="text-[17px] font-serif font-semibold tracking-tight text-[#181715] dark:text-[#f4f4f6] flex items-center gap-1.5 m-0 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-[#6e6b63] dark:text-[#9595a0] font-sans tracking-wide leading-none mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6e6b63] dark:text-[#9595a0] hover:text-[#181715] dark:hover:text-white hover:bg-[#f3f1ec] dark:hover:bg-[#1b1b1e] active:scale-95 transition"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" d="M12 2v2m0 16v2m10-10h-2M4 10H2m15.36-5.36l-1.42 1.42M6.06 17.94l-1.42 1.42m0-11.32l1.42 1.42m11.3 11.3l1.42 1.42" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6e6b63] dark:text-[#9595a0] hover:text-[#181715] dark:hover:text-white hover:bg-[#f3f1ec] dark:hover:bg-[#1b1b1e] active:scale-95 transition"
              title="Settings & Backup"
              aria-label="Settings"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
