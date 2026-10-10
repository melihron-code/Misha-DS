import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: ToggleButton. selected true | false, size lg | sm, label.
// Figma's fixed 32px height with horizontal padding; the label is centred.
const STYLE = {
  lg: { base: 'px-indents-s-inner text-text-pixel text-text-primary', on: 'bg-surface-control-selected', off: '' },
  sm: { base: 'bg-surface-control px-indents-s-inner text-text-caps', on: 'text-text-primary', off: 'text-text-secondary' },
}

export default function ToggleButton({
  selected = false,
  size = 'lg',
  label = 'Team',
  children,
  disabled = false,
  state,
  onClick,
  className,
  role,
  ...rest
}) {
  const isDisabled = disabled || state === 'disabled'
  const s = STYLE[size]
  // Standalone it's a toggle (aria-pressed); inside a ToggleButtonGroup it's a radio (role passed in).
  const ariaState = role === 'radio' ? { 'aria-checked': selected } : { 'aria-pressed': selected }
  return (
    <button
      type="button"
      role={role}
      {...ariaState}
      disabled={isDisabled}
      data-state={stateAttr(state)}
      onClick={onClick}
      className={cx(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-radius-s select-none',
        PRESSABLE,
        s.base,
        selected ? s.on : s.off,
        isDisabled && 'bg-bg-disabled-bg text-text-disabled',
        className,
      )}
      style={{ height: SIZE.control }}
      {...rest}
    >
      <span className="trim-letter-spacing">{children ?? label}</span>
    </button>
  )
}
