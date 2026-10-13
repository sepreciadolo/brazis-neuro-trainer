export type TabType = 'cases' | 'atlas' | 'summary' | 'deduction' | 'matrix' | 'mermaid'

interface BottomNavBarProps {
  currentTab: TabType
  onSelectTab: (tab: TabType) => void
}

export function BottomNavBar({ currentTab, onSelectTab }: BottomNavBarProps) {
  const tabs = [
    {
      id: 'cases' as TabType,
      label: 'Cases',
      renderIcon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" strokeWidth={active ? 2.2 : 1.7} />
          <circle cx="12" cy="12" r="3" strokeWidth={active ? 2.2 : 1.7} fill={active ? 'currentColor' : 'none'} />
          <path strokeWidth={1.5} strokeLinecap="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2" opacity="0.6" />
        </svg>
      )
    },
    {
      id: 'atlas' as TabType,
      label: 'Atlas',
      renderIcon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={active ? 2.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 7l6-4 6 4 6-4v14l-6 4-6-4-6 4V7z" />
        </svg>
      )
    },
    {
      id: 'summary' as TabType,
      label: 'Digests',
      renderIcon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={active ? 2.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'deduction' as TabType,
      label: 'Rule of 4',
      renderIcon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={active ? 2.2 : 1.7} />
          <path strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5l-4 1.5-1.5 4 4-1.5 1.5-4z" />
        </svg>
      )
    },
    {
      id: 'matrix' as TabType,
      label: 'Matrix',
      renderIcon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={active ? 2.2 : 1.7} />
          <path strokeWidth={1.5} strokeLinecap="round" d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.7" />
        </svg>
      )
    },
    {
      id: 'mermaid' as TabType,
      label: 'Flows',
      renderIcon: (active: boolean) => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="6" height="4" rx="1" strokeWidth={active ? 2.2 : 1.7} />
          <rect x="15" y="4" width="6" height="4" rx="1" strokeWidth={active ? 2.2 : 1.7} />
          <rect x="9" y="16" width="6" height="4" rx="1" strokeWidth={active ? 2.2 : 1.7} />
          <path strokeWidth={1.5} strokeLinecap="round" d="M6 8v3a2 2 0 002 2h4m6-5v3a2 2 0 01-2 2h-4m0 0v3" />
        </svg>
      )
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0a0e17]/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1 transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-6 gap-0.5">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition min-h-[48px] active:scale-95 select-none ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`mb-1 transition-transform ${isActive ? 'scale-105' : 'scale-100 opacity-80'}`}>
                {tab.renderIcon(isActive)}
              </div>
              <span className={`text-[10px] tracking-tight truncate ${isActive ? 'font-semibold' : 'font-normal opacity-90'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
