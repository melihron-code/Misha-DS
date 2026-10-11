import { ProgressBar } from '../atoms'
import { cx } from '../atoms/shared'

// StageProgress (v0.5.0, code first; Header's progress and the candidate's "Personal development").
// A ProgressBar with its stages under it in equal columns (text/caps, text/secondary), indents/XS apart.
// In a mobile page (container "page" narrower than tablet) the labels become one line:
// "Stage 7 of 9: Minus one". The current stage is the one `value` (0–100) falls in.
export default function StageProgress({ stages = [], value = 0, size = 'lg', tone = 'default', label = 'Progress', className, ...rest }) {
  const pct = Math.min(100, Math.max(0, value))
  const current = stages.length ? Math.min(stages.length, Math.max(1, Math.ceil((pct / 100) * stages.length))) : 0
  return (
    <div className={cx('flex flex-col gap-indents-xs', className)} {...rest}>
      <ProgressBar size={size} tone={tone} value={pct} label={stages.length ? `${label}: stage ${current} of ${stages.length}, ${stages[current - 1]}` : label} />
      {stages.length > 0 && (
        <>
          <ol aria-hidden="true" className="flex text-text-caps text-text-secondary @max-tablet/page:hidden">
            {stages.map(s => (
              <li key={s} className="min-w-0 flex-1 truncate">
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
