import { useState, useRef, useEffect } from 'react'

interface FigureViewerModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  caption?: string
  title?: string
}

export function FigureViewerModal({
  isOpen,
  onClose,
  imageSrc,
  caption,
  title
}: FigureViewerModalProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleZoomIn = () => setScale(s => Math.min(s + 0.4, 4))
  const handleZoomOut = () => setScale(s => Math.max(s - 0.4, 0.8))
  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
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

  // Touch pan & pinch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      dragStart.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      }
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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80 text-white">
        <div className="truncate pr-4">
          <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Figure Viewer</p>
          <h3 className="text-sm font-medium truncate text-slate-200">{title || 'Anatomical Diagram'}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 text-lg font-bold"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            -
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2.5 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:bg-slate-700 active:scale-95"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 text-lg font-bold"
            title="Zoom In"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={onClose}
            className="ml-2 w-10 h-10 flex items-center justify-center rounded-lg bg-red-950/60 text-red-400 border border-red-800/60 hover:bg-red-900 active:scale-95 font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Image canvas with drag and zoom */}
      <div
        className="flex-1 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={imageSrc}
          alt={title || 'Clinical Anatomy Figure'}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            maxHeight: '85vh',
            maxWidth: '92vw'
          }}
          className="object-contain pointer-events-none rounded shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Caption at bottom */}
      {caption && (
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-slate-300 text-xs leading-relaxed text-center max-h-24 overflow-y-auto">
          {caption}
        </div>
      )}
    </div>
  )
}
