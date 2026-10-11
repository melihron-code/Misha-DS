import { useLayoutEffect, useRef, useState } from 'react'
import { cx, SIZE } from './shared'

// Figma: ProgressBar. size sm (one row of dots) | lg (two rows), value 0–100.
// 5px dots, indents/3XS (2px) apart, filling the available width; the first
// `value` % of them are filled, the rest empty. tone default: data/bar-filled + data/bar-empty;
// accent: data/bar-filled-accent + data/bar-empty-accent (greens).
const TONE = {
  default: { filled: 'bg-data-bar-filled', empty: 'bg-data-bar-empty' },
  accent: { filled: 'bg-data-bar-filled-accent', empty: 'bg-data-bar-empty-accent' },
}
// px per dot (dot + gap), read from the tokens; only used to count how many dots fit.
const dotStep = () => {
  const cs = getComputedStyle(document.documentElement)
  const px = name => parseFloat(cs.getPropertyValue(name)) || 0
  return { dot: px('--indents-2xs') - px('--indents-neg-4xs'), gap: px('--indents-3xs') }
}

export default function ProgressBar({ size = 'sm', tone = 'default', value = 75, label = 'Progress', className, ...rest }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const { dot, gap } = dotStep()
    const measure = () => setCount(Math.max(1, Math.floor((el.clientWidth + gap) / (dot + gap))))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const pct = Math.min(100, Math.max(0, value))
  const filled = Math.round((count * pct) / 100)
  const dot = filled => (
    <span className={cx('shrink-0 rounded-radius-over', filled ? TONE[tone].filled : TONE[tone].empty)} style={{ width: SIZE.dot, height: SIZE.dot }} />
  )

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cx('flex w-full gap-indents-3xs overflow-hidden', className)}
      {...rest}
    >
      {Array.from({ length: count }, (_, i) =>
        size === 'lg' ? (
          <span key={i} className="flex flex-col gap-indents-3xs">
            {dot(i < filled)}
            {dot(i < filled)}
          </span>
        ) : (
          <span key={i} className="contents">{dot(i < filled)}</span>
        ),
      )}
    </div>
  )
}
