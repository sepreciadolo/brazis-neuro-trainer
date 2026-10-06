export type TabType = 'cases' | 'atlas' | 'summary' | 'deduction' | 'matrix' | 'mermaid'

interface BottomNavBarProps {
  currentTab: TabType
  onSelectTab: (tab: TabType) => void
}

export function BottomNavBar({ currentTab, onSelectTab }: BottomNavBarProps) {
  const tabs = [
    { id: 'cases' as TabType, label: 'Cases', icon: '🎯' },
    { id: 'atlas' as TabType, label: 'Atlas', icon: '🔬' },
    { id: 'summary' as TabType, label: 'Summary', icon: '📖' },
    { id: 'deduction' as TabType, label: 'Rule of 4', icon: '🧭' },
    { id: 'matrix' as TabType, label: 'Matrix', icon: '📊' },
    { id: 'mermaid' as TabType, label: 'Algorithms', icon: '⚡' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 transition-colors">
      <div className="max-w-lg mx-auto grid grid-cols-6 gap-0.5">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition min-h-[46px] active:scale-95 select-none ${
                isActive
                  ? 'text-cyan-400 font-bold bg-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-medium'
              }`}
            >
              <span className="text-base leading-none mb-1">{tab.icon}</span>
              <span className="text-[10px] tracking-tight truncate">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
