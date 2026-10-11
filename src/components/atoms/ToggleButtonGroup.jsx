import { useRef } from 'react'
import ToggleButton from './ToggleButton'
import Tooltip from './Tooltip'

// Figma: ToggleButtonGroup (lg ToggleButtons on accent/highlight). In code it's a
// single-choice radio group: one option is selected; arrow keys move the selection.
// An option with `tooltip` shows it on hover and keyboard focus (e.g. "No action for now").
// Figma's default: three visible buttons, all labelled "Team".
const DEFAULT_OPTIONS = [
  { value: 'team-1', label: 'Team' },
  { value: 'team-2', label: 'Team' },
  { value: 'team-3', label: 'Team' },
]

export default function ToggleButtonGroup({ options = DEFAULT_OPTIONS, value, onChange, label = 'Options', className }) {
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

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`inline-flex items-center gap-indents-3xs rounded-radius-m bg-accent-highlight p-indents-2xs ${className ?? ''}`}
    >
      {items.map((o, i) => (
        <Tooltip key={i} text={o.tooltip}>
          <ToggleButton
            ref={el => (refs.current[i] = el)}
            role="radio"
            size="lg"
            label={o.label}
            selected={i === selectedIndex}
            tabIndex={i === selectedIndex ? 0 : -1}
            onClick={() => select(i)}
          />
        </Tooltip>
      ))}
    </div>
  )
}
