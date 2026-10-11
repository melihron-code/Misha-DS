import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: Button. variant primary-lg | primary-sm | secondary | on-color | node.
// (Figma's `cta` prop is not exposed: it is true exactly for primary-sm and primary-lg.)
// Shape and color are kept apart: a disabled button drops its variant color, so every
// variant is disabled the same way (bg/disabled-bg + text/disabled).
const SHAPE = {
  'primary-lg': 'rounded-radius-over px-indents-s-inner pt-indents-s-inner pb-indents-m text-heading-h2',
  'primary-sm': 'rounded-radius-over px-indents-s-inner text-text-pixel',
  secondary: 'rounded-radius-over px-indents-s-inner text-text-pixel',
  'on-color': 'rounded-radius-over px-indents-s-inner text-text-pixel',
  node: 'flex-col items-start gap-indents-xs rounded-radius-s p-indents-s-inner',
}
const COLOR = {
  'primary-lg': 'bg-accent-primary text-text-on-accent',
  'primary-sm': 'bg-accent-primary text-text-on-accent',
  secondary: 'bg-surface-control text-text-primary',
  'on-color': 'bg-surface-control-on-color text-text-primary',
  node: 'bg-surface-tag-red text-text-primary',
}
// Variants with Figma's fixed 32px height.
const CONTROL_HEIGHT = new Set(['secondary', 'on-color', 'primary-sm'])
const DISABLED = 'bg-bg-disabled-bg text-text-disabled'

export default function Button({
  variant = 'secondary',
  label,
  children,
  sublabel = 'more info',
  showSublabel = true,
  disabled = false,
  state,
  href,
  type = 'button',
  className,
  style,
  ...rest
}) {
  const isDisabled = disabled || state === 'disabled'
  const text = children ?? label ?? 'More info'
  const classes = cx(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none',
    PRESSABLE,
    SHAPE[variant],
    isDisabled ? DISABLED : COLOR[variant],
    className,
  )
  const sized = CONTROL_HEIGHT.has(variant) ? { height: SIZE.control, ...style } : style
  const content =
    variant === 'node' ? (
      <>
        <span className="trim-letter-spacing text-text-grotesk">{text}</span>
        {showSublabel && <span className="trim-letter-spacing text-text-pixel">{sublabel}</span>}
      </>
    ) : (
      <span className="trim-letter-spacing">{text}</span>
    )

  if (href) {
    return (
      <a
        href={isDisabled ? undefined : href}
        aria-disabled={isDisabled || undefined}
        data-state={stateAttr(state)}
        className={classes}
        style={sized}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <button type={type} disabled={isDisabled} data-state={stateAttr(state)} className={classes} style={sized} {...rest}>
      {content}
    </button>
  )
}
