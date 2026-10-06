import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidRendererProps {
  chart: string
  className?: string
  isDark?: boolean
  allowZoom?: boolean
}

export function MermaidRenderer({
  chart,
  className = '',
  isDark = true,
  allowZoom = true
}: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  useEffect(() => {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        flowchart: {
          curve: 'basis',
          htmlLabels: true
        },
        themeVariables: isDark
          ? {
              primaryColor: '#0e7490',
              primaryTextColor: '#f8fafc',
              primaryBorderColor: '#38bdf8',
              lineColor: '#38bdf8',
              secondaryColor: '#1e293b',
              tertiaryColor: '#0f172a',
              background: 'transparent',
              mainBkg: '#0f172a',
              nodeBorder: '#38bdf8',
              textColor: '#f1f5f9',
              fontFamily: 'inherit'
            }
          : {
              primaryColor: '#e0f2fe',
              primaryTextColor: '#0f172a',
              primaryBorderColor: '#0284c7',
              lineColor: '#0284c7',
              secondaryColor: '#f1f5f9',
              tertiaryColor: '#ffffff',
              background: 'transparent',
              mainBkg: '#ffffff',
              nodeBorder: '#0284c7',
              textColor: '#0f172a',
              fontFamily: 'inherit'
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
        const id = `mermaid-svg-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        const { svg } = await mermaid.render(id, chart)
        if (!isCancelled) {
          setSvgContent(svg)
          setScale(1)
          setPosition({ x: 0, y: 0 })
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

  const handleZoomIn = () => setScale(s => Math.min(s + 0.25, 3.5))
  const handleZoomOut = () => setScale(s => Math.max(s - 0.25, 0.4))
  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!allowZoom) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!allowZoom || e.touches.length !== 1) return
    setIsDragging(true)
    dragStart.current = {
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    setPosition({
      x: e.touches[0].clientX - dragStart.current.x,
      y: e.touches[0].clientY - dragStart.current.y
    })
  }

  const handleTouchEnd = () => setIsDragging(false)

  const handleDownloadSVG = () => {
    if (!svgContent) return
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `brazis_clinical_diagram_${Date.now()}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`relative flex flex-col w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-slate-950 p-6' : className
      }`}
    >
      {/* Interactive Controls Overlay */}
      {svgContent && allowZoom && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-1 shadow-lg">
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 text-base font-bold"
            title="Zoom Out"
          >
            -
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 text-[11px] font-mono"
            title="Reset Zoom & Pan"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 text-base font-bold"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleDownloadSVG}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 active:scale-95 text-xs"
            title="Download Vector SVG"
          >
            💾
          </button>
          <button
            onClick={() => setIsFullscreen(f => !f)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 text-xs font-bold"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? '✕' : '⛶'}
          </button>
        </div>
      )}

      {/* Canvas Area */}
      <div
        className={`w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing p-4 select-none ${
          isFullscreen ? 'h-full' : 'min-h-[300px]'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {error ? (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-mono max-w-md">
            <span className="font-bold block mb-1">Mermaid Syntax Warning:</span>
            {error}
          </div>
        ) : svgContent ? (
          <div
            ref={containerRef}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
            className="flex justify-center [&>svg]:max-w-none [&>svg]:w-auto [&>svg]:h-auto transition-transform"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs italic">
            Rendering clinical flowchart...
          </div>
        )}
      </div>

      {allowZoom && svgContent && (
        <div className="text-[10px] text-slate-500 text-center pb-2 select-none">
          Drag to pan • Pinch / wheel to zoom • Press ⛶ for fullscreen
        </div>
      )}
    </div>
  )
}
