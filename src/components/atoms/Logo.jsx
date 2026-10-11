import { cx, PRESSABLE, stateAttr } from './shared'

// Logo (v0.5.0, code first): "Hired & Wired" in heading/logo (Instrument Serif, font/size/logo 23px).
// With `href` it's the home link (states as Button, padded hit area cancelled by negative margins).
export default function Logo({ label = 'Hired & Wired', href, state, className, ...rest }) {
  const text = 'whitespace-nowrap text-heading-logo text-text-primary'
  if (!href) {
    return (
      <span className={cx(text, className)} {...rest}>
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      data-state={stateAttr(state)}
      className={cx('inline-block rounded-radius-s px-indents-2xs py-indents-xs -mx-indents-2xs -my-indents-xs', text, PRESSABLE, className)}
      {...rest}
    >
      {label}
    </a>
  )
}
