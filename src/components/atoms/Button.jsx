import { cx, PRESSABLE, SIZE, stateAttr } from './shared'

// Figma: Button. variant secondary | on-color | primary-sm | primary-lg | node.
// (Figma's `cta` prop is not exposed: it is true exactly for primary-sm and primary-lg.)
const VARIANTS = {
  secondary: 'rounded-radius-over bg-surface-control px-indents-s-inner text-text-pixel text-text-primary',
  'on-color': 'rounded-radius-over bg-surface-control-on-color px-indents-s-inner text-text-pixel text-text-primary',
  'primary-sm': 'rounded-radius-over bg-accent-primary px-indents-s-inner text-text-pixel text-text-on-accent',
  'primary-lg': 'rounded-radius-over bg-accent-primary px-indents-s-inner pt-indents-s-inner pb-indents-m text-heading-h2 text-text-on-accent',
  node: 'flex-col items-start gap-indents-xs rounded-radius-s bg-surface-tag-red p-indents-s-inner text-text-primary',
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
    VARIANTS[variant],
    isDisabled && DISABLED,
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
