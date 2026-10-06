import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidRendererProps {
  chart: string
  className?: string
  isDark?: boolean
}

export function MermaidRenderer({ chart, className = '', isDark = true }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        themeVariables: isDark
          ? {
              primaryColor: '#0e7490',
              primaryTextColor: '#f8fafc',
              primaryBorderColor: '#38bdf8',
              lineColor: '#38bdf8',
              secondaryColor: '#1e293b',
              tertiaryColor: '#0f172a',
              background: '#090d16',
              mainBkg: '#0f172a',
              nodeBorder: '#38bdf8',
              textColor: '#f1f5f9'
            }
          : {
              primaryColor: '#e0f2fe',
              primaryTextColor: '#0f172a',
              primaryBorderColor: '#0284c7',
              lineColor: '#0284c7',
              secondaryColor: '#f1f5f9',
              tertiaryColor: '#ffffff',
              background: '#ffffff',
              mainBkg: '#ffffff',
              nodeBorder: '#0284c7',
              textColor: '#0f172a'
            }
      })
    } catch (e) {
      console.error('Mermaid init error:', e)
    }
  }, [isDark])

  useEffect(() => {
    let isCancelled = false

    async function renderChart() {
      if (!chart.trim()) {
        setSvgContent('')
        setError(null)
        return
      }

      try {
        setError(null)
        const id = `mermaid-svg-${Date.now()}`
        const { svg } = await mermaid.render(id, chart)
        if (!isCancelled) {
          setSvgContent(svg)
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          console.warn('Mermaid rendering syntax error:', err)
          setError(err instanceof Error ? err.message : 'Invalid Mermaid syntax')
          setSvgContent('')
        }
      }
    }

    renderChart()

    return () => {
      isCancelled = true
    }
  }, [chart, isDark])

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      {error ? (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-mono">
          <span className="font-bold block mb-1">Mermaid Syntax Note:</span>
          {error}
        </div>
      ) : svgContent ? (
        <div
          ref={containerRef}
          className="flex justify-center p-2 select-none [&>svg]:max-w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="p-8 text-center text-slate-500 text-xs italic">
          Rendering flowchart...
        </div>
      )}
    </div>
  )
}
