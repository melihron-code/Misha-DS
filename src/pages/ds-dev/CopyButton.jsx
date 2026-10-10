import { useEffect, useRef, useState } from 'react'

// Copies `value` (a Tailwind class or CSS variable). The whole padded box is
// the hit area. The label and "Copied" share one grid cell, so the button keeps
// its width while the feedback shows and nothing around it moves.
export default function CopyButton({ value, children, className = '' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${value}`}
      className={`inline-grid cursor-pointer rounded-radius-s px-indents-2xs py-indents-3xs text-left hover:bg-surface-control focus-visible:outline-2 focus-visible:outline-border-focus ${className}`}
    >
      <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>{children ?? value}</span>
      <span className={`col-start-1 row-start-1 ${copied ? '' : 'invisible'}`} aria-hidden="true">Copied</span>
      <span className="sr-only" aria-live="polite">{copied ? `Copied ${value}` : ''}</span>
    </button>
  )
}
