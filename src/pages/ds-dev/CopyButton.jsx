import { useEffect, useRef, useState } from 'react'

// Copies `value` (a Tailwind class or CSS variable). The whole padded box is
// the hit area.
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
      className={`inline-block cursor-pointer rounded-rounds-s px-indents-xxs py-indents-xxxs text-left hover:bg-surface-control focus-visible:outline-2 focus-visible:outline-border-focus ${className}`}
    >
      {copied ? 'Copied' : (children ?? value)}
      <span className="sr-only" aria-live="polite">{copied ? `Copied ${value}` : ''}</span>
    </button>
  )
}
