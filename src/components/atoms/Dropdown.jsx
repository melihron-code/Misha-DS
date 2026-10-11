import { useEffect, useId, useRef, useState } from 'react'
import { ArrowDownIcon } from '../icons'
import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: Dropdown. variant default | on-color, filled true | false, label, value, showLabel.
// `filled` follows from having a value (pass it to force the look on the docs page).
// Behaviour: ARIA select-only combobox + listbox (focus stays on the trigger):
//   Enter / Space / ↓ / ↑ open · ↑ ↓ Home End move · Enter / Space pick · Esc / Tab close.
// The open list isn't designed in Figma; it reuses the field's tokens on a surface/card panel.
const STYLE = {
  default: {
    label: 'text-text-primary',
    field: 'bg-surface-control',
    value: 'text-text-primary',
    empty: 'text-text-secondary',
    icon: 'text-icon-primary',
  },
  'on-color': {
    label: 'text-text-accent',
    field: 'bg-accent-secondary',
    value: 'text-text-on-color',
    empty: 'text-text-on-color opacity-50', // Figma: 50% layer opacity (no token)
    icon: 'text-icon-on-color',
  },
}

const DEFAULT_OPTIONS = ['frontend-team', 'backend-team', 'design-team']
const norm = o => (typeof o === 'string' ? { value: o, label: o } : o)

export default function Dropdown({
  variant = 'default',
  label = 'head line',
  showLabel = true,
  options = DEFAULT_OPTIONS,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = 'frontend-team',
  filled,
  disabled = false,
  state,
  className,
}) {
  const s = STYLE[variant]
  const items = options.map(norm)
  const uid = useId()
  const [inner, setInner] = useState(defaultValue)
  const value = valueProp !== undefined ? valueProp : inner
  const selectedIndex = items.findIndex(o => o.value === value)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  // The active option is highlighted (surface/tag-yellow-bright) only once the pointer or
  // the arrow keys have moved onto it, not just because the list opened on it.
  const [moved, setMoved] = useState(false)
  const rootRef = useRef(null)
  const isDisabled = disabled || state === 'disabled'
  const isFilled = filled ?? selectedIndex >= 0
  const shown = selectedIndex >= 0 ? items[selectedIndex].label : placeholder

  const pick = i => {
    if (valueProp === undefined) setInner(items[i].value)
    onChange?.(items[i].value)
    setOpen(false)
  }
  const openList = () => {
    if (isDisabled) return
    setActive(selectedIndex >= 0 ? selectedIndex : 0)
    setMoved(false)
    setOpen(true)
  }
  const moveTo = next => {
    setActive(next)
    setMoved(true)
  }

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return
    const onDown = e => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const onKeyDown = e => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); openList() }
      return
    }
    const last = items.length - 1
    if (e.key === 'ArrowDown') { e.preventDefault(); moveTo(Math.min(last, active + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveTo(Math.max(0, active - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); moveTo(0) }
    else if (e.key === 'End') { e.preventDefault(); moveTo(last) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (active >= 0) pick(active) }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
    else if (e.key === 'Tab') setOpen(false)
  }

  const listId = `${uid}-list`
  const labelId = `${uid}-label`
  return (
    <div ref={rootRef} className={cx('relative inline-flex flex-col gap-indents-xs', className)}>
      <span id={labelId} className={showLabel ? cx('text-text-caps', isDisabled ? 'text-text-disabled' : s.label) : 'sr-only'}>
        {label}
      </span>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open && active >= 0 ? `${uid}-opt-${active}` : undefined}
        disabled={isDisabled}
        data-state={stateAttr(state)}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cx(
          'inline-flex items-center justify-between whitespace-nowrap rounded-radius-s py-indents-xs pl-indents-s-inner pr-indents-s-inner text-left select-none',
          PRESSABLE,
          isDisabled ? 'bg-bg-disabled-bg' : s.field,
        )}
        style={{ gap: SIZE.gap10 }}
      >
        <span className={cx('trim-letter-spacing text-text-pixel', isDisabled ? 'text-text-disabled' : isFilled ? s.value : s.empty)}>{shown}</span>
        <span className={cx('inline-flex pl-indents-xs', isDisabled ? 'text-text-disabled' : s.icon, !isFilled && variant === 'on-color' && 'opacity-50')}>
          <ArrowDownIcon size={16} />
        </span>
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute top-full left-0 z-10 mt-indents-2xs flex min-w-full flex-col gap-indents-3xs rounded-radius-s bg-surface-card p-indents-2xs shadow-card"
        >
          {items.map((o, i) => (
            <li
              key={o.value}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              onPointerDown={e => e.preventDefault()}
              onClick={() => pick(i)}
              onPointerEnter={() => moveTo(i)}
              className={cx(
                'transition-state cursor-pointer whitespace-nowrap rounded-radius-s px-indents-s-inner py-indents-xs text-text-pixel text-text-primary',
                i === active && moved ? 'bg-surface-tag-yellow-bright' : i === selectedIndex && 'bg-surface-control',
              )}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
