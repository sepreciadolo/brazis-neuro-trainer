import { useState, type ReactNode, type FormEvent } from 'react'

interface PasscodeGateProps {
  children: ReactNode
}

export function PasscodeGate({ children }: PasscodeGateProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('brazis_authorized') === 'true'
  })
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  // PIN configured via environment variable or default study passcode
  const expectedPin = (import.meta.env.VITE_STUDY_PIN as string | undefined) || 'brazis'

  const handleUnlock = (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (pin.trim().toLowerCase() === expectedPin.toLowerCase()) {
      localStorage.setItem('brazis_authorized', 'true')
      setIsUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setPin('')
    }
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#0d0d11] text-[#f4f4f6] flex flex-col items-center justify-center p-6 select-none">
      <div className="w-full max-w-sm bg-[#16161c] border border-stone-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mb-5 shadow-inner">
          🧠
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white mb-1">
          Brazis Neuro Trainer
        </h1>
        <p className="text-xs text-stone-400 mb-6 leading-relaxed">
          Personal Residency Study PWA<br />
          <span className="text-amber-400/80 font-mono text-[11px]">Brazis 8th Ed. Clinical Localization</span>
        </p>

        <form onSubmit={handleUnlock} className="w-full space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">
              Study Access Passcode
            </label>
            <input
              type="password"
              inputMode="text"
              autoComplete="current-password"
              autoFocus
              value={pin}
              onChange={e => {
                setPin(e.target.value)
                if (error) setError(false)
              }}
              placeholder="Enter passcode..."
              className={`w-full px-4 py-3 bg-[#1e1e26] border rounded-xl text-center text-lg tracking-widest text-white placeholder-stone-600 focus:outline-none transition ${
                error
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                  : 'border-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30'
              }`}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-medium animate-shake">
              Incorrect passcode. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            Unlock & Study
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-stone-800/80 w-full text-center">
          <p className="text-[11px] text-stone-400">
            Default study pin: <code className="bg-[#1e1e26] text-amber-400 px-2 py-0.5 rounded font-mono font-semibold">brazis</code>
          </p>
          <p className="text-[10px] text-stone-400 mt-1">
            (Authorized sessions stay unlocked offline)
          </p>
        </div>
      </div>
    </div>
  )
}
