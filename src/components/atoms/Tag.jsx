import { CloseIcon } from '../icons'
import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: Tag. variant control | static, label, showIcon (close icon after the label).
// control is interactive (a button; with showIcon it reads "Remove <label>");
// static is display-only. Figma height 24px = indents/L. No disabled state.
const BG = { control: 'bg-surface-control', static: 'bg-surface-tag-red' }

export default function Tag({ variant = 'control', label = 'React', showIcon = false, state, onClick, className, ...rest }) {
  const classes = cx(
    'inline-flex h-indents-l shrink-0 items-center whitespace-nowrap rounded-radius-s px-indents-xs text-text-pixel text-text-primary',
    BG[variant],
    className,
  )
  const content = (
    <>
      <span className="trim-letter-spacing">{label}</span>
      {showIcon && <CloseIcon size={16} className="text-icon-primary" />}
    </>
  )
  const gap = showIcon ? { gap: SIZE.gap10 } : undefined

  if (variant === 'static') {
    return (
      <span className={classes} style={gap} {...rest}>
        {content}
      </span>
    )
  }
  return (
    <button
      type="button"
      data-state={stateAttr(state)}
      aria-label={showIcon ? `Remove ${label}` : undefined}
      onClick={onClick}
      className={cx(classes, PRESSABLE, 'select-none')}
      style={gap}
      {...rest}
    >
      {content}
    </button>
  )
}
