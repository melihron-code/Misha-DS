import { useId, useRef } from 'react'
import { cx } from './shared'
import ToggleButton from './ToggleButton'
import Tooltip from '../support/Tooltip'

// Figma: ToggleButtonGroup (lg ToggleButtons on accent/highlight). In code it's a
// single-choice radio group: one option is selected; arrow keys move the selection.
// An option with `tooltip` has no action yet: it shows the tooltip on hover and keyboard focus (e.g. "No action
// for now") and is marked unavailable (not-allowed cursor).
// Figma's default: three visible buttons, all labelled "Team".
const DEFAULT_OPTIONS = [
  { value: 'team-1', label: 'Team' },
  { value: 'team-2', label: 'Team' },
  { value: 'team-3', label: 'Team' },
]

// `size` (v0.6.12): lg (Figma's group: lg ToggleButtons on accent/highlight) or sm (small ToggleButtons, no fill, indents/2XS
// apart, wrapping; Figma: the status chips on all-teams-employees). `showLabel` shows `label` over the buttons
// (text/caps, indents/XS above them); otherwise it only names the group for screen readers.
const GROUP = {
  lg: 'inline-flex items-center gap-indents-3xs rounded-radius-m bg-accent-highlight p-indents-2xs',
  sm: 'flex flex-wrap gap-indents-2xs',
}

export default function ToggleButtonGroup({ options = DEFAULT_OPTIONS, value, onChange, label = 'Options', size = 'lg', showLabel = false, className }) {
  const labelId = useId()
  const refs = useRef([])
  const items = options.map(o => (typeof o === 'string' ? { value: o, label: o } : o))
  const selectedIndex = Math.max(0, items.findIndex(o => o.value === value))

  const select = i => {
    onChange?.(items[i].value)
    refs.current[i]?.focus()
  }
  const onKeyDown = e => {
    const last = items.length - 1
    const next = { ArrowRight: selectedIndex + 1, ArrowDown: selectedIndex + 1, ArrowLeft: selectedIndex - 1, ArrowUp: selectedIndex - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next < 0 ? last : next > last ? 0 : next)
  }

  const group = (
    <div
      role="radiogroup"
      aria-label={showLabel ? undefined : label}
      aria-labelledby={showLabel ? labelId : undefined}
      onKeyDown={onKeyDown}
      className={cx(GROUP[size], !showLabel && className)}
    >
      {items.map((o, i) => (
        <Tooltip key={i} text={o.tooltip} unavailable>
          <ToggleButton
            ref={el => (refs.current[i] = el)}
            role="radio"
            size={size}
            label={o.label}
            selected={i === selectedIndex}
            tabIndex={i === selectedIndex ? 0 : -1}
            onClick={() => select(i)}
          />
        </Tooltip>
      ))}
    </div>
  )
  if (!showLabel) return group
  return (
    <div className={cx('flex flex-col gap-indents-xs', className)}>
      <span id={labelId} className="text-text-caps text-text-primary">
        {label}
      </span>
      {group}
    </div>
  )
}
