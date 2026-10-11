import { CloseIcon } from '../icons'
import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: Tag. variant control | static, label, showIcon (close icon after the label).
// control is interactive (a button; with showIcon it reads "Remove <label>");
// static is display-only, in color yellow (surface/tag-yellow-bright, yellow/200) or green
// (surface/tag-green, green/100); control is always neutral (Figma: color=neutral). 32px high,
// like the controls. No disabled state.
const BG = { control: 'bg-surface-control', yellow: 'bg-surface-tag-yellow-bright', green: 'bg-surface-tag-green' }

export default function Tag({ variant = 'control', color = 'yellow', label = 'React', showIcon = false, state, onClick, className, style, ...rest }) {
  const classes = cx(
    'inline-flex shrink-0 items-center whitespace-nowrap rounded-radius-s px-indents-xs text-text-pixel text-text-primary',
    BG[variant === 'static' ? color : 'control'],
    className,
  )
  const content = (
    <>
      <span className="trim-letter-spacing">{label}</span>
      {showIcon && <CloseIcon size={16} className="text-icon-primary" />}
    </>
  )
  const sized = { height: SIZE.control, ...(showIcon ? { gap: SIZE.gap10 } : {}), ...style }

  if (variant === 'static') {
    return (
      <span className={classes} style={sized} {...rest}>
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
      style={sized}
      {...rest}
    >
      {content}
    </button>
  )
}
