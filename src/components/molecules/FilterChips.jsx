import { useId, useRef } from 'react'
import { ToggleButton } from '../atoms'
import { cx } from '../atoms/shared'

// FilterChips (v0.6.4, code first; Figma: the "status:" chips on all-teams-employees, drawn there with Dropdowns).
// A label (text/caps, as a Dropdown's) over small ToggleButtons (size sm), indents/2XS apart, wrapping. A
// single-choice radio group: one option is selected; arrow keys move the selection, as in ToggleButtonGroup.
// `options`: [{ value, label }] or strings; `value`, `onChange(value)`.
export default function FilterChips({ label = 'Status:', options = [], value, onChange, className, ...rest }) {
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

  return (
    <div className={cx('flex flex-col gap-indents-xs', className)} {...rest}>
      <span id={labelId} className="text-text-caps text-text-primary">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={labelId} onKeyDown={onKeyDown} className="flex flex-wrap gap-indents-2xs">
        {items.map((o, i) => (
          <ToggleButton
            key={o.value}
            ref={el => (refs.current[i] = el)}
            role="radio"
            size="sm"
            label={o.label}
            selected={i === selectedIndex}
            tabIndex={i === selectedIndex ? 0 : -1}
            onClick={() => select(i)}
          />
        ))}
      </div>
    </div>
  )
}
