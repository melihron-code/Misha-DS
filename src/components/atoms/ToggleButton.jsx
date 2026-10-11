import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: ToggleButton. selected true | false, size lg | sm, label.
// Figma's fixed 32px height with horizontal padding; the label is centred.
// No disabled state (removed from the design).
const STYLE = {
  lg: { base: 'px-indents-s-inner text-text-pixel', on: 'bg-surface-control-selected text-text-primary', off: 'text-text-primary' },
  sm: { base: 'px-indents-s-inner text-text-caps', on: 'bg-surface-control text-text-primary', off: 'bg-surface-control text-text-secondary' },
}

export default function ToggleButton({
  selected = false,
  size = 'lg',
  label = 'Team',
  children,
  state,
  onClick,
  className,
  role,
  ...rest
}) {
  const s = STYLE[size]
  // Standalone it's a toggle (aria-pressed); inside a ToggleButtonGroup it's a radio (role passed in).
  const ariaState = role === 'radio' ? { 'aria-checked': selected } : { 'aria-pressed': selected }
  return (
    <button
      type="button"
      role={role}
      {...ariaState}
      data-state={stateAttr(state)}
      onClick={onClick}
      className={cx(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-radius-s select-none',
        PRESSABLE,
        s.base,
        selected ? s.on : s.off,
        className,
      )}
      style={{ height: SIZE.control }}
      {...rest}
    >
      <span className="trim-letter-spacing">{children ?? label}</span>
    </button>
  )
}
