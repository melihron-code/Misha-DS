import { useId } from 'react'
import { cx, PRESSABLE, SIZE } from '../../components/atoms/shared'

// On/off switch for the playground's boolean controls. Docs only, not a Figma atom.
// A <button role="switch">: click, Space or Enter flips it; its <label> flips it too.
// Sizes from tokens: track 36×20 (indents/L + XS + 2XS by indents/M), thumb 16
// (indents/M − 2 × indents/3XS), so the thumb travels track width − track height.
// Disabled: bg/disabled-bg track, text/disabled thumb and label.
const TRACK_WIDTH = 'calc(var(--indents-l) + var(--indents-xs) + var(--indents-2xs))'
const THUMB = 'calc(var(--indents-m) - var(--indents-3xs) * 2)'
const TRAVEL = `calc(${TRACK_WIDTH} - var(--indents-m))`

export default function Switch({ label, checked, onChange, disabled = false }) {
  const id = useId()
  const track = disabled ? 'bg-bg-disabled-bg' : checked ? 'bg-accent-primary' : 'bg-surface-control'
  const thumb = disabled ? 'bg-text-disabled' : checked ? 'bg-surface-card' : 'bg-icon-secondary'
  return (
    <div className="inline-flex flex-col gap-indents-xs">
      <label htmlFor={id} className={cx('text-text-caps', disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer text-text-primary')}>
        {label}
      </label>
      {/* Same height as the fields beside it, so the switch sits on their centre line. */}
      <div className="flex items-center" style={{ height: SIZE.control }}>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cx('inline-flex shrink-0 items-center rounded-radius-over p-indents-3xs', PRESSABLE, track)}
          style={{ width: TRACK_WIDTH, height: 'var(--indents-m)' }}
        >
          <span
            aria-hidden="true"
            className={cx('rounded-radius-over transition-state', thumb)}
            style={{ width: THUMB, height: THUMB, transform: checked ? `translateX(${TRAVEL})` : 'none' }}
          />
        </button>
      </div>
    </div>
  )
}
