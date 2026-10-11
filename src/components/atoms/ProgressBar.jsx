import { useLayoutEffect, useRef, useState } from 'react'
import { cx, SIZE } from './shared'

// Figma: ProgressBar. size sm (one row of dots) | lg (two rows), value 0–100.
// 5px dots, indents/3XS (2px) apart, filling the available width; the first
// `value` % of them are filled, the rest empty. tone default: data/bar-filled + data/bar-empty;
// accent: data/bar-filled-accent + data/bar-empty-accent (greens).
// `stages` (v0.6.13, was the StageProgress molecule; Header's progress, the candidate's development): the stage names
// under the bar in equal columns (text/caps, text/secondary), indents/XS apart; in a mobile page (container "page")
// one line instead: "Stage 7 of 9: Minus one". The current stage is the one `value` falls in; screen readers hear it
// in the bar's label.
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

export default function ProgressBar({ size = 'sm', tone = 'default', value = 75, label = 'Progress', stages, className, ...rest }) {
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
  const current = stages?.length ? Math.min(stages.length, Math.max(1, Math.ceil((pct / 100) * stages.length))) : 0
  const filled = Math.round((count * pct) / 100)
  const dot = filled => (
    <span className={cx('shrink-0 rounded-radius-over', filled ? TONE[tone].filled : TONE[tone].empty)} style={{ width: SIZE.dot, height: SIZE.dot }} />
  )

  const bar = (
    <div
      ref={ref}
      role="progressbar"
      aria-label={current ? `${label}: stage ${current} of ${stages.length}, ${stages[current - 1]}` : label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cx('flex w-full gap-indents-3xs overflow-hidden', !stages && className)}
      {...(stages ? {} : rest)}
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
  if (!stages) return bar
  return (
    <div className={cx('flex flex-col gap-indents-xs', className)} {...rest}>
      {bar}
      {current > 0 && (
        <>
          <ol aria-hidden="true" className="flex text-text-caps text-text-secondary @max-tablet/page:hidden">
            {stages.map(s => (
              <li key={s} className="min-w-0 flex-1 truncate-x">
                {s}
              </li>
            ))}
          </ol>
          <p aria-hidden="true" className="hidden text-text-caps text-text-secondary @max-tablet/page:block">
            Stage {current} of {stages.length}: {stages[current - 1]}
          </p>
        </>
      )}
    </div>
  )
}
